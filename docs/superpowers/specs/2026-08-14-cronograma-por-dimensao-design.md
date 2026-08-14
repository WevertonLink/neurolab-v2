# Cronograma por dimensão — design

*2026-08-14. Base: `be59938`. Fase 0 e a política de volume já estão no ar; este
documento registra o design completo, incluindo o que já foi entregue, para que
as Fases 1 a 4 possam ser planejadas e executadas a partir daqui.*

Levantamento que originou o trabalho: `docs/ARQUITETURA_APRENDIZAGEM.md`.

---

## 1. O problema

O NeuroLab não sofria de falta de conteúdo didático. Tem 64 aulas, 256 questões,
64 cadeias causais, 64 provas de previsão, 16 metáforas, 78 partes de anatomia,
227 verbetes, 8 casos integrados e 16 contrafactuais.

Sofria de **circuito aberto**: as peças produziam evidência e a evidência não
voltava para lugar nenhum.

- Responder as 4 questões do quiz do módulo não mudava nada no cronograma.
- Resolver um caso integrado que cruza 4 módulos não mudava nada.
- Reconstruir uma cadeia causal inteira não mudava nada.
- Só o mini quiz agendava.

E a camada de quatro dimensões — Reconhecimento, Localização, Explicação causal,
Aplicação — já media *que tipo* de saber estava frágil, mas o cronograma só sabia
agendar o tópico em bloco.

**A tese:** mais conteúdo é crescimento linear. O multiplicador é fazer cada
coisa que o aluno já faz virar evidência num modelo único, e esse modelo decidir
o que volta, quando volta e em que forma volta. O conteúdo já está pago; ele só
não estava sendo cobrado.

---

## 2. Decisões tomadas

| decisão | escolha | consequência |
|---|---|---|
| alvo | fechar o circuito, não ampliar o acervo | nenhuma fase exige escrever conteúdo novo |
| granularidade | caixa por **tópico × dimensão** | até 4 agendamentos por tópico, cada um no seu ritmo |
| onde vive | unificado no Modo Domínio | uma fila, um ranking, uma porta de entrada |
| ordem | fundação primeiro, depois uma dimensão inteira por vez | o risco de migração fica isolado na Fase 0 |

---

## 3. O modelo de dados (Fase 0 — entregue em `f73a4fa`)

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

Cada `dims[d]` carrega os mesmos campos do registro plano do v4. A mecânica de
Leitner é idêntica — promove quando venceu e acertou, rebaixa uma caixa limitada
por `SRS_LAPSE_CAP`, e treinar antes da hora não avança. **Mudou o endereço, não
a regra.** Isso é deliberado: mudar o que é agendado e como se agenda ao mesmo
tempo seria impossível de depurar.

### 3.1 Quais caixas existem

`measurableDimensions(moduleId, lessonIndex)` é **derivada do conteúdo, nunca
gravada**. Uma dimensão só ganha caixa se o tópico tem como medi-la.

É essa função que faz as fases seguintes serem baratas: quando a reconstrução de
`CHAIN` valer para os 64 tópicos, `causality` entra ali e as caixas nascem
sozinhas na próxima interação. **O schema não muda de novo depois da Fase 0.**

Estado atual: 164 caixas das 256 possíveis.

```
recognition  50/64      causality    63/64
location     11/64      application  40/64
```

### 3.2 Migração v4 → v5

- O registro antigo é preservado inteiro como `dims.recognition` — ninguém perde
  intervalo conquistado.
- As demais dimensões nascem só onde já existe evidência **datada** em
  `dimensionEvidence`. Registros semeados por `migrateDimensionsFromLegacy` têm
  `updatedAt: 0` e ficariam vencidos desde 1970; são ignorados.
- Evidência retroativa abre no máximo na caixa 1. Evidência antiga não é
  intervalo ganho.
- A migração é idempotente, e lixo (`null`, string, `NaN`) é descartado ou
  saneado.

