import { claveCarritoActual } from '../../datos/carritoPorCuenta.js'

import React, { useEffect, useState } from 'react'
import { leerInventario, guardarInventario } from '../../datos/inventario.js'

// ========================================
// ESTILOS ORIGINALES
// ========================================

import '../../css/tienda/estilos.css'
import '../../css/tienda/pago_envio.css'
import '../../css/tienda/comun.css'
import '../../css/tienda/producto.css'
import '../../css/tienda/catalogo-mejorado.css'

// ========================================
// IMÁGENES ORIGINALES
// ========================================

const logo = '/img/Logo_2.png'
const naranja = '/img/naranja.png'
const platano = '/img/platano.png'
const manzana = '/img/manzana.png'
const pera = '/img/pera.png'
const kiwi = '/img/kiwi.png'
const frutilla = '/img/frutilla.png'
import EncabezadoUsuario from '../../componentes/tienda/EncabezadoUsuario.jsx'
const iconCarrito = '/img/icon_carrito.png'
const facebook = '/img/facebook.png'
const twitter = '/img/twitter.png'
const instagram = '/img/instagram.png'

// ========================================
// CONFIGURACIÓN DEL CARRITO
// ========================================

const CLAVE_CARRITO = claveCarritoActual()

function leerCarrito() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(CLAVE_CARRITO) || '[]'
    )

    return Array.isArray(datos) ? datos : []
  } catch (error) {
    console.error('Error al leer el carrito:', error)
    return []
  }
}

function contarProductos() {
  return leerCarrito().reduce(
    (total, producto) =>
      total + (Number(producto.cantidad) || 1),
    0
  )
}

function formatoPrecio(precio) {
  return '$' + Number(precio).toLocaleString('es-CL')
}

// ========================================
// PRODUCTOS ORIGINALES DE VICK
// ========================================

const productosCaso = [
  {
    "id": "FR001",
    "nombre": "Manzanas Fuji",
    "precio": 1200,
    "stock": 150,
    "unidad": "kilo",
    "plural": "kilos",
    "categoria": "frutas",
    "imagen": "/img/catalogo/FR001.jpeg",
    "descripcion": "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido."
  },
  {
    "id": "FR002",
    "nombre": "Naranjas Valencia",
    "precio": 1000,
    "stock": 200,
    "unidad": "kilo",
    "plural": "kilos",
    "categoria": "frutas",
    "imagen": "/img/catalogo/FR002.jpeg",
    "descripcion": "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad."
  },
  {
    "id": "FR003",
    "nombre": "Plátanos Cavendish",
    "precio": 800,
    "stock": 250,
    "unidad": "kilo",
    "plural": "kilos",
    "categoria": "frutas",
    "imagen": "/img/catalogo/FR003.jpeg",
    "descripcion": "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada."
  },
  {
    "id": "VR001",
    "nombre": "Zanahorias Orgánicas",
    "precio": 900,
    "stock": 100,
    "unidad": "kilo",
    "plural": "kilos",
    "categoria": "verduras",
    "imagen": "/img/catalogo/VR001.jpeg",
    "descripcion": "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable."
  },
  {
    "id": "VR002",
    "nombre": "Espinacas Frescas",
    "precio": 700,
    "stock": 80,
    "unidad": "bolsa de 500 g",
    "plural": "bolsas",
    "categoria": "verduras",
    "imagen": "/img/catalogo/VR002.jpeg",
    "descripcion": "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional."
  },
  {
    "id": "VR003",
    "nombre": "Pimientos Tricolores",
    "precio": 1500,
    "stock": 120,
    "unidad": "kilo",
    "plural": "kilos",
    "categoria": "verduras",
    "imagen": "/img/catalogo/VR003.jpeg",
    "descripcion": "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta."
  },
  {
    "id": "PO001",
    "nombre": "Miel Orgánica",
    "precio": 5000,
    "stock": 50,
    "unidad": "frasco de 500 g",
    "plural": "frascos",
    "categoria": "organicos",
    "imagen": "/img/catalogo/PO001.jpeg",
    "descripcion": "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas."
  },
  {
    "id": "PO003",
    "nombre": "Quinua Orgánica",
    "precio": null,
    "stock": null,
    "unidad": null,
    "categoria": "organicos",
    "imagen": null,
    "descripcion": "Este producto figura en el listado del caso. Su descripción, precio y stock no están especificados en el documento.",
    "pendiente": true
  },
  {
    "id": "PL001",
    "nombre": "Leche Entera",
    "precio": null,
    "stock": null,
    "unidad": null,
    "categoria": "lacteos",
    "imagen": null,
    "descripcion": "Este producto figura en el listado del caso. Su descripción, precio y stock no están especificados en el documento.",
    "pendiente": true
  }
]

