API Escola

API simples em TypeScript para gerenciar alunos, suas séries, idades e notas em matérias escolares (Matemática, Geografia, História).
Os dados são armazenados em um banco de dados PostgreSQL via Docker, com administração via pgAdmin4.

✨ Funcionalidades

Cadastro de alunos (nome, série, idade)

Registro de 6 notas por matéria (Matemática, Geografia, História)

Cálculo automático da média das notas de cada matéria (com 2 casas decimais)

Armazenamento dos dados e médias no banco PostgreSQL

🛠 Tecnologias Utilizadas

Node.js

TypeScript

PostgreSQL (Docker)

pgAdmin4

Docker Compose

✅ Pré-requisitos

Node.js (v16 ou superior)

Docker + Docker Compose

Git

VSCode ou outro editor

🚀 Como rodar o projeto
1. Clone o repositório

git clone https://github.com/phpedroz/api-escola.git && cd api-escola

2. Suba o banco de dados com Docker

docker-compose up -d

PostgreSQL rodando na porta 5433

pgAdmin4 acessível em http://localhost:8080

Login pgAdmin:

Usuário: admin

Senha: admin

3. Crie o banco e tabelas

Acesse o pgAdmin, conecte-se ao servidor e crie um banco chamado escola.
Depois, crie as tabelas alunos e notas conforme o modelo usado no projeto.

4. Instale as dependências

npm install

5. Compile o TypeScript

npx tsc

6. Execute o projeto

node dist/index.js

🧪 Como usar

O projeto executa via terminal.
Você pode editar o arquivo index.ts para adicionar dados de novos alunos e suas notas.

📌 Dificuldades encontradas

Conflitos de porta ao subir containers no Docker

Ajuste de configurações do TypeScript (module, moduleResolution)

Importações com erro por falta de tipos do módulo pg

Erro de cliente PostgreSQL já conectado

Arredondamento das médias com toFixed(2)

Conflitos de chave estrangeira ao excluir tabelas dependentes

Integração com pgAdmin e criação correta de tabelas com relacionamento

📁 Estrutura do projeto

index.ts: código principal

tsconfig.json: configurações do TypeScript

package.json: dependências do projeto

docker-compose.yml: configuração de PostgreSQL + pgAdmin

dist/: código JS compilado

.gitignore, README.md, LICENSE

📝 Licença

Este projeto está licenciado sob a MIT License.
Consulte o arquivo LICENSE para mais informações.

📬 Contato

Pedro Henrique
📧 phpedro161205@gmail.com

🔗 https://github.com/phpedroz
