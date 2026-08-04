# NeuroLab 1.7.0 — auditoria adversarial do Modo Domínio

## Por que esta versão existe

A primeira versão do Modo Domínio possuía uma arquitetura forte, mas parte do banco avaliava eliminação verbal: a alternativa correta era cuidadosa, enquanto algumas incorretas eram absolutas, caricaturais ou cientificamente absurdas. Isso permitia acertar sem reconstruir o mecanismo.

A versão 1.7 trata cada alternativa como um **modelo explicativo concorrente**.

## Banco reescrito

Foram revisadas as 24 atividades:

- 16 desafios contrafactuais — um por módulo;
- 8 casos integrados — cada um exigindo pelo menos três módulos.

Cada atividade agora possui:

1. quatro modelos plausíveis;
2. uma cadeia causal de quatro ou cinco elos;
3. uma explicação geral do mecanismo;
4. um diagnóstico específico para cada alternativa;
5. posição correta balanceada entre A, B, C e D.

## Padrão editorial

Os distratores representam erros reais de compreensão, como:

- transformar uma condição necessária em causa suficiente;
- preservar as estruturas corretas, mas inverter a ordem causal;
- reduzir um fenômeno distribuído a uma única área ou molécula;
- confundir armazenamento com recuperação ou desempenho;
- confundir medida direta com inferência do método;
- tratar compensação possível como preservação completa.

Uma pessoa sem conhecimento do conteúdo não deve conseguir eliminar alternativas apenas pelo tom.

## Feedback diagnóstico

Depois da resposta, o NeuroLab mostra:

- por que a alternativa escolhida fecha ou quebra;
- a cadeia causal de referência;
- um painel opcional para comparar os quatro modelos;
- reconstrução da cadeia sem alternativas;
- registro separado de reconhecimento e reconstrução.

## Auditoria automática

`npm run check:content` agora reprova o banco quando:

- uma atividade não possui quatro alternativas e quatro diagnósticos;
- a posição correta deixa de estar distribuída em 6/6/6/6;
- alternativas têm diferenças de tamanho que entregam a resposta;
- uma explicação ou diagnóstico fica curto demais;
- reaparecem distratores caricaturais conhecidos;
- um caso não integra pelo menos três módulos;
- os contrafactuais deixam de cobrir os 16 módulos.
