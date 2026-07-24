# Auditoria de termos e mecanismos contextuais — Fase 5

## Método

- Foram cruzados os 16 módulos, 78 componentes anatômicos, glossário, textos das aulas e cadeias causais por tópico.
- “Termo essencial” significa: termo técnico presente no corpo da aula, no título ou na cadeia causal principal, além dos termos adicionados para corrigir lacunas de clique e definição.
- Um termo pode ser **direto**, **distribuído**, **contextual**, **paralelo** ou **contraste**. Não foi inventada uma etapa quando a cadeia não representa aquele mecanismo.

## Resultado geral

- Componentes anatômicos: **78/78** explicitamente mapeados.
- Ocorrências de termos essenciais auditadas por tópico: **356**.
- Pares únicos módulo–termo: **274**.
- Tratamento explícito único antes: **46/274 (16.8%)**.
- Tratamento explícito após a Fase 5: **274/274 (100%)**.
- Termos distintos envolvidos: **176**.
- Novos termos adicionados ao glossário e tornados clicáveis: **57**.

## Cobertura por módulo

| Módulo | Pares únicos | Antes | Depois | Ocorrências diretas | Distribuídas | Contexto | Paralelos/contrastes |
|---|---:|---:|---:|---:|---:|---:|---:|
| 01 · O Neurônio e o Sinal | 19 | 4 | 19 | 22 | 2 | 3 | 0 |
| 02 · Plasticidade e Memória | 23 | 9 | 23 | 17 | 6 | 2 | 1 |
| 03 · Recompensa e Motivação | 12 | 3 | 12 | 14 | 2 | 1 | 1 |
| 04 · Decisão e Valor | 15 | 4 | 15 | 11 | 3 | 6 | 2 |
| 05 · Atenção e Foco | 10 | 2 | 10 | 6 | 7 | 3 | 0 |
| 06 · Emoção, Estresse e Estado | 16 | 4 | 16 | 12 | 5 | 4 | 0 |
| 07 · Sistema Nervoso Autônomo | 19 | 2 | 19 | 11 | 4 | 4 | 2 |
| 08 · Sono e Consolidação | 16 | 3 | 16 | 12 | 3 | 1 | 0 |
| 09 · Neuroanatomia | 24 | 0 | 24 | 18 | 5 | 1 | 7 |
| 10 · Sistemas Sensoriais | 24 | 1 | 24 | 13 | 4 | 14 | 1 |
| 11 · Sistema Motor | 16 | 3 | 16 | 14 | 2 | 7 | 0 |
| 12 · Desenvolvimento | 15 | 1 | 15 | 11 | 3 | 5 | 0 |
| 13 · Linguagem | 13 | 1 | 13 | 11 | 3 | 6 | 0 |
| 14 · Neurociência Clínica | 17 | 0 | 17 | 9 | 3 | 6 | 1 |
| 15 · Neurofarmacologia | 21 | 3 | 21 | 20 | 2 | 3 | 1 |
| 16 · Métodos em Neurociência | 14 | 6 | 14 | 8 | 3 | 6 | 2 |

## Problemas identificados na Fase 4

1. O modal apontava apenas para a cadeia geral do módulo, embora muitos termos pertencessem a mecanismos específicos de uma aula.
2. O fallback usava correspondência por substring, podendo confundir termos próximos, como “córtex” e “córtex pré-frontal”.
3. Vários termos destacados no texto não estavam no glossário e, portanto, não eram clicáveis.
4. Neuroanatomia não possuía mapeamento textual explícito no objeto de termos.
5. Conceitos paralelos eram forçados para a cadeia principal ou recebiam uma relação genérica sem explicar a diferença.

## Solução implementada

- O clique agora leva em conta **módulo e tópico de origem**.
- A cadeia contextual usa primeiro o mecanismo do tópico; a visão geral continua disponível na aba superior.
- Correspondência explícita e exata substitui o pareamento amplo por substring.
- Relações sem etapa direta são rotuladas honestamente como contexto, processo paralelo ou contraste.
- O botão final leva ao tópico e destaca as etapas relacionadas; quando a origem é a anatomia, abre a visão geral do módulo.
- Uma lista `CONTEXT_REQUIRED` permite testar automaticamente a cobertura editorial.

## Termos que não tinham o mesmo tratamento na Fase 4

### 01 · O Neurônio e o Sinal
dendritos, corpo celular, dependentes de voltagem, despolarização, Ca²⁺, glutamato, GABA, sinapse, neurotransmissores, receptores, neuromoduladores, noradrenalina, dopamina, serotonina, acetilcolina

### 02 · Plasticidade e Memória
micróglia, neuroplasticidade, Ca²⁺, sinapse, receptores, Hebb, potenciação de longo prazo, memória de curto prazo, memória de longo prazo, expressão gênica, limiar, hipocampo, córtex, consolidação sistêmica

