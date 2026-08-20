/* NeuroLab V2 · Fase 2 · visualização funcional */
let _funcModuleId = null;
let _funcStep = 0;
let _funcTimer = null;

const FUNCTIONAL_SPECIAL = {
  plasticidade: {
    lead: 'Como uma experiência produz uma mudança rápida e, se sustentada, uma alteração estável da sinapse?',
    chain: [
      'Glutamato ativa receptores AMPA e produz despolarização.',
      'A despolarização remove o bloqueio de Mg²⁺ do receptor NMDA.',
      'O NMDA permite a entrada de Ca²⁺ no neurônio pós-sináptico.',
      'O Ca²⁺ ativa CaMKII e outras vias de sinalização.',
      'Mais AMPA é inserido e a resposta sináptica aumenta rapidamente.',
      'Ativação sustentada recruta PKA, CREB e expressão gênica.',
      'Síntese de proteínas estabiliza mudanças estruturais duradouras.'
    ],
    hinge: 2,
    ifs: [[
      'E se AMPA fosse bloqueado?',
      'A membrana não despolarizaria o suficiente; o bloqueio de Mg²⁺ permaneceria no NMDA e a indução da LTP seria prejudicada.'
    ]]
  }
};

function functionalData(m){
  if(FUNCTIONAL_SPECIAL[m.id]) return FUNCTIONAL_SPECIAL[m.id];
  const d = (typeof IMAGINE_DATA_V2 !== 'undefined') ? IMAGINE_DATA_V2[m.id] : null;
  if(!d || !Array.isArray(d.chain)) return null;
  return {
    lead: d.lead,
    chain: d.chain,
    hinge: Math.max(1, Math.floor((d.chain.length - 1) / 2)),
    ifs: d.ifs || []
  };
}

function funcPhase(i,total){
  if(i < Math.ceil(total/3)) return 'entrada';
  if(i >= Math.floor(total*2/3)) return 'consequência';
  return 'transformação';
}

