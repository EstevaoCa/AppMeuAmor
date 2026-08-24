/* ==================================================
   EDITOR DA HISTÓRIA ❤️
================================================== */



/* ==================================================
   ELEMENTOS
================================================== */

const botaoEditarHistoria =
    document.getElementById(
        "botaoEditarHistoria"
    );

const telaEditorHistoria =
    document.getElementById(
        "telaEditorHistoria"
    );

const botaoVoltarEditorHistoria =
    document.getElementById(
        "botaoVoltarEditorHistoria"
    );

const botaoSalvarHistoria =
    document.getElementById(
        "botaoSalvarHistoria"
    );

const botaoCancelarEdicaoHistoria =
    document.getElementById(
        "botaoCancelarEdicaoHistoria"
    );

const camposFotoHistoria = [
    "editarFoto1",
    "editarFoto2",
    "editarFoto3",
    "editarFoto4",
    "editarFoto5",
    "editarFoto6",
    "editarFoto7",
    "editarFoto8"
];


/* ==================================================
   TEXTOS ORIGINAIS
================================================== */

const textosOriginaisHistoria = {

    mensagemFoto:
        "Na primeira vez que eu te vi, eu já sabia que você era especial. ❤️ Naquele momento, meu coração já sabia que era você… como se, de alguma forma, algo nos unil a ser meu amor.",

    perguntaMemoria:
        "Você sabe o que eu mais gosto em você?” ❤️",

    mensagemMemoria1:
        "Não é apenas pelos momentos felizes...”",

    mensagemMemoria2:
        "É pela forma como, ao seu lado, até os pequenos momentos se tornam inesquecíveis. ❤️",

    textoVideo1:
        "E foi assim que, pouco a pouco, nossa história começou a ganhar seus próprios momentos. ❤️",

    textoVideo2:
        "Cada sorriso, cada olhar, cada momento ao seu lado...",

    textoVideo3:
        "Talvez naquele momento eu ainda não soubesse, mas você estava se tornando uma das pessoas mais importantes da minha vida.",

    textoVideo4:
        "E quanto mais tempo passava, mais eu percebia o quanto era especial ter você comigo. ❤️",

    textoAmor:
        "Eu te amo muito. ❤️",

    mensagemApp:
        "Criei este app para você guardar seus vídeos, suas músicas e seus diários."

};


/* ==================================================
   ABRIR EDITOR
================================================== */

if (botaoEditarHistoria) {

    botaoEditarHistoria.addEventListener(
        "click",
        function () {

            const menuSuperiorApp =
                document.getElementById(
                    "menuSuperiorApp"
                );

            if (menuSuperiorApp) {
                menuSuperiorApp.classList.remove(
                    "aberto"
                );
            }

            carregarDadosEditor();

            telaEditorHistoria.classList.add(
                "ativa"
            );

        }
    );

}


/* ==================================================
   CARREGAR DADOS
================================================== */

function carregarDadosEditor() {

    const dadosSalvos =
        JSON.parse(
            localStorage.getItem(
                "historiaPersonalizada"
            )
        ) || {};

        camposFotoHistoria.forEach(
            function (id) {

                const campo = document.getElementById(id);

                if (campo) {
                    campo.value = "";
                }
            }
        );


    document.getElementById(
        "editarMensagemFoto"
    ).value =
        dadosSalvos.mensagemFoto ||
        textosOriginaisHistoria.mensagemFoto;


    document.getElementById(
        "editarPerguntaMemoria"
    ).value =
        dadosSalvos.perguntaMemoria ||
        textosOriginaisHistoria.perguntaMemoria;


    document.getElementById(
        "editarMensagemMemoria1"
    ).value =
        dadosSalvos.mensagemMemoria1 ||
        textosOriginaisHistoria.mensagemMemoria1;


    document.getElementById(
        "editarMensagemMemoria2"
    ).value =
        dadosSalvos.mensagemMemoria2 ||
        textosOriginaisHistoria.mensagemMemoria2;


    document.getElementById(
        "editarTextoVideo1"
    ).value =
        dadosSalvos.textoVideo1 ||
        textosOriginaisHistoria.textoVideo1;


    document.getElementById(
        "editarTextoVideo2"
    ).value =
        dadosSalvos.textoVideo2 ||
        textosOriginaisHistoria.textoVideo2;


    document.getElementById(
        "editarTextoVideo3"
    ).value =
        dadosSalvos.textoVideo3 ||
        textosOriginaisHistoria.textoVideo3;


    document.getElementById(
        "editarTextoVideo4"
    ).value =
        dadosSalvos.textoVideo4 ||
        textosOriginaisHistoria.textoVideo4;


    document.getElementById(
        "editarTextoAmor"
    ).value =
        dadosSalvos.textoAmor ||
        textosOriginaisHistoria.textoAmor;


    document.getElementById(
        "editarMensagemApp"
    ).value =
        dadosSalvos.mensagemApp ||
        textosOriginaisHistoria.mensagemApp;

}


