# NeuroLab: como tudo funciona

*Um guia para entender o sistema inteiro sem saber programar.*

---

## O que é o NeuroLab

Um curso de neurociência com 16 módulos que funciona no celular, sem internet e sem cadastro. O aluno percorre cada assunto por três caminhos — a anatomia da estrutura, o mecanismo passo a passo e um infográfico que junta tudo numa imagem só — e responde quizzes que voltam a perguntar o que ele errou, no intervalo certo para fixar.

Até aqui é a descrição do produto. O resto deste documento é sobre a **máquina em volta dele**: o que garante que ele funcione, que continue funcionando quando mudar, e como ele chega ao celular de outra pessoa.

---

## A primeira coisa estranha: o aplicativo é um arquivo só

O NeuroLab inteiro — os 16 módulos, os textos, os quizzes, as ilustrações, até as letras usadas na tela — mora dentro de **um único arquivo** de 1,1 MB chamado `index.html`.

Isso é incomum. A maioria dos aplicativos é feita de centenas de arquivos que se chamam entre si. Aqui, tudo está junto.

**Por que isso é bom:** o aplicativo não depende de nada externo para funcionar. Você pode abrir o arquivo sem internet nenhuma e ele funciona por completo. Não existe "o servidor caiu".

**Por que isso é ruim:** um arquivo de 1,1 MB é difícil de editar em pedaços. Quando alguém quer melhorar uma parte, precisa mexer no arquivo inteiro. É por isso que as melhorias grandes chegam como um pacote completo em vez de pequenas correções.

Vale mencionar um detalhe que revela o cuidado do projeto: as letras (fontes tipográficas) foram **embutidas dentro do arquivo** de propósito. Antes elas vinham do Google. Isso significava que, toda vez que alguém abrisse o aplicativo, o Google ficava sabendo o endereço de internet e o aparelho daquela pessoa. Embutir as fontes cortou esse vazamento — e de quebra fez o app funcionar mesmo sem rede.

---

## As quatro camadas do sistema

Pense em quatro andares, do mais próximo do aluno ao mais distante.

### 1º andar — o site

O NeuroLab está publicado em **https://wevertonlink.github.io/neurolab-v2/**, de graça, na infraestrutura do GitHub. Qualquer pessoa com o link abre no navegador.

### 2º andar — o aplicativo instalável

O mesmo site pode ser **instalado** no celular e ficar com ícone próprio, abrindo em tela cheia, sem barra de navegador. Isso se chama PWA.

Existe uma peça chamada **service worker** que faz isso funcionar offline. A analogia mais próxima é um **almoxarife**: na primeira visita ele guarda uma cópia de tudo — textos, imagens, ícones — numa despensa dentro do celular. Nas visitas seguintes ele serve da despensa, sem pedir nada à rede. Por isso o app abre no metrô, no avião, no sítio sem sinal.

O almoxarife tem um número de versão (`neurolab-v9-0`). Quando esse número muda, ele entende que o conteúdo é novo, joga fora a despensa velha e refaz. Esquecer de mudar esse número é um erro clássico: o aplicativo novo é publicado e ninguém vê, porque todos continuam sendo servidos da despensa antiga.

### 3º andar — o aplicativo da Play Store

Para estar na loja de aplicativos, o site precisa virar um pacote Android. A tecnologia usada se chama **TWA**.

A analogia: o TWA é uma **moldura**. O quadro continua sendo o site; a moldura só permite pendurá-lo na parede da Play Store. Por isso o pacote pesa 1,2 MB enquanto o conteúdo real são quase 5 MB de infográficos — a moldura é leve, o quadro chega depois, pela internet, e vai para a despensa do almoxarife.

Existe um detalhe chato mas importante. O Android precisa ter certeza de que quem publicou o aplicativo é mesmo o dono do site — senão qualquer um poderia empacotar o site dos outros. Essa prova é um arquivo chamado `assetlinks.json`, que fica na raiz do endereço e diz "o aplicativo com tal identidade é meu". **Enquanto esse arquivo não existir, o app abre com a barra de endereço à mostra**, parecendo um navegador disfarçado. Funciona, mas parece amador.

### 4º andar — a esteira automática

Aqui mora a parte que o aluno nunca vê e que faz o resto ser confiável. Explicada na próxima seção.

---

## A esteira: o que acontece sozinho

Toda vez que o conteúdo do NeuroLab muda, um conjunto de verificações roda **sozinho**, num computador emprestado pelo GitHub, sem ninguém pedir.

### Os 148 testes

Um robô abre o aplicativo num navegador de verdade e usa como se fosse uma pessoa: navega pelos 16 módulos, responde quizzes, exporta o progresso, apaga, importa de volta, desliga a internet para ver se ainda funciona, e mede se algum conteúdo escapa da largura da tela em cinco tamanhos de celular diferentes.

Se qualquer coisa falhar, a mudança é barrada.

Alguns desses testes são interessantes por revelarem o que já deu errado um dia:

- **"a busca escapa o que o aluno digita"** — protege contra um truque em que alguém digita código na caixa de busca e ele é executado. Foi um defeito real, corrigido.
- **"progresso ilegível é preservado"** — se o arquivo de progresso do aluno corromper, o app **não apaga**; ele guarda e avisa na tela. Antes ele apagava em silêncio.
- **"alcance do botão da revisão"** — mede se o botão fica ao alcance do polegar depois de responder uma questão. Foi criado porque a medição mostrou uma folga de 74 pixels num celular pequeno, que a barra do navegador engolia inteira.

