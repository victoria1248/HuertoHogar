import { useState } from "react";

const listaNoticias = [
  {
    titulo: "Cultivo sostenible",
    imagen: "/img/cultivo.png",
    texto:
      "Se incorporan nuevas técnicas de cultivo sostenible para preservar el medio ambiente y aprovechar mejor los recursos disponibles.",
  },
  {
    titulo: "Ahorro de agua",
    imagen: "/img/ahorro-agua.png",
    texto:
      "Utilizamos métodos de riego eficientes para disminuir el consumo de agua y evitar su desperdicio.",
  },
  {
    titulo: "Reciclaje y compostaje",
    imagen: "/img/reciclaje-compos.png",
    texto:
      "Reutilizamos residuos orgánicos para producir compost, reduciendo la cantidad de desechos generados.",
  },
  {
    titulo: "Biodiversidad",
    imagen: "/img/biodiversidad.png",
    texto:
      "Los espacios verdes ayudan a proporcionar refugio y alimento a numerosas especies que forman parte del ecosistema.",
  },
];

export default function Noticias() {
  const [indice, setIndice] = useState(0);
  const noticia = listaNoticias[indice];

  const anterior = () => {
    setIndice((actual) => (actual - 1 + listaNoticias.length) % listaNoticias.length);
  };

  const siguiente = () => {
    setIndice((actual) => (actual + 1) % listaNoticias.length);
  };

  return (
    <main className="w-100 py-5" style={{ backgroundColor: "#f4f8f3", minHeight: "70vh" }}>
      <div className="container px-3 px-md-4" style={{ maxWidth: "1140px" }}>
        <header className="text-center mb-4 mb-md-5">
          <p className="text-success fw-bold text-uppercase small mb-2" style={{ letterSpacing: "0.12em" }}>
            Actualidad y medio ambiente
          </p>
          <h1 className="display-5 fw-bold text-dark mb-3">Noticias del Huerto</h1>
          <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "650px" }}>
            Descubre ideas y prácticas para cuidar nuestros cultivos y el planeta.
          </p>
        </header>

        <section className="card border-0 shadow-lg rounded-4 overflow-hidden" aria-label="Noticias del huerto">
          <div className="row g-0 align-items-stretch">
            <div className="col-12 col-lg-6">
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover", minHeight: "280px", maxHeight: "460px" }}
              />
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <div className="p-4 p-md-5 w-100">
                <span className="badge rounded-pill text-bg-success mb-3">Medio ambiente</span>
                <h2 className="h2 fw-bold text-dark mb-3">{noticia.titulo}</h2>
                <p className="fs-5 text-secondary lh-lg mb-4">{noticia.texto}</p>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <span className="small text-secondary" aria-live="polite">
                    Noticia {indice + 1} de {listaNoticias.length}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-success rounded-pill px-3"
                      onClick={anterior}
                      aria-label="Noticia anterior"
                    >
                      <span aria-hidden="true">←</span> Anterior
                    </button>
                    <button
                      type="button"
                      className="btn btn-success rounded-pill px-3"
                      onClick={siguiente}
                      aria-label="Noticia siguiente"
                    >
                      Siguiente <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="d-flex justify-content-center gap-2 mt-4" aria-label="Seleccionar noticia">
          {listaNoticias.map((item, posicion) => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => setIndice(posicion)}
              className={`btn rounded-pill ${indice === posicion ? "btn-success" : "btn-outline-success"}`}
              style={{ width: "36px", height: "10px", padding: 0 }}
              aria-label={`Ver noticia ${posicion + 1}: ${item.titulo}`}
              aria-current={indice === posicion ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
