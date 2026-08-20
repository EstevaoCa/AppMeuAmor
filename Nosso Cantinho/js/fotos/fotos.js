/* =========================
   ELEMENTOS — FOTOS
========================= */

const telaFotosApp =
    document.getElementById(
        "telaFotosApp"
    );

const abrirFotos =
    document.getElementById(
        "abrirFotos"
    );

const botaoVoltarFotosApp =
    document.getElementById(
        "botaoVoltarFotosApp"
    );


/* =========================
   ABRIR FOTOS
========================= */

abrirFotos.addEventListener(
    "click",
    function () {

        telaInicioApp.style.display =
            "none";

        telaVideos.style.display =
            "none";

        telaMusicas.style.display =
            "none";

        telaDiario.style.display =
            "none";

        telaFotosApp.style.display =
            "block";

        esconderBotoesSuperiores();
        carregarFotos();

    }
);


/* =========================
   VOLTAR
========================= */

botaoVoltarFotosApp.addEventListener(
    "click",
    function () {

        telaFotosApp.style.display =
            "none";

        telaInicioApp.style.display =
            "flex";

        mostrarBotoesSuperiores();

    }
);


/* =========================
   ADICIONAR FOTOS
========================= */

const inputFoto =
    document.getElementById(
        "inputFoto"
    );


inputFoto.addEventListener(
    "change",
    async function () {

        const arquivos =
            Array.from(
                inputFoto.files
            );


        if (arquivos.length === 0) {

            return;

        }


        try {

            for (
                const arquivo
                of arquivos
            ) {

                await salvarArquivo(
                    "fotos",
                    arquivo
                );

            }


            console.log(
                "Fotos salvas com sucesso ❤️"
            );


            inputFoto.value = "";


            carregarFotos();

        }
        catch (erro) {

            console.error(
                "Erro ao salvar fotos:",
                erro
            );

        }

    }
);


/* =========================
   CARREGAR FOTOS
========================= */

async function carregarFotos() {

    const fotos =
        await buscarArquivos(
            "fotos"
        );


    const galeria =
        document.getElementById(
            "galeriaFotosApp"
        );


    galeria.innerHTML = "";


    if (fotos.length === 0) {

        galeria.innerHTML = `
            <p class="mensagemDiario">
                Ainda não temos fotos aqui. ❤️
            </p>
        `;

        return;

    }

    fotosVisualizador =
    fotos.map(
        function (item) {

            return {

                url:
                    URL.createObjectURL(
                        item.arquivo
                    ),

                nome:
                    item.nome

            };

        }
    );


    fotos.forEach(
        function (item) {

            const url =
                URL.createObjectURL(
                    item.arquivo
                );


            const itemFoto =
                document.createElement(
                    "div"
                );


            itemFoto.className =
                "fotoItemApp";


            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                url;

            imagem.className =
                "fotoSalvaApp";

            imagem.alt =
                item.nome;


            /* =========================
               ABRIR FOTO GRANDE
               NOVA FUNÇÃO
            ========================= */

            imagem.addEventListener(
                "click",
                function () {

                    abrirVisualizadorFoto(
                        url,
                        item.nome,
                        fotos.indexOf(item)
                    );

                }
            );


            const botaoExcluir =
                document.createElement(
                    "button"
                );


            botaoExcluir.className =
                "botaoExcluirFoto";

            botaoExcluir.textContent =
                "🗑️ Excluir";


            botaoExcluir.addEventListener(
                "click",
                async function () {

                    const confirmar =
                        confirm(
                            "Deseja excluir esta foto? ❤️"
                        );


                    if (!confirmar) {

                        return;

                    }


                    await excluirArquivo(
                        "fotos",
                        item.id
                    );


                    URL.revokeObjectURL(
                        url
                    );


                    carregarFotos();

                }
            );


            itemFoto.appendChild(
                imagem
            );

            itemFoto.appendChild(
                botaoExcluir
            );


            galeria.appendChild(
                itemFoto
            );

        }
    );

}

/* =========================
   FOTOS DO VISUALIZADOR
========================= */

let fotosVisualizador = [];

let indiceFotoAtual = 0;



/* =========================
   VISUALIZADOR DE FOTO
   COM SETAS
========================= */

