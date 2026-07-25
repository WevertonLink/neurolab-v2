const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const runtimeAudit = new WeakMap();
const MODULE_COUNT = 16;
const MOBILE_VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 }
];

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/²/g, '2')
    .replace(/⁺/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
}

async function boot(page) {
  await page.addInitScript(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (_) {}
  });
  await page.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#view-dashboard')).toHaveClass(/active/);
  await expect(page.locator('.card')).toHaveCount(MODULE_COUNT);
}

// Os testes de persistência precisam preparar o localStorage ANTES de o app
// bootar. Os addInitScript acumulam na ordem em que são registrados, e o
// beforeEach já registrou o de limpeza — então este roda depois dele, e a
// renavegação é o que aplica o cenário.
async function bootComArmazenamento(page, script, arg) {
  await page.addInitScript(script, arg);
  await page.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#view-dashboard')).toHaveClass(/active/);
}

async function openModule(page, index) {
  await page.evaluate((i) => {
    if (typeof openModule !== 'function') throw new Error('openModule não está disponível.');
    openModule(i);
  }, index);
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('#md-lessons .lesson').first()).toBeVisible();
}

// No modo profundo a aula nasce sob o véu de predição (.body.pveil). Esse véu aplica
// pointer-events:none, que é herdado por todos os botões .gterm dentro do texto.
// Enquanto ele existir, nenhum termo é clicável — é comportamento correto do app,
// então a auditoria precisa percorrer o mesmo caminho do aluno: responder ou pular
// a predição para liberar a aula.
async function revealLessons(page) {
  const skips = page.locator('#md-lessons .pred .pskip');
  let remaining = await skips.count();
  while (remaining > 0) {
    await skips.first().click();
    await expect(skips).toHaveCount(remaining - 1, { timeout: 10_000 });
    remaining -= 1;
  }
  await expect(page.locator('#md-lessons .body.pveil')).toHaveCount(0);
}

// Uma página de módulo mede ~9.000 px CSS. No perfil Pixel 7 o deviceScaleFactor é
// 2,625, então um fullPage no padrão `scale: 'device'` gera um PNG de ~24.000 px de
// altura — acima do limite de textura do Chromium (~16.384 px). O navegador cai num
// caminho de captura em blocos, muito mais lento, e estoura o actionTimeout de 15 s
// no runner do CI. `scale: 'css'` mantém a imagem em ~9.000 px e a captura volta a
// custar centenas de milissegundos; `animations: 'disabled'` remove a variação de
// quadro a quadro que ainda deixava o tempo irregular.
const SHOT = { fullPage: true, scale: 'css', animations: 'disabled', timeout: 30_000 };

async function attachJson(testInfo, name, data) {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(data, null, 2)),
    contentType: 'application/json'
  });
}

async function closeTermModal(page, context = {}) {
  const modal = page.locator('#term-modal');
  if (!(await modal.isVisible())) return;

  await page.locator('#tm-close').click();
  await expect(modal, `Modal não fechou: ${JSON.stringify(context)}`).toBeHidden({ timeout: 5_000 });
  await page.waitForFunction(() => {
    const term = document.getElementById('term-modal');
    const zoom = document.getElementById('fig-zoom');
    const bodyUnlocked = document.body.style.overflow !== 'hidden';
    return Boolean(term?.hidden && zoom?.hidden && bodyUnlocked);
  }, null, { timeout: 5_000 });
}

async function collectLayoutIssues(page, scopeSelector) {
  return page.evaluate((selector) => {
    const scope = document.querySelector(selector) || document.body;
    const doc = document.documentElement;
    const viewportWidth = doc.clientWidth;
    const issues = [];
    const ignored = new Set(['SVG', 'PATH', 'LINE', 'CIRCLE', 'RECT', 'POLYLINE', 'POLYGON', 'G']);

    function scrollingAncestor(el) {
      for (let parent = el.parentElement; parent && parent !== doc; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (style.overflowX === 'auto' || style.overflowX === 'scroll') return parent;
      }
      return null;
    }

    if (doc.scrollWidth > viewportWidth + 1) {
      issues.push({
        type: 'page-horizontal-overflow',
        tag: 'html',
        scrollWidth: doc.scrollWidth,
        clientWidth: viewportWidth
      });
    }

    for (const el of scope.querySelectorAll('*')) {
      if (ignored.has(el.tagName)) continue;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (scrollingAncestor(el)) continue;
      if (rect.right > viewportWidth + 3 || rect.left < -3) {
        issues.push({
          type: 'horizontal-overflow',
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: String(el.className || '').slice(0, 160),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewportWidth
        });
      }
    }
    return issues.slice(0, 200);
  }, scopeSelector);
}

