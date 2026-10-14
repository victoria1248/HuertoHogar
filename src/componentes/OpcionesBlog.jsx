function OpcionesBlog() {
    return (
        <section className="opciones-blog">
            <article className="opcion">
                <img
                    src="/img/Comida.jpeg"
                    alt="Receta saludable"
                />

                <a href="#">Recetas</a>
            </article>

            <article className="opcion">
                <img
                    src="/img/Trigo.jpeg"
                    alt="Cosecha de trigo"
                />

                <a href="/noticia.html">Consejos de cultivo</a>
            </article>

            <article className="opcion">
                <img
                    src="/img/Cultivos.jpeg"
                    alt="Persona trabajando en un huerto"
                />

                <a href="/nosotros.html">Ver nuestros huertos</a>
            </article>
        </section>
    )
}

export default OpcionesBlog