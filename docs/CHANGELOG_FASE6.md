# Changelog — Fase 6

## Interface

- `.func-track`: grid horizontal → flex column.
- `.func-step`: largura total, `min-width: 0` e menor altura mínima.
- conectores: seta horizontal `→` → seta vertical `↓`.
- removidos `overflow-x:auto`, `scroll-snap-type` e `--func-cols`.
- etapa ativa centralizada verticalmente por `scrollIntoView`.
- `scroll-margin-top` considera o cabeçalho sticky.

## Orientação

- manifesto com `portrait-primary`.
- aviso acessível em celulares usados na horizontal.

## Modal contextual

- limpeza de `#tm-mech` ao fechar;
- limpeza de `_ctxMechanism`;
- restauração do scroll do corpo e do foco.

## Testes

- overflow global é medido por `documentElement.scrollWidth`.
- descendentes de contêiner rolável não geram falso positivo.
- cobertura anatômica e textual é dividida em 16 testes menores.
- o título do modal não precisa repetir literalmente o rótulo clicado; definição e mecanismo são verificados.
- o fechamento confirma modal, zoom e body desbloqueados.
- cada viewport retrato possui teste próprio.
