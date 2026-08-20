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
/* o que a auditoria de fato contou, para a linha de saída não anunciar
   número congelado — foi o que fez ela dizer "32 imagens" com 36 no disco */
const medido = { imagens: 0, precache: 0, modulos: 0 };
const ok = (condition, message) => { if (!condition) errors.push(message); };

const required = [
  'index.html', 'styles/base.css', 'styles/features.css', 'styles/domain-mode.css',
  'src/01-metaphors.js', 'src/02-integrated-visuals.js',
  'src/03-context-mechanisms.js', 'src/04-learning-model.js', 'src/04b-domain-mode.js',
  'src/04c-domain-guided.js', 'src/05-app.js', 'src/06-service-worker-register.js',
  'privacidade.html', 'manifest.webmanifest', 'android/twa-manifest.json', 'sw.js'
];
required.forEach((file) => ok(exists(file), `arquivo obrigatório ausente: ${file}`));

if (!errors.length) {
  const html = read('index.html');
  const css = read('styles/features.css') + '\n' + read('styles/domain-mode.css');
  const app = read('src/05-app.js');

  /* Os ids de MÓDULO, colhidos uma vez e usados por dois portões (metáforas e
     visão integrada). Só os de módulo: `id:` também aparece nas partes do
     ANATOMY, e a primeira versão disto colheu 106 ids em vez de 18. */
  const inicioLit = app.indexOf('const MODULES = [');
  let cursor = app.indexOf('[', inicioLit);
  let prof = 0;
  let fimLit = -1;
  for (; cursor < app.length; cursor += 1) {
    if (app[cursor] === '[') prof += 1;
    else if (app[cursor] === ']') { prof -= 1; if (prof === 0) { fimLit = cursor; break; } }
  }
  const idsDeModulo = [...app.slice(inicioLit, fimLit).matchAll(/\bid:\s*'([a-z-]+)'/g)].map((m) => m[1])
    .concat([...app.matchAll(/MODULES\.push\(\{[\s\S]{0,80}?\bid:\s*'([a-z-]+)'/g)].map((m) => m[1]));
  ok(idsDeModulo.length >= 10,
    `contagem de módulos implausível: ${idsDeModulo.length} — o parsing quebrou`);
  const domain = read('src/04b-domain-mode.js');
  const guided = read('src/04c-domain-guided.js');
  const metaphors = read('src/01-metaphors.js');
  const privacy = read('privacidade.html');
  const sw = read('sw.js');
  const manifest = JSON.parse(read('manifest.webmanifest'));
  const allJs = [
    metaphors,
    read('src/02-integrated-visuals.js'),
    read('src/03-context-mechanisms.js'),
    read('src/04-learning-model.js'),
    read('src/04b-domain-mode.js'),
    guided,
    app
  ].join('\n');

  ok(/<title>NeuroLab — Estudo Interativo de Neurociência<\/title>/.test(html),
    'título público do aplicativo regrediu');
  ok(!/<title>[^<]*Fase\s+\d+/i.test(html), 'fase interna voltou ao título público');
  ok((html.match(/<link rel="stylesheet"/g) || []).length === 3,
    'o HTML deve carregar as três folhas de estilo');
  ok((html.match(/<script src=/g) || []).length === 8,
    'o HTML deve carregar os oito módulos JavaScript na ordem definida');
  ok(/id="md-section-nav"/.test(html) && /function renderModuleNavigator\(/.test(app),
    'navegação local do módulo ausente');
  ok(/id="view-domain"/.test(html) && /function renderDomainView\(/.test(allJs),
    'Modo Domínio ausente');
  ok(/DOMAIN_CASES\s*=\s*\[/.test(allJs) && /DOMAIN_COUNTERFACTUALS\s*=\s*\[/.test(allJs),
    'casos ou desafios contrafactuais do Modo Domínio ausentes');
  const counterBlock = domain.match(/const DOMAIN_COUNTERFACTUALS = \[(.*?)\];\n\nconst DOMAIN_CASES/s);
  const caseBlock = domain.match(/const DOMAIN_CASES = \[(.*?)\];\n\nconst DOMAIN_CONNECTIONS/s);
  const connectionBlock = domain.match(/const DOMAIN_CONNECTIONS = \[(.*?)\];\n\nconst DOMAIN_TRAILS/s);
  const trailBlock = domain.match(/const DOMAIN_TRAILS = \[(.*?)\];\n\nconst DOMAIN_SESSION/s);
  ok(counterBlock && (counterBlock[1].match(/\n\s*(?:id:|\"id\"\s*:)/g)||[]).length === 16,
    'o Modo Domínio deve manter 16 desafios contrafactuais');
  ok(caseBlock && (caseBlock[1].match(/\n\s*(?:id:|\"id\"\s*:)/g)||[]).length === 8,
    'o Modo Domínio deve manter 8 casos integrados');
  ok(connectionBlock && (connectionBlock[1].match(/\{a:'/g)||[]).length === 12,
    'o mapa de conexões deve manter 12 relações explícitas');
  ok(trailBlock && (trailBlock[1].match(/\{id:'/g)||[]).length === 4,
    'o Modo Domínio deve manter 4 trilhas avançadas');

  let domainCounters = [], domainCases = [];
  try {
    domainCounters = Function(`"use strict"; return [${counterBlock ? counterBlock[1] : ''}];`)();
    domainCases = Function(`"use strict"; return [${caseBlock ? caseBlock[1] : ''}];`)();
  } catch (error) {
    errors.push(`não foi possível interpretar o banco do Modo Domínio: ${error.message}`);
  }

  const domainActivities = [...domainCounters, ...domainCases];
  const correctPositions = [0, 0, 0, 0];
  const caricaturePatterns = [
    /desliga(?:do)? por completo/i,
    /apag\w+ definitivamente/i,
    /muda fisicamente o tamanho/i,
    /fabrica os fótons/i,
    /sinapses são decorativas/i,
    /fica dentro da cóclea/i,
    /todo o tecido cerebral volta ao normal/i,
    /mede diretamente neurotransmissores individuais/i
  ];

  domainActivities.forEach((item) => {
    const label = item.id || 'atividade sem id';
    ok(Array.isArray(item.options) && item.options.length === 4,
      `${label}: cada atividade de domínio deve ter exatamente 4 modelos`);
    ok(Array.isArray(item.optionFeedback) && item.optionFeedback.length === 4,
      `${label}: falta diagnóstico editorial das quatro alternativas`);
    ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4,
      `${label}: índice correto inválido`);
    if (Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4) {
      correctPositions[item.correct] += 1;
    }
    if (Array.isArray(item.options) && item.options.length) {
      ok(new Set(item.options).size === item.options.length,
        `${label}: alternativas duplicadas`);
      const lengths = item.options.map((option) => option.trim().length);
      const ratio = Math.max(...lengths) / Math.max(1, Math.min(...lengths));
      ok(ratio <= 1.5,
        `${label}: diferença de tamanho entre alternativas cria pista linguística (${ratio.toFixed(2)}x)`);
      item.options.forEach((option, index) => {
        caricaturePatterns.forEach((pattern) => ok(!pattern.test(option),
          `${label} opção ${String.fromCharCode(65 + index)}: distrator caricatural reapareceu`));
      });
    }
    if (Array.isArray(item.optionFeedback)) {
      item.optionFeedback.forEach((feedback, index) => ok(typeof feedback === 'string' && feedback.trim().length >= 45,
        `${label} opção ${String.fromCharCode(65 + index)}: diagnóstico curto ou ausente`));
    }
    ok(typeof item.explanation === 'string' && item.explanation.trim().length >= 120,
      `${label}: explicação causal insuficiente`);
    ok(Array.isArray(item.chain) && item.chain.length >= 4 && item.chain.length <= 5,
      `${label}: cadeia deve conter 4 ou 5 elos`);
  });

  ok(correctPositions.every((count) => count === 6),
    `posições corretas devem ser balanceadas em 6/6/6/6; encontrado ${correctPositions.join('/')}`);
  ok(domainCounters.length === 16 && new Set(domainCounters.map((item) => item.module)).size === 16,
    'os contrafactuais devem cobrir os 16 módulos sem repetição de módulo');
  domainCases.forEach((item) => ok(Array.isArray(item.modules) && item.modules.length >= 3,
    `${item.id}: caso integrado deve exigir pelo menos 3 módulos`));
  const correctLongest = domainActivities.filter((item) => {
    const lengths = item.options.map((option) => option.length);
    return lengths[item.correct] === Math.max(...lengths);
  }).length;
  ok(correctLongest <= 8,
    `a alternativa correta é a mais longa em ${correctLongest} de ${domainActivities.length} atividades`);
  ok(/domainStartFocusSession/.test(guided) && /domainStartReconstruction/.test(guided),
    'sessão guiada ou reconstrução causal ausente');
  ok(/activityLog/.test(guided) && /sessions/.test(guided),
    'registros persistentes do Modo Domínio ausentes');

  ok(/min-height:44px/.test(css), 'regra mínima de alvo de toque de 44 px ausente');
  ok(/\.func-phase\{font-size:10\.5px/.test(css),
    'legibilidade das fases do mecanismo regrediu');

  const metaphorMatch = metaphors.match(/const IMAGINE_DATA_V2 = (\{.*?\});/s);
  ok(Boolean(metaphorMatch), 'IMAGINE_DATA_V2 não encontrado');
  if (metaphorMatch) {
    const data = JSON.parse(metaphorMatch[1]);
    /* Derivado do conteúdo, não congelado: a invariante é "todo módulo tem
       metáfora", e ela vale com 16, 18 ou 40 módulos. O número fixo obrigava a
       editar o portão a cada módulo — e portão que se edita por rotina deixa
       de ser portão. */
    const semMetafora = idsDeModulo.filter((id) => !Object.prototype.hasOwnProperty.call(data, id));
    ok(semMetafora.length === 0,
      `todo módulo precisa de metáfora em IMAGINE_DATA_V2; sem ela: ${semMetafora.join(', ')}`);
    ok(Object.keys(data).length >= idsDeModulo.length,
      `metáforas (${Object.keys(data).length}) não cobrem os módulos (${idsDeModulo.length})`);
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
  ok(/neurolab-v1-15-1/.test(sw), 'versão do cache offline não foi atualizada');

  // O progresso do aluno é irrecuperável, e a forma de perdê-lo era silenciosa:
  // a janela aberta em segundo plano gravava seu retrato velho por cima do
  // trabalho feito na outra. Estas três guardas travam o caminho de volta.
  ok(/function salvarAoSair\(\)/.test(app) && /if\(!_mudouDesdeCarga\) return;/.test(app),
    'a gravação ao esconder a janela voltou a ser incondicional');
  ok(!/addEventListener\('pagehide', saveNow\)/.test(app),
    'pagehide voltou a gravar direto, sem checar se houve mudança');
  ok(/addEventListener\('storage'/.test(app) && /const SNAP_KEY/.test(app),
    'sincronismo entre janelas ou cópia interna do estado ausentes');
  required.filter((f) => f.startsWith('styles/') || f.startsWith('src/'))
    .forEach((f) => ok(sw.includes(`'./${f}'`), `arquivo não incluído no precache: ${f}`));

  // URLs em scripts clássicos são resolvidas contra o documento, não contra
  // a pasta do arquivo JavaScript. Por isso removemos apenas o './' e
  // conferimos sempre a partir da raiz publicada.
  const integrated = read('src/02-integrated-visuals.js');
  const visualPaths = [...integrated.matchAll(/["']\.\/(assets\/visuals\/[^"']+)["']/g)]
    .map((match) => match[1]);
  /* Derivado do conteúdo. A invariante é "todo módulo tem visão integrada, com
     imagem cheia e miniatura" — e ela vale com 16, 18 ou 40 módulos. O 32 fixo
     que estava aqui obrigava a editar o portão a cada módulo novo. */
  const semVisual = idsDeModulo.filter((id) => !new RegExp(`\\n  ${id}: \\{`).test(integrated));
  ok(semVisual.length === 0,
    `todo módulo precisa de visão integrada; sem ela: ${semVisual.join(', ')}`);
  medido.imagens = visualPaths.length;
  medido.modulos = idsDeModulo.length;
  ok(visualPaths.length === idsDeModulo.length * 2,
    `esperadas 2 imagens por módulo (${idsDeModulo.length * 2}); encontradas ${visualPaths.length}`);
  visualPaths.forEach((file) => ok(exists(file), `imagem integrada ausente: ${file}`));

  const assetsBlock = sw.match(/const ASSETS = \[(.*?)\];/s);
  ok(Boolean(assetsBlock), 'lista ASSETS do service worker não encontrada');
  if (assetsBlock) {
    const cachedPaths = [...assetsBlock[1].matchAll(/["']\.\/([^"']*)["']/g)]
      .map((match) => match[1])
      .filter(Boolean);
    /* O número exato importava menos do que as duas invariantes que ele tentava
       proteger, e que agora são verificadas diretamente: todo arquivo do
       precache existe, e toda imagem integrada está no precache. Um número que
       se edita por rotina deixa de ser portão. */
    ok(cachedPaths.length >= visualPaths.length,
      `precache (${cachedPaths.length}) menor que as imagens integradas (${visualPaths.length})`);
    cachedPaths.forEach((file) => ok(exists(file), `arquivo do precache ausente: ${file}`));
    const foraDoPrecache = visualPaths.filter((file) => !cachedPaths.includes(file));
    ok(foraDoPrecache.length === 0,
      `imagem integrada fora do precache: ${foraDoPrecache.join(', ')}`);
    medido.precache = cachedPaths.length;
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
console.log(`  estrutura, Modo Domínio guiado, banco adversarial com 24 atividades, ${medido.modulos} módulos, ${medido.imagens} imagens, ${medido.precache} arquivos de precache, acessibilidade, metáforas, ciência e privacidade verificados`);
