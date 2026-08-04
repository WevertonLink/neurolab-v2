# NeuroLab — Estudo Interativo de Neurociência

Aplicação educacional móvel com 16 módulos, anatomia interativa, mecanismos causais, glossário contextual, metáforas didáticas, revisão e quizzes.

## Versão 1.5 — qualidade, clareza e manutenção

Esta versão preserva a experiência existente e melhora a base do projeto:

- CSS e JavaScript foram retirados do `index.html` e organizados em `styles/` e `src/`;
- os 16 módulos continuam carregados em scripts clássicos, na mesma ordem, sem framework e sem dependências em tempo de execução;
- as 16 metáforas agora têm representação estruturada e a auditoria reprova erros **e avisos**;
- a metáfora de Atenção foi refeita com uma restrição concreta de capacidade;
- textos sobre atenção, consolidação da memória e linguagem foram qualificados para evitar modelos excessivamente localizacionistas;
- cada módulo recebeu uma barra de navegação local livre entre visuais, aulas, metáfora, mapa, fontes e teste;
- fontes pequenas e alvos de toque críticos foram ampliados;
- a política de privacidade passou a descrever corretamente as atualizações de arquivos na própria origem;
- o service worker armazena o novo conjunto de CSS e scripts para uso offline.

Detalhes: `docs/CHANGELOG_QUALIDADE_2026-07-31.md`.

## Estrutura principal

```text
index.html                 casco semântico da aplicação
styles/base.css            identidade visual e componentes-base
styles/features.css        recursos avançados e acessibilidade
src/01-metaphors.js        metáforas e renderização “Imagine assim”
src/02-integrated-visuals.js
src/03-context-mechanisms.js
src/04-learning-model.js
src/05-app.js              dados dos módulos e aplicação principal
src/06-service-worker-register.js
sw.js                      cache offline
```

## Executar as verificações

```bash
npm ci
npm run check:metaforas
npm run check:content
npx playwright install chromium
npm test
```

No Android/Termux, o Playwright não oferece suporte nativo ao Chromium. As duas auditorias em Node funcionam no Termux; a suíte Playwright deve rodar no GitHub Actions ou em um computador compatível.
