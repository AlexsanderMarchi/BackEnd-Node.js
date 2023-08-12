const express = require("express");
const bodyParser = require("body-parser");
port = 3000;
const cardapioRoutes = require("./routes/cervejas");
const database = require("./config/database");


const app = express()
app.use(bodyParser.json())




//cadastrando as rotas
app.use("/", cardapioRoutes)


database.connect((erro) => {
    if(erro) {
        return console.log("Não foi possivel se conectar com o elephantSQL");


    }else{
        return console.log("conectado ao elephantSQL")
    }
})




app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})
