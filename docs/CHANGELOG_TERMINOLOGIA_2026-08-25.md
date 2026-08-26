# Changelog — Revisão de terminologia (2026-08-25)

A revisão espaçada ganhou uma quinta forma de item: **Terminologia**. Ela cobra
os termos técnicos do glossário por **recuperação ativa** — mostra a definição e
pede o termo, em múltipla escolha —, para consolidar o vocabulário que antes só
existia clicável na aula e na busca, nunca cobrado.

## O que entrou

- **Baralho de termos sobre o `GLOSSARY` inteiro** (253 termos hoje). Não é
  amarrado ao tópico estudado, de propósito: cobre o vocabulário todo e cresce
  sozinho quando o conteúdo didático for expandido.
- **Cronograma próprio, mesma mecânica Leitner.** Cada termo tem um registro
  plano em `state.termSrs[termo] = { box, due, last, reps, lapses }`, agendado
  com as mesmas `SRS_INTERVALS`, o mesmo jitter e as mesmas regras de promoção e
  rebaixamento (`SRS_PASS`, `SRS_LAPSE_CAP`) do cronograma de tópico × dimensão.
- **Rampa de entrada.** No máximo `TERM_INTRO_PER_SESSION` (8) termos novos por
  sessão, para o glossário inteiro não vencer de uma vez; `SESSION_CAP` continua
  sendo a válvula do dia. A sessão de "Revisar agora" **intercala** itens de
  tópico e de termo (tópico sempre primeiro em cada par).
- **Distratores plausíveis.** As alternativas erradas preferem termos do mesmo
  módulo (via `TERM_FIG`), completando com aleatórios quando faltar.

## Detalhes de implementação

- `src/05-app.js`: `state.termSrs` (novo campo, retrocompatível — `migrateState`
  faz `Object.assign(defaultState(), raw)` e a lista de saneamento garante o
  objeto); `scheduleTerm`, `dueTerms`, `termDistractors`, `interleaveReviewQueue`,
  `loadReviewTerm`/`renderReviewTerm`/`answerReviewTerm`; `startReview`,
  `loadReviewTopic`, `nextReview`, `renderReviewHead`, `finishReview`,
  `renderReview` e `nextDueDate` passaram a reconhecer itens de termo.
- `styles/base.css`: `.rv-termdef` (a definição como enunciado do item).
- O item de termo **não** alimenta `dimensionEvidence` nem `topicMastery`: move
  só a caixa do baralho de termos. É um segundo cronograma, ao lado do de tópico.

## Portões

`node tools/test-srs.js` foi de 119 para **138 verificações** (novo bloco 25:
semeadura, promoção, rebaixamento, teto de rampa, distratores e o fluxo do item
na revisão). Os cinco portões locais seguem verdes. `VERSION` do `sw.js` foi para
`neurolab-v1-19-0`.

## Não incluído (para depois)

- Expandir o próprio conteúdo do glossário (novos termos/definições) — o baralho
  cresce automaticamente quando isso acontecer.
- Um portão no Playwright para o item de termo na tela (o `test-srs` já cobre a
  lógica ponta a ponta num DOM stubado).
