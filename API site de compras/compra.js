const express = require('express');
const app = express();
const port = 3000;


const compras = [
    { id: 1, descricao: 'Playstation 5', preco: 5000.00 },
    { id: 2, descricao: 'Camisa do grêmio', preco: 250.99 },
    { id: 3, descricao: 'Coxinha do Araujo', preco: 7.65 },
    { id: 4, descricao: 'Max Steel', preco: 49.99 },
    { id: 5, descricao: 'Boneco Pokémon', preco: 80.00 },
    { id: 6, descricao: 'Yu-Gi-Oh', preco: 20.45 },
]




const bodyParser = require('body-parser');
app.use(bodyParser.json());


//Método HTTP para buscar dados
app.get('/Compras', (req, res) => {
    // const listaCompras = compras.map((compra) => compra.descricao);
    // res.status(200).send({ listaCompras });

    res.status(200).send(compras);
})



//Método HTTP para cadastrar um novo dado
app.post("/cadastrar-compra", (req, res) => {
    // controleDeId++;
    // const body = req.body;
    // const descricaoNova = body.descricao;
    // const precoNovo = body.preco;
    // const idNovo = controleDeId;
    // const novaCompra = {
    //     descricao: descricaoNova,
    //     preco: precoNovo,
    //     id: idNovo
    // }

    // Adicionar novo item ao array
    const novaCompra = req.body;
    compras.push(novaCompra);
    // Dar a resposta ao usuario
    res.status(200).send({
        message: "Compra cadastrada",
        compras: compras
    })
})

//Método HTTP para excluir um dado ja existente
app.delete("/deletar/:id", (req,res) => {
    const idParaExcluir = req.params.id;

    // Descobrir a posição/indice do elemento que vai ser excluido do Array
    const indiceDoElemento = compras.findIndex(compra => {
           return compra.id == idParaExcluir;
    })

    // Excluir o elemento com base no indice encontrado
    // Array.splice("indice", "quantidade de elementos a serem excluidos")
    compras.splice(indiceDoElemento, 1)

    res.status(200).send({
        message: "Item excluido com sucesso",
        compras: compras
    })
})


app.get('/Valor-total', (req, res) => {
    const valortotal = compras.reduce((callBack,vtotal) => callBack+vtotal.preco,0);
    res.status(200).send({ valortotal });
})


app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`);
})
