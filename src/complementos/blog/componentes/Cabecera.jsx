import { Link } from 'react-router-dom'

function Cabecera() {
    return (
        <header className="sitio-header">
            <div className="header-container">

                {/* Logo: vuelve al inicio */}
                <Link className="logo" to="/">
                    <img
                        src="/img/Logo_3.png"
                        alt="HuertoHogar"
                    />
                </Link>

                {/* Menú principal */}
                <nav className="nav-menu" aria-label="Menú principal">
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>

                        <li>
                            <Link to="/categorias">Categorías</Link>
                        </li>

                        <li>
                            <a href="nosotros.html">Nosotros</a>
                        </li>

                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>

                        <li>
                            <a href="contactos.html">Contacto</a>
                        </li>

                        <li>
                            <a href="impacto.html">Impacto</a>
                        </li>

                        <li>
                            <a href="noticia.html">Noticias</a>
                        </li>

                        <li>
                            <a href="producto.html">Productos</a>
                        </li>
                    </ul>
                </nav>

                {/* Cuenta y carrito */}
                <div className="header-icons">
                    <a href="login.html" title="Mi cuenta">
                        <img
                            src="/img/icon_perfil.png"
                            alt="Mi cuenta"
                        />
                    </a>

                    <a href="pago_envio.html" title="Pago y envío">
                        <img
                            src="/img/icon_carrito.png"
                            alt="Pago y envío"
                        />
                    </a>
                </div>

            </div>
        </header>
    )
}

export default Cabecera