#!/usr/bin/env node
/* =====================================================================
   Verificador das metáforas de "Imagine assim".

   Por que existe: o index.html tem 84 testes automatizados e as metáforas
   tinham zero. Toda afirmação sobre a qualidade delas era julgamento de
   quem as escreveu, sem nenhum crivo independente — e foi assim que
   passaram defeitos como um título dizendo "a fechadura que se acostuma"
   enquanto o corpo e o keep diziam que quem se adapta é a casa.

   O que este script NÃO faz: julgar se a metáfora é boa. Se o domínio de
   origem realmente carrega o mecanismo do módulo é questão semântica, e
   nenhuma checagem lexical alcança isso. Aqui só se verifica coerência
   interna — que é onde os erros observados aconteceram.

   ERRO  = defeito mecânico, sem ambiguidade. Reprova.
   AVISO = candidato a defeito que precisa de leitura humana.
   ===================================================================== */

const fs = require('node:fs');
const path = require('node:path');

const ARQUIVO = path.join(__dirname, '..', 'index.html');

const STOP = new Set(`a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sobre entre
ate que quem qual quais quando onde como porque pois se nao nem e ou mas tambem ja so apenas mesmo mesma
ser sao e eh foi era esta estao seu sua seus suas ele ela eles elas isso isto aquilo lhe lhes
mais menos muito muita pouco pouca todo toda todos todas cada outro outra outros outras
depois antes durante enquanto ainda entao assim ao aos à às dele dela deles delas
tem ter vai vao pode podem fica ficam faz fazem da-se pelo pela pelos pelas num numa`.split(/\s+/));

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const palavras = (s) => norm(s).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
/* Radical grosseiro, só para casar singular com plural: casa/casas,
   comporta/comportas, estacao/estacoes. A primeira versão removia "cao" como
   sufixo e transformava "estação" em "esta" e "investigação" em "investiga" —
   ou seja, inventava radicais e comparava lixo com lixo. */
const raiz = (w) => w
  .replace(/coes$/, 'cao')
  .replace(/oes$/, 'ao')
  .replace(/(a|e|o)is$/, '$1l')
  .replace(/ns$/, 'm')
  .replace(/([^aeiou])s$/, '$1')
  .replace(/([aeiou])s$/, '$1');
const raizes = (s) => new Set(palavras(s).map(raiz));

function nucleoDoTitulo(titulo) {
  const t = titulo.replace(/^(A|O|As|Os|Um|Uma)\s+/i, '').trim();
  return raiz(norm(t.split(/[\s,]+/)[0]).replace(/[^a-z0-9]/g, ''));
}

/* Sem argumento, lê o IMAGINE_DATA_V2 do index.html. Com um caminho de .json,
   verifica uma proposta antes de ela virar código — que é onde a checagem
   custa menos: reprovar no documento evita implementar e desimplementar. */
function carregarDados() {
  const alt = process.argv[2];
  if (alt) return JSON.parse(fs.readFileSync(alt, 'utf8'));
  const src = fs.readFileSync(ARQUIVO, 'utf8');
  const m = src.match(/const IMAGINE_DATA_V2 = (\{.*?\});/s);
  if (!m) throw new Error('IMAGINE_DATA_V2 não encontrado em index.html');
  return JSON.parse(m[1]);
}

