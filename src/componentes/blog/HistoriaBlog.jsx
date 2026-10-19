function HistoriaBlog() {
    
    return (
        <section className="historia-blog">
            <h2>
                Cosechando bienestar:<br />
                La misión de Huerto Hogar
            </h2>

            <div className="historia-contenido">
                <div className="historia-imagen">
                    <img
                        src="/img/blog_2.png"
                        alt="Agricultor trabajando en el huerto"
                    />
                </div>

                <div className="historia-informacion">
                    <div className="historia-texto">
                        <p>
                            En Huerto Hogar, ponemos nuestro corazón y alma
                            en cada proyecto. Te ofrecemos soluciones
                            integrales para crear el entorno que siempre
                            soñaste, desde el diseño de un pequeño huerto
                            de balcón hasta la transformación completa de
                            tu hogar para integrar la naturaleza.
                        </p>

                        <p>
                            No solo diseñamos, te ayudamos a cultivar tu
                            propia comida y bienestar. Establecidos para
                            llevar la frescura del campo chileno
                            directamente a tu puerta, nuestra reputación
                            se basa en la innovación, la calidad y el
                            servicio excepcional.
                        </p>
                    </div>

                    <a href="/contacto" className="boton-asesoria">
                        Agendar una asesoría
                    </a>
                </div>
            </div>
        </section>
    )
}

export default HistoriaBlog