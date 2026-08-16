/* =========================
   ELEMENTOS — MÚSICAS
========================= */

const telaMusicas =
    document.getElementById(
        "telaMusicas"
    );

const abrirMusicas =
    document.getElementById(
        "abrirMusicas"
    );

const botaoVoltarMusicas =
    document.getElementById(
        "botaoVoltarMusicas"
    );


/* =========================
   ABRIR MÚSICAS
========================= */

abrirMusicas.addEventListener(
    "click",
    function () {

        telaInicioApp.style.display =
            "none";

        telaVideos.style.display =
            "none";

        telaMusicas.style.display =
            "block";

        esconderBotoesSuperiores();
        carregarMusicas();

    }
);


/* =========================
   VOLTAR
========================= */

botaoVoltarMusicas.addEventListener(
    "click",
    function () {

        telaMusicas.style.display =
            "none";

        telaInicioApp.style.display =
            "flex";

        mostrarBotoesSuperiores();

    }
);


/* =========================
   ELEMENTOS — ARQUIVOS DE MÚSICA
========================= */

const inputMusica =
    document.getElementById(
        "inputMusica"
    );

const musicasSalvas =
    document.getElementById(
        "musicasSalvas"
    );


/* =========================
   ADICIONAR MÚSICAS
========================= */

inputMusica.addEventListener(
    "change",
    async function () {

        const arquivos =
            Array.from(
                inputMusica.files
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
                    "musicas",
                    arquivo
                );

            }


            console.log(
                "Músicas salvas com sucesso ❤️"
            );


            inputMusica.value = "";


            carregarMusicas();

        }
        catch (erro) {

            console.error(
                "Erro ao salvar músicas:",
                erro
            );

        }

    }
);


/* =========================
   CARREGAR MÚSICAS
========================= */

async function carregarMusicas() {

    const musicas =
        await buscarArquivos(
            "musicas"
        );


    musicasSalvas.innerHTML = "";


    if (musicas.length === 0) {

        musicasSalvas.innerHTML = `
            <p>
                Ainda não temos músicas aqui. ❤️
            </p>
        `;

        return;

    }


    let musicaTocando = null;


    musicas.forEach(
        function (item) {

            const url =
                URL.createObjectURL(
                    item.arquivo
                );


            /* =========================
               ITEM DA MÚSICA
            ========================= */

            const itemMusica =
                document.createElement(
                    "div"
                );


            itemMusica.className =
                "itemMusica";


            /* =========================
               BOTÃO PLAY
            ========================= */

            const botaoPlay =
                document.createElement(
                    "button"
                );


            botaoPlay.className =
                "botaoPlayMusica";


            botaoPlay.textContent =
                "▶️";


            /* =========================
               NOME
            ========================= */

            const titulo =
                document.createElement(
                    "span"
                );


            titulo.className =
                "nomeMusica";


            titulo.textContent =
                item.nome;


            /* =========================
               ÁUDIO
            ========================= */

            const musica =
                document.createElement(
                    "audio"
                );


            musica.src =
                url;


            musica.preload =
                "metadata";


            /* =========================
               ÁREA DO PLAYER
            ========================= */

            const controles =
                document.createElement(
                    "div"
                );


            controles.className =
                "controlesMusica";


            /* =========================
               BARRA
            ========================= */

            const barra =
                document.createElement(
                    "input"
                );


            barra.type =
                "range";

            barra.min =
                "0";

            barra.value =
                "0";

            barra.step =
                "0.1";

            barra.className =
                "barraMusica";


            /* =========================
               TEMPO
            ========================= */

            const tempo =
                document.createElement(
                    "div"
                );


            tempo.className =
                "tempoMusica";


            tempo.textContent =
                "0:00 / 0:00";


            /* =========================
               EXCLUIR
            ========================= */

            const botaoExcluir =
                document.createElement(
                    "button"
                );


            botaoExcluir.textContent =
                "🗑️";


            botaoExcluir.className =
                "botaoExcluirMusica";


            /* =========================
               PLAY / PAUSE
            ========================= */

            botaoPlay.addEventListener(
                "click",
                function () {

                    if (
                        musica.paused
                    ) {

                        if (
                            musicaTocando &&
                            musicaTocando !== musica
                        ) {

                            musicaTocando.pause();

                        }


                        musica.play();

                        musicaTocando =
                            musica;

                        botaoPlay.textContent =
                            "⏸️";

                    }
                    else {

                        musica.pause();

                        botaoPlay.textContent =
                            "▶️";

                    }

                }
            );


            /* =========================
               ATUALIZAR TEMPO
            ========================= */

            musica.addEventListener(
                "loadedmetadata",
                function () {

                    barra.max =
                        musica.duration;


                    tempo.textContent =
                        "0:00 / " +
                        formatarTempoMusica(
                            musica.duration
                        );

                }
            );


            musica.addEventListener(
                "timeupdate",
                function () {

                    barra.value =
                        musica.currentTime;


                    tempo.textContent =
                        formatarTempoMusica(
                            musica.currentTime
                        ) +
                        " / " +
                        formatarTempoMusica(
                            musica.duration
                        );

                }
            );


            /* =========================
               ARRASTAR BARRA
            ========================= */

            barra.addEventListener(
                "input",
                function () {

                    musica.currentTime =
                        barra.value;

                }
            );


            /* =========================
               MÚSICA TERMINOU
            ========================= */

            musica.addEventListener(
                "ended",
                function () {

                    botaoPlay.textContent =
                        "▶️";

                    barra.value =
                        "0";

                    musica.currentTime =
                        0;

                    musicaTocando =
                        null;

                }
            );


            /* =========================
               EXCLUIR
            ========================= */

            botaoExcluir.addEventListener(
                "click",
                async function () {

                    const confirmar =
                        confirm(
                            "Deseja excluir esta música? ❤️"
                        );


                    if (!confirmar) {

                        return;

                    }


                    if (
                        musicaTocando === musica
                    ) {

                        musica.pause();

                        musicaTocando =
                            null;

                    }


                    URL.revokeObjectURL(
                        url
                    );


                    await excluirArquivo(
                        "musicas",
                        item.id
                    );


                    carregarMusicas();

                }
            );


            /* =========================
               MONTAR PLAYER
            ========================= */

            controles.appendChild(
                barra
            );

            controles.appendChild(
                tempo
            );


            itemMusica.appendChild(
                botaoPlay
            );

            itemMusica.appendChild(
                titulo
            );

            itemMusica.appendChild(
                controles
            );

            itemMusica.appendChild(
                botaoExcluir
            );


            musicasSalvas.appendChild(
                itemMusica
            );

        }
    );

}


/* =========================
   FORMATAR TEMPO DA MÚSICA
========================= */

function formatarTempoMusica(
    segundos
) {

    if (
        !isFinite(segundos)
    ) {

        return "0:00";

    }


    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        Math.floor(
            segundos % 60
        );


    return (
        minutos +
        ":" +
        String(
            segundosRestantes
        ).padStart(
            2,
            "0"
        )
    );

}