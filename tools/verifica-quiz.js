#!/usr/bin/env node
/* =====================================================================
   Verificador dos quizzes.

   Por que existe: o commit b3a937f reverteu três commits porque o
   extrator que os sustentava leu apenas o literal inicial de
   MINI_QUIZZES e enxergou 6 módulos onde há 16. Os outros 10 chegam
   depois, em atribuições soltas — MINI_QUIZZES['decisao']=[...] — que
   nascem espalhadas pelo arquivo. A conta saiu 72 onde são 192, e três
   commits foram construídos em cima desse número antes de alguém
   conferir contra o arquivo inteiro.

   Por isso este script NÃO extrai por regex. Ele executa os blocos
   <script> do index.html num contexto vm com DOM stubado e lê as
   estruturas do escopo léxico, do mesmo jeito que o navegador as vê.
   Atribuição tardia entra sozinha, e aquela classe de erro deixa de ser
   possível por construção.

   (tools/verifica-metaforas.js extrai por regex e continua correto, mas
   só porque IMAGINE_DATA_V2 é um literal único que ninguém completa
   depois. Não copie aquele método para cá — foi ele que falhou.)

   As contagens esperadas não são fixadas em constante. Saem dos próprios
   dados: cada módulo tem N aulas, cada aula tem uma questão por nível, e
   todos os módulos têm quiz do mesmo tamanho. Assim o conteúdo pode
   crescer sem editar este arquivo, mas não pode crescer torto.

   O que este script NÃO faz: julgar se a resposta está cientificamente
   certa. Isso não tem verificação automática neste projeto e depende de
   revisão humana — o mesmo registro que 0df6f7d deixou.

   ERRO  = defeito mecânico, sem ambiguidade. Reprova.
   AVISO = candidato a defeito que precisa de leitura humana.
   ===================================================================== */

const path = require('node:path');
const { extrair } = require('./extrai-app.js');

/* Sem argumento, lê o index.html do projeto. Com um caminho, lê aquele —
   é assim que se testa o próprio verificador, apontando-o para uma cópia
   com defeito plantado. Checagem que nunca reprovou não é checagem. */
const ARQUIVO = process.argv[2] || path.join(__dirname, '..', 'index.html');

/* Sobreposição a partir da qual uma questão de módulo vira suspeita de
   repetir uma de tópico.

   Começou em 0.5, que era onde caíam as reescritas quase literais ("O que
   a regra de Hebb descreve?" contra "A regra de Hebb resume-se a:" dava
   0.78). Depois que as 21 questões sobrepostas foram reescritas, a maior
   sobreposição do conjunto passou a ser 0.333 — parentesco temático
   legítimo, dois itens tocando o mesmo assunto sem cobrar a mesma coisa.

   0.40 fica acima desse teto com folga para não disparar à toa, e bem
   abaixo do 0.5 que deixava nove passarem. Se subir de novo, é regressão
   de conteúdo, não ruído. */
const LIMITE_SOBREPOSICAO = 0.40;

const STOP = new Set(`a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sobre entre
ate que quem qual quais quando onde como porque pois se nao nem e ou mas tambem ja so apenas mesmo mesma
ser sao eh foi era esta estao seu sua seus suas ele ela eles elas isso isto aquilo lhe lhes
mais menos muito muita pouco pouca todo toda todos todas cada outro outra outros outras
depois antes durante enquanto ainda entao assim ao aos dele dela deles delas
tem ter vai vao pode podem fica ficam faz fazem pelo pela pelos pelas num numa
principal papel funcao acontece ocorre serve chama chamada`.split(/\s+/));

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
/* Palavras de 4 letras ou mais: abaixo disso sobra ruído gramatical que
   infla a semelhança entre quaisquer duas frases em português. */
const lexico = (s) => new Set(norm(s).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w)));

const jaccard = (a, b) => {
  let comuns = 0;
  for (const w of a) if (b.has(w)) comuns++;
  const uniao = a.size + b.size - comuns;
  return uniao ? comuns / uniao : 0;
};

