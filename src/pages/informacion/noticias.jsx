
import { useState } from "react";

const listaNoticias = [
  {
    titulo: "Cultivo sostenible",
    imagen: "/img/cultivo.png",
    texto: "Se incorporan nuevas técnicas de cultivo sostenible para preservar el medio ambiente y aprovechar mejor los recursos disponibles."
  },
  {
    titulo: "Ahorro de agua",
    imagen: "/img/ahorro-agua.png",
    texto: "Utilizamos métodos de riego eficientes para disminuir el consumo de agua y evitar su desperdicio."
  },
  {
    titulo: "Reciclaje y compostaje",
    imagen: "/img/reciclaje-compos.png",
    texto: "Reutilizamos residuos orgánicos para producir compost, reduciendo la cantidad de desechos generados."
  },
  {
    titulo: "Biodiversidad",
    imagen: "/img/biodiversidad.png",
    texto: "Los espacios verdes ayudan a proporcionar refugio y alimento a numerosas especies que forman parte del ecosistema."
  }
];

export default function Noticias() {
  const [indice, setIndice] = useState(0);

  function anterior() {
    setIndice((actual) =>
      (actual - 1 + listaNoticias.length) % listaNoticias.length
    );
  }

  function siguiente() {
    setIndice((actual) =>
      (actual + 1) % listaNoticias.length
    );
  }

  const noticia = listaNoticias[indice];

  return (
    <main className="pagina-noticias">
      <h1>Noticias del Huerto</h1>

      <section className="noticia-tarjeta">
        <button
          className="flecha"
          onClick={anterior}
          aria-label="Noticia anterior"
        >
          ‹
        </button>

        <img
          className="noticia-imagen"
          src={noticia.imagen}
          alt={noticia.titulo}
        />

        <div className="noticia-texto">
          <h2>{noticia.titulo}</h2>
          <p>{noticia.texto}</p>
          <span>
            Noticia {indice + 1} de {listaNoticias.length}
          </span>
        </div>

        <button
          className="flecha"
          onClick={siguiente}
          aria-label="Noticia siguiente"
        >
          ›
        </button>
      </section>
    </main>
  );
}