/* ==================================================
   SALVAR HISTÓRIA
================================================== */

if (botaoSalvarHistoria) {

    botaoSalvarHistoria.addEventListener(
        "click",
        function () {

            const fotosSalvas =
                JSON.parse(
                    localStorage.getItem(
                        "historiaPersonalizada"
                    )
                ) || {};

            const dadosHistoria = {

                foto1: fotosSalvas.foto1 || null,

                foto2: fotosSalvas.foto2 || null,

                foto3: fotosSalvas.foto3 || null,

                foto4: fotosSalvas.foto4 || null,

                foto5: fotosSalvas.foto5 || null,

                foto6: fotosSalvas.foto6 || null,

                foto7: fotosSalvas.foto7 || null,

                foto8: fotosSalvas.foto8 || null,

                mensagemFoto:
                    document.getElementById(
                        "editarMensagemFoto"
                    ).value.trim(),

                perguntaMemoria:
                    document.getElementById(
                        "editarPerguntaMemoria"
                    ).value.trim(),

                mensagemMemoria1:
                    document.getElementById(
                        "editarMensagemMemoria1"
                    ).value.trim(),

                mensagemMemoria2:
                    document.getElementById(
                        "editarMensagemMemoria2"
                    ).value.trim(),

                textoVideo1:
                    document.getElementById(
                        "editarTextoVideo1"
                    ).value.trim(),

                textoVideo2:
                    document.getElementById(
                        "editarTextoVideo2"
                    ).value.trim(),

                textoVideo3:
                    document.getElementById(
                        "editarTextoVideo3"
                    ).value.trim(),

                textoVideo4:
                    document.getElementById(
                        "editarTextoVideo4"
                    ).value.trim(),

                textoAmor:
                    document.getElementById(
                        "editarTextoAmor"
                    ).value.trim(),

                mensagemApp:
                    document.getElementById(
                        "editarMensagemApp"
                    ).value.trim()

            };


            localStorage.setItem(
                "historiaPersonalizada",
                JSON.stringify(
                    dadosHistoria
                )
            );


            alert(
                "Sua história foi atualizada. ❤️"
            );


            fecharEditorHistoria();

        }
    );

}


/* ==================================================
   CANCELAR
================================================== */

if (botaoCancelarEdicaoHistoria) {

    botaoCancelarEdicaoHistoria.addEventListener(
        "click",
        function () {

            fecharEditorHistoria();

        }
    );

}


/* ==================================================
   VOLTAR
================================================== */

if (botaoVoltarEditorHistoria) {

    botaoVoltarEditorHistoria.addEventListener(
        "click",
        function () {

            fecharEditorHistoria();

        }
    );

}


/* ==================================================
   FECHAR EDITOR
================================================== */

function fecharEditorHistoria() {

    telaEditorHistoria.classList.remove(
        "ativa"
    );

}

camposFotoHistoria.forEach(
    function (id) {

        const campo = document.getElementById(id);

        if (!campo) {
            return;
        }

        campo.addEventListener(
            "change",
            function (evento) {

                const arquivo = evento.target.files[0];

                if (!arquivo) {
                    return;
                }

                const leitor = new FileReader();

                leitor.onload = function () {

                    const dadosAtualizados =
                        JSON.parse(
                            localStorage.getItem(
                                "historiaPersonalizada"
                            )
                        ) || {};

                    dadosAtualizados[`foto${id.replace("editarFoto", "")}`] =
                        leitor.result;

                    localStorage.setItem(
                        "historiaPersonalizada",
                        JSON.stringify(dadosAtualizados)
                    );
                };

                leitor.readAsDataURL(arquivo);
            }
        );
    }
);