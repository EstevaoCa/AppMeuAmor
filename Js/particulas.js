/* =========================
    PARTÍCULAS
========================= */

function criarParticula() {

    const locais = [

        document.getElementById(
            "particulas"
        ),

        document.getElementById(
            "particulasTela6"
        )

    ];


    locais.forEach(
        local => {

            if (!local) {

                return;

            }


            const particula =
                document.createElement("span");


            particula.style.position =
                "absolute";

            particula.style.width =
                "3px";

            particula.style.height =
                "3px";

            particula.style.borderRadius =
                "50%";

            particula.style.background =
                "rgba(255,255,255,0.7)";

            particula.style.left =
                Math.random() * 100 + "%";

            particula.style.top =
                Math.random() * 100 + "%";

            particula.style.pointerEvents =
                "none";


            const duracao =
                4 + Math.random() * 6;


            particula.animate(
                [
                    {
                        opacity: 0,

                        transform:
                            "translateY(20px) scale(0.5)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateY(0) scale(1)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "translateY(-40px) scale(0.5)"
                    }
                ],
                {
                    duration:
                        duracao * 1000,

                    easing:
                        "ease-in-out",

                    iterations: 1
                }
            );


            local.appendChild(
                particula
            );


            setTimeout(() => {

                particula.remove();

            }, duracao * 1000);

        }
    );

}


/* =========================
    CRIAR PARTÍCULAS
========================= */

setInterval(
    criarParticula,
    500
);