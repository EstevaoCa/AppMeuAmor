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