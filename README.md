# linkshort-api
API de uma aplicação de gerenciamento de links feito com Node.

## Instalação
1. Clone o repositório.
2. Execute `npm install`
3. Copie `.env.example` para `.env` e altere as configurações do banco de dados
4. Execute `npx sequelize-cli db:migrate`
5. Execute `npm run start:dev`

## Ferramentas utilizadas
- Node como runtime
- Postgres como SGBDR
- Express para roteamento e middleware
- Sequelize para ORM e sequelize-cli para migrations
- joi para validação de dados
- jsonwebtoken para autenticação

## API
### Autenticação
- *POST* `/auth/login`:
	- Retorna um token JWT para um email e senha.
	- Corpo: Objeto JSON com as propriedades:
		- `email`: E-mail do usuário.
		- `password`: Senha.
	- Resposta em caso de sucesso: Objeto JSON com as propriedades:
		- `token`: Token JWT.
- *POST* `/auth/register`:
	- Cria um usuário.
	- Corpo: Objeto JSON com as propriedades:
		- `name`
		- `email` 
		- `password`
### Links
- *GET* `/links`:
	- Retorna os links do usuário atual.
	- Resposta em caso de sucesso: Um objeto JSON as propriedades:
		- `data`: Um array de links.
- *POST* `/links`:
	- Cria um link associado ao usuário atual.
	- Corpo: Objeto JSON com as propriedades:
		- `code`: O código do link. Opcional.
		- `fullurl`: URL completa do link.
	- Resposta em caso de sucesso: Um objeto com as propriedades:
		- `id`: ID do link.
		- `redirectpath`: Caminho para redirecionar para o link.
- *GET* `/:linkId`:
	- Retorna as informações do link.
- *PUT* `/:linkId`:
	- Atualiza as informações de um link.
- *DELETE* `/:linkId`:
	- Remove as informações de um link.