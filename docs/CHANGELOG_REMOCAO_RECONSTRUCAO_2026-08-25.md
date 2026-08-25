# Changelog — Remoção da reconstrução causal (2026-08-25)

A reconstrução da cadeia — remontar as etapas de `CHAIN` na ordem certa, sem
alternativas — foi retirada dos dois lugares onde existia.

- **Revisão espaçada** (`src/05-app.js`): o item de *Explicação causal* volta a
  ser cobrado por **múltipla escolha** (mini-questões causais + contrafactual +
  questão de módulo com `l`). A dimensão continua no cronograma; mudou a forma
  da prova, não o endereço.
- **Modo Domínio** (`src/04c-domain-guided.js`): o botão "Reconstruir sem
  alternativas" saiu do fim de cada caso e contrafactual. A atividade termina na
  resposta e no diagnóstico das quatro alternativas.

## O que mudou por baixo

- `measurableDimensions` (`src/04-learning-model.js`) não usa mais a cadeia como
  fonte de causalidade. Isso devolve a cobertura de *Explicação causal* ao que o
  mini-quiz, o contrafactual e o quiz de módulo já mediam: um único tópico
  (`sensorial-2`) deixa de ter caixa de causalidade, e o total de caixas do
  cronograma cai de 345 para **344**.
- As fontes de evidência `reconstruction` (.48) e `domain-reconstruction` (.40)
  saíram de `evidenceWeight` — nenhuma atividade as produz mais.
- Removidos os núcleos compartilhados `chainShuffle` / `chainIsCorrect`, toda a
  máquina de reconstrução do Modo Domínio (`domainStartReconstruction` e
  companhia) e o CSS órfão (`.dm-reconstruct*`, `.dm-chain-pool`,
  `.dm-selected-chain`, `.dm-undo`, `.dm-reveal-link`).

## O que ficou de propósito

- Os dados `CHAIN` (a "cadeia + e se" na tela do módulo) e os dados `chain` do
  banco do Modo Domínio (exibidos no diagnóstico e validados por
  `audit-content.js`) continuam intactos.
- A auto-avaliação de clareza do Domínio ("Sem olhar, você conseguiria
  reconstruir a cadeia?"), que alimenta a métrica Integração, permanece.
- Estado antigo com campos de reconstrução (`reconBest`, `reconRevealed`,
  `lastReconResult`, …) é simplesmente ignorado — sem migração.

## Portões

`node tools/test-srs.js` fica em 119 verificações (saíram os blocos da
reconstrução; o bloco de `CHAIN` mantém a validação estrutural que protege a
"cadeia + e se"). Os cinco portões locais seguem verdes. `VERSION` do `sw.js`
foi para `neurolab-v1-18-0`.