Rejeitado: espalhar os vencimentos dentro da migração. É política de
agendamento, e política de agendamento pertence à seção de volume — não ao
`migrateState`.

---

## 4. As fontes de evidência (Fase 0 — entregue)

**Gravar evidência é o que agenda.** `recordDimensionEvidence` alimenta um lote
aberto pela atividade; `commitEvidenceBatch` toma **uma** decisão de intervalo
por dimensão no fim.

```
beginEvidenceBatch()              → abre o lote
recordDimensionEvidence(…) × N    → acumula por (escopo, dimensão)
commitEvidenceBatch()             → uma decisão por dimensão; descarta escopo M:
```

Sem isso, um mini quiz com 3 questões de reconhecimento promoveria a caixa três
vezes numa sentada, saltando o intervalo de 1 para 14 dias e corrompendo o
Leitner em silêncio.

**Atividade que não abre lote não agenda nada.** É assim, e não por uma lista de
exceções, que o quiz de módulo e os casos integrados ficam de fora.

| atividade | escopo | agenda? |
|---|---|---|
| marcar aula estudada | — | ✅ semeia as dimensões mensuráveis |
| mini quiz | `T:` | ✅ uma promoção por dimensão medida |
| sessão de revisão | `T:` | ✅ a dimensão daquele item |
| contrafactual | `T:` | ✅ `causality` |
| reconstrução da cadeia | `T:` | ✅ `causality` |
| quiz do módulo | `M:` | ❌ de propósito |
| caso integrado | `M:` | ❌ de propósito |

### 4.1 Por que o quiz do módulo fica de fora

O mapeamento questão → aula **não é posicional**. Medido por TF-IDF com cosseno
sobre os 64 pares (66% de coincidência com a posição) e conferido à mão:
`plasticidade`, `sono`, `motor` e `metodos` sequer testam a aula 0 no quiz do
módulo. Atribuir por posição creditaria a aula errada, e um cronograma que
credita errado é pior que um que não credita.

**Melhoria opcional, fora do escopo destas fases:** declarar um campo `l:` em
cada uma das 64 questões de quiz de módulo. Destravaria o agendamento por tópico
e permitiria ao portão de conteúdo exigir que toda aula tenha ao menos uma
questão de módulo — o portão que teria pego as 4 aulas órfãs.

---

## 5. A política de volume (entregue em `be59938`)

`SESSION_CAP` passou de 8 para 16 **itens** (tópico × dimensão).

Simulação de 180 dias com o escalonador real, 2 aulas/dia, semente fixa:

| acerto | cap | pico da fila | fila no dia 180 | média dias 150-180 | itens/dia feitos |
|---|---:|---:|---:|---:|---:|
| 85% | 8 | 131 | 2 | 4,0 | 6,7 |
| 85% | 16 | 79 | 2 | 3,1 | 7,4 |
| 70% | 8 | 138 | 19 | 34,3 | 7,9 |
| 70% | 16 | 112 | 1 | 5,8 | 10,5 |
| 60% | 8 | 151 | **72** | **80,7** | 7,9 |
| 60% | 16 | 118 | 16 | 10,2 | 13,3 |

O teto de 8 fora calibrado quando um item era um tópico com 3 perguntas. Com 164
caixas em intervalos iniciais de 1 a 3 dias, virou gargalo de vazão: a 60% de
acerto o aluno **nunca alcança a fila**. Quem mais precisa da revisão seria
justamente quem ela soterra.

O teto é válvula, não cota — na maioria dos dias a fila é menor que ele. Dobrá-lo
custa ~1 item/dia de trabalho médio e derruba o pico em 40%. E 16 itens ≈ 16
perguntas continua abaixo das 24 que a sessão do v4 podia pedir.

O letreiro do painel mostra o tamanho da **sessão**, não da fila, com o excedente
declarado logo abaixo.

