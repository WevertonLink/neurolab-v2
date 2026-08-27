# Changelog — Fatia 2: aulas novas (glia no módulo 01, poda no módulo 02)

Segunda fatia da expansão: **crescer a grade de aulas**. São as primeiras aulas
que quebram a grade histórica de 4 por módulo — e os testes (SRS e Playwright)
foram ajustados para refletir isso, não afrouxados.

## A aula
`neuronio` ganha a **5ª aula: "A glia: o cérebro que não dispara"**. O restante
do módulo trata do neurônio que dispara; esta aula fecha a metade silenciosa —
astrócitos, oligodendrócitos, micróglia — e por que a mielina define a velocidade
do sinal. Satélites completos, no mesmo padrão das outras aulas:

- corpo em 4 parágrafos com `<span class="term">` nos termos-chave;
- **mini-quiz** de 3 questões (níveis 0/1/2);
- **DEEP** (aprofundamento), **PREDICT** (pré-teste/aplicação), **CHAIN** (cadeia
  de 5 elos sobre a condução saltatória e o que a desmielinização quebra),
  **BRIDGE** e **CONTEXT_TOPIC_TERMS**;
- **1 questão nova no quiz do módulo** (`l:4`), para a aula ser cobrada na
  avaliação cumulativa como as demais — e não virar dívida de cobertura.

## Glossário
+8 verbetes ancorados em `neuronio` via `TERM_FIG mod:`: glia, astrócito,
oligodendrócito, micróglia, mielina, condução saltatória, célula de Schwann e
sinapse tripartite. Alimentam a revisão de Terminologia com bons distratores do
próprio módulo.

## Portões (ajuste deliberado, sem enfraquecer)
A aula nova mede as **quatro dimensões** (reconhecimento, localização,
causalidade e aplicação), então as catracas do `test-srs` subiram — e subir é o
que a catraca existe para obrigar a conferir:

- âncoras utilizáveis: 224 → **225** (a mielina ancora no axônio do diagrama do
  neurônio);
- total de caixas de agendamento: 344 → **348** (+4, uma por dimensão);
- aulas órfãs do quiz de módulo: **segue em 8** — a questão `l:4` acima impede
  que a dívida cresça.

Cinco portões locais verdes. `VERSION` do `sw.js` foi para `neurolab-v1-22-0`.

### Correção de CI descoberta no deploy
A auditoria Playwright (que só roda no CI) estava **vermelha desde a Fatia 1**: a
expansão do banco do Domínio deixara contagens fixas para trás. Corrigido, sem
afrouxar — `total` 24→34 e `counterModules` 16→22 (catracas de conteúdo), o
balanço das corretas passou de `[6,6,6,6]` para "diferença ≤ 1" (mesma
generalização já adotada no `audit-content`), e dois pontos frágeis viraram
derivações do próprio conteúdo (o teste lê o caso/aula corrente em vez de fixar
posição). Suíte completa: 141 passando, 85 puladas, 0 falha.

## A poda (módulo 02 · plasticidade)
`plasticidade` ganha a **5ª aula: "O cérebro que poda: enfraquecer e eliminar"**.
O módulo contava bem o lado de *fortalecer* (Hebb, LTP, Kandel, consolidação);
esta aula desenvolve a metade que faltava — **enfraquecer e eliminar**:

- a **LTD** (depressão de longo prazo) e o detalhe de que ela e a LTP nascem do
  **mesmo** cálcio — a dose e o ritmo decidem (muito e rápido → CaMKII instala
  AMPA; pouco e prolongado → fosfatases retiram AMPA);
- a **poda sináptica** pela micróglia (retomando a aula da glia) e a produção em
  excesso seguida de remoção no desenvolvimento;
- os **períodos críticos** e o "use ou perca" quase literal — a base fisiológica
  da própria revisão espaçada.

Satélites completos (corpo, mini-quiz de 3 questões, DEEP, PREDICT, CHAIN de 5
elos sobre o mecanismo da LTD, BRIDGE, termos de contexto) + **1 questão no quiz
do módulo** (`l:4`, mantém as órfãs em 8) + **3 verbetes novos** ancorados em
`plasticidade` (poda sináptica, espinha dendrítica, metaplasticidade). A
`espinha dendrítica` ancora no lado pós-sináptico do diagrama, então a aula
também mede **Localização** — as quatro dimensões, como a da glia.

Catracas do `test-srs`: âncoras 225 → **226**, caixas 348 → **352** (+4). `VERSION`
foi para `neurolab-v1-23-0`.

## Revisão
Conteúdo científico para a **sua revisão final** (modelo: eu proponho → você
aprova → eu preencho → você confere a ciência). O desenho das duas aulas foi
aprovado antes de preencher.
