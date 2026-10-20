import { useState } from 'react'

const correoDestino = 'info@huertohogar.cl'

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  })

  function actualizar(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()

    const asunto = encodeURIComponent(formulario.asunto.trim())
    const cuerpo = encodeURIComponent(
      `Nombre: ${formulario.nombre.trim()}\n` +
      `Correo: ${formulario.correo.trim()}\n\n` +
      formulario.mensaje.trim()
    )

    // Abre la aplicación de correo del visitante; no envía el mensaje automáticamente.
    window.location.href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`
  }

  return (
    <main className="pagina-contacto contacto-amplio py-4 py-md-5">
      <style>{`
        .pagina-contacto.contacto-amplio {
          width: min(1280px, calc(100% - 48px)) !important;
          max-width: 1280px !important;
          margin: 0 auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          display: block !important;
        }
        .contacto-amplio > .contacto-distribucion {
          display: grid !important;
          grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.65fr) !important;
          gap: 30px !important;
          align-items: start !important;
          width: 100% !important;
          margin: 0 !important;
        }
        .contacto-amplio .contacto-info,
        .contacto-amplio .contacto-formulario {
          width: 100% !important;
          max-width: none !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 30px !important;
          box-sizing: border-box !important;
        }
        .contacto-amplio .contacto-formulario form { width: 100%; max-width: none; }
        .contacto-amplio .contacto-formulario .form-control { width: 100%; }
        @media (max-width: 767px) {
          .pagina-contacto.contacto-amplio { width: calc(100% - 28px) !important; }
          .contacto-amplio > .contacto-distribucion { grid-template-columns: minmax(0, 1fr) !important; gap: 18px !important; }
          .contacto-amplio .contacto-info,
          .contacto-amplio .contacto-formulario { padding: 22px !important; }
        }
      `}</style>
      <div className="contacto-distribucion">
        <section className="contacto-info" aria-labelledby="titulo-contacto">
          <h1 id="titulo-contacto" className="fw-bold mb-4">Contáctanos</h1>

          <div className="dato-contacto d-flex align-items-center gap-3 mb-3">
            <span className="icono-contacto" aria-hidden="true">✉</span>
            <a href={`mailto:${correoDestino}`}>{correoDestino}</a>
          </div>

          <div className="dato-contacto d-flex align-items-center gap-3 mb-3">
            <span className="icono-contacto" aria-hidden="true">☎</span>
            <a href="tel:+5687654321">+56 8765 4321</a>
          </div>

          <div className="dato-contacto d-flex align-items-center gap-3 mb-3">
            <span className="icono-contacto" aria-hidden="true">⌖</span>
            <span>Huerto Hogar (Región de Valparaíso, Chile)</span>
          </div>
        </section>

        <section className="contacto-formulario" aria-labelledby="titulo-formulario">
          <h2 id="titulo-formulario" className="h3 fw-bold mb-2">Envíanos un mensaje</h2>
          <p className="text-secondary mb-4">Completa el formulario para comunicarte con nosotros.</p>

          <form onSubmit={enviar} className="row g-3">
            <div className="col-12">
              <label className="form-label" htmlFor="nombre">Nombre</label>
              <input className="form-control" id="nombre" name="nombre" type="text" autoComplete="name" value={formulario.nombre} onChange={actualizar} required />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="correo">Tu correo</label>
              <input className="form-control" id="correo" name="correo" type="email" autoComplete="email" value={formulario.correo} onChange={actualizar} required />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="asunto">Asunto</label>
              <input className="form-control" id="asunto" name="asunto" type="text" value={formulario.asunto} onChange={actualizar} required />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="mensaje">Mensaje</label>
              <textarea className="form-control" id="mensaje" name="mensaje" value={formulario.mensaje} onChange={actualizar} rows={5} required />
            </div>

            <div className="col-12 d-grid d-sm-flex">
              <button className="btn btn-success px-4 py-2" type="submit">Enviar mensaje</button>
            </div>
            <p className="col-12 small text-secondary mb-0">
              Al enviar, se abrirá tu aplicación de correo con el mensaje preparado. Deberás confirmar el envío allí.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}
