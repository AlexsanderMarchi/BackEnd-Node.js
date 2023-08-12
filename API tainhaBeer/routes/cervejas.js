const express = require('express');
const router = express.Router();
const controller = require('./../controllers/cervejas');


router.get('/cardapio', controller.cardapio);
router.get('/maior-abv', controller.maiorAbv);
router.get('/nome/:nome', controller.nome);
router.get('/nacionalidade/:nacionalidade', controller.nacionalidade);
router.get('/tipo/:tipo', controller.tipo);


module.exports = router;