async function inspectVerticalMechanism(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const track = document.getElementById('func-track');
    const steps = track ? Array.from(track.querySelectorAll('.func-step')) : [];
    const trackRect = track?.getBoundingClientRect() || null;
    const overflowingSteps = [];

    if (trackRect) {
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.left < trackRect.left - 1 || rect.right > trackRect.right + 1) {
          overflowingSteps.push({
            index,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            trackLeft: Math.round(trackRect.left),
            trackRight: Math.round(trackRect.right)
          });
        }
      });
    }

    return {
      pageScrollWidth: doc.scrollWidth,
      pageClientWidth: doc.clientWidth,
      pageOverflow: doc.scrollWidth > doc.clientWidth + 1,
      trackScrollWidth: track?.scrollWidth || 0,
      trackClientWidth: track?.clientWidth || 0,
      trackHorizontalScroll: Boolean(track && track.scrollWidth > track.clientWidth + 1),
      stepCount: steps.length,
      overflowingSteps
    };
  });
}

test.beforeEach(async ({ page }, testInfo) => {
  // requests guarda toda requisição para a asserção de origem no afterEach.
  // expectNetworkFailures é ligado pelo teste que corta a rede de propósito:
  // offline, falha de requisição é o comportamento esperado, não um defeito.
  const audit = {
    consoleErrors: [], pageErrors: [], failedRequests: [],
    requests: [], expectNetworkFailures: false
  };
  runtimeAudit.set(page, audit);

  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (/favicon/i.test(text)) return;
    audit.consoleErrors.push(text);
  });

  page.on('pageerror', (error) => audit.pageErrors.push(error.stack || error.message));
  page.on('requestfailed', (request) => {
    const url = request.url();
    if (/favicon/i.test(url)) return;
    audit.failedRequests.push({ url, error: request.failure()?.errorText || 'unknown' });
  });
  page.on('request', (request) => {
    const url = request.url();
    if (/^(data|blob):/i.test(url)) return;
    audit.requests.push(url);
  });

  await boot(page);
  testInfo.annotations.push({ type: 'target', description: page.url() });
});

test.afterEach(async ({ page }, testInfo) => {
  const audit = runtimeAudit.get(page);
  if (!audit) return;

  // O index.html é o aplicativo: as fontes estão embutidas nele e não há mais
  // nenhuma dependência de terceiros. Medir isso em todos os testes é o que
  // impede a dependência externa de voltar sem ninguém notar.
  let external = [];
  try {
    const origin = new URL(page.url()).origin;
    external = audit.requests.filter((url) => {
      try { return new URL(url).origin !== origin; } catch (_) { return false; }
    });
  } catch (_) {}
  audit.externalRequests = external;

  await attachJson(testInfo, 'runtime-audit.json', audit);
  expect.soft(audit.pageErrors, 'Erros JavaScript não tratados').toEqual([]);
  expect.soft(audit.consoleErrors, 'Erros no console').toEqual([]);
  expect.soft(external, 'Requisições para fora da origem do app').toEqual([]);
  if (!audit.expectNetworkFailures) {
    expect.soft(audit.failedRequests, 'Requisições internas que falharam').toEqual([]);
  }
});

test('@smoke dashboard, metadados e navegação principal', async ({ page }) => {
  await expect(page).toHaveTitle(/NeuroLab/i);
  await expect(page).toHaveTitle(/Fase 6/i);
  await expect(page.locator('.card')).toHaveCount(MODULE_COUNT);
  await expect(page.locator('#vis-tab-anatomy')).toHaveText(/Anatomia/i);
  await expect(page.locator('#vis-tab-functional')).toHaveText(/Mecanismo/i);

  const firstTitle = (await page.locator('.card .ct').first().textContent())?.trim();
  await page.locator('.card').first().click();
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('.mhead h2')).toContainText(firstTitle || '');
});

test('@smoke os 16 módulos renderizam anatomia e mecanismo', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  const summary = [];
  for (let index = 0; index < MODULE_COUNT; index += 1) {
    await openModule(page, index);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const anatomyComponents = await page.locator('#md-anat .anat-chip').count();

    await page.locator('#vis-tab-functional').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    const mechanismSteps = await page.locator('#md-functional .func-step').count();
    expect(mechanismSteps, `Módulo ${index + 1} sem etapas no mecanismo`).toBeGreaterThan(0);

    summary.push({ index: index + 1, moduleName, anatomyComponents, mechanismSteps });
  }
  await attachJson(testInfo, 'modules-summary.json', summary);
});

