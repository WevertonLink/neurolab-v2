#!/usr/bin/env node
/* =====================================================================
   NeuroLab · portão local do cronograma por dimensão (v5)

   A suíte do Playwright só roda no CI e leva ~5 min. Este script carrega
   os src/*.js num contexto vm com o DOM stubado e exercita direto a
   mecânica do SRS — migração, semeadura, promoção, rebaixamento e o
   acúmulo por atividade. Roda em ~1s, inclusive no Termux.

   Uso: node tools/test-srs.js
   ===================================================================== */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
// Só afeta o que aparece impresso quando failLoud() dispara — a correção de
// falhar alto não depende mais de ler stack (ver comentário mais abaixo),
// mas um stack cortado em 10 quadros (padrão do V8) empobrece o diagnóstico
// de uma falha profunda. Custa nada num teste de ~1s.
Error.stackTraceLimit = Infinity;

const ROOT = path.join(__dirname, '..');
const FILES = ['01-metaphors.js', '02-integrated-visuals.js', '03-context-mechanisms.js',
               '04-learning-model.js', '04b-domain-mode.js', '04c-domain-guided.js', '05-app.js'];

/* ---------- DOM mínimo, só o suficiente para os arquivos carregarem ---------- */
function stubEl(){
  const el = {
    style:{setProperty(){},removeProperty(){}}, dataset:{}, children:[], hidden:false,
    classList:{add(){},remove(){},toggle(){},contains(){return false;}},
    innerHTML:'', outerHTML:'', textContent:'', value:'', scrollLeft:0, scrollTop:0,
    appendChild(c){return c;}, removeChild(){}, insertBefore(c){return c;},
    setAttribute(){}, getAttribute(){return null;}, removeAttribute(){},
    addEventListener(){}, removeEventListener(){},
    querySelector(){return stubEl();}, querySelectorAll(){return [];},
    closest(){return null;}, focus(){}, blur(){}, click(){}, remove(){},
    contains(){return false;}, scrollIntoView(){},
    getBoundingClientRect(){return {top:0,left:0,right:0,bottom:0,width:0,height:0};}
  };
  return el;
}
const byId = {}, store = {};
const sandbox = {
  console,
  document:{
    documentElement:stubEl(), body:stubEl(), head:stubEl(),
    getElementById(id){ return byId[id] || (byId[id] = stubEl()); },
    querySelector(){ return stubEl(); }, querySelectorAll(){ return []; },
    createElement(){ return stubEl(); }, createTextNode(t){ return {textContent:t}; },
    createDocumentFragment(){ return stubEl(); },
    createTreeWalker(){ return {nextNode(){ return null; }}; },
    addEventListener(){}, removeEventListener(){}, readyState:'complete', activeElement:null
  },
  localStorage:{
    getItem(k){ return k in store ? store[k] : null; },
    setItem(k,v){ store[k] = String(v); }, removeItem(k){ delete store[k]; },
    key(i){ return Object.keys(store)[i] ?? null; },
    get length(){ return Object.keys(store).length; }
  },
  navigator:{ serviceWorker:{register(){ return Promise.resolve(); }}, userAgent:'node', onLine:true },
  location:{ href:'http://localhost/', hash:'', search:'', reload(){} },
  history:{ pushState(){}, replaceState(){}, back(){}, state:null },
  /* Temporizadores são STUBS de propósito, e isso é load-bearing: o app usa
     setTimeout para o save debounced (saveState -> setTimeout 120ms), e um
     temporizador real disparando depois do corpo do teste cairia em
     unhandledRejection, onde este portão tolera em silêncio. Com stub, nada
     assíncrono nasce do corpo do teste — que é a premissa do try/catch lá
     embaixo. Nenhum teste afere persistência, então não perder o save custa
     nada aqui. */
  setTimeout(){ return 0; }, clearTimeout(){}, setInterval(){ return 0; }, clearInterval(){},
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
  matchMedia(){ return {matches:false, addEventListener(){}, addListener(){}}; },
  fetch(){ return Promise.resolve({ok:false, json(){ return Promise.resolve({}); }}); },
  NodeFilter:{SHOW_TEXT:4, FILTER_ACCEPT:1, FILTER_REJECT:2},
  addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return true; },
  scrollTo(){}, getComputedStyle(){ return {getPropertyValue(){ return ''; }}; },
  innerWidth:390, innerHeight:844, devicePixelRatio:2,
  alert(){}, confirm(){ return false; }, prompt(){ return null; },
  performance:{now:()=>Date.now()}, screen:{orientation:{lock(){},unlock(){}}},
  MutationObserver:function(){ return {observe(){},disconnect(){}}; },
  IntersectionObserver:function(){ return {observe(){},disconnect(){},unobserve(){}}; }
};
sandbox.window = sandbox; sandbox.self = sandbox; sandbox.globalThis = sandbox;

