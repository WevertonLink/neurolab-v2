# Validação da entrega — NeuroLab 1.5

Data: 31 de julho de 2026

## Verificações concluídas

- `npm run check:metaforas`: **aprovado** — 16 metáforas, 0 erros e 0 avisos.
- `npm run check:content`: **aprovado**.
- Sintaxe de todos os arquivos em `src/`, `tools/`, `tests/`, `sw.js` e `playwright.config.js`: **aprovada** com `node --check`.
- 32 referências às imagens integradas: **todas presentes**.
- 46 arquivos explícitos do precache, além da raiz `./`: **todos presentes**.
- `manifest.webmanifest` e `android/twa-manifest.json`: **JSON válido e nomes consistentes**.
- Referências externas de CSS e JavaScript do `index.html`: **todas presentes**.

## Suíte Playwright

A suíte foi atualizada com um teste da navegação local dos módulos. Nesta sessão de edição, a instalação Node do Playwright não pôde ser concluída porque o registro interno de pacotes retornou 404, e o Chromium do ambiente bloqueou navegações por política administrativa. Isso é uma limitação do ambiente de edição, não um resultado de falha da aplicação.

A execução completa continua configurada em `.github/workflows/neurolab-audit.yml` e deve ocorrer automaticamente após o envio ao GitHub. No Termux, as auditorias Node funcionam, mas o Playwright/Chromium não oferece suporte nativo ao Android.

## Critério de aprovação no GitHub

A entrega deve ser considerada integralmente validada quando o workflow **NeuroLab automated audit** concluir em verde, incluindo os testes de renderização, funcionamento offline, progresso, backup, acessibilidade e os 16 módulos.