### 03 · Recompensa e Motivação
córtex, área tegmental ventral, córtex pré-frontal, cerebelo, estriado ventral, estriado dorsal, gânglios da base, estriado, hábito

### 04 · Decisão e Valor
córtex, córtex orbitofrontal, pré-frontal ventromedial, aprendizagem reversa, hipótese do marcador somático, custo de esforço, córtex cingulado anterior, aversão à perda, erro de previsão, dopamina, limiar de decisão

### 05 · Atenção e Foco
top-down, bottom-up, córtex, atenção, executivo central, disparo persistente, córtex pré-frontal, alternância rápida

### 06 · Emoção, Estresse e Estado
tálamo, córtex, via rápida, via lenta, hipófise, retroalimentação negativa, U invertido, hipocampo, Yerkes-Dodson, noradrenalina, locus coeruleus, atenção

### 07 · Sistema Nervoso Autônomo
hipotálamo, córtex, córtex motor, sistema nervoso autônomo, gânglio autonômico, sinapse, noradrenalina, cortisol, cadeia simpática, medula adrenal, axônio, tronco encefálico, acetilcolina, nervo vago, sistema nervoso entérico, tônus autonômico, variabilidade da frequência cardíaca

### 08 · Sono e Consolidação
córtex, homeostase sináptica, memória declarativa, sono REM, sono NREM, células gliais, sistema glinfático, beta-amiloide, Processo C, adenosina, núcleo supraquiasmático, receptores, pressão do sono

### 09 · Neuroanatomia
córtex, substância cinzenta, substância branca, corpo caloso, cerebelo, tronco encefálico, axônio, hipocampo, amígdala, lobo frontal, lobo parietal, lobo temporal, lobo occipital, córtex pré-frontal, lesão, tálamo, hipotálamo, gânglios da base, sistema límbico, noradrenalina, mesencéfalo, dopamina, serotonina, bulbo

### 10 · Sistemas Sensoriais
limiar, fotorreceptores, mecanorreceptores, quimiorreceptores, córtex, potencial de ação, receptores, quiasma óptico, lobo occipital, retina, lobo temporal, cóclea, tonotopia, nociceptores, teoria da comporta, sistema límbico, lobo parietal, córtex somatossensorial, atenção, homúnculo, dor, leitura, lesão

### 11 · Sistema Motor
córtex, bulbo, neurônio motor inferior, trato corticoespinhal, junção neuromuscular, lobo frontal, tronco encefálico, homúnculo, código de população, dopamina, Ca²⁺, unidade motora, acetilcolina

### 12 · Desenvolvimento
tubo neural, vesículas, neurogênese, poda sináptica, glia radial, córtex, epilepsia, micróglia, córtex pré-frontal, mielina, períodos críticos, redes perineuronais, hipocampo, plasticidade

### 13 · Linguagem
córtex, lobo frontal, córtex motor, área de Broca, área de Wernicke, atenção, afasia de condução, afasia, dissociação, lesão, períodos críticos, leitura

### 14 · Neurociência Clínica
gânglios da base, lesão, tau, alfa-sinucleína, hipocampo, substância negra, lobo temporal, dopamina, doenças neurodegenerativas, penumbra, epilepsia, AVC, sistema límbico, córtex, córtex pré-frontal, neurotransmissores, plasticidade

### 15 · Neurofarmacologia
barreira hematoencefálica, sinapse, GABA, noradrenalina, adenosina, benzodiazepínicos, dopamina, estimulantes, depressores, serotonina, receptores, plasticidade, antidepressivos, antipsicóticos, ISRS, dependência, abstinência, estriado dorsal

### 16 · Métodos em Neurociência
optogenética, lesão, evidência convergente, hipocampo, córtex, interfaces cérebro-máquina, conectômica, replicação

## Novos termos tornados clicáveis

- dendritos
- corpo celular
- axônio
- despolarização
- potencial de ação
- sinapse
- neurotransmissores
- receptores
- vesículas
- neuroplasticidade
- Hebb
- potenciação de longo prazo
- memória de curto prazo
- memória de longo prazo
- expressão gênica
- síntese de proteínas
- consolidação sistêmica
- hábito
- atenção
- memória de trabalho
- controle executivo
- alternância rápida
- Yerkes-Dodson
- memória declarativa
- sono NREM
- sono REM
- pressão do sono
- retina
- cóclea
- tonotopia
- homúnculo
- dor
- neurônio motor inferior
- trato corticoespinhal
- junção neuromuscular
- neurogênese
- sinaptogênese
- poda sináptica
- plasticidade
- afasia
- dissociação
- leitura
- lesão
- doenças neurodegenerativas
- epilepsia
- AVC
- estimulantes
- depressores
- antidepressivos
- antipsicóticos
- dependência
- abstinência
- ISRS
- causalidade
- convergência
- replicação
- evidência convergente