test('@coverage integridade dos dados contextuais e dos termos essenciais', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'A auditoria de dados roda uma vez.');

  const audit = await page.evaluate(() => {
    const norm = (value) => String(value || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/²/g, '2').replace(/⁺/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ').trim().toLowerCase();

    const issues = [];
    const counters = {
      modules: Array.isArray(MODULES) ? MODULES.length : 0,
      anatomyParts: 0,
      anatomyMappings: 0,
      requiredOccurrences: 0,
      topicMappings: 0,
      glossaryMatches: 0,
      contextualKinds: {}
    };

    const glossaryNorm = new Set(Object.keys(GLOSSARY || {}).map(norm));

    for (const module of MODULES || []) {
      const anatomy = (ANATOMY || {})[module.id];
      const anatomyMap = (CONTEXT_ANATOMY || {})[module.id];
      if (!anatomy) issues.push({ type: 'missing-anatomy', module: module.id });
      if (!anatomyMap) issues.push({ type: 'missing-anatomy-map', module: module.id });

      for (const part of anatomy?.parts || []) {
        counters.anatomyParts += 1;
        if (anatomyMap && Object.prototype.hasOwnProperty.call(anatomyMap, part.id)) counters.anatomyMappings += 1;
        else issues.push({ type: 'unmapped-anatomy-part', module: module.id, part: part.id, label: part.label });
      }

      const requiredByLesson = (CONTEXT_REQUIRED || {})[module.id] || {};
      const mappedByLesson = (CONTEXT_TOPIC_TERMS || {})[module.id] || {};

      for (const [lessonIndex, requiredTerms] of Object.entries(requiredByLesson)) {
        const topicMap = mappedByLesson[String(lessonIndex)] || {};
        const topicByNorm = new Map(Object.keys(topicMap).map((key) => [norm(key), topicMap[key]]));
        let topicData = null;
        try { topicData = ctxTopicData(module, Number(lessonIndex)); } catch (_) {}
        const chainLength = Array.isArray(topicData?.chain) ? topicData.chain.length : 0;

        for (const term of requiredTerms || []) {
          counters.requiredOccurrences += 1;
          const relation = topicByNorm.get(norm(term));
          if (!relation) {
            issues.push({ type: 'missing-topic-term-map', module: module.id, lessonIndex, term });
            continue;
          }
          counters.topicMappings += 1;
          const kind = relation.kind || 'direct';
          counters.contextualKinds[kind] = (counters.contextualKinds[kind] || 0) + 1;
          if (glossaryNorm.has(norm(term))) counters.glossaryMatches += 1;
          else issues.push({ type: 'missing-glossary-entry', module: module.id, lessonIndex, term });

          for (const step of relation.steps || []) {
            if (!Number.isInteger(step) || step < 0 || step >= chainLength) {
              issues.push({ type: 'invalid-step-index', module: module.id, lessonIndex, term, step, chainLength });
            }
          }
          if (Number.isInteger(relation.primary) && !relation.steps?.includes(relation.primary)) {
            issues.push({ type: 'primary-outside-steps', module: module.id, lessonIndex, term, primary: relation.primary });
          }
        }
      }
    }
    return { counters, issues };
  });

  await attachJson(testInfo, 'context-data-audit.json', audit);
  expect(audit.counters.modules).toBe(MODULE_COUNT);
  expect(audit.counters.anatomyMappings).toBe(audit.counters.anatomyParts);
  expect(audit.counters.topicMappings).toBe(audit.counters.requiredOccurrences);
  expect(audit.issues).toEqual([]);
});

