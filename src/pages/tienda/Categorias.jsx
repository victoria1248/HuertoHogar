
import React from 'react'

import '../../css/tienda/comun.css'
import '../../css/tienda/categorias.css'
import '../../css/tienda/responsive.css'

const logo = '/img/Logo_2.png'
const cesta = '/img/cesta de verduras.png'
const frutas = '/img/Frutas.png'
const verduras = '/img/verduras.png'
const organicos = '/img/Organico.png'
const lacteos = '/img/Lacteos.png'
const despensa = '/img/Despensa.png'
const hierbas = '/img/Herbas.png'

import EncabezadoUsuario from '../../componentes/tienda/EncabezadoUsuario.jsx'
const iconCarrito = '/img/icon_carrito.png'
const facebook = '/img/facebook.png'
const twitter = '/img/twitter.png'
const instagram = '/img/instagram.png'

const categorias = [
  {
    nombre: 'Frutas',
    descripcion: 'Lo mejor de la temporada, seleccionado para ti',
    imagen: frutas,
    clase: 'frutas',
    filtro: 'frutas'
  },
  {
    nombre: 'Verduras',
    descripcion: 'Frescas, nutritivas y recién cosechadas',
    imagen: verduras,
    clase: 'verduras',
    filtro: 'verduras'
  },
  {
    nombre: 'Orgánicos',
    descripcion: 'Productos libres de químicos, 100% naturales',
    imagen: organicos,
    clase: 'organicos',
    filtro: 'organicos'
  },
  {
    nombre: 'Lácteos y más',
    descripcion: 'Productos lácteos, huevos y más del campo',
    imagen: lacteos,
    clase: 'lacteos',
    filtro: 'lacteos'
  },
  {
    nombre: 'Despensa',
    descripcion: 'Todo lo que necesitas para tu día a día',
    imagen: despensa,
    clase: 'despensa',
    filtro: 'despensa'
  },
  {
    nombre: 'Hierbas y plantas',
    descripcion: 'Aromáticas medicinales y para tu hogar',
    imagen: hierbas,
    clase: 'hierbas',
    filtro: 'hierbas'
  }
]

function Categorias() {
  return (
    <div className="pagina">

      {/* ENCABEZADO ORIGINAL */}
      <header className="sitio-header">
        <div className="header-container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <a className="logo" href="/">
            <img src={logo} alt="HuertoHogar" />
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
              <li><a href="/resenas">Reseñas</a></li>
            </ul>
          </nav>

          <div className="header-icons d-flex align-items-center gap-3">
            <EncabezadoUsuario />

            <a href="/carrito" title="Carrito">
              <img src={iconCarrito} alt="Carrito" />
            </a>
          </div>
        </div>
      </header>

      <main>

        {/* PRESENTACIÓN DE CATEGORÍAS */}
        <section className="cabecera-categorias d-flex flex-wrap align-items-center">
          <div>
            <p className="ruta mb-2">
              <a href="/">Inicio</a> &gt; Categorías
            </p>

            <h1>Categorías</h1>

            <p>
              Explora nuestras categorías y encuentra los productos
              <br />
              más frescos y naturales, directamente del campo a tu casa.
            </p>
          </div>

          <img
            src={cesta}
            alt="Frutas y verduras frescas"
          />
        </section>

        {/* TARJETAS ORIGINALES */}
        <section
          className="categorias"
          aria-label="Categorías de productos"
        >
          {categorias.map((categoria) => (
            <article className="tarjeta d-flex flex-column h-100" key={categoria.filtro}>
              <div className={`foto ${categoria.clase}`}>
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                />
              </div>

              <h3>{categoria.nombre}</h3>

              <p>{categoria.descripcion}</p>

              <a className="mt-auto d-inline-block" href={`/productos?categoria=${categoria.filtro}`}>
                Consultar productos →
              </a>
            </article>
          ))}
        </section>

        {/* DEL CAMPO A TU HOGAR */}
        <section className="campo-hogar d-flex flex-wrap align-items-center gap-3">
          <span className="hoja">
            <i
              className="fa-solid fa-seedling"
              aria-hidden="true"
            />
          </span>

          <div>
            <h2>Del campo a tu hogar</h2>
            <p>
              Trabajamos con agricultores locales para llevarte
              productos frescos,
              <br />
              sostenibles y de la más alta calidad.
            </p>
          </div>

          <a className="boton" href="/nosotros">
            Conoce más sobre nosotros →
          </a>
        </section>

        {/* BENEFICIOS */}
        <section
          className="beneficios"
          aria-label="Nuestros beneficios"
        >
          <article>
            <i className="fa-solid fa-leaf" aria-hidden="true" />
            <div>
              <h3>Productos frescos</h3>
              <p>Directo del campo</p>
            </div>
          </article>

          <article>
            <i className="fa-solid fa-truck" aria-hidden="true" />
            <div>
              <h3>Envíos a todo Chile</h3>
              <p>Rápidos y seguros</p>
            </div>
          </article>

          <article>
            <i
              className="fa-solid fa-shield-halved"
              aria-hidden="true"
            />
            <div>
              <h3>100% naturales</h3>
              <p>Sin químicos añadidos</p>
            </div>
          </article>

          <article>
            <i className="fa-regular fa-heart" aria-hidden="true" />
            <div>
              <h3>Apoyamos lo local</h3>
              <p>Agricultores chilenos</p>
            </div>
          </article>
        </section>
      </main>

      {/* FOOTER ORIGINAL */}
      <footer className="sitio-footer">
        <div className="footer-logo">
          <a href="/">
            <img src={logo} alt="HuertoHogar" />
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
            <li>
              <a href="/admin/usuarios">Acceso administrativo</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>REDES SOCIALES</h3>

          <div className="social-icons d-flex flex-wrap align-items-center gap-2">
            <img
              src={facebook}
              alt="Facebook"
              className="social-img img-fluid"
            />
            <img
              src={twitter}
              alt="Twitter"
              className="social-img img-fluid"
            />
            <img
              src={instagram}
              alt="Instagram"
              className="social-img img-fluid"
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
    </div>
  )
}

export default Categorias
