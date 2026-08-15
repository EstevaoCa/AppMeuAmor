/* =========================
   BANCO DE DADOS
   NOSSO CANTINHO ❤️
========================= */

const NOME_BANCO =
    "NossoCantinho";

const VERSAO_BANCO = 1;


/* =========================
   ABRIR BANCO
========================= */

let banco;


function abrirBanco() {

    return new Promise(
        (resolve, reject) => {

            const pedido =
                indexedDB.open(
                    NOME_BANCO,
                    VERSAO_BANCO
                );


            /* =========================
               CRIAR ESTRUTURA
            ========================= */

            pedido.onupgradeneeded =
                function (evento) {

                    const bancoAtual =
                        evento.target.result;


                    /* =========================
                       VÍDEOS
                    ========================= */

                    if (
                        !bancoAtual.objectStoreNames.contains(
                            "videos"
                        )
                    ) {

                        bancoAtual.createObjectStore(
                            "videos",
                            {
                                keyPath: "id",
                                autoIncrement: true
                            }
                        );

                    }


                    /* =========================
                       MÚSICAS
                    ========================= */

                    if (
                        !bancoAtual.objectStoreNames.contains(
                            "musicas"
                        )
                    ) {

                        bancoAtual.createObjectStore(
                            "musicas",
                            {
                                keyPath: "id",
                                autoIncrement: true
                            }
                        );

                    }


                    /* =========================
                       FOTOS
                    ========================= */

                    if (
                        !bancoAtual.objectStoreNames.contains(
                            "fotos"
                        )
                    ) {

                        bancoAtual.createObjectStore(
                            "fotos",
                            {
                                keyPath: "id",
                                autoIncrement: true
                            }
                        );

                    }


                    /* =========================
                       DIÁRIO
                    ========================= */

                    if (
                        !bancoAtual.objectStoreNames.contains(
                            "diario"
                        )
                    ) {

                        bancoAtual.createObjectStore(
                            "diario",
                            {
                                keyPath: "id",
                                autoIncrement: true
                            }
                        );

                    }

                };


            /* =========================
               BANCO ABERTO
            ========================= */

            pedido.onsuccess =
                function (evento) {

                    banco =
                        evento.target.result;

                    console.log(
                        "Banco do aplicativo aberto ❤️"
                    );

                    resolve(banco);

                };


            /* =========================
                ERRO
            ========================= */

            pedido.onerror =
                function () {

                    console.error(
                        "Erro ao abrir o banco."
                    );

                    reject(
                        pedido.error
                    );

                };

        }
    );

}


/* =========================
   INICIAR BANCO
========================= */

abrirBanco()
    .catch(
        function (erro) {

            console.error(
                "Erro no banco:",
                erro
            );

        }

    );

    /* =========================
   SALVAR ARQUIVO
========================= */

function salvarArquivo(
    tipo,
    arquivo
) {

    return new Promise(
        function (resolve, reject) {

            if (!banco) {

                reject(
                    new Error(
                        "Banco ainda não foi aberto."
                    )
                );

                return;

            }


            const transacao =
                banco.transaction(
                    tipo,
                    "readwrite"
                );


            const armazenamento =
                transacao.objectStore(
                    tipo
                );


            const item = {

                nome:
                    arquivo.name,

                tipo:
                    arquivo.type,

                tamanho:
                    arquivo.size,

                arquivo:
                    arquivo,

                data:
                    new Date().toISOString()

            };


            const pedido =
                armazenamento.add(
                    item
                );


            pedido.onsuccess =
                function (evento) {

                    console.log(
                        "Arquivo salvo:",
                        arquivo.name
                    );

                    resolve(
                        evento.target.result
                    );

                };


            pedido.onerror =
                function () {

                    console.error(
                        "Erro ao salvar arquivo."
                    );

                    reject(
                        pedido.error
                    );

                };

        }
    );

}


/* =========================
   BUSCAR ARQUIVOS
========================= */

function buscarArquivos(
    tipo
) {

    return new Promise(
        function (resolve, reject) {

            if (!banco) {

                reject(
                    new Error(
                        "Banco ainda não foi aberto."
                    )
                );

                return;

            }


            const transacao =
                banco.transaction(
                    tipo,
                    "readonly"
                );


            const armazenamento =
                transacao.objectStore(
                    tipo
                );


            const pedido =
                armazenamento.getAll();


            pedido.onsuccess =
                function () {

                    resolve(
                        pedido.result
                    );

                };


            pedido.onerror =
                function () {

                    reject(
                        pedido.error
                    );

                };

        }
    );

}


/* =========================
   BUSCAR UM ARQUIVO
========================= */

function buscarArquivo(
    tipo,
    id
) {

    return new Promise(
        function (resolve, reject) {

            const transacao =
                banco.transaction(
                    tipo,
                    "readonly"
                );


            const armazenamento =
                transacao.objectStore(
                    tipo
                );


            const pedido =
                armazenamento.get(
                    id
                );


            pedido.onsuccess =
                function () {

                    resolve(
                        pedido.result
                    );

                };


            pedido.onerror =
                function () {

                    reject(
                        pedido.error
                    );

                };

        }
    );

}


