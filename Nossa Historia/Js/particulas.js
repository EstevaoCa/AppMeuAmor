/* =========================
   PARTÍCULAS 3D
   VIAGEM PELO ESPAÇO
   COM RASTRO DE LUZ
========================= */


/* =========================
   CONFIGURAÇÃO
========================= */

const quantidadeParticulas = 100;

const estrelas = [];


/* =========================
   CRIAR PARTÍCULA
========================= */

function criarParticula(local) {

    if (!local) {
        return;
    }


    const estrela =
        document.createElement("span");


    /* =========================
       APARÊNCIA
    ========================= */

    estrela.style.position =
        "absolute";

    estrela.style.left =
        "50%";

    estrela.style.top =
        "50%";

    estrela.style.width =
        "2px";

    estrela.style.height =
        "2px";

    estrela.style.borderRadius =
        "50%";

    estrela.style.background =
        "#ffffff";

    estrela.style.pointerEvents =
        "none";


    /* =========================
       ADICIONAR NA TELA
    ========================= */

    local.appendChild(estrela);


    /* =========================
       DADOS 3D DA ESTRELA
    ========================= */

    const particula = {

        elemento: estrela,

        local: local,

        x:
            (Math.random() - 0.5)
            * 2000,

        y:
            (Math.random() - 0.5)
            * 2000,

        z:
            Math.random() * 2000 + 1,

        zAnterior: 2000

    };


    estrelas.push(particula);

}


/* =========================
   CRIAR ESTRELAS INICIAIS
========================= */

function criarEstrelasIniciais() {

    const locais = [

        document.getElementById(
            "particulas"
        ),

        document.getElementById(
            "particulasTela6"
        )

    ];


    locais.forEach(local => {

        if (!local) {
            return;
        }


        for (
            let i = 0;
            i < quantidadeParticulas;
            i++
        ) {

            criarParticula(local);

        }

    });

}


/* =========================
   ANIMAÇÃO
========================= */

function animarEstrelas() {


    estrelas.forEach(estrela => {


        /* =========================
           DISTÂNCIA ANTERIOR
        ========================= */

        estrela.zAnterior =
            estrela.z;


        /* =========================
           MOVIMENTO
           
           A estrela vem em direção
           à câmera
        ========================= */

        estrela.z -= 10;


        /* =========================
           QUANDO CHEGA NA CÂMERA
        ========================= */

        if (estrela.z <= 1) {


            estrela.x =
                (Math.random() - 0.5)
                * 2000;


            estrela.y =
                (Math.random() - 0.5)
                * 2000;


            estrela.z =
                2000;


            estrela.zAnterior =
                2000;

        }


        /* =========================
           POSIÇÃO ATUAL
        ========================= */

        const x =
            estrela.x /
            estrela.z *
            500;


        const y =
            estrela.y /
            estrela.z *
            500;


        /* =========================
           POSIÇÃO ANTERIOR
        ========================= */

        const xAnterior =
            estrela.x /
            estrela.zAnterior *
            500;


        const yAnterior =
            estrela.y /
            estrela.zAnterior *
            500;


        /* =========================
           TAMANHO
        ========================= */

        const tamanho =
            Math.max(
                1,
                5 -
                estrela.z / 500
            );


        /* =========================
           OPACIDADE
        ========================= */

        const opacidade =
            Math.min(
                1,
                1 -
                estrela.z / 2000
            );


        /* =========================
           DIREÇÃO DO MOVIMENTO
        ========================= */

        const dx =
            x -
            xAnterior;


        const dy =
            y -
            yAnterior;


        /* =========================
           COMPRIMENTO DO MOVIMENTO
        ========================= */

        const comprimento =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* =========================
           TAMANHO DO RASTRO
        ========================= */

        const distanciaRastro =
            Math.min(
                80,
                (2000 - estrela.z)
                / 25
            );


        /* =========================
           ÂNGULO
        ========================= */

        const angulo =
            Math.atan2(
                dy,
                dx
            )
            * 180 /
            Math.PI;


        /* =========================
           POSIÇÃO NA TELA
        ========================= */

        estrela.elemento.style.left =
            `calc(50% + ${x}px)`;


        estrela.elemento.style.top =
            `calc(50% + ${y}px)`;


        /* =========================
           TAMANHO DA ESTRELA
        ========================= */

        estrela.elemento.style.width =
            `${tamanho}px`;


        estrela.elemento.style.height =
            `${tamanho}px`;


        /* =========================
           RASTRO DE LUZ
        ========================= */

        const rastro =
            distanciaRastro *
            Math.max(
                0.2,
                opacidade
            );


        estrela.elemento.style.boxShadow =
            `
            ${-dx * 3}px
            ${-dy * 3}px
            ${rastro}px
            rgba(
                255,
                255,
                255,
                ${opacidade * 0.7}
            )
            `;


        /* =========================
           BRILHO
        ========================= */

        estrela.elemento.style.filter =
            `brightness(
                ${1 + opacidade * 2}
            )`;


        /* =========================
           ROTAÇÃO
        ========================= */

        estrela.elemento.style.transform =
            `
            translate(-50%, -50%)
            rotate(${angulo}deg)
            `;

    });


    requestAnimationFrame(
        animarEstrelas
    );

}


/* =========================
   INICIAR
========================= */

criarEstrelasIniciais();


animarEstrelas();