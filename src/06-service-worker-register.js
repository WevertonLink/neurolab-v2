/* Registro do service worker — ver sw.js.
   Caminho relativo de propósito: resolve certo sob o subdiretório do
   GitHub Pages, e o escopo padrão './' coincide com o do manifesto.
   Aberto por file:// o register rejeita; o catch silencia, porque nesse
   caso o index.html já se sustenta sozinho (as fontes estão embutidas).

   Aviso de nova versão: o sw.js não troca de worker sozinho (não recarregar
   no meio de um quiz). Quando uma versão nova termina de instalar e fica
   "em espera", mostramos um aviso discreto; ao tocar "Atualizar", pedimos a
   troca (SKIP_WAITING) e recarregamos UMA vez quando o worker novo assume. */
window.addEventListener("load", function(){
  if(!("serviceWorker" in navigator)) return;

  var refreshing = false, updateRequested = false;

  function showUpdate(worker){
    var box = document.getElementById('sw-update');
    var btn = document.getElementById('sw-update-btn');
    if(!box || !btn || !worker) return;
    box.classList.add('show');
    btn.onclick = function(){
      updateRequested = true;
      btn.disabled = true;
      btn.textContent = 'Atualizando…';
      // esconde o aviso na hora, para não ficar preso na tela se o reload demorar
      box.classList.remove('show');
      // se por algum motivo a troca não gerar controllerchange, força o reload
      setTimeout(function(){ if(!refreshing){ refreshing = true; window.location.reload(); } }, 2500);
      worker.postMessage({ type: 'SKIP_WAITING' });
    };
  }

  navigator.serviceWorker.register("sw.js").then(function(reg){
    // versão nova já baixada numa visita anterior e aguardando
    if(reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);

    // versão nova chegando agora: avisa quando terminar de instalar
    reg.addEventListener('updatefound', function(){
      var nw = reg.installing;
      if(!nw) return;
      nw.addEventListener('statechange', function(){
        // só é ATUALIZAÇÃO se já havia um worker no controle (não a 1ª instalação)
        if(nw.state === 'installed' && navigator.serviceWorker.controller) showUpdate(nw);
      });
    });

    // procura por atualização ao voltar o foco para a aba
    document.addEventListener('visibilitychange', function(){
      if(document.visibilityState === 'visible') reg.update().catch(function(){});
    });
  }).catch(function(){});

  // quando o worker novo assume, recarrega uma vez — mas só se a troca foi
  // pedida aqui (evita recarregar na 1ª instalação ou por ação de outra aba)
  navigator.serviceWorker.addEventListener('controllerchange', function(){
    if(refreshing || !updateRequested) return;
    refreshing = true;
    window.location.reload();
  });
});
