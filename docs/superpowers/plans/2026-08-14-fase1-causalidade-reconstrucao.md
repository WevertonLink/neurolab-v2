# Fase 1 — Explicação causal: reconstruir a cadeia

**Goal:** Trocar a prova de Explicação causal na revisão, de múltipla escolha classificada por regex para remontar a cadeia de `CHAIN` na ordem certa, nos 64 tópicos.

**Architecture:** `CHAIN[mid][li].s` já existe para os 64 tópicos (4 a 8 etapas, 46 com 5). A máquina de reconstrução existe em `04c-domain-guided.js` mas está amarrada ao Modo Domínio por três pontos: estado num slot único de `DOMAIN_SESSION`, redesenho via `domainOpenCase`/`domainOpenCounter`, e navegação via `domainLinearActions`. Extraio o núcleo genuinamente compartilhado — embaralhamento, comparação e a lista de passos/pool — e escrevo um condutor fino do lado da revisão. Blocos de resultado e navegação continuam específicos de cada contexto.

**Spec:** `docs/superpowers/specs/2026-08-14-cronograma-por-dimensao-design.md`, seção 6 ("Fase 1")

## Divergência declarada da spec

A spec diz "generalizar é extrair para qualquer par `{id, chain}`". Medido no
código, o acoplamento é maior que isso. A entrega é a mesma — reconstrução
valendo para os 64 tópicos na revisão — mas o caminho é extração parcial mais um
condutor novo, não extração total. Refatorar o fluxo do Modo Domínio é trabalho
da Fase 4.

## Global Constraints

- Sem build, sem módulos ES. Escopo global compartilhado, ordem de carga `01,02,03,04,04b,04c,05`.
- Português sem abreviação em comentário e em texto de tela; comentário explica *por quê*.
- Portão local `node tools/test-srs.js`, estilo `ok`/`eq`/`ev`, `reset()` antes de bloco com estado.
- Blocos de teste novos vão **antes** de `/* ---------- resultado ---------- */`, dentro do `try`.
- Nada assíncrono novo alcançável do corpo do teste (ver o comentário em `tools/test-srs.js`).
- `measurableDimensions` continua derivada, nunca gravada. Nada agenda o que não sabe medir.
- Ao publicar: `VERSION` no `sw.js` e o literal em `tools/audit-content.js` mudam juntos.

---

## Task 1 — Núcleo puro da reconstrução

**Files:** `src/04-learning-model.js` (funções novas), `tools/test-srs.js` (bloco 15)

Extrair para o modelo de aprendizagem, onde não depende de tela nem de Modo Domínio:

- `chainShuffle(chain, id)` — move `domainDeterministicShuffle` de `04c`. Já é
  pura. `04c` passa a chamar a versão nova; a antiga vira alias para não quebrar
  nada que ainda a chame.
- `chainIsCorrect(selectedTexts, chain)` — a comparação que hoje vive inline em
  `domainCheckReconstruction`.

Invariante que o teste precisa travar, porque é a única que pode transformar a
tarefa em brinde: **o embaralhamento nunca devolve a ordem original**, para
nenhum dos 64 tópicos. `domainDeterministicShuffle` já tem a guarda
(`if(list.every((x,i)=>x.index===i))` empurra o primeiro para o fim); o teste
prova que ela cobre os 64 casos reais, não só o caso hipotético.

Testes: `chainShuffle` devolve permutação, mesma multiplicidade de textos, nunca
a identidade, determinística (duas chamadas com o mesmo id dão o mesmo);
`chainIsCorrect` aceita a ordem certa e recusa uma troca de dois passos
adjacentes.

## Task 2 — `CHAIN` é fonte de Explicação causal

**Files:** `src/04-learning-model.js` (`measurableDimensions`), `tools/test-srs.js` (bloco 16)

`measurableDimensions` passa a marcar `causality` quando `CHAIN[mid][li].s`
existe e tem pelo menos 4 etapas. Causalidade sai de 63/64 para 64/64; total de
caixas de 188 para 189.

Portão de forma junto: as 64 cadeias existem, todas com `s` array de ≥4 textos
não vazios, `h` inteiro dentro do vetor, `w` e `wa` não vazios. Se a caixa de
causalidade existe, tem de haver com o que alimentá-la.

## Task 3 — O item de causalidade na revisão vira reconstrução

**Files:** `src/05-app.js` (`loadReviewTopic`, renderização e resposta), `tools/test-srs.js` (bloco 17)

- `loadReviewTopic`: quando `t.dim === 'causality'` e o tópico tem cadeia, o item
  entra em modo reconstrução em vez de montar `topicQs`.
- Estado no próprio objeto `review` (`review.recon = {available, selected, result, revealed}`),
  não num slot global — a sessão de revisão já é uma máquina de estado, e um
  segundo slot global seria a mesma armadilha que o `DOMAIN_SESSION` único.
- Render e resposta: funções novas do lado da revisão, reusando o núcleo da Task
  1 e as classes CSS `dm-reconstruct*` que já existem em `domain-mode.css`.
- Saída para quem trava: mesma regra do Domínio — ver a cadeia **não** conta como
  reconstruir, não grava evidência, e o item continua vencido.
- Evidência: `recordDimensionEvidence(topicScope(key), 'causality', 0|1, 'reconstruction', …)`,
  dentro do lote já aberto por `loadReviewTopic`.

Testes: um item de causalidade na fila produz reconstrução, não múltipla
escolha; montar na ordem certa grava evidência com fonte `reconstruction` e
promove a caixa; montar errado rebaixa; ver a cadeia não grava nada.

## Task 4 — Peso da fonte, versão e documentação

**Files:** `src/04-learning-model.js` (`evidenceWeight`), `sw.js`, `tools/audit-content.js`, `docs/ARQUITETURA_APRENDIZAGEM.md`

- `reconstruction: .48` — mesma faixa de `review`, por acontecer na revisão e ser
  a prova mais exigente que o app tem: não há alternativa para reconhecer.
- `'domain-reconstruction': .40` passa a ser **declarada**. Hoje ela cai no
  default `.28` por omissão, e isso está registrado como defeito na seção 9 do
  doc de arquitetura. Uma linha fecha.
- `sw.js` para `neurolab-v1-9-0` e o literal casado em `audit-content.js`.
- Doc: seção 4.2 (causalidade 64/64, 189 caixas), seção 5 (mapa de pesos),
  seção 9 item 8 (fechar o resto da assimetria), e a tabela da seção 8.

---

## Verificação final

- Três portões locais verdes; `test-srs.js` acima de 75 verificações.
- `canMeasure(m.id, li, 'causality')` verdadeiro nos 64 tópicos.
- Prova por mutação em cada invariante nova: embaralhamento identidade, ordem
  errada aceita, ver-a-cadeia gravando evidência.
- Abrir o app e confirmar que um item de Explicação causal vencido pede a cadeia,
  não uma alternativa.