**Descartado com medição:** "progressão por dependência" (só cobrar Aplicação
depois de consolidar Reconhecimento). Prometia limitar a fila ao número de
tópicos estudados; medida, reduziu de 99 para 65 e manteve até 3 itens do mesmo
tópico, porque dimensão consolidada continua em rotação. Não é ferramenta de
volume. Pode ter mérito pedagógico próprio — é outro argumento, para outra hora.

---

## 6. As três formas novas de medição

O conteúdo que mede as quatro dimensões nos 64 tópicos já existe e já está
escrito. Só não está ligado como evidência.

### Fase 2 — Aplicação: a previsão vira banco de perguntas

`PREDICT` cobre **64/64**, todas com 3 alternativas e texto de fechamento.
Cobertura de Aplicação sai de **40 para 64**.

**Restrição que o desenho precisa respeitar:** a previsão é um **pré-teste**,
mostrada antes do corpo da aula, com o texto velado até a resposta. Errar ali é
o objetivo — é o erro de previsão que abre a janela para o conteúdo entrar.
Registrar isso como evidência mediria o momento errado e puniria exatamente o
comportamento que a tela quer provocar.

Portanto: a previsão **continua sem registrar evidência no primeiro contato**.
Ela vira o banco de perguntas dos itens de Aplicação **na revisão**, onde a
pergunta já é legítima porque a aula foi lida.

**Regra do banco, para não ficar ambíguo:** um item de Aplicação sorteia entre a
previsão do tópico e as mini-questões classificadas como `application`, com
preferência pela previsão quando ela ainda não apareceu naquela caixa. As duas
fontes continuam registrando evidência com fonte distinta (`prediction` ganha
peso próprio em `evidenceWeight`, hoje declarado e nunca usado).

### Fase 1 — Explicação causal: reconstruir a cadeia

`CHAIN` cobre **64/64**: 4 a 8 etapas (46 cadeias têm 5), todas com dobradiça
(`h`/`hn`) e com o "e se" (`w`/`wa`). A máquina de reconstrução já existe em
`04c-domain-guided.js` — `domainStartReconstruction`, `domainPickChainStep`,
`domainCheckReconstruction`, com embaralhamento determinístico — mas está
amarrada aos 24 itens do Modo Domínio. Generalizar é extrair para qualquer par
`{id, chain}`.

**Isto não é ganho de cobertura.** Causalidade já está em 63/64. A fase adiciona
uma caixa. O que muda é a **qualidade da medida**: hoje "explicação causal" é
uma múltipla escolha que um regex classificou como causal; depois, é remontar o
mecanismo na ordem certa. Sai de reconhecer a resposta certa para reconstruir a
cadeia.

**Regra do banco, para não ficar ambíguo:** na revisão, a reconstrução
**substitui** a múltipla escolha como prova de Explicação causal, já que cobre
64/64. As mini-questões classificadas como causais continuam existindo e
continuam registrando evidência — mas dentro do mini quiz, no primeiro contato,
não como item de revisão.

### Fase 3 — Localização: apontar no diagrama

Cobertura de **11 para 56** — o maior salto isolado. `CONTEXT_TOPIC_TERMS` ancora
168 termos a partes do diagrama do próprio módulo, e todo módulo tem ao menos 3
partes, garantindo distratores.

**Forma:** tocar a parte no SVG, usando `.apart[data-struct]` e `selectAnat`, que
já existem. Custa hospedar o diagrama na tela de revisão. A alternativa barata —
escolher entre rótulos das partes irmãs — foi rejeitada: mediria vocabulário, não
espaço.

**Os 8 tópicos que ficam de fora não são falha de dados:**

```
M06 Estado mental e desempenho          M14 O que dá errado no cérebro
M09 Sob o córtex: estruturas profundas   M14 Transtornos psiquiátricos
M13 Quando a linguagem quebra: afasias   M16 Como se estuda o cérebro: o problema
M13 Leitura, sotaque, cérebro bilíngue   M16 Manipular para provar causa
```