// init() do app é uma IIFE assíncrona sem .catch (ver 05-app.js): quando
// renderHeader()/renderDashboard() batem no DOM stubado, a exceção nasce
// numa continuação pós-await e vira unhandledRejection. É ruído esperado
// do app carregado.
//
// Uma rodada anterior tentou separar esse ruído de uma exceção do CORPO do
// teste farejando o nome deste arquivo em e.stack — e isso falha CALADO
// exatamente nos dois casos que mais importam: um `throw` de valor que não
// é Error não tem .stack; e uma pilha mais funda que Error.stackTraceLimit
// (10 por padrão do V8) trunca o texto antes de mencionar este arquivo. Os
// dois fazem a exceção cair no ramo de tolerância — o padrão errado para um
// portão cujo objetivo é nunca deixar passar calado.
//
// A saída não é consertar a heurística: é não precisar dela. O try/catch lá
// embaixo envolve o corpo do teste inteiro e intercepta qualquer exceção
// síncrona sua — Error ou não, stack raso ou fundo, sem ler string nenhuma.
// O que sobra para uncaughtException/unhandledRejection é a continuação órfã
// do init().
//
// Isso vale sob DUAS condições, e as duas são construídas, não supostas:
//   1. o corpo do teste é síncrono — nenhum await ou then aqui embaixo;
//   2. nada que o corpo do teste alcança pode agendar trabalho assíncrono —
//      garantido pelo stub de setTimeout/setInterval no sandbox, lá em cima.
//
// A condição 2 não é hipotética: o bloco 13 chama commitPredict, que passa
// por awardXP -> saveState, e saveState agenda um setTimeout. Com o
// temporizador real exposto ao sandbox, esse callback dispararia depois do
// corpo do teste e qualquer exceção nele seria tolerada em silêncio — o
// buraco exato que este desenho existe para fechar. Ao acrescentar bloco
// novo, se ele precisar de assincronia de verdade, este raciocínio precisa
// ser refeito; não basta acrescentar o teste.
const failLoud = (e)=>{ console.error('ERRO (teste): ' + (e && e.stack ? e.stack : e)); process.exit(1); };
const tolerate = (e)=>{ console.error('(ruído tolerado do app carregado, fora do corpo do teste): ' + (e && e.message || e)); };
process.on('uncaughtException', tolerate);
process.on('unhandledRejection', tolerate);

const ctx = vm.createContext(sandbox);
// O contexto vm tem seu próprio Error, separado do desta realm — ajustar
// Error.stackTraceLimit aqui fora não alcança uma exceção construída lá
// dentro (é o caso comum: quase tudo que o teste alcança roda via ev()).
vm.runInContext('Error.stackTraceLimit = Infinity;', ctx);
for(const f of FILES){
  try{ vm.runInContext(fs.readFileSync(path.join(ROOT,'src',f),'utf8'), ctx, {filename:f}); }
  catch(e){ console.error('ERRO ao carregar '+f+': '+e.message); process.exit(1); }
}
const ev = (code)=>vm.runInContext(code, ctx);

