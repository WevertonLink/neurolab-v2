# Fase 2 — Aplicação: a previsão vira banco de perguntas da revisão

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar a cobertura da dimensão Aplicação de 40 para 64 tópicos usando as 64 provas de previsão que já existem, sem escrever conteúdo novo e sem transformar o pré-teste em avaliação.

**Architecture:** `PREDICT[mid][li]` já existe para os 64 tópicos, mas hoje só dá XP e não registra nada. Uma função adaptadora converte a previsão no formato de questão que a tela de revisão já consome, declarando `dim:'application'` para não depender do classificador por regex. O banco de perguntas do item de Aplicação alterna entre a previsão e as mini-questões de aplicação pela paridade de `reps` da própria caixa — sem estado novo. A previsão continua **sem registrar evidência no primeiro contato**, porque ali ela é pré-teste e errar é o objetivo; ela só vira evidência dentro da sessão de revisão, onde a aula já foi lida.

**Tech Stack:** JavaScript sem build, scripts clássicos com escopo global compartilhado (`src/01..06-*.js`). Testes locais em Node puro (`node:vm` com DOM stubado) em `tools/test-srs.js`. Playwright só no CI.

**Spec:** `docs/superpowers/specs/2026-08-14-cronograma-por-dimensao-design.md` (seção 6, "Fase 2 — Aplicação")

## Global Constraints

- **Sem build, sem módulos ES.** Toda função nova é declarada no escopo global de um `src/*.js` já existente. Nada de `import`/`export`.
- **Ordem de carga importa.** `04-learning-model.js` carrega antes de `05-app.js`. Referência a símbolo de arquivo posterior só dentro de corpo de função, protegida por `typeof X !== 'undefined'` — padrão já usado com `DOMAIN_COUNTERFACTUALS`.
- **Português sem abreviação em comentário e em texto de tela.** Comentário explica *por quê*, não *o quê*.
- **O portão local é `node tools/test-srs.js`.** Playwright não roda no Termux. Toda asserção nova entra nesse arquivo, no estilo já estabelecido: `ok(cond, msg)` e `eq(a, b, msg)`, com `ev('código')` avaliando dentro do contexto `vm`.
- **`reset()` antes de cada bloco de teste que mexe em estado** — é `ev('state = defaultState();')`.
- **Ao publicar:** `VERSION` no `sw.js` e o literal correspondente em `tools/audit-content.js` mudam juntos, senão o CI reprova.
- **Nunca fabricar agendamento.** Se `measurableDimensions` não lista a dimensão, `scheduleDimension` recusa. Nenhuma tarefa pode contornar essa guarda.

---

### Task 1: A previsão vira questão de revisão

**Files:**
- Modify: `src/05-app.js` — inserir duas funções logo após `predAnswered` (linha 5387)
- Modify: `src/05-app.js:1232-1246` — `loadReviewTopic`
- Test: `tools/test-srs.js` — novo bloco 10, antes do bloco `/* ---------- resultado ---------- */`

**Divergência deliberada da spec.** A seção 6 da spec diz que o item de Aplicação
"sorteia entre a previsão e as mini-questões, com preferência pela previsão
quando ela ainda não apareceu naquela caixa". Implementar "ainda não apareceu"
exigiria um campo novo no registro da caixa só para lembrar disso. Este plano
troca por **alternância pela paridade de `reps`**, que já existe no registro: par
começa pela previsão, ímpar vai para as mini-questões. Entrega o mesmo efeito
— a previsão aparece primeiro e as duas fontes se revezam — sem estado novo, e
de forma determinística, que é o que torna a regra testável.

**Interfaces:**
- Consumes: `predOf(mid, idx)` (`src/05-app.js:5386`) → `{q, o, c, after}|null`; `srsDims(key)` (Fase 0) → `{[dim]: {box,due,last,reps,lapses,…}}|null`; `inferQuestionDimension(q, ctx)` (`src/04-learning-model.js:18`); `MINI_QUIZZES`
- Produces:
  - `predictAsReviewQuestion(moduleId, lessonIndex)` → `{q:string, o:string[], c:number, er:string, ew:string, lvl:1, dim:'application', _source:'prediction'}` ou `null`
  - `applicationBank(m, lessonIndex, key)` → `Array<question>`, onde `m` é o objeto de `MODULES`, `lessonIndex` é número e `key` é `topicKey(m.id, lessonIndex)`

