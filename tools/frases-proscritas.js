#!/usr/bin/env node
/* Frases proscritas: afirmações que uma revisão já derrubou e que não podem
   reaparecer em lugar nenhum do conteúdo.

   Existe porque o mesmo defeito aconteceu duas vezes seguidas, nos dois
   módulos: eu corrigia o texto das aulas e a correção parava ali. As
   mini-questões, os blurbs do diagrama, o glossário e a visão integrada
   seguiam ensinando a versão derrubada — e num caso o diagrama afirmava como
   fato exatamente a alternativa que o quiz marcava como errada.

   Revisão humana não pega isso: cada revisor lê um recorte, e ninguém tinha
   lido o glossário até este portão existir.

   Percorre o conteúdo PARSEADO, não linhas de texto, porque a distinção que
   importa é entre AFIRMAR e NEGAR: a mesma frase é defeito num blurb e é
   correta como alternativa errada de um quiz. Por isso só entram aqui os
   lugares onde algo é afirmado — a opção certa, nunca os distratores.

   Ao derrubar uma afirmação numa revisão, acrescente-a a PROSCRITAS. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'tools/test-srs.js'), 'utf8');
const preludio = src.slice(0, src.indexOf('const ev = (code)=>')).replace(/^#![^\n]*\n/, '')
  + 'const ev = (code)=>vm.runInContext(code, ctx);\n';
const mod = { exports: {} };
const ev = new Function('require', 'module', '__dirname', preludio + '\nmodule.exports = ev;')
  (require, mod, path.join(ROOT, 'tools')) || mod.exports;
const J = (code) => JSON.parse(ev(`JSON.stringify(${code})`));

const PROSCRITAS = [
  { re: /frequência é o inverso|inverso do tempo de decaimento|ritmo é o inverso/i,
    porque: 'o período ESCALA com τ (uns 2,5 a 5×), não é 1/τ — erro de fator ~4' },
  { re: /fixa a frequência|fixam a frequência/i,
    porque: 'a cinética do GABA-A põe NA FAIXA; o nível de excitação escolhe onde dentro dela' },
  { re: /perto de 40 ?Hz|em torno de 40 ?Hz|gira.{0,12}40 ?Hz/i,
    porque: 'gama é 30-90 Hz, e a frequência sobe com o contraste (Ray & Maunsell 2010)' },
  { re: /sempre as mesmas/i,
    porque: 'são dois gamas, em fases diferentes — e qual fase diz de onde veio a entrada' },
  { re: /acionar as piramidais, não|acionar as principais, não/i,
    porque: 'Sohal 2009: drive NÃO RÍTMICO das principais gera gama emergente' },
  { re: /o que já era antigo continua lá|conservou intacto tudo|manteve intacto tudo/i,
    porque: 'H.M. tinha amnésia retrógrada graduada — é a alternativa ERRADA do próprio quiz' },
  { re: /estriado e (o )?cerebelo (gravam|aprendem)[^.]{0,30}repetição/i,
    porque: 'Gabrieli 1997: mirror tracing INTACTO em Huntington. O cerebelo aprende por ERRO' },
  { re: /a melhor técnica de estudo que existe/i,
    porque: 'Dunlosky 2013 põe recuperação e prática distribuída lado a lado em alta utilidade' },
  { re: /\beu (quase |já |ainda )?(deixei|tinha|escrevi|errei)\b/i,
    porque: 'voz autoral vazando para o texto do aluno — isto é conversa com o revisor' }
];

/* Reúne todo trecho em que o conteúdo AFIRMA alguma coisa. Distratores ficam
   de fora de propósito: neles a frase derrubada é a resposta errada, e estar
   ali é o certo. */
const afirmacoes = [];
const juntar = (onde, texto) => {
  if (typeof texto === 'string' && texto.trim()) afirmacoes.push({ onde, texto });
};

const MODULES = J('MODULES');
MODULES.forEach((m) => {
  juntar(`${m.id}/intro`, m.intro);
  juntar(`${m.id}/tag`, m.tag);
  m.lessons.forEach((l, i) => { juntar(`${m.id}/aula ${i}/título`, l.t); juntar(`${m.id}/aula ${i}/prosa`, l.b); });
  (m.quiz || []).forEach((q, i) => {
    juntar(`${m.id}/questão ${i}/certa`, q.o[q.c]);
    juntar(`${m.id}/questão ${i}/se acertar`, q.er);
    juntar(`${m.id}/questão ${i}/se errar`, q.ew);
  });
});

