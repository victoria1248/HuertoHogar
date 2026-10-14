function Footer() {
    return (
        <footer className="sitio-footer">
            {/* Logo */}
            <div className="footer-logo">
                <a href="/">
                    <img src="/img/logo_1.png" alt="HuertoHogar" />
                </a>
            </div>

            {/* Contacto */}
            <div className="footer-column">
                <h3>CONTACTO</h3>

                <ul>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contactos.html">Contáctanos</a></li>
                    <li><a href="pago_envio.html">Pago y envío</a></li>
                </ul>
            </div>

            {/* Información */}
            <div className="footer-column">
                <h3>INFORMACIÓN</h3>

                <ul>
                    <li><a href="categoria.html">Categorías</a></li>
                    <li><a href="impacto.html">Impacto ambiental</a></li>
                    <li><a href="noticia.html">Noticias</a></li>
                    <li><a href="admin.html">Acceso administrativo</a></li>
                </ul>
            </div>

            {/* Redes sociales */}
            <div className="footer-column">
                <h3>REDES SOCIALES</h3>

                <div className="social-icons">
                    <img
                        src="/img/facebook.png"
                        alt="Facebook"
                        className="social-img"
                    />

                    <img
                        src="/img/twitter.png"
                        alt="Twitter"
                        className="social-img"
                    />

                    <img
                        src="/img/instagram.png"
                        alt="Instagram"
                        className="social-img"
                    />
                </div>

                <p>@HuertoHogar · Región de Valparaíso, Chile</p>

                <p>
                    <a href="mailto:info@huertohogar.cl">
                        info@huertohogar.cl
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer