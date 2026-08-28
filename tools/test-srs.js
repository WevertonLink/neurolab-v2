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
  ok(total > 0 && total <= 400, `1. total de caixas possíveis fora de faixa: ${total}`);
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
  /* Procura um par (tópico, dimensão) genuinamente não-mensurável em vez de
     fixar um: as fases foram acrescentando fontes, e um par escolhido à mão
     vira premissa falsa na fase seguinte — foi o que aconteceu com
     neuronio-0/location quando o diagrama entrou. */
  const naoMensuravel = ev(`(function(){
    for(const m of MODULES) for(let li=0; li<m.lessons.length; li++){
      const faltando = KNOWLEDGE_DIM_IDS.filter(d=>!canMeasure(m.id,li,d));
      if(faltando.length) return {key: topicKey(m.id,li), dim: faltando[0]};
    }
    return null;
  })()`);
  ok(naoMensuravel, '3. premissa: tem de existir ao menos um par tópico×dimensão não-mensurável');
  ev(`scheduleDimension(${JSON.stringify(naoMensuravel && naoMensuravel.key)}, ${JSON.stringify(naoMensuravel && naoMensuravel.dim)}, 1)`);
  const dims = ev(`(state.srs[${JSON.stringify(naoMensuravel && naoMensuravel.key)}] || {}).dims || {}`);
  eq(Object.prototype.hasOwnProperty.call(dims, naoMensuravel ? naoMensuravel.dim : 'x'), false,
     '3. agendou uma dimensão que o tópico não consegue medir (' + (naoMensuravel && naoMensuravel.key) + '/' + (naoMensuravel && naoMensuravel.dim) + ')');

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