// Tudo daqui até o fim do arquivo é síncrono. O catch no fim decide sozinho,
// pela própria estrutura do arquivo, que qualquer exceção que chegue aqui é
// do corpo do teste — ver o comentário grande lá em cima.
try{

/* ---------- asserções ---------- */
const errors = [];
let checks = 0;
const ok = (cond, msg)=>{ checks++; if(!cond) errors.push(msg); };
const eq = (a, b, msg)=>{ checks++; if(a !== b) errors.push(`${msg} — esperado ${JSON.stringify(b)}, veio ${JSON.stringify(a)}`); };

const DAY = 86400000;
const INTERVALS = ev('SRS_INTERVALS');
const startOfDay = (ts)=>{ const d = new Date(ts); d.setHours(0,0,0,0); return d.getTime(); };
const reset = ()=>ev('state = defaultState();');

/* ---------- 1. measurableDimensions é derivada, não gravada ---------- */
{
  const dims = ev(`measurableDimensions('neuronio',0)`);
  ok(Array.isArray(dims) && dims.length > 0, '1. neuronio-0 deveria ter alguma dimensão mensurável');
  ok(dims.indexOf('recognition') > -1, '1. neuronio-0 deveria medir recognition');

  const total = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+measurableDimensions(m.id,li).length,0),0)`);
  ok(total > 0 && total <= 256, `1. total de caixas possíveis fora de faixa: ${total}`);
  const semNada = ev(`MODULES.flatMap(m=>m.lessons.map((_,li)=>measurableDimensions(m.id,li).length?null:m.id+'-'+li)).filter(Boolean)`);
  eq(semNada.length, 0, `1. tópicos sem nenhuma dimensão mensurável: ${semNada.join(', ')}`);
}

/* ---------- 2. seedTopic só cria caixa do que dá para medir ---------- */
{
  reset();
  const esperadas = ev(`measurableDimensions('neuronio',0)`);
  ev(`seedTopic('neuronio-0')`);
  const criadas = ev(`Object.keys(state.srs['neuronio-0'].dims)`);
  eq(criadas.slice().sort().join(','), esperadas.slice().sort().join(','), '2. seedTopic criou caixas diferentes das mensuráveis');
  const due = ev(`state.srs['neuronio-0'].dims.recognition.due`);
  eq(due, startOfDay(Date.now()) + INTERVALS[0]*DAY, '2. primeira volta deveria ser em 1 dia');

  // não mexe em agendamento existente
  ev(`state.srs['neuronio-0'].dims.recognition.box = 4`);
  ev(`seedTopic('neuronio-0')`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 4, '2. seedTopic não pode reescrever caixa existente');
}

/* ---------- 3. scheduleDimension recusa o que não sabe medir ---------- */
{
  reset();
  const podeLocation = ev(`canMeasure('neuronio',0,'location')`);
  eq(podeLocation, false, '3. premissa do teste mudou: neuronio-0 passou a medir location');
  ev(`scheduleDimension('neuronio-0','location',1)`);
  const dims = ev(`(state.srs['neuronio-0'] && state.srs['neuronio-0'].dims) || {}`);
  eq(Object.prototype.hasOwnProperty.call(dims,'location'), false, '3. agendou uma dimensão que o tópico não consegue medir');

  ev(`scheduleDimension('neuronio-0','recognition',1)`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 0, '3. primeira evidência deveria abrir na caixa 0');
  eq(ev(`state.srs['neuronio-0'].dims.recognition.reps`), 1, '3. reps deveria contar a tentativa');
}

/* ---------- 4. promoção só quando vencido; rebaixamento limitado ---------- */
{
  reset();
  ev(`seedTopic('neuronio-0')`);
  // ainda no prazo: acertar não avança
  ev(`scheduleDimension('neuronio-0','recognition',1)`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 0, '4. treinar antes da hora não pode promover');

  // vencido: acertar avança uma caixa
  ev(`state.srs['neuronio-0'].dims.recognition.due = Date.now() - ${DAY}`);
  ev(`scheduleDimension('neuronio-0','recognition',1)`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 1, '4. vencido e certo deveria promover');

  // erro rebaixa uma caixa e nunca fica acima de SRS_LAPSE_CAP
  ev(`state.srs['neuronio-0'].dims.recognition.box = 6`);
  ev(`scheduleDimension('neuronio-0','recognition',0)`);
  const cap = ev('SRS_LAPSE_CAP');
  ok(ev(`state.srs['neuronio-0'].dims.recognition.box`) <= cap, `4. erro deveria cair até no máximo a caixa ${cap}`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.lapses`), 1, '4. lapse deveria ter sido contado');

  // nota abaixo de SRS_PASS conta como erro
  reset();
  ev(`seedTopic('neuronio-0')`);
  ev(`state.srs['neuronio-0'].dims.recognition.box = 3; state.srs['neuronio-0'].dims.recognition.due = Date.now() - ${DAY}`);
  ev(`scheduleDimension('neuronio-0','recognition',0.66)`);
  ok(ev(`state.srs['neuronio-0'].dims.recognition.box`) < 3, '4. 0.66 está abaixo de SRS_PASS e deveria rebaixar');
}

