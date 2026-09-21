function responder(botao) {

    let pontosResposta = JSON.parse(botao.dataset.pontos);
    let pontos = JSON.parse(sessionStorage.getItem("quizPontos"));

    if (pontos == null) {
        pontos = {};
    }

    for (let princesa in pontosResposta) {

        if (pontos[princesa]) {
            pontos[princesa] += pontosResposta[princesa];
        } else {
            pontos[princesa] = pontosResposta[princesa];
        }

    }
    sessionStorage.setItem("quizPontos", JSON.stringify(pontos));
    proximaPagina();
}