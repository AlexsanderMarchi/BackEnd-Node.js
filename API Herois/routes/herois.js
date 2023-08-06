const express = require('express');
const router = express.Router(); //permite ter acesso aos métodos http
const controller = require('./../controllers/herois');

router.post('/cadastrar', controller.novoHeroi);
//router.get('/', controller.verHerois);

module.exports = router;
