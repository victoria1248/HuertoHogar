import { Link } from 'react-router-dom'

function OpcionesBlog() {
    return (
        <section className="opciones-blog">
            <article className="opcion">
                <img
                    src="/img/Comida.jpeg"
                    alt="Preparación con alimentos frescos"
                />

                <Link to="/blog/recetas">
                    Recetas
                </Link>
            </article>

            <article className="opcion">
                <img
                    src="/img/Trigo.jpeg"
                    alt="Cultivo de trigo"
                />

                <Link to="/blog/consejos">
                    Consejos de cultivo
                </Link>
            </article>

            <article className="opcion">
                <img
                    src="/img/Cultivos.jpeg"
                    alt="Persona trabajando en un huerto"
                />

                <a href="/nosotros">
                    Ver nuestros huertos
                </a>
            </article>
        </section>
    )
}

export default OpcionesBlog