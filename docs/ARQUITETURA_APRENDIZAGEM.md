# NeuroLab — arquitetura de conteúdo e aprendizagem

*Levantamento de 2026-08-14. Base: `HEAD` em `4711259`, v1.7.2, árvore limpa,
`node tools/audit-content.js` e `node tools/verifica-metaforas.js` verdes.*

Documento de referência para mudanças futuras. Descreve **como os módulos são
estruturados**, **como eles alimentam a revisão espaçada**, **o que do conteúdo
chega ao modo busca** e **como o Modo Domínio se liga a tudo isso**. Números
foram medidos carregando `src/*.js` num contexto `vm` com DOM stubado — não por
regex sobre o fonte.

> Complementa, não substitui: `docs/COMO_TUDO_FUNCIONA.md` trata da
> infraestrutura (PWA, service worker, TWA, CI) e está **desatualizado** na parte
> de "arquivo único" — o app deixou de ser single-file em 04/08/2026.

---

## 1. Onde tudo mora

`index.html` (242 linhas) é só a casca: header, sete `<section class="view">`,
três modais e o FAB de busca. Os scripts entram como clássicos, sem build, sem
módulos ES — **todos compartilham o mesmo escopo global**, e a ordem importa.

| # | arquivo | linhas | KB | papel |
|---|---------|-------:|---:|-------|
| 1 | `src/01-metaphors.js` | 195 | 53 | `IMAGINE` / `IMAGINE_DATA_V2` — metáfora por módulo |
| 2 | `src/02-integrated-visuals.js` | 446 | 31 | `INTEGRATED_VISUALS`, aba Mecanismo e Visão integrada |
| 3 | `src/03-context-mechanisms.js` | 142 | 56 | `CONTEXT_*` — "onde este termo entra no mecanismo" |
| 4 | `src/04-learning-model.js` | 199 | 11 | dimensões de conhecimento, evidência, razão da revisão |
| 5 | `src/04b-domain-mode.js` | 1.153 | 94 | Modo Domínio: dados, métricas, abas |
| 6 | `src/04c-domain-guided.js` | 606 | 35 | sessão guiada e reconstrução causal (sobrescreve 04b) |
| 7 | `src/05-app.js` | 7.047 | 693 | tudo o mais: dados dos módulos, quizzes, SRS, busca, UI |
| 8 | `src/06-service-worker-register.js` | 9 | 0,5 | registro do SW |

Estilos: `base.css` (713 linhas, 238 KB — carrega os SVGs de anatomia),
`features.css` (232), `domain-mode.css` (149).

**Dependência de ordem:** `04c` captura funções de `04b` em constantes
(`DOMAIN_BASE_RENDER_VIEW`, `DOMAIN_BASE_RENDER_TODAY`, …) e redefine as
originais. Inverter a ordem dos `<script>` quebra o Modo Domínio silenciosamente.
`04b` e `04c` também chamam funções que só existem em `05-app.js`
(`dueTopics`, `topicKey`, `glossify`) — funciona porque tudo roda depois do
`DOMContentLoaded`, não porque a dependência esteja declarada.

---

## 2. Estrutura dos módulos

### 2.1 A grade

O conteúdo é uma grade **perfeitamente regular** — o que é a maior força do
projeto e também o que torna qualquer exceção futura cara:

```
16 módulos × 4 aulas             = 64 tópicos
16 módulos × 4 questões de quiz  = 64 questões de módulo
64 aulas   × 3 mini-questões     = 192 mini-questões
                                   ---
                            total  256 questões
```

Nenhum módulo foge de 4 aulas. Nenhuma aula foge de 3 mini-questões.

### 2.2 O objeto `MODULES` (`src/05-app.js:4`)

```js
{ id, n, title, color, hex, tag, intro,
  lessons: [{ t, b }],          // t = título, b = corpo HTML
  quiz:    [{ q, o, c, er, ew }] // pergunta, opções, índice correto,
}                                //   explicação-se-certo, explicação-se-errado
```

`id` é a chave primária de tudo (`neuronio`, `plasticidade`, `recompensa`,
`decisao`, `atencao`, `emocao`, `autonomo`, `sono`, `neuroanatomia`,
`sensorial`, `motor`, `desenvolvimento`, `linguagem`, `clinica`,
`farmacologia`, `metodos`).

### 2.3 Os satélites — indexados por `[moduleId][lessonIndex]`

Todos com cobertura **64/64**, um por aula:

| estrutura | linha | forma | onde aparece |
|-----------|------:|-------|--------------|
| `MINI_QUIZZES` | 205 | `[mid][li] → [{q,o,c,er,ew,lvl}]` | botão "Mini quiz" da aula |
| `DEEP` | 1668 | `[mid][li] → HTML` | botão "Aprofundar" |
| `PREDICT` | 5121 | `[mid][li] → {q,o,c,after}` | prova de previsão antes do texto |
| `CHAIN` | 5315 | `[mid][li] → {s,h,hn,w,wa}` | cadeia causal + "e se…" |
| `BRIDGE` | 3499 | `[mid][li] → HTML` | ponte no topo do "Aprofundar" |

Indexados só por módulo (16/16): `ANATOMY` (1309, com 78 partes no total),
`INTEGRATED_VISUALS` (`02:44`), `IMAGINE` (`01:6`), `REFERENCES` (1707, 2–3 por
módulo).

Indexados por termo, atravessando módulos: `GLOSSARY` (3591, **227** verbetes),
`TERM_FIG` (3234, 213 → 94%), `TERM_REL` (3813, 114 → 50%), `TERM_NODE_EXTRA`
(4699, 85), `ANAT_DEEP`/`ANAT_TERM` (78 cada), `FIGURES` (2706, 19),
`CONCEPTS` (3912, 57), `LINKS` (6120, 10).

### 2.4 Ordem de montagem da tela do módulo (`openModule`, 6357)

1. `md-note` — aviso clínico, só em `clinica` e `farmacologia`
2. `md-head` — número, título, `intro`
3. **Laboratório visual**: `renderAnatomy` → `renderFunctional` → `renderIntegrated`, `setVisualMode('anatomy')`
4. **As 4 aulas**, cada uma: `predictHTML` → corpo (`l.b`, velado se previsão pendente) → `DEEP` → `chainHTML` → `linkChipsHTML` → `topicDimensionStripHTML` → medidor do tópico → ações (marcar estudada / mini quiz)
5. `renderImagine` → `renderMindMap` → `renderReferences` → `renderQuizCta` → `renderModuleNavigator`

`glossify(div)` roda **por aula** (6408), não na página inteira: o `seen` é
local, então cada termo vira botão na primeira vez **em cada aula** — não uma
vez só no módulo.

---

## 3. Chaves e escopos

Quatro formatos de chave sustentam a persistência inteira. Mudar qualquer um
deles exige migração em `migrateState` (611).

| chave | formato | onde nasce | usada por |
|-------|---------|-----------|-----------|
| tópico | `neuronio-0` | `topicKey(id, idx)` (726) | `state.lessons`, `topicMastery`, `miniWrong`, `srs` |
| escopo de tópico | `T:neuronio-0` | `topicScope` (`04:12`) | `dimensionEvidence` |
| escopo de módulo | `M:neuronio` | `moduleScope` (`04:13`) | `dimensionEvidence` |
| questão | `M:neuronio-0:2`, `Q:neuronio:1`, `R:…`, `S:…`, `DCASE:…`, `DCF:…`, `DRECON:…` | vários | `questionHistory`, `selfRate` |

`state` (24 chaves, `defaultState` em 373) vai inteiro para
`localStorage['neurolab-state-v1']`, `STATE_VERSION = 5`, com snapshot de
segurança, quarentena de leitura corrompida e detecção de conflito entre abas.

---

## 4. Revisão espaçada (SRS)

### 4.1 Parâmetros (`src/05-app.js:363-367`)

```js
SRS_INTERVALS  = [1, 3, 7, 14, 30, 60, 120, 240]  // Leitner de 8 caixas, em dias
SRS_PASS       = 0.8   // acerto mínimo para promover
SRS_LAPSE_CAP  = 2     // ao errar, nunca fica acima da caixa 2 (7 dias)
SESSION_CAP    = 16    // ITENS (tópico × dimensão) por sessão — ver 4.7
```

**O cronograma agenda tópico × dimensão, não o tópico em bloco** (v5, Fase 0):

```js
srs['neuronio-0'] = {
  seededAt: 1754870400000,
  dims: {
    recognition: { box, due, last, reps, lapses, reason, reasonAt, lastScore, reasonInterval },
    causality:   { … },
    application: { … }        // location ausente: este tópico não sabe medi-la
  }
}
```

Cada `dims[d]` carrega os mesmos campos do registro plano antigo, e a mecânica
de Leitner é literalmente a mesma — mudou o endereço, não a regra.

`srsJitteredDays` (1004) espalha vencimentos em ±15% para intervalos > 1 dia —
a caixa 0 fica intocada, então a primeira volta é sempre exatamente amanhã.

### 4.2 Quais caixas existem

`measurableDimensions(moduleId, lessonIndex)` (`04`) é **derivada do conteúdo,
nunca gravada**: uma dimensão só ganha caixa se este tópico tem como medi-la.
Hoje isso dá **188 caixas das 256 possíveis** —

```
recognition  50/64 tópicos      causality    63/64 tópicos
location     11/64 tópicos      application  64/64 tópicos
```

— porque as fontes por tópico ainda são só duas: o mini quiz, e a prova de
previsão (`PREDICT`), que a Fase 2 ligou e que sozinha levou `application` de
40 para 64. É essa função que faz as fases seguintes serem baratas: quando a
reconstrução de `CHAIN` valer para os 64 tópicos, `causality` entra aqui e as
caixas nascem sozinhas, **sem migração nova**. O schema não muda de novo.

### 4.3 Quem escreve no cronograma — **e quem não escreve**

| gatilho | função | efeito |
|---------|--------|--------|
| marcar aula como estudada | `markRead` → `seedTopic` | cria uma caixa por dimensão mensurável, vencendo em 1 dia |
| terminar mini quiz | `finishMiniQuiz` → `commitEvidenceBatch` | uma promoção **por dimensão medida** |
| terminar item na revisão | `nextReview` → `commitEvidenceBatch` | promove / rebaixa a dimensão daquele item |
| contrafactual do Domínio | `domainAnswerCounter` (`04c`) | promove / rebaixa `causality` do tópico alvo |
| reconstrução da cadeia | `domainAdvanceFocus` (`04c`) | idem |
| abrir o app | `seedSrsFromHistory` | enfileira tópicos com domínio registrado |
| **quiz do módulo** | `finishQuiz` | **não agenda tópico** — ver abaixo |
| **caso integrado** | `04b`/`04c` | **não agenda tópico** — ver abaixo |

Quiz de módulo e casos integrados escrevem em escopo `M:` e continuam medindo o
módulo. Não agendam tópico porque **o mapeamento questão→aula não é posicional**:
medido por TF-IDF sobre os 64 pares e conferido à mão, `plasticidade`, `sono`,
`motor` e `metodos` sequer testam a aula 0 no quiz do módulo. Atribuir por
posição creditaria a aula errada.

### 4.4 A regra de promoção (`scheduleDimension`)

```
dimensão não mensurável ....... não agenda nada
score < 0.8 ................... box = max(0, min(box-1, 2)); lapses++; reagenda
caixa nova .................... box = 0; vence em 1 dia
score ≥ 0.8 E já vencido ...... box++; reagenda com jitter
score ≥ 0.8 E ainda no prazo .. nada muda
```

**Treinar antes da hora não avança** a caixa — deliberado, preservado do v4.

### 4.5 O lote por atividade

Uma atividade produz várias evidências da mesma dimensão. Promover a caixa uma
vez por evidência faria o intervalo saltar de 1 para 14 dias numa sentada só.
Então:

```
beginEvidenceBatch()   → abre o lote
recordDimensionEvidence(...) × N  → acumula por (escopo, dimensão)
commitEvidenceBatch()  → uma decisão de intervalo por dimensão; descarta escopo M:
```

**Atividade que não abre lote não agenda nada** — é assim, e não por uma lista
de exceções, que o quiz de módulo e os casos ficam de fora.

### 4.6 A sessão de revisão

`startReview` pega `dueTopics()` — que agora devolve **um item por dimensão
vencida** — corta em `SESSION_CAP = 8` e percorre item a item. Cada item usa só
as mini-questões que medem aquela dimensão, então a volta é mais curta e mais
específica: na prática ~1 pergunta por item, onde antes o tópico trazia 3.

Consequência medida na migração de um estado com 40 tópicos estudados: a fila
sai de **28 itens vencidos (v4) para 99 (v5)**, enquanto o trabalho do dia cai
de ~24 perguntas para ~8. Por isso o letreiro do painel mostra o tamanho da
**sessão**, não da fila, com o excedente declarado logo abaixo.

### 4.7 Por que `SESSION_CAP` é 16

Simulação de 180 dias com o escalonador real, 2 aulas/dia, semente fixa:

| acerto | cap | pico da fila | fila no dia 180 | média dias 150-180 | itens/dia feitos |
|---|---:|---:|---:|---:|---:|
| 85% | 8 | 131 | 2 | 4,0 | 6,7 |
| 85% | 16 | 79 | 2 | 3,1 | 7,4 |
| 70% | 8 | 138 | 19 | 34,3 | 7,9 |
| 70% | 16 | 112 | 1 | 5,8 | 10,5 |
| 60% | 8 | 151 | **72** | **80,7** | 7,9 |
| 60% | 16 | 118 | 16 | 10,2 | 13,3 |

O teto de 8 foi calibrado quando um item era um tópico com 3 perguntas. Com
164 caixas em intervalos iniciais de 1 a 3 dias, ele virou gargalo de vazão: a
60% de acerto o aluno **nunca alcança a fila**. Quem mais precisa da revisão
seria justamente quem ela soterra.

O teto é válvula, não cota — na maioria dos dias a fila é menor que ele. Por
isso dobrá-lo custa ~1 item/dia de trabalho médio e derruba o pico em 40%.

Descartado com medição: "progressão por dependência" (só cobrar Aplicação
depois de consolidar Reconhecimento) não limita a fila — reduziu de 99 para 65,
não para o número de tópicos, porque dimensão consolidada continua em rotação.
Pode ter mérito pedagógico, mas não é ferramenta de volume.

---

## 5. O modelo de dimensões (`src/04-learning-model.js`)

Camada transversal, criada na Fase 3, que mede **quatro tipos de saber** em vez
de uma nota só:

| id | rótulo | mede |
|----|--------|------|
| `recognition` | Reconhecimento | identificar termos e distinções |
| `location` | Localização | onde a estrutura ou processo fica |
| `causality` | Explicação causal | por que uma etapa leva à seguinte |
| `application` | Aplicação | usar o conhecimento em situação nova |

Cada evidência é uma média móvel exponencial por escopo × dimensão
(`recordDimensionEvidence`, `04:86`), com peso conforme a origem
(`evidenceWeight`, `04:83`):

```
review .48 · mini-quiz .38 · module-quiz .34 · counterfactual .32
domain-case .30 · self-rate .22 · prediction .16 · (não listado) .28
```

Duas observações sobre esse mapa: `prediction` **nunca é usado** —
`commitPredict` (5300) grava `predCredit` e XP, mas não registra evidência; e
`domain-reconstruction` (`04c:437-438`) **não está no mapa**, caindo no
default `.28`.

### 5.1 Como a dimensão de cada questão é decidida — e por que isso importa

`inferQuestionDimension` (`04:18`) aceita um campo `q.dim` declarado pelo autor.
**Nenhuma das 256 questões declara `dim`.** Todas passam por regex sobre o
enunciado, com o `lvl` como último recurso.

O resultado medido:

| `lvl` declarado | → recognition | location | causality | application |
|-----------------|--------------:|---------:|----------:|------------:|
| 0 · Fundamento | 50 | 6 | 7 | 1 |
| 1 · Aplicação | 0 | 3 | 21 | **40** |
| 2 · Integração | 0 | 2 | **62** | 0 |

O autor equilibrou `lvl` em 64/64/64. O classificador desfaz parte disso: 24 das
64 questões rotuladas "Aplicação" saem como outra coisa, e "Integração" vira
`causality` em 62 de 64 casos.

Consequência no nível do tópico (as 3 mini-questões que cada tópico tem):

```
tópicos onde NENHUMA questão mede location .......... 53 / 64
tópicos onde NENHUMA questão mede application ....... 24 / 64
tópicos onde NENHUMA questão mede causality ..........  1 / 64
tópicos que cobrem 3 dimensões ....................... 39 / 64
tópicos que cobrem 4 dimensões ........................ 0 / 64
```

A tira de 4 chips sob cada aula (`topicDimensionStripHTML`, `04:125`) sempre
mostra quatro dimensões, mas em 53 dos 64 tópicos a de Localização é
estruturalmente incapaz de sair de "—" pelo caminho do mini quiz.
`weakestDimensionForTopic` (`04:112`) ignora dimensões sem tentativa, então isso
não distorce a nota — mas distorce a **leitura** que o aluno faz da tira, e
limita o que `orderReviewQuestions` consegue priorizar.