/* ---------- 11. Aplicação cobre TODA aula, e o banco é bem formado ---------- */
{
  /* Derivado do conteúdo, não congelado: a invariante é "toda aula tem
     previsão", e ela não deixa de valer quando um módulo novo entra. O 64 que
     estava aqui obrigava a editar o portão a cada módulo — e um número que se
     edita por rotina deixa de ser portão. */
  const totalAulas = ev(`MODULES.reduce((s,m)=>s+m.lessons.length,0)`);
  const app = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+(canMeasure(m.id,li,'application')?1:0),0),0)`);
  eq(app, totalAulas, '11. toda aula tem previsão, então Aplicação deveria cobrir ' + totalAulas + '/' + totalAulas);

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

/* ---------- 16. CHAIN bem-formada (alimenta a "cadeia + e se" do módulo) ---------- */
{
  /* A cadeia CHAIN não agenda mais Explicação causal — a reconstrução saiu, e
     causalidade volta a ser medida por mini-questão, contrafactual e quiz de
     módulo. Mas CHAIN continua na tela do módulo, na "cadeia + e se", então a
     estrutura ainda precisa de portão. */
  const semCadeia = ev(`MODULES.flatMap(m=>m.lessons.map((_,li)=>
    (CHAIN[m.id] && CHAIN[m.id][li] && Array.isArray(CHAIN[m.id][li].s) && CHAIN[m.id][li].s.length>=4)
      ? null : m.id+'-'+li)).filter(Boolean)`);
  eq(semCadeia.length, 0, '16. todo tópico precisa de cadeia com 4+ etapas: ' + semCadeia.join(', '));

  // a cadeia mostrada no módulo precisa estar bem-formada: etapas, dobradiça e "e se"
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

/* ---------- 17. o item de causalidade na revisão é múltipla escolha ---------- */
{
  const abrirItem = `(function(dim){
    const m=MODULES[0], li=0, key=topicKey(m.id,li);
    seedTopic(key);
    review = { queue:[{mi:0, li:li, key:key, dim:dim, title:m.lessons[li].t,
                       mn:m.n, color:m.color, due:0, box:0, overdue:0}],
               ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
    loadReviewTopic();
  })`;

  // a reconstrução saiu: causalidade volta a ser cobrada por múltipla escolha
  reset();
  ev(`${abrirItem}('causality')`);
  ok(ev(`!review.recon`), '17. item de causalidade NÃO pode abrir reconstrução');
  ok(ev(`review.topicQs.length > 0`),
     '17. item de causalidade tem de montar banco de múltipla escolha');

  // as funções e o núcleo da reconstrução não podem mais existir
  ok(ev(`typeof renderReviewReconstruction === 'undefined'
        && typeof checkReviewReconstruction === 'undefined'
        && typeof chainIsCorrect === 'undefined'
        && typeof chainShuffle === 'undefined'`),
     '17. nenhuma função da reconstrução pode sobreviver à remoção');
}

/* ---------- 18. pesos: nenhuma fonte real cai no default por omissão ---------- */
{
  eq(ev(`evidenceWeight('review')`), .48,
     '18. a revisão é prova em contexto de avaliação, com a aula já lida');
  eq(ev(`evidenceWeight('diagram')`), .38,
     '18. apontar no diagrama pesa como mini quiz: é reconhecimento com 3 a 6 distratores');
  ok(ev(`evidenceWeight('diagram') < evidenceWeight('review')`),
     '18. e menos que a revisão em si');

  // toda fonte que o app realmente usa precisa estar no mapa
  const foraDoMapa = ev(`(function(){
    const usadas=['review','mini-quiz','module-quiz','prediction',
                  'counterfactual','domain-case','self-rate','diagram'];
    return usadas.filter(s=>evidenceWeight(s)===.28 && s!=='__default__');
  })()`);
  eq(foraDoMapa.length, 0,
     '18. fontes caindo no default .28 por omissão: ' + foraDoMapa.join(', '));
}

/* ---------- 19. Localização: âncoras reais e cobertura ---------- */
{
  // toda âncora tem de apontar para uma parte que existe no SVG E em parts
  const quebradas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>{
      const A=ANATOMY[m.id]||{};
      const ids={}; (A.parts||[]).forEach(p=>ids[p.id]=1);
      const svg={}; (String(A.svg||'').match(/data-struct="([^"]+)"/g)||[]).forEach(s=>svg[s.slice(13,-1)]=1);
      m.lessons.forEach((_,li)=>locationAnchorsOf(m.id,li).forEach(a=>{
        if(!ids[a.part] || !svg[a.part]) r.push(m.id+'-'+li+' '+a.term+' -> '+a.part);
      }));
    });
    return r;
  })()`);
  eq(quebradas.length, 0, '19. âncoras apontando para parte inexistente: ' + quebradas.slice(0,3).join(' | '));

  const totalAncoras = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+locationAnchorsOf(m.id,li).length,0),0)`);
  eq(totalAncoras, 229, '19. o número de âncoras utilizáveis (207 + 17 do bloco B + 1 por aula da Fatia 2 que ancora um termo numa parte do diagrama do módulo). Atualize ao acrescentar aula com âncora de Localização');

  /* 56 tópicos ganham Localização pelo diagrama. A cobertura final é 58 porque
     dois dos 8 sem âncora — emocao-3 e clinica-0 — já mediam Localização por
     uma mini-questão que o classificador leu como "onde fica". A âncora não é a
     única fonte, e o item de revisão precisa saber disso (ver bloco 20). */
  const loc = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+(canMeasure(m.id,li,'location')?1:0),0),0)`);
  /* A contagem crua subia a cada módulo novo. O que o portão precisa vigiar é
     outra coisa: QUAIS tópicos ficam sem Localização. São os abstratos, onde
     "onde fica" não é pergunta com resposta. Se um módulo novo entrar sem
     âncora de diagrama, ele aparece nesta lista e o portão fecha. */
  const semLoc = ev(`MODULES.reduce((a,m)=>a.concat(m.lessons.map((_,li)=>canMeasure(m.id,li,'location')?null:m.id+'-'+li).filter(Boolean)),[])`);
  const ABSTRATOS = ['emocao-3','linguagem-2','linguagem-3','clinica-0','clinica-3','metodos-0','metodos-2','decisao-4','sono-4','neuroanatomia-4','sensorial-4','desenvolvimento-4'];
  eq(semLoc.slice().sort().join(' '), ABSTRATOS.slice().sort().join(' '),
     '19. mudou o conjunto de tópicos sem Localização — veio: ' + semLoc.join(' '));
  /* Este continua sendo catraca de propósito: o total só deve subir, e subir
     deliberadamente. Quem acrescentar conteúdo atualiza o número e, ao fazê-lo,
     é obrigado a olhar se subiu o quanto devia. */
  eq(ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>t+measurableDimensions(m.id,li).length,0),0)`), 391,
     '19. o total de caixas sobe deliberadamente a cada 5ª aula da Fatia 2 (base 344; cada aula nova mede 3 ou 4 dimensões). Atualize ao acrescentar aula e confira se subiu o quanto devia');

  /* A invariante que realmente importa: nenhum tópico pode ter caixa de
     Localização sem NENHUMA fonte — nem âncora no diagrama, nem mini-questão.
     Agendar o que não se sabe medir produz fila que nada satisfaz. */
  const semFonte = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      if(!canMeasure(m.id,li,'location')) return;
      const temAncora = locationAnchorsOf(m.id,li).length > 0;
      const temQuestao = ((MINI_QUIZZES[m.id]||[])[li]||[])
        .some(q=>inferQuestionDimension(q,{module:m, lessonIndex:li, source:'review'})==='location');
      const temModulo = (m.quiz||[])
        .some(q=>q.l===li && inferQuestionDimension(q,{module:m, source:'module'})==='location');
      if(!temAncora && !temQuestao && !temModulo) r.push(m.id+'-'+li);
    }));
    return r;
  })()`);
  eq(semFonte.length, 0, '19. caixa de Localização sem fonte nenhuma: ' + semFonte.join(', '));

  // e os 6 verdadeiramente sem nada continuam sem caixa
  /* neuroanatomia-2 saiu desta lista: a questão do quiz de módulo que declara
     aquela aula ("qual estrutura é a central de retransmissão sensorial") é uma
     pergunta de localização legítima, e passou a contar como fonte. */
  const seisSemNada = ['linguagem-2','linguagem-3','clinica-3','metodos-0','metodos-2'];
  const indevidos = ev(`${JSON.stringify(seisSemNada)}.filter(k=>{
    const p = splitTopicKey(k); return canMeasure(p[0], p[1], 'location');
  })`);
  eq(indevidos.length, 0, '19. tópico abstrato sem fonte nenhuma não pode ganhar caixa: ' + indevidos.join(', '));

  // todo módulo precisa de distratores
  const semDistrator = ev(`MODULES.filter(m=>((ANATOMY[m.id]||{}).parts||[]).length < 3).map(m=>m.id)`);
  eq(semDistrator.length, 0, '19. módulo sem 3 partes para servirem de distrator: ' + semDistrator.join(', '));
}

