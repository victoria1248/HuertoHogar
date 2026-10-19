
import { useState } from "react";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: ""
  });

  function actualizar(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  }

  function enviar(e) {
    e.preventDefault();

    const asunto = encodeURIComponent(formulario.asunto);
    const cuerpo = encodeURIComponent(
      `Nombre: ${formulario.nombre}\n` +
      `Correo: ${formulario.correo}\n\n` +
      formulario.mensaje
    );

    window.location.href =
      `mailto:info@huertohogar.cl?subject=${asunto}&body=${cuerpo}`;
  }

  return (
    <main className="pagina-contacto">
      <section className="contacto-info">
        <h1>Contáctanos</h1>

        <div className="dato-contacto">
          <span className="icono-contacto">✉</span>
          <a href="mailto:info@huertohogar.cl">
            info@huertohogar.cl
          </a>
        </div>

        <div className="dato-contacto">
          <span className="icono-contacto">☎</span>
          <a href="tel:+5687654321">
            +56 8765 4321
          </a>
        </div>

        <div className="dato-contacto">
          <span className="icono-contacto">⌖</span>
          <span>
            Huerto Hogar (Región de Valparaíso, Chile)
          </span>
        </div>
      </section>

      <section className="contacto-formulario">
        <h2>Envíanos un mensaje</h2>
        <p>
          Completa el formulario para comunicarte con nosotros.
        </p>

        <form onSubmit={enviar}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={actualizar}
            required
          />

          <label htmlFor="correo">Tu correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={formulario.correo}
            onChange={actualizar}
            required
          />

          <label htmlFor="asunto">Asunto</label>
          <input
            id="asunto"
            name="asunto"
            value={formulario.asunto}
            onChange={actualizar}
            required
          />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formulario.mensaje}
            onChange={actualizar}
            rows="5"
            required
          />

          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}