- [ ] **Step 1: Escrever o teste que falha**

Inserir em `tools/test-srs.js`, imediatamente antes do comentário `/* ---------- resultado ---------- */`:

```js
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `node tools/test-srs.js`
Expected: FAIL. A primeira mensagem deve ser um erro de `ReferenceError: predictAsReviewQuestion is not defined` vindo de dentro de `ev(...)`, ou falhas do bloco 10.

- [ ] **Step 3: Implementar as duas funções**

Em `src/05-app.js`, inserir logo após a linha 5387 (`function predAnswered(...)`):

```js
/* A previsão foi escrita como PRÉ-teste: aparece antes do corpo da aula, com o
   texto velado até a resposta, porque é o erro de previsão que abre a janela
   para o conteúdo entrar. Por isso ela não registra evidência ali — ver
   commitPredict. Na revisão, porém, a aula já foi lida, e a mesma pergunta
   passa a ser uma prova legítima de Aplicação. Esta função a converte para o
   formato que a tela de revisão já consome.

   dim:'application' é DECLARADA de propósito: inferQuestionDimension respeita
   q.dim quando existe, então esta é a única questão do app que não depende do
   classificador por regex para saber o que mede. */
function predictAsReviewQuestion(moduleId, lessonIndex){
  const p = predOf(moduleId, lessonIndex);
  if(!p || !Array.isArray(p.o) || !p.o.length) return null;
  return { q:p.q, o:p.o, c:p.c,
           er:p.after, ew:p.after,   // o fechamento serve para acerto e para erro
           lvl:1, dim:'application', _source:'prediction' };
}

/* Banco de perguntas do item de Aplicação. Alterna entre a previsão e as
   mini-questões pela paridade de reps da própria caixa — sem campo novo no
   estado, e determinístico, que é o que torna isso testável. Começa pela
   previsão porque ela é a prova mais forte das duas: pede antecipar o
   comportamento do mecanismo, não reconhecer a alternativa certa. */