for (let moduleIndex = 0; moduleIndex < MODULE_COUNT; moduleIndex += 1) {
  test(`@coverage anatomia contextual · módulo ${String(moduleIndex + 1).padStart(2, '0')}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'A cobertura contextual roda no perfil móvel.');
    test.setTimeout(90_000);
    await openModule(page, moduleIndex);

    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const componentCount = await page.locator('#md-anat .anat-chip').count();
    const results = [];
    const failures = [];

    for (let chipIndex = 0; chipIndex < componentCount; chipIndex += 1) {
      const chip = page.locator('#md-anat .anat-chip').nth(chipIndex);
      const label = (await chip.textContent())?.trim();
      const context = { moduleIndex: moduleIndex + 1, moduleName, chipIndex, component: label };
      console.log('[anatomy-context]', JSON.stringify(context));

      try {
        await chip.click();
        await expect(page.locator('#term-modal')).toBeVisible();
        await expect(page.locator('#tm-title')).not.toHaveText('');
        const mechanism = page.locator('#tm-mech .ctx-mech');
        await expect(mechanism).toHaveCount(1);
        await mechanism.locator('summary').click();
        const contextualSteps = await mechanism.locator('.ctx-step').count();
        expect(contextualSteps).toBeGreaterThan(0);
        results.push({ ...context, contextualSteps });
      } catch (error) {
        failures.push({ ...context, error: String(error) });
      } finally {
        try { await closeTermModal(page, context); }
        catch (error) { failures.push({ ...context, phase: 'close', error: String(error) }); }
      }
    }

    await attachJson(testInfo, `anatomy-context-${moduleIndex + 1}.json`, { results, failures });
    expect(failures).toEqual([]);
    expect(results.length).toBe(componentCount);
  });

  test(`@coverage termos clicáveis · módulo ${String(moduleIndex + 1).padStart(2, '0')}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'A amostra contextual roda no perfil móvel.');
    test.setTimeout(90_000);
    await openModule(page, moduleIndex);
    await revealLessons(page);

    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const totalTerms = await page.locator('#md-lessons .gterm:visible').count();
    const sampleCount = Math.min(totalTerms, 8);
    const samples = [];
    const failures = [];

    for (let termIndex = 0; termIndex < sampleCount; termIndex += 1) {
      const term = page.locator('#md-lessons .gterm:visible').nth(termIndex);
      const label = (await term.textContent())?.trim();
      const lessonId = await term.evaluate((node) => node.closest('.lesson')?.id || null);
      const context = { moduleIndex: moduleIndex + 1, moduleName, termIndex, lessonId, term: label };
      console.log('[term-context]', JSON.stringify(context));

      try {
        // Posiciona o termo longe do cabeçalho sticky antes do clique real.
        await term.evaluate((node) => {
          node.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'nearest'
          });
        });
        await expect(term).toBeVisible();
        await term.click({ timeout: 10_000 });
        await expect(page.locator('#term-modal')).toBeVisible();
        const title = (await page.locator('#tm-title').textContent())?.trim();
        const definition = (await page.locator('#tm-def').textContent())?.trim();
        expect(normalize(title).length).toBeGreaterThan(0);
        expect(normalize(definition).length).toBeGreaterThan(0);
        await expect(page.locator('#tm-mech .ctx-mech')).toHaveCount(1);
        samples.push({ ...context, modalTitle: title });
      } catch (error) {
        failures.push({ ...context, error: String(error) });
      } finally {
        try { await closeTermModal(page, context); }
        catch (error) { failures.push({ ...context, phase: 'close', error: String(error) }); }
      }
    }

    await attachJson(testInfo, `term-samples-${moduleIndex + 1}.json`, { samples, failures });
    expect(failures).toEqual([]);
    expect(samples.length).toBe(sampleCount);
  });

  test(`@visual módulo ${String(moduleIndex + 1).padStart(2, '0')} sem overflow`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'A auditoria visual completa roda no perfil móvel.');
    test.setTimeout(90_000);
    const screenshotDir = path.join(testInfo.outputDir, 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });

    await openModule(page, moduleIndex);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim() || `module-${moduleIndex + 1}`;
    const safeName = `${String(moduleIndex + 1).padStart(2, '0')}-${normalize(moduleName).replace(/\s+/g, '-')}`;
    const issues = [];

    await page.locator('#vis-tab-anatomy').click();
    await page.screenshot({ ...SHOT, path: path.join(screenshotDir, `${safeName}-anatomia.png`) });
    issues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, mode: 'anatomia' })));

    await page.locator('#vis-tab-functional').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    await page.screenshot({ ...SHOT, path: path.join(screenshotDir, `${safeName}-mecanismo.png`) });
    issues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, mode: 'mecanismo' })));

    const vertical = await inspectVerticalMechanism(page);
    if (vertical.pageOverflow) issues.push({ type: 'page-overflow', ...vertical });
    if (vertical.trackHorizontalScroll) issues.push({ type: 'func-track-horizontal-scroll', ...vertical });
    if (vertical.overflowingSteps.length) issues.push({ type: 'func-step-overflows-track', ...vertical });

    await attachJson(testInfo, `layout-module-${moduleIndex + 1}.json`, { moduleIndex: moduleIndex + 1, moduleName, vertical, issues });
    expect(issues).toEqual([]);
  });
}

