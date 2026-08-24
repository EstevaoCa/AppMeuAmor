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
                ========================= */

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
                ========================= */

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
                ========================= */

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
                ========================= */

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