# Publicar o NeuroLab na Play Store — daqui para frente

**Como usar este documento:** faça um passo por vez, na ordem. Não abra outras seções do Play Console enquanto não terminar o passo atual — o painel é cheio de avisos e caminhos laterais que puxam a atenção para longe.

Cada passo diz **quem faz**. Onde estiver escrito PARE, é literal: pare e me avise.

Tempo estimado da sua parte: cerca de 40 minutos, somando tudo.

---

## Onde estamos

Já está pronto e não precisa de você:

- Pacote `.aab` assinado, versão 1.0.0, código 1
- Textos, ícone, gráfico de destaque e 6 capturas
- Política de privacidade publicada
- Dois botões automáticos de build e envio
- Respostas prontas de todos os formulários

Falta: criar o app na loja e responder o que só pode ser respondido por você.

---

# PARTE 1 — Sua vez (3 tarefas)

## Passo 1 · Criar o app

**Onde:** play.google.com/console → botão **Criar app**

Preencha exatamente assim:

| campo | valor |
|---|---|
| Nome do app | `NeuroLab — Neurociência` |
| Idioma padrão | Português (Brasil) |
| App ou jogo | **App** |
| Gratuito ou pago | **Gratuito** |

Marque as duas declarações do rodapé (diretrizes e leis de exportação) e clique em **Criar app**.

> ⚠️ **Atenção ao único ponto sem volta deste passo.** Em algum momento o console vai pedir o **nome do pacote**: `io.github.wevertonlink.neurolab`. Escreva com cuidado — o nome do pacote **nunca pode ser alterado** depois. Se errar uma letra, o app precisa ser recriado do zero.

- [ ] App criado

---

## Passo 2 · Dar acesso à automação

**Onde:** menu lateral (à esquerda, embaixo) → **Usuários e permissões**

1. Procure na lista: `play-store-deploy@mindinline.iam.gserviceaccount.com`
   *(ela já existe na sua conta, do MindinLine — não precisa criar nada)*
2. Clique nela → aba **Apps** → **Adicionar app** → escolha **NeuroLab**
3. Em permissões, marque:
   - Ver informações do app
   - **Gerenciar versões de produção, exclusivas, testes abertos e fechados**
   - **Editar e excluir rascunhos**
4. **Salvar**

- [ ] Service account com acesso ao NeuroLab

---

## Passo 3 · Guardar a credencial no repositório

**Onde:** no Termux

Primeiro você precisa do arquivo JSON da service account. Ele **não existe no celular** de propósito. Duas formas de obter:

**Opção A — você já tem:** procure em `~/MindinLine-credentials-backup.txt`

**Opção B — emitir outra:** console.cloud.google.com → projeto `mindinline` → **IAM e administrador** → **Contas de serviço** → `play-store-deploy` → aba **Chaves** → **Adicionar chave** → **Criar nova chave** → **JSON**
*(isso cria uma chave adicional; a que o MindinLine usa continua funcionando)*

Com o arquivo em mãos, rode — **uma linha de cada vez**:

```
cd ~/neurolab-v2
```

```
gh secret set PLAY_STORE_JSON_KEY < ~/storage/downloads/ARQUIVO.json
```

Trocando `ARQUIVO.json` pelo nome real.

> Não cole o conteúdo do JSON em conversa nenhuma. Ele autoriza publicar em nome da sua conta inteira de desenvolvedor.

- [ ] Segredo `PLAY_STORE_JSON_KEY` salvo

---

# 🛑 PARE AQUI

**Me avise que terminou a Parte 1.** Eu disparo o envio do pacote e volto quando estiver na loja. Não precisa acompanhar — leva uns 5 minutos e eu confiro o resultado.

---

# PARTE 2 — Minha vez

O que eu faço, para você saber o que esperar:

1. Rodo o `preflight`, que inspeciona o pacote antes de enviar
2. Disparo o workflow **Play · publicar** na faixa de teste interno
3. Confirmo que o pacote chegou com a versão certa
4. Te aviso

> **Se der erro nesta parte, é esperado e não é culpa sua.** Algumas contas recusam o primeiro envio de um app novo pela API — o Google quer ver um pacote enviado pelo painel antes de liberar o caminho automático. Se acontecer, eu te mando o `.aab` e você sobe uma vez à mão. Depois disso todos os envios seguintes funcionam sozinhos.

---

# PARTE 3 — Sua vez (formulários)

Agora vem a parte chata: o console tem uma lista de tarefas obrigatórias. **Faça na ordem abaixo** e ignore o resto da tela.

Todas as respostas estão prontas em `loja/LISTAGEM.md`, que está no repositório.

## Passo 4 · Política de privacidade

**Onde:** Política do app → **Conteúdo do app** → **Política de privacidade**

Cole:

```
https://wevertonlink.github.io/neurolab-v2/privacidade.html
```

- [ ] Feito

## Passo 5 · Acesso ao app

**Onde:** Conteúdo do app → **Acesso ao app**

Marque: **Todas as funcionalidades estão disponíveis sem restrição de acesso**