for (const viewport of MOBILE_VIEWPORTS) {
  test(`@visual mecanismo vertical em ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'A verificação usa dimensões móveis.');
    test.setTimeout(180_000);
    await page.setViewportSize(viewport);
    await boot(page);
    const failures = [];

    for (let moduleIndex = 0; moduleIndex < MODULE_COUNT; moduleIndex += 1) {
      await openModule(page, moduleIndex);
      await page.locator('#vis-tab-functional').click();
      await expect(page.locator('#func-track .func-step').first()).toBeVisible();
      const inspection = await inspectVerticalMechanism(page);
      if (inspection.pageOverflow || inspection.trackHorizontalScroll || inspection.overflowingSteps.length) {
        failures.push({ viewport, moduleIndex: moduleIndex + 1, ...inspection });
      }
    }

    await attachJson(testInfo, `vertical-mechanism-${viewport.width}x${viewport.height}.json`, failures);
    expect(failures).toEqual([]);
  });

  test(`@visual salto contextual visível em ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Verificação do salto contextual em mobile.');
    test.setTimeout(90_000);
    await page.setViewportSize(viewport);
    await boot(page);
    await openModule(page, 1);

    const chip = page.locator('#md-anat .anat-chip').first();
    await chip.click();
    await expect(page.locator('#term-modal')).toBeVisible();
    const mechanism = page.locator('#tm-mech .ctx-mech');
    await expect(mechanism).toHaveCount(1);
    await mechanism.locator('summary').click();
    await mechanism.locator('.ctx-open').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    await expect(page.locator('#func-track .func-step.active')).toBeVisible();

    const positioning = await page.evaluate(() => {
      const doc = document.documentElement;
      const active = document.querySelector('#func-track .func-step.active');
      const track = document.getElementById('func-track');
      const header = document.querySelector('header.top');
      if (!active || !track) return null;
      const activeRect = active.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      return {
        pageScrollWidth: doc.scrollWidth,
        pageClientWidth: doc.clientWidth,
        activeLeft: Math.round(activeRect.left),
        activeRight: Math.round(activeRect.right),
        activeTop: Math.round(activeRect.top),
        activeBottom: Math.round(activeRect.bottom),
        trackLeft: Math.round(trackRect.left),
        trackRight: Math.round(trackRect.right),
        headerBottom: Math.round(header?.getBoundingClientRect().bottom || 0),
        viewportHeight: window.innerHeight
      };
    });

    expect(positioning).not.toBeNull();
    expect(positioning.pageScrollWidth).toBeLessThanOrEqual(positioning.pageClientWidth + 1);
    expect(positioning.activeLeft).toBeGreaterThanOrEqual(positioning.trackLeft - 1);
    expect(positioning.activeRight).toBeLessThanOrEqual(positioning.trackRight + 1);
    expect(positioning.activeTop).toBeGreaterThanOrEqual(positioning.headerBottom - 1);
    expect(positioning.activeBottom).toBeLessThanOrEqual(positioning.viewportHeight + 1);

    await attachJson(testInfo, `contextual-jump-${viewport.width}x${viewport.height}.json`, positioning);
  });
}

test('@smoke orientação retrato declarada', async ({ page }) => {
  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestHref).toBe('manifest.webmanifest');

  const response = await page.request.get(new URL(manifestHref, page.url()).toString());
  expect(response.ok()).toBeTruthy();
  const manifest = await response.json();
  expect(manifest.orientation).toBe('portrait-primary');
});

test('@smoke acessibilidade estrutural básica', async ({ page }, testInfo) => {
  const audit = await page.evaluate(() => {
    const duplicateIds = [];
    const idCounts = new Map();
    document.querySelectorAll('[id]').forEach((el) => idCounts.set(el.id, (idCounts.get(el.id) || 0) + 1));
    for (const [id, count] of idCounts) if (count > 1) duplicateIds.push({ id, count });

    const unnamedButtons = [];
    document.querySelectorAll('button').forEach((button) => {
      const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
      if (!label) unnamedButtons.push({ id: button.id || null, className: String(button.className || '') });
    });

    const unlabeledImages = [];
    document.querySelectorAll('svg[role="img"]').forEach((svg) => {
      if (!svg.getAttribute('aria-label') && !svg.querySelector('title')) {
        unlabeledImages.push({ className: String(svg.className?.baseVal || svg.className || '') });
      }
    });

    return { duplicateIds, unnamedButtons, unlabeledImages };
  });

  await attachJson(testInfo, 'a11y-structural-audit.json', audit);
  expect(audit.duplicateIds).toEqual([]);
  expect(audit.unnamedButtons).toEqual([]);
  expect(audit.unlabeledImages).toEqual([]);
});