/* A assinatura de uma questão é o enunciado mais a alternativa correta.
   Só o enunciado não basta: duas questões podem perguntar com palavras
   diferentes e cobrar exatamente o mesmo fato, e é o fato cobrado que
   determina se uma é repetição da outra. */
const assinatura = (q) => lexico(q.q + ' ' + (q.o && q.o[q.c] ? q.o[q.c] : ''));

/* A leitura do app vive em tools/extrai-app.js, compartilhada com as
   outras ferramentas. O comentario grande sobre por que nao se extrai por
   regex esta la. */

function verificar({ MODULES, MINI_QUIZZES, MINI_LEVELS }) {
  const achados = [];
  const add = (mod, nivel, checagem, msg) => achados.push({ mod, nivel, checagem, msg });

  const niveis = MINI_LEVELS.length;
  const idsQuiz = new Set(Object.keys(MINI_QUIZZES));

  /* 1 · cobertura: todo módulo tem mini quiz. É a checagem que teria
     poupado o revert — o extrator antigo via 6 destes 16. */
  for (const m of MODULES) {
    if (!idsQuiz.has(m.id)) add(m.id, 'ERRO', 'sem-mini-quiz', 'o módulo não tem entrada em MINI_QUIZZES');
  }
  for (const id of idsQuiz) {
    if (!MODULES.some((m) => m.id === id)) add(id, 'ERRO', 'mini-quiz-orfao', 'MINI_QUIZZES tem entrada para um módulo que não existe');
  }

  /* 2 · forma: uma questão por aula e por nível. */
  for (const m of MODULES) {
    const porAula = MINI_QUIZZES[m.id];
    if (!Array.isArray(porAula)) continue;
    if (porAula.length !== m.lessons.length) {
      add(m.id, 'ERRO', 'aulas-sem-quiz', `${m.lessons.length} aulas, mas ${porAula.length} conjuntos de questões de tópico`);
    }
    porAula.forEach((doTopico, i) => {
      if (!Array.isArray(doTopico) || doTopico.length !== niveis) {
        add(m.id, 'ERRO', 'niveis-incompletos', `aula ${i}: ${Array.isArray(doTopico) ? doTopico.length : 0} questões, esperado ${niveis} (uma por nível)`);
        return;
      }
      doTopico.forEach((q, n) => {
        if (q.lvl !== n) add(m.id, 'ERRO', 'nivel-fora-de-ordem', `aula ${i}, posição ${n}: lvl=${q.lvl}`);
      });
    });
  }

  /* 3 · quiz de módulo do mesmo tamanho em todos. Um módulo que encolhe
     sozinho é quase sempre edição pela metade, não decisão. */
  const tamanhos = MODULES.map((m) => (Array.isArray(m.quiz) ? m.quiz.length : 0));
  const maisComum = tamanhos.sort((a, b) => tamanhos.filter((x) => x === a).length - tamanhos.filter((x) => x === b).length).pop();
  MODULES.forEach((m) => {
    const n = Array.isArray(m.quiz) ? m.quiz.length : 0;
    if (n === 0) add(m.id, 'ERRO', 'sem-quiz-de-modulo', 'o módulo não tem quiz próprio');
    else if (n !== maisComum) add(m.id, 'AVISO', 'quiz-de-tamanho-diferente', `${n} questões, enquanto a maioria dos módulos tem ${maisComum}`);
  });

  /* 4 · integridade de cada questão. */
  const conferir = (q, mod, onde) => {
    if (!q || !q.q || !String(q.q).trim()) { add(mod, 'ERRO', 'sem-enunciado', onde); return; }
    if (!Array.isArray(q.o) || q.o.length < 3) { add(mod, 'ERRO', 'poucas-alternativas', `${onde}: ${Array.isArray(q.o) ? q.o.length : 0} alternativas`); return; }
    if (new Set(q.o.map((x) => norm(x).trim())).size !== q.o.length) add(mod, 'ERRO', 'alternativas-repetidas', onde);
    if (typeof q.c !== 'number' || q.c < 0 || q.c >= q.o.length) add(mod, 'ERRO', 'resposta-invalida', `${onde}: c=${q.c} fora de 0..${q.o.length - 1}`);
    if (!q.er || !String(q.er).trim()) add(mod, 'ERRO', 'sem-explicacao-do-acerto', onde);
    if (!q.ew || !String(q.ew).trim()) add(mod, 'ERRO', 'sem-explicacao-do-erro', onde);
  };

  const topicoDe = {};
  for (const m of MODULES) {
    topicoDe[m.id] = [];
    (MINI_QUIZZES[m.id] || []).forEach((doTopico, i) => {
      (Array.isArray(doTopico) ? doTopico : []).forEach((q) => {
        conferir(q, m.id, `tópico aula ${i} nível ${q && q.lvl}`);
        if (q && q.q) topicoDe[m.id].push({ q, aula: i });
      });
    });
    (m.quiz || []).forEach((q, i) => conferir(q, m.id, `quiz de módulo #${i}`));
  }

  /* 5 · o quiz de módulo não pode repetir o de tópico. O de módulo vem
     depois das aulas todas: recobrar aula por aula já é o trabalho do
     mini quiz, e uma questão repetida ali gasta a única chance de
     verificar se o aluno integrou o módulo.

     Enunciado idêntico é ERRO — não há leitura em que seja intencional.
     Semelhança alta é AVISO: exige olho humano para separar repetição de
     parentesco legítimo. */
  for (const m of MODULES) {
    const daquele = topicoDe[m.id] || [];
    (m.quiz || []).forEach((q, i) => {
      if (!q || !q.q) return;
      const alvo = assinatura(q);
      const exato = daquele.find((t) => norm(t.q.q).replace(/[^a-z0-9]/g, '') === norm(q.q).replace(/[^a-z0-9]/g, ''));
      if (exato) {
        add(m.id, 'ERRO', 'questao-repetida', `quiz #${i} tem o mesmo enunciado da questão da aula ${exato.aula}`);
        return;
      }
      let pior = null;
      for (const t of daquele) {
        const s = jaccard(alvo, assinatura(t.q));
        if (!pior || s > pior.s) pior = { s, t };
      }
      if (pior && pior.s >= LIMITE_SOBREPOSICAO) {
        add(m.id, 'AVISO', 'sobreposicao', `quiz #${i} (${pior.s.toFixed(2)}) cobra quase o mesmo que a aula ${pior.t.aula} nível ${pior.t.q.lvl}: "${String(q.q).slice(0, 60)}"`);
      }
    });
  }

  return achados;
}

