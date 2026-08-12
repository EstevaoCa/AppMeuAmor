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