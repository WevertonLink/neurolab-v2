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

  // O aplicativo usa apenas arquivos da própria origem e não tem dependências
  // de terceiros em tempo de execução. Medir isso em todos os testes é o que
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



test('@smoke módulo oferece navegação local livre e alcançável', async ({ page }) => {
  await openModule(page, 0);
  const nav = page.locator('#md-section-nav');
  await expect(nav).toBeVisible();
  await expect(nav.locator('button')).toHaveCount(9); // visuais + 4 aulas + metáfora + mapa + fontes + teste

  const lessonButton = nav.locator('button').filter({ hasText: '2 ·' }).first();
  await expect(lessonButton).toBeVisible();
  await lessonButton.click();
  await page.waitForTimeout(250);
  const distance = await page.locator('#lesson-1').evaluate((el) => Math.abs(el.getBoundingClientRect().top));
  expect(distance, 'a navegação não aproximou a segunda aula da área visível').toBeLessThan(260);
});
test('@smoke dashboard, metadados e navegação principal', async ({ page }) => {
  await expect(page).toHaveTitle(/NeuroLab/i);
  await expect(page).toHaveTitle(/Estudo Interativo de Neurociência/i);
  await expect(page.locator('.card')).toHaveCount(MODULE_COUNT);
  await expect(page.locator('#vis-tab-anatomy')).toHaveText(/Anatomia/i);
  await expect(page.locator('#vis-tab-functional')).toHaveText(/Mecanismo/i);
  await expect(page.locator('#vis-tab-integrated')).toHaveText(/Visão integrada/i);

  const firstTitle = (await page.locator('.card .ct').first().textContent())?.trim();
  await page.locator('.card').first().click();
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('.mhead h2')).toContainText(firstTitle || '');
});

test('@smoke visão integrada abre e fecha pelo mesmo controle', async ({ page }) => {
  await openModule(page, 0);
  const tab = page.locator('#vis-tab-integrated');
  const panel = page.locator('#md-integrated');
  await expect(tab).toBeVisible();
  await expect(tab).toHaveText(/^Visão integrada$/i);
  await expect(tab).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();

  await tab.click();
  await expect(panel).toBeVisible();
  await expect(tab).toHaveText(/Fechar visão integrada/i);
  await expect(tab).toHaveAttribute('aria-expanded', 'true');
  const image = panel.locator('img');
  await expect(image).toHaveAttribute('alt', /dois neurônios/i);
  await expect.poll(async () => image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

  await tab.click();
  await expect(panel).toBeHidden();
  await expect(page.locator('#md-anat')).toBeVisible();
  await expect(tab).toHaveText(/^Visão integrada$/i);
  await expect(tab).toHaveAttribute('aria-expanded', 'false');

  await tab.click();
  await page.locator('.integrated-imgbtn').click();
  await expect(page.locator('#fig-zoom')).toBeVisible();
  const zoomImage = page.locator('#zoom-inner img');
  await expect.poll(async () => zoomImage.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  await page.locator('#zoom-close').click();
  await expect(page.locator('#fig-zoom')).toBeHidden();

  await openModule(page, 1);
  await expect(page.locator('#vis-tab-integrated')).toBeVisible();
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

    const integratedTab = page.locator('#vis-tab-integrated');
    await expect(integratedTab, `Módulo ${index + 1} sem visão integrada`).toBeVisible();
    await integratedTab.click();
    await expect(page.locator('#md-integrated')).toBeVisible();
    const integratedImage = page.locator('#md-integrated img');
    await expect.poll(async () => integratedImage.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

    summary.push({ index: index + 1, moduleName, anatomyComponents, mechanismSteps, integrated: true });
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

    const integratedTab = page.locator('#vis-tab-integrated');
    if (await integratedTab.isVisible()) {
      await integratedTab.click();
      await expect(page.locator('#md-integrated')).toBeVisible();
      await expect.poll(async () => page.locator('#md-integrated img').evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
      await page.screenshot({ ...SHOT, path: path.join(screenshotDir, `${safeName}-integrada.png`) });
      issues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, mode: 'integrada' })));
    }

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

/* O app pode estar aberto duas vezes: o atalho instalado e uma aba que o
   Android manteve viva em segundo plano. Cada janela carrega o estado uma vez
   e o guarda em memória; o 'visibilitychange' gravava sem perguntar. Bastava a
   janela velha ser escondida para ela escrever o retrato do dia em que abriu
   por cima do progresso real — em silêncio, e sem nada para o aluno ver além
   do próprio progresso menor. */

const SNAP_KEY = STORE_KEY + ':ultimo-bom';

test('@smoke janela ociosa não sobrescreve o progresso feito na outra', async ({ page, context }) => {
  const inicial = JSON.stringify({ v: 4, rev: 1, xp: 1000, attempts: 200, lessons: { 'neuronio-0': true } });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, inicial]);

  // A segunda janela é a que fica em segundo plano: carrega e não faz mais nada.
  // newPage não herda o addInitScript de limpeza, então ela lê o mesmo storage.
  const ociosa = await context.newPage();
  await ociosa.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(ociosa.locator('#view-dashboard')).toHaveClass(/active/);
  expect(await ociosa.evaluate(() => state.xp)).toBe(1000);

  // A janela ativa estuda de verdade.
  await page.evaluate(() => { state.xp = 2500; state.attempts = 400; saveNow(); });
  expect(await page.evaluate((k) => JSON.parse(localStorage.getItem(k)).xp, STORE_KEY)).toBe(2500);

  // Retrato velho preso na memória da janela ociosa, como acontece quando ela
  // ficou aberta desde ontem. Nada aqui foi mudado pelo aluno.
  await ociosa.evaluate(() => { state.xp = 1000; state.rev = 1; });
  await ociosa.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    window.dispatchEvent(new Event('pagehide'));
  });

  const gravado = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)).xp, STORE_KEY);
  expect(gravado, 'a janela ociosa sobrescreveu o progresso da janela ativa').toBe(2500);
  await ociosa.close();
});