function abrirVisualizadorFoto(
    url,
    nome,
    indice
) {

    indiceFotoAtual =
        indice;


    let visualizador =
        document.getElementById(
            "visualizadorFoto"
        );


    if (!visualizador) {

        visualizador =
            document.createElement(
                "div"
            );

        visualizador.id =
            "visualizadorFoto";

        visualizador.className =
            "visualizadorFoto";


        /* =========================
           BOTÃO FECHAR
        ========================= */

        const botaoFechar =
            document.createElement(
                "button"
            );

        botaoFechar.className =
            "botaoFecharFoto";

        botaoFechar.textContent =
            "✕";

        botaoFechar.setAttribute(
            "aria-label",
            "Fechar foto"
        );


        /* =========================
           SETA ESQUERDA
        ========================= */

        const botaoAnterior =
            document.createElement(
                "button"
            );

        botaoAnterior.className =
            "setaFoto setaFotoAnterior";

        botaoAnterior.textContent =
            "‹";

        botaoAnterior.setAttribute(
            "aria-label",
            "Foto anterior"
        );


        /* =========================
           SETA DIREITA
        ========================= */

        const botaoProxima =
            document.createElement(
                "button"
            );

        botaoProxima.className =
            "setaFoto setaFotoProxima";

        botaoProxima.textContent =
            "›";

        botaoProxima.setAttribute(
            "aria-label",
            "Próxima foto"
        );


        /* =========================
           IMAGEM GRANDE
        ========================= */

        const imagemGrande =
            document.createElement(
                "img"
            );

        imagemGrande.className =
            "imagemVisualizada";

        imagemGrande.alt =
            nome;


        /* =========================
           MONTAR VISUALIZADOR
        ========================= */

        visualizador.appendChild(
            botaoFechar
        );

        visualizador.appendChild(
            botaoAnterior
        );

        visualizador.appendChild(
            imagemGrande
        );

        visualizador.appendChild(
            botaoProxima
        );


        document.body.appendChild(
            visualizador
        );


        /* =========================
           FECHAR
        ========================= */

        botaoFechar.addEventListener(
            "click",
            function () {

                fecharVisualizadorFoto();

            }
        );


        /* =========================
           FOTO ANTERIOR
        ========================= */

        botaoAnterior.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();

                mudarFotoVisualizador(
                    -1
                );

            }
        );


        /* =========================
           PRÓXIMA FOTO
        ========================= */

        botaoProxima.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();

                mudarFotoVisualizador(
                    1
                );

            }
        );


        /* =========================
           FECHAR CLICANDO FORA
        ========================= */

        visualizador.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target ===
                    visualizador
                ) {

                    fecharVisualizadorFoto();

                }

            }
        );

    }


    const imagemGrande =
        visualizador.querySelector(
            ".imagemVisualizada"
        );


    imagemGrande.src =
        url;

    imagemGrande.alt =
        nome;


    visualizador.classList.add(
        "aberto"
    );


    document.body.classList.add(
        "visualizadorAberto"
    );

}


/* =========================
   MUDAR FOTO
========================= */

function mudarFotoVisualizador(
    direcao
) {

    if (
        fotosVisualizador.length === 0
    ) {

        return;

    }


    indiceFotoAtual +=
        direcao;


    /* =========================
       VOLTAR PARA A ÚLTIMA
       AO PASSAR DA PRIMEIRA
    ========================= */

    if (
        indiceFotoAtual < 0
    ) {

        indiceFotoAtual =
            fotosVisualizador.length - 1;

    }


    /* =========================
       VOLTAR PARA A PRIMEIRA
       AO PASSAR DA ÚLTIMA
    ========================= */

    if (
        indiceFotoAtual >=
        fotosVisualizador.length
    ) {

        indiceFotoAtual = 0;

    }


    const foto =
        fotosVisualizador[
            indiceFotoAtual
        ];


    const visualizador =
        document.getElementById(
            "visualizadorFoto"
        );


    const imagemGrande =
        visualizador.querySelector(
            ".imagemVisualizada"
        );


    imagemGrande.src =
        foto.url;

    imagemGrande.alt =
        foto.nome;

}




/* =========================
   FECHAR VISUALIZADOR
   NOVA FUNÇÃO
========================= */

function fecharVisualizadorFoto() {

    const visualizador =
        document.getElementById(
            "visualizadorFoto"
        );


    if (!visualizador) {

        return;

    }


    visualizador.classList.remove(
        "aberto"
    );


    document.body.classList.remove(
        "visualizadorAberto"
    );

}


/* =========================
   FECHAR COM ESC
   NOVA FUNÇÃO
========================= */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Escape"
        ) {

            fecharVisualizadorFoto();

        }

    }
);