*(o NeuroLab não tem login nem área restrita)*

- [ ] Feito

## Passo 6 · Anúncios

**Onde:** Conteúdo do app → **Anúncios**

Marque: **Não, meu app não contém anúncios**

- [ ] Feito

## Passo 7 · Classificação de conteúdo

**Onde:** Conteúdo do app → **Classificação de conteúdo**

Categoria: **Referência, notícias ou educação**

Quase tudo é **não**. Mas há uma pergunta que exige atenção:

> **Quando perguntar sobre referências a drogas, álcool ou tabaco — responda SIM.**

Os módulos 14 e 15 tratam de doenças neurológicas e de neurofarmacologia. O app fala de substâncias em contexto científico, mas fala. No campo de detalhamento, cole:

```
Conteúdo educacional de neurociência. O aplicativo explica como substâncias e
medicamentos agem sobre receptores e circuitos cerebrais, em linguagem científica
e sem incentivo ao uso. Não há descrição de obtenção, preparo ou consumo.
```

Responder "não" seria mais rápido e é exatamente o tipo de omissão que derruba um app numa revisão futura, quando já existem usuários instalados.

- [ ] Feito

## Passo 8 · Público-alvo

**Onde:** Conteúdo do app → **Público-alvo e conteúdo**

Marque: **13 a 15**, **16 a 17** e **18 e mais**

Não marque nada abaixo de 13 — isso joga o app no programa Famílias, com exigências extras de revisão e design que não fazem sentido para conteúdo universitário.

- [ ] Feito

## Passo 9 · Segurança dos dados

**Onde:** Conteúdo do app → **Segurança dos dados**

Este é o formulário mais longo, mas suas respostas são todas iguais:

| pergunta | resposta |
|---|---|
| Seu app coleta ou compartilha dados exigidos? | **Não** |
| Categorias de coleta | nenhuma |
| Categorias de compartilhamento | nenhuma |
| Criptografia em trânsito | não se aplica |
| Exclusão de dados a pedido | não se aplica |

Você pode responder isso de consciência tranquila: o app não tem uma única chamada de rede depois de carregado, e existe um teste automatizado que reprova a publicação se alguém reintroduzir qualquer dependência externa.

- [ ] Feito

---

# 🛑 PARE AQUI

**Me avise.** Eu envio os textos e as imagens da ficha pela automação — você não precisa colar descrição nem subir captura à mão.

---

# PARTE 4 — A última peça

É o que faz a barra de endereço sumir do aplicativo.

## Passo 10 · Copiar a impressão digital

**Onde:** menu lateral → **Configuração** → **Integridade do app** → aba **Assinatura de apps**

Procure o bloco **Certificado de assinatura do app** (não é o de upload — são dois, e o certo é o de assinatura do app).

Copie a linha do **SHA-256** inteira. Parece com isto:

```
A1:B2:C3:D4:...:F9
```

**Me mande essa linha.** Ela é pública, não é segredo.

- [ ] Enviada

## Passo 11 · Eu gero, você publica

Eu preparo o arquivo `assetlinks.json` e te devolvo dois comandos curtos para criar o repositório que vai hospedá-lo. Leva 2 minutos.

Depois disso, reinstale o app: a barra de endereço some e ele passa a parecer um aplicativo de verdade.

- [ ] Barra de endereço sumiu

---

# PARTE 5 — Publicar

## Passo 12 · Teste interno

Adicione seu próprio e-mail como testador, instale pelo link que o console gera e use o app por alguns minutos. É a última chance de encontrar algo antes de estranhos verem.

## Passo 13 · Produção

Quando a conta liberar produção — o que depende do teste fechado do seu outro app, e é da **conta**, não de cada app — eu promovo o NeuroLab com um comando.

A revisão do Google costuma levar de algumas horas a alguns dias na primeira vez.

---

# Se algo der errado

| sintoma | o que fazer |
|---|---|
| Console recusa o pacote por versão | me avise — eu subo o número e reenvio |
| Envio pela API falha no primeiro app | esperado; eu te mando o `.aab` para subir à mão uma vez |
| App abre com barra de endereço | falta o Passo 10 e 11 |
| App abre em branco | provavelmente cache antigo; feche e abra de novo |
| Revisão rejeita por classificação | quase sempre é a pergunta sobre substâncias do Passo 7 |

Em qualquer um desses, me mande o texto do erro. Nenhum deles é grave e nenhum exige recomeçar.

---

# Resumo em uma tela

```
PARTE 1  você    criar app · dar acesso · guardar credencial     ~20 min
         🛑 me avisar
PARTE 2  eu      enviar o pacote                                  ~5 min
PARTE 3  você    5 formulários no console                         ~20 min
         🛑 me avisar
PARTE 4  eu+você impressão digital · assetlinks                    ~5 min
PARTE 5  ambos   testar e publicar
```

A única coisa em todo este processo que não tem conserto é perder a chave de assinatura (`~/chaves/android.keystore`). Se ainda não copiou para fora do celular, faça isso antes de começar.