### O verificador de metáforas

Esse é raro e vale explicar.

Cada módulo tem uma metáfora — uma cena do cotidiano que carrega o mecanismo real. O módulo do neurônio, por exemplo, usa uma bacia que enche até uma comporta ceder de uma vez.

Existe um programa que **audita essas metáforas automaticamente**. Ele não julga se a metáfora é boa — isso é questão humana, e o próprio programa declara isso no cabeçalho. Ele verifica coerência interna: se o título fala de uma comporta, a cena precisa falar de comporta; se a cena constrói uma imagem, o resumo não pode abandoná-la e terminar em jargão.

Quando esse verificador foi apontado para o material que estava publicado, encontrou **10 erros**. Em cinco módulos a metáfora era construída com capricho e depois largada: o resumo virava uma lista técnica que não retomava imagem nenhuma. Isso foi corrigido e hoje são **zero erros**.

O verificador agora roda antes dos 148 testes. Se alguém escrever uma metáfora incoerente no futuro, a publicação é barrada.

---

## Como o aplicativo chega à loja

### A chave que não pode ser perdida

Existe um arquivo — o *keystore* — que funciona como uma **assinatura de próprio punho**. Ele prova que as atualizações vêm da mesma pessoa que publicou a primeira versão.

Ninguém emite essa assinatura: ela foi criada no celular e existe só ali e nas cópias de segurança. O Google não guarda cópia e não recupera.

**Se ela for perdida, o aplicativo publicado fica congelado para sempre.** Nunca mais aceita atualização. A única saída é publicar outro aplicativo do zero, perdendo instalações e avaliações. É o único item de todo o sistema sem conserto possível.

### O envio

Existem dois botões automáticos:

- **Android TWA** — constrói o pacote e entrega para inspeção
- **Play · publicar** — constrói e envia direto para a loja, junto com os textos, o ícone e as capturas de tela

O segundo usa uma credencial que autoriza publicar em nome do desenvolvedor, sem abrir o site da Play Store.

### O que a automação não alcança

Vale ser honesto sobre os limites, porque eles não são falta de esforço:

| tarefa | automatizável? |
|---|---|
| Enviar o pacote | sim |
| Escrever textos e imagens da ficha | sim |
| Promover entre fases de teste | sim |
| **Criar o aplicativo na loja** | **não — o Google não oferece esse caminho** |
| **Formulário de segurança dos dados** | **não na prática** |
| **Questionário de classificação etária** | **não** |

O formulário de segurança dos dados merece nota. Existe um endereço técnico para preenchê-lo, mas ele exige um formato binário que só a própria tela do Google produz. Num projeto anterior, isso custou sete tentativas e terminou sendo feito à mão. Não vale insistir.

---

## A parte mais importante deste documento

Tudo acima descreve verificações. Elas dão uma sensação de segurança que precisa ser calibrada, porque **um defeito atravessou todas elas**.

O caso: o pacote foi construído, os 148 testes passaram, o sinal ficou verde, a assinatura foi conferida com sucesso, e o pacote estava pronto para a loja. Só que o aplicativo se chamava **"versão y"** em vez de "versão 1.0.0".

A causa foi uma pergunta inesperada. A ferramenta que monta o pacote fazia uma pergunta que ninguém previu, e havia uma instrução automática mandando responder "sim" a qualquer pergunta. Ela respondeu "y" — e "y" virou o nome da versão.

Nada falhou. Nenhum alarme tocou. Quem descobriu foi uma ferramenta de inspeção trazida depois, que simplesmente **olhou o pacote pronto e disse o que havia dentro**.

Três lições ficaram, e elas valem para qualquer sistema, não só este:

1. **Responder no escuro é pior que travar.** Uma automação que responde a perguntas que não entende troca uma falha visível por um defeito silencioso. A instrução foi removida: hoje, pergunta inesperada quebra o processo.
2. **Verificar o processo não é verificar o resultado.** Todos os testes olhavam o comportamento do aplicativo; nenhum olhava o pacote que sairia. Foi acrescentada uma conferência que compara a versão construída com a pedida e barra a diferença.
3. **Sinal verde não é prova.** É ausência de alarme, que é coisa diferente. Os alarmes só tocam para o que alguém pensou em vigiar.

---

## Onde está cada coisa

| item | onde |
|---|---|
| Aplicativo no ar | https://wevertonlink.github.io/neurolab-v2/ |
| Código-fonte | https://github.com/WevertonLink/neurolab-v2 |
| Política de privacidade | `/neurolab-v2/privacidade.html` |
| Textos e imagens da loja | pasta `loja/` |
| Configuração do app Android | `android/twa-manifest.json` |
| Verificador de metáforas | `tools/verifica-metaforas.js` |
| Testes automatizados | `tests/neurolab.spec.js` |
| Pontos de retorno | marcas `rollback/pre-fase9` e `rollback/pre-metaforas` |

Essa última linha merece explicação: existem duas **fotografias** do projeto guardadas, tiradas antes das duas mudanças grandes. Se algo se revelar errado, é possível voltar exatamente ao estado anterior com um comando. Nada do que foi feito é irreversível — com a única exceção, já dita, da chave de assinatura.

---

## Em uma frase

O NeuroLab é um curso de neurociência num arquivo só, que funciona sem internet, não coleta nada de ninguém, se verifica sozinho a cada mudança — e que hoje sabe que verificar não é o mesmo que ter certeza.
