# NeuroLab V2 — Fase 9

Aplicação educacional móvel de neurociência com 16 módulos, anatomia interativa, mecanismos causais, glossário contextual, metáforas didáticas e quizzes.

## Novidade da Fase 9

A **Visão integrada** agora está disponível nos **16 módulos**. Cada módulo recebeu um infográfico vertical próprio, uma miniatura otimizada, ampliação em tela cheia, explicações complementares em HTML e uma distinção conceitual específica.

O mesmo botão abre e fecha a visão, preservando a navegação livre entre Anatomia, Mecanismo e Visão integrada. Todos os 32 assets WebP — miniatura e versão ampliada de cada módulo — entram no cache offline do PWA.

## Fases anteriores preservadas

- mecanismo contextual por tópico e por módulo;
- glossário clicável e relações termo → mecanismo;
- 78 componentes anatômicos interativos;
- mini quizzes por tópico e avaliação integrada;
- metáforas didáticas e modo profundo;
- auditoria Playwright para múltiplos tamanhos de tela em retrato.

## Executar a auditoria

```bash
npm ci
npx playwright install chromium
npm test
```

Consulte:

- `docs/CHANGELOG_FASE8.md` — abertura e fechamento pelo mesmo controle;
- `docs/CHANGELOG_FASE7.md` — integração visual detalhada;
- `docs/CONTEXT_AUDIT.md` — auditoria termo → mecanismo;
- `docs/context-coverage.csv` — cobertura contextual.
