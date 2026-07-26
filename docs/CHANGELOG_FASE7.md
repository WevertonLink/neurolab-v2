# NeuroLab V2 · Fase 7

## Visão integrada de alta fidelidade

A Fase 7 inaugura uma terceira camada visual nos módulos: **Anatomia → Mecanismo → Visão integrada**.

### Módulo 01

- nova aba **Visão integrada**;
- infográfico vertical otimizado para celular, mostrando dois neurônios, axônio mielinizado, nódulos de Ranvier, terminal, fenda sináptica e receptores;
- leitura em três camadas: condução no axônio, conversão elétrica-química no terminal e comunicação com o neurônio seguinte;
- miniatura WebP leve e versão ampliada de alta resolução;
- visualizador de zoom atualizado para aceitar imagens raster além dos SVGs;
- descrição alternativa longa para leitores de tela;
- distinção explícita entre nódulo de Ranvier e fenda sináptica;
- assets adicionados ao cache offline do PWA.

### Arquitetura

A implementação é orientada por dados em `INTEGRATED_VISUALS`, permitindo adicionar novas imagens aos demais módulos sem duplicar lógica ou alterar a navegação principal.
