# Changelog — Fatia 2: uma 5ª aula em cada módulo (22 aulas novas)

Segunda fatia da expansão: **crescer a grade de aulas**. A grade histórica era de
4 aulas por módulo; a Fatia 2 acrescenta **uma 5ª aula a cada um dos 22 módulos**,
sempre escolhida para **completar uma metade que o módulo não contava** (o
método "eu proponho → você aprova → eu preencho → você confere a ciência"). Os
testes (SRS e Playwright) foram **ajustados para refletir o crescimento, não
afrouxados**. A grade passou de 88 para **110 tópicos**.

As duas primeiras (glia e poda) saíram antes e estão descritas abaixo; o bloco
das outras 20 vem logo em seguida.

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

## O bloco das outras 20 (uma por módulo, aprovado em lote)
Cada aula completa a "metade não contada" do seu módulo:

| Módulo | 5ª aula | Metade que faltava |
| --- | --- | --- |
| 03 recompensa | O avesso: prever e evitar a punição | o sistema **aversivo** (habênula, evitação), não só o de recompensa |
| 04 decisão | O valor é relativo: enquadramento e contexto | o valor **relativo** (referência, chamariz), não o número absoluto |
| 05 atenção | O que escapa: cegueira por desatenção | o **custo** da seleção: não ver o óbvio |
| 06 emoção | Regular a emoção: reavaliar e o freio pré-frontal | **como** regular (reavaliação × supressão) |
| 07 autônomo | Interocepção: o cérebro lendo o corpo | a via **aferente** (corpo → cérebro), não só a eferente |
| 08 sono | O sono REM e os sonhos: processar o dia | a **função** do REM (terapia noturna) |
| 09 neuroanatomia | A fiação: substância branca e redes | as **conexões** (conectoma, desconexão), não só as partes |
| 10 sensorial | Perceber é prever: a construção da realidade | o **mecanismo** (codificação preditiva) por trás da "construção" |
| 11 motor | Aprender o movimento: do desajeitado ao automático | a **aprendizagem** motora (modelo interno, cópia eferente) |
| 12 desenvolvimento | O cérebro que envelhece: declínio e reserva | a **outra ponta** da vida (reserva cognitiva) |
| 13 linguagem | Como a criança aprende a falar | a **aquisição** (estatística, janela sensível) |
| 14 clínica | O cérebro que se recupera: plasticidade após a lesão | a **recuperação**, não só a doença |
| 15 farmacologia | O efeito placebo: expectativa vira farmacologia | a farmácia **do próprio cérebro** |
| 16 métodos | Ler o cérebro com ceticismo: as armadilhas | o **kit do leitor** (inferência reversa, reprodutibilidade) |
| 17 memória | Por que esquecemos — e por que isso ajuda | o **esquecer** (adaptativo, memória falsa) |
| 18 ritmos | Quando o ritmo desanda: sincronia demais | a metade **clínica** (epilepsia, beta do Parkinson) |
| esforço | Elaborar e explicar: por que ensinar fixa | como **processar** (elaboração, ensinar), não só praticar |
| ilusões | O viés da retrospectiva: "eu já sabia" | a ilusão que age **depois** da resposta |
| saber | Do monitorar ao agir: alocar o estudo | o **controle** (a outra metade da metacognição) |
| palpite | Quando o palpite não serve: o que usar no lugar | o **conserto** (fórmula, visão de fora, decisão estruturada) |

**3 propostas foram trocadas ao preencher**, porque a lição sugerida já existia no
módulo: recompensa ("querer × gostar" já está na aula 0), decisão ("marcador
somático" já está na aula 1) e palpite ("dois sistemas" — a aula 0 já adverte
contra a versão forte). Em cada caso, entrou o verdadeiro buraco do módulo.

Cada aula traz o pacote completo (corpo, mini-quiz de 3 questões, DEEP, PREDICT,
CHAIN de 5 elos, BRIDGE, termos de contexto), **1 questão nova no quiz do módulo**
(`l:4`, para não crescer a dívida de aulas órfãs) e **verbetes novos** ancorados
ao módulo (alimentam a Terminologia), reusando termos que já moram em outros
módulos quando cabe.

### Portões, sem afrouxar
As catracas do `test-srs` subiram deliberadamente: total de **caixas de
agendamento 344 → 419**, **âncoras 224 → 229** (as aulas que ancoram um termo a
uma parte do diagrama ganham Localização), e o teto de sanidade do bloco 1 subiu
de 400 para 450. A lista de tópicos sem Localização foi atualizada para as aulas
conceituais. A suíte Playwright (só no CI) foi rodada **localmente antes de cada
deploy** (141 passando, 85 puladas, 0 falha) e ajustada onde fixava contagens.
`VERSION` avançou por lote até `neurolab-v1-27-0`.

## Revisão
Conteúdo científico para a **sua revisão final** (modelo: eu proponho → você
aprova → eu preencho → você confere a ciência). O desenho das duas primeiras
aulas foi aprovado individualmente; as outras 20 foram aprovadas **em lote** a
partir da lista de temas.