function applicationBank(m, lessonIndex, key){
  const pred = predictAsReviewQuestion(m.id, lessonIndex);
  const minis = ((typeof MINI_QUIZZES!=='undefined' && MINI_QUIZZES[m.id] && MINI_QUIZZES[m.id][lessonIndex]) || [])
    .filter(q=>inferQuestionDimension(q,{module:m, lessonIndex:lessonIndex, source:'review'}) === 'application');
  if(!pred) return minis;
  if(!minis.length) return [pred];
  const reps = ((srsDims(key) || {}).application || {}).reps || 0;
  return reps % 2 === 0 ? [pred] : minis;
}
```

- [ ] **Step 4: Ligar o banco na sessão de revisão**

Em `src/05-app.js`, substituir o corpo de `loadReviewTopic` (linhas 1232-1246) por:

```js
function loadReviewTopic(){
  const t = review.queue[review.ti];
  const m = MODULES[t.mi];
  const todas = (MINI_QUIZZES[m.id] && MINI_QUIZZES[m.id][t.li]) || [];
  // o item da fila é uma DIMENSÃO: só entram as perguntas que medem aquilo.
  // Volta mais curta e mais específica do que revisar o tópico em bloco.
  let qs;
  if(t.dim === 'application'){
    qs = applicationBank(m, t.li, t.key);
  } else {
    qs = todas.filter(q=>inferQuestionDimension(q,{module:m, lessonIndex:t.li, source:'review'}) === t.dim);
  }
  if(!qs.length) qs = todas;
  if(typeof orderReviewQuestions==='function') qs = orderReviewQuestions(qs, t.key);
  review.topicQs = qs; review.qi = 0; review.topicCorrect = 0;
  if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
  if(!qs.length){ advanceReviewTopic(); return; }
  renderReviewHead();
  renderReviewQuestion();
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `node tools/test-srs.js`
Expected: PASS — `Cronograma por dimensão: ok`, com o número de verificações maior que 41.

- [ ] **Step 6: Confirmar que os outros portões continuam verdes**

Run: `node tools/verifica-metaforas.js && node tools/audit-content.js`
Expected: `0 erro(s), 0 aviso(s)` e `Auditoria de conteúdo: ok`

- [ ] **Step 7: Commit**

```bash
cd /data/data/com.termux/files/home/neurolab-v2
HOME=/data/data/com.termux/files/home git add src/05-app.js tools/test-srs.js
HOME=/data/data/com.termux/files/home git commit -m "feat(revisao): a previsao vira questao dos itens de Aplicacao

PREDICT existia para os 64 topicos e so dava XP. Na revisao, onde a aula
ja foi lida, a mesma pergunta e uma prova legitima de Aplicacao.

predictAsReviewQuestion converte a previsao para o formato que a tela ja
consome e DECLARA dim:'application' — e a unica questao do app que nao
depende do classificador por regex para saber o que mede.

applicationBank alterna entre a previsao e as mini-questoes pela paridade
de reps da propria caixa: sem campo novo no estado e deterministico, que
e o que torna a regra testavel.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Aplicação passa a cobrir os 64 tópicos

**Files:**
- Modify: `src/04-learning-model.js:170-182` — `measurableDimensions`
- Test: `tools/test-srs.js` — novo bloco 11

**Interfaces:**
- Consumes: `PREDICT` (`src/05-app.js:5242`), acessado por `typeof` porque `05-app.js` carrega depois de `04-learning-model.js`
- Produces: nada de novo — muda o valor de retorno de `measurableDimensions`, que `scheduleDimension` e `seedTopic` já consomem

- [ ] **Step 1: Escrever o teste que falha**

Inserir em `tools/test-srs.js`, após o bloco 10:

```js
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
      if(!(Number.isInteger(p.c) && p.c >= 0 && p.c < (p.o||[]).length)) r.push(id+': índice correto fora da faixa');
      if(!p.after || !String(p.after).trim()) r.push(id+': sem fechamento');
    }));
    return r;
  })()`);
  eq(malformadas.length, 0, '11. previsões malformadas: ' + malformadas.slice(0,5).join(' | '));
}
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `node tools/test-srs.js`
Expected: FAIL com `11. toda aula tem previsão, então Aplicação deveria cobrir 64/64 — esperado 64, veio 40`

- [ ] **Step 3: Fazer `measurableDimensions` enxergar a previsão**

Em `src/04-learning-model.js`, dentro de `measurableDimensions`, inserir logo após o bloco do `DOMAIN_COUNTERFACTUALS` (linhas 176-178) e antes de `const list = …`:

```js
  // a previsão do tópico é prova de Aplicação — mas só na revisão, nunca no
  // primeiro contato, onde ela é pré-teste (ver predictAsReviewQuestion)
  if(typeof PREDICT !== 'undefined' && PREDICT[moduleId] && PREDICT[moduleId][lessonIndex]) found.application = 1;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `node tools/test-srs.js`
Expected: PASS

- [ ] **Step 5: Confirmar que a invariante de mensurabilidade continua válida**

Run: `node tools/test-srs.js`
Expected: o bloco 3 (`agendou uma dimensão que o tópico não consegue medir`) continua passando. Se ele falhar, o teste do bloco 3 usava `location` em `neuronio-0` como dimensão não-mensurável e essa premissa não mudou — investigar antes de seguir.

- [ ] **Step 6: Commit**