// A busca é a única entrada não confiável do app a alcançar o DOM. O ramo
// "nada encontrado" chegou a inserir a query crua via innerHTML, então
// digitar uma tag no campo executava script com acesso ao localStorage —
// isto é, a todo o progresso do aluno.
test('@smoke a busca escapa o que o aluno digita', async ({ page }) => {
  // src inválido de propósito: o carregamento falha, o onerror dispara e o
  // script roda — é o que acontecia antes do escape. O `hits` abaixo trava a
  // premissa: se um dia algum token deste payload passar a casar com o
  // índice, o teste falha avisando, em vez de exercitar o ramo errado em
  // silêncio.
  const payload = '<img src=zzqx onerror="window.__xss=1">';

  const hits = await page.evaluate((p) => searchAll(p).length, payload);
  expect(hits, 'o payload precisa não ter resultados para cair no ramo "nada encontrado"').toBe(0);

  await page.locator('#sc-fab').click();
  await expect(page.locator('#search-modal')).toBeVisible();
  await page.locator('#sc-input').fill(payload);
  await expect(page.locator('#sc-body .sc-empty')).toBeVisible();

  expect(await page.evaluate(() => window.__xss), 'a injeção executou').toBeUndefined();
  await expect(page.locator('#sc-body img'), 'a tag injetada virou elemento').toHaveCount(0);
  await expect(page.locator('#sc-body .sc-empty b')).toHaveText(payload);

  // O mesmo pelo caminho com espaços, que percorre os outros ramos de render.
  await page.locator('#sc-input').fill('<svg onload="window.__xss=1"> talamo');
  await expect(page.locator('#sc-body')).not.toBeEmpty();
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  await expect(page.locator('#sc-body svg[onload]')).toHaveCount(0);
});

// applyImportedState foi separada do input justamente "p/ poder ser testada".
// É o único caminho de recuperação do progresso, que só existe neste aparelho.
test('@smoke backup: exportar, zerar e importar preserva o progresso', async ({ page }) => {
  const before = await page.evaluate(() => {
    state.xp = 420;
    state.lessons['neuronio-0'] = true;
    state.mastery['neuronio'] = 0.8;
    state.attempts = 7;
    saveNow();
    renderHeader();
    return { xp: state.xp, lessons: Object.keys(state.lessons).length, mastery: state.mastery['neuronio'], attempts: state.attempts };
  });
  const backup = await page.evaluate(() => JSON.stringify(state));
  await expect(page.locator('#hd-xp')).toHaveText('420');

  await page.evaluate(() => { state = defaultState(); saveNow(); renderHeader(); renderDashboard(); });
  expect(await page.evaluate(() => state.xp)).toBe(0);

  const imported = await page.evaluate((text) => applyImportedState(text), backup);
  expect(imported.ok, imported.err).toBe(true);

  const after = await page.evaluate(() => ({
    xp: state.xp, lessons: Object.keys(state.lessons).length,
    mastery: state.mastery['neuronio'], attempts: state.attempts
  }));
  expect(after).toEqual(before);
  await expect(page.locator('#hd-xp')).toHaveText('420');
  await expect(page.locator('#view-dashboard')).toHaveClass(/active/);

  // Um arquivo que não é backup precisa ser recusado sem destruir o que existe.
  for (const lixo of ['{"foo":1}', 'nao e json', '[]', 'null']) {
    const bad = await page.evaluate((t) => applyImportedState(t), lixo);
    expect(bad.ok, `aceitou entrada inválida: ${lixo}`).toBe(false);
    expect(bad.err).toBeTruthy();
  }
  expect(await page.evaluate(() => state.xp), 'entrada inválida corrompeu o estado').toBe(420);
});

test('@smoke quiz completo registra domínio, XP e conclusão', async ({ page }) => {
  await openModule(page, 0);
  // Fora do modo profundo as alternativas não nascem sob véu (.veiled é
  // display:none) e o avanço é um botão simples, sem a auto-avaliação.
  await page.evaluate(() => { state.deepMode = false; });

  const xpBefore = await page.evaluate(() => state.xp);
  await page.evaluate(() => startQuiz());
  await expect(page.locator('#view-quiz')).toHaveClass(/active/);

  const total = await page.evaluate(() => MODULES[quiz.mod].quiz.length);
  expect(total).toBeGreaterThan(0);

  for (let i = 0; i < total; i += 1) {
    await expect(page.locator('#qz-count')).toHaveText(
      `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
    );
    // shuffleOptions embaralha a cada questão, então a correta vem do estado.
    const correct = await page.evaluate(() => quiz.opts.findIndex((o) => o.correct));
    expect(correct).toBeGreaterThanOrEqual(0);
    await page.locator(`#qz-opts .opt[data-k="${correct}"]`).click();
    await expect(page.locator('#qz-fb .fb.right')).toBeVisible();
    await page.locator('#qz-fb .fbnav .bigbtn').click();
  }

  await expect(page.locator('#view-result')).toHaveClass(/active/);
  const after = await page.evaluate(() => {
    const id = MODULES[0].id;
    return { xp: state.xp, mastery: state.mastery[id], done: Boolean(state.doneQuiz[id]), correct: state.correctTotal };
  });
  expect(after.mastery, 'acertar tudo deve dar domínio 1').toBe(1);
  expect(after.done).toBe(true);
  expect(after.correct).toBe(total);
  expect(after.xp, 'o quiz não creditou XP').toBeGreaterThan(xpBefore);
});

// O registro do service worker foi por muito tempo um no-op, então o app tinha
// manifesto e ícones mas nunca abria offline. Este teste é o que garante que o
// caminho todo — registro, precache e resposta a partir do cache — funciona.
test('@smoke service worker registra e o app abre offline', async ({ page, context }) => {
  const support = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'sem-suporte';
    const registration = await navigator.serviceWorker.ready;
    return registration.active ? 'ativo' : 'sem-worker-ativo';
  });
  expect(support).toBe('ativo');

  // Espera o precache concluir. O nome do cache não é fixado aqui de propósito:
  // ele carrega a VERSION do sw.js e mudaria a cada release.
  await page.waitForFunction(async () => {
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      if ((await cache.keys()).length >= 6) return true;
    }
    return false;
  }, null, { timeout: 20_000 });

  const audit = runtimeAudit.get(page);
  if (audit) audit.expectNetworkFailures = true;

  await context.setOffline(true);
  try {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('#view-dashboard')).toHaveClass(/active/);
    await expect(page.locator('.card'), 'os módulos não renderizaram offline').toHaveCount(MODULE_COUNT);
    // A tipografia embutida tem de sobreviver ao offline junto com o resto.
    const faces = await page.evaluate(() => document.fonts.size);
    expect(faces, 'nenhum @font-face disponível offline').toBeGreaterThan(0);
  } finally {
    await context.setOffline(false);
  }
});

