O projeto foi criado usando [Create React App](https://github.com/facebook/create-react-app).

# Scripts para desenvolvimento e publicação

## Instalação

Para conseguir fazer atualizações neste diretório, é preciso solicitar autorização com sua conta GitHub.

Crie uma pasta em seu computador para receber o projeto e rode o comando:

```sh
git clone https://github.com/associacaosilo/liberteofuturo-site.git .
```

E então instale os módulos com:

```sh
yarn
```

ou

```sh
npm install
```

## Rodar em ambiente local

```sh
yarn start
```

ou

```sh
npm run install
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar o site no navegador. <br />
A página irá atualizar automaticamente quando os arquivos forem editados.

## Publicação das edições

Primeiro, faça o commit e push das mudanças feitas para o repositório:

```sh
git add .
git commit -m 'DESCRIÇÃO DAS EDIÇÕES'
git push
```

Para publicar as alterações no Github Pages, use:

```sh
yarn deploy
```

ou

```sh
npm run deploy
```

# Organização do conteúdo das páginas

Os textos para as páginas do site, em todos os idiomas, estão reunidos no objeto **data**, descrito no arquivo [**/src/data.data.js**](https://github.com/associacaosilo/liberteofuturo-site/blob/master/src/data/data.js).

Dentro do objeto, encontramos dois objetos principais, **categories** (que reúne os cinco tópicos do projeto) e **pages**, que reúne as páginas Movimento, Participe, Laboratório e Home.

Cada tópico e cada página tem seu conteúdo subdividido para cada uma das línguas: **pt** (Português), **en** (Inglês) e **es** (Espanhol).

As páginas (Movimento, Laboratório, Home e Participe) tem uma propriedade chamada "content", cujo conteúdo é em [JSX](https://pt-br.reactjs.org/docs/introducing-jsx.html), uma forma similar ao HTML usada pelo React.

Qualquer edição de conteúdo deve ser feita editando o arquivo [**/src/data.data.js**](https://github.com/associacaosilo/liberteofuturo-site/blob/master/src/data/data.js) e então seguindo os passos descritos em "Publicação das edições".

# Estilo

O CSS do site é feito usando [SASS](https://sass-lang.com/guide). As edições devem ser feitas nos arquivos que estão na pasta **/src/sass/**. Durante a edição dos arquivos **.scss**, deve-se rodar o comando "watch" do Sass para que as alterações sejam compiladas no arquivo **/src/style.css**:

```sh
yarn sass
```

ou

```sh
npm run sass
```