test('@smoke a janela em segundo plano adota o que a outra acabou de salvar', async ({ page, context }) => {
  const inicial = JSON.stringify({ v: 4, rev: 1, xp: 1000, attempts: 200, lessons: { 'neuronio-0': true } });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, inicial]);

  const ociosa = await context.newPage();
  await ociosa.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(ociosa.locator('#view-dashboard')).toHaveClass(/active/);

  await page.evaluate(() => { state.xp = 2500; saveNow(); });

  // O evento 'storage' chega na outra janela: divergir deixa de ser possível.
  await expect.poll(() => ociosa.evaluate(() => state.xp), { timeout: 10_000 }).toBe(2500);
  await expect(ociosa.locator('#hd-xp')).toHaveText('2500');
  await ociosa.close();
});

test('@smoke progresso apagado do storage volta pela cópia interna', async ({ page, context }) => {
  const salvo = JSON.stringify({
    v: 4, xp: 1800, attempts: 300,
    lessons: { 'neuronio-0': true, 'neuronio-1': true }, doneQuiz: { neuronio: true }
  });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, salvo]);

  // A cópia interna nasce na primeira gravação, não na carga.
  await page.evaluate(() => saveNow());
  expect(await page.evaluate((k) => Boolean(localStorage.getItem(k)), SNAP_KEY)).toBe(true);

  // O registro principal some: evicção do sistema, limpeza, cota — tanto faz.
  await page.evaluate((k) => localStorage.removeItem(k), STORE_KEY);

  const reaberta = await context.newPage();
  await reaberta.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(reaberta.locator('#view-dashboard')).toHaveClass(/active/);

  expect(await reaberta.evaluate(() => state.xp), 'a cópia interna não foi usada').toBe(1800);
  await expect(reaberta.locator('#hd-xp')).toHaveText('1800');
  await expect(reaberta.locator('#bk-integridade')).toContainText('restaurado automaticamente');
  await expect(reaberta.locator('#bk-info')).toContainText('cópia interna');
  await reaberta.close();
});