Em quase todos, "onde fica" não é uma pergunta com resposta.
`measurableDimensions` não cria a caixa, e nenhuma fila cobra o que não existe.

### Projeção

| dimensão | hoje | depois |
|---|---:|---:|
| Reconhecimento | 50/64 | 50/64 |
| Localização | 11/64 | 56/64 |
| Explicação causal | 63/64 | 64/64 |
| Aplicação | 40/64 | 64/64 |
| **caixas** | **164** | **234** |

**Buraco conhecido, fora de escopo:** Reconhecimento fica em 50/64 — 14 tópicos
não têm nenhuma mini-questão que o classificador considere de reconhecimento.

---

## 7. Fase 4 — A tela unificada

O que está genuinamente duplicado:

| duplicação | onde |
|---|---|
| dois renderizadores da mesma fila | `renderReview` (05) e `domainRenderReviews` (04b) |
| dois cartões no dashboard | `#db-review` e `#db-domain-entry` |
| dois números globais de progresso na tela | `overallProgress` (barra + stat) e `domainCoverageStats` |
| ranking morto | `weakTopics()` (05), **zero chamadores** |

**7.1 Uma fila, um renderizador.** `dueTopics()` já é fonte única; o que diverge
é a apresentação, escrita duas vezes. Vira uma função parametrizada por contexto.

**7.2 Um ranking, por dimensão.** `domainWeakTopics` fica como único e passa a
dizer **qual saber** está frágil, não só qual tópico — já calcula
`weakestDimensionForTopic` internamente e não expõe. `weakTopics()` é deletado.

**7.3 Progresso: parar de competir, não virar um número só.** Colapsar seria
errado — a tese do Modo Domínio é *"cobertura não é domínio"*. O problema real é
de rótulo: a barra se chama "Progresso geral do percurso" e calcula
`0,25·aulas + 0,35·mini quiz + 0,40·quiz do módulo`. Diz *percurso* e mede
*desempenho*.

- a barra do dashboard passa a mostrar **cobertura**;
- os cinco indicadores de domínio ficam no Modo Domínio;
- `moduleProgress` continua intacto nas barras de cada cartão e no mapa sináptico;
- a cláusula `|| overallProgress() >= 0.70` em `domainStage` **fica** — removê-la
  poderia rebaixar de "ativo" para "prévia" sem aviso.

**7.4 O stat que vira vaga.** Sai "Progresso médio" (duplicata da barra). Entra
**caixas consolidadas** — quantas caixas estão em `box >= 3`, ou seja, intervalo
de 14 dias ou mais, sobre o total de caixas existentes. É a
resposta para "quanto do que estudei já está estável", que nenhuma tela mostra e
que só existe por causa da Fase 0.

**7.5 Uma porta.** `#db-review` e `#db-domain-entry` viram um cartão só. As sete
abas ficam como estão: a unificação é de dados e de porta de entrada, não de
navegação.

---

## 8. Testes e portões

**O que existe:** `tools/verifica-metaforas.js`, `tools/audit-content.js`,
`tools/test-srs.js` (local, ~1s) e a suíte do Playwright (só CI, ~5 min).
`npm test` roda os quatro em ordem.

**Problema encontrado:** `audit-content.js` valida o banco do Modo Domínio por
**regex sobre o texto-fonte** (`domain.match(/const DOMAIN_CASES = \[(.*?)\];…/s)`)
e não valida `CHAIN`, `PREDICT` nem `MINI_QUIZZES`. As três estruturas de que as
Fases 1, 2 e 3 dependem não têm portão, e as que têm são conferidas por um método
que quebra com uma linha em branco a mais entre duas constantes.

`tools/test-srs.js` já estabeleceu a técnica melhor: carregar os objetos de
verdade num contexto `vm` e perguntar a eles. É onde as invariantes de conteúdo
devem passar a morar.

