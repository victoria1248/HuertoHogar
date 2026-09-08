/* =====================================
   CONFIGURACIÓN
===================================== */

const estrellas =
    document.querySelectorAll(
        ".seleccion-estrellas span"
    );

const nombre =
    document.getElementById("nombre");

const reseña =
    document.getElementById("reseña");

const botonPublicar =
    document.getElementById("boton-publicar");

const listaResenas =
    document.getElementById("lista-resenas");

const promedio =
    document.getElementById("promedio");

const cantidadResenas =
    document.getElementById("cantidad-resenas");

const contador =
    document.getElementById("contador");

const sinResenas =
    document.getElementById("sin-resenas");


let calificacionSeleccionada = 0;

/* =====================================
   RESEÑAS INICIALES
===================================== */

let resenas = JSON.parse(
    localStorage.getItem("huertoHogarResenas")
) || [

        {
            nombre: "Carlos",
            texto: "Excelente sitio web.",
            estrellas: 5
        },

        {
            nombre: "María",
            texto: "Muy buenos productos.",
            estrellas: 5
        },

        {
            nombre: "Pedro",
            texto: "Muy buena atención.",
            estrellas: 5
        },

        {
            nombre: "Sofía",
            texto: "Me gustó mucho la página.",
            estrellas: 5
        },

        {
            nombre: "Juan",
            texto: "Muy recomendable.",
            estrellas: 4
        }

    ];

/* =====================================
   GUARDAR RESEÑAS
===================================== */

function guardarResenas() {

    localStorage.setItem(
        "huertoHogarResenas",
        JSON.stringify(resenas)
    );
}

/* =====================================
   SELECCIONAR ESTRELLAS
===================================== */

estrellas.forEach(function (estrella) {

    /* AL PASAR EL MOUSE */

    estrella.addEventListener(
        "mouseenter",
        function () {

            const valor =
                Number(
                    this.dataset.valor
                );

            pintarEstrellas(valor);

        }
    );

    /* AL HACER CLICK */

    estrella.addEventListener(
        "click",
        function () {

            calificacionSeleccionada =
                Number(
                    this.dataset.valor
                );

            pintarEstrellas(
                calificacionSeleccionada
            );

        }
    );

});

/* =====================================
   QUITAR EFECTO AL SALIR
===================================== */

document
    .querySelector(".seleccion-estrellas")
    .addEventListener(
        "mouseleave",
        function () {

            pintarEstrellas(
                calificacionSeleccionada
            );

        }
    );



/* =====================================
   PINTAR ESTRELLAS
===================================== */

function pintarEstrellas(cantidad) {

    estrellas.forEach(
        function (estrella) {

            const valor =
                Number(
                    estrella.dataset.valor
                );

            if (valor <= cantidad) {

                estrella.classList.add(
                    "seleccionada"
                );

            } else {

                estrella.classList.remove(
                    "seleccionada"
                );

            }

        }
    );

}

/* =====================================
   CONTADOR DE CARACTERES
===================================== */

reseña.addEventListener(
    "input",
    function () {

        contador.textContent =
            reseña.value.length + " / 200";

    }
);

/* =====================================
   PUBLICAR RESEÑA
===================================== */

botonPublicar.addEventListener(
    "click",
    function () {

        const nombreUsuario =
            nombre.value.trim();

        const textoResena =
            reseña.value.trim();


        /* VALIDAR NOMBRE */

        if (nombreUsuario === "") {

            alert(
                "Por favor, escribe tu nombre."
            );

            nombre.focus();

            return;
        }

        /* VALIDAR RESEÑA */

        if (textoResena === "") {

            alert(
                "Por favor, escribe una reseña."
            );

            reseña.focus();

            return;
        }

        /* VALIDAR ESTRELLAS */

        if (
            calificacionSeleccionada === 0
        ) {

            alert(
                "Selecciona una calificación de 1 a 5 estrellas."
            );

            return;
        }

        /* CREAR RESEÑA */

        const nuevaResena = {

            nombre: nombreUsuario,

            texto: textoResena,

            estrellas:
                calificacionSeleccionada

        };

        /* AGREGAR AL PRINCIPIO */

        resenas.unshift(
            nuevaResena
        );

        /* GUARDAR */

        guardarResenas();

        /* LIMPIAR */

        nombre.value = "";

        reseña.value = "";

        contador.textContent =
            "0 / 200";

        calificacionSeleccionada = 0;

        pintarEstrellas(0);

        /* ACTUALIZAR */

        mostrarResenas();

        alert(
            "¡Tu reseña fue publicada correctamente!"
        );

    }
);

