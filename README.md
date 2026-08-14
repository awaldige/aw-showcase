# 🛍️ AW Showcase

**Vitrine online moderna, responsiva e integrada ao WhatsApp para apresentação de produtos.**

O **AW Showcase** é uma aplicação web desenvolvida para funcionar como uma vitrine digital, permitindo apresentar produtos, organizar categorias e facilitar o contato entre clientes e a empresa.

O projeto utiliza uma arquitetura separada entre **Frontend** e **Backend**, permitindo manutenção independente e evolução futura da aplicação.

---

## 🚀 Tecnologias

### 🎨 Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Next Image**

### ⚙️ Backend

* **Node.js**
* **Express**
* **Prisma ORM**
* **PostgreSQL**
* **Multer**

### 🛠️ Ferramentas

* **Git**
* **GitHub**
* **VS Code**
* **Vercel**
* **Render**

---

## ✨ Funcionalidades

### 🛍️ Vitrine

* Exibição de produtos
* Categorias de produtos
* Página individual de produto
* Produtos em destaque
* Filtro por categorias
* Controle de produtos ativos
* Controle de destaques
* Upload de imagens

### 📱 Atendimento

* Integração com WhatsApp
* Botões de contato distribuídos pela vitrine
* Geração automática dos links de WhatsApp

### 🔐 Área administrativa

* Login administrativo
* Logout
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Alteração de usuário
* Alteração de senha

---

## 📁 Estrutura do projeto

```text
aw-showcase/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── routes/
│       ├── app.js
│       └── server.js
│
├── frontend/
│   ├── public/
│   │   └── produtos/
│   │
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── types/
│       └── utils/
│
├── docs/
├── uploads/
├── .gitignore
└── README.md
```

---

## 🔧 Backend

O backend foi desenvolvido utilizando **Node.js + Express**, com **Prisma ORM** para comunicação com o banco de dados.

### Principais endpoints

```http
GET /api/status
GET /api/produtos
GET /api/produtos/:id
GET /api/categorias
```

### Executando o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL="sua_url_do_banco"
PORT=3001
```

Execute o servidor:

```bash
npm run dev
```

O backend ficará disponível em:

```text
http://localhost:3001
```

---

## 💻 Frontend

O frontend foi desenvolvido utilizando **Next.js, React, TypeScript e Tailwind CSS**.

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Execute a aplicação:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:3000
```

---

## 🔐 Área administrativa

O projeto possui uma área administrativa protegida para gerenciamento dos produtos.

### Recursos

* Login
* Logout
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Alteração de usuário
* Alteração de senha

As credenciais e variáveis de ambiente **não são armazenadas no GitHub**.

---

## 🗄️ Banco de dados

O projeto utiliza **Prisma ORM** para gerenciamento da estrutura e comunicação com o banco de dados.

As migrations estão localizadas em:

```text
backend/prisma/migrations/
```

Para gerar o Prisma Client:

```bash
npx prisma generate
```

---

## 📱 Integração com WhatsApp

O AW Showcase possui integração com WhatsApp para facilitar o contato dos visitantes com a empresa.

A geração dos links é centralizada no utilitário:

```text
frontend/src/utils/whatsapp.ts
```

Isso permite reutilizar a mesma lógica em diferentes pontos da aplicação.

---

## 🖼️ Imagens

As imagens de produtos utilizadas como exemplo estão localizadas em:

```text
frontend/public/produtos/
```

Arquivos de ambiente, dependências e arquivos gerados pelo framework não são enviados ao repositório.

---

## 🎯 Objetivo do projeto

O AW Showcase foi desenvolvido como uma solução de **vitrine digital**, com foco em:

* ✨ Simplicidade
* 📱 Responsividade
* ⚡ Boa experiência do usuário
* 🧩 Organização do código
* 🔧 Facilidade de manutenção
* 📲 Integração com WhatsApp
* 🚀 Possibilidade de expansão futura

---

## 📌 Próximos passos

Possíveis evoluções do projeto:

* Deploy completo em produção
* Melhorias na experiência administrativa
* Otimizações de SEO
* Analytics
* Melhorias de performance
* Novas opções de gerenciamento de produtos
* Evolução da vitrine para novos modelos de negócio

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido por **AW TECHNOLOGY**.

### 🔗 Projeto

**AW Showcase**

Desenvolvido com ❤️ utilizando tecnologias modernas para aplicações web.