/* ---------- 20. o item de Localização é o diagrama ---------- */
{
  const abrirLoc = `(function(mid, li){
    const mi=MODULES.findIndex(x=>x.id===mid), m=MODULES[mi], key=topicKey(mid,li);
    seedTopic(key);
    review = { queue:[{mi:mi, li:li, key:key, dim:'location', title:m.lessons[li].t,
                       mn:m.n, color:m.color, due:0, box:0, overdue:0}],
               ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
    loadReviewTopic();
  })`;

  reset();
  ev(`${abrirLoc}('neuronio',0)`);
  ok(ev(`!!review.loc`), '20. tópico com âncora tem de abrir o diagrama');
  eq(ev(`review.topicQs.length`), 0, '20. e não montar múltipla escolha');
  ok(ev(`locationAnchorsOf('neuronio',0).some(a=>a.term===review.loc.term && a.part===review.loc.part)`),
     '20. o termo cobrado tem de ser uma âncora real do tópico');

  // tocar a parte certa
  reset();
  ev(`${abrirLoc}('neuronio',0); answerReviewLocation(review.loc.part); nextReview();`);
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].location.sources.diagram`), 1,
     '20. acerto grava evidência com fonte diagram');
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].location.last`), 1, '20. e como acerto');
  eq(ev(`state.srs['neuronio-0'].dims.location.reps`), 1, '20. e a caixa de Localização anda');

  // tocar uma parte errada
  reset();
  ev(`${abrirLoc}('neuronio',0);
      answerReviewLocation((ANATOMY.neuronio.parts.find(p=>p.id!==review.loc.part)||{}).id);
      nextReview();`);
  eq(ev(`state.dimensionEvidence['T:neuronio-0'].location.last`), 0,
     '20. apontar a estrutura errada tem de reprovar');

  /* A guarda que impede a pergunta de entregar a própria resposta: existe uma
     delegação global que abre a ficha da estrutura ao toque em qualquer
     .apart[data-struct], no documento inteiro. Durante um item ativo, o toque
     tem de virar resposta. */
  reset();
  ev(`${abrirLoc}('neuronio',0)`);
  eq(ev(`review.loc.answered`), false, '20. o item começa sem resposta');
  /* Exercita a FUNÇÃO REAL que a delegação chama, não uma cópia da lógica dela.
     A primeira versão deste teste reimplementava o if/else inline e por isso
     passava mesmo com a guarda removida do código — testava a si mesma. */
  ok(ev(`(function(){
      let abriu=false;
      const orig=openStructInfo;
      openStructInfo=function(){ abriu=true; };
      handleAnatPartTap('neuronio', review.loc.part);
      openStructInfo=orig;
      return !abriu && review.loc.answered===true;
    })()`),
     '20. com item ativo, o toque numa parte é RESPOSTA — não pode abrir a ficha da estrutura');

  // e sem item ativo, o toque volta ao comportamento normal
  reset();
  ok(ev(`(function(){
      review = {queue:[], ti:0, qi:0, topicQs:[], results:[], loc:null, recon:null};
      let abriu=false; const orig=openStructInfo;
      openStructInfo=function(){ abriu=true; };
      handleAnatPartTap('neuronio','soma');
      openStructInfo=orig;
      return abriu;
    })()`),
     '20. sem item ativo, o toque tem de voltar a abrir a ficha da estrutura');

  // sair da revisão desarma o item, senão o toque no módulo viraria resposta
  reset();
  ev(`${abrirLoc}('neuronio',0); go('dashboard');`);
  eq(ev(`review.loc`), null, '20. sair da revisão tem de desarmar o item de Localização');

  // tópico que mede Localização só por mini-questão cai na múltipla escolha
  reset();
  ev(`${abrirLoc}('emocao',3)`);
  eq(ev(`review.loc`), null, '20. tópico sem âncora não pode abrir diagrama');
  ok(ev(`review.topicQs.length > 0`), '20. ele cai no caminho de múltipla escolha');
}

/* ---------- 21. a barra do painel é TROFÉU: com a trilha principal completa,
   ela lê 100% ----------

   Este bloco existe porque a revisão de código achou o defeito que a trilha de
   extras foi desenhada para evitar, e ele passou por todos os portões: a barra
   não usa `overallProgress`, usa `domainCoverageStats`, e essa varria MODULES
   inteiro. Com quatro extras no divisor, quem terminava os dezoito lia 82%.

   O portão antigo prendia a barra à função certa mas nunca aferia o NÚMERO, e
   passava por coincidência aritmética: 72/90 e 88/110 dão os dois 80%.

   A invariante aqui é a que importa: complete tudo o que conta, e a barra
   fecha em 100%. */
{
  const antes = ev('JSON.stringify(state.lessons)');
  ev(`(function(){
    trilhaPrincipal().forEach(function(m){
      m.lessons.forEach(function(_, li){ state.lessons[topicKey(m.id, li)] = 1; });
      state.doneQuiz[m.id] = 1;
    });
  })()`);
  const cob = ev('domainCoverageStats().value');
  eq(Math.round(cob * 100), 100,
     '21. com a trilha principal completa a barra deveria ler 100%, veio ' + Math.round(cob * 100));

  const st = ev('JSON.stringify(dashboardStats())');
  const d = JSON.parse(st);
  eq(d.readLessons, d.totalLessons,
     '21. os tiles do painel também contam só a trilha principal: ' + d.readLessons + '/' + d.totalLessons);

  /* e os extras seguem existindo, com SRS e revisão — só não entram na conta */
  ok(ev('trilhaExtras().length') > 0, '21. a trilha de extras sumiu do MODULES');
  ok(ev('MODULES.length') > ev('trilhaPrincipal().length'),
     '21. MODULES deveria conter as duas trilhas');

  ev(`state.lessons = ${antes}; state.doneQuiz = {};`);
}