/* ---------- 5. o lote: N evidências da mesma dimensão = UMA promoção ---------- */
{
  reset();
  ev(`seedTopic('neuronio-0')`);
  ev(`state.srs['neuronio-0'].dims.recognition.due = Date.now() - ${DAY}`);
  ev(`beginEvidenceBatch()`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',1,'mini-quiz',{})`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',1,'mini-quiz',{})`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',1,'mini-quiz',{})`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 0, '5. nada pode ser agendado antes do commit');
  ev(`commitEvidenceBatch()`);
  eq(ev(`state.srs['neuronio-0'].dims.recognition.box`), 1, '5. três acertos na mesma sessão = UMA promoção');

  // sem lote aberto, evidência não agenda nada
  reset();
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',1,'mini-quiz',{})`);
  eq(ev(`Object.keys(state.srs).length`), 0, '5. evidência fora de lote não pode agendar');

  // a média do lote é o que decide: 1 de 3 reprova
  reset();
  ev(`seedTopic('neuronio-0')`);
  ev(`state.srs['neuronio-0'].dims.recognition.box = 3; state.srs['neuronio-0'].dims.recognition.due = Date.now() - ${DAY}`);
  ev(`beginEvidenceBatch()`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',1,'mini-quiz',{})`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',0,'mini-quiz',{})`);
  ev(`recordDimensionEvidence(topicScope('neuronio-0'),'recognition',0,'mini-quiz',{})`);
  ev(`commitEvidenceBatch()`);
  ok(ev(`state.srs['neuronio-0'].dims.recognition.box`) < 3, '5. média 0.33 deveria rebaixar');
}

/* ---------- 6. escopo de módulo não credita tópico ---------- */
{
  reset();
  ev(`beginEvidenceBatch()`);
  ev(`recordDimensionEvidence(moduleScope('neuronio'),'application',1,'domain-case',{})`);
  const feito = ev(`commitEvidenceBatch()`);
  eq(feito.length, 0, '6. escopo M: não pode gerar agendamento de tópico');
  eq(ev(`Object.keys(state.srs).length`), 0, '6. escopo M: não pode criar registro de tópico');
  ok(ev(`state.dimensionEvidence['M:neuronio'].application.attempts`) === 1, '6. a evidência de módulo ainda deve ser gravada');
}

/* ---------- 7. dueTopics devolve item por DIMENSÃO ---------- */
{
  reset();
  ev(`seedTopic('neuronio-0')`);
  eq(ev(`dueTopics().length`), 0, '7. recém-semeado vence só amanhã');
  ev(`Object.keys(state.srs['neuronio-0'].dims).forEach(d=>state.srs['neuronio-0'].dims[d].due = Date.now() - ${DAY})`);
  const due = ev(`dueTopics()`);
  const nDims = ev(`measurableDimensions('neuronio',0).length`);
  eq(due.length, nDims, '7. cada dimensão vencida deveria ser um item');
  ok(due.every(d=>d.dim && d.key === 'neuronio-0'), '7. todo item precisa carregar key e dim');
  eq(ev(`srsScheduledCount()`), nDims, '7. srsScheduledCount deveria contar caixas, não tópicos');
}

/* ---------- 8. migração v4 -> v5 ---------- */
{
  const ontem = Date.now() - 3*DAY;
  const v4 = {
    v:4, xp:100, srs:{ 'neuronio-0':{ box:3, due:ontem, last:ontem, reps:7, lapses:2 } },
    dimensionEvidence:{
      'T:neuronio-0':{
        causality:{ score:0.9, attempts:4, correct:3.6, best:1, last:1, updatedAt:ontem, sources:{} },
        application:{ score:0.4, attempts:2, correct:0.8, best:1, last:0, updatedAt:0, sources:{} }
      }
    },
    lessons:{}, mastery:{}, topicMastery:{}, doneQuiz:{}, questionHistory:{},
    creditC:{}, creditW:{}, miniCredit:{}, miniWrong:{}, selfRate:{}, topicExplain:{}, predCredit:{}
  };
  const m = ev(`migrateState(${JSON.stringify(v4)})`);
  eq(m.v, ev('STATE_VERSION'), '8. versão do estado não foi atualizada');
  const r = m.srs['neuronio-0'];
  ok(r && r.dims, '8. o registro v4 deveria ter virado {seededAt, dims}');
  eq(r.dims.recognition.box, 3, '8. a caixa conquistada tem de ser preservada em recognition');
  eq(r.dims.recognition.due, ontem, '8. o vencimento conquistado tem de ser preservado');
  eq(r.dims.recognition.reps, 7, '8. reps tem de ser preservado');
  eq(r.dims.recognition.lapses, 2, '8. lapses tem de ser preservado');
  ok(r.dims.causality, '8. causality tinha evidência com data e deveria ter sido semeada');
  eq(r.dims.causality.box, 1, '8. evidência acima de SRS_PASS abre na caixa 1, nunca acima');
  eq(Object.prototype.hasOwnProperty.call(r.dims,'application'), false,
     '8. evidência com updatedAt 0 (semeada por legado) não pode virar agendamento');

  // idempotência: migrar de novo não pode corromper
  const m2 = ev(`migrateState(${JSON.stringify(m)})`);
  eq(m2.srs['neuronio-0'].dims.recognition.box, 3, '8. segunda migração corrompeu a caixa');
  eq(Object.keys(m2.srs['neuronio-0'].dims).sort().join(','), Object.keys(r.dims).sort().join(','),
     '8. segunda migração mudou o conjunto de caixas');

  // lixo não pode derrubar a migração
  const sujo = ev(`migrateState({v:4, srs:{ 'neuronio-0':null, 'plasticidade-1':'lixo', 'atencao-2':{box:'x',due:NaN} }})`);
  eq(Object.prototype.hasOwnProperty.call(sujo.srs,'neuronio-0'), false, '8. registro nulo deveria ter sido descartado');
  eq(sujo.srs['atencao-2'].dims.recognition.box, 0, '8. box inválido deveria virar 0');
}

/* ---------- 9. splitTopicKey aguenta os ids reais ---------- */
{
  ev(`MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
    const p = splitTopicKey(topicKey(m.id,li));
    if(p[0] !== m.id || p[1] !== li) throw new Error('splitTopicKey falhou em '+m.id+'-'+li);
  }))`);
  ok(true, '9. splitTopicKey ida e volta em todos os 64 tópicos');
}

/* ---------- 10. a previsão vira questão de revisão ---------- */
{
  reset();
  const q = ev(`predictAsReviewQuestion('neuronio',0)`);
  ok(q && q.q, '10. deveria produzir uma questão a partir da previsão de neuronio-0');
  eq(q.dim, 'application', '10. a previsão DECLARA a dimensão, em vez de deixar o regex inferir');
  eq(q._source, 'prediction', '10. a origem precisa viajar junto com a questão');
  ok(Array.isArray(q.o) && q.o.length >= 3, '10. as alternativas têm de vir junto');
  ok(Boolean(q.er) && Boolean(q.ew), '10. o fechamento serve de feedback para acerto e para erro');
  eq(ev(`inferQuestionDimension(predictAsReviewQuestion('neuronio',0),{source:'review'})`),
     'application', '10. dimensão declarada tem de vencer o classificador por regex');
  eq(ev(`predictAsReviewQuestion('naoexiste',0)`), null, '10. tópico sem previsão devolve null');

  // o banco alterna pela paridade de reps da própria caixa, sem estado novo
  reset();
  ev(`seedTopic('neuronio-0')`);
  const par = ev(`applicationBank(MODULES[0],0,'neuronio-0').map(q=>q._source||'mini')`);
  eq(par.join(','), 'prediction', '10. reps 0 (par) começa pela previsão');
  ev(`state.srs['neuronio-0'].dims.application.reps = 1`);
  const impar = ev(`applicationBank(MODULES[0],0,'neuronio-0').map(q=>q._source||'mini')`);
  ok(impar.length > 0 && impar.every(s=>s==='mini'), '10. reps ímpar alterna para as mini-questões');

  // tópico sem mini-questão de aplicação usa a previsão sempre
  const semMini = ev(`(function(){
    const alvo = MODULES.flatMap((m,mi)=>m.lessons.map((_,li)=>({m:m,mi:mi,li:li})))
      .find(x=>!(MINI_QUIZZES[x.m.id][x.li]||[]).some(q=>inferQuestionDimension(q,{module:x.m,lessonIndex:x.li,source:'review'})==='application'));
    if(!alvo) return 'nenhum';
    const k = topicKey(alvo.m.id, alvo.li);
    ensureSrsTopic(k);
    return applicationBank(alvo.m, alvo.li, k).map(q=>q._source||'mini').join(',');
  })()`);
  eq(semMini, 'prediction', '10. sem mini-questão de aplicação, o banco é sempre a previsão');
}

/* ---------- 11. Aplicação cobre os 64 tópicos, e o banco é bem formado ---------- */
{
  const app = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+(canMeasure(m.id,li,'application')?1:0),0),0)`);
  eq(app, 64, '11. toda aula tem previsão, então Aplicação deveria cobrir 64/64');

  const total = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+measurableDimensions(m.id,li).length,0),0)`);
  ok(total >= 188, '11. o total de caixas deveria subir de 164 para ~188, veio ' + total);

  // se a caixa de Aplicação existe, tem de haver com o que alimentá-la
  const malformadas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      const p = PREDICT[m.id] && PREDICT[m.id][li];
      const id = m.id+'-'+li;
      if(!p){ r.push(id+': sem previsão'); return; }
      if(!Array.isArray(p.o) || p.o.length < 3) r.push(id+': menos de 3 alternativas');
      else if(!(Number.isInteger(p.c) && p.c >= 0 && p.c < p.o.length)) r.push(id+': índice correto fora da faixa');
      if(!p.after || !String(p.after).trim()) r.push(id+': sem fechamento');
    }));
    return r;
  })()`);
  eq(malformadas.length, 0, '11. previsões malformadas: ' + malformadas.slice(0,5).join(' | '));
}

