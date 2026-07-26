# Validação da Fase 9

## Verificações executadas

- Sintaxe de todos os blocos JavaScript incorporados ao `index.html`.
- Sintaxe de `sw.js` e `tests/neurolab.spec.js`.
- Correspondência entre os 32 caminhos declarados e os 32 arquivos WebP existentes.
- Dimensões: miniaturas em 560 × 995 e imagens ampliadas em 941 × 1672.
- Precache dos 32 assets no service worker.
- Automação em Chromium para os 16 módulos:
  - botão Visão integrada visível;
  - painel inicialmente fechado;
  - abertura pelo botão;
  - carregamento real da miniatura;
  - texto alternativo presente;
  - fechamento pelo mesmo botão;
  - ausência de overflow horizontal.
- Amostragem responsiva nos viewports 360 × 800, 390 × 844, 412 × 915 e 430 × 932.
- Abertura e fechamento do zoom com a imagem ampliada do Módulo 16.

## Limitação do ambiente

O `npm ci` não pôde ser concluído neste ambiente. Por isso, a suíte Node do repositório não foi executada integralmente. A validação de interface foi realizada diretamente em Chromium por automação Playwright, com os assets incorporados localmente para evitar dependência de rede.