/* ---------- 22. o quiz de módulo declara a aula que cobra ---------- */
{
  // toda questão tem `l` válido — é o que permite ela agendar por tópico
  const invalidas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.quiz.forEach((q,i)=>{
      if(!Number.isInteger(q.l) || q.l<0 || q.l>=m.lessons.length) r.push(m.id+' Q'+i+' l='+JSON.stringify(q.l));
    }));
    return r;
  })()`);
  eq(invalidas.length, 0, '22. questão de quiz de módulo sem `l` válido: ' + invalidas.slice(0,4).join(' | '));

  /* Catraca das aulas órfãs. São 8 aulas que nenhuma questão de módulo cobra —
     medido, não estimado. Fechar isso exigiria escrever questões novas, o que
     quebraria a grade de 4 por módulo, então fica como dívida declarada. O que
     este portão garante é que ela não CRESÇA: mexer no mapeamento e deixar mais
     uma aula sem cobrança falha aqui. */
  const orfas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{ if(!m.quiz.some(q=>q.l===li)) r.push(m.id+'-'+li); }));
    return r;
  })()`);
  eq(orfas.length, 8, '22. aulas sem questão de quiz de módulo mudou de 8 para ' + orfas.length + ': ' + orfas.join(', '));

  /* Dirige o quiz de módulo DE VERDADE — startQuiz, renderQuestion, answer,
     nextQ — em vez de montar as chamadas de evidência à mão. A primeira versão
     deste teste reimplementava a gravação e por isso passava mesmo com o escopo
     religado no módulo: testava a si mesma. */
  reset();
  ev(`(function(){
    currentModule = 0;
    quiz = { mod:0, i:0, correct:0, answered:false };
    startQuiz();
    const m = MODULES[0];
    for(let i=0; i<m.quiz.length; i++){
      renderQuestion();
      answer(quiz.opts.findIndex(o=>o.correct));
      nextQ();
    }
  })()`);
  ok(ev(`Object.keys(state.srs).length > 0`), '22. responder o quiz de módulo tem de agendar caixa de tópico');
  eq(ev(`Object.keys(state.dimensionEvidence).filter(k=>k.indexOf('M:')===0).length`), 0,
     '22. e nenhuma evidência pode ficar em escopo de módulo — o `l` diz qual tópico é');
  ok(ev(`Object.keys(state.dimensionEvidence).some(k=>k==='T:neuronio-0')`),
     '22. a questão que declara a aula 0 tem de gravar no tópico dela');

  // o tópico cuja única fonte é o quiz de módulo tem pergunta na revisão
  reset();
  ev(`(function(){
    const m=MODULES.find(x=>x.id==='emocao'), mi=MODULES.indexOf(m), li=0, key=topicKey('emocao',li);
    seedTopic(key);
    review={ queue:[{mi:mi, li:li, key:key, dim:'recognition', title:m.lessons[li].t,
                     mn:m.n, color:m.color, due:0, box:0, overdue:0}],
             ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
    loadReviewTopic();
  })()`);
  ok(ev(`review.topicQs.length > 0`),
     '22. tópico que só mede Reconhecimento pela questão de módulo precisa ter o que perguntar');
}

/* ---------- 23. o classificador não pode casar dentro de outra palavra ---------- */
{
  /* `fica\b` casava em "codifica" e "significa"; `depende` casava em
     "dependente". Seis questões definicionais eram lidas como localização ou
     causalidade. Estes casos são a prova de que a fronteira da esquerda existe. */
  const casos = [
    ['Como o cérebro codifica a intensidade de um estímulo forte?', 'location'],
    ['O desconto temporal significa que:', 'location'],
    ["Memória 'dependente de estado' significa que:", 'causality'],
    ['O que significa dizer que existe um tônus autonômico?', 'location'],
    ['Evidência convergente significa:', 'location']
  ];
  casos.forEach(c=>{
    const d = ev(`inferQuestionDimension({q:${JSON.stringify(c[0])}, lvl:0},{source:'x'})`);
    ok(d !== c[1],
       '23. "' + c[0].slice(0,42) + '..." não pode ser classificada como ' + c[1] +
       ' — a palavra que dispara está dentro de outra (veio ' + d + ')');
  });
  // e as ocorrências legítimas continuam valendo
  eq(ev(`inferQuestionDimension({q:'O córtex motor primário fica:', lvl:0},{source:'x'})`), 'location',
     '23. "fica" como palavra inteira continua sendo localização');
  eq(ev(`inferQuestionDimension({q:'A resposta depende de qual mecanismo?', lvl:0},{source:'x'})`), 'causality',
     '23. "depende" como palavra inteira continua sendo causalidade');
}

