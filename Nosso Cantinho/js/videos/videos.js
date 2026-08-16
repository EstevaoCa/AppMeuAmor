/* =========================
   ELEMENTOS — VÍDEOS
========================= */

const telaInicioApp =
    document.getElementById(
        "telaInicioApp"
    );

const telaVideos =
    document.getElementById(
        "telaVideos"
    );

const abrirVideos =
    document.getElementById(
        "abrirVideos"
    );

const botaoVoltarVideos =
    document.getElementById(
        "botaoVoltarVideos"
    );


/* =========================
   ABRIR VÍDEOS
========================= */

abrirVideos.addEventListener(
    "click",
    function () {

        telaInicioApp.style.display =
            "none";

        telaVideos.style.display =
            "block";

        esconderBotoesSuperiores();
        carregarVideos();

    }
);


/* =========================
   VOLTAR
========================= */

botaoVoltarVideos.addEventListener(
    "click",
    function () {

        telaVideos.style.display =
            "none";

        telaInicioApp.style.display =
            "flex";

        mostrarBotoesSuperiores();

    }
);


/* =========================
   ADICIONAR VÍDEO
========================= */

const inputVideo =
    document.getElementById(
        "inputVideo"
    );


/* =========================
   ADICIONAR VÍDEOS
========================= */

inputVideo.addEventListener(
    "change",
    async function () {

        const arquivos =
            Array.from(
                inputVideo.files
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
                    "videos",
                    arquivo
                );

            }


            console.log(
                "Vídeos salvos com sucesso ❤️"
            );


            inputVideo.value = "";


            carregarVideos();

        }
        catch (erro) {

            console.error(
                "Erro ao salvar vídeos:",
                erro
            );

        }

    }
);


/* =========================
   CARREGAR VÍDEOS
========================= */

async function carregarVideos() {

    const videos =
        await buscarArquivos(
            "videos"
        );


    const area =
        document.getElementById(
            "videosSalvos"
        );


    area.innerHTML = "";


    if (videos.length === 0) {

        area.innerHTML = `
            <p class="mensagemVideos">
                Ainda não temos vídeos aqui. ❤️
            </p>
        `;

        return;

    }


    videos.forEach(
        function (item) {

            /* =========================
               CARD DO VÍDEO
            ========================= */

            const cardVideo =
                document.createElement(
                    "div"
                );


            cardVideo.className =
                "cardVideo";


            /* =========================
               NOME
            ========================= */

            const titulo =
                document.createElement(
                    "p"
                );


            titulo.className =
                "tituloVideo";


            titulo.textContent =
                item.nome;


            /* =========================
               VÍDEO
            ========================= */

            const url =
                URL.createObjectURL(
                    item.arquivo
                );


            const video =
                document.createElement(
                    "video"
                );


            video.src =
                url;

            video.controls =
                true;

            video.playsInline =
                true;

            video.className =
                "videoSalvo";


            /* =========================
               BOTÃO EXCLUIR
            ========================= */

            const botaoExcluir =
                document.createElement(
                    "button"
                );


            botaoExcluir.textContent =
                "🗑️ Excluir vídeo";


            botaoExcluir.className =
                "botaoExcluirVideo";


            botaoExcluir.addEventListener(
                "click",
                async function () {

                    const confirmar =
                        confirm(
                            "Deseja excluir este vídeo? ❤️"
                        );


                    if (!confirmar) {

                        return;

                    }


                    URL.revokeObjectURL(
                        url
                    );


                    await excluirArquivo(
                        "videos",
                        item.id
                    );


                    carregarVideos();

                }
            );


            /* =========================
               MONTAR CARD
            ========================= */

            cardVideo.appendChild(
                titulo
            );


            cardVideo.appendChild(
                video
            );


            cardVideo.appendChild(
                botaoExcluir
            );


            /* =========================
               ADICIONAR NA GALERIA
            ========================= */

            area.appendChild(
                cardVideo
            );

        }
    );

}