/* O progresso do aluno só existe no aparelho dele. As duas formas de perdê-lo
   eram silenciosas: um JSON corrompido virava estado zero e era sobrescrito
   pelo primeiro save, e um localStorage que recusa escrita deixava o app rodar
   sem gravar nada. Estes três testes cobrem os dois casos e o caminho saudável. */

const STORE_KEY = 'neurolab-state-v1';

test('@smoke progresso ilegível é preservado e a falha aparece na tela', async ({ page }) => {
  const corrompido = '{"xp":990,"lessons":{"neuronio-0":true},TRUNCA';
  await bootComArmazenamento(page, ([k, v]) => {
    localStorage.setItem(k, v);
  }, [STORE_KEY, corrompido]);

  await expect(page.locator('#bk-integridade')).toBeVisible();
  await expect(page.locator('#bk-integridade')).toContainText('não foi possível ler', { ignoreCase: true });
  await expect(page.locator('#bk-integridade button[onclick*="bk-file"]')).toBeVisible();
  await expect(page.locator('#bk-info')).toContainText('não pôde ser lido');

  const quarentena = await page.evaluate((k) => {
    const chave = Object.keys(localStorage).find((x) => x.startsWith(k + ':corrompido:'));
    return { chave, valor: chave ? localStorage.getItem(chave) : null };
  }, STORE_KEY);
  expect(quarentena.chave, 'o blob ilegível não foi posto em quarentena').toBeTruthy();
  expect(quarentena.valor).toBe(corrompido);

  // O ponto principal: era exatamente aqui que o dado morria antes.
  await page.evaluate(() => { state.xp = 5; saveNow(); });
  const depois = await page.evaluate((c) => localStorage.getItem(c), quarentena.chave);
  expect(depois, 'a quarentena foi destruída por um save posterior').toBe(corrompido);
});

test('@smoke storage que recusa escrita é detectado na carga', async ({ page }) => {
  await bootComArmazenamento(page, () => {
    Storage.prototype.setItem = function () {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    };
  });

  // Sem interação nenhuma: quem detecta é a sondagem do init.
  await expect(page.locator('#bk-integridade')).toBeVisible();
  await expect(page.locator('#bk-integridade')).toHaveClass(/grave/);
  await expect(page.locator('#bk-integridade')).toContainText('Nada está sendo salvo');
  await expect(page.locator('#bk-info')).toContainText('não está salvando');

  // Exportar é a saída real do aluno neste estado, e não depende do storage.
  await expect(page.locator('#bk-integridade button[onclick*="exportProgress"]')).toBeVisible();
  const download = page.waitForEvent('download', { timeout: 10_000 });
  await page.locator('#bk-integridade button[onclick*="exportProgress"]').click();
  expect((await download).suggestedFilename()).toMatch(/^neurolab-progresso-.*\.json$/);
});

