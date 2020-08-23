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

Para executar a aplicação em abiente de desenvolvimento, siga os passos abaixo:
`yarn install`
`yarn dev:server`

Para gerar o build da aplicação (que vai ser levada para produção), deve-se executar o seguinte comando:
`yarn tsc`
O comando irá atualizar (ou gerar) o diretório `dist` que deverá ser usado para deploy da aplicação

## Deploy e Publicação
A intenção deste projeto é ser disponibilizado na AWS utilizando containers, porém ainda não foi configurado

## Documentação das rotas
[Documentação das rotas no Postman](https://documenter.getpostman.com/view/4074073/T1LVA4Mu)
