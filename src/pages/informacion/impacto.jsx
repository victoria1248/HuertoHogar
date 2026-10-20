const indicadores = [
  { icono: '🌱', titulo: 'Plantas cultivadas', valor: '248', unidad: 'unidades' },
  { icono: '💧', titulo: 'Agua ahorrada', valor: '1240', unidad: 'litros' },
  { icono: '🌳', titulo: 'CO2 reducido', valor: '42', unidad: 'kg' },
  { icono: '♻️', titulo: 'Residuos reutilizados', valor: '86', unidad: 'kg' },
];

// Datos ilustrativos de enero a junio.
const puntos = [
  [45, 155],
  [115, 125],
  [185, 95],
  [255, 75],
  [325, 55],
  [395, 25],
];

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const marcas = [40, 80, 120, 160, 200];

export default function Impacto() {
  const linea = puntos.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `45,180 ${linea} 395,180`;

  return (
    <main className="bg-light py-5">
      <div className="container-fluid px-4 px-lg-5" style={{ maxWidth: 1600, margin: "0 auto" }}>
        <header className="text-center mb-5">
          <span className="badge rounded-pill text-bg-success px-3 py-2 mb-3">
            Nuestro compromiso
          </span>
          <h1 className="display-6 fw-bold text-success mb-2">
            Información del medio ambiente
          </h1>
          <p className="text-secondary mb-0">
            Conoce los indicadores ambientales de HuertoHogar.
          </p>
        </header>

        <section className="row g-4 mb-5" aria-label="Indicadores ambientales">
          {indicadores.map((item) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.titulo}>
              <article className="card border-0 shadow-sm rounded-4 h-100 text-center bg-white">
                <div className="card-body p-4 p-xl-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 230 }}>
                  <span className="fs-1 mb-3" aria-hidden="true">
                    {item.icono}
                  </span>
                  <h2 className="h6 fw-semibold text-secondary mb-3">
                    {item.titulo}
                  </h2>
                  <p className="display-6 fw-bold text-success mb-0">
                    {item.valor}
                  </p>
                  <p className="text-secondary small mb-0">{item.unidad}</p>
                </div>
              </article>
            </div>
          ))}
        </section>

        <section className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-4">
              <div>
                <h2 className="h4 fw-bold text-success mb-1">
                  Impacto ambiental durante el año
                </h2>
                <p className="text-secondary mb-0">
                  Evolución ilustrativa de enero a junio.
                </p>
              </div>
              <span className="badge text-bg-light border text-success align-self-start">
                Enero – Junio
              </span>
            </div>

            <div className="w-100" style={{ overflowX: 'auto' }}>
              <svg
                viewBox="0 0 440 225"
                role="img"
                aria-label="Gráfico ilustrativo de impacto ambiental de enero a junio"
                style={{ display: 'block', width: '100%', minWidth: 320, height: 'auto' }}
              >
                {marcas.map((y, i) => (
                  <g key={y}>
                    <line
                      x1="40"
                      y1={y - 10}
                      x2="410"
                      y2={y - 10}
                      stroke="#e2e8e2"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="28"
                      y={y - 5}
                      textAnchor="end"
                      fontSize="11"
                      fill="#64748b"
                    >
                      {(5 - i) * 40}
                    </text>
                  </g>
                ))}

                <polygon points={area} fill="#8fc779" opacity="0.25" />
                <polyline
                  points={linea}
                  fill="none"
                  stroke="#65a936"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {puntos.map(([x, y], i) => (
                  <circle key={meses[i]} cx={x} cy={y} r="4.5" fill="#65a936" />
                ))}

                {meses.map((mes, i) => (
                  <text
                    key={mes}
                    x={45 + i * 70}
                    y="205"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#475569"
                  >
                    {mes}
                  </text>
                ))}
              </svg>
            </div>

            <p className="text-secondary small mt-3 mb-0">
              Gráfico ilustrativo de los avances ambientales. Los valores mostrados
              son de demostración y no corresponden a mediciones verificadas.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
