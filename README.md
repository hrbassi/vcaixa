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
Para preparar o ambiente localmente, é necessário criar a seguinte imagem no dicker:
`docker run --name vcaixa_postgres -e POSTGRES_PASSWORD=vcaixa -d postgres -p 5434:5432`

Para executar a aplicação em abiente de desenvolvimento, além de instalar as dependências, deve-se utilizar o comando abaixo:
`yarn dev:server`

Para gerar o build da aplicação (que vai ser levada para produção), deve-se executar o seguinte comando:
`yarn tsc`

## Deploy e Publicação
A intenção deste projeto é ser disponibilizado na AWS utilizando containers, porém ainda não foi configurado