---

## 6. Modo busca

### 6.1 Entrada

FAB fixo (`#sc-fab`, `base.css:635`, `position:fixed; z-index:80`) — **visível em
todas as views**, inclusive dentro do módulo, do quiz e do Modo Domínio.
Abre `#search-modal` com um campo de texto e, enquanto o campo está vazio, a
tela de sugestões clicáveis.

### 6.2 As opções clicáveis (`suggestHTML`, 4491)

Não são atalhos arbitrários: são **os 57 `CONCEPTS`**, agrupados pelas 5
categorias de `CAT_LABEL` e renderizados como chips.

| categoria | rótulo | qtd |
|-----------|--------|----:|
| `estado` | Estado / queixa | 17 |
| `condicao` | Condição | 17 |
| `substancia` | Substância | 9 |
| `desempenho` | Desempenho | 8 |
| `fenomeno` | Fenômeno | 6 |

`CONCEPTS` é a ponte deliberada entre **linguagem leiga e conteúdo técnico**:

```js
{ cat, n,            // categoria, nome leigo ("não consigo focar")
  q, a,              // pergunta e resposta em HTML
  t: [termo, …],     // → GLOSSARY
  k: [chave, …],     // → LINKS (mapa Topo)
  m: [{m, l}, …],    // → MODULES[i].lessons[l]
  s: [sinônimo, …],  // alimenta o índice
  nota }             // aviso clínico
```

Integridade verificada: **0 referências quebradas** — todos os `t` existem no
glossário, todos os `k` existem em `LINKS`, todos os `m` apontam para aula real.
Todos os 57 conceitos têm `t` e `m`; 10 não têm `k`; 18 carregam aviso clínico.

### 6.3 O índice (`buildSearchIndex`, 4303)

374 entradas, construídas uma vez e memoizadas em `SIDX`:

| tipo | entradas | peso `KIND_W` | o que vai para o `blob` |
|------|---------:|--------------:|--------------------------|
| `conceito` | 57 | 1,15 | nome + pergunta + resposta + sinônimos + termos |
| `termo` | 227 | 1,00 | verbete + definição |
| `topo` | 10 | 1,05 | nome + ideia + fecho |
| `modulo` | 16 | 0,85 | título + tag + intro |
| `aula` | 64 | 0,80 | título + corpo da aula sem tags |

Pontuação (`scoreEntry`, 4335): nome exato 120, prefixo 92, substring 74,
ocorrência só no corpo 42; se o texto tem N tokens e a entrada casa menos que N,
o total é multiplicado por 0,55. Tudo normalizado sem acento e minúsculo
(`nrmz`, 4297).

Expansão semântica (`searchAll`, 4352): os até 3 conceitos com score ≥ 85 puxam
os termos técnicos ligados (`×0,5`, no máximo 16), as chaves do Topo (`×0,45`)
e as aulas indicadas (`×0,4`). É o que faz *"não consigo focar"* devolver
*córtex pré-frontal* sem que a palavra apareça em lugar nenhum. Resultado final
cortado em 60; na tela, 10 conceitos e 8 de cada outro grupo.

### 6.4 O que o conteúdo dos módulos entrega à busca — e o que não entrega

Entra: título e `intro` do módulo, título e **corpo completo** das 64 aulas,
227 verbetes, 57 conceitos, 10 conceitos Topo.

Fica de fora — invisível para a busca:

```
192 mini-questões            64 questões de quiz de módulo
 64 blocos DEEP              64 cadeias CHAIN
 64 blocos PREDICT           16 metáforas IMAGINE
 78 partes de ANATOMY (rótulo + blurb)
 16 conjuntos de camadas de INTEGRATED_VISUALS
  8 casos + 16 contrafactuais do Modo Domínio
```

Efeito prático: uma explicação que só existe no "Aprofundar", numa etapa da
cadeia causal ou no feedback de uma questão é inalcançável pela lupa. Se o texto
da aula não menciona, a busca não acha.

### 6.5 Saídas da busca (`openerFor`, 4482)

| tipo | ação | destino |
|------|------|---------|
| conceito | `openConcept` | ficha dentro do próprio modal, com chips para termo / Topo / aula |
| termo | `fromSearchTerm` | fecha a busca, abre `#term-modal` |
| topo | `fromSearchTopo` | fecha a busca, abre `#link-modal` |
| módulo / aula | `fromSearchModule` | fecha a busca, `openModule(i)`, rola até `#lesson-l` |

