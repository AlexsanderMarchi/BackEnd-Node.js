const express = require('express');
const router = express.Router();
const cervejas = require('../models/cervejas');
const database = require('../config/database')


exports.cardapio = (req, res) => {
    database.query("SELECT * FROM cardapio").then(
        (resultado) => {
            res.status(200).send({ produtos: resultado.rows })
        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )
    //res.status(201).send({message:'Cervejas disponiveis', cervejas});
};




//A) e E) Busca pelo nome e ja busca parcialmente pelo include


exports.nome = (req, res) => {
    const nomeLimpo = req.params.nome.toLowerCase();
    database.query("SELECT * FROM cardapio").then(
        (resultado) => {
            const nomeCerveja = resultado.rows.filter((cerveja) =>
                cerveja.nome.toLowerCase().includes(nomeLimpo)
            );
            res.status(200).send({ nomeCerveja });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        }
    );
};




//B) Busca pela nacionalidade


exports.nacionalidade = (req, res) => {
    const nacionalidadeLimpo = req.params.nacionalidade.toLowerCase();
    database.query("SELECT * FROM cardapio").then(
        (resultado) => {
            const nacionalidadeCerveja = resultado.rows.filter((cerveja) =>
                cerveja.nacionalidade.toLowerCase().includes(nacionalidadeLimpo)
            );
            res.status(200).send({ nacionalidadeCerveja });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        }
    );
};






//C) Ordena pelo maior teor Alcoolico


exports.maiorAbv = (req, res) => {
    database.query("SELECT * FROM cardapio ORDER BY abv DESC").then(
        (resultado) => {
            res.status(200).send( resultado.rows);
        },
        (erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        }
    );
};




//D) Busca pelo Tipo


exports.tipo = (req, res) => {
    const tipoLimpo = req.params.tipo.toLowerCase();
    database.query("SELECT * FROM cardapio").then(
        (resultado) => {
            const tipoCerveja = resultado.rows.filter((cerveja) =>
                cerveja.tipo.toLowerCase().includes(tipoLimpo)
            );
            res.status(200).send({ tipoCerveja });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        }
    );
};
