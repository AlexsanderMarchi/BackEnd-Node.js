const express = require('express');
const router = express.Router();
const viloes = require('../models/viloes');

exports.novoVilao = (req, res) => {
    const vilao = req.body;
    viloes.push(vilao);
    console.log(viloes);
    res.status(201).send({message:'vilao criado com sucesso', viloes});
};
