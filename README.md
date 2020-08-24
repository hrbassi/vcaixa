# vcaixa.dev
Este projeto contém uma API para movimentações para Caixa Virtual:
* Criação de Carteira;
* Criação de Categoria de Movimentações;
* Criação de Transações;
* Listagem de Categorias;
* Listagem de resumo da carteira com saldo selecionando uma data específica

## Começando
Para executar este projeto, é necessário ter os seguintes recursos em ambiente de desenvolvimento:
* node.js;
* yarn;
* docker

## Desenvolvimento do projeto
Este projeto ainda não possui testes implementados e precisa passar por uma refatoração para uma melhor distribuição de responsabilidades de cada parte da aplicação.

## Configuração e Construção (Build)
Para preparar o ambiente localmente, é necessário criar a seguinte imagem no docker:
`docker run --name vcaixa_postgres -e POSTGRES_PASSWORD=vcaixa -d postgres -p 5434:5432`
Obs: A configuração do Docker utilizada no desenvolvimento foi com containers Windows

Para configurar o banco localmente, deve-se seguir os seguintes passos:
1. renomear o arquivo `ormconfig.json` para `ormconfig.json_PROD`
2. renomear o arquivo `ormconfig.json_DEV` para `ormconfig.json` e criar o banco de dados conforme dados do arquivo de configuração
3. instalar as dependencias com `yarn install`
4. rodar as migrations para criar a estutura do banco, usando o comando `yarn typeorm migration:run`
5. Para executar a aplicação, utilizar o comando `yarn dev:server`

Para gerar o build da aplicação deve-se executar o seguinte comando:
`yarn build`
O comando irá atualizar (ou gerar) o diretório `dist` com os arquivos `.js`

## Deploy e Publicação
A Aplicação está atualmente publicada no Heroku e com deploy automático a partir da branch `master`
O banco de dados de produção foi criado dentro do próprio Heroku e sua estrutura a partir das migrations desenvolvidas na aplicação

## Documentação das rotas
URL base da aplicação em ambiente de produção
´https://vcaixatecnospeed.herokuapp.com´

URL base da aplicação em ambiente de produção
´http://localhost:3333´

As rotas disponíveis estão na documentação a seguir
[Documentação das rotas no Postman](https://documenter.getpostman.com/view/4074073/T1LVA4Mu)