test('@smoke reiniciar de propósito não é desfeito pela cópia interna', async ({ page, context }) => {
  const salvo = JSON.stringify({ v: 4, xp: 1800, attempts: 300, lessons: { 'neuronio-0': true } });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, salvo]);
  await page.evaluate(() => saveNow());
  expect(await page.evaluate((k) => Boolean(localStorage.getItem(k)), SNAP_KEY)).toBe(true);

  await page.evaluate(() => { window.confirm = () => true; resetProgress(); });

  // A chave volta a existir na mesma hora: reiniciar apaga a cópia e o saveNow
  // seguinte já grava a nova linha de base. O que não pode voltar é o progresso
  // antigo dentro dela — é isso que desfaria a decisão do aluno.
  const copia = await page.evaluate((k) => {
    const bruto = localStorage.getItem(k);
    return bruto === null ? null : JSON.parse(bruto).xp;
  }, SNAP_KEY);
  expect([null, 0], 'a cópia interna guardou o progresso que o aluno mandou apagar')
    .toContain(copia);

  const reaberta = await context.newPage();
  await reaberta.goto('./?audit=1', { waitUntil: 'domcontentloaded' });
  await expect(reaberta.locator('#view-dashboard')).toHaveClass(/active/);
  expect(await reaberta.evaluate(() => state.xp)).toBe(0);
  await expect(reaberta.locator('#bk-integridade')).toHaveCount(0);
  await reaberta.close();
});