function verificar(dados) {
  const achados = [];
  const add = (mod, nivel, checagem, msg) => achados.push({ mod, nivel, checagem, msg });
  const nucleos = {};

  for (const [mod, d] of Object.entries(dados)) {
    /* A restrição faz parte da cena para efeito de vocabulário: é a regra do
       sistema, e é dela que os contrafactuais têm de derivar. Registros
       antigos não têm o campo; o `|| ''` mantém os dois formatos válidos. */
    const cena = d.scene.join(' ') + ' ' + (d.restricao || '');
    const lexCena = raizes(d.scene_title + ' ' + cena);
    const lexMapa = raizes(d.mapping.map((r) => r[2]).join(' '));
    const nucleo = nucleoDoTitulo(d.scene_title);
    nucleos[mod] = nucleo;

    /* 1 · o núcleo do título tem de existir na cena e no mapping.
       Se o título nomeia uma coisa e o corpo fala de outra, a metáfora
       está apontando para dois lugares. */
    if (!lexCena.has(nucleo)) add(mod, 'ERRO', 'nucleo-na-cena', `"${nucleo}" está no título mas não aparece na cena`);

    /* 2 · o keep tem de falar a língua da cena, não resumir em termo
       técnico. É a diferença entre comprimir a metáfora e abandoná-la —
       compare o keep da plasticidade ("os carros chegam → as faixas comuns
       enchem a rua → a cancela cede") com uma lista de verbos abstratos. */
    const compart = [...raizes(d.keep)].filter((w) => lexCena.has(w));
    if (compart.length === 0) {
      add(mod, 'ERRO', 'keep-abandona-a-cena', `o keep não reutiliza nada da cena: "${d.keep}"`);
    }

    /* 3 · cada "e se" tem de ser respondido com a cena, não com uma
       explicação colada por fora. */
    d.ifs.forEach(([perg, resp], i) => {
      const c = [...raizes(resp)].filter((w) => lexCena.has(w));
      if (c.length === 0) add(mod, 'AVISO', 'if-nao-deriva', `a resposta do "e se" #${i + 1} não usa nada da cena`);
    });

    /* Duas checagens foram tentadas aqui e removidas por serem ruins:

       "cadeia-sem-contrapartida" — comparava o vocabulário da cadeia causal
       com o da metáfora para achar mecanismo sem imagem. Disparava nos 15
       módulos com 15 a 25 termos cada, porque contava verbos e substantivos
       genéricos ("alteram", "define", "sinal"). Um alarme que sempre toca
       ensina todo mundo a ignorá-lo. A pergunta que ela tentava responder —
       o domínio de origem carrega mesmo o mecanismo? — é semântica, e é
       justamente o que precisa de leitura humana.

       "limite-nega-a-cena" — partia de uma generalização errada. O limite
       DEVE nomear os elementos da cena para dizer que não são literais
       ("não há água nem barco" é a frase certa). O defeito real do sono era
       outro: o limite desfazendo uma concepção equivocada que a própria
       metáfora tinha instalado. Isso não se distingue por léxico.
       ------------------------------------------------------------------ */

    /* 4 · título que costura dois domínios com "e", ou composto hifenizado. */
    if (/\s+e\s+(?:o|a|os|as|seus?|suas?)\s+\S+/i.test(d.scene_title) || /\w-\w/.test(d.scene_title)) {
      add(mod, 'AVISO', 'titulo-costurado', `título parece juntar duas imagens: "${d.scene_title}"`);
    }
  }

  /* 5 · domínio-fonte exclusivo: uma metáfora só serve de pista de
     recuperação se não for a mesma de outro módulo. */
  const porNucleo = {};
  for (const [mod, n] of Object.entries(nucleos)) (porNucleo[n] ||= []).push(mod);
  for (const [n, mods] of Object.entries(porNucleo)) {
    if (mods.length > 1) mods.forEach((m2) => add(m2, 'ERRO', 'dominio-repetido', `domínio "${n}" também usado por: ${mods.filter((x) => x !== m2).join(', ')}`));
  }

  return achados;
}

const dados = carregarDados();
const achados = verificar(dados);
const erros = achados.filter((a) => a.nivel === 'ERRO');
const avisos = achados.filter((a) => a.nivel === 'AVISO');

console.log(`Verificando ${Object.keys(dados).length} metáforas de IMAGINE_DATA_V2`);
console.log('(plasticidade fica de fora: é HTML escrito à mão, sem campos estruturados)\n');

for (const mod of Object.keys(dados)) {
  const meus = achados.filter((a) => a.mod === mod);
  if (!meus.length) { console.log(`  ok     ${mod}`); continue; }
  const temErro = meus.some((a) => a.nivel === 'ERRO');
  console.log(`  ${temErro ? 'ERRO  ' : 'aviso '} ${mod}`);
  for (const a of meus) console.log(`         ${a.nivel === 'ERRO' ? '!' : '·'} [${a.checagem}] ${a.msg}`);
}

console.log(`\n${erros.length} erro(s), ${avisos.length} aviso(s)`);
if (erros.length) {
  console.log('\nErros reprovam: são defeitos mecânicos, sem ambiguidade.');
  process.exit(1);
}
