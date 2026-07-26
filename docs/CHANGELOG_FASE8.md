# NeuroLab V2 · Fase 8

## Visão integrada como controle de abrir e fechar

A opção **Visão integrada** do Módulo 01 agora possui comportamento reversível no mesmo botão.

- primeiro toque: abre a ilustração integrada;
- enquanto aberta, o controle passa a exibir **Fechar visão integrada**;
- segundo toque: fecha a ilustração e retorna automaticamente à Anatomia;
- `aria-expanded`, `aria-selected` e o rótulo acessível acompanham o estado real;
- a ampliação por zoom da própria imagem continua disponível;
- módulos sem visão integrada continuam ocultando a opção.

A mudança evita deixar a imagem permanentemente selecionada e torna o comportamento explícito no celular.