test('@smoke o backup exportado carrega a própria data', async ({ page }) => {
  const salvo = JSON.stringify({ v: 4, xp: 900, lessons: { 'neuronio-0': true }, lastBackupAt: 1 });
  await bootComArmazenamento(page, ([k, v]) => { localStorage.setItem(k, v); }, [STORE_KEY, salvo]);

  const antes = Date.now();
  const download = page.waitForEvent('download', { timeout: 10_000 });
  await page.evaluate(() => exportProgress());
  const stream = await (await download).createReadStream();
  let texto = '';
  for await (const chunk of stream) texto += chunk;

  // O carimbo era aplicado depois de serializar, então todo arquivo saía com a
  // data do backup anterior — e uma gravação perdida ficava invisível bem no
  // dado que serviria para percebê-la.
  const exportado = JSON.parse(texto);
  expect(exportado.lastBackupAt, 'o arquivo saiu com a data do backup anterior')
    .toBeGreaterThanOrEqual(antes);
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

// Os termos já eram clicáveis no texto da aula, e não no feedback do quiz — quem
// aprendia o gesto tentava usá-lo depois de responder e não acontecia nada.
// O teste guarda as duas decisões de desenho: a explicação nasce embutida, e o
// modal do termo NÃO abre por cima da questão. Foi assim que a busca quebrou uma
// vez, com um painel abrindo atrás do outro por disputa de sobreposição.
test('@smoke o termo no feedback do quiz abre explicação embutida, não modal', async ({ page }) => {
  await openModule(page, 0);

  // Nem todo feedback menciona termo do glossário — a maioria não menciona —
  // então fixar uma questão específica deixaria o teste refém de edição de texto.
  // Procura a primeira que ligue algum.
  let host = null;
  for (let li = 0; li < 3 && !host; li++) {
    const existe = await page.evaluate((i) => {
      if (typeof startMiniQuiz !== 'function') return false;
      if (!document.getElementById('mini-' + i)) return false;
      startMiniQuiz(i);
      return true;
    }, li);
    if (!existe) continue;

    const box = page.locator(`#mini-${li}`);
    for (let n = 0; n < 4; n++) {
      await page.evaluate((i) => {
        const b = document.querySelector(`#mini-${i} .mq-options button`);
        if (b) b.click();
      }, li);
      if (await box.locator('.mq-feedback .fbterm').count() > 0) { host = box; break; }
      const avancou = await page.evaluate((i) => {
        const b = document.querySelector(`#mini-${i} .mq-feedback .fbnav .bigbtn`);
        if (!b) return false;
        b.click();
        return true;
      }, li);
      if (!avancou) break;
    }
  }

  expect(host, 'nenhum feedback do módulo 01 ligou termo do glossário').not.toBeNull();

  const termo = host.locator('.mq-feedback .fbterm').first();
  await expect(termo).toHaveAttribute('aria-expanded', 'false');
  await expect(host.locator('.fbterm-exp')).toHaveCount(0);

  await termo.click();
  await expect(host.locator('.fbterm-exp')).toHaveCount(1);
  await expect(termo).toHaveAttribute('aria-expanded', 'true');
  await expect(host.locator('.fbterm-exp')).toContainText(/\S/);
  await expect(page.locator('#term-modal')).toBeHidden();

  await termo.click();
  await expect(host.locator('.fbterm-exp')).toHaveCount(0);
  await expect(termo).toHaveAttribute('aria-expanded', 'false');
});

test('@smoke Modo Domínio existe desde a prévia e não bloqueia o percurso', async ({ page }) => {
  const entry = page.locator('#db-domain-entry');
  await expect(entry).toBeVisible();
  await expect(entry).toContainText(/Modo Domínio/i);
  await expect(entry).toContainText(/prévia/i);

  await entry.locator('button').click();
  await expect(page.locator('#view-domain')).toHaveClass(/active/);
  await expect(page.locator('#dm-nav button')).toHaveCount(7);
  await expect(page.locator('.dm-metric')).toHaveCount(5);
  await expect(page.locator('.dm-action')).toHaveCount(4);

  await page.locator('#dm-nav button').filter({ hasText: 'Trilhas' }).click();
  await expect(page.locator('.dm-trail')).toHaveCount(4);

  await page.locator('#view-domain .backbtn').click();
  await expect(page.locator('#view-dashboard')).toHaveClass(/active/);
  await expect(page.locator('.card')).toHaveCount(MODULE_COUNT);
});

test('@smoke Modo Domínio registra resposta, mostra veredito e reconstrói sem repetir alternativas', async ({ page }) => {
  await page.evaluate(() => {
    MODULES.slice(0, 14).forEach((module) => {
      module.lessons.forEach((_, lessonIndex) => {
        const key = `${module.id}-${lessonIndex}`;
        state.lessons[key] = true;
        state.topicMastery[key] = 0.8;
      });
      state.mastery[module.id] = 0.8;
      state.doneQuiz[module.id] = true;
    });
    renderDashboard();
  });
  await page.locator('#db-domain-entry button').click();
  await page.locator('#dm-nav button').filter({ hasText: 'Casos' }).click();
  await page.locator('.dm-case-card').first().locator('button').click();
  await page.locator('.dm-options button').first().click();

  const feedback = page.locator('.dm-feedback');
  await expect(feedback).toBeVisible();
  await expect(feedback).toContainText(/cadeia ficou de pé/i);
  await expect(feedback.locator('.dm-choice-diagnosis')).toBeVisible();
  await expect(feedback.locator('.dm-choice-diagnosis')).toContainText(/SUA ESCOLHA/i);
  const feedbackPosition = await feedback.evaluate((el) => ({ top: el.getBoundingClientRect().top, height: innerHeight }));
  expect(feedbackPosition.top).toBeGreaterThanOrEqual(0);
  expect(feedbackPosition.top).toBeLessThan(feedbackPosition.height * 0.6);
  await feedback.locator('.dm-option-audit summary').click();
  await expect(feedback.locator('.dm-option-audit article')).toHaveCount(4);
  await expect(feedback.locator('.dm-option-audit article.right')).toHaveCount(1);

  await feedback.locator('.dm-reconstruct-btn').click();
  await expect(page.locator('.dm-reconstruct')).toBeVisible();
  await expect(page.locator('.dm-options')).toHaveCount(0);
  await expect(page.locator('.dm-reconstruct')).toContainText(/A pergunta anterior não é repetida/i);

  const order = await page.evaluate(() => {
    const r = DOMAIN_SESSION.reconstruction;
    const item = DOMAIN_CASES.find(x => x.id === r.id);
    return item.chain.map(step => r.available.findIndex(entry => entry.text === step));
  });
  for (const position of order) await page.locator('.dm-chain-pool button').nth(position).click();
  await expect(page.locator('.dm-reconstruct-result.right')).toBeVisible();

  const saved = await page.evaluate(() => ({
    rec: state.domain.cases['noite-decisao'],
    log: state.domain.activityLog
  }));
  expect(saved.rec.attempts).toBe(1);
  expect(saved.rec.lastResult).toBe(1);
  expect(saved.rec.reconBest).toBe(1);
  expect(saved.log.some(row => row.kind === 'reconstruction' && row.result === 1)).toBe(true);
});

/* A reconstrução só tinha uma saída: acertar. Quem travava ficava permutando
   os passos, o que não treina nada, e quem tinha dez minutos ficava preso. A
   saída existe agora — e o que ela não pode fazer é virar um atalho: ver a
   cadeia não pode marcar reconBest nem deixar o pool clicável com a resposta
   na tela, senão o registro passa a dizer "reconstruiu" para quem copiou. */
test('@smoke quem trava pode ver a cadeia, e ver não conta como reconstruir', async ({ page }) => {
  await page.evaluate(() => {
    MODULES.slice(0, 14).forEach((module) => {
      module.lessons.forEach((_, lessonIndex) => {
        const key = `${module.id}-${lessonIndex}`;
        state.lessons[key] = true;
        state.topicMastery[key] = 0.8;
      });
      state.mastery[module.id] = 0.8;
      state.doneQuiz[module.id] = true;
    });
    renderDashboard();
  });
  await page.locator('#db-domain-entry button').click();
  await page.locator('#dm-nav button').filter({ hasText: 'Casos' }).click();
  await page.locator('.dm-case-card').first().locator('button').click();
  await page.locator('.dm-options button').first().click();
  await page.locator('.dm-feedback .dm-reconstruct-btn').click();
  await expect(page.locator('.dm-reconstruct')).toBeVisible();

  // A saída não é a primeira coisa que aparece: só depois de encostar na tarefa.
  await expect(page.locator('.dm-reveal-link')).toHaveCount(0);
  await page.locator('.dm-chain-pool button').first().click();
  await expect(page.locator('.dm-reveal-link')).toBeVisible();

  await page.locator('.dm-reveal-link').click();
  const revelada = page.locator('.dm-reconstruct-result.revealed');
  await expect(revelada).toBeVisible();
  await expect(revelada).toContainText('Ver não é reconstruir');

  // A cadeia aparece inteira e na ordem do dado, não na ordem embaralhada.
  const mostrada = await revelada.locator('.dm-selected-chain li span').allTextContents();
  const esperada = await page.evaluate(() => {
    const r = DOMAIN_SESSION.reconstruction;
    return DOMAIN_CASES.find((x) => x.id === r.id).chain;
  });
  expect(mostrada).toEqual(esperada);

  // Com a resposta na tela, montar deixa de ser possível.
  await expect(page.locator('.dm-chain-pool button:not([disabled])')).toHaveCount(0);

  const saved = await page.evaluate(() => ({
    rec: state.domain.cases['noite-decisao'],
    log: state.domain.activityLog
  }));
  expect(saved.rec.reconRevealed, 'a cadeia vista não ficou registrada').toBe(true);
  expect(saved.rec.reconBest, 'ver a cadeia contou como reconstruir').not.toBe(1);
  expect(saved.log.some((row) => row.kind === 'reconstruction-reveal')).toBe(true);

  // E a lista passa a dizer o que aconteceu, em vez de omitir.
  await page.locator('#dm-nav button').filter({ hasText: 'Casos' }).click();
  await expect(page.locator('.dm-case-card').first()).toContainText('cadeia vista, não reconstruída');
});

test('@coverage banco do Modo Domínio mantém padrão adversarial', async ({ page }) => {
  const report = await page.evaluate(() => {
    const items = [...DOMAIN_COUNTERFACTUALS, ...DOMAIN_CASES];
    const positions = [0, 0, 0, 0];
    items.forEach((item) => { positions[item.correct] += 1; });
    return {
      total: items.length,
      positions,
      allFour: items.every((item) => item.options.length === 4 && item.optionFeedback.length === 4),
      unique: items.every((item) => new Set(item.options).size === 4),
      counterModules: new Set(DOMAIN_COUNTERFACTUALS.map((item) => item.module)).size,
      integratedCases: DOMAIN_CASES.every((item) => item.modules.length >= 3)
    };
  });
  expect(report.total).toBe(24);
  expect(report.positions).toEqual([6, 6, 6, 6]);
  expect(report.allFour).toBe(true);
  expect(report.unique).toBe(true);
  expect(report.counterModules).toBe(16);
  expect(report.integratedCases).toBe(true);
});

test('@smoke sessão guiada mantém foco, avança linearmente e registra o bloco', async ({ page }) => {
  await page.locator('#db-domain-entry button').click();
  await expect(page.locator('.dm-focus-card')).toBeVisible();
  await page.locator('.dm-focus-card button').click();
  await expect(page.locator('#view-domain')).toHaveClass(/focus-session/);
  await expect(page.locator('.dm-focus-rail')).toContainText(/1 de 4/i);
  await expect(page.locator('#dm-nav')).toBeHidden();
  const firstItem = await page.evaluate(() => domainCurrentFocus().current);

  await page.locator('.dm-options button').first().click();
  await expect(page.locator('.dm-feedback')).toBeVisible();
  await page.locator('.dm-next').click();
  await expect(page.locator('.dm-focus-rail')).toContainText(/2 de 4/i);

  const session = await page.evaluate(() => state.domain.currentSession);
  expect(session.index).toBe(1);
  expect(session.completed).toHaveLength(1);
  expect(session.queue[session.index]).not.toEqual(firstItem);
  await expect(page.locator('.dm-detail')).toHaveAttribute(
    'data-focus-item',
    `${session.queue[session.index].type}:${session.queue[session.index].id}`
  );

  // A barra sticky não pode esconder o contexto da nova atividade. O título e
  // o enunciado devem começar abaixo dela, especialmente em viewport mobile.
  const placement = await page.evaluate(() => {
    const rail = document.querySelector('.dm-focus-rail')?.getBoundingClientRect();
    const kicker = document.querySelector('.dm-detail-k')?.getBoundingClientRect();
    const heading = document.querySelector('.dm-detail > h3')?.getBoundingClientRect();
    const scenario = document.querySelector('.dm-detail .dm-scenario')?.getBoundingClientRect();
    return {
      railBottom: rail?.bottom ?? 0,
      kickerTop: kicker?.top ?? -1,
      headingTop: heading?.top ?? -1,
      scenarioTop: scenario?.top ?? -1,
      viewport: innerHeight
    };
  });
  expect(placement.kickerTop, 'o cabeçalho da atividade ficou atrás da barra da sessão').toBeGreaterThanOrEqual(placement.railBottom + 8);
  expect(placement.headingTop, 'o título da atividade não ficou visível').toBeGreaterThan(placement.kickerTop);
  expect(placement.scenarioTop, 'o enunciado da atividade não ficou visível').toBeGreaterThan(placement.headingTop);
  expect(placement.headingTop).toBeLessThan(placement.viewport * 0.7);
});
