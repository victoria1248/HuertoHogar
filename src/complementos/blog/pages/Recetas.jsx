import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/contenidoBlog.css'

const recetas = [
    {
        id: 1,
        imagen:'/img/quinoa.jpg',
        nombre: 'Quinua con verduras',
        descripcion: 'Una preparación colorida para acompañar tu almuerzo.',
        tiempo: '30 minutos',
        porciones: '2 personas',
        productos: 'Quinua Orgánica, Espinacas Frescas y Pimientos Tricolores',
        ingredientes: [
            '1 taza de quinua',
            '2 tazas de agua',
            '1 pimiento picado',
            '1 taza de espinacas lavadas',
            '1 cucharada de aceite',
            'Sal y limón a gusto',
        ],
        pasos: [
            'Enjuaga la quinua usando un colador fino.',
            'Pon la quinua y el agua en una olla. Cocina a fuego suave, tapada, unos 15 minutos o según las instrucciones del envase.',
            'En una sartén, calienta el aceite y saltea el pimiento hasta que esté tierno.',
            'Agrega las espinacas y cocina hasta que se ablanden.',
            'Mezcla las verduras con la quinua y aliña con sal y limón.',
        ],
    },
    {
        id: 2,
        imagen: '/img/batidoPlatano.png',
        nombre: 'Batido de plátano',
        descripcion: 'Una bebida cremosa y sencilla para preparar en casa.',
        tiempo: '5 minutos',
        porciones: '2 personas',
        productos: 'Plátanos Cavendish y Leche Entera',
        ingredientes: [
            '2 plátanos maduros',
            '2 tazas de leche fría',
            'Canela a gusto, opcional',
        ],
        pasos: [
            'Pela los plátanos y córtalos en trozos.',
            'Colócalos en la licuadora junto con la leche.',
            'Licúa hasta obtener una mezcla uniforme.',
            'Sirve de inmediato y agrega canela si deseas.',
        ],
    },
    {
        id: 3,
        imagen:'/img/manzanaCanela.png',
        nombre: 'Manzanas tibias con canela',
        descripcion: 'Un postre fácil que aprovecha el dulzor de la fruta.',
        tiempo: '20 minutos',
        porciones: '2 personas',
        productos: 'Manzanas Fuji',
        ingredientes: [
            '2 manzanas Fuji',
            '4 cucharadas de agua',
            '½ cucharadita de canela',
        ],
        pasos: [
            'Lava las manzanas, retira las semillas y córtalas en cubos.',
            'Pon la fruta en una olla pequeña con el agua y la canela.',
            'Tapa y cocina a fuego bajo entre 10 y 15 minutos, revolviendo de vez en cuando.',
            'Agrega un poco más de agua si se seca antes de que la fruta esté tierna.',
            'Sirve tibio.',
        ],
    },
    {
        id: 4,
        imagen:'/img/zanahoriaNaranja.png',
        nombre: 'Ensalada de zanahoria y naranja',
        descripcion: 'Una combinación fresca para acompañar tus comidas.',
        tiempo: '10 minutos',
        porciones: '2 personas',
        productos: 'Zanahorias Orgánicas y Naranjas Valencia',
        ingredientes: [
            '2 zanahorias',
            '1 naranja Valencia',
            '1 cucharada de aceite de oliva',
            'Jugo de limón y sal a gusto',
        ],
        pasos: [
            'Lava las zanahorias, pélalas si lo prefieres y rállalas.',
            'Pela la naranja y corta los gajos en trozos, retirando las semillas.',
            'Mezcla la zanahoria con los trozos de naranja.',
            'Aliña con aceite de oliva, limón y sal. Sirve de inmediato.',
        ],
    },
]

function Recetas() {
    const [busqueda, setBusqueda] = useState('')

    const resultados = recetas.filter((receta) =>
        `${receta.nombre} ${receta.productos}`
            .toLocaleLowerCase('es')
            .includes(busqueda.trim().toLocaleLowerCase('es'))
    )

    return (
        <main className="hh-blog-contenido">
            <div className="hh-blog-interior">
                <Link to="/blog" className="hh-blog-volver">
                    ← Volver al blog
                </Link>

                <header className="hh-blog-portada">
                    <span className="hh-blog-etiqueta">
                        DEL CAMPO A TU COCINA
                    </span>

                    <h1>Recetas para compartir</h1>

                    <p>
                        Descubre nuevas formas de disfrutar los productos
                        de HuertoHogar con preparaciones sencillas.
                    </p>

                    <Link to="/blog/consejos" className="hh-blog-enlace">
                        Explorar consejos de cultivo →
                    </Link>
                </header>

                <div className="hh-blog-buscador">
                    <label htmlFor="buscar-receta">
                        Busca una receta o un producto
                    </label>

                    <input
                        id="buscar-receta"
                        type="search"
                        placeholder="Ejemplo: manzana, quinua, espinacas..."
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />

                    <p role="status">
                        {resultados.length} recetas encontradas
                    </p>
                </div>

                <section className="hh-blog-tarjetas" aria-label="Recetas">
                    {resultados.map((receta) => (
                        <article className="hh-blog-tarjeta" key={receta.id}>
                            <div className="hh-blog-ilustracion" aria-hidden="true">
                                 <img
                                            src={receta.imagen}
                                            alt={receta.nombre}
                                            className="imagen-receta"
                                />
                            </div>

                            <div className="hh-blog-cuerpo">
                                <div className="hh-blog-datos">
                                    <span>{receta.tiempo}</span>
                                    <span>{receta.porciones}</span>
                                </div>

                                <h2>{receta.nombre}</h2>
                                <p>{receta.descripcion}</p>

                                <p className="hh-blog-productos">
                                    <strong>Productos HuertoHogar:</strong>
                                    {' '}{receta.productos}.
                                </p>

                                <details className="hh-blog-detalle">
                                    <summary>Ver ingredientes y preparación</summary>

                                    <h3>Ingredientes</h3>
                                    <ul>
                                        {receta.ingredientes.map((ingrediente) => (
                                            <li key={ingrediente}>{ingrediente}</li>
                                        ))}
                                    </ul>

                                    <h3>Preparación</h3>
                                    <ol>
                                        {receta.pasos.map((paso) => (
                                            <li key={paso}>{paso}</li>
                                        ))}
                                    </ol>
                                </details>

                                <Link to="/categorias" className="hh-blog-enlace">
                                    Explorar nuestras categorías →
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>

                {resultados.length === 0 && (
                    <p className="hh-blog-vacio">
                        No encontramos recetas con ese nombre o producto.
                        Prueba con otra palabra.
                    </p>
                )}
            </div>
        </main>
    )
}

export default Recetas