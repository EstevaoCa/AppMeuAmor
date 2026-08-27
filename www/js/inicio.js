/* =========================
    ELEMENTOS DAS TELAS
========================= */

const telaSuspense =
    document.getElementById("telaSuspense");

const musicaFundo =
    document.getElementById("musicaFundo");

musicaFundo.volume = 0.6;

const botaoIniciar =
    document.getElementById("botaoIniciar");

const frase =
    document.getElementById("frase");

const botaoComecar =
    document.getElementById("botaoComecar");

const botaoEntrarDireto =
    document.getElementById(
        "botaoEntrarDireto"
    );

const botaoContinuarHistoria =
    document.getElementById(
        "botaoContinuarHistoria"
    );

const imagemBotaoApp =
    document.getElementById(
        "imagemBotaoApp"
    );

const efeitoBotaoApp =
    document.getElementById(
        "efeitoBotaoApp"
    );

/* =========================
   BOTÕES DE RETORNO
========================= */

botaoEntrarDireto.style.display =
    "none";

botaoContinuarHistoria.style.display =
    "none";

const particulas =
    document.getElementById("particulas");

const telaFoto =
    document.getElementById("telaFoto");

const botaoContinuar =
    document.getElementById("botaoContinuar");

const telaMemoria =
    document.getElementById("telaMemoria");

const botaoMemoria =
    document.getElementById("botaoMemoria");

const telaVideo =
    document.getElementById("telaVideo");

const telaAmor =
    document.getElementById("telaAmor");

/* =========================
    TELA 5
========================= */

const telaFotos =
    document.getElementById("telaFotos");

const fotosTela5 =
    document.querySelectorAll(
        ".fotosTela5 img"
    );


/* =========================
    FRASES
========================= */

const frases = [

    "Eu preparei uma coisa muito especial para você...",

    "Mas antes de começar...",

    "Quero que você se lembre de uma coisa: nossa história é única. ❤️"

];


let indiceFrase = 0;


/* =========================
   INÍCIO DA EXPERIÊNCIA
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =========================
           GARANTIR TELA INICIAL
        ========================= */

        telaSuspense.classList.add(
            "ativa"
        );


        /* =========================
           GARANTIR BOTÃO COMEÇAR
           ESCONDIDO NO INÍCIO
        ========================= */

        botaoComecar.classList.remove(
            "visivel"
        );


        /* =========================
           GARANTIR BOTÃO INICIAR
           VISÍVEL
        ========================= */

        botaoIniciar.classList.remove(
            "sumir"
        );


        /* =========================
           GARANTIR FRASE LIMPA
        ========================= */

        frase.textContent = "";

        frase.classList.remove(
            "aparecer"
        );

        frase.classList.remove(
            "sumir"
        );


        /* =========================
           GARANTIR TELAS SEGUINTES
           ESCONDIDAS
        ========================= */

        telaFoto.classList.remove(
            "ativa"
        );

        telaMemoria.classList.remove(
            "ativa"
        );

        telaMemoria.classList.remove(
            "mostrarFoto"
        );

        telaVideo.classList.remove(
            "ativa"
        );

        telaFotos.classList.remove(
            "ativa"
        );


        /* =========================
           GARANTIR FOTOS DA TELA 5
           ESCONDIDAS
        ========================= */

        fotosTela5.forEach(
            foto => {

                foto.classList.remove(
                    "ativa"
                );

            }
        );

    }
);


/* =========================
   ENTRAR NO APP
========================= */

botaoEntrarDireto.addEventListener(
    "click",
    function () {

        sessionStorage.setItem(
            "iniciarMusicaApp",
            "true"
        );

        window.location.href =
            "../nosso-cantinho/index.html?inicio=1";

    }
);
/* =========================
   CONTINUAR HISTÓRIA
========================= */

botaoContinuarHistoria.addEventListener(
    "click",
    function () {

        botaoComecar.click();

    }
);

function voltarParaInicio() {

    telaSuspense.classList.add("ativa");

    telaFoto.classList.remove("ativa");

    telaMemoria.classList.remove("ativa");
    telaMemoria.classList.remove("mostrarFoto");

    telaVideo.classList.remove("ativa");

    telaFotos.classList.remove("ativa");

    telaAmor.classList.remove("ativa");

    botaoComecar.classList.remove("visivel");

    botaoIniciar.classList.remove("sumir");

    frase.textContent = "";

    frase.classList.remove("aparecer");
    frase.classList.remove("sumir");

    window.scrollTo(0, 0);

}