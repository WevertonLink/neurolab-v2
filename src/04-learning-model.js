/* NeuroLab V2 · Fase 3 · domínio multidimensional e revisão transparente */
const KNOWLEDGE_DIMS = [
  {id:'recognition', label:'Reconhecimento', short:'Reconhecer', desc:'Identificar termos, definições e distinções básicas.'},
  {id:'location', label:'Localização', short:'Localizar', desc:'Saber onde uma estrutura, célula ou processo se encontra.'},
  {id:'causality', label:'Explicação causal', short:'Explicar', desc:'Reconstruir por que uma etapa leva à seguinte.'},
  {id:'application', label:'Aplicação', short:'Aplicar', desc:'Usar o conhecimento em uma situação nova.'}
];
const KNOWLEDGE_DIM_IDS = KNOWLEDGE_DIMS.map(d=>d.id);

function clampKnowledge(v){ v=Number(v); return isFinite(v)?Math.max(0,Math.min(1,v)):0; }
function dimMeta(id){ return KNOWLEDGE_DIMS.find(d=>d.id===id)||KNOWLEDGE_DIMS[0]; }
function topicScope(key){ return 'T:'+key; }
function moduleScope(id){ return 'M:'+id; }
function normalizeQuestionText(v){
  return String(v||'').replace(/<[^>]*>/g,' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}

function inferQuestionDimension(q, context){
  if(q && KNOWLEDGE_DIM_IDS.includes(q.dim)) return q.dim;
  const t=normalizeQuestionText(q&&q.q);
  const strongLocation=/(onde\b|em qual (?:regiao|estrutura|lobo|nucleo|parte|area)|qual estrutura|localizad|fica\b|membrana (?:pre|pos)|pre-sinaptic|pos-sinaptic)/;
  const causal=/(por que|porque|mecanismo|caus|consequ|o que acontece|o que ocorr|se .*?(?:bloque|inib|les|aument|diminu|remov)|leva a|resulta|permite|depende|sequencia|primeiro.*depois|feedback|erro de previsao|como .*? produz)/;
  const application=/(caso\b|cenario|paciente|uma pessoa|durante\b|situacao|qual seria|prever|aplicar|exemplo|comparad|tende a|diante de|ao encontrar|na pratica)/;
  if(strongLocation.test(t)) return 'location';
  if(causal.test(t)) return 'causality';
  if(application.test(t)) return 'application';
  const lvl=Number(q&&q.lvl)||0;
  if(lvl>=2) return 'causality';
  if(lvl===1) return 'application';
  return 'recognition';
}

function blankEvidence(){ return {score:0, attempts:0, correct:0, best:0, last:0, updatedAt:0, sources:{}}; }
function normalizeEvidence(rec){
  const out=Object.assign(blankEvidence(), rec&&typeof rec==='object'?rec:{});
  ['score','best','last'].forEach(k=>out[k]=clampKnowledge(out[k]));
  out.correct=Math.max(0,Number(out.correct)||0);
  out.attempts=Math.max(0,Number(out.attempts)||0);
  out.updatedAt=Math.max(0,Number(out.updatedAt)||0);
  if(!out.sources||typeof out.sources!=='object'||Array.isArray(out.sources)) out.sources={};
  return out;
}
function ensureEvidenceContainer(target){
  if(!target.dimensionEvidence||typeof target.dimensionEvidence!=='object'||Array.isArray(target.dimensionEvidence)) target.dimensionEvidence={};
  if(!target.questionHistory||typeof target.questionHistory!=='object'||Array.isArray(target.questionHistory)) target.questionHistory={};
  Object.keys(target.dimensionEvidence).forEach(scope=>{
    const group=target.dimensionEvidence[scope];
    if(!group||typeof group!=='object'||Array.isArray(group)){ delete target.dimensionEvidence[scope]; return; }
    KNOWLEDGE_DIM_IDS.forEach(id=>{ if(group[id]) group[id]=normalizeEvidence(group[id]); });
  });
}
function legacySeed(target, scope, dim, value, touched, source){
  if(!touched) return;
  const score=clampKnowledge(value);
  if(!target.dimensionEvidence[scope]) target.dimensionEvidence[scope]={};
  if(target.dimensionEvidence[scope][dim]) return;
  target.dimensionEvidence[scope][dim]={score,attempts:1,correct:score,best:score,last:score,updatedAt:0,legacy:true,sources:{[source]:1}};
}
function migrateDimensionsFromLegacy(target){
  ensureEvidenceContainer(target);
  if(typeof MODULES==='undefined') return target;
  MODULES.forEach(m=>{
    const mtouched=Object.prototype.hasOwnProperty.call(target.mastery||{},m.id);
    legacySeed(target,moduleScope(m.id),'recognition',(target.mastery||{})[m.id],mtouched,'legacy-module-quiz');
    m.lessons.forEach((_,li)=>{
      const key=(typeof topicKey==='function')?topicKey(m.id,li):(m.id+'-'+li);
      const rt=Object.prototype.hasOwnProperty.call(target.topicMastery||{},key);
      legacySeed(target,topicScope(key),'recognition',(target.topicMastery||{})[key],rt,'legacy-mini-quiz');
      const ct=Object.prototype.hasOwnProperty.call(target.topicExplain||{},key);
      legacySeed(target,topicScope(key),'causality',(target.topicExplain||{})[key],ct,'legacy-self-explanation');
    });
  });
  return target;
}

function evidenceRecord(scope, dim){
  if(!state.dimensionEvidence) state.dimensionEvidence={};
  if(!state.dimensionEvidence[scope]) state.dimensionEvidence[scope]={};
  if(!state.dimensionEvidence[scope][dim]) state.dimensionEvidence[scope][dim]=blankEvidence();
  state.dimensionEvidence[scope][dim]=normalizeEvidence(state.dimensionEvidence[scope][dim]);
  return state.dimensionEvidence[scope][dim];
}
/* prediction era .16 quando a previsão só existia como pré-teste, onde errar é
   o objetivo e não deveria mover a nota. Na revisão ela é prova de verdade, com
   a aula já lida — .34, o mesmo do quiz de módulo, que é a outra múltipla
   escolha respondida em contexto de avaliação. */
function evidenceWeight(source){
  return ({review:.48,'module-quiz':.34,'mini-quiz':.38,'self-rate':.22,prediction:.34,'domain-case':.30,counterfactual:.32}[source]||.28);
}
function recordDimensionEvidence(scope, dim, result, source, meta){
  if(!scope||!KNOWLEDGE_DIM_IDS.includes(dim)) return;
  result=clampKnowledge(result);
  const rec=evidenceRecord(scope,dim);
  const w=evidenceWeight(source);
  rec.score=rec.attempts===0?result:(rec.score*(1-w)+result*w);
  rec.attempts+=1;
  rec.correct+=result;
  rec.best=Math.max(rec.best,result);
  rec.last=result;
  rec.updatedAt=Date.now();
  rec.legacy=false;
  rec.sources[source]=(rec.sources[source]||0)+1;
  if(meta&&meta.questionId){
    if(!state.questionHistory) state.questionHistory={};
    state.questionHistory[meta.questionId]={scope,dim,result,source,at:rec.updatedAt};
  }
  // gravar evidência é o que agenda: se houver um lote aberto, esta evidência
  // entra no cálculo do próximo intervalo desta dimensão.
  bufferEvidence(scope, dim, result);
}
function scopeDimensionScore(scope, dim){
  const group=state.dimensionEvidence&&state.dimensionEvidence[scope];
  const rec=group&&group[dim];
  return rec&&Number(rec.attempts)>0?clampKnowledge(rec.score):null;
}
function topicDimensionScores(key){
  const out={}; KNOWLEDGE_DIM_IDS.forEach(id=>out[id]=scopeDimensionScore(topicScope(key),id)); return out;
}
function weakestDimensionForTopic(key){
  const scores=topicDimensionScores(key);
  const tried=KNOWLEDGE_DIMS.filter(d=>scores[d.id]!==null);
  if(!tried.length) return Object.assign({},KNOWLEDGE_DIMS[0],{score:null});
  const d=tried.sort((a,b)=>scores[a.id]-scores[b.id])[0];
  return Object.assign({},d,{score:scores[d.id]});
}
function formatKnowledgeScore(v){ return v===null?'—':Math.round(v*100)+'%'; }
function knowledgeTone(v){ if(v===null)return 'empty'; if(v>=.78)return 'strong'; if(v>=.5)return 'forming'; return 'fragile'; }
function dimensionChipHTML(q, context){
  const id=inferQuestionDimension(q,context); const d=dimMeta(id);
  return `<span class="dim-chip dim-${id}">${d.label}</span>`;
}
function topicDimensionStripHTML(moduleId, lessonIdx){
  const key=moduleId+'-'+lessonIdx; const scores=topicDimensionScores(key);
  return `<div class="topic-dims" id="topic-dims-${moduleId}-${lessonIdx}" aria-label="Domínio por dimensão deste tópico">${KNOWLEDGE_DIMS.map(d=>{const v=scores[d.id];return `<span class="topic-dim ${knowledgeTone(v)}"><small>${d.short}</small><b>${formatKnowledgeScore(v)}</b></span>`;}).join('')}</div>`;
}
function refreshTopicKnowledge(moduleId,lessonIdx){
  const el=document.getElementById('topic-dims-'+moduleId+'-'+lessonIdx);
  if(el) el.outerHTML=topicDimensionStripHTML(moduleId,lessonIdx);
}

function resolveQuestionContextFromKey(key){
  let m;
  let hit=String(key||'').match(/^M:(.+)-(\d+):(\d+)$/);
  if(hit){
    m=MODULES.find(x=>x.id===hit[1]); const li=Number(hit[2]), qi=Number(hit[3]);
    const q=m&&MINI_QUIZZES[m.id]&&MINI_QUIZZES[m.id][li]&&MINI_QUIZZES[m.id][li][qi];
    return q?{q,scope:topicScope(m.id+'-'+li),questionId:key,context:{module:m,lessonIndex:li,source:'mini'}}:null;
  }
  hit=String(key||'').match(/^Q:([^:]+):(\d+)$/);
  if(hit){
    m=MODULES.find(x=>x.id===hit[1]); const qi=Number(hit[2]); const q=m&&m.quiz[qi];
    return q?{q,scope:moduleScope(m.id),questionId:key,context:{module:m,source:'module'}}:null;
  }
  return null;
}
function recordSelfRateEvidence(key,val){
  const ctx=resolveQuestionContextFromKey(key); if(!ctx) return;
  const map=(typeof RATE_VAL!=='undefined')?RATE_VAL:{clear:1,partial:.5,none:0};
  const dim=inferQuestionDimension(ctx.q,ctx.context);
  recordDimensionEvidence(ctx.scope,dim,map[val]||0,'self-rate',{questionId:'S:'+ctx.questionId});
  if(ctx.context&&ctx.context.source==='mini') refreshTopicKnowledge(ctx.context.module.id,ctx.context.lessonIndex);
}

/* ---------------------------------------------------------------------
   Quais dimensões este tópico consegue medir

   Derivada do conteúdo, nunca gravada no estado. É ela que decide quais
   caixas do cronograma existem — e é por isso que acrescentar uma forma
   nova de medição não exige migração: quando a reconstrução da cadeia
   passar a valer para os 64 tópicos, 'causality' entra aqui e as caixas
   nascem sozinhas na próxima interação.
   --------------------------------------------------------------------- */
const _measurableCache = {};
function measurableDimensions(moduleId, lessonIndex){
  const ck = moduleId + '-' + lessonIndex;
  if(_measurableCache[ck]) return _measurableCache[ck];
  const found = {};
  const qs = (typeof MINI_QUIZZES !== 'undefined' && MINI_QUIZZES[moduleId] && MINI_QUIZZES[moduleId][lessonIndex]) || [];
  qs.forEach(q=>{ found[inferQuestionDimension(q,{module:moduleId, lessonIndex:lessonIndex, source:'mini'})] = 1; });
  // o contrafactual do Modo Domínio mede explicação causal neste tópico
  if(typeof DOMAIN_COUNTERFACTUALS !== 'undefined' &&
     DOMAIN_COUNTERFACTUALS.some(c=>c.module===moduleId && c.lesson===lessonIndex)) found.causality = 1;
  // a previsão do tópico é prova de Aplicação — mas só na revisão, nunca no
  // primeiro contato, onde ela é pré-teste (ver predictAsReviewQuestion)
  if(typeof PREDICT !== 'undefined' && PREDICT[moduleId] && PREDICT[moduleId][lessonIndex]) found.application = 1;
  // a cadeia do tópico é prova de Explicação causal: remontá-la na ordem é a
  // prova mais exigente que o app tem, porque não há alternativa para
  // reconhecer. Exige 4 etapas ou mais — abaixo disso a permutação é pequena
  // demais para distinguir quem entendeu de quem chutou.
  if(typeof CHAIN !== 'undefined' && CHAIN[moduleId] && CHAIN[moduleId][lessonIndex]
     && Array.isArray(CHAIN[moduleId][lessonIndex].s)
     && CHAIN[moduleId][lessonIndex].s.length >= 4) found.causality = 1;
  const list = KNOWLEDGE_DIM_IDS.filter(d=>found[d]);
  _measurableCache[ck] = list;
  return list;
}
function canMeasure(moduleId, lessonIndex, dim){
  return measurableDimensions(moduleId, lessonIndex).indexOf(dim) > -1;
}

/* ---------------------------------------------------------------------
   Acúmulo por atividade

   Uma atividade produz várias evidências da mesma dimensão — o mini quiz
   tem 3 perguntas. Promover a caixa uma vez por evidência faria o
   intervalo saltar de 1 para 14 dias numa sentada só, corrompendo o
   Leitner em silêncio. Então a evidência acumula aqui e o agendamento é
   confirmado uma vez por dimensão, no fim.

   Atividade que NÃO abre um lote não agenda nada — é assim que o quiz de
   módulo e os casos integrados continuam medindo o módulo sem creditar
   tópico errado. O escopo M: também é descartado no commit, por garantia.
   --------------------------------------------------------------------- */
let _evidenceBatch = null;
function beginEvidenceBatch(){ _evidenceBatch = {}; }
function bufferEvidence(scope, dim, result){
  if(!_evidenceBatch || !scope) return;
  if(!_evidenceBatch[scope]) _evidenceBatch[scope] = {};
  const b = _evidenceBatch[scope][dim] || (_evidenceBatch[scope][dim] = {sum:0, n:0});
  b.sum += clampKnowledge(result);
  b.n += 1;
}
function commitEvidenceBatch(){
  const buf = _evidenceBatch;
  _evidenceBatch = null;
  if(!buf) return [];
  const feito = [];
  Object.keys(buf).forEach(scope=>{
    if(scope.indexOf('T:') !== 0) return;   // só tópico entra no cronograma
    const key = scope.slice(2);
    Object.keys(buf[scope]).forEach(dim=>{
      const b = buf[scope][dim];
      const score = b.n ? b.sum / b.n : 0;
      if(typeof scheduleDimension === 'function') scheduleDimension(key, dim, score);
      feito.push({key:key, dim:dim, score:score});
    });
  });
  return feito;
}

/* ---------------------------------------------------------------------
   Reconstrução de cadeia — o núcleo puro

   Remontar a sequência causal na ordem certa é a prova mais exigente que o
   app tem: não existe alternativa para reconhecer. Nasceu no Modo Domínio,
   presa aos 24 itens dele; estas duas funções são a parte que não depende
   de tela nem de qual atividade está chamando, para a revisão poder usar a
   mesma coisa nos 64 tópicos.
   --------------------------------------------------------------------- */

/* Embaralha determinístico pelo id: o mesmo tópico devolve sempre a mesma
   ordem, o que torna a atividade reproduzível e testável. A guarda do fim é
   o que impede a tarefa de virar brinde — sem ela, um id cuja soma de
   caracteres cai numa permutação identidade entregaria a cadeia já montada. */
function chainShuffle(chain, id){
  const list = chain.map((text,index)=>({text:text, index:index}));
  let seed = Array.from(String(id)).reduce((sum,ch)=>sum+ch.charCodeAt(0), 0);
  for(let i=list.length-1; i>0; i--){
    seed = (seed*9301+49297) % 233280;
    const j = Math.floor(seed/233280*(i+1));
    const tmp = list[i]; list[i] = list[j]; list[j] = tmp;
  }
  if(list.every((x,i)=>x.index===i) && list.length>1) list.push(list.shift());
  return list;
}

/* Compara por TEXTO, não por índice: duas etapas com o mesmo texto seriam
   intercambiáveis e ambas as ordens estariam causalmente certas. */
function chainIsCorrect(selectedTexts, chain){
  return Array.isArray(selectedTexts)
      && selectedTexts.length === chain.length
      && selectedTexts.every((text,index)=>text === chain[index]);
}

function setSrsReason(rec, code, key, score){
  rec.reason=code;
  rec.reasonAt=Date.now();
  rec.lastScore=typeof score==='number'?clampKnowledge(score):null;
  rec.weakDimension=weakestDimensionForTopic(key).id;
  rec.reasonInterval=SRS_INTERVALS[Math.max(0,Math.min(SRS_INTERVALS.length-1,Number(rec.box)||0))];
}
function normalizeSrsReason(rec,key){
  if(!rec.reason){
    if((rec.lapses||0)>0) rec.reason='lapse';
    else if((rec.reps||0)===0) rec.reason='first';
    else rec.reason='interval';
  }
  if(!KNOWLEDGE_DIM_IDS.includes(rec.weakDimension)) rec.weakDimension=weakestDimensionForTopic(key).id;
  if(!rec.reasonInterval) rec.reasonInterval=SRS_INTERVALS[Math.max(0,Math.min(SRS_INTERVALS.length-1,Number(rec.box)||0))];
  return rec;
}
function normalizeAllSrsReasons(){
  if(!state.srs||typeof state.srs!=='object') return;
  Object.keys(state.srs).forEach(key=>{
    const dims=state.srs[key]&&state.srs[key].dims;
    if(!dims||typeof dims!=='object') return;
    Object.keys(dims).forEach(d=>normalizeSrsReason(dims[d],key));
  });
}
function reviewReasonData(topic){
  const dims=(state.srs&&state.srs[topic.key]&&state.srs[topic.key].dims)||{};
  const rec=normalizeSrsReason(dims[topic.dim]||{},topic.key);
  // o item agora É uma dimensão, então o foco não precisa mais ser adivinhado
  const weak=KNOWLEDGE_DIM_IDS.includes(topic.dim)
    ? Object.assign({},dimMeta(topic.dim),{score:scopeDimensionScore(topicScope(topic.key),topic.dim)})
    : weakestDimensionForTopic(topic.key);
  let title,body;
  if(topic.overdue>0){ title='O intervalo já terminou'; body=`Este tópico venceu há ${topic.overdue} dia${topic.overdue!==1?'s':''}. Recuperar agora mede o que permaneceu sem apoio.`; }
  else if(rec.reason==='lapse'){ title='Volta mais cedo após uma dificuldade'; body='A última recuperação teve erro ou explicação incompleta, então o intervalo foi encurtado para reconstruir a memória.'; }
  else if(rec.reason==='first'){ title='Primeira recuperação depois do estudo'; body='A primeira volta acontece cedo para transformar familiaridade em lembrança recuperável.'; }
  else { title='O intervalo programado terminou'; body=`O tópico ficou ${rec.reasonInterval||SRS_INTERVALS[rec.box||0]} dia${(rec.reasonInterval||SRS_INTERVALS[rec.box||0])!==1?'s':''} sem apoio. Agora é o momento de testar retenção.`; }
  return {title,body,weak};
}
// Versão de uma linha, usada na lista de revisão do dashboard. O bloco extenso
// que existia dentro de cada questão saiu: repetia este mesmo texto — que o
// aluno já lê na lista, antes de começar — uma vez por pergunta do tópico.
function reviewReasonText(topic){ const r=reviewReasonData(topic); return `${r.title} · ${r.weak.label}`; }
function orderReviewQuestions(qs,key){
  const weak=weakestDimensionForTopic(key).id;
  return qs.map((q,i)=>Object.assign({_reviewIndex:i},q)).sort((a,b)=>{
    const aw=inferQuestionDimension(a)==weak?0:1, bw=inferQuestionDimension(b)==weak?0:1;
    return aw-bw || (Number(b.lvl||0)-Number(a.lvl||0)) || (a._reviewIndex-b._reviewIndex);
  });
}