```bash
cd /data/data/com.termux/files/home/neurolab-v2
HOME=/data/data/com.termux/files/home git add src/04-learning-model.js tools/test-srs.js
HOME=/data/data/com.termux/files/home git commit -m "feat(cronograma): Aplicacao cobre os 64 topicos via PREDICT

measurableDimensions passa a considerar a previsao do topico como fonte
de Aplicacao. Cobertura sai de 40 para 64, e o total de caixas de 164
para ~188 — sem migracao, porque a funcao e derivada do conteudo e nunca
gravada, exatamente o que a Fase 0 preparou.

Junto vem o portao de forma do banco: 64 previsoes, cada uma com pelo
menos 3 alternativas, indice correto dentro da faixa e fechamento nao
vazio. Se a caixa de Aplicacao existe, tem de haver com o que alimenta-la.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: A evidência da previsão tem fonte e peso próprios

**Files:**
- Modify: `src/04-learning-model.js:83-85` — `evidenceWeight`
- Modify: `src/05-app.js:1287` — a linha de `recordDimensionEvidence` dentro de `answerReview`
- Test: `tools/test-srs.js` — novo bloco 12

**Interfaces:**
- Consumes: `q._source` produzido por `predictAsReviewQuestion` na Task 1
- Produces: evidência com `source:'prediction'` e `questionId:'RP:<topicKey>'`

- [ ] **Step 1: Escrever o teste que falha**

Inserir em `tools/test-srs.js`, após o bloco 11:

```js
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `node tools/test-srs.js`
Expected: FAIL com `12. na revisão a previsão é prova real; .16 era o peso do pré-teste — esperado 0.34, veio 0.16`

- [ ] **Step 3: Ajustar o peso**

Em `src/04-learning-model.js`, substituir as linhas 83-85 por:

```js
/* prediction era .16 quando a previsão só existia como pré-teste, onde errar é
   o objetivo e não deveria mover a nota. Na revisão ela é prova de verdade, com
   a aula já lida — .34, o mesmo do quiz de módulo, que é a outra múltipla
   escolha respondida em contexto de avaliação. */
function evidenceWeight(source){
  return ({review:.48,'module-quiz':.34,'mini-quiz':.38,'self-rate':.22,prediction:.34,'domain-case':.30,counterfactual:.32}[source]||.28);
}
```

- [ ] **Step 4: Fazer `answerReview` respeitar a origem da questão**

Em `src/05-app.js`, substituir a linha 1287 por:

```js
  if(typeof recordDimensionEvidence==='function'){
    const t=review.queue[review.ti];
    const dim=inferQuestionDimension(q,{source:'review'});
    // a previsão carrega a própria origem, para dar para separar na telemetria
    // depois o que veio de banco de revisão e o que veio de prova de previsão
    const fonte = q._source || 'review';
    const qid = q._source==='prediction'
      ? 'RP:'+t.key
      : 'R:'+t.key+':'+(q._reviewIndex!==undefined?q._reviewIndex:review.qi);
    recordDimensionEvidence(topicScope(t.key),dim,right?1:0,fonte,{questionId:qid});
  }
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `node tools/test-srs.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
cd /data/data/com.termux/files/home/neurolab-v2
HOME=/data/data/com.termux/files/home git add src/04-learning-model.js src/05-app.js tools/test-srs.js
HOME=/data/data/com.termux/files/home git commit -m "feat(evidencia): previsao respondida na revisao tem fonte e peso proprios

O peso 'prediction' estava declarado em evidenceWeight desde sempre e
nunca era usado, com valor .16 — calibrado para o pre-teste, onde errar e
o objetivo e nao deveria mover a nota. Na revisao a aula ja foi lida e a
pergunta e prova de verdade: sobe para .34, o mesmo do quiz de modulo,
que e a outra multipla escolha respondida em contexto de avaliacao.

answerReview passa a registrar com a origem que a questao carrega, e com
questionId 'RP:<topico>', para dar para separar na telemetria o que veio
do banco de revisao do que veio da previsao.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Guarda de regressão do pré-teste, versão e documentação

**Files:**
- Test: `tools/test-srs.js` — novo bloco 13
- Modify: `sw.js:10` — `VERSION`
- Modify: `tools/audit-content.js:171` — o literal casado
- Modify: `docs/ARQUITETURA_APRENDIZAGEM.md` — seções 4.2 e 8

**Interfaces:**
- Consumes: `commitPredict(idx, k, ev)` (`src/05-app.js:5421`), `predKey(mid, idx)` (`src/05-app.js:5385`), `currentModule`
- Produces: nada — esta tarefa protege o que já existe

- [ ] **Step 1: Escrever a guarda que trava o comportamento correto**

Inserir em `tools/test-srs.js`, após o bloco 12:

```js
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
```

- [ ] **Step 2: Rodar e confirmar que passa de primeira**

