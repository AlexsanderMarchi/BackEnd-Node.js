const express = require('express');
const router = express.Router();
const herois = require('../models/herois');

exports.novoHeroi = (req, res) => {
    const heroi = req.body;
    herois.push(heroi);
    console.log(herois);
    res.status(201).send({message:'Heroi criado com sucesso', herois});
};
