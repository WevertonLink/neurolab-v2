/* =====================================================================
   NEUROLAB · MODO DOMÍNIO

   O percurso mede cobertura. O Modo Domínio mede o que o aluno consegue
   recuperar, explicar, aplicar e conectar depois de percorrer o conteúdo.
   Nenhuma métrica é inventada: quando ainda não existe evidência suficiente,
   a interface diz isso explicitamente.
   ===================================================================== */

const DOMAIN_THRESHOLD = 0.70;
const DOMAIN_TABS = [
  {id:'today', label:'Hoje'},
  {id:'reviews', label:'Revisões'},
  {id:'weak', label:'Frágeis'},
  {id:'cases', label:'Casos'},
  {id:'counter', label:'Contrafactuais'},
  {id:'connections', label:'Conexões'},
  {id:'trails', label:'Trilhas'}
];

const DOMAIN_COUNTERFACTUALS = [
  {
    "id": "neuronio-bomba",
    "module": "neuronio",
    "lesson": 0,
    "title": "A bomba para, mas os canais continuam ali",
    "prompt": "Se a bomba de sódio-potássio parar enquanto canais de vazamento e canais dependentes de voltagem continuam funcionais, qual sequência descreve melhor a evolução do neurônio?",
    "options": [
      "Os canais ainda operam por algum tempo, mas, sem reposição, os gradientes se reduzem; repouso e disparos perdem estabilidade progressivamente.",
      "Cada potencial de ação deixa de existir no mesmo instante, porque a bomba fornece diretamente a corrente rápida que produz a despolarização.",
      "O potencial de repouso permanece estável, pois a permeabilidade ao potássio determina a voltagem sem depender das concentrações em cada lado da membrana.",
      "A excitabilidade aumenta de forma sustentada, já que a entrada de sódio continua ocorrendo enquanto os mecanismos refratários deixam de limitar novos disparos."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção separa o efeito imediato do efeito cumulativo: os canais geram fluxos, mas a bomba é necessária para restaurar os gradientes ao longo do tempo.",
      "Confunde manutenção dos gradientes com geração instantânea do potencial de ação; a corrente rápida vem dos canais, não da bomba.",
      "Ignora que a permeabilidade só produz uma voltagem de equilíbrio porque existem concentrações diferentes de íons nos dois lados.",
      "Prevê apenas aumento de atividade e desconsidera a perda progressiva dos gradientes e os limites impostos pela refratariedade."
    ],
    "explanation": "A bomba não é o motor do disparo — é a manutenção. O tempo todo há um vazamento: Na⁺ escorrega para dentro e K⁺ para fora, e cada disparo gasta mais um pouco do gradiente. A bomba repõe esse gasto em segundo plano, 3 Na⁺ para fora e 2 K⁺ para dentro, à custa de ATP. Pare a bomba e nada muda no instante: os canais ainda têm gradiente estocado para disparar. Mas o vazamento continua e ninguém mais o compensa — a cada ciclo o gradiente encolhe, o repouso deriva, o limiar fica errático, até o disparo não se sustentar.",
    "chain": [
      "a bomba para, mas o gradiente estocado ainda existe — os canais disparam por um tempo",
      "cada disparo e o vazamento consomem esse gradiente, e agora nada o repõe",
      "o repouso sobe e o limiar deixa de ser confiável",
      "o ciclo regenerativo do Na⁺ perde a base de que depende",
      "os disparos deixam de se sustentar — some devagar, não de vez"
    ],
    "extend": {
      "q": "E se, em vez da bomba, você bloqueasse os canais de Na⁺ dependentes de voltagem?",
      "a": "Aí o disparo para na hora — porque esses canais são o motor da despolarização, não a manutenção. O contraste fixa a distinção: a bomba é reposição lenta em segundo plano; os canais são a geração imediata do sinal."
    }
  },
  {
    "id": "plasticidade-nmda",
    "module": "plasticidade",
    "lesson": 1,
    "title": "NMDA abre, mas o cálcio quase não entra",
    "prompt": "Em uma sinapse glutamatérgica, o bloqueio por magnésio é removido e o NMDA abre, mas a entrada de cálcio é fortemente reduzida. Qual previsão é mais consistente?",
    "options": [
      "A coincidência entre atividade pré e pós-sináptica basta para fortalecer a sinapse, porque a despolarização substitui todas as funções do cálcio intracelular.",
      "A transmissão rápida mediada por AMPA pode continuar, mas as cascatas que ligam coincidência a inserção de AMPA e mudanças duradouras ficam enfraquecidas.",
      "A redução de cálcio favorece uma LTP mais estável, pois evita que qualquer mecanismo intracelular interfira na resposta ao glutamato.",
      "A abertura do NMDA sem cálcio elimina também a resposta AMPA, já que os dois receptores precisam conduzir o mesmo íon para funcionar."
    ],
    "correct": 1,
    "optionFeedback": [
      "Transforma detecção de coincidência em condição suficiente; falta o sinal intracelular que aciona parte importante das mudanças posteriores.",
      "Esta opção preserva o que ainda funciona e localiza a ruptura entre a coincidência detectada e a plasticidade duradoura.",
      "Inverte o papel do cálcio relevante para a indução de LTP e trata a ausência de sinalização como proteção da memória.",
      "Confunde receptores distintos: AMPA pode sustentar transmissão rápida mesmo quando a sinalização pelo NMDA está prejudicada."
    ],
    "explanation": "O NMDA faz duas coisas ao mesmo tempo, e o exercício separa uma da outra. Ele é a porta lógica E: só abre com glutamato E a membrana já despolarizada — é assim que detecta que o neurônio de antes e o de depois dispararam juntos (a coincidência de Hebb). E, ao abrir, deixa entrar cálcio, que aciona a CaMKII e instala mais receptores AMPA — é isso que fortalece a sinapse. Se a porta abre mas quase não entra cálcio, a coincidência ainda é detectada e a transmissão por AMPA continua, mas falta o mensageiro que transforma coincidência em fortalecimento duradouro. Detectar não é o mesmo que gravar.",
    "chain": [
      "glutamato + membrana despolarizada abrem a porta E do NMDA",
      "a coincidência pré-pós é detectada — a parte 'Hebb' funciona",
      "mas quase nenhum cálcio entra, e o cálcio era o mensageiro",
      "sem cálcio, a CaMKII não instala AMPA extra",
      "a transmissão segue, mas a LTP não se induz"
    ],
    "extend": {
      "q": "E se, em vez de reduzir o cálcio, você removesse a rolha de magnésio do NMDA?",
      "a": "Aí o NMDA abriria com qualquer glutamato, mesmo com a célula em repouso — a porta E viraria uma porta sempre-ligada. Toda sinapse ativa se fortaleceria, coincidindo ou não, e o cérebro perderia a capacidade de distinguir causa de coincidência. É o oposto deste caso: aqui sobra detecção e falta gravação; lá sobraria gravação sem discriminação."
    }
  },
  {
    "id": "recompensa-previsto",
    "module": "recompensa",
    "lesson": 1,
    "title": "A recompensa chega exatamente como previsto",
    "prompt": "Uma recompensa ocorre no momento e na magnitude já previstos por uma pista aprendida. Qual padrão é mais compatível com erro de previsão de recompensa?",
    "options": [
      "O resultado gera um grande erro positivo porque o valor hedônico da recompensa determina sozinho a resposta fásica de dopamina.",
      "O resultado gera erro negativo porque uma recompensa previsível deixa de ter valor e passa a funcionar como uma perda.",
      "A resposta fásica tende a ser pequena no resultado, enquanto parte do sinal pode já ter se deslocado para a pista que o previu.",
      "A atividade dopaminérgica do circuito inteiro desaparece, pois erro de previsão próximo de zero significa ausência de qualquer função da dopamina."
    ],
    "correct": 2,
    "optionFeedback": [
      "Confunde prazer ou valor consumatório com diferença entre resultado recebido e resultado esperado.",
      "Previsibilidade reduz novidade informativa, mas não transforma automaticamente recompensa em perda.",
      "Esta opção distingue o sinal na pista do sinal no resultado e representa a diferença próxima de zero no momento esperado.",
      "Generaliza um componente fásico específico para toda a atividade dopaminérgica e para todas as funções do sistema."
    ],
    "explanation": "Erro de previsão representa discrepância. Depois do aprendizado, a pista passa a carregar informação preditiva; quando o resultado confirma exatamente a expectativa, há pouco a atualizar naquele momento.",
    "chain": [
      "pista adquire valor preditivo",
      "expectativa se forma antes do resultado",
      "resultado coincide com a previsão",
      "erro no resultado fica pequeno"
    ]
  },
  {
    "id": "decisao-valor-antigo",
    "module": "decisao",
    "lesson": 1,
    "title": "O ambiente mudou, mas o valor interno não",
    "prompt": "Uma opção antes vantajosa passou a produzir resultados ruins, porém sua estimativa interna de valor não é atualizada. Qual padrão de escolha é mais provável?",
    "options": [
      "A pessoa identifica o novo resultado, atualiza corretamente o valor, mas falha apenas na execução motora da alternativa escolhida.",
      "A representação visual da opção perde nitidez, porque uma estimativa de valor desatualizada altera diretamente a transdução sensorial.",
      "As escolhas ficam essencialmente aleatórias, pois qualquer valor antigo deixa de influenciar a comparação entre alternativas.",
      "A opção antiga continua favorecida porque a comparação usa uma estimativa que já não representa os resultados atuais."
    ],
    "correct": 3,
    "optionFeedback": [
      "Desloca o problema para execução motora, embora o cenário tenha definido uma falha de atualização de valor.",
      "Confunde avaliação com percepção; a opção pode ser vista normalmente e ainda ser avaliada por um modelo desatualizado.",
      "Subestima a força do valor aprendido: uma estimativa antiga tende a enviesar a escolha, não a torná-la sem direção.",
      "Esta opção mantém percepção e ação possíveis, mas mostra como uma representação desatualizada orienta escolhas persistentes."
    ],
    "explanation": "Decisão depende de valores estimados, não apenas do resultado presente. Quando a atualização falha, a escolha pode ser coerente com o modelo interno e inadequada ao ambiente atual.",
    "chain": [
      "resultado da opção se modifica",
      "estimativa interna não acompanha a mudança",
      "comparação usa valor antigo",
      "escolha persiste apesar do prejuízo"
    ]
  },
  {
    "id": "atencao-supressao",
    "module": "atencao",
    "lesson": 2,
    "title": "A meta permanece, mas os competidores continuam fortes",
    "prompt": "Uma pessoa mantém corretamente a meta na memória de trabalho, porém não consegue reduzir a competição de estímulos irrelevantes. O que melhor distingue essas duas funções?",
    "options": [
      "A intenção continua acessível, mas intrusões e trocas aumentam porque manter a meta não garante proteção eficaz contra competidores.",
      "A execução permanece estável, pois uma meta consciente já contém toda a seleção necessária para impedir interferência.",
      "Os estímulos irrelevantes atrasam a percepção, mas não alteram erros nem alternâncias enquanto a pessoa consegue repetir a meta.",
      "O aumento voluntário de esforço compensa integralmente a falta de supressão, preservando o desempenho em qualquer nível de distração."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção separa manutenção da meta de controle da competição e prevê instabilidade sem apagar a intenção.",
      "Trata processos relacionados como equivalentes e ignora que estímulos concorrentes podem vencer mesmo com a meta ativa.",
      "Reduz a interferência a tempo de resposta e exclui efeitos previsíveis sobre seleção, erros e trocas.",
      "Transforma esforço em compensação ilimitada e desconsidera limites de carga e competição."
    ],
    "explanation": "Saber o que fazer e proteger a execução são operações relacionadas, mas não idênticas. A meta pode permanecer disponível enquanto a seleção oscila diante de competidores.",
    "chain": [
      "meta continua representada",
      "estímulos irrelevantes mantêm força competitiva",
      "seleção sofre intrusões e trocas",
      "execução fica menos estável"
    ]
  },
  {
    "id": "emocao-sem-contexto",
    "module": "emocao",
    "lesson": 0,
    "title": "A relevância é detectada sem contexto suficiente",
    "prompt": "A amígdala sinaliza que um estímulo é relevante, mas o hipocampo fornece pouco contexto sobre onde e quando ele ocorreu. Qual consequência é mais plausível?",
    "options": [
      "A resposta emocional deixa de surgir, porque a amígdala só pode avaliar relevância depois que o hipocampo reconstrói o episódio completo.",
      "A reação pode ser mobilizada, mas tende a generalizar mais e a se ajustar menos às circunstâncias específicas.",
      "A ausência de contexto torna a resposta mais precisa, pois elimina detalhes episódicos que competiriam com a detecção de ameaça.",
      "A intensidade emocional permanece intacta, mas apenas o rótulo verbal do episódio se perde, já que o hipocampo atua somente sobre linguagem."
    ],
    "correct": 1,
    "optionFeedback": [
      "Coloca o contexto como pré-requisito absoluto para qualquer sinal de relevância e apaga contribuições paralelas.",
      "Esta opção preserva a detecção de relevância e localiza o prejuízo na discriminação contextual.",
      "Confunde rapidez com precisão; remover contexto tende a ampliar generalização, não a torná-la específica.",
      "Restringe o hipocampo à linguagem e ignora seu papel na organização contextual e episódica."
    ],
    "explanation": "Relevância e contexto contribuem de modos diferentes. Um estímulo pode mobilizar resposta sem que o sistema discrimine adequadamente em quais circunstâncias aquela resposta é apropriada.",
    "chain": [
      "relevância é sinalizada",
      "contexto episódico fica incompleto",
      "situações semelhantes são menos discriminadas",
      "resposta tende a generalizar"
    ]
  },
  {
    "id": "autonomo-recuperacao",
    "module": "autonomo",
    "lesson": 2,
    "title": "A ameaça termina, mas a recuperação não acompanha",
    "prompt": "O evento ameaçador terminou, porém a retomada parassimpática permanece reduzida. Qual interpretação distingue fim da ameaça de recuperação corporal?",
    "options": [
      "Os parâmetros corporais retornam ao basal pelo simples desaparecimento do estímulo, sem depender de mecanismos de recuperação.",
      "A ativação persistente demonstra que uma ameaça externa continua presente, mesmo quando o ambiente já foi verificado como seguro.",
      "Frequência cardíaca e outros parâmetros podem permanecer elevados, pois encerrar a mobilização exige regulação ativa.",
      "A alteração afeta apenas a sensação subjetiva; dinâmica cardíaca e respiratória não participam da recuperação autonômica."
    ],
    "correct": 2,
    "optionFeedback": [
      "Trata recuperação como ausência passiva de estímulo e ignora mecanismos que ajudam a restaurar o basal.",
      "Confunde estado corporal persistente com evidência obrigatória de ameaça externa atual.",
      "Esta opção reconhece que mobilização e retorno ao basal são etapas regulatórias distintas.",
      "Separa indevidamente experiência e fisiologia, embora a recuperação autonômica envolva parâmetros corporais mensuráveis."
    ],
    "explanation": "O desaparecimento do desencadeador não completa automaticamente o retorno ao basal. A recuperação envolve mudanças regulatórias que reduzem a mobilização mantida.",
    "chain": [
      "ameaça deixa de estar presente",
      "retirada da ativação é insuficiente",
      "recuperação parassimpática permanece fraca",
      "retorno ao basal fica prolongado"
    ]
  },
  {
    "id": "sono-fragmentado",
    "module": "sono",
    "lesson": 0,
    "title": "Oito horas no relógio, mas sono interrompido",
    "prompt": "Uma pessoa permanece oito horas na cama, mas desperta repetidamente e interrompe os ciclos. Qual conclusão separa duração de continuidade?",
    "options": [
      "O total de horas compensa as interrupções, pois processos do sono dependem apenas do tempo acumulado em qualquer sequência.",
      "Cada despertar favorece a consolidação ao reiniciar um ciclo completo, mesmo quando os estágios são interrompidos antes de se organizar.",
      "A fragmentação altera somente a lembrança consciente dos sonhos, sem consequências para recuperação ou memória.",
      "A duração pode parecer suficiente, enquanto a continuidade dos estágios e processos de recuperação e consolidação fica prejudicada."
    ],
    "correct": 3,
    "optionFeedback": [
      "Reduz sono a quantidade e desconsidera a organização temporal dos estágios.",
      "Trata reinícios como ciclos completos, embora despertares possam interromper transições e continuidade.",
      "Restringe o efeito a sonhos e exclui processos dependentes da arquitetura do sono.",
      "Esta opção mantém a distinção entre tempo total e qualidade/continuidade da arquitetura do sono."
    ],
    "explanation": "Duração e continuidade são dimensões diferentes. Muitas horas na cama não garantem que os estágios tenham se organizado com a estabilidade necessária.",
    "chain": [
      "tempo total parece preservado",
      "despertares interrompem a arquitetura",
      "processos dependentes de continuidade ficam menos estáveis",
      "recuperação e consolidação podem diminuir"
    ]
  },
  {
    "id": "neuroanatomia-conexao",
    "module": "neuroanatomia",
    "lesson": 3,
    "title": "Os nós permanecem, mas a conexão é interrompida",
    "prompt": "Duas regiões corticais mantêm tecido local relativamente preservado, mas o feixe de substância branca entre elas é lesionado. Qual previsão trata rede e região separadamente?",
    "options": [
      "Processamentos locais podem permanecer, enquanto tarefas que dependem da troca entre as regiões ficam prejudicadas.",
      "As duas regiões perdem todas as funções locais, porque qualquer capacidade cortical fica armazenada no feixe que as conecta.",
      "A tarefa integrada tende a permanecer normal, pois o cérebro substitui de imediato toda via lesionada por uma rota equivalente.",
      "A lesão afeta somente a velocidade de condução, sem modificar precisão, sincronização ou combinação de informações."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção descreve uma síndrome de desconexão: nós preservados não garantem cooperação preservada.",
      "Confunde conteúdo/processamento local com a via que permite comunicação entre regiões.",
      "Transforma compensação possível em substituição imediata e completa.",
      "Reduz conectividade a velocidade e ignora efeitos sobre sincronização e integração."
    ],
    "explanation": "Uma rede depende dos componentes e das conexões. A interrupção de uma via pode poupar habilidades locais e comprometer exatamente as tarefas que exigem cooperação.",
    "chain": [
      "regiões locais permanecem funcionais",
      "via entre elas é interrompida",
      "troca e sincronização se degradam",
      "função integrada fica prejudicada"
    ]
  },
  {
    "id": "sensorial-talamo",
    "module": "sensorial",
    "lesson": 0,
    "title": "A retina transduz, mas a retransmissão falha",
    "prompt": "A retina converte luz em sinal neural, porém uma retransmissão talâmica importante para a via visual é interrompida. Qual conclusão localiza corretamente a falha?",
    "options": [
      "A retina deixa de transduzir luz por falta de retorno talâmico, de modo que a cadeia falha já no receptor periférico.",
      "A etapa periférica pode permanecer funcional, mas o acesso normal do sinal a redes corticais visuais fica comprometido.",
      "A percepção visual consciente permanece equivalente porque toda informação da retina chega ao córtex por uma rota que dispensa retransmissão.",
      "A interrupção altera apenas reflexos oculares, enquanto percepção consciente e discriminação cortical permanecem preservadas."
    ],
    "correct": 1,
    "optionFeedback": [
      "Move a falha para a retina, embora o cenário preserve explicitamente a transdução periférica.",
      "Esta opção distingue captação do estímulo de retransmissão e processamento cortical.",
      "Generaliza vias alternativas e ignora a importância da retransmissão talâmica para o fluxo visual normal.",
      "Separa reflexo e percepção de forma rígida e subestima o impacto cortical da interrupção da via."
    ],
    "explanation": "Captar luz não garante percepção. A informação precisa atravessar etapas de transmissão e retransmissão antes de participar do processamento cortical normal.",
    "chain": [
      "luz é transduzida na retina",
      "sinal entra na via visual",
      "retransmissão é interrompida",
      "processamento cortical normal recebe informação incompleta"
    ]
  },
  {
    "id": "motor-cerebelo",
    "module": "motor",
    "lesson": 1,
    "title": "O movimento começa, mas a comparação falha",
    "prompt": "O córtex motor inicia uma ação, mas o cerebelo não compara adequadamente o movimento previsto com o realizado. Qual padrão diferencia iniciar de corrigir?",
    "options": [
      "O movimento não chega a começar, pois toda ordem descendente para a medula precisa ser originada no cerebelo.",
      "O gesto mantém precisão e timing, mas apenas demora mais para iniciar porque a comparação cerebelar atua antes do comando motor.",
      "O gesto pode começar, porém acumula erros de timing, trajetória e correção durante a execução.",
      "A força muscular desaparece seletivamente, enquanto coordenação e ajuste permanecem preservados."
    ],
    "correct": 2,
    "optionFeedback": [
      "Transfere a origem do comando cortical para o cerebelo e confunde iniciação com calibração.",
      "Preserva justamente as dimensões mais dependentes de previsão e correção cerebelar.",
      "Esta opção mantém a iniciação e localiza o prejuízo na comparação e nos ajustes em curso.",
      "Confunde coordenação com geração de força e prevê o padrão inverso do esperado."
    ],
    "explanation": "Iniciar e afinar uma ação são contribuições diferentes. A comparação entre intenção e resultado permite ajustes de timing, trajetória e erro durante o gesto.",
    "chain": [
      "comando motor é iniciado",
      "previsão e feedback deixam de ser comparados adequadamente",
      "correções ficam imprecisas",
      "movimento perde coordenação"
    ]
  },
  {
    "id": "desenvolvimento-poda",
    "module": "desenvolvimento",
    "lesson": 2,
    "title": "A poda remove conexões que ainda carregavam função",
    "prompt": "Durante o desenvolvimento, muitas conexões funcionalmente utilizadas são eliminadas além do necessário. Qual previsão evita tratar poda como benefício automático?",
    "options": [
      "A eficiência aumenta porque qualquer redução no número de sinapses diminui ruído sem custo para a capacidade da rede.",
      "A rede permanece equivalente, pois conexões funcionalmente usadas são intercambiáveis com qualquer sinapse restante.",
      "A perda de caminhos úteis causa falha global imediata, mesmo quando existem rotas redundantes e plasticidade residual.",
      "A rede pode perder flexibilidade ou desempenho, pois eficiência depende de preservar conexões funcionalmente relevantes."
    ],
    "correct": 3,
    "optionFeedback": [
      "Confunde redução com otimização e ignora que o efeito depende de quais conexões foram removidas.",
      "Trata sinapses como unidades substituíveis e desconsidera especialização e padrões de conectividade.",
      "Exagera a consequência para colapso imediato e ignora redundância e compensação parcial.",
      "Esta opção reconhece que poda pode ajudar ou prejudicar conforme preserve os caminhos funcionalmente relevantes."
    ],
    "explanation": "Poda é seleção, não simples subtração. Remover conexões pouco úteis pode refinar uma rede; remover conexões funcionais em excesso pode reduzir capacidade e flexibilidade.",
    "chain": [
      "conexões funcionais são removidas",
      "redundância e rotas úteis diminuem",
      "algumas operações perdem suporte",
      "desempenho ou flexibilidade podem cair"
    ]
  },
  {
    "id": "linguagem-arqueado",
    "module": "linguagem",
    "lesson": 2,
    "title": "Compreensão e produção existem, mas a ponte falha",
    "prompt": "Redes temporais de compreensão e redes frontais de produção estão relativamente preservadas, mas a conexão dorsal entre elas é lesionada. Qual padrão é mais coerente?",
    "options": [
      "A pessoa pode compreender e produzir fala espontânea, mas tarefas de repetição e transferência fonológica entre as redes ficam especialmente vulneráveis.",
      "A compreensão e a produção desaparecem na mesma intensidade, pois ambas ficam integralmente armazenadas na via de conexão.",
      "A perda principal ocorre na audição periférica, porque o feixe de conexão participa da transdução mecânica na cóclea.",
      "A repetição permanece preservada sempre que o significado é compreendido, pois rotas semânticas substituem completamente a transferência fonológica."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção preserva funções locais e identifica a tarefa que exige comunicação precisa entre as redes.",
      "Confunde via de conexão com armazenamento integral das capacidades de cada região.",
      "Move a lesão cortical para a periferia auditiva, apesar de a transdução não depender desse feixe.",
      "Transforma compensação parcial por outras rotas em preservação completa de repetição."
    ],
    "explanation": "O padrão é de desconexão: componentes locais podem operar, mas uma tarefa que depende de transmissão precisa entre eles se torna desproporcionalmente difícil.",
    "chain": [
      "compreensão local permanece relativamente funcional",
      "produção espontânea continua possível",
      "transferência fonológica perde precisão",
      "repetição fica mais prejudicada"
    ]
  },
  {
    "id": "clinica-penumbra",
    "module": "clinica",
    "lesson": 2,
    "title": "O fluxo retorna ao tecido ainda viável",
    "prompt": "Em uma isquemia, o fluxo é restaurado rapidamente numa região funcionalmente comprometida, mas ainda não irreversivelmente destruída. Qual distinção é essencial?",
    "options": [
      "A reperfusão restaura de modo equivalente todo tecido envolvido, porque núcleo e região em risco diferem apenas na intensidade dos sintomas.",
      "Parte da região em risco pode recuperar função, enquanto tecido já irreversivelmente lesado pode não responder da mesma forma.",
      "O retorno do fluxo modifica somente a expressão clínica momentânea, sem alterar a chance de sobrevivência do tecido ameaçado.",
      "Núcleo e penumbra são definidos por localizações anatômicas fixas, independentemente de tempo, perfusão e demanda metabólica."
    ],
    "correct": 1,
    "optionFeedback": [
      "Apaga diferenças de viabilidade tecidual e trata reperfusão como reversão uniforme.",
      "Esta opção distingue tecido ameaçado e potencialmente recuperável de tecido já irreversivelmente lesionado.",
      "Separa sintoma de tecido e ignora que reperfusão em tempo útil pode preservar células ainda viáveis.",
      "Transforma estados dinâmicos de perfusão e dano em regiões anatômicas invariáveis."
    ],
    "explanation": "A utilidade da intervenção depende da existência de tecido ainda viável. Tempo e perfusão influenciam quais áreas podem recuperar função e quais já ultrapassaram o limite de reversibilidade.",
    "chain": [
      "fluxo reduzido compromete função",
      "parte do tecido permanece viável",
      "reperfusão ocorre em tempo útil",
      "função pode ser preservada nessa região"
    ]
  },
  {
    "id": "farmacologia-receptor",
    "module": "farmacologia",
    "lesson": 1,
    "title": "Mais transmissor, menos receptores disponíveis",
    "prompt": "Uma droga reduz a recaptação de um neurotransmissor, enquanto os receptores responsáveis pelo efeito de interesse estão fortemente bloqueados. Qual resultado separa disponibilidade de resposta?",
    "options": [
      "O aumento na fenda supera o bloqueio por definição, pois concentração do transmissor determina sozinha a intensidade do efeito.",
      "O bloqueio do receptor impede o acúmulo na fenda, porque receptor e transportador são a mesma etapa da transmissão.",
      "A concentração pode aumentar, mas o efeito mediado por esses receptores permanece limitado enquanto eles estiverem indisponíveis.",
      "Nenhum efeito do neurotransmissor ocorre em qualquer circuito, mesmo que existam outros subtipos de receptor e regiões não bloqueadas."
    ],
    "correct": 2,
    "optionFeedback": [
      "Transforma concentração em fator suficiente e ignora afinidade, ocupação e tipo de antagonismo.",
      "Confunde transportador de recaptação com receptor pós-sináptico.",
      "Esta opção separa quantidade de mensageiro da capacidade do alvo de responder.",
      "Generaliza o bloqueio de um conjunto de receptores para todas as ações do neurotransmissor."
    ],
    "explanation": "Recaptação e recepção são etapas diferentes. Mais transmissor disponível não garante o efeito desejado quando o alvo responsável por mediá-lo está bloqueado.",
    "chain": [
      "recaptação é reduzida",
      "transmissor permanece mais tempo na fenda",
      "receptores de interesse estão indisponíveis",
      "resposta por essa via fica limitada"
    ]
  },
  {
    "id": "metodos-eeg-local",
    "module": "metodos",
    "lesson": 0,
    "title": "O sinal é rápido, mas as fontes se misturam",
    "prompt": "O EEG detecta uma mudança em milissegundos, porém várias fontes contribuem para o potencial registrado no couro cabeludo. Qual inferência respeita os limites do método?",
    "options": [
      "A origem anatômica fica precisa porque qualquer medida temporal rápida preserva a posição exata da fonte que a gerou.",
      "A localização da atividade não pode ser investigada de modo algum, mesmo com modelos de fonte e informação anatômica complementar.",
      "O registro identifica qual neurotransmissor foi liberado em cada sinapse porque potenciais elétricos carregam a assinatura química da molécula.",
      "O momento da mudança pode ser estimado com alta resolução, enquanto a origem espacial exige inferência e permanece menos determinada."
    ],
    "correct": 3,
    "optionFeedback": [
      "Confunde resolução temporal com resolução espacial.",
      "Substitui uma limitação por impossibilidade total; localização pode ser estimada, mas depende de modelos e hipóteses.",
      "Atribui ao EEG uma especificidade química que o sinal de campo não fornece.",
      "Esta opção distingue o que é medido diretamente no tempo do que precisa ser inferido no espaço."
    ],
    "explanation": "Métodos possuem perfis diferentes. O EEG é sensível à dinâmica temporal, mas a mistura de fontes e a condução pelo tecido tornam a localização um problema inverso.",
    "chain": [
      "atividade elétrica muda rapidamente",
      "EEG registra o momento com boa resolução",
      "fontes se somam no couro cabeludo",
      "origem espacial precisa ser inferida"
    ]
  }
];

