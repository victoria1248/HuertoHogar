
import { useEffect, useState } from "react";

const claveResenas = "huertoHogarResenas";

const resenasIniciales = [
  {
    id: 1,
    nombre: "Cliente",
    texto: "Excelente calidad de los productos.",
    estrellas: 5
  },
  {
    id: 2,
    nombre: "Cliente",
    texto: "Buenos productos y atención.",
    estrellas: 4
  }
];

export default function Resenas() {
  const [resenas, setResenas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(claveResenas);
      return guardadas
        ? JSON.parse(guardadas)
        : resenasIniciales;
    } catch {
      return resenasIniciales;
    }
  });

  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);

  useEffect(() => {
    localStorage.setItem(
      claveResenas,
      JSON.stringify(resenas)
    );
  }, [resenas]);

  const promedio = resenas.length
    ? resenas.reduce((suma, r) => suma + r.estrellas, 0) /
      resenas.length
    : 0;

  function publicar(e) {
    e.preventDefault();

    const nueva = {
      id: Date.now(),
      nombre: nombre.trim() || "Cliente",
      texto: texto.trim(),
      estrellas
    };

    if (!nueva.texto) return;

    setResenas((actuales) => [nueva, ...actuales]);
    setNombre("");
    setTexto("");
    setEstrellas(5);
  }

  return (
    <main className="pagina-resenas">
      <h1>Reseñas</h1>

      <section className="resumen-resenas">
        <form className="formulario-resena" onSubmit={publicar}>
          <label htmlFor="nombre-resena">
            Nombre (opcional)
          </label>

          <input
            id="nombre-resena"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
            maxLength={50}
          />

          <label htmlFor="texto-resena">
            Escribe tu reseña
          </label>

          <textarea
            id="texto-resena"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Cuéntanos tu experiencia con Huerto Hogar..."
            rows={4}
            maxLength={500}
            required
          />

          <div className="selector-estrellas">
            <span>Tu calificación:</span>

            {[1, 2, 3, 4, 5].map((numero) => (
              <button
                key={numero}
                type="button"
                className={numero <= estrellas ? "estrella activa" : "estrella"}
                onClick={() => setEstrellas(numero)}
                aria-label={`${numero} estrellas`}
                aria-pressed={estrellas === numero}
              >
                ★
              </button>
            ))}

            <span>{estrellas}/5</span>
          </div>

          <button className="boton-publicar" type="submit">
            Publicar reseña
          </button>
        </form>

        <div className="promedio-resenas">
          <strong>{promedio.toFixed(1).replace(".", ",")}</strong>
          <div className="estrellas-promedio" aria-label={`Promedio ${promedio.toFixed(1)} de 5`}>
            {"★".repeat(Math.round(promedio))}
            {"☆".repeat(5 - Math.round(promedio))}
          </div>
          <p>{resenas.length} reseñas</p>
        </div>
      </section>

      <section className="lista-resenas">
        <h2>Opiniones de nuestros clientes</h2>

        {resenas.length === 0 ? (
          <p>Sé la primera persona en dejar una reseña.</p>
        ) : (
          resenas.map((resena) => (
            <article className="tarjeta-resena" key={resena.id}>
              <div className="cabecera-resena">
                <strong>{resena.nombre}</strong>
                <span className="estrellas-tarjeta">
                  {"★".repeat(resena.estrellas)}
                  {"☆".repeat(5 - resena.estrellas)}
                </span>
              </div>

              <p>{resena.texto}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}