Run: `node tools/test-srs.js`
Expected: PASS. Esta guarda descreve o comportamento que já é correto hoje; ela existe para impedir que alguém "conserte" a previsão achando que ela deveria pontuar.

- [ ] **Step 3: Provar que a guarda sabe falhar**

Este passo é obrigatório: uma guarda que não sabe falhar não guarda nada.

```bash
cd /data/data/com.termux/files/home/neurolab-v2
cp src/05-app.js /tmp/05.bak
perl -0pi -e "s/  state\.predCredit\[key\] = k;/  state.predCredit[key] = k; if(typeof recordDimensionEvidence==='function'){ beginEvidenceBatch(); recordDimensionEvidence(topicScope(topicKey(m.id,idx)),'application',k===predOf(m.id,idx).c?1:0,'prediction',{}); commitEvidenceBatch(); }/" src/05-app.js
node tools/test-srs.js
```
Expected: FAIL, com a mensagem do bloco 13 sobre o pré-teste.

Depois restaurar:
```bash
cp /tmp/05.bak src/05-app.js && rm /tmp/05.bak && node tools/test-srs.js
```
Expected: PASS

- [ ] **Step 4: Subir a versão do cache offline nos dois lugares**

```bash
cd /data/data/com.termux/files/home/neurolab-v2
perl -pi -e "s/neurolab-v1-8-0/neurolab-v1-8-1/" sw.js tools/audit-content.js
grep -n "neurolab-v1-8-1" sw.js tools/audit-content.js
```
Expected: uma ocorrência em cada arquivo. Sem isso, o service worker serve o JavaScript antigo e a mudança não chega a ninguém.

- [ ] **Step 5: Atualizar a documentação de arquitetura**

Em `docs/ARQUITETURA_APRENDIZAGEM.md`, seção 4.2, substituir o bloco de cobertura por:

```
recognition  50/64 tópicos      causality    63/64 tópicos
location     11/64 tópicos      application  64/64 tópicos
```

e trocar a frase `Hoje isso dá **164 caixas das 256 possíveis**` por `Hoje isso dá **188 caixas das 256 possíveis**`.

Na seção 8, na linha da tabela de escritas referente a `prova de previsão`, trocar a coluna `dimensionEvidence` de `—` para `✅ `T:` application (só na revisão)`.

- [ ] **Step 6: Rodar todos os portões locais**

Run: `node tools/verifica-metaforas.js && node tools/audit-content.js && node tools/test-srs.js`
Expected: os três verdes, incluindo `versão do cache offline não foi atualizada` passando com o literal novo.

- [ ] **Step 7: Commit e push**

```bash
cd /data/data/com.termux/files/home/neurolab-v2
HOME=/data/data/com.termux/files/home git add -A
HOME=/data/data/com.termux/files/home git commit -m "test(previsao): trava o pre-teste como pre-teste; sw 1-8-1

Guarda de regressao: responder a previsao no primeiro contato nao pode
registrar evidencia, nao pode agendar e nao pode escrever no historico —
so o credito de XP. Ali errar e o objetivo, e e o erro de previsao que
abre a janela para o conteudo entrar. Sem esta guarda, e questao de tempo
ate alguem 'consertar' a previsao achando que ela deveria pontuar.

Validada por mutacao: com o registro de evidencia plantado em
commitPredict, o portao falha.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
for i in 1 2 3 4 5 6; do HOME=/data/data/com.termux/files/home git push -q origin main 2>/dev/null && break || sleep 3; done
git status -sb | head -1
```
Expected: `## main...origin/main` sem `ahead`. A rede aqui é NAT64 instável; falha de resolução de nome no push é comum e o laço já repete.

---

## Verificação final da fase

- [ ] `node tools/verifica-metaforas.js && node tools/audit-content.js && node tools/test-srs.js` — três verdes
- [ ] `node tools/test-srs.js` reporta pelo menos 55 verificações (eram 41 ao fim da Fase 0)
- [ ] `canMeasure(m.id, li, 'application')` verdadeiro para os 64 tópicos
- [ ] Abrir o app, entrar num item de Aplicação vencido e confirmar que a pergunta mostrada é a previsão do tópico, com o chip "Aplicação"
- [ ] O CI (`npm test`) roda os três portões locais antes do Playwright
