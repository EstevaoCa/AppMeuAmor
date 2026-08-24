
/* ==================================================
   NOSSO CANTINHO ❤️
   APP.JS — CONTROLE GERAL DO APLICATIVO
================================================== */


/* ==================================================
   GARANTIR QUE O DOM ESTEJA CARREGADO
================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       ELEMENTOS PRINCIPAIS DAS TELAS
    ================================================== */

    const telaInicioApp =
        document.getElementById("telaInicioApp");

    const telaVideos =
        document.getElementById("telaVideos");

    const telaMusicas =
        document.getElementById("telaMusicas");

    const telaDiario =
        document.getElementById("telaDiario");

    const telaFotosApp =
        document.getElementById("telaFotosApp");


    /* ==================================================
       BOTÕES SUPERIORES
    ================================================== */

    const botaoInicio =
        document.getElementById("botaoInicio");

    const botaoSair =
        document.getElementById("botaoSair");

    const botaoMenu =
        document.getElementById("botaoMenu");


    /* ==================================================
       MENU SUPERIOR
    ================================================== */

    const menuSuperiorApp =
        document.getElementById("menuSuperiorApp");

    const botaoConfiguracoes =
        document.getElementById("botaoConfiguracoes");


    /* ==================================================
       PAINEL DE CONFIGURAÇÕES
    ================================================== */

    const painelConfiguracoes =
        document.getElementById("painelConfiguracoes");

    const botaoFecharConfiguracoes =
        document.getElementById(
            "botaoFecharConfiguracoes"
        );


    /* ==================================================
       MÚSICA
    ================================================== */

    const musicaApp =
        document.getElementById("musicaApp");

    const botaoMusicaApp =
        document.getElementById("botaoMusicaApp");


    /* ==================================================
       EDITOR DA HISTÓRIA
    ================================================== */

    const botaoEditarHistoria =
        document.getElementById(
            "botaoEditarHistoria"
        );

    const telaEditorHistoria =
        document.getElementById(
            "telaEditorHistoria"
        );

    const botaoVoltarEditorHistoria =
        document.getElementById(
            "botaoVoltarEditorHistoria"
        );

    const botaoCancelarEdicaoHistoria =
        document.getElementById(
            "botaoCancelarEdicaoHistoria"
        );
    
    const botaoPadraoHistoria =
        document.getElementById(
            "botaoPadraoHistoria"
        );


    /* ==================================================
       CARROSSEL DO EDITOR
    ================================================== */

    const carrosselEditorHistoria =
        document.getElementById(
            "carrosselEditorHistoria"
        );

    const indicadoresEditorHistoria =
        document.querySelectorAll(
            ".indicadorEditor"
        );


    /* ==================================================
       GARANTIR ENTRADA NA TELA INICIAL
    ================================================== */

    const parametrosApp =
        new URLSearchParams(
            window.location.search
        );

    if (
        parametrosApp.get("inicio") === "1"
    ) {

        if (telaInicioApp) {
            telaInicioApp.style.display = "flex";
        }

        if (telaVideos) {
            telaVideos.style.display = "none";
        }

        if (telaMusicas) {
            telaMusicas.style.display = "none";
        }

        if (telaDiario) {
            telaDiario.style.display = "none";
        }

        if (telaFotosApp) {
            telaFotosApp.style.display = "none";
        }

        if (telaEditorHistoria) {
            telaEditorHistoria.style.display = "none";
        }
    }


    /* ==================================================
       MOSTRAR BOTÃO DO MENU
    ================================================== */

    function mostrarBotoesSuperiores() {

        if (!botaoMenu) {
            return;
        }

        botaoMenu.style.display = "flex";
    }


    /* ==================================================
       ESCONDER BOTÃO DO MENU
    ================================================== */

    function esconderBotoesSuperiores() {

        if (botaoMenu) {
            botaoMenu.style.display = "none";
        }

        if (menuSuperiorApp) {
            menuSuperiorApp.classList.remove(
                "aberto"
            );
        }

        if (painelConfiguracoes) {
            painelConfiguracoes.classList.remove(
                "aberto"
            );
        }
    }


    /* ==================================================
       ☰ ABRIR / FECHAR MENU
    ================================================== */

    if (
        botaoMenu &&
        menuSuperiorApp
    ) {

        botaoMenu.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();

                menuSuperiorApp.classList.toggle(
                    "aberto"
                );
            }
        );
    }


    /* ==================================================
       ⚙️ ABRIR CONFIGURAÇÕES
    ================================================== */

    if (
        botaoConfiguracoes &&
        menuSuperiorApp &&
        painelConfiguracoes
    ) {

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
    }


    /* ==================================================
       FECHAR CONFIGURAÇÕES
    ================================================== */

    if (
        botaoFecharConfiguracoes &&
        painelConfiguracoes
    ) {

        botaoFecharConfiguracoes.addEventListener(
            "click",
            function () {

                painelConfiguracoes.classList.remove(
                    "aberto"
                );
            }
        );
    }


    /* ==================================================
       FECHAR MENU / CONFIGURAÇÕES AO CLICAR FORA
    ================================================== */

    document.addEventListener(
        "click",
        function (evento) {

            if (
                menuSuperiorApp &&
                botaoMenu &&
                menuSuperiorApp.classList.contains(
                    "aberto"
                ) &&
                !menuSuperiorApp.contains(
                    evento.target
                ) &&
                !botaoMenu.contains(
                    evento.target
                )
            ) {

                menuSuperiorApp.classList.remove(
                    "aberto"
                );
            }


            if (
                painelConfiguracoes &&
                botaoConfiguracoes &&
                painelConfiguracoes.classList.contains(
                    "aberto"
                ) &&
                !painelConfiguracoes.contains(
                    evento.target
                ) &&
                !botaoConfiguracoes.contains(
                    evento.target
                )
            ) {

                painelConfiguracoes.classList.remove(
                    "aberto"
                );
            }
        }
    );


    /* ==================================================
       🏠 VOLTAR PARA O INDEX PRINCIPAL
    ================================================== */

    if (botaoInicio) {

        botaoInicio.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";
            }
        );
    }


    /* ==================================================
       🚪 SAIR SOMENTE DO APP
    ================================================== */

    if (botaoSair) {

        botaoSair.addEventListener(
            "click",
            function () {

                const confirmar =
                    window.confirm(
                        "Deseja sair do nosso cantinho? ❤️"
                    );

                if (!confirmar) {
                    return;
                }

                window.location.href =
                    "about:blank";
            }
        );
    }


    /* ==================================================
       🎵 MÚSICA DE FUNDO
    ================================================== */

    const musicaAtiva =
        localStorage.getItem(
            "musicaAppAtiva"
        );


    /* ==================================================
       ATUALIZAR BOTÃO DA MÚSICA
    ================================================== */

    function atualizarBotaoMusica() {

        if (!botaoMusicaApp) {
            return;
        }

        const ativa =
            localStorage.getItem(
                "musicaAppAtiva"
            ) !== "false";


        if (ativa) {

            botaoMusicaApp.textContent =
                "ON";

            botaoMusicaApp.classList.add(
                "ativo"
            );

        } else {

            botaoMusicaApp.textContent =
                "OFF";

            botaoMusicaApp.classList.remove(
                "ativo"
            );
        }
    }


    /* ==================================================
       ESTADO INICIAL DA MÚSICA
    ================================================== */

    if (
        musicaAtiva === null
    ) {

        localStorage.setItem(
            "musicaAppAtiva",
            "true"
        );
    }


    atualizarBotaoMusica();


    /* ==================================================
       VOLUME
    ================================================== */

    if (musicaApp) {
        musicaApp.volume = 0.35;
    }


    /* ==================================================
       🎵 INICIAR MÚSICA
    ================================================== */

    function iniciarMusicaApp() {

        if (!musicaApp) {
            return;
        }

        musicaApp.play()
            .then(function () {

                console.log(
                    "Música do Nosso Cantinho iniciada ❤️"
                );

            })
            .catch(function () {

                console.log(
                    "O navegador bloqueou o início automático da música."
                );
            });
    }


    /* ==================================================
       🎵 ATIVAR / DESATIVAR MÚSICA
    ================================================== */

    if (botaoMusicaApp) {

        botaoMusicaApp.addEventListener(
            "click",
            function () {

                const estaAtiva =
                    localStorage.getItem(
                        "musicaAppAtiva"
                    ) !== "false";


                if (estaAtiva) {

                    if (musicaApp) {
                        musicaApp.pause();
                    }

                    localStorage.setItem(
                        "musicaAppAtiva",
                        "false"
                    );

                } else {

                    localStorage.setItem(
                        "musicaAppAtiva",
                        "true"
                    );

                    iniciarMusicaApp();
                }


                atualizarBotaoMusica();
            }
        );
    }


    /* ==================================================
       🎵 INICIAR MÚSICA AO ENTRAR NO APP
    ================================================== */

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


    /* ==================================================
       ✏️ ABRIR EDITOR DA HISTÓRIA
    ================================================== */

    if (
        botaoEditarHistoria &&
        telaEditorHistoria
    ) {

        botaoEditarHistoria.addEventListener(
            "click",
            function () {

                if (painelConfiguracoes) {
                    painelConfiguracoes.classList.remove(
                        "aberto"
                    );
                }

                if (menuSuperiorApp) {
                    menuSuperiorApp.classList.remove(
                        "aberto"
                    );
                }

                esconderBotoesSuperiores();


                if (telaInicioApp) {
                    telaInicioApp.style.display =
                        "none";
                }


                telaEditorHistoria.style.display =
                    "block";


                setTimeout(
                    iniciarEditorHistoria,
                    50
                );
            }
        );
    }


    /* ==================================================
       ❤️ FECHAR EDITOR DA HISTÓRIA
    ================================================== */

    function fecharEditorHistoria() {

        if (!telaEditorHistoria) {
            return;
        }

        telaEditorHistoria.style.display =
            "none";


        if (telaInicioApp) {
            telaInicioApp.style.display =
                "flex";
        }


        mostrarBotoesSuperiores();
    }

    /* ==================================================
    PADRÃO DA HISTÓRIA
    ================================================== */

    let valoresPadraoHistoria = [];


    function guardarValoresPadraoHistoria() {

        if (!telaEditorHistoria) {
            return;
        }

        const campos =
            telaEditorHistoria.querySelectorAll(
                "input, textarea"
            );

        valoresPadraoHistoria =
            Array.from(campos).map(
                function (campo) {

                    return {
                        elemento: campo,
                        valor: campo.value
                    };

                }
            );
    }
    guardarValoresPadraoHistoria();


    /* ==================================================
    RESTAURAR HISTÓRIA PARA O PADRÃO
    ================================================== */

    function restaurarPadraoHistoria() {

        if (!valoresPadraoHistoria.length) {
            return;
        }

        const confirmar =
            window.confirm(
                "Deseja voltar a história para o padrão? ❤️"
            );

        if (!confirmar) {
            return;
        }

        valoresPadraoHistoria.forEach(
            function (item) {

                item.elemento.value =
                    item.valor;

            }
        );

        localStorage.removeItem(
            "historiaPersonalizada"
        );
    }


    /* ==================================================
       BOTÃO VOLTAR DO EDITOR
    ================================================== */

    if (botaoVoltarEditorHistoria) {

        botaoVoltarEditorHistoria.addEventListener(
            "click",
            fecharEditorHistoria
        );
    }


    /* ==================================================
       BOTÃO CANCELAR DO EDITOR
    ================================================== */

    if (botaoCancelarEdicaoHistoria) {

        botaoCancelarEdicaoHistoria.addEventListener(
            "click",
            fecharEditorHistoria
        );
    }

    /* ==================================================
    BOTÃO PADRÃO DA HISTÓRIA
    ================================================== */

    if (botaoPadraoHistoria) {

        botaoPadraoHistoria.addEventListener(
            "click",
            function () {

                restaurarPadraoHistoria();

            }
        );
    }


    /* ==================================================
       ATUALIZAR INDICADOR DO CARROSSEL
    ================================================== */

    function atualizarIndicadorHistoria() {

        if (
            !carrosselEditorHistoria ||
            !indicadoresEditorHistoria.length
        ) {
            return;
        }


        const larguraTela =
            carrosselEditorHistoria.clientWidth;


        if (!larguraTela) {
            return;
        }


        const indice =
            Math.round(
                carrosselEditorHistoria.scrollLeft /
                larguraTela
            );


        indicadoresEditorHistoria.forEach(
            function (indicador, i) {

                indicador.classList.toggle(
                    "ativo",
                    i === indice
                );
            }
        );
    }


    /* ==================================================
       DETECTAR DESLIZE DO CARROSSEL
    ================================================== */

    if (carrosselEditorHistoria) {

        carrosselEditorHistoria.addEventListener(
            "scroll",
            atualizarIndicadorHistoria
        );
    }


    /* ==================================================
       CLICAR NOS INDICADORES
    ================================================== */

    indicadoresEditorHistoria.forEach(
        function (indicador) {

            indicador.addEventListener(
                "click",
                function () {

                    if (!carrosselEditorHistoria) {
                        return;
                    }


                    const indice =
                        Number(
                            indicador.dataset.tela
                        );


                    if (
                        Number.isNaN(indice)
                    ) {
                        return;
                    }


                    carrosselEditorHistoria.scrollTo({

                        left:
                            carrosselEditorHistoria.clientWidth *
                            indice,

                        behavior: "smooth"
                    });
                }
            );
        }
    );


    /* ==================================================
       GARANTIR PRIMEIRA TELA AO ABRIR
    ================================================== */

    function iniciarEditorHistoria() {

        if (!carrosselEditorHistoria) {
            return;
        }


        carrosselEditorHistoria.scrollTo({

            left: 0,

            behavior: "auto"
        });


        indicadoresEditorHistoria.forEach(
            function (indicador, indice) {

                indicador.classList.toggle(
                    "ativo",
                    indice === 0
                );
            }
        );
    }


    /* ==================================================
       AJUSTAR INDICADOR AO REDIMENSIONAR
    ================================================== */

    window.addEventListener(
        "resize",
        function () {

            atualizarIndicadorHistoria();
        }
    );


    /* ==================================================
       DISPONIBILIZAR FUNÇÕES PRINCIPAIS
       PARA OUTROS SCRIPTS
    ================================================== */

    window.mostrarBotoesSuperiores =
        mostrarBotoesSuperiores;

    window.esconderBotoesSuperiores =
        esconderBotoesSuperiores;

    window.iniciarMusicaApp =
        iniciarMusicaApp;

    window.fecharEditorHistoria =
        fecharEditorHistoria;

    window.iniciarEditorHistoria =
        iniciarEditorHistoria;


    /* ==================================================
       ESTADO INICIAL
    ================================================== */

    mostrarBotoesSuperiores();

    atualizarIndicadorHistoria();


    console.log(
        "Nosso Cantinho carregado corretamente ❤️"
    );

});

