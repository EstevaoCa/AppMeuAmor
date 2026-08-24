
/* =========================
    MOSTRAR FRASE
========================= */

function mostrarFrase() {

    frase.textContent =
        frases[indiceFrase];

    frase.classList.remove(
        "sumir"
    );

    if (imagemBotaoApp) {
        imagemBotaoApp.classList.remove(
            "aparecer"
        );
    }

    if (efeitoBotaoApp) {
        efeitoBotaoApp.classList.remove(
            "aparecer"
        );
    }

    frase.classList.add(
        "aparecer"
    );


    setTimeout(() => {

        frase.classList.remove(
            "aparecer"
        );

        frase.classList.add(
            "sumir"
        );


        setTimeout(() => {

            indiceFrase++;


            if (
                indiceFrase <
                frases.length
            ) {

                mostrarFrase();

            } else {

                mostrarBotao();

            }

        }, 2000);

    }, 4000);

}


/* =========================
   MOSTRAR BOTÃO E IMAGEM
========================= */

function mostrarBotao() {

    botaoComecar.classList.add(
        "visivel"
    );

    if (imagemBotaoApp) {

        imagemBotaoApp.classList.add(
            "aparecer"
        );

    }

    const efeitoBotaoApp =
        document.getElementById(
            "efeitoBotaoApp"
        );

    if (efeitoBotaoApp) {

        efeitoBotaoApp.classList.add(
            "aparecer"
        );

    }
}

/* =========================
    INICIAR EXPERIÊNCIA
========================= */

botaoIniciar.addEventListener(
    "click",
    function () {

        /* =========================
            VERIFICAR SE JÁ ASSISTIU
            ========================= */

            const historiaAssistida =
                localStorage.getItem(
                    "historiaAssistida"
                );


            if (historiaAssistida === "true") {

                botaoComecar.style.display =
                    "none";

                botaoEntrarDireto.style.display =
                    "block";

                botaoContinuarHistoria.style.display =
                    "block";

            } else {

                botaoComecar.style.display =
                    "block";

                botaoEntrarDireto.style.display =
                    "none";

                botaoContinuarHistoria.style.display =
                    "none";

            }

        /* =========================
            INICIAR MÚSICA
        ========================= */

        musicaFundo.volume = 0.6;

        musicaFundo.play().catch(() => {

            console.log(
                "Não foi possível iniciar a música."
            );

        });


        /* =========================
            ESCONDER BOTÃO
        ========================= */

        botaoIniciar.classList.add(
            "sumir"
        );


        /* =========================
            INICIAR PRIMEIRA MENSAGEM
        ========================= */

        setTimeout(() => {

            mostrarFrase();

        }, 1000);

    }
);


/* =========================
    BOTÃO COMEÇAR
========================= */

botaoComecar.addEventListener(
    "click",
    function () {

        /* =========================
            INICIAR MÚSICA NO TOQUE
        ========================= */

        musicaFundo.volume = 0.6;

        musicaFundo.play().catch(() => {

            console.log(
                "Não foi possível iniciar a música."
            );

        });


        telaSuspense.style.transition =
            "opacity 1.5s ease";

        telaSuspense.style.opacity =
            "0";


        setTimeout(() => {

            telaSuspense.style.display =
                "none";

            telaFoto.classList.add(
                "ativa"
            );

        }, 1500);

    }
);


/* =========================
    PRIMEIRA FOTO
========================= */

botaoContinuar.addEventListener(
    "click",
    function () {

        telaFoto.style.opacity =
            "0";


        setTimeout(() => {

            telaFoto.style.visibility =
                "hidden";


            telaMemoria.classList.add(
                "ativa"
            );


            setTimeout(() => {

                telaMemoria.classList.add(
                    "mostrarFoto"
                );

            }, 1500);

        }, 1500);

    }
);


/* =========================
    TEXTOS DA TELA DO VÍDEO
========================= */

const textosVideo = [

    document.getElementById(
        "textoVideo1"
    ),

    document.getElementById(
        "textoVideo2"
    ),

    document.getElementById(
        "textoVideo3"
    ),

    document.getElementById(
        "textoVideo4"
    )

];


/* =========================
    INICIAR TEXTOS DO VÍDEO
========================= */

function iniciarTextosVideo() {

    textosVideo.forEach(
        texto => {

            texto.classList.remove(
                "ativo"
            );

            texto.classList.remove(
                "sumindo"
            );

            texto.style.opacity =
                "0";

        }
    );


    let indice = 0;


    function mostrarProximoTexto() {

        /* =========================
            TEXTOS TERMINARAM
        ========================= */

        if (
            indice >=
            textosVideo.length
        ) {

            iniciarTela5();

            return;

        }


        const textoAtual =
            textosVideo[indice];


        /* =========================
            GARANTIR TEXTO LIMPO
        ========================= */

        textoAtual.classList.remove(
            "sumindo"
        );

        textoAtual.style.opacity =
            "0";


        /* =========================
            MOSTRAR
        ========================= */

        textoAtual.classList.add(
            "ativo"
        );


        /* =========================
            COMEÇAR A SUMIR
        ========================= */

        setTimeout(() => {

            textoAtual.classList.remove(
                "ativo"
            );

            textoAtual.classList.add(
                "sumindo"
            );

        }, 5500);


        /* =========================
            PRÓXIMO TEXTO
        ========================= */

        setTimeout(() => {

            textoAtual.classList.remove(
                "sumindo"
            );

            textoAtual.style.opacity =
                "0";


            indice++;

            mostrarProximoTexto();

        }, 7000);

    }


    mostrarProximoTexto();

}


/* =========================
    TELA 5 — MURAL
========================= */

