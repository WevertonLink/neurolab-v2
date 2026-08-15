# Fase 3 — Localização: apontar no diagrama

**Goal:** Levar a cobertura de Localização de 11 para 56 tópicos, pedindo na revisão que o aluno toque no diagrama a estrutura onde o termo daquele tópico age.

**Spec:** `docs/superpowers/specs/2026-08-14-cronograma-por-dimensao-design.md`, seção 6 ("Fase 3")

## O que a medição mostrou antes de planejar

- `CONTEXT_TOPIC_TERMS` ancora **168 termos** a partes do diagrama do próprio
  módulo, e **todas as 168 apontam para um `data-struct` que existe de verdade
  no SVG e para um id presente em `ANATOMY[mid].parts`**. Zero âncoras quebradas.
- **56/64 tópicos** têm ao menos uma âncora utilizável. Os 8 de fora são
  abstratos — "onde fica" não é pergunta com resposta neles.
- Todo módulo tem **≥3 partes**, então sempre há distrator.

## A armadilha que a spec não previu

`src/05-app.js:1921` registra uma **delegação global**: qualquer toque em
`.apart[data-struct]`, em qualquer lugar do documento, chama `openStructInfo` e
mostra o nome e a descrição da estrutura. Numa pergunta de localização isso
entrega a resposta no primeiro toque. A spec dizia "usa `.apart[data-struct]` e
`selectAnat`, que já existem"; o que já existe derrota o quiz.

**Decisão:** guardar a delegação global — quando houver item de localização
ativo na revisão, o toque vai para a resposta em vez de abrir a informação.
Guarda explícita num handler que já existe, em vez de reescrever a string do SVG
ou duplicá-la sem as classes.

## Global Constraints

Iguais às fases anteriores: sem build nem módulos ES; ordem de carga importa;
português sem abreviação em comentário; portão local `node tools/test-srs.js`
com `ok`/`eq`/`ev` e `reset()`; blocos novos antes de
`/* ---------- resultado ---------- */`, dentro do `try`; nada assíncrono novo
alcançável do corpo do teste; `measurableDimensions` continua derivada.

## Task 1 — Âncoras e cobertura

`locationAnchorsOf(moduleId, lessonIndex)` → `[{term, part}]`, filtrando
`CONTEXT_TOPIC_TERMS` por `termNode` que resolva para uma parte real do próprio
módulo. `measurableDimensions` marca `location` quando houver ao menos uma
âncora **e** o diagrama tiver ≥3 partes. Localização vai a 56/64; caixas de 189
para 234.

Portão: as 168 âncoras resolvem para partes reais; nenhum dos 8 tópicos sem
âncora ganha caixa; nenhum módulo com menos de 3 partes.

## Task 2 — O item de localização na revisão

- `loadReviewTopic`: `t.dim === 'location'` monta `review.loc = {term, part, anatId}`,
  escolhendo a âncora por `reps % âncoras.length` — rotaciona entre os termos do
  tópico sem estado novo, mesma ideia da paridade usada em Aplicação.
- Render: pergunta "Onde **X** age?" mais `ANATOMY[mid].svg` dentro do cartão da
  revisão, com a legenda de partes **escondida** (ela nomeia as partes e
  entregaria a resposta).
- Guarda na delegação global: com `review.loc` ativo e a view de revisão aberta,
  o toque chama `answerReviewLocation(partId)` e não `openStructInfo`.
- Resposta: certo quando `partId === review.loc.part`. Depois de responder,
  destaca a parte certa e libera a informação normal.
- Evidência: fonte `diagram`, dimensão `location`, dentro do lote já aberto.

Portão, com prova por mutação em cada um: item de localização abre diagrama e
não múltipla escolha; tocar a parte certa grava evidência com fonte `diagram` e
promove; tocar a errada rebaixa; **a delegação global não pode abrir
`openStructInfo` durante um item de localização ativo**.

## Task 3 — Peso, versão e documentação

`diagram: .38` — mesma faixa do mini quiz: é reconhecimento com distratores (3 a
6 partes), não reconstrução. `sw.js` para `neurolab-v1-10-0` com o literal
casado. Doc: seção 4.2 (56/64, 234 caixas), 4.8 (a linha de Localização deixa de
ser "sem forma própria"), 5 (mapa de pesos), 8 (tabela de escritas).

## Verificação final

Três portões verdes; `canMeasure(m.id, li, 'location')` verdadeiro em exatamente
56 tópicos e falso nos 8 nomeados; prova por mutação de cada invariante nova.