const DOMAIN_CASES = [
  {
    "id": "noite-decisao",
    "title": "Decidir depois de uma noite ruim",
    "modules": [
      "sono",
      "atencao",
      "emocao",
      "decisao"
    ],
    "scenario": "Uma pessoa dormiu pouco, chega sob pressão a uma escolha importante e passa a favorecer uma recompensa imediata, embora consiga descrever as consequências futuras.",
    "question": "Qual modelo explica melhor por que conhecer as consequências não garante que elas orientem a escolha naquele momento?",
    "options": [
      "O sono insuficiente torna vigilância e memória de trabalho menos estáveis; sob pressão, manter a meta futura compete pior com sinais imediatos, que ganham peso na avaliação.",
      "A escolha muda principalmente porque as consequências futuras deixam de ser recuperadas da memória episódica; atenção, controle e avaliação de valor permanecem preservados.",
      "O estresse aumenta a ativação e melhora a manutenção da meta, mas a recompensa imediata vence porque produz uma resposta dopaminérgica maior, independentemente do sono.",
      "A recompensa imediata se torna mais saliente, e essa mudança isolada basta para determinar a escolha mesmo quando metas, estado e interferência permanecem equivalentes."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção integra estado, manutenção de metas, competição atencional e avaliação sem exigir que o conhecimento tenha desaparecido.",
      "Reduz o caso a recuperação de memória e ignora que a pessoa ainda consegue descrever as consequências.",
      "Usa aumento de ativação como melhora uniforme de controle e transforma dopamina em causa independente do contexto.",
      "Identifica saliência, mas a trata como causa suficiente e remove justamente as interações propostas pelo caso."
    ],
    "explanation": "O caso separa possuir conhecimento de conseguir mantê-lo funcionalmente ativo durante uma decisão. Sono insuficiente e pressão podem tornar o controle e a representação das metas futuras menos estáveis, deslocando a competição em favor do imediato.",
    "chain": [
      "sono e pressão alteram o estado",
      "manutenção da meta futura fica menos estável",
      "sinais imediatos competem com maior vantagem",
      "avaliação se orienta mais para o presente"
    ]
  },
  {
    "id": "estudo-maratona",
    "title": "A maratona que pareceu eficiente",
    "modules": [
      "plasticidade",
      "atencao",
      "sono"
    ],
    "scenario": "Um estudante relê o mesmo conteúdo por seis horas, reconhece quase todas as frases no fim da noite, dorme pouco e dois dias depois não consegue reconstruir os mecanismos.",
    "question": "Qual explicação distingue desempenho durante o estudo de retenção futura?",
    "options": [
      "O reconhecimento final demonstra que a memória já estava consolidada; a falha posterior indica apenas que o conteúdo tinha complexidade excessiva.",
      "A releitura aumentou familiaridade, mas ofereceu pouca recuperação; fadiga e sono curto reduziram estabilização e acesso posterior.",
      "O estudo concentrado e o espaçado produzem o mesmo traço quando o tempo total é igual; o sono influencia somente disposição, não retenção.",
      "A vantagem do espaçamento vem principalmente de renovar motivação, enquanto recuperação ativa e sono têm pouca relação com a durabilidade da memória."
    ],
    "correct": 1,
    "optionFeedback": [
      "Confunde sensação de familiaridade com capacidade de recuperar e explicar depois de um intervalo.",
      "Esta opção integra prática de recuperação, queda de atenção e sono sem transformar nenhum fator em explicação única.",
      "Iguala formas de prática e reduz sono a energia subjetiva, ignorando processos ligados à memória.",
      "Reduz o espaçamento a motivação e retira o mecanismo central de recuperação entre intervalos."
    ],
    "explanation": "O caso separa duas coisas que parecem a mesma: ir bem durante o estudo e reter depois. Reconhecer quase todas as frases no fim da noite mede familiaridade — o material está recente e cheio de pistas na tela. Mas reter e reconstruir dois dias depois exige recuperação independente, sem pistas, e isso a releitura quase não treinou. Somam-se dois fatores de estado: a atenção caiu ao longo de seis horas, degradando a codificação, e o sono curto cortou a consolidação que estabilizaria o traço à noite. Não é um fator só — é familiaridade confundida com memória, sobre uma base mal codificada e não consolidada.",
    "chain": [
      "seis horas de releitura elevam a familiaridade imediata",
      "quase não houve recuperação ativa — o traço nunca foi testado sem pistas",
      "a atenção cai ao longo das horas e a codificação perde qualidade",
      "o sono curto corta a janela de consolidação da noite",
      "dois dias depois, sem pistas e sem consolidação, a reconstrução falha"
    ],
    "extend": {
      "q": "E se ele trocasse duas das seis horas por recuperações espaçadas em três dias, dormindo bem?",
      "a": "Reconheceria menos frases no calor da hora, mas reconstruiria mais dois dias depois. Cada recuperação no limiar do esquecimento reengaja a maquinaria de consolidação, e o sono entre as sessões estabiliza o traço. É o princípio da própria fila de revisão do NeuroLab: menos brilho imediato, mais memória durável."
    }
  },
  {
    "id": "habito-deixa",
    "title": "O comportamento continua sem a antiga recompensa",
    "modules": [
      "recompensa",
      "decisao",
      "motor"
    ],
    "scenario": "Um comportamento foi aprendido porque produzia recompensa. Meses depois, a recompensa perdeu valor, mas uma deixa ambiental ainda dispara a sequência com pouca deliberação.",
    "question": "Qual interpretação explica a persistência sem assumir que o resultado ainda é avaliado do mesmo modo?",
    "options": [
      "A deixa apenas recorda a recompensa; antes de cada ação, o sistema recalcula o resultado atual com a mesma profundidade da fase inicial de aprendizagem.",
      "O sistema motor passa a produzir motivação por conta própria, de modo que a história de reforço deixa de contribuir para a sequência.",
      "Com repetição, o controle pode se tornar mais dependente da associação deixa–resposta e menos da reavaliação do resultado a cada ocorrência.",
      "A redução do valor da recompensa deveria desfazer rapidamente a sequência; sua persistência indica que a recompensa continua subjetivamente idêntica."
    ],
    "correct": 2,
    "optionFeedback": [
      "Preserva reavaliação detalhada e, por isso, não explica a menor sensibilidade ao resultado atual.",
      "Isola o sistema motor da aprendizagem que construiu e estabilizou a sequência.",
      "Esta opção descreve a mudança de controle de ação orientada por resultado para resposta mais dependente da deixa.",
      "Trata desvalorização como extinção imediata e ignora que hábitos podem persistir apesar da mudança do resultado."
    ],
    "explanation": "A recompensa pode ser decisiva para adquirir o comportamento sem continuar sendo consultada com a mesma profundidade em cada execução. A repetição fortalece o poder da deixa sobre a sequência.",
    "chain": [
      "recompensa favorece a aprendizagem inicial",
      "repetição estabiliza a sequência",
      "deixa ganha controle sobre a resposta",
      "ação ocorre com menor reavaliação do resultado"
    ]
  },
  {
    "id": "fala-repeticao",
    "title": "Compreende, fala, mas não consegue repetir",
    "modules": [
      "linguagem",
      "neuroanatomia",
      "metodos"
    ],
    "scenario": "Uma pessoa entende frases simples e produz fala espontânea, mas falha de forma marcante ao repetir palavras ou sequências ouvidas.",
    "question": "Qual hipótese e estratégia de investigação combinam melhor com o perfil sem reduzir linguagem a centros isolados?",
    "options": [
      "O padrão aponta primeiro para perda auditiva periférica; um exame temporal rápido basta para localizar o axônio responsável pela dificuldade de repetição.",
      "A produção espontânea preservada torna improvável qualquer participação frontal, de modo que a hipótese deve ficar restrita a armazenamento semântico temporal.",
      "A repetição falha porque palavras ficam armazenadas na substância branca; uma imagem estrutural pode mostrar diretamente qual representação lexical foi perdida.",
      "Uma dificuldade de comunicação entre redes temporais e frontais é plausível; medidas estruturais e de conectividade podem testar a via junto do perfil comportamental."
    ],
    "correct": 3,
    "optionFeedback": [
      "Move o problema para a periferia apesar da compreensão preservada e atribui precisão anatômica excessiva a uma medida temporal.",
      "Conclui que preservação parcial exclui participação de redes frontais, em vez de considerar tarefas diferentes.",
      "Confunde conexão com armazenamento do conteúdo lexical e promete leitura direta da representação.",
      "Esta opção formula uma hipótese de rede e combina método anatômico com comportamento, sem tratar o exame como resposta completa."
    ],
    "explanation": "O contraste entre compreensão, fala espontânea e repetição sugere investigar a cooperação entre redes. Métodos estruturais ou de difusão podem testar conectividade, mas o significado depende do padrão comportamental.",
    "chain": [
      "compreensão permanece relativamente funcional",
      "produção espontânea continua possível",
      "repetição exige transferência fonológica precisa",
      "conectividade frontal-temporal vira hipótese testável"
    ]
  },
  {
    "id": "movimento-farmaco",
    "title": "Uma intervenção química altera o portão motor",
    "modules": [
      "farmacologia",
      "motor",
      "clinica"
    ],
    "scenario": "Uma substância reduz fortemente a sinalização dopaminérgica em receptores envolvidos nos gânglios da base, e a pessoa apresenta lentificação e rigidez.",
    "question": "Qual cadeia interpreta o efeito sem transformar um mecanismo farmacológico em diagnóstico automático?",
    "options": [
      "O bloqueio pode alterar o equilíbrio dos gânglios da base e dificultar seleção do movimento; o diagnóstico ainda exige contexto clínico.",
      "A dopamina participa principalmente de recompensa, portanto o efeito motor deve ser explicado por sedação geral e não pelo circuito dos gânglios da base.",
      "O aparecimento de lentificação e rigidez identifica por si só uma doença neurodegenerativa, independentemente do momento de uso da substância.",
      "A redução do sinal dopaminérgico deveria facilitar a ação porque diminui uma influência inibitória; rigidez indicaria lesão medular não relacionada."
    ],
    "correct": 0,
    "optionFeedback": [
      "Esta opção conecta receptor, circuito e sinal motor, mas mantém aberta a distinção entre efeito farmacológico e diagnóstico clínico.",
      "Restringe dopamina a uma função e ignora circuitos motores dopaminérgicos.",
      "Confunde semelhança fenotípica com identidade etiológica e desconsidera a intervenção recente.",
      "Usa uma leitura linear de inibição e ignora a organização relativa das vias dos gânglios da base."
    ],
    "explanation": "A mesma molécula participa de circuitos diferentes. Alterar sinalização dopaminérgica nos gânglios da base pode produzir sinais motores, mas esses sinais não identificam sozinhos a causa clínica.",
    "chain": [
      "receptores dopaminérgicos são bloqueados",
      "equilíbrio das vias dos gânglios da base se modifica",
      "seleção e iniciação ficam mais difíceis",
      "sinais motores surgem e requerem contexto"
    ]
  },
  {
    "id": "avc-sensorial",
    "title": "O estímulo chega, mas a percepção corporal muda",
    "modules": [
      "sensorial",
      "neuroanatomia",
      "clinica"
    ],
    "scenario": "Após uma lesão vascular focal, receptores da pele continuam respondendo, mas a percepção consciente de estímulos em parte de um lado do corpo fica reduzida.",
    "question": "Qual explicação localiza a falha sem confundir transdução, transmissão e percepção?",
    "options": [
      "A resposta dos receptores mostra que toda a cadeia sensorial está preservada; a dificuldade deve refletir apenas menor atenção voluntária ao lado afetado.",
      "A transdução periférica pode continuar, enquanto uma lesão em vias centrais ou mapas corticais reduz a contribuição do sinal para a percepção consciente.",
      "A perda consciente exige morte simultânea dos nervos periféricos daquele lado, mesmo quando potenciais receptores ainda são registrados.",
      "A lesão cortical altera somente a decisão de relatar o estímulo; processamento sensorial e representação corporal permanecem equivalentes."
    ],
    "correct": 1,
    "optionFeedback": [
      "Trata a primeira etapa como prova da cadeia inteira e fecha cedo demais a localização.",
      "Esta opção preserva o receptor e posiciona a ruptura em etapas centrais necessárias à percepção.",
      "Contradiz a evidência de transdução periférica preservada e exige uma lesão mais ampla que o cenário.",
      "Reduz percepção a resposta verbal e ignora alterações reais em vias e mapas sensoriais."
    ],
    "explanation": "Percepção consciente emerge de uma cadeia. Um receptor funcional não garante que o sinal atravesse vias centrais, alcance mapas corticais e contribua normalmente para a experiência.",
    "chain": [
      "receptores periféricos transduzem o estímulo",
      "sinal inicia a transmissão",
      "via ou mapa central é lesionado",
      "percepção consciente fica incompleta"
    ]
  },
  {
    "id": "adolescencia-risco",
    "title": "Recompensa imediata em um cérebro em desenvolvimento",
    "modules": [
      "desenvolvimento",
      "recompensa",
      "decisao"
    ],
    "scenario": "Um adolescente compreende verbalmente um risco futuro, mas, diante dos amigos, escolhe uma recompensa imediata socialmente valorizada.",
    "question": "Qual leitura integra desenvolvimento e contexto sem concluir incapacidade nem destino inevitável?",
    "options": [
      "Redes em desenvolvimento tornam escolhas futuras indisponíveis, portanto explicações, experiência e consequências têm pouca capacidade de modificar o comportamento.",
      "Como o risco foi compreendido verbalmente, qualquer influência do grupo deixa de ser relevante; a escolha prova que o conhecimento era insincero.",
      "Redes de controle e avaliação social continuam se refinando; o grupo pode alterar o peso relativo das opções, sem eliminar aprendizagem ou possibilidade de mudança.",
      "O sistema de recompensa já está maduro, então diferenças de desenvolvimento não participam da decisão; apenas normas culturais explicam o episódio."
    ],
    "correct": 2,
    "optionFeedback": [
      "Transforma tendência de desenvolvimento em incapacidade fixa e retira plasticidade e aprendizagem.",
      "Confunde conhecimento declarativo com controle estável em qualquer contexto.",
      "Esta opção trata desenvolvimento como mudança de probabilidades e incorpora o valor social da situação.",
      "Separa biologia e contexto como alternativas excludentes, quando ambos podem interagir."
    ],
    "explanation": "Desenvolvimento modifica sensibilidade a contexto, recompensa e controle, mas não determina uma resposta única. Conhecimento, experiência e consequências continuam capazes de alterar o comportamento.",
    "chain": [
      "redes de controle e valor ainda se refinam",
      "contexto social aumenta o valor imediato",
      "competição entre opções se desloca",
      "escolha muda, mas permanece modificável"
    ]
  },
  {
    "id": "apresentacao-estresse",
    "title": "O conhecimento existe, mas não aparece na apresentação",
    "modules": [
      "emocao",
      "autonomo",
      "atencao",
      "plasticidade"
    ],
    "scenario": "Uma pessoa explica bem o tema em casa. Diante de uma plateia, percebe ativação corporal intensa, atenção estreita e dificuldade de recuperar a sequência.",
    "question": "Qual modelo separa armazenamento do conhecimento de acesso e organização durante o estado de estresse?",
    "options": [
      "A ativação autonômica desfaz rapidamente as mudanças sinápticas formadas no estudo, exigindo reaprender o conteúdo depois da apresentação.",
      "O desempenho ruim demonstra que a aprendizagem em casa era apenas aparente; conhecimento consolidado deveria ser recuperado do mesmo modo em qualquer estado.",
      "O aumento da frequência cardíaca bloqueia diretamente os programas motores da linguagem, enquanto atenção e avaliação de ameaça pouco contribuem.",
      "A ameaça aumenta ativação e competição atencional; o conhecimento permanece, mas recuperação e organização ficam menos estáveis."
    ],
    "correct": 3,
    "optionFeedback": [
      "Confunde dificuldade de acesso momentânea com reversão da plasticidade que sustentava o conhecimento.",
      "Trata recuperação como invariável ao estado e usa desempenho como medida completa de armazenamento.",
      "Isola um parâmetro corporal como causa direta e exclui processos atencionais e de ameaça.",
      "Esta opção distingue armazenamento de desempenho e integra estado corporal, atenção e recuperação."
    ],
    "explanation": "O estado de estresse pode alterar a competição por atenção e a organização da recuperação sem apagar o conteúdo aprendido. Saber, acessar e expressar são etapas relacionadas, mas não idênticas.",
    "chain": [
      "situação é avaliada como ameaçadora",
      "ativação autonômica e competição aumentam",
      "atenção e sequência ficam menos estáveis",
      "recuperação organizada se deteriora"
    ]
  }
];

