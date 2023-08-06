const herois = require('./../models/herois')
const viloes = require('./../models/viloes')

exports.batalhar = (req, res) => {
    const { idHeroi, idVilao } = req.body
    const heroi = herois.find((heroi) => heroi.id === idHeroi)
    const vilao = viloes.find((vilao) => vilao.id === idVilao)

    let resultado = null

    if (vilao.poder === heroi.poder) {
        resultado = { mensagem: 'Empate!' }
    } else if (vilao.poder > heroi.poder) {
        resultado = { mensagem: `${vilao.nome} venceu ${heroi.nome}` }
    } else {
        resultado = { mensagem: `${heroi.nome} venceu ${vilao.nome}` }
    }

    res.status(200).send(resultado)
}