const INTEGRATED_VISUALS = {
  neuronio: {
    title: "Do axônio à sinapse",
    lead: "Uma visão única para relacionar a anatomia do neurônio, a condução saltatória e a transmissão sináptica.",
    thumb: "./assets/visuals/module-01-neuron-synapse-thumb.webp",
    src: "./assets/visuals/module-01-neuron-synapse.webp",
    alt: "Infográfico vertical com dois neurônios. O primeiro possui dendritos, soma, axônio coberto por segmentos de mielina, nódulos de Ranvier e terminal sináptico. Setas mostram a entrada de sódio nos nódulos, a corrente local sob a mielina, a saída de potássio e, no terminal, a entrada de cálcio, a liberação de neurotransmissores e a ativação dos receptores do segundo neurônio.",
    caption: "A imagem une três escalas: o neurônio inteiro, a propagação entre nódulos e a passagem do sinal pela sinapse.",
    layers: [
      ["Condução no axônio","O potencial de ação é regenerado nos nódulos; a corrente local alcança rapidamente o próximo ponto sob a mielina."],
      ["Conversão no terminal","A chegada elétrica abre canais de Ca²⁺ e aciona a fusão das vesículas com a membrana."],
      ["Comunicação entre células","O neurotransmissor atravessa a fenda e altera receptores na membrana do neurônio seguinte."]
    ],
    clarify: "O nódulo de Ranvier fica entre segmentos de mielina no mesmo axônio; a fenda sináptica fica entre duas células."
  },
  plasticidade: {
    title: "Plasticidade e memória",
    lead: "Veja como a atividade repetida altera receptores, ativa sinalização intracelular e estabiliza conexões mais eficientes.",
    thumb: "./assets/visuals/module-02-plasticity-memory-thumb.webp",
    src: "./assets/visuals/module-02-plasticity-memory.webp",
    alt: "Infográfico de uma sinapse glutamatérgica mostrando vesículas, glutamato, receptores AMPA e NMDA, bloqueio por magnésio, entrada de sódio e cálcio, ativação de CaMKII, PKA e CREB, além da comparação entre mudanças de curto e de longo prazo.",
    caption: "A visão integrada acompanha a passagem do glutamato até o fortalecimento funcional e estrutural da sinapse.",
    layers: [
      ["Entrada rápida","AMPA deixa Na⁺ entrar e produz a despolarização que prepara a abertura do NMDA."],
      ["Sinal de mudança","A entrada de Ca²⁺ pelo NMDA ativa CaMKII e outras vias que aumentam a eficiência sináptica."],
      ["Estabilização","PKA, CREB e novas proteínas permitem que alterações repetidas se tornem mais duradouras."]
    ],
    clarify: "AMPA produz grande parte da resposta rápida; NMDA detecta coincidência entre glutamato e despolarização; Ca²⁺ atua como sinal intracelular."
  },
  recompensa: {
    title: "Recompensa e motivação",
    lead: "Relacione a via dopaminérgica, a expectativa de recompensa, o erro de previsão e a formação de hábitos.",
    thumb: "./assets/visuals/module-03-reward-motivation-thumb.webp",
    src: "./assets/visuals/module-03-reward-motivation.webp",
    alt: "Infográfico do circuito de recompensa mostrando área tegmental ventral, núcleo accumbens e córtex pré-frontal, seguido pelo ciclo pista, ação, recompensa esperada e recompensa recebida, com curvas de dopamina para resultados melhores, iguais ou piores que o previsto.",
    caption: "A figura mostra que a dopamina ajuda o cérebro a atualizar previsões e reforçar ou enfraquecer comportamentos.",
    layers: [
      ["Previsão","Uma pista permite que o cérebro antecipe um resultado antes que ele aconteça."],
      ["Erro de previsão","A diferença entre o esperado e o recebido muda a resposta dopaminérgica."],
      ["Aprendizado e hábito","A repetição transfere controle para circuitos mais automáticos e econômicos."]
    ],
    clarify: "Dopamina não é sinônimo de prazer: ela participa sobretudo de previsão, motivação e aprendizado; gostar e querer podem se separar."
  },
  decisao: {
    title: "Decisão e valor",
    lead: "Acompanhe como opções recebem valor subjetivo, competem sob custos e restrições e são atualizadas pelo resultado.",
    thumb: "./assets/visuals/module-04-decision-value-thumb.webp",
    src: "./assets/visuals/module-04-decision-value.webp",
    alt: "Infográfico de decisão mostrando opções concorrentes, córtex orbitofrontal e pré-frontal, córtex cingulado anterior, estriado e amígdala, com etapas de percepção, atribuição de valor, comparação de custos e benefícios, conflito, escolha, resultado e aprendizado.",
    caption: "A decisão emerge da comparação entre valor, custo, benefício, risco, atraso e esforço, não de uma única região cerebral.",
    layers: [
      ["Atribuição de valor","Experiência, emoção e metas fazem cada opção adquirir um valor subjetivo."],
      ["Comparação e conflito","Custos, benefícios, risco e atraso são comparados enquanto o ACC monitora conflito e erro."],
      ["Escolha e ajuste","O resultado recebido atualiza os valores usados em decisões futuras."]
    ],
    clarify: "Valor é uma avaliação interna; preferência é uma inclinação relativa; decisão é a opção efetivamente escolhida sob restrições."
  },
  atencao: {
    title: "Atenção e foco",
    lead: "Visualize como muitos estímulos competem, poucos são mantidos e o controle top-down redireciona recursos limitados.",
    thumb: "./assets/visuals/module-05-attention-focus-thumb.webp",
    src: "./assets/visuals/module-05-attention-focus.webp",
    alt: "Infográfico mostrando muitos estímulos entrando em um filtro atencional, poucos itens chegando à consciência, redes pré-frontais, parietais, tálamo, saliência e memória de trabalho, além das etapas de seleção, manutenção, distração e redirecionamento.",
    caption: "A imagem reúne seleção, memória de trabalho e controle executivo para explicar por que foco exige escolher e sustentar.",
    layers: [
      ["Seleção","A atenção favorece sinais relevantes e reduz a influência competitiva de outros estímulos."],
      ["Manutenção limitada","A memória de trabalho mantém apenas poucos itens ativos ao mesmo tempo."],
      ["Controle e energia","Metas redirecionam o foco, mas fadiga e estímulos salientes podem interrompê-lo."]
    ],
    clarify: "Atenção escolhe e mantém o alvo; alerta é prontidão geral; memória de trabalho conserva e manipula informação temporariamente."
  },
  emocao: {
    title: "Emoção, estresse e estado",
    lead: "Una avaliação de ameaça, resposta hormonal, alterações corporais e efeitos do nível de ativação sobre desempenho.",
    thumb: "./assets/visuals/module-06-emotion-stress-state-thumb.webp",
    src: "./assets/visuals/module-06-emotion-stress-state.webp",
    alt: "Infográfico conectando amígdala, hipotálamo, cortisol, hipocampo, córtex pré-frontal e corpo, com a sequência da resposta ao estresse, curva de Yerkes-Dodson, comparação entre ativação moderada e excessiva e sistema nervoso autônomo.",
    caption: "O estado mental resulta da interação entre avaliação cerebral, hormônios, corpo e contexto — e modifica a forma de pensar e agir.",
    layers: [
      ["Detecção e alarme","A amígdala prioriza ameaça e recruta o hipotálamo para coordenar respostas automáticas."],
      ["Mobilização corporal","Adrenalina e cortisol aumentam energia, vigilância e prontidão para responder."],
      ["Efeito sobre desempenho","Ativação moderada pode ajudar; ativação excessiva estreita o foco e prejudica controle e memória."]
    ],
    clarify: "Emoção é uma resposta relativamente breve; humor é um estado afetivo mais duradouro; estresse é a resposta a demandas e ameaças."
  },
  autonomo: {
    title: "Sistema nervoso autônomo",
    lead: "Veja como hipotálamo e tronco encefálico regulam órgãos sem comando consciente e alternam mobilização e recuperação.",
    thumb: "./assets/visuals/module-07-autonomic-nervous-system-thumb.webp",
    src: "./assets/visuals/module-07-autonomic-nervous-system.webp",
    alt: "Infográfico do sistema nervoso autônomo mostrando cérebro, hipotálamo e tronco encefálico conectados ao coração, pulmões, pupilas e intestino, com comparação entre simpático e parassimpático e etapas de ativação e recuperação.",
    caption: "A figura mostra dois ramos coordenados: o simpático mobiliza recursos e o parassimpático favorece restauração e digestão.",
    layers: [
      ["Comando automático","Hipotálamo e tronco encefálico ajustam órgãos sem depender de decisão consciente."],
      ["Ramo simpático","Aumenta prontidão, frequência cardíaca e disponibilidade de energia diante de demandas."],
      ["Ramo parassimpático","O nervo vago e outras vias reduzem mobilização e favorecem recuperação."]
    ],
    clarify: "Voluntário descreve a decisão consciente; somático controla principalmente músculo esquelético; autônomo regula órgãos, glândulas e vísceras."
  },
  sono: {
    title: "Sono e consolidação",
    lead: "Relacione ciclos NREM e REM, pressão do sono, consolidação de memórias e limpeza metabólica.",
    thumb: "./assets/visuals/module-08-sleep-consolidation-thumb.webp",
    src: "./assets/visuals/module-08-sleep-consolidation.webp",
    alt: "Infográfico de sono mostrando cérebro adormecido, alternância entre NREM e REM, ciclo circadiano, adenosina, transferência de memória entre hipocampo e córtex, integração emocional e sistema glinfático, além de um hipnograma noturno.",
    caption: "O sono alterna estados com funções complementares: estabilizar, integrar, recuperar e remover resíduos.",
    layers: [
      ["Pressão e horário","Ritmo circadiano e adenosina ajudam a determinar quando o sono começa e quão intenso será."],
      ["Consolidação e integração","NREM estabiliza informações e REM amplia associações e processamento emocional."],
      ["Manutenção biológica","Durante o sono, processos metabólicos e glinfáticos favorecem recuperação e limpeza."]
    ],
    clarify: "Cansaço é sensação de esforço; sonolência é necessidade fisiológica de dormir; fadiga é esgotamento persistente e mais amplo."
  },
  neuroanatomia: {
    title: "Neuroanatomia",
    lead: "Explore a posição relativa das grandes estruturas e como localização, circuito e função se conectam.",
    thumb: "./assets/visuals/module-09-neuroanatomy-thumb.webp",
    src: "./assets/visuals/module-09-neuroanatomy.webp",
    alt: "Infográfico com corte sagital detalhado do cérebro e rótulos para córtex, lobos frontal, parietal, temporal e occipital, corpo caloso, tálamo, hipotálamo, hipocampo, amígdala, gânglios da base, tronco encefálico e cerebelo.",
    caption: "O mapa anatômico organiza estruturas em córtex, subcórtex, tronco e cerebelo, mas destaca que funções emergem de redes distribuídas.",
    layers: [
      ["Mapa físico","A posição das estruturas orienta a compreensão de vias e relações espaciais."],
      ["Circuitos distribuídos","Uma região participa de várias redes e uma função depende de múltiplas estruturas."],
      ["Do cérebro ao comportamento","Localização informa o circuito; o circuito sustenta funções que aparecem em ações e experiências."]
    ],
    clarify: "Localização não é função isolada, e tamanho não mede importância: estruturas pequenas podem exercer grande influência em circuitos amplos."
  },
  sensorial: {
    title: "Sistemas sensoriais",
    lead: "Acompanhe como energia física é transduzida, conduzida e interpretada como visão, audição, tato, olfato e paladar.",
    thumb: "./assets/visuals/module-10-sensory-systems-thumb.webp",
    src: "./assets/visuals/module-10-sensory-systems.webp",
    alt: "Infográfico das vias sensoriais mostrando retina, nervo óptico, tálamo e córtex visual, cóclea, nervo auditivo e córtex auditivo, lógica de transdução e cartões para visão, audição, tato, olfato e paladar.",
    caption: "Todos os sentidos seguem uma lógica comum: receptor especializado transforma energia, vias carregam o sinal e o cérebro constrói percepção.",
    layers: [
      ["Transdução","Receptores convertem luz, vibração, pressão ou moléculas em mudanças elétricas."],
      ["Via sensorial","Nervos e estações de relevo conduzem e reorganizam a informação."],
      ["Percepção","Córtices sensoriais integram sinal, memória, atenção e contexto para produzir significado."]
    ],
    clarify: "Sensação é o registro neural inicial do estímulo; percepção é a interpretação construída pelo cérebro a partir desse registro."
  },
  motor: {
    title: "Sistema motor",
    lead: "Siga o comando do planejamento cortical até a medula, a junção neuromuscular, a contração e o feedback sensorial.",
    thumb: "./assets/visuals/module-11-motor-system-thumb.webp",
    src: "./assets/visuals/module-11-motor-system.webp",
    alt: "Infográfico do sistema motor mostrando córtex motor, vias descendentes, medula espinal, neurônio motor alfa, junção neuromuscular com acetilcolina, receptor nicotínico, músculo, cerebelo, gânglios da base e propriocepção.",
    caption: "O movimento é um ciclo: intenção e planejamento geram comando, o músculo executa e o feedback permite correções contínuas.",
    layers: [
      ["Planejamento e seleção","Córtex pré-motor, gânglios da base e cerebelo estruturam o plano e selecionam a ação."],
      ["Execução descendente","O córtex motor envia sinais pela medula até neurônios motores que alcançam o músculo."],
      ["Contração e ajuste","ACh ativa a fibra muscular, enquanto propriocepção e cerebelo refinam o resultado."]
    ],
    clarify: "Planejamento define a ação antes do movimento; execução envia o comando; ajuste corrige força, direção e tempo durante a ação."
  },
  desenvolvimento: {
    title: "Desenvolvimento",
    lead: "Veja como genes, ambiente e experiência constroem, expandem e refinam circuitos desde a gestação até a vida adulta.",
    thumb: "./assets/visuals/module-12-development-thumb.webp",
    src: "./assets/visuals/module-12-development.webp",
    alt: "Infográfico do desenvolvimento cerebral com linha do tempo da gestação à idade adulta, neurogênese, migração, diferenciação, sinaptogênese, mielinização, poda sináptica, períodos sensíveis e maturação do sistema límbico e do córtex pré-frontal na adolescência.",
    caption: "O cérebro não apenas cresce: ele organiza células, cria conexões em excesso, mieliniza vias e preserva redes fortalecidas pela experiência.",
    layers: [
      ["Construção inicial","Neurogênese, migração e diferenciação posicionam e especializam as células."],
      ["Expansão de conexões","Sinaptogênese e mielinização ampliam comunicação e velocidade."],
      ["Refino por experiência","Uso fortalece redes; poda remove conexões menos úteis e aumenta eficiência."]
    ],
    clarify: "Crescimento não é maturação; períodos sensíveis não são prazos absolutos; plasticidade permite mudança, mas não elimina limites biológicos."
  },
  linguagem: {
    title: "Linguagem",
    lead: "Integre audição, significado, planejamento, articulação, leitura, escrita e feedback em uma rede cerebral distribuída.",
    thumb: "./assets/visuals/module-13-language-thumb.webp",
    src: "./assets/visuals/module-13-language.webp",
    alt: "Infográfico de linguagem mostrando áreas de Broca e Wernicke, córtex auditivo, córtex motor da fala, fascículo arqueado, giros angular e supramarginal, caminho do som à fala, leitura e escrita e diferenças entre afasias.",
    caption: "A linguagem não mora em um único ponto: compreender e produzir dependem de redes temporais, frontais, motoras e de associação.",
    layers: [
      ["Compreensão","Sons são discriminados, associados a palavras e integrados ao significado e ao contexto."],
      ["Planejamento e produção","Redes frontais selecionam palavras, organizam sintaxe e programam movimentos da fala."],
      ["Monitoramento e aprendizagem","Feedback auditivo corrige a produção; leitura e escrita recrutam redes culturais aprendidas."]
    ],
    clarify: "Linguagem é um sistema de símbolos; fala é uma forma de expressão. Compreender e produzir usam redes parcialmente diferentes, e leitura é aprendida."
  },
  clinica: {
    title: "Neurociência clínica",
    lead: "Relacione lesões e disfunções a circuitos alterados, funções prejudicadas, sintomas e investigação clínica.",
    thumb: "./assets/visuals/module-14-clinical-neuroscience-thumb.webp",
    src: "./assets/visuals/module-14-clinical-neuroscience.webp",
    alt: "Infográfico clínico com cérebro e exemplos de AVC, epilepsia, Alzheimer e Parkinson, caminho de lesão a sintoma, redes de linguagem, memória, movimento, sensação e emoção, além das etapas de avaliação clínica.",
    caption: "Doença neurológica altera circuitos de maneiras diferentes; sintomas ganham sentido quando ligados à função e à rede afetada.",
    layers: [
      ["Mecanismo da alteração","Processos vasculares, elétricos ou degenerativos perturbam neurônios e conexões."],
      ["Função e sintoma","O circuito alterado processa informação de modo lento, ruidoso ou insuficiente."],
      ["Integração clínica","História, exame, imagem, EEG e testes cognitivos são combinados para sustentar conclusões."]
    ],
    clarify: "Sintoma não é diagnóstico; lesão estrutural e disfunção funcional não são equivalentes; evolução progressiva difere de início súbito."
  },
  farmacologia: {
    title: "Neurofarmacologia",
    lead: "Veja onde moléculas podem alterar liberação, receptores, recaptação, degradação e adaptação das sinapses.",
    thumb: "./assets/visuals/module-15-neuropharmacology-thumb.webp",
    src: "./assets/visuals/module-15-neuropharmacology.webp",
    alt: "Infográfico de neurofarmacologia mostrando uma sinapse e pontos de ação de agonistas, antagonistas, inibidores de recaptação, inibidores enzimáticos e moduladores alostéricos, além da jornada da droga e exemplos de cafeína, nicotina, benzodiazepínicos e ISRS.",
    caption: "A droga liga-se a um alvo molecular; a mudança sináptica altera circuitos e, por fim, comportamento ou estado mental.",
    layers: [
      ["Alvo molecular","Receptores, transportadores, canais e enzimas oferecem pontos específicos de ação."],
      ["Mudança da transmissão","A droga pode aumentar, reduzir, prolongar ou modular o efeito de neurotransmissores."],
      ["Adaptação do sistema","Dose, tempo e repetição induzem respostas imediatas e mudanças graduais nos circuitos."]
    ],
    clarify: "Agonista ativa e antagonista bloqueia; efeito agudo difere de adaptação crônica; dependência física não é igual a uso compulsivo."
  },
  metodos: {
    title: "Métodos em neurociência",
    lead: "Compare as perguntas, escalas, forças e limites dos métodos usados para observar e testar o cérebro.",
    thumb: "./assets/visuals/module-16-methods-thumb.webp",
    src: "./assets/visuals/module-16-methods.webp",
    alt: "Infográfico comparando EEG, fMRI, PET, estudos de lesão, TMS, registro eletrofisiológico e experimentos comportamentais, com matrizes de resolução temporal e espacial, invasividade, causalidade e etapas da investigação científica.",
    caption: "Cada método enxerga uma parte diferente do problema; evidências mais fortes surgem quando resultados independentes convergem.",
    layers: [
      ["Escolha pela pergunta","Tempo, localização, química, causalidade e comportamento exigem métodos diferentes."],
      ["Dados e inferência","Resolução, invasividade e natureza direta ou indireta do sinal limitam o que pode ser concluído."],
      ["Convergência","Combinar métodos reduz ambiguidades e transforma resultados em conhecimento revisável."]
    ],
    clarify: "Correlação não prova causalidade; sinais hemodinâmicos ou químicos não são disparos diretos; uma imagem impressionante não substitui uma explicação testável."
  },
  memoria: {
    title: "Do episódio à lembrança que se sustenta sozinha",
    lead: "Uma visão única para relacionar os dois sistemas de memória, a transferência para o córtex e a janela que a evocação abre.",
    thumb: "./assets/visuals/module-17-memory-systems-thumb.webp",
    src: "./assets/visuals/module-17-memory-systems.webp",
    alt: "Infográfico vertical escuro em três faixas. Na primeira, dois quadros lado a lado: à esquerda a memória declarativa, com um hipocampo desenhado em verde luminoso e a lista grava em poucas exposições, flexível, dá para contar em palavras; à direita a memória procedimental, com o estriado que aprende por reforço e o cerebelo que corrige um modelo interno por erro, e a frase é o cerebelo que sustenta desenhar no espelho, não o estriado. Abaixo, uma caixa sobre a cirurgia de H.M. Na segunda faixa, o hipocampo ligado a um córtex por três setas curvas de reativação, e uma barra horizontal que mostra a dependência do hipocampo caindo do recente para o antigo, com uma caixa de ressalva sobre a disputa. Na terceira, cinco caixas em sequência: lembrança estável, evocar, instável com janela aberta, regravar, estável de novo e talvez diferente; e duas caixas explicando quando a janela não abre e o que isso não quer dizer.",
    caption: "A memória não é um arquivo único: são sistemas que aprendem por regras diferentes, e a lembrança antiga depende menos do hipocampo do que a de ontem. O quanto ela se transforma no caminho é o que está em disputa.",
    layers: [["Dois sistemas, não um em graus","O hipocampo grava o episódio em poucas exposições. Do outro lado, o estriado gruda resposta em estímulo por reforço, e o cerebelo corrige um modelo interno por erro — é ele que sustenta desenhar no espelho. Uma lesão pode alcançar um lado e não o outro."],["A transferência","Durante o sono e o repouso, o hipocampo reativa a sequência. No modelo padrão o córtex acumula um ajuste a cada repetição até sustentar a lembrança sozinho — a reativação é medida, o acúmulo é o modelo."],["A janela da evocação","Lembrar pode devolver o traço a um estado instável, que precisa ser regravado — mas a janela exige surpresa e nem sempre abre. O experimento que a define é em ratos, e as tentativas humanas replicam mal."]],
    clarify: "São três coisas, não duas. Consolidação sináptica é a estabilização de horas logo após o episódio; consolidação sistêmica é a mudança de dependência ao longo de anos, que é o assunto da aula 2; e reconsolidação é a reestabilização depois de uma evocação."
  },
  ritmos: {
    title: "Do laço ao encaixe: como o ritmo vira endereço",
    lead: "Uma visão única para relacionar o laço que produz a oscilação, o gama encaixado no theta e os três ritmos aninhados do sono.",
    thumb: "./assets/visuals/module-18-rhythms-oscillations-thumb.svg",
    src: "./assets/visuals/module-18-rhythms-oscillations.svg",
    alt: "Infográfico vertical em três faixas. Na primeira, uma célula piramidal e um interneurônio PV ligados por duas setas, uma que excita e outra que cala, ao lado de um quadro que explica que o período do ciclo é alguns múltiplos do tempo de decaimento da inibição. Na segunda, uma onda theta lenta com duas salvas de gama em fases diferentes, uma em cada cor. Na terceira, uma onda lenta com um fuso encaixado na fase ativa e um ripple mais rápido dentro do fuso.",
    caption: "A oscilação não é enfeite do circuito: ela cria janelas curtas, e é a fase dessas janelas que decide quem consegue alcançar quem.",
    layers: [["O laço","As piramidais excitam os interneurônios, que as calam. A inibição dura e decai, e o período do ciclo é alguns múltiplos desse tempo."],["Um ritmo dentro do outro","O gama irrompe em fases determinadas do theta — e não numa só. Qual fase identifica de onde veio a entrada, num achado de roedor que não se repetiu no macaco."],["O encaixe do sono","Onda lenta, fuso e ripple aninhados. Induzir o fuso em fase melhora a consolidação; fora de fase, não."]],
    clarify: "A frequência não é o inverso do tempo de decaimento da inibição: o período do ciclo é alguns múltiplos dele. A inibição não precisa só começar a decair — precisa cair abaixo do nível que ainda segura as piramidais, e uma exponencial leva vários múltiplos de τ para chegar lá. É o mesmo motivo pelo qual uma rede mais excitada cruza esse nível antes, e oscila mais rápido."
  }
};

