const CACHE_NAME = "nosso-cantinho-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./botao.png"
];

self.addEventListener("install", function (evento) {

    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(ARQUIVOS);

            })
    );

});


self.addEventListener("activate", function (evento) {

    evento.waitUntil(

        caches.keys()
            .then(function (nomes) {

                return Promise.all(

                    nomes
                        .filter(function (nome) {

                            return nome !== CACHE_NAME;

                        })
                        .map(function (nome) {

                            return caches.delete(nome);

                        })

                );

            })

    );

});


self.addEventListener("fetch", function (evento) {

    evento.respondWith(

        fetch(evento.request)
            .catch(function () {

                return caches.match(
                    evento.request
                );

            })

    );

});