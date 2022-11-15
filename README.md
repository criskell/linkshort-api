# linkshort-api
API de uma aplicação de gerenciamento de links feito com Node.

## Instalação

## Ferramentas utilizadas
- Node como runtime
- Express para roteamento e middleware
- Sequelize para ORM e sequelize-cli para migrations

## API
### Autenticação
- *POST* `/auth/login`:
	- Retorna um token JWT para um email e senha.
	- Corpo: Objeto JSON com as propriedades:
		- `email`: E-mail do usuário.
		- `password`: Senha.
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