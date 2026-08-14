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
  setTimeout, clearTimeout, setInterval, clearInterval,
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
// A saída não é consertar a heurística: é não precisar dela. Este arquivo
// não tem NADA assíncrono — nenhum await, then ou setTimeout com efeito
// observável no corpo do teste. A única coisa assíncrona em todo o universo
// que este processo carrega é a continuação do init(). Então a origem não é
// adivinhada por texto de stack: o try/catch lá embaixo envolve o corpo do
// teste inteiro (tudo síncrono) e intercepta qualquer exceção sua — Error
// ou não, stack raso ou fundo, sem ler string nenhuma. O que sobra para
// uncaughtException/unhandledRejection só pode ser a continuação órfã do
// init(), por construção do próprio arquivo, não por suposição sobre ela.
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

/* ---------- resultado ---------- */
if(errors.length){
  console.error('Cronograma por dimensão: ' + errors.length + ' falha(s) em ' + checks + ' verificações\n');
  errors.forEach(e=>console.error('  ✕ ' + e));
  process.exit(1);
}
console.log('Cronograma por dimensão: ok');
console.log('  ' + checks + ' verificações — derivação, semeadura, promoção, rebaixamento, lote, escopo, fila e migração v4→v5');

}catch(e){ failLoud(e); }
