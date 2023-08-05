const express = require('express');
const app = express();
const port = 3000;

//conectando ao Banco de dados SQL
const pg = require("pg");
const database = new pg.Client("COLOQUE A URL AQUI")

database.connect((erro) => {
    if (erro) {
        return console.log("não foi possivel se conectar com o ElephantSQL", erro)
    } else {
        return console.log("Conectado ao ElephantSQL!")
    }
})



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



app.post("/tabela", (req, res) => {
    // Comando SQL para criar a tabela
    const createTableQuery = `
    CREATE TABLE clientes (
    id NUMERIC(2) PRIMARY KEY,
    descricao VARCHAR(255),
    preco NUMERIC(6)
    )
    `;
    // Conectar ao banco de dados e criar a tabela
    database.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
        } else {
            console.log('Tabela criada com sucesso!');
        }

        // Fechar a conexão com o banco de dados
        database.end();
    });
    res.status(200).send({
        message: "tabela criado com sucesso",
    })
})


//Método HTTP para buscar dados
app.get('/compras', (req, res) => {
    // const listaCompras = compras.map((compra) => compra.descricao);
    // res.status(200).send({ listaCompras });
    database.query("SELECT * FROM clientes").then(
        (resultado) => {
            res.status(200).send({ produtos: resultado.rows })
        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )

    //res.status(200).send(compras);
})



//Método HTTP para cadastrar um novo dado
app.post("/cadastrar", (req, res) => {
    
    //Values precisa ser $1, $2 ... equivale a posicao com os de baixo
    const query = "INSERT INTO clientes(id, descricao, preco) VALUES ($1, $2, $3);"
    const values = [req.body.id, req.body.descricao, req.body.preco]

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "produto cadastrado com sucesso!" })
            
        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )
    
    //METODO SEM INTEGRAÇAO COM SQL
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
    // const novaCompra = req.body;
    // compras.push(novaCompra);
    // // Dar a resposta ao usuario
    // res.status(200).send({
    //     message: "Compra cadastrada",
    //     compras: compras
    // })
})

//Método HTTP para excluir um dado ja existente
app.delete("/deletar/:id", (req, res) => {

    const query = "DELETE FROM clientes WHERE id=$1;"
    const values = [req.params.id]

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "produto removido com sucesso!" })
            
        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )


    //METODO SEM INTEGRAÇAO COM SQL
    // const idParaExcluir = req.params.id;
    // // Descobrir a posição/indice do elemento que vai ser excluido do Array
    // const indiceDoElemento = compras.findIndex(compra => {
    //     return compra.id == idParaExcluir;
    // })
    // // Excluir o elemento com base no indice encontrado
    // // Array.splice("indice", "quantidade de elementos a serem excluidos")
    // compras.splice(indiceDoElemento, 1)
    // res.status(200).send({
    //     message: "Item excluido com sucesso",
    //     compras: compras
    // })
})



app.get('/valor-total', (req, res) => {
    database.query("SELECT * FROM clientes")
      .then((resultado) => {
        const valorTotal = resultado.rows.reduce((acumulador, cliente) => acumulador + parseInt(cliente.preco), 0);
        res.status(200).send({ valorTotal: valorTotal });
      })
      .catch((erro) => {
        res.status(500).send({ erro: erro });
        console.log(erro);
      });
  });
  


app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`);
})
