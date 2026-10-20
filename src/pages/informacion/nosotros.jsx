const valores = [
  {
    icono: "🌿",
    titulo: "Nuestra misión",
    descripcion:
      "Acercar productos frescos y naturales a las familias, promoviendo una alimentación consciente y una relación más responsable con el medio ambiente.",
  },
  {
    icono: "🤝",
    titulo: "Nuestro compromiso",
    descripcion:
      "Queremos facilitar una compra sencilla, cercana y transparente, destacando la importancia de los productos de temporada.",
  },
  {
    icono: "🌎",
    titulo: "Un futuro sostenible",
    descripcion:
      "Impulsamos pequeñas acciones cotidianas que ayudan a reducir residuos, cuidar el agua y valorar los recursos naturales.",
  },
];

export default function Nosotros() {
  return (
    <main
      className="w-100 py-5"
      style={{
        background: "linear-gradient(180deg, #f4faf4 0%, #ffffff 100%)",
        minHeight: "70vh",
      }}
    >
      {/* Usamos un contenedor propio para evitar reglas antiguas de
          .contenido-pagina, .pagina-nosotros y .nosotros-grid. */}
      <div
        className="mx-auto px-3 px-md-4"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <header className="text-center mx-auto mb-5" style={{ maxWidth: "790px" }}>
          <span
            className="d-inline-block rounded-pill px-4 py-2 mb-3 fw-bold"
            style={{ backgroundColor: "#e2f2e5", color: "#237244", letterSpacing: "0.1em", fontSize: "0.8rem" }}
          >
            QUIÉNES SOMOS
          </span>
          <h1 className="fw-bold mb-3" style={{ color: "#193e2a", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15 }}>
            Conectamos tu hogar con la naturaleza
          </h1>
          <p className="lead mb-0" style={{ color: "#58685d", lineHeight: 1.7 }}>
            En HuertoHogar creemos que comer bien comienza con elegir productos
            frescos y cuidar nuestro entorno.
          </p>
        </header>

        <section aria-label="Nuestros valores" className="row g-4 justify-content-center">
          {valores.map((valor) => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={valor.titulo}>
              <article
                className="card border-0 shadow-sm rounded-4 h-100 w-100"
                style={{ backgroundColor: "#ffffff", minWidth: 0, overflowWrap: "normal" }}
              >
                <div className="card-body p-4 p-xl-5 text-center d-flex flex-column align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px", backgroundColor: "#eaf6ec", fontSize: "2.2rem" }}
                    aria-hidden="true"
                  >
                    {valor.icono}
                  </div>
                  <h2 className="h4 fw-bold mb-3" style={{ color: "#237244" }}>
                    {valor.titulo}
                  </h2>
                  <p className="mb-0" style={{ color: "#536358", lineHeight: 1.8, fontSize: "1rem" }}>
                    {valor.descripcion}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </section>

        <div className="text-center mt-5 pt-2">
          <p className="mb-0 fw-medium" style={{ color: "#237244" }}>
            🌱 Cultivamos una forma más consciente de vivir.
          </p>
        </div>
      </div>
    </main>
  );
}
