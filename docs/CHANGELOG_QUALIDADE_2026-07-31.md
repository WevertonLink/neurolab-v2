# NeuroLab 1.5 — Qualidade, clareza e manutenção

Data: 31 de julho de 2026

## Objetivo

Melhorar o que já existe antes de aumentar o número de funcionalidades. A intervenção concentrou-se em coerência didática, precisão científica, experiência mobile, acessibilidade, privacidade e capacidade de manutenção.

## Metáforas

- `IMAGINE_DATA_V2` agora contém 16 módulos, incluindo Plasticidade.
- A antiga torre de controle de Atenção foi substituída pela bancada com espaço limitado.
- As metáforas de Recompensa, Decisão, Emoção, Sistema Autônomo, Neuroanatomia, Sensorial, Motor, Desenvolvimento, Linguagem e Métodos receberam correções de núcleo, mapeamento, contrafactuais ou fechamento.
- `tools/verifica-metaforas.js` reprova qualquer erro ou aviso.
- Resultado esperado: `0 erro(s), 0 aviso(s)`.

## Revisão científica

- Consolidação deixou de ser descrita como transporte literal de uma memória do hipocampo para o córtex.
- Atenção e controle deixaram de ser apresentados como uma bateria única que esvazia no pré-frontal.
- Broca e Wernicke passaram a ser apresentados como referências históricas dentro de redes distribuídas.
- A resposta ao estresse deixou de ser descrita como troca literal de comando entre córtex e amígdala.
- Foi corrigida a menção antiga ao sono como “último módulo”; ele é o módulo 08.

## Experiência e acessibilidade

- Navegação local fixa em cada módulo, sem bloqueio de progressão.
- Acesso direto a visuais, quatro aulas, metáfora, mapa, referências e avaliação.
- Alvos críticos com mínimo de 44 px.
- Aumento das menores etiquetas do mecanismo e do checkbox do modo profundo.
- Textos das aulas ligeiramente ampliados em telas estreitas.

## Arquitetura

O `index.html` foi reduzido a um casco semântico. A ordem de execução original foi preservada na extração para arquivos externos:

- `styles/base.css`
- `styles/features.css`
- `src/01-metaphors.js`
- `src/02-integrated-visuals.js`
- `src/03-context-mechanisms.js`
- `src/04-learning-model.js`
- `src/05-app.js`
- `src/06-service-worker-register.js`

Esta divisão não é a refatoração final dos dados por módulo, mas já reduz o risco de editar HTML, CSS e lógica no mesmo arquivo e prepara a próxima etapa.

## Auditoria adicional

`tools/audit-content.js` verifica sem navegador:

- arquivos obrigatórios;
- identidade pública;
- ordem dos CSS e scripts;
- navegação local;
- regras de acessibilidade;
- 16 metáforas estruturadas;
- retorno de formulações científicas antigas;
- política de privacidade;
- precache dos novos arquivos.

O comando `npm test` agora executa as duas auditorias antes do Playwright.

## Próxima refatoração recomendada

Separar o grande `src/05-app.js` por domínio, começando por dados dos módulos, estado persistente, quizzes e renderização. Essa mudança deve ser feita em pequenos commits acompanhados pela suíte Playwright, porque reorganizar todas as estruturas de uma vez teria risco desnecessário.