/* ---------- 24. a ponte de mão dupla entre aula e ficha ---------- */
{
  /* As fichas de CONCEPTS sempre souberam quais aulas explicam cada condição;
     a aula não sabia de volta. Este índice inverte o mapa — sem conteúdo novo.
     A catraca existe porque a cobertura só pode crescer: apagar o `m` de uma
     ficha silenciosamente tiraria a condição de dentro da aula. */
  const cobertas = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>
    t+(conceitosQueUsam(m.id,li).length?1:0),0),0)`);
  ok(cobertas >= 52, '24. o índice reverso cobria 52 das 64 aulas e caiu para ' + cobertas);

  const comCondicao = ev(`MODULES.reduce((s,m)=>s+m.lessons.reduce((t,_,li)=>
    t+(conceitosQueUsam(m.id,li).some(k=>CONCEPTS[k].cat==='condicao')?1:0),0),0)`);
  ok(comCondicao >= 33, '24. aulas citadas por ao menos uma condição caíram de 33 para ' + comCondicao);

  // toda chave devolvida tem de existir
  const fantasmas = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>conceitosQueUsam(m.id,li).forEach(k=>{
      if(!CONCEPTS[k]) r.push(m.id+'-'+li+' -> '+k);
    })));
    return r;
  })()`);
  eq(fantasmas.length, 0, '24. o índice devolveu chave que não existe: ' + fantasmas.slice(0,3).join(', '));

  /* Condição antes de estado/queixa: quem tem diagnóstico procura por ele,
     quem não tem procura pelo que sente. */
  const foraDeOrdem = ev(`(function(){
    const r=[];
    MODULES.forEach(m=>m.lessons.forEach((_,li)=>{
      const ks=conceitosQueUsam(m.id,li);
      const pos=ks.map(k=>ORDEM_CATEGORIA.indexOf(CONCEPTS[k].cat));
      for(let i=1;i<pos.length;i++) if(pos[i]<pos[i-1]){ r.push(m.id+'-'+li); break; }
    }));
    return r;
  })()`);
  eq(foraDeOrdem.length, 0, '24. ordem de categoria quebrada em: ' + foraDeOrdem.slice(0,3).join(', '));

  /* Aviso clínico nas fichas de condição. A Dislexia estava sem, ao lado de
     TDAH e Autismo que têm — corrigido.

     Sobram 7 sem: insônia, Parkinson, Alzheimer, AVC, epilepsia, esclerose
     múltipla e miastenia gravis. O padrão aparente é que as psiquiátricas e do
     neurodesenvolvimento têm o aviso e as neurológicas clássicas não. Pode ser
     critério editorial ou esquecimento — é decisão de conteúdo, não de código,
     então aqui fica só a catraca: a lista não pode crescer. */
  const SEM_AVISO_CONHECIDAS = ['insonia','parkinson','alzheimer','avc','epilepsia','esclerose','miastenia'];
  const semAviso = ev(`Object.keys(CONCEPTS).filter(k=>CONCEPTS[k].cat==='condicao' && !CONCEPTS[k].nota)`);
  const novas = semAviso.filter(k=>SEM_AVISO_CONHECIDAS.indexOf(k) < 0);
  eq(novas.length, 0, '24. ficha de condição NOVA sem aviso clínico: ' + novas.join(', '));
  ok(semAviso.length <= SEM_AVISO_CONHECIDAS.length,
     '24. a lista de fichas sem aviso cresceu de ' + SEM_AVISO_CONHECIDAS.length + ' para ' + semAviso.length);
  ok(ev(`Boolean(CONCEPTS.dislexia.nota && CONCEPTS.tdah.nota && CONCEPTS.autismo.nota)`),
     '24. as três do neurodesenvolvimento precisam do aviso clínico');

  // a aula que motivou tudo isto
  const emAtencao2 = ev(`conceitosQueUsam('atencao',2).map(k=>CONCEPTS[k].n)`);
  ok(emAtencao2.indexOf('TDAH') === 0,
     '24. a aula do pré-frontal tem de abrir pela ficha de TDAH, e veio: ' + emAtencao2.slice(0,3).join(', '));
}

