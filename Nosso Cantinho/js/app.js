
/* =========================
   TESTE DO ARMAZENAMENTO
========================= */

window.salvarArquivo =
    salvarArquivo;

window.buscarArquivos =
    buscarArquivos;

window.buscarArquivo =
    buscarArquivo;

window.excluirArquivo =
    excluirArquivo;

/* =========================
   GARANTIR ENTRADA NA TELA INICIAL
========================= */

const parametrosApp =
    new URLSearchParams(
        window.location.search
    );


if (
    parametrosApp.get("inicio") === "1"
) {

    telaInicioApp.style.display =
        "flex";

    telaVideos.style.display =
        "none";

    telaMusicas.style.display =
        "none";

    telaDiario.style.display =
        "none";

    telaFotosApp.style.display =
        "none";

}

/* =========================
   BOTÕES SUPERIORES DO APP
========================= */

const botaoInicio =
    document.getElementById(
        "botaoInicio"
    );

const botaoSair =
    document.getElementById(
        "botaoSair"
    );

function mostrarBotoesSuperiores() {

    botaoInicio.style.display =
        "block";

    botaoSair.style.display =
        "block";

}


function esconderBotoesSuperiores() {

    botaoInicio.style.display =
        "none";

    botaoSair.style.display =
        "none";

}


/* =========================
   🏠 VOLTAR PARA O INDEX PRINCIPAL
========================= */

botaoInicio.addEventListener(
    "click",
    function () {

        window.location.href =
            "../index.html";

    }
);


/* =========================
   🚪 SAIR SOMENTE DO APP
========================= */

botaoSair.addEventListener(
    "click",
    function () {

        const confirmar =
            confirm(
                "Deseja sair do nosso cantinho? ❤️"
            );


        if (!confirmar) {

            return;

        }


        window.location.href =
            "about:blank";

    }
);

/* =========================
   MÚSICA DE FUNDO DO APP ❤️
========================= */

const musicaApp =
    document.getElementById(
        "musicaApp"
    );


/* =========================
   VOLUME
========================= */

musicaApp.volume = 0.35;


/* =========================
   INICIAR MÚSICA
========================= */

function iniciarMusicaApp() {

    if (!musicaApp) {

        return;

    }


    musicaApp.play()
        .then(
            function () {

                console.log(
                    "Música do Nosso Cantinho iniciada ❤️"
                );

            }
        )
        .catch(
            function (erro) {

                console.log(
                    "O navegador bloqueou o início automático da música."
                );

            }
        );

}


/* =========================
   INICIAR MÚSICA AO ENTRAR NO APP
========================= */

if (
    sessionStorage.getItem(
        "iniciarMusicaApp"
    ) === "true"
) {

    iniciarMusicaApp();

    sessionStorage.removeItem(
        "iniciarMusicaApp"
    );

}