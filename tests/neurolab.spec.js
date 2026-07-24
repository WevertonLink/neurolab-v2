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

async function openModule(page, index) {
  await page.evaluate((i) => {
    if (typeof openModule !== 'function') throw new Error('openModule não está disponível.');
    openModule(i);
  }, index);
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('#md-lessons .lesson').first()).toBeVisible();
}

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
  const audit = { consoleErrors: [], pageErrors: [], failedRequests: [] };
  runtimeAudit.set(page, audit);

  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (/fonts\.googleapis|fonts\.gstatic|favicon/i.test(text)) return;
    audit.consoleErrors.push(text);
  });

  page.on('pageerror', (error) => audit.pageErrors.push(error.stack || error.message));
  page.on('requestfailed', (request) => {
    const url = request.url();
    if (/fonts\.googleapis|fonts\.gstatic|favicon/i.test(url)) return;
    audit.failedRequests.push({ url, error: request.failure()?.errorText || 'unknown' });
  });

  await boot(page);
  testInfo.annotations.push({ type: 'target', description: page.url() });
});

test.afterEach(async ({ page }, testInfo) => {
  const audit = runtimeAudit.get(page);
  if (!audit) return;
  await attachJson(testInfo, 'runtime-audit.json', audit);
  expect.soft(audit.pageErrors, 'Erros JavaScript não tratados').toEqual([]);
  expect.soft(audit.consoleErrors, 'Erros no console').toEqual([]);
  expect.soft(audit.failedRequests, 'Requisições internas que falharam').toEqual([]);
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
        // Cobertura exaustiva: ativa o mesmo handler DOM sem depender do
        // auto-scroll/hit-testing repetitivo do Playwright sob o header sticky.
        await term.evaluate((node) => node.click());
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
    await page.screenshot({ path: path.join(screenshotDir, `${safeName}-anatomia.png`), fullPage: true });
    issues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, mode: 'anatomia' })));

    await page.locator('#vis-tab-functional').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, `${safeName}-mecanismo.png`), fullPage: true });
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


test('@smoke termos aceitam clique físico em posições representativas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'O hit-testing físico roda no perfil móvel.');
  test.setTimeout(90_000);

  for (const moduleIndex of [0, 7, 15]) {
    await openModule(page, moduleIndex);
    const terms = page.locator('#md-lessons .gterm:visible');
    const count = await terms.count();
    expect(count, `Módulo ${moduleIndex + 1} sem termos visíveis`).toBeGreaterThan(0);

    const indexes = [...new Set([0, Math.max(0, count - 1)])];
    for (const termIndex of indexes) {
      const term = terms.nth(termIndex);
      const label = (await term.textContent())?.trim() || `termo-${termIndex}`;

      await term.evaluate((node) => {
        node.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
      });
      await page.waitForTimeout(50);

      const point = await term.evaluate((node) => {
        const r = node.getBoundingClientRect();
        const fractions = [0.5, 0.25, 0.75];
        for (const fy of fractions) {
          for (const fx of fractions) {
            const x = Math.max(1, Math.min(innerWidth - 2, r.left + r.width * fx));
            const y = Math.max(1, Math.min(innerHeight - 2, r.top + r.height * fy));
            const hit = document.elementFromPoint(x, y);
            if (hit && (hit === node || node.contains(hit))) return { x, y };
          }
        }
        return null;
      });

      expect(point, `Nenhum ponto clicável encontrado para “${label}” no módulo ${moduleIndex + 1}`).not.toBeNull();
      await page.mouse.click(point.x, point.y);
      await expect(page.locator('#term-modal')).toBeVisible();
      await expect(page.locator('#tm-def')).not.toHaveText('');
      await closeTermModal(page, { moduleIndex: moduleIndex + 1, termIndex, term: label });
    }
  }
});

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