function iniciarTela5() {

    /* =========================
       MOSTRAR TELA 5
    ========================= */

    telaFotos.classList.add(
        "ativa"
    );


    /* =========================
       GARANTIR FOTOS ESCONDIDAS
    ========================= */

    fotosTela5.forEach(
        foto => {

            foto.classList.remove(
                "ativa"
            );

        }
    );


    let indiceFoto = 0;


    /* =========================
       MOSTRAR FOTOS UMA POR UMA
    ========================= */

    function mostrarProximaFoto() {

        if (
            indiceFoto >=
            fotosTela5.length
        ) {

            /* =========================
               TODAS AS FOTOS APARECERAM
            ========================= */

            setTimeout(() => {

                iniciarTela6();

            }, 5000);


            return;

        }


        /* =========================
           MOSTRAR FOTO
        ========================= */

        fotosTela5[
            indiceFoto
        ].classList.add(
            "ativa"
        );


        indiceFoto++;


        /* =========================
           PRÓXIMA FOTO
        ========================= */

        setTimeout(() => {

            mostrarProximaFoto();

        }, 1500);

    }


    mostrarProximaFoto();

}


/* =========================
    IR PARA TELA DO VÍDEO
========================= */

botaoMemoria.addEventListener(
    "click",
    function () {

        telaMemoria.style.opacity =
            "0";


        setTimeout(() => {

            telaMemoria.style.visibility =
                "hidden";


            telaVideo.classList.add(
                "ativa"
            );


            /* =========================
                INICIAR TEXTOS
            ========================= */

            iniciarTextosVideo();

        }, 1500);

    }
);

/* =========================
    TELA 6 — EU TE AMO
========================= */

function iniciarTela6() {

    /* =========================
        ESCONDER TELA 5
    ========================= */

    telaFotos.classList.remove(
        "ativa"
    );


    /* =========================
        MOSTRAR TELA 6
    ========================= */

    telaAmor.classList.add(
        "ativa"
    );

}

/* =========================
    ENTRAR NO APLICATIVO
========================= */

const botaoEntrarApp =
    document.getElementById(
        "botaoEntrarApp"
    );


if (botaoEntrarApp) {

    botaoEntrarApp.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "historiaAssistida",
                "true"
            );


            sessionStorage.setItem(
                "iniciarMusicaApp",
                "true"
            );


            window.location.href =
                "../nosso-cantinho/index.html";

        }
    );

}

/* ==================================================
   HISTÓRIA PERSONALIZADA ❤️
================================================== */

function carregarHistoriaPersonalizada() {

    const dadosSalvos = JSON.parse(
        localStorage.getItem(
            "historiaPersonalizada"
        )
    ) || {};

    const fotosPersonalizadas = [
        dadosSalvos.foto1,
        dadosSalvos.foto2,
        dadosSalvos.foto3,
        dadosSalvos.foto4,
        dadosSalvos.foto5,
        dadosSalvos.foto6,
        dadosSalvos.foto7,
        dadosSalvos.foto8
    ];

    const fotosHistoria = [
        document.getElementById("fotoPrincipal"),
        document.querySelector("#fotoMemoria img"),
        ...document.querySelectorAll(".fotosTela5 img"),
        document.querySelector(".molduraAmor img")
    ];

    fotosPersonalizadas.forEach(
        function (foto, indice) {

            if (foto && fotosHistoria[indice]) {
                fotosHistoria[indice].src = foto;
            }
        }
    );


    /* =========================
       TELA 1 — PRIMEIRA FOTO
    ========================= */

    const mensagemFoto =
        document.querySelector(
            "#mensagemFoto p"
        );

    if (
        mensagemFoto &&
        dadosSalvos.mensagemFoto
    ) {

        mensagemFoto.textContent =
            dadosSalvos.mensagemFoto;

    }


    /* =========================
       TELA 2 — MEMÓRIA
    ========================= */

    const perguntaMemoria =
        document.getElementById(
            "perguntaMemoria"
        );

    if (
        perguntaMemoria &&
        dadosSalvos.perguntaMemoria
    ) {

        perguntaMemoria.textContent =
            dadosSalvos.perguntaMemoria;

    }


    const mensagemMemoria =
        document.querySelectorAll(
            "#mensagemMemoria p"
        );

    if (
        mensagemMemoria.length >= 2
    ) {

        if (
            dadosSalvos.mensagemMemoria1
        ) {

            mensagemMemoria[0].textContent =
                dadosSalvos.mensagemMemoria1;

        }

        if (
            dadosSalvos.mensagemMemoria2
        ) {

            mensagemMemoria[1].textContent =
                dadosSalvos.mensagemMemoria2;

        }

    }


    const textosVideoPersonalizados = [

        dadosSalvos.textoVideo1,
        dadosSalvos.textoVideo2,
        dadosSalvos.textoVideo3,
        dadosSalvos.textoVideo4

    ];

    textosVideoPersonalizados.forEach(
        (texto, indice) => {

            if (texto) {

                const elemento =
                    document.getElementById(
                        `textoVideo${indice + 1}`
                    );

                if (elemento) {

                    elemento.textContent =
                        texto;

                }

            }

        }
    );


    /* =========================
       TELA 6 — FINAL
    ========================= */

    const textoAmor =
        document.querySelector(
            ".textoAmor"
        );

    if (
        textoAmor &&
        dadosSalvos.textoAmor
    ) {

        textoAmor.textContent =
            dadosSalvos.textoAmor;

    }


    const mensagemApp =
        document.querySelector(
            ".mensagemApp"
        );

    if (
        mensagemApp &&
        dadosSalvos.mensagemApp
    ) {

        mensagemApp.textContent =
            dadosSalvos.mensagemApp;

    }

}

/* ==================================================
   CARREGAR HISTÓRIA PERSONALIZADA
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarHistoriaPersonalizada();

    }
);