const DOMAIN_CONNECTIONS = [
  {a:'sono', b:'plasticidade', verb:'favorece', title:'Sono ↔ consolidação', text:'O sono participa da estabilização e reorganização de memórias; não substitui codificação nem prática de recuperação.'},
  {a:'emocao', b:'atencao', verb:'prioriza', title:'Relevância ↔ seleção', text:'Sinais emocionais alteram quais estímulos vencem a competição atencional, especialmente sob ameaça ou alta saliência.'},
  {a:'recompensa', b:'decisao', verb:'atualiza', title:'Erro de previsão ↔ valor', text:'Resultados melhores ou piores que o esperado atualizam estimativas usadas em escolhas futuras.'},
  {a:'atencao', b:'plasticidade', verb:'seleciona', title:'Atenção ↔ aprendizagem', text:'Aquilo que recebe processamento sustentado tem maior chance de ser codificado e fortalecido; atenção sozinha não garante memória.'},
  {a:'autonomo', b:'emocao', verb:'expressa', title:'Estado corporal ↔ emoção', text:'Respostas autonômicas participam do estado emocional e também fornecem sinais que influenciam a experiência e a ação.'},
  {a:'neuroanatomia', b:'linguagem', verb:'conecta', title:'Vias ↔ linguagem', text:'Linguagem depende de redes distribuídas e das conexões entre elas, não apenas de dois pontos isolados.'},
  {a:'motor', b:'recompensa', verb:'automatiza', title:'Recompensa ↔ hábito motor', text:'Reforço e repetição podem transferir controle para sequências mais automáticas acionadas por deixas.'},
  {a:'farmacologia', b:'neuronio', verb:'modula', title:'Drogas ↔ sinapse', text:'Fármacos podem alterar liberação, recaptação, receptores ou cascatas; o efeito depende do circuito em que a sinapse está inserida.'},
  {a:'clinica', b:'metodos', verb:'investiga', title:'Sintoma ↔ evidência', text:'Um comportamento ou sintoma gera hipóteses; métodos diferentes testam aspectos diferentes e nenhum resultado isolado contém toda a explicação.'},
  {a:'sensorial', b:'motor', verb:'corrige', title:'Sensação ↔ ação', text:'Movimento usa feedback sensorial para comparar o resultado com a intenção e corrigir a execução.'},
  {a:'desenvolvimento', b:'decisao', verb:'refina', title:'Desenvolvimento ↔ controle', text:'Redes de valor, controle e aprendizagem continuam se refinando e permanecem sensíveis à experiência.'},
  {a:'sono', b:'emocao', verb:'regula', title:'Sono ↔ reatividade', text:'Sono insuficiente pode alterar regulação emocional, interpretação de relevância e recuperação do estado basal.'}
];

