const prisma = require('../config/prisma');


// Listar categorias
const listarCategorias = async (req, res) => {
  try {

    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nome: 'asc'
      }
    });

    return res.status(200).json(categorias);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      erro: 'Erro ao listar categorias.'
    });

  }
};


// Criar categoria
const criarCategoria = async (req, res) => {

  try {

    const { nome } = req.body;


    if (!nome) {
      return res.status(400).json({
        erro: 'Nome da categoria é obrigatório.'
      });
    }


    const categoria = await prisma.categoria.create({
      data: {
        nome
      }
    });


    return res.status(201).json(categoria);


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      erro: 'Erro ao criar categoria.'
    });

  }

};


module.exports = {
  listarCategorias,
  criarCategoria
};