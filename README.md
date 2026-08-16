# 🛍️ AW Showcase

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Vitrine online moderna, responsiva e integrada ao WhatsApp para apresentação de produtos.

O **AW Showcase** é uma aplicação web desenvolvida para atuar como uma vitrine digital completa, permitindo apresentar catálogo de produtos, organizar categorias e intermediar o contato direto entre clientes e o vendedor via WhatsApp.

O projeto adota uma arquitetura desacoplada (Frontend/Backend separadas), facilitando manutenções independentes e a escalabilidade da aplicação.

---

## 🌐 Demonstração

* **Aplicação em Produção:** [https://aw-showcase.vercel.app/](https://aw-showcase.vercel.app/)

Layout 100% responsivo e otimizado para:
* 💻 Desktop / Notebook
* 📱 Smartphones / Tablets

---

## ✨ Funcionalidades

### 🛍️ Vitrine Digital
* **Catálogo & Categorias:** Exibição dinâmica de produtos com filtros por categoria.
* **Destaques & Status:** Seção de itens em destaque e controle de disponibilidade (produtos ativos/inativos).
* **Página de Detalhes:** Visualização completa e dedicada para cada item.
* **Mídia em Nuvem:** Carregamento otimizado de imagens via Cloudinary.

### 📱 Atendimento & Conversão
* **Geração Automática de Links:** Formatação de links do WhatsApp centralizada por produto.
* **CTA Direto:** Botões de contato distribuídos estrategicamente na vitrine e na página de detalhes.

### 🔐 Painel Administrativo
* Autenticação segura (Login/Logout).
* Gerenciamento do perfil (Alteração de usuário e senha).
* CRUD completo de produtos (Criar, Ler, Atualizar, Deletar).
* Upload direto de imagens para o Cloudinary.
* Toggle de exibição (Ativar/Desativar produto) e marcação de destaques.

---

## 🚀 Tecnologias

**Frontend:**
* Next.js | React | TypeScript
* Tailwind CSS | Next Image

**Backend & Banco de Dados:**
* Node.js | Express
* Prisma ORM | PostgreSQL
* Multer | Cloudinary

**Infraestrutura & Deploy:**
* **Frontend:** Vercel
* **Backend e Banco:** Render
* **Armazenamento de Imagens:** Cloudinary

---

## 📁 Estrutura do Projeto

```text
aw-showcase/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── routes/
│       ├── app.js
│       └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── types/
│       └── utils/
└── README.md
🛠️ Como Executar o Projeto
Pré-requisitos
Node.js (v18+)

Gerenciador de pacotes (npm ou yarn)

Instância PostgreSQL configurada

1. Configurando o Backend
Bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install
Crie um arquivo .env na raiz da pasta backend:

Snippet de código
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco?schema=public"
PORT=3001

CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
Execute as migrations e inicie o servidor:

Bash
# Gerar Prisma Client
npx prisma generate

# Executar em modo de desenvolvimento
npm run dev
O servidor rodará em: http://localhost:3001

Principais Endpoints Rest API:
GET /api/status — Checagem de saúde da API

GET /api/produtos — Lista de produtos

GET /api/produtos/:id — Detalhes do produto

GET /api/categorias — Lista de categorias

2. Configurando o Frontend
Bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install
Crie um arquivo .env.local na raiz da pasta frontend:

Snippet de código
NEXT_PUBLIC_API_URL=http://localhost:3001/api
Inicie o ambiente de desenvolvimento:

Bash
npm run dev
A aplicação estará disponível em: http://localhost:3000

📌 Próximos Passos & Evoluções
[ ] Métricas e Analytics de acessos nos produtos.

[ ] Otimizações avançadas de SEO (OpenGraph / Metadata por produto).

[ ] Melhorias na gestão avançada de categorias e ordenação customizada.

[ ] Suporte a múltiplos números de atendimento no WhatsApp.

👨‍💻 Autor
Desenvolvido por André Waldige (AW TECHNOLOGY).

GitHub: @awaldige

Projeto: AW Showcase Repository

Live App: aw-showcase.vercel.app

Licença MIT — Fique à vontade para contribuir ou utilizar este projeto como referência.
