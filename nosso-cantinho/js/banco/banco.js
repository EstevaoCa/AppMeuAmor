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