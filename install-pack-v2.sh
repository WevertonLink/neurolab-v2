#!/bin/bash
# ==========================================
# NEUROLAB V2 - PACK DE ATUALIZAÇÃO V2
# Injeção Nativa dos Módulos 17 e 18
# ==========================================

cd ~/neurolab-v2 || exit 1

echo "📦 Iniciando instalação do Pack V2..."

# 1. Backups de segurança
cp src/05-app.js src/05-app.js.bak
cp index.html index.html.bak

# 2. Injeção dos módulos no padrão exato da auditoria (chaves n, t, b, q, o, c, l)
cat << 'MODULES_EOF' >> src/05-app.js

/* =====================================================================
   MÓDULOS AVANÇADOS — CICLO CLÍNICO (M17 e M18)
   ===================================================================== */
MODULES.push({
  id:'decisao-avancada', n:'17', title:'Circuitos de Decisão e Desconto Temporal', color:'var(--cyan)', hex:'#22d3ee',
  tag:'O conflito entre o agora e o futuro',
  intro:'A tomada de decisão exige traduzir recompensas totalmente diferentes (tempo, dinheiro, esforço) em uma mesma "moeda biológica" de valor subjetivo. Neste módulo, vamos aprofundar como o cérebro faz essa conversão e arbitra conflitos temporais.',
  lessons:[
    {t:'O Córtex Pré-Frontal Ventromedial (vmPFC)',
     b:`<p>A neuroeconomia biológica acontece primariamente no <span class="term">vmPFC</span>. Esta região, em forte diálogo com o núcleo accumbens, atua integrando o estado interno do organismo com a recompensa esperada, computando o <strong>valor imediato</strong> da escolha.</p>`},
    {t:'Desconto Temporal e o dlPFC',
     b:`<p>Quando você precisa decidir entre ganhar algo hoje ou no futuro, o cérebro desvaloriza a recompensa futura — o chamado <span class="term">desconto temporal</span>.</p><p>Para resistir à atração imediata, o <span class="term">dlPFC (Córtex Pré-Frontal Dorsolateral)</span> aplica controle top-down, sustentando ativamente a meta abstrata futura no circuito.</p>`}
  ],
  quiz:[
    {q:'Em tarefas de desconto temporal, pacientes com lesão severa no Córtex Pré-Frontal Dorsolateral (dlPFC) tenderão a:',
     o:['Optar sistematicamente pela recompensa imediata por falta de controle inibitório sobre o estriado.','Escolher sempre a recompensa futura, pois perdem a noção de tempo.','Perder a capacidade de mover as mãos para sinalizar a resposta.','Esquecer as regras do jogo por perda de memória semântica.'], c:0, l:1,
     er:'Correto! O <strong>dlPFC atua como freio inibitório</strong>. Sem sua atividade, o sinal de recompensa imediata do estriado domina o comportamento.',
     ew:'Incorreto. Sem a modulação top-down do dlPFC, o sistema foca apenas na recompensa do <strong>agora</strong>, gerando impulsividade imediata.'}
  ]
});

MODULES.push({
  id:'farmacodinamica', n:'18', title:'Farmacodinâmica e Modulação Alostérica', color:'var(--amber)', hex:'#fbbf24',
  tag:'A sintonia fina das sinapses',
  intro:'Como medicamentos conseguem ajustar a ansiedade sem desligar o cérebro por completo? Este módulo explora a manipulação fina das fendas sinápticas.',
  lessons:[
    {t:'Receptores GABA-A e o Poro de Cloreto',
     b:`<p>O receptor GABA-A atua como um canal iônico. Quando o GABA se liga aos <span class="term">sítios ortostéricos</span>, o poro se abre e permite o influxo de íons Cloreto (Cl-), hiperpolarizando o neurônio.</p>`},
    {t:'Moduladores Alostéricos Positivos (PAMs)',
     b:`<p>Medicamentos como <strong>benzodiazepínicos</strong> não abrem o canal sozinhos. Eles se ligam a um <span class="term">sítio alostérico</span> lateral e alteram a estrutura do receptor. Quando o GABA natural se liga, o canal abre com mais frequência, garantindo grande margem de segurança biológica.</p>`}
  ],
  quiz:[
    {q:'Qual a principal diferença de mecanismo entre um Modulador Alostérico Positivo (PAM) e um agonista direto de GABA?',
     o:['O PAM depende da presença e ligação do neurotransmissor natural (GABA) para amplificar o sinal.','O PAM fecha permanentemente os canais de sódio sensíveis à voltagem.','O agonista direto converte inibição em despolarização excitatória.','O PAM destrói os receptores na fenda sináptica.'], c:0, l:1,
     er:'Correto! Moduladores alostéricos não abrem a "porta" sozinhos, eles apenas tornam a "fechadura" mais sensível para o ligante endógeno (GABA).',
     ew:'Incorreto. A diferença central é que o PAM <strong>depende do GABA natural</strong>. Sem GABA na fenda, o PAM não consegue abrir o canal inibitório sozinho.'}
  ]
});
MODULES_EOF

# 3. Atualiza o contador de módulos visível no index.html
sed -i 's/<span id="db-modcount">16<\/span>/<span id="db-modcount">18<\/span>/g' index.html

echo "✅ Pack V2 aplicado com sucesso! Padrão estrutural do modelo de aprendizagem respeitado."
