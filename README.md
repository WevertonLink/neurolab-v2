# NeuroLab V2 — Fase 5

Esta fase audita e amplia a integração **termo → mecanismo**.

## Principais mudanças

- mecanismo contextual por tópico, não apenas por módulo;
- 57 termos essenciais adicionados ao glossário e tornados clicáveis;
- 356 relações essenciais auditadas e explicitamente classificadas;
- 78/78 componentes anatômicos preservados;
- relações classificadas como direta, distribuída, contexto, processo paralelo ou contraste;
- salto do modal para a cadeia causal do tópico com destaque das etapas;
- correspondência exata para evitar associações por substring;
- teste editorial por `CONTEXT_REQUIRED`.

## Teste rápido

1. Abra o Módulo 02 e o tópico sobre Hebb.
2. Toque em **potenciação de longo prazo** ou **NMDA**.
3. Expanda “Ver onde entra no mecanismo”.
4. Use “Ir ao tópico e destacar esta sequência”.
5. No Módulo 14, toque em **epilepsia**: o app deve informar que a cadeia visível representa o ramo vascular do AVC, sem encaixar epilepsia falsamente nela.

Consulte `docs/CONTEXT_AUDIT.md` para o relatório completo.
