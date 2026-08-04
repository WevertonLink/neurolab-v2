/* Registro do service worker — ver sw.js.
   Caminho relativo de propósito: resolve certo sob o subdiretório do
   GitHub Pages, e o escopo padrão './' coincide com o do manifesto.
   Aberto por file:// o register rejeita; o catch silencia, porque nesse
   caso o index.html já se sustenta sozinho (as fontes estão embutidas). */
window.addEventListener("load", function(){
  if(!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").catch(function(){});
});
