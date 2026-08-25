/* =====================================================================
   NEUROLAB · MODO DOMÍNIO 1.6.1

   Camada de sessão guiada e histórico de progresso. Este arquivo estende o
   Modo Domínio 1.6 sem duplicar seu conteúdo editorial.
   ===================================================================== */

const DOMAIN_GUIDED_SIZE = 4;
const DOMAIN_GUIDED_LIMIT = 240;
const DOMAIN_BASE_DEFAULT_STATE = domainDefaultState;
const DOMAIN_BASE_NORMALIZE_STATE = normalizeDomainState;
const DOMAIN_BASE_RENDER_VIEW = renderDomainView;
const DOMAIN_BASE_RENDER_TODAY = domainRenderToday;
const DOMAIN_BASE_SET_TAB = domainSetTab;
const DOMAIN_BASE_OPEN_MODE = openDomainMode;
const DOMAIN_BASE_RENDER_CASES = domainRenderCases;
const DOMAIN_BASE_RENDER_COUNTER = domainRenderCounter;

DOMAIN_SESSION.focusVisible = false;
DOMAIN_SESSION.lastCompleted = null;

function domainSafeArray(value){ return Array.isArray(value) ? value : []; }
function domainSafeRecord(value){ return value && typeof value==='object' && !Array.isArray(value) ? value : {}; }
function domainBoundHistory(value,limit){ return domainSafeArray(value).slice(-(limit||DOMAIN_GUIDED_LIMIT)); }

// A definição é substituída antes de src/05-app.js criar ou normalizar o estado.
domainDefaultState = function(){
  return Object.assign({}, DOMAIN_BASE_DEFAULT_STATE(), {
    activityLog:[],
    sessions:[],
    currentSession:null
  });
};

normalizeDomainState = function(raw){
  const out=DOMAIN_BASE_NORMALIZE_STATE(raw);
  out.activityLog=domainBoundHistory(out.activityLog);
  out.sessions=domainBoundHistory(out.sessions,40);
  const current=domainSafeRecord(out.currentSession);
  const validQueue=domainSafeArray(current.queue)
    .filter(item=>item&&['case','counter'].includes(item.type)&&typeof item.id==='string')
    .filter((item,index,list)=>list.findIndex(other=>other.type===item.type&&other.id===item.id)===index);
  if(validQueue.length){
    // Preserve a identidade do objeto da sessão. Várias ações chamam
    // ensureDomainState() durante o mesmo clique; substituir currentSession
    // por um objeto novo deixava referências locais apontando para uma sessão
    // antiga, e o botão “Próxima do bloco” parecia não avançar.
    current.id=String(current.id||('dm-'+Date.now()));
    current.startedAt=Math.max(0,Number(current.startedAt)||Date.now());
    current.index=Math.max(0,Math.min(validQueue.length-1,Number(current.index)||0));
    current.queue=validQueue;
    current.completed=domainSafeArray(current.completed).filter(Boolean);
    out.currentSession=current;
  }else{
    out.currentSession=null;
  }
  ['cases','counterfactual'].forEach(bucket=>{
    Object.keys(out[bucket]||{}).forEach(id=>{
      const record=domainSafeRecord(out[bucket][id]);
      record.history=domainBoundHistory(record.history,30);
      out[bucket][id]=record;
    });
  });
  return out;
};

