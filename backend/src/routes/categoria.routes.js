const express = require('express');
const router = express.Router();

const {
  listarCategorias,
  criarCategoria
} = require('../controllers/categoria.controller');


router.get('/', listarCategorias);

router.post('/', criarCategoria);


module.exports = router;