O projeto foi criado usando [Create React App](https://github.com/facebook/create-react-app).

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
