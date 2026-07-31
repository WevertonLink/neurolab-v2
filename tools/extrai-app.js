/* =====================================================================
   Leitura das estruturas do index.html, para as ferramentas de tools/.

   Por que existe, e por que assim: o commit b3a937f reverteu tres commits
   porque o extrator que os sustentava leu apenas o literal inicial de
   MINI_QUIZZES e enxergou 6 modulos onde ha 16. Os outros 10 chegam
   depois, em MINI_QUIZZES['decisao']=[...] — e MODULES tem o mesmo
   padrao, com 10 MODULES.push() espalhados pelo arquivo.

   Por isso nada aqui casa regex sobre o codigo. Os blocos <script> sao
   executados num contexto vm com um DOM que nao faz nada, e as
   estruturas sao lidas do escopo lexico — do mesmo jeito que o navegador
   as ve. Atribuicao tardia entra sozinha.

   (tools/verifica-metaforas.js ainda extrai por regex e continua
   correto, mas so porque IMAGINE_DATA_V2 e um literal unico, e JSON
   valido. Os quizzes e as cadeias nao sao: MODULES usa aspas simples,
   MINI_QUIZZES usa duplas, e as chaves nao tem aspas.)
   ===================================================================== */

const fs = require('node:fs');
const path = require('node:path');

const PADRAO = path.join(__dirname, '..', 'index.html');

/* Um no de DOM que aceita tudo e nao faz nada. O objetivo e so deixar os
   blocos <script> executarem ate o fim para que as estruturas existam;
   nada do que seria renderizado importa aqui. */
function noFalso() {
  const no = new Proxy(function () {}, {
    get: (_t, p) => {
      if (p === 'style' || p === 'dataset' || p === 'classList') return new Proxy({}, { get: () => () => {}, set: () => true });
      if (p === 'children' || p === 'childNodes') return [];
      if (p === 'parentNode' || p === 'firstChild') return null;
      if (p === 'hasAttribute') return () => false;
      if (p === 'textContent' || p === 'innerHTML' || p === 'value' || p === 'id') return '';
      if (p === Symbol.toPrimitive) return () => '';
      return typeof p === 'string' ? () => no : undefined;
    },
    set: () => true,
    apply: () => no,
  });
  return no;
}

/**
 * Executa o app e devolve as estruturas pedidas.
 * @param {string[]} nomes  nomes de topo a ler (MODULES, CHAIN, ...)
 * @param {string} [arquivo]  caminho do index.html; util para apontar
 *   para uma copia com defeito plantado e testar a propria ferramenta.
 * @returns {object} um objeto com os nomes pedidos
 */
function extrair(nomes, arquivo) {
  const vm = require('node:vm');
  const src = fs.readFileSync(arquivo || PADRAO, 'utf8');
  const blocos = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocos.length) throw new Error('nenhum bloco <script> encontrado em ' + (arquivo || PADRAO));

  const no = noFalso();
  const doc = {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => no, createTextNode: () => no, addEventListener: () => {},
    body: no, head: no, documentElement: no, readyState: 'loading',
  };
  const ctx = {
    document: doc,
    console: { log() {}, warn() {}, error() {} },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    navigator: { onLine: true, userAgent: 'node', serviceWorker: { register: () => ({ then: () => ({ catch: () => {} }) }) } },
    location: { href: 'file:///index.html', hash: '', search: '' },
    history: { pushState: () => {}, replaceState: () => {} },
    setTimeout: () => 0, clearTimeout: () => {}, setInterval: () => 0, requestAnimationFrame: () => 0,
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    addEventListener: () => {}, screen: {}, performance: { now: () => 0 },
    alert: () => {}, CustomEvent: function () {}, Image: function () {}, fetch: () => Promise.resolve(),
  };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;

  /* O init() do app dispara de forma assincrona e falha ao tocar o DOM
     falso. Nao importa: as estruturas ja foram definidas no caminho
     sincrono, que e tudo que se le aqui. */
  process.on('uncaughtException', () => {});

  vm.createContext(ctx);
  for (const b of blocos) {
    try { vm.runInContext(b, ctx, { timeout: 30000 }); } catch (e) { /* idem */ }
  }

  /* const e let de topo nao viram propriedades do sandbox: ficam no
     escopo lexico global do contexto. Avaliar o nome os alcanca. */
  const out = {};
  for (const nome of nomes) {
    try { out[nome] = vm.runInContext(nome, ctx); } catch (e) { out[nome] = undefined; }
    if (out[nome] === undefined) throw new Error(`${nome} nao foi encontrado apos executar os blocos <script>`);
  }
  return out;
}

module.exports = { extrair, PADRAO };
