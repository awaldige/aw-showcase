
const express = require("express");
const cors = require("cors");
const path = require("path");

const statusRoutes = require("./routes/status.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const produtoRoutes = require("./routes/produto.routes");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// SERVIR IMAGENS DOS PRODUTOS
// =====================================================

// A pasta uploads fica na raiz do backend:
// backend/uploads
const uploadsPath = path.join(process.cwd(), "uploads");

console.log("📁 Pasta de uploads:", uploadsPath);

// Permite acessar:
// http://localhost:3001/uploads/nome-da-imagem.jpg
app.use("/uploads", express.static(uploadsPath));

// =====================================================
// ROTAS DA API
// =====================================================

app.use("/api", statusRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);

module.exports = app;