A busca é **quase somente-leitura** no modelo de aprendizagem: não agenda
revisão, não registra evidência, não dá XP. A única escrita é indireta —
`fromSearchModule` → `openModule` grava `state.lastModule` e `lastStudiedAt`,
mexendo no cartão "Continuar" do dashboard.

### 6.6 O ponto frágil da ligação busca → mecanismo

`openTermModal(key, opener)` (4821) monta definição, figura, relações e chama
`renderContextMechanism` (`03:82`) — o painel *"onde este termo entra no
mecanismo"*. Esse painel precisa saber **de qual módulo e de qual aula** o termo
foi tocado, e descobre isso subindo o DOM a partir do `opener`
(`contextSourceFromOpener`, `03:18`).

Quando o termo vem da busca, `fromSearchTerm` chama `openTermModal(t, null)`.
Sem `opener`:

- `lessonIndex` é `null` → o escopo nunca é `topic`, sempre `overview`. Os 356
  mapeamentos de `CONTEXT_TOPIC_TERMS` (64/64 pares módulo-aula cobertos) ficam
  inacessíveis por esse caminho.
- o módulo é resolvido por fallback em `ctxModule` (`03:27`): `TERM_FIG['mod:…']`
  → `termNode()` → **`MODULES[currentModule]`**.

Medindo a ancoragem dos 227 verbetes:

```
ancorados por TERM_FIG "mod:xxx" ......... 162
ancorados por termNode() .................  25
sem âncora nenhuma .......................  40
```

Esses 40 (`bomba de sódio-potássio`, `Na⁺`, `K⁺`, `Ca²⁺`, `AMPA`, `CaMKII`,
`LTD`, `reconsolidação`, `noradrenalina`, `saliência de incentivo`, …) caem no
último módulo aberto. Buscar `CaMKII` logo depois de estudar Linguagem mostra a
cadeia de Linguagem como se fosse o mecanismo do termo — sem erro visível na
tela.

### 6.7 Glossário × texto das aulas

`<span class="term">` é **apenas cor** (`base.css:208`). A clicabilidade vem de
`glossify` (4639), que varre nós de texto e casa contra as chaves de `GLOSSARY`.

```
verbetes no glossário ............................... 227
termos marcados com <span class="term"> nas aulas ... 116
  desses, SEM verbete no glossário .................. 24  → coloridos e mortos
verbetes que nunca aparecem marcados ................ 135 → só por glossify ou busca
```

Os 24 incluem `Neuroplasticidade`, `eixo HPA`, `ritmo circadiano`, `transdução`,
`surpresa`. Ficam destacados na cor do módulo, convidando o toque, e não abrem
nada.

---

## 7. Modo Domínio

### 7.1 Liberação (`domainStage`, `04b:797`)

Baseado em **cobertura**, não em desempenho:
`cobertura = (aulas marcadas + quizzes de módulo feitos) / 80` — 64 aulas + 16
quizzes.

| estágio | condição | como aparece no dashboard |
|---------|----------|---------------------------|
| `preview` | < 70% | "Explorar prévia" |
| `active` | ≥ 70% (ou `overallProgress() ≥ 0,70`, por compatibilidade) | "Abrir Modo Domínio" |
| `post` | ≥ 99,9% | "Entrar no Modo Domínio" |

Nunca bloqueia: a prévia é navegável desde 0%.

Note que `overallProgress()` é outra conta — média de `moduleProgress` (733):
`0,25 × aulas lidas + 0,35 × média do topicMastery + 0,40 × nota do quiz do
módulo`. As duas medidas convivem de propósito, mas divergem: dá para liberar o
Modo Domínio pela segunda porta com bem menos aulas marcadas.

### 7.2 As 7 abas (`DOMAIN_TABS`, `04b:11`)

`today` · `reviews` · `weak` · `cases` · `counter` · `connections` · `trails`

| aba | fonte | ligação |
|-----|-------|---------|
| Hoje | `domainMetrics` + próximo caso/contrafactual + sessão guiada | agrega tudo |
| Revisões | `dueTopics()` | **é o mesmo SRS** — a aba mostra e dispara `startReview()` |
| Frágeis | `domainWeakTopics` | ranking próprio, ver 7.4 |
| Casos | 8 `DOMAIN_CASES` | escreve `application` em `M:<mid>` de 3–4 módulos |
| Contrafactuais | 16 `DOMAIN_COUNTERFACTUALS` | escreve `causality` em `T:<mid>-<li>` |
| Conexões | 12 `DOMAIN_CONNECTIONS` | leitura pura, verbo causal entre 2 módulos |
| Trilhas | 4 `DOMAIN_TRAILS` | reordena os 16 módulos, leitura pura |