/* =====================================
   MOSTRAR RESEÑAS
===================================== */

function mostrarResenas() {

    listaResenas.innerHTML = "";

    if (resenas.length === 0) {

        sinResenas.style.display =
            "block";

        return;

    }

    sinResenas.style.display =
        "none";
    resenas.forEach(
        function (resena, indice) {

            const tarjeta =
                document.createElement(
                    "div"
                );

            tarjeta.classList.add(
                "tarjeta-resena"
            );

            /* CABECERA */

            const cabecera =
                document.createElement(
                    "div"
                );

            cabecera.classList.add(
                "cabecera-tarjeta"
            );

            /* ICONO */

            const icono =
                document.createElement(
                    "span"
                );

            icono.classList.add(
                "icono-tarjeta"
            );

            icono.textContent = "♙";

            /* NOMBRE */

            const nombreElemento =
                document.createElement(
                    "span"
                );

            nombreElemento.classList.add(
                "nombre-tarjeta"
            );

            nombreElemento.textContent =
                resena.nombre;


            /* ESTRELLAS */

            const estrellasElemento =
                document.createElement(
                    "span"
                );

            estrellasElemento.classList.add(
                "estrellas-tarjeta"
            );

            estrellasElemento.textContent =
                generarEstrellas(
                    resena.estrellas
                );


            /* ARMAR CABECERA */

            cabecera.appendChild(
                icono
            );

            cabecera.appendChild(
                nombreElemento
            );

            cabecera.appendChild(
                estrellasElemento
            );

            /* TEXTO */

            const texto =
                document.createElement(
                    "p"
                );

            texto.classList.add(
                "texto-tarjeta"
            );

            texto.textContent =
                resena.texto;


            /* BOTÓN ELIMINAR */

            const eliminar =
                document.createElement(
                    "button"
                );

            eliminar.classList.add(
                "eliminar-resena"
            );

            eliminar.textContent =
                "Eliminar";

            eliminar.addEventListener(
                "click",
                function () {

                    const confirmar =
                        confirm(
                            "¿Quieres eliminar esta reseña?"
                        );

                    if (confirmar) {

                        resenas.splice(
                            indice,
                            1
                        );

                        guardarResenas();

                        mostrarResenas();

                    }

                }
            );

            /* AGREGAR ELEMENTOS */

            tarjeta.appendChild(
                cabecera
            );

            tarjeta.appendChild(
                texto
            );

            tarjeta.appendChild(
                eliminar
            );

            listaResenas.appendChild(
                tarjeta
            );

        }
    );
    actualizarPromedio();

}

/* =====================================
   GENERAR ESTRELLAS
===================================== */

function generarEstrellas(cantidad) {

    let resultado = "";

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= cantidad) {

            resultado += "★";

        } else {

            resultado += "☆";

        }

    }
    return resultado;
}

/* =====================================
   CALCULAR PROMEDIO
===================================== */

function actualizarPromedio() {

    if (resenas.length === 0) {

        promedio.textContent =
            "0.0";

        cantidadResenas.textContent =
            "0 reseñas";

        return;

    }

    let suma = 0;


    resenas.forEach(
        function (resena) {

            suma +=
                resena.estrellas;

        }
    );
    const resultado =
        suma / resenas.length;


    promedio.textContent =
        resultado.toFixed(1);


    if (resenas.length === 1) {

        cantidadResenas.textContent =
            "1 reseña";

    } else {

        cantidadResenas.textContent =
            resenas.length +
            " reseñas";

    }
}

/* =====================================
   CARGAR AL ABRIR LA PÁGINA
===================================== */

mostrarResenas();