const bloco = (nome) => J(`typeof ${nome} !== 'undefined' ? ${nome} : {}`);
const MINI = bloco('MINI_QUIZZES');
Object.keys(MINI).forEach((id) => (MINI[id] || []).forEach((aula, li) =>
  (aula || []).forEach((q, k) => {
    juntar(`${id}/aula ${li}/mini ${k}/certa`, q.o[q.c]);
    juntar(`${id}/aula ${li}/mini ${k}/se acertar`, q.er);
    juntar(`${id}/aula ${li}/mini ${k}/se errar`, q.ew);
  })));

const PRED = bloco('PREDICT');
Object.keys(PRED).forEach((id) => (PRED[id] || []).forEach((p, i) => {
  juntar(`${id}/previsão ${i}/certa`, p.o[p.c]);
  juntar(`${id}/previsão ${i}/depois`, p.after);
}));

const CH = bloco('CHAIN');
Object.keys(CH).forEach((id) => (CH[id] || []).forEach((c, i) => {
  (c.s || []).forEach((passo, k) => juntar(`${id}/cadeia ${i}/passo ${k}`, passo));
  juntar(`${id}/cadeia ${i}/nota`, c.hn);
  juntar(`${id}/cadeia ${i}/contrafactual`, c.wa);
}));

const BR = bloco('BRIDGE');
Object.keys(BR).forEach((id) => (BR[id] || []).forEach((t, i) => juntar(`${id}/ponte ${i}`, t)));

const AN = bloco('ANATOMY');
Object.keys(AN).forEach((id) => {
  juntar(`${id}/diagrama/legenda`, (AN[id] || {}).caption);
  ((AN[id] || {}).parts || []).forEach((p) => juntar(`${id}/diagrama/${p.id}`, p.blurb));
});

const GL = bloco('GLOSSARY');
Object.keys(GL).forEach((k) => juntar(`glossário/${k}`, GL[k]));

const IV = bloco('INTEGRATED_VISUALS');
Object.keys(IV).forEach((id) => {
  ['lead', 'alt', 'caption', 'clarify'].forEach((c) => juntar(`${id}/integrada/${c}`, (IV[id] || {})[c]));
  ((IV[id] || {}).layers || []).forEach(([t, d], i) => juntar(`${id}/integrada/camada ${i}`, `${t}. ${d}`));
});

const IM = bloco('IMAGINE_DATA_V2');
Object.keys(IM).forEach((id) => {
  const d = IM[id] || {};
  juntar(`${id}/metáfora/keep`, d.keep);
  (d.scene || []).forEach((p, i) => juntar(`${id}/metáfora/cena ${i}`, p));
  (d.chain || []).forEach((p, i) => juntar(`${id}/metáfora/passo ${i}`, p));
  (d.ifs || []).forEach(([, resp], i) => juntar(`${id}/metáfora/e se ${i}`, resp));
});

/* os SVG não têm estrutura para percorrer: vão como texto mesmo */
fs.readdirSync(path.join(ROOT, 'assets/visuals'))
  .filter((f) => f.endsWith('.svg'))
  .forEach((f) => juntar(`assets/visuals/${f}`, fs.readFileSync(path.join(ROOT, 'assets/visuals', f), 'utf8')));

/* A mesma frase pode aparecer sendo NEGADA, e aí ela é justamente o conserto:
   o "desfaz confusão" da visão integrada existe para dizer que a frequência
   NÃO é o inverso do decaimento. Uma negação nas ~40 letras anteriores salva a
   ocorrência — janela curta de propósito, para não engolir defeito de verdade
   que apareça num parágrafo onde a palavra "não" está longe. */
const NEGADA = /\b(n[ãa]o|nunca|deixa de|em vez de|ao contr[áa]rio de|longe de)\b/i;

let achados = 0;
for (const { onde, texto } of afirmacoes) {
  for (const regra of PROSCRITAS) {
    const m = texto.match(regra.re);
    if (!m) continue;
    const antes = texto.slice(Math.max(0, m.index - 40), m.index);
    if (NEGADA.test(antes)) continue;
    achados += 1;
    console.error(`${onde}\n    "${m[0]}"\n    → ${regra.porque}`);
  }
}

if (achados) {
  console.error(`\nFrases proscritas: ${achados} ocorrência(s) em ${afirmacoes.length} trechos afirmativos.`);
  console.error('Uma afirmação derrubada por revisão não pode voltar por outra porta.');
  process.exit(1);
}
console.log('Frases proscritas: ok');
console.log(`  ${PROSCRITAS.length} afirmações derrubadas, conferidas em ${afirmacoes.length} trechos afirmativos`);