### 7.3 As cinco métricas (`domainMetrics`, `04b:843`)

| métrica | fonte | mostra "—" quando |
|---------|-------|-------------------|
| Cobertura | aulas + quizzes / 80 | nunca |
| Retenção | `lastScore` das caixas do SRS | nenhum tópico com `reps ≥ 1` |
| Explicação causal | média de `causality` em todos os escopos | sem evidência |
| Aplicação | média de `application` em todos os escopos | sem evidência |
| Integração | `0,7 × acerto + 0,3 × clareza` dos casos | nenhum caso respondido |

O compromisso do módulo é honesto e vale preservar em qualquer mudança:
**sem evidência, "—" em vez de porcentagem inventada.**

### 7.4 Frágeis — um segundo ranking, paralelo ao SRS

`domainWeakTopics` (`04b:861`) pontua cada tópico *tocado*:

```
0,52 × (1 − dimensão mais fraca)   [0,45 se não há evidência]
0,25 × (1 − topicMastery)
0,16 × min(1, erros/3)
0,07 × (revisão vencida?)
```

Convive com `weakTopics()` (757, usado no dashboard clássico: `topicMastery <
0,75`, top 3) e com a fila do SRS. São **três noções diferentes de "o que está
fraco"** rodando ao mesmo tempo, cada uma com sua ordenação.

### 7.5 Cobertura do banco adversarial

16 contrafactuais = **1 por módulo**, cravado numa aula específica
(`neuronio:0`, `plasticidade:1`, `atencao:2`, `neuroanatomia:3`, …). Os outros
48 tópicos não têm contrafactual.

8 casos integrados, cada um cruzando 3–4 módulos. Participações por módulo:

```
decisao 3 · atencao 3 · plasticidade 2 · recompensa 2 · emocao 2 · sono 2
neuroanatomia 2 · motor 2 · clinica 2 · autonomo 1 · sensorial 1
desenvolvimento 1 · linguagem 1 · farmacologia 1 · metodos 1
neuronio 0   ← o módulo 01 não entra em nenhum caso integrado
```

Todos os 16 módulos aparecem em alguma trilha e em alguma conexão.

### 7.6 Sessão guiada e reconstrução (`04c`)

`domainBuildFocusQueue` (`04c:122`) intercala **2 casos + 2 contrafactuais**
(`DOMAIN_GUIDED_SIZE = 4`), ordenados por menos tentativas → mais antigo →
maior prontidão do módulo. A sessão vive em `state.domain.currentSession`,
sobrevive a recarga, e o histórico guarda 40 sessões e 240 eventos.

Quem erra pode reconstruir a cadeia causal na ordem certa
(`domainStartReconstruction`, `04c:367`, com embaralhamento determinístico por
id). Acertar a reconstrução registra evidência com fonte
`domain-reconstruction` — a fonte fora do mapa de pesos citada em 5.

---

## 8. Mapa de escritas — quem grava o quê

| ação do aluno | `lessons` | `topicMastery` | `mastery` | `srs` | `dimensionEvidence` | XP |
|---------------|:---------:|:--------------:|:---------:|:-----:|:-------------------:|:--:|
| marcar aula estudada | ✅ | — | — | ✅ seed | — | 15 |
| prova de previsão (1º contato) | — | — | — | ❌ nunca | ❌ nunca — é pré-teste | 4, uma vez |
| previsão respondida na revisão | — | ✅ max | — | ✅ `application` | ✅ `T:` application, fonte `prediction` | 10 por acerto |
| mini quiz | ✅ ≥50% | ✅ max | — | ✅ | ✅ `T:` | 12 por acerto, uma vez² |
| auto-avaliação (modo profundo) | — | — | — | indireto¹ | ✅ `T:` self-rate | — |
| quiz do módulo | — | — | ✅ max | ❌ | ✅ `M:` | 25 acerto / 5 erro, uma vez² + 50 na 1ª conclusão |
| sessão de revisão | — | ✅ max | — | ✅ | ✅ `T:` | 10 por acerto, **sem trava** |
| caso integrado | — | — | — | ❌ escopo `M:` | ✅ `M:` application | — |
| contrafactual | — | — | — | ✅ `causality` | ✅ `T:` causality | — |
| reconstrução da cadeia | — | — | — | ✅ (só contrafactual) | ✅ peso default | — |
| busca | — | — | — | ❌ | ❌ | — |