function domainActivityItem(type,id){
  return type==='case' ? DOMAIN_CASES.find(item=>item.id===id) : DOMAIN_COUNTERFACTUALS.find(item=>item.id===id);
}
function domainActivityBucket(type){
  ensureDomainState();
  return type==='case' ? state.domain.cases : state.domain.counterfactual;
}
function domainActivityRecord(type,id){
  const bucket=domainActivityBucket(type);
  return domainSafeRecord(bucket[id]);
}
function domainActivityLabel(type){ return type==='case'?'Caso integrado':'Contrafactual'; }
function domainDateKey(time){
  const d=new Date(time||Date.now());
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function domainLogActivity(entry){
  ensureDomainState();
  const log=domainSafeArray(state.domain.activityLog);
  log.push(Object.assign({at:Date.now()},entry));
  state.domain.activityLog=log.slice(-DOMAIN_GUIDED_LIMIT);
}
function domainAppendRecord(type,id,event){
  const bucket=domainActivityBucket(type), old=domainSafeRecord(bucket[id]);
  old.history=domainBoundHistory([...(old.history||[]),Object.assign({at:Date.now()},event)],30);
  bucket[id]=old;
  return old;
}
function domainLatestLog(type,id,mode){
  ensureDomainState();
  const log=state.domain.activityLog||[];
  for(let i=log.length-1;i>=0;i--){
    const row=log[i];
    if(row.type===type&&row.itemId===id&&(!mode||row.mode===mode)) return row;
  }
  return null;
}

function domainRankedCases(){
  ensureDomainState();
  return DOMAIN_CASES.map((item,index)=>{
    const rec=domainActivityRecord('case',item.id);
    const readiness=item.modules.reduce((sum,id)=>sum+domainModuleReadiness(id),0)/item.modules.length;
    return {type:'case',id:item.id,item,index,attempts:Number(rec.attempts)||0,lastAt:Number(rec.lastAt)||0,readiness};
  }).sort((a,b)=>(a.attempts-b.attempts)||(a.lastAt-b.lastAt)||(b.readiness-a.readiness)||(a.index-b.index));
}
function domainRankedCounters(){
  ensureDomainState();
  return DOMAIN_COUNTERFACTUALS.map((item,index)=>{
    const rec=domainActivityRecord('counter',item.id);
    return {type:'counter',id:item.id,item,index,attempts:Number(rec.attempts)||0,lastAt:Number(rec.lastAt)||0,readiness:domainModuleReadiness(item.module)};
  }).sort((a,b)=>(a.attempts-b.attempts)||(a.lastAt-b.lastAt)||(b.readiness-a.readiness)||(a.index-b.index));
}
function domainBuildFocusQueue(){
  const cases=domainRankedCases().slice(0,2), counters=domainRankedCounters().slice(0,2);
  const queue=[];
  for(let i=0;i<2;i++){
    if(cases[i]) queue.push({type:'case',id:cases[i].id});
    if(counters[i]) queue.push({type:'counter',id:counters[i].id});
  }
  return queue.slice(0,DOMAIN_GUIDED_SIZE);
}
function domainCurrentFocus(){
  ensureDomainState();
  const session=state.domain.currentSession;
  if(!session||!session.queue||!session.queue.length) return null;
  const index=Math.max(0,Math.min(session.queue.length-1,Number(session.index)||0));
  return {session,index,current:session.queue[index]};
}
function domainIsFocusItem(type,id){
  const focus=domainCurrentFocus();
  return Boolean(focus&&focus.current.type===type&&focus.current.id===id);
}
function domainStartFocusSession(){
  ensureDomainState();
  if(!state.domain.currentSession){
    const queue=domainBuildFocusQueue();
    state.domain.currentSession={id:'dm-'+Date.now(),startedAt:Date.now(),index:0,queue,completed:[]};
    domainLogActivity({kind:'session-start',sessionId:state.domain.currentSession.id,size:queue.length});
    saveNow();
  }
  domainOpenFocusCurrent();
}
function domainResumeFocusSession(){ domainOpenFocusCurrent(); }
function domainOpenFocusCurrent(){
  const focus=domainCurrentFocus();
  if(!focus){ openDomainMode('today'); return; }
  DOMAIN_SESSION.focusVisible=true;
  if(focus.current.type==='case') domainOpenCase(focus.current.id,'question');
  else domainOpenCounter(focus.current.id,'question');
  domainSyncFocusClass();
}
function domainSyncFocusClass(){
  const view=document.getElementById('view-domain');
  if(view) view.classList.toggle('focus-session',Boolean(DOMAIN_SESSION.focusVisible&&domainCurrentFocus()));
}
function domainPauseFocusSession(){
  DOMAIN_SESSION.focusVisible=false;
  domainSyncFocusClass();
  openDomainMode('today');
}
function domainFinishFocusSession(){
  const focus=domainCurrentFocus();
  if(!focus) return;
  const session=focus.session;
  const completed=domainSafeArray(session.completed);
  const summary={
    id:session.id,
    startedAt:session.startedAt,
    endedAt:Date.now(),
    total:session.queue.length,
    completed:completed.length,
    correct:completed.filter(x=>x.result===1).length
  };
  state.domain.sessions=domainBoundHistory([...(state.domain.sessions||[]),summary],40);
  state.domain.currentSession=null;
  DOMAIN_SESSION.focusVisible=false;
  DOMAIN_SESSION.lastCompleted=summary;
  domainLogActivity({kind:'session-complete',sessionId:summary.id,total:summary.total,correct:summary.correct,duration:summary.endedAt-summary.startedAt});
  saveNow();
  openDomainMode('today');
}
function domainAdvanceFocus(type,id,event){
  if(event){ event.preventDefault(); event.stopPropagation(); }

  // Faça toda a transição a partir de um único retrato normalizado do estado.
  // A implementação anterior consultava helpers que normalizavam state.domain
  // no meio do clique; em históricos reais isso ainda podia reabrir o item
  // anterior, embora o botão tivesse sido acionado.
  ensureDomainState();
  const session=state.domain&&state.domain.currentSession;
  if(!session||!Array.isArray(session.queue)||!session.queue.length){
    domainOpenSuggestedNext(type,id);
    return;
  }

  const currentIndex=Math.max(0,Math.min(session.queue.length-1,Number(session.index)||0));
  const current=session.queue[currentIndex];
  if(!current||current.type!==type||current.id!==id){
    domainOpenFocusCurrent();
    return;
  }

  const bucket=type==='case'?state.domain.cases:state.domain.counterfactual;
  const rec=domainSafeRecord(bucket&&bucket[id]);
  const completed=domainSafeArray(session.completed).filter(x=>!(x.type===type&&x.id===id));
  completed.push({type,id,result:Number(rec.lastResult)||0,at:Date.now()});

  let nextIndex=currentIndex+1;
  while(nextIndex<session.queue.length){
    const candidate=session.queue[nextIndex];
    if(candidate&&(candidate.type!==type||candidate.id!==id)) break;
    nextIndex++;
  }

  if(nextIndex>=session.queue.length){
    state.domain.currentSession=Object.assign({},session,{completed,index:currentIndex});
    domainFinishFocusSession();
    return;
  }

  const nextSession=Object.assign({},session,{completed,index:nextIndex});
  const nextItem=nextSession.queue[nextIndex];
  state.domain.currentSession=nextSession;
  DOMAIN_SESSION.focusVisible=true;
  saveNow();

  // Abra diretamente o item calculado, em vez de recalcular a fila outra vez.
  if(nextItem.type==='case') domainOpenCase(nextItem.id,'question');
  else domainOpenCounter(nextItem.id,'question');
  domainSyncFocusClass();
}
function domainOpenSuggestedNext(type,id){
  const ranked=type==='case'?domainRankedCounters():domainRankedCases();
  const next=ranked[0];
  if(!next){ openDomainMode('today'); return; }
  DOMAIN_SESSION.focusVisible=false;
  if(next.type==='case') domainOpenCase(next.id,'question'); else domainOpenCounter(next.id,'question');
  domainSyncFocusClass();
}

function domainFocusRail(type,id){
  const focus=domainCurrentFocus();
  if(!focus||focus.current.type!==type||focus.current.id!==id) return '';
  const current=focus.index+1,total=focus.session.queue.length,pct=(current-1)/Math.max(1,total)*100;
  return `<aside class="dm-focus-rail" aria-label="Progresso da sessão guiada">
    <div class="dm-focus-copy"><span>SESSÃO GUIADA</span><b>${current} de ${total}</b><small>Uma atividade por vez. Termine esta antes de abrir a próxima.</small></div>
    <div class="dm-focus-progress" aria-hidden="true"><i style="--focus:${pct}%"></i></div>
    <button type="button" onclick="domainPauseFocusSession()">Pausar</button>
  </aside>`;
}

function domainSessionCard(){
  ensureDomainState();
  const current=domainCurrentFocus();
  const last=DOMAIN_SESSION.lastCompleted || (state.domain.sessions||[]).slice(-1)[0];
  if(current){
    const item=domainActivityItem(current.current.type,current.current.id);
    return `<section class="dm-focus-card active">
      <div><span>SESSÃO GUIADA EM ANDAMENTO</span><h3>${current.index+1} de ${current.session.queue.length} · ${item.title}</h3><p>O restante da interface fica reduzido durante o bloco para preservar o fio do raciocínio.</p></div>
      <button class="bigbtn" style="--mc:var(--violet)" onclick="domainResumeFocusSession()">Retomar atividade →</button>
    </section>`;
  }
  const lastText=last?`Último bloco: ${last.correct}/${last.total} respostas corretas.`:'Ainda não há um bloco concluído.';
  return `<section class="dm-focus-card">
    <div><span>BLOCO DE FOCO · 4 ATIVIDADES</span><h3>Entre em uma sequência linear, sem escolher a próxima tela.</h3><p>O NeuroLab alterna caso e contrafactual, mostra uma atividade por vez e registra o resultado de cada etapa. ${lastText}</p></div>
    <button class="bigbtn" style="--mc:var(--violet)" onclick="domainStartFocusSession()">Iniciar bloco guiado →</button>
  </section>`;
}
function domainProgressSnapshot(){
  ensureDomainState();
  const now=Date.now(),today=domainDateKey(now),week=now-7*DAY;
  const answers=(state.domain.activityLog||[]).filter(x=>x.kind==='answer');
  const todayAnswers=answers.filter(x=>domainDateKey(x.at)===today);
  const weekAnswers=answers.filter(x=>x.at>=week);
  const first=weekAnswers.filter(x=>x.firstTry);
  const firstAccuracy=first.length?first.filter(x=>x.result===1).length/first.length:null;
  const sessions=state.domain.sessions||[];
  return {todayAnswers,weekAnswers,first,firstAccuracy,sessions};
}
function domainHistoryTitle(row){
  if(row.kind==='session-complete') return `Bloco concluído · ${row.correct}/${row.total} corretas`;
  const item=domainActivityItem(row.type,row.itemId);
  const base=item?item.title:'Atividade de domínio';
  return `${row.result===1?'Acertou':'Errou'} · ${base}`;
}
function domainHistoryMeta(row){
  if(row.kind==='session-complete') return `${Math.max(1,Math.round((row.duration||0)/60000))} min`;
  return `${domainActivityLabel(row.type)} · ${new Date(row.at).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}`;
}
function domainProgressPanel(){
  const snapshot=domainProgressSnapshot();
  const history=(state.domain.activityLog||[]).filter(x=>['answer','session-complete'].includes(x.kind)).slice(-6).reverse();
  return `<section class="dm-section dm-records"><div class="dm-section-head"><div><span>REGISTRO DE PROGRESSO</span><h3>O que foi realmente praticado</h3></div></div>
    <div class="dm-record-grid">
      <article><span>Hoje</span><b>${snapshot.todayAnswers.length}</b><small>respostas registradas</small></article>
      <article><span>1ª tentativa · 7 dias</span><b>${snapshot.firstAccuracy===null?'—':domainPct(snapshot.firstAccuracy)}</b><small>${snapshot.first.length||0} atividades novas</small></article>
      <article><span>Blocos concluídos</span><b>${snapshot.sessions.length}</b><small>sessões lineares finalizadas</small></article>
    </div>
    <div class="dm-history"><h4>Histórico recente</h4>${history.length?history.map(row=>`<div><i class="${row.result===0?'bad':'good'}"></i><span><b>${domainHistoryTitle(row)}</b><small>${domainHistoryMeta(row)}</small></span></div>`).join(''):'<p>As próximas respostas aparecerão aqui.</p>'}</div>
  </section>`;
}

domainRenderToday = function(){
  return domainSessionCard()+DOMAIN_BASE_RENDER_TODAY()+domainProgressPanel();
};

function domainRecordMeta(type,id){
  const rec=domainActivityRecord(type,id);
  const attempts=Number(rec.attempts)||0;
  if(!attempts) return '<span class="dm-practice-meta empty">ainda não praticado</span>';
  const clarity=typeof rec.clarity==='number'?` · explicação ${domainPct(rec.clarity)}`:'';
  return `<span class="dm-practice-meta">${attempts} tentativa${attempts!==1?'s':''}${clarity}</span>`;
}
domainRenderCases = function(){
  ensureDomainState();
  return `<section class="dm-section"><div class="dm-section-head"><div><span>CASOS INTEGRADOS</span><h3>Problemas que atravessam módulos</h3></div></div>
    <p class="dm-section-intro">Cada caso atravessa vários módulos. Responda e, no diagnóstico, compare os quatro modelos e veja a cadeia causal principal.</p>
    <div class="dm-case-grid">${DOMAIN_CASES.map(c=>{
      const r=state.domain.cases[c.id],done=r&&r.attempts;
      return `<article class="dm-case-card ${done?'done':''}"><div class="dm-card-top"><span>${done?'PRATICADO':'CASO'}</span><small>${domainReadinessLabel(c.modules)}</small></div><h4>${c.title}</h4><p>${c.scenario}</p>${domainRecordMeta('case',c.id)}${domainModulesHTML(c.modules)}<button onclick="domainOpenCase('${c.id}')">${done?'Continuar prática':'Resolver'} →</button></article>`;
    }).join('')}</div></section>`;
};
domainRenderCounter = function(){
  ensureDomainState();
  const grouped=MODULES.map(m=>({m,items:DOMAIN_COUNTERFACTUALS.filter(c=>c.module===m.id)})).filter(g=>g.items.length);
  return `<section class="dm-section"><div class="dm-section-head"><div><span>DESAFIOS CONTRAFACTUAIS</span><h3>Mude uma peça e deduza o restante</h3></div></div>
    <p class="dm-section-intro">Mude uma peça do mecanismo e deduza qual cadeia causal sobrevive ao teste.</p>
    <div class="dm-counter-list">${grouped.map(g=>g.items.map(c=>{
      const r=state.domain.counterfactual[c.id],done=r&&r.attempts;
      return `<article class="dm-counter-card" style="--mc:${g.m.color}"><div><span>MÓDULO ${g.m.n}</span><h4>${c.title}</h4><p>${c.prompt}</p>${domainRecordMeta('counter',c.id)}</div><button onclick="domainOpenCounter('${c.id}')">${done?'Continuar':'Responder'} →</button></article>`;
    }).join('')).join('')}</div></section>`;
};

function domainLinearActions(type,id){
  const inFocus=domainIsFocusItem(type,id);
  return `<div class="dm-linear-actions">
    <button type="button" class="bigbtn dm-next" style="--mc:var(--violet)" onclick="${inFocus?`domainAdvanceFocus('${type}','${id}',event)`:`domainOpenSuggestedNext('${type}','${id}')`}">${inFocus?'Próxima do bloco':'Próxima atividade'} →</button>
    <button class="dm-list-link" onclick="domainSetTab('${type==='case'?'cases':'counter'}')">Voltar à lista</button>
  </div>`;
}

function domainRenderQuestion(type,item,rec,reveal){
  const title=type==='case'?item.question:'Qual cadeia sobrevive ao teste?';
  return `<div class="dm-question"><span>${type==='case'?'Reconstrua a cadeia':'Teste o mecanismo'}</span>${type==='case'?`<h4>${title}</h4>`:''}<div class="dm-options">${item.options.map((option,index)=>`<button ${reveal?'disabled':''} class="${reveal?(index===item.correct?'correct':index===rec.lastChoice?'wrong':'dim'):''}" onclick="${type==='case'?`domainAnswerCase('${item.id}',${index})`:`domainAnswerCounter('${item.id}',${index})`}"><b>${String.fromCharCode(65+index)}</b><span>${option}</span></button>`).join('')}</div></div>`;
}

domainRenderCaseDetail = function(item){
  const rec=domainActivityRecord('case',item.id),reveal=Boolean(rec.lastAt&&!DOMAIN_SESSION.caseRetry[item.id]);
  return `<section class="dm-detail" data-focus-item="case:${item.id}">${domainFocusRail('case',item.id)}<button class="backbtn" onclick="domainSetTab('cases')">← todos os casos</button>
    <div class="dm-detail-k">CASO INTEGRADO · ${domainReadinessLabel(item.modules)}</div><h3>${item.title}</h3><p class="dm-scenario">${item.scenario}</p>${domainModulesHTML(item.modules)}
    ${domainRenderQuestion('case',item,rec,reveal)}
    ${reveal?domainActivityFeedback('case',item,rec):''}
  </section>`;
};
domainRenderCounterDetail = function(item){
  const module=domainModule(item.module),rec=domainActivityRecord('counter',item.id),reveal=Boolean(rec.lastAt&&!DOMAIN_SESSION.counterRetry[item.id]);
  return `<section class="dm-detail" data-focus-item="counter:${item.id}">${domainFocusRail('counter',item.id)}<button class="backbtn" onclick="domainSetTab('counter')">← todos os desafios</button>
    <div class="dm-detail-k" style="color:${module.color}">MÓDULO ${module.n} · CONTRAFACTUAL</div><h3>${item.title}</h3><p class="dm-scenario">${item.prompt}</p>
    ${domainRenderQuestion('counter',item,rec,reveal)}
    ${reveal?domainActivityFeedback('counter',item,rec):''}
  </section>`;
};

function domainScrollTargetBelowSticky(target){
  if(!target) return false;
  const header=document.querySelector('header.top');
  const rail=document.querySelector('#view-domain .dm-focus-rail');
  const headerHeight=header?header.offsetHeight:0;
  const railHeight=rail?rail.offsetHeight:0;
  const gap=rail?28:16;
  const top=window.scrollY+target.getBoundingClientRect().top-headerHeight-railHeight-gap;
  window.scrollTo({top:Math.max(0,top),behavior:'auto'});
  return true;
}

domainScrollAfterRender = function(mode,previousY){
  requestAnimationFrame(()=>{
    if(mode==='preserve'){
      window.scrollTo({top:previousY,behavior:'auto'});return;
    }
    // Ao abrir a próxima atividade, o aluno precisa reencontrar o contexto:
    // tipo, título e enunciado. Rolar direto para as alternativas fazia a barra
    // sticky da sessão cobrir justamente essa parte no celular.
    const selectors={
      feedback:'.dm-feedback',
      question:'.dm-detail-k'
    };
    const target=selectors[mode]?document.querySelector('#view-domain '+selectors[mode]):null;
    if(domainScrollTargetBelowSticky(target)) return;
    window.scrollTo({top:0,behavior:'auto'});
  });
};

domainOpenCase = function(id,focus='top'){
  ensureDomainState();
  const item=DOMAIN_CASES.find(x=>x.id===id);if(!item)return;
  const previousY=window.scrollY;
  state.domain.activeTab='cases';saveState();
  const body=document.getElementById('dm-body');if(!body){openDomainMode('cases');return;}
  body.innerHTML=domainRenderCaseDetail(item);domainGlossifyDetail(body);domainSyncFocusClass();domainScrollAfterRender(focus,previousY);
};
domainOpenCounter = function(id,focus='top'){
  ensureDomainState();
  const item=DOMAIN_COUNTERFACTUALS.find(x=>x.id===id);if(!item)return;
  const previousY=window.scrollY;
  state.domain.activeTab='counter';saveState();
  const body=document.getElementById('dm-body');if(!body){openDomainMode('counter');return;}
  body.innerHTML=domainRenderCounterDetail(item);domainGlossifyDetail(body);domainSyncFocusClass();domainScrollAfterRender(focus,previousY);
};

domainAnswerCase = function(id,choice){
  const item=DOMAIN_CASES.find(x=>x.id===id);if(!item)return;
  ensureDomainState();const bucket=state.domain.cases,old=domainSafeRecord(bucket[id]),right=choice===item.correct,firstTry=!(Number(old.attempts)>0);
  bucket[id]=Object.assign({},old,{attempts:(Number(old.attempts)||0)+1,lastChoice:choice,lastResult:right?1:0,best:Math.max(Number(old.best)||0,right?1:0),lastAt:Date.now(),history:domainBoundHistory([...(old.history||[]),{at:Date.now(),mode:'choice',result:right?1:0,choice,firstTry}],30)});
  item.modules.forEach(mid=>recordDimensionEvidence(moduleScope(mid),'application',right?1:0,'domain-case',{questionId:'DCASE:'+id+':'+mid}));
  domainLogActivity({kind:'answer',type:'case',itemId:id,result:right?1:0,firstTry,sessionId:domainCurrentFocus()?.session.id||null});
  DOMAIN_SESSION.caseRetry[id]=false;saveNow();domainOpenCase(id,'feedback');
};
domainAnswerCounter = function(id,choice){
  const item=DOMAIN_COUNTERFACTUALS.find(x=>x.id===id);if(!item)return;
  ensureDomainState();const bucket=state.domain.counterfactual,old=domainSafeRecord(bucket[id]),right=choice===item.correct,firstTry=!(Number(old.attempts)>0);
  bucket[id]=Object.assign({},old,{attempts:(Number(old.attempts)||0)+1,lastChoice:choice,lastResult:right?1:0,best:Math.max(Number(old.best)||0,right?1:0),lastAt:Date.now(),history:domainBoundHistory([...(old.history||[]),{at:Date.now(),mode:'choice',result:right?1:0,choice,firstTry}],30)});
  if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
  recordDimensionEvidence(topicScope(topicKey(item.module,item.lesson)),'causality',right?1:0,'counterfactual',{questionId:'DCF:'+id});
  if(typeof commitEvidenceBatch==='function') commitEvidenceBatch();
  domainLogActivity({kind:'answer',type:'counter',itemId:id,result:right?1:0,firstTry,sessionId:domainCurrentFocus()?.session.id||null});
  DOMAIN_SESSION.counterRetry[id]=false;saveNow();domainOpenCounter(id,'feedback');
};

function domainOptionAudit(item,rec){
  const notes=Array.isArray(item.optionFeedback)?item.optionFeedback:[];
  const selected=Number(rec.lastChoice);
  const selectedNote=notes[selected]||'Esta alternativa ainda não possui diagnóstico editorial.';
  return `<div class="dm-choice-diagnosis ${rec.lastResult===1?'right':'wrong'}">
    <span>SUA ESCOLHA · ${String.fromCharCode(65+selected)}</span>
    <p>${selectedNote}</p>
  </div>
  <details class="dm-option-audit">
    <summary>Comparar os quatro modelos</summary>
    <div>${item.options.map((option,index)=>`<article class="${index===item.correct?'right':index===selected?'selected':''}">
      <header><b>${String.fromCharCode(65+index)}</b><span>${index===item.correct?'fecha causalmente':'onde a cadeia quebra'}</span></header>
      <p>${option}</p><small>${notes[index]||''}</small>
    </article>`).join('')}</div>
  </details>`;
}

domainActivityFeedback = function(type,item,rec){
  const right=rec.lastResult===1,clarity=typeof rec.clarity==='number'?rec.clarity:null;
  const buttons=[['1','Consegui reconstruir'],['0.5','Faltou uma ligação'],['0','Só reconheci depois']];
  return `<div class="dm-feedback ${right?'right':'wrong'}"><div class="dm-verdict">${right?'✓ A cadeia ficou de pé':'✕ A primeira ruptura foi outra'}</div><p>${item.explanation}</p><ol>${item.chain.map(step=>`<li>${step}</li>`).join('')}</ol>${item.extend?`<div class="dm-extend"><span>Estenda a cadeia</span><p><b>${item.extend.q}</b> ${item.extend.a}</p></div>`:''}
    ${domainOptionAudit(item,rec)}
    <div class="dm-clarity"><span>Sem olhar, você conseguiria reconstruir a cadeia?</span><div>${buttons.map(([value,label])=>`<button class="${clarity!==null&&Number(value)===clarity?'picked':''}" onclick="domainRateActivity('${type}','${item.id}',${value})">${label}</button>`).join('')}</div></div>
    ${domainLinearActions(type,item.id)}
  </div>`;
};
domainRateActivity = function(type,id,value){
  const bucket=domainActivityBucket(type);if(!bucket[id])return;
  bucket[id].clarity=domainClamp(value);bucket[id].ratedAt=Date.now();
  const log=domainLatestLog(type,id,'choice');if(log)log.clarity=domainClamp(value);
  saveNow();
  if(type==='case')domainOpenCase(id,'preserve');else domainOpenCounter(id,'preserve');
};
// Mantido para compatibilidade com eventuais links antigos: reabre a atividade
// na pergunta original.
domainRetryActivity = function(type,id){ if(type==='case') domainOpenCase(id,'question'); else domainOpenCounter(id,'question'); };

openDomainMode = function(tab){
  DOMAIN_SESSION.focusVisible=false;
  DOMAIN_BASE_OPEN_MODE(tab);
  domainSyncFocusClass();
};
domainSetTab = function(tab){
  DOMAIN_SESSION.focusVisible=false;
  DOMAIN_BASE_SET_TAB(tab);
  domainSyncFocusClass();
};
renderDomainView = function(){
  DOMAIN_BASE_RENDER_VIEW();
  domainSyncFocusClass();
};
