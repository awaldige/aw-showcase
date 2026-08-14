
# AW Showcase

Vitrine online desenvolvida para apresentação de produtos de forma moderna, simples e responsiva.

O projeto foi desenvolvido com uma arquitetura separada entre **Frontend** e **Backend**, permitindo evolução futura para novos recursos e integrações.

## 🚀 Tecnologias

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Next Image

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Multer

### Ferramentas
- Git
- GitHub
- VS Code
- Vercel
- Render

## ✨ Funcionalidades

- Exibição de produtos
- Categorias de produtos
- Página individual de produto
- Produtos em destaque
- Filtro por categorias
- Integração com WhatsApp
- Área administrativa
- Login administrativo
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Alteração de usuário
- Alteração de senha
- Upload de imagens
- Controle de produtos ativos
- Controle de destaques

## 📁 Estrutura do projeto

text
aw-showcase/
├── backend/
│   ├── prisma/
│   └── src/
│
├── frontend/
│   ├── public/
│   └── src/
│
├── docs/
├── uploads/
├── .gitignore
└── README.md
🔧 Backend

O backend foi desenvolvido com Node.js e Express.

Principais endpoints:

GET /api/status
GET /api/produtos
GET /api/produtos/:id
GET /api/categorias
Executar o backend

Entre na pasta:

cd backend

Instale as dependências:

npm install

Configure o arquivo .env:

DATABASE_URL="sua_url_do_banco"
PORT=3001

Depois execute:

npm run dev

O backend ficará disponível em:

http://localhost:3001
💻 Frontend

Entre na pasta:

cd frontend

Instale as dependências:

npm install

Configure o arquivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:3001/api

Execute:

npm run dev

O frontend ficará disponível em:

http://localhost:3000
🔐 Área administrativa

O projeto possui uma área administrativa protegida para gerenciamento dos produtos.

Recursos administrativos:

Login
Logout
Cadastro de produtos
Edição de produtos
Exclusão de produtos
Alteração de usuário
Alteração de senha

As credenciais administrativas não são armazenadas no GitHub.

🗄️ Banco de dados

O projeto utiliza Prisma ORM para comunicação com o banco de dados.

As migrations estão localizadas em:

backend/prisma/migrations/

Para gerar o Prisma Client:

npx prisma generate
📱 WhatsApp

O projeto possui integração com WhatsApp para facilitar o contato com clientes interessados nos produtos.

Os links são gerados através do utilitário:

frontend/src/utils/whatsapp.ts
📦 Imagens

As imagens de produtos utilizadas como exemplo estão em:

frontend/public/produtos/

Arquivos de ambiente, dependências e arquivos gerados não são enviados ao GitHub.

🎯 Objetivo

O AW Showcase foi desenvolvido como uma solução de vitrine digital para apresentação de produtos, com foco em:

simplicidade
responsividade
facilidade de manutenção
experiência do usuário
integração com WhatsApp
possibilidade de expansão futura
👨‍💻 Desenvolvimento

Projeto desenvolvido por AW TECHNOLOGY.
