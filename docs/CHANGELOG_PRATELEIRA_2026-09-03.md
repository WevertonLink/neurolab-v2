# Dois ganhos da prateleira da avaliação — 2026-09-03

Versão `v1-40-0`. Dois itens que a avaliação do padrão do NeuroLab deixou
pendentes, feitos num deploy só. O terceiro (unificar `state.srs` e
`state.termSrs`) segue adiado, como dívida aceitável.

## 1. Localização honesta nos módulos extras

Os 4 extras metacognitivos (esforco, ilusoes, saber, palpite) têm um diagrama de
**processo** (etapas), não de anatomia — mas o modelo de conhecimento não
consultava `m.trilha`, então a revisão de Localização servia, para conceitos como
*Recuperação* ou *Fluência*, o enunciado **"Onde X age? Toque a estrutura no
diagrama"**, que implica uma região do cérebro. Erro de categoria em 17 caixas.

Correção (opção B — só texto, na revisão): quando o tópico é de trilha `extras`,
o enunciado passa a **"Onde X entra neste processo? Toque a etapa no diagrama"**,
o veredito a "É nessa etapa / Não é nessa etapa" e o fecho a "X entra em <etapa>".
Módulos principais (anatomia real) ficam **idênticos** ("age" / "estrutura").

- `renderReviewLocation` ramifica pelo novo flag `review.loc.isProcess`
  (`= m.trilha==='extras'`), setado em `loadReviewTopic` onde o item é montado.
- Sem tocar agendamento, âncoras ou `measurableDimensions`: seguem
  **419 caixas / 229 âncoras**.

## 2. Teto diário de termos novos (Terminologia)

`dueTerms()` oferecia até `TERM_INTRO_PER_SESSION` (8) termos novos **por
sessão**, sem teto por **dia** — quem fazia várias sessões num dia podia semear
8+8+8… termos novos, que venciam todos no dia seguinte (um pico). O `SESSION_CAP`
limita itens por sessão, não por dia.

- Nova constante `NEW_TERMS_PER_DAY = 12` (acima do por-sessão, então uma sessão
  isolada não muda; corta só a enxurrada de múltiplas sessões no mesmo dia).
- `scheduleTerm` conta a introdução do dia em `state.termIntroDay = {day, n}` ao
  semear um termo **novo** (conta o que é de fato aprendido, não o que é ofertado).
- `dueTerms` limita a oferta de novos ao saldo do dia
  (`min(TERM_INTRO_PER_SESSION, NEW_TERMS_PER_DAY − usadosHoje)`).
- Estado novo `termIntroDay` entra no `defaultState()`; ausente em quem já usa,
  degrada para "0 usados hoje" (sem migração).

## Verificação
- 5 portões locais verdes. `test-srs`: **141 verificações** (+3 do teto diário na
  verificação 25), com **419 caixas / 229 âncoras** inalteradas.
- Render real da revisão de Localização: extra mostra "entra neste processo /
  etapa"; principal segue "age / estrutura".
- Suíte Playwright (`neurolab-audit`) roda no CI a cada publicação para `main`.