test('@smoke estado saudável carrega sem aviso de integridade', async ({ page }) => {
  const salvo = JSON.stringify({ v: 3, xp: 640, lessons: { 'neuronio-0': true }, mastery: { neuronio: 0.9 } });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, salvo]);

  const estado = await page.evaluate(() => ({
    xp: state.xp, mastery: state.mastery['neuronio'],
    leitura: _falhaLeitura, escrita: _falhaEscrita
  }));
  expect(estado.xp).toBe(640);
  expect(estado.mastery).toBe(0.9);
  expect(estado.leitura).toBeNull();
  expect(estado.escrita).toBe(false);

  // Um banner que aparece sem motivo seria pior que o defeito original.
  await expect(page.locator('#bk-integridade')).toHaveCount(0);
  await expect(page.locator('#hd-xp')).toHaveText('640');

  const residuo = await page.evaluate((k) => Object.keys(localStorage)
    .filter((x) => x.startsWith(k + ':')), STORE_KEY);
  expect(residuo, 'sobrou quarentena ou chave de sondagem no storage').toEqual([]);

  await page.evaluate(() => { state.xp = 700; saveNow(); });
  const gravado = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)).xp, STORE_KEY);
  expect(gravado, 'a gravação normal parou de funcionar').toBe(700);
});

/* MEDIÇÃO — alcance do botão "Próxima" na revisão.

   O relato foi que, depois de responder, é preciso rolar a tela para chegar ao
   botão. O bloco "Por que apareceu agora?" que ficava acima da questão foi
   removido por redundância, mas ele não era a causa: .rv-card tem
   scroll-margin-top e focusCardTop rola o card para o topo, então aquele bloco
   já saía de vista antes de o aluno responder.

   A medição mostrou que o botão cabia na tela, mas com folga de apenas 74px no
   viewport de 360x800 — que a barra de endereço de um navegador real consome
   inteira. Daí o revealAfterAnswer, e daí o viewport de 360x620 abaixo, que
   representa a altura útil de um celular pequeno com a barra visível. É o caso
   em que o botão não cabe, e portanto o que de fato exercita a correção. */
const REVIEW_VIEWPORTS = [...MOBILE_VIEWPORTS, { width: 360, height: 620 }];
for (const viewport of REVIEW_VIEWPORTS) {
  test(`@visual alcance do botão da revisão em ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'A medição usa os viewports retrato.');
    await page.setViewportSize(viewport);

    // Semeia um tópico vencido para entrar na sessão de revisão.
    await page.evaluate(() => {
      const m = MODULES[0];
      const key = topicKey(m.id, 0);
      state.srs = {};
      state.srs[key] = { box: 0, due: startOfDay(Date.now()) - DAY, last: 0, reps: 1, lapses: 0 };
      state.topicMastery[key] = 0.5;
      startReview();
    });
    await expect(page.locator('#view-review')).toHaveClass(/active/);
    await expect(page.locator('#rv-body .rv-card')).toBeVisible();

    // O bloco removido não pode reaparecer.
    await expect(page.locator('.review-why')).toHaveCount(0);

    await page.locator('#rv-body .mq-options button').first().click();
    await expect(page.locator('#rv-fb .fbnav .bigbtn')).toBeVisible();
    // revealAfterAnswer rola em requestAnimationFrame e com behavior:'smooth'.
    // reducedMotion:'reduce' no config torna o scroll instantâneo, mas o frame
    // ainda precisa acontecer antes de medir.
    await page.waitForTimeout(400);

    const geo = await page.evaluate(() => {
      const btn = document.querySelector('#rv-fb .fbnav .bigbtn');
      const card = document.querySelector('#rv-body .rv-card');
      const header = document.querySelector('header.top');
      const r = btn.getBoundingClientRect();
      return {
        viewport: window.innerHeight,
        header: Math.round(header.getBoundingClientRect().height),
        alturaDoCard: Math.round(card.getBoundingClientRect().height),
        botaoTopo: Math.round(r.top),
        botaoBase: Math.round(r.bottom),
        visivelSemRolar: r.top >= 0 && r.bottom <= window.innerHeight,
        pixelsAbaixoDaDobra: Math.max(0, Math.round(r.bottom - window.innerHeight)),
        scrollY: Math.round(window.scrollY)
      };
    });

    // console.log de propósito: aparece no log do CI, que é onde vou ler os
    // números sem precisar baixar o artefato do relatório.
    console.log(`[medida ${viewport.width}x${viewport.height}] ${JSON.stringify(geo)}`);
    await attachJson(testInfo, `alcance-botao-${viewport.width}x${viewport.height}.json`, geo);

    expect(geo.botaoBase, 'o botão não foi renderizado').toBeGreaterThan(0);
    expect(geo.alturaDoCard, 'o card da revisão não tem altura').toBeGreaterThan(0);
    // O critério que a medição permitiu calibrar: depois de responder, o botão
    // de avançar tem de estar alcançável sem o aluno rolar a tela.
    expect(
      geo.visivelSemRolar,
      `botão fora da dobra em ${viewport.width}x${viewport.height}: ${geo.pixelsAbaixoDaDobra}px abaixo`
    ).toBe(true);
  });
}
