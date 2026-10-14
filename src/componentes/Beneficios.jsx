function Beneficios() {
    return (
        <section className="beneficios" aria-label="Nuestros beneficios">
            <article>
                <i className="fa-solid fa-leaf" aria-hidden="true"></i>

                <div>
                    <h3>Productos frescos</h3>
                    <p>Directo del campo</p>
                </div>
            </article>

            <article>
                <i className="fa-solid fa-truck" aria-hidden="true"></i>

                <div>
                    <h3>Envíos a todo Chile</h3>
                    <p>Rápidos y seguros</p>
                </div>
            </article>

            <article>
                <i
                    className="fa-solid fa-shield-halved"
                    aria-hidden="true"
                ></i>

                <div>
                    <h3>100% naturales</h3>
                    <p>Sin químicos añadidos</p>
                </div>
            </article>

            <article>
                <i className="fa-regular fa-heart" aria-hidden="true"></i>

                <div>
                    <h3>Apoyamos lo local</h3>
                    <p>Agricultores chilenos</p>
                </div>
            </article>
        </section>
    )
}

export default Beneficios