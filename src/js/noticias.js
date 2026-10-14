const noticias = [
    {
        titulo: "Cultivo sostenible",
        imagen: "../img/cultivo.png",
        descripcion: "Se incorporan nuevas técnicas de cultivo sostenible para mejorar el crecimiento de las plantas y aprovechar mejor los recursos disponibles."
    },

    {
        titulo: "Ahorro de agua",
        imagen: "../img/ahorro-agua.png",
        descripcion: "Utilizamos métodos de riego eficientes para disminuir el consumo de agua y evitar su desperdicio."
    },

    {
        titulo: "Reciclaje y compostaje",
        imagen: "../img/reciclaje-compos.png",
        descripcion: "Reutilizamos residuos orgánicos para producir compost, reduciendo la cantidad de desechos generados."
    },

    {
        titulo: "Biodiversidad",
        imagen: "../img/biodiversidad.png",
        descripcion: "Los espacios verdes ayudan a proporcionar refugio y alimento para insectos y otros organismos que forman parte del ecosistema."
    } 
];

let posicion = 0;

function mostrarNoticia() {

    document.getElementById("titulo").textContent =
        noticias[posicion].titulo;

    document.getElementById("imagen").alt = noticias[posicion].titulo;
    document.getElementById("imagen").src =
        noticias[posicion].imagen;

    document.getElementById("descripcion").textContent =
        noticias[posicion].descripcion;
}

function siguiente() {

    posicion++;

    if (posicion >= noticias.length) {
        posicion = 0;
    }

    mostrarNoticia();
}

function anterior() {

    posicion--;

    if (posicion < 0) {
        posicion = noticias.length - 1;
    }

    mostrarNoticia();
}