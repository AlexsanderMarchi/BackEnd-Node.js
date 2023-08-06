const express = require("express");
const bodyParser = require("body-parser");
port = 3000;
const heroiRoutes = require("./routes/herois");
const vilaoRoutes = require("./routes/viloes");
const batalhaRoutes = require("./routes/batalha")


const app = express()
app.use(bodyParser.json())  //sem isso, não da pra mandar requisição em json para a API


//cadastrando as rotas
app.use("/herois", heroiRoutes)
app.use("/viloes", vilaoRoutes)
app.use("/batalha", batalhaRoutes)


app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})
