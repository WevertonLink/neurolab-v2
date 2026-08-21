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
/* ---------- estruturas indexadas por CONCEITO, não por módulo ----------

   A varredura acima procura `ESTRUTURA[idDoModulo]`. Há uma segunda forma no
   app: a estrutura é indexada por CONCEITO e aponta para módulos por um campo
   interno. `LINKS` e `CONCEPTS` são assim.

   Esta é a razão pela qual eu errei o número de camadas de um módulo CINCO
   vezes seguidas — 4, 7, 10, 11, 13, e são 14. Toda vez que descobri uma
   tarde, ela era desta forma, e a ferramenta olhava só a outra. Enquanto o
   segundo formato não fosse varrido, haveria sempre uma camada invisível
   esperando para aparecer depois de eu ter declarado o número com confiança.

   Cada entrada diz onde mora a lista de módulos, para o script não precisar
   adivinhar a forma. */
const POR_CONCEITO = [
  { nome: 'LINKS',    campo: 'onde', idDe: (o) => o.m,
    oque: 'conceitos que reaparecem em módulos diferentes fazendo outra coisa' },
  { nome: 'CONCEPTS', campo: 'm',    idDe: (o) => (typeof o === 'string' ? o : o.m),
    oque: 'cartões de conceito, condição, estado, fenômeno e substância' }
];

const furosPorConceito = [];
for (const est of POR_CONCEITO) {
  let E;
  try { E = J(`typeof ${est.nome} !== 'undefined' ? ${est.nome} : null`); } catch (e) { continue; }
  if (!E) continue;
  const alcancados = new Set();
  Object.keys(E).forEach((k) => (E[k][est.campo] || []).forEach((o) => {
    const id = est.idDe(o);
    if (id) alcancados.add(id);
  }));
  const semNada = ids.filter((id) => !alcancados.has(id));
  console.log(`\n${est.nome}: ${Object.keys(E).length} entradas — ${est.oque}`);
  if (semNada.length) {
    console.log(`  módulos que nenhuma entrada alcança: ${semNada.join(', ')}`);
    furosPorConceito.push({ nome: est.nome, falta: semNada });
  } else {
    console.log('  todos os módulos são alcançados');
  }
}

const NOVOS = process.argv.slice(2);
if (!NOVOS.length) {
  /* Sem argumento, o critério é o mesmo sem precisar saber quais são os novos:
     uma estrutura presente em quase todos e ausente em poucos é padrão da casa
     que alguém não cumpriu. O corte é 80% — abaixo disso ela é opcional de
     verdade, como CONTEXT_TERMS, que já faltava num módulo antigo. */
  const quaseCompletas = furados.filter((l) => !OPCIONAIS[l.nome]);
  if (!quaseCompletas.length) {
    /* Furo por conceito NÃO reprova sozinho: cinco módulos antigos não hospedam
       nenhum LINKS, e isso é legítimo — nem todo módulo abriga um conceito que
       atravessa. Mas um módulo que nenhuma das DUAS estruturas alcança está
       isolado do resto do curso, e isso é defeito. */
    const isolados = furosPorConceito.length === POR_CONCEITO.length
      ? furosPorConceito[0].falta.filter((id) => furosPorConceito.every((f) => f.falta.includes(id)))
      : [];
    if (isolados.length) {
      console.log(`\nISOLADOS — nenhuma estrutura por conceito os alcança: ${isolados.join(', ')}`);
      console.log('Um módulo que nada referencia não se liga ao resto do curso.');
      process.exit(1);
    }
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