### Portões por fase

| fase | invariante de conteúdo | invariante de comportamento |
|---|---|---|
| 2 | 64 previsões, ≥3 alternativas, `c` na faixa, `after` não vazio | a previsão no primeiro contato **não** registra evidência |
| 1 | 64 cadeias, ≥4 etapas, `h` inteiro na faixa, `w`/`wa` presentes | o embaralhamento determinístico nunca devolve a ordem original |
| 3 | todo tópico com caixa de `location` tem ≥1 termo ancorado e ≥3 partes no diagrama | os 8 tópicos sem âncora não ganham caixa de `location` |
| 4 | — | a barra do dashboard bate com `domainCoverageStats`; existe um único cartão de revisão |

### Dois portões independentes de fase

**A invariante de mensurabilidade.** Para todo tópico e dimensão: se existe
caixa, então `canMeasure` é verdadeiro. É a propriedade que impede uma fila que
nada consegue satisfazer. Hoje é garantida por construção em dois pontos; um
terceiro chamador desatento a quebra. Verificar **depois de uso simulado**, não
só na semeadura.

**Teste de carga do cronograma.** 180 dias simulados, semente fixa, 60% de
acerto, afirmando que a fila drena abaixo de um limiar. Congela o que foi
descoberto na seção 5: se alguém mexer em `SRS_INTERVALS`, em `SESSION_CAP` ou
na regra de rebaixamento e reproduzir o cenário em que o aluno nunca alcança a
fila, o portão pega em ~1 segundo em vez de aparecer como desânimo três meses
depois. É uma propriedade dinâmica de um sistema realimentado — invisível em
qualquer teste de unidade.

### O que continua no Playwright

Pixel, alcance de botão e viewport — inclusive o teste de alcance do botão da
revisão, já ajustado na Fase 0 para o formato v5.

### Ao publicar

`VERSION` no `sw.js` e a string literal correspondente em
`tools/audit-content.js` mudam juntas; divergência reprova o CI.

---

## 9. Ordem de execução

| fase | entrega | estado |
|---|---|---|
| 0 | schema `dims`, migração v4→v5, lote de evidência, fila por dimensão, `tools/test-srs.js` | **no ar** (`f73a4fa`) |
| — | `SESSION_CAP` 8 → 16 | **no ar** (`be59938`) |
| 2 | Aplicação: `PREDICT` como banco de perguntas da revisão | a fazer |
| 1 | Explicação causal: reconstrução de `CHAIN` generalizada para os 64 | a fazer |
| 3 | Localização: apontar no diagrama, via `CONTEXT_TOPIC_TERMS` | a fazer |
| 4 | tela unificada no Modo Domínio | a fazer |

A ordem 2 → 1 → 3 vem dos números: a Fase 2 é a mais barata e entrega +24
caixas; a Fase 1 entrega +1 caixa e muita qualidade de medida; a Fase 3 entrega
+45 caixas e custa mais que as duas juntas.

**Cada fase recebe seu próprio plano de implementação.** Este documento é o
design das quatro; tentar planejar as quatro de uma vez reproduziria o erro que
a fase 0 evitou — trocar dois pisos ao mesmo tempo. As fases são independentes
entre si: qualquer uma pode ser adiada ou cancelada sem quebrar as outras, já
que `measurableDimensions` simplesmente não cria a caixa da dimensão cuja forma
de medição não chegou.

---

## 10. Fora de escopo

- Escrever conteúdo novo. Nenhuma fase exige.
- Declarar `l:` nas 64 questões de quiz de módulo (seção 4.1).
- Fechar o buraco de Reconhecimento em 14 tópicos (seção 6).
- Intervalos diferentes por dimensão. `SRS_INTERVALS` é o mesmo vetor para as
  quatro.
- Progressão por dependência entre dimensões (seção 5) — descartada como
  ferramenta de volume; se voltar, volta como decisão pedagógica.
