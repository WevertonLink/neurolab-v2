/* =====================================================================
   NEUROLAB — dados
   ===================================================================== */
const MODULES = [
  {
    id:'neuronio', n:'01', title:'O Neurônio e o Sinal', color:'var(--cyan)', hex:'#22d3ee',
    tag:'A unidade física do pensamento',
    intro:'Antes de qualquer ideia, humor ou memória, existe uma célula que dispara. Este módulo é o substrato: como um neurônio gera um sinal, como fala com outro, e por que moléculas invisíveis governam seu estado mental inteiro.',
    lessons:[
      {t:'A célula que pensa',
       b:`<p>O cérebro tem cerca de <strong>86 bilhões de neurônios</strong>, e o que importa não é a célula sozinha — é a rede. Cada neurônio tem três partes funcionais: os <span class="term">dendritos</span>, ramos que recebem sinais de milhares de outras células; o <span class="term">corpo celular</span>, que integra tudo; e o <span class="term">axônio</span>, um cabo único que leva o sinal adiante até os terminais.</p><p>Um único neurônio pode receber entradas de mais de <strong>10 mil outros</strong> ao mesmo tempo. Pensar, sentir e lembrar não moram em nenhuma célula específica — emergem do padrão de disparo de conjuntos inteiros conectados.</p>`},
      {t:'O potencial de ação',
       b:`<p>Em repouso, o interior do neurônio é negativo em relação ao exterior — cerca de <strong>−70 milivolts</strong>, mantido por um gradiente de íons de sódio e potássio. Quando as entradas somadas empurram a voltagem até um <span class="term">limiar</span> (por volta de −55 mV), canais de sódio se abrem de golpe: o sódio entra, a voltagem dispara para o positivo. É a <span class="term">despolarização</span>. Logo depois, o potássio sai e restaura a negatividade.</p><p>O ponto-chave: o potencial de ação é <strong>tudo-ou-nada</strong>. Atingido o limiar, ele dispara sempre com a mesma intensidade — um estímulo mais forte não gera um sinal "maior", gera <strong>disparos mais frequentes</strong>. A intensidade é codificada em frequência, não em amplitude.</p>`},
      {t:'A sinapse',
       b:`<p>Onde um neurônio encontra o outro há uma fenda minúscula: a <span class="term">sinapse</span>. Quando o sinal chega ao terminal, vesículas liberam <span class="term">neurotransmissores</span> nessa fenda, que se ligam a receptores da célula seguinte. É comunicação química, não um fio contínuo.</p><p>Alguns transmissores <strong>excitam</strong> (o glutamato, principal excitatório, aproxima a célula do limiar); outros <strong>inibem</strong> (o GABA, principal inibitório, afasta dele). Cada neurônio soma milhares dessas entradas excitatórias e inibitórias em tempo real e "decide" disparar ou não. É computação analógica, viva, acontecendo bilhões de vezes por segundo.</p>`},
      {t:'Neurotransmissores e neuromoduladores',
       b:`<p>Além dos transmissores rápidos, existem os <span class="term">neuromoduladores</span> — como <strong>dopamina, serotonina, noradrenalina e acetilcolina</strong>. Eles não carregam uma mensagem ponto-a-ponto; ajustam o "tom" de circuitos inteiros de uma vez.</p><p>É por isso que uma única substância afeta algo tão amplo quanto humor, foco ou motivação: ela não muda uma sinapse, muda o modo de operação de regiões inteiras do cérebro. Entender isso é entender por que seu <strong>estado químico</strong> molda sua experiência tanto quanto o conteúdo dos seus pensamentos.</p>`}
    ],
    quiz:[
      {q:'Qual estrutura do neurônio é responsável por receber sinais de outras células?',
       o:['O axônio','Os dendritos','A bainha de mielina','A fenda sináptica'], c:1, l:0,
       er:'Isso. Os <strong>dendritos</strong> são os ramos receptores; o axônio é quem envia o sinal adiante. Um só neurônio pode ter milhares desses pontos de entrada.',
       ew:'Na verdade são os <strong>dendritos</strong> que recebem. O axônio faz o oposto — leva o sinal para fora, em direção aos terminais e às próximas células.'},
      {q:'O potencial de ação é "tudo-ou-nada". Como o cérebro codifica, então, a intensidade de um estímulo forte?',
       o:['Gerando um potencial de ação de maior amplitude','Aumentando a frequência dos disparos','Tornando o sinal mais lento','Ativando a mielina'], c:1, l:1,
       er:'Exato. A amplitude é sempre a mesma; o que muda é a <strong>frequência</strong>. Estímulo mais forte = disparos mais rápidos e frequentes, não um sinal "maior".',
       ew:'A amplitude não muda — é sempre a mesma, por isso "tudo-ou-nada". A intensidade é codificada pela <strong>frequência dos disparos</strong>: quanto mais forte o estímulo, mais rápido o neurônio dispara.'},
      {q:'Qual é a diferença funcional entre glutamato e GABA?',
       o:['Glutamato inibe, GABA excita','Ambos excitam, mas em regiões diferentes','Glutamato excita, GABA inibe','Nenhum afeta o disparo, só o humor'], c:2, l:2,
       er:'Correto. <strong>Glutamato</strong> é o principal excitatório (aproxima do limiar) e <strong>GABA</strong> o principal inibitório (afasta dele). O equilíbrio entre os dois define se a célula dispara.',
       ew:'É o contrário do que a alternativa diz. <strong>Glutamato excita</strong> (empurra a célula em direção ao disparo) e <strong>GABA inibe</strong> (segura o disparo). Esse equilíbrio é a base do controle cerebral.'},
      {q:'Por que um único neuromodulador, como a dopamina, consegue afetar algo tão amplo quanto motivação e humor?',
       o:['Porque viaja bem mais rápido pelo axônio do que os demais sinais químicos','Porque modula circuitos inteiros de uma vez, não uma só sinapse','Porque é liberada em quantidade muito maior que o glutamato na fenda','Porque age diretamente no DNA de cada neurônio que ela alcança'], c:1, l:3,
       er:'Isso mesmo. Neuromoduladores ajustam o <strong>modo de operação de regiões inteiras</strong> — não entregam uma mensagem pontual. Daí o efeito amplo sobre estados mentais.',
       ew:'A razão é o alcance: neuromoduladores <strong>ajustam circuitos inteiros</strong> ao mesmo tempo, em vez de transmitir uma mensagem ponto-a-ponto. Por isso um só ajuste químico muda humor, foco e motivação juntos.'}
    ]
  },
  {
    id:'plasticidade', n:'02', title:'Plasticidade e Memória', color:'var(--violet)', hex:'#a78bfa',
    tag:'Como o cérebro se reescreve',
    intro:'O cérebro não é fixo. A cada experiência ele reconfigura suas próprias conexões — e é exatamente isso que chamamos de aprender e lembrar. Aqui entram Hebb, a potenciação de longo prazo e o modelo de Kandel para como uma memória se torna permanente.',
    lessons:[
      {t:'Um cérebro que se reescreve',
       b:`<p><span class="term">Neuroplasticidade</span> é a capacidade do cérebro de mudar sua estrutura em resposta à experiência — e isso não acontece só na infância. Ao longo de toda a vida, sinapses se fortalecem, enfraquecem, surgem e desaparecem conforme o que você faz e repete.</p><p>Isso muda a forma de pensar sobre você mesmo: hábitos, habilidades e memórias não são "quem você é" de forma congelada. São <strong>padrões físicos de conexão</strong> que a repetição esculpe — e que a repetição pode reesculpir.</p>`},
      {t:'"Neurônios que disparam juntos, conectam-se juntos"',
       b:`<p>A regra de <span class="term">Hebb</span> resume o aprendizado no nível celular: quando um neurônio ajuda a disparar outro repetidamente, a conexão entre eles se fortalece. O mecanismo real chama-se <span class="term">potenciação de longo prazo</span> (LTP): o uso repetido de uma sinapse deixa ela mais eficiente e mais fácil de ativar depois.</p><p>Na LTP, receptores <strong>NMDA</strong> detectam atividade coincidente, o cálcio entra na célula e novos receptores são inseridos na sinapse, ampliando o sinal. O oposto também existe — a <strong>LTD</strong> (depressão de longo prazo) enfraquece o que deixa de ser usado. Fortalecer o relevante e podar o irrelevante: é assim que a rede aprende.</p>`},
      {t:'O modelo de Kandel',
       b:`<p>Eric Kandel ganhou o Nobel mostrando que memória de curto e de longo prazo são <strong>bioquimicamente diferentes</strong>. A <span class="term">memória de curto prazo</span> depende de modificar proteínas que já existem — muda temporariamente a força de sinapses, sem construir nada novo.</p><p>Já a <span class="term">memória de longo prazo</span> exige <strong>expressão gênica</strong>: a célula ativa genes (via proteínas como a CREB), sintetiza <strong>novas proteínas</strong> e faz <strong>crescer novas conexões sinápticas</strong>. É a diferença entre ajustar o que existe e construir estrutura permanente. Uma memória duradoura é, literalmente, cérebro novo.</p>`},
      {t:'Consolidação: por que o espaçamento vence',
       b:`<p>Uma memória recém-formada é frágil. Na formação inicial de muitas memórias declarativas, o <span class="term">hipocampo</span> ajuda a ligar elementos que permanecem distribuídos pelo cérebro. Ao longo de reativações posteriores, a participação do hipocampo e das redes corticais se <strong>reorganiza</strong> — processo chamado <span class="term">consolidação sistêmica</span>. Isso não é uma simples transferência de arquivo, e diferentes tipos de memória seguem trajetórias diferentes.</p><p>Daí uma consequência prática importante: <strong>repetição espaçada costuma superar repetição massificada</strong>. Sessões separadas criam novas oportunidades de recuperação e estabilização, em vez de concentrar todas as tentativas no mesmo estado. Revisar amanhã e depois tende a produzir aprendizagem mais duradoura do que reler muitas vezes hoje. O sono, aprofundado no módulo 08, participa dessas reativações e da reorganização do traço.</p>`}
    ],
    quiz:[
      {q:'O que a regra de Hebb descreve?',
       o:['Que o cérebro para de mudar depois do fim da infância','Que neurônios que disparam juntos fortalecem sua conexão','Que cada memória fica guardada em uma única célula do cérebro','Que a inibição é sempre mais forte do que a excitação'], c:1, l:1,
       er:'Isso. "Disparam juntos, conectam-se juntos" — a atividade coincidente e repetida <strong>fortalece a sinapse</strong>. É o princípio celular do aprendizado.',
       ew:'A regra de Hebb diz que <strong>neurônios que disparam juntos se conectam mais fortemente</strong>. Não fala de célula única nem de fim da plasticidade — é sobre como a conexão entre células se fortalece com o uso.'},
      {q:'No modelo de Kandel, o que distingue a memória de LONGO prazo da de curto prazo?',
       o:['Ela usa neurotransmissores completamente diferentes dos de curto prazo','Ela exige síntese de novas proteínas e crescimento de novas conexões','Ela dura apenas alguns segundos e depois desaparece por completo','Ela é a única que não envolve o hipocampo em nenhum momento'], c:1, l:2,
       er:'Exato. Curto prazo modifica proteínas já existentes; <strong>longo prazo requer expressão gênica, novas proteínas e novas sinapses</strong>. Memória duradoura é estrutura física nova.',
       ew:'A marca do longo prazo é justamente <strong>construir estrutura nova</strong>: ativar genes, sintetizar novas proteínas e formar novas conexões. O curto prazo apenas ajusta, temporariamente, proteínas que já existem.'},
      {q:'Por que a repetição espaçada consolida melhor que estudar tudo de uma vez?',
       o:['Porque cansa menos a vista e permite estudar por muito mais horas seguidas','Porque dá ao cérebro janelas para consolidar cada traço entre as sessões','Porque ativa a LTD em vez da LTP, o que fixa melhor a informação','Porque evita o uso do hipocampo, poupando-o para outras tarefas'], c:1, l:3,
       er:'Correto. A consolidação leva tempo. Espaçar as revisões respeita essas <strong>janelas de estabilização</strong>, reforçando o traço a cada retomada, em vez de saturá-lo de uma vez.',
       ew:'O motivo é a consolidação: ela ocorre <strong>ao longo do tempo</strong>. Espaçar dá ao cérebro as janelas para estabilizar e reforçar cada memória entre as sessões — algo que a maratona de uma noite não permite.'},
      {q:'Qual é o papel do hipocampo na formação de memórias declarativas?',
       o:['Ele guarda permanentemente todas as memórias em um único local','Ele ajuda a ligar elementos da memória nova e participa de sua reorganização com redes corticais','Ele apenas controla o sono e não participa da memória declarativa','Ele produz a dopamina necessária para que a memória seja gravada'], c:1, l:3,
       er:'Isso. O hipocampo ajuda a <strong>ligar elementos distribuídos</strong> da experiência. Com reativações posteriores, sua relação com redes corticais se reorganiza — uma parte da consolidação sistêmica.',
       ew:'O hipocampo não é um depósito único nem apenas uma ponte temporária. Ele participa da ligação inicial e da recuperação de memórias; com o tempo, hipocampo e redes corticais reorganizam suas contribuições.'}
    ]
  },
  {
    id:'recompensa', n:'03', title:'Recompensa e Motivação', color:'var(--amber)', hex:'#fbbf24',
    tag:'Por que você continua (ou desiste)',
    intro:'Este é o módulo que explica por que esta própria ferramenta funciona. A dopamina não é o que você imagina, o "erro de previsão" é o motor secreto do aprendizado, e o motivo de 1% de progresso te manter engajado está escrito na sua química.',
    lessons:[
      {t:'O sistema de recompensa',
       b:`<p>O circuito de recompensa vai da <span class="term">área tegmental ventral</span> ao <span class="term">núcleo accumbens</span> e ao córtex, usando a <strong>dopamina</strong> como moeda. E aqui mora um dos maiores mal-entendidos da neurociência popular: dopamina <strong>não é a molécula do prazer</strong>.</p><p>Ela é a molécula do <strong>"querer"</strong> — da motivação, da busca, da antecipação. O prazer de fato ("gostar") envolve outros sistemas. A dopamina é o que te faz <strong>ir atrás</strong> de algo e persistir. Confundir os dois leva a entender tudo errado sobre motivação.</p>`},
      {t:'O erro de previsão de recompensa',
       b:`<p>Wolfram Schultz descobriu algo elegante: neurônios dopaminérgicos não sinalizam recompensa em si — sinalizam <span class="term">surpresa</span>. Eles disparam forte quando a recompensa é <strong>melhor que o esperado</strong>, ficam quietos quando ela é exatamente esperada, e <strong>caem abaixo do normal</strong> quando uma recompensa esperada não vem.</p><p>Isso é literalmente um <strong>sinal de aprendizado</strong>: "atualize sua previsão". Com o tempo, o disparo migra da recompensa para o <strong>sinal que a prevê</strong>. É por isso que a antecipação é tão poderosa — a expectativa de progresso já dispara o sistema, antes mesmo da recompensa chegar.</p>`},
      {t:'Por que 1% de progresso te mantém engajado',
       b:`<p>Aqui está a ligação direta com o que você já percebeu sobre si mesmo. Um progresso <strong>pequeno, porém visível</strong>, funciona como uma recompensa antecipada: cada avanço mensurável tende a funcionar como um pequeno sinal de recompensa que <strong>reforça o comportamento de continuar</strong>.</p><p>Metas distantes e vagas quase não produzem esse sinal — não há como o cérebro "prever recompensa" no vazio. Metas <strong>granulares</strong> produzem sinal constante. Não é falta de disciplina quando uma meta grande demais desmotiva; é ausência de sinal. A solução neurológica é sempre a mesma: <strong>fatiar o progresso em pedaços pequenos e visíveis</strong> — exatamente o que barras, XP e domínio fazem aqui.</p>`},
      {t:'O loop do hábito',
       b:`<p>Comportamentos repetidos migram do controle consciente (córtex pré-frontal) para o <span class="term">estriado</span>, nos gânglios da base, onde viram automáticos. A estrutura é sempre a mesma: <strong>gatilho → rotina → recompensa</strong>.</p><p>O gatilho é o contexto que dispara o comportamento; a rotina é a ação; a recompensa é o que faz o cérebro querer repetir. Para construir um hábito, a peça crítica é a <strong>recompensa imediata e consistente</strong> — quanto mais próxima da ação, mais forte o aprendizado. É por isso que feedback instantâneo (como saber na hora se acertou) constrói hábito muito melhor que feedback adiado.</p>`}
    ],
    quiz:[
      {q:'Qual é a função mais precisa da dopamina no sistema de recompensa?',
       o:['Produzir a sensação de prazer em si, no momento do consumo','Sinalizar motivação, busca e antecipação ("querer")','Armazenar as memórias de longo prazo no hipocampo','Inibir o córtex pré-frontal durante a tomada de decisão'], c:1, l:0,
       er:'Isso. Dopamina é o "querer" — <strong>motivação e antecipação</strong>, não o prazer em si (que envolve outros sistemas). É o que te faz ir atrás e persistir.',
       ew:'É o mal-entendido mais comum. Dopamina é sobretudo <strong>motivação e antecipação</strong> — o "querer", não o "gostar". O prazer propriamente dito depende de outros sistemas.'},
      {q:'Segundo Schultz, quando os neurônios de dopamina disparam com MAIS força?',
       o:['Quando a recompensa é exatamente a que era esperada','Quando a recompensa é melhor do que o esperado','Quando não há recompensa nenhuma no ambiente','Sempre que aparece qualquer estímulo novo'], c:1, l:1,
       er:'Exato. Eles codificam <strong>surpresa positiva</strong> — recompensa melhor que o previsto. Se é exatamente esperada, quase não disparam; se falha, caem abaixo do basal.',
       ew:'Eles disparam mais forte diante de <strong>surpresa positiva</strong> — recompensa melhor que o esperado. Quando é exatamente prevista, o disparo é mínimo; é um sinal de "atualize sua previsão", não de recompensa em si.'},
      {q:'Do ponto de vista neurológico, por que fatiar uma meta grande em passos pequenos e visíveis aumenta a motivação?',
       o:['Porque engana o cérebro, fazendo-o esquecer completamente o tamanho real da meta','Porque cada avanço visível gera um micro-sinal de recompensa que reforça o continuar','Porque reduz a produção de dopamina e com isso diminui a ansiedade da espera','Porque desativa o loop do hábito e libera o pré-frontal para agir'], c:1, l:2,
       er:'Correto. Progresso granular = <strong>sinal de recompensa frequente</strong>. Metas vagas e distantes não dão ao cérebro como "prever recompensa", então quase não motivam.',
       ew:'A razão é o sinal: cada progresso visível dispara um <strong>micro-sinal dopaminérgico de recompensa antecipada</strong> que reforça o comportamento. Metas grandes e distantes não produzem esse sinal — por isso desmotivam, mesmo sem falta de disciplina.'},
      {q:'Quais são os três componentes do loop do hábito?',
       o:['Estímulo, inibição, repouso','Gatilho, rotina, recompensa','Sódio, potássio, cálcio','Codificar, consolidar, recuperar'], c:1, l:3,
       er:'Isso mesmo. <strong>Gatilho → rotina → recompensa</strong>. E a recompensa imediata e consistente é o que fixa o hábito — feedback instantâneo constrói hábito melhor que o adiado.',
       ew:'O loop é <strong>gatilho → rotina → recompensa</strong>. O gatilho dispara, a rotina é a ação, e a recompensa (quanto mais imediata, melhor) é o que faz o cérebro querer repetir.'}
    ]
  },
  {
    id:'atencao', n:'05', title:'Atenção e Foco', color:'var(--green)', hex:'#34d399',
    tag:'Seleção, manutenção e controle sob interferência',
    intro:'Você não consegue aprofundar tudo ao mesmo tempo — e isso é uma característica do sistema, não um defeito. Atenção, memória de trabalho e controle executivo emergem de redes distribuídas que selecionam informações, mantêm metas e resolvem interferências. Sono, estresse, motivação e carga da tarefa alteram esse equilíbrio.',
    lessons:[
      {t:'A atenção seleciona sob capacidade limitada',
       b:`<p>O ambiente oferece mais informação do que pode receber processamento aprofundado ao mesmo tempo. A <span class="term">atenção</span> não é um filtro único nem uma bateria: é a priorização dinâmica de sinais, locais, objetos e metas concorrentes. O que é selecionado ganha influência sobre percepção, memória e ação; o restante não desaparece necessariamente, mas tende a competir em desvantagem.</p><p>Michael Posner descreveu componentes que trabalham em conjunto: <strong>alerta</strong> (regular prontidão), <strong>orientação</strong> (priorizar uma fonte ou posição) e <strong>controle executivo</strong> (resolver conflitos conforme a meta). Foco sustentado depende da coordenação entre essas operações e outras redes, não de um único centro cerebral.</p>`},
      {t:'A memória de trabalho',
       b:`<p>A <span class="term">memória de trabalho</span> é o espaço mental onde você segura e manipula informação agora — o "bloco de rascunho" do pensamento. No modelo de Baddeley, ela tem um <strong>executivo central</strong> coordenando subsistemas (um para som/linguagem, outro para imagens espaciais).</p><p>E ela é <strong>chocantemente pequena</strong>: estimativas modernas apontam capacidade de cerca de <strong>quatro itens</strong> por vez. Ultrapassar isso degrada o desempenho — não porque você é distraído, mas porque o buffer transbordou. Muito do que parece "falta de foco" é, na verdade, <strong>sobrecarga de memória de trabalho</strong>.</p>`},
      {t:'O pré-frontal dentro de uma rede de controle',
       b:`<p>O <span class="term">córtex pré-frontal</span> participa de redes que mantêm metas e regras, selecionam respostas e influenciam áreas sensoriais e motoras. Ele é importante para o controle executivo, mas não trabalha como um comandante isolado: regiões parietais, cíngulo, gânglios da base, tálamo e sistemas neuromodulatórios também contribuem.</p><p>O desempenho dessas redes varia com <strong>sono, estresse, motivação, duração, interferência e dificuldade da tarefa</strong>. Depois de longos períodos, podem aumentar a sensação de esforço, os lapsos e a atração por alternativas. Isso não exige imaginar um tanque de energia que esvazia nem que o pré-frontal “desliga”; significa que o equilíbrio entre metas e concorrentes ficou menos estável.</p>`},
      {t:'O mito da multitarefa',
       b:`<p>O cérebro tem <strong>enorme dificuldade em executar duas tarefas que exijam controle consciente ao mesmo tempo</strong> — elas disputam os mesmos recursos. (Tarefas já automatizadas, como andar e conversar, escapam disso.) O que parece multitarefa costuma ser <span class="term">alternância rápida</span> entre tarefas — e cada troca cobra um <strong>custo de troca</strong>: tempo e precisão perdidos ao recarregar o contexto mental.</p><p>Fazer duas coisas "ao mesmo tempo" quase sempre significa fazer as duas pior e mais devagar. O foco unitário é mais eficiente por design. Isso é especialmente relevante para o <strong>TDAH</strong>, onde a regulação dopaminérgica e pré-frontal torna ainda mais custoso sustentar uma única linha de atenção — daí a importância de estruturar o ambiente para reduzir a demanda de troca.</p>`}
    ],
    quiz:[
      {q:'Qual é a capacidade aproximada da memória de trabalho, segundo estimativas modernas?',
       o:['Cerca de 4 itens','Cerca de 50 itens','Praticamente ilimitada','Exatamente 1 item'], c:0, l:1,
       er:'Isso. Cerca de <strong>quatro itens</strong> por vez. Passar disso não é distração — é o buffer transbordando. Muito "desfoco" é sobrecarga de memória de trabalho.',
       ew:'É bem menos do que se imagina: cerca de <strong>quatro itens</strong>. Quando você ultrapassa isso, o desempenho cai porque o buffer transbordou — não por falta de esforço.'},
      {q:'Qual é o papel central do córtex pré-frontal na atenção?',
       o:['Produzir a dopamina usada pelo restante do cérebro','Manter objetivos ativos e inibir distrações','Armazenar memórias permanentes de longo prazo','Controlar o batimento cardíaco e a respiração'], c:1, l:2,
       er:'Exato. O pré-frontal ajuda a manter metas e regras e a <strong>enviesar outras redes</strong> em favor da tarefa. Ele coordena, mas não trabalha sozinho nem funciona como uma bateria que simplesmente se esgota.',
       ew:'O pré-frontal participa do <strong>controle executivo</strong>, mantendo metas e modulando respostas concorrentes em conjunto com outras redes. Sono ruim, estresse e interferência podem tornar esse controle menos estável.'},
      {q:'O que a ciência mostra sobre a "multitarefa" cognitiva?',
       o:['O cérebro executa várias tarefas cognitivas em paralelo, sem nenhum custo de troca','É alternância rápida entre tarefas, com um custo de troca a cada mudança','É mais eficiente do que manter o foco em uma tarefa por vez','Só é possível quando as duas tarefas usam o mesmo circuito'], c:1, l:3,
       er:'Correto. Não há paralelismo real — há <strong>alternância com custo de troca</strong>. Cada mudança perde tempo e precisão ao recarregar o contexto mental.',
       ew:'Não existe multitarefa cognitiva real: é <strong>alternância rápida</strong> entre tarefas, e cada troca cobra um <strong>custo</strong> em tempo e precisão. Fazer duas coisas "juntas" costuma significar fazer as duas pior.'},
      {q:'Para que serve a rede de controle executivo descrita por Posner?',
       o:['Para acelerar a entrada no sono profundo à noite','Para resolver conflitos e sustentar a atenção contra distrações','Para produzir as emoções básicas, como o medo, a raiva e a alegria','Para armazenar memórias declarativas por longos períodos'], c:1, l:2,
       er:'Isso mesmo. A rede executiva <strong>resolve conflitos atencionais</strong> e sustenta o foco. Junto com alerta e orientação, forma o sistema de atenção — que não é uma coisa só.',
       ew:'A rede executiva serve para <strong>resolver conflitos e manter a atenção</strong> apesar das distrações. É uma das três redes de Posner, ao lado do alerta e da orientação.'}
    ]
  },
  {
    id:'emocao', n:'06', title:'Emoção, Estresse e Estado', color:'var(--rose)', hex:'#f472b6',
    tag:'Por que o estado importa tanto quanto o esforço',
    intro:'Emoção e cognição não são compartimentos separados — são o mesmo sistema. A amígdala prioriza ameaças, o cortisol molda a memória, e existe um ponto ótimo de ativação além do qual o desempenho despenca. Seu estado mental não é ruído: é parte do cálculo.',
    lessons:[
      {t:'A amígdala e a detecção de ameaça',
       b:`<p>A <span class="term">amígdala</span> participa da avaliação de relevância, aprendizagem emocional e detecção de incerteza ou ameaça. Ela recebe informação por várias rotas e influencia atenção, memória, respostas autonômicas e escolhas; não funciona como um detector único nem apenas como “centro do medo”.</p><p>Em situações intensas, sinais relacionados à ameaça podem ganhar prioridade e estreitar o conjunto de ações consideradas. Isso não significa que a amígdala toma o cérebro ou que a razão desaparece: redes emocionais e de controle continuam interagindo, mas o equilíbrio pode favorecer respostas rápidas e hábitos já preparados.</p>`},
      {t:'O eixo HPA e o cortisol',
       b:`<p>Diante de estresse, ativa-se o <span class="term">eixo HPA</span>: o hipotálamo sinaliza a hipófise, que sinaliza as adrenais, que liberam <strong>cortisol</strong>. O cortisol mobiliza energia, aguça os sentidos e prepara o corpo para agir.</p><p>Em <strong>curto prazo</strong>, isso é adaptativo e até útil — foco e prontidão aumentam. O problema não é o estresse em si; é a <strong>duração</strong>. Uma resposta que deveria ser breve e depois desligar, quando fica cronicamente ligada, começa a cobrar um preço alto do cérebro.</p>`},
      {t:'Agudo vs crônico: a curva em U invertido',
       b:`<p>A relação entre ativação e desempenho tem a forma de um <strong>U invertido</strong> (lei de <span class="term">Yerkes-Dodson</span>): pouca ativação e você fica apático e desfocado; ativação intermediária e você rende no seu melhor; ativação excessiva e o desempenho <strong>despenca</strong>. Existe um ponto ótimo — nem sonolento, nem em pânico.</p><p>Exposição prolongada a estressores pode alterar sono, aprendizagem, memória, controle e regulação corporal. O efeito não é uma corrosão simples nem igual para todos: depende da intensidade, da duração, da previsibilidade, do contexto, da recuperação e de diferenças individuais. Cortisol é parte de um sistema adaptativo; o problema é a regulação permanecer deslocada por tempo demais.</p>`},
      {t:'Estado mental e desempenho',
       b:`<p>A neurociência desfez a velha separação entre "razão" e "emoção": elas estão <strong>entrelaçadas</strong>. Circuitos emocionais influenciam diretamente atenção, memória e decisão — não há cognição "pura", isolada do estado afetivo.</p><p>A consequência é libertadora e exigente ao mesmo tempo: <strong>regular o estado é parte de trabalhar bem</strong>, não uma distração dele. Sono, respiração, reavaliação de situações e reduzir a carga de ameaça não são "autocuidado" opcional — são intervenções que mudam o substrato neural do qual seu desempenho depende. É por isso que o estado importa tanto quanto o esforço.</p>`}
    ],
    quiz:[
      {q:'Qual é a função principal da amígdala?',
       o:['Consolidar as memórias de longo prazo antes de transferi-las para o córtex','Detectar e avaliar relevância emocional, sobretudo ameaças, muito rápido','Controlar o ritmo circadiano e a hora de dormir todos os dias','Produzir a fala e organizar a gramática das frases'], c:1, l:0,
       er:'Isso. A amígdala participa da avaliação rápida de <strong>relevância e ameaça</strong> e influencia atenção, memória e respostas corporais. Ela atua dentro de redes, não como um botão que sequestra toda a razão.',
       ew:'A amígdala participa da avaliação de relevância emocional, especialmente em situações incertas ou ameaçadoras, e pode priorizar respostas rápidas em interação com outras redes.'},
      {q:'Segundo a lei de Yerkes-Dodson, como a ativação se relaciona com o desempenho?',
       o:['Quanto maior a ativação, melhor o desempenho, sem nenhum limite superior','Em U invertido: há um ponto ótimo intermediário, e o excesso piora','A ativação não tem efeito algum sobre o desempenho da pessoa','Só a ausência total de ativação produz um bom desempenho'], c:1, l:2,
       er:'Exato. É um <strong>U invertido</strong>: pouca ativação = apatia; ativação média = pico de desempenho; excesso = despencada. O ideal é o ponto do meio.',
       ew:'A relação é um <strong>U invertido</strong>, não uma linha reta. Pouca ativação deixa apático, ativação intermediária é o pico, e ativação excessiva <strong>derruba</strong> o desempenho. Mais nem sempre é melhor.'},
      {q:'Qual é o efeito do cortisol CRÔNICO sobre o cérebro?',
       o:['Melhora permanentemente a memória','Prejudica o hipocampo e o córtex pré-frontal','Não tem nenhum efeito','Aumenta o número de neurônios indefinidamente'], c:1, l:2,
       er:'Correto. O estresse agudo é útil, mas o cortisol <strong>crônico corrói o hipocampo</strong> (memória) e o <strong>pré-frontal</strong> (controle e foco) — justo as áreas que você mais precisa para pensar.',
       ew:'O problema é a cronicidade: cortisol prolongado <strong>prejudica o hipocampo</strong> (memória) e o <strong>córtex pré-frontal</strong> (foco e controle). O estresse breve pode ajudar; o estresse que não desliga cobra caro.'},
      {q:'O que a neurociência moderna diz sobre a separação entre emoção e cognição?',
       o:['São dois sistemas completamente independentes, que jamais chegam a se influenciar','Estão entrelaçadas — o estado emocional influencia atenção, memória e decisão','A emoção só atrapalha o pensamento e, por isso, deveria ser sempre ignorada','A cognição não consegue funcionar sem uma noite inteira de sono'], c:1, l:3,
       er:'Isso mesmo. Não há cognição "pura": emoção e razão estão <strong>entrelaçadas</strong>. Por isso regular o estado (sono, respiração, reavaliação) é parte de pensar bem, não um extra.',
       ew:'Elas estão <strong>entrelaçadas</strong>, não separadas. O estado emocional influencia diretamente atenção, memória e decisão — daí regular o estado ser parte de trabalhar bem, e não uma distração dele.'}
    ]
  },
  {
    id:'sono', n:'08', title:'Sono e Consolidação', color:'var(--blue)', hex:'#60a5fa',
    tag:'O trabalho invisível que fecha o ciclo',
    intro:'Dormir não é tempo perdido — é manutenção ativa. Enquanto você dorme, o cérebro consolida o que aprendeu, integra emoções e literalmente se limpa. Este módulo fecha o percurso: tudo o que os anteriores construíram depende do que acontece aqui.',
    lessons:[
      {t:'Por que dormimos',
       b:`<p>Todo animal dorme, apesar do custo evolutivo óbvio de ficar horas vulnerável e inconsciente. Se a seleção natural manteve algo tão caro, é porque o sono cumpre funções <strong>essenciais e insubstituíveis</strong>.</p><p>Ele não é uma pausa passiva — é um período de <strong>trabalho ativo</strong>: consolidar memórias, reorganizar circuitos, restaurar sistemas e limpar resíduos metabólicos. Boa parte do que você "aprendeu" durante o dia só se torna permanente enquanto você dorme.</p>`},
      {t:'A arquitetura do sono',
       b:`<p>O sono não é uniforme. Ele se organiza em <span class="term">ciclos de cerca de 90 minutos</span>, alternando estágios. O <strong>sono de ondas lentas</strong> (o sono profundo, estágio N3) e o <strong>sono REM</strong> têm papéis distintos na memória.</p><p>O sono de ondas lentas está fortemente ligado à consolidação da <span class="term">memória declarativa</span> — fatos e eventos. Já o <strong>REM</strong> favorece a integração de memórias procedurais (habilidades) e o <strong>processamento emocional</strong>. Uma noite completa passa por vários ciclos, e cortar horas de sono significa cortar justamente as fases que consolidam o que você estudou.</p>`},
      {t:'O sistema glinfático',
       b:`<p>Uma descoberta relativamente recente (do grupo de Maiken Nedergaard): durante o sono, o cérebro ativa um sistema de limpeza — o <span class="term">sistema glinfático</span> — que faz o líquido circular entre as células e <strong>remove resíduos metabólicos</strong> acumulados durante a vigília.</p><p>É quase como uma faxina noturna do tecido neural. A privação de sono impede essa limpeza adequada, deixando subprodutos se acumularem. Dormir mal não é só cansaço — é o cérebro operando com resíduos que deveriam ter sido removidos.</p>`},
      {t:'Ritmo circadiano e pressão do sono',
       b:`<p>Dois sistemas governam o sono. O <span class="term">ritmo circadiano</span>, comandado pelo núcleo supraquiasmático e sinalizado pela <strong>melatonina</strong>, alinha seu corpo ao ciclo dia-noite. E a <span class="term">pressão do sono</span>: durante a vigília, uma substância chamada <strong>adenosina</strong> se acumula no cérebro, e quanto mais ela sobe, mais sonolento você fica.</p><p>Aqui está o truque da cafeína: ela <strong>bloqueia os receptores de adenosina</strong>. Não elimina o cansaço — apenas <strong>mascara</strong> o sinal. A adenosina continua se acumulando por trás; quando a cafeína passa, o cansaço represado volta de uma vez. É uma dívida adiada, não paga.</p>`}
    ],
    quiz:[
      {q:'Qual estágio do sono está mais associado à consolidação de memórias declarativas (fatos e eventos)?',
       o:['O sono REM','O sono de ondas lentas (sono profundo)','O estágio N1 (adormecer)','Nenhum — a consolidação só ocorre acordado'], c:1, l:1,
       er:'Isso. O <strong>sono de ondas lentas</strong> (profundo, N3) consolida a memória declarativa. O REM tem outro papel: memória procedural e processamento emocional.',
       ew:'É o <strong>sono de ondas lentas</strong> (o sono profundo). O REM importa também, mas mais para habilidades procedurais e emoção — a consolidação de fatos e eventos se apoia no sono profundo.'},
      {q:'O que o sistema glinfático faz durante o sono?',
       o:['Produz a melatonina que induz o sono no fim da tarde','Remove resíduos metabólicos acumulados no cérebro','Bloqueia os receptores de adenosina no cérebro','Fortalece diretamente todas as sinapses do córtex'], c:1, l:2,
       er:'Exato. É a "faxina" noturna: o sistema glinfático <strong>remove resíduos metabólicos</strong> acumulados na vigília. Dormir mal deixa esses subprodutos se acumularem.',
       ew:'O sistema glinfático faz a <strong>limpeza de resíduos metabólicos</strong> do cérebro durante o sono. Privar-se de sono trava essa faxina, deixando subprodutos acumulados — não é só cansaço.'},
      {q:'Como a cafeína age no cérebro para reduzir a sensação de sono?',
       o:['Elimina toda a adenosina já acumulada no organismo durante o dia','Bloqueia os receptores de adenosina, mascarando o cansaço','Faz o corpo produzir muito mais melatonina que o normal','Consolida as memórias que ficaram pendentes do dia'], c:1, l:3,
       er:'Correto. A cafeína <strong>bloqueia os receptores de adenosina</strong> — ela mascara o sinal de cansaço, mas a adenosina continua acumulando. Quando a cafeína passa, o cansaço represado volta.',
       ew:'A cafeína não elimina nada — ela <strong>bloqueia os receptores de adenosina</strong>, mascarando o sinal de sono. A adenosina segue se acumulando por trás, e o cansaço volta de uma vez quando o efeito passa.'},
      {q:'Qual é a duração aproximada de um ciclo de sono?',
       o:['Cerca de 10 minutos','Cerca de 90 minutos','Cerca de 6 horas','Não há ciclos, o sono é uniforme'], c:1, l:1,
       er:'Isso mesmo. Cada ciclo dura cerca de <strong>90 minutos</strong> e passa por diferentes estágios. Uma noite completa encadeia vários — e cortar horas corta justamente as fases que consolidam.',
       ew:'Cada ciclo dura em torno de <strong>90 minutos</strong>, alternando estágios de sono profundo e REM. O sono não é uniforme — uma noite completa é feita de vários desses ciclos encadeados.'}
    ]
  }
];

const MINI_QUIZZES = {
  neuronio:[
    [
      {lvl:0,q:"O que mantém o potencial de repouso de cerca de −70 mV?",o:["A bomba de sódio-potássio e canais de vazamento de K⁺","A liberação contínua de dopamina pelos terminais vizinhos","A bainha de mielina, que envolve e isola o corpo celular"], c:0,er:"A bomba Na⁺/K⁺ (3 Na⁺ para fora, 2 K⁺ para dentro) mais os canais de vazamento sustentam o gradiente de repouso.",ew:"O repouso é elétrico e iônico: depende de bombas e canais, não de neurotransmissores nem de mielina."},
      {lvl:1,q:"Se a bomba de sódio-potássio parasse, o esperado seria:",o:["O gradiente iônico se dissipar e o neurônio perder a capacidade de disparar","O neurônio passar a disparar continuamente, já que nada o traria de volta ao repouso","Nada mudaria: o repouso é mantido pela bainha de mielina do axônio"], c:0,er:"Sem a bomba, os gradientes se desfazem e o potencial de repouso colapsa — sem gradiente, não há disparo.",ew:"O repouso é ativo: custa ATP o tempo todo. Sem a bomba, o gradiente se perde."},
      {lvl:2,q:"Por que as células gliais são essenciais mesmo sem disparar potenciais de ação?",o:["Isolam, nutrem e limpam o ambiente que permite o neurônio funcionar","São elas que de fato geram os pensamentos; os neurônios só transmitem","Substituem os neurotransmissores quando o estoque da sinapse acaba"], c:0,er:"Astrócitos, oligodendrócitos e micróglia sustentam, mielinizam e limpam — sem esse suporte, o neurônio não opera.",ew:"A glia não dispara nem pensa, mas cria e mantém as condições para o neurônio disparar."}
    ],
    [
      {lvl:0,q:"O que causa a fase de despolarização rápida do potencial de ação?",o:["Abertura de canais de Na⁺ dependentes de voltagem","Saída rápida de K⁺ pelos canais de vazamento da membrana","Entrada de cálcio no núcleo, que ativa os genes do disparo"], c:0,er:"No limiar, canais de Na⁺ dependentes de voltagem abrem e o Na⁺ entra, disparando a despolarização.",ew:"A subida é sódio entrando; o potássio saindo faz a descida (repolarização)."},
      {lvl:1,q:"Um estímulo duas vezes mais forte que o limiar produz:",o:["Disparos mais frequentes, com a mesma amplitude","Um potencial de ação com o dobro da amplitude normal","Um disparo mais lento, porém muito mais duradouro"], c:0,er:"É tudo-ou-nada: acima do limiar a amplitude é fixa; a intensidade vira frequência de disparos.",ew:"A força não muda o tamanho do sinal — muda quantos disparos por segundo."},
      {lvl:2,q:"Por que a mielina acelera tanto a condução?",o:["O impulso salta de nó em nó (condução saltatória) em vez de percorrer toda a membrana","Ela aumenta a amplitude do impulso, que assim vence trechos maiores do axônio de uma vez","Ela produz mais neurotransmissor no terminal, acelerando a passagem por cada sinapse"], c:0,er:"A mielina isola segmentos e concentra a regeneração do sinal nos nós de Ranvier — o impulso salta, ganhando velocidade.",ew:"A mielina não aumenta o sinal; ela faz o impulso pular trechos, o que o acelera."}
    ],
    [
      {lvl:0,q:"Na sinapse química, o que dispara a liberação de neurotransmissores?",o:["A entrada de Ca²⁺ no terminal","A saída de K⁺ do terminal","A despolarização do neurônio seguinte"], c:0,er:"O impulso abre canais de Ca²⁺; o cálcio que entra faz as vesículas se fundirem e liberarem o neurotransmissor.",ew:"O gatilho é o cálcio entrando no terminal, não potássio nem mielina."},
      {lvl:1,q:"Um receptor ionotrópico difere de um metabotrópico principalmente por:",o:["Ser rápido e abrir um canal iônico diretamente","Ser sempre inibitório, nunca excitatório","Agir sem depender de nenhum neurotransmissor"], c:0,er:"O ionotrópico é o próprio canal — resposta rápida; o metabotrópico age via proteína G, mais lento e modulatório.",ew:"Ambos dependem de neurotransmissor; a diferença é velocidade e mecanismo (canal direto vs proteína G)."},
      {lvl:2,q:"Por que uma sinapse pode ter efeito rápido e outra, efeito lento e duradouro?",o:["Depende do receptor: ionotrópico é rápido; metabotrópico é lento","Depende apenas da distância entre o terminal e o receptor na fenda","Depende de quanta mielina envolve o terminal daquela sinapse"], c:0,er:"Ionotrópicos dão respostas de milissegundos; metabotrópicos disparam cascatas intracelulares mais lentas e persistentes.",ew:"O que define a cinética é o tipo de receptor, não a geometria da fenda."}
    ],
    [
      {lvl:0,q:"Glutamato e GABA são, respectivamente:",o:["Principal excitatório e principal inibitório","Dois neuromoduladores que regulam o humor","Ambos inibitórios, com forças diferentes"], c:0,er:"Glutamato excita, GABA inibe — juntos fazem a maior parte da sinalização ponto-a-ponto.",ew:"Eles não são neuromoduladores difusos; são os transmissores rápidos que ligam e desligam neurônios."},
      {lvl:1,q:"Um remédio que aumenta a ação do GABA tende a:",o:["Reduzir a excitabilidade (efeito calmante)","Aumentar os disparos em todo o sistema nervoso","Não ter efeito algum sobre o sistema nervoso"], c:0,er:"Mais GABA significa mais inibição, o que reduz a excitabilidade — base de muitos ansiolíticos e sedativos.",ew:"O GABA é inibitório; reforçá-lo acalma, não excita."},
      {lvl:2,q:"Por que a dopamina pode afetar foco e humor ao mesmo tempo, diferente do glutamato?",o:["Age como neuromodulador, de forma difusa, sobre redes inteiras","Porque é bem mais rápida que o glutamato na fenda sináptica","Porque age sem precisar de receptores na célula seguinte"], c:0,er:"Neuromoduladores ajustam o ganho e o estado de circuitos amplos — por isso um só sistema toca foco, humor e motivação.",ew:"O alcance amplo vem de agir difusamente sobre redes, não de velocidade nem de dispensar receptores."}
    ]
  ],
  plasticidade:[
    [
      {lvl:0,q:"Plasticidade estrutural inclui:",o:["Formar e podar sinapses e espinhas dendríticas","Apenas mudar a força de sinapses já existentes","Aumentar a mielina de todos os axônios do cérebro"], c:0,er:"A estrutural muda a fiação: cria, remodela e poda conexões; a funcional muda a eficiência das que já existem.",ew:"Mudar só a força é plasticidade funcional; a estrutural altera a própria arquitetura."},
      {lvl:1,q:"Um circuito muito usado tende, ao longo do tempo, a:",o:["Fortalecer-se; o pouco usado tende a ser podado","Enfraquecer, porque o uso excessivo desgasta a sinapse","Permanecer idêntico, já que a conexão é fixa"], c:0,er:"Uso fortalece, desuso poda — é a plasticidade dependente de experiência esculpindo a rede.",ew:"Não há 'desgaste por uso' aqui; o que não se usa é que tende a sumir."},
      {lvl:2,q:"Por que crianças aprendem certas coisas (como sotaque) mais fácil que adultos?",o:["Períodos críticos de plasticidade elevada, que depois se reduz","Porque crianças têm muito mais neurônios do que os adultos","Porque nelas ainda não começou a poda sináptica de nenhum tipo"], c:0,er:"Em janelas críticas a plasticidade é máxima; depois ela diminui — mas nunca zera.",ew:"Não é quantidade de neurônios nem ausência de poda: é a intensidade da plasticidade na janela certa."}
    ],
    [
      {lvl:0,q:"A regra de Hebb resume-se a:",o:["Neurônios que disparam juntos fortalecem sua conexão","Neurônios que disparam juntos acabam se destruindo","As conexões enfraquecem justamente quanto mais são usadas"], c:0,er:"Atividade coincidente e repetida fortalece a sinapse — a base celular da associação.",ew:"É o oposto de destruir: disparar junto conecta."},
      {lvl:1,q:"Na LTP, o receptor NMDA age como detector de coincidência porque:",o:["Só deixa Ca²⁺ entrar com glutamato presente E membrana já despolarizada","Abre com qualquer estímulo isolado, sem exigir nenhuma coincidência","Abre sozinho quando a membrana está em repouso, sem depender de voltagem"], c:0,er:"Ele exige as duas condições ao mesmo tempo — por isso sinaliza que o neurônio pré e o pós dispararam juntos.",ew:"Um estímulo isolado não basta; o bloqueio de Mg²⁺ só sai com despolarização somada ao glutamato."},
      {lvl:2,q:"O que a entrada de Ca²⁺ pelo NMDA desencadeia para fortalecer a sinapse?",o:["Ativa a CaMKII, que insere e fosforila receptores AMPA","Destrói os receptores AMPA já presentes na sinapse","Bloqueia o glutamato para impedir excitação excessiva"], c:0,er:"Ca²⁺ → CaMKII → mais AMPA na membrana pós-sináptica = resposta maior ao mesmo glutamato. Isso é a LTP.",ew:"A LTP adiciona AMPA (fortalece); remover receptores seria LTD, o enfraquecimento."}
    ],
    [
      {lvl:0,q:"No modelo de Kandel, a memória de longo prazo (diferente da de curto prazo) exige:",o:["Transcrição gênica e síntese de novas proteínas","Apenas modificar proteínas que já existem na sinapse","Nenhuma mudança molecular além do disparo repetido"], c:0,er:"O longo prazo precisa de novos genes e proteínas (via CREB) e do crescimento de conexões; o curto prazo só ajusta proteínas prontas.",ew:"Modificar proteínas existentes basta para o curto prazo, não para o longo."},
      {lvl:1,q:"Bloquear a síntese de proteínas logo após o aprendizado deve impedir:",o:["A memória de longo prazo, poupando a de curto prazo","A memória de curto prazo, poupando a de longo prazo","Toda a percepção sensorial, inclusive a visão e a audição"], c:0,er:"Sem síntese proteica, o longo prazo não consolida; o curto prazo, que não depende disso, resiste.",ew:"O curto prazo não precisa de proteínas novas — quem cai é o longo prazo."},
      {lvl:2,q:"Qual o papel do CREB na passagem de curto para longo prazo?",o:["É o fator de transcrição que liga os genes da consolidação","É um neurotransmissor excitatório liberado no hipocampo","É a proteína que forma a bainha de mielina do axônio"], c:0,er:"O CREB ativa a expressão gênica que constrói novas sinapses; vencer o freio (CREB-2) é parte de por que o espaçamento ajuda.",ew:"O CREB não é transmissor nem estrutura — é um interruptor de genes dentro do núcleo."}
    ],
    [
      {lvl:0,q:"Consolidação sistêmica refere-se a:",o:["Transferência gradual da memória do hipocampo para o neocórtex","Fixação em segundos, sem qualquer participação do hipocampo","Apagamento das memórias antigas para abrir espaço às novas"], c:0,er:"Ao longo de dias a anos, o hipocampo 'ensina' o córtex, que passa a guardar a memória de forma distribuída.",ew:"Não é imediata nem dispensa o hipocampo — é lenta e depende dele no início."},
      {lvl:1,q:"Por que estudar espaçado supera estudar tudo de uma vez?",o:["Cada revisão reabre a reconsolidação e redispara a maquinaria de proteínas","Porque estudar espaçado apenas cansa menos e melhora a atenção","Porque estudar tudo de uma vez satura o hipocampo e por isso fixa muito melhor"], c:0,er:"O intervalo permite que cada recuperação reative a via CREB/síntese proteica; massar satura sem reativar.",ew:"Massar (tudo de uma vez) satura a maquinaria e fixa pior — o espaçamento é que vence."},
      {lvl:2,q:"A fila de revisão desta ferramenta se apoia em qual princípio?",o:["Recuperar no ponto de esquecer, reengajando a consolidação a cada intervalo","Reler o texto passivamente até que ele fique familiar o bastante","Ver a resposta antes de tentar, para não correr o risco de errar e fixar o erro"], c:0,er:"Recuperação ativa espaçada é o mecanismo; por isso a fila traz o tópico de volta em 1, 3, 7 e 14 dias.",ew:"Reler ou espiar a resposta não reengaja a consolidação — recuperar com esforço, sim."}
    ]
  ],
  recompensa:[
    [
      {lvl:0,q:"A via mesolímbica de recompensa vai de:",o:["ATV ao núcleo accumbens","Cerebelo à medula espinhal","Retina ao córtex auditivo"], c:0,er:"Neurônios de dopamina da ATV projetam ao accumbens (e ao pré-frontal), formando o núcleo da recompensa.",ew:"A via é ATV → accumbens; as outras opções não são circuitos de recompensa."},
      {lvl:1,q:"Na distinção 'querer vs gostar', a dopamina está mais ligada a:",o:["Querer (o impulso de buscar)","Gostar (o prazer sensorial)","Nenhum dos dois, só à dor"], c:0,er:"A dopamina move a saliência de incentivo — o 'querer'; o 'gostar' depende mais de opioides e endocanabinoides.",ew:"Prazer (gostar) e motivação (querer) são sistemas distintos; a dopamina puxa o querer."},
      {lvl:2,q:"Por que alguém pode 'querer' compulsivamente algo que já não dá tanto prazer?",o:["Querer e gostar são circuitos separados; o querer pode se manter sozinho","Porque o prazer daquela coisa, na verdade, só aumenta a cada nova repetição","Porque a dopamina passa a produzir dor em vez de prazer com o tempo"], c:0,er:"Como o 'querer' e o 'gostar' são dissociáveis, o impulso persiste mesmo com o prazer em queda — peça-chave nos vícios.",ew:"Não é aumento de prazer: é o 'querer' dopaminérgico rodando independente do 'gostar'."}
    ],
    [
      {lvl:0,q:"Os neurônios de dopamina de Schultz codificam:",o:["Erro de previsão de recompensa (o inesperado)","O valor absoluto do prazer de cada recompensa","A intensidade física do estímulo recebido"], c:0,er:"Eles sinalizam a diferença entre o recebido e o previsto — disparam ao inesperado, não à recompensa em si.",ew:"Não é o prazer absoluto; é o quanto o resultado surpreende em relação à expectativa."},
      {lvl:1,q:"Uma recompensa totalmente esperada produz, nesses neurônios:",o:["Pouca ou nenhuma resposta","A resposta máxima possível","Uma queda abaixo do basal"], c:0,er:"Se já era previsto, o erro é próximo de zero — a dopamina fica neutra. A queda ocorre quando a recompensa esperada falha.",ew:"Resposta grande é para o inesperado; o esperado quase não move a dopamina."},
      {lvl:2,q:"Por que, com o aprendizado, o disparo de dopamina migra da recompensa para a pista que a antecipa?",o:["Porque a pista passa a prever a recompensa (aprendizado por diferença temporal)","Porque a recompensa deixa de existir e a pista acaba ocupando o lugar dela no circuito","Porque a pista se torna dolorosa e o cérebro passa a evitá-la ativamente"], c:0,er:"Uma vez que a pista prevê o prêmio, é ela que carrega a surpresa — exatamente como no aprendizado por diferença temporal do RL.",ew:"A recompensa continua lá; o que muda é onde o 'erro de previsão' aparece: na pista."}
    ],
    [
      {lvl:0,q:"Progresso visível em pequenos passos motiva porque gera:",o:["Uma sequência de erros de previsão positivos","Uma sequência de punições leves e toleráveis","Ausência completa de dopamina no circuito"], c:0,er:"Cada avanço percebido é um pequeno 'melhor que o esperado' — um micro-disparo de dopamina que puxa você adiante.",ew:"Não é punição nem ausência de dopamina; é uma cadeia de pequenas surpresas positivas."},
      {lvl:1,q:"Recompensa incerta ou variável, comparada à totalmente previsível, tende a gerar resposta dopaminérgica:",o:["Maior","Menor","Idêntica"],c:0,er:"A incerteza amplia a resposta dopaminérgica — parte de por que barras de progresso e variabilidade engajam.",ew:"O previsível gera menos; a incerteza, dentro do razoável, gera mais."},
      {lvl:2,q:"Por que a barra de XP desta ferramenta já motiva antes mesmo da recompensa final?",o:["A dopamina responde à antecipação (à pista), não só ao prêmio","Porque a própria barra libera dopamina ao ser olhada na tela","Porque a barra remove o erro de previsão da equação toda"], c:0,er:"Sinais que antecipam ganho (a barra subindo) disparam dopamina fásica — a antecipação em si motiva.",ew:"O efeito é da antecipação neural, não de algo físico; e ele usa o erro de previsão, não o elimina."}
    ],
    [
      {lvl:0,q:"A estrutura básica de um hábito é:",o:["Deixa → rotina → recompensa","Recompensa → deixa → punição","Apenas força de vontade"],c:0,er:"Uma deixa dispara a rotina, seguida de recompensa; a repetição grava o loop.",ew:"A ordem é deixa, rotina, recompensa — e hábito forte quase dispensa força de vontade."},
      {lvl:1,q:"À medida que uma ação vira hábito, o controle migra:",o:["Do estriado ventral (meta) para o dorsal (hábito)","Do córtex pré-frontal para a retina e o tálamo","Do cerebelo para os núcleos do tronco encefálico"], c:0,er:"Comportamento automatizado desloca-se para o estriado dorsal, ficando menos dependente da meta e da recompensa.",ew:"A migração é ventral → dorsal dentro do estriado, não para áreas sensoriais ou órgãos."},
      {lvl:2,q:"Por que hábitos consolidados são difíceis de quebrar mesmo quando a recompensa perde valor?",o:["A dopamina se deslocou para a deixa e o comportamento roda quase independente do prêmio","Porque a deixa acaba desaparecendo com o tempo e o hábito perde o gatilho que o disparava","Porque a recompensa dobra de valor toda vez que o comportamento é repetido"], c:0,er:"Com o controle no estriado dorsal e a dopamina na deixa, a rotina dispara sozinha — por isso mudar o ambiente (a deixa) ajuda tanto.",ew:"A deixa continua ativa; é justamente ela, e não o valor do prêmio, que sustenta o hábito."}
    ]
  ],
  atencao:[
    [
      {lvl:0,q:"Atenção seletiva é mais bem descrita como:",o:["Competição enviesada entre estímulos por representação","Capacidade ilimitada de processar tudo ao mesmo tempo","Um filtro perfeito, que nunca deixa passar distração"], c:0,er:"Estímulos competem e o cérebro inclina a balança; atenção é vencer essa competição, não processar tudo.",ew:"A capacidade é limitada e falível — daí a metáfora de competição, não de filtro perfeito."},
      {lvl:1,q:"Manter o foco numa tarefa chata contra distrações vistosas exige:",o:["Controle top-down vencendo o bottom-up","Deixar o bottom-up dominar a cena","Desligar por completo o pré-frontal"], c:0,er:"Foco é o controle guiado por metas (top-down) suprimindo o puxão do estímulo saliente (bottom-up).",ew:"Deixar o estímulo dominar é distração; e o pré-frontal é justamente quem sustenta o top-down."},
      {lvl:2,q:"Por que ambientes cheios de notificações minam o foco fisiologicamente?",o:["Cada alerta compete pela seleção e exige proteger ou reconstruir a meta ativa","Porque cada notificação aumenta a mielina dos circuitos e acaba tornando-os mais lentos","Porque os alertas desligam a amígdala e, com isso, a pessoa acaba perdendo o senso de urgência"], c:0,er:"Notificações competem pela seleção; mesmo quando você resiste, a meta precisa ser protegida ou reconstruída, aumentando interferência e custo de retomada.",ew:"O efeito principal é competição e interrupção da meta ativa, não uma mudança de mielina nem o desligamento da amígdala."}
    ],
    [
      {lvl:0,q:"A capacidade da memória de trabalho é aproximadamente:",o:["Cerca de 4 blocos de informação","Praticamente ilimitada, sem teto","Um único item de cada vez"], c:0,er:"Estimativas modernas (Cowan) apontam cerca de 4 blocos mantidos ao mesmo tempo.",ew:"Não é ilimitada nem um só item — gira em torno de 4 blocos."},
      {lvl:1,q:"Lembrar um número longo agrupando dígitos (ex.: 55 12 34) funciona porque:",o:["O agrupamento (chunking) comprime vários itens em poucos blocos","Porque isso aumenta o número de neurônios recrutados na tarefa","Porque elimina de uma vez por todas a interferência entre os itens"], c:0,er:"Agrupar transforma muitos itens em poucos blocos, cabendo melhor no limite de ~4.",ew:"Não cria neurônios nem elimina interferência; apenas empacota a informação de forma eficiente."},
      {lvl:2,q:"Por que uma interrupção breve pode apagar o que você segurava na memória de trabalho?",o:["Ela depende de disparo persistente no pré-frontal, frágil à interferência","Porque a informação já tinha sido consolidada no neocórtex e, por isso, some","Porque a bainha de mielina se desfaz durante qualquer interrupção"], c:0,er:"A informação é mantida por atividade sustentada no pré-frontal; a interferência quebra esse disparo e o conteúdo se perde.",ew:"Conteúdo em memória de trabalho ainda não está consolidado; e não envolve desfazer mielina."}
    ],
    [
      {lvl:0,q:"As três funções executivas centrais (Miyake) são:",o:["Inibir, atualizar e alternar","Ver, ouvir e sentir o toque","Dormir, comer e se movimentar"], c:0,er:"Inibição de distratores, atualização da memória de trabalho e alternância entre tarefas — o núcleo do controle executivo.",ew:"Essas são funções cognitivas de controle, não sentidos nem funções vegetativas."},
      {lvl:1,q:"O pré-frontal controla o comportamento sobretudo ao:",o:["Enviesar (top-down) as áreas sensoriais e motoras posteriores","Produzir diretamente todos os movimentos voluntários que o corpo faz","Armazenar de forma permanente as memórias de longo prazo"], c:0,er:"Ele mantém metas e regras e usa isso para inclinar o processamento nas demais áreas — é o maestro, não o instrumento.",ew:"Ele não executa nem guarda tudo; ele coordena, enviesando outras regiões."},
      {lvl:2,q:"Por que privação de sono e estresse derrubam o autocontrole antes de outras funções?",o:["Sono ruim e estresse alteram várias redes e neuromoduladores necessários ao controle","Porque o pré-frontal não consome energia e depende só do sono profundo","Porque ele é a área mais primitiva do cérebro e a primeira a ser desligada no cansaço"], c:0,er:"Sono ruim e estresse modificam alerta, sinalização neuromodulatória, memória de trabalho e controle em redes distribuídas; não é um simples desligamento do pré-frontal.",ew:"O prejuízo envolve redes distribuídas e seu estado químico e fisiológico, não uma hierarquia em que uma área recente desliga primeiro."}
    ],
    [
      {lvl:0,q:"Para tarefas que exigem atenção deliberada, 'multitarefa' na verdade é:",o:["Alternância rápida entre tarefas (serial)","Processamento paralelo perfeito e sem custo","Fazer duas coisas ao mesmo tempo sem perda"], c:0,er:"O cérebro serializa: alterna entre tarefas em vez de processá-las de fato em paralelo.",ew:"Não há paralelo real para tarefas de meta; há troca rápida, com custo."},
      {lvl:1,q:"O 'custo de troca' na alternância de tarefas aparece como:",o:["Mais tempo e mais erros","Mais precisão","Nenhuma diferença mensurável"],c:0,er:"Cada troca cobra reconfiguração e sofre interferência da tarefa anterior — tempo e erros sobem.",ew:"O custo é medível e negativo: piora tempo e acurácia, não melhora."},
      {lvl:2,q:"Por que responder mensagens enquanto estuda prejudica a retenção, não só a velocidade?",o:["A troca fragmenta o processamento profundo e a codificação, além de custar tempo","Porque a alternância na verdade melhora a consolidação e, com ela, a retenção sobe","Porque responder mensagens desliga o hipocampo de forma permanente e definitiva"], c:0,er:"Alternar impede a codificação sustentada de que a memória depende — retém-se menos, além de render menos.",ew:"A troca atrapalha (não melhora) a consolidação; e não há desligamento permanente do hipocampo."}
    ]
  ],
  emocao:[
    [
      {lvl:0,q:"A função central da amígdala diante de ameaça é:",o:["Detectar relevância emocional e disparar respostas rápidas","Armazenar as memórias declarativas de longo prazo no neocórtex","Controlar o ritmo fino da respiração e do coração"], c:0,er:"Ela marca a saliência emocional (sobretudo ameaça) e aciona respostas autonômicas e o eixo do estresse.",ew:"Memória declarativa é hipocampo; a amígdala sinaliza relevância emocional."},
      {lvl:1,q:"Pular ao ver um objeto no chão antes de perceber que é uma mangueira ilustra:",o:["A via rápida (tálamo→amígdala), grosseira mas veloz","A via lenta cortical, que avalia tudo antes de reagir","Ausência total de processamento pelo cérebro"], c:0,er:"A via rápida dispara a reação antes de a via cortical, mais lenta e precisa, concluir a análise.",ew:"A reação veio antes do córtex — foi a via rápida subcortical, não a lenta."},
      {lvl:2,q:"Qual a vantagem evolutiva de ter uma via rápida 'imprecisa' para o medo?",o:["Agir em milissegundos diante de risco vale mais que esperar a certeza","Economizar neurotransmissores em situações de perigo imediato","Impedir qualquer reação até que o córtex tenha certeza absoluta do risco"], c:0,er:"Melhor um alarme falso ocasional do que reagir tarde a uma ameaça real — velocidade compensa a imprecisão.",ew:"O ganho é tempo de resposta; a via rápida existe justamente para não esperar a análise completa."}
    ],
    [
      {lvl:0,q:"A ordem correta do eixo HPA sob estresse é:",o:["Hipotálamo (CRH) → hipófise (ACTH) → adrenal (cortisol)","Adrenal (cortisol) → hipotálamo (CRH) → hipófise (ACTH)","Hipófise (ACTH) → amígdala (CRH) → adrenal (cortisol)"], c:0,er:"O CRH do hipotálamo estimula o ACTH da hipófise, que faz a adrenal liberar cortisol.",ew:"A cascata começa no hipotálamo e termina no cortisol da adrenal, nessa sequência."},
      {lvl:1,q:"O cortisol elevado normalmente desliga a própria resposta ao:",o:["Fazer retroalimentação negativa sobre hipotálamo e hipófise","Estimular ainda mais CRH, num ciclo que se retroalimenta","Destruir progressivamente o próprio córtex da adrenal"], c:0,er:"O cortisol sinaliza de volta para reduzir CRH e ACTH — um freio que encerra a resposta quando ela cumpre o papel.",ew:"Ele reduz, não aumenta, o CRH; é um mecanismo de desligamento, não de destruição."},
      {lvl:2,q:"O que costuma acontecer quando esse freio (retroalimentação) falha cronicamente?",o:["Cortisol fica alto por tempo demais, danificando hipocampo e pré-frontal","O eixo simplesmente desliga de vez, e a pessoa deixa de sentir estresse para sempre","A amígdala encolhe, e por isso o foco e a memória acabam melhorando"], c:0,er:"Sem o freio, o cortisol crônico atrofia dendritos no hipocampo, prejudica o pré-frontal e sensibiliza a amígdala.",ew:"Cortisol crônico piora memória e foco e aumenta a reatividade da amígdala — não melhora."}
    ],
    [
      {lvl:0,q:"A curva em U invertido (Yerkes-Dodson) diz que o desempenho é melhor com:",o:["Ativação intermediária","Ativação mínima","A máxima ativação possível"],c:0,er:"Nem apatia nem pânico: um nível intermediário de ativação otimiza o desempenho.",ew:"Tanto de menos quanto de mais pioram; o ótimo é no meio."},
      {lvl:1,q:"Estresse agudo e estresse crônico diferem porque:",o:["O agudo é adaptativo e breve; o crônico corrói estruturas ao longo do tempo","São exatamente o mesmo processo, apenas com nomes diferentes na literatura","O agudo é sempre o mais perigoso; o crônico o corpo acaba aprendendo a tolerar"], c:0,er:"Uma dose curta afia; a exposição prolongada ao cortisol é que causa dano acumulado.",ew:"Não são iguais, e o agudo costuma ajudar — o problema é a cronicidade."},
      {lvl:2,q:"Por que o estresse crônico piora justamente a memória e o autocontrole?",o:["Cortisol alto lesa o hipocampo (memória) e o pré-frontal (controle) e reforça a amígdala","Porque o excesso de cortisol aumenta a mielina e deixa os circuitos lentos demais","Porque o estresse acaba desligando a via rápida do medo e a pessoa perde a capacidade de reagir"], c:0,er:"Os alvos mais vulneráveis do cortisol crônico são hipocampo e pré-frontal, enquanto a amígdala hipertrofia — memória e foco caem, a reatividade sobe (carga alostática).",ew:"Não é mielina nem desligar o medo; é dano a hipocampo e pré-frontal com amígdala mais reativa."}
    ],
    [
      {lvl:0,q:"O sistema de noradrenalina do locus coeruleus ajuda a regular:",o:["O 'ganho' e o nível de alerta cortical","A digestão e o esvaziamento do estômago","A percepção de cor na retina e no córtex"], c:0,er:"A noradrenalina ajusta o ganho neural — em nível ótimo, afia percepção e foco.",ew:"É um modulador de alerta e ganho, não de digestão nem de cor."},
      {lvl:1,q:"Memória 'dependente de estado' significa que:",o:["Recupera-se melhor no mesmo estado em que se aprendeu","A memória independe por completo do estado interno da pessoa","Só é possível lembrar de algo enquanto se dorme"], c:0,er:"O estado interno (humor, ativação) durante a codificação vira uma pista de recuperação.",ew:"O estado importa e serve de pista; não é irrelevante nem restrito ao sono."},
      {lvl:2,q:"Por que 'usar força de vontade' falha quando o estado (sono/estresse) está ruim?",o:["O estado ajusta o ganho de circuitos antes de qualquer esforço consciente","Porque a força de vontade, do ponto de vista físico, simplesmente não existe","Porque o estado afeta apenas os músculos, e não os circuitos do cérebro"], c:0,er:"Sono e estresse mudam o ganho neural a montante; a vontade opera sobre um sistema já desregulado, e por isso escorrega.",ew:"O estado age no cérebro (não só no corpo) e a montante da vontade — daí sua eficácia limitada nesses momentos."}
    ]
  ],
  sono:[
    [
      {lvl:0,q:"Uma função central do sono é:",o:["Consolidar memórias e fazer manutenção do cérebro","Desligar o cérebro por completo, sem qualquer função ativa","Apenas descansar os músculos e as articulações"], c:0,er:"O sono é manutenção ativa: consolida memória, reequilibra sinapses e limpa resíduos.",ew:"Não é um simples 'desligar' nem só descanso muscular — é processamento e manutenção."},
      {lvl:1,q:"A hipótese da homeostase sináptica (SHY) propõe que o sono:",o:["Reescalona sinapses para baixo, preservando o que é sinal","Apaga todas as memórias que foram formadas ao longo daquele dia","Apenas fortalece sinapses, nunca as enfraquece"], c:0,er:"A vigília fortalece sinapses; o sono faz um reescalonamento geral para baixo que melhora a relação sinal-ruído.",ew:"Não apaga tudo nem só fortalece — reequilibra, reduzindo o ganho global de forma proporcional."},
      {lvl:2,q:"Por que uma noite ruim prejudica o aprendizado do dia anterior E do dia seguinte?",o:["Sem sono, falha a consolidação do que foi aprendido e cai a capacidade de codificar depois","Porque o sono não tem nenhuma relação comprovada com a memória: o que ele afeta é apenas o humor","Porque a falta de sono afeta somente o humor, e o humor não interfere no estudo"], c:0,er:"O sono consolida o aprendido e restaura a máquina de codificar; perdê-lo compromete os dois lados.",ew:"O sono é central para a memória, não só para o humor — e atua tanto retroativa quanto prospectivamente."}
    ],
    [
      {lvl:0,q:"O sono profundo (N3) concentra-se:",o:["No começo da noite","No fim da madrugada","Distribuído igualmente"],c:0,er:"O N3 domina os primeiros ciclos; o REM cresce nos ciclos finais.",ew:"Não é uniforme: profundo na frente, REM atrás."},
      {lvl:1,q:"Dormir só as primeiras horas e cortar a madrugada tende a sacrificar:",o:["Sobretudo o sono REM","Sobretudo o sono profundo","Nenhum estágio"],c:0,er:"Como o REM se concentra no fim, cortar a madrugada corta principalmente o REM.",ew:"O profundo já ocorreu cedo; quem se perde ao encurtar a noite é o REM."},
      {lvl:2,q:"Como o sono profundo ajuda a fixar o que você estudou?",o:["Oscilações lentas, fusos e ripples coordenam reativações entre hipocampo e córtex","Aumentando o cortisol durante a madrugada, o que fixa melhor o que foi estudado","Bloqueando o hipocampo durante a noite, para que o córtex possa trabalhar sem interferência"], c:0,er:"No N3, ondas lentas, fusos e sharp-wave ripples ajudam a coordenar reativações entre hipocampo e redes corticais, favorecendo estabilização e reorganização.",ew:"Não envolve elevar cortisol nem desligar o hipocampo: o processo depende de comunicação coordenada e reativação entre redes."}
    ],
    [
      {lvl:0,q:"O sistema glinfático serve para:",o:["Limpar resíduos metabólicos do cérebro","Produzir a dopamina que é usada durante a noite","Gerar os potenciais de ação do sono"], c:0,er:"É a rede de drenagem que troca líquor e fluido intersticial, arrastando resíduos.",ew:"Não produz transmissores nem dispara sinais — é limpeza."},
      {lvl:1,q:"Essa limpeza é especialmente ativa:",o:["Durante o sono","Durante exercício intenso","Só em jejum"],c:0,er:"No sono o espaço entre as células se abre e a depuração glinfática aumenta muito.",ew:"É o sono, não o exercício ou o jejum, que potencializa a limpeza."},
      {lvl:2,q:"Por que a privação crônica de sono é associada ao acúmulo de resíduos como beta-amiloide?",o:["Menos sono significa menos limpeza glinfática, então os resíduos se acumulam","Porque é justamente durante o sono que o cérebro passa a produzir a beta-amiloide","Porque a beta-amiloide substitui o líquor quando a pessoa dorme pouco"], c:0,er:"A depuração depende do sono; dormir pouco reduz a lavagem e favorece o acúmulo de beta-amiloide.",ew:"O sono limpa (não produz) amiloide; a sua falta é que deixa o resíduo se acumular."}
    ],
    [
      {lvl:0,q:"O modelo de dois processos do sono combina:",o:["Ritmo circadiano (C) e pressão homeostática (S)","Apenas a temperatura corporal ao longo do dia","Apenas a alimentação e o horário das refeições"], c:0,er:"O Processo C (relógio de ~24h) e o Processo S (adenosina acumulando) juntos determinam quando você dorme.",ew:"Não é só temperatura nem comida — são o relógio circadiano e a pressão homeostática."},
      {lvl:1,q:"A 'pressão do sono' que cresce ao longo do dia deve-se ao acúmulo de:",o:["Adenosina","Melatonina","Glutamato"],c:0,er:"Quanto mais tempo acordado, mais adenosina se acumula, aumentando a vontade de dormir.",ew:"A melatonina sinaliza o horário (Processo C); a pressão homeostática é a adenosina."},
      {lvl:2,q:"Por que a cafeína 'dá disposição' sem de fato repor energia?",o:["Ela bloqueia os receptores de adenosina, mascarando o cansaço acumulado","Ela destrói toda a adenosina que se acumulou no cérebro ao longo do dia","Ela recarrega diretamente o ATP das células do cérebro, repondo a energia gasta"], c:0,er:"A cafeína é antagonista da adenosina: esconde o sinal de sono, mas a pressão continua e volta quando ela passa.",ew:"Ela não elimina a adenosina nem repõe energia — só bloqueia o receptor temporariamente."}
    ]
  ]
};

const LEVELS = [
  {min:0,    name:'Sinapse Inicial'},
  {min:150,  name:'Broto Dendrítico'},
  {min:400,  name:'Circuito Ativo'},
  {min:750,  name:'Via Mielinizada'},
  {min:1150, name:'Rede Consolidada'},
  {min:1650, name:'Córtex Integrado'},
  {min:2250, name:'Sistema Sincronizado'},
  {min:2950, name:'Conectoma Emergente'},
  {min:3750, name:'Mente Plástica'},
  {min:4600, name:'Neurocientista'}
];

const XP = { lesson:15, correct:25, wrong:5, complete:50, mini:12, review:10, predict:4 };
const STORE_KEY = 'neurolab-state-v1';
/* Cópia interna do último estado bom conhecido, e o contador de revisão que
   permite a duas janelas do app perceberem uma à outra. Ver a seção
   "PERDA SILENCIOSA ENTRE JANELAS", abaixo. */
const SNAP_KEY = STORE_KEY + ':ultimo-bom';
const SNAP_PESO_KEY = SNAP_KEY + ':peso';
const REV_KEY  = STORE_KEY + ':rev';
const CONFLITO_KEY = STORE_KEY + ':conflito';
const STATE_VERSION = 5;   // v5: cronograma por tópico × dimensão (ver migrateState)
const DAY = 86400000;
const SRS_INTERVALS = [1, 3, 7, 14, 30, 60, 120, 240]; // dias por caixa (Leitner expandido)
const SRS_PASS = 0.8;      // acerto mínimo p/ promover a caixa
const SRS_LAPSE_CAP = 2;   // ao errar, cai no máximo até esta caixa (7 dias) e reconstrói
/* Teto da sessão, em ITENS (tópico × dimensão) — não em tópicos.
   Era 8 quando um item era um tópico inteiro com 3 perguntas. Agora um item
   traz cerca de uma pergunta, e 8 virou gargalo de vazão: simulando 180 dias
   com 2 aulas/dia, um aluno com 60% de acerto terminava com 72 itens
   pendentes e 81/dia de média — nunca alcançava a fila. Com 16 ele drena.
   O teto não é cota: é válvula. Na maioria dos dias a fila é menor que ele,
   então subir de 8 para 16 muda o trabalho médio real de 6,7 para 7,4 itens
   por dia a 85% de acerto — e derruba o pico da fila de 131 para 79. */
const SESSION_CAP = 16;

/* =====================================================================
   Estado + persistência
   ===================================================================== */
let state = defaultState();
function defaultState(){
  return { v:STATE_VERSION, rev:0, xp:0, deepMode:true, selfRate:{}, topicExplain:{}, predCredit:{},
           lessons:{}, mastery:{}, topicMastery:{}, doneQuiz:{}, dimensionEvidence:{}, questionHistory:{},
    creditC:{}, creditW:{}, miniCredit:{}, miniWrong:{}, srs:{},
    attempts:0, correctTotal:0, wrongTotal:0, lastModule:null, lastStudiedAt:0,
    domain:(typeof domainDefaultState==='function'?domainDefaultState():{}) };
}
/* =====================================================================
   INTEGRIDADE DA PERSISTÊNCIA

   O progresso do aluno existe só neste aparelho e não tem como ser
   recuperado. Antes, as duas maneiras de perdê-lo eram silenciosas:

   - um JSON corrompido virava "estado zero" sem aviso, e o primeiro save
     seguinte gravava por cima do blob — que pode ser recuperável à mão
     antes disso, nunca depois;
   - um localStorage que recusa escrita (aba privada, cota do iOS, storage
     desabilitado) deixava o app rodar normalmente sem persistir nada, e o
     aluno só descobria ao fechar.

   Nenhum dos dois é detectável pelo navigator.storage.persist() que o app
   já consulta: aquilo mede risco de evicção, não se a escrita funciona.
   ===================================================================== */

// null enquanto está tudo bem; {motivo, quarentena} quando a leitura falhou.
let _falhaLeitura = null;
// true quando uma gravação foi recusada — nada está sendo salvo.
let _falhaEscrita = false;

// Separada de loadState para poder ser testada sem storage nem DOM.
// {ok:true, state} | {ok:false, motivo:'json'|'formato'}
function readSavedState(raw){
  let parsed;
  try{ parsed = JSON.parse(raw); }
  catch(e){ return {ok:false, motivo:'json'}; }
  if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)){
    // migrateState devolveria defaultState() aqui, calado. Havia dado e não
    // foi possível usá-lo: isso é falha, não "primeira execução".
    return {ok:false, motivo:'formato'};
  }
  return {ok:true, state:migrateState(parsed)};
}

// Move o blob ilegível para uma chave datada, antes de qualquer escrita.
// Devolve 'ok' ou 'falhou' — o chamador decide o que fazer com isso.
function quarentenarEstado(raw){
  try{
    localStorage.setItem(STORE_KEY+':corrompido:'+Date.now(), raw);
    return 'ok';
  }catch(e){ return 'falhou'; }
}

async function loadState(){
  // 1) storage do artifact (persistência dentro do Claude).
  //    Na primeira vez a chave não existe e o get lança erro — isso é esperado,
  //    então tratamos como "sem progresso salvo ainda" sem poluir o console.
  try{
    if(window.storage && window.storage.get){
      const r = await window.storage.get(STORE_KEY, false);
      if(r && r.value){
        const lido = readSavedState(r.value);
        if(lido.ok) return lido.state;
        // Sem quarentena aqui: este caminho só existe dentro de artifact do
        // Claude e não tem localStorage próprio para preservar a cópia.
        _falhaLeitura = {motivo:lido.motivo, quarentena:'nao-tentada'};
      }
    }
  }catch(e){ /* chave ainda inexistente — segue para o fallback */ }
  // 2) localStorage (persistência quando o app é publicado fora do Claude).
  let principal = null;
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw){
      const lido = readSavedState(raw);
      if(lido.ok) _falhaLeitura = null;
      else {
        _falhaLeitura = {motivo:lido.motivo, quarentena:quarentenarEstado(raw)};
        limparQuarentenas(2);
      }
      if(lido.ok) principal = lido.state;
    }
  }catch(e){
    // getItem lançou: storage indisponível. Não há blob para preservar, mas a
    // escrita também não vai funcionar — a sondagem confirma e o aviso aparece.
    _falhaEscrita = true;
    return defaultState();
  }
  return comRedeDeSeguranca(principal);
}

/* Última linha de defesa, e a única que funciona seja qual for a causa: se o
   principal sumiu, ficou ilegível ou voltou como uma fração do que já foi, a
   cópia interna assume e o aluno é avisado do que aconteceu.

   Reiniciar e importar apagam a cópia, então quem zerou de propósito não é
   "recuperado" à força, e quem importou um backup antigo continua com ele. */
function comRedeDeSeguranca(principal){
  const snap = lerSnapshot();
  _pesoSnapshot = snap ? pesoProgresso(snap) : -1;
  if(!snap) return principal || defaultState();
  const pesoAtual = pesoProgresso(principal);
  if(!principal || pesoAtual * 2 < _pesoSnapshot){
    _recuperado = {peso:_pesoSnapshot, anterior:pesoAtual, tinhaPrincipal:!!principal};
    return snap;
  }
  return principal;
}

/* Grava/lê/remove uma chave descartável. Detecta storage indisponível já na
   carga, em vez de deixar o aluno investir uma sessão para descobrir. */
function sondarArmazenamento(){
  const k = STORE_KEY+':sonda';
  try{
    localStorage.setItem(k, '1');
    const voltou = localStorage.getItem(k) === '1';
    localStorage.removeItem(k);
    _falhaEscrita = !voltou;
  }catch(e){ _falhaEscrita = true; }
  return !_falhaEscrita;
}

/* Só recusa gravar quando o blob ilegível é a única cópia que existe. Se a
   quarentena deu certo, a cópia está a salvo e o app volta ao normal. */
function podeGravar(){
  return !(_falhaLeitura && _falhaLeitura.quarentena === 'falhou');
}

/* =====================================================================
   PERDA SILENCIOSA ENTRE JANELAS

   O app pode estar aberto duas vezes ao mesmo tempo: o atalho instalado e
   uma aba do navegador, ou uma aba que o Android manteve viva em segundo
   plano por dias. Cada uma carrega o estado UMA vez, na abertura, e o
   mantém em memória.

   O 'visibilitychange' gravava sem perguntar. Bastava a janela velha voltar
   a ficar visível e depois ser escondida para ela escrever o retrato do dia
   em que foi aberta por cima do progresso real — sem erro, sem aviso, sem
   nada para o aluno ver além do próprio progresso menor.

   Três defesas, da mais barata para a mais cara:

   1. quem não mudou nada não grava. Uma janela ociosa não tem o que
      persistir, e era exatamente ela a que sobrescrevia;
   2. 'rev' cresce a cada gravação, então uma janela sabe se o disco andou
      sem ela — e o evento 'storage' faz a janela ociosa adotar na hora o
      que a outra acabou de salvar;
   3. antes de sobrescrever um disco mais novo (caso em que as duas janelas
      trabalharam de verdade e não há como fundir), o blob mais novo vai
      para CONFLITO_KEY em vez de evaporar.

   Independente disso, SNAP_KEY guarda a última cópia boa: se o principal
   sumir ou voltar muito menor do que já foi, a carga restaura e avisa.
   ===================================================================== */

// false enquanto esta janela não mudou nada desde que carregou.
let _mudouDesdeCarga = false;
// {peso, de} quando a carga precisou restaurar a cópia interna.
let _recuperado = null;
let _pesoSnapshot = -1;

/* Medida grosseira de "quanto progresso existe aqui". Só precisa ser
   monotônica no uso normal: serve para reconhecer uma regressão brutal,
   não para comparar dois estados parecidos. */
function pesoProgresso(s){
  if(!s || typeof s!=='object') return 0;
  const n = o => (o && typeof o==='object') ? Object.keys(o).length : 0;
  return (Number(s.xp)||0) + (Number(s.attempts)||0)*10
       + n(s.lessons)*100 + n(s.doneQuiz)*100 + n(s.srs)*20;
}

function lerSnapshot(){
  try{
    const raw = localStorage.getItem(SNAP_KEY);
    if(!raw) return null;
    const lido = readSavedState(raw);
    return lido.ok ? lido.state : null;
  }catch(e){ return null; }
}

/* A cópia interna só avança: nunca é substituída por um estado menor do que
   ela mesma. Quem apaga de propósito (reiniciar, importar) apaga junto.

   A comparação é contra o peso GRAVADO, não contra o que esta janela viu ao
   abrir: uma janela velha tem um _pesoSnapshot velho e, confiando nele,
   rebaixaria a cópia justamente no caso que ela existe para cobrir. Guardar o
   peso numa chave à parte evita reparsear o estado inteiro a cada gravação. */
function atualizarSnapshot(payload){
  try{
    const peso = pesoProgresso(state);
    const gravado = localStorage.getItem(SNAP_KEY) ? Number(localStorage.getItem(SNAP_PESO_KEY)) : -1;
    if(isFinite(gravado) && peso < gravado) return;
    localStorage.setItem(SNAP_KEY, payload);
    localStorage.setItem(SNAP_PESO_KEY, String(peso));
    _pesoSnapshot = peso;
  }catch(e){ /* cota: o principal é que importa, a cópia é luxo */ }
}

function esquecerSnapshot(){
  try{
    localStorage.removeItem(SNAP_KEY);
    localStorage.removeItem(SNAP_PESO_KEY);
    localStorage.removeItem(CONFLITO_KEY);
  }catch(e){}
  _pesoSnapshot = -1;
}

function revNoDisco(){
  try{ return Number(localStorage.getItem(REV_KEY)) || 0; }catch(e){ return 0; }
}

// true quando outra janela gravou depois que esta carregou.
function discoMaisNovo(){
  return revNoDisco() > (Number(state.rev)||0);
}

/* Guarda o blob que está prestes a ser sobrescrito por uma janela que também
   trabalhou. Uma chave só, sempre a mais recente — não é histórico, é rede. */
function preservarConflito(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) localStorage.setItem(CONFLITO_KEY, raw);
  }catch(e){}
}

/* Quarentenas antigas são cópias inteiras do estado. Acumuladas, estouram a
   cota e transformam "não consegui ler" em "não consigo mais gravar". */
function limparQuarentenas(manter){
  try{
    const chaves = Object.keys(localStorage)
      .filter(k => k.startsWith(STORE_KEY+':corrompido:'))
      .sort();
    chaves.slice(0, Math.max(0, chaves.length - (manter||2)))
          .forEach(k => localStorage.removeItem(k));
  }catch(e){}
}

let saveTimer=null;
function migrateState(raw){
  if(!raw || typeof raw!=='object' || Array.isArray(raw)) return defaultState();
  const out = Object.assign(defaultState(), raw);
  // objetos aninhados: garante que existam e sejam objetos de verdade
  ['lessons','mastery','topicMastery','doneQuiz','creditC','creditW','miniCredit','miniWrong','srs',
   'selfRate','topicExplain','predCredit','dimensionEvidence','questionHistory'].forEach(k=>{
    if(!out[k] || typeof out[k]!=='object' || Array.isArray(out[k])) out[k]={};
  });
  // números: descarta NaN/Infinity/lixo
  ['xp','attempts','correctTotal','wrongTotal','lastStudiedAt','rev'].forEach(k=>{
    const n=Number(out[k]); out[k] = isFinite(n) && n>=0 ? n : 0;
  });
  if(typeof out.lastModule!=='number' || !MODULES[out.lastModule]) out.lastModule=null;
  if(typeof out.deepMode !== 'boolean') out.deepMode = true;
  out.domain = (typeof normalizeDomainState==='function') ? normalizeDomainState(out.domain) : (out.domain||{});
  /* v4 -> v5: uma caixa por tópico vira uma caixa por tópico × dimensão.
     O registro antigo é preservado inteiro como 'recognition' — ninguém
     perde intervalo conquistado. As outras dimensões não são inventadas:
     nascem só onde já existe evidência gravada de verdade. */
  const saneDim = (d)=>{
    d.box    = Math.max(0, Math.min(SRS_INTERVALS.length-1, Number(d.box)||0));
    d.due    = Number(d.due)||0;
    d.last   = Number(d.last)||0;
    d.reps   = Number(d.reps)||0;
    d.lapses = Number(d.lapses)||0;
    return d;
  };
  Object.keys(out.srs).forEach(k=>{
    const r = out.srs[k];
    if(!r || typeof r!=='object' || Array.isArray(r)){ delete out.srs[k]; return; }
    if(r.dims && typeof r.dims==='object' && !Array.isArray(r.dims)){
      Object.keys(r.dims).forEach(dim=>{
        if(!KNOWLEDGE_DIM_IDS.includes(dim) || !r.dims[dim] || typeof r.dims[dim]!=='object'){ delete r.dims[dim]; return; }
        saneDim(r.dims[dim]);
      });
      r.seededAt = Number(r.seededAt)||0;
      return;
    }
    out.srs[k] = { seededAt: Number(r.last)||0, dims:{ recognition: saneDim(r) } };
  });
  if(typeof migrateDimensionsFromLegacy==='function') migrateDimensionsFromLegacy(out);
  /* Semeia as demais dimensões a partir de dimensionEvidence, que já existe
     desde o v4. Só entra quem tem tentativa real com data: os registros
     semeados por migrateDimensionsFromLegacy têm updatedAt 0 e ficariam
     vencidos desde 1970. Caixa 1 quando a evidência passou, 0 quando não —
     nunca mais que isso, porque evidência retroativa não é intervalo ganho. */
  if(typeof measurableDimensions==='function'){
    Object.keys(out.srs).forEach(k=>{
      const r = out.srs[k];
      const ev = out.dimensionEvidence && out.dimensionEvidence['T:'+k];
      if(!ev) return;
      const parts = splitTopicKey(k);
      measurableDimensions(parts[0], parts[1]).forEach(dim=>{
        if(r.dims[dim]) return;
        const rec = ev[dim];
        const quando = Number(rec && rec.updatedAt)||0;
        if(!rec || !(Number(rec.attempts)>0) || !quando) return;
        const box = Number(rec.score) >= SRS_PASS ? 1 : 0;
        r.dims[dim] = { box: box,
                        due: startOfDay(quando) + SRS_INTERVALS[box]*DAY,
                        last: quando,
                        reps: Math.max(1, Math.round(Number(rec.attempts)||1)),
                        lapses: 0 };
      });
    });
  }
  out.v = STATE_VERSION;
  return out;
}

/* Escreve no localStorage registrando o resultado. O catch antes era vazio, o
   que fazia uma gravação recusada passar como se tivesse dado certo. */
function gravarLocal(payload){
  try{
    localStorage.setItem(STORE_KEY, payload);
    try{ localStorage.setItem(REV_KEY, String(Number(state.rev)||0)); }catch(_){}
    atualizarSnapshot(payload);
    _falhaEscrita = false;
    return true;
  }catch(e){
    _falhaEscrita = true;
    try{ avisoIntegridade(); renderBackupInfo(); }catch(_){}
    return false;
  }
}

/* Serializa o estado marcando a gravação. O 'rev' entra no próprio blob: é
   assim que a outra janela descobre que este é mais novo que o dela. */
function empacotarEstado(){
  // A checagem vem ANTES de incrementar: comparar o rev já incrementado com o
  // do disco empata justamente no caso que interessa. E partir do maior dos
  // dois garante que esta gravação seja reconhecida como a mais nova pela
  // outra janela — um rev que só cresce localmente pode nascer atrasado.
  if(discoMaisNovo()) preservarConflito();
  state.rev = Math.max(Number(state.rev)||0, revNoDisco()) + 1;
  try{ return JSON.stringify(state); }
  catch(e){ return null; }   // circular ou não-serializável: não derruba o handler
}

// grava JÁ, sem esperar o debounce (usado ao fechar o app e no backup)
function saveNow(){
  clearTimeout(saveTimer);
  if(!podeGravar()) return;
  _mudouDesdeCarga = true;
  const payload=empacotarEstado();
  if(payload===null) return;
  gravarLocal(payload);
  try{ if(window.storage && window.storage.set) window.storage.set(STORE_KEY, payload, false); }catch(e){}
}

/* Fechar ou esconder a janela não é motivo para gravar: só é motivo para
   não perder o que ficou pendente. Uma janela que não mudou nada desde que
   carregou não tem nada a persistir — e é justamente ela que, gravando,
   apagaria o trabalho feito na outra. */
function salvarAoSair(){
  if(!_mudouDesdeCarga) return;
  saveNow();
}
window.addEventListener('pagehide', salvarAoSair);
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') salvarAoSair(); });

/* A outra janela acabou de gravar. Se esta aqui não tem trabalho próprio
   pendente, adotar é de graça e elimina a divergência na origem. Se tem, a
   gravação seguinte resolve — e preservarConflito guarda o que for perdido. */
window.addEventListener('storage', function(e){
  if(e.key !== STORE_KEY || !e.newValue) return;
  if(_mudouDesdeCarga) return;
  const lido = readSavedState(e.newValue);
  if(!lido.ok) return;
  if((Number(lido.state.rev)||0) <= (Number(state.rev)||0)) return;
  state = lido.state;
  try{
    lastLevel = levelInfo().num;
    renderHeader();
    renderDashboard();
  }catch(_){}
});

function saveState(){
  clearTimeout(saveTimer);
  if(!podeGravar()) return;
  _mudouDesdeCarga = true;
  saveTimer=setTimeout(async()=>{
    const payload=empacotarEstado();
    if(payload===null) return;
    try{
      if(window.storage && window.storage.set){ await window.storage.set(STORE_KEY, payload, false); }
    }catch(e){}
    gravarLocal(payload);
  },120);
}

/* =====================================================================
   Cálculos
   ===================================================================== */
function topicKey(id, idx){ return id+'-'+idx; }
function topicMastery(id, idx){ return state.topicMastery[topicKey(id,idx)]||0; }
function moduleTopicAverage(m){
  if(!m.lessons.length) return 0;
  let s=0; for(let i=0;i<m.lessons.length;i++) s+=topicMastery(m.id,i);
  return s/m.lessons.length;
}
function moduleProgress(m){
  const total=m.lessons.length;
  let read=0; for(let i=0;i<total;i++) if(state.lessons[m.id+'-'+i]) read++;
  const lf = total? read/total : 0;
  const mastery = state.mastery[m.id]||0;
  const topicAvg = moduleTopicAverage(m);
  return 0.25*lf + 0.35*topicAvg + 0.40*mastery;
}
function shuffleOptions(options, correctIdx){
  const arr = options.map((t,i)=>({text:t, correct:i===correctIdx}));
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp; }
  return arr;
}
function dashboardStats(){
  const totalLessons = MODULES.reduce((a,m)=>a+m.lessons.length,0);
  let readLessons=0, masteredTopics=0;
  for(const m of MODULES){
    for(let i=0;i<m.lessons.length;i++){
      if(state.lessons[m.id+'-'+i]) readLessons++;
      if(topicMastery(m.id,i)>=0.75) masteredTopics++;
    }
  }
  const cx = consolidatedBoxes();
  return { totalLessons, readLessons, masteredTopics, avg:Math.round(overallProgress()*100),
           consolidadas:cx.feitas, caixas:cx.total };
}
/* weakTopics() foi removido aqui na Fase 4: existia desde o começo com ZERO
   chamadores. Era um terceiro ranking de fragilidade que ninguém via, com um
   critério próprio (topicMastery < 0,75, top 3) competindo em silêncio com
   domainWeakTopics. O ranking vivo é aquele. */
/* Quantas caixas do cronograma já estão em intervalo de 14 dias ou mais.
   Responde "quanto do que estudei já está estável na memória" — diferente de
   "quanto percorri" (cobertura) e de "quanto acertei" (mastery). Nenhuma tela
   mostrava isso, e ele só existe por causa do agendamento por dimensão. */
const CAIXA_CONSOLIDADA = 3;   // SRS_INTERVALS[3] = 14 dias
function consolidatedBoxes(){
  let feitas = 0, total = 0;
  Object.keys(state.srs||{}).forEach(k=>{
    const dims = srsDims(k); if(!dims) return;
    Object.keys(dims).forEach(d=>{ total++; if((dims[d].box||0) >= CAIXA_CONSOLIDADA) feitas++; });
  });
  return { feitas: feitas, total: total };
}
function overallProgress(){
  let s=0; for(const m of MODULES) s+=moduleProgress(m); return s/MODULES.length;
}
function levelInfo(){
  const xp=state.xp; let idx=0;
  for(let i=0;i<LEVELS.length;i++) if(xp>=LEVELS[i].min) idx=i;
  const cur=LEVELS[idx], next=LEVELS[idx+1]||null;
  return { idx, num:idx+1, name:cur.name, next,
    frac: next? (xp-cur.min)/(next.min-cur.min) : 1,
    toNext: next? next.min-xp : 0 };
}
function activeVias(){
  // uma via está "ativa" se o módulo tem algum domínio
  let n=0; for(const m of MODULES) if((state.mastery[m.id]||0)>0) n++; return n;
}

/* =====================================================================
   Award XP + feedback visual
   ===================================================================== */
let lastLevel = 1;
function awardXP(amount, ev){
  state.xp += amount;
  if(ev) floatXP(amount, ev);
  const li=levelInfo();
  if(li.num>lastLevel){ showLevelToast(li); }
  lastLevel=li.num;
  saveState();
  renderHeader();
}
function floatXP(amount, ev){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer=document.getElementById('fxlayer');
  const el=document.createElement('div');
  el.className='fx'; el.textContent='+'+amount+' XP';
  let x=window.innerWidth/2, y=window.innerHeight/2;
  try{ const r=ev.currentTarget.getBoundingClientRect(); x=r.left+r.width/2; y=r.top+8; }catch(e){}
  el.style.left=x+'px'; el.style.top=y+'px'; el.style.transform='translateX(-50%)';
  layer.appendChild(el);
  setTimeout(()=>el.remove(),1100);
}
function showLevelToast(li){
  const t=document.getElementById('toast');
  document.getElementById('toast-t').textContent='Nível '+li.num+' · '+li.name;
  document.getElementById('toast-s').textContent = li.next? 'Uma nova via se consolidou.' : 'Você alcançou o nível máximo do percurso.';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3400);
}

/* =====================================================================
   Navegação de views
   ===================================================================== */
wireFigureUI();

function wireAnatA11y(m){
  const A=ANATOMY[m.id]; if(!A) return;
  const svg=document.querySelector('#md-anat svg.anat-svg'); if(!svg) return;
  A.parts.forEach(p=>{
    // uma parte pode ser desenhada em mais de um lugar do diagrama:
    // a 1a vira o ponto focável; as demais ficam clicáveis, mas ocultas ao leitor de tela
    const gs=svg.querySelectorAll('.apart[data-struct="'+p.id+'"]');
    gs.forEach((g,k)=>{
      if(k===0){
        g.setAttribute('tabindex','0'); g.setAttribute('role','button'); g.setAttribute('aria-label',p.label);
        g.removeAttribute('aria-hidden');
      } else {
        g.setAttribute('aria-hidden','true'); g.removeAttribute('tabindex'); g.removeAttribute('role');
      }
    });
  });
}

// Enter/Espaço ativam elementos SVG focáveis (SVG não faz isso nativamente)
document.addEventListener('keydown', function(e){
  if(e.key!=='Enter' && e.key!==' ' && e.key!=='Spacebar') return;
  const t=e.target;
  if(t && t.getAttribute && t.getAttribute('role')==='button' && t.ownerSVGElement!==undefined && t.namespaceURI && t.namespaceURI.indexOf('svg')>-1){
    e.preventDefault();
    t.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
  }
});

let navPop=false;
function go(view){
  /* Sair da revisão desarma o item em curso. Sem isto, um item de Localização
     abandonado no meio deixaria `review.loc` armado, e a delegação global de
     toque em `.apart` — que vale no documento inteiro — passaria a tratar
     como resposta o toque num diagrama dentro do módulo. */
  if(view !== 'review' && typeof review === 'object' && review){ review.loc = null; review.recon = null; }
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const _v=document.getElementById('view-'+view);
  _v.classList.add('active');
  _v.setAttribute('tabindex','-1');
  try{ _v.focus({preventScroll:true}); }catch(e){}
  if(!navPop){ window.scrollTo({top:0,behavior:'smooth'}); try{ history.pushState({nl:true,view:view,mod:currentModule},''); }catch(e){} }
}

// Empilha um estado dedicado para o back do Android fechar o overlay
function pushOverlayState(name){
  if(navPop) return;
  try{ history.pushState({nl:true, overlay:name}, ''); }catch(e){}
}

window.addEventListener('popstate', function(ev){
  const st=ev.state; navPop=true;
  try{
    // Fecha apenas os overlays que NÃO pertencem ao estado destino.
    // Assim, se o zoom fecha via back, o term-modal por baixo não é fechado junto.
    const targetOverlay = st && st.overlay;
    const z=document.getElementById('fig-zoom');
    const t=document.getElementById('term-modal');
    const l=document.getElementById('link-modal');
    if(z && !z.hidden && targetOverlay !== 'fig-zoom'    && typeof closeZoom==='function')      closeZoom(true);
    if(t && !t.hidden && targetOverlay !== 'term-modal' && typeof closeTermModal==='function') closeTermModal(true);
    if(l && !l.hidden && targetOverlay !== 'link-modal' && typeof closeLink==='function')      closeLink(true);
    const sc=document.getElementById('search-modal');
    if(sc && !sc.hidden && targetOverlay !== 'search-modal' && typeof closeSearch==='function') closeSearch(true);
    if(targetOverlay) return;
    if(st && st.nl && st.view==='module' && typeof st.mod==='number' && MODULES[st.mod]){
      // Se o módulo já está ativo (voltamos de um overlay), NÃO reconstruir o DOM:
      // isso destruiria estado inline como aprofundares abertos, focos, etc.
      const vm = document.getElementById('view-module');
      const already = (currentModule === st.mod) && vm && vm.classList.contains('active');
      if(!already) openModule(st.mod);
    }
    else if(st && st.nl && st.view) go(st.view);
    else go('dashboard');
  } finally { navPop=false; }
});
try{ history.replaceState({nl:true,view:'dashboard',mod:null},''); }catch(e){}

/* =====================================================================
   HEADER
   ===================================================================== */
function renderHeader(){
  const li=levelInfo();
  document.getElementById('hd-lname').textContent=li.name;
  document.getElementById('hd-lnum').textContent=li.num;
  document.getElementById('hd-lbadge').textContent=li.num;
  document.getElementById('hd-xp').textContent=state.xp;
  document.getElementById('hd-xpfill').style.width=(li.frac*100)+'%';
  document.getElementById('hd-xpnext').textContent = li.next? (li.toNext+' XP até o nível '+(li.num+1)) : 'Nível máximo atingido';
}

/* =====================================================================
   DASHBOARD
   ===================================================================== */
function buildNodes(){
  const n=MODULES.length, W=340, H=210, padX=34, padTop=40, padBot=40;
  const cols=Math.min(n,5), rows=Math.ceil(n/cols);
  const usableW=W-2*padX, usableH=H-padTop-padBot;
  const colGap=cols>1?usableW/(cols-1):0, rowGap=rows>1?usableH/(rows-1):0, arr=[];
  for(let i=0;i<n;i++){
    const r=Math.floor(i/cols); let c=i%cols;
    if(r%2===1) c=cols-1-c;                 // serpentine: reverse every other row
    const x=padX+(cols>1?c*colGap:usableW/2);
    const y=padTop+(rows>1?r*rowGap:usableH/2);
    arr.push({x:Math.round(x), y:Math.round(y)});
  }
  return arr;
}
function renderContinue(){
  const el=document.getElementById('db-continue'); if(!el) return;
  const i=state.lastModule;
  if(i===null||i===undefined||!MODULES[i]){ el.hidden=true; el.innerHTML=''; return; }
  const m=MODULES[i];
  el.hidden=false;
  el.innerHTML='<button class="continuebtn" onclick="openModule('+i+')">Continuar · Módulo '+m.n+' — '+m.title+'</button>';
}

function renderDashboard(){
  const _mc=document.getElementById('db-modcount'); if(_mc) _mc.textContent=MODULES.length;
  renderContinue();
  // overall
  /* A barra se chama "Progresso geral do percurso" e media
     0,25·aulas + 0,35·mini quiz + 0,40·quiz do módulo — dizia PERCURSO e media
     DESEMPENHO, então dava para ler tudo e ainda ver 60%. Agora mede cobertura,
     que é o que o rótulo sempre prometeu. A mistura continua onde faz sentido:
     nas barras de cada cartão de módulo e no mapa sináptico (moduleProgress). */
  const op=(typeof domainCoverageStats==='function') ? domainCoverageStats().value : overallProgress();
  document.getElementById('db-ofill').style.width=(op*100)+'%';
  document.getElementById('db-opct').textContent=Math.round(op*100)+'%';
  document.getElementById('db-mapstat').textContent=activeVias()+' / '+MODULES.length+' vias ativas';
  renderSynMap();
  renderInsight(op);
  renderDashboardStats();
  renderReview();
  if(typeof renderDomainEntry==='function') renderDomainEntry();
  // cards
  const wrap=document.getElementById('db-cards');
  wrap.innerHTML='';
  MODULES.forEach((m,i)=>{
    const p=moduleProgress(m);
    const mastery=state.mastery[m.id]||0;
    const done=state.doneQuiz[m.id];
    let read=0; for(let k=0;k<m.lessons.length;k++) if(state.lessons[m.id+'-'+k]) read++;
    const btn=document.createElement('button');
    btn.className='card'; btn.style.setProperty('--mc',m.color);
    btn.onclick=()=>openModule(i);
    btn.innerHTML=`
      ${done?'<span class="badge done">melhor '+Math.round(mastery*100)+'%</span>':(p>0?'<span class="badge">em curso</span>':'')}
      <div class="cn">MÓDULO ${m.n}</div>
      <div class="ct">${m.title}</div>
      <div class="cd">${m.tag}</div>
      <div class="cbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p*100)}" aria-label="Progresso do módulo ${m.n}"><i style="width:${p*100}%"></i></div>
      <div class="cmeta"><span>${read}/${m.lessons.length} aulas</span><span><b>${Math.round(p*100)}%</b></span></div>`;
    wrap.appendChild(btn);
  });
}
function renderInsight(op){
  const el=document.getElementById('db-insight');
  const li=levelInfo();
  let msg;
  if(op===0){
    msg='Cada nó é um sistema do cérebro. Conforme você domina um módulo, sua via se ilumina e se conecta à próxima — porque aprender, literalmente, é fortalecer conexões. Comece pelo Módulo 01.';
  }else if(op<0.25){
    msg='As primeiras vias começaram a se acender. Este é o momento em que o hábito ainda depende de esforço consciente — quanto mais consistente o retorno, mais rápido ele se automatiza.';
  }else if(op<0.6){
    msg='O percurso está se consolidando. Note que retomar um teste nunca reduz seu domínio: ele guarda seu melhor resultado, então revisar é sempre ganho, nunca risco.';
  }else if(op<1){
    msg='A maior parte da rede já está ativa. As últimas vias costumam ser as que mais amarram o conjunto — e o sono (Módulo 08) é o que consolida tudo o que veio antes.';
  }else{
    msg='Percurso completo, com todas as vias ativas. Se algum domínio ainda não está em 100%, refazer o teste é a forma mais direta de fechar — e cada acerto reforça o traço.';
  }
  el.textContent=msg;
}
function renderDashboardStats(){
  const st=dashboardStats();
  const el=document.getElementById('db-stats');
  if(!el) return;
  el.innerHTML=`
    <div class="stat"><div class="sl">XP total</div><div class="sv">${state.xp}</div><div class="ss">nível ${levelInfo().num}</div></div>
    <div class="stat"><div class="sl">Aulas estudadas</div><div class="sv">${st.readLessons}/${st.totalLessons}</div><div class="ss">no percurso</div></div>
    <div class="stat"><div class="sl">Tópicos dominados</div><div class="sv">${st.masteredTopics}/${st.totalLessons}</div><div class="ss">gabaritou o mini-quiz</div></div>
    <div class="stat"><div class="sl">Já estável</div><div class="sv">${st.consolidadas}/${st.caixas||0}</div><div class="ss">em intervalo de 14 dias ou mais</div></div>`;
  renderLinkHub();
  const chk=document.getElementById('deep-chk'); if(chk) chk.checked = deepOn();
}
/* =====================================================================
   REPETIÇÃO ESPAÇADA (Leitner expandido: 1 / 3 / 7 / 14 / 30 / 60 / 120 / 240 dias)
   ===================================================================== */
function startOfDay(ts){ const d=new Date(ts); d.setHours(0,0,0,0); return d.getTime(); }
// espalha vencimentos da mesma caixa em ±15% de dias (caixa 0 = 1 dia fica intocada)
function srsJitteredDays(intervalDays){
  if(intervalDays <= 1) return intervalDays;
  const factor = 0.85 + Math.random() * 0.30;
  return Math.max(1, Math.round(intervalDays * factor));
}
/* ---------------------------------------------------------------------
   O cronograma agenda TÓPICO × DIMENSÃO, não o tópico em bloco.

   A mecânica de Leitner abaixo é a mesma de antes — promove quando venceu
   e acertou, rebaixa uma caixa limitada por SRS_LAPSE_CAP quando errou.
   O que mudou foi o endereço: cada dimensão tem sua própria caixa, então
   o que você reconhece bem some do radar enquanto o que você não explica
   continua voltando.

     srs['neuronio-0'] = { seededAt, dims: { recognition:{box,due,…}, … } }

   Uma caixa só existe se measurableDimensions() disser que este tópico tem
   como medir aquela dimensão. Agendar o que não se sabe medir produziria
   uma fila que nada consegue satisfazer.
   --------------------------------------------------------------------- */
function splitTopicKey(key){
  const s = String(key||''), i = s.lastIndexOf('-');
  return i < 0 ? [s, 0] : [s.slice(0,i), Number(s.slice(i+1))||0];
}
function blankDimRecord(){ return { box:0, due:0, last:0, reps:0, lapses:0 }; }
function ensureSrsTopic(key){
  let r = state.srs[key];
  if(!r || typeof r !== 'object' || Array.isArray(r)) r = state.srs[key] = { seededAt:Date.now(), dims:{} };
  if(!r.dims || typeof r.dims !== 'object' || Array.isArray(r.dims)) r.dims = {};
  return r;
}
function srsDims(key){ const r = state.srs[key]; return (r && r.dims) || null; }

function seedTopic(key){
  // aula concluída -> cada dimensão mensurável entra na fila, primeira volta em 1 dia
  const parts = splitTopicKey(key);
  const r = ensureSrsTopic(key);
  let novas = 0;
  measurableDimensions(parts[0], parts[1]).forEach(dim=>{
    if(r.dims[dim]) return;               // não mexe em agendamento existente
    const d = r.dims[dim] = blankDimRecord();
    d.due = startOfDay(Date.now()) + SRS_INTERVALS[0]*DAY;
    d.last = Date.now();
    if(typeof setSrsReason==='function') setSrsReason(d,'first',key,null);
    novas++;
  });
  return novas;
}

function scheduleDimension(key, dim, score){
  if(!KNOWLEDGE_DIM_IDS.includes(dim)) return;
  const parts = splitTopicKey(key);
  if(!canMeasure(parts[0], parts[1], dim)) return;
  if(typeof score === 'boolean') score = score?1:0;
  score = Math.max(0, Math.min(1, Number(score)||0));
  const r = ensureSrsTopic(key);
  const isNew = !r.dims[dim];
  const d = r.dims[dim] || (r.dims[dim] = blankDimRecord());
  const passed = score >= SRS_PASS;
  const wasDue = Date.now() >= (d.due||0);
  d.reps = (d.reps||0)+1;
  d.last = Date.now();
  if(!passed){
    // erro rebaixa UMA caixa (não zera tudo) e reagenda mais cedo
    if((d.box||0) > 0) d.lapses = (d.lapses||0)+1;
    // erro = o intervalo estava longo demais. Cai uma caixa, mas nunca fica acima da caixa de reconstrução.
    d.box = Math.max(0, Math.min((d.box||0)-1, SRS_LAPSE_CAP));
    d.due = startOfDay(Date.now()) + srsJitteredDays(SRS_INTERVALS[d.box])*DAY;
    if(typeof setSrsReason==='function') setSrsReason(d,'lapse',key,score);
  } else if(isNew){
    d.box = 0;
    d.due = startOfDay(Date.now()) + SRS_INTERVALS[0]*DAY;
    if(typeof setSrsReason==='function') setSrsReason(d,'first',key,score);
  } else if(wasDue){
    // só promove quando a revisão estava vencida (treinar antes da hora não avança)
    d.box = Math.min((d.box||0)+1, SRS_INTERVALS.length-1);
    d.due = startOfDay(Date.now()) + srsJitteredDays(SRS_INTERVALS[d.box])*DAY;
    if(typeof setSrsReason==='function') setSrsReason(d,'interval',key,score);
  }
}

function dueTopics(){
  const today = startOfDay(Date.now());
  const list = [];
  MODULES.forEach((m,mi)=>{
    m.lessons.forEach((l,li)=>{
      const key = topicKey(m.id, li);
      const dims = srsDims(key);
      if(!dims) return;
      KNOWLEDGE_DIM_IDS.forEach(dim=>{
        const d = dims[dim];
        if(!d || !(d.due <= today)) return;
        list.push({ mi, li, key, dim, title:l.t, mn:m.n, color:m.color,
                    due:d.due, box:d.box||0, overdue: Math.round((today - d.due)/DAY) });
      });
    });
  });
  list.sort((a,b)=> (a.due - b.due) || (a.box - b.box)
                   || (KNOWLEDGE_DIM_IDS.indexOf(a.dim) - KNOWLEDGE_DIM_IDS.indexOf(b.dim)));
  return list;
}
function nextDueDate(){
  let next = null;
  Object.keys(state.srs||{}).forEach(k=>{
    const dims = srsDims(k); if(!dims) return;
    Object.keys(dims).forEach(dim=>{
      const due = dims[dim].due;
      if(due && (next===null || due<next)) next = due;
    });
  });
  return next;
}
function srsScheduledCount(){
  let n = 0;
  Object.keys(state.srs||{}).forEach(k=>{ const dims = srsDims(k); if(dims) n += Object.keys(dims).length; });
  return n;
}
function seedSrsFromHistory(){
  // início a frio: todo tópico já testado (que tem domínio registrado) entra na fila, vencendo hoje
  const today = startOfDay(Date.now());
  let seeded = 0;
  MODULES.forEach(m=>{
    m.lessons.forEach((l,li)=>{
      const key = topicKey(m.id, li);
      if(!Object.prototype.hasOwnProperty.call(state.topicMastery, key)) return;
      if(srsDims(key) && Object.keys(srsDims(key)).length) return;
      const r = ensureSrsTopic(key);
      measurableDimensions(m.id, li).forEach(dim=>{
        const d = r.dims[dim] = blankDimRecord();
        d.due = today;
        if(typeof setSrsReason==='function') setSrsReason(d,'first',key,null);
        seeded++;
      });
    });
  });
  if(seeded) saveState();
}

function focusCardTop(sel){
  requestAnimationFrame(function(){
    var h=document.querySelector('header.top');
    if(h) document.documentElement.style.setProperty('--hdr-h',h.offsetHeight+'px');
    var c=document.querySelector(sel),r=false;
    try{r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
    var m=r?'auto':'smooth';
    if(c) c.scrollIntoView({block:'start',behavior:m});
    else window.scrollTo({top:0,behavior:m});
  });
}

/* Depois de responder, o que o aluno precisa — a explicação e o que fazer em
   seguida — nasce no fim do card e pode cair abaixo da dobra.

   A medição no CI mostrou folga de apenas 74px no viewport de 360x800. Num
   celular real a barra de endereço do navegador consome isso inteiro, e era o
   que obrigava a rolar a mão para achar o botão.

   block:'nearest' rola o mínimo necessário e não mexe na tela quando o alvo já
   está visível — nas telas maiores nada acontece. O botão que aparece depois da
   auto-avaliação já é tratado pelo focus() em selfRate. */
function revealAfterAnswer(containerId){
  requestAnimationFrame(function(){
    var c=document.getElementById(containerId); if(!c) return;
    var alvo=c.querySelector('.fbnav')||c.querySelector('.selfrate')||c;
    var reduz=false;
    try{ reduz=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
    try{ alvo.scrollIntoView({block:'nearest',behavior:reduz?'auto':'smooth'}); }catch(e){}
  });
}
/* ---- sessão de revisão ---- */
let review = { queue:[], ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
function startReview(){
  const due = dueTopics();
  if(!due.length){ renderDashboard(); return; }
  const queue = due.slice(0, SESSION_CAP);
  review = { queue, ti:0, qi:0, topicQs:[], topicCorrect:0, answered:false, opts:[], results:[] };
  go('review');
  window.scrollTo({top:0,behavior:'smooth'});
  loadReviewTopic();
}
function loadReviewTopic(){
  const t = review.queue[review.ti];
  const m = MODULES[t.mi];
  const todas = (MINI_QUIZZES[m.id] && MINI_QUIZZES[m.id][t.li]) || [];
  review.recon = null; review.loc = null;
  /* Localização é medida apontando no diagrama, quando o tópico tem termo
     ancorado a uma parte dele. Dois tópicos medem Localização só por
     mini-questão e caem no caminho de múltipla escolha, abaixo. A âncora
     rotaciona por `reps`: o tópico cobra um termo diferente a cada volta,
     sem campo novo no estado. */
  if(t.dim === 'location'){
    const ancoras = (typeof locationAnchorsOf==='function') ? locationAnchorsOf(m.id, t.li) : [];
    if(ancoras.length){
      const reps = ((srsDims(t.key)||{}).location||{}).reps || 0;
      const a = ancoras[reps % ancoras.length];
      review.loc = { term:a.term, part:a.part, anatId:m.id, answered:false, chosen:null };
      review.topicQs = []; review.qi = 0; review.topicCorrect = 0;
      if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
      renderReviewHead();
      renderReviewLocation();
      return;
    }
  }
  /* Explicação causal não é medida por alternativa: o item vira reconstrução
     da cadeia. Ver renderReviewReconstruction. */
  const cadeia = chainDoTopico(m.id, t.li);
  if(t.dim === 'causality' && cadeia){
    review.recon = { chain:cadeia, available:chainShuffle(cadeia, t.key),
                     selected:[], result:null, revealed:false };
    review.topicQs = []; review.qi = 0; review.topicCorrect = 0;
    if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
    renderReviewHead();
    renderReviewReconstruction();
    return;
  }
  // o item da fila é uma DIMENSÃO: só entram as perguntas que medem aquilo.
  // Volta mais curta e mais específica do que revisar o tópico em bloco.
  let qs;
  if(t.dim === 'application'){
    qs = applicationBank(m, t.li, t.key);
  } else {
    /* Inclui a questão do quiz de módulo que declara esta aula: sem isso, um
       tópico cuja única fonte daquela dimensão é o quiz de módulo teria caixa
       e nenhuma pergunta para satisfazê-la. */
    const doModulo = (m.quiz||[]).filter(q=>q.l===t.li
      && inferQuestionDimension(q,{module:m, source:'module'}) === t.dim);
    qs = todas.filter(q=>inferQuestionDimension(q,{module:m, lessonIndex:t.li, source:'review'}) === t.dim)
              .concat(doModulo);
  }
  if(!qs.length) qs = todas;
  if(typeof orderReviewQuestions==='function') qs = orderReviewQuestions(qs, t.key);
  review.topicQs = qs; review.qi = 0; review.topicCorrect = 0;
  if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
  if(!qs.length){ advanceReviewTopic(); return; }
  renderReviewHead();
  renderReviewQuestion();
}
function advanceReviewTopic(){
  saveState();
  if(review.ti+1 < review.queue.length){ review.ti++; loadReviewTopic(); }
  else finishReview();
}
function renderReviewHead(){
  const t = review.queue[review.ti]; const m = MODULES[t.mi];
  document.documentElement.style.setProperty('--mc', m.color);
  const frac = review.ti / review.queue.length;
  document.getElementById('rv-head').innerHTML = `
    <div class="rv-kick">Revisão espaçada · ${review.ti+1} de ${review.queue.length} · ${dimMeta(t.dim).label}</div>
    <div class="rv-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(frac*100)}" aria-label="Progresso da revisão"><i style="width:${frac*100}%"></i></div>`;
}
function renderReviewQuestion(){
  const t = review.queue[review.ti]; const m = MODULES[t.mi];
  const qs = review.topicQs; const q = qs[review.qi];
  review.answered=false;
  review.opts = shuffleOptions(q.o, q.c);
  const letters=['A','B','C','D','E'];
  document.getElementById('rv-body').innerHTML = `
    <div class="miniquiz-card rv-card">
      <div class="mq-k">Módulo ${m.n} · ${t.title} · ${review.qi+1}/${qs.length}${lvlChip(q)}${dimensionChipHTML(q,{source:'review'})}</div>
      <h4>${q.q}</h4>
      <div class="mq-options">
        ${review.opts.map((op,k)=>`<button data-k="${k}" onclick="answerReview(${k})"><span class="mk">${letters[k]}</span><span>${op.text}</span></button>`).join('')}
      </div>
      <div class="mq-feedback" id="rv-fb" aria-live="polite"></div>
    </div>`;
  focusCardTop('#rv-body .rv-card');
}
function answerReview(k){
  if(review.answered) return; review.answered=true;
  const q = review.topicQs[review.qi];
  const chosen = review.opts[k]; const right = chosen.correct;
  document.querySelectorAll('#rv-body .mq-options button').forEach(btn=>{
    const kk=+btn.dataset.k; btn.disabled=true;
    if(review.opts[kk].correct) btn.classList.add('correct');
    else if(kk===k) btn.classList.add('wrong');
  });
  if(right) review.topicCorrect++;
  if(typeof recordDimensionEvidence==='function'){
    const t=review.queue[review.ti];
    const dim=inferQuestionDimension(q,{source:'review'});
    // a previsão carrega a própria origem, para dar para separar na telemetria
    // depois o que veio de banco de revisão e o que veio de prova de previsão
    const fonte = q._source || 'review';
    const qid = q._source==='prediction'
      ? 'RP:'+t.key
      : 'R:'+t.key+':'+(q._reviewIndex!==undefined?q._reviewIndex:review.qi);
    recordDimensionEvidence(topicScope(t.key),dim,right?1:0,fonte,{questionId:qid});
  }
  state.attempts=(state.attempts||0)+1;
  if(right){ state.correctTotal=(state.correctTotal||0)+1; } else { state.wrongTotal=(state.wrongTotal||0)+1; }
  const last = review.qi+1 >= review.topicQs.length;
  const lastTopic = review.ti+1 >= review.queue.length;
  const fb = document.getElementById('rv-fb');
  fb.innerHTML = `<div class="mq-verd" style="color:${right?'var(--good)':'var(--bad)'}">${right?'✓ Lembrou':'✕ Escapou'}${right?' · +'+XP.review+' XP':''}</div><p>${right?q.er:q.ew}</p>
    <div class="fbnav"><button class="bigbtn" onclick="nextReview()">${!last?'Próxima':(lastTopic?'Concluir revisão':'Próximo tópico')}</button></div>`;
  if(typeof linkGlossaryTerms === 'function') linkGlossaryTerms(fb);
  if(right) awardXP(XP.review, {currentTarget:fb}); else saveState();
  revealAfterAnswer('rv-fb');
}
/* =====================================================================
   RECONSTRUÇÃO DA CADEIA NA REVISÃO

   O item de Explicação causal deixa de ser múltipla escolha e passa a pedir
   a sequência de CHAIN remontada na ordem. É a prova mais exigente do app,
   porque não existe alternativa para reconhecer — ou a dependência entre as
   etapas está no lugar, ou não está.

   O estado mora no próprio objeto `review`, não num slot global. O Modo
   Domínio usa um slot único em DOMAIN_SESSION e por isso só consegue ter
   uma reconstrução viva por vez; a sessão de revisão já é uma máquina de
   estado com fila, e um segundo global seria a mesma armadilha.
   ===================================================================== */
function chainDoTopico(moduleId, lessonIndex){
  const c = (typeof CHAIN!=='undefined' && CHAIN[moduleId] && CHAIN[moduleId][lessonIndex]) || null;
  return (c && Array.isArray(c.s) && c.s.length >= 4) ? c.s : null;
}
function renderReviewReconstruction(){
  const t = review.queue[review.ti];
  const r = review.recon; if(!r) return;
  const escolhidos = r.selected.map((pos,i)=>`<li><b>${i+1}</b><span>${escHtml(r.available[pos].text)}</span></li>`).join('');
  const travado = r.result!==null || r.revealed;
  const pool = r.available.map((entry,pos)=>
    `<button type="button" ${r.selected.includes(pos)||travado?'disabled':''} onclick="pickReviewChainStep(${pos})"><b>+</b><span>${escHtml(entry.text)}</span></button>`).join('');

  let fecho = '';
  if(r.result===1){
    fecho = `<div class="dm-reconstruct-result right"><b>✓ Você remontou o mecanismo sem alternativas.</b>
      <p>Isso é diferente de reconhecer a resposta certa: você reproduziu de qual etapa cada uma depende.</p>
      <button class="bigbtn" onclick="nextReview()">Continuar</button></div>`;
  } else if(r.result===0){
    fecho = `<div class="dm-reconstruct-result wrong"><b>✕ A ordem ainda não fecha causalmente.</b>
      <p>Procure qual etapa depende de outra antes de reorganizar.</p>
      <button class="bigbtn ghost" onclick="resetReviewReconstruction()">Reorganizar os passos</button>
      <button class="dm-reveal-link" onclick="revealReviewChain()">não estou conseguindo — ver a cadeia</button>
      <button class="bigbtn" onclick="nextReview()">Continuar</button></div>`;
  }
  if(r.revealed){
    fecho = `<div class="dm-reconstruct-result revealed"><b>A cadeia correta</b>
      <ol class="dm-selected-chain">${r.chain.map((s,i)=>`<li><b>${i+1}</b><span>${escHtml(s)}</span></li>`).join('')}</ol>
      <p>Ver não é reconstruir: este item continua vencido e volta para você refazer sem ajuda. Leia procurando de qual etapa cada uma depende.</p>
      <button class="bigbtn" onclick="nextReview()">Continuar</button></div>`;
  }

  document.getElementById('rv-body').innerHTML = `
    <div class="miniquiz-card rv-card">
      <div class="mq-k">Módulo ${t.mn} · ${t.title} · ${dimMeta(t.dim).label}</div>
      <div class="dm-reconstruct">
        <div class="dm-reconstruct-head"><span>RECONSTRUÇÃO SEM ALTERNATIVAS</span>
          <h4>Toque nas etapas na ordem causal.</h4>
          <p>Não há alternativa para reconhecer: o teste é montar a sequência usando só os componentes dela.</p></div>
        <ol class="dm-selected-chain">${escolhidos||'<li class="placeholder">A sequência aparecerá aqui.</li>'}</ol>
        <div class="dm-chain-pool">${pool}</div>
        ${r.selected.length && !travado ? `<button class="dm-undo" onclick="undoReviewChainStep()">← desfazer última etapa</button>
        <button class="dm-reveal-link" onclick="revealReviewChain()">não estou conseguindo — ver a cadeia</button>`:''}
        <div class="mq-feedback" id="rv-fb" aria-live="polite">${fecho}</div>
      </div>
    </div>`;
  focusCardTop('#rv-body .rv-card');
}
function pickReviewChainStep(pos){
  const r = review.recon;
  if(!r || r.result!==null || r.revealed) return;   // ver a cadeia trava o pool
  pos = Number(pos);
  if(!r.available[pos] || r.selected.includes(pos)) return;
  r.selected.push(pos);
  if(r.selected.length === r.available.length) checkReviewReconstruction();
  else renderReviewReconstruction();
}
function undoReviewChainStep(){
  const r = review.recon;
  if(!r || !r.selected.length || r.result!==null || r.revealed) return;
  r.selected.pop();
  renderReviewReconstruction();
}
function resetReviewReconstruction(){
  const r = review.recon; if(!r || r.revealed) return;
  r.selected = []; r.result = null;
  renderReviewReconstruction();
}
/* Saída para quem travou. Ver NÃO conta como reconstruir: não grava evidência
   e não agenda nada, então o item continua vencido e volta. Ficar tentando
   permutação atrás de permutação não ensina — é o oposto do que a atividade
   treina. */
function revealReviewChain(){
  const r = review.recon;
  if(!r || r.result===1 || r.revealed) return;
  r.revealed = true;
  renderReviewReconstruction();
  revealAfterAnswer('rv-fb');   // idem: quem desiste também precisa alcançar o botão
}
function checkReviewReconstruction(){
  const t = review.queue[review.ti], r = review.recon; if(!r) return;
  const certo = chainIsCorrect(r.selected.map(pos=>r.available[pos].text), r.chain);
  r.result = certo ? 1 : 0;
  state.attempts = (state.attempts||0)+1;
  if(certo){ state.correctTotal = (state.correctTotal||0)+1; } else { state.wrongTotal = (state.wrongTotal||0)+1; }
  recordDimensionEvidence(topicScope(t.key), 'causality', certo?1:0, 'reconstruction', {questionId:'RC:'+t.key});
  if(certo) awardXP(XP.review, null); else saveState();
  renderReviewReconstruction();
  /* Traz o resultado para a dobra. O cartão da reconstrução passa de 1000px —
     a lista montada mais o pool inteiro —, então o botão de continuar nascia
     fora da tela em TODOS os viewports de celular: medido, 512px abaixo num
     360x620 e 97px abaixo até num 430x932. A múltipla escolha já fazia isso
     desde sempre; as formas novas não faziam. */
  revealAfterAnswer('rv-fb');
}

/* =====================================================================
   LOCALIZAÇÃO NA REVISÃO — apontar no diagrama

   O item mostra o termo e o diagrama do módulo, e pede o toque na estrutura
   onde aquele termo age. A legenda de partes fica de fora de propósito: ela
   nomeia cada uma e entregaria a resposta.

   O mapeamento termo -> parte já existia em CONTEXT_TOPIC_TERMS para
   explicar "onde este termo entra no mecanismo". Nunca tinha sido cobrado.
   ===================================================================== */
function renderReviewLocation(){
  const t = review.queue[review.ti], L = review.loc; if(!L) return;
  const A = ANATOMY[L.anatId] || {};
  const parte = (A.parts||[]).find(p=>p.id===L.part) || {label:L.part};
  let fecho = '';
  if(L.answered){
    const certa = L.chosen === L.part;
    const escolhida = (A.parts||[]).find(p=>p.id===L.chosen);
    fecho = `<div class="mq-verd" style="color:${certa?'var(--good)':'var(--bad)'}">${certa?'✓ É ali'+' · +'+XP.review+' XP':'✕ Não é ali'}</div>
      <p>${certa
        ? `<strong>${escHtml(L.term)}</strong> age em <strong>${escHtml(parte.label)}</strong>.`
        : `Você apontou ${escolhida?'<strong>'+escHtml(escolhida.label)+'</strong>':'outra estrutura'}. <strong>${escHtml(L.term)}</strong> age em <strong>${escHtml(parte.label)}</strong>.`}
        ${parte.blurb?' '+parte.blurb:''}</p>
      <div class="fbnav"><button class="bigbtn" onclick="nextReview()">Continuar</button></div>`;
  }
  document.getElementById('rv-body').innerHTML = `
    <div class="miniquiz-card rv-card">
      <div class="mq-k">Módulo ${t.mn} · ${t.title} · ${dimMeta(t.dim).label}</div>
      <h4>Onde <strong>${escHtml(L.term)}</strong> age?</h4>
      <p class="rmeta">Toque a estrutura no diagrama.</p>
      <div class="anat-stage" id="rv-anat">${A.svg||''}</div>
      <div class="mq-feedback" id="rv-fb" aria-live="polite">${fecho}</div>
    </div>`;
  if(L.answered) highlightAnatEverywhere(L.anatId, L.part);
  focusCardTop('#rv-body .rv-card');
}
function answerReviewLocation(partId){
  const L = review.loc; if(!L || L.answered) return;
  const t = review.queue[review.ti];
  L.answered = true; L.chosen = partId;
  const certa = partId === L.part;
  state.attempts = (state.attempts||0)+1;
  if(certa){ state.correctTotal = (state.correctTotal||0)+1; } else { state.wrongTotal = (state.wrongTotal||0)+1; }
  recordDimensionEvidence(topicScope(t.key), 'location', certa?1:0, 'diagram', {questionId:'RL:'+t.key+':'+L.part});
  if(certa) awardXP(XP.review, null); else saveState();
  renderReviewLocation();
  revealAfterAnswer('rv-fb');   // o cartão embute o SVG inteiro; sem isto o botão fica fora da dobra
}

function nextReview(){
  if(review.loc){
    const t = review.queue[review.ti], L = review.loc;
    const agendadas = (typeof commitEvidenceBatch==='function') ? commitEvidenceBatch() : [];
    if(L.answered){
      if(!agendadas.some(a=>a.key===t.key && a.dim===t.dim)) scheduleDimension(t.key, t.dim, L.chosen===L.part?1:0);
      const rec = (srsDims(t.key)||{})[t.dim] || {box:0};
      review.results.push({ key:t.key, title:t.title, mn:t.mn, color:t.color, dim:t.dim,
                            passed:L.chosen===L.part, box:rec.box||0 });
    }
    review.loc = null;
    advanceReviewTopic();
    return;
  }
  if(review.recon){
    /* Reconstrução: uma tentativa por item, sem `topicQs`. Quem viu a cadeia
       sai sem resultado — e sem agendamento, para o item continuar vencido. */
    const t = review.queue[review.ti];
    const r = review.recon;
    const agendadas = (typeof commitEvidenceBatch==='function') ? commitEvidenceBatch() : [];
    if(r.result!==null && !agendadas.some(a=>a.key===t.key && a.dim===t.dim)){
      scheduleDimension(t.key, t.dim, r.result);
    }
    if(r.result!==null){
      const rec = (srsDims(t.key)||{})[t.dim] || {box:0};
      review.results.push({ key:t.key, title:t.title, mn:t.mn, color:t.color, dim:t.dim,
                            passed:r.result===1, box:rec.box||0 });
    }
    review.recon = null;
    advanceReviewTopic();
    return;
  }
  if(review.qi+1 < review.topicQs.length){ review.qi++; renderReviewQuestion(); return; }
  const t = review.queue[review.ti];
  const score = review.topicQs.length? review.topicCorrect/review.topicQs.length : 0;
  const passed = review.topicCorrect === review.topicQs.length && review.topicQs.length>0;
  state.topicMastery[t.key] = Math.max(state.topicMastery[t.key]||0, score);
  if(!passed) state.miniWrong[t.key] = (state.miniWrong[t.key]||0)+1;
  const agendadas = (typeof commitEvidenceBatch==='function') ? commitEvidenceBatch() : [];
  /* Se as perguntas disponíveis mediam outra dimensão (só acontece no
     fallback), a caixa DESTE item ainda precisa andar — senão ela vence de
     novo amanhã, e de novo, para sempre. */
  if(!agendadas.some(a=>a.key===t.key && a.dim===t.dim)) scheduleDimension(t.key, t.dim, passed?1:0);
  const rec = (srsDims(t.key)||{})[t.dim] || {box:0};
  review.results.push({ key:t.key, title:t.title, mn:t.mn, color:t.color, dim:t.dim, passed, box: rec.box||0 });
  advanceReviewTopic();
}
function finishReview(){
  const promoted = review.results.filter(r=>r.passed).length;
  const total = review.results.length;
  const nd = nextDueDate();
  const days = nd? Math.max(0, Math.round((nd - startOfDay(Date.now()))/DAY)) : null;
  document.documentElement.style.setProperty('--mc','#22d3ee');
  document.getElementById('rv-head').innerHTML='';
  const rows = review.results.map(r=>`
    <div class="review-item">
      <span style="display:flex;align-items:center;gap:9px;min-width:0"><span class="rdot" style="color:${r.color};background:${r.color}"></span><span style="min-width:0"><b>Módulo ${r.mn}</b> · ${r.title}<br><span class="rmeta">${dimMeta(r.dim).label}</span></span></span>
      <span class="rmeta">${r.passed? 'avançou · '+SRS_INTERVALS[r.box]+'d' : 'volta em '+SRS_INTERVALS[r.box]+'d'}</span>
    </div>`).join('');
  document.getElementById('rv-body').innerHTML = `
    <div class="rv-summary">
      <div class="rv-badge">✓</div>
      <h2>Revisão concluída</h2>
      <p><b>${promoted}</b> de <b>${total}</b> avançaram no cronograma.${days!=null? ' Próxima revisão em <b>'+days+' dia'+(days!==1?'s':'')+'</b>.':''}</p>
      <div class="review-list rv-results">${rows}</div>
      <button class="bigbtn" style="--mc:#22d3ee" onclick="backToMap()">Voltar ao mapa</button>
    </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
  saveState();
}

function renderReview(){
  const el = document.getElementById('db-review');
  if(!el) return;
  if(srsScheduledCount() === 0){ el.style.display='none'; return; }
  el.style.display='block';
  const due = dueTopics();
  if(due.length === 0){
    const nd = nextDueDate();
    const days = nd? Math.max(0, Math.round((nd - startOfDay(Date.now()))/DAY)) : null;
    el.innerHTML = `<h3>Revisão espaçada</h3><p>Nada vence hoje.${days!=null? ' Próxima revisão em <b>'+days+' dia'+(days!==1?'s':'')+'</b>.':''} Voltar cedo demais rende menos que voltar no ponto de esquecer — o cronograma cuida disso.</p>`;
    el.innerHTML += `<button class="dm-list-link" onclick="openDomainMode()">Ver o diagnóstico completo no Modo Domínio →</button>`;
    return;
  }
  const sessionCount = Math.min(due.length, SESSION_CAP);
  const overflow = Math.max(0, due.length - SESSION_CAP);
  const previewCount = Math.min(sessionCount, 5);
  const items = due.slice(0, previewCount).map(d=>`
    <div class="review-item">
      <div style="display:flex;align-items:center;gap:10px;min-width:0">
        <span class="rdot" style="color:${d.color};background:${d.color}"></span>
        <span style="min-width:0"><b>Módulo ${d.mn}</b> · ${d.title} — <b>${dimMeta(d.dim).label}</b><br><span class="rmeta">${d.overdue>0? 'atrasado '+d.overdue+' dia'+(d.overdue!==1?'s':'') : 'vence hoje'} · intervalo atual ${SRS_INTERVALS[d.box]}d</span><span class="rwhy">${typeof reviewReasonText==='function'?reviewReasonText(d):''}</span></span>
      </div>
    </div>`).join('');
  let more = '';
  if(sessionCount > previewCount){
    more += `<div class="rmeta" style="margin-top:9px;padding-left:2px">+ ${sessionCount-previewCount} outro(s) na fila</div>`;
  }
  if(overflow > 0){
    more += `<div class="rmeta" style="margin-top:5px;padding-left:2px;opacity:.75">faltam ${overflow} para a próxima sessão</div>`;
  }
  /* O letreiro mostra a SESSÃO, não a fila inteira. Agendar por dimensão
     multiplica a fila por ~3 sem aumentar o trabalho do dia — cada item
     agora tem cerca de uma pergunta, onde antes o tópico trazia três. O
     excedente continua declarado logo abaixo, em `more`. */
  /* Uma porta só: com cronograma ativo, a entrada do Modo Domínio vira um
     rodapé deste cartão em vez de um segundo cartão logo abaixo dizendo
     coisa parecida. O cartão cheio de entrada continua existindo para quem
     ainda não tem nada agendado — ver renderDomainEntry. */
  const portaDominio = `<button class="dm-list-link" onclick="openDomainMode()">Ver o diagnóstico completo no Modo Domínio →</button>`;
  el.innerHTML = `<h3>Revisão de hoje <span class="rcount">${sessionCount}</span></h3><p>Cada item é um tipo de saber sobre um tópico, não o tópico inteiro. O que você reconhece bem sai do radar por semanas; o que você não explica volta em dias — cada um no seu próprio ritmo.</p><div class="review-list">${items}</div>${more}<button class="bigbtn rv-start" onclick="startReview()">Revisar agora · ${sessionCount} ${sessionCount===1?'item':'itens'}</button>${portaDominio}`;
}
function reviewTopic(mi,li){
  openModule(mi);
  setTimeout(()=>startMiniQuiz(li), 140);
}
function renderSynMap(){
  const svg=document.getElementById('synmap');
  const NODES=buildNodes();
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let s='';
  // connections (path of the course): i -> i+1, active if module i has mastery
  for(let i=0;i<NODES.length-1;i++){
    const a=NODES[i], b=NODES[i+1];
    const on=(state.mastery[MODULES[i].id]||0)>0 && (state.mastery[MODULES[i+1].id]||0)>=0;
    const bothOn=(state.mastery[MODULES[i].id]||0)>0;
    const col=MODULES[i].hex;
    s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${bothOn?col:'#20203050'}" stroke-width="${bothOn?2:1.2}" stroke-linecap="round" opacity="${bothOn?0.8:0.5}"/>`;
    if(bothOn && !reduce){
      s+=`<circle r="2.4" fill="${col}"><animateMotion dur="2.6s" repeatCount="indefinite" path="M${a.x},${a.y} L${b.x},${b.y}"/><animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite"/></circle>`;
    }
  }
  // faint background web
  const web=[]; for(let i=0;i<NODES.length;i++)for(let j=i+2;j<NODES.length;j++){const dx=NODES[i].x-NODES[j].x,dy=NODES[i].y-NODES[j].y;if(dx*dx+dy*dy<=74*74)web.push([i,j]);}
  web.forEach(([i,j])=>{ const a=NODES[i],b=NODES[j]; s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#1a1a2820" stroke-width="1"/>`; });
  // nodes
  NODES.forEach((nd,i)=>{
    const m=MODULES[i];
    const mastery=state.mastery[m.id]||0;
    const prog=moduleProgress(m);
    const col=m.hex;
    const R=15;
    const fillR = 4 + prog*(R-4);
    const active = mastery>0;
    // outer ring
    s+=`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="#0f0f18" stroke="${active?col:'#2a2a3e'}" stroke-width="${active?2:1.4}"/>`;
    // progress fill (radial)
    if(prog>0){
      s+=`<circle cx="${nd.x}" cy="${nd.y}" r="${fillR}" fill="${col}" opacity="${0.22+prog*0.5}"/>`;
    }
    if(active && !reduce){
      s+=`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="none" stroke="${col}" stroke-width="1" opacity="0.5" class="pulse"><animate attributeName="r" values="${R};${R+5};${R}" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/></circle>`;
    }
    // number
    s+=`<text x="${nd.x}" y="${nd.y+3.5}" text-anchor="middle" font-family="'IBM Plex Mono',monospace" font-size="10" font-weight="600" fill="${prog>0.55?'#0a0a10':(active?col:'#7a7a92')}">${m.n}</text>`;
    // hit area
    s+=`<circle class="node-hit" cx="${nd.x}" cy="${nd.y}" r="${R+6}" fill="transparent" tabindex="0" role="button" aria-label="Módulo ${m.n}: ${m.title}" onclick="openModule(${i})"><title>${m.title}</title></circle>`;
  });
  svg.innerHTML=s;
}

/* =====================================================================
   MODULE VIEW
   ===================================================================== */
let currentModule=0;
/* =====================================================================
   ANATOMIA VISUAL (SVG) — uma ilustração por módulo, com partes tocáveis
   ===================================================================== */
const ANATOMY = {

  /* ---------- M1 · O NEURÔNIO ---------- */
  neuronio: {
    title: 'O neurônio',
    caption: 'Toque numa parte para ver o que é e onde fica.',
    parts: [
      {id:'dendritos', label:'Dendritos', blurb:'Ramos que recebem sinais de outros neurônios e os conduzem em direção ao corpo celular.'},
      {id:'soma', label:'Corpo celular (soma)', blurb:'Centro metabólico da célula. Integra todos os sinais recebidos e decide se dispara.'},
      {id:'nucleo', label:'Núcleo', blurb:'Guarda o DNA e comanda a síntese de proteínas — passo essencial para a memória de longo prazo (Kandel).'},
      {id:'axonio', label:'Axônio', blurb:'Cabo que leva o potencial de ação, sempre do corpo celular em direção aos terminais.'},
      {id:'mielina', label:'Bainha de mielina', blurb:'Camada isolante em segmentos. Faz o sinal "saltar" de nó em nó, acelerando muito a condução.'},
      {id:'terminais', label:'Terminais axônicos', blurb:'Pontas finais que liberam neurotransmissores para o próximo neurônio, na sinapse.'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Neurônio">
      <g class="apart" data-anat="neuronio" data-struct="dendritos">
        <path d="M95 90 L44 58 M58 58 L44 58 L40 45 M95 100 L34 100 M50 100 L34 100 L26 91 M97 112 L46 148 M46 133 L46 148 L33 152 M96 78 L58 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g class="apart" data-anat="neuronio" data-struct="soma">
        <circle cx="120" cy="100" r="32" fill="currentColor" fill-opacity=".13" stroke="currentColor" stroke-width="2.4"/>
      </g>
      <g class="apart" data-anat="neuronio" data-struct="nucleo">
        <circle cx="120" cy="100" r="12" fill="currentColor" fill-opacity=".5" stroke="currentColor" stroke-width="1.3"/>
      </g>
      <g class="apart" data-anat="neuronio" data-struct="axonio">
        <line x1="152" y1="100" x2="320" y2="100" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      </g>
      <g class="apart" data-anat="neuronio" data-struct="mielina">
        <ellipse cx="188" cy="100" rx="17" ry="10" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.8"/>
        <ellipse cx="230" cy="100" rx="17" ry="10" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.8"/>
        <ellipse cx="272" cy="100" rx="17" ry="10" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.8"/>
      </g>
      <g class="apart" data-anat="neuronio" data-struct="terminais">
        <path d="M320 100 L350 82 M320 100 L356 100 M320 100 L350 118" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="352" cy="80" r="4.5" fill="currentColor" fill-opacity=".6" stroke="currentColor" stroke-width="1.1"/>
        <circle cx="360" cy="100" r="4.5" fill="currentColor" fill-opacity=".6" stroke="currentColor" stroke-width="1.1"/>
        <circle cx="352" cy="120" r="4.5" fill="currentColor" fill-opacity=".6" stroke="currentColor" stroke-width="1.1"/>
      </g>
      <text x="14" y="38">Dendritos</text>
      <text x="120" y="160" text-anchor="middle">Corpo celular</text>
      <text x="230" y="132" text-anchor="middle">Mielina</text>
      <text x="356" y="140" text-anchor="middle">Terminais</text>
    </svg>`
  },

  /* ---------- M2 · PLASTICIDADE E MEMÓRIA (sinapse + hipocampo) ---------- */
  plasticidade: {
    title: 'A sinapse e o hipocampo',
    caption: 'Toque numa estrutura para ver o que é e onde fica.',
    parts: [
      {id:'pre', label:'Terminal pré-sináptico', blurb:'Lado que envia. Quando o sinal chega, libera neurotransmissores na fenda.'},
      {id:'vesiculas', label:'Vesículas', blurb:'Bolsas que armazenam os neurotransmissores até o momento da liberação.'},
      {id:'fenda', label:'Fenda sináptica', blurb:'Espaço minúsculo (dezenas de nanômetros) entre os dois neurônios, atravessado pelos neurotransmissores.'},
      {id:'receptores', label:'Receptores', blurb:'Encaixam os neurotransmissores no lado receptor. A LTP fortalece justamente essa transmissão.'},
      {id:'pos', label:'Membrana pós-sináptica', blurb:'Lado que recebe. Repetição e atividade simultânea deixam essa conexão mais eficiente (regra de Hebb).'},
      {id:'hipocampo', label:'Hipocampo', blurb:'Estrutura em forma de cavalo-marinho no lobo temporal. Codifica e indexa memórias declarativas antes da consolidação cortical.'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Sinapse e hipocampo">
      <g class="apart" data-anat="plasticidade" data-struct="pre">
        <path d="M78 104 L78 66 Q78 40 140 40 Q202 40 202 66 L202 104 Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="2.2"/>
      </g>
      <g class="apart" data-anat="plasticidade" data-struct="vesiculas">
        <circle cx="112" cy="90" r="6" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="1"/>
        <circle cx="140" cy="84" r="6" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="1"/>
        <circle cx="168" cy="90" r="6" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="1"/>
        <circle cx="128" cy="70" r="6" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="1"/>
        <circle cx="155" cy="70" r="6" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="1"/>
      </g>
      <g class="apart" data-anat="plasticidade" data-struct="fenda">
        <rect x="78" y="104" width="124" height="20" fill="currentColor" fill-opacity=".04"/>
        <circle cx="116" cy="116" r="3" fill="currentColor" fill-opacity=".75"/>
        <circle cx="140" cy="119" r="3" fill="currentColor" fill-opacity=".75"/>
        <circle cx="166" cy="115" r="3" fill="currentColor" fill-opacity=".75"/>
      </g>
      <g class="apart" data-anat="plasticidade" data-struct="receptores">
        <path d="M110 124 L110 116 L122 116 L122 124 M134 124 L134 116 L146 116 L146 124 M158 124 L158 116 L170 116 L170 124" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </g>
      <g class="apart" data-anat="plasticidade" data-struct="pos">
        <rect x="74" y="124" width="132" height="9" rx="2" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
      </g>
      <line x1="250" y1="34" x2="250" y2="166" stroke="currentColor" stroke-width="1" opacity=".18"/>
      <g class="apart" data-anat="plasticidade" data-struct="hipocampo">
        <ellipse cx="356" cy="100" rx="56" ry="48" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-width="1.3" opacity=".55"/>
        <path d="M340 124 C326 116 330 92 350 90 C368 88 376 100 366 110 C360 116 350 114 350 106" fill="currentColor" fill-opacity=".32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </g>
      <text x="140" y="30" text-anchor="middle">Pré-sináptico</text>
      <text x="216" y="116" text-anchor="start">fenda</text>
      <text x="140" y="150" text-anchor="middle">Pós-sináptico</text>
      <text x="356" y="166" text-anchor="middle">Hipocampo</text>
    </svg>`
  },

  /* ---------- M3 · RECOMPENSA (via mesolímbica) ---------- */
  recompensa: {
    title: 'A via da recompensa',
    caption: 'Toque numa estrutura para ver o que é e onde fica.',
    parts: [
      {id:'vta', label:'ATV (área tegmental ventral)', blurb:'Origem dos neurônios de dopamina, no mesencéfalo. É daqui que parte o sinal de recompensa.'},
      {id:'accumbens', label:'Núcleo accumbens', blurb:'Peça central do "querer" e da motivação. Recebe dopamina da ATV e reforça comportamentos.'},
      {id:'pfc', label:'Córtex pré-frontal', blurb:'Recebe a projeção dopaminérgica e usa o sinal de valor para guiar decisões e metas.'},
      {id:'via', label:'Via dopaminérgica', blurb:'Caminho ATV → accumbens → córtex pré-frontal. Dispara mais quando algo é melhor que o esperado (erro de previsão).'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Via mesolímbica">
      <path d="M60 96 Q70 34 170 34 Q300 34 322 82 Q332 108 300 132 Q250 160 160 156 Q80 152 62 120 Z" fill="currentColor" fill-opacity=".03" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
      <path d="M300 132 Q322 150 320 176" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
      <circle cx="330" cy="150" r="22" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
      <g class="apart" data-anat="recompensa" data-struct="via">
        <path d="M232 122 Q180 118 150 118" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M150 118 l12 -5 l0 10 Z" fill="currentColor"/>
        <path d="M232 120 Q160 108 112 92" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M112 92 l13 1 l-5 9 Z" fill="currentColor"/>
      </g>
      <g class="apart" data-anat="recompensa" data-struct="vta">
        <ellipse cx="240" cy="124" rx="17" ry="12" fill="currentColor" fill-opacity=".32" stroke="currentColor" stroke-width="2"/>
      </g>
      <g class="apart" data-anat="recompensa" data-struct="accumbens">
        <ellipse cx="132" cy="120" rx="18" ry="13" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="2"/>
      </g>
      <g class="apart" data-anat="recompensa" data-struct="pfc">
        <path d="M96 88 Q70 80 74 104 Q78 122 100 116 Q92 100 96 88 Z" fill="currentColor" fill-opacity=".24" stroke="currentColor" stroke-width="2"/>
      </g>
      <text x="240" y="152" text-anchor="middle">ATV</text>
      <text x="132" y="150" text-anchor="middle">Accumbens</text>
      <text x="72" y="76" text-anchor="middle">Pré-frontal</text>
      <text x="70" y="185">frente do cérebro →</text>
    </svg>`
  },

  /* ---------- M4 · ATENÇÃO E FOCO (córtex pré-frontal) ---------- */
  atencao: {
    title: 'Controle da atenção',
    caption: 'Toque numa estrutura para ver o que é e onde fica.',
    parts: [
      {id:'pfc', label:'Córtex pré-frontal', blurb:'Mantém o objetivo ativo e inibe distrações. É o núcleo do controle executivo — caro e limitado, por isso foco cansa.'},
      {id:'parietal', label:'Córtex parietal', blurb:'Ajuda a orientar a atenção para onde ela é necessária (rede de orientação, Posner).'},
      {id:'rede', label:'Rede frontoparietal', blurb:'Frente e topo do cérebro trabalhando juntos para sustentar e direcionar a atenção.'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Córtex pré-frontal e atenção">
      <path d="M78 108 Q70 46 150 44 Q250 42 320 60 Q372 74 360 108 Q350 150 250 158 Q140 164 96 140 Q80 128 78 108 Z" fill="currentColor" fill-opacity=".03" stroke="currentColor" stroke-width="1.4" opacity=".32"/>
      <path d="M96 140 Q88 160 92 182" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".32"/>
      <g class="apart" data-anat="atencao" data-struct="pfc">
        <path d="M78 108 Q70 46 150 44 Q140 100 150 150 Q120 150 96 140 Q80 128 78 108 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2"/>
      </g>
      <g class="apart" data-anat="atencao" data-struct="parietal">
        <path d="M232 50 Q290 46 320 60 Q356 74 348 100 Q300 96 258 96 Q244 74 232 50 Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="2"/>
      </g>
      <g class="apart" data-anat="atencao" data-struct="rede">
        <path d="M126 96 Q210 66 292 82" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="2 6" stroke-linecap="round"/>
        <circle cx="126" cy="96" r="4" fill="currentColor"/>
        <circle cx="292" cy="82" r="4" fill="currentColor"/>
      </g>
      <text x="112" y="128" text-anchor="middle">Pré-frontal</text>
      <text x="298" y="120" text-anchor="middle">Parietal</text>
      <text x="70" y="190">frente do cérebro →</text>
    </svg>`
  },

  /* ---------- M5 · EMOÇÃO E ESTRESSE (amígdala + eixo HPA) ---------- */
  emocao: {
    title: 'Amígdala e eixo do estresse',
    caption: 'Toque numa estrutura para ver o que é e onde fica.',
    parts: [
      {id:'amigdala', label:'Amígdala', blurb:'Detector rápido de relevância emocional, sobretudo ameaça. Fica no lobo temporal, dos dois lados.'},
      {id:'hipotalamo', label:'Hipotálamo', blurb:'Dispara a resposta ao estresse liberando CRH — o primeiro elo do eixo HPA.'},
      {id:'hipofise', label:'Hipófise', blurb:'Recebe o sinal do hipotálamo e libera ACTH na corrente sanguínea.'},
      {id:'adrenal', label:'Glândula adrenal', blurb:'Acima dos rins. O ACTH faz ela liberar cortisol, o hormônio do estresse.'},
      {id:'cortisol', label:'Cortisol', blurb:'Mobiliza energia no curto prazo. Cronicamente alto, prejudica hipocampo e pré-frontal — memória e foco.'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Amígdala e eixo HPA">
      <path d="M42 100 Q36 46 110 44 Q186 42 208 88 Q218 112 190 134 Q140 160 78 150 Q48 140 42 100 Z" fill="currentColor" fill-opacity=".03" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
      <g class="apart" data-anat="emocao" data-struct="hipotalamo">
        <ellipse cx="132" cy="104" rx="13" ry="10" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="1.8"/>
      </g>
      <g class="apart" data-anat="emocao" data-struct="amigdala">
        <path d="M96 118 Q86 128 96 138 Q110 144 116 130 Q118 118 106 116 Q100 116 96 118 Z" fill="currentColor" fill-opacity=".34" stroke="currentColor" stroke-width="1.8"/>
      </g>
      <line x1="238" y1="34" x2="238" y2="180" stroke="currentColor" stroke-width="1" opacity=".16"/>
      <text x="330" y="30" text-anchor="middle" fill="currentColor" opacity=".7">EIXO HPA</text>
      <g class="apart" data-anat="emocao" data-struct="hipotalamo">
        <rect x="286" y="40" width="92" height="24" rx="6" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.6"/>
        <text x="332" y="56" text-anchor="middle">Hipotálamo</text>
      </g>
      <path d="M332 66 L332 82 M332 82 l-4 -6 M332 82 l4 -6" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <g class="apart" data-anat="emocao" data-struct="hipofise">
        <rect x="286" y="84" width="92" height="24" rx="6" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.6"/>
        <text x="332" y="100" text-anchor="middle">Hipófise</text>
      </g>
      <path d="M332 110 L332 126 M332 126 l-4 -6 M332 126 l4 -6" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <g class="apart" data-anat="emocao" data-struct="adrenal">
        <rect x="286" y="128" width="92" height="24" rx="6" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.6"/>
        <text x="332" y="144" text-anchor="middle">Adrenal</text>
      </g>
      <g class="apart" data-anat="emocao" data-struct="cortisol">
        <circle cx="316" cy="170" r="3.5" fill="currentColor" fill-opacity=".8"/>
        <circle cx="332" cy="174" r="3.5" fill="currentColor" fill-opacity=".8"/>
        <circle cx="348" cy="170" r="3.5" fill="currentColor" fill-opacity=".8"/>
        <text x="332" y="192" text-anchor="middle">Cortisol</text>
      </g>
      <text x="132" y="88" text-anchor="middle">Hipotálamo</text>
      <text x="90" y="156" text-anchor="middle">Amígdala</text>
    </svg>`
  },

  /* ---------- M6 · SONO E CONSOLIDAÇÃO (hipnograma + glinfático) ---------- */
  sono: {
    title: 'A arquitetura do sono',
    caption: 'Toque num elemento para ver o que é.',
    parts: [
      {id:'rem', label:'Sono REM', blurb:'Períodos que se alongam pela madrugada. Ligado a processamento emocional e a habilidades (memória procedural).'},
      {id:'profundo', label:'Sono profundo (N3)', blurb:'Ondas lentas, concentradas no começo da noite. É quando fatos e eventos (memória declarativa) mais se consolidam.'},
      {id:'ciclo', label:'Ciclo do sono', blurb:'A noite se repete em ciclos de ~90 minutos, passando por estágios leves, profundo e REM.'},
      {id:'glinfatico', label:'Sistema glinfático', blurb:'Durante o sono, o cérebro "lava" resíduos metabólicos acumulados na vigília. Dormir mal reduz essa limpeza.'}
    ],
    svg: `<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Hipnograma e sistema glinfático">
      <g opacity=".5">
        <text x="8" y="43">Acordado</text>
        <text x="8" y="72">REM</text>
        <text x="8" y="101">N1–N2</text>
        <text x="8" y="130">Profundo</text>
      </g>
      <g opacity=".16" stroke="currentColor" stroke-width="1">
        <line x1="70" y1="40" x2="330" y2="40"/>
        <line x1="70" y1="69" x2="330" y2="69"/>
        <line x1="70" y1="98" x2="330" y2="98"/>
        <line x1="70" y1="127" x2="330" y2="127"/>
      </g>
      <g class="apart" data-anat="sono" data-struct="profundo">
        <line x1="104" y1="127" x2="138" y2="127" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="196" y1="127" x2="222" y2="127" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g class="apart" data-anat="sono" data-struct="rem">
        <line x1="154" y1="69" x2="172" y2="69" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="244" y1="69" x2="268" y2="69" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="69" x2="326" y2="69" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      </g>
      <polyline points="72,40 86,69 96,98 104,127 138,127 150,98 154,69 172,69 182,98 196,127 222,127 236,98 244,69 268,69 278,98 292,98 300,69 326,69" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity=".85"/>
      <g class="apart" data-anat="sono" data-struct="ciclo">
        <path d="M72 150 L72 156 L172 156 L172 150" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".7"/>
        <text x="122" y="170" text-anchor="middle">~1 ciclo (~90 min)</text>
      </g>
      <line x1="352" y1="34" x2="352" y2="150" stroke="currentColor" stroke-width="1" opacity=".16"/>
      <g class="apart" data-anat="sono" data-struct="glinfatico">
        <circle cx="396" cy="86" r="20" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1.8"/>
        <path d="M372 64 Q396 54 420 64 M372 108 Q396 118 420 108" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M420 64 l-7 -1 l3 6 Z M372 108 l7 1 l-3 -6 Z" fill="currentColor"/>
        <circle cx="389" cy="82" r="2.4" fill="currentColor" fill-opacity=".8"/>
        <circle cx="402" cy="90" r="2.4" fill="currentColor" fill-opacity=".8"/>
        <text x="396" y="128" text-anchor="middle">Glinfático</text>
      </g>
    </svg>`
  }

};

function renderAnatomy(m){
  const a = ANATOMY[m.id];
  const el = document.getElementById('md-anat');
  if(!el) return;
  if(!a){ el.style.display='none'; return; }
  el.style.display='block';
  const chips = a.parts.map(p=>`<button class="anat-chip" data-part="${p.id}" onclick="selectAnat('${m.id}','${p.id}')">${p.label}</button>`).join('');
  el.innerHTML = `
    <div class="anat-k">Anatomia · ${a.title}</div>
    <div class="anat-stage">${a.svg}</div>
    <div class="anat-legend">${chips}</div>
    <div class="anat-cap" id="md-anat-cap">${a.caption}</div>`;
}

// realce local em todas as instancias visiveis desta anatomia (modulo, term-modal, zoom)
function highlightAnatEverywhere(anatId, partId){
  document.querySelectorAll('svg.anat-svg').forEach(svg=>{
    const probe = svg.querySelector('.apart[data-anat]');
    if(!probe || probe.dataset.anat !== anatId) return;
    svg.classList.add('hasactive');
    svg.querySelectorAll('.apart').forEach(g=>g.classList.toggle('active', g.dataset.struct===partId));
  });
  const md = document.getElementById('md-anat');
  if(md){
    md.querySelectorAll('.anat-chip').forEach(c=>c.classList.toggle('active', c.dataset.part===partId));
    const a = ANATOMY[anatId];
    const part = a && a.parts.find(p=>p.id===partId);
    const cap = document.getElementById('md-anat-cap');
    if(cap && part){ cap.innerHTML = `<b>${part.label}.</b> ${part.blurb}`; cap.classList.add('filled'); }
  }
}

// Abre o term-modal com a info da estrutura tocada. Se ja estiver aberto,
// troca conteudo no mesmo modal (constraint 4: nao empilhar historico).
function openStructInfo(anatId, partId){
  const A = ANATOMY[anatId]; if(!A) return;
  const part = A.parts.find(p=>p.id===partId); if(!part) return;
  highlightAnatEverywhere(anatId, partId);

  const back = document.getElementById('term-modal');
  if(!back) return;
  const alreadyOpen = !back.hidden;

  document.getElementById('tm-title').textContent = part.label;
  const _dk = anatId + ':' + partId;
  const _deep = (typeof ANAT_DEEP !== 'undefined' && ANAT_DEEP[_dk]) ? ANAT_DEEP[_dk] : null;
  const _def = document.getElementById('tm-def');
  if(_deep) _def.innerHTML = _deep; else _def.textContent = part.blurb || '';
  // liga o no ao grafo de termos, quando o rotulo bate com uma entrada do glossario
  let _gk = null;
  try{
    if(typeof renderTermRelations === 'function'){
      if(typeof ANAT_TERM !== 'undefined' && ANAT_TERM[_dk] && typeof GLOSSARY !== 'undefined' && GLOSSARY[ANAT_TERM[_dk]]) _gk = ANAT_TERM[_dk];
      if(!_gk && typeof GLOSSARY !== 'undefined'){
        const _lab = (part.label||'').toLowerCase();
        for(const _k in GLOSSARY){ if(_k.toLowerCase() === _lab){ _gk = _k; break; } }
      }
      if(_gk) renderTermRelations(_gk);
      else { const _r = document.getElementById('tm-rel'); if(_r){ _r.innerHTML=''; _r.hidden=true; } }
    }
  }catch(e){}
  try{ if(typeof renderContextMechanism==='function') renderContextMechanism({moduleId:anatId,term:_gk||part.label,label:part.label,partId:partId,source:'anatomy'}); }catch(e){}
  const figbox = document.getElementById('tm-figbox');
  figbox.innerHTML = A.svg;
  const fsvg = figbox.querySelector('svg');
  if(fsvg){
    fsvg.classList.add('hasactive');
    fsvg.querySelectorAll('.apart').forEach(g=>g.classList.toggle('active', g.dataset.struct===partId));
  }
  const capEl = document.getElementById('tm-cap');
  if(capEl) capEl.textContent = A.caption || '';
  document.getElementById('tm-fig').hidden = false;

  if(!alreadyOpen){
    tmOpener = null;
    back.hidden = false;
    back.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    pushOverlayState('term-modal');
    const x = document.getElementById('tm-close');
    if(x) setTimeout(()=>{ try{ x.focus(); }catch(e){} }, 10);
  } else {
    const card = back.querySelector('.modal-card');
    if(card) card.scrollTop = 0;
  }
}

// Compat: chips ainda chamam selectAnat via template inline
function selectAnat(modId, partId){ openStructInfo(modId, partId); }

// Delegacao global: qualquer toque em .apart[data-struct] abre a info,
// independente de onde o SVG esteja renderizado (modulo, term-modal, zoom).
document.addEventListener('click', function(e){
  const g = e.target.closest('.apart[data-struct]');
  if(!g) return;
  const anatId = g.dataset.anat;
  const partId = g.dataset.struct;
  if(!anatId || !partId) return;
  e.stopPropagation();
  handleAnatPartTap(anatId, partId);
});
/* A decisão fica separada do listener de propósito: é ela que impede a
   pergunta de entregar a própria resposta, e um listener registrado no
   `document` não é alcançável por teste. Aqui é.

   Durante um item de Localização na revisão, tocar uma parte É a resposta —
   abrir a ficha da estrutura mostraria o nome dela, que é exatamente o que a
   pergunta está cobrando. Depois de respondido, o toque volta ao normal. */
function handleAnatPartTap(anatId, partId){
  if(typeof review === 'object' && review && review.loc && !review.loc.answered){
    answerReviewLocation(partId);
    return;
  }
  openStructInfo(anatId, partId);
}

/* =====================================================================
   PROFUNDIDADE TÉCNICA — aprofundamento opcional por aula + fontes por módulo
   ===================================================================== */
const DEEP = {
  neuronio: [
    `<p>Em repouso, o neurônio mantém cerca de <b>−70 mV</b> dentro em relação a fora. Quem sustenta isso é a <b>bomba de sódio-potássio</b> (joga 3 Na⁺ para fora e 2 K⁺ para dentro, gastando ATP) somada aos canais de vazamento de K⁺. O neurônio é, no fundo, uma bateria eletroquímica pronta para disparar.</p><p>E ele não trabalha sozinho: as <b>células gliais</b> (astrócitos, oligodendrócitos, micróglia) sustentam, isolam e limpam — tão numerosas quanto os próprios neurônios.</p>`,
    `<p>Quando a despolarização atinge o <b>limiar (~−55 mV)</b>, canais de <b>Na⁺ dependentes de voltagem</b> abrem e o interior dispara para ~+30 mV. Eles então inativam, e canais de <b>K⁺</b> abrem para repolarizar — daí o período refratário, que força o sinal a andar só para frente.</p><p>É tudo-ou-nada: a força não muda, o que muda é a <b>frequência</b>. Na mielina, o impulso salta de nó em nó (condução saltatória), multiplicando a velocidade.</p>`,
    `<p>A chegada do impulso ao terminal abre canais de <b>Ca²⁺</b>. O cálcio que entra faz as vesículas se fundirem à membrana (via proteínas <b>SNARE</b>) e despejarem o neurotransmissor na fenda de ~20–40 nm.</p><p>Do outro lado, receptores <b>ionotrópicos</b> (rápidos, abrem canais direto) ou <b>metabotrópicos</b> (lentos, via proteína G) respondem. O sinal termina por recaptação ou degradação enzimática.</p>`,
    `<p>O <b>glutamato</b> é o principal excitatório; o <b>GABA</b>, o principal inibitório — juntos fazem quase toda a conversa ponto-a-ponto.</p><p>Já os <b>neuromoduladores</b> (dopamina, serotonina, noradrenalina, acetilcolina) agem devagar e de forma difusa, quase sempre por receptores metabotrópicos. Eles não carregam a mensagem: ajustam o <b>ganho e o estado</b> do sistema inteiro — o volume, não a letra.</p>`
  ],
  plasticidade: [
    `<p>A plasticidade é <b>funcional</b> (sinapses ficam mais ou menos eficientes) e <b>estrutural</b> (nascem e somem espinhas dendríticas, formam-se novas sinapses, podam-se as sem uso).</p><p>É dependente de experiência e mais intensa em <b>períodos críticos</b>, mas nunca cessa: usar um circuito o fortalece; ignorá-lo o enfraquece.</p>`,
    `<p>O mecanismo da <b>LTP</b> tem no receptor <b>NMDA</b> um detector de coincidência: ele só deixa Ca²⁺ entrar quando há glutamato <b>e</b> a membrana pós-sináptica já está despolarizada (o que expulsa o bloqueio de Mg²⁺).</p><p>Esse Ca²⁺ ativa a <b>CaMKII</b>, que insere e fosforila receptores <b>AMPA</b> — a sinapse fica mais forte. O inverso (atividade fraca e dessincronizada) produz <b>LTD</b>. Fortalecer e enfraquecer são o mesmo mecanismo em direções opostas.</p>`,
    `<p>Na lesma <i>Aplysia</i>, Kandel separou dois regimes. A memória de <b>curto prazo</b> só modifica proteínas já existentes (via <b>PKA</b>) — rápida e reversível.</p><p>A de <b>longo prazo</b> exige mais: cAMP → PKA → o fator de transcrição <b>CREB</b> → <b>novos genes e novas proteínas</b>, que fazem crescer conexões sinápticas. Há até um freio (CREB-2) que precisa ser removido — por isso a repetição espaçada, que vence esse freio, fixa melhor.</p>`,
    `<p>Há processos de consolidação em escalas diferentes: a <b>sináptica</b>, que estabiliza mudanças locais ao longo de horas, e a <b>sistêmica</b>, em que a participação de hipocampo e redes corticais se reorganiza ao longo de períodos maiores. Não é uma mudança literal de arquivo entre dois depósitos.</p><p>O espaçamento ajuda porque cria tentativas de recuperação em estados e momentos diferentes, oferece novas oportunidades de estabilização e reduz a ilusão de familiaridade produzida pela releitura contínua. Reconsolidação e síntese proteica podem participar, mas não explicam sozinhas todo o benefício.</p>`
  ],
  recompensa: [
    `<p>A via <b>mesolímbica</b> (ATV → núcleo accumbens) sustenta o <b>querer</b>, não necessariamente o <b>gostar</b>. Berridge mostrou que a dopamina move a <b>saliência de incentivo</b> — o impulso de buscar — enquanto o prazer em si depende mais de opioides e endocanabinoides.</p><p>Por isso dá para <b>querer intensamente</b> algo que já nem dá tanto prazer: são sistemas separados.</p>`,
    `<p>Schultz mostrou que muitos neurônios de dopamina disparam de um modo compatível com <b>erro de previsão</b>, e não com a recompensa em si: respondem quando algo é <b>melhor que o esperado</b>, ficam neutros quando é como previsto, e <b>caem</b> quando a recompensa esperada falha.</p><p>Com o aprendizado, o disparo migra da recompensa para a <b>pista que a prevê</b>. Isso é, literalmente, aprendizado por diferença temporal — a mesma ideia por trás de algoritmos de RL.</p>`,
    `<p>Recompensa <b>incerta ou variável</b> gera resposta dopaminérgica maior que a certa. Progresso visível em pequenos passos é uma sucessão de <b>erros de previsão positivos</b> — cada 1% é um micro-disparo.</p><p>E como a dopamina responde à <b>antecipação</b> (à pista, não só ao prêmio), a própria barra avançando já motiva. A Fase 01 explora isso de propósito.</p>`,
    `<p>Todo hábito é <b>deixa → rotina → recompensa</b>. À medida que se automatiza, o controle migra do <b>estriado ventral</b> (accumbens, orientado a meta) para o <b>estriado dorsal</b> (orientado a hábito).</p><p>A dopamina se desloca da recompensa para a deixa, e o comportamento passa a rodar quase sem depender do prêmio — o que torna hábitos poderosos e difíceis de quebrar.</p>`
  ],
  atencao: [
    `<p>A atenção é <b>competição enviesada</b>: estímulos disputam representação, e o cérebro inclina a balança. Há duas fontes de viés — <b>top-down</b> (guiado por metas, rede frontoparietal dorsal) e <b>bottom-up</b> (puxado pelo estímulo, rede ventral).</p><p>Foco é o top-down vencendo o bottom-up — e isso custa energia, por isso escorrega.</p>`,
    `<p>No modelo de <b>Baddeley</b>, a memória de trabalho tem um <b>executivo central</b> coordenando uma alça fonológica e um esboço visuoespacial. Sua capacidade é minúscula — cerca de <b>4 blocos</b> (Cowan).</p><p>Ela é mantida por <b>disparo persistente</b> no pré-frontal e é frágil: qualquer interferência a apaga. Agrupar informação em blocos (<i>chunking</i>) é a forma de driblar o limite.</p>`,
    `<p>O <b>pré-frontal dorsolateral</b> segura metas e regras e as usa para <b>enviesar</b> as áreas sensoriais posteriores — é controle de cima para baixo (Miller & Cohen).</p><p>Suas funções executivas se resumem a três (Miyake): <b>inibir</b> distrações, <b>atualizar</b> a memória de trabalho e <b>alternar</b> entre tarefas. É caro e cansa rápido — e estresse e privação de sono o derrubam primeiro.</p>`,
    `<p>Para tarefas que exigem meta, não existe paralelo real: o cérebro <b>alterna</b> e serializa. Cada troca cobra um <b>custo de reconfiguração</b> mais a interferência da tarefa anterior.</p><p>O resultado medível é mais <b>tempo</b> e mais <b>erros</b>. "Multitarefa" é, na prática, alternância rápida e cara.</p>`
  ],
  emocao: [
    `<p>LeDoux mapeou dois caminhos. A <b>via rápida</b> (tálamo → amígdala) dá um alerta grosseiro em milissegundos; a <b>via lenta</b> (tálamo → córtex → amígdala) chega depois, com precisão.</p><p>Por isso você pula antes de perceber que a "cobra" era uma mangueira. A amígdala marca a <b>relevância emocional</b> e dispara respostas autonômicas e o eixo do estresse.</p>`,
    `<p>Sob estresse, o <b>hipotálamo</b> libera CRH → a <b>hipófise</b> libera ACTH → o <b>córtex adrenal</b> libera <b>cortisol</b>. O cortisol mobiliza energia e prepara o corpo para agir.</p><p>Ele também faz <b>retroalimentação negativa</b> sobre hipotálamo, hipófise e hipocampo, desligando a própria resposta. Quando esse freio falha, o cortisol fica cronicamente alto.</p>`,
    `<p>A relação estresse-desempenho é um <b>U invertido</b> (Yerkes-Dodson): pouco demais entedia, demais paralisa, o meio afia.</p><p>O estresse <b>agudo</b> é adaptativo. O <b>crônico</b> corrói: cortisol alto por muito tempo atrofia dendritos no <b>hipocampo</b>, prejudica o <b>pré-frontal</b> e hipertrofia a <b>amígdala</b> — memória e foco pioram enquanto o alarme fica mais sensível (carga alostática, McEwen).</p>`,
    `<p>A <b>noradrenalina</b> do <i>locus coeruleus</i> ajusta o "ganho" cortical — num nível ótimo, afia percepção e foco; alto demais, fragmenta.</p><p>Isso liga estado a desempenho: humor, sono e estresse mudam esse ganho antes de qualquer esforço de vontade. E a memória é <b>dependente de estado</b> — recupera-se melhor no estado em que foi aprendida.</p>`
  ],
  sono: [
    `<p>O sono não é desligar — é manutenção ativa. Três funções centrais: <b>consolidar</b> memória, fazer <b>homeostase sináptica</b> (a hipótese SHY de Tononi: a vigília fortalece sinapses e o sono faz um <b>reescalonamento</b> geral para baixo, preservando o sinal) e <b>limpar</b> resíduos metabólicos.</p>`,
    `<p>Alternam-se <b>NREM</b> (N1, N2, N3) e <b>REM</b>. No sono profundo (N3), <b>oscilações lentas</b>, <b>fusos</b> e <b>ripples</b> do hipocampo orquestram o <b>replay</b> e a transferência de memórias para o córtex.</p><p>O REM cuida do processamento emocional e procedural. Em ciclos de ~90 min, o <b>profundo domina o começo</b> da noite e o <b>REM, o fim</b> — cortar a madrugada corta justamente o REM.</p>`,
    `<p>Descoberto por Nedergaard, é o "encanamento" do cérebro: o líquor troca com o fluido intersticial por canais perivasculares (dependentes de <b>aquaporina-4</b> nos astrócitos), arrastando resíduos — inclusive <b>beta-amiloide</b>.</p><p>Durante o sono, o espaço entre as células se abre e essa limpeza fica <b>muito mais ativa</b>. Boa parte dessa evidência vem de estudos em animais, mas a direção é consistente: dormir mal parece atrapalhar essa limpeza.</p>`,
    `<p>O sono obedece a dois processos (Borbély). O <b>Processo C</b> é o relógio circadiano do <b>núcleo supraquiasmático</b>, sincronizado pela luz via melatonina (~24 h). O <b>Processo S</b> é a <b>pressão homeostática</b>: a <b>adenosina</b> se acumula quanto mais tempo você fica acordado.</p><p>A <b>cafeína</b> não dá energia — ela apenas <b>bloqueia os receptores de adenosina</b>, mascarando um cansaço que continua lá.</p>`
  ]
};

const REFERENCES = {
  neuronio: [
    {src:'Hodgkin & Huxley (1952)', note:'Descreveram o mecanismo iônico do potencial de ação. Nobel de 1963.'},
    {src:'Kandel et al. — Principles of Neural Science', note:'O manual de referência da neurociência celular e de sistemas.'}
  ],
  plasticidade: [
    {src:'Hebb (1949) — The Organization of Behavior', note:'Formulou a regra que virou "disparam juntos, conectam-se juntos".'},
    {src:'Bliss & Lømo (1973)', note:'Primeira demonstração experimental da LTP, no hipocampo.'},
    {src:'Kandel — Aplysia (Nobel 2000)', note:'Mostrou o papel de CREB e da síntese proteica na memória de longo prazo.'}
  ],
  recompensa: [
    {src:'Schultz, Dayan & Montague (1997)', note:'Ligaram os disparos de dopamina ao erro de previsão de recompensa.'},
    {src:'Berridge & Robinson', note:'Separaram o "querer" (dopamina) do "gostar" (opioides).'}
  ],
  atencao: [
    {src:'Baddeley & Hitch (1974)', note:'Propuseram o modelo de memória de trabalho usado até hoje.'},
    {src:'Posner & Petersen (1990)', note:'Mapearam as redes de atenção (alerta, orientação, controle).'},
    {src:'Miller & Cohen (2001)', note:'Teoria integrativa da função do córtex pré-frontal.'}
  ],
  emocao: [
    {src:'LeDoux — The Emotional Brain', note:'Mapeou as vias rápida e lenta do medo pela amígdala.'},
    {src:'Yerkes & Dodson (1908)', note:'A curva em U invertido entre ativação e desempenho.'},
    {src:'McEwen', note:'Cunhou "carga alostática": o custo do estresse crônico no cérebro.'}
  ],
  sono: [
    {src:'Borbély (1982)', note:'Modelo de dois processos: circadiano (C) + pressão homeostática (S).'},
    {src:'Tononi & Cirelli', note:'Hipótese da homeostase sináptica (SHY): o sono reescalona sinapses.'},
    {src:'Xie et al. / Nedergaard (2013)', note:'Mostraram a limpeza glinfática muito maior durante o sono.'}
  ]
};

function renderReferences(m){
  const el=document.getElementById('md-refs');
  if(!el) return;
  const refs=REFERENCES[m.id];
  if(!refs || !refs.length){ el.style.display='none'; return; }
  el.style.display='block';
  const items=refs.map(r=>`<li><span class="ref-src">${r.src}</span><span class="ref-note">${r.note}</span></li>`).join('');
  el.innerHTML=`<h3>Fontes</h3><p>De onde vem o que este módulo afirma — para você poder ir além.</p><ul class="ref-list">${items}</ul>`;
}

function toggleDeep(idx, ev){
  if(ev) ev.stopPropagation();
  const panel=document.getElementById('deep-'+idx);
  if(!panel) return;
  const opening=panel.hasAttribute('hidden');
  if(opening){ panel.removeAttribute('hidden'); glossify(panel); } else panel.setAttribute('hidden','');
  const btn=ev? ev.currentTarget : null;
  if(btn){ btn.setAttribute('aria-expanded', opening?'true':'false'); btn.classList.toggle('open', opening); }
}

/* =====================================================================
   MÓDULO 09 — NEUROANATOMIA (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'neuroanatomia', n:'09', title:'Neuroanatomia', color:'var(--orange)', hex:'#fb923c',
  tag:'O mapa físico do cérebro',
  intro:'Você já viu o cérebro funcionar — agora veja onde. Este módulo é a geografia: as grandes divisões, o que cada uma faz e como se organizam da casca ao tronco. Saber o endereço dá lugar a tudo que os outros módulos descrevem.',
  lessons:[
    {t:'As grandes divisões',
     b:`<p>O sistema nervoso central tem três grandes blocos: o <span class="term">cérebro</span> (a maior parte, sede do pensamento), o <span class="term">cerebelo</span> (atrás e embaixo, coordenação e timing) e o <span class="term">tronco encefálico</span> (a ponte com a medula, que controla funções vitais).</p><p>Na superfície do cérebro fica o <strong>córtex</strong> — a <span class="term">substância cinzenta</span>, feita de corpos celulares e toda dobrada em sulcos e giros para caber mais área. Por baixo corre a <span class="term">substância branca</span>: os axônios mielinizados que ligam as regiões. E dois hemisférios, unidos por uma ponte de fibras, o <strong>corpo caloso</strong>.</p>`},
    {t:'Os quatro lobos',
     b:`<p>Cada hemisfério se divide em quatro <span class="term">lobos</span>, e cada um tem uma vocação. O <strong>lobo frontal</strong> (na frente) cuida de planejamento, decisão e movimento — é onde mora o córtex pré-frontal dos módulos anteriores. O <strong>lobo parietal</strong> (no alto, atrás) integra o tato e a noção de espaço e do corpo.</p><p>O <strong>lobo temporal</strong> (nas laterais, sobre as orelhas) processa som e linguagem e abriga o hipocampo e a amígdala. O <strong>lobo occipital</strong> (bem atrás) é quase todo dedicado à <span class="term">visão</span>. Nenhuma região trabalha isolada, mas saber a vocação de cada lobo é o primeiro endereço.</p>`},
    {t:'Sob o córtex: estruturas profundas',
     b:`<p>Abaixo do córtex ficam estruturas antigas e decisivas. O <span class="term">tálamo</span> é a grande <strong>central de retransmissão</strong>: quase toda informação sensorial passa por ele antes de chegar ao córtex. Logo abaixo, o <span class="term">hipotálamo</span> regula fome, sono e temperatura e comanda o eixo hormonal do estresse.</p><p>Os <span class="term">gânglios da base</span> ajustam movimento e hábitos, e o <strong>sistema límbico</strong> — com <strong>hipocampo</strong> (memória) e <strong>amígdala</strong> (emoção) — dá cor afetiva e registro à experiência. São os mesmos personagens dos módulos de memória e emoção, agora localizados no mapa.</p>`},
    {t:'Tronco encefálico e cerebelo',
     b:`<p>O <span class="term">tronco encefálico</span> — mesencéfalo, ponte e <strong>bulbo</strong> — é pequeno mas insubstituível: controla respiração, batimento cardíaco, o ciclo sono-vigília e reflexos. Dano ali é fatal de um jeito que dano cortical raramente é. É também por onde passam as vias que sobem e descem entre cérebro e corpo.</p><p>O <span class="term">cerebelo</span> ('pequeno cérebro'), atrás do tronco, tem mais neurônios que todo o resto do encéfalo somado. Ele não inicia o movimento — ele o <strong>afina</strong>: timing, coordenação, equilíbrio e a suavidade dos gestos treinados. Também participa de aprendizados motores e até de linguagem.</p>`}
  ],
  quiz:[
    {q:'Qual estrutura conecta os dois hemisférios cerebrais?',
     o:['O tronco encefálico','O corpo caloso','O cerebelo','O tálamo'], c:1, l:0,
     er:'Isso. O <strong>corpo caloso</strong> é a grande ponte de fibras que liga os hemisférios e permite que troquem informação.',
     ew:'Quem une os hemisférios é o <strong>corpo caloso</strong>; as outras estruturas têm funções distintas.'},
    {q:'O lobo occipital é dedicado principalmente a:',
     o:['Movimento','Audição','Visão','Olfato'], c:2, l:1,
     er:'Exato. O <strong>lobo occipital</strong>, bem atrás, é quase todo voltado ao processamento <strong>visual</strong>.',
     ew:'O occipital é o lobo da <strong>visão</strong>; movimento é frontal e audição é temporal.'},
    {q:'Qual estrutura funciona como a principal central de retransmissão da informação sensorial?',
     o:['O hipotálamo','O tálamo','O cerebelo','O bulbo'], c:1, l:2,
     er:'Correto. O <strong>tálamo</strong> retransmite quase toda a informação sensorial rumo ao córtex.',
     ew:'É o <strong>tálamo</strong> o grande relé sensorial; o hipotálamo regula funções internas.'},
    {q:'Uma lesão em qual região tende a ser fatal por atingir funções vitais como a respiração?',
     o:['Lobo frontal','Córtex pré-frontal','Tronco encefálico','Lobo parietal'], c:2, l:3,
     er:'Sim. O <strong>tronco encefálico</strong> controla respiração e batimento — dano ali costuma ser fatal.',
     ew:'As funções vitais ficam no <strong>tronco encefálico</strong>; lesões corticais raramente matam de imediato.'}
  ]
});

MINI_QUIZZES['neuroanatomia']=[
  [
    {lvl:0,q:"A substância cinzenta do córtex é feita principalmente de:",o:["Corpos celulares de neurônios","Axônios cobertos de mielina","Líquor e vasos sanguíneos"], c:0,er:"Cinzenta = corpos celulares; é onde o processamento acontece.",ew:"Axônios mielinizados formam a substância branca, não a cinzenta."},
    {lvl:1,q:"Por que o córtex é todo dobrado em sulcos e giros?",o:["Para caber mais área de córtex num crânio limitado","Para que o cérebro fique bem mais leve dentro do crânio","Para produzir o líquor que banha o encéfalo"], c:0,er:"As dobras multiplicam a área cortical dentro do espaço do crânio.",ew:"Não é questão de peso nem de líquor — é ganhar superfície."},
    {lvl:2,q:"Qual a diferença funcional entre substância cinzenta e branca?",o:["Cinzenta processa (corpos celulares); branca conecta (axônios)","As duas apenas conectam regiões distantes umas das outras no cérebro","A cinzenta é feita de gordura e a branca, de osso"], c:0,er:"Cinzenta processa, branca transporta — é a fiação que liga as regiões.",ew:"São tecidos neurais: uma processa, a outra conecta; nenhuma é osso."}
  ],
  [
    {lvl:0,q:"O lobo temporal abriga estruturas ligadas a:",o:["Audição, linguagem, memória e emoção","Apenas a visão e o processamento de cores","Somente o movimento das pernas e do tronco"], c:0,er:"Temporal: som, linguagem e, no fundo, hipocampo e amígdala.",ew:"Visão é occipital; o temporal cuida de som, linguagem, memória e emoção."},
    {lvl:1,q:"Dificuldade de planejar e de inibir impulsos aponta para comprometimento de qual lobo?",o:["Frontal","Occipital","Parietal"],c:0,er:"Planejamento e autocontrole são do <strong>lobo frontal</strong> (córtex pré-frontal).",ew:"Essas funções executivas moram no frontal, não no occipital nem no parietal."},
    {lvl:2,q:"Por que faz sentido hipocampo e amígdala ficarem no lobo temporal?",o:["Ali memória e emoção se conectam a som e linguagem, integrando a experiência","Porque o lobo temporal não desempenha nenhuma outra função de relevo no cérebro","Porque era o único espaço que ainda restava livre dentro do crânio"], c:0,er:"Memória e emoção ficam junto do processamento de som e linguagem, ajudando a dar sentido e registro à experiência.",ew:"Não é acaso nem espaço vago — é integração funcional."}
  ],
  [
    {lvl:0,q:"A função central do tálamo é:",o:["Retransmitir informação sensorial ao córtex","Produzir o hormônio do crescimento do corpo","Coordenar o equilíbrio e a postura"], c:0,er:"O tálamo é o relé: quase todo sinal sensorial passa por ele rumo ao córtex.",ew:"Equilíbrio é cerebelo; o tálamo é a central de retransmissão."},
    {lvl:1,q:"Fome, temperatura e o disparo do eixo do estresse são regulados por:",o:["Hipotálamo","Lobo occipital","Corpo caloso"],c:0,er:"O <strong>hipotálamo</strong> comanda funções internas e aciona o eixo HPA.",ew:"Essas funções vegetativas e hormonais são do hipotálamo."},
    {lvl:2,q:"Por que hipocampo e amígdala são agrupados no 'sistema límbico'?",o:["Formam uma rede que liga memória e emoção à experiência","Porque as duas estruturas têm exatamente a mesma cor","Porque as duas produzem a mielina usada pelo córtex"], c:0,er:"O límbico integra emoção e memória — por isso o que emociona se lembra melhor.",ew:"Não é cor nem mielina: é uma rede funcional de emoção e memória."}
  ],
  [
    {lvl:0,q:"O tronco encefálico controla principalmente:",o:["Funções vitais como respiração e batimento","A leitura e a compreensão de textos","A visão de cores e o contraste"], c:0,er:"Respiração, batimento e sono-vigília ficam no tronco — por isso é tão crítico.",ew:"Leitura e cor são corticais; o tronco cuida do que mantém você vivo."},
    {lvl:1,q:"Movimentos descoordenados e falta de equilíbrio apontam para problema em:",o:["Cerebelo","Lobo occipital","Corpo caloso"],c:0,er:"O <strong>cerebelo</strong> afina timing, coordenação e equilíbrio.",ew:"Coordenação e equilíbrio são do cerebelo, não do occipital nem do corpo caloso."},
    {lvl:2,q:"O cerebelo tem mais neurônios que todo o resto do encéfalo. O que isso sugere?",o:["Coordenação fina e aprendizado de habilidades exigem enorme poder computacional","Que ele pensa muito mais do que o córtex e é quem comanda as decisões conscientes","Que ele é praticamente inútil, já que tantos neurônios fazem tão pouco"], c:0,er:"Afinar movimento e aprender habilidades com precisão é computacionalmente caríssimo — daí tantos neurônios.",ew:"Ele não 'pensa' no lugar do córtex nem é inútil: ele refina, e isso custa muito processamento."}
  ]
];

ANATOMY['neuroanatomia']={
  title:'O mapa do cérebro',
  caption:'Toque numa região para ver o que é e onde fica.',
  parts:[
    {id:'frontal', label:'Lobo frontal', blurb:'Planejamento, decisão, movimento e autocontrole — o córtex pré-frontal fica aqui. Ocupa a frente do cérebro.'},
    {id:'parietal', label:'Lobo parietal', blurb:'Integra o tato e a noção de espaço e do corpo. Fica no alto, atrás do frontal.'},
    {id:'temporal', label:'Lobo temporal', blurb:'Processa som e linguagem e abriga o hipocampo e a amígdala. Fica nas laterais, sobre as orelhas.'},
    {id:'occipital', label:'Lobo occipital', blurb:'Quase todo dedicado à visão. Fica bem atrás.'},
    {id:'cerebelo', label:'Cerebelo', blurb:'Afina coordenação, timing e equilíbrio; guarda a maioria dos neurônios do encéfalo. Fica atrás e embaixo.'},
    {id:'tronco', label:'Tronco encefálico', blurb:'Controla funções vitais (respiração, batimento) e liga o cérebro à medula. Dano ali costuma ser fatal.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Mapa lateral do cérebro">
    <path d="M86 106 C74 58 150 34 214 40 C286 47 330 70 332 104 C333 126 315 138 292 139 L150 139 C112 139 92 128 86 106 Z" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".35"/>
    <g class="apart" data-anat="neuroanatomia" data-struct="frontal">
      <path d="M86 106 C74 58 150 34 202 42 L192 112 C150 116 118 116 106 114 C95 112 89 110 86 106 Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="neuroanatomia" data-struct="parietal">
      <path d="M202 42 C246 40 292 52 300 62 L300 112 L192 112 Z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="neuroanatomia" data-struct="occipital">
      <path d="M300 62 C320 70 332 82 332 104 C333 126 315 138 298 137 L300 112 Z" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="neuroanatomia" data-struct="temporal">
      <path d="M106 114 C118 116 150 116 192 112 L272 112 C264 134 180 140 150 139 C120 139 110 128 106 114 Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <path d="M202 42 L192 112" stroke="currentColor" stroke-width="1.2" opacity=".4"/>
    <path d="M106 114 C150 116 220 114 272 112" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".4"/>
    <g class="apart" data-anat="neuroanatomia" data-struct="cerebelo">
      <path d="M300 140 C334 138 360 150 360 166 C360 180 340 178 320 175 C306 172 299 156 300 140 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
      <path d="M312 146 C322 150 322 168 316 173 M330 146 C338 152 336 168 330 174" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>
    </g>
    <g class="apart" data-anat="neuroanatomia" data-struct="tronco">
      <path d="M256 136 C252 158 256 178 264 192 L280 190 C274 172 276 154 278 137 Z" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <text x="128" y="70">Frontal</text>
    <text x="250" y="66">Parietal</text>
    <text x="322" y="98" text-anchor="middle">Occipital</text>
    <text x="180" y="132" text-anchor="middle">Temporal</text>
    <text x="336" y="192" text-anchor="middle">Cerebelo</text>
    <text x="252" y="185" text-anchor="end">Tronco</text>
    <text x="70" y="30">frente do cérebro →</text>
  </svg>`
};

DEEP['neuroanatomia']=[
  `<p>O córtex tem cerca de <b>2 a 4 mm</b> de espessura e seis camadas celulares. As dobras (giros e sulcos) multiplicam a área que caberia num crânio liso — esticado, o córtex ocuparia perto de <b>2.000 cm²</b>.</p><p>A substância branca deve a cor à <b>mielina</b>: são os cabos que ligam regiões próximas e distantes. Doenças que atacam a mielina (como a esclerose múltipla) degradam essa fiação, não o processamento em si.</p>`,
  `<p>A divisão em lobos é anatômica (marcada por sulcos como o <i>sulco central</i> e o <i>lateral</i>), mas as funções se distribuem em <b>redes</b> que cruzam lobos. Ainda assim há especializações nítidas: o <b>córtex motor</b> na borda posterior do frontal e o <b>somatossensorial</b> logo atrás dele, no parietal.</p><p>É por isso que um AVC produz déficits tão específicos — perde-se a função da região exata atingida, não 'um pouco de tudo'.</p>`,
  `<p>O <b>tálamo</b> não é um relé passivo: ele filtra e regula o que chega ao córtex, participando de atenção e do nível de consciência. A grande exceção é o <b>olfato</b>, que alcança o córtex sem passar por ele.</p><p>Os <b>gânglios da base</b> (estriado, globo pálido, substância negra) selecionam movimentos e hábitos. A degeneração dopaminérgica na substância negra é o que causa a <b>doença de Parkinson</b>.</p>`,
  `<p>O tronco abriga os núcleos que fabricam os <b>neuromoduladores</b> do Módulo 01: dopamina, noradrenalina (locus coeruleus) e serotonina (núcleos da rafe). Daí sua influência sobre alerta e humor.</p><p>O <b>cerebelo</b> concentra cerca de <b>80%</b> dos neurônios do encéfalo em uma fração do volume, graças às células granulares. Ele aprende modelos internos do corpo — por isso um gesto muito treinado fica automático e suave.</p>`
];

REFERENCES['neuroanatomia']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Referência completa da neuroanatomia funcional."},
  {src:"Blumenfeld — Neuroanatomy through Clinical Cases",note:"Liga cada estrutura a sinais clínicos reais."},
  {src:"Herculano-Houzel (2009)",note:"Contou os neurônios do cérebro humano e mostrou que o cerebelo abriga a maioria."}
];

/* =====================================================================
   MÓDULO 10 — SISTEMAS SENSORIAIS (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'sensorial', n:'10', title:'Sistemas Sensoriais', color:'var(--teal)', hex:'#2dd4bf',
  tag:'Como o mundo entra no cérebro',
  intro:'Tudo que você sabe do mundo entrou por um sentido. Mas o cérebro não recebe a realidade pronta — ele a reconstrói a partir de sinais elétricos. Este módulo é como luz, som, pressão e química viram experiência, e por que o que você percebe é sempre uma construção, não uma cópia.',
  lessons:[
    {t:'Do estímulo ao sinal: transdução',
     b:`<p>Nenhum neurônio 'vê' luz ou 'ouve' som. O que cada sentido faz primeiro é a <span class="term">transdução</span>: converter uma energia física — luz, ondas de pressão, calor, moléculas — em <strong>sinal elétrico</strong>, a única língua que o cérebro entende.</p><p>Para isso, cada sistema tem <span class="term">receptores</span> especializados: fotorreceptores para luz, mecanorreceptores para pressão e som, quimiorreceptores para cheiro e gosto. Daí o plano é quase sempre o mesmo: <strong>receptor → tálamo → córtex sensorial</strong>. E os receptores se <span class="term">adaptam</span> — param de responder ao que é constante, por isso você esquece a roupa no corpo, mas sente na hora que ela se mexe.</p>`},
    {t:'A visão',
     b:`<p>A visão domina o cérebro humano — quase um terço do córtex trabalha para ela. Na <span class="term">retina</span> há dois tipos de fotorreceptor: os <strong>bastonetes</strong> (muito sensíveis, funcionam no escuro, mas sem cor) e os <strong>cones</strong> (cor e detalhe fino, concentrados no centro, na fóvea).</p><p>O sinal segue pelo nervo óptico, cruza no <span class="term">quiasma óptico</span>, passa pelo tálamo e chega ao <strong>córtex visual</strong>, no lobo occipital. Lá ele é processado em <strong>hierarquia</strong>: primeiro bordas e contrastes, depois formas, depois objetos e rostos. Por isso a visão é uma <span class="term">construção</span> — o cérebro preenche o ponto cego e 'decide' o que você vê a partir de pistas incompletas.</p>`},
    {t:'A audição',
     b:`<p>O som é onda de pressão no ar. O ouvido a canaliza até a <span class="term">cóclea</span>, uma espiral cheia de líquido onde milhares de <strong>células ciliadas</strong> fazem a transdução: a vibração dobra seus 'cílios' e vira sinal elétrico.</p><p>A cóclea é organizada por frequência — a <span class="term">tonotopia</span>: sons agudos ativam a base, graves ativam o ápice, como as teclas de um piano espalhadas ao longo dela. O sinal sobe pelo tronco (onde já se comparam os dois ouvidos para <strong>localizar</strong> a fonte), passa pelo tálamo e chega ao <strong>córtex auditivo</strong>, no lobo temporal.</p>`},
    {t:'Tato, dor e os outros sentidos',
     b:`<p>A pele é coberta de receptores diferentes para pressão, vibração, temperatura e dano. Eles sobem até o <strong>córtex somatossensorial</strong>, no lobo parietal, organizado como um mapa do corpo — o <span class="term">homúnculo</span> — bem distorcido: mãos e lábios ocupam áreas enormes porque têm muitos receptores.</p><p>A <span class="term">dor</span> merece cuidado: ela não é a leitura direta de um dano. O corpo envia sinais de <strong>nocicepção</strong>, mas é o cérebro que <strong>constrói</strong> a dor, modulando-a por contexto, emoção e atenção (a 'teoria da comporta'). Por isso a mesma lesão dói mais ou menos conforme o momento. E há os sentidos químicos: o <strong>olfato</strong> é a exceção que fala direto com o sistema límbico, sem passar pelo tálamo — daí um cheiro trazer uma memória inteira de volta.</p>`}
  ],
  quiz:[
    {q:'O processo de converter um estímulo físico (luz, som, pressão) em sinal neural chama-se:',
     o:['Consolidação','Transdução sensorial','Potenciação de longo prazo','Mielinização'], c:1, l:0,
     er:'Isso. A <strong>transdução sensorial</strong> traduz a energia do estímulo na língua elétrica do cérebro.',
     ew:'O termo é <strong>transdução</strong>; os outros descrevem memória, plasticidade ou isolamento do axônio.'},
    {q:'Na retina, quais células são responsáveis pela visão de cores e de detalhes finos?',
     o:['Os bastonetes','Os cones','As células gliais','Os nociceptores'], c:1, l:1,
     er:'Correto. Os <strong>cones</strong> dão cor e detalhe e se concentram na fóvea; os bastonetes cuidam da visão no escuro.',
     ew:'Cor e detalhe são dos <strong>cones</strong>; os bastonetes funcionam no escuro, sem cor.'},
    {q:"O 'mapa' de frequências ao longo da cóclea, em que graves e agudos ativam pontos diferentes, chama-se:",
     o:['Homúnculo','Tonotopia','Adaptação','Quiasma'], c:1, l:2,
     er:'Exato. A <strong>tonotopia</strong> organiza a cóclea por frequência, como as teclas de um piano.',
     ew:'É a <strong>tonotopia</strong>; homúnculo é o mapa do tato e quiasma é o cruzamento das vias visuais.'},
    {q:'Qual sentido é a exceção por alcançar o córtex sem passar pelo tálamo, com ligação direta a emoção e memória?',
     o:['Visão','Audição','Olfato','Tato'], c:2, l:3,
     er:'Sim. O <strong>olfato</strong> vai direto ao sistema límbico — por isso um cheiro evoca memórias tão vivas.',
     ew:'O <strong>olfato</strong> é a exceção; visão, audição e tato passam pelo tálamo antes do córtex.'}
  ]
});

MINI_QUIZZES['sensorial']=[
  [
    {lvl:0,q:"Transdução sensorial é:",o:["Converter a energia do estímulo em sinal neural","Consolidar as memórias durante o sono profundo da noite","Podar as sinapses que não são usadas"], c:0,er:"Cada sentido começa traduzindo luz, som ou pressão em sinal elétrico.",ew:"Consolidar e podar são outros processos; transdução é a tradução do estímulo."},
    {lvl:1,q:"Por que você 'para de sentir' a roupa no corpo depois de um tempo?",o:["Adaptação: os receptores reduzem a resposta a estímulos constantes","Porque a roupa deixa de ser representada em qualquer área do córtex","Porque o tálamo se desliga por completo depois de alguns minutos"], c:0,er:"Os receptores se adaptam ao que é constante e voltam a responder quando algo muda.",ew:"A roupa não some do córtex nem o tálamo desliga — é adaptação do receptor."},
    {lvl:2,q:"Qual o plano geral compartilhado pela maioria dos sentidos?",o:["Receptor → tálamo → córtex sensorial primário","Córtex motor → receptor → músculo → medula espinhal","Receptor → medula → corrente sanguínea"], c:0,er:"Quase todo sentido segue receptor → tálamo → córtex — o olfato é a exceção que pula o tálamo.",ew:"O caminho é receptor → tálamo → córtex, não o inverso nem via corrente sanguínea."}
  ],
  [
    {lvl:0,q:"Bastonetes e cones diferem porque:",o:["Bastonetes: pouca luz, sem cor; cones: cor e detalhe","Bastonetes: cor e detalhe; cones: pouca luz, sem cor","São idênticos, mudam apenas de posição na retina"], c:0,er:"Bastonetes para o escuro (sem cor); cones para cor e detalhe, na fóvea.",ew:"É o contrário: cor e detalhe são dos cones, não dos bastonetes."},
    {lvl:1,q:"A informação visual chega ao córtex primário em qual lobo?",o:["Occipital","Frontal","Temporal"],c:0,er:"O córtex visual primário fica no lobo occipital, bem atrás.",ew:"Visão é occipital; frontal é decisão/movimento e temporal é som/linguagem."},
    {lvl:2,q:"Por que dizemos que o cérebro 'constrói' a visão, e não apenas a recebe?",o:["Ele processa em hierarquia (bordas → formas → objetos) e preenche lacunas como o ponto cego","Porque a retina simplesmente inventa do nada todas as cores que a pessoa enxerga","Porque a visão, na verdade, não depende da luz que entra pelos olhos, e sim apenas da memória"], c:0,er:"A percepção é montada por etapas e completada a partir de pistas — daí ilusões e o preenchimento do ponto cego.",ew:"A luz é essencial e a retina não inventa: o cérebro constrói interpretando o sinal."}
  ],
  [
    {lvl:0,q:"As células ciliadas da cóclea servem para:",o:["Transformar a vibração sonora em sinal neural","Focar a luz que entra e projetá-la na retina","Detectar dano no tecido e sinalizar a dor"], c:0,er:"Elas fazem a transdução do som: a vibração dobra os cílios e gera o sinal.",ew:"Focar luz é do olho; dor é de nociceptores. As ciliadas transduzem som."},
    {lvl:1,q:"Sons de frequências diferentes ativam:",o:["Pontos diferentes ao longo da cóclea (tonotopia)","Sempre o mesmo ponto da cóclea, com força variada","O nervo óptico, que os converte em imagem"], c:0,er:"Base da cóclea = agudos; ápice = graves. Isso é tonotopia.",ew:"Não é um ponto único nem o nervo óptico — a cóclea mapeia frequência por posição."},
    {lvl:2,q:"Como o cérebro localiza de onde vem um som?",o:["Comparando pequenas diferenças de tempo e intensidade entre os dois ouvidos","Pela cor do som, que muda conforme a direção de onde ele vem","Apenas pelo volume total do som, sem comparar coisa alguma entre os dois ouvidos"], c:0,er:"O tronco compara quando e com que intensidade o som chega a cada ouvido para achar a direção.",ew:"Som não tem cor, e o volume total não basta — é a comparação entre os dois ouvidos."}
  ],
  [
    {lvl:0,q:"O 'homúnculo' no córtex somatossensorial é:",o:["Um mapa do corpo, distorcido pela densidade de receptores","Uma glândula que fica logo abaixo do córtex sensorial","Um tipo de neurotransmissor usado pelo tato e pela dor"], c:0,er:"É a representação do corpo no córtex, com partes mais sensíveis ocupando mais área.",ew:"Não é glândula nem transmissor: é um mapa cortical do corpo."},
    {lvl:1,q:"Por que mãos e lábios ocupam área tão grande no mapa somatossensorial?",o:["Têm altíssima densidade de receptores e exigem mais córtex","Porque são as maiores partes do corpo humano em superfície","Porque ficam fisicamente mais perto do cérebro que os pés"], c:0,er:"Mais receptores = mais detalhe tátil = mais córtex dedicado, não importa o tamanho da parte.",ew:"Não é tamanho nem distância: é a densidade de receptores que manda."},
    {lvl:2,q:"Por que a mesma lesão pode doer muito ou pouco conforme o contexto?",o:["A dor é construída e modulada pelo cérebro (teoria da comporta), não um sinal fixo do corpo","Porque o nociceptor muda de tamanho conforme o contexto emocional em que a pessoa se encontra","Porque a dor não existe de fato: é apenas uma interpretação sem base fisiológica"], c:0,er:"O cérebro modula a nocicepção por contexto, emoção e atenção — a dor é uma construção, não uma leitura direta.",ew:"A dor é real, mas não é fixa: o cérebro a regula, e o nociceptor não muda de tamanho."}
  ]
];

ANATOMY['sensorial']={
  title:'O mapa sensorial do córtex',
  caption:'Toque numa estrutura para ver o que é e onde fica.',
  parts:[
    {id:'receptores', label:'Receptores / estímulo', blurb:'Na periferia, receptores especializados transduzem luz, som, pressão ou química em sinal elétrico.'},
    {id:'talamo', label:'Tálamo', blurb:'A central de retransmissão: quase toda informação sensorial passa por ele antes do córtex (o olfato é a exceção).'},
    {id:'somatossensorial', label:'Córtex somatossensorial', blurb:'Recebe o tato, no lobo parietal. Organizado como um mapa do corpo (o homúnculo).'},
    {id:'auditivo', label:'Córtex auditivo', blurb:'Processa o som, no lobo temporal. Mantém a organização por frequência vinda da cóclea.'},
    {id:'visual', label:'Córtex visual', blurb:'Processa a visão, no lobo occipital. Monta a imagem em hierarquia, de bordas a objetos.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Mapa sensorial do córtex">
    <path d="M96 108 C84 60 158 36 220 42 C290 49 334 72 336 106 C337 128 319 140 296 141 L158 141 C120 141 100 130 96 108 Z" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".28"/>
    <g class="apart" data-anat="sensorial" data-struct="receptores">
      <circle cx="40" cy="104" r="8" fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="1.6"/>
      <path d="M40 94 L40 86 M30 104 L22 104 M40 114 L40 122 M31 97 L26 92 M49 97 L54 92" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </g>
    <path d="M52 104 L186 103" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M186 103 l-12 -5 l0 10 Z" fill="currentColor" opacity=".8"/>
    <g class="apart" data-anat="sensorial" data-struct="talamo">
      <ellipse cx="206" cy="104" rx="15" ry="12" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.8"/>
    </g>
    <g class="apart" data-anat="sensorial" data-struct="somatossensorial">
      <path d="M200 50 C224 46 252 50 264 62 L252 82 C228 78 208 76 200 74 Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="sensorial" data-struct="visual">
      <path d="M302 84 C322 86 334 96 334 108 C334 124 318 132 304 130 L304 102 Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="sensorial" data-struct="auditivo">
      <path d="M156 122 C176 122 202 120 220 118 C216 134 186 140 164 138 C156 134 154 128 156 122 Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <path d="M212 94 C222 82 228 76 236 72" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
    <path d="M236 72 l-8 1 l3 6 Z" fill="currentColor" opacity=".6"/>
    <path d="M220 102 C260 100 288 104 302 108" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
    <path d="M302 108 l-9 -2 l1 8 Z" fill="currentColor" opacity=".6"/>
    <path d="M200 112 C192 118 188 122 184 126" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
    <path d="M184 126 l3 -8 l6 4 Z" fill="currentColor" opacity=".6"/>
    <text x="40" y="140" text-anchor="middle">Receptores</text>
    <text x="206" y="88" text-anchor="middle">Tálamo</text>
    <text x="232" y="44" text-anchor="middle">Tato</text>
    <text x="318" y="150" text-anchor="middle">Visão</text>
    <text x="176" y="152" text-anchor="middle">Audição</text>
  </svg>`
};

DEEP['sensorial']=[
  `<p>Cada modalidade tem seu receptor: <b>fotorreceptores</b> (luz), <b>mecanorreceptores</b> (tato, som), <b>quimiorreceptores</b> (olfato, gosto), <b>termorreceptores</b> (temperatura) e <b>nociceptores</b> (dano). Cada um é uma 'linha rotulada' que diz ao cérebro <i>que tipo</i> de estímulo chegou.</p><p>A adaptação acontece em dois níveis — no próprio receptor e nos circuitos — e é o que faz a percepção destacar <b>mudanças</b> em vez de desperdiçar recurso com o que é constante.</p>`,
  `<p>A retina tem cerca de <b>120 milhões de bastonetes</b> e só <b>6 milhões de cones</b>, quase todos amontoados na fóvea. Curiosamente, os fotorreceptores <b>hiperpolarizam</b> à luz (o oposto do disparo típico).</p><p>No <b>quiasma óptico</b>, as fibras do lado nasal cruzam, de modo que cada hemisfério enxerga o campo visual <i>oposto</i>. No córtex, Hubel e Wiesel mostraram células que respondem a bordas em orientações específicas, e o sinal se divide em duas correntes: <b>dorsal</b> ('onde/como', parietal) e <b>ventral</b> ('o quê', temporal).</p>`,
  `<p>A <b>membrana basilar</b> da cóclea é rígida na base e flácida no ápice — por isso agudos a fazem vibrar na entrada e graves lá no fundo. As <b>células ciliadas externas</b> funcionam como um amplificador, afinando a sensibilidade.</p><p>A via auditiva é a mais cruzada do cérebro: passa por vários núcleos do tronco (que calculam a posição da fonte) antes do <b>corpo geniculado medial</b> do tálamo e do córtex auditivo. Perder células ciliadas é irreversível — elas não se regeneram no humano.</p>`,
  `<p>O tato fino tem receptores especializados (Merkel, Meissner, Pacini, Ruffini), cada um sintonizado a uma coisa: pressão, textura, vibração, estiramento. Tato preciso e dor sobem por <b>vias diferentes</b> na medula.</p><p>A <b>teoria da comporta</b> (Melzack e Wall) explica por que esfregar um machucado alivia: sinais de tato podem 'fechar a comporta' da dor. E há <b>modulação descendente</b> — o cérebro libera endorfinas que reduzem a dor, base do efeito placebo. Já o <b>olfato</b> projeta direto ao córtex e ao sistema límbico, sem escala no tálamo — a raiz química da memória afetiva.</p>`
];

REFERENCES['sensorial']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Tratamento completo dos sistemas sensoriais."},
  {src:"Hubel & Wiesel (Nobel 1981)",note:"Revelaram como o córtex visual detecta bordas e constrói a imagem."},
  {src:"Melzack & Wall (1965)",note:"Teoria da comporta: a dor é modulada, não um sinal fixo."}
];

/* =====================================================================
   MÓDULO 11 — SISTEMA MOTOR (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'motor', n:'11', title:'Sistema Motor', color:'var(--lime)', hex:'#a3e635',
  tag:'Como a ação sai do cérebro',
  intro:'Se o módulo anterior foi o mundo entrando, este é a resposta saindo. Todo movimento — de assinar o nome a se equilibrar numa perna — nasce de uma hierarquia que vai da intenção ao músculo. Ver como ela se organiza explica desde a destreza treinada até doenças como o Parkinson.',
  lessons:[
    {t:'A hierarquia do movimento',
     b:`<p>O movimento não é uma ordem única — é uma <span class="term">hierarquia</span>. No topo, áreas de associação definem a <strong>intenção</strong> ('pegar o copo'). No meio, o córtex motor traduz isso em <strong>comandos</strong>. Embaixo, tronco e medula cuidam da <strong>execução</strong>, ativando os músculos certos na ordem certa.</p><p>A ponta final dessa cadeia é o <span class="term">neurônio motor inferior</span>, que sai da medula e vai até o músculo — Sherrington o chamou de <strong>via final comum</strong>, porque todo comando, venha de onde vier, precisa passar por ele. A grande vantagem dessa arquitetura: você decide o objetivo sem ter que gerenciar conscientemente cada fibra muscular.</p>`},
    {t:'O córtex motor e o comando',
     b:`<p>O <span class="term">córtex motor primário</span> fica no lobo frontal, logo à frente do sulco central. Como o córtex do tato, ele guarda um mapa do corpo — o <strong>homúnculo motor</strong> — distorcido: mãos, língua e rosto ocupam áreas enormes porque exigem controle finíssimo.</p><p>Adiante dele, as áreas <strong>pré-motora</strong> e <strong>motora suplementar</strong> planejam e sequenciam o gesto antes de ele acontecer. O comando desce pelo <span class="term">trato corticoespinhal</span>, que <strong>cruza</strong> no tronco encefálico — por isso o lado esquerdo do córtex move o lado direito do corpo, e vice-versa.</p>`},
    {t:'Os afinadores: cerebelo e gânglios da base',
     b:`<p>Duas estruturas não <em>iniciam</em> o movimento, mas o tornam preciso. O <span class="term">cerebelo</span> cuida de <strong>timing, coordenação e equilíbrio</strong>: ele compara o movimento pretendido com o realizado e corrige o erro em tempo real. Danificá-lo não paralisa — deixa o gesto desajeitado e impreciso (ataxia).</p><p>Os <span class="term">gânglios da base</span> funcionam como um <strong>portão</strong>: selecionam e liberam o movimento desejado e suprimem os indesejados, ajustados pela <strong>dopamina</strong>. Quando ela falta, como no <strong>Parkinson</strong>, sobra freio: o movimento fica lento e rígido. Quando sobra sinal, aparecem movimentos involuntários. O equilíbrio entre iniciar e frear é tudo.</p>`},
    {t:'Do neurônio ao músculo',
     b:`<p>O comando chega ao músculo na <span class="term">junção neuromuscular</span>, onde o neurônio motor libera <strong>acetilcolina</strong> e dispara a contração. Um neurônio motor mais as fibras que ele comanda formam uma <span class="term">unidade motora</span> — poucas fibras para controle fino (o olho), muitas para força (a perna).</p><p>Nem tudo precisa do cérebro: o <strong>reflexo patelar</strong> é um arco na própria medula, rápido justamente porque dispensa a viagem até o córtex. E a prática muda o comando de lugar — um gesto muito treinado (dirigir, tocar) migra para o cerebelo e os gânglios da base e vira <strong>automático</strong>, liberando o córtex para outra coisa.</p>`}
  ],
  quiz:[
    {q:'O córtex motor primário fica em qual lobo?',
     o:['Occipital','Frontal','Temporal','Parietal'], c:1, l:1,
     er:'Isso. O córtex motor primário fica no <strong>lobo frontal</strong>, logo à frente do sulco central.',
     ew:'É no <strong>lobo frontal</strong>; o parietal fica logo atrás (tato) e o occipital cuida da visão.'},
    {q:'Qual estrutura NÃO inicia o movimento, mas o afina — cuidando de timing, coordenação e equilíbrio?',
     o:['O cerebelo','O córtex motor primário','A junção neuromuscular','A medula'], c:0, l:2,
     er:'Correto. O <strong>cerebelo</strong> corrige o erro e coordena; ele não dá a ordem inicial.',
     ew:'É o <strong>cerebelo</strong> que afina; o córtex comanda e a junção apenas entrega o sinal ao músculo.'},
    {q:'A degeneração de neurônios de dopamina que empobrece o movimento (lentidão, rigidez, tremor) caracteriza:',
     o:['A doença de Parkinson','A esclerose lateral amiotrófica','A afasia de Broca','A epilepsia focal'], c:0, l:2,
     er:'Sim. No <strong>Parkinson</strong>, a perda de dopamina desequilibra os gânglios da base e sobra freio ao movimento.',
     ew:'É o <strong>Parkinson</strong>; ele vem da falta de dopamina que regula os gânglios da base.'},
    {q:'Qual neurotransmissor o neurônio motor libera na junção neuromuscular para contrair o músculo?',
     o:['Dopamina','Noradrenalina','Acetilcolina','GABA'], c:2, l:3,
     er:'Exato. A <strong>acetilcolina</strong> é o mensageiro na junção neuromuscular.',
     ew:'É a <strong>acetilcolina</strong>; dopamina e serotonina atuam dentro do cérebro, não na fibra muscular.'}
  ]
});

MINI_QUIZZES['motor']=[
  [
    {lvl:0,q:"O 'neurônio motor inferior', que vai até o músculo, é chamado de:",o:["Via final comum","Córtex pré-motor","Gânglio da base"],c:0,er:"Todo comando, venha de onde vier, passa por ele antes de chegar ao músculo.",ew:"Pré-motor e gânglios da base ficam no cérebro; a via final comum é o neurônio que sai da medula."},
    {lvl:1,q:"Por que o movimento é organizado em hierarquia?",o:["Áreas altas definem a intenção; áreas baixas executam os detalhes","Porque cada músculo do corpo tem o seu próprio centro de comando","Porque o movimento não segue ordem alguma: tudo acontece ao acaso"], c:0,er:"Separar planejar de executar deixa a intenção livre da microgestão dos músculos.",ew:"Não há um cérebro por músculo, e há sim ordem: do objetivo à execução."},
    {lvl:2,q:"Qual a vantagem de separar 'planejar' e 'executar' o movimento?",o:["Decidir o objetivo sem gerenciar cada músculo conscientemente","Deixa o movimento mais lento de propósito, evitando acidentes","Elimina a necessidade de usar músculos para se movimentar"], c:0,er:"Você pensa no fim ('pegar o copo') e a maquinaria cuida do resto.",ew:"A ideia é ganhar eficiência, não lentidão — e os músculos continuam essenciais."}
  ],
  [
    {lvl:0,q:"O córtex motor primário fica:",o:["No lobo frontal, à frente do sulco central","No lobo occipital, atrás do sulco central","No cerebelo, logo abaixo do lobo temporal"], c:0,er:"Ele ocupa o giro pré-central, no lobo frontal.",ew:"Occipital é visão e o cerebelo é outro sistema; o córtex motor é frontal."},
    {lvl:1,q:"Por que mãos e rosto ocupam áreas enormes no mapa motor (homúnculo)?",o:["Exigem controle fino, com muitos neurônios dedicados","Porque são as partes mais pesadas do corpo humano","Porque ficam fisicamente mais perto do córtex motor"], c:0,er:"Mais precisão = mais córtex, independentemente do tamanho da parte.",ew:"Não é peso nem distância: é a finura do controle que manda."},
    {lvl:2,q:"O lado esquerdo do córtex motor controla qual lado do corpo?",o:["O direito — as vias cruzam no tronco","O esquerdo — as vias não cruzam","Os dois lados igualmente, sem cruzar"], c:0,er:"O trato corticoespinhal cruza no tronco, então cada hemisfério move o lado oposto.",ew:"O controle é cruzado: esquerda comanda a direita, por causa do cruzamento no tronco."}
  ],
  [
    {lvl:0,q:"O cerebelo cuida de:",o:["Coordenação, timing e equilíbrio","Produzir acetilcolina no músculo","Visão de cores e contraste fino"], c:0,er:"Ele afina o movimento: coordena, cronometra e mantém o equilíbrio.",ew:"Acetilcolina é da junção neuromuscular e cor é da visão; o cerebelo coordena."},
    {lvl:1,q:"Qual o papel dos gânglios da base no movimento?",o:["Selecionar e liberar o movimento desejado e suprimir os indesejados","Gerar a energia química que os músculos usam para se contrair","Transmitir a sensação de dor do corpo até o córtex somatossensorial"], c:0,er:"Funcionam como um portão que deixa passar o gesto certo e barra o resto.",ew:"Energia vem do metabolismo e dor é sensorial; os gânglios selecionam o movimento."},
    {lvl:2,q:"Parkinson (pouco movimento) e coreia (movimento demais) mostram que os gânglios da base:",o:["Equilibram iniciar e frear — desregular para qualquer lado atrapalha","Servem apenas para iniciar o movimento voluntário, nunca para freá-lo","Não têm nenhuma função motora: são estruturas puramente sensoriais"], c:0,er:"É um balanço: falta de dopamina trava; excesso de sinal solta demais.",ew:"Eles fazem as duas coisas — iniciar e frear — e são centrais para o movimento."}
  ],
  [
    {lvl:0,q:"A junção neuromuscular é:",o:["O ponto onde o neurônio motor comanda a fibra muscular","Uma área do córtex frontal que planeja o movimento","Um tipo de reflexo que dispensa a medula espinhal"], c:0,er:"Ali a acetilcolina passa o comando do nervo para o músculo.",ew:"Não é córtex nem reflexo: é a sinapse entre nervo e músculo."},
    {lvl:1,q:"Por que o reflexo patelar (joelho) é tão rápido?",o:["É um arco reflexo na medula, que dispensa passar pelo cérebro","Porque o cérebro processa esse caso específico muito mais rápido","Porque não envolve nervo nenhum: é o músculo reagindo sozinho"], c:0,er:"O sinal fecha o circuito na própria medula, poupando a viagem até o córtex.",ew:"Ele é rápido justamente por não subir ao cérebro — e envolve nervos, sim."},
    {lvl:2,q:"Por que um gesto muito treinado (dirigir, tocar) fica 'automático'?",o:["O controle migra para cerebelo e gânglios da base, liberando o córtex","Porque o movimento treinado deixa de usar os músculos e passa a ser mental","Porque o cérebro apaga a habilidade da memória e ela vira puro reflexo"], c:0,er:"Com a prática, a habilidade se consolida em circuitos que rodam sem atenção consciente.",ew:"Os músculos continuam, e a habilidade não é apagada — ela é automatizada."}
  ]
];

ANATOMY['motor']={
  title:'A via do movimento',
  caption:'Toque numa estrutura para ver seu papel no movimento.',
  parts:[
    {id:'motor', label:'Córtex motor', blurb:'No lobo frontal, dá o comando do movimento. Guarda o homúnculo motor, um mapa do corpo.'},
    {id:'ganglios', label:'Gânglios da base', blurb:'O portão: selecionam e liberam o movimento desejado e freiam os indesejados. Regulados pela dopamina.'},
    {id:'cerebelo', label:'Cerebelo', blurb:'Afina timing, coordenação e equilíbrio, corrigindo o erro entre o gesto pretendido e o realizado.'},
    {id:'medula', label:'Medula espinhal', blurb:'Leva o comando até o neurônio motor e abriga reflexos que dispensam o cérebro.'},
    {id:'musculo', label:'Músculo', blurb:'O destino final: a acetilcolina na junção neuromuscular dispara a contração.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 210" role="img" aria-label="A via do movimento">
    <path d="M96 106 C84 58 158 34 220 40 C290 47 334 70 336 104 C337 126 319 138 296 139 L158 139 C120 139 100 130 96 106 Z" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".28"/>
    <g class="apart" data-anat="motor" data-struct="motor">
      <path d="M186 46 C208 42 228 46 236 56 L226 76 C204 72 192 72 186 70 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="motor" data-struct="ganglios">
      <path d="M182 96 C190 90 205 90 211 98 C215 104 211 113 200 115 C189 117 180 108 182 96 Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="motor" data-struct="cerebelo">
      <path d="M300 140 C334 138 360 150 360 166 C360 180 340 178 320 175 C306 172 299 156 300 140 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
      <path d="M312 146 C322 150 322 168 316 173 M330 146 C338 152 336 168 330 174" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>
    </g>
    <path d="M206 76 C220 104 236 126 250 142" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
    <g class="apart" data-anat="motor" data-struct="medula">
      <rect x="243" y="140" width="12" height="54" rx="6" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <path d="M255 186 L286 190" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M286 190 l-11 -4 l1 9 Z" fill="currentColor" opacity=".8"/>
    <g class="apart" data-anat="motor" data-struct="musculo">
      <ellipse cx="304" cy="191" rx="16" ry="9" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
      <path d="M294 186 C300 191 300 191 294 196 M304 185 C310 191 310 191 304 197 M314 186 C320 191 320 191 314 196" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
    </g>
    <path d="M210 108 C224 118 234 128 244 150" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" opacity=".5"/>
    <path d="M312 150 C288 150 268 152 252 158" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" opacity=".5"/>
    <text x="228" y="44" text-anchor="middle">Córtex motor</text>
    <text x="168" y="104" text-anchor="end">Gânglios</text>
    <text x="336" y="192" text-anchor="middle">Cerebelo</text>
    <text x="249" y="207" text-anchor="middle">Medula</text>
    <text x="304" y="176" text-anchor="middle">Músculo</text>
  </svg>`
};

DEEP['motor']=[
  `<p>A cadeia tem dois elos nomeados: o <b>neurônio motor superior</b> (do córtex à medula) e o <b>inferior</b> (da medula ao músculo). O trato corticoespinhal <b>cruza</b> no bulbo — daí o controle contralateral.</p><p>Onde a lesão fica muda o sinal clínico: dano ao superior dá espasticidade e reflexos exagerados; ao inferior, músculo flácido e atrofiado. Essa diferença é uma ferramenta diagnóstica clássica na neurologia.</p>`,
  `<p>Nenhum neurônio isolado 'sabe' a direção do gesto. Georgopoulos mostrou que ela é um <b>código de população</b>: a soma da atividade de muitos neurônios do córtex motor aponta para onde o braço vai — princípio que hoje guia as <b>interfaces cérebro-máquina</b> que movem próteses.</p><p>Antes do movimento, as áreas pré-motora e suplementar geram um <i>potencial de prontidão</i>, atividade preparatória que precede em quase um segundo o gesto consciente.</p>`,
  `<p>O <b>cerebelo</b> funciona como um 'modelo interno': prevê o resultado do comando e, via fibras trepadeiras que sinalizam erro, ajusta a próxima tentativa. É por isso que ele é central no <b>aprendizado motor</b>.</p><p>Nos gânglios da base, uma via <b>direta</b> ('siga') e uma <b>indireta</b> ('não siga') se equilibram, e a dopamina da substância negra regula esse balanço. Sua perda causa o Parkinson — tratável, em casos avançados, com <b>estimulação cerebral profunda</b>.</p>`,
  `<p>Na junção neuromuscular, a acetilcolina abre canais na fibra e a contração começa. A <b>miastenia gravis</b> (autoimune contra esses receptores) e o <b>curare</b> bloqueiam justamente esse ponto, causando fraqueza ou paralisia.</p><p>O tamanho da <b>unidade motora</b> define a fineza: músculos do olho têm pouquíssimas fibras por neurônio; os da perna, centenas. E a medula guarda <b>geradores de padrão</b> capazes de produzir o ritmo da caminhada quase sem o cérebro.</p>`
];

REFERENCES['motor']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Tratamento completo do controle motor."},
  {src:"Georgopoulos et al. (1986)",note:"Mostraram o código de população da direção do movimento no córtex motor."},
  {src:"DeLong (1990) — circuitos dos gânglios da base",note:"Modelo que liga o desequilíbrio motor a doenças como o Parkinson."}
];

/* =====================================================================
   MÓDULO 12 — DESENVOLVIMENTO (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'desenvolvimento', n:'12', title:'Desenvolvimento', color:'var(--fuchsia)', hex:'#e879f9',
  tag:'Como o cérebro se constrói',
  intro:'Você não nasceu com o cérebro que tem agora — ele foi construído, célula por célula, numa sequência de etapas que ainda não terminou. Este módulo é como um tubo de células vira um órgão de 86 bilhões de neurônios, e por que a experiência, na hora certa, faz parte do projeto.',
  lessons:[
    {t:'Construindo o cérebro: do tubo ao órgão',
     b:`<p>Tudo começa simples: por volta da terceira semana de gestação, uma faixa de células se enrola e forma o <span class="term">tubo neural</span>. A ponta da frente incha em vesículas que darão o <strong>cérebro</strong>; o resto vira a medula.</p><p>A partir daí, a construção segue uma <span class="term">sequência</span> quase sempre igual: <strong>proliferar</strong> (fabricar neurônios), <strong>migrar</strong> (levá-los ao lugar), <strong>conectar</strong> (formar sinapses) e <strong>podar</strong> (cortar o excesso). Os <strong>genes</strong> desenham o plano geral, mas é a <strong>atividade</strong> — inclusive a experiência — que acerta os detalhes finos. Natureza e ambiente não competem: trabalham juntos.</p>`},
    {t:'Neurogênese e migração',
     b:`<p>Os neurônios nascem de células-tronco que se dividem sem parar numa região perto dos ventrículos — a <span class="term">neurogênese</span>. A maior parte dos neurônios do córtex é fabricada <strong>antes do nascimento</strong>, num ritmo impressionante.</p><p>Mas nascer não basta: cada neurônio precisa <span class="term">migrar</span> até sua posição, muitas vezes escalando fibras que funcionam como andaimes (a glia radial). O córtex se monta <strong>de dentro para fora</strong> — os primeiros a chegar formam as camadas profundas, e os seguintes passam por eles rumo à superfície. Quando essa migração dá errado, neurônios ficam no lugar errado, o que pode causar epilepsia e atrasos.</p>`},
    {t:'Fazendo conexões: sinaptogênese e a poda',
     b:`<p>Com os neurônios posicionados, os axônios saem à procura dos alvos, guiados por <strong>sinais químicos</strong> que funcionam como placas de trânsito. Então vem uma explosão de <span class="term">sinaptogênese</span>: na primeira infância, o cérebro cria <strong>muito mais sinapses do que vai usar</strong>.</p><p>O passo seguinte surpreende — o cérebro <strong>corta</strong>. A <span class="term">poda sináptica</span> elimina as conexões pouco usadas e reforça as ativas: 'use ou perca'. Ou seja, o cérebro é esculpido tanto <strong>removendo</strong> quanto adicionando. E a <strong>mielinização</strong> continua por anos — o córtex pré-frontal, do autocontrole, só se completa por volta dos 20 e poucos anos, o que ajuda a entender a impulsividade da adolescência.</p>`},
    {t:'Períodos críticos e o cérebro que continua mudando',
     b:`<p>Algumas janelas do desenvolvimento são especiais: nos <span class="term">períodos críticos</span>, a experiência molda um circuito com uma força que não se repete depois. Tapar um olho de um filhote nessa janela prejudica a visão para sempre; fazer o mesmo num adulto, não — o circuito visual só é tão moldável <strong>naquele momento</strong>.</p><p>O mesmo vale para a língua: aprender o sotaque nativo é fácil cedo e difícil depois da puberdade. Passada a janela, a <span class="term">plasticidade</span> diminui — mas <strong>não desaparece</strong>. O cérebro adulto ainda forma conexões novas e, no hipocampo, talvez até novos neurônios. O desenvolvimento nunca 'fecha' de vez: ele apenas desacelera.</p>`}
  ],
  quiz:[
    {q:'Na formação do cérebro, os neurônios recém-nascidos precisam se mover até sua posição final. Esse processo é a:',
     o:['Poda sináptica','Migração neuronal','Mielinização','Transdução sensorial'], c:1, l:1,
     er:'Isso. A <strong>migração</strong> leva cada neurônio recém-nascido até seu lugar, muitas vezes escalando a glia radial.',
     ew:'É a <strong>migração neuronal</strong>; poda corta sinapses e mielinização isola axônios.'},
    {q:'No começo da vida, o cérebro produz sinapses em excesso e depois elimina as pouco usadas. Esse processo chama-se:',
     o:['Poda sináptica','Neurogênese','Potenciação de longo prazo','Apoptose'], c:0, l:2,
     er:'Correto. A <strong>poda sináptica</strong> remove o excesso e mantém as conexões usadas — esculpir cortando.',
     ew:'É a <strong>poda sináptica</strong>; neurogênese cria neurônios e apoptose é morte celular, não de sinapses.'},
    {q:"Uma 'janela' do desenvolvimento em que a experiência molda um circuito com força especial (como a visão ou a língua materna) é um:",
     o:['Período crítico','Reflexo','Potencial de ação','Homúnculo'], c:0, l:3,
     er:'Sim. No <strong>período crítico</strong>, a experiência tem um poder de moldar o circuito que não se repete depois.',
     ew:'É um <strong>período crítico</strong>; os outros termos descrevem um reflexo, um sinal elétrico e um mapa cortical.'},
    {q:'Qual região é uma das últimas a completar a mielinização, só por volta dos 20 e poucos anos?',
     o:['O córtex visual primário','O córtex pré-frontal','O cerebelo','O bulbo raquidiano'], c:1, l:3,
     er:'Exato. O <strong>córtex pré-frontal</strong> amadurece por último — daí o autocontrole ainda em obras na adolescência.',
     ew:'É o <strong>córtex pré-frontal</strong>; áreas sensoriais e o tronco se mielinizam bem mais cedo.'}
  ]
});

MINI_QUIZZES['desenvolvimento']=[
  [
    {lvl:0,q:"O cérebro começa a se formar a partir de uma estrutura chamada:",o:["Tubo neural","Junção neuromuscular","Corpo caloso"],c:0,er:"O tubo neural surge cedo na gestação e sua ponta vira o cérebro.",ew:"A junção neuromuscular e o corpo caloso vêm bem depois; o começo é o tubo neural."},
    {lvl:1,q:"Qual a ordem geral da construção do cérebro?",o:["Proliferar → migrar → conectar → podar","Podar → migrar → nascer → conectar","Conectar → nascer → proliferar → podar"], c:0,er:"Primeiro fabrica-se, posiciona-se, conecta-se e só então corta-se o excesso.",ew:"Não dá para podar ou conectar antes de os neurônios nascerem e chegarem ao lugar."},
    {lvl:2,q:"O que guia a construção do cérebro?",o:["Genes definem o plano e a atividade/experiência ajusta os detalhes","Apenas os genes, sem nenhuma influência do ambiente ou da experiência","Apenas o ambiente, sem nenhum papel dos genes na formação do cérebro"], c:0,er:"Natureza e ambiente colaboram: o gene desenha, a experiência afina.",ew:"Não é um ou outro — genes e experiência agem juntos no desenvolvimento."}
  ],
  [
    {lvl:0,q:"Migração neuronal é:",o:["O deslocamento dos neurônios recém-nascidos até sua posição","A morte programada das sinapses que não são utilizadas","A produção da bainha de mielina em volta dos axônios"], c:0,er:"Depois de nascer, o neurônio viaja até seu lugar no córtex.",ew:"Morte de sinapse é poda e mielina é isolamento; migração é o deslocamento do neurônio."},
    {lvl:1,q:"Quando a maioria dos neurônios do córtex é gerada?",o:["Antes do nascimento","Somente na velhice","Somente na adolescência"], c:0,er:"Quase todo o estoque cortical é fabricado ainda no útero.",ew:"A produção principal é pré-natal, não na adolescência nem na velhice."},
    {lvl:2,q:"Por que a época (timing) da migração importa tanto?",o:["Erros de migração deixam neurônios no lugar errado e podem causar transtornos","Porque migrar cedo demais deixa o cérebro mais leve e menos eficiente","Porque a posição final do neurônio não altera em nada o funcionamento do circuito"], c:0,er:"Um neurônio no lugar errado bagunça o circuito — daí epilepsias e atrasos ligados a falhas de migração.",ew:"A posição é decisiva para o circuito funcionar; não é questão de peso."}
  ],
  [
    {lvl:0,q:"A poda sináptica no início da vida:",o:["Elimina as sinapses pouco usadas","Cria neurônios inteiramente novos","Produz a dopamina do circuito"], c:0,er:"Ela remove o excesso de conexões, mantendo as que a experiência usa.",ew:"Criar neurônios é neurogênese; a poda corta sinapses, não as cria."},
    {lvl:1,q:"Por que faz sentido o cérebro criar sinapses demais e depois cortar?",o:["Deixa a experiência selecionar quais conexões manter ('use ou perca')","É um desperdício sem nenhuma função, herdado de estágios antigos da evolução","Serve apenas para deixar o cérebro fisicamente maior e mais pesado"], c:0,er:"Superproduzir e podar deixa o ambiente esculpir o circuito sob medida.",ew:"Não é desperdício nem questão de tamanho — é seleção pela experiência."},
    {lvl:2,q:"A mielinização do córtex pré-frontal só termina por volta dos 20 e poucos anos. Isso ajuda a explicar:",o:["Por que autocontrole e planejamento amadurecem tarde na adolescência","Por que as crianças pequenas ainda não conseguem enxergar direito","Por que os adultos já não conseguem aprender nada de realmente novo"], c:0,er:"O 'freio' pré-frontal fica pronto por último, enquanto o sistema de recompensa já está a todo vapor.",ew:"Crianças enxergam e adultos aprendem; o que amadurece tarde é o controle pré-frontal."}
  ],
  [
    {lvl:0,q:"Um período crítico é:",o:["Uma janela em que a experiência molda um circuito com força especial","Um tipo específico de neurônio que só existe durante a primeira infância","Uma doença do desenvolvimento que impede o cérebro de amadurecer"], c:0,er:"É uma fase em que a experiência tem poder extra de moldar o cérebro.",ew:"Não é um neurônio nem uma doença: é uma janela de moldabilidade."},
    {lvl:1,q:"O que acontece com a plasticidade depois de um período crítico?",o:["Ela diminui, mas não desaparece por completo","Ela some totalmente, e para sempre","Ela chega ao seu ponto máximo dali em diante"], c:0,er:"A janela fecha em parte: mudar fica mais difícil, não impossível.",ew:"A plasticidade não zera nem dispara — ela apenas desacelera."},
    {lvl:2,q:"Cobrir um olho de um filhote no período crítico prejudica a visão para sempre; num adulto, não. Isso mostra que:",o:["O circuito visual é especialmente moldável naquela janela do desenvolvimento","Porque o olho que ficou coberto simplesmente apodrece e para de funcionar","Porque a visão não depende do cérebro, e sim apenas da saúde do próprio olho"], c:0,er:"A mesma privação tem efeitos opostos porque o circuito só é tão plástico naquele momento.",ew:"O olho não apodrece, e a visão é toda construída no cérebro; o que muda é a janela."}
  ]
];

ANATOMY['desenvolvimento']={
  title:'Como o cérebro se constrói',
  caption:'Toque numa etapa para ver o que acontece nela.',
  parts:[
    {id:'tubo', label:'Tubo neural', blurb:'O ponto de partida: uma faixa de células se enrola num tubo cuja ponta da frente vira o cérebro.'},
    {id:'neurogenese', label:'Neurogênese', blurb:'Células-tronco se dividem e fabricam neurônios — a maioria dos do córtex, antes do nascimento.'},
    {id:'migracao', label:'Migração', blurb:'Cada neurônio viaja até sua posição, escalando a glia radial. O córtex se monta de dentro para fora.'},
    {id:'sinaptogenese', label:'Sinaptogênese', blurb:'Os neurônios se conectam em excesso, criando muito mais sinapses do que serão usadas.'},
    {id:'poda', label:'Poda + mielina', blurb:'As conexões pouco usadas são cortadas e as ativas, reforçadas e isoladas por mielina. Use ou perca.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 480 180" role="img" aria-label="Etapas da construção do cérebro">
    <g class="apart" data-anat="desenvolvimento" data-struct="tubo">
      <rect x="36" y="44" width="26" height="60" rx="13" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.6"/>
      <line x1="49" y1="52" x2="49" y2="96" stroke="currentColor" stroke-width="1.2" opacity=".5"/>
    </g>
    <g class="apart" data-anat="desenvolvimento" data-struct="neurogenese">
      <circle cx="138" cy="60" r="8" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="158" cy="66" r="8" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5"/>
      <path d="M140 86 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5"/>
      <line x1="149" y1="79" x2="149" y2="95" stroke="currentColor" stroke-width="1.4"/>
    </g>
    <g class="apart" data-anat="desenvolvimento" data-struct="migracao">
      <line x1="250" y1="46" x2="250" y2="104" stroke="currentColor" stroke-width="1.4" opacity=".55"/>
      <circle cx="250" cy="92" r="7" fill="currentColor" fill-opacity=".24" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="250" cy="70" r="7" fill="currentColor" fill-opacity=".24" stroke="currentColor" stroke-width="1.5"/>
      <path d="M250 60 l-5 8 l10 0 Z" fill="currentColor" opacity=".7"/>
    </g>
    <g class="apart" data-anat="desenvolvimento" data-struct="sinaptogenese">
      <circle cx="350" cy="74" r="9" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
      <path d="M350 65 L350 48 M341 70 L326 60 M359 70 L374 60 M343 82 L330 94 M357 82 L370 94 M350 83 L350 100" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <circle cx="350" cy="46" r="2.2" fill="currentColor"/><circle cx="324" cy="59" r="2.2" fill="currentColor"/><circle cx="376" cy="59" r="2.2" fill="currentColor"/><circle cx="329" cy="96" r="2.2" fill="currentColor"/><circle cx="371" cy="96" r="2.2" fill="currentColor"/><circle cx="350" cy="102" r="2.2" fill="currentColor"/>
    </g>
    <g class="apart" data-anat="desenvolvimento" data-struct="poda">
      <circle cx="446" cy="74" r="9" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
      <path d="M446 65 L446 48 M439 80 L428 94 M453 80 L464 94" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <rect x="443" y="50" width="6" height="12" rx="3" fill="currentColor" fill-opacity=".5" stroke="currentColor" stroke-width="1"/>
      <circle cx="446" cy="46" r="2.2" fill="currentColor"/><circle cx="426" cy="96" r="2.2" fill="currentColor"/><circle cx="466" cy="96" r="2.2" fill="currentColor"/>
    </g>
    <path d="M74 74 L114 74 M174 74 L214 74 M274 74 L314 74 M370 74 L410 74" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>
    <path d="M114 74 l-10 -4 l0 8 Z M214 74 l-10 -4 l0 8 Z M314 74 l-10 -4 l0 8 Z M410 74 l-10 -4 l0 8 Z" fill="currentColor" opacity=".45"/>
    <text x="49" y="126" text-anchor="middle">Tubo neural</text>
    <text x="149" y="126" text-anchor="middle">Neurogênese</text>
    <text x="250" y="126" text-anchor="middle">Migração</text>
    <text x="350" y="126" text-anchor="middle">Sinaptogênese</text>
    <text x="446" y="126" text-anchor="middle">Poda</text>
    <text x="446" y="140" text-anchor="middle">+ mielina</text>
  </svg>`
};

DEEP['desenvolvimento']=[
  `<p>O <b>tubo neural</b> se fecha por volta da quarta semana e logo forma três vesículas — prosencéfalo, mesencéfalo e rombencéfalo —, os embriões do cérebro anterior, médio e posterior. Falhas no fechamento causam malformações graves (como a espinha bífida), e é por isso que o <b>ácido fólico</b> é recomendado antes e no início da gravidez.</p><p>No pico da produção, o cérebro fetal chega a gerar centenas de milhares de neurônios <i>por minuto</i>, a caminho dos cerca de 86 bilhões do adulto.</p>`,
  `<p>Os neurônios sobem por fibras da <b>glia radial</b> como quem escala um cabo, e o córtex é montado <b>de dentro para fora</b>: as camadas profundas primeiro, as superficiais depois (a hipótese da unidade radial, de Rakic).</p><p>Quando a migração falha em massa, o resultado pode ser um córtex liso, sem os sulcos normais (<b>lisencefalia</b>), acompanhado de epilepsia grave e atraso — prova de que <i>onde</i> o neurônio para é tão importante quanto o fato de ele existir.</p>`,
  `<p>A densidade de sinapses dispara na infância e depois <b>cai cerca de 40%</b> até a vida adulta. A poda é guiada pela atividade — e a <b>micróglia</b>, célula imune do cérebro, literalmente 'come' as sinapses fracas.</p><p>A mielinização avança de trás para a frente, deixando o <b>pré-frontal</b> por último. Isso cria o descompasso da adolescência: os sistemas de emoção e recompensa amadurecem antes do freio pré-frontal — uma explicação biológica para o gosto por risco na fase.</p>`,
  `<p>Os <b>períodos críticos</b> foram demonstrados por Hubel e Wiesel: tapar um olho de um filhote reorganiza permanentemente as colunas de dominância ocular no córtex. Hoje se sabe que 'freios' moleculares (como as redes perineuronais) <b>fecham</b> essas janelas — e há pesquisa tentando reabri-las.</p><p>Na linguagem, o sotaque nativo se fixa cedo e um segundo idioma custa mais após a puberdade. Ainda assim, a plasticidade adulta persiste, e o hipocampo pode gerar novos neurônios — o cérebro nunca para totalmente de se refazer.</p>`
];

REFERENCES['desenvolvimento']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Capítulos de desenvolvimento do sistema nervoso."},
  {src:"Hubel & Wiesel (1970)",note:"Demonstraram o período crítico da visão e a dominância ocular."},
  {src:"Stiles & Jernigan (2010) — The Basics of Brain Development",note:"Revisão acessível de todas as etapas do neurodesenvolvimento."}
];

/* =====================================================================
   MÓDULO 13 — LINGUAGEM (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'linguagem', n:'13', title:'Linguagem', color:'var(--indigo)', hex:'#818cf8',
  tag:'Como o cérebro fala e entende',
  intro:'Falar parece automático, mas é uma das coisas mais complexas — e mais humanas — que seu cérebro faz. Este módulo é sobre a rede que transforma pensamento em palavra e som em sentido, o que acontece quando ela se rompe, e por que ler e sinalizar cabem nela também.',
  lessons:[
    {t:'O cérebro que fala: a rede da linguagem',
     b:`<p>Em grande parte das pessoas, várias operações linguísticas apresentam predominância no <span class="term">hemisfério esquerdo</span>, mas a linguagem não “mora” em um ponto. O modelo clássico destacou a <strong>região de Broca</strong>, frontal, e a <strong>região de Wernicke</strong>, temporoparietal, porque lesões próximas delas frequentemente alteram produção ou compreensão.</p><p>Hoje, esses nomes funcionam melhor como <strong>referências históricas dentro de redes distribuídas</strong>. Regiões frontais, temporais, parietais, motoras, subcorticais e cerebelares cooperam por várias vias. E uma distinção importante: <strong>linguagem não é o mesmo que fala</strong>; fala é uma das formas de expressar um sistema que também sustenta compreensão, escrita, leitura e gesto.</p>`},
    {t:'Broca e Wernicke: produzir e compreender',
     b:`<p>A proximidade anatômica ainda ensina algo: regiões frontais da linguagem interagem intensamente com sistemas que planejam e executam movimentos da fala, enquanto regiões temporais interagem com sistemas auditivos e com conhecimentos sobre palavras e conceitos. Mas proximidade não significa exclusividade.</p><p>Repetir uma palavra ouvida exige uma <strong>cadeia distribuída</strong>: analisar o som, reconhecer padrões fonológicos, acessar a forma da palavra, manter a sequência, preparar a articulação, executar e monitorar a própria saída. O fascículo arqueado participa dessa comunicação, mas existem outras vias dorsais e ventrais; não há uma fila rígida com uma função inteira guardada em cada estação.</p>`},
    {t:'Quando a linguagem quebra: as afasias',
     b:`<p>Quando uma lesão (em geral à esquerda) atinge essa rede, surge a <span class="term">afasia</span> — a perda de linguagem. E o tipo de perda depende de <strong>onde</strong> foi o dano, o que é justamente como a linguagem foi mapeada.</p><p>Na <strong>afasia de Broca</strong>, a fala fica <strong>não fluente</strong> e trabalhosa, quase telegráfica, mas a pessoa <strong>compreende</strong> e percebe a própria dificuldade — o que é angustiante. Na <strong>afasia de Wernicke</strong>, o oposto: a fala flui, mas <strong>sem sentido</strong>, cheia de palavras trocadas, e a compreensão falha — muitas vezes sem a pessoa perceber. Essas dissociações opostas são uma prova viva de que regiões diferentes fazem trabalhos diferentes.</p>`},
    {t:'Mais que palavras: leitura, sotaque e o cérebro bilíngue',
     b:`<p>Nem tudo na linguagem é herdado. A <span class="term">leitura</span> é uma invenção cultural recente demais para ter uma área própria na evolução — então o cérebro <strong>reaproveita</strong> regiões visuais que já existiam para reconhecer palavras. Aprender a ler literalmente reprograma um pedaço do córtex visual.</p><p>Outros aspectos se espalham: a <strong>entonação emocional</strong> da fala envolve mais o hemisfério direito, e o <strong>sotaque</strong> nativo se fixa cedo (lembra dos períodos críticos?). A prova mais elegante de que essas áreas servem à <em>linguagem</em>, e não só ao som: a <strong>língua de sinais</strong> é processada pelas mesmas regiões à esquerda — e uma lesão ali pode causar afasia para os sinais.</p>`}
  ],
  quiz:[
    {q:'Na maioria das pessoas, a linguagem depende principalmente de qual hemisfério?',
     o:['O direito','O esquerdo','Nenhum dos dois','Sempre os dois igualmente'], c:1, l:0,
     er:'Isso. Na maioria das pessoas a linguagem é <strong>lateralizada à esquerda</strong>.',
     ew:'É o <strong>hemisfério esquerdo</strong> na maioria; o direito costuma cuidar mais da entonação emocional.'},
    {q:'A área de Broca, no lobo frontal, está mais ligada a:',
     o:['Produzir a fala e a gramática','Compreender o significado das palavras','Enxergar as letras','Ouvir os sons'], c:0, l:1,
     er:'Correto. <strong>Broca</strong> fica ao lado do córtex motor e cuida de produzir a fala e a gramática.',
     ew:'Broca <strong>produz</strong>; quem compreende o significado é a área de Wernicke, no temporal.'},
    {q:'Uma pessoa que fala de forma fluente, mas sem sentido, e tem dificuldade de compreender, provavelmente tem lesão na:',
     o:['Área de Broca','Área de Wernicke','Medula espinhal','Amígdala cerebral'], c:1, l:2,
     er:'Sim. É o quadro da <strong>afasia de Wernicke</strong>: fala fluente e sem sentido, compreensão prejudicada.',
     ew:'Isso é lesão em <strong>Wernicke</strong>; em Broca a fala fica não fluente, mas com sentido e compreensão preservada.'},
    {q:'A língua de sinais é processada pelas mesmas áreas de linguagem do hemisfério esquerdo. Isso mostra que essas áreas servem para:',
     o:['A linguagem em si, não apenas para o som/fala','Apenas para ouvir e processar os sons da fala falada','Apenas para mover as mãos e os braços','Apenas para ler palavras escritas'], c:0, l:3,
     er:'Exato. Elas processam <strong>linguagem</strong> em qualquer forma — falada ou sinalizada.',
     ew:'Servem à <strong>linguagem</strong> em si: por isso a língua de sinais usa as mesmas regiões da fala.'}
  ]
});

MINI_QUIZZES['linguagem']=[
  [
    {lvl:0,q:"Na maioria das pessoas, a linguagem fica mais no hemisfério:",o:["Esquerdo","Direito","Nenhum dos dois"],c:0,er:"A linguagem é, em geral, lateralizada à esquerda.",ew:"É o esquerdo na maioria; o direito cuida mais da entonação emocional."},
    {lvl:1,q:"No modelo clássico, o que o fascículo arqueado faz?",o:["Conecta a área de compreensão (Wernicke) à de produção (Broca)","Produz a dopamina que as áreas de linguagem consomem ao serem usadas","Move diretamente os músculos da boca durante a fala"], c:0,er:"É o cabo que liga o entender ao falar.",ew:"Ele não produz transmissor nem move músculos — conecta Wernicke e Broca."},
    {lvl:2,q:"Por que hoje se diz que a linguagem é uma 'rede', não só dois pontos?",o:["Várias regiões conectadas participam; Broca e Wernicke são uma simplificação útil","Porque, na verdade, não existe nenhuma área do cérebro que seja dedicada à linguagem","Porque toda a linguagem cabe dentro de um único neurônio especializado"], c:0,er:"O modelo de dois centros ajuda, mas a linguagem real emerge de muitas áreas conversando.",ew:"Existem sim regiões de linguagem, e elas são muitas — não um ponto só."}
  ],
  [
    {lvl:0,q:"A região frontal tradicionalmente chamada de Broca participa mais diretamente de:",o:["Organizar e preparar sequências linguísticas e articulatórias dentro de uma rede","Ouvir e entender música de forma isolada","Enxergar cores e formas sem participação de outras áreas"], c:0,er:"É um nó frontal de uma rede ampla; contribui para seleção, organização e preparação da linguagem e da articulação.",ew:"Ela não é um centro isolado da fala: participa de operações linguísticas e motoras em conjunto com outras regiões."},
    {lvl:1,q:"Por que o caminho Broca–Wernicke é chamado de modelo clássico?",o:["Porque resume a linguagem em poucos nós e uma conexão, mas redes reais são mais distribuídas","Porque descreve toda forma de linguagem sem exceções","Porque elimina a participação de regiões motoras e sensoriais"], c:0,er:"O modelo clássico é útil historicamente, mas produção, compreensão e repetição dependem de redes corticais, subcorticais e de várias vias.",ew:"Broca e Wernicke são referências; não são as duas únicas áreas responsáveis pela linguagem."},
    {lvl:2,q:"Por que faz sentido Broca ficar perto do córtex motor e Wernicke perto do auditivo?",o:["Produzir a fala usa o motor; compreender parte do som — cada hub fica perto do que precisa","É pura coincidência anatômica, sem relação com a função que cada área exerce","Porque nenhuma das duas áreas tem função realmente definida, então a posição delas é indiferente"], c:0,er:"A anatomia segue a função: falar é motor, entender começa no som.",ew:"Não é acaso: cada centro fica junto do sistema de que depende."}
  ],
  [
    {lvl:0,q:"Afasia é:",o:["Perda de linguagem por lesão cerebral","Um tipo de neurônio do lobo temporal","Uma perda de visão de origem cortical"], c:0,er:"É a linguagem que se perde ou se altera após um dano no cérebro.",ew:"Não é neurônio nem visão: é a perda de linguagem."},
    {lvl:1,q:"Na afasia de Broca, a fala é:",o:["Não fluente e trabalhosa, mas a compreensão costuma se manter","Fluente e cheia de sentido, com a compreensão totalmente preservada","Perfeitamente normal, sem nenhuma alteração perceptível"], c:0,er:"Custa a sair e soa telegráfica, embora a pessoa entenda o que ouve.",ew:"Fala fluente e com sentido é o contrário do quadro de Broca."},
    {lvl:2,q:"Por que as afasias foram tão importantes para mapear a linguagem?",o:["Perdas diferentes conforme o local da lesão revelaram quais regiões fazem o quê","Porque provaram que o cérebro não tem importância alguma para a linguagem humana","Porque toda lesão cerebral acaba produzindo exatamente o mesmo sintoma"], c:0,er:"Lesões em lugares distintos apagam funções distintas — um mapa desenhado pela doença.",ew:"Justamente porque os sintomas variam com o local é que elas ensinam tanto."}
  ],
  [
    {lvl:0,q:"A leitura, do ponto de vista da evolução, é:",o:["Uma invenção cultural recente, sem área própria herdada","Um instinto tão antigo quanto a visão e a audição humanas","Algo impossível de aprender sem uma área dedicada"], c:0,er:"Escrever e ler são jovens demais para terem um circuito herdado.",ew:"A leitura não é instinto antigo nem impossível — é cultural e aprendida."},
    {lvl:1,q:"Como o cérebro consegue ler, então?",o:["Reaproveita áreas visuais já existentes para reconhecer palavras","Cria um órgão inteiramente novo, dedicado apenas à leitura de palavras","Usa o cerebelo para enxergar e decodificar as letras"], c:0,er:"Ele recicla parte do córtex visual para virar um 'reconhecedor de palavras'.",ew:"Não surge órgão novo, e não é o cerebelo: é reaproveitamento do visual."},
    {lvl:2,q:"Pessoas surdas com lesão à esquerda podem ter afasia para a língua de sinais. Isso indica que:",o:["As áreas de linguagem servem à linguagem em si, não só ao som falado","A língua de sinais, na verdade, não usa o cérebro, e sim apenas as mãos","Só a fala é linguagem de verdade; os sinais são apenas gestos"], c:0,er:"A mesma região trata linguagem falada ou sinalizada — é amodal.",ew:"Sinais usam o cérebro e são linguagem plena; por isso a lesão causa afasia."}
  ]
];

ANATOMY['linguagem']={
  title:'A rede da linguagem (hemisfério esquerdo)',
  caption:'Toque numa estrutura para ver seu papel na linguagem.',
  parts:[
    {id:'broca', label:'Região de Broca', blurb:'Referência frontal de uma rede distribuída; participa da seleção, organização e preparação de sequências linguísticas e articulatórias.'},
    {id:'wernicke', label:'Região de Wernicke', blurb:'Referência temporoparietal de redes que analisam a fala e integram palavras, significado e contexto.'},
    {id:'arqueado', label:'Fascículo arqueado', blurb:'O feixe de fibras que conecta a compreensão (Wernicke) à produção (Broca).'},
    {id:'auditivo', label:'Entrada auditiva', blurb:'O som chega pelo córtex auditivo e alimenta a compreensão, em Wernicke.'},
    {id:'motor', label:'Saída motora (fala)', blurb:'O córtex motor executa o comando de Broca, movendo boca e língua para falar.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 200" role="img" aria-label="Rede da linguagem no hemisfério esquerdo">
    <path d="M96 106 C84 58 158 34 220 40 C290 47 334 70 336 104 C337 126 319 140 296 141 L158 141 C120 141 100 130 96 106 Z" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".28"/>
    <path d="M150 100 C160 64 244 62 252 104" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <g class="apart" data-anat="linguagem" data-struct="arqueado">
      <path d="M150 100 C160 64 244 62 252 104" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" opacity="0"/>
    </g>
    <g class="apart" data-anat="linguagem" data-struct="broca">
      <path d="M130 100 C140 95 156 97 163 106 C165 113 158 122 147 123 C136 124 125 113 130 100 Z" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="linguagem" data-struct="wernicke">
      <path d="M236 106 C248 103 262 106 266 115 C264 126 250 130 240 128 C231 126 229 112 236 106 Z" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="linguagem" data-struct="motor">
      <ellipse cx="182" cy="86" rx="12" ry="9" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.5"/>
    </g>
    <g class="apart" data-anat="linguagem" data-struct="auditivo">
      <ellipse cx="222" cy="126" rx="12" ry="8" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.5"/>
    </g>
    <path d="M226 120 C232 116 236 114 240 116" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".55"/>
    <path d="M240 116 l-7 0 l3 5 Z" fill="currentColor" opacity=".55"/>
    <path d="M158 100 C168 92 174 90 178 90" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".55"/>
    <path d="M178 90 l-6 -3 l0 6 Z" fill="currentColor" opacity=".55"/>
    <text x="140" y="140" text-anchor="middle">Broca</text>
    <text x="255" y="140" text-anchor="middle">Wernicke</text>
    <text x="201" y="58" text-anchor="middle">Arqueado</text>
    <text x="182" y="70" text-anchor="middle">fala</text>
    <text x="222" y="146" text-anchor="middle">audição</text>
  </svg>`
};

DEEP['linguagem']=[
  `<p>A lateralização é forte, mas não universal: cerca de <b>95%</b> dos destros têm a linguagem à esquerda, proporção menor entre canhotos. O antigo modelo de Broca-Wernicke deu lugar a uma visão de <b>duas correntes</b>: uma dorsal, que liga som a articulação, e uma ventral, que liga som a significado.</p><p>Na prática, lesões que causam afasia de Broca costumam ser bem maiores que a área de Broca 'clássica' — mais um sinal de que a linguagem é uma rede.</p>`,
  `<p>A neurologia da linguagem nasceu na clínica: em <b>1861</b>, Broca descreveu um paciente que só dizia 'tan' e tinha lesão frontal esquerda; em <b>1874</b>, Wernicke ligou o temporal posterior à compreensão. Geschwind depois destacou o <b>fascículo arqueado</b>.</p><p>Lesar só esse feixe produz a <b>afasia de condução</b>: a pessoa compreende e fala com fluência, mas não consegue <i>repetir</i> — porque o elo entre entender e produzir foi cortado.</p>`,
  `<p>As afasias são um estudo de <b>dissociações</b>: Broca (não fluente, agramática, com o paciente ciente e frustrado) versus Wernicke (fluente, cheia de neologismos, com compreensão ruim e, muitas vezes, sem consciência do erro).</p><p>Lesões extensas causam a <b>afasia global</b>, com perda de produção e compreensão. Essa lógica — inferir a função pela forma exata da perda — é a base da neuropsicologia cognitiva.</p>`,
  `<p>Dehaene chama de <b>reciclagem neuronal</b> o que a leitura faz: uma região do córtex visual (a 'área da forma visual das palavras') passa a reconhecer letras, embora a escrita seja jovem demais para ter moldado a evolução.</p><p>Já a <b>prosódia</b> — a melodia emocional da fala — recruta mais o hemisfério direito. E a <b>língua de sinais</b> ativa as mesmas áreas perisilvianas esquerdas da fala (Bellugi e Klima): a prova definitiva de que esses circuitos servem à linguagem, seja qual for o canal.</p>`
];

REFERENCES['linguagem']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Capítulos sobre a linguagem e suas patologias."},
  {src:"Broca (1861) & Wernicke (1874)",note:"Os estudos de caso que fundaram a neurologia da linguagem."},
  {src:"Dehaene — Reading in the Brain",note:"Como o cérebro reaproveita o córtex visual para aprender a ler."}
];

/* =====================================================================
   MÓDULO 14 — NEUROCIÊNCIA CLÍNICA (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'clinica', n:'14', title:'Neurociência Clínica', color:'var(--sky)', hex:'#38bdf8',
  tag:'O que acontece quando o cérebro adoece',
  intro:'Entender o cérebro saudável é também entender o que acontece quando ele adoece — e boa parte do que sabemos veio justamente das doenças. Aqui você vê as quatro grandes formas de o cérebro falhar e as condições que cada uma produz, dos tremores do Parkinson à biologia da depressão.',
  lessons:[
    {t:'O que dá errado no cérebro',
     b:`<p>O cérebro pode falhar de <span class="term">modos diferentes</span>, e reconhecê-los organiza toda a neurologia. Neurônios podem <strong>morrer aos poucos</strong> (degeneração), a atividade <strong>elétrica</strong> pode se descontrolar, o <strong>sangue</strong> pode ser cortado, ou a <strong>química e os circuitos</strong> podem se desregular.</p><p>Uma ferramenta atravessa tudo isso: a <span class="term">localização</span>. Como cada região tem sua função, o <strong>sintoma aponta o local</strong> — perder a fala sugere o hemisfério esquerdo; um tremor sugere os gânglios da base. É a mesma lógica das afasias, agora aplicada a todo o cérebro. No fundo, as doenças são os sistemas dos módulos anteriores <strong>deixando de funcionar</strong>.</p>`},
    {t:'Doenças neurodegenerativas: Parkinson e Alzheimer',
     b:`<p>Nas <span class="term">doenças neurodegenerativas</span>, os neurônios morrem progressivamente, muitas vezes por acúmulo de proteínas 'defeituosas'. No <strong>Parkinson</strong>, morrem os neurônios de <strong>dopamina</strong> da substância negra; sem eles, os gânglios da base travam o movimento, gerando lentidão, rigidez e tremor. Repor a dopamina alivia os sintomas.</p><p>No <strong>Alzheimer</strong>, placas e emaranhados de proteína se acumulam e destroem neurônios, começando em regiões do lobo temporal ligadas à <strong>memória</strong>, como o hipocampo — por isso o primeiro sinal costuma ser o esquecimento. Com o tempo, a degeneração se espalha e atinge outras funções.</p>`},
    {t:'Elétrico e vascular: epilepsia e AVC',
     b:`<p>Nem toda doença mata células — algumas atacam o <strong>funcionamento</strong>. Na <span class="term">epilepsia</span>, grupos de neurônios disparam de forma <strong>excessiva e sincronizada</strong>, e essa 'tempestade' elétrica produz as crises. O equilíbrio normal entre excitação e inibição pende para a excitação; muitos casos são bem controlados com tratamento.</p><p>Já o <span class="term">AVC</span> (derrame) é vascular: o sangue que alimenta uma região é <strong>interrompido</strong>, e sem oxigênio os neurônios morrem em <strong>minutos</strong>. Por isso 'tempo é cérebro' — tratar rápido salva tecido. E como o déficit depende do <strong>território</strong> atingido, dois AVCs podem dar sintomas completamente diferentes: um afeta a fala, outro, o movimento de um lado.</p>`},
    {t:'O cérebro e a mente: transtornos psiquiátricos',
     b:`<p>Depressão, ansiedade e esquizofrenia são diferentes das doenças anteriores: em geral <strong>não há uma lesão única</strong> a apontar. Elas emergem de <span class="term">circuitos</span> e <strong>neurotransmissores</strong> desregulados — sobretudo redes que ligam o córtex pré-frontal ao sistema límbico —, somados a <strong>genes e ambiente</strong>.</p><p>Isso não as torna menos reais. São <span class="term">condições do cérebro</span>, tão biológicas quanto as outras, e <strong>tratáveis</strong>: a psicoterapia remodela circuitos pela própria plasticidade e os medicamentos ajustam a química. Encará-las como 'falta de força de vontade' é um erro — buscar ajuda é cuidar de um órgão que adoeceu, como qualquer outro.</p>`}
  ],
  quiz:[
    {q:'Os sintomas de uma doença cerebral ajudam os médicos a descobrir, sobretudo:',
     o:['A cor dos neurônios afetados','O local afetado no cérebro','O tipo sanguíneo do paciente','A idade exata da pessoa'], c:1, l:0,
     er:'Isso. Pela <strong>localização</strong>, o sintoma revela qual região foi atingida — a lógica das afasias, ampliada.',
     ew:'O sintoma aponta o <strong>local afetado</strong>: cada região tem sua função, então a perda revela onde está o dano.'},
    {q:'A doença de Parkinson resulta principalmente da perda de neurônios que produzem:',
     o:['Dopamina, na substância negra','Insulina, produzida no pâncreas','Hemoglobina, no sangue','Queratina, na pele'], c:0, l:1,
     er:'Correto. Sem a <strong>dopamina</strong> da substância negra, os gânglios da base travam o movimento.',
     ew:'É a <strong>dopamina</strong>; insulina, hemoglobina e queratina nem são feitas por esses neurônios.'},
    {q:'Um AVC (derrame) causa dano porque:',
     o:['O fluxo de sangue para uma região é interrompido e os neurônios morrem por falta de oxigênio','O cérebro fica sem sono por tempo demais e as células acabam entrando em colapso','Há excesso de vitaminas circulando no sangue, o que acaba intoxicando os neurônios daquela região','Os músculos do corpo encolhem e deixam de enviar sinais de volta ao cérebro'], c:0, l:2,
     er:'Sim. Sem sangue e oxigênio, os neurônios morrem em minutos — por isso tratar rápido é decisivo.',
     ew:'O problema é <strong>vascular</strong>: o sangue é cortado e o tecido morre por falta de oxigênio.'},
    {q:'Sobre transtornos psiquiátricos como a depressão, é correto dizer que:',
     o:['São condições reais do cérebro, envolvendo circuitos e química, e são tratáveis','São apenas falta de força de vontade e de disciplina da parte de quem sofre com eles','Não têm nenhuma base biológica conhecida e, por isso, não podem ser medidos','Não podem ser tratados de forma alguma: quem tem, tem para o resto da vida'], c:0, l:3,
     er:'Exato. São <strong>condições do cérebro</strong>, biológicas e tratáveis — com terapia e medicação.',
     ew:'São condições reais e <strong>tratáveis</strong>; reduzi-las a falta de vontade é impreciso e injusto.'}
  ]
});

MINI_QUIZZES['clinica']=[
  [
    {lvl:0,q:"Uma forma de o cérebro adoecer é a degeneração, que significa:",o:["Neurônios morrendo ou funcionando mal progressivamente","Neurônios se multiplicando demais e ocupando espaço","O cérebro inteiro crescendo de tamanho com a idade"], c:0,er:"Degenerar é perder neurônios aos poucos, como no Parkinson e no Alzheimer.",ew:"Não é multiplicação nem crescimento: é perda progressiva de células."},
    {lvl:1,q:"Por que os sintomas ajudam a localizar a doença?",o:["Cada região tem sua função, então o sintoma aponta o local afetado","Porque todo sintoma neurológico vem sempre da mesma região do cérebro","Porque os sintomas são totalmente aleatórios e não dizem nada"], c:0,er:"A função é regional, então a perda revela onde está o dano.",ew:"Os sintomas não são aleatórios nem vêm todos do mesmo ponto — eles mapeiam a lesão."},
    {lvl:2,q:"Epilepsia (elétrico), AVC (vascular) e Parkinson (degeneração) mostram que:",o:["O cérebro pode falhar de modos diferentes — elétrico, vascular, químico ou por perda de células","Todas as doenças cerebrais são iguais no fundo e diferem apenas no nome que recebem","O cérebro nunca falha de verdade: o que existe, na prática, são erros de diagnóstico dos médicos"], c:0,er:"Reconhecer o modo de falha organiza o diagnóstico e o tratamento.",ew:"As doenças não são todas iguais — cada uma ataca o cérebro de um jeito."}
  ],
  [
    {lvl:0,q:"No Parkinson, o que se perde é:",o:["Neurônios de dopamina","Glóbulos vermelhos do sangue","Fibras musculares"], c:0,er:"Morrem os neurônios dopaminérgicos da substância negra.",ew:"Não são células do sangue nem do músculo: são neurônios de dopamina."},
    {lvl:1,q:"No Alzheimer, qual função costuma ser afetada primeiro?",o:["A memória","A audição","O tato"],c:0,er:"O esquecimento é o sinal inicial mais comum.",ew:"Audição e tato não são o primeiro alvo; a memória é."},
    {lvl:2,q:"Por que o Alzheimer começa afetando a memória antes de outras funções?",o:["A degeneração começa em regiões do lobo temporal ligadas à memória, como o hipocampo","Porque a memória é a função menos importante do cérebro e, por isso, é a primeira a ser perdida","Por puro acaso, sem nenhuma relação com o local em que a degeneração se inicia"], c:0,er:"O dano se inicia justamente onde a memória é formada e depois se espalha.",ew:"Não é acaso nem desimportância: é o local onde a doença começa."}
  ],
  [
    {lvl:0,q:"Uma crise epiléptica acontece por:",o:["Atividade elétrica excessiva e sincronizada de neurônios","Falta de sangue chegando aos músculos, ao coração e à pele","Excesso de horas de sono acumuladas na semana"], c:0,er:"É uma 'tempestade' elétrica: muitos neurônios disparando juntos.",ew:"Não é problema de músculo nem de sono: é atividade elétrica descontrolada."},
    {lvl:1,q:"No AVC, por que o tempo é tão importante ('tempo é cérebro')?",o:["Sem oxigênio, os neurônios morrem em minutos — tratar rápido salva tecido","Porque o cérebro se cura sozinho em poucos segundos, desde que ninguém intervenha","Porque não há absolutamente nada a fazer depois que o AVC já aconteceu"], c:0,er:"Cada minuto sem sangue significa mais neurônios perdidos; agir rápido preserva função.",ew:"O cérebro não se cura em segundos, e há muito a fazer — desde que rápido."},
    {lvl:2,q:"Por que dois AVCs podem causar sintomas totalmente diferentes?",o:["O déficit depende de qual território (região) do cérebro perdeu o sangue","Porque o sangue tem cores diferentes em cada uma das regiões do cérebro humano","Porque o AVC não afeta o cérebro em si, e sim os vasos do pescoço"], c:0,er:"Cada território alimenta funções distintas, então a perda varia com o local.",ew:"Não é cor do sangue: é qual região ficou sem irrigação."}
  ],
  [
    {lvl:0,q:"Os transtornos psiquiátricos, em geral:",o:["Envolvem circuitos e química desregulados, não uma única lesão","São causados sempre por uma única lesão visível nos exames de imagem","Não têm nenhuma relação com o funcionamento do cérebro"], c:0,er:"São condições de rede e neuroquímica, não de um ponto único.",ew:"Têm sim base cerebral, mas não costumam vir de uma lesão única e visível."},
    {lvl:1,q:"Qual afirmação sobre a depressão é correta?",o:["É uma condição real e tratável, não falta de força de vontade","É apenas frescura de quem não quer encarar a própria vida","Nunca melhora com tratamento, seja remédio ou psicoterapia"], c:0,er:"É uma condição do cérebro, biológica e tratável — com terapia e medicação.",ew:"Não é frescura e melhora com tratamento; reduzi-la a fraqueza é impreciso."},
    {lvl:2,q:"Por que é impreciso procurar 'a lesão da depressão' como se faz no AVC?",o:["Ela emerge de redes e neurotransmissores desregulados, mais genes e ambiente","Porque a depressão não existe de fato, é só um rótulo criado pela medicina","Porque ela é idêntica ao Parkinson, só que atinge outra região do cérebro"], c:0,er:"Sua origem é distribuída e multifatorial, diferente de uma lesão focal.",ew:"A depressão é real e diferente do Parkinson; sua causa não é um único ponto."}
  ]
];

ANATOMY['clinica']={
  title:'Quatro formas de o cérebro falhar',
  caption:'Toque numa forma de falha para ver que doenças ela causa.',
  parts:[
    {id:'degeneracao', label:'Degeneração', blurb:'Neurônios morrem aos poucos, muitas vezes por acúmulo de proteínas. É o caso de Parkinson e Alzheimer.'},
    {id:'eletrico', label:'Elétrico', blurb:'Atividade excessiva e sincronizada dispara crises. É a epilepsia.'},
    {id:'vascular', label:'Vascular', blurb:'O sangue que alimenta uma região é cortado e os neurônios morrem por falta de oxigênio. É o AVC.'},
    {id:'quimico', label:'Químico / circuito', blurb:'Neurotransmissores e redes desregulados, sem uma lesão única. É o caso dos transtornos psiquiátricos, como a depressão.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 480 165" role="img" aria-label="Quatro formas de o cérebro falhar">
    <g class="apart" data-anat="clinica" data-struct="degeneracao">
      <rect x="30" y="26" width="72" height="76" fill="currentColor" fill-opacity="0"/>
      <circle cx="60" cy="56" r="10" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/>
      <path d="M60 46 L60 38 M51 50 L44 45 M69 50 L76 45" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M70 58 L82 58" stroke="currentColor" stroke-width="1.6"/>
      <path d="M86 58 L98 58" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 3" opacity=".5"/>
      <path d="M46 78 c-4 -6 4 -10 8 -5 c5 -4 11 2 6 7 c3 5 -4 9 -8 5 c-4 3 -9 -3 -6 -7 Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1"/>
    </g>
    <g class="apart" data-anat="clinica" data-struct="eletrico">
      <rect x="150" y="26" width="72" height="76" fill="currentColor" fill-opacity="0"/>
      <path d="M150 60 L160 60 L164 52 L168 66 L172 60 L180 60 L184 34 L188 82 L192 60 L200 60 L204 53 L208 65 L212 60 L222 60" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
    <g class="apart" data-anat="clinica" data-struct="vascular">
      <rect x="264" y="26" width="72" height="76" fill="currentColor" fill-opacity="0"/>
      <path d="M270 52 C285 48 300 48 330 52" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <path d="M270 64 C285 68 300 68 330 64" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <path d="M306 52 C321 48 321 68 306 64" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 3" opacity=".45"/>
      <ellipse cx="300" cy="58" rx="6" ry="8" fill="currentColor" fill-opacity=".55" stroke="currentColor" stroke-width="1"/>
    </g>
    <g class="apart" data-anat="clinica" data-struct="quimico">
      <rect x="378" y="26" width="74" height="76" fill="currentColor" fill-opacity="0"/>
      <path d="M415 40 C400 40 400 56 415 56 C430 56 430 40 415 40 Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.5"/>
      <rect x="398" y="72" width="34" height="7" rx="3.5" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.4"/>
      <path d="M406 79 L406 84 M415 79 L415 84 M424 79 L424 84" stroke="currentColor" stroke-width="1.2"/>
      <circle cx="411" cy="63" r="2.4" fill="currentColor"/><circle cx="421" cy="66" r="2.4" fill="currentColor"/>
    </g>
    <text x="66" y="126" text-anchor="middle">Degeneração</text>
    <text x="186" y="126" text-anchor="middle">Elétrico</text>
    <text x="300" y="126" text-anchor="middle">Vascular</text>
    <text x="415" y="126" text-anchor="middle">Químico</text>
  </svg>`
};

DEEP['clinica']=[
  `<p>Os quatro modos de falha pedem abordagens distintas: a <b>degeneração</b> envolve agregados de proteína e morte celular; a <b>vascular</b>, isquemia ou hemorragia; a <b>elétrica</b>, um desequilíbrio entre excitação e inibição; e a <b>psiquiátrica</b>, circuitos e neuroquímica desregulados.</p><p>O 'método da lesão' — inferir função a partir do déficit — nasceu com as afasias e se generalizou: boa parte do mapa funcional do cérebro foi desenhada observando o que se perde quando uma região falha.</p>`,
  `<p>No <b>Parkinson</b>, acumula-se alfa-sinucleína (corpos de Lewy) e perde-se a via dopaminérgica nigroestriatal; a <b>levodopa</b> repõe dopamina, e casos avançados podem usar estimulação cerebral profunda.</p><p>No <b>Alzheimer</b>, placas de <b>beta-amiloide</b> e emaranhados de <b>tau</b> marcam a doença, que começa na região entorrinal/hipocampo. A 'hipótese amiloide' guiou décadas de pesquisa, e só recentemente surgiram os primeiros fármacos que atacam o amiloide diretamente.</p>`,
  `<p>Na <b>epilepsia</b>, o desequilíbrio excitação/inibição gera descargas; as crises podem ser <b>focais</b> (de um ponto) ou <b>generalizadas</b>, e o EEG as flagra. Muitos casos são controlados com medicação, e alguns focos podem ser tratados com cirurgia.</p><p>O <b>AVC</b> é isquêmico (um coágulo, ~85% dos casos) ou hemorrágico (um sangramento). Ao redor do núcleo morto há a <b>penumbra</b>, tecido ainda salvável — é por ela que trombolíticos e trombectomia correm contra o relógio.</p>`,
  `<p>Os transtornos psiquiátricos são <b>poligênicos</b> e multifatoriais: muitos genes de pequeno efeito, mais ambiente e estresse. Envolvem sistemas de <b>monoaminas</b> (serotonina, dopamina, noradrenalina) e <b>glutamato</b>, em circuitos pré-frontal-límbicos.</p><p>Os tratamentos agem em várias frentes: a <b>psicoterapia</b> remodela circuitos pela plasticidade e os <b>medicamentos</b> ajustam a neuroquímica. Enxergar essas condições como distúrbios de circuitos (e não como falha de caráter) é hoje o consenso — e a base para reduzir o estigma.</p>`
];

REFERENCES['clinica']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Capítulos clínicos que ligam função e doença."},
  {src:"Ropper & Samuels — Adams and Victor's Principles of Neurology",note:"Referência clássica das doenças neurológicas."},
  {src:"Insel & Cuthbert (2015)",note:"Defendem os transtornos mentais como distúrbios de circuitos cerebrais."}
];

/* =====================================================================
   MÓDULO 15 — NEUROFARMACOLOGIA (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'farmacologia', n:'15', title:'Neurofarmacologia', color:'var(--red)', hex:'#ef4444',
  tag:'Como as drogas agem na sinapse',
  intro:'Toda droga que muda a mente — do café ao antidepressivo — faz isso conversando com as sinapses. Este módulo é sobre esse diálogo químico: os poucos truques que uma substância pode usar para alterar a neurotransmissão, como estimulantes, depressores e remédios funcionam, e por que o cérebro se adapta, criando tolerância e dependência.',
  lessons:[
    {t:'Como uma droga age no cérebro',
     b:`<p>Quase toda droga psicoativa age no mesmo lugar: a <span class="term">sinapse</span>. E, por mais variadas que pareçam, elas usam basicamente quatro truques. Podem ser <strong>agonistas</strong> (imitar ou reforçar um neurotransmissor), <strong>antagonistas</strong> (bloquear um receptor), <strong>bloquear a recaptação</strong> (deixar o neurotransmissor mais tempo na fenda) ou <strong>mudar a liberação</strong> do mensageiro.</p><p>Antes de tudo, porém, a droga precisa <strong>entrar</strong> no cérebro — e a <span class="term">barreira hematoencefálica</span> filtra o que passa, deixando entrar sobretudo moléculas pequenas e lipossolúveis. Duas coisas definem o efeito: em <strong>qual</strong> receptor a droga age e com que <strong>especificidade</strong> — quanto mais alvos ela acerta, mais efeitos colaterais.</p>`},
    {t:'Estimulantes e depressores',
     b:`<p>Uma forma simples de organizar as drogas é pelo que fazem com o ritmo do cérebro. Os <span class="term">estimulantes</span> aceleram: a <strong>cafeína</strong> bloqueia a adenosina (que promove o sono); <strong>cocaína</strong> e <strong>anfetamina</strong> aumentam a dopamina — deixando alerta e eufórico, mas com queda e risco de vício depois.</p><p>Os <span class="term">depressores</span> fazem o oposto, reforçando o <strong>GABA</strong>, o principal 'freio' do cérebro. É o caso do <strong>álcool</strong> e dos <strong>benzodiazepínicos</strong>: acalmam e sedam, mas trazem tolerância e perigo — misturar depressores pode frear demais funções vitais, como a respiração.</p>`},
    {t:'Como os remédios da mente funcionam',
     b:`<p>Os remédios psiquiátricos usam os mesmos mecanismos, com um alvo terapêutico. Os <span class="term">antidepressivos</span> mais comuns, os ISRS, <strong>bloqueiam a recaptação da serotonina</strong>, deixando-a mais tempo na sinapse. Os <span class="term">antipsicóticos</span> em geral <strong>bloqueiam receptores de dopamina</strong>, acalmando sintomas como delírios.</p><p>Um detalhe revelador: os antidepressivos aumentam a serotonina em horas, mas o efeito clínico só aparece em <strong>semanas</strong>. Isso mostra que o que cura não é só o aumento imediato do neurotransmissor — são as <strong>adaptações mais lentas</strong> do cérebro, a própria plasticidade se reorganizando. Não são 'pílulas da felicidade', e sim ferramentas que dão tempo e espaço para o cérebro se ajustar.</p>`},
    {t:'Tolerância, dependência e o cérebro que se adapta',
     b:`<p>O cérebro busca equilíbrio. Diante de uma droga repetida, ele <strong>se adapta</strong> — por exemplo, reduzindo receptores para compensar o excesso de estímulo. O resultado é a <span class="term">tolerância</span>: a mesma dose faz menos efeito, e é preciso mais para sentir o mesmo.</p><p>Quando essa adaptação vai longe, surge a <span class="term">dependência</span>: o cérebro só se sente 'normal' <strong>com</strong> a droga, e sua falta gera abstinência. E o <strong>vício</strong> vai além — ele 'sequestra' o sistema de dopamina da recompensa (o do Módulo 03), tornando o uso compulsivo mesmo diante do prejuízo. Por isso largar é tão difícil: não é falta de vontade, é um cérebro que se remodelou. Como as outras condições clínicas, é biologia — e tem tratamento.</p>`}
  ],
  quiz:[
    {q:'A maioria das drogas que agem no cérebro atua em qual local?',
     o:['Nas sinapses, alterando a neurotransmissão','Nos ossos e nas articulações do corpo','Diretamente no DNA de todos os neurônios','Apenas nos músculos esqueléticos'], c:0, l:0,
     er:'Isso. As drogas psicoativas agem sobretudo na <strong>sinapse</strong>, mudando a comunicação entre neurônios.',
     ew:'O alvo principal é a <strong>sinapse</strong>: é ali que elas alteram a neurotransmissão.'},
    {q:"Uma droga 'agonista' é aquela que:",
     o:['Imita ou ativa a ação de um neurotransmissor no receptor','Bloqueia totalmente o receptor, impedindo qualquer ação','Não tem nenhum efeito sobre o receptor, apenas o ocupa','Destrói o neurônio inteiro em que o receptor se encontra'], c:0, l:0,
     er:'Correto. O <strong>agonista</strong> imita ou reforça o neurotransmissor, ativando o receptor.',
     ew:'Agonista <strong>ativa</strong> o receptor; quem o bloqueia é o antagonista.'},
    {q:'Os antidepressivos do tipo ISRS agem principalmente ao:',
     o:['Bloquear a recaptação da serotonina, deixando-a mais tempo na sinapse','Aumentar a produção de serotonina dentro do neurônio que vai liberá-la','Eliminar toda a dopamina disponível nos circuitos de recompensa','Cortar o fluxo de sangue para as áreas emocionais do cérebro'], c:0, l:2,
     er:'Sim. Os ISRS impedem a reabsorção da <strong>serotonina</strong>, prolongando seu sinal.',
     ew:'Eles bloqueiam a <strong>recaptação da serotonina</strong>; não têm relação com ossos, sangue ou remover dopamina.'},
    {q:'A tolerância a uma droga (precisar de doses maiores com o tempo) acontece porque:',
     o:['O cérebro se adapta, por exemplo reduzindo receptores, para manter o equilíbrio','A droga vai ficando mais forte a cada uso, e o corpo precisa compensar','O cérebro simplesmente para de funcionar direito depois de algumas doses da droga','Nada muda no cérebro: é apenas impressão de quem usa a substância'], c:0, l:3,
     er:'Exato. O cérebro se <strong>adapta</strong> ao estímulo repetido, então é preciso mais para o mesmo efeito.',
     ew:'A droga não muda; o que muda é o <strong>cérebro</strong>, que se adapta e reduz sua resposta.'}
  ]
});

MINI_QUIZZES['farmacologia']=[
  [
    {lvl:0,q:"A maioria das drogas psicoativas age:",o:["Nas sinapses, mudando a comunicação entre neurônios","Nos músculos, mudando a força de cada contração","Apenas no sangue, sem chegar a entrar no cérebro"], c:0,er:"É na sinapse que elas alteram a neurotransmissão.",ew:"Não é no músculo nem só no sangue: o alvo é a sinapse."},
    {lvl:1,q:"Um 'antagonista' faz o quê no receptor?",o:["Bloqueia, impedindo o neurotransmissor de agir","Ativa o receptor muito mais que o normal","Aumenta o número de receptores da sinapse"], c:0,er:"Ele ocupa o receptor e barra o mensageiro.",ew:"Ativar é papel do agonista; o antagonista bloqueia."},
    {lvl:2,q:"Por que a barreira hematoencefálica importa para a farmacologia?",o:["Ela filtra o que entra no cérebro, então só certas moléculas chegam a agir","Ela é quem produz os neurotransmissores usados pelos neurônios do córtex","Ela não tem nenhuma relação com drogas: filtra apenas vírus e bactérias"], c:0,er:"Se a molécula não atravessa a barreira, não age no cérebro — ela é um porteiro.",ew:"A barreira não fabrica transmissores; ela controla o acesso ao cérebro."}
  ],
  [
    {lvl:0,q:"A cafeína deixa você alerta porque:",o:["Bloqueia a adenosina, que normalmente dá sono","Aumenta a adenosina, que normalmente dá sono","Não faz efeito nenhum dentro do cérebro"], c:0,er:"Sem a adenosina agindo, a sensação de sono diminui.",ew:"Ela não aumenta o sono nem é inerte: bloqueia a adenosina."},
    {lvl:1,q:"Álcool e benzodiazepínicos são depressores porque:",o:["Reforçam o GABA, o 'freio' do cérebro","Aceleram todos os neurônios do córtex","Bloqueiam o GABA e tiram o freio"], c:0,er:"Mais GABA significa mais inibição — daí a sedação.",ew:"Eles não aceleram nem bloqueiam o GABA: reforçam esse freio."},
    {lvl:2,q:"Cocaína bloqueia a recaptação da dopamina. Por que isso gera euforia e vício?",o:["A dopamina se acumula e superativa a recompensa, que passa a 'querer' a droga","Porque ela remove toda a dopamina do cérebro e o corpo passa a tentar repor a perda","Porque ela não afeta a recompensa: o vício vem apenas do hábito de usar"], c:0,er:"O excesso de dopamina na sinapse dispara com força o sistema de recompensa.",ew:"Ela acumula dopamina, não a remove — e mexe justamente na recompensa."}
  ],
  [
    {lvl:0,q:"Os ISRS (antidepressivos) agem sobre qual neurotransmissor?",o:["Serotonina","Insulina","Apenas adrenalina"],c:0,er:"ISRS = inibidores seletivos da recaptação da serotonina.",ew:"O alvo é a serotonina, não insulina nem só adrenalina."},
    {lvl:1,q:"Por que muitos antidepressivos demoram semanas para fazer efeito?",o:["O efeito depende de adaptações lentas do cérebro, não só do aumento imediato","Porque eles só começam a agir de fato depois de vários anos de uso contínuo","Porque na prática eles não funcionam: a melhora vem do efeito placebo"], c:0,er:"A serotonina sobe logo, mas a melhora vem das mudanças plásticas que levam semanas.",ew:"Não é questão de anos nem de ineficácia: são adaptações que levam tempo."},
    {lvl:2,q:"Antipsicóticos costumam bloquear receptores de qual neurotransmissor?",o:["Dopamina","Água","Cálcio dos ossos"],c:0,er:"Bloquear a dopamina ajuda a reduzir sintomas como delírios.",ew:"O alvo é a dopamina — não água nem cálcio ósseo."}
  ],
  [
    {lvl:0,q:"Dependência é quando:",o:["O cérebro se adapta e passa a precisar da droga para se sentir normal","A droga desaparece do corpo em questão de poucos segundos após o uso","Nada acontece ao parar de usar: o corpo volta ao normal na hora"], c:0,er:"O cérebro se reorganiza em torno da droga e sente falta sem ela.",ew:"Não é sobre a droga sumir rápido: é o cérebro precisando dela para o equilíbrio."},
    {lvl:1,q:"Por que largar uma droga pode ser tão difícil?",o:["O cérebro adaptado gera abstinência e fissura quando ela falta","Porque a droga não muda absolutamente nada no cérebro de quem a usa","Porque é só questão de querer parar e ter disciplina"], c:0,er:"O cérebro remodelado cobra a ausência com sintomas e desejo intenso.",ew:"A droga muda sim o cérebro, e por isso não é 'só querer'."},
    {lvl:2,q:"O vício 'sequestra' qual sistema, o mesmo do módulo de recompensa?",o:["O sistema dopaminérgico de recompensa","O sistema visual do lobo occipital","Apenas o sistema imune de defesa"], c:0,er:"É a via de dopamina da recompensa que o vício captura e distorce.",ew:"Não é o visual nem o imune: é o sistema de recompensa, movido a dopamina."}
  ]
];

ANATOMY['farmacologia']={
  title:'Onde as drogas agem na sinapse',
  caption:'Toque num ponto de ação para ver como a droga atua ali.',
  parts:[
    {id:'liberacao', label:'Liberação', blurb:'A droga aumenta ou reduz quanto neurotransmissor é liberado. Ex.: a anfetamina força a saída de dopamina.'},
    {id:'recaptacao', label:'Recaptação', blurb:'A droga impede o neurônio de reabsorver o neurotransmissor, que fica mais tempo na sinapse. Ex.: os ISRS com a serotonina.'},
    {id:'agonista', label:'Agonista', blurb:'A droga imita ou ativa o neurotransmissor no receptor, reforçando o sinal. Ex.: opioides imitam as endorfinas.'},
    {id:'antagonista', label:'Antagonista', blurb:'A droga ocupa o receptor e o bloqueia, impedindo o neurotransmissor de agir. Ex.: antipsicóticos bloqueiam a dopamina.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 210" role="img" aria-label="Pontos de ação das drogas na sinapse">
    <path d="M118 28 C108 58 116 82 140 84 L300 84 C324 82 332 58 322 28 C300 22 140 22 118 28 Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.4" opacity=".7"/>
    <circle cx="180" cy="58" r="8" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".6"/>
    <circle cx="222" cy="52" r="8" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".6"/>
    <circle cx="262" cy="60" r="8" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".6"/>
    <rect x="108" y="140" width="224" height="18" rx="4" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.4" opacity=".7"/>
    <circle cx="214" cy="112" r="2.6" fill="currentColor"/><circle cx="234" cy="118" r="2.6" fill="currentColor"/><circle cx="224" cy="126" r="2.6" fill="currentColor"/>
    <g class="apart" data-anat="farmacologia" data-struct="liberacao">
      <rect x="232" y="66" width="60" height="46" fill="currentColor" fill-opacity="0"/>
      <circle cx="258" cy="80" r="7" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.3"/>
      <path d="M258 92 L258 104" stroke="currentColor" stroke-width="1.6"/>
      <path d="M258 104 l-4 -6 l8 0 Z" fill="currentColor"/>
    </g>
    <g class="apart" data-anat="farmacologia" data-struct="recaptacao">
      <rect x="128" y="70" width="44" height="50" fill="currentColor" fill-opacity="0"/>
      <path d="M144 84 L144 104 M156 84 L156 104" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="150" cy="98" r="6" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.2"/>
      <path d="M150 92 L150 78" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 2" opacity=".5"/>
      <path d="M141 86 l9 -8 l9 8" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/>
    </g>
    <g class="apart" data-anat="farmacologia" data-struct="agonista">
      <rect x="176" y="128" width="44" height="52" fill="currentColor" fill-opacity="0"/>
      <path d="M188 140 C188 132 208 132 208 140" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="198" cy="138" r="6" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.2"/>
      <path d="M198 130 L198 124 M191 133 L186 129 M205 133 L210 129" stroke="currentColor" stroke-width="1.2" opacity=".7"/>
    </g>
    <g class="apart" data-anat="farmacologia" data-struct="antagonista">
      <rect x="266" y="128" width="46" height="52" fill="currentColor" fill-opacity="0"/>
      <path d="M280 140 C280 132 300 132 300 140" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <rect x="283" y="132" width="14" height="7" rx="2" fill="currentColor" fill-opacity=".5" stroke="currentColor" stroke-width="1.1"/>
      <path d="M286 128 L294 122 M294 128 L286 122" stroke="currentColor" stroke-width="1.2" opacity=".7"/>
    </g>
    <text x="220" y="16" text-anchor="middle">terminal que envia</text>
    <text x="258" y="120" text-anchor="middle">liberação</text>
    <text x="150" y="130" text-anchor="middle">recaptação</text>
    <text x="198" y="174" text-anchor="middle">agonista</text>
    <text x="293" y="174" text-anchor="middle">antagonista</text>
    <text x="220" y="192" text-anchor="middle">terminal que recebe</text>
  </svg>`
};

DEEP['farmacologia']=[
  `<p>Os quatro alvos — agonista, antagonista, bloqueio de recaptação e efeito sobre a liberação — cobrem quase toda a farmacologia. Há ainda os <b>agonistas parciais</b>, que ativam o receptor só em parte, úteis para 'estabilizar' um sistema.</p><p>A <b>barreira hematoencefálica</b> explica por que certas moléculas agem no cérebro e outras não: em geral passam as pequenas e lipossolúveis. E a <b>especificidade</b> é tudo — uma droga que acerta muitos receptores diferentes tende a ter mais efeitos colaterais.</p>`,
  `<p>A lógica 'acelera x freia' mapeia a neuroquímica: a <b>cafeína</b> é antagonista da adenosina; a <b>cocaína</b> bloqueia o transportador de dopamina; a <b>anfetamina</b> inverte esse transportador e força a liberação. Do outro lado, o <b>álcool</b> reforça o GABA e inibe o glutamato, e os <b>benzodiazepínicos</b> potencializam o receptor GABA-A.</p><p>Combinar depressores é perigoso justamente porque seus efeitos sobre o 'freio' se somam, podendo deprimir a respiração.</p>`,
  `<p>Que os antidepressivos elevem a serotonina em horas, mas só ajudem em <b>semanas</b>, é uma pista de que o alvo real vai além da química imediata: mudanças plásticas mais lentas — adaptação de receptores, <b>BDNF</b>, talvez neurogênese — parecem ser o que importa.</p><p>Os antipsicóticos clássicos bloqueiam o receptor <b>D2</b> de dopamina. E a <b>cetamina</b>, que age no glutamato (receptor NMDA) e alivia a depressão em horas, abriu um paradigma novo, além das monoaminas.</p>`,
  `<p>Sob uso crônico, o cérebro faz o oposto da droga para manter o equilíbrio: se ela estimula demais, ele <b>reduz receptores</b>. Isso é a <b>tolerância</b>; tirar a droga de um cérebro já adaptado revela a <b>abstinência</b>.</p><p>O <b>vício</b> soma a isso um aprendizado distorcido na via dopaminérgica da recompensa e uma perda de controle pré-frontal — por isso é tratado como doença crônica, com recaídas, e não como falha de caráter. Reconhecer essa biologia é o que torna o cuidado possível.</p>`
];

REFERENCES['farmacologia']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Bases da transmissão sináptica e sua modulação."},
  {src:"Meyer & Quenzer — Psychopharmacology",note:"Como as drogas agem no cérebro e no comportamento."},
  {src:"Volkow, Koob & McLellan (2016)",note:"A neurociência do vício como doença cerebral crônica."}
];

/* =====================================================================
   MÓDULO 16 — MÉTODOS EM NEUROCIÊNCIA (adicionado por composição)
   ===================================================================== */
MODULES.push({
  id:'metodos', n:'16', title:'Métodos em Neurociência', color:'var(--pink)', hex:'#ec4899',
  tag:'Como sabemos tudo isso',
  intro:'Como alguém descobre que o hipocampo guarda memórias, ou que a dopamina move a recompensa? Este módulo fecha o curso com o tema mais importante de todos: como se sabe. Você vai ver as ferramentas que leem e cutucam o cérebro, o que cada uma consegue (e não consegue) enxergar, e por que a ciência precisa juntar várias delas.',
  lessons:[
    {t:'Como se estuda o cérebro: o problema',
     b:`<p>Estudar o cérebro é difícil: ele é escondido, delicado e complexo. Mas há uma distinção que organiza tudo — a diferença entre <span class="term">correlação</span> e <span class="term">causa</span>. Ver uma área 'acender' durante uma tarefa mostra apenas que ela <strong>participa</strong>; para provar que ela <strong>causa</strong> a função, é preciso mexer nela e observar o efeito.</p><p>Além disso, todo método vive de <strong>trocas</strong>: alguns enxergam o cérebro inteiro, mas de forma grosseira; outros veem um único neurônio, mas só com um eletrodo por dentro; uns são rápidos, outros lentos. Não existe uma ferramenta que veja <strong>tudo</strong> — por isso a neurociência combina várias, buscando <span class="term">evidência convergente</span>.</p>`},
    {t:'Assistindo o cérebro: registrar a atividade',
     b:`<p>O primeiro grupo de métodos apenas <strong>observa</strong> o cérebro em ação. O <span class="term">EEG</span> capta a atividade elétrica pelo couro cabeludo: é rapidíssimo (milissegundos), mas diz mal <em>onde</em> a atividade nasce. A <span class="term">fMRI</span> faz o oposto — segue o fluxo de sangue e localiza bem (milímetros), mas é <strong>lenta</strong>, na casa dos segundos.</p><p>Para chegar ao neurônio individual, o <strong>registro unitário</strong> usa um eletrodo que escuta uma única célula, com precisão máxima — mas é <strong>invasivo</strong>. E a <strong>imagem por microscopia</strong> (como a de cálcio) filma centenas de neurônios acendendo ao mesmo tempo, sobretudo em animais. A regra é clara: ganha-se num eixo, perde-se em outro.</p>`},
    {t:'Cutucando o cérebro: manipular para provar causa',
     b:`<p>Observar não basta para provar causa. Para isso, é preciso <strong>alterar</strong> uma região e ver o que muda. O método mais antigo é a <span class="term">lesão</span>: estudar o que se perde quando uma área é danificada — foi assim, com pacientes, que se descobriram Broca e o papel do hipocampo.</p><p>Hoje há formas mais controladas. A <span class="term">TMS</span> (estimulação magnética) cria uma 'lesão virtual' temporária no córtex humano, sem cirurgia. E a <span class="term">optogenética</span> foi uma revolução: inserindo em neurônios uma proteína sensível à luz, o cientista <strong>liga e desliga tipos específicos de células com um feixe de luz</strong>, em milissegundos. Assim se sai do 'essa área se ativa junto' para o 'essa área é necessária' — de correlação a causa.</p>`},
    {t:'Do neurônio ao comportamento: juntando as peças',
     b:`<p>Como cada ferramenta tem limites, a força da neurociência está em <span class="term">cruzar</span> métodos e escalas — das moléculas às sinapses, aos circuitos e ao comportamento. Uma conclusão fica sólida quando EEG, fMRI, registros, lesões e modelos <strong>apontam para o mesmo lugar</strong>.</p><p>E o campo segue avançando: a <span class="term">conectômica</span> tenta mapear todas as conexões do cérebro, as <strong>interfaces cérebro-máquina</strong> leem e escrevem sinais neurais, e modelos computacionais e IA viram tanto ferramenta quanto teoria. Estudos em animais permitem os métodos invasivos; os humanos ligam tudo ao comportamento e à clínica. A neurociência é jovem e cheia de perguntas em aberto — e agora você tem o mapa para continuar explorando.</p>`}
  ],
  quiz:[
    {q:'Para provar que uma região CAUSA uma função (e não apenas se ativa junto), o cientista precisa:',
     o:['Manipular a região (lesão, estimulação) e observar o efeito','Apenas observar a atividade dela enquanto a pessoa faz a tarefa','Medir a cor e a temperatura do cérebro naquele ponto','Perguntar à pessoa o que ela acha que está sentindo'], c:0, l:2,
     er:'Isso. Só <strong>manipulando</strong> a região dá para mostrar que ela é necessária — o salto da correlação à causa.',
     ew:'Observar mostra correlação; provar causa exige <strong>manipular</strong> a área e ver o que muda.'},
    {q:'Qual técnica tem ótima resolução no tempo (milissegundos), mas baixa precisão de local?',
     o:['EEG','fMRI','Registro unitário','Nenhuma delas'], c:0, l:1,
     er:'Correto. O <strong>EEG</strong> é veloz no tempo, mas localiza mal a origem do sinal.',
     ew:'É o <strong>EEG</strong>: rápido, porém pouco preciso quanto ao local; a fMRI é o oposto.'},
    {q:'A optogenética permite:',
     o:['Ligar e desligar neurônios específicos com luz, com grande precisão','Ver o cérebro funcionando sem precisar de equipamento nenhum de imagem','Curar qualquer doença neurológica com um feixe de luz','Ler os pensamentos exatos de uma pessoa em tempo real'], c:0, l:2,
     er:'Sim. Com uma proteína sensível à luz, ela controla tipos específicos de neurônios em milissegundos.',
     ew:'Ela <strong>controla neurônios com luz</strong>; não lê pensamentos nem dispensa equipamento.'},
    {q:'Por que a neurociência combina vários métodos (evidência convergente)?',
     o:['Nenhum método sozinho vê tudo — cada um tem limites de resolução e invasividade','Porque um único método já bastaria, mas os cientistas gostam de repetir','Para gastar mais dinheiro e justificar orçamentos maiores de pesquisa','Porque todos os métodos são idênticos e acabam dando exatamente o mesmo resultado'], c:0, l:3,
     er:'Exato. Como cada técnica tem pontos cegos, cruzá-las torna a conclusão confiável.',
     ew:'Um método não basta: cada um tem limites, e por isso se buscam evidências que convergem.'}
  ]
});

MINI_QUIZZES['metodos']=[
  [
    {lvl:0,q:"A grande diferença entre 'correlação' e 'causa' nos métodos é:",o:["Observar quando algo se ativa versus manipular para ver se causa","Não há diferença alguma: os dois termos querem dizer a mesma coisa","A cor dos aparelhos usados em cada um dos dois tipos de estudo"], c:0,er:"Ativar-se junto é correlação; provar causa exige intervir.",ew:"Não são iguais nem é questão de aparelho: é observar versus manipular."},
    {lvl:1,q:"fMRI e EEG mostram principalmente:",o:["Correlação: quais áreas se ativam durante uma tarefa","Causa: que aquela área produz a função, com toda a certeza","O peso e o volume do cérebro de cada pessoa"], c:0,er:"Eles registram atividade que coincide com a tarefa — correlação, não prova de causa.",ew:"Sozinhos, não provam causa; mostram o que se ativa junto."},
    {lvl:2,q:"Por que nenhum método sozinho resolve tudo?",o:["Há um trade-off entre resolução no espaço, no tempo e o quanto é invasivo","Porque os cientistas são preguiçosos e não querem se dedicar o bastante","Porque o cérebro é simples e um método só já daria conta de explicá-lo"], c:0,er:"Ganhar num eixo custa em outro — daí a necessidade de combinar técnicas.",ew:"Não é preguiça nem simplicidade: é um trade-off real entre os métodos."}
  ],
  [
    {lvl:0,q:"O EEG mede:",o:["A atividade elétrica pelo couro cabeludo","O fluxo de sangue nas áreas ativas","Um único neurônio de cada vez"], c:0,er:"Eletrodos na cabeça captam a atividade elétrica em tempo real.",ew:"Fluxo de sangue é fMRI e um neurônio é o registro unitário; o EEG lê o elétrico."},
    {lvl:1,q:"Qual a força e a fraqueza da fMRI?",o:["Boa precisão de local, mas lenta no tempo","Rápida no tempo, mas sem localizar nada","Perfeita em tudo, sem nenhum defeito"], c:0,er:"Ela localiza bem (milímetros), porém demora segundos para responder.",ew:"Não é rápida nem perfeita: acerta o local, mas é lenta."},
    {lvl:2,q:"Por que registrar um único neurônio é tão preciso, mas pouco usado em humanos?",o:["Dá resolução máxima, mas é invasivo (precisa de eletrodo dentro do cérebro)","Porque é impreciso demais e não vale o esforço que exige do laboratório","Porque não funciona em animais, apenas em tecido isolado em laboratório"], c:0,er:"A precisão é enorme, mas exige colocar um eletrodo no tecido — por isso é raro em humanos.",ew:"Ele é o mais preciso e funciona muito em animais; o limite é ser invasivo."}
  ],
  [
    {lvl:0,q:"O método da lesão descobre a função de uma área ao:",o:["Observar o que se perde quando ela é danificada","Pintar a área de outra cor e ver o que acontece","Aumentar o tamanho dela e medir o resultado"], c:0,er:"Se lesar a área apaga uma função, essa área participava dela.",ew:"Não é pintar nem aumentar: é observar a perda causada pelo dano."},
    {lvl:1,q:"A TMS (estimulação magnética) é útil porque:",o:["Altera temporariamente uma área do córtex em humanos, sem cirurgia","Consegue ler os pensamentos exatos de quem está sendo examinado","Substitui a área do cérebro que foi danificada por um implante"], c:0,er:"Ela cria uma 'lesão virtual' reversível, permitindo testar causa em pessoas.",ew:"Não lê pensamentos nem substitui nada: ela perturba o córtex de forma temporária."},
    {lvl:2,q:"Por que a optogenética foi uma revolução para provar causas?",o:["Permite ligar e desligar tipos específicos de neurônios com precisão de milissegundos","Porque elimina de vez a necessidade de fazer experimentos em laboratório","Porque funciona apenas por observação, sem precisar tocar em coisa alguma dentro do cérebro"], c:0,er:"Controlar células exatas no tempo certo mostra o que cada uma realmente causa.",ew:"Ela não dispensa experimentos nem é só observação — é manipulação precisa."}
  ],
  [
    {lvl:0,q:"Evidência convergente significa:",o:["Confirmar uma conclusão com vários métodos diferentes","Usar sempre um único método, o mais confiável de todos","Ignorar os dados que não confirmam a sua hipótese"], c:0,er:"Quando técnicas distintas apontam para o mesmo lugar, a conclusão ganha força.",ew:"Não é um método só nem ignorar dados: é vários métodos concordando."},
    {lvl:1,q:"O que é a conectômica?",o:["O esforço de mapear as conexões do cérebro","Um tipo de remédio para doenças do cérebro","Uma doença neurológica que afeta os axônios"], c:0,er:"É a tentativa de traçar o mapa completo das ligações entre neurônios.",ew:"Não é remédio nem doença: é o mapeamento das conexões."},
    {lvl:2,q:"Por que estudos em animais e em humanos se complementam?",o:["Animais permitem métodos invasivos e causais; humanos ligam tudo ao comportamento e à clínica","Porque animais e humanos são exatamente a mesma coisa do ponto de vista do cérebro e do comportamento","Porque humanos não podem ser estudados de jeito nenhum, então só restam os animais"], c:0,er:"Cada um cobre o que o outro não pode — juntos, fecham o quadro.",ew:"Não são idênticos, e humanos são muito estudados; eles se completam."}
  ]
];

ANATOMY['metodos']={
  title:'O trade-off dos métodos',
  caption:'Toque num método para ver o que ele enxerga — e o que não enxerga.',
  parts:[
    {id:'eeg', label:'EEG', blurb:'Mede a atividade elétrica pelo couro cabeludo. Rápido (milissegundos), mas com baixa precisão de local. Não invasivo.'},
    {id:'fmri', label:'fMRI', blurb:'Mapeia o fluxo de sangue como pista de atividade. Boa precisão de local (milímetros), mas lento (segundos). Não invasivo.'},
    {id:'imagem', label:'Imagem / microscopia', blurb:'Filma neurônios individuais acendendo (ex.: imagem de cálcio), com altíssima resolução espacial. Usada sobretudo em animais.'},
    {id:'registro', label:'Registro unitário', blurb:'Um eletrodo escuta um único neurônio, com precisão máxima no tempo e no espaço. Mas é invasivo.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 210" role="img" aria-label="Mapa de resolução dos métodos: espaço x tempo">
    <line x1="60" y1="32" x2="60" y2="168" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
    <path d="M60 32 l-4 8 l8 0 Z" fill="currentColor" opacity=".55"/>
    <line x1="56" y1="166" x2="410" y2="166" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
    <path d="M410 166 l-8 -4 l0 8 Z" fill="currentColor" opacity=".55"/>
    <text x="66" y="26">espacial — fino (neurônio)</text>
    <text x="408" y="186" text-anchor="end">temporal — rápido</text>
    <text x="64" y="162">grosso</text>
    <text x="62" y="180">lento</text>
    <g class="apart" data-anat="metodos" data-struct="fmri">
      <rect x="112" y="66" width="60" height="34" fill="currentColor" fill-opacity="0"/>
      <circle cx="140" cy="86" r="8" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.4"/>
      <text x="152" y="90" text-anchor="start">fMRI</text>
    </g>
    <g class="apart" data-anat="metodos" data-struct="imagem">
      <rect x="210" y="44" width="70" height="34" fill="currentColor" fill-opacity="0"/>
      <circle cx="236" cy="62" r="8" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.4"/>
      <text x="248" y="66" text-anchor="start">Imagem</text>
    </g>
    <g class="apart" data-anat="metodos" data-struct="registro">
      <rect x="300" y="36" width="86" height="34" fill="currentColor" fill-opacity="0"/>
      <circle cx="352" cy="54" r="8" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.4"/>
      <text x="344" y="58" text-anchor="end">Registro</text>
    </g>
    <g class="apart" data-anat="metodos" data-struct="eeg">
      <rect x="316" y="120" width="60" height="34" fill="currentColor" fill-opacity="0"/>
      <circle cx="346" cy="138" r="8" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.4"/>
      <text x="338" y="142" text-anchor="end">EEG</text>
    </g>
  </svg>`
};

DEEP['metodos']=[
  `<p>O problema central é de <b>inferência</b>: 'a área X acende quando penso em rostos' não prova que X é <i>necessária</i> para reconhecê-los. Um mapa de <b>resolução</b> (espaço no eixo vertical, tempo no horizontal) organiza os métodos de registro, e a <b>invasividade</b> é um terceiro eixo escondido.</p><p>Por isso a fMRI, apesar de popular, dá evidência causal fraca sozinha — mostra correlação. A prova vem de <b>manipular</b> o cérebro.</p>`,
  `<p>Nos registros, ninguém vence em tudo: <b>EEG/MEG</b> (milissegundos, centímetros, não invasivos) contra <b>fMRI</b> (milímetros, segundos, um sinal indireto ligado ao sangue) contra <b>registro unitário</b> (disparos de uma célula, invasivo) contra <b>imagem de cálcio</b> (centenas de neurônios marcados geneticamente, em animais).</p><p>A escolha depende da pergunta: quer o <i>quando</i> exato? EEG. Quer o <i>onde</i>? fMRI. Quer a célula? Eletrodo ou microscopia.</p>`,
  `<p>Manipular fecha a lacuna causal. As <b>lesões</b> (o paciente H.M., os casos de Broca) revelam necessidade, mas são raras e imprecisas. A <b>TMS</b> traz uma 'lesão virtual' reversível a humanos.</p><p>Em animais, a <b>optogenética</b> (canais ativados por luz) e a <b>quimiogenética</b> (DREADDs) ligam e desligam tipos específicos de neurônios, permitindo dissecar circuitos com um controle antes impensável — o verdadeiro salto da correlação para a causa.</p>`,
  `<p>Nenhuma técnica basta, então a ciência busca <b>convergência</b> entre escalas: molécula, célula, circuito, comportamento. A <b>conectômica</b> já mapeou o verme <i>C. elegans</i> por inteiro e avança no camundongo; as <b>interfaces cérebro-máquina</b> leem e escrevem atividade neural; e modelos computacionais e IA servem de ferramenta e de teoria.</p><p>Tudo isso apoiado em modelos animais (com seus cuidados éticos) e em estudos humanos. A neurociência ainda é jovem — e você agora tem o mapa para continuar.</p>`
];

REFERENCES['metodos']=[
  {src:"Kandel et al. — Principles of Neural Science",note:"Panorama dos métodos de estudo do sistema nervoso."},
  {src:"Churchland & Sejnowski (1988)",note:"Introduziram o mapa de resolução espaço-temporal dos métodos."},
  {src:"Boyden et al. (2005)",note:"O trabalho fundador da optogenética: controlar neurônios com luz."}
];

/* =====================================================================
   GLOSSÁRIO — todo jargão ganha definição em linguagem simples,
   tocável dentro da aula e do "Aprofundar".
   ===================================================================== */
/* =====================================================================
   PONTES — cada "Aprofundar" retoma o que a aula estabeleceu,
   antes de ir mais fundo. Nada de entrar frio.
   ===================================================================== */
/* =====================================================================
   BIBLIOTECA DE FIGURAS — ilustrações por componente (vetor, com zoom)
   ===================================================================== */
const FIGURES = {

'potencial-acao':{
 title:'O potencial de ação',
 caption:'A carga dentro do neurônio ao longo do disparo. Abaixo do limiar não acontece nada; ao cruzá-lo, o disparo sai sempre com o mesmo tamanho.',
 svg:`<svg class="fig-svg" viewBox="0 0 420 260" role="img" aria-label="Gráfico do potencial de ação">
  <line x1="54" y1="20" x2="54" y2="228" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <line x1="54" y1="228" x2="400" y2="228" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <text x="10" y="34">+30 mV</text><text x="10" y="150">−55</text><text x="10" y="176">−70</text>
  <text x="230" y="252" text-anchor="middle">tempo →</text>
  <line x1="54" y1="30" x2="400" y2="30" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 4" opacity=".25"/>
  <line x1="54" y1="146" x2="400" y2="146" stroke="var(--amber)" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>
  <line x1="54" y1="172" x2="400" y2="172" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 4" opacity=".3"/>
  <text x="392" y="141" text-anchor="end" fill="var(--amber)">limiar</text>
  <path d="M54 172 L118 172 C140 172 148 160 158 146 C168 128 176 60 190 34 C200 22 212 26 220 44
           C230 68 238 130 248 158 C256 180 264 192 276 192 C292 192 300 182 312 176 C330 168 350 172 396 172"
        fill="none" stroke="var(--cyan)" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="158" cy="146" r="4" fill="var(--amber)"/>
  <circle cx="205" cy="28" r="4" fill="var(--cyan)"/>
  <circle cx="276" cy="192" r="4" fill="var(--violet)"/>
  <text x="86" y="192">repouso</text>
  <text x="205" y="18" text-anchor="middle">pico (Na⁺ entra)</text>
  <text x="292" y="112">K⁺ sai</text>
  <path d="M290 116 L266 132" stroke="currentColor" stroke-width="1" opacity=".5"/>
  <text x="330" y="216" text-anchor="middle">hiperpolarização</text>
  <path d="M300 208 L282 196" stroke="currentColor" stroke-width="1" opacity=".5"/>
 </svg>`},

'bomba-sodio-potassio':{
 title:'A bomba de sódio-potássio',
 caption:'Ela empurra 3 sódios para fora e traz 2 potássios para dentro, gastando energia. É o que mantém o neurônio "carregado", pronto para disparar.',
 svg:`<svg class="fig-svg" viewBox="0 0 420 230" role="img" aria-label="Bomba de sódio-potássio na membrana">
  <rect x="20" y="98" width="380" height="34" rx="4" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.2"/>
  <text x="24" y="28">FORA (mais Na⁺)</text>
  <text x="24" y="212">DENTRO (mais K⁺, carga negativa)</text>
  <g>
   <rect x="176" y="88" width="68" height="54" rx="8" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.8"/>
   <text x="210" y="120" text-anchor="middle">bomba</text>
  </g>
  <path d="M196 88 C196 66 186 60 176 56" fill="none" stroke="var(--cyan)" stroke-width="2"/>
  <path d="M176 56 l9 1 l-3 8 Z" fill="var(--cyan)"/>
  <circle cx="150" cy="52" r="9" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.4"/>
  <text x="150" y="56" text-anchor="middle" fill="var(--cyan)">Na⁺</text>
  <circle cx="120" cy="66" r="9" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.4"/>
  <circle cx="132" cy="34" r="9" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.4"/>
  <text x="34" y="92" fill="var(--cyan)">3 Na⁺ para fora</text>
  <path d="M228 142 C228 164 240 170 250 174" fill="none" stroke="var(--violet)" stroke-width="2"/>
  <path d="M250 174 l-9 -1 l3 -8 Z" fill="var(--violet)"/>
  <circle cx="276" cy="180" r="9" fill="var(--violet)" fill-opacity=".3" stroke="var(--violet)" stroke-width="1.4"/>
  <text x="276" y="184" text-anchor="middle" fill="var(--violet)">K⁺</text>
  <circle cx="308" cy="166" r="9" fill="var(--violet)" fill-opacity=".3" stroke="var(--violet)" stroke-width="1.4"/>
  <text x="300" y="196" fill="var(--violet)">2 K⁺ para dentro</text>
  <path d="M210 142 L210 158" stroke="var(--amber)" stroke-width="1.6"/>
  <text x="252" y="146" fill="var(--amber)">gasta ATP</text>
  <path d="M248 142 L216 150" stroke="var(--amber)" stroke-width="1" opacity=".6"/>
 </svg>`},

'mielina':{
 title:'A mielina e a condução saltatória',
 caption:'A mielina isola o axônio em trechos. O sinal não percorre tudo: ele salta de um intervalo a outro — e por isso viaja muito mais rápido.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 170" role="img" aria-label="Axônio com mielina e condução saltatória">
  <line x1="24" y1="92" x2="418" y2="92" stroke="currentColor" stroke-width="4" opacity=".5"/>
  <g fill="var(--violet)" fill-opacity=".22" stroke="var(--violet)" stroke-width="1.6">
   <rect x="46" y="74" width="66" height="36" rx="16"/>
   <rect x="134" y="74" width="66" height="36" rx="16"/>
   <rect x="222" y="74" width="66" height="36" rx="16"/>
   <rect x="310" y="74" width="66" height="36" rx="16"/>
  </g>
  <text x="79" y="132" text-anchor="middle" fill="var(--violet)">mielina</text>
  <text x="123" y="60" text-anchor="middle" fill="var(--amber)">nó</text>
  <text x="211" y="60" text-anchor="middle" fill="var(--amber)">nó</text>
  <circle cx="123" cy="92" r="5" fill="var(--amber)"/>
  <circle cx="211" cy="92" r="5" fill="var(--amber)"/>
  <circle cx="299" cy="92" r="5" fill="var(--amber)"/>
  <path d="M123 40 C155 12 179 12 211 40" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <path d="M211 40 l-9 -6 l-1 9 Z" fill="var(--cyan)"/>
  <path d="M211 40 C243 12 267 12 299 40" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <path d="M299 40 l-9 -6 l-1 9 Z" fill="var(--cyan)"/>
  <text x="255" y="14" text-anchor="middle" fill="var(--cyan)">o sinal salta</text>
  <text x="386" y="132" text-anchor="middle">axônio</text>
 </svg>`},

'sinapse':{
 title:'A sinapse por dentro',
 caption:'O sinal elétrico chega, o cálcio entra, as bolsinhas despejam o neurotransmissor na fenda, e o outro lado recebe pelos receptores.',
 svg:`<svg class="fig-svg" viewBox="0 0 420 280" role="img" aria-label="Estrutura da sinapse">
  <path d="M70 20 C40 60 44 100 70 118 L330 118 C356 100 358 60 330 20 Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.4"/>
  <text x="200" y="14" text-anchor="middle">terminal que envia</text>
  <circle cx="150" cy="70" r="13" fill="var(--cyan)" fill-opacity=".25" stroke="var(--cyan)" stroke-width="1.4"/>
  <circle cx="196" cy="56" r="13" fill="var(--cyan)" fill-opacity=".25" stroke="var(--cyan)" stroke-width="1.4"/>
  <circle cx="242" cy="72" r="13" fill="var(--cyan)" fill-opacity=".25" stroke="var(--cyan)" stroke-width="1.4"/>
  <text x="120" y="46" fill="var(--cyan)">vesículas</text>
  <circle cx="196" cy="104" r="9" fill="var(--cyan)" fill-opacity=".45" stroke="var(--cyan)" stroke-width="1.2"/>
  <path d="M92 40 C86 60 88 82 96 100" fill="none" stroke="var(--amber)" stroke-width="2"/>
  <circle cx="100" cy="106" r="6" fill="var(--amber)"/>
  <text x="62" y="98" fill="var(--amber)">Ca²⁺ entra</text>
  <rect x="70" y="118" width="260" height="30" fill="none"/>
  <text x="352" y="138" text-anchor="end" opacity=".8">fenda (~20 nm)</text>
  <circle cx="176" cy="132" r="4" fill="var(--cyan)"/>
  <circle cx="200" cy="140" r="4" fill="var(--cyan)"/>
  <circle cx="224" cy="130" r="4" fill="var(--cyan)"/>
  <circle cx="190" cy="150" r="4" fill="var(--cyan)"/>
  <rect x="60" y="158" width="300" height="30" rx="5" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.4"/>
  <text x="200" y="212" text-anchor="middle">terminal que recebe</text>
  <path d="M164 158 C164 148 186 148 186 158" fill="none" stroke="var(--violet)" stroke-width="2"/>
  <path d="M214 158 C214 148 236 148 236 158" fill="none" stroke="var(--violet)" stroke-width="2"/>
  <text x="270" y="176" fill="var(--violet)">receptores</text>
  <path d="M200 194 L200 228" stroke="var(--green)" stroke-width="2"/>
  <path d="M200 228 l-5 -8 l10 0 Z" fill="var(--green)"/>
  <text x="200" y="248" text-anchor="middle" fill="var(--green)">o sinal continua</text>
 </svg>`},

'ltp-nmda':{
 title:'Como uma sinapse fica mais forte (LTP)',
 caption:'O receptor NMDA é um detector de coincidência: só deixa o cálcio entrar quando chega glutamato E o outro lado já está ativo. É esse cálcio que manda instalar mais receptores — e a sinapse fica mais forte.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 250" role="img" aria-label="Mecanismo da LTP com receptor NMDA">
  <text x="110" y="18" text-anchor="middle" opacity=".8">SEM coincidência</text>
  <text x="330" y="18" text-anchor="middle" opacity=".8">COM coincidência</text>
  <line x1="220" y1="26" x2="220" y2="230" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".3"/>
  <rect x="30" y="60" width="160" height="20" rx="4" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="80" cy="46" r="5" fill="var(--cyan)"/><circle cx="110" cy="42" r="5" fill="var(--cyan)"/>
  <text x="52" y="34" fill="var(--cyan)">glutamato</text>
  <rect x="96" y="80" width="28" height="26" rx="4" fill="var(--rose)" fill-opacity=".25" stroke="var(--rose)" stroke-width="1.5"/>
  <text x="110" y="122" text-anchor="middle" fill="var(--rose)">NMDA</text>
  <circle cx="110" cy="93" r="6" fill="var(--rose)" fill-opacity=".8"/>
  <text x="110" y="145" text-anchor="middle" fill="var(--rose)">bloqueado</text>
  <text x="110" y="163" text-anchor="middle" opacity=".7">o cálcio não entra</text>
  <text x="110" y="190" text-anchor="middle" opacity=".7">nada muda</text>
  <rect x="250" y="60" width="160" height="20" rx="4" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="300" cy="46" r="5" fill="var(--cyan)"/><circle cx="330" cy="42" r="5" fill="var(--cyan)"/>
  <rect x="316" y="80" width="28" height="26" rx="4" fill="var(--green)" fill-opacity=".25" stroke="var(--green)" stroke-width="1.5"/>
  <text x="330" y="122" text-anchor="middle" fill="var(--green)">NMDA</text>
  <path d="M330 84 L330 112" stroke="var(--amber)" stroke-width="2.4"/>
  <path d="M330 112 l-5 -8 l10 0 Z" fill="var(--amber)"/>
  <circle cx="330" cy="72" r="6" fill="var(--amber)"/>
  <text x="356" y="76" fill="var(--amber)">Ca²⁺</text>
  <text x="330" y="145" text-anchor="middle" fill="var(--green)">aberto</text>
  <text x="330" y="163" text-anchor="middle" opacity=".7">o outro lado já está ativo</text>
  <path d="M330 176 L330 196" stroke="var(--green)" stroke-width="2"/>
  <path d="M330 196 l-5 -8 l10 0 Z" fill="var(--green)"/>
  <text x="330" y="216" text-anchor="middle" fill="var(--green)">entram mais receptores AMPA</text>
  <text x="330" y="236" text-anchor="middle" fill="var(--green)">a sinapse fica mais forte</text>
 </svg>`},

'curva-espacamento':{
 title:'Por que o espaçamento vence',
 caption:'Sem revisar, a memória despenca. Cada revisão feita na hora certa levanta a curva e a faz cair mais devagar — por isso revisar amanhã vale mais que reler dez vezes hoje.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 250" role="img" aria-label="Curva do esquecimento com revisões espaçadas">
  <line x1="50" y1="24" x2="50" y2="206" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <line x1="50" y1="206" x2="416" y2="206" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <text x="12" y="34">100%</text><text x="20" y="200">0%</text>
  <text x="233" y="234" text-anchor="middle">tempo →</text>
  <text x="16" y="120">lembra</text>
  <path d="M50 40 C70 96 96 140 140 168 C170 186 200 194 240 198" fill="none" stroke="var(--rose)" stroke-width="2" stroke-dasharray="5 4" opacity=".85"/>
  <text x="196" y="182" fill="var(--rose)">sem revisar</text>
  <path d="M50 40 C64 74 78 96 100 108" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <path d="M100 108 L100 44" stroke="var(--green)" stroke-width="1.6" stroke-dasharray="3 3"/>
  <path d="M100 44 C122 70 140 86 168 96" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <path d="M168 96 L168 40" stroke="var(--green)" stroke-width="1.6" stroke-dasharray="3 3"/>
  <path d="M168 40 C210 62 240 74 276 80" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <path d="M276 80 L276 36" stroke="var(--green)" stroke-width="1.6" stroke-dasharray="3 3"/>
  <path d="M276 36 C330 48 372 54 412 58" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <circle cx="100" cy="44" r="4.5" fill="var(--green)"/>
  <circle cx="168" cy="40" r="4.5" fill="var(--green)"/>
  <circle cx="276" cy="36" r="4.5" fill="var(--green)"/>
  <text x="100" y="30" text-anchor="middle" fill="var(--green)">revisão</text>
  <text x="168" y="26" text-anchor="middle" fill="var(--green)">revisão</text>
  <text x="276" y="22" text-anchor="middle" fill="var(--green)">revisão</text>
  <text x="386" y="76" text-anchor="middle" fill="var(--cyan)">com revisão</text>
 </svg>`}

};

/* ---- BIBLIOTECA DE FIGURAS (parte 2) ---- */
Object.assign(FIGURES, {

'estruturas-profundas':{
 title:'As estruturas profundas (corte ao meio)',
 caption:'O cérebro cortado ao meio, mostrando onde moram as estruturas citadas ao longo do curso.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 260" role="img" aria-label="Corte sagital com estruturas profundas">
  <path d="M60 140 C46 74 130 34 216 40 C310 47 372 76 374 132 C376 168 350 190 314 192 L150 192 C100 192 68 176 60 140 Z"
        fill="none" stroke="currentColor" stroke-width="1.5" opacity=".45"/>
  <path d="M120 96 C160 70 250 70 300 92" fill="none" stroke="var(--violet)" stroke-width="3.5" opacity=".8"/>
  <text x="210" y="66" text-anchor="middle" fill="var(--violet)">corpo caloso</text>
  <ellipse cx="200" cy="122" rx="30" ry="20" fill="var(--cyan)" fill-opacity=".28" stroke="var(--cyan)" stroke-width="1.6"/>
  <text x="200" y="126" text-anchor="middle" fill="var(--cyan)">tálamo</text>
  <ellipse cx="192" cy="152" rx="17" ry="10" fill="var(--amber)" fill-opacity=".3" stroke="var(--amber)" stroke-width="1.5"/>
  <text x="150" y="170" text-anchor="end" fill="var(--amber)">hipotálamo</text>
  <path d="M156 168 L176 156" stroke="var(--amber)" stroke-width="1"/>
  <ellipse cx="140" cy="118" rx="24" ry="15" fill="var(--green)" fill-opacity=".22" stroke="var(--green)" stroke-width="1.5"/>
  <text x="112" y="100" text-anchor="middle" fill="var(--green)">gânglios</text>
  <text x="112" y="112" text-anchor="middle" fill="var(--green)">da base</text>
  <path d="M262 140 C280 136 296 144 300 156 C288 166 266 164 258 154 C254 146 256 142 262 140 Z"
        fill="var(--rose)" fill-opacity=".28" stroke="var(--rose)" stroke-width="1.5"/>
  <text x="316" y="150" fill="var(--rose)">hipocampo</text>
  <circle cx="248" cy="166" r="11" fill="var(--orange)" fill-opacity=".35" stroke="var(--orange)" stroke-width="1.5"/>
  <path d="M240 174 L206 206" stroke="var(--orange)" stroke-width="1" opacity=".8"/>
  <text x="200" y="216" text-anchor="end" fill="var(--orange)">amígdala</text>
  <path d="M318 176 C352 176 372 190 370 208 C368 224 344 220 326 214 C312 208 310 188 318 176 Z"
        fill="var(--teal)" fill-opacity=".26" stroke="var(--teal)" stroke-width="1.5"/>
  <text x="376" y="238" text-anchor="end" fill="var(--teal)">cerebelo</text>
  <path d="M262 186 C258 210 264 232 272 246 L292 244 C284 226 286 206 288 188 Z"
        fill="var(--blue)" fill-opacity=".3" stroke="var(--blue)" stroke-width="1.5"/>
  <text x="252" y="240" text-anchor="end" fill="var(--blue)">tronco</text>
  <text x="80" y="60">frente</text>
 </svg>`},

'cortex-camadas':{
 title:'O córtex: casca fina e dobrada',
 caption:'O córtex tem só 2 a 4 mm de espessura e seis camadas de células. As dobras multiplicam a área que cabe no crânio. Abaixo dele corre a substância branca — a fiação.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 230" role="img" aria-label="Camadas do córtex e substância branca">
  <path d="M20 60 C50 20 80 20 108 58 C132 92 158 92 182 56 C206 20 236 20 262 58 C286 92 312 92 336 56 C360 22 392 24 418 60"
        fill="none" stroke="var(--cyan)" stroke-width="3"/>
  <path d="M20 60 C50 20 80 20 108 58 C132 92 158 92 182 56 C206 20 236 20 262 58 C286 92 312 92 336 56 C360 22 392 24 418 60
           L418 96 C392 60 360 58 336 92 C312 128 286 128 262 94 C236 56 206 56 182 92 C158 128 132 128 108 94 C80 56 50 56 20 96 Z"
        fill="var(--cyan)" fill-opacity=".18" stroke="none"/>
  <text x="40" y="44" fill="var(--cyan)">córtex (cinzenta)</text>
  <path d="M20 96 C50 56 80 56 108 94 C132 128 158 128 182 92 C206 56 236 56 262 94 C286 128 312 128 336 92 C360 58 392 60 418 96
           L418 176 L20 176 Z" fill="var(--violet)" fill-opacity=".14" stroke="var(--violet)" stroke-width="1.4"/>
  <text x="220" y="150" text-anchor="middle" fill="var(--violet)">substância branca (a fiação)</text>
  <g stroke="currentColor" stroke-width=".7" opacity=".45">
   <path d="M182 60 L182 88"/><path d="M186 58 L186 90"/><path d="M190 57 L190 90"/>
  </g>
  <path d="M366 30 L392 30" stroke="var(--amber)" stroke-width="1.2"/>
  <path d="M366 30 L366 66 M392 30 L392 66" stroke="var(--amber)" stroke-width="1.2"/>
  <text x="379" y="22" text-anchor="middle" fill="var(--amber)">2–4 mm</text>
  <text x="220" y="206" text-anchor="middle" opacity=".75">as dobras multiplicam a área do córtex</text>
 </svg>`},

'retina':{
 title:'A retina: bastonetes e cones',
 caption:'A luz atravessa o olho e chega à retina. Os bastonetes (muitos, sensíveis, sem cor) cobrem a periferia; os cones (cor e detalhe) se amontoam na fóvea, o centro.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 250" role="img" aria-label="Olho, retina, bastonetes e cones">
  <circle cx="130" cy="120" r="72" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".6"/>
  <path d="M60 104 C48 112 48 128 60 136" fill="none" stroke="var(--cyan)" stroke-width="2.4"/>
  <ellipse cx="72" cy="120" rx="10" ry="20" fill="var(--cyan)" fill-opacity=".2" stroke="var(--cyan)" stroke-width="1.4"/>
  <text x="60" y="86" text-anchor="middle" fill="var(--cyan)">luz</text>
  <path d="M18 120 L54 120" stroke="var(--amber)" stroke-width="2"/>
  <path d="M54 120 l-9 -4 l0 8 Z" fill="var(--amber)"/>
  <path d="M172 78 C196 100 196 140 172 162" fill="none" stroke="var(--rose)" stroke-width="4"/>
  <text x="206" y="72" fill="var(--rose)">retina</text>
  <circle cx="190" cy="120" r="5" fill="var(--violet)"/>
  <text x="198" y="140" fill="var(--violet)">fóvea</text>
  <path d="M196 120 C240 120 250 118 268 116" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5" fill="none"/>
  <rect x="272" y="40" width="150" height="176" rx="8" fill="currentColor" fill-opacity=".05" stroke="currentColor" stroke-width="1" opacity=".7"/>
  <text x="347" y="60" text-anchor="middle" opacity=".85">a retina de perto</text>
  <g stroke="var(--violet)" stroke-width="1.6" fill="var(--violet)" fill-opacity=".3">
   <rect x="330" y="76" width="9" height="26" rx="4"/>
   <rect x="345" y="76" width="9" height="26" rx="4"/>
   <rect x="360" y="76" width="9" height="26" rx="4"/>
  </g>
  <text x="347" y="118" text-anchor="middle" fill="var(--violet)">cones (fóvea)</text>
  <text x="347" y="132" text-anchor="middle" opacity=".7">cor e detalhe</text>
  <g stroke="var(--cyan)" stroke-width="1.6" fill="var(--cyan)" fill-opacity=".25">
   <rect x="300" y="148" width="7" height="30" rx="3.5"/>
   <rect x="314" y="148" width="7" height="30" rx="3.5"/>
   <rect x="328" y="148" width="7" height="30" rx="3.5"/>
   <rect x="342" y="148" width="7" height="30" rx="3.5"/>
   <rect x="356" y="148" width="7" height="30" rx="3.5"/>
   <rect x="370" y="148" width="7" height="30" rx="3.5"/>
   <rect x="384" y="148" width="7" height="30" rx="3.5"/>
  </g>
  <text x="347" y="192" text-anchor="middle" fill="var(--cyan)">bastonetes (periferia)</text>
  <text x="347" y="205" text-anchor="middle" opacity=".7">escuro, sem cor</text>
 </svg>`},

'coclea':{
 title:'A cóclea e a tonotopia',
 caption:'Desenrolada, a cóclea é uma fita: rígida na entrada, onde vibram os agudos; flácida no fundo, onde vibram os graves. Cada frequência tem seu lugar — como as teclas de um piano.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 210" role="img" aria-label="Cóclea desenrolada e tonotopia">
  <path d="M40 66 C160 46 300 46 400 70 L400 128 C300 116 160 116 40 138 Z"
        fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.4"/>
  <path d="M42 100 C160 84 300 84 398 100" fill="none" stroke="var(--teal)" stroke-width="2.5"/>
  <text x="46" y="42" fill="var(--cyan)">base (entrada)</text>
  <text x="396" y="46" text-anchor="end" fill="var(--violet)">ápice (fundo)</text>
  <g stroke="var(--cyan)" stroke-width="2">
   <path d="M70 90 L70 110"/><path d="M84 88 L84 112"/><path d="M98 86 L98 114"/>
  </g>
  <g stroke="var(--amber)" stroke-width="2">
   <path d="M200 84 L200 116"/><path d="M216 82 L216 118"/><path d="M232 82 L232 118"/>
  </g>
  <g stroke="var(--violet)" stroke-width="2">
   <path d="M330 78 L330 122"/><path d="M350 76 L350 124"/><path d="M370 76 L370 124"/>
  </g>
  <text x="84" y="160" text-anchor="middle" fill="var(--cyan)">agudos</text>
  <text x="216" y="160" text-anchor="middle" fill="var(--amber)">médios</text>
  <text x="350" y="160" text-anchor="middle" fill="var(--violet)">graves</text>
  <path d="M60 178 L390 178" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <path d="M390 178 l-8 -4 l0 8 Z" fill="currentColor" opacity=".4"/>
  <text x="225" y="198" text-anchor="middle" opacity=".75">a membrana fica mais frouxa ao longo da espiral</text>
 </svg>`},

'homunculo':{
 title:'O homúnculo: o corpo no córtex',
 caption:'O mapa do corpo no córtex é distorcido: mãos, lábios e rosto ocupam áreas enormes — não por serem grandes, mas por terem muitos receptores e exigirem controle fino.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 230" role="img" aria-label="Homúnculo sensorial e motor">
  <path d="M60 150 C50 90 120 52 200 56 C284 60 340 84 344 132 C346 160 328 176 300 178 L130 178 C90 178 66 172 60 150 Z"
        fill="none" stroke="currentColor" stroke-width="1.4" opacity=".4"/>
  <path d="M150 74 C176 62 208 60 236 68" fill="none" stroke="var(--amber)" stroke-width="10" stroke-linecap="round" opacity=".55"/>
  <text x="120" y="52" fill="var(--amber)">faixa do corpo no córtex</text>
  <circle cx="156" cy="74" r="6" fill="var(--cyan)"/>
  <text x="150" y="96" text-anchor="end" opacity=".8">pé</text>
  <circle cx="176" cy="68" r="8" fill="var(--cyan)"/>
  <text x="176" y="100" text-anchor="middle" opacity=".8">tronco</text>
  <circle cx="204" cy="64" r="15" fill="var(--cyan)"/>
  <text x="214" y="104" text-anchor="middle" fill="var(--cyan)">MÃO</text>
  <circle cx="234" cy="70" r="14" fill="var(--cyan)"/>
  <text x="252" y="92" fill="var(--cyan)">LÁBIOS / ROSTO</text>
  <rect x="60" y="188" width="320" height="1" fill="none"/>
  <g opacity=".9">
   <rect x="70" y="196" width="18" height="10" rx="3" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)"/>
   <text x="96" y="201">área no córtex proporcional aos receptores,</text>
   <text x="96" y="215">não ao tamanho da parte do corpo</text>
  </g>
 </svg>`},

'juncao-neuromuscular':{
 title:'A junção neuromuscular',
 caption:'O ponto final do comando: o neurônio motor libera acetilcolina, ela se encaixa nos receptores da fibra e o músculo contrai. É exatamente aqui que a miastenia e o curare atacam.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 230" role="img" aria-label="Junção neuromuscular">
  <path d="M20 46 L150 46 C176 46 180 60 180 74" fill="none" stroke="var(--lime)" stroke-width="5" stroke-linecap="round" opacity=".8"/>
  <text x="30" y="34" fill="var(--lime)">neurônio motor</text>
  <path d="M140 74 C140 60 220 60 220 74 L220 100 C220 112 140 112 140 100 Z"
        fill="var(--lime)" fill-opacity=".18" stroke="var(--lime)" stroke-width="1.6"/>
  <circle cx="160" cy="86" r="7" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.2"/>
  <circle cx="182" cy="82" r="7" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.2"/>
  <circle cx="202" cy="88" r="7" fill="var(--cyan)" fill-opacity=".3" stroke="var(--cyan)" stroke-width="1.2"/>
  <text x="252" y="88" fill="var(--cyan)">acetilcolina</text>
  <circle cx="168" cy="118" r="4" fill="var(--cyan)"/>
  <circle cx="190" cy="122" r="4" fill="var(--cyan)"/>
  <circle cx="210" cy="116" r="4" fill="var(--cyan)"/>
  <rect x="120" y="132" width="260" height="34" rx="6" fill="var(--rose)" fill-opacity=".14" stroke="var(--rose)" stroke-width="1.6"/>
  <path d="M160 132 C160 122 180 122 180 132" fill="none" stroke="var(--rose)" stroke-width="2"/>
  <path d="M198 132 C198 122 218 122 218 132" fill="none" stroke="var(--rose)" stroke-width="2"/>
  <text x="300" y="152" fill="var(--rose)">receptores na fibra</text>
  <text x="140" y="186" fill="var(--rose)">MÚSCULO</text>
  <path d="M250 176 L250 200" stroke="var(--green)" stroke-width="2"/>
  <path d="M250 200 l-5 -8 l10 0 Z" fill="var(--green)"/>
  <text x="262" y="200" fill="var(--green)">contrai</text>
  <text x="20" y="216" opacity=".7">a miastenia e o curare bloqueiam justamente estes receptores</text>
 </svg>`}

});

/* ---- BIBLIOTECA DE FIGURAS (parte 3) ---- */
Object.assign(FIGURES, {

'erro-previsao':{
 title:'O erro de previsão da dopamina',
 caption:'Três situações, três respostas. A dopamina não sinaliza o prazer: sinaliza a surpresa. Quando a recompensa é exatamente a esperada, ela não dispara na entrega — dispara na pista que a anuncia.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 280" role="img" aria-label="Respostas da dopamina ao erro de previsão">
  <text x="14" y="30" opacity=".85">1. recompensa inesperada</text>
  <line x1="20" y1="70" x2="410" y2="70" stroke="currentColor" stroke-width="1" opacity=".35"/>
  <path d="M250 70 L252 44 L256 70" fill="var(--green)" stroke="var(--green)" stroke-width="2"/>
  <path d="M250 70 L252 40 L256 70" fill="var(--green)"/>
  <circle cx="253" cy="80" r="4" fill="var(--amber)"/>
  <text x="253" y="96" text-anchor="middle" fill="var(--amber)">recompensa</text>
  <text x="330" y="52" fill="var(--green)">dispara ↑</text>

  <text x="14" y="130" opacity=".85">2. recompensa prevista (havia uma pista)</text>
  <line x1="20" y1="170" x2="410" y2="170" stroke="currentColor" stroke-width="1" opacity=".35"/>
  <path d="M140 170 L142 144 L146 170" fill="var(--green)"/>
  <circle cx="143" cy="180" r="4" fill="var(--cyan)"/>
  <text x="143" y="196" text-anchor="middle" fill="var(--cyan)">pista</text>
  <circle cx="253" cy="180" r="4" fill="var(--amber)"/>
  <text x="253" y="196" text-anchor="middle" fill="var(--amber)">recompensa</text>
  <text x="266" y="158" opacity=".7">sem resposta aqui</text>
  <text x="330" y="152" fill="var(--green)">dispara na pista</text>

  <text x="14" y="230" opacity=".85">3. recompensa esperada que NÃO veio</text>
  <line x1="20" y1="256" x2="410" y2="256" stroke="currentColor" stroke-width="1" opacity=".35"/>
  <path d="M140 256 L142 234 L146 256" fill="var(--green)"/>
  <circle cx="143" cy="266" r="4" fill="var(--cyan)"/>
  <path d="M248 256 L253 276 L258 256" fill="var(--rose)"/>
  <circle cx="253" cy="248" r="4" fill="var(--amber)" fill-opacity=".35" stroke="var(--amber)" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="300" y="268" fill="var(--rose)">cai abaixo do normal</text>
 </svg>`},

'u-invertido':{
 title:'A curva do estresse (U invertido)',
 caption:'Estresse de menos entedia; de mais paralisa. O desempenho é melhor no meio — e é por isso que um pouco de pressão ajuda, mas a pressão crônica destrói.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 240" role="img" aria-label="Curva em U invertido do estresse e desempenho">
  <line x1="56" y1="24" x2="56" y2="196" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <line x1="56" y1="196" x2="412" y2="196" stroke="currentColor" stroke-width="1.4" opacity=".5"/>
  <text x="12" y="110">desempenho</text>
  <text x="234" y="226" text-anchor="middle">estresse / ativação →</text>
  <path d="M64 184 C130 176 168 66 234 60 C300 54 344 168 404 186" fill="none" stroke="var(--cyan)" stroke-width="2.8"/>
  <circle cx="234" cy="60" r="5" fill="var(--green)"/>
  <text x="234" y="46" text-anchor="middle" fill="var(--green)">ponto ótimo</text>
  <circle cx="80" cy="180" r="4.5" fill="var(--violet)"/>
  <text x="86" y="172" fill="var(--violet)">tédio</text>
  <circle cx="392" cy="182" r="4.5" fill="var(--rose)"/>
  <text x="386" y="172" text-anchor="end" fill="var(--rose)">paralisia</text>
  <line x1="234" y1="66" x2="234" y2="196" stroke="var(--green)" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
 </svg>`},

'sistema-glinfatico':{
 title:'A faxina do cérebro (sistema glinfático)',
 caption:'Durante o sono, o espaço entre as células aumenta e o líquido corre com mais força pelo tecido, levando embora os resíduos do dia.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 230" role="img" aria-label="Sistema glinfático acordado versus dormindo">
  <text x="110" y="26" text-anchor="middle" opacity=".85">ACORDADO</text>
  <text x="330" y="26" text-anchor="middle" opacity=".85">DORMINDO</text>
  <line x1="220" y1="34" x2="220" y2="206" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".3"/>
  <g>
   <circle cx="70" cy="80" r="17" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="106" cy="76" r="17" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="142" cy="82" r="17" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="88" cy="114" r="17" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="124" cy="116" r="17" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <path d="M40 150 C70 146 140 146 176 152" fill="none" stroke="var(--cyan)" stroke-width="2" opacity=".5"/>
   <path d="M176 152 l-8 -3 l0 7 Z" fill="var(--cyan)" opacity=".5"/>
   <text x="108" y="176" text-anchor="middle" fill="var(--cyan)" opacity=".7">fluxo fraco</text>
   <circle cx="96" cy="96" r="3" fill="var(--rose)"/><circle cx="118" cy="98" r="3" fill="var(--rose)"/>
   <circle cx="106" cy="60" r="3" fill="var(--rose)"/><circle cx="130" cy="100" r="3" fill="var(--rose)"/>
   <text x="110" y="200" text-anchor="middle" fill="var(--rose)">resíduos acumulam</text>
  </g>
  <g>
   <circle cx="286" cy="78" r="14" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="330" cy="74" r="14" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="374" cy="80" r="14" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="306" cy="116" r="14" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <circle cx="352" cy="118" r="14" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="1.2"/>
   <path d="M258 96 C300 92 360 92 400 98" fill="none" stroke="var(--cyan)" stroke-width="3.4"/>
   <path d="M400 98 l-10 -4 l0 9 Z" fill="var(--cyan)"/>
   <path d="M258 132 C300 128 360 128 400 134" fill="none" stroke="var(--cyan)" stroke-width="3.4"/>
   <path d="M400 134 l-10 -4 l0 9 Z" fill="var(--cyan)"/>
   <text x="330" y="176" text-anchor="middle" fill="var(--cyan)">o líquido corre forte</text>
   <text x="330" y="200" text-anchor="middle" fill="var(--green)">resíduos são levados embora</text>
  </g>
 </svg>`},

'barreira-hematoencefalica':{
 title:'A barreira hematoencefálica',
 caption:'O porteiro do cérebro. As células do vaso são grudadas umas nas outras: passam moléculas pequenas e gordurosas; o resto fica de fora. Se a droga não atravessa, ela não age.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 210" role="img" aria-label="Barreira hematoencefálica">
  <rect x="20" y="20" width="400" height="60" rx="6" fill="var(--rose)" fill-opacity=".1" stroke="var(--rose)" stroke-width="1.2"/>
  <text x="34" y="42" fill="var(--rose)">SANGUE</text>
  <rect x="20" y="80" width="400" height="22" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.4"/>
  <path d="M96 80 L96 102 M172 80 L172 102 M248 80 L248 102 M324 80 L324 102" stroke="currentColor" stroke-width="2.2"/>
  <text x="430" y="96" text-anchor="end" opacity=".75">células grudadas</text>
  <rect x="20" y="102" width="400" height="66" rx="6" fill="var(--cyan)" fill-opacity=".07" stroke="var(--cyan)" stroke-width="1.2"/>
  <text x="34" y="158" fill="var(--cyan)">CÉREBRO</text>
  <circle cx="130" cy="56" r="7" fill="var(--green)" fill-opacity=".4" stroke="var(--green)" stroke-width="1.3"/>
  <path d="M130 66 L130 118" stroke="var(--green)" stroke-width="2"/>
  <path d="M130 118 l-5 -8 l10 0 Z" fill="var(--green)"/>
  <circle cx="130" cy="130" r="7" fill="var(--green)" fill-opacity=".4" stroke="var(--green)" stroke-width="1.3"/>
  <text x="142" y="134" fill="var(--green)">pequena e gordurosa: passa</text>
  <circle cx="300" cy="52" r="12" fill="var(--rose)" fill-opacity=".35" stroke="var(--rose)" stroke-width="1.5"/>
  <path d="M300 66 L300 78" stroke="var(--rose)" stroke-width="2"/>
  <path d="M288 84 L312 84" stroke="var(--rose)" stroke-width="3"/>
  <path d="M292 76 L308 92 M308 76 L292 92" stroke="var(--rose)" stroke-width="2"/>
  <text x="322" y="60" fill="var(--rose)">grande: barrada</text>
 </svg>`},

'ganglios-base':{
 title:'Os gânglios da base: o portão do movimento',
 caption:'Uma via diz "siga", outra diz "não siga", e a dopamina equilibra as duas. Sem dopamina (Parkinson), sobra freio: o movimento fica lento e rígido.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 240" role="img" aria-label="Vias direta e indireta dos gânglios da base">
  <rect x="160" y="20" width="120" height="34" rx="8" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1.4"/>
  <text x="220" y="42" text-anchor="middle">córtex (quero mover)</text>
  <path d="M186 54 L120 84" stroke="var(--green)" stroke-width="2"/>
  <path d="M254 54 L320 84" stroke="var(--rose)" stroke-width="2"/>
  <rect x="46" y="86" width="144" height="34" rx="8" fill="var(--green)" fill-opacity=".16" stroke="var(--green)" stroke-width="1.5"/>
  <text x="118" y="108" text-anchor="middle" fill="var(--green)">via direta: SIGA</text>
  <rect x="248" y="86" width="156" height="34" rx="8" fill="var(--rose)" fill-opacity=".16" stroke="var(--rose)" stroke-width="1.5"/>
  <text x="326" y="108" text-anchor="middle" fill="var(--rose)">via indireta: NÃO SIGA</text>
  <path d="M118 120 L182 158" stroke="var(--green)" stroke-width="2"/>
  <path d="M182 158 l-9 -2 l1 9 Z" fill="var(--green)"/>
  <path d="M326 120 L262 158" stroke="var(--rose)" stroke-width="2"/>
  <path d="M262 158 l8 -2 l-1 9 Z" fill="var(--rose)"/>
  <rect x="152" y="160" width="140" height="34" rx="8" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1.4"/>
  <text x="222" y="182" text-anchor="middle">movimento sai (ou não)</text>
  <ellipse cx="222" cy="128" rx="30" ry="14" fill="var(--amber)" fill-opacity=".28" stroke="var(--amber)" stroke-width="1.5"/>
  <text x="222" y="132" text-anchor="middle" fill="var(--amber)">dopamina</text>
  <path d="M192 128 L152 118" stroke="var(--amber)" stroke-width="1.4" stroke-dasharray="3 3"/>
  <path d="M252 128 L292 118" stroke="var(--amber)" stroke-width="1.4" stroke-dasharray="3 3"/>
  <text x="220" y="222" text-anchor="middle" opacity=".75">sem dopamina, o freio vence: é o Parkinson</text>
 </svg>`},

'placas-emaranhados':{
 title:'Alzheimer: placas e emaranhados',
 caption:'Duas marcas da doença: placas de beta-amiloide se acumulam ENTRE os neurônios, e emaranhados de tau se formam DENTRO deles. O dano começa nas regiões da memória.',
 svg:`<svg class="fig-svg" viewBox="0 0 440 220" role="img" aria-label="Placas amiloides e emaranhados de tau">
  <circle cx="120" cy="104" r="34" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="1.6"/>
  <path d="M120 70 L120 48 M92 88 L68 74 M92 122 L68 138 M148 88 L172 74 M148 122 L172 138"
        stroke="currentColor" stroke-width="1.6" opacity=".7"/>
  <text x="120" y="176" text-anchor="middle" opacity=".8">neurônio saudável</text>
  <circle cx="300" cy="104" r="34" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3"/>
  <path d="M300 70 L300 50 M272 90 L250 78 M272 120 L250 134" stroke="currentColor" stroke-width="1.4" opacity=".4"/>
  <g stroke="var(--rose)" stroke-width="1.8" fill="none">
   <path d="M286 92 L314 116 M314 92 L286 116 M292 104 L308 104"/>
  </g>
  <text x="300" y="176" text-anchor="middle" fill="var(--rose)">emaranhados de tau (dentro)</text>
  <g fill="var(--amber)" fill-opacity=".35" stroke="var(--amber)" stroke-width="1.3">
   <circle cx="228" cy="62" r="11"/>
   <circle cx="372" cy="70" r="9"/>
   <circle cx="238" cy="150" r="9"/>
   <circle cx="366" cy="146" r="11"/>
  </g>
  <text x="300" y="30" text-anchor="middle" fill="var(--amber)">placas de beta-amiloide (fora)</text>
  <path d="M172 104 L246 104" stroke="currentColor" stroke-width="1.5" opacity=".5"/>
  <path d="M246 104 l-9 -4 l0 8 Z" fill="currentColor" opacity=".5"/>
  <text x="209" y="200" text-anchor="middle" opacity=".7">a degeneração começa nas áreas da memória</text>
 </svg>`},

'penumbra':{
 title:'AVC: o núcleo e a penumbra',
 caption:'No centro, o tecido já morreu. Em volta, a penumbra ainda está viva — mas por pouco tempo. É por ela que se corre: "tempo é cérebro".',
 svg:`<svg class="fig-svg" viewBox="0 0 440 220" role="img" aria-label="Núcleo e penumbra em um AVC">
  <path d="M50 132 C40 74 108 42 184 46 C264 50 314 74 316 118 C318 148 296 164 268 166 L124 166 C86 166 56 156 50 132 Z"
        fill="none" stroke="currentColor" stroke-width="1.4" opacity=".45"/>
  <circle cx="196" cy="106" r="46" fill="var(--amber)" fill-opacity=".15" stroke="var(--amber)" stroke-width="1.6" stroke-dasharray="5 4"/>
  <circle cx="196" cy="106" r="24" fill="var(--rose)" fill-opacity=".45" stroke="var(--rose)" stroke-width="1.6"/>
  <path d="M340 92 L244 100" stroke="var(--amber)" stroke-width="1.2"/>
  <text x="346" y="88" fill="var(--amber)">penumbra</text>
  <text x="346" y="104" opacity=".75">ainda viva:</text>
  <text x="346" y="118" opacity=".75">dá para salvar</text>
  <path d="M340 150 L216 122" stroke="var(--rose)" stroke-width="1.2"/>
  <text x="346" y="152" fill="var(--rose)">núcleo</text>
  <text x="346" y="166" opacity=".75">já morreu</text>
  <path d="M60 168 C90 186 130 194 180 196" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="120" y="212" text-anchor="middle" fill="var(--cyan)">vaso entupido</text>
 </svg>`}

});

/* ---- QUAL FIGURA CADA TERMO ABRE ----
   'mod:xxx' reaproveita o diagrama que já existe no módulo xxx      */
const TERM_FIG = {
  'limiar':'potencial-acao',
  'dependentes de voltagem':'potencial-acao',
  'hiperpolarizam':'potencial-acao',
  'Na⁺':'bomba-sodio-potassio',
  'K⁺':'bomba-sodio-potassio',
  'bomba de sódio-potássio':'bomba-sodio-potassio',
  'mielina':'mielina',
  'Ca²⁺':'sinapse',
  'SNARE':'sinapse',
  'ionotrópicos':'sinapse',
  'metabotrópicos':'sinapse',
  'glutamato':'sinapse',
  'GABA':'sinapse',
  'neuromoduladores':'mod:neuronio',
  'células gliais':'mod:neuronio',
  'LTP':'ltp-nmda',
  'LTD':'ltp-nmda',
  'NMDA':'ltp-nmda',
  'AMPA':'ltp-nmda',
  'CaMKII':'ltp-nmda',
  'CREB':'mod:plasticidade',
  'PKA':'mod:plasticidade',
  'reconsolidação':'curva-espacamento',
  'replay':'mod:sono',
  'ripples':'mod:sono',
  'erro de previsão':'erro-previsao',
  'mesolímbica':'mod:recompensa',
  'estriado ventral':'mod:recompensa',
  'estriado dorsal':'mod:recompensa',
  'saliência de incentivo':'erro-previsao',
  'top-down':'mod:atencao',
  'bottom-up':'mod:atencao',
  'executivo central':'mod:atencao',
  'pré-frontal dorsolateral':'mod:atencao',
  'competição enviesada':'mod:atencao',
  'cortisol':'mod:emocao',
  'hipófise':'mod:emocao',
  'córtex adrenal':'mod:emocao',
  'retroalimentação negativa':'mod:emocao',
  'U invertido':'u-invertido',
  'via rápida':'mod:emocao',
  'via lenta':'mod:emocao',
  'NREM':'mod:sono',
  'REM':'mod:sono',
  'fusos':'mod:sono',
  'oscilações lentas':'mod:sono',
  'Processo S':'mod:sono',
  'Processo C':'mod:sono',
  'adenosina':'mod:sono',
  'núcleo supraquiasmático':'mod:sono',
  'sistema glinfático':'sistema-glinfatico',
  'aquaporina-4':'sistema-glinfatico',
  'homeostase sináptica':'mod:sono',
  'glia radial':'mod:desenvolvimento',
  'micróglia':'mod:desenvolvimento',
  'tubo neural':'mod:desenvolvimento',
  'períodos críticos':'mod:desenvolvimento',
  'fotorreceptores':'retina',
  'quiasma óptico':'retina',
  'membrana basilar':'coclea',
  'células ciliadas externas':'coclea',
  'corpo geniculado medial':'mod:sensorial',
  'mecanorreceptores':'homunculo',
  'nociceptores':'mod:sensorial',
  'teoria da comporta':'mod:sensorial',
  'modulação descendente':'mod:sensorial',
  'neurônio motor superior':'mod:motor',
  'código de população':'mod:motor',
  'unidade motora':'juncao-neuromuscular',
  'miastenia gravis':'juncao-neuromuscular',
  'curare':'juncao-neuromuscular',
  'geradores de padrão':'mod:motor',
  'estimulação cerebral profunda':'ganglios-base',
  'fascículo arqueado':'mod:linguagem',
  'afasia de condução':'mod:linguagem',
  'afasia global':'mod:linguagem',
  'reciclagem neuronal':'mod:linguagem',
  'beta-amiloide':'placas-emaranhados',
  'tau':'placas-emaranhados',
  'alfa-sinucleína':'ganglios-base',
  'levodopa':'ganglios-base',
  'penumbra':'penumbra',
  'monoaminas':'mod:clinica',
  'barreira hematoencefálica':'barreira-hematoencefalica',
  'agonistas parciais':'mod:farmacologia',
  'benzodiazepínicos':'mod:farmacologia',
  'D2':'ganglios-base',
  'EEG':'mod:metodos',
  'MEG':'mod:metodos',
  'fMRI':'mod:metodos',
  'registro unitário':'mod:metodos',
  'imagem de cálcio':'mod:metodos',
  'optogenética':'mod:metodos',
  'quimiogenética':'mod:metodos',
  'TMS':'mod:metodos',
  'invasividade':'mod:metodos'
};

// resolve o termo -> {title, caption, svg} ou null
function figFor(term){
  const key = TERM_FIG[term];
  if(!key) return null;
  if(key.indexOf('mod:')===0){
    const A = ANATOMY[key.slice(4)];
    return A ? {title:A.title, caption:A.caption, svg:A.svg} : null;
  }
  return FIGURES[key] || null;
}

/* =====================================================================
   NEUROLAB — camada de profundidade dos nos das ilustracoes
   A legenda embaixo do diagrama continua curta (blurb).
   Isto aqui aparece no modal, ao tocar no no.
   ===================================================================== */
const ANAT_DEEP = {

/* ---------- 01 · O Neurônio e o Sinal ---------- */
'neuronio:dendritos':'São a <b>superfície de escuta</b>, e a árvore é enorme: um único neurônio pode receber de milhares a dezenas de milhares de sinapses. Mas dendrito não é fio passivo — a posição do contato importa. Um sinal que chega perto do corpo celular pesa mais que um que chega na ponta de um ramo distante, porque perde menos força no caminho. Ou seja, <b>onde</b> a sinapse se instala já é parte do cálculo.',
'neuronio:soma':'É onde o cálculo de fato acontece. Todas as entradas — as excitatórias empurrando a carga para cima, as inibitórias para baixo — <b>se somam</b>, e existe um único veredito. Isso faz do neurônio uma unidade de <b>decisão</b>, não um repetidor. E explica uma coisa contraintuitiva: silêncio não quer dizer que nada chegou. Pode querer dizer que chegou muita coisa dos dois lados e a soma não cruzou o limiar.',
'neuronio:nucleo':'Guarda o DNA — e é por isso que ele é peça central da <b>memória de longo prazo</b>. Memória curta é modificar proteínas que já existem na sinapse. Memória duradoura exige <b>fabricar proteínas novas</b>, o que significa ligar genes: o sinal sobe até o núcleo pela via PKA→CREB e volta como material de construção. Foi essa distinção que rendeu o Nobel a Kandel, e é o motivo pelo qual bloquear síntese proteica apaga a memória longa sem tocar na curta.',
'neuronio:axonio':'É o cabo de saída, e ele obedece a uma regra rígida: o potencial de ação vai <b>sempre</b> do corpo celular para os terminais, nunca ao contrário. O motivo é elegante — os canais que acabaram de disparar entram num período refratário e não podem reabrir, então a onda só tem para onde avançar. A direção do pensamento não é imposta de fora: emerge de canais que precisam de tempo para se recuperar.',
'neuronio:mielina':'Ela não deixa o sinal mais forte — deixa mais <b>rápido</b>, e por um truque: como o isolamento cobre segmentos, o impulso não percorre a membrana inteira, ele <b>salta</b> de nó em nó. A diferença é brutal: cerca de 1 m/s sem mielina contra até 100 m/s com ela. É também mais econômico, porque a troca de íons só acontece nos nós. Quando o sistema imune ataca essa camada, como na esclerose múltipla, o que se degrada é a velocidade e a sincronia — não o pensamento.',
'neuronio:terminais':'Aqui o sinal <b>troca de linguagem</b>: o que era elétrico vira químico. A chegada do impulso abre canais de cálcio, o Ca²⁺ que entra faz as vesículas se fundirem à membrana, e o neurotransmissor é despejado na fenda. Parece um rodeio ineficiente, mas é justamente essa conversão que torna a sinapse <b>ajustável</b>: um contato elétrico direto seria rápido e fixo. É no ponto químico que a memória consegue morar.',

/* ---------- 02 · Plasticidade e Memória ---------- */
'plasticidade:pre':'É o lado que <b>envia</b>, e ele também aprende. Uma sinapse pode ficar mais forte porque o lado de cá passa a liberar mais neurotransmissor por impulso — não só porque o outro lado ficou mais sensível. Isso significa que o fortalecimento tem <b>duas frentes independentes</b>, e é parte do motivo de a memória ser tão robusta: há mais de um jeito de gravar a mesma coisa no mesmo contato.',
'plasticidade:vesiculas':'São bolsas com neurotransmissor pré-carregado, esperando o sinal. Elas ficam <b>ancoradas e prontas</b>, e o que dispara a fusão é a entrada de cálcio, através das proteínas SNARE. Esse arranjo explica a velocidade da sinapse: nada é fabricado na hora, tudo já está posicionado. A transmissão é rápida porque o trabalho foi feito antes — o cálcio só puxa o gatilho.',
'plasticidade:fenda':'Um vão de algumas dezenas de <b>nanômetros</b>, e é ele que faz toda a diferença. Sem esse espaço, o sinal passaria direto e sempre igual. Com ele, cada travessia pode ser modulada: mais ou menos neurotransmissor, mais ou menos receptor, mais ou menos tempo até a recaptação. O aprendizado precisa de um ponto ajustável na cadeia — e esse ponto é justamente o vazio no meio dela.',
'plasticidade:receptores':'É aqui que a LTP fica visível. O receptor <b>NMDA</b> tem uma propriedade especial: só abre se duas coisas acontecerem juntas — o glutamato chegar <b>e</b> a célula já estar despolarizada. Ele é um <b>detector de coincidência</b>. Quando abre, deixa entrar cálcio, que ativa a CaMKII e leva mais receptores <b>AMPA</b> para a membrana. Mais AMPA significa resposta maior ao mesmo sinal: é literalmente isso que "a sinapse ficou mais forte" quer dizer.',
'plasticidade:pos':'É o lado que <b>recebe</b>, e onde a regra de Hebb se materializa: neurônios que disparam juntos se conectam. Mas o "juntos" é mais exigente do que parece — a ordem importa. Se o lado de cá dispara <b>logo depois</b> do de lá, a conexão fortalece; se dispara antes, enfraquece. O cérebro não registra só coincidência: registra <b>quem veio primeiro</b>, que é o mínimo necessário para aprender causa e não apenas associação.',
'plasticidade:hipocampo':'Ele não funciona como um depósito único. Na formação inicial de muitas memórias declarativas, o hipocampo ajuda a <b>ligar elementos distribuídos</b> da experiência. Com reativações ao longo do tempo — inclusive durante o sono — as relações entre hipocampo e redes corticais se reorganizam. Algumas lembranças tornam-se menos dependentes dele; memórias episódicas ricas em detalhes podem continuar recrutando o hipocampo.',

/* ---------- 03 · Recompensa e Motivação ---------- */
'recompensa:vta':'É de onde parte a dopamina da motivação — e o achado que mudou o campo é <b>quando</b> ela dispara. No começo, dispara quando a recompensa chega. Com o aprendizado, passa a disparar na <b>pista que a antecipa</b>, e não mais na recompensa esperada. Se o prêmio esperado não vem, a atividade <b>cai abaixo do basal</b>. Ou seja, ela não codifica prazer: codifica a diferença entre o que você esperava e o que aconteceu.',
'recompensa:accumbens':'É onde a dopamina chega e vira <b>querer</b> — e a distinção entre querer e gostar é a parte importante. Experimentos separaram as duas: bloquear a dopamina reduz drasticamente a busca pela recompensa sem reduzir a reação de prazer ao recebê-la. Motivação e satisfação são sistemas diferentes. É isso que explica a dependência avançada: querer muito uma coisa que já não dá prazer nenhum.',
'recompensa:pfc':'Ele recebe o sinal de valor e o transforma em <b>decisão sustentada no tempo</b> — que é o que separa impulso de plano. É a estrutura que consegue segurar uma recompensa maior lá na frente contra uma menor agora. Como o pré-frontal é justamente o mais sensível a sono ruim e estresse, essa capacidade é a primeira a cair nos dias piores. Não é o desejo que cresce no dia ruim; é a estrutura que o segura que enfraquece.',
'recompensa:via':'O caminho ATV → accumbens → pré-frontal é o mesmo em todos os casos, e é isso que o torna revelador. Comida, música, dinheiro, cocaína e reconhecimento social convergem para ele. Duas consequências: as drogas de abuso não criam prazer novo, elas <b>sequestram uma via que já existia</b>; e como o sinal é de <b>surpresa</b>, recompensa imprevisível engaja mais que recompensa garantida. É a base de máquina caça-níquel e de feed infinito.',

/* ---------- 04 · Atenção e Foco ---------- */
'atencao:pfc':'Ele mantém o objetivo ativo por <b>disparo persistente</b> — um grupo de neurônios que continua disparando na ausência do estímulo, segurando a informação viva. É um mecanismo caro e frágil: por isso a memória de trabalho tem capacidade pequena, e por isso uma interrupção breve apaga o que você segurava. O conteúdo não estava guardado em lugar nenhum; estava sendo <b>mantido no ar</b>.',
'atencao:parietal':'É o sistema que <b>orienta</b> a atenção — que decide para onde o holofote aponta. Ele opera nas duas direções: pode ser dirigido de cima para baixo por um objetivo seu, ou capturado de baixo para cima por algo saliente que apareceu. A capacidade de <b>desengatar</b> do que está prendendo é uma função sua, e quando ela falha de um lado, o paciente pode ignorar metade do espaço sem estar cego.',
'atencao:rede':'Frente e topo funcionando juntos, e o mecanismo é <b>competição enviesada</b>: várias representações disputam o mesmo território cortical, e a rede aplica um viés a favor da escolhida. Atenção não é um holofote que ilumina — é uma disputa que alguém arbitra. Isso explica por que atenção é limitada por natureza (o território é finito) e por que alternar tarefas cobra pedágio: cada troca exige desmontar o viés anterior e montar outro.',

/* ---------- 05 · Emoção, Estresse e Estado ---------- */
'emocao:amigdala':'Ela recebe o mundo por <b>duas rotas</b>, e essa arquitetura explica quase tudo. A via rápida vem direto do tálamo, é grosseira e chega em milissegundos; a via lenta passa pelo córtex, é detalhada e chega depois. A rápida dispara a reação antes de a lenta identificar o objeto — você pula da corda no chão antes de saber que não era cobra. A lógica é assimétrica: errar por excesso custa um susto, errar por falta custa a vida.',
'emocao:hipotalamo':'É a <b>tradução</b> de um sinal neural em um sinal hormonal: ele libera CRH e, com isso, converte "há uma ameaça" em uma ordem química que o corpo inteiro vai ler. A partir daqui a resposta deixa de ser elétrica e rápida e passa a ser hormonal e lenta — dura minutos a horas em vez de milissegundos. É por isso que dá para se acalmar mentalmente e o corpo continuar agitado por um bom tempo depois.',
'emocao:hipofise':'É o <b>amplificador</b> da cadeia. Ela recebe uma quantidade minúscula de CRH pelo sistema porta e libera ACTH na circulação geral, alcançando o corpo todo. Cada elo multiplica o sinal, e é assim que um evento percebido em milissegundos vira uma resposta fisiológica de corpo inteiro. Um eixo de três degraus existe porque cada degrau é um ponto onde a intensidade pode ser regulada.',
'emocao:adrenal':'É o último elo, e o que produz o efeito que você sente: o ACTH faz o córtex adrenal liberar <b>cortisol</b>. Aqui fecha a alça que mais importa — o cortisol volta e <b>desliga</b> hipotálamo e hipófise, por retroalimentação negativa. É o freio embutido do sistema. No estresse crônico esse freio perde eficiência, e é aí que a resposta que deveria ser temporária vira estado permanente.',
'emocao:cortisol':'No curto prazo ele é útil: mobiliza glicose, aumenta vigilância, prioriza a ameaça. O problema é o <b>tempo de exposição</b>. Cronicamente alto, ele passa a ocupar receptores de baixa afinidade que <b>enfraquecem o pré-frontal</b> e prejudicam o hipocampo — as duas estruturas do controle e da memória. E como o pré-frontal enfraquecido regula pior o próprio eixo, a alça se realimenta. Não é veneno: é remédio bom com prazo de validade curto.',

/* ---------- 06 · Sono e Consolidação ---------- */
'sono:rem':'O cérebro fica <b>ativo</b> e o corpo, paralisado — e a combinação não é acidente. A paralisia impede que você execute o que sonha. O detalhe mais revelador é químico: a <b>noradrenalina cai quase a zero</b> no REM, o único momento em que isso acontece. É a hipótese mais forte para a função emocional do sono: a memória do dia é reativada sem a carga de alerta que a acompanhava, o que permite reencontrar o conteúdo sem reviver o susto.',
'sono:profundo':'É a fase da <b>consolidação declarativa</b>, e o mecanismo é coreografado: as oscilações lentas do córtex marcam o compasso, os fusos abrem a janela, e os ripples do hipocampo despacham o padrão reativado. O <b>replay</b> ocorre comprimido, muito mais rápido que a experiência original. É a razão de o sono profundo se concentrar no começo da noite — e de virar a noite estudando desperdiçar justamente o processo que fixaria o estudo.',
'sono:ciclo':'A noite não é homogênea: são ciclos de cerca de 90 minutos, e a <b>proporção muda</b> ao longo dela. O sono profundo domina os primeiros ciclos; o REM se alonga na madrugada. Isso tem uma consequência prática direta — dormir 4 horas não corta o sono pela metade, corta <b>seletivamente o REM</b>, que estava concentrado no fim. Acordar cedo demais e dormir tarde demais prejudicam funções diferentes.',
'sono:glinfatico':'Durante o sono, o espaço entre as células do cérebro <b>aumenta</b>, e o líquido cefalorraquidiano passa a circular com muito mais eficiência, levando resíduos embora. O transporte depende da aquaporina-4 nos astrócitos. Entre os resíduos removidos está o <b>beta-amiloide</b> — o mesmo que se acumula no Alzheimer. É o vínculo mecânico mais concreto entre sono ruim crônico e risco neurodegenerativo: a limpeza só roda direito com o sistema desligado.',

/* ---------- 07 · Neuroanatomia ---------- */
'neuroanatomia:frontal':'É o lobo que <b>decide</b> e o que <b>executa</b>, nessa ordem. Na borda de trás fica o córtex motor, que emite o comando; à frente dele, o córtex pré-frontal, que escolhe se o comando sai. Essa vizinhança não é acaso: a decisão fica encostada na saída. É também o último lobo a amadurecer, só completando a mielinização perto dos 25 anos — e é o primeiro a ser derrubado por sono ruim, estresse e álcool. Por isso a força de vontade é justamente o que falha nos dias piores.',
'neuroanatomia:parietal':'Ele responde a uma pergunta que parece simples e não é: <b>onde as coisas estão</b>, inclusive você. Junta o tato de todo o corpo com a visão para montar um espaço unificado e a posição dos seus membros dentro dele. Quando ele é lesado de um lado, o paciente pode deixar de reconhecer metade do mundo — e até metade do próprio corpo — sem estar cego nem paralisado. É a prova de que espaço não é dado pelos sentidos, é construído aqui.',
'neuroanatomia:temporal':'É o lobo do <b>significado</b>. Na superfície processa som e transforma ruído em palavra com sentido; no interior, escondidos, ficam o hipocampo e a amígdala. Essa combinação explica muita coisa: o que você ouve, o que você lembra e o que você sente estão sendo processados a centímetros um do outro. É por isso que uma música antiga puxa uma memória inteira com emoção junto, sem esforço nenhum.',
'neuroanatomia:occipital':'Quase todo o lobo serve a <b>um único sentido</b>, o que já diz o quanto a visão custa em processamento. E ele não recebe uma imagem pronta: monta a cena em hierarquia, começando por bordas e orientações e chegando a objetos e rostos em etapas sucessivas. Uma lesão aqui cega — com os olhos perfeitamente funcionais. É a demonstração mais direta de que ver acontece no cérebro, não no olho.',
'neuroanatomia:cerebelo':'Guarda cerca de <b>80% de todos os neurônios do encéfalo</b> num volume pequeno, o que já sugere que ele faz muito mais do que parece. Ele não inicia movimento nenhum: recebe uma cópia do comando enviado e a informação do que de fato aconteceu, compara as duas e corrige a diferença. É um <b>modelo interno do seu corpo</b>, atualizado por erro. É isso que torna o gesto treinado suave — e por isso o álcool, que o afeta, derruba primeiro a coordenação fina.',
'neuroanatomia:tronco':'É a parte que <b>não pode parar</b>: respiração, batimento cardíaco e o ciclo sono-vigília saem daqui, sem nenhuma participação da consciência. E ele acumula uma segunda função silenciosa: os núcleos que fabricam os neuromoduladores do cérebro inteiro ficam nele — locus coeruleus (noradrenalina), rafe (serotonina), área tegmental ventral (dopamina). Um pedaço minúsculo do tronco ajusta o ganho do córtex todo.',

/* ---------- 08 · Sistemas Sensoriais ---------- */
'sensorial:receptores':'Todo sentido começa resolvendo o mesmo problema: o cérebro só entende <b>sinal elétrico</b>, mas o mundo chega como luz, pressão, vibração e moléculas. A transdução é a conversão — e ela já é interpretação, não cópia. Cada receptor responde a uma faixa estreita e ignora o resto: você não enxerga infravermelho nem ouve ultrassom porque não há receptor para isso. O mundo que você percebe é o recorte que os seus receptores conseguem transduzir.',
'sensorial:talamo':'Chamar de "estação de retransmissão" engana, porque sugere passividade. O tálamo <b>filtra</b>: decide o que sobe ao córtex e com que força, e recebe de volta mais fibras do córtex do que envia para ele. Ou seja, o córtex diz ao tálamo o que quer receber — é o substrato físico da atenção. O <b>olfato</b> é a única exceção que fura a fila e chega direto ao córtex e ao sistema límbico, e é justamente o sentido com ligação mais crua e imediata com emoção e memória.',
'sensorial:somatossensorial':'É um <b>mapa do corpo</b> desenhado no córtex, mas com proporções deformadas: mão, lábios e língua ocupam áreas enormes; o tronco e as costas, quase nada. A área não segue o tamanho do corpo e sim a <b>densidade de receptores</b> — é por isso que você identifica um objeto pelo tato com os dedos e não com o cotovelo. E o mapa é plástico: muda com treino, com uso e depois de uma amputação, o que está na origem do fenômeno do membro fantasma.',
'sensorial:auditivo':'A cóclea faz uma coisa notável antes de o som chegar aqui: ela <b>decompõe o som em frequências</b>, porque cada ponto da membrana basilar vibra melhor numa frequência diferente. Essa organização é preservada até o córtex — sons graves e agudos chegam em regiões vizinhas e ordenadas. O cérebro não recebe "o som"; recebe um espectro já separado. É o que permite acompanhar uma voz específica no meio do barulho de um bar.',
'sensorial:visual':'A imagem é construída em <b>etapas hierárquicas</b>: as primeiras células respondem só a bordas com uma inclinação específica, as seguintes combinam bordas em formas, e mais adiante surgem regiões que respondem a objetos e a rostos. Nada disso é a foto que você acha que está vendo. Duas consequências: as ilusões de ótica não são falhas, são o preço de um sistema que aposta em suposições para ser rápido — e a imagem consciente é sempre uma reconstrução, nunca uma captura.',

/* ---------- 09 · Sistema Motor ---------- */
'motor:motor':'Também é um <b>mapa do corpo</b>, com a mesma deformação do lado sensorial: mão e boca ocupam áreas desproporcionais, porque exigem controle fino. Mas o comando não é enviado por um neurônio só — é um <b>código de população</b>: milhares de células votam, cada uma com uma direção preferida, e a média vetorial dos votos define o movimento. Foi essa descoberta que tornou possível ler a intenção motora de um eletrodo e mover um braço robótico com o pensamento.',
'motor:ganglios':'Funcionam como um <b>portão</b>, e a chave é entender que o padrão de repouso é <b>bloquear</b>. Existem duas vias em oposição: uma libera o movimento pretendido, a outra freia todos os concorrentes. A dopamina regula as duas em sentidos opostos — excita a via do siga por receptores D1, inibe a via do não-siga por D2. Sem dopamina (Parkinson), o freio vence e o movimento trava; com sinalização em excesso, escapam movimentos involuntários. E é o mesmo circuito que assume quando um comportamento vira hábito automático.',
'motor:cerebelo':'Ele recebe <b>duas coisas ao mesmo tempo</b>: uma cópia do comando que o córtex acabou de enviar e o retorno sensorial do que o corpo de fato fez. Comparar as duas gera um sinal de erro, e é esse erro que ajusta o próximo movimento. Com repetição, o modelo interno fica tão bom que a correção acontece antes do desvio aparecer — é isso que a gente chama de gesto automatizado. Aprender a andar de bicicleta é literalmente reduzir esse erro até ele sumir.',
'motor:medula':'Não é só um cabo. A medula abriga <b>circuitos completos</b> que resolvem coisas sem consultar o cérebro: o reflexo de retirada tira a mão do fogo antes de a dor chegar à consciência, porque a alça se fecha ali mesmo. Ela também contém geradores de padrão que produzem o ritmo da marcha sozinhos. O cérebro, em boa parte, não comanda cada passo — ele <b>libera e modula</b> um padrão que a medula já sabe gerar.',
'motor:musculo':'É o único ponto de toda a cadeia onde o pensamento vira <b>força física</b>. Um neurônio motor e todas as fibras que ele inerva formam uma unidade motora, e a graduação da força vem de recrutar mais unidades, não de gritar mais alto com as mesmas. A junção neuromuscular usa acetilcolina, e é por isso que ela é um alvo tão explorado: o curare a bloqueia e paralisa; na miastenia gravis, o sistema imune destrói os receptores e a força some conforme o esforço continua.',

/* ---------- 10 · Desenvolvimento ---------- */
'desenvolvimento:tubo':'Tudo começa com uma <b>folha de células que se enrola</b> e se fecha num tubo, por volta da terceira semana de gestação. A ponta da frente vira o cérebro; o resto vira a medula. Se o tubo não fecha direito, aparecem a espinha bífida e a anencefalia — e é exatamente por isso que se recomenda ácido fólico <b>antes</b> da concepção, não depois: quando a gravidez é descoberta, essa etapa muitas vezes já aconteceu.',
'desenvolvimento:neurogenese':'A velocidade é difícil de acreditar: no pico da gestação, o cérebro fetal produz da ordem de <b>centenas de milhares de neurônios por hora</b>. Quase todos os neurônios do córtex que você vai ter pela vida inteira já estão fabricados antes de você nascer. É por isso que a maior parte da mudança depois do nascimento não vem de células novas, e sim de <b>conexão</b>: quem se liga a quem, com que força.',
'desenvolvimento:migracao':'Fabricar o neurônio é só metade — ele precisa <b>chegar ao lugar certo</b>. Cada célula escala uma fibra de glia radial como quem sobe por uma corda, e o córtex se monta <b>de dentro para fora</b>: os neurônios que nascem depois atravessam as camadas já formadas e se instalam por cima. Quando essa migração falha, o córtex se forma sem dobras — a lisencefalia —, o que mostra que até a aparência externa do cérebro depende dessa viagem dar certo.',
'desenvolvimento:sinaptogenese':'O cérebro do bebê faz algo que parece desperdício: conecta <b>muito mais do que vai precisar</b>, chegando ao pico por volta dos 2 aos 3 anos com uma densidade de sinapses bem maior que a do adulto. A lógica não é economia, é <b>aposta</b>: gerar excesso de possibilidades e deixar a experiência decidir quais valem. Você não é construído a partir de um plano detalhado — é construído por excesso, e depois esculpido.',
'desenvolvimento:poda':'Esta é a etapa que responde por que a experiência importa tanto na infância. As conexões pouco usadas são <b>eliminadas</b> pela micróglia; as ativas são reforçadas e isoladas com mielina, que acelera a condução. Vale a regra do <b>use ou perca</b>. O ponto que quase nunca contam: perder conexões é ganho, não perda — é a poda que transforma um sistema genérico num sistema especializado no mundo que você de fato encontrou.',

/* ---------- 11 · Linguagem ---------- */
'linguagem:broca':'A chamada área de Broca é um <b>nó frontal de uma rede maior</b>. Ela participa da seleção, da organização e do planejamento de sequências linguísticas e articulatórias, em interação com regiões motoras, temporais, parietais e subcorticais. A afasia não fluente associada a lesões frontais costuma envolver dano mais amplo do que essa área isolada; por isso ela é uma referência anatômica útil, não um centro único da fala.',
'linguagem:wernicke':'A chamada área de Wernicke é uma <b>referência histórica dentro de redes temporais e parietais distribuídas</b>. Essas redes participam da análise dos sons da fala, do acesso a palavras e da integração de significado com o contexto. Lesões posteriores podem prejudicar compreensão e monitoramento, mas os quadros reais variam conforme a extensão e as conexões atingidas.',
'linguagem:arqueado':'É a demonstração mais elegante de que <b>a conexão é tão importante quanto as regiões</b>. Este feixe liga Wernicke a Broca, ou seja, a compreensão à produção. Quando ele é lesado com as duas áreas intactas, aparece a afasia de condução: a pessoa entende bem e fala fluente, mas <b>não consegue repetir</b> o que acabou de ouvir. Entender e falar estão preservados; o que quebrou foi a estrada entre os dois.',
'linguagem:auditivo':'É a porta de entrada, e ela faz uma triagem antes do significado. O mesmo córtex auditivo recebe todo som, mas os da <b>sua língua</b> seguem um caminho privilegiado, porque a exposição na infância especializou o sistema nos contrastes que importam. É isso que explica o sotaque: um adulto ouve um som estrangeiro pela categoria mais próxima da sua língua, e não como o som que ele de fato é. A dificuldade é de <b>percepção</b> antes de ser de pronúncia.',
'linguagem:motor':'É o fim da linha, e o custo motor é maior do que parece: falar coordena <b>mais de cem músculos</b> de respiração, laringe, língua e lábios, com precisão de milissegundos. A prosódia — a melodia, a ênfase, a emoção da frase — depende bastante do hemisfério <b>direito</b>, o oposto do resto da rede. Por isso existe a perda seletiva: alguém pode manter a gramática perfeita e ainda assim falar em tom monótono e plano, sem conseguir soar irônico ou emocionado.',

/* ---------- 12 · Neurociência Clínica ---------- */
'clinica:degeneracao':'O padrão que se repete é o de <b>proteína mal dobrada que se acumula</b> e mata neurônios devagar — beta-amiloide e tau no Alzheimer, alfa-sinucleína no Parkinson. Duas consequências práticas. Primeiro, os sintomas aparecem <b>anos depois</b> do início do processo, quando a reserva do circuito acaba, e é por isso que o diagnóstico costuma ser tardio. Segundo, o sintoma inicial denuncia a região atingida: hipocampo produz falha de memória recente, substância negra produz rigidez e lentidão.',
'clinica:eletrico':'A crise é uma <b>quebra do equilíbrio</b> entre excitação (glutamato) e inibição (GABA). Num cérebro estável, cada neurônio mantém seu próprio padrão; numa crise, um grupo passa a disparar em sincronia e recruta os vizinhos, como uma torcida que arrasta o estádio. O sintoma denuncia o local: se a descarga começa no córtex motor dá convulsão, se começa no temporal pode dar alteração de consciência ou sensações estranhas. Por isso boa parte dos remédios age reforçando o GABA.',
'clinica:vascular':'O cérebro é 2% do peso do corpo e consome cerca de <b>20% do oxigênio</b> — não tem reserva de energia, então minutos importam. Quando o fluxo é cortado, forma-se um núcleo que morre rápido e, ao redor, a <b>penumbra</b>: tecido vivo mas sem função, que ainda pode ser salvo se a circulação voltar. É essa a janela que dá sentido à pressa. E os déficits são específicos — fala, um lado do corpo, um campo visual — porque cada região tem sua função e sua artéria.',
'clinica:quimico':'É a categoria mais difícil justamente por <b>não haver lesão</b> para apontar. Nos transtornos psiquiátricos, não há um local morto: há circuitos e neuromoduladores desregulados. Isso explica por que o diagnóstico ainda é feito por sintoma e não por exame de imagem, e por que a mesma doença responde de formas tão diferentes entre pessoas. O modelo mais aceito é <b>poligênico e multifatorial</b>: muitos genes de efeito pequeno somados a ambiente, sem uma causa única.',

/* ---------- 13 · Neurofarmacologia ---------- */
'farmacologia:liberacao':'Agir aqui é mexer no <b>volume da mensagem</b>, antes de qualquer receptor. A anfetamina é o exemplo extremo: ela inverte os transportadores e força a dopamina para fora, produzindo uma liberação muito maior do que qualquer sinal fisiológico. Essa intensidade explica tanto o efeito quanto o problema — o sistema se regula para baixo em resposta, e é assim que nascem a tolerância e a queda que vem depois.',
'farmacologia:recaptacao':'Não aumenta a produção — apenas <b>impede a retirada</b>, deixando o neurotransmissor mais tempo agindo na fenda. É o mecanismo dos ISRS com a serotonina e do metilfenidato com dopamina e noradrenalina. E é aqui que mora o argumento mais forte contra a ideia de "desequilíbrio químico": o nível sobe em <b>horas</b>, mas o efeito antidepressivo leva <b>semanas</b>. Esse descompasso mostra que o que cura não é o nível, e sim a plasticidade que ele desencadeia depois.',
'farmacologia:agonista':'A droga <b>ocupa o receptor e o ativa</b>, imitando o neurotransmissor natural. O ponto crítico é que ela não obedece à regulação do corpo: a endorfina é liberada na medida e na hora, o opioide externo chega em dose fixa e ignora o contexto. Existe ainda o <b>agonista parcial</b>, que ativa só em parte — ele ocupa o lugar sem produzir o efeito total, e por isso é usado em tratamento de dependência: alivia a abstinência e ao mesmo tempo bloqueia a droga cheia.',
'farmacologia:antagonista':'A droga <b>ocupa o receptor sem ativá-lo</b> — como uma chave que entra na fechadura e não gira, e ainda impede a chave certa de entrar. A cafeína faz isso com a adenosina: não dá energia nenhuma, apenas impede o cérebro de <b>ler</b> o cansaço, que continua se acumulando por trás. Quando o bloqueio acaba, toda a adenosina represada é lida de uma vez. Os antipsicóticos usam o mesmo princípio nos receptores D2 de dopamina.',

/* ---------- 14 · Métodos ---------- */
'metodos:eeg':'Lê a soma da atividade elétrica de <b>milhões de neurônios</b> através do crânio, o que define exatamente sua força e sua fraqueza. Excelente no tempo — acompanha milissegundos, na escala em que o pensamento acontece. Ruim no espaço, porque o crânio espalha o sinal e a origem fica incerta. Por ser barato, portátil e não invasivo, é insubstituível para sono e epilepsia, onde o <b>quando</b> importa mais que o onde.',
'metodos:fmri':'Não mede atividade neural: mede <b>fluxo de sangue</b>, assumindo que região ativa consome mais oxigênio. Isso é uma inferência indireta, e é a origem de todas as suas limitações. Ótimo no espaço (milímetros), ruim no tempo — a resposta vascular leva segundos, uma eternidade para o cérebro. E mais importante: ver uma região acender <b>não prova que ela causa</b> o comportamento. É correlação, e correlação não distingue causa de efeito.',
'metodos:imagem':'Aqui se vê o que os métodos anteriores só estimam: <b>neurônios individuais acendendo em tempo real</b>, geralmente por imagem de cálcio, já que o cálcio entra quando a célula dispara. A resolução é máxima, dá para acompanhar centenas de células identificadas ao mesmo tempo. O preço é a <b>invasividade</b>: exige acesso direto ao tecido, o que na prática restringe a animais. É o exemplo mais claro do dilema do campo — quanto mais nítido, menos aplicável a humanos.',
'metodos:registro':'Um eletrodo escuta <b>uma única célula</b>, com a precisão máxima no tempo e no espaço. Foi assim que se descobriu que neurônios do córtex visual respondem a bordas com inclinação específica — achado que fundou a ideia de processamento hierárquico. Mas escutar não é o bastante: registro mostra <b>correlação</b>. Para provar causa é preciso <b>manipular</b> — desligar ou ligar a região com TMS, optogenética ou quimiogenética — e ver o comportamento mudar junto.'

};


/* apelido: no da ilustracao -> termo do glossario, quando o rotulo nao casa sozinho */
const ANAT_TERM = {
  'neuronio:mielina':'mielina', 'neuronio:terminais':'SNARE', 'neuronio:soma':'limiar',
  'neuronio:axonio':'dependentes de voltagem', 'neuronio:nucleo':'CREB', 'neuronio:dendritos':'glutamato',
  'plasticidade:pre':'glutamato', 'plasticidade:vesiculas':'SNARE', 'plasticidade:fenda':'recaptação',
  'plasticidade:receptores':'NMDA', 'plasticidade:pos':'LTP', 'plasticidade:hipocampo':'hipocampo',
  'recompensa:vta':'área tegmental ventral', 'recompensa:accumbens':'núcleo accumbens',
  'recompensa:pfc':'córtex pré-frontal', 'recompensa:via':'mesolímbica',
  'atencao:pfc':'executivo central', 'atencao:parietal':'lobo parietal', 'atencao:rede':'competição enviesada',
  'emocao:amigdala':'amígdala', 'emocao:hipotalamo':'hipotálamo', 'emocao:hipofise':'hipófise',
  'emocao:adrenal':'córtex adrenal', 'emocao:cortisol':'cortisol',
  'sono:rem':'REM', 'sono:profundo':'NREM', 'sono:ciclo':'Processo C', 'sono:glinfatico':'sistema glinfático',
  'neuroanatomia:frontal':'lobo frontal', 'neuroanatomia:parietal':'lobo parietal',
  'neuroanatomia:temporal':'lobo temporal', 'neuroanatomia:occipital':'lobo occipital',
  'neuroanatomia:cerebelo':'cerebelo', 'neuroanatomia:tronco':'tronco encefálico',
  'sensorial:receptores':'mecanorreceptores', 'sensorial:talamo':'tálamo',
  'sensorial:somatossensorial':'córtex somatossensorial', 'sensorial:auditivo':'membrana basilar',
  'sensorial:visual':'fotorreceptores',
  'motor:motor':'córtex motor', 'motor:ganglios':'gânglios da base', 'motor:cerebelo':'cerebelo',
  'motor:medula':'neurônio motor superior', 'motor:musculo':'unidade motora',
  'desenvolvimento:tubo':'tubo neural', 'desenvolvimento:neurogenese':'glia radial',
  'desenvolvimento:migracao':'glia radial', 'desenvolvimento:sinaptogenese':'períodos críticos',
  'desenvolvimento:poda':'micróglia',
  'linguagem:broca':'área de Broca', 'linguagem:wernicke':'área de Wernicke',
  'linguagem:arqueado':'fascículo arqueado', 'linguagem:auditivo':'corpo geniculado medial',
  'linguagem:motor':'prosódia',
  'clinica:degeneracao':'beta-amiloide', 'clinica:eletrico':'GABA',
  'clinica:vascular':'penumbra', 'clinica:quimico':'poligênicos',
  'farmacologia:liberacao':'dopamina', 'farmacologia:recaptacao':'recaptação',
  'farmacologia:agonista':'agonista', 'farmacologia:antagonista':'antagonista',
  'metodos:eeg':'EEG', 'metodos:fmri':'fMRI',
  'metodos:imagem':'imagem de cálcio', 'metodos:registro':'registro unitário'
};

/* legendas: prometer mecanismo, nao localizacao */
const ANAT_CAPTION = {
  neuronio:'Toque numa parte para ver o que ela faz — e por que isso importa.',
  plasticidade:'Toque numa estrutura para ver seu papel em fortalecer a memória.',
  recompensa:'Toque numa estrutura para ver seu papel na motivação.',
  atencao:'Toque numa estrutura para ver como ela sustenta o foco.',
  emocao:'Toque num elo para ver o que ele faz na resposta ao estresse.',
  sono:'Toque num elemento para ver o que acontece nele.',
  neuroanatomia:'Toque numa região para ver o que ela faz — e por que isso importa.',
  sensorial:'Toque numa estrutura para ver o que ela faz com o sinal.'
};
try{
  Object.keys(ANAT_CAPTION).forEach(function(k){
    if(typeof ANATOMY !== 'undefined' && ANATOMY[k]) ANATOMY[k].caption = ANAT_CAPTION[k];
  });
}catch(e){}

const BRIDGE = {
  neuronio: [
    `A aula mostrou o neurônio somando entradas e "decidindo" disparar. Mas por que ele consegue disparar? Porque vive carregado, como uma bateria — e é dessa carga que falamos agora.`,
    `A aula disse que o disparo é tudo-ou-nada e que a mielina o acelera. Aqui está a maquinaria: o que abre, e em que ordem, para o sinal correr pelo axônio.`,
    `A aula mostrou o sinal elétrico virando química para atravessar a sinapse. Aqui, o passo a passo dessa travessia — o que dispara a liberação e como o outro lado recebe.`,
    `A aula separou os mensageiros que entregam a mensagem dos que ajustam o "clima" do cérebro. Aqui, quem é quem — e por que essa diferença muda tudo.`
  ],
  plasticidade: [
    `A aula afirmou que a repetição esculpe conexões físicas. Aqui, os dois jeitos de o cérebro mudar: ajustando a força do que já existe e construindo estrutura nova.`,
    `A aula deu a regra de Hebb e disse que a sinapse ganha novos receptores. Aqui, como o neurônio "sabe" que dois sinais coincidiram — e só então decide fortalecer.`,
    `A aula distinguiu ajustar o que existe de construir estrutura permanente. Essa separação foi descoberta num animal simples, uma lesma — e é dela que trata este trecho.`,
    `A aula concluiu que revisar amanhã vale mais que reler dez vezes hoje. Aqui, os dois processos de consolidação que explicam por quê: um de horas, outro de anos.`
  ],
  recompensa: [
    `A aula separou <i>querer</i> de <i>gostar</i>. Aqui, o circuito exato onde isso acontece — e o experimento que mostrou que dá para querer algo sem gostar dele.`,
    `A aula disse que a dopamina responde ao inesperado, não ao prazer em si. Aqui, os registros que mostraram isso neurônio a neurônio.`,
    `A aula recomendou fatiar o progresso em pedaços pequenos e visíveis. Aqui, por que isso funciona — e por que a recompensa imprevisível prende ainda mais.`,
    `A aula mostrou o hábito virando automático. Aqui, o que muda de lugar dentro do cérebro quando isso acontece — e por que o hábito sobrevive mesmo sem prazer.`
  ],
  atencao: [
    `A aula disse que a atenção é um sistema com partes, não uma coisa só. Aqui, a mecânica: tudo compete o tempo todo, e a atenção apenas inclina a balança.`,
    `A aula tratou do espaço mental onde você segura informação enquanto pensa. Aqui, as peças desse espaço — e como os neurônios "seguram" algo que já não está na sua frente.`,
    `A aula terminou dizendo que o foco se esgota porque é caro para o corpo. Aqui, o que o pré-frontal está fazendo enquanto gasta essa energia.`,
    `A aula afirmou que multitarefa é troca rápida, não paralelismo. Aqui, o preço exato de cada troca — e por que ele é maior do que parece.`
  ],
  emocao: [
    `A aula falou do sistema rápido que passa na frente do lento e "sequestra" o controle. Esses dois caminhos foram de fato mapeados — e é deles que trata este trecho.`,
    `A aula apresentou o eixo do estresse e o cortisol. Aqui, a cadeia completa de comando — e o freio que deveria desligá-la, mas falha no estresse crônico.`,
    `A aula mostrou que um pouco de estresse ajuda e muito atrapalha. Aqui, a curva que descreve isso e o que o estresse prolongado faz ao cérebro.`,
    `A aula concluiu que o estado importa tanto quanto o esforço. Aqui, a química que regula esse estado — e por que ela tem um ponto ótimo, nem baixo nem alto demais.`
  ],
  sono: [
    `A aula afirmou que dormir é trabalho ativo, não pausa. Aqui, as três tarefas que o cérebro executa enquanto você dorme.`,
    `A aula mostrou que a noite alterna fases, e que cortar horas corta justamente o que consolida. Aqui, o que acontece dentro de cada fase.`,
    `A aula descreveu a faxina noturna do cérebro. Aqui, o "encanamento" que a torna possível — e como o sono o abre.`,
    `A aula falou do relógio interno e da pressão de sono que se acumula. Aqui, os dois processos que, somados, decidem a sua hora de dormir.`
  ],
  neuroanatomia: [
    `A aula separou a casca que processa (cinzenta) da fiação que conecta (branca). Aqui, os números dessa arquitetura — e o que acontece quando a fiação adoece.`,
    `A aula deu a vocação de cada lobo. Aqui, um ajuste importante: as funções são redes que cruzam lobos — e é por isso que um AVC produz perdas tão específicas.`,
    `A aula apresentou tálamo, hipotálamo e gânglios da base. Aqui, o que cada um faz de fato — inclusive o único sentido que fura a fila do tálamo.`,
    `A aula disse que o tronco é pequeno e insubstituível, e que o cerebelo afina o gesto. Aqui, a ligação com o Módulo 01: é no tronco que nascem os neuromoduladores.`
  ],
  sensorial: [
    `A aula mostrou que todo sentido começa traduzindo energia física em sinal elétrico. Aqui, quem faz essa tradução em cada sentido — e por que você deixa de sentir o que não muda.`,
    `A aula disse que a visão é construída, não copiada. Aqui, os números da retina e as duas rotas em que o cérebro divide a imagem: o "o quê" e o "onde".`,
    `A aula explicou a tonotopia: agudos na entrada da cóclea, graves no fundo. Aqui, o que dá essa propriedade a ela — e por que perder essas células é irreversível.`,
    `A aula afirmou que a dor é construída pelo cérebro, e não lida direto do corpo. Aqui, os mecanismos que permitem a ele aumentá-la ou reduzi-la.`
  ],
  motor: [
    `A aula descreveu a cadeia da intenção ao músculo, terminando na via final comum. Aqui, os dois elos dessa cadeia — e como o médico descobre qual deles quebrou.`,
    `A aula localizou o comando no córtex motor. Aqui, uma surpresa: a direção do movimento não está em nenhum neurônio isolado.`,
    `A aula disse que essas duas estruturas não iniciam o movimento — elas o afinam. Aqui, como cada uma faz isso, e o que exatamente se desregula no Parkinson.`,
    `A aula chegou ao músculo pela junção neuromuscular. Aqui, o que acontece quando é justamente esse ponto que falha — por uma doença ou por um veneno.`
  ],
  desenvolvimento: [
    `A aula apresentou a sequência: proliferar, migrar, conectar e podar. Aqui, o começo de tudo — e por que se recomenda ácido fólico logo no início da gravidez.`,
    `A aula disse que o córtex se monta de dentro para fora e que falhas de migração causam problemas. Aqui, como o neurônio faz essa escalada — e o que acontece quando ela falha em massa.`,
    `A aula mostrou o cérebro sendo esculpido por corte: "use ou perca". Aqui, quem faz esse corte — e por que o freio pré-frontal chega atrasado na adolescência.`,
    `A aula falou das janelas em que a experiência molda um circuito. Aqui, o experimento que provou isso e os "freios" que fecham a janela.`
  ],
  linguagem: [
    `A aula avisou que Broca e Wernicke são uma simplificação útil. Aqui, o quadro mais atual — e por que as lesões que causam afasia costumam ser bem maiores que a área que leva o nome.`,
    `A aula montou o caminho de ouvir → entender → falar. Aqui, os pacientes que revelaram esse caminho — e o que acontece quando só o cabo entre os dois é cortado.`,
    `A aula contrastou a afasia de Broca com a de Wernicke. Aqui, por que esse contraste é uma ferramenta científica, e não apenas um quadro clínico.`,
    `A aula disse que ler reaproveita áreas visuais e que a língua de sinais usa as mesmas regiões da fala. Aqui, as evidências por trás dessas duas afirmações.`
  ],
  clinica: [
    `A aula organizou as doenças em quatro modos de falha. Aqui, o que cada modo exige de tratamento — e por que a doença foi, historicamente, o mapa do cérebro.`,
    `A aula disse que nessas doenças proteínas se acumulam e neurônios morrem aos poucos. Aqui, quais são essas proteínas — e o que já se consegue fazer contra elas.`,
    `A aula mostrou a tempestade elétrica da epilepsia e a corrida contra o tempo do AVC. Aqui, o detalhe que explica a pressa: o tecido que ainda dá para salvar.`,
    `A aula afirmou que esses transtornos são condições reais do cérebro, e tratáveis. Aqui, o que se sabe da biologia — e por que não existe "a lesão da depressão".`
  ],
  farmacologia: [
    `A aula reduziu a farmacologia a quatro truques na sinapse. Aqui, um quinto caso, intermediário — e o porteiro que a droga precisa atravessar antes de agir.`,
    `A aula dividiu as drogas entre as que aceleram e as que freiam. Aqui, o mecanismo exato de cada uma — e por que misturar depressores é perigoso.`,
    `A aula destacou o enigma: a serotonina sobe em horas, mas a melhora leva semanas. Aqui, o que essa demora revela sobre o que de fato cura.`,
    `A aula disse que largar é difícil porque o cérebro se remodelou. Aqui, o que exatamente ele remodela — e por que o vício é tratado como doença crônica.`
  ],
  metodos: [
    `A aula separou correlação de causa. Aqui, por que a fMRI, sozinha, não prova causa — e os três eixos em que todo método é obrigado a escolher.`,
    `A aula disse que cada ferramenta ganha num eixo e perde em outro. Aqui, a comparação direta — e como escolher pela pergunta que você quer responder.`,
    `A aula mostrou que só manipular o cérebro prova causa. Aqui, as ferramentas que fazem isso, da mais antiga (a lesão) à que revolucionou o campo.`,
    `A aula defendeu a evidência convergente. Aqui, para onde o campo está indo — e o que ainda está em aberto.`
  ]
};

function deepBridge(mid, idx){
  const b = BRIDGE[mid] && BRIDGE[mid][idx];
  return b ? '<div class="deep-bridge"><span class="db-k">Retomando a aula</span>'+b+'</div>' : '';
}

const GLOSSARY = {
  // --- célula e sinal ---
  'limiar':'O nível de carga que o neurônio precisa atingir para disparar. Abaixo dele não acontece nada; ao cruzá-lo, o disparo sai sempre igual.',
  'bomba de sódio-potássio':'Uma proteína que empurra sódio para fora e potássio para dentro do neurônio, mantendo-o "carregado" e pronto para disparar. Gasta muita energia.',
  'Na⁺':'Sódio. Um íon (partícula com carga elétrica) que entra no neurônio e o deixa mais positivo — é o que dispara o sinal.',
  'K⁺':'Potássio. Um íon que sai do neurônio e o traz de volta ao repouso depois do disparo.',
  'Ca²⁺':'Cálcio. Um íon que entra no terminal do neurônio e é o gatilho para liberar o neurotransmissor.',
  'dependentes de voltagem':'Portas na membrana que abrem quando a carga elétrica muda. É isso que faz o disparo se propagar sozinho pelo axônio.',
  'hiperpolarizam':'Ficam ainda mais negativos por dentro — ou seja, mais longe de disparar. É o oposto de excitar.',
  'ionotrópicos':'Receptores que são eles mesmos uma porta: abrem na hora que o neurotransmissor chega. Efeito rápido e curto.',
  'metabotrópicos':'Receptores que não abrem porta nenhuma: disparam uma reação química dentro da célula. Efeito mais lento, porém mais duradouro.',
  'SNARE':'O conjunto de proteínas que cola a bolsinha de neurotransmissor na membrana e a abre, despejando o conteúdo na sinapse.',
  'neuromoduladores':'Substâncias como dopamina, serotonina e noradrenalina. Não carregam a mensagem em si: ajustam o "tom" de circuitos inteiros — mais alerta, mais motivado, mais calmo.',
  'células gliais':'As células de apoio do sistema nervoso. Alimentam, isolam e limpam os neurônios — e são tão numerosas quanto eles.',
  'mielina':'A capa de gordura que envolve o axônio. Funciona como o plástico de um fio elétrico e faz o sinal viajar muito mais rápido.',
  'glutamato':'O principal neurotransmissor excitatório: acelera o neurônio seguinte, aproximando-o do disparo.',
  'GABA':'O principal neurotransmissor inibitório: é o "freio" do cérebro, afastando o neurônio seguinte do disparo.',
  'noradrenalina':'Um neuromodulador ligado ao alerta e à vigilância. É o que deixa o cérebro "ligado" diante de algo importante.',

  // --- plasticidade e memória ---
  'LTP':'Potenciação de longo prazo: o fortalecimento duradouro de uma sinapse muito usada. É a base física de aprender.',
  'LTD':'O contrário da LTP: o enfraquecimento duradouro de uma sinapse pouco usada. Também é aprendizado — o cérebro descartando o que não serve.',
  'NMDA':'Um receptor de glutamato que só funciona quando dois sinais coincidem. É o "detector de coincidência" que autoriza o aprendizado.',
  'AMPA':'Um receptor de glutamato responsável pela transmissão rápida do dia a dia. Aprender é, em parte, instalar mais deles na sinapse.',
  'CaMKII':'Uma proteína dentro do neurônio que, ativada pelo cálcio, mantém a sinapse fortalecida mesmo depois que o estímulo passou.',
  'PKA':'Uma proteína que carrega o recado da sinapse até o núcleo da célula, quando a mudança precisa ser duradoura.',
  'CREB':'Uma proteína que liga genes no núcleo do neurônio. É o passo que transforma um aprendizado passageiro em memória de longo prazo.',
  'reconsolidação':'Ao lembrar de algo, a memória volta a ficar maleável e precisa ser regravada — e pode mudar um pouco nesse processo. Lembrar não é ler um arquivo: é reescrevê-lo.',
  'replay':'Durante o sono, o hipocampo "reproduz" em alta velocidade as sequências vividas de dia. É assim que a memória é consolidada.',
  'ripples':'As ondas elétricas rápidas do hipocampo durante as quais esse replay acontece.',

  // --- recompensa ---
  'erro de previsão':'A diferença entre o que você esperava e o que aconteceu. É esse sinal — e não o prazer em si — que a dopamina parece transmitir.',
  'mesolímbica':'A via de dopamina que sobe do meio do cérebro até o estriado ventral. É o circuito central da motivação.',
  'estriado ventral':'Região profunda ligada ao "querer" e à motivação — o alvo principal da via da dopamina.',
  'estriado dorsal':'Região profunda ligada ao hábito e à rotina automatizada. Quando algo vira hábito, o controle migra para cá.',
  'saliência de incentivo':'O "querer" que a dopamina cola numa pista, tornando-a magnética. É diferente de "gostar" — dá para querer muito algo de que já nem se gosta tanto.',

  // --- atenção ---
  'top-down':'Atenção guiada pelo seu objetivo, de cima para baixo — você decide onde olhar.',
  'bottom-up':'Atenção capturada pelo estímulo, de baixo para cima — algo pisca e rouba seu foco, você não escolheu.',
  'executivo central':'No modelo de memória de trabalho, é o "chefe": decide para onde a atenção vai e o que fica ativo na cabeça.',
  'disparo persistente':'Neurônios que continuam disparando sozinhos para manter uma informação ativa enquanto você a usa. É como a memória de trabalho "segura" algo.',
  'pré-frontal dorsolateral':'A parte do córtex frontal que mantém o objetivo em mente e manipula informação — o núcleo do controle executivo.',
  'competição enviesada':'A ideia de que tudo compete pelo processamento ao mesmo tempo, e a atenção apenas pesa a balança a favor de uma coisa.',
  'custo de reconfiguração':'O tempo e o erro que você paga toda vez que o cérebro troca de tarefa — porque ele precisa recarregar as regras da nova.',

  // --- emoção e estresse ---
  'cortisol':'O principal hormônio do estresse, liberado pelas glândulas adrenais. Útil numa emergência; corrosivo quando fica alto o tempo todo.',
  'hipófise':'Glândula na base do cérebro que recebe a ordem do hipotálamo e comanda as demais glândulas do corpo.',
  'córtex adrenal':'A parte externa das glândulas que ficam sobre os rins. É ela que fabrica e libera o cortisol.',
  'retroalimentação negativa':'Um freio automático: o próprio cortisol avisa o cérebro para desligar a resposta ao estresse. No estresse crônico, esse freio falha.',
  'U invertido':'A curva do estresse: um pouco melhora o desempenho, muito piora. Desenhada, ela parece um U de cabeça para baixo.',
  'via rápida':'O atalho até a amígdala, que reage antes de o córtex entender o que está acontecendo. É por isso que você pula antes de perceber que era só uma mangueira.',
  'via lenta':'O caminho mais longo, passando pelo córtex, que avalia a situação com calma e pode desligar o alarme.',

  // --- sono ---
  'NREM':'A fase do sono sem movimento rápido dos olhos, que inclui o sono profundo de ondas lentas. É a fase mais ligada à consolidação de fatos.',
  'REM':'A fase do sono com movimento rápido dos olhos: o cérebro fica muito ativo e é quando ocorrem os sonhos mais vívidos.',
  'fusos':'Rajadas curtas de atividade elétrica no sono profundo, associadas à fixação de novas memórias.',
  'oscilações lentas':'As grandes ondas elétricas lentas do sono profundo, que coordenam o diálogo entre hipocampo e córtex.',
  'Processo S':'A pressão do sono: quanto mais tempo acordado, mais ela se acumula — e mais forte fica a vontade de dormir.',
  'Processo C':'O relógio interno de cerca de 24 horas, que define a que horas você tende a ter sono, independentemente do cansaço.',
  'adenosina':'Substância que se acumula no cérebro enquanto você está acordado e produz a sensação de sono. A cafeína age bloqueando seus receptores.',
  'núcleo supraquiasmático':'O relógio-mestre do cérebro, alojado no hipotálamo e acertado todo dia pela luz que entra pelos olhos.',
  'sistema glinfático':'O sistema de "faxina" do cérebro, que empurra líquido pelo tecido e leva embora resíduos. Fica bem mais ativo durante o sono.',
  'aquaporina-4':'Um canal de água nas células de apoio do cérebro; é ele que viabiliza essa faxina.',
  'homeostase sináptica':'A ideia de que as sinapses "engordam" ao longo do dia e o sono baixa o volume geral delas, preservando o que importa.',

  // --- neuroanatomia e desenvolvimento ---
  'glia radial':'Fibras que atravessam o cérebro em formação e servem de andaime: o neurônio recém-nascido escala por elas até seu lugar.',
  'lisencefalia':'Um cérebro liso, sem os sulcos normais, resultado de falha na migração dos neurônios. Causa epilepsia grave e atraso.',
  'micróglia':'A célula de defesa do cérebro. Além de proteger, ela literalmente "come" as sinapses fracas durante a poda.',
  'tubo neural':'A estrutura em forma de tubo que se forma no início da gestação e dá origem ao cérebro e à medula.',
  'ácido fólico':'Uma vitamina do complexo B. Sua falta no início da gravidez aumenta o risco de falhas no fechamento do tubo neural.',
  'períodos críticos':'Janelas do desenvolvimento em que a experiência molda um circuito com uma força que não se repete depois.',
  'redes perineuronais':'Malhas que se formam em volta dos neurônios e funcionam como freios: ajudam a fechar os períodos críticos.',

  // --- sensorial ---
  'fotorreceptores':'Os receptores da retina que transformam luz em sinal elétrico: os bastonetes (escuro, sem cor) e os cones (cor e detalhe).',
  'mecanorreceptores':'Receptores que respondem a força física — pressão, vibração, som.',
  'quimiorreceptores':'Receptores que respondem a moléculas — é como funcionam o cheiro e o gosto.',
  'termorreceptores':'Receptores que respondem à temperatura.',
  'nociceptores':'Receptores que sinalizam dano ao corpo. Atenção: eles enviam o alerta, mas quem constrói a dor é o cérebro.',
  'quiasma óptico':'O ponto onde parte das fibras que saem dos olhos cruza para o outro lado do cérebro.',
  'membrana basilar':'A "fita" dentro da cóclea que vibra em pontos diferentes conforme a frequência do som: rígida na entrada (agudos), flácida no fundo (graves).',
  'células ciliadas externas':'Células da cóclea que funcionam como um amplificador, afinando a sensibilidade da audição.',
  'corpo geniculado medial':'A estação do tálamo por onde o som passa antes de chegar ao córtex auditivo.',
  'teoria da comporta':'A ideia de que sinais de tato podem "fechar a comporta" da dor. É por isso que esfregar um machucado alivia.',
  'modulação descendente':'Sinais que o cérebro manda para baixo e reduzem a dor — inclusive liberando endorfinas. É a base do efeito placebo.',

  // --- motor ---
  'neurônio motor superior':'O que vai do córtex até a medula. Lesá-lo deixa o músculo rígido e com reflexos exagerados.',
  'código de população':'A direção de um movimento não está num neurônio só: ela emerge da soma da atividade de muitos. É esse princípio que move próteses controladas pelo pensamento.',
  'interfaces cérebro-máquina':'Sistemas que leem a atividade dos neurônios e a transformam em comando para uma prótese, um cursor ou um robô.',
  'unidade motora':'Um neurônio motor mais todas as fibras musculares que ele comanda. Poucas fibras = controle fino; muitas = força.',
  'miastenia gravis':'Doença em que o sistema imune ataca os receptores da junção neuromuscular. O comando chega, mas o músculo não responde: dá fraqueza.',
  'curare':'Veneno que bloqueia esses mesmos receptores do músculo, causando paralisia.',
  'geradores de padrão':'Circuitos na própria medula capazes de produzir o ritmo da caminhada quase sem participação do cérebro.',
  'estimulação cerebral profunda':'Um eletrodo implantado que ajusta a atividade de circuitos profundos. Usado em casos avançados de Parkinson.',

  // --- linguagem ---
  'fascículo arqueado':'O feixe de fibras que conecta a área da compreensão (Wernicke) à da produção da fala (Broca).',
  'afasia de condução':'O que acontece quando só esse feixe é lesado: a pessoa entende e fala com fluência, mas não consegue repetir o que ouviu.',
  'afasia global':'Perda ampla de linguagem: tanto a produção quanto a compreensão ficam comprometidas.',
  'prosódia':'A "melodia" da fala — entonação, ritmo e emoção. Depende mais do hemisfério direito.',
  'reciclagem neuronal':'A ideia de que a leitura, invenção recente demais para ter circuito próprio, reaproveita áreas visuais que já existiam.',

  // --- clínica ---
  'beta-amiloide':'Uma proteína que se acumula entre os neurônios formando placas. É uma das marcas do Alzheimer.',
  'tau':'Uma proteína que, alterada, se acumula dentro do neurônio formando emaranhados. É a outra marca do Alzheimer.',
  'alfa-sinucleína':'Proteína que se acumula dentro dos neurônios no Parkinson, formando os chamados corpos de Lewy.',
  'levodopa':'Remédio que o cérebro converte em dopamina, repondo o que falta no Parkinson e aliviando os sintomas.',
  'penumbra':'O tecido ainda vivo em volta da área já morta de um AVC. É ele que se corre para salvar — daí "tempo é cérebro".',
  'poligênicos':'Que dependem de muitos genes, cada um com um efeito pequeno, somados ao ambiente. Não existe "o gene da depressão".',
  'monoaminas':'O grupo de neurotransmissores que inclui serotonina, dopamina e noradrenalina — os principais alvos dos remédios psiquiátricos.',

  // --- farmacologia ---
  'barreira hematoencefálica':'Um filtro entre o sangue e o cérebro. Se a molécula não passa por ele, não adianta: a droga não age.',
  'agonistas parciais':'Drogas que ativam o receptor só em parte. Servem para estabilizar um sistema — nem desligado, nem a todo vapor.',
  'benzodiazepínicos':'Remédios calmantes que potencializam o GABA, o freio do cérebro. Sedam, mas geram tolerância e dependência.',
  'D2':'Um dos tipos de receptor de dopamina. É ele que os antipsicóticos clássicos bloqueiam.',
  'BDNF':'Uma proteína que ajuda neurônios a crescer e a formar conexões novas. Parece ser parte do efeito lento dos antidepressivos.',
  'cetamina':'Substância que age no glutamato e alivia a depressão em horas — e não em semanas. Abriu um caminho novo além das monoaminas.',

  // --- métodos ---
  'EEG':'Eletrodos no couro cabeludo que leem a atividade elétrica. Enxergam o "quando" com precisão de milissegundos, mas o "onde" mal.',
  'fMRI':'Aparelho que mapeia o fluxo de sangue como pista de atividade. Enxerga bem o "onde" (milímetros), mas é lento (segundos).',
  'MEG':'Parecido com o EEG, porém lê o campo magnético em vez do elétrico. Rápido, e localiza um pouco melhor.',
  'registro unitário':'Um eletrodo fino que escuta um único neurônio. É o método mais preciso — e o mais invasivo, pois entra no tecido.',
  'imagem de cálcio':'Técnica que faz os neurônios brilharem quando ativos, permitindo filmar centenas deles ao mesmo tempo. Usada sobretudo em animais.',
  'optogenética':'Colocar nos neurônios uma proteína sensível à luz para ligá-los e desligá-los com um feixe, em milissegundos. Foi o que permitiu provar causa, não só correlação.',
  'quimiogenética':'O mesmo princípio da optogenética, mas o "interruptor" é uma substância em vez de luz. Mais lento, porém mais simples.',
  'TMS':'Um pulso magnético aplicado de fora da cabeça que perturba temporariamente uma área do córtex. Uma "lesão virtual" reversível, sem cirurgia.',
  'conectômica':'O esforço de mapear todas as conexões do cérebro — o diagrama completo da fiação.',
  'invasividade':'O quanto o método precisa entrar no corpo. É o preço escondido da precisão: os métodos mais exatos são os mais invasivos.'
};

/* =====================================================================
   NEUROLAB — BUSCA SEMÂNTICA, VOCABULÁRIO DE ANATOMIA E GRAFO DE TERMOS
   ===================================================================== */

/* ---------- 1. vocabulário de anatomia (faltava no glossário) ---------- */
Object.assign(GLOSSARY, {
  'tálamo':'A central de retransmissão do cérebro: quase toda informação sensorial passa por ele antes de chegar ao córtex. Não é um relé passivo — filtra o que merece subir e participa do nível de consciência. O olfato é a única exceção que fura a fila.',
  'hipotálamo':'Uma estrutura pequena logo abaixo do tálamo que regula o corpo por dentro: fome, sede, temperatura, sono e o disparo do eixo hormonal do estresse. É a ponte entre o cérebro e os hormônios.',
  'gânglios da base':'Um conjunto de núcleos profundos (estriado, globo pálido, substância negra) que funciona como um portão: decide qual movimento ou rotina passa e qual fica barrado. É onde o hábito automatizado mora.',
  'hipocampo':'Estrutura do lobo temporal medial que ajuda a ligar elementos de novas memórias declarativas e a recuperá-los como episódios. Com o tempo, hipocampo e redes corticais reorganizam sua participação; não ocorre uma simples mudança de arquivo de um lugar para outro.',
  'amígdala':'Um núcleo em forma de amêndoa no lobo temporal que detecta ameaça e dá cor emocional à experiência. Dispara antes de você entender o que viu — daí o susto vir antes da explicação.',
  'sistema límbico':'A rede que une hipocampo, amígdala e vizinhos, ligando emoção e memória. É por isso que o que emociona se lembra melhor: as duas funções são processadas lado a lado.',
  'substância negra':'Um núcleo do mesencéfalo que fabrica dopamina para os gânglios da base. Sua degeneração é o que causa a doença de Parkinson — sem dopamina, o portão do movimento trava.',
  'estriado':'A porta de entrada dos gânglios da base. A parte ventral responde a recompensa e motivação; a dorsal assume quando o comportamento vira hábito automático.',
  'córtex':'A casca externa do cérebro, de 2 a 4 mm de espessura e seis camadas. É onde acontece o processamento mais elaborado — e as dobras existem para caber mais área no crânio.',
  'substância cinzenta':'O tecido feito de corpos celulares de neurônios, onde o processamento acontece de fato. Forma a casca do córtex e os núcleos profundos.',
  'substância branca':'Os feixes de axônios cobertos de mielina que ligam regiões distantes. A cor vem da mielina. É a fiação, não o processador — por isso doenças que a atacam degradam a conexão, não o pensamento em si.',
  'corpo caloso':'A grande ponte de fibras que liga os dois hemisférios e permite que eles troquem informação. Cortá-lo separa os dois lados em experiências quase independentes.',
  'lobo frontal':'A parte da frente do cérebro, responsável por planejamento, decisão, autocontrole e movimento. Abriga o córtex pré-frontal — a estrutura que "escorrega" quando o estado está ruim.',
  'lobo parietal':'A região no alto e atrás do frontal que integra o tato e constrói a noção de espaço e do próprio corpo.',
  'lobo temporal':'A região nas laterais, sobre as orelhas, que processa som e linguagem e abriga hipocampo e amígdala no seu interior.',
  'lobo occipital':'A região bem atrás, quase inteiramente dedicada à visão. Uma lesão ali pode cegar sem tocar nos olhos.',
  'cerebelo':'O "pequeno cérebro" atrás do tronco, que concentra cerca de 80% dos neurônios do encéfalo. Não inicia o movimento — afina timing, coordenação e equilíbrio, e aprende modelos internos do corpo.',
  'tronco encefálico':'A haste que liga o cérebro à medula (mesencéfalo, ponte e bulbo). Controla respiração, batimento e o ciclo sono-vigília, e abriga os núcleos que fabricam os neuromoduladores.',
  'córtex pré-frontal':'A parte mais frontal do córtex, sede do controle deliberado: planejar, inibir impulso, sustentar foco. É a estrutura mais sensível ao estado — estresse e sono ruim a desligam primeiro.',
  'locus coeruleus':'Um núcleo minúsculo do tronco encefálico que é praticamente a única fonte de noradrenalina para todo o córtex. Ajusta o ganho do sistema inteiro conforme o seu estado de alerta.',
  'núcleos da rafe':'Os núcleos do tronco encefálico que fabricam a serotonina distribuída para o cérebro todo. Participam de humor, sono e regulação do apetite.',
  'área tegmental ventral':'O núcleo do mesencéfalo que fabrica a dopamina da via mesolímbica — a que sinaliza erro de previsão de recompensa e sustenta motivação.',
  'núcleo accumbens':'O centro do estriado ventral, onde a dopamina da recompensa chega. É o ponto onde motivação vira ação, e onde as drogas de abuso convergem.',
  'córtex motor':'A faixa na borda de trás do lobo frontal que emite o comando do movimento voluntário. Está organizada como um mapa do corpo — o homúnculo.',
  'córtex somatossensorial':'A faixa logo atrás do córtex motor, no parietal, que recebe o tato do corpo inteiro. Também é um mapa, com áreas proporcionais à sensibilidade, não ao tamanho.',
  'área de Broca':'Referência anatômica no giro frontal inferior esquerdo. Participa de uma rede ampla envolvida na seleção, organização e preparação de sequências linguísticas e articulatórias; não funciona como um centro isolado da fala.',
  'área de Wernicke':'Referência histórica em regiões temporais posteriores. Integra redes distribuídas envolvidas na análise da fala e na construção de significado; não é um centro isolado da compreensão.',
  'mesencéfalo':'A parte alta do tronco encefálico. Abriga a substância negra e a área tegmental ventral — as duas grandes fontes de dopamina do cérebro.',
  'dopamina':'Um neuromodulador que não sinaliza prazer, e sim erro de previsão: dispara quando a realidade supera a expectativa. O que ela faz depende do circuito — motivação no estriado ventral, hábito no dorsal, movimento nos gânglios da base.',
  'serotonina':'Um neuromodulador fabricado nos núcleos da rafe que participa de humor, sono, apetite e saciedade. É o alvo dos ISRS, mas o efeito clínico deles depende de plasticidade, não do nível em si.',
  'acetilcolina':'Um neurotransmissor com dois papéis: no corpo, comanda a contração muscular na junção neuromuscular; no cérebro, participa de atenção e de codificação de memória.',
  'endorfinas':'Opioides fabricados pelo próprio corpo. Fecham a comporta da dor pela modulação descendente e ativam a via de recompensa — é o mesmo receptor que os opioides de farmácia ocupam.',
  'recaptação':'A reabsorção do neurotransmissor pelo neurônio que o liberou, encerrando o sinal. Bloquear a recaptação deixa a substância mais tempo na sinapse — é como agem os ISRS e o metilfenidato.',
  'antagonista':'Uma droga que ocupa o receptor e o bloqueia, impedindo o neurotransmissor de agir. A cafeína é antagonista da adenosina; os antipsicóticos, da dopamina em D2.',
  'agonista':'Uma droga que imita ou ativa o neurotransmissor no receptor, reforçando o sinal. Os opioides são agonistas dos receptores de endorfina.',
  'bulbo':'A parte baixa do tronco encefálico, imediatamente acima da medula. Controla respiração e batimento cardíaco — dano ali é fatal de imediato.'
});

Object.assign(TERM_FIG, {
  'dopamina':'mod:recompensa',
  'serotonina':'mod:clinica',
  'acetilcolina':'juncao-neuromuscular',
  'endorfinas':'mod:sensorial',
  'recaptação':'mod:farmacologia',
  'antagonista':'mod:farmacologia',
  'agonista':'mod:farmacologia',
  'tálamo':'estruturas-profundas',
  'hipotálamo':'estruturas-profundas',
  'hipocampo':'estruturas-profundas',
  'amígdala':'estruturas-profundas',
  'sistema límbico':'estruturas-profundas',
  'gânglios da base':'ganglios-base',
  'substância negra':'ganglios-base',
  'estriado':'ganglios-base',
  'córtex':'mod:neuroanatomia',
  'substância cinzenta':'mod:neuroanatomia',
  'substância branca':'mod:neuroanatomia',
  'corpo caloso':'mod:neuroanatomia',
  'lobo frontal':'mod:neuroanatomia',
  'lobo parietal':'mod:neuroanatomia',
  'lobo temporal':'mod:neuroanatomia',
  'lobo occipital':'mod:neuroanatomia',
  'cerebelo':'mod:neuroanatomia',
  'tronco encefálico':'mod:neuroanatomia',
  'mesencéfalo':'mod:neuroanatomia',
  'bulbo':'mod:neuroanatomia',
  'córtex pré-frontal':'mod:atencao',
  'locus coeruleus':'mod:emocao',
  'núcleos da rafe':'mod:clinica',
  'área tegmental ventral':'mod:recompensa',
  'núcleo accumbens':'mod:recompensa',
  'córtex motor':'homunculo',
  'córtex somatossensorial':'homunculo',
  'área de Broca':'mod:linguagem',
  'área de Wernicke':'mod:linguagem'
});

/* ---------- 2. grafo: quais termos se puxam ---------- */
const TERM_REL = {
  'tálamo':['córtex','fotorreceptores','corpo geniculado medial','hipotálamo','sistema límbico'],
  'hipotálamo':['cortisol','hipófise','núcleo supraquiasmático','tálamo','Processo C'],
  'gânglios da base':['estriado','substância negra','estriado dorsal','D2','estimulação cerebral profunda','levodopa'],
  'hipocampo':['replay','ripples','LTP','NREM','amígdala','CREB'],
  'amígdala':['cortisol','via rápida','via lenta','hipocampo','sistema límbico','GABA'],
  'sistema límbico':['amígdala','hipocampo','hipotálamo'],
  'substância negra':['levodopa','alfa-sinucleína','gânglios da base','estimulação cerebral profunda'],
  'estriado':['estriado ventral','estriado dorsal','gânglios da base','saliência de incentivo'],
  'córtex pré-frontal':['executivo central','disparo persistente','pré-frontal dorsolateral','top-down','custo de reconfiguração','cortisol'],
  'locus coeruleus':['noradrenalina','U invertido','top-down','córtex pré-frontal'],
  'noradrenalina':['locus coeruleus','U invertido','cortisol','monoaminas'],
  'cortisol':['hipófise','córtex adrenal','retroalimentação negativa','amígdala','córtex pré-frontal','U invertido'],
  'U invertido':['cortisol','noradrenalina','locus coeruleus','executivo central'],
  'dopamina':['erro de previsão','mesolímbica','estriado ventral','estriado dorsal','saliência de incentivo'],
  'erro de previsão':['mesolímbica','estriado ventral','saliência de incentivo','área tegmental ventral'],
  'estriado dorsal':['gânglios da base','saliência de incentivo','estriado ventral'],
  'estriado ventral':['núcleo accumbens','mesolímbica','erro de previsão'],
  'LTP':['NMDA','AMPA','CaMKII','Ca²⁺','CREB','LTD','hipocampo'],
  'LTD':['LTP','NMDA','homeostase sináptica'],
  'NMDA':['Ca²⁺','AMPA','LTP','cetamina'],
  'CREB':['PKA','LTP','BDNF'],
  'BDNF':['LTP','CREB','períodos críticos'],
  'replay':['ripples','NREM','hipocampo','fusos'],
  'NREM':['REM','fusos','oscilações lentas','replay','sistema glinfático'],
  'REM':['NREM','oscilações lentas','Processo S'],
  'sistema glinfático':['aquaporina-4','NREM','beta-amiloide'],
  'adenosina':['Processo S','Processo C','núcleo supraquiasmático'],
  'Processo S':['adenosina','Processo C','NREM'],
  'Processo C':['núcleo supraquiasmático','Processo S','hipotálamo'],
  'GABA':['glutamato','benzodiazepínicos','ionotrópicos'],
  'glutamato':['GABA','NMDA','AMPA','ionotrópicos'],
  'executivo central':['top-down','bottom-up','disparo persistente','competição enviesada','custo de reconfiguração'],
  'top-down':['bottom-up','executivo central','competição enviesada','córtex pré-frontal'],
  'bottom-up':['top-down','competição enviesada','amígdala'],
  'beta-amiloide':['tau','sistema glinfático','hipocampo'],
  'tau':['beta-amiloide','alfa-sinucleína'],
  'alfa-sinucleína':['substância negra','levodopa','tau'],
  'levodopa':['substância negra','gânglios da base','D2'],
  'D2':['gânglios da base','estriado','levodopa'],
  'monoaminas':['noradrenalina','núcleos da rafe','cetamina'],
  'cetamina':['NMDA','monoaminas','BDNF'],
  'benzodiazepínicos':['GABA','agonistas parciais'],
  'barreira hematoencefálica':['levodopa','células gliais'],
  'mielina':['substância branca','células gliais'],
  'células gliais':['micróglia','glia radial','mielina','sistema glinfático'],
  'períodos críticos':['redes perineuronais','glia radial','BDNF'],
  'redes perineuronais':['períodos críticos'],
  'glia radial':['tubo neural','micróglia','períodos críticos'],
  'micróglia':['células gliais','glia radial'],
  'tubo neural':['ácido fólico','glia radial'],
  'fascículo arqueado':['área de Broca','área de Wernicke','afasia de condução'],
  'área de Broca':['área de Wernicke','fascículo arqueado','afasia global','prosódia'],
  'área de Wernicke':['área de Broca','fascículo arqueado','afasia de condução'],
  'afasia de condução':['fascículo arqueado','afasia global'],
  'reciclagem neuronal':['períodos críticos','lobo occipital'],
  'penumbra':['córtex','substância branca'],
  'córtex motor':['neurônio motor superior','unidade motora','código de população','cerebelo'],
  'cerebelo':['córtex motor','gânglios da base','tronco encefálico'],
  'unidade motora':['miastenia gravis','curare','neurônio motor superior'],
  'miastenia gravis':['unidade motora','curare'],
  'fotorreceptores':['quiasma óptico','tálamo','lobo occipital'],
  'nociceptores':['teoria da comporta','modulação descendente'],
  'teoria da comporta':['nociceptores','modulação descendente'],
  'células ciliadas externas':['membrana basilar','corpo geniculado medial'],
  'EEG':['MEG','fMRI','registro unitário','invasividade'],
  'fMRI':['EEG','MEG','invasividade','conectômica'],
  'optogenética':['quimiogenética','TMS','invasividade'],
  'TMS':['optogenética','EEG','invasividade'],
  'invasividade':['EEG','fMRI','optogenética','registro unitário'],
  'lobo frontal':['córtex pré-frontal','córtex motor','executivo central','lobo parietal','corpo caloso'],
  'lobo parietal':['córtex somatossensorial','lobo frontal','lobo occipital','mecanorreceptores'],
  'lobo temporal':['hipocampo','amígdala','área de Wernicke','corpo geniculado medial'],
  'lobo occipital':['fotorreceptores','quiasma óptico','tálamo','reciclagem neuronal'],
  'córtex':['substância cinzenta','substância branca','corpo caloso','lobo frontal'],
  'substância cinzenta':['córtex','substância branca'],
  'substância branca':['mielina','corpo caloso','substância cinzenta'],
  'corpo caloso':['substância branca','lobo frontal','córtex'],
  'tronco encefálico':['bulbo','mesencéfalo','locus coeruleus','núcleos da rafe','cerebelo'],
  'mesencéfalo':['substância negra','área tegmental ventral','tronco encefálico'],
  'bulbo':['tronco encefálico'],
  'hipotálamo':['cortisol','hipófise','núcleo supraquiasmático','tálamo','Processo C'],
  'núcleo accumbens':['estriado ventral','mesolímbica','área tegmental ventral','dopamina'],
  'área tegmental ventral':['dopamina','mesolímbica','erro de previsão','núcleo accumbens'],
  'núcleos da rafe':['serotonina','monoaminas','tronco encefálico'],
  'dopamina':['erro de previsão','mesolímbica','estriado ventral','estriado dorsal','substância negra','D2','área tegmental ventral'],
  'serotonina':['núcleos da rafe','monoaminas','recaptação'],
  'acetilcolina':['unidade motora','curare','miastenia gravis'],
  'endorfinas':['modulação descendente','teoria da comporta','agonista'],
  'recaptação':['antagonista','agonista','monoaminas','dopamina'],
  'antagonista':['agonista','recaptação','D2','adenosina'],
  'agonista':['antagonista','agonistas parciais','endorfinas'],
  'córtex somatossensorial':['mecanorreceptores','lobo parietal','córtex motor','nociceptores'],
  'adenosina':['Processo S','Processo C','núcleo supraquiasmático','antagonista']
};

/* ---------- 3. índice em linguagem leiga ---------- */
/* cat: condicao | estado | substancia | desempenho | fenomeno
   n=nome  q=o que é  a=mecanismo  t=termos  m=aulas  k=conceitos Topo  s=sinônimos  nota=aviso */
const CONCEPTS = {

/* ===== CONDIÇÕES ===== */
ansiedade:{cat:'condicao', n:'Ansiedade',
 q:'Por que o corpo entra em estado de ameaça sem que haja ameaça real?',
 a:'A amígdala detecta ameaça pela <b>via rápida</b>, que chega antes de o córtex ter tempo de avaliar a situação — por isso o corpo reage antes de você entender o motivo. Na ansiedade, esse detector fica com o limiar rebaixado e dispara para sinais ambíguos. O eixo HPA solta cortisol, e o cortisol enfraquece justamente o córtex pré-frontal que deveria dizer "isso não é perigo" — a alça se retroalimenta.',
 t:['amígdala','via rápida','via lenta','cortisol','hipófise','córtex adrenal','retroalimentação negativa','GABA','benzodiazepínicos','córtex pré-frontal','U invertido'],
 m:[{m:'emocao',l:0},{m:'emocao',l:1},{m:'farmacologia',l:2}], k:['inibicao'],
 s:['ansioso','ansiedade generalizada','angustia','nervosismo','panico','preocupacao','apreensao','TAG'],
 nota:true},

tdah:{cat:'condicao', n:'TDAH',
 q:'Por que sustentar atenção e inibir impulso custa tanto para algumas pessoas?',
 a:'A atenção depende de o córtex pré-frontal manter uma prioridade ativa (<b>top-down</b>) contra estímulos que competem (<b>bottom-up</b>). Esse controle exige dopamina e noradrenalina numa faixa estreita — abaixo dela, o sinal do que importa não se destaca do ruído. É por isso que estimulantes, que aumentam esses neuromoduladores na sinapse, melhoram o foco: eles reposicionam o sistema dentro da faixa ótima do U invertido, não "aceleram" a pessoa.',
 t:['top-down','bottom-up','executivo central','competição enviesada','pré-frontal dorsolateral','córtex pré-frontal','noradrenalina','locus coeruleus','U invertido','estriado','custo de reconfiguração'],
 m:[{m:'atencao',l:0},{m:'atencao',l:2},{m:'farmacologia',l:1},{m:'clinica',l:3}], k:['dopamina','inibicao'],
 s:['deficit de atencao','hiperatividade','desatencao','impulsividade','ADHD','disperso'],
 nota:true},

autismo:{cat:'condicao', n:'Autismo',
 q:'O que a neurociência entende sobre um cérebro que processa o mundo de outro jeito?',
 a:'A hipótese com mais apoio é de uma <b>poda sináptica</b> atípica: no desenvolvimento normal o cérebro produz conexões em excesso e depois elimina as pouco usadas. Quando essa poda é reduzida, sobram conexões locais demais e conexões de longa distância de menos — o que combina com processamento sensorial intenso e dificuldade em integrar contexto amplo. É um perfil poligênico, com muitos genes de efeito pequeno, não uma causa única.',
 t:['períodos críticos','micróglia','redes perineuronais','poligênicos','glia radial'],
 m:[{m:'desenvolvimento',l:2},{m:'desenvolvimento',l:3},{m:'clinica',l:3}], k:['plasticidade'],
 s:['autista','TEA','espectro autista','asperger','neurodivergente'],
 nota:true},

depressao:{cat:'condicao', n:'Depressão',
 q:'Por que a explicação do "desequilíbrio químico" é insuficiente?',
 a:'A ideia de simples falta de serotonina não se sustenta: os antidepressivos elevam as monoaminas em horas, mas o efeito clínico leva semanas. O que essa diferença de tempo revela é que o efeito real depende de mudança estrutural — via CREB e BDNF, o cérebro precisa reconstruir sinapses. A cetamina reforça essa leitura: age no receptor NMDA e produz efeito em horas, justamente por disparar plasticidade rápida.',
 t:['monoaminas','CREB','BDNF','cetamina','NMDA','córtex pré-frontal','cortisol','hipocampo'],
 m:[{m:'clinica',l:3},{m:'farmacologia',l:2},{m:'plasticidade',l:2}], k:['plasticidade'],
 s:['depressivo','tristeza profunda','anedonia','desanimo','sem vontade de nada'],
 nota:true},

insonia:{cat:'condicao', n:'Insônia',
 q:'Por que às vezes o corpo está exausto e o sono não vem?',
 a:'O sono é comandado por dois sistemas independentes: a <b>pressão do sono</b> (Processo S), que sobe com o acúmulo de adenosina ao longo do dia, e o <b>relógio circadiano</b> (Processo C), regido pelo núcleo supraquiasmático. Estar cansado é ter Processo S alto — mas se o relógio ainda sinaliza "dia" (por luz à noite, horário irregular ou cortisol elevado), os dois discordam e o sono não fecha.',
 t:['Processo S','Processo C','adenosina','núcleo supraquiasmático','NREM','REM','cortisol','hipotálamo'],
 m:[{m:'sono',l:3},{m:'sono',l:1}], k:['sono'],
 s:['nao consigo dormir','sono ruim','acordo de madrugada','dificuldade para dormir','dormir mal']},

parkinson:{cat:'condicao', n:'Doença de Parkinson',
 q:'Por que o movimento fica travado e lento?',
 a:'Os neurônios dopaminérgicos da substância negra degeneram progressivamente, com acúmulo de alfa-sinucleína. Sem dopamina, os gânglios da base perdem a capacidade de abrir o "portão" do movimento: a via que libera a ação enfraquece e a que a inibe domina. O resultado é rigidez, lentidão e tremor. A levodopa repõe o precursor da dopamina porque ela mesma não atravessa a barreira hematoencefálica.',
 t:['substância negra','alfa-sinucleína','gânglios da base','levodopa','D2','barreira hematoencefálica','estimulação cerebral profunda','estriado'],
 m:[{m:'clinica',l:1},{m:'motor',l:2},{m:'farmacologia',l:0}], k:['dopamina'],
 s:['tremor','rigidez','movimento lento','bradicinesia','mal de parkinson']},

alzheimer:{cat:'condicao', n:'Doença de Alzheimer',
 q:'Por que a memória recente some antes da antiga?',
 a:'A patologia começa por placas de beta-amiloide e emaranhados de tau, e atinge primeiro o hipocampo — a estrutura que <b>registra</b> memórias novas. Memórias mais antigas podem depender de redes reorganizadas e distribuídas de modo diferente, embora o padrão varie conforme o tipo e os detalhes da lembrança. Há ainda uma ligação com o sono: o sistema glinfático limpa beta-amiloide durante o NREM, então sono ruim crônico reduz a depuração e alimenta o acúmulo.',
 t:['beta-amiloide','tau','hipocampo','sistema glinfático','aquaporina-4','NREM','replay'],
 m:[{m:'clinica',l:1},{m:'sono',l:2},{m:'plasticidade',l:2}], k:['hipocampo','sono'],
 s:['demencia','perda de memoria','esquecimento grave','memoria recente']},

avc:{cat:'condicao', n:'AVC',
 q:'Por que a pressa importa tanto num derrame?',
 a:'A interrupção do fluxo sanguíneo cria um núcleo de tecido que morre rápido e, ao redor, a <b>penumbra</b>: tecido ainda vivo mas sem função, que pode ser recuperado se o fluxo voltar a tempo. Essa janela é o motivo de cada minuto contar. Os déficits são tão específicos porque o córtex é funcionalmente localizado — perde-se a função da região exata atingida, não "um pouco de tudo".',
 t:['penumbra','córtex','substância branca','afasia global','área de Broca','área de Wernicke'],
 m:[{m:'clinica',l:2},{m:'linguagem',l:2},{m:'neuroanatomia',l:1}], k:[],
 s:['derrame','isquemia','acidente vascular','entupimento','trombose cerebral']},

epilepsia:{cat:'condicao', n:'Epilepsia',
 q:'O que é uma crise, do ponto de vista elétrico?',
 a:'O cérebro normal mantém um equilíbrio fino entre excitação (glutamato) e inibição (GABA). Uma crise é a quebra desse equilíbrio: um conjunto de neurônios passa a disparar de forma sincronizada e recrutar vizinhos, em vez de cada um manter seu padrão próprio. Muitos anticonvulsivantes agem reforçando a inibição via GABA ou reduzindo a excitabilidade dos canais.',
 t:['GABA','glutamato','dependentes de voltagem','EEG','benzodiazepínicos','ionotrópicos'],
 m:[{m:'clinica',l:2},{m:'neuronio',l:2},{m:'metodos',l:1}], k:['inibicao'],
 s:['convulsao','crise epileptica','ataque','descarga eletrica']},

esquizofrenia:{cat:'condicao', n:'Esquizofrenia',
 q:'Por que os antipsicóticos agem na dopamina?',
 a:'A hipótese dopaminérgica parte do bloqueio de receptores D2 pelos antipsicóticos, que reduz sintomas positivos (alucinações, delírios). A leitura mais atual liga isso à <b>saliência de incentivo</b>: dopamina em excesso marca como importante o que é irrelevante, e o delírio seria a tentativa de explicar essa importância indevida. Isso também explica por que os sintomas negativos, que não vêm de excesso, respondem mal ao bloqueio.',
 t:['D2','saliência de incentivo','mesolímbica','estriado','monoaminas','poligênicos'],
 m:[{m:'clinica',l:3},{m:'farmacologia',l:2},{m:'recompensa',l:1}], k:['dopamina'],
 s:['psicose','alucinacao','delirio','surto psicotico','antipsicotico'],
 nota:true},

toc:{cat:'condicao', n:'TOC',
 q:'Por que o pensamento volta mesmo quando a pessoa sabe que é irracional?',
 a:'O circuito envolvido é a alça entre córtex pré-frontal, estriado e tálamo. Nela, um sinal de "algo está errado" deveria ser encerrado depois de checado — no TOC ele não encerra, e a alça reverbera. Saber racionalmente que a checagem é desnecessária não desliga o circuito, porque o sinal de erro é gerado abaixo do nível deliberado. O ritual reduz o desconforto momentaneamente e, ao reduzir, reforça o próprio loop.',
 t:['córtex pré-frontal','estriado','tálamo','gânglios da base','estriado dorsal','monoaminas'],
 m:[{m:'clinica',l:3},{m:'recompensa',l:3},{m:'motor',l:2}], k:['habito','inibicao'],
 s:['obsessivo','compulsao','ritual','checagem','pensamento intrusivo','mania de'],
 nota:true},

tept:{cat:'condicao', n:'Trauma e TEPT',
 q:'Por que uma memória antiga continua disparando como se fosse presente?',
 a:'No momento do trauma, cortisol e noradrenalina altos deixam a amígdala hiperativa e prejudicam o hipocampo — o registro emocional fica forte enquanto o registro de <b>contexto</b> (onde, quando) fica fraco. O resultado é uma memória que dispara sem âncora temporal: o corpo reage como se fosse agora. A reconsolidação é a janela terapêutica: memórias reativadas ficam brevemente instáveis e podem ser regravadas com novo contexto.',
 t:['amígdala','hipocampo','cortisol','noradrenalina','reconsolidação','via rápida','córtex pré-frontal'],
 m:[{m:'emocao',l:0},{m:'emocao',l:1},{m:'plasticidade',l:3}], k:['hipocampo'],
 s:['trauma','estresse pos traumatico','flashback','gatilho emocional','revivendo'],
 nota:true},

dislexia:{cat:'condicao', n:'Dislexia',
 q:'Por que ler é difícil se a inteligência está preservada?',
 a:'Ler é recente demais na evolução para ter circuito próprio — o cérebro faz <b>reciclagem neuronal</b>, recrutando uma região da visão que servia para reconhecer formas e conectando-a às áreas de som e linguagem. A dislexia é uma dificuldade nessa ponte entre a forma escrita e o som correspondente, não um problema de inteligência nem de esforço.',
 t:['reciclagem neuronal','área de Wernicke','área de Broca','fascículo arqueado','lobo occipital','períodos críticos'],
 m:[{m:'linguagem',l:3},{m:'linguagem',l:0},{m:'desenvolvimento',l:3}], k:['plasticidade'],
 s:['dificuldade de leitura','troca letras','ler devagar','alfabetizacao'], nota:1},

esclerose:{cat:'condicao', n:'Esclerose múltipla',
 q:'Por que a doença atinge a velocidade do sinal e não o pensamento?',
 a:'O sistema imune ataca a mielina que envolve os axônios. A mielina existe para acelerar a condução — sem ela, o sinal fica lento, irregular ou se perde. Por isso os sintomas são de <b>transmissão</b> (visão, força, coordenação, fadiga) e variam conforme onde a lesão aparece: o que degrada é a fiação, não o processador.',
 t:['mielina','substância branca','células gliais','córtex'],
 m:[{m:'neuronio',l:1},{m:'neuroanatomia',l:0},{m:'clinica',l:0}], k:[],
 s:['EM','desmielinizante','perda de mielina','formigamento','fraqueza']},

dorcronica:{cat:'condicao', n:'Dor crônica',
 q:'Como a dor persiste sem lesão que a justifique?',
 a:'A dor não é um sinal que sobe direto: existe uma <b>comporta</b> na medula que pode abrir ou fechar a passagem, e vias que descem do cérebro modulam essa comporta conforme atenção, expectativa e estado emocional. Na dor crônica o sistema se sensibiliza — a comporta passa a abrir com facilidade e a modulação descendente perde eficiência. A dor vira propriedade do circuito, não relato de um dano em curso.',
 t:['nociceptores','teoria da comporta','modulação descendente','tálamo','córtex somatossensorial'],
 m:[{m:'sensorial',l:3},{m:'emocao',l:3}], k:['inibicao'],
 s:['dor persistente','fibromialgia','dor sem causa','sensibilizacao','dor neuropatica'],
 nota:true},

miastenia:{cat:'condicao', n:'Miastenia gravis',
 q:'Por que a força some com o uso e volta com o repouso?',
 a:'O sistema imune ataca os receptores de acetilcolina na junção neuromuscular. O comando do cérebro chega normalmente ao nervo, mas a mensagem não é bem recebida pelo músculo. Como cada contração consome os receptores disponíveis, o uso repetido esgota a transmissão — daí a fraqueza que piora ao longo do esforço e melhora com o descanso.',
 t:['unidade motora','miastenia gravis','curare','neurônio motor superior'],
 m:[{m:'motor',l:3},{m:'neuronio',l:2}], k:[],
 s:['fraqueza muscular','palpebra caida','cansaco muscular','junção neuromuscular']},

dependencia:{cat:'condicao', n:'Dependência química',
 q:'Por que a droga continua sendo buscada mesmo sem dar prazer?',
 a:'Duas coisas se separam com o uso repetido. A dopamina migra da recompensa para a <b>deixa</b>, então o gatilho passa a comandar a busca antes de qualquer prazer. E o controle migra do estriado ventral (motivação) para o dorsal (hábito automático). Somando a tolerância — o sistema se regula para baixo e a mesma dose rende menos —, o resultado é querer muito sem gostar mais.',
 t:['saliência de incentivo','estriado ventral','estriado dorsal','erro de previsão','mesolímbica','núcleo accumbens','gânglios da base'],
 m:[{m:'farmacologia',l:3},{m:'recompensa',l:3},{m:'recompensa',l:1}], k:['dopamina','habito'],
 s:['vicio','abstinencia','tolerancia','fissura','craving','recaida'],
 nota:true},

/* ===== ESTADOS E QUEIXAS ===== */
alertaconstante:{cat:'estado', n:'Estado de alerta constante',
 q:'Por que o corpo não desliga mesmo sem perigo à vista?',
 a:'O locus coeruleus ajusta o <b>ganho</b> do córtex inteiro conforme o estado — não a energia, a nitidez com que os circuitos respondem. Em alerta sustentado ele mantém o ganho alto demais, e passado o pico do U invertido isso amplifica também o ruído: tudo vira sinal, você reage a cada mínimo estímulo. Somado ao cortisol cronicamente elevado, o pré-frontal enfraquece e a resposta de ameaça deixa de ser filtrada.',
 t:['locus coeruleus','noradrenalina','U invertido','cortisol','amígdala','córtex pré-frontal','retroalimentação negativa'],
 m:[{m:'emocao',l:2},{m:'emocao',l:3},{m:'emocao',l:1}], k:['inibicao'],
 s:['hipervigilancia','sempre tenso','nao relaxa','alerta','sobressalto','na defensiva']},

procrastinacao:{cat:'estado', n:'Procrastinação',
 q:'Por que adiar é tão fácil mesmo sabendo o custo?',
 a:'A dopamina responde a <b>erro de previsão</b>: dispara quando a recompensa chega antes ou maior que o esperado. Tarefa longa com retorno distante gera quase nenhum sinal; a distração entrega retorno imediato e previsível. Não é falta de caráter — é o sistema escolhendo a opção que sinaliza melhor agora. Por isso fatiar a tarefa em passos com fechamento visível funciona: cria erro de previsão onde não havia.',
 t:['erro de previsão','saliência de incentivo','mesolímbica','estriado ventral','córtex pré-frontal','executivo central'],
 m:[{m:'recompensa',l:1},{m:'recompensa',l:2},{m:'atencao',l:2}], k:['dopamina'],
 s:['adiar','enrolar','deixar pra depois','preguica','nao consigo comecar','falta de disciplina']},

focofalta:{cat:'estado', n:'Falta de foco',
 q:'Por que a atenção escorrega mesmo com a intenção de focar?',
 a:'A atenção é <b>competição enviesada</b>: várias representações disputam o mesmo espaço e o pré-frontal aplica um viés a favor da escolhida. Esse viés tem custo e depende de estado — sono ruim ou estresse já detonaram o ganho antes de você tentar. Ou seja, a intenção opera sobre um sistema que foi ajustado a montante, e é por isso que "só se esforçar mais" escorrega.',
 t:['competição enviesada','top-down','bottom-up','executivo central','córtex pré-frontal','U invertido','custo de reconfiguração'],
 m:[{m:'atencao',l:0},{m:'atencao',l:2},{m:'emocao',l:3}], k:['inibicao'],
 s:['desatento','disperso','nao consigo focar','distracao','mente vagando','perco o fio']},

multitarefa:{cat:'estado', n:'Multitarefa',
 q:'Por que fazer duas coisas ao mesmo tempo sai pior que fazer em sequência?',
 a:'Não existe multitarefa cognitiva: o que existe é alternância rápida. Cada troca cobra <b>custo de reconfiguração</b> — o pré-frontal precisa desmontar o conjunto de regras ativo e montar outro. O tempo somado das trocas supera o tempo que você economizaria, e ainda deixa resíduo da tarefa anterior ocupando a memória de trabalho.',
 t:['custo de reconfiguração','executivo central','disparo persistente','pré-frontal dorsolateral','competição enviesada'],
 m:[{m:'atencao',l:3},{m:'atencao',l:1}], k:['inibicao'],
 s:['fazer varias coisas','alternar tarefas','dividir atencao','trocar de tarefa']},

memoriaruim:{cat:'estado', n:'Memória ruim',
 q:'Por que estudei e no dia seguinte não lembro?',
 a:'Registrar não é guardar. O hipocampo grava a experiência, mas a consolidação acontece depois — sobretudo no <b>NREM</b>, quando replay, oscilações lentas, fusos e ripples coordenam reativações entre hipocampo e córtex, favorecendo a reorganização do traço. Sem sono suficiente, o registro existe mas não é consolidado. E revisar tudo de uma vez fortalece pouco: o espaçamento vence porque cada recuperação com esforço reforça mais que a releitura.',
 t:['hipocampo','replay','ripples','NREM','fusos','LTP','reconsolidação','CREB'],
 m:[{m:'plasticidade',l:3},{m:'sono',l:0},{m:'plasticidade',l:2}], k:['hipocampo','sono'],
 s:['esquecimento','nao lembro','decorar','memorizar','estudo e esqueco','retencao']},

nevoamental:{cat:'estado', n:'Névoa mental',
 q:'Por que o pensamento fica lento e embotado?',
 a:'Duas coisas convergem. O ganho do sistema cai abaixo da faixa ótima — com noradrenalina baixa, sinal e ruído saem os dois abafados e nada se destaca. E, se houve privação de sono, a adenosina acumulada não foi limpa e a depuração glinfática não rodou. O resultado é um sistema tecnicamente ligado mas com contraste baixo demais para separar o que importa.',
 t:['U invertido','noradrenalina','locus coeruleus','adenosina','Processo S','sistema glinfático','NREM'],
 m:[{m:'emocao',l:3},{m:'sono',l:3},{m:'sono',l:2}], k:['sono'],
 s:['cabeca lenta','embotado','confuso','brain fog','raciocinio lento','cansaco mental']},

burnout:{cat:'estado', n:'Burnout e estresse crônico',
 q:'Qual a diferença entre estresse que ajuda e estresse que destrói?',
 a:'O estresse agudo é adaptativo: mobiliza recurso, sobe o desempenho até o pico do U invertido, e a <b>retroalimentação negativa</b> desliga o eixo depois. No estresse crônico essa alça de desligamento perde eficiência, o cortisol fica alto de forma sustentada e passa a agir em receptores de baixa afinidade que enfraquecem o pré-frontal e prejudicam o hipocampo. Deixa de ser mobilização e vira desgaste estrutural.',
 t:['cortisol','hipófise','córtex adrenal','retroalimentação negativa','U invertido','córtex pré-frontal','hipocampo','amígdala'],
 m:[{m:'emocao',l:2},{m:'emocao',l:1},{m:'emocao',l:3}], k:['inibicao'],
 s:['esgotamento','estresse cronico','exaustao','sobrecarga','trabalho demais','nao aguento mais'],
 nota:true},

forcadevontade:{cat:'estado', n:'Força de vontade',
 q:'Por que a vontade falha justamente nos dias ruins?',
 a:'Vontade é uma função do córtex pré-frontal — e o pré-frontal é a estrutura <b>mais sensível ao estado</b>. Sono ruim e estresse ajustam o ganho dos circuitos antes de qualquer esforço consciente, e no estresse a noradrenalina alta recruta receptores que enfraquecem o pré-frontal. Quando o freio sai de operação, o estriado dorsal assume: o hábito automático roda sem oposição. Não é que o hábito ficou mais forte — o freio ficou mais fraco.',
 t:['córtex pré-frontal','executivo central','U invertido','cortisol','noradrenalina','estriado dorsal','locus coeruleus'],
 m:[{m:'emocao',l:3},{m:'recompensa',l:3},{m:'atencao',l:2}], k:['habito','inibicao'],
 s:['autocontrole','disciplina','resistir','fraqueza','ceder','sem vontade']},

habito:{cat:'estado', n:'Hábito difícil de quebrar',
 q:'Por que o hábito persiste mesmo quando a recompensa perde valor?',
 a:'Com a repetição, a dopamina se desloca da recompensa para o <b>gatilho</b> — o cérebro passa a prever o prêmio já no sinal. Ao mesmo tempo o controle migra para o estriado dorsal, região do automatismo. A rotina passa a rodar quase independente do prêmio, e por isso "não querer mais a recompensa" não quebra o hábito. O que funciona é remover o gatilho mudando o ambiente.',
 t:['estriado dorsal','estriado ventral','saliência de incentivo','erro de previsão','gânglios da base','córtex pré-frontal'],
 m:[{m:'recompensa',l:3},{m:'motor',l:2},{m:'recompensa',l:1}], k:['habito','dopamina'],
 s:['vicio em habito','rotina automatica','nao consigo parar','gatilho','deixa','piloto automatico']},

celular:{cat:'estado', n:'Vício em celular e redes',
 q:'Por que a rolagem infinita prende tanto?',
 a:'O feed é uma máquina de <b>erro de previsão</b>: a recompensa é imprevisível, e a dopamina responde mais forte à imprevisibilidade do que à recompensa garantida. Some a isso a deixa constante — o aparelho está sempre à mão — e a rotina passa a disparar sozinha. É o mesmo mecanismo do hábito, otimizado de propósito para maximizar o sinal.',
 t:['erro de previsão','saliência de incentivo','estriado ventral','estriado dorsal','mesolímbica','bottom-up'],
 m:[{m:'recompensa',l:1},{m:'recompensa',l:3},{m:'atencao',l:0}], k:['dopamina','habito'],
 s:['scroll infinito','redes sociais','tela','celular','tiktok','instagram','dopamina barata']},

motivacao:{cat:'estado', n:'Motivação',
 q:'Por que progresso pequeno mantém mais engajado que meta grande?',
 a:'Dopamina não sinaliza prazer — sinaliza <b>erro de previsão</b>: a diferença entre o esperado e o obtido. Uma meta distante não gera sinal nenhum no caminho. Já um progresso pequeno e visível gera um erro positivo a cada passo, e é esse sinal que sustenta a busca. Por isso sistemas com feedback frequente engajam mais que promessas grandes e distantes.',
 t:['erro de previsão','mesolímbica','estriado ventral','saliência de incentivo','núcleo accumbens','área tegmental ventral'],
 m:[{m:'recompensa',l:1},{m:'recompensa',l:2},{m:'recompensa',l:0}], k:['dopamina'],
 s:['desmotivado','engajamento','vontade de fazer','meta','progresso','recompensa']},

medo:{cat:'estado', n:'Medo e susto',
 q:'Por que o corpo reage antes de você entender o que aconteceu?',
 a:'Existem duas rotas para a amígdala. A <b>via rápida</b> vem direto do tálamo, é grosseira e chega em milissegundos; a <b>via lenta</b> passa pelo córtex, é detalhada e chega depois. A rápida dispara a reação antes que a lenta identifique o objeto — por isso você pula da corda no chão antes de perceber que não era cobra. Errar por excesso custa pouco; errar por falta custa a vida.',
 t:['amígdala','via rápida','via lenta','tálamo','cortisol','sistema límbico'],
 m:[{m:'emocao',l:0},{m:'sensorial',l:0}], k:[],
 s:['susto','panico','reacao automatica','fuga','luta ou fuga','sobressalto']},

impulsividade:{cat:'estado', n:'Impulsividade',
 q:'Por que a reação sai antes do juízo?',
 a:'Inibir é ativo, não passivo: redes pré-frontais, cinguladas, parietais e subcorticais precisam sustentar a regra e reduzir uma resposta concorrente. Sono ruim, estresse e álcool podem tornar esse controle menos estável e mais lento. Não é ausência de julgamento; é uma disputa em que a resposta já preparada pode ganhar vantagem.',
 t:['córtex pré-frontal','executivo central','GABA','estriado','top-down','pré-frontal dorsolateral'],
 m:[{m:'atencao',l:2},{m:'emocao',l:3},{m:'clinica',l:3}], k:['inibicao'],
 s:['impulso','sem pensar','explosivo','raiva','reagir mal','arrependimento']},

/* ===== SUBSTÂNCIAS ===== */
cafeina:{cat:'substancia', n:'Cafeína',
 q:'Como o café tira o sono se não dá energia?',
 a:'A cafeína não fornece energia — ela <b>bloqueia o receptor de adenosina</b>. A adenosina se acumula ao longo do dia e é o sinalizador da pressão do sono; com o receptor ocupado, o cérebro deixa de ler o cansaço que continua se acumulando. Quando a cafeína sai, toda a adenosina acumulada é lida de uma vez — é a queda que vem depois.',
 t:['adenosina','antagonista','Processo S','Processo C','núcleo supraquiasmático'],
 m:[{m:'farmacologia',l:1},{m:'sono',l:3}], k:['sono'],
 s:['cafe','energetico','cafeina','sono depois do cafe','estimulante leve']},

alcool:{cat:'substancia', n:'Álcool',
 q:'Por que o álcool solta e ao mesmo tempo derruba?',
 a:'O álcool potencializa o GABA (o inibitório principal) e reduz a ação do glutamato (o excitatório). A primeira coisa que a inibição derruba é o córtex pré-frontal — daí a desinibição inicial parecer soltura, quando na verdade é freio desligado. Com mais dose a depressão se espalha para cerebelo (coordenação) e tronco (funções vitais), e por isso o risco é real em excesso.',
 t:['GABA','glutamato','córtex pré-frontal','cerebelo','tronco encefálico','ionotrópicos'],
 m:[{m:'farmacologia',l:1},{m:'farmacologia',l:3}], k:['inibicao'],
 s:['bebida','bebida alcoolica','embriaguez','ressaca','porre'],
 nota:true},

nicotina:{cat:'substancia', n:'Nicotina',
 q:'Por que o cigarro é tão difícil de largar?',
 a:'A nicotina é agonista de receptores de acetilcolina que aumentam a liberação de dopamina no núcleo accumbens. O que a torna especialmente difícil é a <b>velocidade</b> e a frequência: cada tragada é um pulso rápido, e centenas de repetições por dia fazem a dopamina migrar para as deixas do contexto — o café, a pausa, o volante. Larga-se a substância e continuam os gatilhos.',
 t:['núcleo accumbens','mesolímbica','estriado dorsal','saliência de incentivo','agonistas parciais'],
 m:[{m:'farmacologia',l:3},{m:'recompensa',l:3}], k:['dopamina','habito'],
 s:['cigarro','fumar','tabaco','vape','parar de fumar'],
 nota:true},

maconha:{cat:'substancia', n:'Cannabis',
 q:'Por que ela afeta memória e noção de tempo?',
 a:'O THC age em receptores canabinoides, que são densos no hipocampo e no cerebelo. No hipocampo, isso interfere na formação de memórias novas durante o efeito — a experiência acontece mas registra mal. A ação em circuitos de tempo e coordenação explica a distorção da percepção de duração. O uso na adolescência preocupa mais porque o pré-frontal ainda está em maturação.',
 t:['hipocampo','cerebelo','metabotrópicos','córtex pré-frontal','períodos críticos'],
 m:[{m:'farmacologia',l:1},{m:'desenvolvimento',l:3}], k:['hipocampo'],
 s:['cannabis','THC','erva','canabidiol','CBD'],
 nota:true},

antidepressivos:{cat:'substancia', n:'Antidepressivos',
 q:'Por que demoram semanas para funcionar?',
 a:'Os ISRS bloqueiam a recaptação de serotonina, então o nível na sinapse sobe em <b>horas</b>. Mas o efeito clínico leva semanas — e essa diferença é a pista de que o mecanismo real não é o nível em si. O que leva tempo é a cascata que se segue: via CREB e BDNF, o cérebro reconstrói sinapses. É plasticidade, não reposição química.',
 t:['monoaminas','recaptação','CREB','BDNF','cetamina','serotonina'],
 m:[{m:'farmacologia',l:2},{m:'clinica',l:3},{m:'plasticidade',l:2}], k:['plasticidade'],
 s:['ISRS','fluoxetina','sertralina','remedio para depressao','antidepressivo'],
 nota:true},

estimulantes:{cat:'substancia', n:'Estimulantes',
 q:'Como um estimulante melhora o foco sem "acelerar" a pessoa?',
 a:'Metilfenidato e anfetamina aumentam dopamina e noradrenalina na sinapse — o primeiro bloqueando a recaptação, o segundo forçando a liberação. O efeito no foco não vem de aceleração, e sim de reposicionamento no <b>U invertido</b>: quem estava abaixo da faixa ótima sobe até ela e ganha nitidez. Quem já estava no pico é empurrado para além dele e piora — mais agitação, menos foco.',
 t:['noradrenalina','U invertido','pré-frontal dorsolateral','estriado','locus coeruleus','top-down'],
 m:[{m:'farmacologia',l:1},{m:'atencao',l:2},{m:'emocao',l:3}], k:['dopamina'],
 s:['ritalina','metilfenidato','anfetamina','venvanse','remedio para foco'],
 nota:true},

ansioliticos:{cat:'substancia', n:'Ansiolíticos',
 q:'Como um benzodiazepínico acalma?',
 a:'Os benzodiazepínicos são <b>moduladores</b> do receptor GABA-A: não abrem o canal sozinhos, mas fazem o GABA natural agir com mais eficiência. Ou seja, amplificam a inibição que já existe. Isso reduz a excitabilidade geral e acalma a resposta de ameaça — e explica tanto a eficácia rápida quanto o risco de tolerância, já que o sistema se regula para baixo em resposta.',
 t:['benzodiazepínicos','GABA','ionotrópicos','agonistas parciais','amígdala'],
 m:[{m:'farmacologia',l:2},{m:'farmacologia',l:3},{m:'emocao',l:0}], k:['inibicao'],
 s:['benzodiazepinico','clonazepam','rivotril','diazepam','calmante','tarja preta'],
 nota:true},

opioides:{cat:'substancia', n:'Opioides',
 q:'Por que aliviam a dor e viciam tanto?',
 a:'Os opioides imitam as endorfinas nos receptores opioides. Agem em dois lugares ao mesmo tempo: fecham a comporta da dor pela modulação descendente, e ativam a via mesolímbica de recompensa. É essa dupla ação que os torna analgésicos potentes e, simultaneamente, de altíssimo potencial de dependência — o alívio e a recompensa vêm pela mesma porta.',
 t:['nociceptores','modulação descendente','teoria da comporta','mesolímbica','núcleo accumbens','metabotrópicos'],
 m:[{m:'sensorial',l:3},{m:'farmacologia',l:0},{m:'farmacologia',l:3}], k:['dopamina'],
 s:['morfina','tramadol','codeina','analgesico forte','opioide'],
 nota:true},

cetaminaC:{cat:'substancia', n:'Cetamina',
 q:'Por que age em horas se os antidepressivos levam semanas?',
 a:'A cetamina bloqueia o receptor NMDA, e isso desencadeia uma onda rápida de plasticidade — sinapses novas se formam em horas, via BDNF. É a demonstração mais clara de que o efeito antidepressivo depende de <b>reconstrução estrutural</b>, não de nível de monoamina: mudando a rota para chegar à plasticidade, muda-se a velocidade do efeito.',
 t:['cetamina','NMDA','BDNF','LTP','monoaminas','glutamato'],
 m:[{m:'farmacologia',l:2},{m:'plasticidade',l:1},{m:'clinica',l:3}], k:['plasticidade'],
 s:['ketamina','esketamina','antidepressivo rapido'],
 nota:true},

/* ===== DESEMPENHO E APRENDIZADO ===== */
aprenderrapido:{cat:'desempenho', n:'Aprender mais rápido',
 q:'O que de fato faz o aprendizado grudar?',
 a:'Três coisas com base mecânica. <b>Espaçamento</b>: cada recuperação com esforço reforça mais que a releitura, e o intervalo permite consolidação entre sessões. <b>Sono</b>: o NREM coordena reativações entre hipocampo e córtex que favorecem estabilização e reorganização; dormir mal pode prejudicar esse processo, sem apagar automaticamente o que foi estudado. E <b>coincidência temporal</b>: conectar o novo a algo já sabido faz os dois dispararem juntos, e o que dispara junto se conecta.',
 t:['LTP','replay','ripples','NREM','reconsolidação','hipocampo','CREB','CaMKII'],
 m:[{m:'plasticidade',l:3},{m:'plasticidade',l:1},{m:'sono',l:0}], k:['coincidencia','plasticidade','sono'],
 s:['estudar melhor','fixar conteudo','revisao espacada','tecnica de estudo','aprender']},

provas:{cat:'desempenho', n:'Estudar para prova',
 q:'Por que virar a noite estudando sai pior?',
 a:'Estudar a noite toda ataca os dois pilares ao mesmo tempo. Sem sono, o replay do NREM não roda e o que foi registrado no hipocampo não é consolidado. E no dia seguinte a adenosina acumulada e o ganho fora da faixa ótima deixam o pré-frontal sem condição de recuperar o que foi guardado. Você perde na gravação e perde de novo na leitura.',
 t:['NREM','replay','fusos','adenosina','Processo S','hipocampo','U invertido','córtex pré-frontal'],
 m:[{m:'sono',l:0},{m:'plasticidade',l:3},{m:'emocao',l:3}], k:['sono','hipocampo'],
 s:['virar a noite','vespera de prova','enem','vestibular','maratona de estudo','madrugada estudando']},

exercicio:{cat:'desempenho', n:'Exercício e cérebro',
 q:'Por que atividade física melhora memória e humor?',
 a:'O exercício aumenta a produção de <b>BDNF</b> — o fator que sustenta a formação e a manutenção de sinapses. Mais BDNF favorece plasticidade, especialmente no hipocampo, o que se traduz em melhor consolidação de memória. O efeito sobre humor vem por caminho parecido: as mesmas vias de plasticidade que os antidepressivos levam semanas para mobilizar.',
 t:['BDNF','LTP','hipocampo','CREB','monoaminas'],
 m:[{m:'plasticidade',l:0},{m:'clinica',l:3},{m:'sono',l:0}], k:['plasticidade','hipocampo'],
 s:['atividade fisica','academia','correr','esporte','treino','caminhada']},

meditacao:{cat:'desempenho', n:'Meditação e atenção',
 q:'O que muda no cérebro com prática de atenção?',
 a:'Meditar é treinar explicitamente o controle <b>top-down</b>: perceber que a atenção saiu e trazê-la de volta é exatamente a operação que o pré-frontal executa. Como qualquer treino, a repetição reforça o circuito envolvido. O efeito mais consistente relatado é sobre a reatividade da amígdala e a capacidade de não ser sequestrado por estímulo saliente — menos captura bottom-up.',
 t:['top-down','bottom-up','competição enviesada','córtex pré-frontal','amígdala','executivo central'],
 m:[{m:'atencao',l:0},{m:'emocao',l:0},{m:'plasticidade',l:0}], k:['inibicao','plasticidade'],
 s:['mindfulness','meditar','atencao plena','respiracao','contemplativo']},

criatividade:{cat:'desempenho', n:'Criatividade',
 q:'Por que boas ideias aparecem no banho e não na mesa?',
 a:'Foco estreito serve para executar, não para conectar. Quando o controle top-down afrouxa, representações distantes deixam de ser suprimidas pela competição enviesada e podem se ativar juntas — e o que dispara junto se conecta. O sono REM parece amplificar isso, favorecendo associações remotas. Não é mística: é redução temporária do filtro que a execução exige.',
 t:['top-down','competição enviesada','REM','LTP','executivo central','bottom-up'],
 m:[{m:'atencao',l:0},{m:'sono',l:1},{m:'plasticidade',l:1}], k:['coincidencia','sono'],
 s:['ideia','insight','inspiracao','pensar fora da caixa','associacao livre']},

bilinguismo:{cat:'desempenho', n:'Bilinguismo',
 q:'Por que criança aprende sotaque e adulto não?',
 a:'Existe um <b>período crítico</b> para os sons da fala: cedo, o cérebro discrimina contrastes de qualquer idioma; com a exposição, ele se especializa no que ouve e deixa de distinguir o que não usa. As redes perineuronais consolidam esse recorte e fecham a janela. O idioma continua aprendível depois — o que fica muito mais difícil é a fonologia fina, justamente a parte que a janela travou.',
 t:['períodos críticos','redes perineuronais','área de Broca','área de Wernicke','prosódia','reciclagem neuronal','BDNF'],
 m:[{m:'linguagem',l:3},{m:'desenvolvimento',l:3}], k:['plasticidade'],
 s:['segundo idioma','sotaque','aprender ingles','lingua estrangeira','crianca bilingue']},

envelhecimento:{cat:'desempenho', n:'Envelhecimento cerebral',
 q:'O que de fato protege o cérebro com a idade?',
 a:'Plasticidade não acaba na infância — sinapses continuam se fortalecendo e se podando a vida toda. O que muda é a velocidade e a margem. Os fatores com melhor sustentação mecânica são os que alimentam plasticidade e depuração: exercício (BDNF), sono de qualidade (limpeza glinfática de beta-amiloide) e desafio cognitivo real, que exige formação de conexão nova em vez de repetir o já automatizado.',
 t:['BDNF','sistema glinfático','beta-amiloide','NREM','LTP','períodos críticos','aquaporina-4'],
 m:[{m:'plasticidade',l:0},{m:'sono',l:2},{m:'clinica',l:1}], k:['plasticidade','sono'],
 s:['idoso','velhice','memoria com a idade','prevenir demencia','cerebro velho']},

/* ===== FENÔMENOS ===== */
sonhos:{cat:'fenomeno', n:'Sonhos',
 q:'Para que serve sonhar?',
 a:'O sonho concentra-se no <b>REM</b>, fase em que o cérebro fica ativo e o corpo, paralisado. Duas funções têm apoio: reprocessamento emocional — a experiência do dia é reativada com noradrenalina baixa, o que permite reencontrar o conteúdo sem a carga de alerta — e associação remota, que favorece conexões improváveis. Não é mensagem cifrada; é processamento offline.',
 t:['REM','NREM','noradrenalina','replay','hipocampo','oscilações lentas'],
 m:[{m:'sono',l:1},{m:'sono',l:0}], k:['sono'],
 s:['sonhar','pesadelo','REM','sonho lucido']},

ritmocircadiano:{cat:'fenomeno', n:'Ritmo circadiano',
 q:'Por que o horário importa tanto para o sono e o humor?',
 a:'O núcleo supraquiasmático, no hipotálamo, é o relógio central, e ele se acerta principalmente pela <b>luz</b>. Ele governa o Processo C, que define quando o corpo espera estar acordado, independente do cansaço acumulado. Turno noturno e jet lag desalinham o relógio da rotina, e é o desalinhamento — não a falta de horas — que produz o mal-estar característico.',
 t:['núcleo supraquiasmático','Processo C','Processo S','hipotálamo','adenosina','REM'],
 m:[{m:'sono',l:3},{m:'sono',l:1}], k:['sono'],
 s:['jet lag','turno noturno','relogio biologico','fuso horario','dormir tarde','notívago']},

homunculo_c:{cat:'fenomeno', n:'Mapa do corpo no cérebro',
 q:'Por que mão e boca ocupam tanto espaço no córtex?',
 a:'Os córtices motor e somatossensorial são organizados como <b>mapas do corpo</b>, mas a proporção não segue o tamanho físico e sim a densidade de uso e de receptores. Mão, lábios e língua ocupam áreas enormes porque exigem controle e sensibilidade finíssimos; as costas, quase nada. O mapa também é plástico: muda com uso, treino e amputação.',
 t:['córtex motor','córtex somatossensorial','mecanorreceptores','código de população','lobo parietal'],
 m:[{m:'motor',l:1},{m:'sensorial',l:3},{m:'neuroanatomia',l:1}], k:['plasticidade'],
 s:['homunculo','mapa do corpo','sensibilidade','tato','membro fantasma']},

placebo:{cat:'fenomeno', n:'Efeito placebo',
 q:'Como a expectativa produz efeito físico real?',
 a:'No caso da dor, o mecanismo é conhecido: a expectativa ativa a <b>modulação descendente</b>, que fecha a comporta na medula e reduz o sinal que sobe. O alívio é mensurável e depende de vias opioides endógenas. Ou seja, não é "estar imaginando" — é o cérebro usando um controle que ele já tem, acionado pela crença.',
 t:['modulação descendente','teoria da comporta','nociceptores','top-down','córtex pré-frontal'],
 m:[{m:'sensorial',l:3},{m:'metodos',l:0}], k:['inibicao'],
 s:['placebo','nocebo','expectativa','sugestao','efeito da cren\u00e7a']},

causalidade:{cat:'fenomeno', n:'Correlação e causa',
 q:'Por que uma imagem de cérebro não prova que a região "faz" aquilo?',
 a:'Registrar mostra que uma região <b>acende junto</b> com um comportamento — o que não distingue causa, efeito ou coincidência. Para afirmar causa é preciso <b>manipular</b>: desligar ou ligar a região e ver o comportamento mudar, com TMS, optogenética ou quimiogenética. É por isso que o campo trata registro e manipulação como etapas diferentes, e valoriza evidência convergente.',
 t:['fMRI','EEG','TMS','optogenética','quimiogenética','registro unitário','invasividade','conectômica'],
 m:[{m:'metodos',l:0},{m:'metodos',l:2},{m:'metodos',l:3}], k:[],
 s:['correlacao','causa','prova cientifica','neurociencia serve','metodo','evidencia']}

};

/* ---------- 4. motor de busca ---------- */
function nrmz(s){
  return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
const CAT_LABEL = {condicao:'Condição', estado:'Estado / queixa', substancia:'Substância', desempenho:'Desempenho', fenomeno:'Fenômeno'};

let SIDX = null;
function buildSearchIndex(){
  if(SIDX) return SIDX;
  const ix = [];
  Object.keys(CONCEPTS).forEach(k=>{
    const c = CONCEPTS[k];
    ix.push({kind:'conceito', key:k, label:c.n, sub:CAT_LABEL[c.cat]||'',
      names:[nrmz(c.n)].concat((c.s||[]).map(nrmz)),
      blob:nrmz(c.n+' '+(c.q||'')+' '+(c.a||'').replace(/<[^>]+>/g,'')+' '+(c.s||[]).join(' ')+' '+(c.t||[]).join(' '))});
  });
  Object.keys(GLOSSARY).forEach(t=>{
    ix.push({kind:'termo', key:t, label:t, sub:'Termo do glossário',
      names:[nrmz(t)], blob:nrmz(t+' '+GLOSSARY[t])});
  });
  try{
    Object.keys(LINKS).forEach(k=>{
      const L = LINKS[k];
      ix.push({kind:'topo', key:k, label:L.n, sub:'Conceito que atravessa módulos',
        names:[nrmz(L.n)], blob:nrmz(L.n+' '+(L.ideia||'')+' '+(L.fecho||''))});
    });
  }catch(e){}
  MODULES.forEach((m,i)=>{
    ix.push({kind:'modulo', key:String(i), label:m.title, sub:'Módulo '+m.n,
      names:[nrmz(m.title)], blob:nrmz(m.title+' '+(m.tag||'')+' '+(m.intro||''))});
    (m.lessons||[]).forEach((l,li)=>{
      ix.push({kind:'aula', key:i+':'+li, label:l.t, sub:'Módulo '+m.n+' · aula '+(li+1),
        names:[nrmz(l.t)], blob:nrmz(l.t+' '+String(l.b||'').replace(/<[^>]+>/g,''))});
    });
  });
  SIDX = ix; return ix;
}

const KIND_W = {conceito:1.15, termo:1.0, topo:1.05, aula:0.8, modulo:0.85};
function scoreEntry(e, toks){
  let total = 0, hits = 0;
  toks.forEach(tk=>{
    let best = 0;
    e.names.forEach(n=>{
      if(n === tk) best = Math.max(best, 120);
      else if(n.indexOf(tk) === 0) best = Math.max(best, 92);
      else if(n.indexOf(tk) > -1) best = Math.max(best, 74);
    });
    if(best === 0 && e.blob.indexOf(tk) > -1) best = 42;
    if(best > 0){ hits++; total += best; }
  });
  if(!hits) return 0;
  if(hits < toks.length) total *= 0.55;
  return total * (KIND_W[e.kind] || 1);
}

function searchAll(q){
  const toks = nrmz(q).split(/\s+/).filter(t=>t.length > 1);
  if(!toks.length) return [];
  const base = buildSearchIndex()
    .map(e=>({e:e, s:scoreEntry(e, toks)}))
    .filter(r=>r.s > 0)
    .sort((a,b)=>b.s - a.s);

  /* expansao: um conceito leigo forte puxa os termos tecnicos ligados a ele */
  const have = {};
  base.forEach(r=>{ have[r.e.kind+':'+r.e.key] = 1; });
  const extra = [];
  base.filter(r=>r.e.kind === 'conceito' && r.s >= 85).slice(0, 3).forEach(r=>{
    const c = CONCEPTS[r.e.key];
    if(!c) return;
    (c.t||[]).forEach((t, i)=>{
      const id = 'termo:'+t;
      if(have[id] || !GLOSSARY[t] || extra.length > 16) return;
      have[id] = 1;
      extra.push({e:{kind:'termo', key:t, label:t, sub:'ligado a '+c.n}, s:r.s*0.5 - i});
    });
    (c.k||[]).forEach(k=>{
      const id = 'topo:'+k;
      if(have[id]) return;
      let nm = null;
      try{ if(LINKS[k]) nm = LINKS[k].n; }catch(e){}
      if(!nm) return;
      have[id] = 1;
      extra.push({e:{kind:'topo', key:k, label:nm, sub:'ligado a '+c.n}, s:r.s*0.45});
    });
    (c.m||[]).forEach(a=>{
      const i = MODULES.findIndex(x=>x.id === a.m);
      if(i < 0 || !MODULES[i].lessons || !MODULES[i].lessons[a.l]) return;
      const id = 'aula:'+i+':'+a.l;
      if(have[id]) return;
      have[id] = 1;
      extra.push({e:{kind:'aula', key:i+':'+a.l, label:MODULES[i].lessons[a.l].t,
        sub:'Módulo '+MODULES[i].n+' · ligado a '+c.n}, s:r.s*0.4});
    });
  });
  return base.concat(extra).sort((a,b)=>b.s - a.s).slice(0, 60);
}

/* ---------- 5. termos relacionados ---------- */
function relatedFor(term){
  const out = [];
  const push = t=>{ if(t && t !== term && GLOSSARY[t] && out.indexOf(t) < 0) out.push(t); };
  (TERM_REL[term] || []).forEach(push);
  if(out.length < 6){
    Object.keys(TERM_REL).forEach(k=>{ if((TERM_REL[k]||[]).indexOf(term) > -1) push(k); });
  }
  if(out.length < 6){
    Object.keys(CONCEPTS).forEach(k=>{
      const c = CONCEPTS[k];
      if((c.t||[]).indexOf(term) > -1) (c.t||[]).forEach(push);
    });
  }
  return out.slice(0, 8);
}
function conceptsForTerm(term){
  return Object.keys(CONCEPTS).filter(k=>(CONCEPTS[k].t||[]).indexOf(term) > -1).slice(0, 4);
}

/* ---------- 6. interface ---------- */
let searchPrevFocus = null;

function openSearch(seed){
  const back = document.getElementById('search-modal');
  if(!back) return;
  searchPrevFocus = document.activeElement;
  back.hidden = false;
  back.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  pushOverlayState('search-modal');
  const inp = document.getElementById('sc-input');
  if(inp){
    inp.value = seed || '';
    renderSearch(inp.value);
    setTimeout(()=>{ try{ inp.focus(); }catch(e){} }, 30);
  }
}
function closeSearch(fromPop){
  const back = document.getElementById('search-modal');
  if(!back || back.hidden) return;
  back.hidden = true;
  back.setAttribute('aria-hidden','true');
  if(document.getElementById('term-modal').hidden && document.getElementById('fig-zoom').hidden){
    document.body.style.overflow = '';
  }
  if(searchPrevFocus){ try{ searchPrevFocus.focus({preventScroll:true}); }catch(e){} searchPrevFocus = null; }
  if(fromPop !== true){ try{ history.back(); }catch(e){} }
}

function scChip(text, onclick, cls){
  return '<button type="button" class="sc-chip '+(cls||'')+'" onclick="'+onclick+'">'+text+'</button>';
}
function esc1(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }
// esc1 protege string JS dentro de atributo onclick — não serve para texto em HTML.
// Para ecoar o que o aluno digitou (única entrada não confiável do app) use escHtml.
const ESC_MAP={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function escHtml(s){ return String(s).replace(/[&<>"']/g, c=>ESC_MAP[c]); }

function renderSearch(q){
  const box = document.getElementById('sc-body');
  if(!box) return;
  const toks = nrmz(q).split(/\s+/).filter(t=>t.length > 1);
  if(!toks.length){ box.innerHTML = suggestHTML(); return; }
  const res = searchAll(q);
  if(!res.length){
    box.innerHTML = '<div class="sc-empty"><p>Nada encontrado para <b>'+escHtml(q)+'</b>.</p>'
      + '<p class="sc-hint">Tente descrever em palavras suas: "não consigo focar", "acordo cansado", "por que esqueço".</p></div>'
      + suggestHTML();
    return;
  }
  const groups = {conceito:[], termo:[], topo:[], aula:[], modulo:[]};
  res.forEach(r=>{ if(groups[r.e.kind]) groups[r.e.kind].push(r.e); });
  const titles = {conceito:'Conceitos', termo:'Termos', topo:'Mapa Topo', aula:'Aulas', modulo:'Módulos'};
  let html = '';
  ['conceito','termo','topo','aula','modulo'].forEach(k=>{
    const g = groups[k];
    if(!g.length) return;
    html += '<div class="sc-group"><div class="sc-gh">'+titles[k]+'</div>';
    g.slice(0, k === 'conceito' ? 10 : 8).forEach(e=>{
      html += '<button type="button" class="sc-item" onclick="'+openerFor(e)+'">'
        + '<span class="sc-il">'+e.label+'</span><span class="sc-is">'+e.sub+'</span></button>';
    });
    html += '</div>';
  });
  box.innerHTML = html;
}
function openerFor(e){
  if(e.kind === 'conceito') return "openConcept('"+esc1(e.key)+"')";
  if(e.kind === 'termo')    return "fromSearchTerm('"+esc1(e.key)+"')";
  if(e.kind === 'topo')     return "fromSearchTopo('"+esc1(e.key)+"')";
  if(e.kind === 'modulo')   return "fromSearchModule("+e.key+",-1)";
  const p = e.key.split(':');
  return "fromSearchModule("+p[0]+","+p[1]+")";
}

function suggestHTML(){
  const cats = ['estado','condicao','substancia','desempenho','fenomeno'];
  let html = '<div class="sc-sug"><p class="sc-hint">Busque por nome técnico ou por como você sente. Ex.: <b>ansiedade</b>, <b>não consigo focar</b>, <b>tálamo</b>, <b>por que esqueço</b>.</p>';
  cats.forEach(c=>{
    const ks = Object.keys(CONCEPTS).filter(k=>CONCEPTS[k].cat === c);
    if(!ks.length) return;
    html += '<div class="sc-group"><div class="sc-gh">'+(CAT_LABEL[c]||c)+'</div><div class="sc-chips">';
    ks.forEach(k=>{ html += scChip(CONCEPTS[k].n, "openConcept('"+esc1(k)+"')"); });
    html += '</div></div>';
  });
  return html + '</div>';
}

function openConcept(key){
  const c = CONCEPTS[key];
  const box = document.getElementById('sc-body');
  if(!c || !box) return;
  let html = '<button type="button" class="sc-back" onclick="backToSearch()">&larr; Voltar à busca</button>';
  html += '<div class="sc-detail"><div class="sc-kick">'+(CAT_LABEL[c.cat]||'')+'</div>';
  html += '<h3>'+c.n+'</h3>';
  if(c.q) html += '<p class="sc-q">'+c.q+'</p>';
  html += '<div class="sc-a">'+c.a+'</div>';
  if(c.nota){
    html += '<div class="sc-nota">Conteúdo educativo sobre mecanismos — não serve para diagnóstico nem substitui avaliação profissional.</div>';
  }
  const ts = (c.t||[]).filter(t=>GLOSSARY[t]);
  if(ts.length){
    html += '<div class="sc-sec"><div class="sc-sh">Termos ligados</div><div class="sc-chips">';
    ts.forEach(t=>{ html += scChip(t, "fromSearchTerm('"+esc1(t)+"')", TERM_FIG[t] ? 'hasfig' : ''); });
    html += '</div></div>';
  }
  if((c.k||[]).length){
    html += '<div class="sc-sec"><div class="sc-sh">No mapa Topo</div><div class="sc-chips">';
    (c.k||[]).forEach(k=>{
      let nm = k; try{ if(LINKS[k]) nm = LINKS[k].n; }catch(e){}
      html += scChip(nm, "fromSearchTopo('"+esc1(k)+"')", 'topo');
    });
    html += '</div></div>';
  }
  if((c.m||[]).length){
    html += '<div class="sc-sec"><div class="sc-sh">Onde estudar isso</div>';
    (c.m||[]).forEach(a=>{
      const i = MODULES.findIndex(x=>x.id === a.m);
      if(i < 0) return;
      const mm = MODULES[i];
      const lt = (mm.lessons && mm.lessons[a.l]) ? mm.lessons[a.l].t : '';
      html += '<button type="button" class="sc-lesson" onclick="fromSearchModule('+i+','+a.l+')">'
        + '<span class="sc-ln">Módulo '+mm.n+' · aula '+(a.l+1)+'</span><span class="sc-lt">'+lt+'</span></button>';
    });
    html += '</div>';
  }
  html += '</div>';
  box.innerHTML = html;
  box.scrollTop = 0;
}
function backToSearch(){
  const inp = document.getElementById('sc-input');
  renderSearch(inp ? inp.value : '');
}
function fromSearchTerm(t){
  /* Fecha a busca antes de abrir o termo, como fazem fromSearchTopo e
     fromSearchModule. Sem isso o modal do termo abre atras da busca: os dois
     usam .modal-back com o mesmo z-index, e #search-modal vem depois de
     #term-modal no documento, entao pinta por cima. O aluno via a busca
     continuar na tela, achava que o toque nao pegou, fechava e clicava de
     novo — quando na verdade o conteudo ja estava aberto, escondido atras. */
  if(typeof openTermModal !== 'function') return;
  closeSearch();
  setTimeout(()=>openTermModal(t, null), 60);
}
function fromSearchTopo(k){
  try{ if(LINKS[k] && typeof openLink === 'function'){ closeSearch(); setTimeout(()=>openLink(k, null), 60); } }catch(e){}
}
function fromSearchModule(i, l){
  closeSearch();
  setTimeout(()=>{
    if(typeof openModule === 'function') openModule(i);
    if(l >= 0) setTimeout(()=>{
      const el = document.getElementById('lesson-'+l);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 140);
  }, 60);
}

/* ---------- 7. ligação de termos dentro da janela de termo ---------- */
function renderTermRelations(key){
  const host = document.getElementById('tm-rel');
  if(!host) return;
  const rel = relatedFor(key);
  const cps = conceptsForTerm(key);
  if(!rel.length && !cps.length){ host.innerHTML = ''; host.hidden = true; return; }
  let html = '';
  if(rel.length){
    html += '<div class="sc-sh">Termos ligados</div><div class="sc-chips">';
    rel.forEach(t=>{ html += scChip(t, "openTermModal('"+esc1(t)+"',null)", TERM_FIG[t] ? 'hasfig' : ''); });
    html += '</div>';
  }
  if(cps.length){
    html += '<div class="sc-sh" style="margin-top:12px">Aparece em</div><div class="sc-chips">';
    cps.forEach(k=>{ html += scChip(CONCEPTS[k].n, "fromTermToConcept('"+esc1(k)+"')", 'topo'); });
    html += '</div>';
  }
  host.innerHTML = html;
  host.hidden = false;
}
function fromTermToConcept(k){
  if(typeof closeTermModal === 'function') closeTermModal();
  setTimeout(()=>{ openSearch(''); setTimeout(()=>openConcept(k), 60); }, 80);
}

/* ---------- 8. wiring ---------- */
(function wireSearch(){
  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function(){
    const inp = document.getElementById('sc-input');
    if(inp){
      let t = null;
      inp.addEventListener('input', function(){
        clearTimeout(t);
        t = setTimeout(()=>renderSearch(inp.value), 120);
      });
      inp.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeSearch(); });
    }
    const back = document.getElementById('search-modal');
    if(back) back.addEventListener('click', function(e){ if(e.target === back) closeSearch(); });
    document.addEventListener('keydown', function(e){
      if(e.key === '/' && !/^(INPUT|TEXTAREA)$/.test((e.target.tagName||''))){
        e.preventDefault(); openSearch('');
      }
    });
  });
})();


let GLOSS_RE=null, GLOSS_MAP=null;
function buildGloss(){
  const keys=Object.keys(GLOSSARY).sort((a,b)=>b.length-a.length);
  GLOSS_MAP={};
  keys.forEach(k=>{ GLOSS_MAP[k.toLowerCase()]=k; });
  const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  GLOSS_RE=new RegExp('('+keys.map(esc).join('|')+')','giu');
}

// Torna cada termo técnico tocável, na 1a vez que ele aparece no bloco.
// Percorre apenas nós de TEXTO, então nunca corrompe as tags do HTML.
function glossify(root){
  if(!root || root.getAttribute('data-glossed')==='1') return;
  if(!GLOSS_RE) buildGloss();
  const LETTER=/[0-9A-Za-zÀ-ÿ]/;
  const seen=new Set();
  const walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes=[]; let node;
  while(node=walker.nextNode()){
    if(!node.nodeValue || !node.nodeValue.trim()) continue;
    const p=node.parentElement;
    if(p && (p.classList.contains('gterm') || p.closest('.glossdef'))) continue;
    nodes.push(node);
  }
  nodes.forEach(n=>{
    const text=n.nodeValue;
    GLOSS_RE.lastIndex=0;
    let m, frag=null, last=0;
    while((m=GLOSS_RE.exec(text))){
      const key=GLOSS_MAP[m[0].toLowerCase()];
      if(!key || seen.has(key)) continue;
      const s0=m.index, e0=m.index+m[0].length;
      const before = s0>0 ? text[s0-1] : '';
      const after  = e0<text.length ? text[e0] : '';
      if((before && LETTER.test(before)) || (after && LETTER.test(after))) continue; // palavra inteira
      if(!frag) frag=document.createDocumentFragment();
      if(s0>last) frag.appendChild(document.createTextNode(text.slice(last,s0)));
      const b=document.createElement('button');
      b.type='button';
      b.className='gterm';
      b.setAttribute('aria-expanded','false');
      b.setAttribute('data-g',key);
      if(typeof figFor==='function' && figFor(key)) b.classList.add('hasfig');
      b.setAttribute('aria-label',m[0]+(figFor(key)?': ver definição e ilustração':': ver o que significa'));
      b.textContent=m[0];
      b.addEventListener('click', function(e){ e.stopPropagation(); toggleGloss(b,key); });
      frag.appendChild(b);
      last=e0; seen.add(key);
    }
    if(frag){
      if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      n.parentNode.replaceChild(frag,n);
    }
  });
  root.setAttribute('data-glossed','1');
}

/* =====================================================================
   JANELA DO COMPONENTE + VISUALIZADOR COM ZOOM
   ===================================================================== */
let tmOpener = null;

function toggleGloss(btn, key){   // agora abre a janela flutuante
  openTermModal(key, btn);
}


/* ---------- destacar no diagrama a parte que o termo descreve ----------
   Antes, tocar num termo abria o mapa do modulo sem apontar nada.
   Aqui cada termo ganha um no correspondente, e o mesmo destaque
   usado ao tocar num no passa a valer tambem ao tocar num termo. */
const TERM_NODE_EXTRA = {
  /* 04 decisao */
  'pré-frontal ventromedial':'decisao:avaliador',
  'hipótese do marcador somático':'decisao:avaliador',
  'aprendizagem reversa':'decisao:retorno',
  'desconto hiperbólico':'decisao:desconto',
  'custo de esforço':'decisao:desconto',
  'córtex cingulado anterior':'decisao:desconto',
  'aversão à perda':'decisao:desconto',
  'dispositivo de compromisso':'decisao:desconto',
  /* 07 autonomo */
  'nervo vago':'autonomo:craniosacral',
  'gânglio autonômico':'autonomo:cadeia',
  'sistema nervoso autônomo':'autonomo:alvos',
  'variabilidade da frequência cardíaca':'autonomo:alvos',
  'interocepção':'autonomo:enterico',
  /* 01 neuronio */
  'neuromoduladores':'neuronio:terminais',
  'células gliais':'neuronio:mielina',
  /* 02 plasticidade */
  'PKA':'plasticidade:pos',
  'CREB':'plasticidade:pos',
  /* 03 recompensa */
  'dopamina':'recompensa:vta',
  'estriado ventral':'recompensa:accumbens',
  'estriado dorsal':'recompensa:via',
  /* 05 atencao */
  'top-down':'atencao:pfc',
  'pré-frontal dorsolateral':'atencao:pfc',
  'bottom-up':'atencao:parietal',
  /* 06 emocao */
  'via rápida':'emocao:amigdala',
  'via lenta':'emocao:amigdala',
  'retroalimentação negativa':'emocao:cortisol',
  /* 08 sono */
  'Processo S':'sono:ciclo',
  'adenosina':'sono:ciclo',
  'núcleo supraquiasmático':'sono:ciclo',
  'fusos':'sono:profundo',
  'oscilações lentas':'sono:profundo',
  'replay':'sono:profundo',
  'ripples':'sono:profundo',
  'homeostase sináptica':'sono:profundo',
  /* 09 neuroanatomia */
  'bulbo':'neuroanatomia:tronco',
  'mesencéfalo':'neuroanatomia:tronco',
  /* 10 sensorial */
  'nociceptores':'sensorial:receptores',
  'teoria da comporta':'sensorial:receptores',
  'modulação descendente':'sensorial:somatossensorial',
  'endorfinas':'sensorial:somatossensorial',
  /* 11 motor */
  'código de população':'motor:motor',
  'geradores de padrão':'motor:medula',
  /* 13 linguagem */
  'afasia de condução':'linguagem:arqueado',
  /* 14 clinica */
  'monoaminas':'clinica:quimico',
  'núcleos da rafe':'clinica:quimico',
  'serotonina':'clinica:quimico',
  /* 15 farmacologia */
  'agonistas parciais':'farmacologia:agonista',
  'benzodiazepínicos':'farmacologia:agonista',
  /* 16 metodos */
  'MEG':'metodos:eeg'
};


/* ---------- Fase 5 · termos essenciais auditados ---------- */
Object.assign(GLOSSARY, {"dendritos":"Ramos do neurônio que recebem sinais de outras células e os conduzem em direção ao corpo celular.","corpo celular":"Parte do neurônio que mantém a célula e integra as entradas recebidas antes do disparo. Também é chamado de soma.","axônio":"Prolongamento que conduz o potencial de ação do corpo celular até os terminais axônicos.","despolarização":"Mudança elétrica em que o interior da membrana fica menos negativo; no potencial de ação, ocorre principalmente com a entrada de sódio.","potencial de ação":"Sinal elétrico tudo-ou-nada produzido quando a membrana cruza o limiar e conduzido pelo axônio.","sinapse":"Região de comunicação entre células. Na sinapse química, neurotransmissores atravessam a fenda e ativam receptores.","neurotransmissores":"Moléculas liberadas por um neurônio que atravessam a fenda sináptica e alteram a célula seguinte.","receptores":"Proteínas que reconhecem sinais químicos e transformam essa ligação em uma mudança na célula.","vesículas":"Pequenas bolsas membranosas que armazenam neurotransmissores e os liberam quando o terminal é ativado.","neuroplasticidade":"Capacidade do sistema nervoso de modificar conexões e circuitos em resposta à experiência e ao uso.","Hebb":"Princípio segundo o qual a atividade repetida e coordenada entre neurônios tende a fortalecer a conexão entre eles.","potenciação de longo prazo":"Fortalecimento duradouro da transmissão sináptica após atividade coordenada; também chamada LTP.","memória de curto prazo":"Mudança temporária que pode depender da modificação de proteínas já existentes, sem construir novas conexões.","memória de longo prazo":"Mudança duradoura que envolve expressão gênica, novas proteínas e alterações estruturais nas conexões.","expressão gênica":"Uso da informação dos genes para produzir moléculas; no módulo, participa da estabilização de memórias duradouras.","síntese de proteínas":"Produção de novas proteínas pela célula, necessária para estabilizar mudanças estruturais de longo prazo.","consolidação sistêmica":"Reorganização gradual pela qual memórias inicialmente dependentes do hipocampo tornam-se estabilizadas em redes corticais.","hábito":"Sequência de comportamento que, com repetição, passa a ser disparada por pistas e exige menos controle deliberado.","atenção":"Seleção e priorização de informação limitada diante de muitos estímulos e objetivos concorrentes.","memória de trabalho":"Sistema temporário que mantém e manipula poucas informações enquanto uma tarefa está sendo executada.","controle executivo":"Conjunto de operações que mantém metas, resolve conflitos e inibe respostas concorrentes.","alternância rápida":"Troca repetida entre tarefas que exige reconfigurar a meta ativa e produz custo de tempo e precisão.","Yerkes-Dodson":"Relação em U invertido entre ativação e desempenho: pouca ou muita ativação prejudica, e uma faixa intermediária tende a favorecer.","memória declarativa":"Memória de fatos e acontecimentos que depende especialmente do hipocampo durante a formação inicial.","sono NREM":"Conjunto de estágios não REM, incluindo o sono profundo, com padrões que participam de consolidação e recalibração.","sono REM":"Estado de sono com atividade cerebral característica e maior presença nas últimas horas da noite.","pressão do sono":"Necessidade homeostática de dormir que cresce durante a vigília, associada ao acúmulo de adenosina.","retina":"Camada sensorial do olho que contém fotorreceptores e já inicia a transformação da luz em sinais neurais.","cóclea":"Estrutura espiral do ouvido interno em que diferentes posições respondem melhor a diferentes frequências sonoras.","tonotopia":"Organização espacial por frequência sonora: tons diferentes correspondem a posições diferentes na cóclea e no sistema auditivo.","homúnculo":"Mapa corporal distorcido no córtex, em que o espaço representa a precisão sensorial ou motora e não o tamanho físico.","dor":"Experiência construída pelo sistema nervoso a partir de sinais de dano, contexto e modulação descendente.","neurônio motor inferior":"Célula que leva o comando final da medula ou do tronco encefálico até o músculo.","trato corticoespinhal":"Via descendente que leva comandos do córtex motor em direção à medula e cruza principalmente no bulbo.","junção neuromuscular":"Sinapse entre o neurônio motor e a fibra muscular, onde a acetilcolina inicia a contração.","neurogênese":"Produção de novos neurônios a partir de células precursoras durante o desenvolvimento.","sinaptogênese":"Formação de novas conexões sinápticas entre neurônios.","poda sináptica":"Refinamento em que conexões pouco estabilizadas são eliminadas e circuitos usados são preservados.","plasticidade":"Capacidade de circuitos neurais mudarem com atividade, experiência e aprendizagem.","afasia":"Alteração adquirida da linguagem causada por lesão em regiões ou conexões da rede linguística.","dissociação":"Situação em que uma capacidade é perdida enquanto outra permanece, ajudando a separar funções e redes.","leitura":"Habilidade cultural que reaproveita circuitos visuais de reconhecimento de formas e precisa ser ensinada.","lesão":"Alteração ou perda de tecido que permite observar quais funções mudam quando uma parte da rede é comprometida.","doenças neurodegenerativas":"Condições progressivas em que células e conexões se deterioram, com sintomas dependentes das regiões inicialmente afetadas.","epilepsia":"Condição em que redes podem apresentar atividade elétrica anormalmente sincronizada.","AVC":"Alteração vascular causada por obstrução ou ruptura de um vaso, que compromete o tecido dependente daquele fluxo.","estimulantes":"Substâncias que, no módulo, aumentam sinais como dopamina e noradrenalina e elevam alerta e ganho.","depressores":"Substâncias que reduzem excitabilidade, frequentemente reforçando a sinalização inibitória do GABA.","antidepressivos":"Grupo de medicamentos que modifica a neurotransmissão e pode produzir adaptações lentas de receptores e plasticidade.","antipsicóticos":"Grupo de medicamentos que altera a sinalização sináptica; seus efeitos dependem dos receptores e circuitos atingidos.","dependência":"Estado adaptado em que a retirada da substância produz desequilíbrio e sintomas de abstinência.","abstinência":"Estado produzido quando a substância é retirada depois de adaptações do organismo, deixando o sistema temporariamente deslocado.","ISRS":"Antidepressivo que inibe a recaptação de serotonina, aumentando rapidamente sua permanência na fenda.","causalidade":"Relação em que uma manipulação altera o resultado; exige mais do que observar duas coisas juntas.","convergência":"Aumento de confiança quando métodos com limitações diferentes apontam para a mesma conclusão.","replicação":"Repetição independente de um resultado para testar se ele se mantém.","evidência convergente":"Conjunto de resultados obtidos por métodos diferentes que sustentam uma mesma explicação."});
Object.assign(TERM_FIG, {"dendritos":"mod:neuronio","corpo celular":"mod:neuronio","axônio":"mod:neuronio","despolarização":"mod:neuronio","potencial de ação":"mod:neuronio","sinapse":"mod:neuronio","neurotransmissores":"mod:neuronio","receptores":"mod:neuronio","vesículas":"mod:neuronio","neuroplasticidade":"mod:plasticidade","Hebb":"mod:plasticidade","potenciação de longo prazo":"mod:plasticidade","memória de curto prazo":"mod:plasticidade","memória de longo prazo":"mod:plasticidade","expressão gênica":"mod:plasticidade","síntese de proteínas":"mod:plasticidade","consolidação sistêmica":"mod:plasticidade","hábito":"mod:recompensa","atenção":"mod:atencao","memória de trabalho":"mod:atencao","controle executivo":"mod:atencao","alternância rápida":"mod:atencao","Yerkes-Dodson":"mod:emocao","memória declarativa":"mod:sono","sono NREM":"mod:sono","sono REM":"mod:sono","pressão do sono":"mod:sono","retina":"mod:sensorial","cóclea":"mod:sensorial","tonotopia":"mod:sensorial","homúnculo":"mod:sensorial","dor":"mod:sensorial","neurônio motor inferior":"mod:motor","trato corticoespinhal":"mod:motor","junção neuromuscular":"mod:motor","neurogênese":"mod:desenvolvimento","sinaptogênese":"mod:desenvolvimento","poda sináptica":"mod:desenvolvimento","plasticidade":"mod:desenvolvimento","afasia":"mod:linguagem","dissociação":"mod:linguagem","leitura":"mod:linguagem","lesão":"mod:clinica","doenças neurodegenerativas":"mod:clinica","epilepsia":"mod:clinica","AVC":"mod:clinica","estimulantes":"mod:farmacologia","depressores":"mod:farmacologia","antidepressivos":"mod:farmacologia","antipsicóticos":"mod:farmacologia","dependência":"mod:farmacologia","abstinência":"mod:farmacologia","ISRS":"mod:farmacologia","causalidade":"mod:metodos","convergência":"mod:metodos","replicação":"mod:metodos","evidência convergente":"mod:metodos"});
Object.assign(TERM_NODE_EXTRA, {"dendritos":"neuronio:dendritos","corpo celular":"neuronio:soma","axônio":"neuronio:axonio","despolarização":"neuronio:axonio","potencial de ação":"neuronio:axonio","sinapse":"plasticidade:pos","neurotransmissores":"plasticidade:vesiculas","receptores":"plasticidade:receptores","vesículas":"plasticidade:vesiculas","potenciação de longo prazo":"plasticidade:receptores","expressão gênica":"neuronio:nucleo","síntese de proteínas":"neuronio:nucleo","consolidação sistêmica":"plasticidade:hipocampo","hábito":"recompensa:via","memória de trabalho":"atencao:pfc","controle executivo":"atencao:pfc","alternância rápida":"atencao:pfc","memória declarativa":"sono:profundo","sono NREM":"sono:profundo","sono REM":"sono:rem","pressão do sono":"sono:ciclo","retina":"sensorial:visual","cóclea":"sensorial:auditivo","tonotopia":"sensorial:auditivo","homúnculo":"sensorial:somatossensorial","dor":"sensorial:somatossensorial","neurônio motor inferior":"motor:medula","trato corticoespinhal":"motor:medula","junção neuromuscular":"motor:musculo","neurogênese":"desenvolvimento:neurogenese","sinaptogênese":"desenvolvimento:sinaptogenese","poda sináptica":"desenvolvimento:poda","doenças neurodegenerativas":"clinica:degeneracao","epilepsia":"clinica:eletrico","AVC":"clinica:vascular","ISRS":"farmacologia:recaptacao"});

let TERM_NODE = null;
function buildTermNode(){
  TERM_NODE = {};
  const por = function(termo, anat, parte, rotulo){
    const k = String(termo || '').toLowerCase();
    if(!k) return;
    if(!TERM_NODE[k]) TERM_NODE[k] = [];
    if(TERM_NODE[k].some(function(x){ return x.a === anat && x.p === parte; })) return;
    TERM_NODE[k].push({a:anat, p:parte, label:rotulo || termo});
  };
  try{
    // 1) apelidos ja usados pelos nos
    if(typeof ANAT_TERM !== 'undefined'){
      Object.keys(ANAT_TERM).forEach(function(k){
        const p = k.split(':');
        if(p.length === 2) por(ANAT_TERM[k], p[0], p[1]);
      });
    }
    // 2) rotulo do no que coincide com termo do glossario
    if(typeof ANATOMY !== 'undefined'){
      Object.keys(ANATOMY).forEach(function(a){
        (ANATOMY[a].parts || []).forEach(function(pt){ por(pt.label, a, pt.id, pt.label); });
      });
    }
    // 3) o mapa acima
    Object.keys(TERM_NODE_EXTRA).forEach(function(t){
      const p = TERM_NODE_EXTRA[t].split(':');
      if(p.length === 2) por(t, p[0], p[1]);
    });
  }catch(e){}
  return TERM_NODE;
}
/* Termos deste tópico que apontam para uma parte de verdade do diagrama do
   próprio módulo. É a matéria-prima do item de Localização: o mapeamento já
   existia em CONTEXT_TOPIC_TERMS para explicar "onde este termo entra no
   mecanismo", e nunca tinha sido cobrado. Medido: as 168 âncoras resolvem,
   nenhuma quebrada. */
const _locAnchorCache = {};
function locationAnchorsOf(moduleId, lessonIndex){
  const ck = moduleId + '-' + lessonIndex;
  if(_locAnchorCache[ck]) return _locAnchorCache[ck];
  const out = [];
  const A = (typeof ANATOMY!=='undefined' && ANATOMY[moduleId]) || null;
  if(A){
    const idsDeParte = {}; (A.parts||[]).forEach(p=>idsDeParte[p.id] = 1);
    const noSvg = {};
    (String(A.svg||'').match(/data-struct="([^"]+)"/g)||[])
      .forEach(s=>{ noSvg[s.slice(13,-1)] = 1; });
    const mapa = (typeof CONTEXT_TOPIC_TERMS!=='undefined' && CONTEXT_TOPIC_TERMS[moduleId]
                  && CONTEXT_TOPIC_TERMS[moduleId][String(lessonIndex)]) || {};
    if(typeof buildTermNode === 'function' && !TERM_NODE) buildTermNode();
    Object.keys(mapa).forEach(term=>{
      let r = null; try{ r = termNode(term, moduleId); }catch(e){}
      if(r && r.a === moduleId && r.p && idsDeParte[r.p] && noSvg[r.p]) out.push({term:term, part:r.p});
    });
  }
  _locAnchorCache[ck] = out;
  return out;
}

function termNode(key, anatPreferida){
  if(!TERM_NODE) buildTermNode();
  const lista = TERM_NODE[String(key || '').toLowerCase()];
  if(!lista || !lista.length) return null;
  if(anatPreferida){
    for(let i = 0; i < lista.length; i++) if(lista[i].a === anatPreferida) return lista[i];
  }
  return lista[0];
}
function rotuloDoNo(anat, parte){
  try{
    const ps = (ANATOMY[anat] || {}).parts || [];
    for(let i = 0; i < ps.length; i++) if(ps[i].id === parte) return ps[i].label;
  }catch(e){}
  return null;
}

function openTermModal(key, opener){
  const back = document.getElementById('term-modal');
  if(!back) return;
  tmOpener = opener || null;
  document.getElementById('tm-title').textContent = key;
  document.getElementById('tm-def').textContent = GLOSSARY[key] || '';
  const fig = figFor(key);
  const box = document.getElementById('tm-fig');
  if(fig){
    const _fb = document.getElementById('tm-figbox');
    _fb.innerHTML = fig.svg;
    let _cap = fig.caption || '';
    try{
      const _mid = (typeof TERM_FIG !== 'undefined' && TERM_FIG[key] && TERM_FIG[key].indexOf('mod:') === 0) ? TERM_FIG[key].slice(4) : null;
      const _ref = (typeof termNode === 'function') ? termNode(key, _mid) : null;
      const _svg = _fb.querySelector('svg');
      if(_ref && _svg){
        const _alvo = _svg.querySelector('.apart[data-struct="' + _ref.p + '"]');
        if(_alvo){
          _svg.classList.add('hasactive');
          _svg.querySelectorAll('.apart').forEach(function(g){
            g.classList.toggle('active', g.dataset.struct === _ref.p);
          });
          const _rot = rotuloDoNo(_ref.a, _ref.p) || _ref.label;
          if(_rot) _cap = 'Em destaque: ' + _rot + '.';
        }
      }
    }catch(e){}
    document.getElementById('tm-cap').textContent = _cap;
    box.hidden = false;
  } else {
    document.getElementById('tm-figbox').innerHTML = '';
    box.hidden = true;
  }
  try{ renderTermRelations(key); }catch(e){}
  try{ if(typeof renderContextMechanism==='function'){ const _cs=(typeof contextSourceFromOpener==='function')?contextSourceFromOpener(opener):{}; renderContextMechanism({moduleId:_cs.moduleId,lessonIndex:_cs.lessonIndex,term:key,label:key,source:'glossary'}); } }catch(e){}
  back.hidden = false;
  back.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  pushOverlayState('term-modal');
  const x = document.getElementById('tm-close');
  if(x) setTimeout(()=>{ try{ x.focus(); }catch(e){} }, 10);
}

function closeTermModal(fromPop){
  const back = document.getElementById('term-modal');
  if(!back || back.hidden) return;
  back.hidden = true;
  back.setAttribute('aria-hidden','true');
  const mech = document.getElementById('tm-mech');
  if(mech){ mech.innerHTML=''; mech.hidden=true; }
  if(typeof _ctxMechanism !== 'undefined') _ctxMechanism = null;
  if(document.getElementById('fig-zoom').hidden) document.body.style.overflow = '';
  if(tmOpener){ try{ tmOpener.focus({preventScroll:true}); }catch(e){} tmOpener = null; }
  if(fromPop !== true){ try{ history.back(); }catch(e){} }
}

/* ---------- visualizador com zoom ---------- */
let zScale = 1, zX = 0, zY = 0, zDrag = false, zLastX = 0, zLastY = 0, zPinch = 0;

function zApply(){
  const inner = document.getElementById('zoom-inner');
  if(!inner) return;
  zClamp();
  inner.style.transform = 'translate('+zX+'px,'+zY+'px) scale('+zScale+')';
}
function zSet(s, cx, cy){
  const inner = document.getElementById('zoom-inner');
  const st = document.getElementById('zoom-stage');
  if(!inner || !st) return;
  const ns = Math.max(0.6, Math.min(8, s));
  if(cx!=null){
    const r = st.getBoundingClientRect();
    const px = cx - r.left - r.width/2, py = cy - r.top - r.height/2;
    zX = px - (px - zX) * (ns / zScale);
    zY = py - (py - zY) * (ns / zScale);
  }
  zScale = ns;
  zApply();
}
function zClamp(){
  const st = document.getElementById('zoom-stage');
  if(!st) return;
  const r = st.getBoundingClientRect();
  const lim = Math.max(r.width, r.height) * 0.7;   // nunca deixa a figura sumir de vez
  zX = Math.max(-lim, Math.min(lim, zX));
  zY = Math.max(-lim, Math.min(lim, zY));
}

// ajusta a figura para caber na tela, o maior possível
function zFit(){
  const st = document.getElementById('zoom-stage');
  const inner = document.getElementById('zoom-inner');
  if(!st || !inner) return;
  zScale = 1; zX = 0; zY = 0; zApply();
  const visual = inner.querySelector('svg,img');
  if(!visual) return;
  const sr = st.getBoundingClientRect();
  const ir = visual.getBoundingClientRect();
  if(!ir.width || !ir.height || !sr.width || !sr.height) return;
  const s = Math.min((sr.width * 0.98) / ir.width, (sr.height * 0.92) / ir.height);
  zScale = Math.max(1, Math.min(4, s));
  zApply();
}

function zReset(){ zFit(); }

let zmOpener = null;
function openZoomMarkup(title, markup, opener){
  if(!markup) return;
  zmOpener = opener || document.getElementById('tm-zoombtn') || null;
  document.getElementById('zoom-title').textContent = title || 'Ilustração';
  document.getElementById('zoom-inner').innerHTML = markup;
  const back = document.getElementById('fig-zoom');
  back.hidden = false;
  back.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  pushOverlayState('fig-zoom');
  const visual=document.querySelector('#zoom-inner img');
  if(visual&&!visual.complete) visual.addEventListener('load',()=>requestAnimationFrame(zFit),{once:true});
  requestAnimationFrame(zFit);
  const c = document.getElementById('zoom-close');
  if(c) setTimeout(()=>{ try{ c.focus(); }catch(e){} }, 10);
}
function openZoom(key, opener){
  const fig = figFor(key);
  if(!fig || !fig.svg) return;   // nunca abre em branco
  openZoomMarkup(fig.title || key, fig.svg, opener);
}
function closeZoom(fromPop){
  const back = document.getElementById('fig-zoom');
  if(!back || back.hidden) return;
  back.hidden = true;
  back.setAttribute('aria-hidden','true');
  if(document.getElementById('term-modal').hidden) document.body.style.overflow = '';
  if(zmOpener){ try{ zmOpener.focus({preventScroll:true}); }catch(e){} zmOpener = null; }
  if(fromPop !== true){ try{ history.back(); }catch(e){} }
}

function wireFigureUI(){
  const back = document.getElementById('term-modal');
  const zback = document.getElementById('fig-zoom');
  if(!back || !zback) return;

  // fechar tocando FORA do cartão
  back.addEventListener('click', e => { if(e.target === back) closeTermModal(); });
  document.getElementById('tm-close').addEventListener('click', closeTermModal);

  // abrir o zoom pela figura ou pelo botão
  const openIt = () => openZoom(document.getElementById('tm-title').textContent);
  document.getElementById('tm-zoombtn').addEventListener('click', openIt);
  document.getElementById('tm-figbox').addEventListener('click', e => {
    if(e.target.closest('.apart')) return; // clique numa estrutura → info, não zoom
    openIt();
  });

  document.getElementById('zoom-close').addEventListener('click', closeZoom);
  document.getElementById('zoom-in').addEventListener('click', () => zSet(zScale * 1.4));
  document.getElementById('zoom-out').addEventListener('click', () => zSet(zScale / 1.4));
  document.getElementById('zoom-reset').addEventListener('click', zReset);
  zback.addEventListener('click', e => { if(e.target === zback) closeZoom(); });

  const stage = document.getElementById('zoom-stage');

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    zSet(zScale * (e.deltaY < 0 ? 1.12 : 1/1.12), e.clientX, e.clientY);
  }, {passive:false});

  stage.addEventListener('mousedown', e => { zDrag = true; zLastX = e.clientX; zLastY = e.clientY; });
  window.addEventListener('mousemove', e => {
    if(!zDrag) return;
    zX += e.clientX - zLastX; zY += e.clientY - zLastY;
    zLastX = e.clientX; zLastY = e.clientY; zApply();
  });
  window.addEventListener('mouseup', () => { zDrag = false; });

  stage.addEventListener('touchstart', e => {
    if(e.touches.length === 1){
      zDrag = true; zLastX = e.touches[0].clientX; zLastY = e.touches[0].clientY;
    } else if(e.touches.length === 2){
      zDrag = false;
      zPinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, {passive:false});

  stage.addEventListener('touchmove', e => {
    e.preventDefault();
    if(e.touches.length === 2 && zPinch){
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const cx = (e.touches[0].clientX + e.touches[1].clientX)/2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY)/2;
      if(zPinch > 0) zSet(zScale * (d / zPinch), cx, cy);
      zPinch = d;
    } else if(e.touches.length === 1 && zDrag){
      zX += e.touches[0].clientX - zLastX;
      zY += e.touches[0].clientY - zLastY;
      zLastX = e.touches[0].clientX; zLastY = e.touches[0].clientY;
      zApply();
    }
  }, {passive:false});

  stage.addEventListener('touchend', e => {
    if(e.touches.length < 2) zPinch = 0;
    if(e.touches.length === 0) zDrag = false;
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      if(!zback.hidden) closeZoom();
      else if(!back.hidden) closeTermModal();
    }
    if(!zback.hidden){
      if(e.key === '+' || e.key === '=') zSet(zScale * 1.3);
      if(e.key === '-') zSet(zScale / 1.3);
      if(e.key === '0') zReset();
    }
  });
}

/* =====================================================================
   MODO PROFUNDO — trocar RECONHECER por EXPLICAR
   1) as alternativas ficam escondidas até você responder de cabeça
   2) depois do feedback, você se auto-avalia: eu explicaria isso sozinho?
   3) é essa nota — não a múltipla escolha — que move a revisão espaçada
   ===================================================================== */
const RATE_VAL = { clear:1, partial:0.5, none:0 };
const RATE_NOTE = {
  clear:  'Você explicaria sozinho. A revisão vai espaçar esse tópico.',
  partial:'Falta uma peça. Esse tópico volta cedo na revisão.',
  none:   'Você reconheceu, mas não explicaria. A revisão vai insistir nele.'
};

function deepOn(){ return state.deepMode !== false; }

function thinkHTML(scope){
  return `<div class="think" id="${scope}-think">
    <div class="think-k">Pense primeiro</div>
    <p>Responda de cabeça, antes de ver as alternativas — em voz alta funciona melhor.
       Reconhecer é fácil; <b>explicar</b> é o que fixa.</p>
    <button class="think-go" onclick="revealOpts('${scope}')">Já pensei · ver as alternativas</button>
  </div>`;
}

function revealOpts(scope){
  const think = document.getElementById(scope+'-think');
  const opts  = document.getElementById(scope+'-opts');
  if(think) think.remove();
  if(opts){
    opts.classList.remove('veiled');
    const b = opts.querySelector('button');
    if(b) try{ b.focus(); }catch(e){}
  }
}

function selfRateHTML(scope, key, nextFn, nextLabel){
  return `<div class="selfrate" id="${scope}-sr">
      <div class="sr-q">Você teria <b>explicado</b> isso sozinho, sem as alternativas?</div>
      <div class="sr-btns">
        <button class="sr sr-1" onclick="selfRate('${scope}','${key}','clear')">Sim, com clareza</button>
        <button class="sr sr-2" onclick="selfRate('${scope}','${key}','partial')">Faltou uma peça</button>
        <button class="sr sr-3" onclick="selfRate('${scope}','${key}','none')">Não — só reconheci</button>
      </div>
    </div>
    <div id="${scope}-next" data-fn="${nextFn}" data-label="${nextLabel}"></div>`;
}

function selfRate(scope, key, val){
  if(!state.selfRate) state.selfRate = {};
  state.selfRate[key] = val;
  if(typeof recordSelfRateEvidence==='function') recordSelfRateEvidence(key,val);
  saveNow();
  const box = document.getElementById(scope+'-sr');
  if(box){
    box.querySelectorAll('button.sr').forEach(b=>{ b.disabled=true; });
    const chosen = box.querySelector('.sr-'+(val==='clear'?1:val==='partial'?2:3));
    if(chosen) chosen.classList.add('picked');
    if(!box.querySelector('.sr-note')){
      const n=document.createElement('div');
      n.className='sr-note'; n.setAttribute('role','status');
      n.textContent=RATE_NOTE[val];
      box.appendChild(n);
    }
  }
  const nx = document.getElementById(scope+'-next');
  if(nx && nx.dataset.fn && !nx.innerHTML){
    nx.innerHTML = `<div class="fbnav"><button class="bigbtn" onclick="${nx.dataset.fn}()">${nx.dataset.label}</button></div>`;
    const b=nx.querySelector('button'); if(b) try{ b.focus(); }catch(e){}
  }
  renderHeader();
}

// nota de EXPLICAÇÃO (0..1) sobre tudo que já foi auto-avaliado
function toggleDeepMode(){
  state.deepMode = !deepOn();
  saveNow();
  renderDashboard();
  const el=document.getElementById('bk-status'); if(el) el.textContent = state.deepMode ? 'Modo profundo ligado.' : 'Modo profundo desligado.';
}

const PREDICT = {
neuronio:[
 {q:"Um neurônio recebe sinais de milhares de outros ao mesmo tempo. O que você acha que ele faz com todos eles?", o:["Soma tudo e toma uma única decisão: dispara ou não","Repassa cada sinal adiante, preservando a informação","Dá mais peso ao sinal que chegar mais forte"], c:0,
  after:"Ele soma. Todas as entradas se somam no corpo celular e existe um único veredito. É essa soma que faz do neurônio uma unidade de DECISÃO, e não um fio que só transmite."},
 {q:"Se um estímulo for duas vezes mais forte que o necessário, o que acontece com o disparo?", o:["O disparo sai proporcionalmente maior e mais forte","O disparo viaja mais rápido ao longo do axônio","O disparo é sempre igual, mas acontece mais vezes"], c:2,
  after:"O disparo é tudo-ou-nada: sempre do mesmo tamanho. A intensidade é codificada na FREQUÊNCIA, não na amplitude. Sinal forte quer dizer mais disparos por segundo."},
 {q:"Entre dois neurônios existe um vão. Como o sinal elétrico atravessa esse espaço vazio?", o:["A corrente elétrica salta o vão, como uma faísca","Ele vira química: uma substância atravessa o vão","As membranas se tocam e o sinal passa direto"], c:1,
  after:"Vira química. O elétrico chega, o cálcio entra, bolsinhas despejam neurotransmissor na fenda. Essa conversão é o que torna a sinapse AJUSTÁVEL — e é por isso que quase toda droga age exatamente aqui."},
 {q:"A dopamina mexe com motivação, foco e movimento ao mesmo tempo. Como uma só substância faz tanta coisa?", o:["Ela é a mais rápida e chega às regiões mais distantes do cérebro","Cada região do cérebro fabrica a sua própria dopamina","Ela não entrega mensagem: ajusta o tom de redes inteiras"], c:2,
  after:"Ela MODULA. Glutamato e GABA entregam a mensagem ponto a ponto; os neuromoduladores mudam o clima de redes inteiras. Por isso um só ajuste reverbera em várias funções ao mesmo tempo."}
],
plasticidade:[
 {q:"Você repete um movimento mil vezes. O que muda fisicamente no seu cérebro?", o:["Nascem neurônios novos, dedicados exclusivamente àquela tarefa","As conexões entre os neurônios envolvidos ficam mais fortes","Nada muda de estrutura: a memória apenas guarda a repetição"], c:1,
  after:"As conexões mudam. Repetir não arquiva um dado — esculpe sinapses. O circuito usado engorda; o abandonado é podado. Aprender é uma obra física."},
 {q:"Como um neurônio sabe que deve fortalecer justamente aquela conexão, e não outra qualquer?", o:["Fortalece toda conexão que estiver ativa naquele instante","Um sinal químico central marca quais devem mudar","Só fortalece quando dois sinais coincidem no tempo"], c:2,
  after:"Coincidência. O receptor NMDA só abre quando chega glutamato E a célula já está despolarizada — um detector de coincidência. É esse E que separa APRENDER de apenas ser estimulado."},
 {q:"Uma memória de segundos e uma memória de anos usam o mesmo mecanismo, só que mais forte?", o:["Não: a de longo prazo exige construir proteínas novas","Sim: é o mesmo processo, apenas mais intenso e repetido","Não: a de longo prazo usa neurônios diferentes dos outros"], c:0,
  after:"São processos diferentes. A curta ajusta o que já existe; a longa liga genes e constrói estrutura nova. É por isso que consolidar exige TEMPO: proteína não se fabrica em segundos."},
 {q:"Você tem 3 horas para estudar. Melhor usar tudo hoje ou 1 hora em três dias?", o:["Tudo hoje: o assunto fica fresco e bem conectado","Espalhado: o mesmo tempo rende muito mais","Dá no mesmo: o que conta é o total de horas"], c:1,
  after:"Espalhado vence com o MESMO tempo total. Cada intervalo deixa a consolidação rodar e cada retomada reabre a maquinaria de proteínas. Estudar tudo de uma vez pula justamente a parte que fixa."}
],
recompensa:[
 {q:"Dopamina é o hormônio do prazer. Você diria que isso está certo?", o:["Sim: é ela que produz a sensação de prazer","Não: ela move o QUERER; o prazer é outro sistema","Em parte: ela gera prazer, mas só de recompensas grandes"], c:1,
  after:"Está errado — e a diferença muda tudo. Dá para QUERER muito algo de que já não se GOSTA. A dopamina move a busca; o prazer é outro circuito. É essa separação que explica o vício."},
 {q:"Um macaco recebe suco. Quando os neurônios de dopamina disparam MAIS forte?", o:["Quando o suco é melhor do que ele esperava","Quando o suco chega, e sempre com a mesma intensidade","Quando ele já aprendeu que o suco está vindo"], c:0,
  after:"Quando é MELHOR que o esperado. A dopamina não sinaliza recompensa: sinaliza SURPRESA — a diferença entre o previsto e o recebido. Se você já esperava, ela quase não dispara."},
 {q:"Por que ver uma barrinha de progresso subir motiva, se a barra em si não vale nada?", o:["Porque o cérebro confunde o símbolo na tela com um prêmio real","Porque ver ordem no esforço reduz a ansiedade da tarefa","Porque cada avanço visível é uma pequena surpresa positiva"], c:2,
  after:"Cada avanço visível é um erro de previsão positivo — o mesmo sinal do suco inesperado. Por isso progresso fatiado e visível sustenta o esforço melhor do que uma meta distante."},
 {q:"Um hábito já formado continua mesmo quando a recompensa some. Como isso é possível?", o:["O controle migrou para um circuito que roda sem o prêmio","A pessoa continua esperando a recompensa, que já não vem mais","O próprio ato virou a recompensa e substituiu a antiga"], c:0,
  after:"O controle migra do estriado ventral (querer) para o dorsal (rotina), e a dopamina se desloca para a DEIXA. O comportamento passa a rodar quase sozinho — por isso hábito é tão difícil de quebrar."}
],
atencao:[
 {q:"Numa festa barulhenta, você ouve seu nome do outro lado da sala. O que isso revela?", o:["Você estava, sem perceber, acompanhando as duas conversas ao mesmo tempo","O ignorado é processado em parte, e o relevante rouba o foco","A atenção não tem limite real; ela só parece ter"], c:1,
  after:"O ignorado não é descartado: é processado o bastante para que algo relevante vença a competição. Atenção não é um filtro perfeito — é uma balança que se inclina."},
 {q:"Quantos itens você consegue segurar na cabeça ao mesmo tempo?", o:["Cerca de 7","Depende do esforço: não há teto fixo","Cerca de 4"], c:2,
  after:"Cerca de 4 blocos — bem menos que os famosos 7. E o truque não é aumentar o teto: é AGRUPAR, enfiando mais informação dentro de cada bloco."},
 {q:"Por que o autocontrole desaba justamente quando você está sem dormir?", o:["Porque sono ruim altera várias redes que mantêm metas, alerta e controle","Porque o corpo está cansado, mas o cérebro segue igual","Porque o sono é o único momento em que regras são armazenadas"], c:0,
  after:"Sono ruim e estresse alteram alerta, memória de trabalho, motivação e controle em várias redes. A meta fica menos estável diante de concorrentes; isso não significa que uma única área desligou nem que existe uma bateria vazia."},
 {q:"Você responde uma mensagem enquanto estuda. O cérebro faz as duas coisas ao mesmo tempo?", o:["Não: ele alterna, e cada troca cobra tempo e erro","Sim, em paralelo, e com um custo pequeno de desempenho","Sim, desde que as duas tarefas sejam bem diferentes"], c:0,
  after:"Ele ALTERNA. Não existe paralelo para tarefas que exigem atenção — existe troca rápida, e cada troca cobra reconfiguração. A conta some sem você ver."}
],
emocao:[
 {q:"Você pula ao ver uma cobra e só depois percebe que era uma mangueira. Por quê?", o:["O cérebro errou de leitura e se corrigiu assim que viu melhor","Existe um atalho que reage antes de o córtex entender","O susto vem do corpo reagindo, e não do cérebro"], c:1,
  after:"São dois caminhos: um atalho rápido e grosseiro até a amígdala, e um lento e preciso pelo córtex. O atalho age primeiro. Errar por excesso de cautela custa muito menos que errar por falta."},
 {q:"O cortisol é o hormônio do estresse. Ele é ruim?", o:["Sim: é sempre prejudicial, tanto ao corpo quanto ao cérebro","Não: ele só é liberado em situações realmente extremas","Não: é útil numa emergência; o problema é ficar alto sempre"], c:2,
  after:"Ele é útil e necessário — em PULSO. O dano vem da cronicidade: quando o freio (a retroalimentação negativa) falha, o cortisol fica alto e passa a corroer hipocampo e pré-frontal."},
 {q:"Estresse zero seria o ideal para o desempenho?", o:["Sim: quanto menos ativação, melhor o desempenho","Não: um pouco melhora; o excesso é que piora","Não: quanto mais pressão, melhor o desempenho"], c:1,
  after:"A curva é um U invertido. De menos entedia, de mais paralisa. O melhor desempenho fica num ponto intermediário — e é por isso que relaxar completamente não é a meta."},
 {q:"Você entende a matéria, mas num dia ruim não rende. O que falhou?", o:["A memória: o conteúdo não tinha sido fixado direito ainda","O estado: ele ajusta o ganho antes de qualquer esforço","A motivação: no fundo, faltou querer o suficiente"], c:1,
  after:"O estado vem ANTES do esforço. A noradrenalina ajusta o ganho do córtex; num estado ruim, o mesmo conhecimento não se acessa igual. Cuidar do estado é parte do estudo, não um extra."}
],
sono:[
 {q:"Dormir é o cérebro se desligando para descansar?", o:["Sim: é uma pausa para o cérebro descansar","Em parte: só o córtex descansa; o resto do cérebro segue ativo","Não: é um turno de trabalho — consolidação e limpeza"], c:2,
  after:"É trabalho ativo. Dormindo, o cérebro consolida memórias, reequilibra sinapses e faz faxina química. Cortar sono não é ganhar horas — é cancelar o turno que fixa o que você estudou."},
 {q:"Dormir 5 horas em vez de 8 corta 3 horas. O que exatamente se perde?", o:["Justamente as fases que mais consolidam memória","Um pouco de cada fase, de forma proporcional","Só o tempo de sonho, que não é essencial ao aprendizado"], c:0,
  after:"Não é proporcional. As últimas horas concentram fases críticas — e é delas que você abre mão. Cortar sono corta SELETIVAMENTE a parte que fixa o estudo."},
 {q:"O cérebro produz resíduos o dia inteiro. Quando ele os remove?", o:["Continuamente, ao longo do dia inteiro, sem hora marcada","Durante o exercício, quando a circulação sobe","Sobretudo durante o sono, quando o fluxo aumenta"], c:2,
  after:"Sobretudo dormindo. O espaço entre as células aumenta e o líquido corre com mais força, levando resíduos embora. É uma faxina que só roda direito com a casa fechada."},
 {q:"Por que às vezes você está exausto e mesmo assim não consegue dormir?", o:["Porque são dois sistemas: a pressão e o relógio interno","Porque cansaço físico e sono não têm relação direta","Porque a ansiedade mantém o cérebro em estado de alerta"], c:0,
  after:"São DOIS processos. A pressão (S) diz o QUANTO você precisa dormir; o relógio (C) diz A QUE HORAS. Quando eles brigam, você fica exausto e acordado. Dormir bem é alinhar os dois."}
],
neuroanatomia:[
 {q:"O córtex é a parte que pensa. Que espessura você imagina que ele tem?", o:["Cerca de 2 centímetros","Uns 2 a 4 milímetros","Ele ocupa quase todo o volume do cérebro"], c:1,
  after:"2 a 4 mm — uma casca fina. Quase todo o volume por baixo é FIAÇÃO. As dobras existem justamente para caber mais casca dentro de um crânio pequeno."},
 {q:"Cada lobo tem sua função. Um AVC num lobo apaga a função dele?", o:["Sim: perde-se, por completo, a função daquele lobo específico","Não: o lobo do outro lado assume a função perdida","Não exatamente: as funções são redes que cruzam lobos"], c:2,
  after:"As funções são REDES, não caixas. Por isso um AVC produz perdas muito específicas: depende de qual pedaço da rede caiu, não apenas de qual lobo foi atingido."},
 {q:"Quase toda informação sensorial passa pelo tálamo antes de chegar ao córtex. Qual sentido fura essa fila?", o:["A visão","O olfato","A audição"], c:1,
  after:"O olfato. Ele chega direto às áreas de emoção e memória, sem escala no tálamo — e é por isso que um cheiro dispara lembrança e emoção com uma força que nenhum outro sentido tem."},
 {q:"Onde nascem a dopamina, a serotonina e a noradrenalina?", o:["No tronco encefálico, uma estrutura pequena e antiga","No córtex, exatamente nas áreas onde elas vão agir","No cerebelo, que concentra a maior parte dos neurônios"], c:0,
  after:"No tronco — pequeno, antigo e insubstituível. De uns poucos núcleos ali saem fibras que irrigam o cérebro inteiro. É a ligação direta com o Módulo 01: os neuromoduladores vêm daqui."}
],
sensorial:[
 {q:"Luz, som e cheiro são fenômenos físicos muito diferentes. Como o cérebro lida com todos?", o:["Cada sentido gera um tipo próprio de sinal elétrico","Todos viram o MESMO tipo de sinal; muda o destino","O cérebro traduz tudo em imagens antes de interpretar"], c:1,
  after:"Tudo vira o mesmo disparo elétrico. O que distingue cheiro de som não é o sinal — é PARA ONDE ele vai. O significado está no endereço, não na mensagem."},
 {q:"Você tem um ponto cego em cada olho e nunca o percebe. Por quê?", o:["Porque o cérebro preenche o buraco com um palpite","Porque um olho cobre o ponto cego do outro","Porque o ponto cego cai fora do campo de visão útil"], c:0,
  after:"O cérebro PREENCHE. A visão não é uma foto recebida: é uma construção, com buracos tapados por inferência. Você não vê o mundo — vê o modelo que o seu cérebro faz dele."},
 {q:"Como o ouvido separa um som grave de um agudo?", o:["Pela intensidade com que a membrana do ouvido vibra","Pela velocidade com que a onda sonora chega ao ouvido","Pelo LUGAR da cóclea que vibra: cada tom, um ponto"], c:2,
  after:"Pelo lugar. A cóclea é rígida na entrada (agudos) e frouxa no fundo (graves), como as teclas de um piano. Frequência vira POSIÇÃO — e é a posição que o cérebro lê."},
 {q:"A mesma lesão pode doer muito ou quase nada, dependendo do momento. Como?", o:["Porque a distração faz a pessoa simplesmente não notar","Porque a dor é construída pelo cérebro, que a modula","Porque o corpo libera a mesma anestesia natural sempre"], c:1,
  after:"A dor não é lida do corpo: é CONSTRUÍDA. O cérebro manda sinais para baixo que abrem ou fecham a comporta. Isso não a torna imaginária — torna-a modulável."}
],
motor:[
 {q:"Você decide pegar um copo. Seu cérebro calcula conscientemente o ângulo de cada músculo?", o:["Sim: o córtex calcula e comanda cada músculo envolvido","Não: o gesto inteiro é um reflexo já pronto na medula","Não: você define a intenção; níveis abaixo resolvem"], c:2,
  after:"Você define o QUÊ; a hierarquia resolve o COMO. É exatamente isso que libera a sua consciência para pensar em outra coisa enquanto o corpo executa."},
 {q:"Existe no córtex um neurônio que codifica mover para a direita?", o:["Sim: cada direção tem o seu próprio grupo de neurônios","Não: a direção emerge da soma da atividade de muitos","Não: a direção só é definida já na medula espinhal"], c:1,
  after:"A direção não está em nenhum neurônio: emerge da POPULAÇÃO. É um código distribuído — e é esse princípio que permite mover uma prótese lendo muitos neurônios ao mesmo tempo."},
 {q:"No Parkinson falta dopamina e o movimento fica lento. O que a dopamina fazia ali?", o:["Equilibrava um portão entre o siga e o não-siga","Fornecia a energia que o músculo usa para contrair","Disparava o comando de início de cada movimento"], c:0,
  after:"Ela equilibrava um PORTÃO. Há uma via que libera e outra que freia; sem dopamina, o freio vence — daí a lentidão e a rigidez. Movimento é seleção, não só comando."},
 {q:"Um veneno bloqueia os receptores do músculo. O comando do cérebro ainda chega?", o:["Sim: o comando chega, mas o músculo não responde","Não: sem resposta, o cérebro deixa de enviar o comando","Sim, e o músculo responde com ainda mais força"], c:0,
  after:"O comando chega intacto — e não adianta nada. A junção neuromuscular é o último elo; quebrado ele, a intenção fica presa. Por ser um gargalo, é um alvo clássico de venenos e doenças."}
],
desenvolvimento:[
 {q:"No pico da construção do cérebro, quantos neurônios um feto produz por minuto?", o:["Cerca de 5 mil","Cerca de 250 mil","Cerca de 1 milhão"], c:1,
  after:"Cerca de 250 mil por minuto. É uma obra de velocidade brutal — e é justamente por isso que o TIMING é tudo: um erro numa etapa se propaga por tudo o que vem depois."},
 {q:"O córtex tem 6 camadas. Em que ordem elas se formam?", o:["De fora para dentro, empilhando camada sobre camada","De dentro para fora: quem chega depois atravessa","Todas ao mesmo tempo, em paralelo"], c:1,
  after:"De dentro para fora. Cada nova leva ATRAVESSA as anteriores e se instala mais acima, escalando pela glia radial. Se a escalada falha, o neurônio para no lugar errado e o circuito nasce torto."},
 {q:"Uma criança de 2 anos tem MAIS sinapses que um adulto. O que acontece depois?", o:["Elas seguem aumentando até o fim da vida adulta","Boa parte é cortada: o que não é usado, some","Elas param de mudar e ficam como estão"], c:1,
  after:"São CORTADAS. O cérebro é esculpido por remoção, não só por adição — use ou perca. A micróglia literalmente come as sinapses fracas. Aprender é, em parte, deixar morrer o que não serve."},
 {q:"Cobrir um olho saudável de um filhote, no período certo, causa perda permanente da visão daquele olho. Por quê?", o:["Porque o olho fechado se atrofia por falta de uso e luz","Porque o nervo óptico daquele olho acaba morrendo","Porque o CÉREBRO entrega o território ao outro olho"], c:2,
  after:"O olho está intacto — quem muda é o CÉREBRO. Naquela janela, a experiência decide quem fica com o território; depois, a janela fecha. Vale para visão, língua e sotaque."}
],
linguagem:[
 {q:"Broca e Wernicke são as áreas da linguagem. Isso está certo?", o:["Sim: são as duas áreas responsáveis pela linguagem","É uma simplificação: a linguagem é uma rede maior","Não: elas cuidam de memória, e não de linguagem"], c:1,
  after:"É uma simplificação útil, mas insuficiente. Afasias reais quase nunca vêm de uma lesão só na área: vêm de redes conectadas. O nome ficou; a ciência andou."},
 {q:"Uma pessoa entende tudo e fala com fluência, mas não consegue REPETIR uma frase que acabou de ouvir. O que foi lesado?", o:["A área responsável pela compreensão","A área responsável pela fala","O cabo que liga as duas"], c:2,
  after:"O CABO — o fascículo arqueado. Entender e falar estão intactos; o que quebrou foi a passagem entre eles. É uma prova elegante de que a linguagem é uma rede, e não pontos."},
 {q:"Por que os pacientes com afasia foram tão importantes para a ciência?", o:["Porque a afasia é comum e fácil de identificar","Porque perdas diferentes revelam o que cada região faz","Porque mostram que a linguagem fica toda num só lugar"], c:1,
  after:"Porque a DISSOCIAÇÃO é uma ferramenta: se lesar aqui tira A e preserva B, então A e B são separáveis. A doença virou o mapa — foi assim que se desenhou boa parte do cérebro."},
 {q:"A leitura é recente demais na evolução para ter uma área própria herdada. Como o cérebro lê, então?", o:["Reaproveita áreas visuais que já existiam","Criou uma área nova, em poucas gerações","Usa exatamente a mesma área que a fala usa"], c:0,
  after:"REAPROVEITA. A leitura sequestra circuitos visuais de reconhecimento de formas. É tecnologia cultural rodando em hardware antigo — e por isso ela precisa ser ENSINADA, ao contrário da fala."}
],
clinica:[
 {q:"O que a doença cerebral tem de valioso para a ciência?", o:["Nada: a doença apenas atrapalha o estudo do normal","Ela prova o quanto o cérebro é frágil e insubstituível","Ela revela o que cada região faz, pelo que se perde"], c:2,
  after:"Historicamente, a doença FOI o mapa. Ver o que se perde quando um pedaço falha é a forma mais antiga — e ainda uma das mais fortes — de descobrir o que aquele pedaço fazia."},
 {q:"No Alzheimer, por que a memória é a primeira função a ir embora?", o:["Porque a degeneração começa nas regiões da memória","Porque a memória é a função mais frágil do cérebro","Porque a doença ataca primeiro os neurônios mais antigos"], c:0,
  after:"Não é acaso: a degeneração começa no lobo temporal, onde mora o hipocampo. O SINTOMA APONTA O LOCAL — o mesmo princípio da aula anterior, agora usado no consultório."},
 {q:"No AVC os médicos dizem que tempo é cérebro. O que exatamente se perde a cada minuto?", o:["A chance de o paciente voltar a andar e falar","A penumbra: o tecido vivo em volta da área morta","As memórias guardadas na região que está morrendo"], c:1,
  after:"A PENUMBRA. No centro o tecido já morreu, mas em volta há tecido vivo e sob risco. É por ele que se corre. Cada minuto de atraso é penumbra virando núcleo morto."},
 {q:"Se a depressão é uma doença do cérebro, por que não se acha a lesão da depressão num exame?", o:["Porque não é lesão num ponto: é rede desregulada","Porque os exames ainda não têm resolução suficiente","Porque ela não é doença do cérebro, e sim da vida"], c:0,
  after:"Porque a natureza dela é outra. Não é um buraco num lugar — é um sistema desregulado, com muitos genes de efeito pequeno e o ambiente por cima. Ser real e ser localizável não são a mesma coisa."}
],
farmacologia:[
 {q:"Onde quase toda droga psicoativa age?", o:["No DNA, mudando a expressão dos genes","Na sinapse — onde os neurônios conversam","No corpo celular, alterando o metabolismo"], c:1,
  after:"Na SINAPSE. E todas usam poucos truques ali: imitar, bloquear, impedir a recaptação ou impedir a destruição. Entender esses quatro truques é entender quase toda a farmacologia."},
 {q:"A cafeína deixa você alerta. Ela dá energia ao cérebro?", o:["Sim: acelera o metabolismo dos neurônios","Sim: ela repõe parte da energia já gasta","Não: ela apenas BLOQUEIA o sinal de sono"], c:2,
  after:"Ela não dá energia nenhuma. Bloqueia os receptores de adenosina, a substância que se acumula e produz sono. Você não fica descansado: fica com o alarme de cansaço desligado. A dívida continua correndo."},
 {q:"Um antidepressivo eleva a serotonina em horas. Por que a melhora leva semanas?", o:["Porque o efeito real vem de adaptações lentas","Porque a dose leva semanas para se acumular","Porque o corpo precisa aprender a tolerar o remédio"], c:0,
  after:"Essa demora é a maior pista de todas: se bastasse a serotonina subir, melhoraria em um dia. O que trata parece ser o que o cérebro CONSTRÓI depois. O remédio abre a janela; ele não é a janela."},
 {q:"Por que largar uma droga é tão difícil, mesmo quando a pessoa quer muito?", o:["Porque falta força de vontade e disciplina suficiente","Porque o cérebro se remodelou e agora precisa dela","Porque a droga fica anos armazenada no organismo"], c:1,
  after:"O cérebro se ADAPTOU — reduziu receptores para compensar. Sem a droga, o sistema fica abaixo do normal: isso é a abstinência. Não é fraqueza de caráter: é um circuito reconfigurado."}
],
metodos:[
 {q:"Uma área acende na fMRI quando a pessoa sente medo. Isso prova que ela PRODUZ o medo?", o:["Sim: se acende, é porque está produzindo","Sim, desde que acenda em todos os testes","Não: acender é correlação, não causa"], c:2,
  after:"Acender é CORRELAÇÃO. Para provar causa é preciso mexer: lesar, estimular, desligar — e ver o que muda. Essa distinção é a espinha dorsal de toda a neurociência séria."},
 {q:"Existe um método que veja o cérebro com precisão no espaço E no tempo, sem invadir?", o:["Sim: a fMRI moderna já resolve os dois problemas","Não: todo método troca uma coisa pela outra","Sim: o EEG de alta densidade dá conta"], c:1,
  after:"Não existe. Cada método ganha num eixo e perde em outro — espaço, tempo, invasividade. É por isso que a ciência combina métodos: nenhum sozinho vê tudo."},
 {q:"A optogenética revolucionou a área. O que ela permite que antes era impossível?", o:["Ver o cérebro numa resolução muito maior","LIGAR e DESLIGAR tipos específicos de neurônios","Estudar humanos sem qualquer procedimento invasivo"], c:1,
  after:"Ligar e desligar neurônios escolhidos, na hora exata. Isso transforma correlação em CAUSA — e é por isso que ela mudou o campo. Em animais: em humanos, ainda não."},
 {q:"Se nenhum método sozinho prova nada, como a neurociência chega a alguma conclusão?", o:["Por convergência: métodos diferentes, mesma resposta","Escolhendo sempre o método mais confiável de todos","Repetindo o mesmo experimento um grande número de vezes"], c:0,
  after:"Por CONVERGÊNCIA. Um resultado sozinho vale pouco; vários métodos com fraquezas diferentes apontando para a mesma conclusão valem muito. Não se constrói confiança com uma prova, e sim com um cerco."}
]
};

function predKey(mid, idx){ return 'P:'+mid+':'+idx; }
function predOf(mid, idx){ return (PREDICT[mid] && PREDICT[mid][idx]) || null; }
function predAnswered(mid, idx){ return state.predCredit && state.predCredit[predKey(mid,idx)] !== undefined; }

/* A previsão foi escrita como PRÉ-teste: aparece antes do corpo da aula, com o
   texto velado até a resposta, porque é o erro de previsão que abre a janela
   para o conteúdo entrar. Por isso ela não registra evidência ali — ver
   commitPredict. Na revisão, porém, a aula já foi lida, e a mesma pergunta
   passa a ser uma prova legítima de Aplicação. Esta função a converte para o
   formato que a tela de revisão já consome.

   dim:'application' é DECLARADA de propósito: inferQuestionDimension respeita
   q.dim quando existe, então esta é a única questão do app que não depende do
   classificador por regex para saber o que mede. */
function predictAsReviewQuestion(moduleId, lessonIndex){
  const p = predOf(moduleId, lessonIndex);
  if(!p || !Array.isArray(p.o) || !p.o.length) return null;
  return { q:p.q, o:p.o, c:p.c,
           er:p.after, ew:p.after,   // o fechamento serve para acerto e para erro
           lvl:1, dim:'application', _source:'prediction' };
}

/* Banco de perguntas do item de Aplicação. Alterna entre a previsão e as
   mini-questões pela paridade de reps da própria caixa — sem campo novo no
   estado, e determinístico, que é o que torna isso testável. Começa pela
   previsão porque ela é a prova mais forte das duas: pede antecipar o
   comportamento do mecanismo, não reconhecer a alternativa certa. */
function applicationBank(m, lessonIndex, key){
  const pred = predictAsReviewQuestion(m.id, lessonIndex);
  const minis = ((typeof MINI_QUIZZES!=='undefined' && MINI_QUIZZES[m.id] && MINI_QUIZZES[m.id][lessonIndex]) || [])
    .filter(q=>inferQuestionDimension(q,{module:m, lessonIndex:lessonIndex, source:'review'}) === 'application');
  if(!pred) return minis;
  if(!minis.length) return [pred];
  const reps = ((srsDims(key) || {}).application || {}).reps || 0;
  return reps % 2 === 0 ? [pred] : minis;
}

function predVeiled(mid, idx){ return deepOn() && !!predOf(mid,idx) && !predAnswered(mid,idx); }

function predictHTML(mid, idx){
  const p = predOf(mid, idx);
  if(!p || !deepOn()) return '';
  if(predAnswered(mid, idx)) return predVerdictHTML(mid, idx);
  const L = ['A','B','C','D'];
  return `<div class="pred" id="pred-${idx}">
      <div class="pred-k">Antes de ler &middot; raciocine</div>
      <p class="pred-q">${p.q}</p>
      <div class="pred-opts">
        ${p.o.map((t,k)=>`<button class="pbtn" onclick="commitPredict(${idx},${k},event)"><span class="pk">${L[k]}</span><span>${t}</span></button>`).join('')}
      </div>
      <button class="pskip" onclick="commitPredict(${idx},-1,event)">Não faço ideia &mdash; mostrar a aula</button>
      <p class="pred-note">Você ainda não leu isto — e é esse o ponto. Vá com o que já sabe: a diferença entre o seu raciocínio e o que o texto diz é o que fixa a aula.</p>
    </div>`;
}

function predVerdictHTML(mid, idx){
  const p = predOf(mid, idx);
  if(!p) return '';
  const ch = state.predCredit[predKey(mid,idx)];
  const right = (ch === p.c);
  return `<div class="pred done" id="pred-${idx}">
      <div class="pred-k">Seu raciocínio</div>
      ${ch>=0
        ? `<p class="pred-you ${right?'ok':'no'}">${right?'✓ Você chegou lá:':'✗ Você foi por aqui:'} ${p.o[ch]}</p>`
        : `<p class="pred-you skip">Você foi direto para a aula.</p>`}
      ${right ? '' : `<p class="pred-truth">Na verdade: <b>${p.o[p.c]}</b></p>`}
      <p class="pred-after">${p.after}</p>
    </div>`;
}

function commitPredict(idx, k, ev){
  const m = MODULES[currentModule];
  const key = predKey(m.id, idx);
  if(!state.predCredit) state.predCredit = {};
  if(state.predCredit[key] !== undefined) return;
  state.predCredit[key] = k;
  if(k >= 0){ awardXP(XP.predict, ev); } else { saveNow(); }
  const host = document.getElementById('pred-'+idx);
  if(host) host.outerHTML = predVerdictHTML(m.id, idx);
  const nw = document.getElementById('pred-'+idx);
  if(nw){ try{ glossify(nw); }catch(e){} }
  const body = document.getElementById('lbody-'+idx);
  if(body) body.classList.remove('pveil');
}

const CHAIN = {
neuronio:[
 {s:["Milhares de sinapses despejam sinais nos dendritos","Cada sinal empurra a carga interna para cima (excitatório) ou para baixo (inibitório)","Tudo se SOMA num único ponto: o começo do axônio","Se a soma cruza o limiar, dispara","Se não cruza, silêncio — não existe meio-disparo"], h:2,
  hn:"A soma é o cálculo. O neurônio não é um fio que repassa: é um votante que conta os votos UMA vez e decide. Por isso inibição não é ausência de sinal — é voto contrário.",
  w:"E se metade das entradas fosse inibitória?",
  wa:"A soma pode nunca cruzar o limiar, mesmo com milhares de sinais chegando. Silêncio não quer dizer que nada chegou: pode querer dizer que chegou muita coisa e ela se cancelou. É assim que o GABA cala um circuito barulhento."},
 {s:["A soma cruza o limiar","Canais de Na+ dependentes de voltagem abrem","Na+ entra, o interior fica positivo — E ISSO ABRE MAIS CANAIS","O ciclo se alimenta sozinho até o pico: tudo-ou-nada","Mas o canal de Na+ tem um SEGUNDO portão, que a mesma despolarização fecha — só que atrasado","É ele que encerra o ciclo por dentro; então canais de K+ abrem, K+ sai e a carga despenca","Enquanto esses portões não rearmam não há novo disparo: o REFRATÁRIO — e é ele que faz a onda andar só para a frente","A bomba Na+/K+ recarrega o gradiente para o próximo"], h:2,
  hn:"AQUI está o segredo do tudo-ou-nada, e quase nunca contam. A entrada de Na+ abre mais canais de Na+, que deixam entrar mais Na+. É retroalimentação POSITIVA. Uma vez começado, o ciclo vai até o fim sozinho — por isso o disparo não pode ser pela metade. Não é uma regra arbitrária: é a consequência inevitável do ciclo.",
  w:"E se o estímulo for 10 vezes mais forte que o limiar?",
  wa:"O disparo sai EXATAMENTE igual. O ciclo já ia até o fim de qualquer jeito. O que muda é a frequência: mais disparos por segundo. Intensidade vira ritmo, não tamanho."},
 {s:["O potencial de ação chega ao terminal","A despolarização abre canais de Ca2+","Ca2+ entra — e é O CÁLCIO que funde as vesículas","O neurotransmissor cai na fenda","Encaixa nos receptores do outro lado","Ionotrópico: abre um canal na hora. Metabotrópico: dispara uma cascata lenta."], h:2,
  hn:"O cálcio é o TRADUTOR: é ele que converte elétrico em químico. Sem essa conversão não haveria sinapse ajustável — e sem sinapse ajustável não haveria aprendizado. Guarde este íon: ele reaparece no Módulo 02 fazendo exatamente a mesma coisa, agora como sinal de aprendizado.",
  w:"E se você bloquear a entrada de cálcio no terminal?",
  wa:"O potencial de ação chega perfeito e NADA acontece. O sinal morre no terminal. É assim que agem alguns venenos e anestésicos: não desligam o neurônio — cortam a ponte."},
 {s:["Glutamato e GABA entregam a mensagem: rápidos, ponto a ponto","Glutamato excita; GABA inibe","Dopamina, serotonina e noradrenalina vêm de POUCOS núcleos no tronco","Desses núcleos saem fibras que irrigam redes inteiras","Eles não entregam a mensagem: ajustam o GANHO de quem entrega"], h:4,
  hn:"É a diferença entre falar e mudar o volume da sala. Por isso um único neuromodulador afeta foco, humor e movimento ao mesmo tempo: ele não está mandando três mensagens — está mexendo no ajuste de três redes.",
  w:"E se um remédio reforçar o GABA?",
  wa:"Você não apaga uma mensagem específica: reduz a excitabilidade de TUDO. Daí o efeito calmante, sonolento e desinibidor do álcool e dos benzodiazepínicos — os dois reforçam o mesmo freio."}
],
plasticidade:[
 {s:["Um circuito é usado","As sinapses ativas se fortalecem (LTP) e as espinhas crescem","As pouco usadas enfraquecem (LTD)","As muito fracas são marcadas","A micróglia as DEVORA — a poda","Sobra o circuito que a experiência validou"], h:4,
  hn:"A poda é a parte esquecida. Aprender não é só somar: é DELETAR. O que você não usa é ativamente removido, não apenas ignorado. Por isso não praticar não é neutro — é perder.",
  w:"E se você parar de praticar algo que já dominava?",
  wa:"Não some de uma vez, mas as sinapses enfraquecem e entram na fila da poda. É exatamente por isso que a revisão espaçada existe: ela reativa o circuito antes que ele entre nessa fila."},
 {s:["Glutamato chega ao receptor NMDA","Mas o NMDA está TAMPADO por um íon magnésio","O magnésio só sai se a membrana já estiver despolarizada","Logo: só abre com glutamato E célula já ativa","Ca2+ entra","O cálcio ativa a CaMKII, que instala mais receptores AMPA","A sinapse fica permanentemente mais forte"], h:1,
  hn:"AQUI está o detector de coincidência — e quase ninguém conta esta parte. O NMDA tem uma ROLHA de magnésio. Glutamato sozinho não tira a rolha. Despolarização sozinha não abre o canal. Só os DOIS JUNTOS. É uma porta lógica E, feita de um íon. Toda a regra de Hebb sai daqui.",
  w:"E se o magnésio não estivesse lá?",
  wa:"O NMDA abriria com qualquer glutamato. Toda sinapse ativa se fortaleceria, coincidindo ou não — e o cérebro perderia a capacidade de distinguir CAUSA de mera coincidência. Aprender seria impossível."},
 {s:["Estímulo fraco: modifica proteínas que já existem — memória de minutos","Estímulo repetido: o AMPc sobe e SE SUSTENTA","A PKA viaja do terminal até o NÚCLEO","No núcleo, ativa o CREB","O CREB liga genes: novas proteínas, novas sinapses","Agora a memória é ESTRUTURA, não estado"], h:2,
  hn:"A dobradiça é geográfica. Memória curta acontece NA SINAPSE. Memória longa exige um sinal que sobe até o NÚCLEO e volta com material de construção. Essa viagem leva tempo — e é por isso que consolidar não pode ser apressado.",
  w:"E se você bloquear a síntese de proteínas logo depois de aprender?",
  wa:"A memória de curto prazo fica intacta e a de longo prazo NÃO se forma. Você lembra por minutos e depois perde. Foi assim que se provou que são dois processos diferentes, e não um só mais forte."},
 {s:["Você estuda: o CREB liga os genes","A maquinaria de construir proteínas roda — e tem TETO","Repetir imediatamente encontra a fábrica saturada","Esperar deixa a construção terminar","Retomar no limiar do esquecimento REABRE a fábrica","Cada reabertura acrescenta estrutura"], h:2,
  hn:"O motivo do espaçamento não é psicológico: é bioquímico. A maquinaria SATURA. Martelar em cima não constrói mais — bate numa fábrica que já está no limite. O intervalo não é descanso: é o tempo de a fábrica produzir.",
  w:"E se você revisar cedo demais, quando ainda lembra bem?",
  wa:"Quase não adianta. O ganho vem de recuperar no LIMIAR do esquecimento, quando o esforço reengaja a maquinaria. É exatamente por isso que a revisão deste app só promove um tópico quando ele VENCE."}
],
recompensa:[
 {s:["A ATV, no tronco, manda dopamina ao núcleo accumbens e ao pré-frontal","Essa via move a BUSCA: aproximar, perseguir, insistir","O prazer em si vem de outro sistema (opioides)","Normalmente os dois andam juntos","Mas podem se SEPARAR"], h:4,
  hn:"A separação é o ponto inteiro. Querer e gostar são circuitos DIFERENTES. Se fossem o mesmo, o vício seria inexplicável: por que alguém persegue algo de que já não gosta? Porque o querer sobreviveu ao gostar.",
  w:"E se você amplificar só o querer?",
  wa:"É o que a cocaína faz ao inundar o accumbens de dopamina. O querer explode e o gostar não acompanha. Resultado: fissura sem prazer — a assinatura da dependência."},
 {s:["O cérebro mantém uma PREVISÃO do que vem","A recompensa chega","A dopamina calcula: recebido MENOS esperado","Melhor que o esperado: disparo forte","Exatamente o esperado: quase nada","Pior, ou não veio: queda abaixo do basal","Essa diferença É o sinal de aprendizado: atualize a previsão"], h:2,
  hn:"A dopamina não mede recompensa: mede a SUBTRAÇÃO. É um sinal de ERRO, como o de um termostato. Uma vez que você enxerga isso, o resto do módulo cai por gravidade — e você vai reconhecer a mesma ideia no cerebelo, no Módulo 11.",
  w:"E se a recompensa vier sempre igual, por muito tempo?",
  wa:"O erro vai a zero e a dopamina para de disparar na recompensa. Ela MIGRA para a pista que a prevê. Isso é o aprendizado terminando — e o começo de um hábito."},
 {s:["Uma meta distante quase não gera erro de previsão","Um progresso visível é uma pequena surpresa positiva","Cada surpresa positiva é um pulso de dopamina","O pulso marca como valioso o que veio ANTES dele","Fatiar a meta multiplica o número de pulsos"], h:3,
  hn:"O pulso reforça o que veio ANTES. Não é que a barrinha anima: é que ela chega logo depois do esforço e marca aquele esforço como valioso. Feedback atrasado perde essa ligação — por isso uma prova daqui a três meses motiva tão pouco.",
  w:"E se o progresso for invisível?",
  wa:"O esforço acontece e nenhum pulso o marca. O cérebro não tem como saber que aquilo valeu a pena. Tornar o progresso visível não é enfeite motivacional: é fechar o circuito de aprendizado."},
 {s:["No começo: pré-frontal e estriado VENTRAL comandam (meta, valor)","Com a repetição, a dopamina migra da recompensa para a DEIXA","Com ela, o controle migra para o estriado DORSAL","Ali o comportamento vira sequência disparada pelo gatilho","A recompensa deixa de ser necessária para rodar"], h:1,
  hn:"A migração da dopamina CAUSA a migração do controle. A pista passa a valer o que a recompensa valia — e quem responde à pista é o dorsal. Não são dois fatos soltos: é um só. Por isso hábito não se quebra com força de vontade, e sim mudando a DEIXA.",
  w:"E se você remover a recompensa de um hábito já formado?",
  wa:"Ele continua. O gatilho ainda dispara a rotina, porque o dorsal não consulta o valor. É isso que torna um vício tão resistente — e é o MESMO mecanismo que faz um gesto treinado virar automático no Módulo 11."}
],
atencao:[
 {s:["Muitos estímulos chegam ao mesmo tempo","Eles COMPETEM por representação no córtex","O pré-frontal enviesa a disputa a favor do objetivo (top-down)","Estímulos vistosos puxam sozinhos (bottom-up)","Vence quem tiver mais apoio somado"], h:1,
  hn:"Atenção não é um holofote que você aponta: é uma DISPUTA que você influencia. Isso muda tudo — o ignorado não foi bloqueado, foi derrotado. Por isso o seu nome, dito do outro lado da sala, ainda consegue virar o jogo.",
  w:"E se o pré-frontal estiver enfraquecido (sono ruim, estresse)?",
  wa:"O apoio top-down cai e o bottom-up ganha por padrão. Você não fica sem atenção: fica com a atenção entregue a quem gritar mais alto. É a mesma conta, com um dos lados fraco."},
 {s:["Você segura a informação com DISPARO PERSISTENTE no pré-frontal","Manter esse disparo custa energia e é frágil","O teto é de cerca de 4 blocos","Agrupar (chunking) enfia mais conteúdo em cada bloco","Uma interferência sobrescreve o disparo — e a informação some"], h:0,
  hn:"A memória de trabalho não é um LUGAR onde a informação fica: é uma ATIVIDADE que precisa ser sustentada. É como segurar algo com o braço estendido — não é armazenamento, é esforço contínuo. Por isso ela cansa, e por isso uma interrupção derruba tudo.",
  w:"E se alguém te interromper no meio de um raciocínio?",
  wa:"O disparo que sustentava a informação é sobrescrito. Não é só distração: o conteúdo literalmente DEIXA DE EXISTIR, porque ele só existia enquanto estava sendo mantido."},
 {s:["O pré-frontal mantém o objetivo ativo","Ele enviesa as áreas de trás para servir esse objetivo","E inibe o que compete","Isso custa muita energia","Sono ruim e estresse degradam justamente essa área","Sem ele: o comportamento passa a ser guiado pelo estímulo mais forte"], h:3,
  hn:"O autocontrole é CARO. Não é uma virtude de custo zero: é um circuito metabolicamente exigente. Isso reposiciona o problema — se você não está conseguindo se controlar, a pergunta útil não é por que sou fraco, é o que está drenando esse circuito.",
  w:"E se você tirar o pré-frontal da equação?",
  wa:"Sobra o bottom-up puro: você faz o que o ambiente mandar. É por isso que mudar o AMBIENTE (tirar o celular da mesa) funciona melhor do que ter mais força de vontade — você para de gastar o circuito caro."},
 {s:["Duas tarefas que exigem atenção disputam o MESMO pré-frontal","Ele não roda as duas: ALTERNA","Cada troca exige reconfigurar o objetivo ativo","Reconfigurar leva tempo e deixa resíduo da tarefa anterior","O custo aparece como lentidão e erro — não como desconforto"], h:4,
  hn:"O pior da troca é que você não SENTE o custo. A conta é paga em erro e em tempo, não em sensação. É por isso que a ilusão de que multitarefa funciona sobrevive tão bem à evidência de que não funciona.",
  w:"E se as duas tarefas usarem sistemas diferentes (andar e conversar)?",
  wa:"Aí funciona — e isso não contradiz nada: andar não disputa o pré-frontal. A regra não é nunca faça duas coisas. É nunca faça duas coisas que precisem do MESMO circuito."}
],
emocao:[
 {s:["O estímulo chega ao tálamo","O tálamo manda DUAS cópias","Uma, grossa e rápida, vai direto à amígdala","Outra, lenta e detalhada, vai ao córtex","A rápida já dispara a reação antes de o córtex concluir","O córtex depois confirma ou cancela"], h:1,
  hn:"A dobradiça é a CÓPIA. O sinal não escolhe um caminho: vai pelos DOIS ao mesmo tempo. Por isso você já pulou antes de saber que era uma mangueira — o corpo não esperou o veredito, porque o custo de esperar é maior que o custo de errar.",
  w:"E se a via lenta não conseguir cancelar a tempo?",
  wa:"A resposta de medo roda inteira, mesmo sem ameaça real. É isso que acontece nos transtornos de ansiedade: a via rápida dispara fácil demais e a via lenta não freia a tempo. O problema não é imaginação — é temporização."},
 {s:["A amígdala avisa o hipotálamo","Hipotálamo (CRH) para hipófise (ACTH) para adrenal (CORTISOL)","O cortisol mobiliza energia — útil numa emergência","E ele VOLTA ao hipotálamo e à hipófise","Para se DESLIGAR — retroalimentação negativa"], h:3,
  hn:"O sistema foi feito para se apagar sozinho: o cortisol é o próprio botão de desliga. É por isso que estresse agudo é saudável — ele TERMINA. Todo o problema é o que acontece quando esse freio falha.",
  w:"E se o freio falhar?",
  wa:"O cortisol fica alto sem parar — e passa a danificar exatamente as duas áreas que deveriam controlá-lo: o hipocampo e o pré-frontal. Menos freio, mais cortisol, menos freio ainda. O ciclo se aprofunda sozinho."},
 {s:["Ativação zero: ganho cortical baixo, o sinal não se destaca do ruído","Ativação média: o ganho sobe, o sinal aparece — desempenho ótimo","Ativação alta: o pré-frontal é DESLIGADO","A amígdala e os hábitos assumem o comando","O comportamento vira reação, não estratégia"], h:2,
  hn:"No lado de ativação excessiva, sinais de ameaça e urgência podem dominar a seleção, estreitar alternativas e prejudicar memória de trabalho. Não é uma troca literal de comando entre duas áreas: é uma mudança no equilíbrio entre redes de avaliação, corpo, atenção e controle.",
  w:"E se você entrar numa prova nesse estado?",
  wa:"Você mantém tudo o que é automático e perde o que é estratégico. Daí o branco: não é que a memória sumiu — é que o circuito que a BUSCA foi desligado."},
 {s:["O locus coeruleus libera noradrenalina","Ela ajusta o GANHO do córtex: quanto o sinal se destaca do ruído","Esse ajuste acontece ANTES de qualquer esforço consciente","O mesmo conhecimento, com ganho errado, não se acessa igual","E o estado em que você aprendeu vira pista de recuperação"], h:2,
  hn:"O estado não compete com a força de vontade: ele vem ANTES dela. Quando você tenta se esforçar, o ajuste já foi feito. É por isso que cuidar do sono e da ansiedade não é preparação para estudar — é parte do estudo.",
  w:"E se você estudar sempre ansioso e fizer a prova calmo?",
  wa:"O contexto interno muda e a recuperação piora — memória é dependente de estado. Estudar no estado em que você vai ser cobrado é vantagem real, não superstição."}
],
sono:[
 {s:["Acordado, você acumula sinapses fortalecidas e resíduos","Dormindo, o cérebro REABRE o que aprendeu (replay)","Reorganiza o traço entre hipocampo e redes corticais","Reescalona TODAS as sinapses para baixo","O que era forte continua forte em relação ao resto; o ruído some"], h:3,
  hn:"A dobradiça é contraintuitiva: dormir ENFRAQUECE sinapses. Mas enfraquece todas proporcionalmente — então o sinal se mantém e o ruído desaparece. Não é apagar: é AUMENTAR O CONTRASTE.",
  w:"E se você nunca reescalonasse?",
  wa:"As sinapses saturariam — e tudo forte é o mesmo que nada forte. O cérebro perderia faixa dinâmica para aprender amanhã. Dormir é o que devolve espaço."},
 {s:["A noite é feita de ciclos de cerca de 90 minutos","O sono profundo domina as PRIMEIRAS horas","O REM domina as ÚLTIMAS horas","Cada fase consolida coisas diferentes","Cortar o fim da noite corta seletivamente o REM"], h:4,
  hn:"Dormir menos não encolhe a noite proporcionalmente: AMPUTA o fim dela. Cinco horas não são oito com menos intensidade — são oito SEM AS TRÊS ÚLTIMAS, que são justamente as mais ricas em REM. A perda é dirigida, não diluída.",
  w:"E se você dormir 8 horas, mas fragmentadas?",
  wa:"Você impede os ciclos de se completarem. Sono profundo e REM precisam de sequência. Tempo total não é a medida certa — a ESTRUTURA é."},
 {s:["Acordado, o metabolismo produz resíduos (entre eles, beta-amiloide)","Dormindo, as células gliais ENCOLHEM","O espaço entre elas aumenta em cerca de 60%","O líquor passa a correr por esse espaço com muito mais força","E lava os resíduos para fora"], h:1,
  hn:"Aqui está o mecanismo que quase nunca contam: não é o líquido que muda — é o ESPAÇO. A glia encolhe e abre os canais. A faxina não é metáfora: é hidráulica. E ela só roda direito com você dormindo.",
  w:"E se você dormir mal durante anos?",
  wa:"Menos faxina, noite após noite. A beta-amiloide se acumula em vez de ser removida — e essa é a ligação, hoje bem documentada, entre privação crônica de sono e risco de Alzheimer (Módulo 14)."},
 {s:["Acordado, a adenosina se ACUMULA — é a pressão S","Quanto mais adenosina, mais sono","Em paralelo, o núcleo supraquiasmático roda um relógio de 24h — o processo C","O C diz a que HORAS você deve estar alerta","Você adormece quando S está alto E o C permite"], h:4,
  hn:"É uma porta lógica E — igualzinha à do NMDA no Módulo 02. Precisa dos DOIS. É por isso que você pode estar exausto (S alto) e mesmo assim não dormir (C dizendo que ainda é dia). E é por isso que o jet lag existe.",
  w:"E se você tomar café às 18h?",
  wa:"A cafeína bloqueia o receptor de adenosina. O S continua alto — a pressão está lá — mas o cérebro não a LÊ. Você não ganhou descanso: apagou o mostrador. Quando o efeito passa, a pressão acumulada volta de uma vez."}
],
neuroanatomia:[
 {s:["O córtex é uma casca de 2 a 4 mm","Nele ficam os corpos celulares: a substância cinzenta, que PROCESSA","Abaixo, quase todo o volume é axônio mielinizado: a branca, que CONECTA","Mais área de casca significa mais processamento","Dobrar a casca é a única forma de caber mais dela num crânio fixo"], h:3,
  hn:"As dobras não são decoração nem acaso: são uma solução de EMPACOTAMENTO. O que importa é a ÁREA da casca, não o volume do cérebro. Por isso o número de dobras acompanha a complexidade.",
  w:"E se você esticasse o córtex humano numa mesa?",
  wa:"Daria mais ou menos uma folha de jornal aberta. Todo o resto do cérebro é infraestrutura para sustentar e conectar essa folha."},
 {s:["Occipital vê; temporal ouve, lembra e sente; parietal localiza; frontal planeja e move","Mas nenhuma função vive dentro de um lobo só","Cada função é uma REDE que atravessa lobos, ligada pela substância branca","Uma lesão corta um pedaço da rede — não uma função inteira","Por isso os sintomas são tão específicos e estranhos"], h:2,
  hn:"A dobradiça é a FIAÇÃO. Os lobos são endereços, não órgãos. É por isso que cortar um CABO (como o fascículo arqueado, no Módulo 13) produz um sintoma que nenhuma lesão de área produziria.",
  w:"E se a lesão atingir só a fiação, poupando o córtex?",
  wa:"As áreas continuam intactas e a função some assim mesmo — porque elas deixaram de conversar. É a prova mais limpa de que a função está na REDE, e não nos pontos."},
 {s:["Quase toda informação sensorial chega ao TÁLAMO","O tálamo retransmite ao córtex: é o portão de entrada","Mas o córtex manda fibras DE VOLTA ao tálamo","E essas fibras que descem são MAIS numerosas que as que sobem","O olfato é a única exceção: entra sem passar pelo tálamo"], h:3,
  hn:"Quase ninguém conta isto: as fibras que DESCEM do córtex para o tálamo são mais numerosas que as que sobem. O tálamo não é um cano — é um FILTRO que o córtex controla. É aí, fisicamente, que acontece a atenção top-down do Módulo 05.",
  w:"E se o córtex fechar esse filtro para um sentido?",
  wa:"A informação chega ao tálamo e não passa. É assim que você deixa de ouvir a rua enquanto lê: o sinal não foi ignorado lá em cima — foi barrado na ENTRADA."},
 {s:["O tronco controla respiração, batimento e alerta","Nele ficam OS NÚCLEOS que fabricam dopamina, serotonina e noradrenalina","Desses poucos núcleos saem fibras que irrigam o cérebro inteiro","O cerebelo tem mais neurônios que todo o resto somado","Ele não comanda: CORRIGE, comparando o pretendido com o realizado"], h:2,
  hn:"Uns poucos milhares de neurônios no tronco modulam bilhões lá em cima. É uma alavanca gigantesca — e é por isso que uma droga que mexe nesses núcleos muda humor, foco e movimento de uma vez só (Módulos 01 e 15).",
  w:"E se uma lesão pequena atingir o tronco?",
  wa:"Pode ser fatal, enquanto uma lesão muito maior no córtex não é. Não é o tamanho: é o que PASSA por ali. Densidade de função, não de tecido."}
],
sensorial:[
 {s:["Um receptor recebe a energia física (luz, pressão, molécula)","Isso abre ou fecha canais iônicos NELE","A membrana muda de carga","Se cruzar o limiar: potencial de ação","E o potencial de ação é IGUAL, venha de onde vier"], h:4,
  hn:"A dobradiça é a UNIFORMIDADE. O disparo da retina e o do ouvido são indistinguíveis. Então o que faz um ser vermelho e o outro agudo? Só uma coisa: PARA ONDE ele vai. O significado está no ENDEREÇO, não no sinal.",
  w:"E se você ligasse o nervo do olho no córtex auditivo?",
  wa:"Já foi feito, em furões: o córtex auditivo passou a processar VISÃO e desenvolveu mapas visuais. O tecido não é auditivo por natureza — ele se torna aquilo que chega nele."},
 {s:["A luz cai na retina e os fotorreceptores transduzem","Já na retina, as células detectam CONTRASTE — não brilho","Via tálamo, o V1 detecta bordas e orientações","Áreas seguintes montam formas, depois objetos, depois cenas","Buracos, como o ponto cego, são PREENCHIDOS por inferência"], h:1,
  hn:"A retina já não manda a foto: manda DIFERENÇAS. Ela descarta o uniforme e transmite as bordas. A visão começa como uma COMPRESSÃO — e é por isso que ela pode ser construída: você nunca teve a foto, para começo de conversa.",
  w:"E se faltar informação num pedaço da cena?",
  wa:"O cérebro preenche com o palpite mais provável e você não sente diferença nenhuma. O ponto cego prova isso todo dia. Ver é INFERIR."},
 {s:["O som vibra o tímpano, os ossículos, e chega à cóclea","A membrana da cóclea é RÍGIDA na base e FROUXA no ápice","Frequências altas fazem a base vibrar; as baixas, o ápice","Cada ponto da cóclea corresponde a uma frequência (tonotopia)","O córtex auditivo lê a POSIÇÃO, não a frequência"], h:1,
  hn:"Frequência vira LUGAR por causa de uma propriedade mecânica: a membrana muda de rigidez ao longo do comprimento. É um piano feito de física, não de fiação. Toda a percepção de tom sai daqui.",
  w:"E se o dano atingir só a base da cóclea?",
  wa:"Você perde os AGUDOS e mantém os graves — que é exatamente o padrão da perda auditiva por ruído e por idade. O sintoma denuncia o lugar."},
 {s:["Nociceptores detectam dano e mandam o sinal à medula","Na medula existe uma COMPORTA","Fibras grossas (tato) FECHAM a comporta","E fibras que DESCEM do cérebro também a abrem ou fecham","A dor que você sente é o resultado dessa comporta — não o sinal cru"], h:3,
  hn:"A dobradiça é que o cérebro manda sinais PARA BAIXO. A dor não é lida: é NEGOCIADA. Expectativa, atenção e contexto entram na conta antes de você sentir. Isso não a torna imaginária — torna-a modulável.",
  w:"E se você esfregar o lugar da pancada?",
  wa:"Você ativa fibras grossas de tato, que FECHAM a comporta e reduzem a dor. Não é psicológico: é um circuito na medula, e você acabou de usá-lo."}
],
motor:[
 {s:["Áreas de associação definem a INTENÇÃO","Pré-motora e suplementar montam a SEQUÊNCIA","M1 emite o comando","O trato corticoespinhal desce e CRUZA no bulbo","Neurônio motor inferior — a VIA FINAL COMUM","Junção neuromuscular e o músculo contrai"], h:4,
  hn:"Tudo, absolutamente tudo, passa pelo neurônio motor inferior. Não existe desvio — daí o nome via final comum. Isso não é curiosidade anatômica: é o que torna a lesão dele tão devastadora quanto localizável.",
  w:"E se a lesão for ACIMA dele (no neurônio motor superior)?",
  wa:"O inferior continua vivo, mas sem controle: dispara demais. Resultado: espasticidade e reflexos exagerados. Se a lesão for NELE, o músculo fica flácido e atrofia. Mesma paralisia, sinais opostos — e é assim que o neurologista localiza a lesão sem abrir a cabeça."},
 {s:["M1 guarda um mapa do corpo, distorcido por PRECISÃO — não por tamanho","Nenhum neurônio isolado codifica uma direção","Cada um tem uma direção preferida e dispara mais perto dela","A soma vetorial de milhares aponta a direção real","O comando desce e cruza"], h:3,
  hn:"A direção não existe em nenhum neurônio: EMERGE da soma. Por isso dá para mover uma prótese lendo muitos neurônios de uma vez — você não precisa achar o neurônio do braço direito, você lê a VOTAÇÃO.",
  w:"E se você ler só um neurônio?",
  wa:"Teria um sinal ruidoso e ambíguo. As interfaces cérebro-máquina funcionam justamente porque leem a POPULAÇÃO. A informação está na multidão, não no indivíduo."},
 {s:["Os gânglios da base são um PORTÃO: por padrão, tudo fica freado","A via DIRETA (siga) libera o movimento escolhido","A via INDIRETA (não-siga) suprime os concorrentes","A dopamina age nos DOIS: por D1 EXCITA o siga; por D2 INIBE o não-siga","Ou seja: ela pisa no acelerador e solta o freio ao mesmo tempo","Em paralelo, o cerebelo compara o previsto com o realizado e corrige o erro"], h:3,
  hn:"ESTA é a frase que faltava no curso inteiro. A dopamina não regula o balanço de um jeito vago: ela empurra os DOIS lados na MESMA direção — acelerar. D1 acelera o siga; D2 desliga o não-siga. Uma vez que você vê isso, tudo o que vem depois se deduz sozinho.",
  w:"Rode ao contrário: e se a dopamina CAIR?",
  wa:"D1 menos excitado (siga fraco) E D2 menos inibido (não-siga forte). Os DOIS lados empurram para o freio. Resultado: lentidão e rigidez — Parkinson. Agora rode para o outro lado: dopamina demais (ou L-DOPA em excesso) abre o portão demais e aparecem movimentos involuntários (discinesia). A MESMA cadeia explica a doença E o efeito colateral do remédio. E explica mais: um antipsicótico bloqueia D2, o não-siga deixa de ser inibido, o portão fecha — e o paciente desenvolve sintomas de Parkinson."},
 {s:["O comando chega ao terminal do neurônio motor","Ca2+ entra e a acetilcolina é liberada na junção neuromuscular","A ACh abre canais na fibra e ela contrai","Um neurônio mais as fibras que ele comanda formam uma UNIDADE MOTORA","Poucas fibras por neurônio: controle fino. Muitas: força.","Com a prática, a sequência migra para cerebelo e gânglios da base e vira automática"], h:4,
  hn:"A precisão de um músculo é definida por quantas fibras cada neurônio comanda. No olho: pouquíssimas — controle finíssimo. Na perna: centenas — força bruta. Você não treina um músculo para ter mais precisão do que a unidade motora dele permite.",
  w:"E se um veneno bloquear os receptores de acetilcolina?",
  wa:"É o curare — e é a miastenia gravis. O comando chega perfeito, a acetilcolina é liberada, e o músculo não escuta. Paralisia com o cérebro inteiramente intacto. O gargalo é o último elo."}
],
desenvolvimento:[
 {s:["O tubo neural se fecha nas primeiras semanas","Células-tronco se dividem num ritmo brutal (cerca de 250 mil neurônios por minuto no pico)","Os neurônios MIGRAM até sua posição","Estendem axônios guiados por sinais químicos","Formam sinapses em EXCESSO","E podam o que não é usado"], h:4,
  hn:"O cérebro é construído por EXCESSO e depois esculpido. É uma estratégia estranha e brilhante: em vez de tentar acertar as conexões certas de primeira, ele faz demais e deixa a EXPERIÊNCIA escolher. O ambiente vira parte do projeto.",
  w:"E se um passo atrasar?",
  wa:"Tudo o que vem depois cai em cima do erro. É por isso que o TIMING é tudo — e por que a mesma agressão (um vírus, uma toxina) produz efeitos completamente diferentes conforme a semana em que acontece."},
 {s:["Os neurônios nascem perto do centro do cérebro","Eles ESCALAM por um andaime de glia radial","Cada nova leva ATRAVESSA as anteriores e para mais acima","Por isso o córtex se forma de DENTRO PARA FORA","Chegando ao lugar, o neurônio encontra com quem se conectar"], h:2,
  hn:"Aqui está o detalhe que faz a coisa fazer sentido: quem chega DEPOIS passa por cima de quem já chegou. O intuitivo seria empilhar. Mas é justamente essa ordem que faz a camada mais superficial ser a mais nova — e a que mais depende da experiência.",
  w:"E se a escalada falhar?",
  wa:"O neurônio para no lugar errado. E um neurônio no lugar errado se conecta com quem estiver por perto, não com quem deveria. O circuito nasce mal ligado — é esse tipo de erro que aparece em algumas epilepsias e dislexias."},
 {s:["Aos 2 anos: MAIS sinapses que num adulto","As usadas recebem sinal e sobrevivem","As silenciosas são marcadas quimicamente","A micróglia literalmente as COME","Sobra o circuito que a experiência validou"], h:3,
  hn:"A poda não é passiva: é uma célula imune ATIVA devorando sinapses. Use ou perca não é metáfora — é fagocitose. E isso explica por que o desenvolvimento é irreversível de um jeito que o aprendizado adulto não é.",
  w:"E se a poda for excessiva, ou insuficiente?",
  wa:"Poda demais e os circuitos ficam ralos; de menos e ficam ruidosos. Há evidências ligando os dois extremos a quadros diferentes — não como causa única, mas como peça do mecanismo."},
 {s:["Numa janela, o circuito fica altamente plástico","A experiência decide quem fica com o território","Depois, freios moleculares se instalam (redes perineuronais, mielina)","A janela FECHA","A plasticidade continua — mas menor e mais cara"], h:2,
  hn:"A janela não fecha por acaso: ela é FECHADA ATIVAMENTE, por moléculas que travam o circuito. Isso é uma notícia enorme — se é um freio, ele pode em princípio ser solto. Já se conseguiu reabrir períodos críticos em animais.",
  w:"E se você cobrir um olho SAUDÁVEL durante a janela?",
  wa:"O olho aberto toma o território do fechado. Ao descobrir, o olho está perfeito e a visão não volta: o CÉREBRO já entregou o espaço. A perda não está no órgão — está no mapa."}
],
linguagem:[
 {s:["Você ouve a palavra: córtex auditivo","Wernicke, no temporal, extrai o SIGNIFICADO","Broca, no frontal, monta a forma e a sequência motora","O fascículo arqueado LIGA os dois","O córtex motor executa a fala"], h:3,
  hn:"A rede não é duas áreas: é duas áreas MAIS o cabo. E o cabo é uma peça funcional por direito próprio — cortá-lo produz um sintoma que nenhuma das duas áreas produziria sozinha.",
  w:"E se você cortar SÓ o cabo?",
  wa:"A pessoa entende (Wernicke intacto) e fala fluentemente (Broca intacto), mas não consegue REPETIR o que acabou de ouvir. É a afasia de condução — a prova mais limpa de que a linguagem é uma REDE."},
 {s:["Regiões frontais interagem com sistemas motores da fala","Regiões temporais analisam padrões sonoros e palavras","Áreas parietais, subcorticais e cerebelares também contribuem","Várias vias conectam esses nós em sentidos diferentes","Produzir e compreender emergem da rede, não de dois centros isolados"], h:4,
  hn:"A posição não é acidente: cada área fica GRUDADA no recurso de que depende. Isso é um princípio geral de organização do cérebro — a anatomia segue a função. E você pode usar isso para PREVER onde as coisas ficam.",
  w:"E se a pessoa for surda e usar língua de sinais?",
  wa:"Uma lesão nas MESMAS áreas causa afasia de sinais. As áreas não servem ao som: servem à LINGUAGEM. É a prova de que o que está mapeado ali é a estrutura, não a modalidade."},
 {s:["Uma lesão apaga uma capacidade e preserva outra","Isso se chama DISSOCIAÇÃO","Se A pode ser perdido sem B, então A e B são sistemas separáveis","Juntando muitas dissociações, monta-se um mapa"], h:2,
  hn:"Esta é a ferramenta — e ela vale para o cérebro inteiro, não só para a linguagem. É pura lógica: a doença vira um bisturi experimental que a ética jamais permitiria. Foi assim que se desenhou boa parte de tudo o que você estudou aqui.",
  w:"E se você encontrar uma dupla dissociação (A sem B, e B sem A)?",
  wa:"A prova fica muito mais forte: os dois sistemas são independentes, e não um dependendo do outro. É o padrão-ouro do raciocínio neuropsicológico."},
 {s:["A fala é antiga: tem circuito herdado e se desenvolve sozinha","A leitura tem uns 5 mil anos — cedo demais para ter circuito próprio","Ela SEQUESTRA uma área visual de reconhecimento de formas","Com o treino, essa área se especializa em letras","Por isso ler precisa ser ENSINADO, e falar não"], h:2,
  hn:"A dobradiça é a RECICLAGEM. A cultura não constrói hardware novo — ela sequestra hardware velho. Isso explica de uma vez só: por que ler é difícil, por que a dislexia existe, e por que ninguém precisa ensinar uma criança a falar.",
  w:"E se você aprender uma segunda língua tarde?",
  wa:"As mesmas áreas são usadas, mas com mais esforço e ativação mais difusa. E o sotaque persiste, porque a discriminação fina dos sons dependia de um período crítico que já fechou (Módulo 12)."}
],
clinica:[
 {s:["Cada região tem sua função","Uma lesão remove aquela função específica","Logo, o SINTOMA aponta o local","E isso permite localizar sem abrir a cabeça"], h:2,
  hn:"Este é o raciocínio central de toda a neurologia clínica — e ele inverte o método científico normal: em vez de manipular e observar, você observa o resultado de uma manipulação que a natureza fez. O sintoma É o dado.",
  w:"E se dois pacientes tiverem o mesmo AVC, em lados diferentes?",
  wa:"Quadros completamente diferentes. Não é a doença que define o sintoma: é o TERRITÓRIO. Por isso a palavra AVC, sozinha, não descreve nada."},
 {s:["Proteínas mal dobradas se acumulam (amiloide, tau, alfa-sinucleína)","Elas se espalham de célula a célula, SEGUINDO AS CONEXÕES","Os neurônios afetados morrem","O sintoma depende de ONDE a degeneração começou","Alzheimer começa no temporal (memória); Parkinson, na substância negra (movimento)"], h:1,
  hn:"A degeneração não é aleatória: ela VIAJA PELA FIAÇÃO, como uma infecção seguindo estradas. É por isso que a progressão dos sintomas é previsível — ela segue o mapa das conexões, e esse mapa você já estudou no Módulo 09.",
  w:"E se a mesma proteína se acumular em outro lugar?",
  wa:"Você tem outra doença. Alfa-sinucleína no tronco dá Parkinson; no córtex, dá demência com corpos de Lewy. A proteína é a mesma — o ENDEREÇO é o diagnóstico."},
 {s:["Um vaso entope (ou rompe)","No CENTRO, o tecido morre em minutos por falta de oxigênio","Em volta há a PENUMBRA: tecido vivo, mal irrigado, ainda salvável","A cada minuto, penumbra vira centro","Tratar rápido não ressuscita o centro — SALVA A PENUMBRA"], h:2,
  hn:"É por ISSO que tempo é cérebro. Ninguém está correndo atrás do tecido morto — ele já era. Está-se correndo atrás do anel de tecido que ainda está vivo e decidindo se morre. Cada minuto é um pedaço desse anel.",
  w:"E se a epilepsia for o oposto disso?",
  wa:"E é. No AVC, o tecido morre por FALTA. Na epilepsia, ele dispara em EXCESSO e de forma sincronizada. Uma é escassez, a outra é descontrole — e é por isso que o cérebro pode falhar por caminhos opostos."},
 {s:["Não há uma lesão num ponto","Há redes desreguladas e neurotransmissão alterada","Muitos genes de efeito pequeno, mais o ambiente","Por isso não aparece no exame de imagem de um indivíduo","E por isso o tratamento é sistêmico, não cirúrgico"], h:3,
  hn:"Ser REAL e ser LOCALIZÁVEL não são a mesma coisa. Uma arritmia é real e não é um buraco no coração. O erro é achar que doença de verdade precisa de uma mancha na imagem — e é esse erro que sustenta boa parte do estigma.",
  w:"E se um dia acharem o gene da depressão?",
  wa:"Não vão. Os estudos já mostram centenas de variantes, cada uma com efeito minúsculo. A arquitetura é essa — e entender isso muda o que se deve procurar."}
],
farmacologia:[
 {s:["Quase toda droga psicoativa age na SINAPSE","E só existem quatro truques:","imitar o neurotransmissor (agonista)","bloquear o receptor (antagonista)","impedir a recaptação — o transmissor fica mais tempo na fenda","impedir a destruição — mesmo efeito, outra porta"], h:1,
  hn:"São QUATRO truques. Só quatro. Se você souber em qual truque a droga age e em qual receptor, consegue PREVER o efeito — não precisa decorar droga por droga. É aqui que a farmacologia deixa de ser lista e vira dedução.",
  w:"E se um remédio bloquear a recaptação da dopamina?",
  wa:"Ela fica mais tempo na fenda e o sinal amplifica. Se for no accumbens: euforia e fissura (cocaína). Se for no pré-frontal, em dose controlada e liberação lenta: mais foco (metilfenidato). MESMO truque, alvos diferentes, resultados quase opostos."},
 {s:["Estimulantes aumentam dopamina e noradrenalina: mais ganho, mais alerta","Depressores reforçam o GABA: mais freio, menos excitabilidade","A cafeína não é nem um nem outro","Ela BLOQUEIA o receptor de adenosina","A adenosina é o sinal de sono acumulado (Módulo 08)","Bloquear o sinal não remove o cansaço: apaga o aviso"], h:5,
  hn:"Esta é a distinção que quase todo mundo erra. A cafeína não dá energia: ela DESLIGA O ALARME. A dívida de sono continua correndo por trás — e quando o efeito passa, ela cobra tudo de uma vez.",
  w:"E se você misturar álcool com benzodiazepínico?",
  wa:"Os dois reforçam o MESMO freio (GABA). O efeito não soma: multiplica. É por isso que essa combinação mata — a respiração, controlada pelo tronco, é freada junto."},
 {s:["Um ISRS bloqueia a recaptação da serotonina em HORAS","A serotonina na fenda sobe rápido","Mas a melhora leva SEMANAS","Logo, não é o aumento que trata","O que trata é o que o cérebro CONSTRÓI em resposta: receptores se reajustam, a plasticidade sobe"], h:2,
  hn:"O ATRASO É A PISTA. Se bastasse subir a serotonina, melhoraria no primeiro dia. O fato de levar semanas PROVA que o efeito terapêutico não é o efeito bioquímico imediato — é a ADAPTAÇÃO a ele. O remédio abre a janela; a plasticidade é a cura.",
  w:"E se você aplicar esse raciocínio a qualquer remédio psiquiátrico?",
  wa:"Vale para quase todos. É por isso que esperar de 4 a 6 semanas não é enrolação médica: é o tempo que a plasticidade leva. E é por isso que remédio combinado com terapia funciona melhor — um abre a janela, a outra a usa."},
 {s:["A droga empurra o sistema para um lado","O cérebro COMPENSA, empurrando para o outro (reduz receptores, muda a produção)","Agora, COM a droga, ele fica normal — isso é tolerância","SEM a droga, ele fica jogado para o lado oposto — isso é abstinência","E o querer, do Módulo 03, já migrou para as deixas"], h:1,
  hn:"Tolerância e abstinência são a MESMA coisa, vista de dois lados. O cérebro se contra-empurrou. Enquanto a droga está lá, o contra-empurrão é invisível. Quando ela sai, ele aparece inteiro — e o que você sente é a ADAPTAÇÃO, não a falta.",
  w:"E se a pessoa ficar limpa um ano e voltar ao ambiente antigo?",
  wa:"As deixas ainda disparam o querer — o estriado dorsal não esquece. Por isso recaída não é fraqueza: é um circuito intacto sendo acionado pelo contexto. Mudar o AMBIENTE é tratamento, não conselho."}
],
metodos:[
 {s:["Você vê uma área acender durante uma tarefa","Isso é CORRELAÇÃO","Para provar causa, é preciso MEXER e ver o que muda","Lesão, estimulação, optogenética: manipulações","Só a manipulação separa está envolvido de é necessário"], h:2,
  hn:"A dobradiça é a MANIPULAÇÃO. Observar nunca prova causa, por mais bonita que seja a imagem. Essa distinção é a coisa mais importante do módulo — e a primeira a ser ignorada quando a neurociência vira manchete.",
  w:"E se uma área acender em TODAS as tarefas?",
  wa:"Provavelmente ela não é específica de nenhuma: é infraestrutura (atenção, esforço). Acender muito não quer dizer importar muito. É um erro clássico de leitura de fMRI."},
 {s:["Eletrodo num neurônio: resolução máxima, mas invasivo e vê pouquíssimo","EEG: milissegundos, mas não sabe DE ONDE vem","fMRI: sabe de onde, mas é lenta — porque mede SANGUE, não disparo","Nenhum método tem tudo"], h:2,
  hn:"A fMRI NÃO vê neurônios. Ela vê o fluxo de SANGUE que responde à atividade, com segundos de atraso. Toda a lentidão dela vem daí. Saber o que o aparelho realmente mede é o que te protege de acreditar demais nas imagens coloridas.",
  w:"E se você quiser espaço E tempo ao mesmo tempo?",
  wa:"Você combina métodos, ou aceita a troca. Não existe almoço grátis — e é por isso que uma conclusão baseada num método só merece desconfiança."},
 {s:["Lesão: definitiva, grosseira, e o cérebro se reorganiza depois","TMS: temporária e em humanos, mas superficial","Optogenética: insere um canal sensível à luz em UM TIPO de célula","Aí uma luz liga e desliga aquele tipo, em milissegundos","Isso permite afirmar: aquele tipo de neurônio CAUSA aquele comportamento"], h:2,
  hn:"A dobradiça é que o alvo é GENÉTICO, não espacial. Você não ilumina uma região: você torna sensíveis à luz apenas os neurônios de dopamina, por exemplo. É essa seletividade que transforma correlação em CAUSA.",
  w:"E se você ligar os neurônios de dopamina durante uma ação neutra?",
  wa:"O animal passa a repetir aquela ação. Isso já foi feito — e PROVA que a dopamina causa reforço, não apenas o acompanha. É a diferença entre o Módulo 03 ser uma hipótese e ser um fato."},
 {s:["Nenhum método sozinho é suficiente","Cada um tem um viés DIFERENTE","Se vários métodos com vieses diferentes apontam para o mesmo lugar...","...o erro teria que ser uma coincidência improvável","Isso é convergência — e é assim que se constrói confiança"], h:1,
  hn:"A força não vem de um método bom: vem de métodos que ERRAM DE MANEIRAS DIFERENTES. Se todos errassem igual, mil estudos concordantes não valeriam nada. Por isso repetir com o MESMO método vale menos que convergir entre métodos diferentes.",
  w:"E se um resultado só aparece com um método?",
  wa:"Desconfie. Pode ser real — mas também pode ser um artefato daquele método. Foi assim que várias descobertas de fMRI caíram."}
]
};

/* =====================================================================
   MÓDULO 07 — SISTEMA NERVOSO AUTÔNOMO (adicionado por composição)
   Fecha a metade que faltava da história do estresse: o eixo HPA do
   módulo 06 é o braço LENTO e hormonal; este é o braço RÁPIDO e neural.
   ===================================================================== */
MODULES.push({
  id:'autonomo', n:'07', title:'Sistema Nervoso Autônomo', color:'var(--gold)', hex:'#eab308',
  tag:'O corpo que se governa sozinho',
  intro:'Você já viu o cérebro decidir, lembrar e sentir. Mas quase tudo que mantém você vivo agora mesmo — batimento, respiração, digestão, diâmetro das pupilas — acontece sem nenhuma decisão sua. Este módulo é sobre o sistema que faz isso, e sobre por que ele é a outra metade da história do estresse.',
  lessons:[
    {t:'O corpo em piloto automático',
     b:`<p>O sistema nervoso periférico se divide em dois. O <strong>somático</strong> é o que você comanda: ele leva a ordem do <span class="term">córtex motor</span> até o músculo esquelético e você decide cada movimento. O <span class="term">sistema nervoso autônomo</span> é o outro — controla músculo liso, coração e glândulas, e opera sem passar pela sua vontade.</p><p>Ele tem uma diferença anatômica que explica quase tudo: enquanto o somático vai do sistema nervoso central direto ao músculo com <strong>um neurônio</strong>, o autônomo usa <strong>dois em série</strong>, com um <span class="term">gânglio autonômico</span> no meio. Esse ponto de troca permite que um único comando central se espalhe por vários alvos — e é por isso que a resposta autonômica atinge o corpo inteiro em vez de um músculo só.</p>`},
    {t:'Simpático: o acelerador',
     b:`<p>O ramo <span class="term">simpático</span> prepara o corpo para agir. Ele acelera o coração, dilata brônquios e pupilas, desvia sangue para os músculos — e <strong>desliga a digestão</strong>, porque digerir é caro e pode esperar. Sai da medula na região torácica e lombar, faz escala na <span class="term">cadeia simpática</span> ao lado da coluna e chega aos órgãos liberando <span class="term">noradrenalina</span>.</p><p>Existe um atalho que muda a escala da resposta: a <span class="term">medula adrenal</span> é um gânglio modificado que, em vez de mandar um axônio a um órgão, despeja <strong>adrenalina direto no sangue</strong>. O sinal deixa de ser endereçado e vira circulante — alcança todo o corpo e dura muito mais que o impulso nervoso que o disparou.</p>`},
    {t:'Parassimpático: o freio',
     b:`<p>O ramo <span class="term">parassimpático</span> faz o oposto: desacelera o coração, contrai a pupila e reativa a digestão. É o estado de recuperar e armazenar. Seu neurotransmissor no alvo é a <span class="term">acetilcolina</span>, e ele sai por duas pontas — pelo tronco encefálico e pela porção sacral da medula.</p><p>A maior parte dessa saída viaja por um único nervo: o <span class="term">nervo vago</span>, que sozinho responde por cerca de <strong>três quartos</strong> do fluxo parassimpático. E há uma diferença anatômica decisiva em relação ao simpático: aqui os gânglios ficam <strong>junto ao próprio órgão</strong>, não numa cadeia central. Por isso o parassimpático age de forma <strong>seletiva</strong>, órgão por órgão, enquanto o simpático age em bloco.</p>`},
    {t:'Tônus, variabilidade e o intestino',
     b:`<p>Os dois ramos não são um interruptor — estão <strong>sempre os dois ativos</strong>, e o que muda é o equilíbrio entre eles. É o <span class="term">tônus autonômico</span>. Dá para medir esse equilíbrio pelo coração: a <span class="term">variabilidade da frequência cardíaca</span> é a variação de intervalo entre um batimento e o seguinte, e ela reflete o quanto o vago está atuando. Variabilidade alta indica um sistema flexível; baixa, um sistema travado em alerta.</p><p>E existe um terceiro ramo que quase ninguém cita: o <span class="term">sistema nervoso entérico</span>, uma malha de centenas de milhões de neurônios na parede do intestino, capaz de coordenar a digestão sozinha mesmo se o vago for cortado. Mais surpreendente é a direção do tráfego: a maior parte das fibras do vago <strong>sobe</strong>, do intestino para o cérebro, e não o contrário. O intestino informa muito mais do que obedece.</p>`}
  ],
  quiz:[
    {q:'Qual a diferença anatômica entre a via somática e a via autonômica até o alvo?',
     o:['A autonômica usa dois neurônios em série, com um gânglio no meio','A autonômica usa um neurônio só, mais rápido','A somática não usa neurotransmissor na chegada','A autonômica não sai do sistema nervoso central'], c:0, l:0,
     er:'Isso. O relé no gânglio é o que permite um comando central se espalhar por vários alvos ao mesmo tempo.',
     ew:'A via somática é que vai direto, com um neurônio. A autonômica faz escala num gânglio — e é essa escala que permite a resposta difusa.'},
    {q:'Por que a resposta simpática dura mais que o impulso nervoso que a disparou?',
     o:['Porque a medula adrenal lança adrenalina na corrente sanguínea','Porque o neurônio simpático dispara mais rápido','Porque a acetilcolina permanece na sinapse','Porque o gânglio armazena o sinal por horas'], c:0, l:1,
     er:'Exato. O sinal deixa de ser endereçado e vira circulante — alcança o corpo todo e persiste depois do estímulo.',
     ew:'O que prolonga a resposta é o hormônio na circulação, não a velocidade do disparo: a adrenalina da medula adrenal continua agindo depois do impulso.'},
    {q:'Por que o parassimpático consegue agir órgão por órgão e o simpático age em bloco?',
     o:['Porque os gânglios parassimpáticos ficam junto ao próprio órgão','Porque o parassimpático usa noradrenalina','Porque o simpático não tem gânglios','Porque o vago inerva um único órgão'], c:0, l:2,
     er:'Isso. Gânglio junto ao alvo dá ação seletiva; a cadeia central do simpático distribui o mesmo comando para muitos alvos.',
     ew:'A diferença é de posição do gânglio: no parassimpático ele fica junto ao órgão; no simpático, numa cadeia ao lado da coluna, que espalha.'},
    {q:'O que a variabilidade da frequência cardíaca indica?',
     o:['O tônus do vago e a flexibilidade do sistema autônomo','A força de contração do coração','A quantidade de adrenalina armazenada','O número de gânglios da cadeia simpática'], c:0, l:3,
     er:'Certo. Variabilidade alta reflete bom tônus vagal e um sistema que se ajusta; baixa indica rigidez, associada a estresse crônico.',
     ew:'Ela não mede força nem estoque de hormônio: mede a variação entre batimentos, que reflete o quanto o vago está modulando o coração.'}
  ]
});

MINI_QUIZZES['autonomo']=[
  [
    {lvl:0,q:"O sistema nervoso autônomo controla principalmente:",o:["Músculo liso, coração e glândulas","O músculo esquelético que você decide mover","Apenas a formação de memórias"], c:0,er:"Ele governa o que funciona sem decisão sua: víscera, vaso, glândula e coração.",ew:"Músculo esquelético voluntário é o domínio do sistema somático, não do autônomo."},
    {lvl:1,q:"Se o gânglio autonômico fosse removido da via, o esperado seria:",o:["Perder a capacidade de espalhar um comando central por vários alvos","O sinal chegar mais forte a cada órgão","A digestão passar a ser voluntária"], c:0,er:"O gânglio é o ponto de divergência: um neurônio que chega faz sinapse com vários que saem.",ew:"O gânglio não amplifica força nem torna nada voluntário — ele distribui o comando."},
    {lvl:2,q:"Por que a via autonômica usa dois neurônios em série e a somática, apenas um?",o:["Porque a resposta autonômica precisa ser difusa, e o gânglio permite divergir","Porque o autônomo é mais lento por natureza e precisa de pausa","Porque o músculo liso não aceita acetilcolina direta"], c:0,er:"Precisão pontual pede via direta; resposta de corpo inteiro pede um ponto de divergência.",ew:"A diferença não é de velocidade nem de receptor: é de arquitetura para permitir divergência."}
  ],
  [
    {lvl:0,q:"Durante uma resposta simpática intensa, o que acontece com a digestão?",o:["É suprimida, porque é cara e pode esperar","É acelerada para gerar energia rápida","Fica inalterada"], c:0,er:"Recursos são redirecionados para músculo, coração e pulmão; digerir fica para depois.",ew:"Digestão é função de conservar energia — ela é desligada, não acelerada, na mobilização."},
    {lvl:1,q:"Se a medula adrenal fosse bloqueada durante um susto, o esperado seria:",o:["A resposta ainda ocorrer, mas mais breve e menos generalizada","Nenhuma resposta simpática acontecer","A resposta durar muito mais tempo"], c:0,er:"A via neural direta continua funcionando; o que se perde é o componente hormonal que prolonga e espalha.",ew:"A inervação simpática direta é independente da adrenal — sem ela a resposta encolhe, não desaparece."},
    {lvl:2,q:"Por que o componente hormonal da resposta simpática dura mais que o neural?",o:["Porque a adrenalina circula pelo sangue e só sai por degradação lenta","Porque o hormônio abre canais de sódio permanentemente","Porque a cadeia simpática guarda o sinal e o repete"], c:0,er:"Sinal endereçado termina quando o disparo termina; sinal circulante persiste enquanto a molécula existir.",ew:"Não há armazenamento de sinal nem canal aberto para sempre: a diferença é o tempo de permanência da molécula no sangue."}
  ],
  [
    {lvl:0,q:"Qual nervo carrega a maior parte da saída parassimpática?",o:["O nervo vago","O nervo óptico","O nervo ciático"], c:0,er:"Sozinho, o vago responde por cerca de três quartos do fluxo parassimpático.",ew:"Óptico é sensorial visual, ciático é somático da perna, e o fascículo arqueado é uma via central de linguagem."},
    {lvl:1,q:"Um remédio que bloqueia a acetilcolina nos órgãos produziria:",o:["Aceleração do coração e boca seca, por remover o freio","Desaceleração do coração e mais salivação","Aumento da digestão"], c:0,er:"Tirar o freio parassimpático deixa o simpático sem oposição — é o efeito clássico da atropina.",ew:"Bloquear a acetilcolina retira o efeito parassimpático; o resultado é o oposto dele."},
    {lvl:2,q:"Por que o parassimpático age de forma mais seletiva que o simpático?",o:["Porque seus gânglios ficam junto ao órgão-alvo, e não numa cadeia central","Porque ele usa um neurotransmissor mais específico","Porque tem muito mais neurônios disponíveis"], c:0,er:"A posição do gânglio determina o alcance: junto ao alvo dá precisão, cadeia central dá difusão.",ew:"Os dois usam gânglio e neurotransmissores conhecidos — o que muda é onde o relé fica."}
  ],
  [
    {lvl:0,q:"O que significa dizer que existe um 'tônus autonômico'?",o:["Que os dois ramos estão sempre ativos e o que muda é o equilíbrio","Que apenas um ramo funciona por vez","Que o sistema só liga em situação de perigo"], c:0,er:"Não é interruptor: é uma balança em ajuste contínuo entre acelerador e freio.",ew:"Os dois ramos operam simultaneamente o tempo todo; alternância exclusiva não descreve o sistema."},
    {lvl:1,q:"Uma pessoa com variabilidade da frequência cardíaca cronicamente baixa provavelmente apresenta:",o:["Predomínio simpático sustentado e menor flexibilidade de ajuste","Tônus vagal muito elevado","Ausência de resposta ao estresse"], c:0,er:"Batimento rígido e regular demais indica um sistema preso no acelerador, sem margem de ajuste.",ew:"Variabilidade baixa aponta pouco freio vagal, não excesso dele."},
    {lvl:2,q:"Por que o fato de a maioria das fibras do vago subir, e não descer, é significativo?",o:["Porque mostra que o intestino informa o cérebro mais do que recebe ordens","Porque prova que o intestino comanda a digestão sozinho","Porque indica que o vago é um nervo motor puro"], c:0,er:"A direção do tráfego inverte a intuição: o eixo intestino-cérebro é principalmente sensorial de baixo para cima.",ew:"O vago é misto e o cérebro influencia sim a digestão; o ponto é a proporção do tráfego, que é majoritariamente ascendente."}
  ]
];

PREDICT.autonomo = [
  {q:"Seu coração bate agora sem que você mande. Você acha que existe um sistema que manda nele, ou ele bate sozinho?", o:["Bate sozinho e o nervo só ajusta o ritmo","O cérebro manda cada batimento","Só bate quando há adrenalina"], c:0,
   after:"O coração tem marcapasso próprio e bateria sozinho, isolado. O autônomo não dá a ordem de bater — ele ACELERA ou FREIA um ritmo que já existe. Isso vale para quase todo alvo autonômico: ele modula, não inicia."},
  {q:"Num susto, o que você acha que acontece com a digestão?", o:["É desligada","É acelerada para gerar energia","Continua igual"], c:0,
   after:"É suprimida. Digerir custa caro e pode esperar. Toda a lógica simpática é de REDIRECIONAMENTO: o que não serve para correr agora é desligado para liberar recurso."},
  {q:"Por que a sensação de susto demora a passar mesmo depois de você perceber que não era nada?", o:["Porque a adrenalina já está circulando no sangue","Porque o nervo continua disparando","Porque a memória do susto reativa tudo"], c:0,
   after:"Porque parte da resposta virou HORMÔNIO. O impulso nervoso para junto com o estímulo, mas a adrenalina liberada pela medula adrenal continua no sangue até ser degradada. Entender isso já é meio caminho para não interpretar o resíduo como perigo persistente."},
  {q:"Um coração saudável em repouso bate em intervalos mais regulares ou mais variáveis?", o:["Mais variáveis","Mais regulares","Exatamente iguais"], c:0,
   after:"Mais VARIÁVEIS — e isso é contraintuitivo. Regularidade excessiva indica um sistema travado. A variação entre batimentos mostra o vago ajustando o ritmo a cada instante, e é sinal de flexibilidade, não de defeito."}
];

CHAIN.autonomo = [
  {s:["Um centro no hipotálamo decide mobilizar ou conservar","O sinal desce pela medula até um neurônio pré-ganglionar","Ele faz sinapse num gânglio, com VÁRIOS neurônios pós-ganglionares","Cada um deles segue para um órgão diferente","Um comando vira uma resposta de corpo inteiro"], h:2,
   hn:"O gânglio não é uma estação de passagem: é um ponto de DIVERGÊNCIA. É por isso que o autônomo precisa de dois neurônios em série e o somático não. Precisão pontual pede via direta; resposta coordenada de várias vísceras pede um lugar onde um vire muitos.",
   w:"E se cada neurônio pré-ganglionar contatasse apenas um pós-ganglionar?",
   wa:"A resposta autonômica deixaria de ser integrada. Você poderia acelerar o coração sem dilatar o brônquio nem desviar sangue — o que é inútil, porque essas coisas só servem juntas. A divergência é o que transforma reações isoladas numa estratégia única."},
  {s:["A ameaça é detectada","O simpático dispara pela via neural: coração acelera em SEGUNDOS","A medula adrenal despeja adrenalina no sangue","O eixo HPA começa a agir, e o cortisol chega em MINUTOS","O corpo fica alterado por muito mais tempo que o susto"], h:2,
   hn:"São DUAS respostas ao mesmo evento, em escalas de tempo diferentes: a neural é imediata e a hormonal é lenta e prolongada. O eixo HPA do módulo 06 é só a metade lenta — o simpático é a metade rápida. Quase todo mal-entendido sobre estresse vem de olhar só para uma delas.",
   w:"E se só existisse a via hormonal, sem a neural?",
   wa:"Você levaria minutos para reagir a um perigo que exige um segundo. A via neural existe pela velocidade; a hormonal, pela duração. Um sistema com as duas cobre o instante e o depois."},
  {s:["O perigo passa","O simpático reduz a atividade","O vago aumenta a sua","O coração desacelera e a digestão volta","O corpo passa de mobilizar para recuperar"], h:2,
   hn:"Voltar ao repouso é ATIVO, não é apenas parar. Existe um ramo dedicado a frear, e ele é acionado — não é o acelerador soltando sozinho. Isso importa na prática: quem tem pouco tônus vagal demora a se recuperar de um susto mesmo quando a ameaça já acabou.",
   w:"E se o vago estivesse enfraquecido?",
   wa:"A subida seria normal e a descida seria lenta. O problema do estresse crônico raramente é reagir demais: é não conseguir DESLIGAR depois. Recuperação lenta é o que transforma episódios em estado."},
  {s:["O intestino detecta o que chegou: volume, composição, micróbios","O sistema entérico coordena a digestão localmente","A maior parte das fibras do vago SOBE, levando esse relatório ao tronco","O cérebro ajusta apetite, saciedade e estado interno","O que acontece no intestino chega ao humor"], h:2,
   hn:"O tráfego do vago é majoritariamente ASCENDENTE — o intestino informa muito mais do que obedece. É a base do eixo intestino-cérebro, e é o que dá sentido mecânico a algo que parecia só figura de linguagem: sentir alguma coisa na barriga.",
   w:"E se o vago fosse cortado?",
   wa:"A digestão continuaria, porque o sistema entérico dá conta sozinho — ele é o único ramo capaz disso. O que se perderia é o RELATÓRIO: o cérebro deixaria de saber o que acontece lá embaixo, e a regulação de apetite e estado interno ficaria cega."}
];

BRIDGE.autonomo = [
  `A aula separou somático de autônomo e citou o gânglio no meio do caminho. Aqui está por que essa escala existe, e o que ela permite que a via direta não permitiria.`,
  `A aula mostrou o simpático mobilizando o corpo e citou a adrenal como atalho. Aqui está a diferença entre sinal endereçado e sinal circulante — e por que ela decide quanto tempo o susto dura.`,
  `A aula apresentou o vago e a posição dos gânglios parassimpáticos. Aqui está o que essa posição significa na prática, e por que frear é uma ação e não uma ausência.`,
  `A aula falou de tônus, variabilidade e do sistema entérico. Aqui está o que a variabilidade mede de fato, e o dado sobre o vago que inverte a intuição de quem manda em quem.`
];

DEEP['autonomo']=[
  `<p>A diferença de arquitetura é mais decisiva do que parece. Na via <b>somática</b>, um único neurônio motor sai da medula e vai direto ao músculo esquelético, sempre excitando. Na via <b>autônoma</b>, o neurônio pré-ganglionar é curto e faz sinapse num <b>gânglio</b>, onde contata vários pós-ganglionares que se espalham por órgãos diferentes.</p><p>Há uma segunda assimetria: o autônomo pode <b>excitar ou inibir</b> o alvo, dependendo do receptor que o órgão expõe. A mesma noradrenalina acelera o coração e relaxa o brônquio. Isso explica por que remédios que agem no autônomo são tão específicos por receptor — um betabloqueador reduz a frequência cardíaca sem afetar tudo que a noradrenalina faz no resto do corpo.</p>`,
  `<p>A <b>medula adrenal</b> é uma curiosidade evolutiva: ela é, na origem, um gânglio simpático que perdeu os axônios e virou glândula. Suas células recebem inervação pré-ganglionar como qualquer gânglio, mas em vez de mandar fibras a um órgão, secretam <b>adrenalina</b> na circulação.</p><p>A consequência é uma mudança de <b>regime de sinal</b>. A inervação direta é endereçada, rápida e termina com o estímulo. O hormônio é difuso, alcança todo tecido com receptor e persiste por minutos até ser degradado. É por isso que o coração dispara em um segundo mas o corpo leva bem mais tempo para se assentar — e por que a sensação residual de susto não é sinal de que o perigo continua.</p>`,
  `<p>O <b>nervo vago</b> é o décimo par craniano e o mais extenso do corpo: sai do bulbo e alcança coração, pulmões e a maior parte do trato digestivo. Sua ação no coração é notavelmente rápida, na escala do batimento, porque atua por receptores que abrem canais de potássio quase de imediato.</p><p>Essa rapidez é a base de uma medida clínica útil: a <b>variabilidade da frequência cardíaca</b>. Como o vago consegue ajustar o intervalo entre batimentos individuais, a variação observada é uma leitura direta do tônus vagal. Ela sobe na expiração e cai na inspiração — a arritmia sinusal respiratória —, e é por esse acoplamento que respirar devagar, com expiração longa, aumenta de fato a ativação parassimpática.</p>`,
  `<p>O <b>sistema nervoso entérico</b> tem da ordem de centenas de milhões de neurônios distribuídos em duas malhas na parede intestinal, e é o único ramo capaz de funcionar de forma autônoma: um segmento de intestino isolado ainda produz movimento peristáltico coordenado.</p><p>O achado que mais desafia a intuição é a proporção de fibras do vago: a grande maioria é <b>aferente</b>, ou seja, sobe do intestino para o cérebro. O corpo dedica muito mais banda a relatar o estado visceral do que a comandá-lo. É o substrato do <b>eixo intestino-cérebro</b> e conecta com o módulo 06: interocepção — perceber o próprio estado interno — é parte de como a emoção é construída, e não um detalhe periférico dela.</p>`
];

REFERENCES['autonomo']=[
  {src:'Cannon (1929) — Bodily Changes in Pain, Hunger, Fear and Rage', note:'Formulou a resposta de luta ou fuga e o conceito de homeostase.'},
  {src:'Porges — Teoria polivagal', note:'Proposta influente sobre tônus vagal e regulação; algumas premissas seguem em debate.'},
  {src:'Furness — The Enteric Nervous System', note:'Referência sobre o sistema entérico e sua autonomia funcional.'}
];

ANATOMY['autonomo']={
  title:'As duas saídas do sistema autônomo',
  caption:'Toque numa parte para ver o que ela faz no equilíbrio do corpo.',
  parts:[
    {id:'craniosacral', label:'Saída parassimpática', blurb:'Sai pelo tronco encefálico e pela porção sacral. O nervo vago carrega a maior parte dela.'},
    {id:'toracolombar', label:'Saída simpática', blurb:'Sai da medula na região torácica e lombar, a caminho da cadeia de gânglios.'},
    {id:'cadeia', label:'Cadeia de gânglios', blurb:'Fileira de gânglios ao lado da coluna onde o comando simpático diverge para muitos órgãos.'},
    {id:'adrenal', label:'Medula adrenal', blurb:'Gânglio modificado que lança adrenalina direto no sangue, em vez de mandar axônios.'},
    {id:'alvos', label:'Órgãos-alvo', blurb:'Coração, pulmões e vísceras recebem os dois ramos e respondem ao equilíbrio entre eles.'},
    {id:'enterico', label:'Sistema entérico', blurb:'Malha própria na parede do intestino, capaz de coordenar a digestão sozinha.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 236" role="img" aria-label="Saídas simpática e parassimpática do sistema nervoso autônomo">
    <path d="M92 30 C66 30 54 46 56 62 C58 76 70 84 92 84" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".3"/>
    <line x1="92" y1="30" x2="92" y2="212" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" opacity=".26"/>
    <text x="92" y="228" text-anchor="middle" font-size="9" fill="currentColor" opacity=".45">eixo central</text>
    <text x="336" y="228" text-anchor="middle" font-size="9" fill="currentColor" opacity=".45">órgãos</text>
    <g class="apart" data-anat="autonomo" data-struct="craniosacral">
      <path d="M96 56 C170 48 214 92 244 128 C268 156 300 168 326 170" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>
      <path d="M96 196 C150 198 200 190 246 180" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
      <circle cx="96" cy="56" r="5" fill="currentColor" fill-opacity=".5"/>
      <circle cx="96" cy="196" r="4.4" fill="currentColor" fill-opacity=".5"/>
    </g>
    <g class="apart" data-anat="autonomo" data-struct="toracolombar">
      <rect x="86" y="96" width="12" height="62" rx="5" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.5"/>
      <line x1="98" y1="106" x2="132" y2="106" stroke="currentColor" stroke-width="1.6" opacity=".75"/>
      <line x1="98" y1="126" x2="132" y2="126" stroke="currentColor" stroke-width="1.6" opacity=".75"/>
      <line x1="98" y1="148" x2="132" y2="148" stroke="currentColor" stroke-width="1.6" opacity=".75"/>
    </g>
    <g class="apart" data-anat="autonomo" data-struct="cadeia">
      <circle cx="140" cy="106" r="7" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="140" cy="126" r="7" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="140" cy="148" r="7" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.5"/>
      <line x1="140" y1="113" x2="140" y2="119" stroke="currentColor" stroke-width="1.6"/>
      <line x1="140" y1="133" x2="140" y2="141" stroke="currentColor" stroke-width="1.6"/>
      <path d="M147 104 C210 92 268 78 312 74" fill="none" stroke="currentColor" stroke-width="1.7" opacity=".6"/>
      <path d="M147 126 C214 122 268 120 310 118" fill="none" stroke="currentColor" stroke-width="1.7" opacity=".6"/>
    </g>
    <g class="apart" data-anat="autonomo" data-struct="adrenal">
      <path d="M98 168 C140 172 168 180 186 186" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="4 3" opacity=".7"/>
      <path d="M188 178 C202 172 216 178 216 190 C216 200 202 206 192 200 C184 196 182 184 188 178 Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.6"/>
      <text x="203" y="216" text-anchor="middle" font-size="8.5" fill="currentColor" opacity=".55">adrenalina</text>
    </g>
    <g class="apart" data-anat="autonomo" data-struct="alvos">
      <path d="M318 62 C326 54 340 54 346 62 C352 70 344 82 332 90 C320 82 312 70 318 62 Z" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="1.6"/>
      <path d="M316 108 C316 100 326 98 330 104 L330 128 C322 130 314 122 316 108 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5"/>
      <path d="M352 108 C352 100 342 98 338 104 L338 128 C346 130 354 122 352 108 Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5"/>
    </g>
    <g class="apart" data-anat="autonomo" data-struct="enterico">
      <path d="M310 156 C300 168 306 186 322 190 C340 194 358 186 358 172 C358 158 344 150 330 154" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
      <circle cx="322" cy="172" r="2.2" fill="currentColor" fill-opacity=".7"/>
      <circle cx="336" cy="166" r="2.2" fill="currentColor" fill-opacity=".7"/>
      <circle cx="332" cy="182" r="2.2" fill="currentColor" fill-opacity=".7"/>
    </g>
  </svg>`
};

Object.assign(GLOSSARY, {
  'sistema nervoso autônomo':'A parte do sistema nervoso que controla músculo liso, coração e glândulas sem passar pela vontade. Divide-se em simpático (mobilizar) e parassimpático (conservar), que atuam em oposição contínua.',
  'simpático':'O ramo que mobiliza o corpo para agir: acelera coração, dilata brônquios e pupilas, desvia sangue para os músculos e suprime a digestão. Age em bloco, porque seus gânglios ficam numa cadeia central.',
  'parassimpático':'O ramo que conserva e recupera: desacelera o coração, contrai a pupila e reativa a digestão. Age de forma seletiva, porque seus gânglios ficam junto ao próprio órgão.',
  'gânglio autonômico':'O ponto de troca entre os dois neurônios da via autônoma. É onde um comando central diverge para vários alvos — a razão de a resposta autonômica atingir o corpo todo.',
  'cadeia simpática':'A fileira de gânglios ao lado da coluna vertebral por onde passa a saída simpática. Sua posição central é o que permite espalhar o mesmo comando por muitos órgãos ao mesmo tempo.',
  'medula adrenal':'Um gânglio simpático modificado que, em vez de mandar axônios a um órgão, despeja adrenalina direto na corrente sanguínea. Converte um sinal endereçado num sinal circulante, que dura muito mais.',
  'nervo vago':'O décimo par craniano e o mais extenso do corpo. Carrega cerca de três quartos da saída parassimpática, e a maioria de suas fibras é ascendente — leva informação do corpo ao cérebro mais do que ordens no sentido inverso.',
  'sistema nervoso entérico':'A malha de centenas de milhões de neurônios na parede do intestino, capaz de coordenar a digestão sozinha mesmo sem conexão com o cérebro. É a base do eixo intestino-cérebro.',
  'tônus autonômico':'O equilíbrio momentâneo entre simpático e parassimpático. Os dois ramos estão sempre ativos: o que muda é qual predomina, e o quanto o sistema consegue alternar.',
  'variabilidade da frequência cardíaca':'A variação de intervalo entre um batimento e o seguinte. Reflete o tônus vagal: alta indica um sistema flexível; baixa, um sistema travado em alerta, associado a estresse crônico.',
  'interocepção':'A percepção do próprio estado interno — batimento, respiração, tensão visceral. Chega ao cérebro sobretudo pelo vago e participa da construção da emoção, não apenas do controle do corpo.'
});

Object.assign(TERM_FIG, {
  'sistema nervoso autônomo':'mod:autonomo',
  'simpático':'mod:autonomo',
  'parassimpático':'mod:autonomo',
  'gânglio autonômico':'mod:autonomo',
  'cadeia simpática':'mod:autonomo',
  'medula adrenal':'mod:autonomo',
  'nervo vago':'mod:autonomo',
  'sistema nervoso entérico':'mod:autonomo',
  'tônus autonômico':'mod:autonomo',
  'variabilidade da frequência cardíaca':'mod:autonomo',
  'interocepção':'mod:autonomo'
});

/* --- módulo 07: integrações que dependem de estruturas definidas acima --- */
try{
  if(typeof ANAT_DEEP !== 'undefined') Object.assign(ANAT_DEEP, {
    'autonomo:craniosacral':'Sai por <b>duas pontas distantes</b> — o tronco encefálico e a porção sacral da medula —, o que já a distingue do simpático, concentrado no meio. A maior parte viaja pelo <b>nervo vago</b>, que sozinho responde por cerca de três quartos do fluxo. E os gânglios ficam <b>junto ao órgão</b>, não numa cadeia central: é essa posição que dá ao parassimpático a ação seletiva, capaz de frear o coração sem mexer na digestão.',
    'autonomo:toracolombar':'Sai da medula apenas na faixa <b>torácica e lombar</b> — o meio da coluna —, e essa concentração é funcional: um comando emitido de um trecho curto alcança a cadeia inteira e, por ela, o corpo todo. As fibras que saem daqui são <b>curtas</b>, porque o gânglio está logo ao lado; quem faz o percurso longo até o órgão é o segundo neurônio. É o desenho oposto ao do parassimpático, e a razão de o simpático agir em bloco.',
    'autonomo:cadeia':'É o ponto de <b>divergência</b> do sistema, e explica por que a via autônoma precisa de dois neurônios em série. Cada fibra que chega faz sinapse com muitas que saem, então um único comando central vira uma resposta coordenada de várias vísceras ao mesmo tempo. Sem isso você poderia acelerar o coração sem dilatar o brônquio nem desviar sangue — o que seria inútil, porque essas respostas só servem juntas.',
    'autonomo:adrenal':'É um <b>gânglio simpático que virou glândula</b>: recebe inervação como qualquer gânglio, mas perdeu os axônios de saída e secreta <b>adrenalina direto no sangue</b>. Isso muda o regime do sinal — deixa de ser endereçado e vira circulante, alcançando todo tecido com receptor e persistindo por minutos até ser degradado. É por isso que o coração dispara em um segundo mas a sensação de susto demora a passar: o resíduo é hormonal, não é perigo que continua.',
    'autonomo:alvos':'Quase todo órgão recebe os <b>dois ramos</b>, e o estado dele a cada instante é o saldo entre eles — não o resultado de um só. Um detalhe que confunde: o mesmo neurotransmissor pode excitar ou inibir, dependendo do <b>receptor</b> que aquele órgão expõe. A noradrenalina acelera o coração e relaxa o brônquio. É essa especificidade de receptor que permite remédios cirúrgicos, como um betabloqueador que reduz a frequência cardíaca sem desligar tudo o mais.',
    'autonomo:enterico':'Centenas de milhões de neurônios em duas malhas na parede do intestino — o <b>único ramo capaz de operar sozinho</b>: um segmento isolado ainda produz peristalse coordenada. O dado que inverte a intuição é a direção do tráfego no vago: a <b>maioria das fibras sobe</b>, do intestino para o cérebro. O corpo dedica muito mais banda a relatar o estado visceral do que a comandá-lo — e é isso que dá base mecânica ao eixo intestino-cérebro.'
  });
}catch(e){}

try{
  if(typeof ANAT_TERM !== 'undefined') Object.assign(ANAT_TERM, {
    'autonomo:craniosacral':'parassimpático',
    'autonomo:toracolombar':'simpático',
    'autonomo:cadeia':'cadeia simpática',
    'autonomo:adrenal':'medula adrenal',
    'autonomo:alvos':'tônus autonômico',
    'autonomo:enterico':'sistema nervoso entérico'
  });
}catch(e){}

try{
  if(typeof TERM_REL !== 'undefined') Object.assign(TERM_REL, {
    'sistema nervoso autônomo':['simpático','parassimpático','gânglio autonômico','tônus autonômico','hipotálamo'],
    'simpático':['noradrenalina','cadeia simpática','medula adrenal','parassimpático','cortisol','tônus autonômico'],
    'parassimpático':['nervo vago','acetilcolina','simpático','variabilidade da frequência cardíaca','tônus autonômico'],
    'gânglio autonômico':['cadeia simpática','acetilcolina','sistema nervoso autônomo'],
    'cadeia simpática':['simpático','gânglio autonômico','noradrenalina','medula adrenal'],
    'medula adrenal':['simpático','cortisol','córtex adrenal','cadeia simpática','noradrenalina'],
    'nervo vago':['parassimpático','acetilcolina','sistema nervoso entérico','variabilidade da frequência cardíaca','interocepção','tronco encefálico'],
    'sistema nervoso entérico':['nervo vago','interocepção','parassimpático'],
    'tônus autonômico':['simpático','parassimpático','variabilidade da frequência cardíaca','U invertido'],
    'variabilidade da frequência cardíaca':['nervo vago','tônus autonômico','parassimpático','cortisol'],
    'interocepção':['nervo vago','amígdala','sistema nervoso entérico','hipotálamo'],
    'cortisol':['hipófise','córtex adrenal','retroalimentação negativa','amígdala','córtex pré-frontal','U invertido','medula adrenal'],
    'hipotálamo':['cortisol','hipófise','núcleo supraquiasmático','tálamo','Processo C','sistema nervoso autônomo'],
    'acetilcolina':['unidade motora','curare','miastenia gravis','parassimpático','nervo vago']
  });
}catch(e){}

try{
  if(typeof CONCEPTS !== 'undefined'){
    Object.assign(CONCEPTS, {
      lutafuga:{cat:'estado', n:'Luta ou fuga',
       q:'Por que o corpo inteiro muda de estado em um segundo?',
       a:'A ameaça dispara <b>duas respostas ao mesmo evento, em escalas de tempo diferentes</b>. A neural é imediata: o simpático acelera o coração e desvia sangue em segundos. A hormonal é lenta: a medula adrenal lança adrenalina na circulação e o eixo HPA traz cortisol em minutos. A primeira existe pela <b>velocidade</b>, a segunda pela <b>duração</b> — e é a segunda que explica por que a sensação demora a passar mesmo depois de você saber que não era nada.',
       t:['simpático','medula adrenal','noradrenalina','cortisol','amígdala','via rápida','cadeia simpática','tônus autonômico'],
       m:[{m:'autonomo',l:1},{m:'emocao',l:1},{m:'emocao',l:0}], k:[],
       s:['luta ou fuga','adrenalina','susto','coracao disparado','taquicardia','reacao ao perigo','descarga']},
      respiracao:{cat:'desempenho', n:'Respiração e calma',
       q:'Por que respirar devagar acalma de verdade?',
       a:'O vago age no coração na escala do <b>batimento individual</b>, e sua influência oscila com a respiração — sobe na expiração e cai na inspiração. Isso se chama arritmia sinusal respiratória. Alongar a <b>expiração</b> prolonga a janela em que o freio parassimpático está atuando, e o efeito é fisiológico e mensurável, não sugestão. É também por isso que a variabilidade da frequência cardíaca serve como leitura do tônus vagal.',
       t:['nervo vago','parassimpático','variabilidade da frequência cardíaca','tônus autonômico','acetilcolina'],
       m:[{m:'autonomo',l:2},{m:'autonomo',l:3},{m:'emocao',l:2}], k:[],
       s:['respirar fundo','respiracao','acalmar','expiracao longa','HRV','coerencia cardiaca','relaxar']},
      intestino:{cat:'fenomeno', n:'Eixo intestino-cérebro',
       q:'O que significa dizer que o intestino conversa com o cérebro?',
       a:'A parede do intestino abriga o <b>sistema nervoso entérico</b>, com centenas de milhões de neurônios — o único ramo capaz de coordenar sua função sozinho. O dado que inverte a intuição é a direção do tráfego: a <b>maioria das fibras do vago sobe</b>, do intestino para o cérebro, e não o contrário. O corpo dedica muito mais banda a relatar o estado visceral do que a comandá-lo, e essa informação alimenta apetite, saciedade e estado interno.',
       t:['sistema nervoso entérico','nervo vago','interocepção','parassimpático'],
       m:[{m:'autonomo',l:3},{m:'emocao',l:0}], k:[],
       s:['intestino','microbiota','segundo cerebro','frio na barriga','digestao e humor','vago']}
    });
    if(typeof SIDX !== 'undefined') SIDX = null;  // força reconstrução do índice de busca
  }
}catch(e){}

/* =====================================================================
   MÓDULO 04 — DECISÃO E VALOR (adicionado por composição)
   O módulo 03 mostra a dopamina sinalizando ERRO DE PREVISÃO — o quanto
   a realidade superou a expectativa. Este módulo é sobre a etapa anterior:
   como o cérebro atribui VALOR e escolhe entre opções incomparáveis.
   ===================================================================== */
MODULES.push({
  id:'decisao', n:'04', title:'Decisão e Valor', color:'var(--plum)', hex:'#c084fc',
  tag:'Como o cérebro escolhe',
  intro:'Escolher entre um prato de comida e uma hora de sono não deveria ser possível: são coisas sem unidade em comum. E ainda assim você escolhe, em segundos, o dia inteiro. Este módulo é sobre a moeda que o cérebro inventa para comparar o incomparável, sobre o quanto ele desconta de cada opção, e sobre o instante exato em que a decisão fecha.',
  lessons:[
    {t:'A moeda comum',
     b:`<p>Para escolher entre uma maçã e um filme, o cérebro precisa resolver um problema estranho: são grandezas sem unidade compartilhada. A solução é converter tudo para uma escala única — o <span class="term">valor subjetivo</span>. Não é o valor de mercado nem a quantidade física: é quanto <em>aquilo</em> vale <em>para você</em>, <strong>agora</strong>.</p><p>Essa conversão acontece sobretudo no <span class="term">córtex orbitofrontal</span> e no <span class="term">pré-frontal ventromedial</span>. Neurônios de lá acompanham o valor de uma opção <strong>independente de qual seja o bem</strong> — suco, dinheiro ou descanso ativam a mesma escala. É isso que torna a comparação possível: as opções deixam de ser maçã e filme e viram dois números na mesma régua.</p>`},
    {t:'O avaliador e o que acontece quando ele falha',
     b:`<p>O <span class="term">córtex orbitofrontal</span> não guarda um valor fixo — ele <strong>atualiza</strong>. Se o que era recompensador deixa de ser, ele reescreve a estimativa. É o que se mede na <span class="term">aprendizagem reversa</span>: inverta a regra e veja quanto tempo a pessoa leva para mudar de escolha. Com o OFC lesado, ela continua escolhendo a opção que já não funciona, mesmo sabendo verbalmente que a regra mudou.</p><p>O padrão clínico é marcante: inteligência, memória e linguagem preservadas, e ainda assim decisões desastrosas na vida real. A <span class="term">hipótese do marcador somático</span> propõe que o corpo participa da escolha — sinais viscerais marcariam opções como boas ou ruins antes do raciocínio explícito. É uma ideia influente, e <strong>ainda em disputa</strong>: nem todos os achados se replicaram bem.</p>`},
    {t:'O preço de esperar, de se esforçar e de arriscar',
     b:`<p>Valor bruto não é o que decide. O cérebro <strong>desconta</strong> cada opção pelo que ela custa. O <span class="term">desconto temporal</span> é o mais estudado: a mesma recompensa vale menos quanto mais longe estiver. E a curva do desconto humano é <strong>hiperbólica</strong>, não exponencial — despenca no começo e achata depois.</p><p>Essa forma tem uma consequência que a curva exponencial não teria: a <strong>reversão de preferência</strong>. Você prefere um valor maior daqui a um ano em vez de um menor daqui a onze meses — mas prefere o menor <em>hoje</em> em vez do maior amanhã. Não é incoerência de caráter: é a geometria da curva. Somam-se ainda o <span class="term">custo de esforço</span>, calculado com participação do <span class="term">córtex cingulado anterior</span>, e o risco — onde vale a <span class="term">aversão à perda</span>: perder pesa mais que ganhar o equivalente.</p>`},
    {t:'O instante em que a decisão fecha',
     b:`<p>Decidir não é um estalo: é um <span class="term">acúmulo de evidência</span>. O cérebro vai somando informação a favor de cada opção, e a escolha acontece quando o total cruza um <span class="term">limiar de decisão</span>. Foi possível ver isso célula a célula: neurônios do parietal <strong>sobem em rampa</strong> durante a deliberação, e a resposta sai quando a rampa atinge o topo.</p><p>Esse desenho explica de graça uma coisa que parecia questão de temperamento. A <strong>troca entre velocidade e acerto</strong> é literalmente a <strong>altura do limiar</strong>: abaixe o limiar e você decide mais rápido e erra mais; suba e acerta mais, devagar. Quem responde rápido demais não está sendo descuidado — está operando com o limiar baixo. E dá para ajustá-lo conscientemente.</p>`}
  ],
  quiz:[
    {q:'Por que o cérebro precisa de uma "moeda comum" para decidir?',
     o:['Porque opções de naturezas diferentes só podem ser comparadas numa escala única','Porque toda decisão envolve dinheiro','Porque o valor de mercado precisa ser calculado','Porque o córtex motor exige um número para agir'], c:0, l:0,
     er:'Isso. Sem converter para uma escala compartilhada, maçã e filme seriam literalmente incomparáveis.',
     ew:'A questão não é dinheiro: é que grandezas de naturezas diferentes precisam de uma régua comum para serem comparadas.'},
    {q:'O que a aprendizagem reversa mede?',
     o:['A capacidade de atualizar o valor quando a regra muda','A velocidade de formar uma memória nova','A força de contração muscular','A quantidade de dopamina liberada'], c:0, l:1,
     er:'Certo. Ela testa se o avaliador reescreve a estimativa — e é isso que falha com lesão no orbitofrontal.',
     ew:'Ela não mede memória nem dopamina diretamente: mede se a pessoa muda de escolha depois que a contingência muda.'},
    {q:'Por que a curva hiperbólica de desconto produz reversão de preferência?',
     o:['Porque ela despenca no curto prazo e achata depois, invertendo a comparação conforme a distância','Porque ela cresce com o tempo','Porque ela é idêntica à exponencial','Porque o valor não muda com a espera'], c:0, l:2,
     er:'Exato. A ordem das preferências se inverte conforme as duas opções se aproximam do presente.',
     ew:'Com curva exponencial não haveria reversão. É justamente o formato hiperbólico — queda abrupta e depois achatamento — que produz a inversão.'},
    {q:'No modelo de acúmulo de evidência, o que representa a troca entre velocidade e acerto?',
     o:['A altura do limiar de decisão','A velocidade de condução do axônio','A quantidade de opções disponíveis','O nível de cortisol no momento'], c:0, l:3,
     er:'Isso. Limiar baixo decide rápido e erra mais; limiar alto acerta mais e demora. É um parâmetro ajustável.',
     ew:'Não é condução nem hormônio: no modelo, a troca corresponde diretamente ao quanto de evidência é exigido antes de fechar.'}
  ]
});

MINI_QUIZZES['decisao']=[
  [
    {lvl:0,q:"O 'valor subjetivo' de uma opção é:",o:["Quanto ela vale para você naquele momento","O preço dela no mercado","A quantidade física do item"], c:0,er:"É uma escala interna e mutável, não uma propriedade do objeto.",ew:"Preço e quantidade são externos; o valor subjetivo é interno e muda com o estado."},
    {lvl:1,q:"Se um neurônio do orbitofrontal responde igual a suco e a dinheiro, o esperado é que ele codifique:",o:["Valor, numa escala comum a qualquer bem","O tipo específico do item","O movimento necessário para obtê-lo"], c:0,er:"Responder igual a bens diferentes é a assinatura de uma escala comum.",ew:"Se codificasse o tipo do item ou a ação, a resposta mudaria conforme o bem."},
    {lvl:2,q:"Por que a existência de uma moeda comum é logicamente necessária para escolher?",o:["Porque grandezas de naturezas diferentes não podem ser comparadas sem uma régua única","Porque o cérebro só processa números","Porque toda escolha precisa de linguagem"], c:0,er:"Comparar exige uma dimensão compartilhada; sem ela a comparação não é definível.",ew:"Não é sobre números nem linguagem: é que comparação exige, por definição, uma dimensão comum."}
  ],
  [
    {lvl:0,q:"Uma lesão no córtex orbitofrontal costuma produzir:",o:["Decisões ruins na vida real com inteligência preservada","Perda de memória de longo prazo","Paralisia do lado direito"], c:0,er:"É o padrão clássico: QI, linguagem e memória intactos, escolhas desastrosas.",ew:"Memória e movimento dependem de outras estruturas; o que se perde aqui é a avaliação."},
    {lvl:1,q:"Se a regra de um jogo é invertida e a pessoa continua escolhendo a opção antiga, o mais provável é falha em:",o:["Atualizar o valor da opção","Enxergar as opções","Mover a mão"], c:0,er:"É exatamente o que a aprendizagem reversa detecta: o valor não é reescrito.",ew:"A percepção e a ação estão preservadas; o que não acompanha a mudança é a estimativa de valor."},
    {lvl:2,q:"Por que saber verbalmente que a regra mudou não basta para mudar a escolha?",o:["Porque a avaliação que guia a escolha opera abaixo do relato explícito","Porque a pessoa não entende a instrução","Porque a memória de trabalho não guarda regras"], c:0,er:"Saber e avaliar são processos distintos — e é a dissociação entre eles que torna o caso revelador.",ew:"A compreensão está preservada; o problema é que o valor que guia a ação não foi atualizado junto."}
  ],
  [
    {lvl:0,q:"O desconto temporal significa que:",o:["A mesma recompensa vale menos quanto mais distante estiver","Recompensas distantes valem mais","O tempo não afeta o valor"], c:0,er:"Distância no tempo corrói o valor presente da opção.",ew:"O efeito é de queda: quanto mais longe, menos aquilo pesa na decisão agora."},
    {lvl:1,q:"Você prefere R$110 em 12 meses a R$100 em 11 meses, mas prefere R$100 hoje a R$110 amanhã. Isso indica:",o:["Desconto hiperbólico, que produz reversão de preferência","Desconto exponencial constante","Ausência de desconto"], c:0,er:"A mesma diferença de um dia pesa muito perto do presente e quase nada no futuro distante.",ew:"Com desconto exponencial a ordem se manteria; a inversão é a marca do formato hiperbólico."},
    {lvl:2,q:"Por que chamar isso de 'falta de força de vontade' é uma descrição imprecisa?",o:["Porque a inversão decorre do formato da curva de desconto, não de um traço de caráter","Porque força de vontade não existe","Porque o valor nunca muda"], c:0,er:"Um sistema com desconto hiperbólico inverte preferências por construção, sem precisar de nenhum defeito moral.",ew:"O controle existe e importa — o ponto é que a reversão é previsível pela geometria da curva, não por fraqueza."}
  ],
  [
    {lvl:0,q:"No modelo de acúmulo de evidência, a decisão acontece quando:",o:["O total acumulado cruza um limiar","O primeiro dado chega","Todas as opções são esgotadas"], c:0,er:"É um processo gradual que termina ao atingir um critério.",ew:"Não é imediato nem exaustivo: a escolha fecha ao cruzar o limiar."},
    {lvl:1,q:"Se alguém baixa o próprio limiar de decisão, o esperado é:",o:["Decidir mais rápido e errar mais","Decidir mais devagar e errar mais","Decidir mais rápido e errar menos"], c:0,er:"Menos evidência exigida significa resposta mais veloz e menos confiável.",ew:"Velocidade e acerto trocam entre si: baixar o limiar compra tempo ao custo de precisão."},
    {lvl:2,q:"Por que esse modelo explica a troca entre velocidade e acerto sem precisar de outro mecanismo?",o:["Porque a troca é o próprio parâmetro do limiar, não um processo adicional","Porque a evidência chega mais rápido em algumas pessoas","Porque o limiar é fixo e igual para todos"], c:0,er:"Um único parâmetro já produz o fenômeno inteiro — economia explicativa é o que torna o modelo forte.",ew:"O limiar é ajustável, e é justamente esse ajuste que constitui a troca — não há mecanismo separado."}
  ]
];

PREDICT.decisao = [
  {q:"Você precisa escolher entre comer algo bom e dormir mais uma hora. Como o cérebro compara duas coisas tão diferentes?", o:["Converte as duas para uma escala interna comum","Compara as sensações diretamente","Escolhe sempre a mais recente"], c:0,
   after:"Ele CONVERTE. Sem uma escala compartilhada, comida e sono seriam literalmente incomparáveis — como perguntar qual é maior, dois quilos ou três metros. O cérebro cria uma moeda interna, e é isso que torna a escolha possível."},
  {q:"Alguém com inteligência, memória e linguagem perfeitas pode tomar decisões desastrosas na vida?", o:["Sim, se a avaliação de valor estiver comprometida","Não, inteligência preservada garante boas escolhas","Só se houver perda de memória junto"], c:0,
   after:"Pode, e é um dos achados mais reveladores da neurociência. Lesões no orbitofrontal produzem exatamente esse quadro. Avaliar e raciocinar são processos DIFERENTES — dá para preservar um e perder o outro."},
  {q:"Você prefere R$100 hoje ou R$110 amanhã? E R$100 em 11 meses ou R$110 em 12?", o:["Muita gente inverte a preferência entre os dois casos","A escolha é sempre coerente nos dois","Sempre se escolhe o valor maior"], c:0,
   after:"A maioria INVERTE — pega os R$100 hoje, mas espera pelos R$110 no caso distante. É a mesma diferença de um dia. A inversão é consequência do formato hiperbólico da curva de desconto, não de incoerência pessoal."},
  {q:"Quando você decide rápido e erra, o que aconteceu?", o:["Você exigiu menos evidência antes de fechar","Seu cérebro processou informação errada","Você não prestou atenção"], c:0,
   after:"Você operou com o LIMIAR mais baixo. No modelo de acúmulo de evidência, velocidade e acerto são o mesmo parâmetro visto de dois lados. Errar por pressa não é descuido — é um critério ajustado para baixo, e dá para ajustá-lo de volta."}
];

CHAIN.decisao = [
  {s:["Duas opções de naturezas diferentes aparecem","Cada uma é avaliada isoladamente e recebe um valor","O orbitofrontal põe os dois valores na MESMA escala","A comparação vira uma diferença entre números","A opção de maior valor é selecionada"], h:2,
   hn:"O passo crítico é o terceiro, e ele é fácil de subestimar: sem uma escala comum, a comparação não seria difícil — seria INDEFINIDA, como perguntar se dois quilos são maiores que três metros. O cérebro não compara maçã com filme; ele converte os dois antes.",
   w:"E se cada tipo de bem tivesse sua própria escala independente?",
   wa:"Você conseguiria escolher entre duas comidas, mas travaria entre comida e sono. Toda escolha entre categorias diferentes ficaria impossível — que é a maior parte das escolhas de um dia."},
  {s:["Uma opção tem um valor bruto","Some-se o atraso: quanto mais longe, menor o valor presente","Some-se o esforço exigido","Some-se a incerteza do resultado","O que decide é o valor JÁ DESCONTADO"], h:4,
   hn:"A comparação nunca é entre valores brutos. É por isso que uma recompensa objetivamente maior perde para uma menor: ela chegou à mesa com desconto grande demais. Fatiar uma tarefa funciona porque reduz o custo de esforço e o atraso ao mesmo tempo — mexe em dois descontos de uma vez.",
   w:"E se o desconto temporal humano fosse exponencial em vez de hiperbólico?",
   wa:"As preferências seriam consistentes ao longo do tempo: o que você prefere hoje para daqui a um ano continuaria sendo o preferido quando o ano chegasse. Não existiria arrependimento por antecipação nem reversão — e provavelmente nem a palavra procrastinação."},
  {s:["A evidência a favor de cada opção começa a se acumular","O total sobe em rampa, com ruído","A rampa se aproxima do limiar","O limiar é cruzado","A escolha é emitida"], h:3,
   hn:"O limiar é AJUSTÁVEL, e é o mesmo parâmetro para velocidade e para acerto. Isso muda a leitura de erro por pressa: não é falta de cuidado, é um critério baixo. E como é um critério, dá para levantá-lo de propósito — decidir explicitamente esperar mais evidência antes de fechar.",
   w:"E se o limiar fosse alto demais?",
   wa:"Você acertaria mais e decidiria devagar demais para ser útil — no limite, travaria em análise infinita. Não existe ajuste ótimo universal: o certo depende do custo do erro contra o custo da demora naquela situação."},
  {s:["O resultado da escolha chega","Ele é comparado com o valor que havia sido previsto","A dopamina sinaliza a diferença — o erro de previsão","O orbitofrontal reescreve o valor daquela opção","A próxima decisão parte de uma estimativa melhor"], h:3,
   hn:"Aqui os módulos 03 e 04 se encaixam: o orbitofrontal ATRIBUI o valor, a dopamina informa o quanto a previsão errou, e o valor é corrigido. Um faz a estimativa, o outro faz a correção. É por isso que lesão no orbitofrontal quebra a atualização mesmo com o sistema de dopamina intacto.",
   w:"E se o erro de previsão nunca chegasse ao avaliador?",
   wa:"Os valores congelariam. Você continuaria escolhendo pelo que as coisas valiam antes, sem nunca corrigir — que é, em essência, o que se observa na aprendizagem reversa após lesão orbitofrontal."}
];

BRIDGE.decisao = [
  `A aula disse que o cérebro converte tudo para uma escala comum. Aqui está a evidência célula a célula disso — e por que a escala precisa ser relativa, não absoluta.`,
  `A aula mostrou o avaliador falhando com inteligência preservada. Aqui está o caso que fundou essa linha de pesquisa, e o que está em disputa na explicação mais famosa dele.`,
  `A aula apresentou os três descontos e a curva hiperbólica. Aqui está por que o formato importa mais que a inclinação — e o que ele prevê sobre compromisso antecipado.`,
  `A aula descreveu a decisão fechando ao cruzar um limiar. Aqui está como isso foi medido em neurônios e por que o modelo se aplica bem além do laboratório.`
];

DEEP['decisao']=[
  `<p>A evidência mais direta da moeda comum veio de registrar neurônios do <b>orbitofrontal</b> enquanto o animal escolhia entre diferentes sucos em diferentes quantidades. Uma parte das células acompanha o <b>valor da opção escolhida</b>, e não qual suco era nem que movimento seria feito — a mesma célula responde igual a bens distintos de valor equivalente.</p><p>Há um detalhe que complica a história de forma interessante: a escala é <b>relativa ao conjunto disponível</b>. As mesmas células recalibram conforme a faixa de opções daquele contexto. Isso é eficiente — usa toda a resolução disponível para discriminar entre o que está de fato em jogo — mas tem preço: o valor de uma opção depende de com quem ela está sendo comparada. Boa parte dos vieses de escolha nasce dessa recalibração, não de irracionalidade.</p>`,
  `<p>O caso que abriu essa linha foi o de <b>Phineas Gage</b>, em 1848: uma barra de ferro atravessou seu crânio destruindo parte do pré-frontal ventromedial. Ele sobreviveu, com fala, memória e movimento preservados — e mudou de comportamento a ponto de os conhecidos dizerem que não era mais a mesma pessoa. Quase um século e meio depois, pacientes com lesões parecidas foram estudados com método: desempenho normal em testes cognitivos, e desempenho ruim na <b>Iowa Gambling Task</b>, que exige aprender por consequência qual baralho compensa.</p><p>A <b>hipótese do marcador somático</b> foi proposta para explicar isso: sinais corporais marcariam opções como boas ou ruins antes do raciocínio consciente, enfileirando os candidatos antes da deliberação. É uma ideia influente e que conecta com o módulo 07 — o corpo participando da cognição. Mas convém guardar a calibragem: <b>parte das evidências não se replicou bem</b>, e a interpretação da própria tarefa segue debatida. O achado clínico é sólido; a explicação, ainda não.</p>`,
  `<p>A diferença entre desconto <b>exponencial</b> e <b>hiperbólico</b> parece técnica e é decisiva. Com desconto exponencial, a taxa é constante e as preferências são <b>consistentes no tempo</b>: o que você escolhe hoje para daqui a um ano continua sendo o que você escolhe quando o ano chega. Com desconto hiperbólico, a taxa é altíssima perto do presente e cai depressa — e é isso que produz a <b>reversão de preferência</b>.</p><p>Daí sai uma previsão prática e testável: se o problema é que o presente pesa desproporcionalmente, então decidir <b>antecipadamente</b>, longe do momento, produz escolhas diferentes e mais alinhadas ao que você quer. É a lógica do <b>dispositivo de compromisso</b> — deixar o alarme longe da cama, contratar o plano com antecedência, combinar com alguém antes. Não é truque motivacional: é explorar o formato da própria curva, decidindo no ponto em que ela ainda está achatada.</p>`,
  `<p>O modelo de <b>difusão</b> foi validado de forma incomum: ele prevê ao mesmo tempo a <b>proporção de acertos</b> e a <b>distribuição completa dos tempos de resposta</b>, inclusive a forma assimétrica dessa distribuição. Acertar as duas coisas com poucos parâmetros é o que lhe dá força. E o correlato neural foi encontrado: neurônios do parietal <b>sobem em rampa</b> durante a deliberação, mais íngreme quando a evidência é mais clara, e a resposta sai quando a rampa chega ao topo.</p><p>A consequência prática é que <b>velocidade e acerto não são traços de personalidade</b>, e sim um parâmetro. Instruções simples — "responda o mais rápido possível" contra "seja o mais preciso possível" — deslocam o limiar de forma mensurável na mesma pessoa. Isso reposiciona o erro por pressa: não é descuido nem falta de capacidade, é um critério ajustado para baixo. E critério se ajusta de volta.</p>`
];

REFERENCES['decisao']=[
  {src:'Padoa-Schioppa & Assad (2006)', note:'Mostraram neurônios do orbitofrontal codificando valor econômico numa escala comum.'},
  {src:'Shadlen & Newsome — acúmulo de evidência', note:'Registraram a rampa parietal que sustenta o modelo de difusão da decisão.'},
  {src:'Kahneman & Tversky (1979) — Teoria do Prospecto', note:'Origem da aversão à perda e da assimetria entre ganhos e perdas.'}
];

ANATOMY['decisao']={
  title:'O caminho de uma decisão',
  caption:'Toque numa etapa para ver o que acontece nela.',
  parts:[
    {id:'opcoes', label:'Opções', blurb:'Bens de naturezas diferentes chegam sem unidade em comum entre si.'},
    {id:'avaliador', label:'Avaliador (OFC/vmPFC)', blurb:'Converte cada opção para uma escala única: o valor subjetivo.'},
    {id:'desconto', label:'Descontos', blurb:'Atraso, esforço e risco reduzem o valor antes da comparação.'},
    {id:'acumulo', label:'Acúmulo de evidência', blurb:'O total a favor de cada opção sobe em rampa, com ruído.'},
    {id:'limiar', label:'Limiar de decisão', blurb:'O critério que precisa ser cruzado. Sua altura é a troca entre velocidade e acerto.'},
    {id:'retorno', label:'Correção pelo resultado', blurb:'O erro de previsão volta e reescreve o valor para a próxima vez.'}
  ],
  svg:`<svg class="anat-svg" viewBox="0 0 440 210" role="img" aria-label="Etapas de uma decisão: opções, avaliação, desconto, acúmulo e limiar">
    <text x="46" y="196" text-anchor="middle" font-size="8.5" fill="currentColor" opacity=".45">opções</text>
    <text x="220" y="196" text-anchor="middle" font-size="8.5" fill="currentColor" opacity=".45">avaliação</text>
    <text x="368" y="196" text-anchor="middle" font-size="8.5" fill="currentColor" opacity=".45">escolha</text>
    <path d="M74 62 L108 62" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
    <path d="M74 108 L108 108" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
    <path d="M176 86 L200 86" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
    <path d="M254 86 L276 86" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".3"/>
    <g class="apart" data-anat="decisao" data-struct="opcoes">
      <circle cx="46" cy="62" r="17" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
      <rect x="30" y="92" width="32" height="32" rx="7" fill="currentColor" fill-opacity=".26" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <g class="apart" data-anat="decisao" data-struct="avaliador">
      <rect x="110" y="60" width="64" height="52" rx="11" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="1.7"/>
      <line x1="122" y1="98" x2="162" y2="98" stroke="currentColor" stroke-width="1.5" opacity=".8"/>
      <circle cx="134" cy="98" r="3.2" fill="currentColor" fill-opacity=".85"/>
      <circle cx="153" cy="98" r="3.2" fill="currentColor" fill-opacity=".85"/>
      <text x="142" y="80" text-anchor="middle" font-size="9" fill="currentColor" opacity=".7">valor</text>
    </g>
    <g class="apart" data-anat="decisao" data-struct="desconto">
      <path d="M202 68 C214 68 222 78 224 92 C226 100 228 104 236 105" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
      <line x1="202" y1="112" x2="252" y2="112" stroke="currentColor" stroke-width="1.3" opacity=".4"/>
      <line x1="202" y1="112" x2="202" y2="64" stroke="currentColor" stroke-width="1.3" opacity=".4"/>
      <text x="228" y="126" text-anchor="middle" font-size="8" fill="currentColor" opacity=".55">tempo · esforço · risco</text>
    </g>
    <g class="apart" data-anat="decisao" data-struct="acumulo">
      <path d="M278 132 L292 118 L300 124 L312 100 L320 106 L332 84 L342 72" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
      <line x1="278" y1="140" x2="356" y2="140" stroke="currentColor" stroke-width="1.3" opacity=".4"/>
      <line x1="278" y1="140" x2="278" y2="60" stroke="currentColor" stroke-width="1.3" opacity=".4"/>
    </g>
    <g class="apart" data-anat="decisao" data-struct="limiar">
      <line x1="272" y1="64" x2="362" y2="64" stroke="currentColor" stroke-width="2.2" stroke-dasharray="6 4" opacity=".9"/>
      <circle cx="342" cy="72" r="4.6" fill="currentColor" fill-opacity=".8"/>
      <text x="317" y="56" text-anchor="middle" font-size="8.5" fill="currentColor" opacity=".6">limiar</text>
    </g>
    <g class="apart" data-anat="decisao" data-struct="retorno">
      <path d="M356 150 C300 178 200 180 142 160 C130 156 124 144 126 132" fill="none" stroke="currentColor" stroke-width="1.9" stroke-dasharray="5 4" stroke-linecap="round" opacity=".75"/>
      <path d="M122 122 L126 132 L131 124" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>
      <text x="244" y="176" text-anchor="middle" font-size="8" fill="currentColor" opacity=".5">erro de previsão reescreve o valor</text>
    </g>
  </svg>`
};

Object.assign(GLOSSARY, {
  'valor subjetivo':'A escala interna que o cérebro usa para comparar opções de naturezas diferentes. Não é preço nem quantidade: é quanto aquilo vale para você naquele momento — e muda com fome, cansaço e contexto.',
  'córtex orbitofrontal':'A região logo acima das órbitas dos olhos que atribui e atualiza o valor das opções. Lesão ali produz decisões ruins na vida real com inteligência, memória e linguagem preservadas.',
  'pré-frontal ventromedial':'A face interna e inferior do pré-frontal, que trabalha junto ao orbitofrontal na avaliação de valor e na integração de sinais corporais à decisão.',
  'aprendizagem reversa':'Teste que inverte a regra de recompensa e mede quanto tempo se leva para mudar de escolha. Avalia se o avaliador reescreve o valor — a função que falha com lesão no orbitofrontal.',
  'hipótese do marcador somático':'Proposta de que sinais corporais marcam opções como boas ou ruins antes do raciocínio explícito, orientando a escolha. Influente e ainda em disputa: parte das evidências não se replicou bem.',
  'desconto temporal':'A perda de valor de uma recompensa conforme ela se afasta no tempo. No humano a curva é hiperbólica — despenca perto do presente e achata depois —, o que produz reversão de preferência.',
  'desconto hiperbólico':'O formato da curva de desconto humana: taxa altíssima no curto prazo e baixa no longo. É o que faz alguém preferir menos agora a mais amanhã, mas mais em doze meses a menos em onze.',
  'custo de esforço':'O quanto o esforço exigido reduz o valor de uma opção antes da comparação. Calculado com participação do córtex cingulado anterior e modulado por dopamina.',
  'córtex cingulado anterior':'Região medial do frontal que participa do cálculo de custo, da detecção de conflito entre respostas e da decisão de persistir ou desistir de uma linha de ação.',
  'aversão à perda':'A assimetria pela qual perder algo pesa mais do que ganhar o equivalente. Descrita por Kahneman e Tversky, é uma das distorções mais robustas da avaliação de risco.',
  'acúmulo de evidência':'O processo pelo qual a informação a favor de cada opção é somada ao longo do tempo até que uma delas cruze o critério de decisão. Visível como rampas de disparo em neurônios do parietal.',
  'limiar de decisão':'O quanto de evidência acumulada é exigido antes de fechar a escolha. Sua altura é a troca entre velocidade e acerto — e é um parâmetro ajustável, não um traço fixo.',
  'dispositivo de compromisso':'Decidir com antecedência, longe do momento da tentação, para escapar do trecho íngreme da curva de desconto. Deixar o despertador longe da cama é um exemplo.'
});

Object.assign(TERM_FIG, {
  'valor subjetivo':'mod:decisao',
  'córtex orbitofrontal':'mod:decisao',
  'pré-frontal ventromedial':'mod:decisao',
  'aprendizagem reversa':'mod:decisao',
  'hipótese do marcador somático':'mod:decisao',
  'desconto temporal':'mod:decisao',
  'desconto hiperbólico':'mod:decisao',
  'custo de esforço':'mod:decisao',
  'córtex cingulado anterior':'mod:decisao',
  'aversão à perda':'mod:decisao',
  'acúmulo de evidência':'mod:decisao',
  'limiar de decisão':'mod:decisao',
  'dispositivo de compromisso':'mod:decisao'
});

/* --- módulo 04: integrações que dependem de estruturas definidas acima --- */
try{
  if(typeof ANAT_DEEP !== 'undefined') Object.assign(ANAT_DEEP, {
    'decisao:opcoes':'O problema começa aqui, e ele é mais radical do que parece: opções de naturezas diferentes não são <b>difíceis</b> de comparar — são <b>indefinidas</b> de comparar, como perguntar se dois quilos são maiores que três metros. Nenhuma propriedade física da comida se relaciona com nenhuma propriedade física do sono. Se o cérebro não fizesse mais nada além de representar cada opção fielmente, você travaria em toda escolha entre categorias — que é a maior parte das escolhas de um dia.',
    'decisao:avaliador':'Registros no orbitofrontal encontraram células que acompanham o <b>valor da opção escolhida</b> e não qual bem era nem que movimento seria feito: a mesma célula responde igual a bens diferentes de valor equivalente. É a assinatura de uma escala comum. O detalhe que complica de forma interessante é que a escala é <b>relativa ao conjunto disponível</b> — as células recalibram conforme a faixa de opções do contexto. Eficiente, porque usa toda a resolução no que está em jogo; mas significa que o valor de uma opção depende de com quem ela está sendo comparada.',
    'decisao:desconto':'A comparação nunca é entre valores brutos. Atraso, esforço e risco descontam cada opção <b>antes</b> dela entrar na disputa — e é por isso que uma recompensa objetivamente maior perde para uma menor: chegou à mesa com desconto grande demais. No humano o desconto temporal é <b>hiperbólico</b>: despenca perto do presente e achata depois. Esse formato, e não a inclinação, é o que produz a reversão de preferência — preferir menos agora a mais amanhã, mas mais em doze meses a menos em onze.',
    'decisao:acumulo':'Decidir não é um estalo: é uma soma que sobe com ruído. Isso foi medido célula a célula — neurônios do parietal <b>sobem em rampa</b> durante a deliberação, com inclinação maior quando a evidência é mais clara, e a resposta sai quando a rampa chega ao topo. O modelo de difusão que descreve isso acerta ao mesmo tempo a proporção de acertos e a <b>distribuição inteira</b> dos tempos de resposta, inclusive sua forma assimétrica. Acertar as duas coisas com poucos parâmetros é o que lhe dá força.',
    'decisao:limiar':'Este é o parâmetro mais útil do módulo, porque é ajustável. A <b>troca entre velocidade e acerto</b> não é um segundo mecanismo: é literalmente a altura deste limiar. Baixe e você decide rápido e erra mais; suba e acerta mais, devagar. Instruções simples deslocam essa altura de forma mensurável na <b>mesma pessoa</b>, o que reposiciona o erro por pressa: não é descuido nem incapacidade, é um critério baixo. E critério se ajusta de volta de propósito.',
    'decisao:retorno':'É aqui que este módulo se encaixa no 03. O orbitofrontal <b>atribui</b> o valor; quando o resultado chega, a dopamina sinaliza o <b>erro de previsão</b> — o quanto a realidade diferiu do esperado — e esse sinal reescreve a estimativa para a próxima vez. Um faz a aposta, o outro faz a correção. É por isso que uma lesão no orbitofrontal quebra a atualização mesmo com o sistema de dopamina intacto: a correção chega, mas não há quem a aplique.'
  });
}catch(e){}

try{
  if(typeof ANAT_TERM !== 'undefined') Object.assign(ANAT_TERM, {
    'decisao:opcoes':'valor subjetivo',
    'decisao:avaliador':'córtex orbitofrontal',
    'decisao:desconto':'desconto temporal',
    'decisao:acumulo':'acúmulo de evidência',
    'decisao:limiar':'limiar de decisão',
    'decisao:retorno':'erro de previsão'
  });
}catch(e){}

try{
  if(typeof TERM_REL !== 'undefined') Object.assign(TERM_REL, {
    'valor subjetivo':['córtex orbitofrontal','pré-frontal ventromedial','desconto temporal','aversão à perda','erro de previsão'],
    'córtex orbitofrontal':['valor subjetivo','pré-frontal ventromedial','aprendizagem reversa','hipótese do marcador somático','córtex pré-frontal','lobo frontal'],
    'pré-frontal ventromedial':['córtex orbitofrontal','hipótese do marcador somático','valor subjetivo','interocepção'],
    'aprendizagem reversa':['córtex orbitofrontal','erro de previsão','valor subjetivo'],
    'hipótese do marcador somático':['pré-frontal ventromedial','interocepção','nervo vago','córtex orbitofrontal'],
    'desconto temporal':['desconto hiperbólico','dispositivo de compromisso','valor subjetivo','custo de esforço'],
    'desconto hiperbólico':['desconto temporal','dispositivo de compromisso','valor subjetivo'],
    'custo de esforço':['córtex cingulado anterior','desconto temporal','dopamina','valor subjetivo'],
    'córtex cingulado anterior':['custo de esforço','executivo central','córtex pré-frontal'],
    'aversão à perda':['valor subjetivo','erro de previsão','amígdala'],
    'acúmulo de evidência':['limiar de decisão','lobo parietal','competição enviesada'],
    'limiar de decisão':['acúmulo de evidência','executivo central','córtex pré-frontal'],
    'dispositivo de compromisso':['desconto hiperbólico','desconto temporal','córtex pré-frontal'],
    'erro de previsão':['mesolímbica','estriado ventral','saliência de incentivo','área tegmental ventral','valor subjetivo','córtex orbitofrontal']
  });
}catch(e){}

try{
  if(typeof CONCEPTS !== 'undefined'){
    Object.assign(CONCEPTS, {
      futurodesconto:{cat:'estado', n:'O futuro parece não importar',
       q:'Por que é tão difícil abrir mão de algo agora por um ganho maior depois?',
       a:'A recompensa distante chega à comparação já <b>descontada</b>, e no humano a curva de desconto é <b>hiperbólica</b>: despenca perto do presente e achata depois. Isso não é falha de caráter — é geometria. A mesma diferença de um dia pesa muito quando é hoje contra amanhã e quase nada quando é em onze meses contra doze. Daí sai a saída prática: decidir <b>antecipadamente</b>, no ponto em que a curva ainda está achatada.',
       t:['desconto temporal','desconto hiperbólico','dispositivo de compromisso','valor subjetivo','custo de esforço','córtex pré-frontal'],
       m:[{m:'decisao',l:2},{m:'recompensa',l:2},{m:'atencao',l:2}], k:['dopamina'],
       s:['imediatismo','longo prazo','abrir mao','recompensa futura','poupar','dieta','adiar prazer']},
      escolhadificil:{cat:'estado', n:'Dificuldade de decidir',
       q:'Por que algumas escolhas travam mesmo sendo simples?',
       a:'A decisão fecha quando a evidência acumulada cruza um <b>limiar</b>. Quando as opções têm valor muito parecido, a evidência líquida a favor de qualquer uma cresce devagar, e a rampa demora a chegar ao topo — a decisão trava justamente porque tanto faz. Repare no que isso implica: travar é sinal de <b>empate</b>, não de importância. Nos empates, decidir rápido custa pouco, porque as opções valem quase o mesmo.',
       t:['acúmulo de evidência','limiar de decisão','valor subjetivo','córtex orbitofrontal','competição enviesada'],
       m:[{m:'decisao',l:3},{m:'decisao',l:0},{m:'atencao',l:0}], k:[],
       s:['indeciso','nao consigo escolher','travar na decisao','fadiga de decisao','muitas opcoes','duvida']},
      arrependimento:{cat:'estado', n:'Medo de perder',
       q:'Por que perder dói mais do que ganhar o equivalente alegra?',
       a:'A avaliação de ganhos e perdas é <b>assimétrica</b>: uma perda pesa consistentemente mais que um ganho de mesmo tamanho. Isso distorce escolhas sob risco de forma previsível — leva a manter apostas ruins para não realizar a perda e a recusar apostas favoráveis quando enquadradas como risco de perder. Reenquadrar a mesma escolha em termos de ganho muda a decisão, com os números idênticos.',
       t:['aversão à perda','valor subjetivo','erro de previsão','amígdala','córtex orbitofrontal'],
       m:[{m:'decisao',l:2},{m:'recompensa',l:1},{m:'emocao',l:0}], k:[],
       s:['medo de perder','risco','aposta','arrependimento','prejuizo','seguranca']}
    });
    if(typeof SIDX !== 'undefined') SIDX = null;  // força reconstrução do índice de busca
  }
}catch(e){}


/* --- ordem pedagogica: decisao junto de recompensa, autonomo junto de emocao --- */
(function reorderModules(){
  try{
    var ORDEM = ['neuronio','plasticidade','recompensa','decisao','atencao','emocao','autonomo','sono','neuroanatomia','sensorial','motor','desenvolvimento','linguagem','clinica','farmacologia','metodos'];
    var porId = {};
    MODULES.forEach(function(m){ porId[m.id] = m; });
    var novo = [];
    ORDEM.forEach(function(id){ if(porId[id]) novo.push(porId[id]); });
    MODULES.forEach(function(m){ if(novo.indexOf(m) < 0) novo.push(m); });
    if(novo.length !== MODULES.length) return;   // algo faltou: nao mexe
    MODULES.length = 0;
    novo.forEach(function(m, i){
      m.n = String(i + 1).length < 2 ? '0' + (i + 1) : String(i + 1);
      MODULES.push(m);
    });
  }catch(e){}
})();

const LINKS = {
dopamina:{ n:"Dopamina", c:"var(--cyan)",
 ideia:"A mesma molécula faz coisas diferentes conforme o CIRCUITO em que age. Não existe uma função da dopamina — existe o que ela faz em cada endereço.",
 onde:[
  {m:"neuronio", l:3, p:"É um NEUROMODULADOR: não entrega a mensagem, ajusta o ganho de redes inteiras."},
  {m:"recompensa", l:1, p:"Sinaliza ERRO DE PREVISÃO: dispara quando a realidade supera a expectativa."},
  {m:"recompensa", l:3, p:"Ao migrar da recompensa para a DEIXA, ela transfere o controle para o hábito."},
  {m:"motor", l:2, p:"Regula o PORTÃO dos gânglios da base: por D1 excita o siga; por D2 inibe o não-siga."},
  {m:"clinica", l:1, p:"Sua perda na substância negra causa o PARKINSON."},
  {m:"farmacologia", l:3, p:"A cocaína bloqueia sua recaptação; os antipsicóticos bloqueiam D2."}],
 fecho:"Junte tudo: um antipsicótico bloqueia D2 → o não-siga deixa de ser inibido → o portão motor fecha → o paciente desenvolve sintomas de PARKINSON. Três módulos, uma única cadeia. Nenhum deles te diz isso sozinho."},

"erro-previsao":{ n:"Erro de previsão", c:"var(--amber)",
 ideia:"O cérebro não aprende com o que acontece. Aprende com a DIFERENÇA entre o que ele esperava e o que aconteceu. Essa é, talvez, a ideia mais unificadora de toda a neurociência.",
 onde:[
  {m:"recompensa", l:1, p:"Dopamina = erro de previsão de RECOMPENSA. Melhor que o esperado: dispara. Igual: nada."},
  {m:"motor", l:2, p:"O cerebelo = erro de previsão do MOVIMENTO. As fibras trepadeiras sinalizam a diferença entre o gesto previsto e o realizado."},
  {m:"sensorial", l:1, p:"A visão PREENCHE o ponto cego com o palpite mais provável. Perceber já é prever."},
  {m:"plasticidade", l:1, p:"O NMDA só abre com coincidência — ele detecta quando a previsão de uma célula bate com a atividade da outra."}],
 fecho:"A MESMA computação, em três moedas: recompensa, movimento, percepção. Quando você entende uma, entendeu as três. E é exatamente por isso que raciocinar antes de ler funciona: você está fabricando um erro de previsão de propósito."},

calcio:{ n:"Cálcio (Ca2+)", c:"var(--violet)",
 ideia:"O íon que traduz. Sempre que algo elétrico precisa virar algo químico ou estrutural, é o cálcio que faz a ponte.",
 onde:[
  {m:"neuronio", l:2, p:"Entra no terminal e FUNDE as vesículas: é ele que converte o elétrico em químico."},
  {m:"plasticidade", l:1, p:"Entra pelo NMDA e ativa a CaMKII: aqui ele vira o SINAL DE APRENDIZADO."},
  {m:"motor", l:3, p:"Entra no terminal motor e libera acetilcolina na junção neuromuscular."}],
 fecho:"Mesmo íon, três papéis: comunicar, aprender e mover. Quando você vê o cálcio entrando em cena, sempre pergunte: o que está sendo TRADUZIDO aqui?"},

inibicao:{ n:"Inibição", c:"var(--rose)",
 ideia:"Quase tudo o que o cérebro faz de sofisticado é feito SUPRIMINDO, não somando. Escolher é, quase sempre, calar as alternativas.",
 onde:[
  {m:"neuronio", l:3, p:"O GABA é o freio: sem ele, a excitação vira epilepsia."},
  {m:"atencao", l:2, p:"Prestar atenção é INIBIR o que compete — não é iluminar o alvo."},
  {m:"motor", l:2, p:"A via indireta suprime os movimentos CONCORRENTES para que o escolhido saia limpo."},
  {m:"desenvolvimento", l:2, p:"A poda REMOVE sinapses. O cérebro é esculpido por subtração."},
  {m:"emocao", l:1, p:"O cortisol desliga o próprio eixo do estresse — retroalimentação negativa."}],
 fecho:"Selecionar um movimento, focar num objetivo, formar um circuito, encerrar o estresse: em todos, o trabalho pesado é feito pelo FREIO. Se você só procurar o que ativa, vai entender metade do cérebro."},

habito:{ n:"Gânglios da base e o hábito", c:"var(--green)",
 ideia:"O mesmo circuito que escolhe um MOVIMENTO escolhe um HÁBITO. Não é analogia: é o mesmo hardware resolvendo o mesmo problema — selecionar uma ação e suprimir as outras.",
 onde:[
  {m:"recompensa", l:3, p:"O controle migra do estriado VENTRAL (meta) para o DORSAL (rotina). O hábito nasce."},
  {m:"motor", l:2, p:"O portão seleciona e libera o movimento desejado, suprimindo os concorrentes."},
  {m:"motor", l:3, p:"Um gesto muito treinado MIGRA para o cerebelo e os gânglios da base e vira automático."},
  {m:"clinica", l:1, p:"Sem dopamina, o portão trava: Parkinson."},
  {m:"farmacologia", l:3, p:"Na dependência, as DEIXAS seguem disparando a rotina mesmo sem prazer."}],
 fecho:"Um vício e um gesto automático são o MESMO fenômeno, no mesmo circuito. É por isso que nenhum dos dois se resolve com força de vontade — e por que os dois cedem quando você muda a DEIXA."},

"pre-frontal":{ n:"Córtex pré-frontal", c:"var(--blue)",
 ideia:"O circuito mais caro do cérebro — e por isso o primeiro a cair. Quase todo problema de autocontrole passa por aqui.",
 onde:[
  {m:"atencao", l:2, p:"Segura o objetivo e inibe a distração. É o maestro."},
  {m:"atencao", l:1, p:"Sustenta a memória de trabalho por disparo persistente — frágil e caro."},
  {m:"emocao", l:2, p:"Acima de um limiar de estresse, ele é DESLIGADO e a amígdala assume."},
  {m:"sono", l:0, p:"Sem sono, é o primeiro a degradar."},
  {m:"recompensa", l:3, p:"Perde o controle para o estriado dorsal quando o hábito se forma."},
  {m:"desenvolvimento", l:3, p:"É o último a completar a mielinização — só termina lá pelos 25 anos."}],
 fecho:"Sono ruim, estresse alto, hábito instalado, cérebro ainda em formação: TODOS derrubam o mesmo circuito. Autocontrole não é caráter — é um recurso com custo, e quase tudo na sua rotina está cobrando dele."},

hipocampo:{ n:"Hipocampo", c:"var(--orange)",
 ideia:"O gargalo da memória — e, não por acaso, uma das estruturas mais vulneráveis do cérebro.",
 onde:[
  {m:"plasticidade", l:3, p:"Ajuda a ligar a memória nova e participa de sua reorganização com redes corticais (consolidação sistêmica)."},
  {m:"sono", l:0, p:"É durante o sono que ele faz o replay e entrega o traço ao córtex."},
  {m:"emocao", l:1, p:"O cortisol crônico o DANIFICA — e ele é justamente quem ajudaria a desligar o cortisol."},
  {m:"clinica", l:1, p:"É onde o Alzheimer começa. Daí a memória ser o primeiro sintoma."}],
 fecho:"Estresse crônico ataca o hipocampo. Falta de sono impede o hipocampo de descarregar. Alzheimer começa nele. Se existe uma estrutura para proteger, é essa — e as duas alavancas são sono e estresse."},

plasticidade:{ n:"Use ou perca", c:"var(--lime)",
 ideia:"O cérebro não guarda: ele se REESCREVE. E o que não é usado não fica parado — é ativamente removido.",
 onde:[
  {m:"plasticidade", l:0, p:"LTP fortalece o usado; LTD enfraquece; a micróglia poda o que sobrou fraco."},
  {m:"desenvolvimento", l:2, p:"A poda infantil corta o que a experiência não validou."},
  {m:"sono", l:0, p:"O sono reescalona TODAS as sinapses para baixo, preservando o contraste."},
  {m:"sensorial", l:0, p:"Um córtex privado do seu sentido é TOMADO por outro."},
  {m:"farmacologia", l:2, p:"O antidepressivo parece funcionar por reabrir a plasticidade — não por elevar a serotonina."}],
 fecho:"Aprender, dormir, crescer, cegar, tratar depressão: é tudo o mesmo motor. O cérebro está sempre esculpindo — a única questão é o que você está dando a ele para esculpir."},

sono:{ n:"Sono", c:"var(--teal)",
 ideia:"Não é uma pausa no trabalho. É o turno em que o trabalho de fixar, limpar e reequilibrar acontece.",
 onde:[
  {m:"plasticidade", l:3, p:"A consolidação que o espaçamento depende acontece, em boa parte, dormindo."},
  {m:"sono", l:2, p:"O sistema glinfático lava os resíduos — inclusive a beta-amiloide."},
  {m:"atencao", l:2, p:"Sem sono, o pré-frontal degrada e o autocontrole desaba."},
  {m:"emocao", l:3, p:"O estado que o sono define ajusta o ganho ANTES de qualquer esforço."},
  {m:"clinica", l:1, p:"Privação crônica está ligada ao acúmulo de beta-amiloide e ao risco de Alzheimer."},
  {m:"farmacologia", l:1, p:"A cafeína não repõe sono: apenas apaga o alarme da adenosina."}],
 fecho:"Cortar sono para estudar mais é o negócio mais mal feito possível: você troca as horas em que o material seria FIXADO por horas em que ele é apenas exposto — e ainda derruba o circuito que você vai precisar amanhã."},

coincidencia:{ n:"A porta E (coincidência)", c:"var(--violet)",
 ideia:"O cérebro usa a mesma primitiva computacional em lugares que parecem não ter nada a ver: só dispara quando DUAS condições acontecem juntas.",
 onde:[
  {m:"plasticidade", l:1, p:"O NMDA só abre com glutamato E membrana despolarizada. É uma porta E feita de um íon magnésio."},
  {m:"sono", l:3, p:"Você só adormece com pressão de sono alta E o relógio circadiano permitindo."},
  {m:"emocao", l:0, p:"A amígdala dispara pela via rápida; o córtex depois confirma — duas condições, dois tempos."}],
 fecho:"Detectar coincidência é como o cérebro separa CAUSA de acaso. Sempre que você vir um E lógico, procure o que ele está impedindo de acontecer por engano."}
};

/* ---------- A CADEIA: o mecanismo que você pode RODAR ---------- */
function chainHTML(mid, idx){
  const c = CHAIN[mid] && CHAIN[mid][idx];
  if(!c) return '';
  const steps = c.s.map((t,i)=>{
    const hinge = (i === c.h);
    return `<li class="cstep${hinge?' hinge':''}">
      <span class="cnum">${i+1}</span>
      <span class="ctext">${t}</span>
      ${hinge?'<span class="chinge-tag">a dobradiça</span>':''}
    </li>`;
  }).join('');
  return `<div class="chain">
    <div class="chain-k">O mecanismo &middot; rode na cabeça</div>
    <ol class="csteps">${steps}</ol>
    <div class="chinge">
      <div class="chinge-h">Por que este passo é a dobradiça</div>
      <p>${c.hn}</p>
    </div>
    <button class="cwhat" onclick="toggleWhatIf(${idx},event)" aria-expanded="false">${c.w} <span class="chev">\u25be</span></button>
    <div class="cwhat-a" id="whatif-${idx}" hidden><p>${c.wa}</p></div>
    ${c.lim ? `<div class="clim"><div class="clim-h">Até onde a ciência sabe</div><p>${c.lim}</p></div>` : ''}
  </div>`;
}
function toggleWhatIf(idx, ev){
  const el = document.getElementById('whatif-'+idx);
  const btn = ev && ev.currentTarget;
  if(!el) return;
  const open = !el.hidden;
  el.hidden = open;
  if(btn){ btn.setAttribute('aria-expanded', String(!open)); btn.classList.toggle('open', !open); }
}

/* ---------- OS ELOS: como isto se liga a outras coisas ---------- */
/* =====================================================================
   O QUE ESTE MECANISMO EXPLICA

   As 57 fichas de CONCEPTS já declaram, em `m`, quais aulas explicam cada
   condição ou queixa. A ponte era de mão única: a ficha conhecia a aula, e
   a aula não conhecia a ficha. Quem estudava o pré-frontal nunca ficava
   sabendo que aquele mecanismo é o do próprio TDAH.

   Isto inverte o mapa. Não há conteúdo novo — 52 das 64 aulas já são
   citadas por alguma ficha, 33 delas por ao menos uma condição.
   ===================================================================== */
const ORDEM_CATEGORIA = ['condicao', 'estado', 'desempenho', 'fenomeno', 'substancia'];
let _conceitosPorAula = null;
function conceitosQueUsam(moduleId, lessonIndex){
  if(!_conceitosPorAula){
    _conceitosPorAula = {};
    Object.keys(CONCEPTS).forEach(k=>{
      (CONCEPTS[k].m || []).forEach(a=>{
        const id = a.m + '-' + a.l;
        (_conceitosPorAula[id] = _conceitosPorAula[id] || []).push(k);
      });
    });
    /* Condição primeiro, depois estado/queixa. Quem tem diagnóstico procura
       por ele; quem não tem procura pelo que sente. */
    Object.keys(_conceitosPorAula).forEach(id=>{
      _conceitosPorAula[id].sort((a,b)=>
        ORDEM_CATEGORIA.indexOf(CONCEPTS[a].cat) - ORDEM_CATEGORIA.indexOf(CONCEPTS[b].cat));
    });
  }
  return _conceitosPorAula[moduleId + '-' + lessonIndex] || [];
}
function explicaChipsHTML(mid, idx){
  const ks = conceitosQueUsam(mid, idx);
  if(!ks.length) return '';
  /* Sem teto de propósito: a fileira quebra linha. Em clinica-3 são nove
     fichas, e esconder parte delas numa aula que é justamente sobre
     transtornos seria pior que uma fileira longa. */
  return `<div class="lnk-row explica-row">
    <span class="lnk-k">Explica</span>
    ${ks.map(k=>`<button class="lnk-chip" style="--lc:var(--mc)" onclick="fromLessonToConcept('${esc1(k)}')">${escHtml(CONCEPTS[k].n)}</button>`).join('')}
  </div>`;
}
// mesmo caminho que fromTermToConcept já usa: a ficha vive dentro da busca
function fromLessonToConcept(k){
  openSearch('');
  setTimeout(()=>openConcept(k), 60);
}

function linksFor(mid, idx){
  const out = [];
  Object.keys(LINKS).forEach(k=>{
    if(LINKS[k].onde.some(o=>o.m===mid && o.l===idx)) out.push(k);
  });
  return out;
}
function linkChipsHTML(mid, idx){
  const ks = linksFor(mid, idx);
  if(!ks.length) return '';
  return `<div class="lnk-row">
    <span class="lnk-k">Conecta com</span>
    ${ks.map(k=>`<button class="lnk-chip" style="--lc:${LINKS[k].c}" onclick="openLink('${k}',this)">${LINKS[k].n}</button>`).join('')}
  </div>`;
}
function modTitle(mid){ const m = MODULES.find(x=>x.id===mid); return m? (m.n+' '+m.title) : mid; }
function modIndex(mid){ return MODULES.findIndex(x=>x.id===mid); }

let lkOpener = null;
function openLink(key, opener){
  const L = LINKS[key];
  if(!L) return;
  const back = document.getElementById('link-modal');
  if(!back) return;
  lkOpener = opener || null;
  document.getElementById('lk-name').textContent = L.n;
  document.getElementById('lk-ideia').textContent = L.ideia;
  document.getElementById('lk-card').style.setProperty('--lc', L.c);
  document.getElementById('lk-where').innerHTML = L.onde.map(o=>{
    const mi = modIndex(o.m);
    const lt = (MODULES[mi] && MODULES[mi].lessons[o.l]) ? MODULES[mi].lessons[o.l].t : '';
    return `<button class="lk-row" onclick="jumpTo('${o.m}',${o.l})">
        <span class="lk-mod">${modTitle(o.m)} &middot; ${lt}</span>
        <span class="lk-role">${o.p}</span>
        <span class="lk-go">ir &rarr;</span>
      </button>`;
  }).join('');
  document.getElementById('lk-fecho').innerHTML = L.fecho;
  back.hidden = false;
  document.body.style.overflow='hidden';
  pushOverlayState('link-modal');
  const c = document.getElementById('lk-close'); if(c) try{ c.focus(); }catch(e){}
}
function closeLink(fromPop){
  const back = document.getElementById('link-modal');
  if(!back || back.hidden) return;
  back.hidden = true;
  document.body.style.overflow='';
  if(lkOpener){ try{ lkOpener.focus({preventScroll:true}); }catch(e){} lkOpener = null; }
  if(fromPop !== true){ try{ history.back(); }catch(e){} }
}
function jumpTo(mid, li){
  // fecha o modal sem consumir uma entrada extra do histórico
  closeLink(true);
  // sobrescreve o state do overlay para evitar entrada órfã no histórico
  try{ history.replaceState({nl:true,view:'dashboard',mod:null},''); }catch(e){}
  const mi = modIndex(mid);
  if(mi < 0) return;
  openModule(mi);
  setTimeout(()=>{
    const el = document.getElementById('lesson-'+li);
    if(el){ el.scrollIntoView({behavior:'smooth', block:'center'}); el.classList.add('jumped'); setTimeout(()=>el.classList.remove('jumped'), 1600); }
  }, 120);
}

function renderLinkHub(){
  const host = document.getElementById('db-links');
  if(!host) return;
  host.innerHTML = `
    <div class="two-k">Conexões entre os módulos</div>
    <p class="lnk-intro">Os mesmos conceitos atravessam módulos diferentes fazendo coisas diferentes. Toque para ver a cadeia inteira.</p>
    <div class="lnk-grid">
      ${Object.keys(LINKS).map(k=>`<button class="lnk-chip big" style="--lc:${LINKS[k].c}" onclick="openLink('${k}',this)">${LINKS[k].n}<span class="lnk-n">${LINKS[k].onde.length} módulos</span></button>`).join('')}
    </div>`;
}

function scrollModuleSection(id){
  const el=document.getElementById(id);
  if(!el) return;
  const offset=(document.querySelector('.top')?.getBoundingClientRect().height||0)+76;
  const top=window.scrollY+el.getBoundingClientRect().top-offset;
  // Saltos de navegação precisam terminar no mesmo quadro. Em páginas longas,
  // a animação suave ainda estava em curso quando o aluno já esperava estar na seção.
  window.scrollTo({top:Math.max(0,top),behavior:'auto'});
  if(/^lesson-\d+$/.test(id)){
    el.classList.add('jumped');
    setTimeout(()=>el.classList.remove('jumped'),1200);
  }
}
function renderModuleNavigator(m){
  const host=document.getElementById('md-section-nav');
  if(!host) return;
  const items=[
    ['md-visual-lab','Visuais','primary'],
    ...m.lessons.map((l,i)=>['lesson-'+i,(i+1)+' · '+l.t,'']),
    ['md-imagine','Metáfora',''],
    ['md-mindmap','Mapa',''],
    ['md-refs','Fontes',''],
    ['md-quizcta','Teste','primary']
  ];
  host.innerHTML=items.map(([id,label,kind])=>`<button type="button" class="${kind}" onclick="scrollModuleSection('${id}')">${label}</button>`).join('');
  host.scrollLeft=0;
}

function openModule(i){
  currentModule=i;
  const m=MODULES[i];
  state.lastModule=i; state.lastStudiedAt=Date.now();
  const _note=document.getElementById('md-note');
  if(_note){
    const risky=(m.id==='clinica'||m.id==='farmacologia');
    _note.hidden=!risky;
    _note.innerHTML = risky ? '<strong>Conteúdo educacional.</strong> Não substitui avaliação, diagnóstico ou orientação de um profissional de saúde.' : '';
  }
  document.documentElement.style.setProperty('--mc',m.color);
  // head
  document.getElementById('md-head').style.borderLeftColor=m.color;
  document.getElementById('md-head').innerHTML=`
    <div class="mn">MÓDULO ${m.n}</div>
    <h2>${m.title}</h2>
    <p>${m.intro}</p>`;
  renderAnatomy(m);
  wireAnatA11y(m);
  renderFunctional(m);
  renderIntegrated(m);
  setVisualMode('anatomy');
  // lessons
  const wrap=document.getElementById('md-lessons');
  wrap.innerHTML='';
  m.lessons.forEach((l,idx)=>{
    const read=!!state.lessons[m.id+'-'+idx];
    const tm=topicMastery(m.id,idx);
    const div=document.createElement('div');
    div.className='lesson'+(read?' read':'');
    div.style.setProperty('--mc',m.color);
    div.id='lesson-'+idx;
    div.innerHTML=`
      <div class="lesson-in">
        <div class="lh"><div class="lnum">${idx+1}</div><h3>${l.t}</h3></div>
        ${predictHTML(m.id, idx)}
        <div class="body${predVeiled(m.id,idx)?' pveil':''}" id="lbody-${idx}">${l.b}</div>
        ${(DEEP[m.id]&&DEEP[m.id][idx])?`<button class="deep-toggle" onclick="toggleDeep(${idx},event)" aria-expanded="false"><span class="deep-label">Aprofundar</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="deepdive" id="deep-${idx}" hidden>${deepBridge(m.id,idx)}${DEEP[m.id][idx]}</div>`:''}
        ${chainHTML(m.id, idx)}
        ${linkChipsHTML(m.id, idx)}
        ${explicaChipsHTML(m.id, idx)}
        ${topicDimensionStripHTML(m.id,idx)}
        <div class="topic-meter"><span>melhor no tópico</span><div class="tmbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(tm*100)}" aria-label="Melhor resultado no tópico"><i style="width:${tm*100}%"></i></div><span class="tmpct">${Math.round(tm*100)}%</span></div>
        <div class="lesson-foot">
          <span class="readtag">${read?'✓ estudada':'Teste rápido ou marque quando terminar'}</span>
          <div class="mini-actions">
            <button class="readbtn" ${read?'disabled':''} onclick="markRead(${idx},event)">${read?'Concluída':'Marcar como estudada'}</button>
            <button class="readbtn alt" onclick="startMiniQuiz(${idx})">Mini quiz</button>
          </div>
        </div>
        <div id="mini-${idx}"></div>
      </div>`;
    glossify(div);
    wrap.appendChild(div);
  });
  renderImagine(m);
  renderMindMap(m);
  renderReferences(m);
  // quiz cta
  renderQuizCta();
  renderModuleNavigator(m);
  go('module');
}
function renderQuizCta(){
  const m=MODULES[currentModule];
  const done=state.doneQuiz[m.id];
  const mastery=state.mastery[m.id]||0;
  const cta=document.getElementById('md-quizcta');
  cta.style.setProperty('--mc',m.color);
  cta.style.borderColor='color-mix(in srgb,'+m.color+' 30%, var(--line))';
  cta.innerHTML=`
    <div>
      <p class="qt">${done?'Teste do módulo · melhor resultado '+Math.round(mastery*100)+'%':'Teste do módulo'}</p>
      <p class="qs">${m.quiz.length} questões · feedback explicado a cada resposta${done?' · seu melhor resultado fica guardado':''}</p>
    </div>
    <button class="bigbtn" onclick="startQuiz()">${done?'Refazer teste':'Iniciar teste'}</button>`;
}
function renderMindMap(m){
  const panel=document.getElementById('md-mindmap');
  if(!panel) return;
  const lines=m.lessons.map((l,idx)=>`├─ ${idx+1}. ${l.t} · ${Math.round(topicMastery(m.id,idx)*100)}%`).join('\n');
  panel.innerHTML=`<h3>Mapa do módulo</h3><p>Cada tópico com seu domínio atual, mais a avaliação integrada da área.</p><div class="mindmap">${m.title}\n${lines}\n└─ Avaliação integrada · ${Math.round((state.mastery[m.id]||0)*100)}%</div>`;
}
let miniQuiz={ lesson:0, i:0, correct:0, answered:false, opts:[] };
function startMiniQuiz(lessonIdx){
  miniQuiz={ lesson:lessonIdx, i:0, correct:0, answered:false, opts:[] };
  // abre o lote: as evidências das 3 perguntas (e das auto-avaliações) viram
  // um agendamento por dimensão em finishMiniQuiz, não um por resposta
  if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
  renderMiniQuestion();
  const host=document.getElementById('mini-'+lessonIdx);
  if(host) host.scrollIntoView({behavior:'smooth',block:'center'});
}
const MINI_LEVELS=['Fundamento','Aplicação','Integração'];
function lvlChip(q){ const l=(q&&q.lvl)||0; return ` · <span class="mq-lvl l${l}">${MINI_LEVELS[l]}</span>`; }

function renderMiniQuestion(){
  const m=MODULES[currentModule];
  const qs=(MINI_QUIZZES[m.id] && MINI_QUIZZES[m.id][miniQuiz.lesson]) || [];
  const host=document.getElementById('mini-'+miniQuiz.lesson);
  if(!host || !qs.length) return;
  const q=qs[miniQuiz.i];
  miniQuiz.answered=false;
  miniQuiz.opts=shuffleOptions(q.o, q.c);
  const letters=['A','B','C','D','E'];
  host.innerHTML=`
    <div class="miniquiz-card">
      <div class="mq-k">Mini quiz · ${m.lessons[miniQuiz.lesson].t} · ${miniQuiz.i+1}/${qs.length}${lvlChip(q)}${dimensionChipHTML(q,{source:'mini'})}</div>
      <h4>${q.q}</h4>
      ${deepOn()? thinkHTML('mq'+miniQuiz.lesson) : ''}
      <div class="mq-options${deepOn()?' veiled':''}" id="mq${miniQuiz.lesson}-opts">
        ${miniQuiz.opts.map((op,k)=>`<button data-k="${k}" onclick="answerMini(${k})"><span class="mk">${letters[k]}</span><span>${op.text}</span></button>`).join('')}
      </div>
      <div class="mq-feedback" id="mq-fb-${miniQuiz.lesson}" aria-live="polite"></div>
    </div>`;
}
/* =====================================================================
   TERMOS CLICÁVEIS NO FEEDBACK DO QUIZ

   Os termos já são clicáveis no texto da aula. Quem aprendeu esse gesto
   tentava usá-lo no feedback do quiz e não acontecia nada — não era falta
   de recurso, era promessa quebrada pela própria interface.

   Só depois de responder. Antes da resposta isso trocaria recordação por
   consulta, e o valor do quiz vem do esforço de lembrar.
   ===================================================================== */

/* Trabalha sobre nós de texto já no DOM, não sobre a string de HTML. O
   feedback traz <strong> dentro, e expressão regular em cima de marcação
   cedo ou tarde quebra um atributo. Andando pelos nós de texto, o que é
   marcação nunca é visitado. */
const FBTERM_LETRA = /[0-9A-Za-zÀ-ÖØ-öø-ÿ]/;

function linkGlossaryTerms(root){
  if(!root || typeof GLOSSARY !== 'object') return;
  /* Mais longos primeiro: "memória de trabalho" tem de ganhar de "memória",
     senão o termo curto consome o começo do longo e sobra um caco. */
  const termos = Object.keys(GLOSSARY).sort((a,b)=>b.length-a.length);
  const usados = new Set();
  for(const termo of termos){
    if(usados.has(termo)) continue;
    /* Um nó por vez, sempre relendo: cada ligação parte o nó em três e
       invalida a lista anterior. */
    const nos = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        /* Não liga dentro do que já é botão, link ou termo ligado. */
        for(let p=n.parentNode; p && p!==root; p=p.parentNode){
          const t=(p.tagName||'').toLowerCase();
          if(t==='button' || t==='a' || (p.classList && p.classList.contains('fbterm-exp'))) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n; while((n = walker.nextNode())) nos.push(n);

    for(const no of nos){
      const texto = no.nodeValue;
      const i = texto.toLowerCase().indexOf(termo.toLowerCase());
      if(i < 0) continue;
      /* Fronteira de palavra feita à mão: o \b do JS trata letra acentuada
         como não-palavra, então "córtex" casaria no meio de outra coisa. */
      const antes = i > 0 ? texto[i-1] : '';
      const depois = i+termo.length < texto.length ? texto[i+termo.length] : '';
      if((antes && FBTERM_LETRA.test(antes)) || (depois && FBTERM_LETRA.test(depois))) continue;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fbterm';
      btn.setAttribute('aria-expanded','false');
      btn.textContent = texto.slice(i, i+termo.length);
      btn.onclick = function(){ toggleFbTerm(this, termo); };

      const fim = no.splitText(i);
      fim.nodeValue = fim.nodeValue.slice(termo.length);
      no.parentNode.insertBefore(btn, fim);
      usados.add(termo);
      break; /* uma ocorrência por termo; ligar todas vira campo minado */
    }
  }
}

function toggleFbTerm(btn, termo){
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  const bloco = btn.parentNode.querySelector('.fbterm-exp[data-t="'+termo+'"]');
  if(aberto){
    btn.setAttribute('aria-expanded','false');
    if(bloco) bloco.remove();
    return;
  }
  /* Um aberto por vez dentro do mesmo feedback: dois ou três empilhados
     afastam o botão de continuar da mão do aluno. */
  const host = btn.closest('.mq-feedback, #rv-fb') || btn.parentNode;
  host.querySelectorAll('.fbterm[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
  host.querySelectorAll('.fbterm-exp').forEach(e=>e.remove());

  const def = GLOSSARY[termo];
  if(!def) return;
  const exp = document.createElement('div');
  exp.className = 'fbterm-exp';
  exp.setAttribute('data-t', termo);
  exp.innerHTML = '<b>'+escHtml(termo)+'</b>' + escHtml(def);
  if(typeof openTermModal === 'function'){
    const mais = document.createElement('button');
    mais.type = 'button';
    mais.className = 'fbterm-more';
    mais.textContent = 'Ver onde este termo entra no mecanismo';
    mais.onclick = ()=>openTermModal(termo, null);
    exp.appendChild(mais);
  }
  btn.setAttribute('aria-expanded','true');
  btn.parentNode.insertBefore(exp, btn.nextSibling);
}

function answerMini(k){
  if(miniQuiz.answered) return;
  miniQuiz.answered=true;
  const m=MODULES[currentModule];
  const qs=MINI_QUIZZES[m.id][miniQuiz.lesson];
  const q=qs[miniQuiz.i];
  const chosen=miniQuiz.opts[k];
  const right=chosen.correct;
  const host=document.getElementById('mini-'+miniQuiz.lesson);
  host.querySelectorAll('.mq-options button').forEach(btn=>{
    const kk=+btn.dataset.k;
    btn.disabled=true;
    if(miniQuiz.opts[kk].correct) btn.classList.add('correct');
    else if(kk===k) btn.classList.add('wrong');
  });
  if(right) miniQuiz.correct++;
  if(typeof recordDimensionEvidence==='function'){ const dim=inferQuestionDimension(q,{module:m,lessonIndex:miniQuiz.lesson,source:'mini'}); recordDimensionEvidence(topicScope(topicKey(m.id,miniQuiz.lesson)),dim,right?1:0,'mini-quiz',{questionId:'M:'+topicKey(m.id,miniQuiz.lesson)+':'+miniQuiz.i}); }
  if(typeof refreshTopicKnowledge==='function') refreshTopicKnowledge(m.id,miniQuiz.lesson);
  state.attempts=(state.attempts||0)+1;
  if(right) state.correctTotal=(state.correctTotal||0)+1; else state.wrongTotal=(state.wrongTotal||0)+1;
  const mk=topicKey(m.id,miniQuiz.lesson);
  if(!right) state.miniWrong[mk]=(state.miniWrong[mk]||0)+1;
  let gained=0;
  const creditKey=mk+'-'+miniQuiz.i;
  if(right && !state.miniCredit[creditKey]){ state.miniCredit[creditKey]=true; gained=XP.mini; }
  const fb=document.getElementById('mq-fb-'+miniQuiz.lesson);
  const nlabel = miniQuiz.i+1<qs.length?'Próxima':'Concluir mini quiz';
  fb.innerHTML=`<div class="mq-verd" style="color:${right?'var(--good)':'var(--bad)'}">${right?'✓ Resposta certa':'✕ Esse ponto ainda está instável'}${gained>0?' · +'+gained+' XP':''}</div><p>${right?q.er:q.ew}</p>
    ${deepOn()
      ? selfRateHTML('mq'+miniQuiz.lesson, 'M:'+mk+':'+miniQuiz.i, 'nextMini', nlabel)
      : `<div class="fbnav"><button class="bigbtn" onclick="nextMini()">${nlabel}</button></div>`}`;
  linkGlossaryTerms(fb);
  if(gained>0) awardXP(gained,{currentTarget:fb}); else saveState();
  revealAfterAnswer('mq-fb-'+miniQuiz.lesson);
}
function nextMini(){
  const m=MODULES[currentModule];
  const qs=MINI_QUIZZES[m.id][miniQuiz.lesson];
  if(miniQuiz.i+1<qs.length){ miniQuiz.i++; renderMiniQuestion(); focusCardTop('#mini-'+miniQuiz.lesson+' .miniquiz-card'); return; }
  finishMiniQuiz();
}
function finishMiniQuiz(){
  const m=MODULES[currentModule];
  const qs=MINI_QUIZZES[m.id][miniQuiz.lesson];
  const score=miniQuiz.correct/qs.length;              // reconhecimento (múltipla escolha)
  const mk=topicKey(m.id,miniQuiz.lesson);
  const prev=state.topicMastery[mk]||0;
  state.topicMastery[mk]=Math.max(prev,score);
  if(score>=0.5 && !state.lessons[mk]){ state.lessons[mk]=true; }

  // nota de EXPLICAÇÃO desta aula, vinda da auto-avaliação
  const keys = qs.map((_,i)=>'M:'+mk+':'+i);
  const rated = keys.filter(k=>state.selfRate && state.selfRate[k]!==undefined);
  if(rated.length === qs.length){
    const ex = keys.reduce((a,k)=>a+(RATE_VAL[state.selfRate[k]]||0),0)/qs.length;
    state.topicExplain[mk] = Math.max(state.topicExplain[mk]||0, ex);
  }
  /* O agendamento sai do lote: cada dimensão medida nesta sessão recebe uma
     decisão de intervalo. A auto-avaliação já entrou no lote como evidência
     'self-rate' quando foi respondida, então continua puxando o intervalo
     para baixo quando o aluno diz que não saberia explicar — só que agora na
     dimensão que aquela pergunta media, em vez de no tópico inteiro. */
  if(typeof commitEvidenceBatch==='function') commitEvidenceBatch();
  saveState();
  const lessonIdx=miniQuiz.lesson;
  openModule(currentModule);
  setTimeout(()=>{ const el=document.getElementById('lesson-'+lessonIdx); if(el) el.scrollIntoView({behavior:'smooth',block:'center'}); }, 100);
}
function markRead(idx,ev){
  const m=MODULES[currentModule];
  const key=m.id+'-'+idx;
  if(state.lessons[key]) return;
  state.lessons[key]=true;
  seedTopic(topicKey(m.id,idx));
  state.lastModule=currentModule; state.lastStudiedAt=Date.now();
  awardXP(XP.lesson, ev);
  // update the lesson card
  const div=document.getElementById('lesson-'+idx);
  div.classList.add('read');
  const btn=div.querySelector('.readbtn'); btn.disabled=true; btn.textContent='Concluída';
  div.querySelector('.readtag').textContent='✓ estudada · +'+XP.lesson+' XP';
  renderQuizCta();
}

/* =====================================================================
   QUIZ
   ===================================================================== */
let quiz={ mod:0, i:0, correct:0, answered:false };
function startQuiz(){
  // lote aberto: uma decisão de intervalo por dimensão no fim, não uma por questão
  if(typeof beginEvidenceBatch==='function') beginEvidenceBatch();
  const m=MODULES[currentModule];
  quiz={ mod:currentModule, i:0, correct:0, answered:false };
  document.documentElement.style.setProperty('--mc',m.color);
  document.getElementById('qz-back').onclick=()=>{ openModule(currentModule); };
  renderQuestion();
  go('quiz');
}
function renderQuestion(){
  const m=MODULES[quiz.mod];
  const q=m.quiz[quiz.i];
  quiz.answered=false;
  quiz.opts=shuffleOptions(q.o, q.c);
  const total=m.quiz.length;
  document.getElementById('qz-count').textContent=String(quiz.i+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
  document.getElementById('qz-barfill').style.width=((quiz.i)/total*100)+'%';
  const body=document.getElementById('qz-body');
  const letters=['A','B','C','D','E'];
  body.innerHTML=`
    <div class="qcard">
      <div class="qkicker">${m.title} · questão ${quiz.i+1}${dimensionChipHTML(q,{source:'module'})}</div>
      <p class="qtext">${q.q}</p>
      ${deepOn()? thinkHTML('qz') : ''}
      <div class="opts${deepOn()?' veiled':''}" id="qz-opts" role="group" aria-label="Opções de resposta">
        ${quiz.opts.map((op,k)=>`<button class="opt" data-k="${k}" onclick="answer(${k})"><span class="k">${letters[k]}</span><span>${op.text}</span></button>`).join('')}
      </div>
      <div id="qz-fb" aria-live="polite"></div>
    </div>`;
}
function answer(k){
  if(quiz.answered) return;
  quiz.answered=true;
  const m=MODULES[quiz.mod];
  const q=m.quiz[quiz.i];
  const chosen=quiz.opts[k];
  const right = chosen.correct;
  if(typeof recordDimensionEvidence==='function'){
    const dim=inferQuestionDimension(q,{module:m,source:'module'});
    /* A questão declara a aula que cobra, então a evidência vai para o TÓPICO
       e agenda a caixa dele. Antes ia para o módulo e não agendava nada —
       era a maior atividade do app sem consequência nenhuma no cronograma. */
    const escopo = Number.isInteger(q.l) ? topicScope(topicKey(m.id,q.l)) : moduleScope(m.id);
    recordDimensionEvidence(escopo,dim,right?1:0,'module-quiz',{questionId:'Q:'+m.id+':'+quiz.i});
  }
  const opts=document.querySelectorAll('#qz-opts .opt');
  opts.forEach(o=>{
    const kk=+o.dataset.k;
    o.disabled=true;
    if(quiz.opts[kk].correct) o.classList.add('correct');
    else if(kk===k) o.classList.add('wrong');
    else o.classList.add('dim');
  });
  state.attempts=(state.attempts||0)+1;
  if(right) state.correctTotal=(state.correctTotal||0)+1; else state.wrongTotal=(state.wrongTotal||0)+1;
  // XP (one-time per question, per type)
  const ck=m.id+'-'+quiz.i;
  let gained=0;
  if(right){
    quiz.correct++;
    if(!state.creditC[ck]){ state.creditC[ck]=true; gained=XP.correct; }
  }else{
    if(!state.creditW[ck] && !state.creditC[ck]){ state.creditW[ck]=true; gained=XP.wrong; }
  }
  const fb=document.getElementById('qz-fb');
  const xppill = gained>0? `<span class="xppill">+${gained} XP</span>` : `<span class="xppill">já pontuado</span>`;
  fb.innerHTML=`
    <div class="fb ${right?'right':'wrong'}">
      <div class="fbh">${right?'✓ Correto':'✕ Não é essa'} ${xppill}</div>
      <p>${right?q.er:q.ew}</p>
    </div>
    ${deepOn()
      ? selfRateHTML('qz','Q:'+m.id+':'+quiz.i,'nextQ', quiz.i+1<m.quiz.length?'Próxima questão':'Ver resultado')
      : `<div class="fbnav"><button class="bigbtn" onclick="nextQ()">${quiz.i+1<m.quiz.length?'Próxima questão':'Ver resultado'}</button></div>`}`;
  if(gained>0){
    const btn=document.querySelector('#qz-fb .xppill');
    awardXP(gained,{currentTarget:btn});
  } else { saveState(); }
  revealAfterAnswer('qz-fb');
}
function nextQ(){
  const m=MODULES[quiz.mod];
  if(quiz.i+1<m.quiz.length){
    quiz.i++; renderQuestion();
    focusCardTop('#qz-body .qcard');
  }
  else finishQuiz();
}
function finishQuiz(){
  const m=MODULES[quiz.mod];
  const total=m.quiz.length;
  const score=quiz.correct/total;
  const prev=state.mastery[m.id]||0;
  const improved=score>prev;
  const newMastery=Math.max(prev,score);
  const delta=Math.round((newMastery-prev)*100);
  state.mastery[m.id]=newMastery;
  const firstTime=!state.doneQuiz[m.id];
  state.doneQuiz[m.id]=true;
  if(typeof commitEvidenceBatch==='function') commitEvidenceBatch();
  if(firstTime) awardXP(XP.complete,null);
  saveState();
  renderResult(m,quiz.correct,total,score,newMastery,prev,improved,delta,firstTime);
  go('result');
}
function renderResult(m,correct,total,score,mastery,prev,improved,delta,firstTime){
  const pct=Math.round(score*100);
  const mpct=Math.round(mastery*100);
  const col=m.hex;
  // ring
  const C=2*Math.PI*64;
  const off=C*(1-score);
  let headline, msg;
  if(pct===100){ headline='Domínio total'; msg='Você acertou tudo. Esse traço está bem consolidado — e cada acerto acabou de reforçá-lo um pouco mais.'; }
  else if(pct>=75){ headline='Bom domínio'; msg='A maior parte está sólida. Vale reler as aulas ligadas às questões que escaparam — é ali que o domínio termina de fechar.'; }
  else if(pct>=50){ headline='Base em formação'; msg='Metade do caminho. Isto não é fracasso: é o mapa exato do que revisar. Releia o módulo e refaça — seu melhor resultado fica guardado.'; }
  else{ headline='Ainda em construção'; msg='O conteúdo ainda não fixou, e tudo bem — errar com explicação é justamente onde a memória se forma. Reveja as aulas com calma e volte ao teste.'; }

  let deltaBlock;
  if(firstTime && delta>0){
    deltaBlock=`<div class="delta"><div class="dl">Domínio</div><div class="dv up">${mpct}%</div></div>`;
  }else if(improved){
    deltaBlock=`<div class="delta"><div class="dl">Domínio anterior</div><div class="dv">${Math.round(prev*100)}%</div></div>
                <div class="delta"><div class="dl">Agora</div><div class="dv up">${mpct}% ↑</div></div>`;
  }else{
    deltaBlock=`<div class="delta"><div class="dl">Melhor domínio</div><div class="dv">${mpct}%</div></div>
                <div class="delta"><div class="dl">Esta tentativa</div><div class="dv">${pct}%</div></div>`;
  }

  document.getElementById('rs-body').innerHTML=`
    <div class="result" style="--mc:${m.color}">
      <div class="rk">Módulo ${m.n} · resultado</div>
      <div class="ring">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="64" fill="none" stroke="#1c1c2c" stroke-width="9"/>
          <circle cx="75" cy="75" r="64" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"
            stroke-dasharray="${C}" stroke-dashoffset="${off}" style="transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)"/>
        </svg>
        <div class="rc" style="color:${col}">${pct}%</div>
        <div class="rl">${correct} de ${total}</div>
      </div>
      <h2>${headline}</h2>
      <p class="rmsg">${msg}</p>
      <div class="deltas">${deltaBlock}${firstTime?'<div class="delta"><div class="dl">Bônus</div><div class="dv up">+'+XP.complete+' XP</div></div>':''}</div>
      <div class="rbtns">
        <button class="bigbtn ghost" style="--mc:${m.color}" onclick="openModule(${MODULES.indexOf(m)})">Rever aulas</button>
        <button class="bigbtn" style="--mc:${m.color}" onclick="startQuiz()">Refazer teste</button>
        <button class="bigbtn ghost" style="--mc:${m.color}" onclick="backToMap()">Voltar ao mapa</button>
      </div>
    </div>`;
  // animate ring
  requestAnimationFrame(()=>{});
}
function backToMap(){ renderDashboard(); renderHeader(); go('dashboard'); }

/* =====================================================================
   Reset
   ===================================================================== */
function bkMsg(t){ const el=document.getElementById('bk-status'); if(el) el.textContent=t||''; }

function exportProgress(){
  saveNow();
  const data=JSON.stringify(state,null,2);
  const name='neurolab-progresso-'+new Date().toISOString().slice(0,10)+'.json';
  try{
    const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));
    const a=document.createElement('a');
    a.href=url; a.download=name; document.body.appendChild(a); a.click();
    setTimeout(()=>{ try{URL.revokeObjectURL(url); a.remove();}catch(e){} },500);
    bkMsg('Backup salvo: '+name);
  }catch(e){
    try{ navigator.clipboard.writeText(data); bkMsg('Backup copiado para a área de transferência.'); }
    catch(e2){ bkMsg('Não foi possível exportar neste navegador.'); }
  }
}

// separado do input p/ poder ser testado e reutilizado
function applyImportedState(text){
  let parsed;
  try{ parsed=JSON.parse(text); }catch(e){ return {ok:false, err:'Arquivo não é um JSON válido.'}; }
  if(!parsed || typeof parsed!=='object' || typeof parsed.xp!=='number' || !parsed.lessons){
    return {ok:false, err:'Isso não parece um backup do NeuroLab.'};
  }
  // O backup escolhido passa a ser a referência, mesmo que seja menor que a
  // cópia interna — importar é uma decisão explícita e vence a rede.
  esquecerSnapshot();
  _recuperado = null;
  state=migrateState(parsed);
  lastLevel=levelInfo().num;
  saveNow();
  renderHeader(); renderDashboard(); go('dashboard');
  return {ok:true};
}

function importProgress(input){
  const f=input.files && input.files[0];
  if(!f){ return; }
  const rd=new FileReader();
  rd.onload=function(){
    if(!confirm('Importar este backup? O progresso atual neste aparelho será substituído.')){ input.value=''; bkMsg(''); return; }
    const r=applyImportedState(String(rd.result));
    bkMsg(r.ok ? 'Progresso importado com sucesso.' : r.err);
    input.value='';
  };
  rd.onerror=function(){ bkMsg('Não foi possível ler o arquivo.'); input.value=''; };
  rd.readAsText(f);
}


/* =====================================================================
   PROTECAO DO PROGRESSO
   O estado vive no localStorage, que o sistema pode descartar sem aviso.
   Tres camadas: pedir armazenamento persistente, mostrar o estado dele,
   e lembrar de exportar backup quando faz tempo demais.
   ===================================================================== */
let _persistIdo = null;

async function pedirArmazenamentoPersistente(){
  try{
    if(!navigator.storage || !navigator.storage.persist){ _persistIdo = 'indisponivel'; return _persistIdo; }
    if(navigator.storage.persisted && await navigator.storage.persisted()){ _persistIdo = 'ja'; return _persistIdo; }
    _persistIdo = (await navigator.storage.persist()) ? 'concedido' : 'negado';
  }catch(e){ _persistIdo = 'erro'; }
  return _persistIdo;
}

function diasDesdeBackup(){
  const t = Number(state.lastBackupAt) || 0;
  if(!t) return null;
  return Math.floor((Date.now() - t) / DAY);
}

function marcarBackupFeito(){
  state.lastBackupAt = Date.now();
  try{ saveNow(); }catch(e){}
  try{ renderBackupInfo(); avisoBackup(); }catch(e){}
}

function renderBackupInfo(){
  const el = document.getElementById('bk-info');
  if(!el) return;
  const d = diasDesdeBackup();
  let l1;
  if(d === null) l1 = '<span class="warn">Você ainda não exportou nenhum backup.</span>';
  else if(d === 0) l1 = '<span class="ok">Último backup: hoje.</span>';
  else l1 = (d > 14 ? '<span class="warn">' : '<span class="ok">') + 'Último backup há ' + d + ' dia' + (d > 1 ? 's' : '') + '.</span>';
  let l2 = '';
  if(_persistIdo === 'ja' || _persistIdo === 'concedido')
    l2 = '<br><span class="ok">Armazenamento protegido contra limpeza automática.</span>';
  else if(_persistIdo === 'negado')
    l2 = '<br><span class="warn">O sistema não garantiu o armazenamento — exporte backup com mais frequência.</span>';
  // Estas duas vêm por último porque são mais graves que o resto do painel:
  // sem elas, o aluno lia "armazenamento protegido" enquanto nada era salvo.
  let l3 = '';
  if(_falhaEscrita)
    l3 = '<br><span class="warn">Este navegador não está salvando nada. Exporte um backup antes de fechar.</span>';
  else if(_recuperado)
    l3 = '<br><span class="warn">O progresso foi restaurado de uma cópia interna nesta abertura.</span>';
  else if(_falhaLeitura)
    l3 = '<br><span class="warn">O progresso salvo não pôde ser lido'
       + (_falhaLeitura.quarentena === 'ok' ? ' — uma cópia foi preservada neste aparelho.' : '.')
       + '</span>';
  el.innerHTML = l1 + l2 + l3;
}

/* Banner de integridade, no topo do dashboard. Segue o mesmo padrão do
   avisoBackup, mas com id e flag próprios: os dois podem coexistir, e dispensar
   um não pode dispensar o outro. */
let _integridadeFechada = false;
function fecharAvisoIntegridade(){
  _integridadeFechada = true;
  const b = document.getElementById('bk-integridade');
  if(b) b.remove();
}

function avisoIntegridade(){
  const host = document.getElementById('view-dashboard');
  const antigo = document.getElementById('bk-integridade');
  if(antigo) antigo.remove();
  if(!host || _integridadeFechada) return;
  if(!_falhaEscrita && !_falhaLeitura && !_recuperado) return;

  let texto, botoes, grave = '';
  if(_recuperado && !_falhaEscrita){
    // Aconteceu e foi consertado. O aluno precisa saber, porque a diferença
    // entre a cópia e o que ele fez depois dela é o que ficou pelo caminho.
    texto = '<b>Seu progresso foi restaurado automaticamente.</b> O registro principal '
          + (_recuperado.tinhaPrincipal ? 'voltou muito menor do que deveria' : 'sumiu deste aparelho')
          + ', e o NeuroLab recolocou a cópia interna mais recente no lugar. '
          + 'Se você tem um backup mais novo, importe — e exporte um agora, por segurança.';
    botoes = '<button type="button" onclick="exportProgress()">Exportar backup</button>'
           + '<button type="button" onclick="document.getElementById(\'bk-file\').click()">Importar backup</button>';
  } else if(_falhaEscrita){
    // Mais urgente que a leitura: o que está em risco é a sessão de agora.
    // Exportar continua funcionando — usa Blob, não depende do localStorage.
    grave = ' grave';
    texto = '<b>Nada está sendo salvo neste navegador.</b> Pode ser aba privada ou '
          + 'armazenamento cheio. O que você fizer agora se perde ao fechar — exporte um backup.';
    botoes = '<button type="button" onclick="exportProgress()">Exportar backup</button>';
  } else {
    texto = _falhaLeitura.quarentena === 'ok'
      ? 'Não foi possível ler seu progresso salvo, então o percurso recomeçou do zero. '
        + '<b>Uma cópia do dado original foi preservada</b> neste aparelho. Se você tem um backup, importe agora.'
      : 'Não foi possível ler seu progresso salvo, e também não deu para preservar uma cópia. '
        + '<b>Nada será gravado por cima</b> até você decidir. Importe um backup, se tiver.';
    botoes = '<button type="button" onclick="document.getElementById(\'bk-file\').click()">Importar backup</button>';
  }

  const div = document.createElement('div');
  div.className = 'bkwarn' + grave;
  div.id = 'bk-integridade';
  div.innerHTML = '<p>' + texto + '</p>' + botoes
    + '<button type="button" class="bkdismiss" onclick="fecharAvisoIntegridade()">Entendi</button>';
  host.insertBefore(div, host.firstChild);
}

let _avisoFechado = false;
function fecharAvisoBackup(){
  _avisoFechado = true;
  const b = document.getElementById('bk-warn');
  if(b) b.remove();
}

function avisoBackup(){
  const host = document.getElementById('view-dashboard');
  const antigo = document.getElementById('bk-warn');
  if(antigo) antigo.remove();
  if(!host || _avisoFechado) return;
  const xp = Number(state.xp) || 0;
  if(xp < 150) return;                       // ainda não há o que perder
  const d = diasDesdeBackup();
  if(d !== null && d < 7) return;             // backup recente
  const texto = (d === null)
    ? 'Seu progresso vive só neste aparelho. <b>Exporte um backup</b> — se o sistema limpar os dados do navegador, não há como recuperar.'
    : 'Faz <b>' + d + ' dias</b> desde o último backup. Vale exportar de novo.';
  const div = document.createElement('div');
  div.className = 'bkwarn';
  div.id = 'bk-warn';
  div.innerHTML = '<p>' + texto + '</p>'
    + '<button type="button" onclick="exportProgress()">Exportar agora</button>'
    + '<button type="button" class="bkdismiss" onclick="fecharAvisoBackup()">Agora não</button>';
  host.insertBefore(div, host.firstChild);
}

/* exportar passa a registrar a data */
if(typeof exportProgress === 'function'){
  const _exportOriginal = exportProgress;
  exportProgress = function(){
    // Antes o carimbo vinha depois de serializar, então todo arquivo exportado
    // carregava a data do backup ANTERIOR — e uma gravação perdida aqui era
    // invisível justamente no dado que serviria para percebê-la.
    state.lastBackupAt = Date.now();
    const r = _exportOriginal.apply(this, arguments);
    try{ marcarBackupFeito(); }catch(e){}
    return r;
  };
}

/* o painel de ajustes e o mapa passam a refletir o estado */
if(typeof renderDashboard === 'function'){
  const _dashOriginal = renderDashboard;
  renderDashboard = function(){
    const r = _dashOriginal.apply(this, arguments);
    try{ avisoBackup(); avisoIntegridade(); }catch(e){}
    return r;
  };
}

(function iniciarProtecao(){
  const rodar = function(){
    // A sondagem vem antes de tudo: é ela que descobre aba privada logo na
    // carga, sem esperar o aluno investir uma sessão para só então descobrir.
    try{ sondarArmazenamento(); }catch(e){}
    try{ avisoIntegridade(); }catch(e){}
    pedirArmazenamentoPersistente().then(function(){
      try{ renderBackupInfo(); avisoBackup(); avisoIntegridade(); }catch(e){}
    });
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rodar);
  else rodar();
})();

function resetProgress(){
  if(!confirm('Reiniciar todo o progresso? Seu XP, domínio e aulas estudadas serão zerados. Esta ação não pode ser desfeita.')) return;
  // A cópia interna some junto: zerar é uma decisão do aluno, e a rede de
  // segurança da próxima carga desfaria exatamente essa decisão.
  esquecerSnapshot();
  _recuperado = null;
  state=defaultState(); lastLevel=1;
  saveNow();
  renderHeader(); renderDashboard(); go('dashboard');
}

/* =====================================================================
   Init
   ===================================================================== */
(async function init(){
  state=await loadState();
  if(typeof normalizeAllSrsReasons==='function') normalizeAllSrsReasons();
  seedSrsFromHistory();
  lastLevel=levelInfo().num;
  renderHeader();
  renderDashboard();
})();
