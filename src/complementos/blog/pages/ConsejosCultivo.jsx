import { useState } from 'react'
import { Link } from 'react-router-dom'


const consejos = [
    {
        id: 1,
        imagen:'/img/cultivosBlog.png',
        tema: 'Primeros pasos',
        titulo: 'Comienza con un espacio pequeño',
        resumen: 'Unas pocas macetas pueden ser el inicio de tu huerto.',
        pasos: [
            'Elige un lugar al que puedas acceder fácilmente para regar y observar tus plantas.',
            'Observa cuánta luz recibe durante el día antes de elegir qué cultivar.',
            'Comienza con pocos cultivos y revisa las indicaciones de cada semilla.',
            'Anota qué sembraste y la fecha para seguir su crecimiento.',
        ],
    },
    {
        id: 2,
        imagen:'/img/Humedad.png',
        tema: 'Cuidados',
        titulo: 'Riega según la humedad de la tierra',
        resumen: 'La necesidad de agua cambia con el clima y el cultivo.',
        pasos: [
            'Revisa la humedad del sustrato antes de regar.',
            'Aplica el agua lentamente sobre la tierra.',
            'Usa recipientes con agujeros de drenaje para evitar que el agua se acumule.',
            'Ajusta el riego según la temperatura, el tamaño de la maceta y las necesidades de la planta.',
        ],
    },
    {
        id: 3,
        imagen:'/img/Hortalizas.png',
        tema: 'Hortalizas',
        titulo: 'Prepara el espacio para tus zanahorias',
        resumen: 'Sus raíces necesitan espacio y una tierra sin obstáculos.',
        pasos: [
            'Escoge un recipiente con profundidad suficiente para la variedad que sembrarás.',
            'Prepara una tierra suelta y retira piedras grandes.',
            'Sigue la profundidad y separación indicadas en el envase de semillas.',
            'Mantén la humedad durante la germinación, evitando encharcar.',
        ],
    },
    {
        id: 4,
        imagen:'/img/espenicas.png',
        tema: 'Hortalizas',
        titulo: 'Observa el crecimiento de tus espinacas',
        resumen: 'Planifica la siembra considerando tu clima local.',
        pasos: [
            'Consulta la época de siembra recomendada para tu zona y variedad.',
            'Deja espacio entre plantas siguiendo las indicaciones de las semillas.',
            'Observa regularmente el color y el estado de las hojas.',
            'Al cosechar, utiliza herramientas limpias y evita arrancar toda la planta si buscas una cosecha gradual de hojas.',
        ],
    },
    {
        id: 5,
        imagen:'/img/residuos.png' ,
        tema: 'Sostenibilidad',
        titulo: 'Aprovecha los residuos vegetales',
        resumen: 'Separa materiales que puedas utilizar en una compostera.',
        pasos: [
            'Reserva restos vegetales, como cáscaras de frutas y verduras.',
            'Combínalos con materiales secos, como hojas secas o cartón sin plastificar trozado.',
            'Mantén la mezcla aireada y húmeda, sin empaparla.',
            'Para una compostera doméstica sencilla, evita carnes, aceites y lácteos.',
            'Utiliza el compost cuando esté maduro, con aspecto de tierra y sin restos frescos reconocibles.',
        ],
    },
    {
        id: 6,
        imagen:'/img/cuidados.png',
        tema: 'Cuidados',
        titulo: 'Revisa tus plantas con frecuencia',
        resumen: 'Observar pequeños cambios ayuda a detectar problemas.',
        pasos: [
            'Mira ambos lados de las hojas y revisa los tallos.',
            'Retira hojas caídas y mantén limpias tus herramientas.',
            'Si observas daño, identifica su causa antes de aplicar un tratamiento.',
            'Evita aplicar mezclas caseras o productos sin conocer su efecto sobre el cultivo.',
        ],
    },
]

const temas = [
    'Todos',
    'Primeros pasos',
    'Cuidados',
    'Hortalizas',
    'Sostenibilidad',
]

function ConsejosCultivo() {
    const [temaActivo, setTemaActivo] = useState('Todos')

    const resultados = consejos.filter(
        (consejo) => temaActivo === 'Todos' || consejo.tema === temaActivo
    )

    return (
        <main className="hh-blog-contenido">
            <div className="hh-blog-interior">
                <Link to="/blog" className="hh-blog-volver">
                    ← Volver al blog
                </Link>

                <header className="hh-blog-portada">
                    <span className="hh-blog-etiqueta">
                        CULTIVA EN CASA
                    </span>

                    <h1>Pequeños cuidados, nuevos brotes</h1>

                    <p>
                        Ideas para comenzar tu huerto y cuidar tus cultivos.
                        Adapta cada consejo al clima de tu zona y a la
                        variedad que elijas.
                    </p>

                    <Link to="/blog/recetas" className="hh-blog-enlace">
                        Descubrir recetas →
                    </Link>
                </header>

                <div className="hh-blog-filtros" aria-label="Filtrar consejos por tema">
                    {temas.map((tema) => (
                        <button
                            key={tema}
                            type="button"
                            className={temaActivo === tema ? 'activo' : ''}
                            aria-pressed={temaActivo === tema}
                            onClick={() => setTemaActivo(tema)}
                        >
                            {tema}
                        </button>
                    ))}
                </div>

                <section className="hh-blog-tarjetas" aria-label="Consejos de cultivo">
                    {resultados.map((consejo) => (
                        <article className="hh-blog-tarjeta" key={consejo.id}>
                           <div className="hh-consejo-foto">
                                <img
                                    src={consejo.imagen}
                                    alt={consejo.titulo}
                                    loading="lazy"
                                />
                            </div>

                            <div className="hh-blog-cuerpo">
                                <span className="hh-blog-etiqueta">
                                    {consejo.tema}
                                </span>

                                <h2>{consejo.titulo}</h2>
                                <p>{consejo.resumen}</p>

                                <details className="hh-blog-detalle">
                                    <summary>Leer consejo completo</summary>

                                    <ol>
                                        {consejo.pasos.map((paso) => (
                                            <li key={paso}>{paso}</li>
                                        ))}
                                    </ol>
                                </details>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    )
}

export default ConsejosCultivo