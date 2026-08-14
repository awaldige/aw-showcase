const prisma = require("../config/prisma");

// =========================
// LISTAR PRODUTOS
// =========================
const listarProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);

    return res.status(500).json({
      erro: "Erro ao listar produtos.",
    });
  }
};

// =========================
// BUSCAR PRODUTO POR ID
// =========================
const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const produtoId = Number(id);

    if (!Number.isInteger(produtoId)) {
      return res.status(400).json({
        erro: "ID do produto inválido.",
      });
    }

    const produto = await prisma.produto.findUnique({
      where: {
        id: produtoId,
      },

      include: {
        categoria: true,
      },
    });

    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado.",
      });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);

    return res.status(500).json({
      erro: "Erro ao buscar produto.",
    });
  }
};

// =========================
// CRIAR PRODUTO
// =========================
const criarProduto = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      categoriaId,
      destaque,
      ativo,
    } = req.body;

    // =========================
    // VALIDAÇÕES
    // =========================

    if (!nome || !nome.trim()) {
      return res.status(400).json({
        erro: "O nome do produto é obrigatório.",
      });
    }

    if (
      preco === undefined ||
      preco === null ||
      preco === ""
    ) {
      return res.status(400).json({
        erro: "O preço do produto é obrigatório.",
      });
    }

    const precoNumerico = Number(
      String(preco).replace(",", ".")
    );

    if (
      Number.isNaN(precoNumerico) ||
      precoNumerico < 0
    ) {
      return res.status(400).json({
        erro: "Preço do produto inválido.",
      });
    }

    if (!categoriaId) {
      return res.status(400).json({
        erro: "A categoria do produto é obrigatória.",
      });
    }

    const categoriaNumerica = Number(categoriaId);

    if (!Number.isInteger(categoriaNumerica)) {
      return res.status(400).json({
        erro: "Categoria inválida.",
      });
    }

    // =========================
    // CONVERTER BOOLEANOS
    // =========================

    const destaqueBoolean =
      destaque === true ||
      destaque === "true";

    const ativoBoolean =
      ativo === undefined
        ? true
        : ativo === true ||
          ativo === "true";

    // =========================
    // IMAGEM
    // =========================

    const imagem = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    // =========================
    // CRIAR PRODUTO
    // =========================

    const produto = await prisma.produto.create({
      data: {
        nome: nome.trim(),

        descricao:
          descricao && descricao.trim()
            ? descricao.trim()
            : null,

        preco: precoNumerico,

        imagem,

        categoriaId: categoriaNumerica,

        destaque: destaqueBoolean,

        ativo: ativoBoolean,
      },

      include: {
        categoria: true,
      },
    });

    console.log(
      "Produto criado:",
      produto.nome,
      "| destaque:",
      produto.destaque,
      "| ativo:",
      produto.ativo
    );

    return res.status(201).json(produto);
  } catch (error) {
    console.error(
      "Erro ao criar produto:",
      error
    );

    return res.status(500).json({
      erro: "Erro ao criar produto.",
    });
  }
};

// =========================
// ATUALIZAR PRODUTO
// =========================
const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produtoId = Number(id);

    if (!Number.isInteger(produtoId)) {
      return res.status(400).json({
        erro: "ID do produto inválido.",
      });
    }

    const {
      nome,
      descricao,
      preco,
      categoriaId,
      destaque,
      ativo,
    } = req.body;

    // =========================
    // VERIFICAR PRODUTO
    // =========================

    const produtoAtual =
      await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
      });

    if (!produtoAtual) {
      return res.status(404).json({
        erro: "Produto não encontrado.",
      });
    }

    // =========================
    // VALIDAÇÕES
    // =========================

    if (!nome || !nome.trim()) {
      return res.status(400).json({
        erro: "O nome do produto é obrigatório.",
      });
    }

    if (
      preco === undefined ||
      preco === null ||
      preco === ""
    ) {
      return res.status(400).json({
        erro: "O preço do produto é obrigatório.",
      });
    }

    const precoNumerico = Number(
      String(preco).replace(",", ".")
    );

    if (
      Number.isNaN(precoNumerico) ||
      precoNumerico < 0
    ) {
      return res.status(400).json({
        erro: "Preço do produto inválido.",
      });
    }

    if (!categoriaId) {
      return res.status(400).json({
        erro: "A categoria do produto é obrigatória.",
      });
    }

    const categoriaNumerica = Number(categoriaId);

    if (!Number.isInteger(categoriaNumerica)) {
      return res.status(400).json({
        erro: "Categoria inválida.",
      });
    }

    // =========================
    // CONVERTER BOOLEANOS
    // =========================

    const destaqueBoolean =
      destaque === true ||
      destaque === "true";

    const ativoBoolean =
      ativo === undefined
        ? produtoAtual.ativo
        : ativo === true ||
          ativo === "true";

    // =========================
    // IMAGEM
    // =========================

    const imagem = req.file
      ? `/uploads/${req.file.filename}`
      : produtoAtual.imagem;

    // =========================
    // ATUALIZAR
    // =========================

    const produto = await prisma.produto.update({
      where: {
        id: produtoId,
      },

      data: {
        nome: nome.trim(),

        descricao:
          descricao && descricao.trim()
            ? descricao.trim()
            : null,

        preco: precoNumerico,

        imagem,

        categoriaId: categoriaNumerica,

        destaque: destaqueBoolean,

        ativo: ativoBoolean,
      },

      include: {
        categoria: true,
      },
    });

    console.log(
      "Produto atualizado:",
      produto.nome,
      "| destaque:",
      produto.destaque,
      "| ativo:",
      produto.ativo
    );

    return res.status(200).json(produto);
  } catch (error) {
    console.error(
      "Erro ao atualizar produto:",
      error
    );

    return res.status(500).json({
      erro: "Erro ao atualizar produto.",
    });
  }
};

// =========================
// EXCLUIR PRODUTO
// =========================
const excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produtoId = Number(id);

    if (!Number.isInteger(produtoId)) {
      return res.status(400).json({
        erro: "ID do produto inválido.",
      });
    }

    // =========================
    // VERIFICAR PRODUTO
    // =========================

    const produto = await prisma.produto.findUnique({
      where: {
        id: produtoId,
      },
    });

    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado.",
      });
    }

    // =========================
    // EXCLUIR PRODUTO
    // =========================

    await prisma.produto.delete({
      where: {
        id: produtoId,
      },
    });

    return res.status(200).json({
      mensagem: "Produto excluído com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao excluir produto:",
      error
    );

    return res.status(500).json({
      erro: "Erro ao excluir produto.",
    });
  }
};

// =========================
// EXPORTAR CONTROLLERS
// =========================

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
};