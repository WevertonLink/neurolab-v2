/* =====================================================================
   NeuroLab V2 · service worker

   O app inteiro é o index.html — as fontes estão embutidas nele, então
   aqui só precisamos garantir o casco: o HTML, o manifesto e os ícones.

   Ao publicar uma versão nova do conteúdo, incremente VERSION. É isso que
   dispara o precache do index.html novo e apaga o cache anterior.
   ===================================================================== */
const VERSION = 'neurolab-v6-1';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
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