/* =========================
   EXCLUIR ARQUIVO
========================= */

function excluirArquivo(
    tipo,
    id
) {

    return new Promise(
        function (resolve, reject) {

            const transacao =
                banco.transaction(
                    tipo,
                    "readwrite"
                );


            const armazenamento =
                transacao.objectStore(
                    tipo
                );


            const pedido =
                armazenamento.delete(
                    id
                );


            pedido.onsuccess =
                function () {

                    console.log(
                        "Arquivo excluído."
                    );

                    resolve();

                };


            pedido.onerror =
                function () {

                    reject(
                        pedido.error
                    );

                };

        }
    );

}

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

/* =========================
   ELEMENTOS — DIÁRIO
========================= */

const telaDiario =
    document.getElementById(
        "telaDiario"
    );

const abrirDiario =
    document.getElementById(
        "abrirDiario"
    );

const botaoVoltarDiario =
    document.getElementById(
        "botaoVoltarDiario"
    );


/* =========================
   ABRIR DIÁRIO
========================= */

abrirDiario.addEventListener(
    "click",
    function () {

        telaInicioApp.style.display =
            "none";

        telaVideos.style.display =
            "none";

        telaMusicas.style.display =
            "none";

        telaDiario.style.display =
            "block";

        esconderBotoesSuperiores();
        carregarDiario();
        

        /* =========================
        EDITAR NOTA
        ========================= */

        function editarNota(
            nota
        ) {

            tituloDiario.value =
                nota.titulo;


            textoDiario.value =
                nota.texto;


            editorDiario.style.display =
                "block";


            tituloDiario.focus();


            botaoSalvarNota.onclick =
                async function () {

                    const titulo =
                        tituloDiario.value.trim();

                    const texto =
                        textoDiario.value.trim();


                    if (!titulo && !texto) {

                        alert(
                            "Escreva alguma coisa antes de salvar. ❤️"
                        );

                        return;

                    }


                    const notaAtualizada = {

                        id:
                            nota.id,

                        titulo:
                            titulo ||
                            "Minha lembrança",

                        texto:
                            texto,

                        data:
                            nota.data

                    };


                    await atualizarNotaDiario(
                        notaAtualizada
                    );


                    editorDiario.style.display =
                        "none";


                    tituloDiario.value = "";

                    textoDiario.value = "";


                    carregarDiario();


                    restaurarBotaoSalvar();

                };

        }

        /* =========================
        ATUALIZAR NOTA
        ========================= */

        function atualizarNotaDiario(
            nota
        ) {

            return new Promise(
                function (resolve, reject) {

                    const transacao =
                        banco.transaction(
                            "diario",
                            "readwrite"
                        );


                    const armazenamento =
                        transacao.objectStore(
                            "diario"
                        );


                    const pedido =
                        armazenamento.put(
                            nota
                        );


                    pedido.onsuccess =
                        function () {

                            resolve();

                        };


                    pedido.onerror =
                        function () {

                            reject(
                                pedido.error
                            );

                        };

                }
            );

        }

        /* =========================
        RESTAURAR BOTÃO SALVAR
        ========================= */

        function restaurarBotaoSalvar() {

            botaoSalvarNota.onclick =
                salvarNovaNota;

        }

    }
);


/* =========================
   VOLTAR
========================= */

botaoVoltarDiario.addEventListener(
    "click",
    function () {

        telaDiario.style.display =
            "none";

        telaInicioApp.style.display =
            "flex";

        mostrarBotoesSuperiores();

    }
);

/* =========================
   ELEMENTOS — EDITOR DIÁRIO
========================= */

const botaoNovaNota =
    document.getElementById(
        "botaoNovaNota"
    );

const editorDiario =
    document.getElementById(
        "editorDiario"
    );

const tituloDiario =
    document.getElementById(
        "tituloDiario"
    );

const textoDiario =
    document.getElementById(
        "textoDiario"
    );

const botaoSalvarNota =
    document.getElementById(
        "botaoSalvarNota"
    );

const botaoCancelarNota =
    document.getElementById(
        "botaoCancelarNota"
    );

const listaDiario =
    document.getElementById(
        "listaDiario"
    );


/* =========================
   NOVA NOTA
========================= */

botaoNovaNota.addEventListener(
    "click",
    function () {

        tituloDiario.value = "";

        textoDiario.value = "";

        editorDiario.style.display =
            "block";

        tituloDiario.focus();

    }
);


/* =========================
   CANCELAR
========================= */

botaoCancelarNota.addEventListener(
    "click",
    function () {

        editorDiario.style.display =
            "none";

        tituloDiario.value = "";

        textoDiario.value = "";

    }
);