/* ---------- 12. fonte e peso da evidência de previsão ---------- */
{
  eq(ev(`evidenceWeight('prediction')`), .34,
     '12. na revisão a previsão é prova real; .16 era o peso do pré-teste');
  ok(ev(`evidenceWeight('prediction')`) > ev(`evidenceWeight('self-rate')`),
     '12. responder uma previsão pesa mais que se auto-avaliar');

  reset();
  ev(`beginEvidenceBatch();
      recordDimensionEvidence(topicScope('neuronio-0'),'application',1,'prediction',{questionId:'RP:neuronio-0'});
      commitEvidenceBatch();`);
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].application.sources.prediction`), 1,
     '12. a fonte prediction tem de ser contabilizada separadamente');
  eq(ev(`state.srs['neuronio-0'].dims.application.reps`), 1,
     '12. e tem de agendar a caixa de Aplicação');
  eq(ev(`state.questionHistory['RP:neuronio-0'].source`), 'prediction',
     '12. o histórico tem de guardar a origem');
}

/* ---------- 13. o pré-teste continua sendo pré-teste ---------- */
{
  reset();
  ev(`currentModule = 0`);
  const antes = ev(`JSON.stringify({e:state.dimensionEvidence, s:state.srs, h:state.questionHistory})`);
  ev(`commitPredict(0, PREDICT['neuronio'][0].c, null)`);
  const depois = ev(`JSON.stringify({e:state.dimensionEvidence, s:state.srs, h:state.questionHistory})`);
  eq(depois, antes,
     '13. a previsão no PRIMEIRO CONTATO não pode registrar evidência nem agendar: ' +
     'ali ela é pré-teste, e errar é o objetivo — é o erro de previsão que abre a ' +
     'janela para o conteúdo entrar. Ela só vira evidência dentro da revisão.');
  ok(ev(`state.predCredit['P:neuronio:0'] !== undefined`),
     '13. mas o crédito de XP da previsão tem de continuar sendo registrado');
}

/* ---------- 14. answerReview de verdade: a origem da questão decide fonte e id ---------- */
/* Os blocos 12 e 13 aferem as peças isoladas. Este dirige o ponto de entrada
   real — se o ternário de fonte/id em answerReview for invertido ou o nome
   _source for digitado errado, nada mais neste arquivo percebe. */
{
  const montarSessao = `(function(m, li, q, dim){
    const key = topicKey(m.id, li);
    seedTopic(key);
    review = { queue:[{mi:0, li:li, key:key, dim:dim, title:m.lessons[li].t,
                       mn:m.n, color:m.color, due:0, box:0, overdue:0}],
               ti:0, qi:0, topicQs:[q], topicCorrect:0, answered:false,
               opts:shuffleOptions(q.o, q.c), results:[] };
    beginEvidenceBatch();
    answerReview(review.opts.findIndex(o=>o.correct));
    commitEvidenceBatch();
  })`;

  // metade positiva: o item de Aplicação servido pela previsão
  reset();
  ev(`${montarSessao}(MODULES[0], 0, predictAsReviewQuestion('neuronio',0), 'application')`);
  eq(ev(`(state.questionHistory['RP:neuronio-0']||{}).source`), 'prediction',
     '14. resposta vinda da previsão grava fonte prediction sob o id RP:<tópico>');
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].application.sources.prediction`), 1,
     '14. e conta na fonte prediction da dimensão Aplicação');

  // metade negativa: mini-questão comum, pelo mesmo caminho
  reset();
  ev(`${montarSessao}(MODULES[0], 0, MINI_QUIZZES['neuronio'][0][0],
        inferQuestionDimension(MINI_QUIZZES['neuronio'][0][0],{source:'review'}))`);
  eq(ev(`(state.questionHistory['R:neuronio-0:0']||{}).source`), 'review',
     '14. mini-questão mantém fonte review e id R:<tópico>:<índice>');
  eq(ev(`Object.keys(state.questionHistory).filter(k=>k.indexOf('RP:')===0).length`), 0,
     '14. e não pode gravar id de previsão');
}

