# NeuroLab 1.6 — Modo Domínio

Data: 4 de agosto de 2026

## Objetivo

Evitar que 100% de cobertura seja confundido com o fim do aprendizado. O Modo Domínio transforma o curso concluído em um sistema contínuo de recuperação, diagnóstico, dedução e integração.

## Entrada progressiva

- abaixo de 70%: o painel aparece como prévia e pode ser explorado sem bloqueios;
- entre 70% e 99%: o modo usa os dados acumulados enquanto o percurso continua;
- em 100%: a linguagem muda de “curso em andamento” para “próxima fase”, sem esconder os módulos originais.

## Métricas honestas

O painel separa:

- **Cobertura:** aulas percorridas e avaliações de módulo realizadas, sem exigir nota perfeita;
- **Retenção:** resultados existentes de revisões espaçadas;
- **Explicação:** evidências da dimensão causal;
- **Aplicação:** evidências de questões aplicadas e casos;
- **Integração:** desempenho e autoavaliação em casos que cruzam módulos.

Se ainda não há dados suficientes, o valor exibido é “—”. A ausência de evidência não é convertida em zero nem em uma porcentagem arbitrária.

## Revisões e conceitos frágeis

O modo reutiliza a fila Leitner já existente e apresenta:

- revisões vencidas e motivo do reaparecimento;
- dimensão mais frágil de cada tópico;
- erros de mini quiz;
- domínio atual;
- atraso no cronograma.

O diagnóstico ignora conteúdo nunca tocado, evitando classificar novidade como fraqueza.

## Casos integrados

Foram incluídos 8 casos:

1. decisão após uma noite ruim;
2. maratona de estudo com pouca retenção;
3. hábito acionado por deixa após redução da recompensa;
4. compreensão e fala preservadas com dificuldade de repetição;
5. alteração farmacológica do portão motor;
6. perda sensorial após evento vascular focal;
7. recompensa social e decisão durante o desenvolvimento;
8. conhecimento que não aparece sob estresse de apresentação.

Cada caso possui uma cadeia causal principal, distratores que representam simplificações comuns e autoavaliação posterior.

## Desafios contrafactuais

Há um desafio por módulo. O aluno modifica uma peça do mecanismo e precisa deduzir:

1. o que permanece funcionando;
2. qual etapa rompe primeiro;
3. qual consequência emerge depois.

As respostas alimentam a dimensão de explicação causal do tópico correspondente.

## Conexões e trilhas

A primeira versão do mapa evita uma teia puramente decorativa. Cada relação contém um verbo explícito, como “atualiza”, “prioriza”, “favorece” ou “investiga”.

As quatro trilhas reorganizam módulos existentes:

- celular e molecular;
- redes e cognição;
- cérebro e comportamento;
- ciência e clínica.

## Persistência e compatibilidade

- versão do estado elevada para 4;
- backups anteriores migram sem perda;
- resultados de casos e contrafactuais ficam no mesmo armazenamento local;
- novo CSS e novo script entram no precache offline;
- o curso normal, quizzes, XP, revisões e navegação permanecem disponíveis.

## Auditoria

A auditoria estática passou a exigir:

- a view do Modo Domínio;
- arquivos `styles/domain-mode.css` e `src/04b-domain-mode.js`;
- 3 folhas de estilo e 7 scripts;
- cache `neurolab-v1-6-0`;
- 48 arquivos explícitos no precache.

A suíte Playwright recebeu testes para prévia, navegação, trilhas, ativação a partir de 70% e registro de um caso integrado.