function renderIntegrated(m){
  const host=document.getElementById('md-integrated');
  const tab=document.getElementById('vis-tab-integrated');
  if(!host||!tab) return;
  const v=INTEGRATED_VISUALS[m.id];
  tab.textContent='Visão integrada';
  tab.setAttribute('aria-expanded','false');
  tab.setAttribute('aria-label','Abrir visão integrada');
  if(!v){ host.innerHTML=''; host.hidden=true; tab.hidden=true; return; }
  tab.hidden=false;
  host.style.setProperty('--mc',m.color);
  host.innerHTML=`
    <div class="integrated-head">
      <div class="integrated-k">Visão integrada · anatomia + mecanismo</div>
      <h3>${escapeFunctional(v.title)}</h3>
      <p>${escapeFunctional(v.lead)}</p>
    </div>
    <figure class="integrated-figure">
      <button type="button" class="integrated-imgbtn" onclick="openIntegratedZoom(this)" aria-label="Ampliar a visão integrada: ${escapeFunctional(v.title)}">
        <img src="${v.thumb}" alt="${escapeFunctional(v.alt)}" width="560" height="995" loading="lazy" decoding="async">
        <span class="integrated-zoomlabel">Ampliar para explorar ↗</span>
      </button>
    </figure>
    <div class="integrated-caption">${escapeFunctional(v.caption)}</div>
    <div class="integrated-layers">${v.layers.map((x,i)=>`<div class="integrated-layer"><span class="n">${i+1}</span><div><b>${escapeFunctional(x[0])}</b><span>${escapeFunctional(x[1])}</span></div></div>`).join('')}</div>
    <div class="integrated-clarify"><b>Não confundir:</b> ${escapeFunctional(v.clarify)}</div>`;
}

