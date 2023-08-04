const http = require('http');
const host = 'localhost';
const port = 3000;
const partidas = [
    { id: 1, partida: 'Grêmio x Inter' },
    { id: 2, partida: 'Flamengo x Vasco' },
    { id: 3, partida: 'Inter x Avaí' },
    { id: 4, partida: 'Flamengo x Grêmio' },
    { id: 5, partida: 'Real Madrid x Grêmio' },
    { id: 6, partida: 'Barcelona x Inter' }
]






//Escutando as requisições
const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'application/json') //o webserver entende que o tipo de dado q vai retornar será json
    const url = decodeURI(req.url);


    if(url == '/partidas'){
        res.writeHead(200);
        res.end(JSON.stringify( partidas ));
    }else{
        const nomeDoTime = url.replace('/', '');
        const partidasDoTime = partidas.filter((partida) => partida.partida.includes(nomeDoTime));
        console.log(url)     // pelo terminal irá saber oq o usúario pesquisou
        res.writeHead(200);
        res.end(JSON.stringify( partidasDoTime ));
    }
};


//Criando servidor
const server = http.createServer(requestListener);


//Iniciando servidor
server.listen(port, host, () => {
    console.log(`Server disponivel na porta: ${port}`);
})
