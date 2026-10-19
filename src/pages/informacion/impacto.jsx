
const indicadores = [
  { icono: "🌱", titulo: "Plantas cultivadas", valor: "248", unidad: "unidades" },
  { icono: "💧", titulo: "Agua ahorrada", valor: "1240", unidad: "litros" },
  { icono: "🌳", titulo: "CO2 reducido", valor: "42", unidad: "kg" },
  { icono: "♻️", titulo: "Residuos reutilizados", valor: "86", unidad: "kg" }
];

const puntos = [
  [45, 155],
  [115, 125],
  [185, 95],
  [255, 75],
  [325, 55],
  [395, 25]
];

export default function Impacto() {
  const linea = puntos
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const area = `45,180 ${linea} 395,180`;

  return (
    <main className="pagina-impacto">
      <section className="indicadores">
        {indicadores.map((item) => (
          <article className="indicador" key={item.titulo}>
            <span className="indicador-icono">{item.icono}</span>
            <h2>{item.titulo}</h2>
            <p className="indicador-valor">{item.valor}</p>
            <p>{item.unidad}</p>
          </article>
        ))}
      </section>

      <section className="grafico-impacto">
        <h1>Información del medio ambiente</h1>
        <h2>Impacto ambiental durante el año</h2>

        <svg
          viewBox="0 0 440 225"
          role="img"
          aria-label="Gráfico ilustrativo de impacto ambiental de enero a junio"
        >
          {[40, 80, 120, 160, 200].map((y, i) => (
            <g key={y}>
              <line
                x1="40"
                y1={y - 10}
                x2="410"
                y2={y - 10}
                stroke="#dddddd"
              />
              <text x="28" y={y - 5} textAnchor="end" fontSize="11">
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
          />

          {puntos.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill="#65a936" />
          ))}

          {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((mes, i) => (
            <text
              key={mes}
              x={45 + i * 70}
              y="205"
              textAnchor="middle"
              fontSize="12"
            >
              {mes}
            </text>
          ))}
        </svg>

        <p className="nota-grafico">
          Gráfico ilustrativo de los avances ambientales.
        </p>
      </section>
    </main>
  );
}