function openIntegratedZoom(opener){
  const m=(typeof MODULES!=='undefined'&&MODULES[currentModule])?MODULES[currentModule]:null;
  const v=m?INTEGRATED_VISUALS[m.id]:null;
  if(!v) return;
  openZoomMarkup(v.title,`<img src="${v.src}" alt="${escapeFunctional(v.alt)}" width="941" height="1672" decoding="async">`,opener);
}

function renderFunctional(m){
  pauseFunctional();
  _funcModuleId = m.id;
  _funcStep = 0;
  const host = document.getElementById('md-functional');
  if(!host) return;
  const d = functionalData(m);
  const tab = document.getElementById('vis-tab-functional');
  if(!d || !d.chain.length){
    host.innerHTML=''; host.hidden=true;
    if(tab) tab.hidden=true;
    return;
  }
  if(tab) tab.hidden=false;
  host.style.setProperty('--mc',m.color);
  const steps=d.chain.map((text,i)=>`<button type="button" class="func-step${i===d.hinge?' hinge':''}" data-fstep="${i}" onclick="selectFunctionalStep(${i})" aria-label="Passo ${i+1} de ${d.chain.length}: ${escapeFunctional(text)}"><span class="func-num">${i+1}</span><span class="func-label">${escapeFunctional(text)}</span><span class="func-phase">${funcPhase(i,d.chain.length)}${i===d.hinge?' · virada':''}</span></button>`).join('');
  const wi=(d.ifs&&d.ifs[0])?`<details class="func-whatif"><summary>${escapeFunctional(d.ifs[0][0])}</summary><p>${escapeFunctional(d.ifs[0][1])}</p></details>`:'';
  host.innerHTML=`
    <div class="func-head">
      <div><div class="func-k">Mecanismo em movimento</div><h3>Da causa ao efeito</h3><p class="func-q">${escapeFunctional(d.lead)}</p></div>
      <span class="func-count" id="func-count">1 / ${d.chain.length}</span>
    </div>
    <div class="func-track" id="func-track" aria-label="Cadeia causal do módulo">${steps}</div>
    <div class="func-detail">
      <div><div class="func-detail-k" id="func-detail-k"></div><h4 id="func-detail-title"></h4><p class="func-context" id="func-detail-context"></p></div>
      <div class="func-controls" aria-label="Controles do mecanismo">
        <button type="button" class="func-btn" id="func-prev" onclick="stepFunctional(-1)" aria-label="Passo anterior">←</button>
        <button type="button" class="func-btn play" id="func-play" onclick="toggleFunctionalPlay()" aria-label="Reproduzir mecanismo">▶ reproduzir</button>
        <button type="button" class="func-btn" id="func-next" onclick="stepFunctional(1)" aria-label="Próximo passo">→</button>
      </div>
    </div>
    ${wi}
    <div class="func-live" id="func-live" aria-live="polite"></div>`;
  selectFunctionalStep(0,false);
}

