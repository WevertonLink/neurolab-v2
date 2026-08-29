/* =====================================================================
   NeuroLab · service worker

   O aplicativo é composto pelo HTML, folhas de estilo, scripts e assets.
   Todos os arquivos essenciais entram no precache para manter o uso offline.

   Ao publicar uma versão nova do conteúdo, incremente VERSION. É isso que
   dispara o precache do index.html novo e apaga o cache anterior.
   ===================================================================== */
const VERSION = 'neurolab-v1-37-0';

const ASSETS = [
  './',
  './index.html',
  './styles/base.css',
  './styles/features.css',
  './styles/domain-mode.css',
  './src/01-metaphors.js',
  './src/02-integrated-visuals.js',
  './src/03-context-mechanisms.js',
  './src/04-learning-model.js',
  './src/04b-domain-mode.js',
  './src/04c-domain-guided.js',
  './src/05-app.js',
  './src/06-service-worker-register.js',
  './privacidade.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './assets/visuals/module-01-neuron-synapse-thumb.webp',
  './assets/visuals/module-01-neuron-synapse.webp',
  './assets/visuals/module-02-plasticity-memory-thumb.webp',
  './assets/visuals/module-02-plasticity-memory.webp',
  './assets/visuals/module-03-reward-motivation-thumb.webp',
  './assets/visuals/module-03-reward-motivation.webp',
  './assets/visuals/module-04-decision-value-thumb.webp',
  './assets/visuals/module-04-decision-value.webp',
  './assets/visuals/module-05-attention-focus-thumb.webp',
  './assets/visuals/module-05-attention-focus.webp',
  './assets/visuals/module-06-emotion-stress-state-thumb.webp',
  './assets/visuals/module-06-emotion-stress-state.webp',
  './assets/visuals/module-07-autonomic-nervous-system-thumb.webp',
  './assets/visuals/module-07-autonomic-nervous-system.webp',
  './assets/visuals/module-08-sleep-consolidation-thumb.webp',
  './assets/visuals/module-08-sleep-consolidation.webp',
  './assets/visuals/module-09-neuroanatomy-thumb.webp',
  './assets/visuals/module-09-neuroanatomy.webp',
  './assets/visuals/module-10-sensory-systems-thumb.webp',
  './assets/visuals/module-10-sensory-systems.webp',
  './assets/visuals/module-11-motor-system-thumb.webp',
  './assets/visuals/module-11-motor-system.webp',
  './assets/visuals/module-12-development-thumb.webp',
  './assets/visuals/module-12-development.webp',
  './assets/visuals/module-13-language-thumb.webp',
  './assets/visuals/module-13-language.webp',
  './assets/visuals/module-14-clinical-neuroscience-thumb.webp',
  './assets/visuals/module-14-clinical-neuroscience.webp',
  './assets/visuals/module-15-neuropharmacology-thumb.webp',
  './assets/visuals/module-15-neuropharmacology.webp',
  './assets/visuals/module-16-methods-thumb.webp',
  './assets/visuals/module-16-methods.webp',
  './assets/visuals/module-17-memory-systems.webp',
  './assets/visuals/module-17-memory-systems-thumb.webp',
  './assets/visuals/module-18-rhythms-oscillations.svg',
  './assets/visuals/module-18-rhythms-oscillations-thumb.svg',
  './assets/visuals/extra-01-esforco.svg',
  './assets/visuals/extra-01-esforco-thumb.svg',
  './assets/visuals/extra-02-ilusoes.svg',
  './assets/visuals/extra-02-ilusoes-thumb.svg',
  './assets/visuals/extra-03-saber.svg',
  './assets/visuals/extra-03-saber-thumb.svg',
  './assets/visuals/extra-04-palpite.svg',
  './assets/visuals/extra-04-palpite-thumb.svg'
];

self.addEventListener('install', event => {
  // Sem skipWaiting: trocar o worker no meio de um quiz recarregaria a
  // página sob o aluno. A versão nova assume no próximo lançamento.
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n !== VERSION).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

/* Continua sem skipWaiting automático (trocar de worker no meio de um quiz
   recarregaria a página sob o aluno). Mas agora a PÁGINA pode pedir a troca:
   quando o aluno toca "Atualizar" no aviso de nova versão, ela manda esta
   mensagem, o worker novo assume na hora e o registro recarrega uma vez só. */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* A chave de cache ignora a query string. Isso não é cosmético: a auditoria
   navega para ./?audit=1 e um link compartilhado pode trazer ?utm=..., então
   sem normalizar nada casaria com o './' precacheado e o app não abriria
   offline. Normalizar na leitura E na escrita evita o outro extremo — uma
   cópia de 1 MB do index.html gravada por variante de query. */
function cacheKey(url) {
  return url.origin + url.pathname;
}

/* Stale-while-revalidate: responde do cache na hora e revalida em segundo
   plano. O app abre instantaneamente mesmo em rede ruim, e o conteúdo novo
   entra na carga seguinte — ou imediatamente, quando VERSION muda. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const key = cacheKey(url);

  event.respondWith(
    caches.open(VERSION).then(cache =>
      cache.match(key).then(cached => {
        const network = fetch(req)
          .then(res => {
            if (res && res.ok) cache.put(key, res.clone()).catch(() => {});
            return res;
          })
          // Offline e sem cache: Response.error() faz o navegador tratar
          // como falha de rede comum, em vez de estourar no respondWith.
          .catch(() => cached || Response.error());

        return cached || network;
      })
    )
  );
});