// Convierte el inventario compartido al formato que utiliza la tarjeta del catálogo.
function cargarProductosCatalogo() {
  return leerInventario().map(producto => {
    const categoriaNormalizada = String(producto.categoria || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const categoria = ({
      frutas: 'frutas',
      verduras: 'verduras',
      organicos: 'organicos',
      lacteos: 'lacteos',
      despensa: 'despensa',
      hierbas: 'hierbas',
      plantas: 'hierbas',
      otros: 'otros'
    })[categoriaNormalizada] || categoriaNormalizada

    const original = productosCaso.find(item =>
      item.id === producto.codigo || item.nombre.toLowerCase() === producto.nombre.toLowerCase()
    )

    return {
      id: String(producto.codigo || producto.id),
      codigo: producto.codigo || String(producto.id),
      nombre: producto.nombre,
      precio: Number(producto.precio) || 0,
      precioFinal: producto.descuento ? Math.round((Number(producto.precio) || 0) * (1 - (Number(producto.descuentoPorcentaje) || 0) / 100)) : (Number(producto.precio) || 0),
      descuento: Boolean(producto.descuento),
      descuentoPorcentaje: Number(producto.descuentoPorcentaje) || 0,
      stock: Number(producto.stock) || 0,
      unidad: producto.unidad || original?.unidad || 'unidad',
      plural: producto.plural || original?.plural || 'unidades',
      categoria,
      imagen: producto.imagen || original?.imagen || '/img/verduras.png',
      descripcion: producto.descripcion || original?.descripcion || 'Producto disponible en HuertoHogar.'
    }
  })
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function Productos() {
  const [productos, setProductos] = useState(cargarProductosCatalogo)
  const [mensaje, setMensaje] = useState('')
  const [cantidades, setCantidades] = useState({})
  const normalizarCategoria = valor => ({'frutas frescas':'frutas','verduras orgánicas':'verduras','productos orgánicos':'organicos','orgánicos':'organicos','productos lácteos':'lacteos','lácteos':'lacteos'}[valor?.toLowerCase()] || valor?.toLowerCase() || '')
  const [filtro, setFiltro] = useState(() => normalizarCategoria(new URLSearchParams(location.search).get('categoria')))
  const categorias = {frutas:'Frutas frescas', verduras:'Verduras orgánicas', organicos:'Productos orgánicos', lacteos:'Productos lácteos', despensa:'Despensa', hierbas:'Hierbas y plantas', otros:'Otros'}
  const cantidadDe = id => cantidades[id] || 1
  // Nunca permite cantidades inferiores a uno.
  function cambiarCantidad(id, cambio) {
    setCantidades(actual => ({ ...actual, [id]: Math.min(productos.find(p => p.id === id).stock || 1, Math.max(1, (actual[id] || 1) + cambio)) }))
  }
  const [cantidadCarrito, setCantidadCarrito] = useState(
    contarProductos
  )

  // Actualiza los productos cuando se modifican desde el dashboard.
  useEffect(() => {
    const actualizarInventario = () => setProductos(cargarProductosCatalogo())
    window.addEventListener('inventarioActualizado', actualizarInventario)
    window.addEventListener('storage', actualizarInventario)
    return () => {
      window.removeEventListener('inventarioActualizado', actualizarInventario)
      window.removeEventListener('storage', actualizarInventario)
    }
  }, [])

  // ========================================
  // ACTUALIZAR CONTADOR DEL CARRITO
  // ========================================

  useEffect(() => {
    function actualizarContador() {
      setCantidadCarrito(contarProductos())
    }

    window.addEventListener(
      'carritoActualizado',
      actualizarContador
    )

    window.addEventListener(
      'storage',
      actualizarContador
    )

    return () => {
      window.removeEventListener(
        'carritoActualizado',
        actualizarContador
      )

      window.removeEventListener(
        'storage',
        actualizarContador
      )
    }
  }, [])

  // ========================================
  // FILTRAR POR CATEGORÍA
  // ========================================

  const productosFiltrados = filtro ? productos.filter(producto => producto.categoria === filtro) : productos

  // ========================================
  // AGREGAR PRODUCTOS AL CARRITO
  // ========================================

  function agregarAlCarrito(producto) {
    try {
      const carrito = leerCarrito()
      const cantidad = cantidadDe(producto.id)
      if (producto.pendiente) return
      const acumulado = carrito.filter(item => String(item.id) === producto.id).reduce((total, item) => total + Number(item.cantidad || 0), 0)
      if (cantidad + acumulado > producto.stock) {
        setMensaje(`No puedes superar el stock de ${producto.stock} ${producto.plural} de ${producto.nombre}, incluyendo lo que tienes en el carrito.`)
        return
      }

      const existente = carrito.find(
        item =>
          String(item.id) === String(producto.id) &&
          item.nombre === producto.nombre
      )

      if (existente) {
        existente.cantidad = (Number(existente.cantidad) || 0) + cantidad
        existente.precio = producto.precioFinal ?? producto.precio
        existente.precioOriginal = producto.precio
        existente.descuento = producto.descuento
        existente.descuentoPorcentaje = producto.descuentoPorcentaje
        existente.unidad = producto.unidad
        existente.stock = producto.stock
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precioFinal ?? producto.precio,
          precioOriginal: producto.precio,
          descuento: producto.descuento,
          descuentoPorcentaje: producto.descuentoPorcentaje,
          categoria: producto.categoria,
          imagen: producto.imagen,
          descripcion: producto.descripcion,
          unidad: producto.unidad,
          stock: producto.stock,
          cantidad
        })
      }

      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
      )

      // Avisar que el carrito cambió
      window.dispatchEvent(
        new Event('carritoActualizado')
      )

      setMensaje(
        `${cantidad} × ${producto.nombre} agregado al carrito. Total: ${formatoPrecio((producto.precioFinal ?? producto.precio) * cantidad)}.`
      )
    } catch (error) {
      console.error(
        'Error al agregar al carrito:',
        error
      )

      setMensaje(
        'No se pudo agregar el producto al carrito.'
      )
    }
  }

  // ========================================
  // CERRAR MENSAJE
  // ========================================

  function cerrarMensaje() {
    setMensaje('')
  }

  return (
    <>
      {/* BARRA SUPERIOR */}

      <div className="barra-superior"></div>

      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <header className="sitio-header">
        <div className="header-container">

          {/* LOGO */}

          <a className="logo" href="/">
            <img
              src={logo}
              alt="HuertoHogar"
            />
          </a>

          {/* MENÚ DE NAVEGACIÓN */}

          <nav
            className="nav-menu"
            aria-label="Menú principal"
          >
            <ul>
              <li>
                <a href="/">Inicio</a>
              </li>

              <li>
                <a href="/categorias">Categorías</a>
              </li>

              <li>
                <a href="/nosotros">Nosotros</a>
              </li>

              <li>
                <a href="/blog">Blog</a>
              </li>

              <li>
                <a href="/contacto">Contacto</a>
              </li>

              <li>
                <a href="/impacto">Impacto</a>
              </li>

              <li>
                <a href="/noticias">Noticias</a>
              </li>
            </ul>
          </nav>

          {/* ICONOS */}

          <div className="header-icons">

            <EncabezadoUsuario />

            <a
              href="/carrito"
              title={`Carrito con ${cantidadCarrito} productos`}
              className="cart-icon"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <img
                src={iconCarrito}
                alt="Carrito"
              />

              {cantidadCarrito > 0 && (
                <b
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-12px',
                    background: '#299457',
                    color: '#fff',
                    borderRadius: '50%',
                    minWidth: '21px',
                    height: '21px',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '11px',
                    padding: '0 4px'
                  }}
                >
                  {cantidadCarrito}
                </b>
              )}
            </a>

          </div>
        </div>
      </header>

      {/* =====================================
          CONTENIDO PRINCIPAL
      ===================================== */}

      <main className="hh-catalogo">
        <div className="hh-migas"><a href="/">Inicio</a><span>/</span><span>Productos</span></div>
        <section className="hh-presentacion">
          <div><span className="hh-etiqueta">HUERTOHOGAR · NUESTRA SELECCIÓN</span>
            <h1>Más fresco.<br /><em>Más de lo que te gusta.</em></h1>
            <p>Encuentra tus favoritos, elige la cantidad y llena tu carrito de sabor.</p>
            <a className="hh-explorar" href="#seleccion">Explorar productos <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hh-hero-imagen"><img src={naranja} alt="Naranjas de nuestro catálogo" /><span>Un toque de frescura<br /><strong>para tu día</strong></span></div>
        </section>
        <div className="hh-titulo-lista" id="seleccion"><div><span className="hh-etiqueta">ELIGE TUS FAVORITOS</span><h2>Nuestros productos</h2></div><span>{productosFiltrados.length} productos</span></div>

        {/* MENSAJE DE CONFIRMACIÓN */}

        {mensaje && (
          <div
            role="status"
            style={{
              maxWidth: '650px',
              margin: '20px auto',
              padding: '15px 20px',
              border: '1px solid #b8dfc4',
              borderRadius: '10px',
              backgroundColor: '#effaf1',
              color: '#176a37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '15px'
            }}
          >
            <span>{mensaje}</span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <a
                href="/carrito"
                style={{
                  color: '#176a37',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                Ver carrito
              </a>

              <button
                type="button"
                onClick={cerrarMensaje}
                aria-label="Cerrar mensaje"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#176a37',
                  fontSize: '23px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* LISTADO DE PRODUCTOS */}

        <div className="hh-filtros" role="group" aria-label="Filtrar por categoría">
          {Object.entries({'':'Todos', ...categorias}).map(([valor, texto]) => <button type="button" key={valor} aria-pressed={filtro === valor} onClick={() => setFiltro(valor)}>{texto}</button>)}
        </div>
        <section className="hh-rejilla" aria-label="Catálogo de productos">

          {productosFiltrados.map(producto => (
            <article
              className="hh-tarjeta"
              data-categoria={producto.categoria}
              key={producto.id}
            >

              {/* IMAGEN */}

              <div className="hh-foto"><span className="hh-categoria">{categorias[producto.categoria] || producto.categoria}</span>
                {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} /> : <span className="hh-sin-foto">Fotografía pendiente</span>}
              </div>

              {/* NOMBRE */}

              <div className="hh-contenido"><h2>{producto.nombre}</h2>

              {/* PRECIO */}

              {producto.descuento && !producto.pendiente && <span className="hh-etiqueta-descuento">-{producto.descuentoPorcentaje}% DESCUENTO</span>}
              <p className="hh-precio">
                {producto.pendiente ? 'Por confirmar' : producto.descuento ? <><del>{formatoPrecio(producto.precio)}</del> <strong className="hh-precio-oferta">{formatoPrecio(producto.precioFinal)}</strong></> : formatoPrecio(producto.precio)} <small>{producto.pendiente ? 'Precio pendiente' : `CLP / ${producto.unidad}`}</small>
              </p>

              {/* DESCRIPCIÓN */}

              <p className="hh-descripcion">
                {producto.descripcion}
              </p>

              <p className="hh-stock">{producto.pendiente ? 'Disponibilidad por confirmar' : `Disponible: ${producto.stock} ${producto.plural}`} <small>· {producto.id}</small></p>
              {!producto.pendiente && <div className="hh-compra">
                <div><span className="hh-label">Cantidad ({producto.plural})</span>
                  <div className="hh-cantidad" role="group" aria-label={`Cantidad de ${producto.nombre}`}>
                    <button type="button" aria-label={`Disminuir ${producto.nombre}`} disabled={cantidadDe(producto.id) === 1} onClick={() => cambiarCantidad(producto.id, -1)}>−</button>
                    <output aria-live="polite">{cantidadDe(producto.id)}</output>
                    <button type="button" aria-label={`Aumentar ${producto.nombre}`} disabled={cantidadDe(producto.id) >= producto.stock} onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                  </div>
                </div>
                <div className="hh-subtotal"><span className="hh-label">Subtotal</span><strong aria-live="polite">{formatoPrecio((producto.precioFinal ?? producto.precio) * cantidadDe(producto.id))}</strong></div>
              </div>}
              {/* Envía al carrito la cantidad seleccionada. */}

              <button
                type="button"
                className="hh-agregar"
                disabled={producto.pendiente}
                onClick={() =>
                  agregarAlCarrito(producto)
                }
              >
                <span aria-hidden="true">{producto.pendiente ? "◷" : "＋"}</span> {producto.pendiente ? "Información pendiente" : "Agregar al carrito"}
              </button>
              </div>

            </article>
          ))}

        </section>

        {/* CATEGORÍA SIN PRODUCTOS */}

        {productosFiltrados.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px'
            }}
          >
            <h2>Próximamente</h2>

            <p>
              Todavía no tenemos productos cargados
              en esta categoría.
            </p>

            <a href="/productos">
              Ver todos los productos
            </a>
          </div>
        )}

      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="sitio-footer">

        {/* LOGO */}

        <div className="footer-logo">
          <img
            src={logo}
            alt="HuertoHogar"
          />
        </div>

        {/* CONTACTO */}

        <div className="footer-column">
          <h3>CONTACTO</h3>

          <ul>
            <li>
              <a href="/contacto">Contacto</a>
            </li>

            <li>
              <a href="/nosotros">Nosotros</a>
            </li>

            <li>
              <a href="/blog">Blog</a>
            </li>

            <li>
              <a href="/pago-envio">
                Pago y envío
              </a>
            </li>
          </ul>
        </div>

        {/* INFORMACIÓN */}

        <div className="footer-column">
          <h3>INFORMACIÓN</h3>

          <ul>
            <li>
              <a href="/categorias">
                Categorías
              </a>
            </li>

            <li>
              <a href="/impacto">
                Impacto ambiental
              </a>
            </li>

            <li>
              <a href="/noticias">
                Noticias
              </a>
            </li>

            <li>
              <a href="/admin/usuarios">
                Acceso administrativo
              </a>
            </li>
          </ul>
        </div>

        {/* REDES SOCIALES */}

        <div className="footer-column">
          <h3>REDES SOCIALES</h3>

          <div className="social-icons">

            <img
              src={facebook}
              alt="Facebook"
              className="social-img"
            />

            <img
              src={twitter}
              alt="Twitter"
              className="social-img"
            />

            <img
              src={instagram}
              alt="Instagram"
              className="social-img"
            />

          </div>

          <p>
            @HuertoHogar · Región de Valparaíso, Chile
          </p>

          <p>info@huertohogar.cl</p>
        </div>

      </footer>
    </>
  )
}

export default Productos
