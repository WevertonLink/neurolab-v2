# Fase 4 — A tela unificada

**Goal:** Tirar do dashboard e do Modo Domínio as duplicações e os rótulos que
mentem, e fazer as telas mostrarem o que as Fases 0 a 3 passaram a saber.

**Spec:** `docs/superpowers/specs/2026-08-14-cronograma-por-dimensao-design.md`, seção 7

## Divergência declarada da spec

A spec pedia "uma fila, um renderizador": fundir `renderReview` (dashboard) e
`domainRenderReviews` (Modo Domínio). Medido, os dois **não** são cópias da
mesma coisa — são linguagens visuais diferentes (`review-item` contra `dm-row`),
com estados vazios e textos próprios. O que se repete de fato são ~3 linhas de
formatação de atraso e intervalo. Fundi-los faria uma das telas perder a cara,
disfarçado de deduplicação, e a fonte de dados (`dueTopics`) já é única desde a
Fase 0. **Não vou fundir.** Fica registrado como decisão, não como pendência.

## O que entra

1. **O ranking diz qual saber está frágil.** `domainWeakTopics` já calcula
   `weakestDimensionForTopic` e só o usa para montar texto. Passa a expor a
   dimensão, e o cartão mostra "Explicação causal 34%" em vez de só o tópico.
   `weakTopics()` (05, zero chamadores desde sempre) é deletado.

2. **Dois defeitos que a Fase 0 deixou.** `domainRenderReviews` ainda diz
   "N tópicos no ponto de recuperação" — viraram dimensões — e lista a fila
   inteira sem teto. Com 236 caixas isso é uma parede. Passa a respeitar
   `SESSION_CAP` e a declarar o excedente, como o painel do dashboard já faz.

3. **A barra do dashboard mede o que o rótulo promete.** Ela se chama "Progresso
   geral do percurso" e calcula `0,25·aulas + 0,35·mini quiz + 0,40·quiz do
   módulo` — diz *percurso* e mede *desempenho*. Passa a mostrar cobertura.
   `moduleProgress` continua intacto nas barras de cada cartão e no mapa, que é
   onde a mistura faz sentido. A cláusula `|| overallProgress() >= 0.70` em
   `domainStage` **fica**: removê-la rebaixaria de "ativo" para "prévia" sem
   aviso.

4. **Um stat novo, que só existe por causa da Fase 0.** Sai "Progresso médio"
   (duplicata da barra). Entra **caixas consolidadas** — quantas estão em
   `box >= 3`, ou seja, intervalo de 14 dias ou mais. Responde "quanto do que
   estudei já está estável", que é diferente de "quanto percorri" e de "quanto
   acertei", e nenhuma tela mostrava.

5. **Uma porta.** `#db-review` e `#db-domain-entry` viram um cartão só.

## Global Constraints

As mesmas das fases anteriores. Portão local `node tools/test-srs.js`; blocos
novos antes de `/* ---------- resultado ---------- */`, dentro do `try`; prova
por mutação em cada invariante nova; `sw.js` e o literal em `audit-content.js`
mudam juntos.
