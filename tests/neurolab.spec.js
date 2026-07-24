const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const runtimeAudit = new WeakMap();

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
  await expect(page.locator('.card')).toHaveCount(16);
}

async function openModule(page, index) {
  await page.evaluate((i) => {
    if (typeof openModule !== 'function') throw new Error('openModule não está disponível.');
    openModule(i);
  }, index);
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('#md-lessons .lesson').first()).toBeVisible();
}

async function closeTermModal(page) {
  const modal = page.locator('#term-modal');
  if (await modal.isVisible()) {
    await page.locator('#tm-close').click();
    await expect(modal).toBeHidden();
  }
}

async function attachJson(testInfo, name, data) {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(data, null, 2)),
    contentType: 'application/json'
  });
}

async function collectLayoutIssues(page, scopeSelector) {
  return page.evaluate((selector) => {
    const scope = document.querySelector(selector) || document.body;
    const doc = document.documentElement;
    const viewportWidth = doc.clientWidth;
    const issues = [];
    const ignored = new Set(['SVG', 'PATH', 'LINE', 'CIRCLE', 'RECT', 'POLYLINE', 'POLYGON', 'G']);

    function scrollingAncestor(el) {
      for (let p = el.parentElement; p && p !== doc; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (s.overflowX === 'auto' || s.overflowX === 'scroll') return p;
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
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const container = scrollingAncestor(el);
      if (container) continue;
      if (r.right > viewportWidth + 3 || r.left < -3) {
        issues.push({
          type: 'horizontal-overflow',
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: String(el.className || '').slice(0, 160),
          left: Math.round(r.left),
          right: Math.round(r.right),
          viewportWidth
        });
      }
    }
    return issues.slice(0, 100);
  }, scopeSelector);
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
  await expect(page.locator('.card')).toHaveCount(16);
  await expect(page.locator('#vis-tab-anatomy')).toHaveText(/Anatomia/i);
  await expect(page.locator('#vis-tab-functional')).toHaveText(/Mecanismo/i);

  // Esta verificação detecta a inconsistência atualmente presente no HTML publicado.
  await expect.soft(page).toHaveTitle(/Fase 5/i);

  const firstTitle = (await page.locator('.card .ct').first().textContent())?.trim();
  await page.locator('.card').first().click();
  await expect(page.locator('#view-module')).toHaveClass(/active/);
  await expect(page.locator('.mhead h2')).toContainText(firstTitle || '');
});

test('@smoke os 16 módulos renderizam anatomia e mecanismo', async ({ page }, testInfo) => {
  const summary = [];
  for (let i = 0; i < 16; i += 1) {
    await openModule(page, i);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const chips = page.locator('#md-anat .anat-chip');
    const chipCount = await chips.count();

    await expect(page.locator('#vis-tab-functional')).toBeVisible();
    await page.locator('#vis-tab-functional').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    const stepCount = await page.locator('#md-functional .func-step').count();
    expect(stepCount, `Módulo ${i + 1} sem etapas no mecanismo`).toBeGreaterThan(0);

    summary.push({ index: i + 1, moduleName, anatomyComponents: chipCount, mechanismSteps: stepCount });
  }
  await attachJson(testInfo, 'modules-summary.json', summary);
});