/* ---------- 15. núcleo da reconstrução de cadeia ---------- */
{
  // é permutação de verdade: mesmos textos, mesma multiplicidade
  const permutacaoOk = ev(`(function(){
    const ruins=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      const c=CHAIN[m.id] && CHAIN[m.id][li];
      if(!c || !Array.isArray(c.s)) { ruins.push(m.id+'-'+li+': sem cadeia'); return; }
      const emb=chainShuffle(c.s, topicKey(m.id,li)).map(x=>x.text).slice().sort();
      const orig=c.s.slice().sort();
      if(emb.length!==orig.length || emb.some((t,i)=>t!==orig[i])) ruins.push(m.id+'-'+li+': nao e permutacao');
    }));
    return ruins;
  })()`);
  eq(permutacaoOk.length, 0, '15. embaralhamento tem de preservar exatamente os textos: ' + permutacaoOk.slice(0,3).join(' | '));

  // NUNCA a ordem original — é isso que impede a tarefa de virar brinde
  const identidades = ev(`(function(){
    const ruins=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      const c=CHAIN[m.id] && CHAIN[m.id][li]; if(!c||!Array.isArray(c.s)) return;
      if(chainShuffle(c.s, topicKey(m.id,li)).every((x,i)=>x.index===i)) ruins.push(m.id+'-'+li);
    }));
    DOMAIN_COUNTERFACTUALS.concat(DOMAIN_CASES).forEach(it=>{
      if(chainShuffle(it.chain, it.id).every((x,i)=>x.index===i)) ruins.push(it.id);
    });
    return ruins;
  })()`);
  eq(identidades.length, 0,
     '15. o embaralhamento NUNCA pode devolver a ordem original — a cadeia sairia ' +
     'montada e a reconstrução viraria brinde. Casos: ' + identidades.slice(0,5).join(', '));

  /* O teste acima verifica a PROPRIEDADE nas 88 cadeias reais, mas não protege
     a GUARDA: medi que nenhuma delas cai em identidade nem sem ela, então
     removê-la não faria nada falhar. E a guarda não é decorativa — cerca de 2%
     dos ids caem em identidade (182 em 10.000 sintéticos). Este caso exercita
     a guarda diretamente: comprimento 4 com o id "aab" é uma identidade sem
     ela. Se alguém remover a guarda, isto falha. */
  ok(ev(`!chainShuffle(['p0','p1','p2','p3'],'aab').every((x,i)=>x.index===i)`),
     '15. a guarda anti-identidade tem de agir no caso que a alcança (4 passos, id "aab")');

  // determinístico: o mesmo id devolve sempre a mesma ordem
  eq(ev(`JSON.stringify(chainShuffle(CHAIN.neuronio[0].s,'neuronio-0').map(x=>x.index))`),
     ev(`JSON.stringify(chainShuffle(CHAIN.neuronio[0].s,'neuronio-0').map(x=>x.index))`),
     '15. mesmo id tem de dar sempre a mesma ordem');
  ok(ev(`JSON.stringify(chainShuffle(CHAIN.neuronio[0].s,'neuronio-0').map(x=>x.index))
        !== JSON.stringify(chainShuffle(CHAIN.neuronio[0].s,'neuronio-1').map(x=>x.index))`),
     '15. ids diferentes devem embaralhar diferente');

  // comparação
  ok(ev(`chainIsCorrect(CHAIN.neuronio[0].s.slice(), CHAIN.neuronio[0].s)`),
     '15. a ordem certa tem de passar');
  ok(ev(`(function(){ const c=CHAIN.neuronio[0].s.slice();
           const t=c[0]; c[0]=c[1]; c[1]=t;   // troca dois passos vizinhos
           return !chainIsCorrect(c, CHAIN.neuronio[0].s); })()`),
     '15. trocar dois passos vizinhos tem de reprovar');
  ok(ev(`!chainIsCorrect(CHAIN.neuronio[0].s.slice(0,-1), CHAIN.neuronio[0].s)`),
     '15. cadeia incompleta tem de reprovar');

  // o apelido do Modo Domínio continua funcionando
  eq(ev(`JSON.stringify(domainDeterministicShuffle(CHAIN.neuronio[0].s,'neuronio-0').map(x=>x.index))`),
     ev(`JSON.stringify(chainShuffle(CHAIN.neuronio[0].s,'neuronio-0').map(x=>x.index))`),
     '15. domainDeterministicShuffle tem de continuar sendo o mesmo algoritmo');
}