function escapeFunctional(v){
  return String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function selectFunctionalStep(i,focus=true){
  if(_funcModuleId==null) return;
  const mi=(typeof modIndex==='function')?modIndex(_funcModuleId):-1;
  const m=(mi>=0&&typeof MODULES!=='undefined')?MODULES[mi]:null;
  const d=m?functionalData(m):null;
  if(!d) return;
  _funcStep=Math.max(0,Math.min(d.chain.length-1,i));
  const host=document.getElementById('md-functional'); if(!host) return;
  host.querySelectorAll('.func-step').forEach((b,n)=>{
    const on=n===_funcStep;
    b.classList.toggle('active',on);
    b.setAttribute('aria-current',on?'step':'false');
    if(on){
      try{
        const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Chamadas programáticas (focus=false), como o salto vindo do modal,
        // precisam posicionar a etapa antes de devolver o controle à interface.
        b.scrollIntoView({behavior:(!focus||reduced)?'auto':'smooth',block:'center'});
      }catch(e){}
    }
  });
  const current=d.chain[_funcStep];
  const prev=_funcStep>0?d.chain[_funcStep-1]:null;
  const next=_funcStep<d.chain.length-1?d.chain[_funcStep+1]:null;
  const phase=funcPhase(_funcStep,d.chain.length);
  document.getElementById('func-count').textContent=(_funcStep+1)+' / '+d.chain.length;
  document.getElementById('func-detail-k').textContent=phase+( _funcStep===d.hinge?' · ponto de virada':'' );
  document.getElementById('func-detail-title').textContent=current;
  document.getElementById('func-detail-context').textContent=(prev?'Antes: '+prev+' ':'Início da cadeia. ')+(next?'Depois: '+next:'Este é o resultado final da cadeia.');
  document.getElementById('func-prev').disabled=_funcStep===0;
  document.getElementById('func-next').disabled=_funcStep===d.chain.length-1;
  const live=document.getElementById('func-live'); if(live) live.textContent='Passo '+(_funcStep+1)+': '+current;
  if(focus){ const b=host.querySelector('.func-step.active'); if(b) try{b.focus({preventScroll:true});}catch(e){} }
}

function stepFunctional(delta){
  pauseFunctional();
  selectFunctionalStep(_funcStep+delta);
}

function toggleFunctionalPlay(){
  if(_funcTimer){ pauseFunctional(); return; }
  const mi=(typeof modIndex==='function')?modIndex(_funcModuleId):-1;
  const m=(mi>=0&&typeof MODULES!=='undefined')?MODULES[mi]:null;
  const d=m?functionalData(m):null; if(!d) return;
  if(_funcStep>=d.chain.length-1) selectFunctionalStep(0,false);
  const btn=document.getElementById('func-play');
  if(btn){btn.textContent='Ⅱ pausar';btn.setAttribute('aria-label','Pausar mecanismo');}
  _funcTimer=setInterval(()=>{
    if(_funcStep>=d.chain.length-1){ pauseFunctional(); return; }
    selectFunctionalStep(_funcStep+1,false);
  },1900);
}

function pauseFunctional(){
  if(_funcTimer){clearInterval(_funcTimer);_funcTimer=null;}
  const btn=document.getElementById('func-play');
  if(btn){btn.textContent='▶ reproduzir';btn.setAttribute('aria-label','Reproduzir mecanismo');}
}

function setVisualMode(mode){
  const panels={
    anatomy:document.getElementById('md-anat'),
    functional:document.getElementById('md-functional'),
    integrated:document.getElementById('md-integrated')
  };
  const tabs={
    anatomy:document.getElementById('vis-tab-anatomy'),
    functional:document.getElementById('vis-tab-functional'),
    integrated:document.getElementById('vis-tab-integrated')
  };
  if(Object.values(panels).some(x=>!x)||Object.values(tabs).some(x=>!x)) return;
  let chosen=(mode==='functional'||mode==='integrated')?mode:'anatomy';
  if(tabs[chosen].hidden) chosen='anatomy';
  Object.keys(panels).forEach(key=>{
    const active=key===chosen;
    panels[key].hidden=!active;
    tabs[key].classList.toggle('active',active);
    tabs[key].setAttribute('aria-selected',active?'true':'false');
  });
  const integratedOpen=chosen==='integrated';
  tabs.integrated.setAttribute('aria-expanded',integratedOpen?'true':'false');
  tabs.integrated.setAttribute('aria-label',integratedOpen?'Fechar visão integrada':'Abrir visão integrada');
  tabs.integrated.textContent=integratedOpen?'Fechar visão integrada':'Visão integrada';
  if(chosen!=='functional') pauseFunctional();
}

function toggleIntegratedVisual(){
  const tab=document.getElementById('vis-tab-integrated');
  const panel=document.getElementById('md-integrated');
  if(!tab||!panel||tab.hidden) return;
  const isOpen=!panel.hidden && tab.getAttribute('aria-selected')==='true';
  setVisualMode(isOpen?'anatomy':'integrated');
  if(!isOpen){
    requestAnimationFrame(()=>{
      try{ panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'}); }catch(e){}
    });
  }
}

window.addEventListener('beforeunload',pauseFunctional);
