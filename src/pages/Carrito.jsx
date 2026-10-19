
import { useState } from 'react'
import logoHuerto from '../img/Logo_2.png'
import '../css/carrito.css'

const CLAVE_CARRITO = 'carrito_huerto'

function leerCarrito() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(CLAVE_CARRITO) || '[]'
    )

    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

function formatoPrecio(valor) {
  return '$' + Number(valor || 0).toLocaleString('es-CL')
}

function Carrito() {
  const [productos, setProductos] = useState(leerCarrito)
  const [mensaje, setMensaje] = useState('')

  function guardarCarrito(nuevoCarrito) {
    try {
      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(nuevoCarrito)
      )

      setProductos(nuevoCarrito)

      window.dispatchEvent(
        new Event('carritoActualizado')
      )

      return true
    } catch {
      setMensaje('No se pudieron guardar los cambios.')
      return false
    }
  }

  function cambiarCantidad(indice, cambio) {
    const actualizado = productos
      .map((producto, i) => {
        if (i !== indice) return producto

        const cantidadActual =
          Number(producto.cantidad) || 1

        return {
          ...producto,
          cantidad: cantidadActual + cambio
        }
      })
      .filter(
        producto => Number(producto.cantidad) > 0
      )

    guardarCarrito(actualizado)
  }

  function eliminarProducto(indice) {
    const actualizado = productos.filter(
      (_, i) => i !== indice
    )

    if (guardarCarrito(actualizado)) {
      setMensaje('Producto eliminado del carrito.')
    }
  }

  function vaciarCarrito() {
    if (productos.length === 0) return

    const confirmar = window.confirm(
      '¿Quieres eliminar todos los productos del carrito?'
    )

    if (!confirmar) return

    if (guardarCarrito([])) {
      setMensaje('El carrito se vació correctamente.')
    }
  }

  const cantidadTotal = productos.reduce(
    (total, producto) =>
      total + (Number(producto.cantidad) || 1),
    0
  )

  const subtotal = productos.reduce(
    (total, producto) =>
      total +
      (Number(producto.precio) || 0) *
      (Number(producto.cantidad) || 1),
    0
  )

  const envio = 0
  const total = subtotal + envio

  // CORREGIDO: IR DIRECTAMENTE A PAGO Y ENVÍO
  function continuarCompra() {
    if (productos.length === 0) {
      setMensaje('Agrega productos antes de continuar.')
      return
    }

    window.location.href = '/pago-envio'
  }

  return (
    <div className="carrito-pagina">
      <div className="carrito-franja-superior" />

      <header className="carrito-header">
        <a href="/" className="carrito-marca">
          <img
            src={logoHuerto}
            alt="Logo de HuertoHogar"
            className="carrito-logo-imagen"
          />
        </a>

        <nav className="carrito-navegacion">
          <a href="/">Inicio</a>
          <a href="/login">Mi cuenta</a>

          <a
            href="/carrito"
            className="carrito-enlace-activo"
          >
            🛒 Carrito ({cantidadTotal})
          </a>
        </nav>
      </header>

      <main className="carrito-contenido">
        <div className="carrito-introduccion">
          <span className="carrito-etiqueta">
            TU COMPRA
          </span>

          <h1>Mi carrito de compras</h1>

          <p>
            Revisa tus productos, modifica las cantidades
            y consulta el total antes de continuar.
          </p>
        </div>

        {mensaje && (
          <div
            className="carrito-mensaje"
            role="status"
          >
            <span>{mensaje}</span>

            <button
              type="button"
              onClick={() => setMensaje('')}
              aria-label="Cerrar mensaje"
            >
              ×
            </button>
          </div>
        )}

        <div className="carrito-distribucion">
          <section className="carrito-tarjeta">
            <div className="carrito-tarjeta-encabezado">
              <div>
                <h2>Productos seleccionados</h2>

                <p>
                  {cantidadTotal} producto(s) en tu carrito
                </p>
              </div>

              {productos.length > 0 && (
                <button
                  type="button"
                  className="carrito-vaciar"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              )}
            </div>

            {productos.length === 0 ? (
              <div className="carrito-vacio">
                <div className="carrito-vacio-icono">
                  🛒
                </div>

                <h3>Tu carrito está vacío</h3>

                <p>
                  Todavía no tienes productos agregados.
                </p>

                <a
                  href="/"
                  className="carrito-boton-verde"
                >
                  Explorar productos
                </a>
              </div>
            ) : (
              <div className="carrito-lista">
                {productos.map((producto, indice) => {
                  const precio =
                    Number(producto.precio) || 0

                  const cantidad =
                    Number(producto.cantidad) || 1

                  const totalProducto =
                    precio * cantidad

                  const imagen =
                    producto.imagen ||
                    producto.img ||
                    producto.foto ||
                    ''

                  return (
                    <article
                      className="carrito-producto"
                      key={producto.id ?? indice}
                    >
                      <div className="carrito-producto-imagen">
                        {imagen ? (
                          <img
                            src={imagen}
                            alt={
                              producto.nombre ||
                              'Producto'
                            }
                            onError={evento => {
                              evento.currentTarget.style.display =
                                'none'
                            }}
                          />
                        ) : (
                          <span>🥬</span>
                        )}
                      </div>

                      <div className="carrito-producto-info">
                        <h3>
                          {producto.nombre || 'Producto'}
                        </h3>

                        <p>Precio unitario</p>

                        <strong>
                          {formatoPrecio(precio)}
                        </strong>
                      </div>

                      <div className="carrito-producto-controles">
                        <div className="carrito-cantidad">
                          <button
                            type="button"
                            onClick={() =>
                              cambiarCantidad(indice, -1)
                            }
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>

                          <span>{cantidad}</span>

                          <button
                            type="button"
                            onClick={() =>
                              cambiarCantidad(indice, 1)
                            }
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        <strong className="carrito-producto-total">
                          {formatoPrecio(totalProducto)}
                        </strong>

                        <button
                          type="button"
                          className="carrito-eliminar"
                          onClick={() =>
                            eliminarProducto(indice)
                          }
                        >
                          🗑 Eliminar
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {productos.length > 0 && (
              <div className="carrito-seguir">
                <a href="/">
                  ← Seguir comprando
                </a>
              </div>
            )}
          </section>

          <aside className="carrito-resumen">
            <div className="carrito-resumen-encabezado">
              <span>🧾</span>
              <h2>Resumen de compra</h2>
            </div>

            <div className="carrito-resumen-fila">
              <span>
                Productos ({cantidadTotal})
              </span>

              <strong>
                {formatoPrecio(subtotal)}
              </strong>
            </div>

            <div className="carrito-resumen-fila">
              <span>Envío</span>

              <strong className="carrito-gratis">
                Gratis
              </strong>
            </div>

            <div className="carrito-resumen-separador" />

            <div className="carrito-resumen-total">
              <span>Total a pagar</span>

              <strong>
                {formatoPrecio(total)}
              </strong>
            </div>

            <button
              type="button"
              className="carrito-boton-pagar"
              onClick={continuarCompra}
              disabled={productos.length === 0}
            >
              Continuar con el pago →
            </button>

            <div className="carrito-nota">
              <span>🔒</span>

              <p>
                Podrás revisar los datos de entrega
                antes de confirmar tu compra.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="carrito-footer">
        <p>
          © HuertoHogar · Productos frescos para tu hogar
        </p>
      </footer>
    </div>
  )
}

export default Carrito