/* =========================
   SALVAR NOTA
========================= */

botaoSalvarNota.addEventListener(
    "click",
    salvarNovaNota
);

/* =========================
   SALVAR NOVA NOTA
========================= */

async function salvarNovaNota() {

    const titulo =
        tituloDiario.value.trim();

    const texto =
        textoDiario.value.trim();


    if (!titulo && !texto) {

        alert(
            "Escreva alguma coisa antes de salvar. ❤️"
        );

        return;

    }


    const nota = {

        titulo:
            titulo ||
            "Minha lembrança",

        texto:
            texto,

        data:
            new Date().toISOString()

    };


    try {

        await salvarNotaDiario(
            nota
        );


        tituloDiario.value = "";

        textoDiario.value = "";

        editorDiario.style.display =
            "none";


        carregarDiario();

    }
    catch (erro) {

        console.error(
            "Erro ao salvar diário:",
            erro
        );

    }

}


/* =========================
   SALVAR NOTA DO DIÁRIO
========================= */

function salvarNotaDiario(
    nota
) {

    return new Promise(
        function (resolve, reject) {

            if (!banco) {

                reject(
                    new Error(
                        "Banco ainda não foi aberto."
                    )
                );

                return;

            }


            const transacao =
                banco.transaction(
                    "diario",
                    "readwrite"
                );


            const armazenamento =
                transacao.objectStore(
                    "diario"
                );


            const pedido =
                armazenamento.add(
                    nota
                );


            pedido.onsuccess =
                function () {

                    console.log(
                        "Lembrança salva ❤️"
                    );

                    resolve();

                };


            pedido.onerror =
                function () {

                    reject(
                        pedido.error
                    );

                };

        }
    );

}


/* =========================
   CARREGAR DIÁRIO
========================= */

async function carregarDiario() {

    const notas =
        await buscarArquivos(
            "diario"
        );


    listaDiario.innerHTML = "";


    if (notas.length === 0) {

        listaDiario.innerHTML = `
            <p class="mensagemDiario">
                Ainda não temos lembranças aqui. ❤️
            </p>
        `;

        return;

    }


    notas
        .sort(
            function (a, b) {

                return new Date(b.data)
                    - new Date(a.data);

            }
        )
        .forEach(
            function (nota) {

                const elemento =
                    document.createElement(
                        "article"
                    );


                elemento.className =
                    "notaDiario";


                const titulo =
                    document.createElement(
                        "h3"
                    );


                titulo.textContent =
                    nota.titulo;


                const texto =
                    document.createElement(
                        "p"
                    );


                texto.textContent =
                    nota.texto;


                const data =
                    document.createElement(
                        "small"
                    );


                data.textContent =
                    formatarData(
                        nota.data
                    );


                /* =========================
                   BOTÃO EDITAR
                ========================== */

                const botaoEditar =
                    document.createElement(
                        "button"
                    );


                botaoEditar.className =
                    "botaoEditarNota";


                botaoEditar.textContent =
                    "✏️ Editar";


                botaoEditar.addEventListener(
                    "click",
                    function () {

                        editarNota(
                            nota
                        );

                    }
                );


                /* =========================
                   BOTÃO EXCLUIR
                ========================== */

                const botaoExcluir =
                    document.createElement(
                        "button"
                    );


                botaoExcluir.className =
                    "botaoExcluirNota";


                botaoExcluir.textContent =
                    "🗑️ Excluir";


                botaoExcluir.addEventListener(
                    "click",
                    async function () {

                        const confirmar =
                            confirm(
                                "Deseja excluir esta lembrança? ❤️"
                            );


                        if (!confirmar) {

                            return;

                        }


                        await excluirArquivo(
                            "diario",
                            nota.id
                        );


                        carregarDiario();

                    }
                );


                /* =========================
                   BOTÕES
                ========================== */

                const botoes =
                    document.createElement(
                        "div"
                    );


                botoes.className =
                    "botoesNota";


                botoes.appendChild(
                    botaoEditar
                );


                botoes.appendChild(
                    botaoExcluir
                );


                /* =========================
                   MONTAR NOTA
                ========================== */

                elemento.appendChild(
                    titulo
                );

                elemento.appendChild(
                    texto
                );

                elemento.appendChild(
                    data
                );

                elemento.appendChild(
                    botoes
                );


                listaDiario.appendChild(
                    elemento
                );

            }
        );

}


/* =========================
   FORMATAR DATA
========================= */

function formatarData(
    data
) {

    return new Date(
        data
    ).toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}

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

function mostrarBotoesSuperiores() {

    botaoInicio.style.display =
        "block";

    botaoSair.style.display =
        "block";

}


function esconderBotoesSuperiores() {

    botaoInicio.style.display =
        "none";

    botaoSair.style.display =
        "none";

}


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
    ) === "true"
) {

    iniciarMusicaApp();

    sessionStorage.removeItem(
        "iniciarMusicaApp"
    );

}