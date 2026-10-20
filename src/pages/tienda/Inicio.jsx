import React from 'react'

// Conservamos los estilos originales de HuertoHogar.
import '../../css/tienda/estilos.css'
import '../../css/tienda/responsive.css'
import '../../css/tienda/comun.css'
import EncabezadoUsuario from '../../componentes/tienda/EncabezadoUsuario.jsx'

const logoHeader = '/img/Logo_3.png'
const logoFooter = '/img/Logo_2.png'
const cestaVerduras = '/img/cesta de verduras.png'
const iconCarrito = '/img/icon_carrito.png'
const facebook = '/img/facebook.png'
const twitter = '/img/twitter.png'
const instagram = '/img/instagram.png'

function Inicio() {
  return (
    <>
      <header className="sitio-header">
        <div className="header-container">
          <a className="logo" href="/" aria-label="Ir al inicio de HuertoHogar">
            <img src={logoHeader} alt="HuertoHogar" />
          </a>

          <nav className="nav-menu" aria-label="Menú principal">
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/categorias">Categorías</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/impacto">Impacto</a></li>
              <li><a href="/noticias">Noticias</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/mis-pedidos">Mis pedidos</a></li>
            </ul>
          </nav>

          <div className="header-icons d-flex align-items-center gap-2">
            <EncabezadoUsuario />
            <a href="/carrito" title="Carrito de compras" aria-label="Ir al carrito de compras">
              <img src={iconCarrito} alt="Carrito" />
            </a>
          </div>
        </div>
      </header>

      <main className="hero">
        <div className="hero-text">
          <h1>
            Del campo <br />
            a tu <span>hogar</span>
          </h1>
          <a href="/categorias" className="btn-primary d-inline-flex align-items-center justify-content-center text-center">
            Comenzar a comprar
          </a>
          <p>
            Llevamos la frescura y la calidad de los productos del campo chileno
            directamente a la puerta de tu casa
          </p>
        </div>

        <div className="hero-image text-center">
          <img
            src={cestaVerduras}
            alt="Frutas y verduras del campo"
            className="img-fluid"
          />
        </div>
      </main>

      <footer className="sitio-footer">
        <div className="footer-logo">
          <a href="/" aria-label="Volver al inicio">
            <img src={logoFooter} alt="HuertoHogar" className="img-fluid" />
          </a>
        </div>

        <div className="footer-column">
          <h3>CONTACTO</h3>
          <ul>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contacto">Contáctanos</a></li>
            <li><a href="/pago-envio">Pago y envío</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>INFORMACIÓN</h3>
          <ul>
            <li><a href="/categorias">Categorías</a></li>
            <li><a href="/impacto">Impacto ambiental</a></li>
            <li><a href="/noticias">Noticias</a></li>
            <li><a href="/admin/usuarios">Acceso administrativo</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>REDES SOCIALES</h3>
          <div className="social-icons d-flex align-items-center gap-2 flex-wrap">
            <img src={facebook} alt="Facebook" className="social-img" />
            <img src={twitter} alt="Twitter" className="social-img" />
            <img src={instagram} alt="Instagram" className="social-img" />
          </div>
          <p>@HuertoHogar · Región de Valparaíso, Chile</p>
          <p><a href="mailto:info@huertohogar.cl">info@huertohogar.cl</a></p>
        </div>
      </footer>
    </>
  )
}

export default Inicio
