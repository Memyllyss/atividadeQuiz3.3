function proximaPagina() {

    let pagina = window.location.pathname;

    if (pagina.includes("pag1.html")) {
        window.location.href = "pag2.html";
    }
    else if (pagina.includes("pag2.html")) {
        window.location.href = "pag3.html";
    }
    else if (pagina.includes("pag3.html")) {
        window.location.href = "pag4.html";
    }
    else if (pagina.includes("pag4.html")) {
        window.location.href = "pag5.html";
    }
    else if (pagina.includes("pag5.html")) {
        window.location.href = "pag6.html";
    }
    else if (pagina.includes("pag6.html")) {
        window.location.href = "pag7.html";
    }
    else if (pagina.includes("pag7.html")) {
        window.location.href = "pag8.html";
    }
    else if (pagina.includes("pag8.html")) {
        window.location.href = "resultado.html";
    }

}