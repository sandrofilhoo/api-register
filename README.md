
# Api-register

Uma aplicação backend desenvolvida com Express, utilizando TypeScript, Knex e PostgreSQL.

# Pré-requisitos e Configurações
É necessário ter o Node.js e o PostgreSQL instalados previamente.
Para iniciar, crie um banco de dados e preencha o arquivo .env com as variáveis corretas:

```sh
PORT=9999
CLIENT_URL="http://localhost:5137"
USER_DATABASE=postgress
PASSWORD_DATABASE=12345678
DATABASE=registre
```

### Migration
Para que a API funcione corretamente, é necessário executar as migrações para criar a tabela de usuários:

```sh
npx knex migrate:latest

```
### Seeds
Após as migrações, execute os seeds para popular a tabela de usuários com dados iniciais:

```sh
npx knex seed:run

```

# Iniciar a aplicação
Para iniciar a aplicação, utilize o comando:

```sh
npm run dev
```
Se tudo estiver correto, você verá a seguinte mensagem indicando que a API está funcionando:

```sh
Server is running on http://localhost:${port}
```