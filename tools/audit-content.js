#!/usr/bin/env node
/* Auditoria editorial e estrutural rápida do NeuroLab.
   Complementa o Playwright: falha antes de abrir o navegador quando uma
   regressão conhecida reaparece nos arquivos estáticos. */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const errors = [];
const ok = (condition, message) => { if (!condition) errors.push(message); };

const required = [
  'index.html', 'styles/base.css', 'styles/features.css',
  'src/01-metaphors.js', 'src/02-integrated-visuals.js',
  'src/03-context-mechanisms.js', 'src/04-learning-model.js',
  'src/05-app.js', 'src/06-service-worker-register.js',
  'privacidade.html', 'manifest.webmanifest', 'android/twa-manifest.json', 'sw.js'
];
required.forEach((file) => ok(exists(file), `arquivo obrigatório ausente: ${file}`));

if (!errors.length) {
  const html = read('index.html');
  const css = read('styles/features.css');
  const app = read('src/05-app.js');
  const metaphors = read('src/01-metaphors.js');
  const privacy = read('privacidade.html');
  const sw = read('sw.js');
  const manifest = JSON.parse(read('manifest.webmanifest'));
  const allJs = [
    metaphors,
    read('src/02-integrated-visuals.js'),
    read('src/03-context-mechanisms.js'),
    read('src/04-learning-model.js'),
    app
  ].join('\n');

  ok(/<title>NeuroLab — Estudo Interativo de Neurociência<\/title>/.test(html),
    'título público do aplicativo regrediu');
  ok(!/<title>[^<]*Fase\s+\d+/i.test(html), 'fase interna voltou ao título público');
  ok((html.match(/<link rel="stylesheet"/g) || []).length === 2,
    'o HTML deve carregar as duas folhas de estilo');
  ok((html.match(/<script src=/g) || []).length === 6,
    'o HTML deve carregar os seis módulos JavaScript na ordem definida');
  ok(/id="md-section-nav"/.test(html) && /function renderModuleNavigator\(/.test(app),
    'navegação local do módulo ausente');

  ok(/min-height:44px/.test(css), 'regra mínima de alvo de toque de 44 px ausente');
  ok(/\.func-phase\{font-size:10\.5px/.test(css),
    'legibilidade das fases do mecanismo regrediu');

  const metaphorMatch = metaphors.match(/const IMAGINE_DATA_V2 = (\{.*?\});/s);
  ok(Boolean(metaphorMatch), 'IMAGINE_DATA_V2 não encontrado');
  if (metaphorMatch) {
    const data = JSON.parse(metaphorMatch[1]);
    ok(Object.keys(data).length === 16,
      `esperadas 16 metáforas estruturadas; encontradas ${Object.keys(data).length}`);
    ok(data.atencao?.scene_title === 'A bancada com espaço limitado',
      'a metáfora de atenção voltou ao modelo da torre de controle');
  }

  const forbidden = [
    ['sono no último módulo', /sono, que veremos no último módulo/i],
    ['memória como arquivo transferido', /gradualmente transferida e estabilizada no córtex/i],
    ['pré-frontal como bateria cara', /pré-frontal é metabolicamente caro/i],
    ['estresse como troca literal de comando', /transfere o controle do pré-frontal.*amígdala/i],
    ['Broca como centro isolado', /área de Broca[^\n]{0,120}produz a fala e organiza a gramática/i],
    ['Wernicke como centro isolado', /área de Wernicke[^\n]{0,120}compreende o significado/i]
  ];
  forbidden.forEach(([label, pattern]) => ok(!pattern.test(allJs), `regressão editorial: ${label}`));
  ok(/redes distribuídas/i.test(allJs) && /não é uma simples transferência de arquivo/i.test(allJs),
    'qualificações científicas centrais ausentes');

  ok(/pode consultar apenas a própria origem/i.test(privacy),
    'política não descreve as atualizações na própria origem');
  ok(!/não faz nenhuma requisição à internet/i.test(privacy),
    'política voltou a afirmar ausência absoluta de requisições');
  ok(/neurolab-v1-5-0/.test(sw), 'versão do cache offline não foi atualizada');
  required.filter((f) => f.startsWith('styles/') || f.startsWith('src/'))
    .forEach((f) => ok(sw.includes(`'./${f}'`), `arquivo não incluído no precache: ${f}`));

  // URLs em scripts clássicos são resolvidas contra o documento, não contra
  // a pasta do arquivo JavaScript. Por isso removemos apenas o './' e
  // conferimos sempre a partir da raiz publicada.
  const integrated = read('src/02-integrated-visuals.js');
  const visualPaths = [...integrated.matchAll(/["']\.\/(assets\/visuals\/[^"']+)["']/g)]
    .map((match) => match[1]);
  ok(visualPaths.length === 32,
    `esperadas 32 imagens integradas; encontradas ${visualPaths.length}`);
  visualPaths.forEach((file) => ok(exists(file), `imagem integrada ausente: ${file}`));

  const assetsBlock = sw.match(/const ASSETS = \[(.*?)\];/s);
  ok(Boolean(assetsBlock), 'lista ASSETS do service worker não encontrada');
  if (assetsBlock) {
    const cachedPaths = [...assetsBlock[1].matchAll(/["']\.\/([^"']*)["']/g)]
      .map((match) => match[1])
      .filter(Boolean);
    ok(cachedPaths.length === 46,
      `esperados 46 arquivos explícitos no precache; encontrados ${cachedPaths.length}`);
    cachedPaths.forEach((file) => ok(exists(file), `arquivo do precache ausente: ${file}`));
  }

  ok(manifest.name === 'NeuroLab — Estudo Interativo de Neurociência',
    'nome público do manifesto está inconsistente');
  const twa = JSON.parse(read('android/twa-manifest.json'));
  ok(twa.name === manifest.name, 'nome do TWA e do manifesto web estão inconsistentes');
  ok(twa.fullScopeUrl === 'https://wevertonlink.github.io/neurolab-v2/',
    'escopo público do TWA foi alterado inesperadamente');
}

if (errors.length) {
  console.error(`Auditoria de conteúdo: ${errors.length} falha(s)`);
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}

console.log('Auditoria de conteúdo: ok');
console.log('  estrutura, 32 imagens, 46 arquivos de precache, acessibilidade, metáforas, ciência e privacidade verificadas');
