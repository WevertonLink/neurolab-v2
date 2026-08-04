# NeuroLab — Estudo Interativo de Neurociência

Aplicação educacional móvel com 16 módulos, anatomia interativa, mecanismos causais, glossário contextual, metáforas didáticas, revisão e quizzes.

## Versão 1.7 — banco adversarial do Modo Domínio

O Modo Domínio agora cobra distinção entre **modelos causais próximos**, em vez de colocar uma resposta científica ao lado de alternativas caricaturais.

- os 16 contrafactuais e 8 casos integrados foram reescritos;
- cada atividade possui 4 alternativas de tamanho semelhante e plausibilidade real;
- as posições corretas estão balanceadas em 6/6/6/6 entre A, B, C e D;
- cada alternativa recebe um diagnóstico que explica exatamente onde a cadeia fecha ou quebra;
- o feedback permite comparar os quatro modelos depois da resposta;
- a auditoria estática reprova desequilíbrio de posição, pistas de tamanho, feedback ausente e regressões para distratores absurdos.

Detalhes: `docs/CHANGELOG_DOMINIO_1.7.0.md`.

## Versão 1.6 — Modo Domínio

A conclusão do percurso deixa de ser o fim da experiência. O novo **Modo Domínio** aparece como prévia desde o início, torna-se especialmente útil a partir de 70% e assume o papel de continuidade após 100%.

Ele reúne:

- métricas separadas de cobertura, retenção, explicação causal, aplicação e integração;
- revisões pendentes alimentadas pelo cronograma espaçado existente;
- diagnóstico transparente de conceitos frágeis;
- 8 casos integrados que atravessam vários módulos;
- 16 desafios contrafactuais, um para cada módulo;
- mapa de conexões com verbos causais explícitos;
- 4 trilhas avançadas que reorganizam o conteúdo já estudado.

Quando ainda não existe evidência suficiente, a interface mostra “—” em vez de fabricar uma porcentagem. O curso normal continua livre e acessível; o Modo Domínio não bloqueia módulos nem reinicia o progresso.

Detalhes: `docs/CHANGELOG_DOMINIO_2026-08-04.md`.

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
styles/domain-mode.css     interface do Modo Domínio
src/01-metaphors.js        metáforas e renderização “Imagine assim”
src/02-integrated-visuals.js
src/03-context-mechanisms.js
src/04-learning-model.js
src/04b-domain-mode.js     métricas, casos, desafios, conexões e trilhas
src/04c-domain-guided.js   sessão guiada, reconstrução e registros
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