const dados = extrair(['MODULES', 'MINI_QUIZZES', 'MINI_LEVELS'], ARQUIVO);
const achados = verificar(dados);
const erros = achados.filter((a) => a.nivel === 'ERRO');
const avisos = achados.filter((a) => a.nivel === 'AVISO');

const totalTopico = Object.values(dados.MINI_QUIZZES).reduce((a, porAula) => a + porAula.reduce((b, t) => b + (Array.isArray(t) ? t.length : 0), 0), 0);
const totalModulo = dados.MODULES.reduce((a, m) => a + (m.quiz ? m.quiz.length : 0), 0);

console.log(`Verificando ${dados.MODULES.length} módulos: ${totalTopico} questões de tópico e ${totalModulo} de quiz de módulo`);
console.log(`(níveis: ${dados.MINI_LEVELS.join(' · ')})\n`);

for (const m of dados.MODULES) {
  const meus = achados.filter((a) => a.mod === m.id);
  if (!meus.length) { console.log(`  ok     ${m.id}`); continue; }
  const temErro = meus.some((a) => a.nivel === 'ERRO');
  console.log(`  ${temErro ? 'ERRO  ' : 'aviso '} ${m.id}`);
  for (const a of meus) console.log(`         ${a.nivel === 'ERRO' ? '!' : '·'} [${a.checagem}] ${a.msg}`);
}
for (const a of achados.filter((x) => !dados.MODULES.some((m) => m.id === x.mod))) {
  console.log(`  ERRO   ${a.mod}\n         ! [${a.checagem}] ${a.msg}`);
}

console.log(`\n${erros.length} erro(s), ${avisos.length} aviso(s)`);
if (erros.length) {
  console.log('\nErros reprovam: são defeitos mecânicos, sem ambiguidade.');
  process.exit(1);
}
