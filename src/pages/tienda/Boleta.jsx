
import { useEffect, useState } from 'react'
const logoHuerto = '/img/Logo_2.png'
import '../../css/tienda/boleta.css'

const CLAVE_PEDIDO = 'ultimo_pedido_huerto'

function leerPedido() {
  try {
    const guardado = sessionStorage.getItem(CLAVE_PEDIDO)
    return guardado ? JSON.parse(guardado) : null
  } catch (error) {
    console.error('Error al leer el pedido:', error)
    return null
  }
}

function dinero(valor) {
  return '$' + Number(valor || 0).toLocaleString('es-CL')
}

function formatearFecha(valor) {
  if (!valor) return 'Fecha no disponible'

  const fecha = new Date(valor)

  if (Number.isNaN(fecha.getTime())) {
    return 'Fecha no disponible'
  }

  return fecha.toLocaleString('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short'
  })
}

function Boleta() {
  const [pedido] = useState(leerPedido)
  const [mostrarAnimacion, setMostrarAnimacion] = useState(true)
  const [mostrarSeguimiento, setMostrarSeguimiento] = useState(false)

  useEffect(() => {
    if (!pedido) return

    const temporizador = window.setTimeout(() => {
      setMostrarAnimacion(false)
    }, 2800)

    return () => window.clearTimeout(temporizador)
  }, [pedido])

  function imprimirBoleta() {
    window.print()
  }

  function descargarPDF() {
    // Abre la impresión del navegador.
    // El usuario selecciona "Guardar como PDF".
    window.print()
  }

  if (!pedido) {
    return (
      <div className="boleta-pagina">
        <div className="boleta-sin-pedido">
          <span className="boleta-sin-icono">🧾</span>
          <h1>No hay ninguna compra registrada</h1>
          <p>
            Realiza una compra de demostración para
            visualizar tu comprobante.
          </p>
          <a href="/carrito">Ir al carrito</a>
        </div>
      </div>
    )
  }

  if (mostrarAnimacion) {
    return (
      <div className="boleta-confirmacion" role="status">
        <div
          className="boleta-confeti"
          aria-hidden="true"
        >
          {Array.from({ length: 22 }, (_, indice) => (
            <span key={indice} />
          ))}
        </div>

        <div className="boleta-confirmacion-contenido">
          <div className="boleta-circulo-exito">
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M24 51 L43 69 L77 33" />
            </svg>
          </div>

          <h1>¡Compra confirmada!</h1>

          <p>
            Tu compra de demostración se ha registrado
            correctamente.
          </p>

          <div className="boleta-confirmacion-numero">
            Pedido {pedido.id}
          </div>

          <div className="boleta-cargando">
            <span />
          </div>

          <small>Preparando tu boleta...</small>
        </div>
      </div>
    )
  }

  const fecha = formatearFecha(pedido.fecha)
  const cliente = pedido.cliente || {}
  const entrega = pedido.entrega || {}
  const pago = pedido.pago || {}

  const productos = Array.isArray(pedido.productos)
    ? pedido.productos
    : []

  const nombreCliente = [
    cliente.nombre,
    cliente.apellido
  ].filter(Boolean).join(' ')

  const direccion = [
    entrega.calle,
    entrega.numero
  ].filter(Boolean).join(' ')

  const ubicacion = [
    entrega.comuna,
    entrega.ciudad,
    entrega.region
  ].filter(Boolean).join(', ')

  const etapasSeguimiento = [
    {
      nombre: 'Pedido confirmado',
      descripcion:
        'Tu compra de demostración fue registrada.',
      completado: true
    },
    {
      nombre: 'Preparando pedido',
      descripcion:
        'Etapa pendiente en esta simulación.',
      completado: false
    },
    {
      nombre: 'En camino',
      descripcion:
        'Etapa pendiente en esta simulación.',
      completado: false
    },
    {
      nombre: 'Entregado',
      descripcion:
        'Etapa pendiente en esta simulación.',
      completado: false
    }
  ]

  return (
    <div className="boleta-pagina">
      <header className="boleta-header">
        <a href="/">
          <img src={logoHuerto} alt="HuertoHogar" />
        </a>

        <a href="/" className="boleta-volver">
          ← Volver al inicio
        </a>
      </header>

      <main className="boleta-contenido">
        <div style={{textAlign:"center",margin:"15px 0"}}><a href={"/seguimiento-pedido?id=" + encodeURIComponent(pedido.id)} style={{display:"inline-block",background:"#195c35",color:"white",padding:"12px 22px",borderRadius:"24px",textDecoration:"none",fontWeight:700}}>🚚 Ver seguimiento de mi pedido</a></div>
        <div className="boleta-encabezado-exito">
          <div className="boleta-mini-check">✓</div>

          <span>COMPRA REALIZADA</span>

          <h1>¡Gracias por tu compra!</h1>

          <p>
            Tu pedido de demostración se registró
            correctamente. Aquí tienes tu comprobante.
          </p>
        </div>

        {/* DOCUMENTO DE COMPRA */}

        <article className="boleta-documento">
          <div className="boleta-documento-header">
            <div className="boleta-empresa">
              <img src={logoHuerto} alt="HuertoHogar" />

              <div>
                <strong>HUERTOHOGAR</strong>
                <small>Del campo al hogar</small>
              </div>
            </div>

            <div className="boleta-documento-tipo">
              <span>COMPROBANTE DE COMPRA</span>
              <strong>BOLETA DEMO</strong>
              <small>Sin validez tributaria</small>
            </div>
          </div>

          <div className="boleta-documento-linea" />

          {/* DATOS DEL PEDIDO */}

          <div className="boleta-datos-pedido">
            <div>
              <span>NÚMERO DE PEDIDO</span>
              <strong>{pedido.id}</strong>
            </div>

            <div>
              <span>FECHA DE COMPRA</span>
              <strong>{fecha}</strong>
            </div>

            <div>
              <span>ESTADO</span>
              <strong className="boleta-estado">
                ✓ Confirmado (simulación)
              </strong>
            </div>
          </div>

          {/* CLIENTE Y DIRECCIÓN */}

          <div className="boleta-bloques">
            <section className="boleta-bloque">
              <h2>👤 Datos del cliente</h2>

              <p>
                <strong>Nombre:</strong>{' '}
                {nombreCliente || '—'}
              </p>

              <p>
                <strong>Correo:</strong>{' '}
                {cliente.correo || '—'}
              </p>

              <p>
                <strong>Teléfono:</strong>{' '}
                {cliente.telefono || '—'}
              </p>
            </section>

            <section className="boleta-bloque">
              <h2>📍 Dirección de entrega</h2>

              <p>{direccion || '—'}</p>
              <p>{ubicacion || '—'}</p>

              {entrega.vivienda === 'departamento' && (
                <p>
                  Torre: {entrega.torre || '—'} ·{' '}
                  Depto: {entrega.departamento || '—'}
                </p>
              )}

              {entrega.instrucciones && (
                <p>
                  <strong>Indicaciones:</strong>{' '}
                  {entrega.instrucciones}
                </p>
              )}
            </section>
          </div>

          {/* DETALLE DE PRODUCTOS */}

          <section className="boleta-productos">
            <h2>🛒 Detalle de la compra</h2>

            <div className="boleta-tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto, indice) => {
                    const cantidad =
                      Number(producto.cantidad) || 1

                    const precio =
                      Number(producto.precio) || 0

                    return (
                      <tr key={producto.id ?? indice}>
                        <td>
                          {producto.nombre || 'Producto'}
                        </td>

                        <td>{cantidad}</td>

                        <td>{dinero(precio)}</td>

                        <td>
                          {dinero(precio * cantidad)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* PAGO Y TOTALES */}

          <div className="boleta-final">
            <section className="boleta-metodo">
              <h2>💳 Método de pago</h2>

              <p>
                <strong>Tipo:</strong>{' '}
                {pago.metodo === 'credito'
                  ? 'Crédito'
                  : 'Débito'}
              </p>

              <p>
                <strong>Tarjeta:</strong>{' '}
                •••• •••• ••••{' '}
                {pago.ultimosCuatro || '••••'}
              </p>

              {pago.metodo === 'credito' && (
                <p>
                  <strong>Cuotas:</strong>{' '}
                  {pago.cuotas || '1'}
                </p>
              )}

              <p className="boleta-pago-demo">
                Pago simulado, sin cobro real
              </p>
            </section>

            <section className="boleta-totales">
              <div>
                <span>Subtotal</span>
                <strong>
                  {dinero(pedido.subtotal)}
                </strong>
              </div>

              <div>
                <span>Envío</span>
                <strong>
                  {Number(pedido.envio || 0) === 0
                    ? 'Gratis'
                    : dinero(pedido.envio)}
                </strong>
              </div>

              <div className="boleta-total-grande">
                <span>TOTAL</span>
                <strong>
                  {dinero(pedido.total)}
                </strong>
              </div>
            </section>
          </div>

          <footer className="boleta-documento-footer">
            <p>🌱 Gracias por preferir HuertoHogar.</p>

            <small>
              Documento de demostración académica.
              No corresponde a una boleta electrónica
              del SII ni acredita un pago real.
            </small>
          </footer>
        </article>

        {/* BOTONES DE ACCIÓN */}

        <div
          className="boleta-acciones"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '25px'
          }}
        >
          <button
            type="button"
            className="boleta-boton-imprimir"
            onClick={imprimirBoleta}
          >
            🖨️ Imprimir
          </button>

          <button
            type="button"
            className="boleta-boton-imprimir"
            onClick={descargarPDF}
          >
            📄 Descargar PDF
          </button>

          <button
            type="button"
            className="boleta-boton-imprimir"
            onClick={() =>
              setMostrarSeguimiento(anterior => !anterior)
            }
            aria-expanded={mostrarSeguimiento}
          >
            📦 {mostrarSeguimiento
              ? 'Ocultar seguimiento'
              : 'Seguimiento del pedido'}
          </button>

          <a
            href="/"
            className="boleta-boton-inicio"
          >
            🏠 Volver al inicio
          </a>
        </div>

        {/* SEGUIMIENTO DEL PEDIDO */}

        {mostrarSeguimiento && (
          <section
            style={{
              maxWidth: '800px',
              margin: '28px auto',
              padding: '28px',
              background: '#fff',
              border: '1px solid #dce8df',
              borderRadius: '18px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontSize: '34px',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                📦
              </span>

              <h2 style={{ color: '#176a37' }}>
                Seguimiento de tu pedido
              </h2>

              <p>
                Número de pedido:{' '}
                <strong>{pedido.id}</strong>
              </p>

              <p
                style={{
                  fontSize: '13px',
                  color: '#64748b'
                }}
              >
                Seguimiento de demostración.
                No representa un despacho real.
              </p>
            </div>

            <div
              style={{
                marginTop: '28px',
                display: 'grid',
                gap: '22px'
              }}
            >
              {etapasSeguimiento.map((etapa, indice) => (
                <div
                  key={etapa.nombre}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      background: etapa.completado
                        ? '#198754'
                        : '#e5e7eb',
                      color: etapa.completado
                        ? '#fff'
                        : '#64748b',
                      fontWeight: 'bold'
                    }}
                  >
                    {etapa.completado ? '✓' : indice + 1}
                  </div>

                  <div>
                    <strong
                      style={{
                        color: etapa.completado
                          ? '#176a37'
                          : '#64748b'
                      }}
                    >
                      {etapa.nombre}
                    </strong>

                    <p
                      style={{
                        margin: '5px 0 0',
                        color: '#64748b',
                        fontSize: '14px'
                      }}
                    >
                      {etapa.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Boleta
