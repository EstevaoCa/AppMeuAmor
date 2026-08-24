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
   ESTADO DO PLAYER
========================= */

let musicaTocando = null;

let idMusicaTocando = null;

let musicasCarregadas = false;


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


        /*
         * Só carrega as músicas
         * quando a tela ainda não
         * foi carregada.
         *
         * Assim o elemento audio
         * continua existindo quando
         * saímos e voltamos para a tela.
         */

        if (!musicasCarregadas) {

            carregarMusicas();

        }

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
   ELEMENTOS — ARQUIVOS
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


            /*
             * Aqui precisamos reconstruir
             * a lista porque uma nova música
             * foi adicionada.
             */

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


    /*
     * Se estamos reconstruindo a lista
     * e existe uma música tocando,
     * guardamos a posição atual.
     */

    let idAnterior =
        idMusicaTocando;

    let tempoAnterior =
        0;


    if (musicaTocando) {

        tempoAnterior =
            musicaTocando.currentTime;

        musicaTocando.pause();

    }


    musicaTocando = null;


    musicasSalvas.innerHTML = "";


    if (musicas.length === 0) {

        musicasCarregadas = true;

        musicasSalvas.innerHTML = `
            <p class="mensagemMusicas">
                Ainda não temos músicas aqui. ❤️
            </p>
        `;

        return;

    }


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

                    /*
                     * Se esta música já está tocando,
                     * pausa.
                     */

                    if (
                        musica ===
                        musicaTocando &&
                        !musica.paused
                    ) {

                        musica.pause();

                        botaoPlay.textContent =
                            "▶️";

                        itemMusica.classList.remove(
                            "musicaTocando"
                        );

                        musicaTocando =
                            null;

                        idMusicaTocando =
                            null;

                        return;

                    }


                    /*
                     * Para qualquer outra música
                     * que esteja tocando.
                     */

                    if (
                        musicaTocando &&
                        musicaTocando !== musica
                    ) {

                        musicaTocando.pause();


                        const itemAnterior =
                            document.querySelector(
                                ".itemMusica.musicaTocando"
                            );


                        if (itemAnterior) {

                            itemAnterior.classList.remove(
                                "musicaTocando"
                            );


                            const botaoAnterior =
                                itemAnterior.querySelector(
                                    ".botaoPlayMusica"
                                );


                            if (botaoAnterior) {

                                botaoAnterior.textContent =
                                    "▶️";

                            }

                        }

                    }


                    /*
                     * Inicia a nova música.
                     */

                    musica.play();


                    musicaTocando =
                        musica;


                    idMusicaTocando =
                        item.id;


                    /*
                     * Atualiza todos os botões.
                     */

                    document
                        .querySelectorAll(
                            ".botaoPlayMusica"
                        )
                        .forEach(
                            function (botao) {

                                botao.textContent =
                                    "▶️";

                            }
                        );


                    document
                        .querySelectorAll(
                            ".itemMusica"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "musicaTocando"
                                );

                            }
                        );


                    /*
                     * Destaca a música atual.
                     */

                    botaoPlay.textContent =
                        "⏸️";


                    itemMusica.classList.add(
                        "musicaTocando"
                    );

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


                    /*
                     * Se esta era a música
                     * que estava tocando antes
                     * da reconstrução da lista,
                     * recupera a posição.
                     */

                    if (
                        item.id ===
                        idAnterior &&
                        tempoAnterior > 0
                    ) {

                        musica.currentTime =
                            tempoAnterior;

                        musica.play();

                        musicaTocando =
                            musica;

                        idMusicaTocando =
                            item.id;

                        botaoPlay.textContent =
                            "⏸️";

                        itemMusica.classList.add(
                            "musicaTocando"
                        );

                    }

                }
            );


            /* =========================
               ATUALIZAR BARRA
            ========================= */

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


                    itemMusica.classList.remove(
                        "musicaTocando"
                    );


                    barra.value =
                        "0";


                    musica.currentTime =
                        0;


                    if (
                        musicaTocando ===
                        musica
                    ) {

                        musicaTocando =
                            null;

                        idMusicaTocando =
                            null;

                    }

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
                        musicaTocando ===
                        musica
                    ) {

                        musica.pause();

                        musicaTocando =
                            null;

                        idMusicaTocando =
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


    musicasCarregadas =
        true;

}


/* =========================
   FORMATAR TEMPO
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