/* ---------- 25. baralho de terminologia (termos técnicos do glossário) ---------- */
{
  const TERMO = 'potencial de ação';   // existe no GLOSSARY
  const CAP = ev('TERM_INTRO_PER_SESSION');
  ok(ev(`!!GLOSSARY['${TERMO}']`), '25. o termo de teste precisa existir no GLOSSARY');

  // agendar um termo novo o semeia na caixa 0, vencendo amanhã
  reset();
  ev(`scheduleTerm('${TERMO}', 1)`);
  eq(ev(`state.termSrs['${TERMO}'].box`), 0, '25. termo novo entra na caixa 0');
  eq(ev(`state.termSrs['${TERMO}'].reps`), 1, '25. e registra a tentativa');
  eq(ev(`state.termSrs['${TERMO}'].due`), startOfDay(Date.now()) + INTERVALS[0]*DAY,
     '25. a primeira volta do termo é em 1 dia');

  // acertar quando vencido promove a caixa
  reset();
  ev(`state.termSrs['${TERMO}'] = { box:1, due: ${startOfDay(Date.now())} - ${DAY}, last:0, reps:1, lapses:0 }`);
  ev(`scheduleTerm('${TERMO}', 1)`);
  eq(ev(`state.termSrs['${TERMO}'].box`), 2, '25. acerto no prazo vencido promove a caixa');

  // errar rebaixa, limitado por SRS_LAPSE_CAP, e conta o lapso
  reset();
  ev(`state.termSrs['${TERMO}'] = { box:5, due: ${startOfDay(Date.now())} - ${DAY}, last:0, reps:4, lapses:0 }`);
  ev(`scheduleTerm('${TERMO}', 0)`);
  ok(ev(`state.termSrs['${TERMO}'].box <= 2`), '25. erro nunca deixa acima da caixa de reconstrução (LAPSE_CAP)');
  eq(ev(`state.termSrs['${TERMO}'].lapses`), 1, '25. e conta o lapso');

  // treinar antes da hora NÃO avança
  reset();
  ev(`state.termSrs['${TERMO}'] = { box:2, due: ${startOfDay(Date.now())} + 5*${DAY}, last:0, reps:2, lapses:0 }`);
  ev(`scheduleTerm('${TERMO}', 1)`);
  eq(ev(`state.termSrs['${TERMO}'].box`), 2, '25. acertar antes do vencimento não promove');

  // termo fora do glossário não agenda
  reset();
  ev(`scheduleTerm('termo-que-nao-existe-xyz', 1)`);
  eq(ev(`state.termSrs['termo-que-nao-existe-xyz'] === undefined`), true,
     '25. termo fora do glossário não pode ser agendado');

  // dueTerms: baralho vazio oferece termos NOVOS, no máximo o teto por sessão
  reset();
  ok(ev(`dueTerms().length`) > 0 && ev(`dueTerms().length`) <= CAP,
     '25. baralho vazio oferece termos novos, no máximo TERM_INTRO_PER_SESSION');
  ok(ev(`dueTerms().every(x=>x.kind==='term' && x.novo===true)`),
     '25. com baralho vazio todos os itens são termos novos');

  // termo agendado para o futuro não vence hoje
  reset();
  ev(`state.termSrs['${TERMO}'] = { box:3, due: ${startOfDay(Date.now())} + 5*${DAY}, last:0, reps:2, lapses:0 }`);
  ok(ev(`!dueTerms().some(x=>x.term==='${TERMO}' && !x.novo)`),
     '25. termo com vencimento no futuro não entra como vencido');

  // distratores: n distintos, nenhum igual ao alvo
  reset();
  eq(ev(`termDistractors('${TERMO}',3).length`), 3, '25. termDistractors devolve o número pedido');
  ok(ev(`termDistractors('${TERMO}',3).every(t=>t!=='${TERMO}')`), '25. nenhum distrator é o próprio termo');
  ok(ev(`new Set(termDistractors('${TERMO}',3)).size === 3`), '25. distratores são distintos');

  // fluxo na revisão: monta 4 alternativas com a correta, e responder agenda a caixa
  reset();
  ev(`review = { queue:[{kind:'term', term:'${TERMO}', box:0, due:0, overdue:0, novo:true}],
                 ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] }`);
  ev(`loadReviewTerm()`);
  eq(ev(`review.termOpts.length`), 4, '25. o item de termo monta 4 alternativas');
  ok(ev(`review.termOpts.some(o=>o.correct && o.text==='${TERMO}')`),
     '25. a alternativa correta é o termo certo');
  // responde numa alternativa ERRADA (evita awardXP/renderHeader no stub) e avança
  ev(`answerReviewTerm(review.termOpts.findIndex(o=>!o.correct)); nextReview();`);
  eq(ev(`(state.termSrs['${TERMO}']||{}).reps`), 1, '25. responder o item agenda a caixa do termo');
  ok(ev(`review.results.length===1 && review.results[0].kind==='term' && review.results[0].passed===false`),
     '25. o resultado do termo entra no resumo da sessão');
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