/* ---------- 16. a cadeia cobre Explicação causal nos 64 tópicos ---------- */
{
  const cau = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+(canMeasure(m.id,li,'causality')?1:0),0),0)`);
  eq(cau, 64, '16. toda aula tem cadeia com 4+ etapas, então Explicação causal deveria cobrir 64/64');

  const total = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+measurableDimensions(m.id,li).length,0),0)`);
  eq(total, 189, '16. o total de caixas deveria ir de 188 para 189');

  // se a caixa de causalidade existe, tem de haver com o que alimentá-la
  const malformadas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      const c = CHAIN[m.id] && CHAIN[m.id][li];
      const id = m.id+'-'+li;
      if(!c){ r.push(id+': sem cadeia'); return; }
      if(!Array.isArray(c.s) || c.s.length < 4) r.push(id+': menos de 4 etapas');
      else if(c.s.some(t=>!t || !String(t).trim())) r.push(id+': etapa vazia');
      if(!(Number.isInteger(c.h) && c.h >= 0 && c.h < (c.s||[]).length)) r.push(id+': dobradica fora da faixa');
      if(!c.w || !String(c.w).trim() || !c.wa || !String(c.wa).trim()) r.push(id+': sem "e se"');
    }));
    return r;
  })()`);
  eq(malformadas.length, 0, '16. cadeias malformadas: ' + malformadas.slice(0,5).join(' | '));
}

/* ---------- 17. o item de causalidade na revisão é reconstrução ---------- */
{
  const abrirItem = `(function(dim){
    const m=MODULES[0], li=0, key=topicKey(m.id,li);
    seedTopic(key);
    review = { queue:[{mi:0, li:li, key:key, dim:dim, title:m.lessons[li].t,
                       mn:m.n, color:m.color, due:0, box:0, overdue:0}],
               ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
    loadReviewTopic();
  })`;
  const montarNaOrdem = `(function(certo){
    const r=review.recon;
    const ordem = certo
      ? r.chain.map(txt=>r.available.findIndex(a=>a.text===txt))
      : (function(){ const idx=r.chain.map(txt=>r.available.findIndex(a=>a.text===txt));
                     const t=idx[0]; idx[0]=idx[1]; idx[1]=t; return idx; })();
    ordem.forEach(p=>pickReviewChainStep(p));
  })`;

  // um item de causalidade abre reconstrução, não múltipla escolha
  reset();
  ev(`${abrirItem}('causality')`);
  ok(ev(`!!review.recon`), '17. item de causalidade tem de abrir reconstrução');
  eq(ev(`review.topicQs.length`), 0, '17. e não deve montar banco de múltipla escolha');
  eq(ev(`review.recon.available.length`), ev(`CHAIN.neuronio[0].s.length`),
     '17. o pool tem de ter todas as etapas da cadeia');
  ok(ev(`!review.recon.available.every((x,i)=>x.index===i)`),
     '17. e não pode vir na ordem original');

  // ordem certa: evidência com fonte reconstruction, e a caixa anda
  reset();
  ev(`${abrirItem}('causality'); ${montarNaOrdem}(true); nextReview();`);
  eq(ev(`(state.questionHistory['RC:neuronio-0']||{}).source`), 'reconstruction',
     '17. acerto grava evidência com fonte reconstruction');
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].causality.sources.reconstruction`), 1,
     '17. e conta na dimensão de Explicação causal');
  eq(ev(`state.srs['neuronio-0'].dims.causality.reps`), 1,
     '17. e a caixa de causalidade tem de registrar a tentativa');

  // ordem errada: reprova
  reset();
  ev(`${abrirItem}('causality'); ${montarNaOrdem}(false); nextReview();`);
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].causality.last`), 0,
     '17. trocar duas etapas vizinhas tem de reprovar');

  // ver a cadeia não conta como reconstruir: nada gravado, nada agendado
  reset();
  ev(`${abrirItem}('causality'); revealReviewChain(); nextReview();`);
  eq(ev(`state.questionHistory['RC:neuronio-0'] === undefined`), true,
     '17. ver a cadeia NÃO pode gravar evidência — o item tem de continuar vencido');
  eq(ev(`(((state.srs['neuronio-0']||{}).dims||{}).causality||{}).reps`), 0,
     '17. e não pode contar tentativa na caixa');

  // ver depois de errar não apaga o erro já registrado
  reset();
  ev(`${abrirItem}('causality'); ${montarNaOrdem}(false); revealReviewChain(); nextReview();`);
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].causality.attempts`), 1,
     '17. ver depois de errar não apaga o erro que já foi gravado');
}

/* ---------- resultado ---------- */
if(errors.length){
  console.error('Cronograma por dimensão: ' + errors.length + ' falha(s) em ' + checks + ' verificações\n');
  errors.forEach(e=>console.error('  ✕ ' + e));
  process.exit(1);
}
console.log('Cronograma por dimensão: ok');
console.log('  ' + checks + ' verificações — derivação, semeadura, promoção, rebaixamento, lote, escopo, fila e migração v4→v5');

}catch(e){ failLoud(e); }
