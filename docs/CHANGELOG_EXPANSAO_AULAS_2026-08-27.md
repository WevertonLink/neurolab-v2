# Changelog — Fatia 2: primeira aula nova (glia no módulo 01)

Segunda fatia da expansão: **crescer a grade de aulas**, começando pelo módulo
`neuronio`. É a primeira aula que quebra a grade histórica de 4 por módulo — e o
teste de SRS foi ajustado para refletir isso, não afrouxado.

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

## Revisão
Conteúdo científico para a **sua revisão final** (modelo: eu proponho → você
aprova → eu preencho → você confere a ciência). O desenho da aula foi aprovado
antes de preencher.