const DOMAIN_TRAILS = [
  {id:'celular', title:'Celular e molecular', desc:'Do gradiente iônico às mudanças duradouras da sinapse.', modules:['neuronio','plasticidade','farmacologia']},
  {id:'redes', title:'Redes e cognição', desc:'Como atenção, valor, emoção, sono e linguagem emergem de redes distribuídas.', modules:['atencao','emocao','sono','linguagem','decisao']},
  {id:'acao', title:'Cérebro e comportamento', desc:'Recompensa, estado corporal, ação, hábito e desenvolvimento.', modules:['recompensa','autonomo','motor','desenvolvimento']},
  {id:'ciencia', title:'Ciência e clínica', desc:'Como localizar alterações, escolher métodos e interpretar limites.', modules:['neuroanatomia','sensorial','clinica','metodos']}
];

const DOMAIN_SESSION = {caseRetry:{}, counterRetry:{}};

function domainDefaultState(){
  return {counterfactual:{}, cases:{}, lastVisit:0, activeTab:'today'};
}
function normalizeDomainState(raw){
  const out=Object.assign(domainDefaultState(), raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{});
  ['counterfactual','cases'].forEach(k=>{
    if(!out[k]||typeof out[k]!=='object'||Array.isArray(out[k])) out[k]={};
  });
  if(!DOMAIN_TABS.some(t=>t.id===out.activeTab)) out.activeTab='today';
  out.lastVisit=Math.max(0,Number(out.lastVisit)||0);
  return out;
}
function ensureDomainState(){
  state.domain=normalizeDomainState(state.domain);
  return state.domain;
}
function domainClamp(v){ v=Number(v); return isFinite(v)?Math.max(0,Math.min(1,v)):0; }
function domainPct(v){ return v===null||v===undefined?'—':Math.round(domainClamp(v)*100)+'%'; }
function domainCoverageStats(){
  const lessonTotal=MODULES.reduce((sum,m)=>sum+m.lessons.length,0);
  let lessonsDone=0, quizzesDone=0;
  MODULES.forEach(m=>{
    m.lessons.forEach((_,li)=>{ if(state.lessons[topicKey(m.id,li)]) lessonsDone++; });
    if(state.doneQuiz&&state.doneQuiz[m.id]) quizzesDone++;
  });
  const total=lessonTotal+MODULES.length, done=lessonsDone+quizzesDone;
  return {value:total?done/total:0,total,done,lessonTotal,lessonsDone,quizTotal:MODULES.length,quizzesDone};
}
function domainStage(){
  const coverage=domainCoverageStats().value;
  if(coverage>=.999) return 'post';
  // Compatibilidade com o indicador geral antigo: quem já chegou a 70% nele
  // não perde acesso enquanto a cobertura passa a ser medida separadamente.
  if(coverage>=DOMAIN_THRESHOLD || overallProgress()>=DOMAIN_THRESHOLD) return 'active';
  return 'preview';
}
function domainModule(mid){ return MODULES.find(m=>m.id===mid); }
function domainModuleIndex(mid){ return MODULES.findIndex(m=>m.id===mid); }
function domainModuleReadiness(mid){
  const m=domainModule(mid); return m?domainClamp(moduleProgress(m)):0;
}
function domainAverageDimension(dim){
  const vals=[];
  const groups=state.dimensionEvidence||{};
  Object.keys(groups).forEach(scope=>{
    const rec=groups[scope]&&groups[scope][dim];
    if(rec&&Number(rec.attempts)>0&&isFinite(Number(rec.score))) vals.push(domainClamp(rec.score));
  });
  if(!vals.length) return {value:null,n:0};
  return {value:vals.reduce((a,b)=>a+b,0)/vals.length,n:vals.length};
}
function domainRetentionMetric(){
  const vals=[];
  Object.keys(state.srs||{}).forEach(key=>{
    const r=state.srs[key];
    if(!r||Number(r.reps||0)<1) return;
    if(typeof r.lastScore==='number') vals.push(domainClamp(r.lastScore));
    else if(Number(r.box||0)>0) vals.push(Math.min(.95,.55+Number(r.box||0)*.07));
  });
  if(!vals.length) return {value:null,n:0};
  return {value:vals.reduce((a,b)=>a+b,0)/vals.length,n:vals.length};
}
function domainIntegrationMetric(){
  ensureDomainState();
  const vals=[];
  Object.keys(state.domain.cases).forEach(id=>{
    const r=state.domain.cases[id];
    if(!r||typeof r.lastResult!=='number') return;
    const clarity=typeof r.clarity==='number'?domainClamp(r.clarity):.5;
    vals.push(domainClamp(.7*r.lastResult+.3*clarity));
  });
  if(!vals.length) return {value:null,n:0};
  return {value:vals.reduce((a,b)=>a+b,0)/vals.length,n:vals.length};
}
function domainMetrics(){
  return {
    coverage:Object.assign({n:domainCoverageStats().total},domainCoverageStats()),
    retention:domainRetentionMetric(),
    causality:domainAverageDimension('causality'),
    application:domainAverageDimension('application'),
    integration:domainIntegrationMetric()
  };
}
function domainMetricCard(label,metric,sub){
  const empty=metric.value===null;
  const tone=empty?'empty':(metric.value>=.78?'strong':metric.value>=.5?'forming':'fragile');
  return `<div class="dm-metric ${tone}"><span>${label}</span><b>${empty?'—':domainPct(metric.value)}</b><small>${empty?'dados insuficientes':sub(metric)}</small></div>`;
}
function domainTopicTouched(m,li,key){
  const scope=state.dimensionEvidence&&state.dimensionEvidence[topicScope(key)];
  return Boolean(state.lessons[key] || Object.prototype.hasOwnProperty.call(state.topicMastery||{},key) || (state.miniWrong&&state.miniWrong[key]) || scope);
}
function domainWeakTopics(limit){
  const list=[];
  MODULES.forEach((m,mi)=>m.lessons.forEach((lesson,li)=>{
    const key=topicKey(m.id,li);
    if(!domainTopicTouched(m,li,key)) return;
    const weak=weakestDimensionForTopic(key);
    const tm=domainClamp(state.topicMastery[key]||0);
    const misses=Math.max(0,Number(state.miniWrong[key])||0);
    const rec=state.srs&&state.srs[key];
    const overdue=rec&&rec.due<=startOfDay(Date.now());
    const weakGap=weak.score===null?.45:(1-domainClamp(weak.score));
    const score=weakGap*.52+(1-tm)*.25+Math.min(1,misses/3)*.16+(overdue?.07:0);
    const reasons=[];
    if(weak.score!==null) reasons.push(`${weak.label.toLowerCase()} ${domainPct(weak.score)}`);
    else reasons.push('pouca evidência por dimensão');
    if(misses) reasons.push(`${misses} erro${misses!==1?'s':''} registrado${misses!==1?'s':''}`);
    if(overdue) reasons.push('revisão vencida');
    if(tm<.75) reasons.push(`mini quiz ${domainPct(tm)}`);
    list.push({key,mi,li,module:m,title:lesson.t,weak,tm,misses,overdue,score,reasons});
  }));
  list.sort((a,b)=>b.score-a.score || a.tm-b.tm || b.misses-a.misses);
  return list.slice(0,limit||8);
}
function domainNextCase(){
  ensureDomainState();
  const arr=DOMAIN_CASES.map((c,i)=>{
    const attempted=state.domain.cases[c.id]&&state.domain.cases[c.id].attempts||0;
    const readiness=c.modules.reduce((s,m)=>s+domainModuleReadiness(m),0)/c.modules.length;
    return {c,i,attempted,readiness};
  });
  arr.sort((a,b)=>(a.attempted-b.attempted)||(b.readiness-a.readiness)||(a.i-b.i));
  return arr[0]&&arr[0].c;
}
function domainNextCounter(){
  ensureDomainState();
  const arr=DOMAIN_COUNTERFACTUALS.map((c,i)=>({c,i,attempted:(state.domain.counterfactual[c.id]&&state.domain.counterfactual[c.id].attempts)||0,ready:domainModuleReadiness(c.module)}));
  arr.sort((a,b)=>(a.attempted-b.attempted)||(b.ready-a.ready)||(a.i-b.i));
  return arr[0]&&arr[0].c;
}
function domainReadinessLabel(modules){
  const vals=modules.map(domainModuleReadiness);
  const avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;
  return avg>=.75?'base bem percorrida':avg>=.4?'base em formação':'pode explorar como prévia';
}
function domainModulesHTML(ids){
  return `<div class="dm-tags">${ids.map(id=>{const m=domainModule(id);return m?`<span style="--tag:${m.color}">M${m.n} · ${m.title}</span>`:'';}).join('')}</div>`;
}
function renderDomainEntry(){
  const host=document.getElementById('db-domain-entry'); if(!host) return;
  ensureDomainState();
  const stage=domainStage(), pct=Math.round(domainCoverageStats().value*100);
  const due=dueTopics().length, weak=domainWeakTopics(99).length;
  const casesDone=Object.keys(state.domain.cases).filter(k=>state.domain.cases[k]&&state.domain.cases[k].attempts).length;
  let eyebrow,title,text,button;
  if(stage==='post'){
    eyebrow='PERCURSO CONCLUÍDO · PRÓXIMA FASE';
    title='O mapa terminou. Agora começa o domínio.';
    text='Recupere sem apoio, fortaleça conceitos frágeis e conecte módulos em problemas que não cabem numa única aula.';
    button='Entrar no Modo Domínio';
  }else if(stage==='active'){
    eyebrow='MODO DOMÍNIO · DISPONÍVEL AGORA';
    title='Fortaleça o que já estudou enquanto conclui o percurso.';
    text=`Você já percorreu ${pct}% da rede — conteúdo suficiente para começar revisões orientadas, casos integrados e desafios contrafactuais.`;
    button='Abrir Modo Domínio';
  }else{
    eyebrow='MODO DOMÍNIO · PRÉVIA';
    title='Veja como o estudo continua depois da primeira passagem.';
    text=`O modo se torna mais informativo perto de 70% do percurso. Você está em ${pct}% e pode explorá-lo sem bloquear o curso.`;
    button='Explorar prévia';
  }
  host.innerHTML=`<section class="dm-entry ${stage}" aria-labelledby="dm-entry-title">
    <div class="dm-entry-k">${eyebrow}</div>
    <h3 id="dm-entry-title">${title}</h3>
    <p>${text}</p>
    <div class="dm-entry-stats">
      <span><b>${due}</b> revisões pendentes</span>
      <span><b>${weak}</b> conceitos observados</span>
      <span><b>${casesDone}/${DOMAIN_CASES.length}</b> casos praticados</span>
    </div>
    <button class="bigbtn dm-entry-btn" style="--mc:var(--violet)" onclick="openDomainMode()">${button} →</button>
  </section>`;
}
function openDomainMode(tab){
  ensureDomainState();
  state.domain.lastVisit=Date.now();
  if(tab&&DOMAIN_TABS.some(t=>t.id===tab)) state.domain.activeTab=tab;
  saveState();
  renderDomainView();
  go('domain');
}
function domainSetTab(tab){
  if(!DOMAIN_TABS.some(t=>t.id===tab)) return;
  ensureDomainState(); state.domain.activeTab=tab; saveState();
  renderDomainView();
  const body=document.getElementById('dm-body'); if(body) body.focus({preventScroll:true});
}
function renderDomainView(){
  ensureDomainState();
  const head=document.getElementById('dm-head'), nav=document.getElementById('dm-nav'), body=document.getElementById('dm-body');
  if(!head||!nav||!body) return;
  const stage=domainStage(), coverage=Math.round(domainCoverageStats().value*100);
  head.innerHTML=`<div class="dm-kicker">${stage==='post'?'PÓS-CURSO':'SEGUNDA CAMADA DO APRENDIZADO'}</div>
    <h2>Modo <em>Domínio</em></h2>
    <p>${stage==='post'?'Você percorreu todo o território. Agora o objetivo é navegar sem depender do mapa.':`Você já percorreu ${coverage}% do curso. O domínio cresce junto com o restante do percurso.`}</p>`;
  nav.innerHTML=DOMAIN_TABS.map(t=>`<button type="button" class="${state.domain.activeTab===t.id?'active':''}" aria-pressed="${state.domain.activeTab===t.id?'true':'false'}" onclick="domainSetTab('${t.id}')">${t.label}</button>`).join('');
  body.setAttribute('tabindex','-1');
  const renderers={today:domainRenderToday,reviews:domainRenderReviews,weak:domainRenderWeak,cases:domainRenderCases,counter:domainRenderCounter,connections:domainRenderConnections,trails:domainRenderTrails};
  body.innerHTML=(renderers[state.domain.activeTab]||domainRenderToday)();
}
function domainRenderToday(){
  const metrics=domainMetrics(), due=dueTopics(), weak=domainWeakTopics(1)[0], nextCase=domainNextCase(), nextCounter=domainNextCounter();
  return `<section class="dm-overview">
    <div class="dm-metrics">
      ${domainMetricCard('Cobertura',metrics.coverage,m=>`${m.done} de ${m.total} etapas percorridas`)}
      ${domainMetricCard('Retenção',metrics.retention,m=>`${m.n} revisões com resultado`)}
      ${domainMetricCard('Explicação',metrics.causality,m=>`${m.n} evidências causais`)}
      ${domainMetricCard('Aplicação',metrics.application,m=>`${m.n} evidências de aplicação`)}
      ${domainMetricCard('Integração',metrics.integration,m=>`${m.n} casos respondidos`)}
    </div>
    <div class="dm-note"><b>Cobertura não é domínio.</b> Um número só aparece quando há comportamento suficiente para sustentá-lo. “—” significa que o NeuroLab ainda não possui evidência, não que você tenha zero conhecimento.</div>
  </section>
  <section class="dm-section">
    <div class="dm-section-head"><div><span>PLANO DE HOJE</span><h3>A menor atividade com maior retorno</h3></div></div>
    <div class="dm-today-grid">
      <article class="dm-action review">
        <div class="dm-action-k">01 · RECUPERAR</div><h4>${due.length?`${due.length} revisão${due.length!==1?'ões':''} pendente${due.length!==1?'s':''}`:'Nenhuma revisão vencida'}</h4>
        <p>${due.length?'Comece pelo que o intervalo já colocou à prova. A sessão usa no máximo oito tópicos.':'O cronograma está em dia. Não é preciso revisar cedo apenas para preencher uma tarefa.'}</p>
        <button onclick="${due.length?'startReview()':"domainSetTab('reviews')"}">${due.length?'Revisar agora':'Ver cronograma'} →</button>
      </article>
      <article class="dm-action weak">
        <div class="dm-action-k">02 · RECONSTRUIR</div><h4>${weak?weak.title:'Nenhum conceito frágil detectado'}</h4>
        <p>${weak?`Foco atual: ${weak.reasons.slice(0,2).join(' · ')}.`:'Conclua mini quizzes e autoavaliações para o diagnóstico ganhar precisão.'}</p>
        <button onclick="${weak?`domainOpenTopic(${weak.mi},${weak.li})`:"domainSetTab('weak')"}">${weak?'Abrir o tópico':'Ver diagnóstico'} →</button>
      </article>
      <article class="dm-action case">
        <div class="dm-action-k">03 · INTEGRAR</div><h4>${nextCase.title}</h4>
        <p>${nextCase.scenario}</p>
        <button onclick="domainOpenCase('${nextCase.id}')">Resolver caso →</button>
      </article>
      <article class="dm-action counter">
        <div class="dm-action-k">04 · DEDUZIR</div><h4>${nextCounter.title}</h4>
        <p>${nextCounter.prompt}</p>
        <button onclick="domainOpenCounter('${nextCounter.id}')">Testar mecanismo →</button>
      </article>
    </div>
  </section>`;
}
function domainRenderReviews(){
  const due=dueTopics(), scheduled=srsScheduledCount(), nd=nextDueDate();
  if(!scheduled) return `<section class="dm-empty"><div class="dm-empty-icon">↻</div><h3>A fila ainda está sendo construída</h3><p>Concluir aulas e mini quizzes agenda os tópicos. O Modo Domínio não inventa revisões para conteúdo que você ainda não praticou.</p><button class="bigbtn ghost" style="--mc:var(--cyan)" onclick="go('dashboard')">Voltar aos módulos</button></section>`;
  if(!due.length){
    const days=nd?Math.max(0,Math.round((nd-startOfDay(Date.now()))/DAY)):null;
    return `<section class="dm-empty"><div class="dm-empty-icon">✓</div><h3>Nada vence hoje</h3><p>${days!==null?`A próxima revisão está prevista para daqui a ${days} dia${days!==1?'s':''}.`:'O cronograma não possui uma próxima data.'} Voltar cedo demais pode medir familiaridade, não retenção.</p></section>`;
  }
  return `<section class="dm-section"><div class="dm-section-head"><div><span>REVISÕES PENDENTES</span><h3>${due.length} tópico${due.length!==1?'s':''} no ponto de recuperação</h3></div><button class="bigbtn" style="--mc:var(--cyan)" onclick="startReview()">Iniciar sessão</button></div>
    <div class="dm-list">${due.map(d=>{
      const why=typeof reviewReasonData==='function'?reviewReasonData(d):null;
      return `<article class="dm-row"><i style="--dot:${d.color}"></i><div><b>Módulo ${d.mn} · ${d.title}</b><p>${why?why.title:'Revisão vencida'} · ${d.overdue?`${d.overdue} dia${d.overdue!==1?'s':''} de atraso`:'vence hoje'} · intervalo ${SRS_INTERVALS[d.box]}d</p></div><button onclick="domainOpenTopic(${d.mi},${d.li})">ver tópico</button></article>`;
    }).join('')}</div></section>`;
}
function domainRenderWeak(){
  const topics=domainWeakTopics(12);
  if(!topics.length) return `<section class="dm-empty"><div class="dm-empty-icon">◇</div><h3>Ainda não há diagnóstico suficiente</h3><p>O painel precisa de mini quizzes, erros, revisões ou autoavaliações. Ele não classifica como frágil um conteúdo que você simplesmente ainda não tocou.</p></section>`;
  return `<section class="dm-section"><div class="dm-section-head"><div><span>CONCEITOS FRÁGEIS</span><h3>Onde o modelo ainda perde peças</h3></div></div>
    <p class="dm-section-intro">A ordem combina a dimensão mais fraca, erros registrados, domínio do mini quiz e revisões vencidas. Não é um julgamento sobre você; é uma fila de maior retorno.</p>
    <div class="dm-weak-grid">${topics.map((t,i)=>`<article class="dm-weak-card">
      <div class="dm-rank">${String(i+1).padStart(2,'0')}</div><div class="dm-weak-main"><span>MÓDULO ${t.module.n}</span><h4>${t.title}</h4><p>${t.reasons.join(' · ')}</p></div>
      <div class="dm-weak-score"><small>prioridade</small><b>${Math.round(t.score*100)}</b></div>
      <button onclick="domainOpenTopic(${t.mi},${t.li})">Reabrir aula e mecanismo →</button>
    </article>`).join('')}</div></section>`;
}
function domainRenderCases(){
  ensureDomainState();
  return `<section class="dm-section"><div class="dm-section-head"><div><span>CASOS INTEGRADOS</span><h3>Problemas que atravessam módulos</h3></div></div>
    <p class="dm-section-intro">Cada alternativa representa um modelo plausível. Para acertar, é preciso distinguir a cadeia completa de explicações parciais, monocausais ou com os elos na ordem errada.</p>
    <div class="dm-case-grid">${DOMAIN_CASES.map(c=>{
      const r=state.domain.cases[c.id], done=r&&r.attempts;
      return `<article class="dm-case-card ${done?'done':''}"><div class="dm-card-top"><span>${done?'PRATICADO':'CASO'}</span><small>${domainReadinessLabel(c.modules)}</small></div><h4>${c.title}</h4><p>${c.scenario}</p>${domainModulesHTML(c.modules)}<button onclick="domainOpenCase('${c.id}')">${done?'Rever ou refazer':'Resolver'} →</button></article>`;
    }).join('')}</div></section>`;
}
function domainOpenCase(id){
  ensureDomainState();
  const c=DOMAIN_CASES.find(x=>x.id===id); if(!c) return;
  state.domain.activeTab='cases'; saveState();
  const body=document.getElementById('dm-body'); if(!body){ openDomainMode('cases'); return; }
  body.innerHTML=domainRenderCaseDetail(c);
  window.scrollTo({top:0,behavior:'auto'});
}
function domainRenderCaseDetail(c){
  const rec=ensureDomainState().cases[c.id]||{};
  const reveal=Boolean(rec.lastAt&&!DOMAIN_SESSION.caseRetry[c.id]);
  return `<section class="dm-detail"><button class="backbtn" onclick="domainSetTab('cases')">← todos os casos</button>
    <div class="dm-detail-k">CASO INTEGRADO · ${domainReadinessLabel(c.modules)}</div><h3>${c.title}</h3><p class="dm-scenario">${c.scenario}</p>${domainModulesHTML(c.modules)}
    <div class="dm-question"><span>Reconstrua a cadeia</span><h4>${c.question}</h4><div class="dm-options">${c.options.map((o,i)=>`<button ${reveal?'disabled':''} class="${reveal?(i===c.correct?'correct':i===rec.lastChoice?'wrong':'dim'):''}" onclick="domainAnswerCase('${c.id}',${i})"><b>${String.fromCharCode(65+i)}</b><span>${o}</span></button>`).join('')}</div></div>
    ${reveal?domainActivityFeedback('case',c,rec):''}
  </section>`;
}
function domainAnswerCase(id,choice){
  const c=DOMAIN_CASES.find(x=>x.id===id); if(!c) return;
  ensureDomainState(); const old=state.domain.cases[id]||{}; const right=choice===c.correct;
  state.domain.cases[id]=Object.assign({},old,{attempts:(old.attempts||0)+1,lastChoice:choice,lastResult:right?1:0,best:Math.max(old.best||0,right?1:0),lastAt:Date.now()});
  c.modules.forEach(mid=>recordDimensionEvidence(moduleScope(mid),'application',right?1:0,'domain-case',{questionId:'DCASE:'+id+':'+mid}));
  DOMAIN_SESSION.caseRetry[id]=false; saveNow(); domainOpenCase(id);
}
function domainRenderCounter(){
  ensureDomainState();
  const grouped=MODULES.map(m=>({m,items:DOMAIN_COUNTERFACTUALS.filter(c=>c.module===m.id)})).filter(g=>g.items.length);
  return `<section class="dm-section"><div class="dm-section-head"><div><span>DESAFIOS CONTRAFACTUAIS</span><h3>Mude uma peça e deduza o restante</h3></div></div>
    <p class="dm-section-intro">O objetivo é comparar quatro modelos próximos: preserve o que continua funcionando, localize a primeira ruptura e rejeite explicações que confundem condição necessária com causa suficiente.</p>
    <div class="dm-counter-list">${grouped.map(g=>g.items.map(c=>{
      const r=state.domain.counterfactual[c.id], done=r&&r.attempts;
      return `<article class="dm-counter-card" style="--mc:${g.m.color}"><div><span>MÓDULO ${g.m.n}</span><h4>${c.title}</h4><p>${c.prompt}</p></div><button onclick="domainOpenCounter('${c.id}')">${done?'Refazer':'Responder'} →</button></article>`;
    }).join('')).join('')}</div></section>`;
}
function domainOpenCounter(id){
  const c=DOMAIN_COUNTERFACTUALS.find(x=>x.id===id); if(!c) return;
  ensureDomainState(); state.domain.activeTab='counter'; saveState();
  const body=document.getElementById('dm-body'); if(!body){ openDomainMode('counter'); return; }
  body.innerHTML=domainRenderCounterDetail(c);
  window.scrollTo({top:0,behavior:'auto'});
}
function domainRenderCounterDetail(c){
  const m=domainModule(c.module), rec=ensureDomainState().counterfactual[c.id]||{};
  const reveal=Boolean(rec.lastAt&&!DOMAIN_SESSION.counterRetry[c.id]);
  return `<section class="dm-detail"><button class="backbtn" onclick="domainSetTab('counter')">← todos os desafios</button>
    <div class="dm-detail-k" style="color:${m.color}">MÓDULO ${m.n} · CONTRAFACTUAL</div><h3>${c.title}</h3><p class="dm-scenario">${c.prompt}</p>
    <div class="dm-question"><span>Qual cadeia sobrevive ao teste?</span><div class="dm-options">${c.options.map((o,i)=>`<button ${reveal?'disabled':''} class="${reveal?(i===c.correct?'correct':i===rec.lastChoice?'wrong':'dim'):''}" onclick="domainAnswerCounter('${c.id}',${i})"><b>${String.fromCharCode(65+i)}</b><span>${o}</span></button>`).join('')}</div></div>
    ${reveal?domainActivityFeedback('counter',c,rec):''}
  </section>`;
}
function domainAnswerCounter(id,choice){
  const c=DOMAIN_COUNTERFACTUALS.find(x=>x.id===id); if(!c) return;
  ensureDomainState(); const old=state.domain.counterfactual[id]||{}; const right=choice===c.correct;
  state.domain.counterfactual[id]=Object.assign({},old,{attempts:(old.attempts||0)+1,lastChoice:choice,lastResult:right?1:0,best:Math.max(old.best||0,right?1:0),lastAt:Date.now()});
  recordDimensionEvidence(topicScope(topicKey(c.module,c.lesson)),'causality',right?1:0,'counterfactual',{questionId:'DCF:'+id});
  DOMAIN_SESSION.counterRetry[id]=false; saveNow(); domainOpenCounter(id);
}
function domainActivityFeedback(type,item,rec){
  const right=rec.lastResult===1;
  const clarity=typeof rec.clarity==='number'?rec.clarity:null;
  const buttons=[['1','Consegui reconstruir'],['0.5','Faltou uma ligação'],['0','Só reconheci depois']];
  return `<div class="dm-feedback ${right?'right':'wrong'}"><div class="dm-verdict">${right?'✓ A cadeia ficou de pé':'✕ A primeira ruptura foi outra'}</div><p>${item.explanation}</p><ol>${item.chain.map(x=>`<li>${x}</li>`).join('')}</ol>${item.extend?`<div class="dm-extend"><span>Estenda a cadeia</span><p><b>${item.extend.q}</b> ${item.extend.a}</p></div>`:''}
    <div class="dm-clarity"><span>Sem olhar, você conseguiria reconstruir a cadeia?</span><div>${buttons.map(([v,l])=>`<button class="${clarity!==null&&Number(v)===clarity?'picked':''}" onclick="domainRateActivity('${type}','${item.id}',${v})">${l}</button>`).join('')}</div></div>
    <button class="bigbtn ghost dm-retry" style="--mc:var(--violet)" onclick="domainRetryActivity('${type}','${item.id}')">Tentar novamente sem apoio</button>
  </div>`;
}
function domainRateActivity(type,id,value){
  ensureDomainState(); const bucket=type==='case'?state.domain.cases:state.domain.counterfactual;
  if(!bucket[id]) return; bucket[id].clarity=domainClamp(value); bucket[id].ratedAt=Date.now(); saveNow();
  if(type==='case') domainOpenCase(id); else domainOpenCounter(id);
}
function domainRetryActivity(type,id){
  if(type==='case'){ DOMAIN_SESSION.caseRetry[id]=true; domainOpenCase(id); }
  else { DOMAIN_SESSION.counterRetry[id]=true; domainOpenCounter(id); }
}
function domainRenderConnections(){
  return `<section class="dm-section"><div class="dm-section-head"><div><span>MAPA DE CONEXÕES · V1</span><h3>Relações que atravessam o percurso</h3></div></div>
    <p class="dm-section-intro">Esta primeira versão usa relações explícitas em vez de uma teia decorativa. Cada cartão diz o verbo da conexão — o tipo de influência é parte do conhecimento.</p>
    <div class="dm-connection-grid">${DOMAIN_CONNECTIONS.map(c=>{
      const a=domainModule(c.a),b=domainModule(c.b);
      return `<article class="dm-connection"><div class="dm-nodes"><button style="--node:${a.color}" onclick="domainOpenModule('${a.id}')">${a.title}</button><span>${c.verb}</span><button style="--node:${b.color}" onclick="domainOpenModule('${b.id}')">${b.title}</button></div><h4>${c.title}</h4><p>${c.text}</p></article>`;
    }).join('')}</div></section>`;
}
function domainRenderTrails(){
  return `<section class="dm-section"><div class="dm-section-head"><div><span>TRILHAS AVANÇADAS · V1</span><h3>Reorganize o que já aprendeu</h3></div></div>
    <p class="dm-section-intro">As trilhas não adicionam uma parede de conteúdo novo. Elas mudam a ordem de leitura para revelar uma pergunta maior que atravessa módulos existentes.</p>
    <div class="dm-trail-grid">${DOMAIN_TRAILS.map(t=>{
      const vals=t.modules.map(domainModuleReadiness), avg=vals.reduce((a,b)=>a+b,0)/vals.length;
      const next=t.modules.find(id=>domainModuleReadiness(id)<.8)||t.modules[0];
      return `<article class="dm-trail"><div class="dm-trail-top"><span>TRILHA</span><b>${domainPct(avg)}</b></div><h4>${t.title}</h4><p>${t.desc}</p><div class="dm-trail-mods">${t.modules.map(id=>{const m=domainModule(id),p=domainModuleReadiness(id);return `<button onclick="domainOpenModule('${id}')"><i style="--p:${p*100}%;--c:${m.color}"></i><span>M${m.n}</span><b>${m.title}</b><small>${domainPct(p)}</small></button>`;}).join('')}</div><button class="dm-trail-next" onclick="domainOpenModule('${next}')">Continuar pela trilha →</button></article>`;
    }).join('')}</div></section>`;
}
function domainOpenModule(mid){
  const i=domainModuleIndex(mid); if(i<0) return; openModule(i);
}
function domainOpenTopic(mi,li){
  openModule(mi);
  setTimeout(()=>scrollModuleSection('lesson-'+li),100);
}