¹ entra via `srsScore = min(acerto, explicação)` em `finishMiniQuiz`.
² travado por questão em `state.miniCredit` / `creditC` / `creditW`; repetir o
quiz não repontua. A revisão é a única atividade que paga XP toda vez — o que
faz sentido, já que é a única desenhada para repetir.

---

## 9. Assimetrias registradas (matéria-prima para decidir mudanças)

Sem juízo de valor — são fatos medidos, cada um com o local exato:

1. ~~**O SRS só ouve o mini quiz.**~~ **Resolvido na Fase 0.** O cronograma
   passou a agendar por tópico × dimensão, e gravar evidência é o que agenda.
   Contrafactual e reconstrução entraram. Quiz de módulo e casos integrados
   continuam fora **de propósito**, por não haver mapeamento questão→aula
   confiável (ver 4.3).
2. **Nenhuma das 256 questões declara `dim`.** A dimensão vem de regex, e
   desfaz 24/64 dos rótulos "Aplicação" e 62/64 dos "Integração"
   (`inferQuestionDimension`, `04:18`).
3. **53 de 64 tópicos não conseguem medir Localização** pelo mini quiz, mas a
   tira mostra os 4 chips sempre (`04:125`). Desde a Fase 0 isso deixou de
   gerar agendamento falso — `measurableDimensions` simplesmente não cria a
   caixa —, mas a Localização segue sem fonte própria até a Fase 3.
4. **Aprovação binária na revisão:** errar 1 de 2 rebaixa a caixa igual a errar
   tudo (`nextReview`). Menos grave desde que os itens encolheram para ~1
   pergunta, mas a regra continua de tudo-ou-nada.
5. **40 verbetes sem âncora de módulo** caem em `MODULES[currentModule]` no
   painel de mecanismo aberto pela busca (`ctxModule`, `03:27`).
6. **A busca não alcança** mini quizzes, DEEP, CHAIN, PREDICT, IMAGINE, partes
   de anatomia nem o banco do Modo Domínio (`buildSearchIndex`, 4303).
7. **24 termos coloridos não abrem nada** — marcados com `<span class="term">`
   sem verbete correspondente.
8. **`prediction: .16` é peso morto**; `domain-reconstruction` não está no mapa e
   cai em `.28` (`evidenceWeight`, `04:83`).
9. **Dois rankings paralelos de fragilidade** — `domainWeakTopics` (`04b`) e a
   fila do SRS. `weakTopics()` (05) parecia um terceiro, mas **não tem nenhum
   chamador**: é código morto, removido na Fase 4.
10. **Duas contas de progresso** decidem a liberação do Modo Domínio:
    `domainCoverageStats` e `overallProgress` (`04b:797`).
11. **`neuronio` não aparece em nenhum caso integrado** — único módulo nessa
    situação.
12. **`linksFor` cobre 26 de 64 aulas**: 38 aulas não exibem nenhum chip de
    conceito transversal.

---

## 10. Portões antes de publicar

| portão | roda no Termux? | verifica |
|--------|-----------------|----------|
| `node tools/audit-content.js` | ✅ | estrutura, 24 atividades do Domínio, equilíbrio 6/6/6/6 das alternativas, pistas de tamanho, feedback por alternativa, 356 termos de `CONTEXT_REQUIRED`, 32 imagens, 49 arquivos de precache, acessibilidade, ciência, privacidade |
| `node tools/verifica-metaforas.js` | ✅ | as 16 metáforas |
| `node tools/test-srs.js` | ✅ ~1s | o cronograma por dimensão: derivação de `measurableDimensions`, semeadura, promoção, rebaixamento, lote por atividade, descarte do escopo `M:`, fila e migração v4→v5 (41 verificações) |
| `playwright test` (`tests/neurolab.spec.js`, 62 KB) | ❌ só CI, ~5 min | o resto |

Ao publicar conteúdo, `VERSION` no `sw.js` **e** a string literal correspondente
em `tools/audit-content.js` precisam mudar juntas — divergência reprova o CI.
