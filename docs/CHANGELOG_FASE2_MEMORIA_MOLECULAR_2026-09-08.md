# NeuroLab Fase 2 — o nível Avançado começa · Memória Molecular — 2026-09-08

Versão `v1-41-1`. O primeiro módulo de um **segundo curso**: a Fase 2 (nível
Avançado), que desbloqueia ao concluir a Fase 1 e desce ao nível molecular sem
abandonar a rampa didática do NeuroLab.

## Por que

Estudando o próprio app, o Weverton notou que o motor de engajamento é a
**progressão visível** ("no módulo 16 eu sabia que faltavam o 17 e o 18 para
100%") — e que a neurociência está longe de "resumida" no teto atual, que nomeia
os personagens e para numa frase por mecanismo. A profundidade não podia virar
uma camada opcional escondida (perderia o engajamento): virou uma **nova fase de
módulos para conquistar**, com o mesmo laço "X/N → 100%".

## O andaime da Fase 2

- Nova trilha `trilha:'avancado'` com `trilhaAvancado()`; `trilhaPrincipal()`
  passa a excluir `'avancado'` além de `'extras'` — o avançado **não entra** na
  barra-troféu nem no divisor de progresso, então quem fechou os 18 continua em
  100%.
- Gate `faseUmCompleta()` = todos os quizzes da Fase 1 feitos. Enquanto falso, a
  seção "Fase 2 · Avançado" aparece como **cartão-teaser bloqueado** (mostra o
  horizonte); quando verdadeiro, abre com progresso próprio (X/N avançados).
- `card-avancado` / `card-locked` em `styles/base.css`; a revisão de Localização
  usa o enunciado de **processo** ("onde X entra") também no avançado, como nos
  extras (o diagrama é molecular, não uma região do cérebro).

## O módulo `memoria-mol` (AVANÇADO A1)

Cinco aulas, do Ca²⁺ ao gene, cada uma abrindo por uma metáfora (a **fábrica que
reescreve a si mesma**):

- **A0 · O detector de coincidência** — NMDA como porta lógica E, bloqueio de
  Mg²⁺ dependente de voltagem, Ca²⁺ como sinal, a regra de Hebb virada íon.
- **A1 · A CaMKII: o interruptor que se segura** — autofosforilação (Thr286),
  inserção de AMPA, sinapses silenciosas, a base da LTP.
- **A2 · O relógio de Hebb (STDP)** — a ordem decide; a dose de cálcio escolhe
  LTP (CaMKII) ou LTD (calcineurina/PP1); metaplasticidade (BCM).
- **A3 · Do sináptico ao núcleo** — E-LTP × L-LTP, ERK/importinas, CREB/CBP, IEGs
  (Arc, c-fos), Kandel/*Aplysia* e o freio CREB-2 por trás do espaçamento.
- **A4 · Tag e captura** — marcação e captura (Frey & Morris), associatividade
  molecular, epigenética, o engrama.

Todos os 13 satélites do padrão da casa (MINI_QUIZZES nas 4 dimensões, DEEP,
PREDICT, CHAIN, BRIDGE, REFERENCES, ANATOMY com SVG de processo, IMAGINE_DATA_V2,
INTEGRATED_VISUALS + 2 SVGs, CONTEXT_ANATOMY/REQUIRED/TOPIC_TERMS), mais 2
cartões em CONCEPTS, 1 contrafactual e 1 caso integrado no Modo Domínio, e termos
novos de glossário (STDP, tag sináptico, metaplasticidade, calcineurina,
autofosforilação). **O motor foi reusado sem uma linha nova** — SRS, Domínio,
Terminologia e mapa são dirigidos pelo schema de `MODULES`.

## Portões tier-aware (recalculados, não quebrados)

- `cobertura-modulos.js`: cobre os **23 módulos**.
- `audit-content.js`: **23** contrafactuais / **13** casos do Modo Domínio; a
  regex da visão integrada passou a casar chave com hífen (`'memoria-mol'` é o
  primeiro id hifenizado).
- `test-srs.js`: **439 caixas** e **239 âncoras** (memoria-mol soma 20 caixas —
  5 aulas × 4 dimensões — e 10 âncoras: 3+3+2+1+1).
- `tests/neurolab.spec.js`: pinos do Modo Domínio (total 36, counterModules 23).
- `sw.js`: precache dos 2 SVGs novos + VERSION.

## Verificação

- 5 portões locais verdes; suíte Playwright verde no CI (run #135).
- Sonda read-only: gate de desbloqueio (bloqueado → aberto ao fechar a Fase 1),
  4 dimensões medidas nas 5 aulas, e o módulo entrando em SRS/Domínio/Terminologia
  sem código de motor novo.
- Revisão científica do Weverton **antes** do deploy ("conferir antes de cada
  deploy") — aprovada.

## O que vem depois

A Fase 2 é, na prática, um segundo curso, feito **incremental**. Próximo
candidato natural: **O Neurônio Biofísico** (Nernst/GHK, força motriz, Cl⁻/GABA
imaturo, Hodgkin-Huxley). A arquitetura já suporta N módulos avançados.