test('@coverage integridade dos dados contextuais e dos termos essenciais', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'A auditoria de dados roda uma vez.');

  const audit = await page.evaluate(() => {
    const norm = (v) => String(v || '')
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

    const glossaryKeys = Object.keys(GLOSSARY || {});
    const glossaryNorm = new Set(glossaryKeys.map(norm));

    for (const module of MODULES || []) {
      const anatomy = (ANATOMY || {})[module.id];
      const anatomyMap = (CONTEXT_ANATOMY || {})[module.id];
      if (!anatomy) issues.push({ type: 'missing-anatomy', module: module.id });
      if (!anatomyMap) issues.push({ type: 'missing-anatomy-map', module: module.id });

      for (const part of anatomy?.parts || []) {
        counters.anatomyParts += 1;
        if (anatomyMap && Object.prototype.hasOwnProperty.call(anatomyMap, part.id)) {
          counters.anatomyMappings += 1;
        } else {
          issues.push({ type: 'unmapped-anatomy-part', module: module.id, part: part.id, label: part.label });
        }
      }

      const requiredByLesson = (CONTEXT_REQUIRED || {})[module.id] || {};
      const mappedByLesson = (CONTEXT_TOPIC_TERMS || {})[module.id] || {};

      for (const [lessonIndex, requiredTerms] of Object.entries(requiredByLesson)) {
        const topicMap = mappedByLesson[String(lessonIndex)] || {};
        const topicKeys = Object.keys(topicMap);
        const topicByNorm = new Map(topicKeys.map((key) => [norm(key), topicMap[key]]));
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
              issues.push({
                type: 'invalid-step-index', module: module.id, lessonIndex, term,
                step, chainLength
              });
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
  expect(audit.counters.modules).toBe(16);
  expect(audit.counters.anatomyMappings).toBe(audit.counters.anatomyParts);
  expect(audit.counters.topicMappings).toBe(audit.counters.requiredOccurrences);
  expect(audit.issues).toEqual([]);
});

test('@coverage todos os componentes anatômicos abrem o mecanismo contextual', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'A cobertura completa roda uma vez.');
  const results = [];
  const failures = [];

  for (let moduleIndex = 0; moduleIndex < 16; moduleIndex += 1) {
    await openModule(page, moduleIndex);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const chips = page.locator('#md-anat .anat-chip');
    const count = await chips.count();

    for (let chipIndex = 0; chipIndex < count; chipIndex += 1) {
      const chip = chips.nth(chipIndex);
      const label = (await chip.textContent())?.trim();
      try {
        await chip.click();
        await expect(page.locator('#term-modal')).toBeVisible();
        await expect(page.locator('#tm-title')).not.toHaveText('');
        const mechanism = page.locator('#tm-mech .ctx-mech');
        await expect(mechanism).toHaveCount(1);
        await mechanism.locator('summary').click();
        const contextualSteps = await mechanism.locator('.ctx-step').count();
        expect(contextualSteps).toBeGreaterThan(0);
        results.push({ moduleIndex: moduleIndex + 1, moduleName, component: label, contextualSteps });
      } catch (error) {
        failures.push({ moduleIndex: moduleIndex + 1, moduleName, component: label, error: String(error) });
      } finally {
        await closeTermModal(page);
      }
    }
  }

  await attachJson(testInfo, 'anatomy-context-results.json', { results, failures });
  expect(failures).toEqual([]);
  expect(results.length).toBeGreaterThanOrEqual(78);
});

test('@coverage amostra visual de termos clicáveis em todos os módulos', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'A amostra contextual roda uma vez.');
  const samples = [];
  const failures = [];

  for (let moduleIndex = 0; moduleIndex < 16; moduleIndex += 1) {
    await openModule(page, moduleIndex);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim();
    const visibleTerms = page.locator('#md-lessons .gterm:visible');
    const count = await visibleTerms.count();
    const sampleCount = Math.min(count, 8);

    for (let termIndex = 0; termIndex < sampleCount; termIndex += 1) {
      const term = visibleTerms.nth(termIndex);
      const label = (await term.textContent())?.trim();
      try {
        await term.click();
        await expect(page.locator('#term-modal')).toBeVisible();
        await expect(page.locator('#tm-title')).toContainText(label || '');
        await expect(page.locator('#tm-mech .ctx-mech')).toHaveCount(1);
        samples.push({ moduleIndex: moduleIndex + 1, moduleName, term: label });
      } catch (error) {
        failures.push({ moduleIndex: moduleIndex + 1, moduleName, term: label, error: String(error) });
      } finally {
        await closeTermModal(page);
      }
    }
  }

  await attachJson(testInfo, 'term-samples.json', { samples, failures });
  expect(failures).toEqual([]);
  expect(samples.length).toBeGreaterThan(0);
});

test('@visual capturas e verificação de estouro horizontal', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'As capturas completas rodam no perfil móvel.');
  const screenshotDir = path.join(testInfo.outputDir, 'screenshots');
  fs.mkdirSync(screenshotDir, { recursive: true });
  const layoutIssues = [];

  await page.screenshot({ path: path.join(screenshotDir, '00-dashboard.png'), fullPage: true });
  layoutIssues.push(...(await collectLayoutIssues(page, '#view-dashboard')).map((issue) => ({ ...issue, screen: 'dashboard' })));

  for (let moduleIndex = 0; moduleIndex < 16; moduleIndex += 1) {
    await openModule(page, moduleIndex);
    const moduleName = (await page.locator('.mhead h2').textContent())?.trim() || `module-${moduleIndex + 1}`;
    const safeName = `${String(moduleIndex + 1).padStart(2, '0')}-${normalize(moduleName).replace(/\s+/g, '-')}`;

    await page.locator('#vis-tab-anatomy').click();
    await page.screenshot({ path: path.join(screenshotDir, `${safeName}-anatomia.png`), fullPage: true });
    layoutIssues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, moduleIndex: moduleIndex + 1, moduleName, mode: 'anatomia' })));

    await page.locator('#vis-tab-functional').click();
    await expect(page.locator('#md-functional')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotDir, `${safeName}-mecanismo.png`), fullPage: true });
    layoutIssues.push(...(await collectLayoutIssues(page, '#view-module')).map((issue) => ({ ...issue, moduleIndex: moduleIndex + 1, moduleName, mode: 'mecanismo' })));
  }

  await attachJson(testInfo, 'layout-issues.json', layoutIssues);
  expect(layoutIssues).toEqual([]);
});

