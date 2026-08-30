# Auditoria da revisão espaçada + refino das figuras — 2026-08-30

Versões `v1-30-0` → `v1-38-0`. Motivação: o usuário pediu uma auditoria da
revisão espaçada ("apresenta inconsistências") e, na sequência, o refino das
ilustrações SVG reutilizadas na revisão de Localização.

## Auditoria da revisão espaçada

Veredito: o **motor** do SRS (Leitner por dimensão, jitter, lote de evidências,
baralho de Terminologia) está correto. As inconsistências eram de outra ordem.

### A + B — Modo Domínio ↔ Terminologia + docs (`v1-30-0`)
- `04b-domain-mode.js`: `domainRenderToday`, `renderDomainEntry` e
  `domainRenderReviews` contavam só `dueTopics()` e ignoravam o baralho de
  Terminologia — divergiam do painel do dashboard e do que `startReview()` de
  fato serve. Agora intercalam `dueTerms()`: contagem, lista e estado-vazio
  batem com o dashboard e com a sessão real; linhas de Terminologia com dica própria.
- Textos corrigidos: "a sessão usa no máximo **oito tópicos**" → "no máximo 16
  **itens**"; "**Faltam** N para a sessão seguinte" → "**Outros** N ficam para
  as próximas" (a mesma correção que o painel já tinha).
- `ARQUITETURA_APRENDIZAGEM.md`: §4.6 dizia `SESSION_CAP = 8`, contradizendo o
  código (16) e a própria §4.7; contagem de caixas obsoleta generalizada.

### Lote 1 — distratores (`v1-31-0`)
Cinco itens das aulas novas tinham um distrator "de enfeite" (absurdo o
bastante para ninguém marcar), o que deixava o item acertável por eliminação.
Trocados por misconcepções reais (recompensa-4, emoção-4, neuroanatomia-4,
desenvolvimento-4, ritmos-4), com o texto de erro (`ew`) ajustado.

### Lote 2 — bancos rasos (`v1-32-0`)
53% das caixas (tópico × dimensão) das aulas novas tinham **uma só pergunta**
na revisão — o mesmo item voltava a cada ciclo. Acrescentadas **32 perguntas
novas** (10 reconhecimento + 5 causalidade + 17 aplicação, cada uma com `er`/`ew`
próprios) às 22 quintas aulas. Aplicação: cada aula ganhou um cenário de
transferência distinto da previsão, para `applicationBank` alternar
previsão↔mini. Sem caixas novas: cada pergunta classifica numa dimensão já
medida (total segue **419 caixas / 229 âncoras**).

### Lote 4 — feedback próprio de acerto/erro na previsão (`v1-38-0`)
As perguntas de aplicação vindas da previsão reaproveitavam o mesmo `after`
para acerto e erro. Agora, ao errar, o feedback nomeia a previsão certa antes
do fechamento (padrão `er ≠ ew` das mini-questões); ao acertar, mantém o
fechamento. Reusa a própria alternativa correta + o `after` existente.

## Refino das figuras SVG (`v1-33-0` → `v1-37-0`)

14 de 22 figuras redesenhadas, todas preservando os `data-struct` (as âncoras
de Localização e o cronograma seguem intactos). Contorno lateral de cérebro
reutilizado entre as figuras anatômicas.

- **Texto vazando/colidindo:** esforço, ilusões, saber, palpite, ritmos, decisão.
- **Cruas/anatômicas:** neurônio, atenção, linguagem, motor, autônomo.
- **Polidas:** recompensa, memória, neuroanatomia.
- **Mantidas** (já legíveis): sono, métodos, desenvolvimento, clínica,
  sensorial, plasticidade, emoção, farmacologia.

## Verificação
Os 5 portões locais (`verifica-metaforas`, `audit-content`, `test-srs`,
`frases-proscritas`, `cobertura-modulos`) verdes em cada lote; a suíte
Playwright (`neurolab-audit`) verde nos 8 deploys. `SESSION_CAP` 16, âncoras
229, caixas 419 inalteradas ao longo de tudo.

## Em aberto (opcional)
- 8 figuras mantidas como estão (já legíveis).
- Cada questão de Localização virar uma vista distinta (zoom/spotlight por
  parte) — bifurcamos para o redesenho dos SVGs; o spotlight não foi feito.
