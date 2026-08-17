
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




/* =========================
   MENU SUPERIOR
========================= */

const botaoMenu =
    document.getElementById(
        "botaoMenu"
    );

const menuSuperiorApp =
    document.getElementById(
        "menuSuperiorApp"
    );

const botaoConfiguracoes =
    document.getElementById(
        "botaoConfiguracoes"
    );

const painelConfiguracoes =
    document.getElementById(
        "painelConfiguracoes"
    );

const botaoFecharConfiguracoes =
    document.getElementById(
        "botaoFecharConfiguracoes"
    );

const botaoMusicaApp =
    document.getElementById(
        "botaoMusicaApp"
    );


function mostrarBotoesSuperiores() {

    botaoMenu.style.display =
        "block";

}


function esconderBotoesSuperiores() {

    botaoMenu.style.display =
        "none";

    menuSuperiorApp.classList.remove(
        "aberto"
    );

    painelConfiguracoes.classList.remove(
        "aberto"
    );

}

/* =========================
   ☰ ABRIR / FECHAR MENU
========================= */

botaoMenu.addEventListener(
    "click",
    function () {

        menuSuperiorApp.classList.toggle(
            "aberto"
        );

    }
);


/* =========================
   ⚙️ CONFIGURAÇÕES
========================= */

botaoConfiguracoes.addEventListener(
    "click",
    function () {

        menuSuperiorApp.classList.remove(
            "aberto"
        );

        painelConfiguracoes.classList.add(
            "aberto"
        );

    }
);


/* =========================
   FECHAR CONFIGURAÇÕES
========================= */

botaoFecharConfiguracoes.addEventListener(
    "click",
    function () {

        painelConfiguracoes.classList.remove(
            "aberto"
        );

    }
);

/* =========================
   FECHAR AO CLICAR FORA
========================= */

document.addEventListener(
    "click",
    function (evento) {

        if (
            menuSuperiorApp.classList.contains("aberto") &&
            !menuSuperiorApp.contains(evento.target) &&
            !botaoMenu.contains(evento.target)
        ) {

            menuSuperiorApp.classList.remove(
                "aberto"
            );

        }


        if (
            painelConfiguracoes.classList.contains("aberto") &&
            !painelConfiguracoes.contains(evento.target) &&
            !botaoConfiguracoes.contains(evento.target)
        ) {

            painelConfiguracoes.classList.remove(
                "aberto"
            );

        }

    }
);

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

const musicaAtiva =
    localStorage.getItem(
        "musicaAppAtiva"
    );


if (
    musicaAtiva === "false"
) {

    botaoMusicaApp.textContent =
        "OFF";

    botaoMusicaApp.classList.remove(
        "ativo"
    );

}

/* =========================
   🎵 ATIVAR / DESATIVAR MÚSICA
========================= */

botaoMusicaApp.addEventListener(
    "click",
    function () {

        const estaAtiva =
            localStorage.getItem(
                "musicaAppAtiva"
            ) !== "false";


        if (estaAtiva) {

            musicaApp.pause();

            localStorage.setItem(
                "musicaAppAtiva",
                "false"
            );

            botaoMusicaApp.textContent =
                "OFF";

            botaoMusicaApp.classList.remove(
                "ativo"
            );

        } else {

            localStorage.setItem(
                "musicaAppAtiva",
                "true"
            );

            botaoMusicaApp.textContent =
                "ON";

            botaoMusicaApp.classList.add(
                "ativo"
            );

            iniciarMusicaApp();

        }

    }
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
    ) === "true" &&
    localStorage.getItem(
        "musicaAppAtiva"
    ) !== "false"
) {

    iniciarMusicaApp();

    sessionStorage.removeItem(
        "iniciarMusicaApp"
    );

}