const MOBILE_VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 }
];

test('@visual mecanismo vertical sem estouro em viewports móveis', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'A verificação usa dimensões móveis.');
  const failures = [];

  for (const viewport of MOBILE_VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await boot(page);

    for (let mi = 0; mi < 16; mi += 1) {
      await openModule(page, mi);
      await page.locator('#vis-tab-functional').click();
      await expect(page.locator('#md-functional')).toBeVisible();
      await expect(page.locator('#func-track .func-step').first()).toBeVisible();

      const inspection = await page.evaluate(() => {
        const doc = document.documentElement;
        const track = document.getElementById('func-track');
        const steps = track ? Array.from(track.querySelectorAll('.func-step')) : [];
        const trackRect = track ? track.getBoundingClientRect() : null;
        const overflowingSteps = [];
        if (trackRect) {
          steps.forEach((step, idx) => {
            const r = step.getBoundingClientRect();
            if (r.left < trackRect.left - 1 || r.right > trackRect.right + 1) {
              overflowingSteps.push({
                index: idx,
                left: Math.round(r.left),
                right: Math.round(r.right),
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
          trackScrollWidth: track ? track.scrollWidth : 0,
          trackClientWidth: track ? track.clientWidth : 0,
          trackHorizontalScroll: track ? track.scrollWidth > track.clientWidth + 1 : false,
          stepCount: steps.length,
          overflowingSteps
        };
      });

      if (inspection.pageOverflow) {
        failures.push({
          viewport, moduleIndex: mi + 1,
          kind: 'page-scrollWidth-exceeds-clientWidth',
          pageScrollWidth: inspection.pageScrollWidth,
          pageClientWidth: inspection.pageClientWidth
        });
      }
      if (inspection.trackHorizontalScroll) {
        failures.push({
          viewport, moduleIndex: mi + 1,
          kind: 'func-track-horizontal-scroll',
          trackScrollWidth: inspection.trackScrollWidth,
          trackClientWidth: inspection.trackClientWidth
        });
      }
      if (inspection.overflowingSteps.length) {
        failures.push({
          viewport, moduleIndex: mi + 1,
          kind: 'func-step-overflows-track',
          overflows: inspection.overflowingSteps
        });
      }
    }
  }

  await attachJson(testInfo, 'vertical-mechanism-audit.json', failures);
  expect(failures).toEqual([]);
});

test('@visual salto contextual posiciona verticalmente a etapa ativa', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Verificação do salto contextual em mobile.');
  const failures = [];

  for (const viewport of MOBILE_VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
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
      if (!active || !track) return null;
      const ar = active.getBoundingClientRect();
      const tr = track.getBoundingClientRect();
      return {
        pageScrollWidth: doc.scrollWidth,
        pageClientWidth: doc.clientWidth,
        activeLeft: Math.round(ar.left),
        activeRight: Math.round(ar.right),
        activeTop: Math.round(ar.top),
        activeBottom: Math.round(ar.bottom),
        trackLeft: Math.round(tr.left),
        trackRight: Math.round(tr.right),
        viewportHeight: doc.clientHeight,
        viewportWidth: doc.clientWidth
      };
    });

    if (!positioning) {
      failures.push({ viewport, kind: 'missing-active-step' });
      continue;
    }
    if (positioning.pageScrollWidth > positioning.pageClientWidth + 1) {
      failures.push({ viewport, kind: 'page-overflow-after-jump', ...positioning });
    }
    if (positioning.activeLeft < positioning.trackLeft - 1 || positioning.activeRight > positioning.trackRight + 1) {
      failures.push({ viewport, kind: 'active-step-exceeds-track', ...positioning });
    }
    if (positioning.activeBottom < 0 || positioning.activeTop > positioning.viewportHeight) {
      failures.push({ viewport, kind: 'active-step-off-screen', ...positioning });
    }
  }

  await attachJson(testInfo, 'contextual-jump-positioning.json', failures);
  expect(failures).toEqual([]);
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
