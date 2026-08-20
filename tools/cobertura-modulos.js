#!/usr/bin/env node
/* Cobertura por módulo: acha TODA estrutura indexada por id de módulo e mede
   quem tem e quem não tem.

   Existe porque eu descobri as camadas uma a uma, errando o custo quatro vezes
   seguidas — quatro, sete, dez, onze — e cada número saiu de uma medição
   honesta que parou onde o portão seguinte parava de reclamar. O Weverton
   achou a décima segunda (o "Aprofundar") só usando o app.

   A regra que este script torna verificável: se uma estrutura cobre TODOS os
   módulos antigos, ela é padrão da casa, e um módulo novo sem ela está
   incompleto — mesmo que nenhum portão reclame. */
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

const ids = J('MODULES.map(m=>m.id)');

/* candidatos: todo identificador MAIÚSCULO que é declarado como objeto ou
   recebe atribuição por id. Vem do fonte porque `const` de topo não aparece
   no escopo do vm. */
const fontes = ['01-metaphors.js', '02-integrated-visuals.js', '03-context-mechanisms.js',
  '04-learning-model.js', '04b-domain-mode.js', '04c-domain-guided.js', '05-app.js']
  .map((f) => path.join(ROOT, 'src', f))
  .filter((p) => fs.existsSync(p))
  .map((p) => fs.readFileSync(p, 'utf8')).join('\n');

const candidatos = new Set();
for (const m of fontes.matchAll(/\b(?:const|let|var)\s+([A-Z][A-Z0-9_]{2,})\s*=\s*\{/g)) candidatos.add(m[1]);
for (const m of fontes.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\[\s*['"][a-z-]+['"]\s*\]\s*=/g)) candidatos.add(m[1]);

/* Estruturas que são mesmo opcionais, com o motivo. Porcentagem não serve de
   critério: CONTEXT_TERMS está em 83% e ainda assim é opcional, porque já
   faltava num módulo ANTIGO — ou seja, nunca foi padrão da casa.

   Ao declarar algo opcional aqui, escreva por quê. Se o motivo não couber numa
   linha, provavelmente não é opcional. */
const OPCIONAIS = {
  CONTEXT_TERMS: 'mapa auxiliar de termo para etapa da visão geral; já faltava em neuroanatomia antes dos módulos novos, então nunca foi padrão'
};

const linhas = [];
for (const nome of [...candidatos].sort()) {
  let chaves;
  try { chaves = J(`typeof ${nome} !== 'undefined' && ${nome} && typeof ${nome} === 'object' && !Array.isArray(${nome}) ? Object.keys(${nome}) : null`); }
  catch (e) { continue; }
  if (!chaves) continue;
  const tem = ids.filter((id) => chaves.includes(id));
  /* só interessa quem é indexado por módulo: pelo menos metade dos ids presentes */
  if (tem.length < ids.length / 2) continue;
  const falta = ids.filter((id) => !chaves.includes(id));
  linhas.push({ nome, n: tem.length, falta });
}

const total = ids.length;
const completos = linhas.filter((l) => !l.falta.length);
const furados = linhas.filter((l) => l.falta.length);

console.log(`Cobertura por módulo — ${total} módulos, ${linhas.length} estruturas indexadas por id\n`);
completos.forEach((l) => console.log(`  ok    ${l.nome.padEnd(22)} ${l.n}/${total}`));
if (furados.length) {
  console.log('');
  furados.forEach((l) => console.log(`  FURO  ${l.nome.padEnd(22)} ${l.n}/${total}  falta: ${l.falta.join(', ')}`));
}

/* O critério: uma estrutura que cobre todos os módulos MENOS os novos é padrão
   da casa que o módulo novo não cumpriu. Uma que já faltava em módulos antigos
   é opcional, e não acusa. */
/* LINKS é o tecido conectivo: um conceito, e cada aula onde ele reaparece
   fazendo outra coisa. Ele é indexado por CONCEITO, não por módulo, então a
   varredura acima não o enxerga — foi assim que os módulos novos ficaram em
   zero aparições sem nenhum portão notar.

   Não vira reprovação: cinco módulos antigos também estão em zero, e é
   legítimo, porque nem todo módulo hospeda um conceito que atravessa. Mas
   aparece no relatório, para a decisão ser tomada e não esquecida. */
try {
  const L = J("typeof LINKS !== 'undefined' ? LINKS : {}");
  const conta = {};
  ids.forEach((id) => { conta[id] = []; });
  Object.keys(L).forEach((k) => (L[k].onde || []).forEach((o) => {
    if (conta[o.m] && !conta[o.m].includes(k)) conta[o.m].push(k);
  }));
  const semLink = ids.filter((id) => !conta[id].length);
  console.log(`\nConceitos que atravessam (LINKS): ${Object.keys(L).length} conceitos`);
  if (semLink.length) console.log(`  sem nenhuma ligação: ${semLink.join(', ')}`);
  else console.log('  todos os módulos hospedam ao menos um conceito');
} catch (e) { /* LINKS pode não existir numa versão futura */ }

const NOVOS = process.argv.slice(2);
if (!NOVOS.length) {
  /* Sem argumento, o critério é o mesmo sem precisar saber quais são os novos:
     uma estrutura presente em quase todos e ausente em poucos é padrão da casa
     que alguém não cumpriu. O corte é 80% — abaixo disso ela é opcional de
     verdade, como CONTEXT_TERMS, que já faltava num módulo antigo. */
  const quaseCompletas = furados.filter((l) => !OPCIONAIS[l.nome]);
  if (!quaseCompletas.length) {
    console.log('\nCobertura: ok — toda estrutura obrigatória cobre os ' + total + ' módulos.');
    Object.keys(OPCIONAIS).forEach((k) => console.log(`  (opcional: ${k} — ${OPCIONAIS[k]})`));
    process.exit(0);
  }
  console.log('\nFURO em estrutura que não está declarada como opcional:\n');
  quaseCompletas.forEach((l) => console.log(`  · ${l.nome} — falta em ${l.falta.join(', ')}`));
  console.log('\nOu o módulo está incompleto, ou a estrutura é opcional — e aí ela');
  console.log('precisa entrar em OPCIONAIS, com o motivo escrito.');
  process.exit(1);
}
const devidos = furados.filter((l) => l.falta.length && l.falta.every((id) => NOVOS.includes(id)));
console.log('');
if (!devidos.length) {
  console.log(`Nada devido: ${NOVOS.join(', ')} têm tudo que os módulos antigos têm.`);
  process.exit(0);
}
console.log(`DEVIDO em ${NOVOS.join(', ')} — estrutura que todos os antigos têm e estes não:\n`);
devidos.forEach((l) => console.log(`  · ${l.nome}  (falta em ${l.falta.join(', ')})`));
process.exit(1);
