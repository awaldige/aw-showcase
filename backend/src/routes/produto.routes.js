
const express = require("express");
const router = express.Router();

const {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} = require("../controllers/produto.controller");

const upload = require("../config/upload");

// Listar produtos
router.get("/", listarProdutos);

// Buscar produto por ID
router.get("/:id", buscarProdutoPorId);

// Criar produto com imagem
router.post("/", upload.single("imagem"), criarProduto);

// Atualizar produto
router.put("/:id", upload.single("imagem"), atualizarProduto);

// Excluir produto
router.delete("/:id", excluirProduto);

module.exports = router;
