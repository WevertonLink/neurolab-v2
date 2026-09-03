# Aprofundamento dos bancos de revisão das aulas originais — 2026-09-03

Versão `v1-39-0`. Motivação: a avaliação profunda da revisão espaçada encontrou
que o **motor** do SRS está correto, mas os **bancos** estavam rasos — 33% das
419 caixas (tópico × dimensão) tinham **uma só pergunta**, concentradas nas
aulas originais (li 0-3: 37%), com a causalidade como pior caso (42%). Quando a
revisão reabre uma caixa de uma pergunta só, ela deixa de testar e vira
releitura do mesmo item.

## O que foi feito

Cada caixa de **uma pergunta** das aulas originais (li 0-3) ganhou uma **segunda
pergunta** — mesmo método do Lote 2, agora aplicado às 01-18 e aos 4 extras.

- **116 perguntas novas** de mini-quiz: **46 de causalidade**, **40 de
  reconhecimento**, **30 de aplicação**. Cada uma com `er`/`ew` próprios
  (feedback distinto de acerto e de erro) e distratores que são misconcepções
  reais (padrão do Lote 1), derivadas do conteúdo que a própria aula já ensina.
- Cada pergunta de **aplicação** é um cenário de transferência distinto da
  previsão da aula, para `applicationBank` alternar previsão↔mini.
- **Localização fora de escopo:** as ~12 caixas de Localização de 1 âncora não
  entram neste método (são servidas por âncoras de `locationAnchorsOf`, não por
  mini-quiz; mexer nelas alteraria a catraca de âncoras e esbarra na costura
  ANATOMY/Localização já documentada).

Resultado medido: caixas de **1 pergunta** nas dimensões Reconhecimento,
Causalidade e Aplicação das aulas originais caíram de **116 → 0**. Sem caixas
novas: cada pergunta classifica numa dimensão que a aula **já** media (total
segue **419 caixas / 229 âncoras**).

## Ajuste de teste

`tools/test-srs.js` (verificação 10): o sub-teste do fallback de
`applicationBank` (tópico sem mini de aplicação recai na previsão) procurava no
conteúdo uma aula sem mini de aplicação. Como agora **toda** aula tem
profundidade de aplicação, esse caso não existe mais no conteúdo — o sub-teste
passou a exercitar o mesmo ramo (`!minis.length`) de forma determinística,
esvaziando um tópico com previsão e restaurando-o. A lógica verificada é a
mesma; a cobertura ficou mais robusta.

## Verificação
Os 5 portões locais (`verifica-metaforas`, `audit-content`, `test-srs`,
`frases-proscritas`, `cobertura-modulos`) verdes; `test-srs` confirma
**419 caixas / 229 âncoras** e `SESSION_CAP` 16 inalterados. A suíte Playwright
(`neurolab-audit`) roda no CI a cada publicação para `main`.
