import { useEffect, useState } from 'react'
import '../../css/tienda/boleta.css'

const logo = '/img/Logo_2.png'

function leerPedido() {
  try {
    return JSON.parse(sessionStorage.getItem('ultimo_pedido_huerto') || 'null')
  } catch {
    return null
  }
}

function dinero(valor) {
  return '$' + (Number(valor) || 0).toLocaleString('es-CL')
}

function fechaBonita(valor) {
  const fecha = new Date(valor)
  return Number.isNaN(fecha.getTime())
    ? 'Fecha no disponible'
    : fecha.toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' })
}

export default function Boleta() {
  const [pedido] = useState(leerPedido)
  const [animando, setAnimando] = useState(true)

  useEffect(() => {
    const temporizador = window.setTimeout(() => setAnimando(false), 1300)
    return () => window.clearTimeout(temporizador)
  }, [])

  if (!pedido) {
    return (
      <main className="bn-pagina d-flex justify-content-center align-items-center">
        <section className="bn-papel text-center p-5">
          <div className="display-4 mb-3">🧾</div>
          <h1>No hay ninguna compra registrada</h1>
          <p>Realiza una compra de demostración para visualizar tu comprobante.</p>
          <a href="/carrito" className="bn-boton bn-boton-verde">Ir al carrito</a>
        </section>
      </main>
    )
  }

  if (animando) {
    return (
      <main className="bn-pagina d-flex justify-content-center align-items-center" role="status">
        <div className="bn-papel text-center p-5">
          <div className="bn-exito-icono mx-auto mb-3">✓</div>
          <h1>¡Compra confirmada!</h1>
          <p>Preparando tu comprobante de demostración…</p>
          <div className="spinner-border text-success" aria-label="Cargando" />
        </div>
      </main>
    )
  }

  const cliente = pedido.cliente || {}
  const entrega = pedido.entrega || {}
  const pago = pedido.pago || {}
  const productos = Array.isArray(pedido.productos) ? pedido.productos : []

  const nombre = [cliente.nombre, cliente.apellido].filter(Boolean).join(' ') || '—'
  const direccion = [entrega.calle, entrega.numero].filter(Boolean).join(' ') || '—'
  const ubicacion = [entrega.comuna, entrega.ciudad, entrega.region]
    .filter(Boolean)
    .join(', ') || '—'

  const estado = pedido.estado || 'Preparando pedido'
  const estadoNormalizado = estado.toLowerCase()
  const suspendido = estadoNormalizado.includes('suspend')
  const entregado = estadoNormalizado.includes('entregad')
  const enCamino = estadoNormalizado.includes('camino') || estadoNormalizado.includes('despach')
  const paso = entregado ? 4 : enCamino ? 3 : estadoNormalizado.includes('prepar') ? 2 : 1
  const etapas = ['Pedido confirmado', 'Preparando pedido', 'En camino', 'Entregado']

  const subtotal = Number(pedido.subtotal) || productos.reduce(
    (acumulado, producto) => acumulado +
      (Number(producto.precio) || 0) * (Number(producto.cantidad) || 1),
    0
  )
  const envio = Number(pedido.envio) || 0
  const total = Number(pedido.total) || subtotal + envio
  const pagoTexto = pago.metodo === 'credito'
    ? 'Crédito'
    : pago.metodo === 'debito'
      ? 'Débito'
      : pago.metodo ? String(pago.metodo) : 'Pago de demostración'

  return (
    <main className="bn-pagina">
      <div className="bn-marco">
        {/* Confirmación de la compra */}
        <section className="bn-banner">
          <div className="bn-exito-icono">✓</div>
          <div className="bn-banner-texto">
            <h1>¡Compra confirmada!</h1>
            <p>Tu pedido de demostración se registró correctamente. Aquí tienes tu comprobante.</p>
          </div>
          <div className="bn-banner-numero">
            <span>🛒</span>
            <div>
              <small>N.º de pedido</small>
              <strong>{pedido.id || '—'}</strong>
            </div>
          </div>
        </section>

        <article className="bn-papel">
          {/* Identificación de la boleta */}
          <div className="bn-cabecera">
            <div className="bn-marca">
              <img src={logo} alt="HuertoHogar" />
              <div>
                <strong>HUERTOHOGAR</strong>
                <small>Del campo a tu hogar</small>
              </div>
            </div>
            <div className="bn-tipo">
              <small>COMPROBANTE DE COMPRA</small>
              <strong>BOLETA DEMO 🌿</strong>
              <span>Sin validez tributaria</span>
            </div>
          </div>

          {/* Resumen superior */}
          <section className="bn-datos-superiores" aria-label="Resumen del pedido">
            <div className="bn-dato">
              <span className="bn-dato-icono">▤</span>
              <div>
                <small>NÚMERO DE PEDIDO</small>
                <strong>{pedido.id || '—'}</strong>
              </div>
            </div>
            <div className="bn-dato">
              <span className="bn-dato-icono">▣</span>
              <div>
                <small>ESTADO ACTUAL</small>
                <strong className={suspendido ? 'bn-etiqueta bn-rojo' : 'bn-etiqueta'}>
                  {estado}
                </strong>
              </div>
            </div>
            <div className="bn-dato">
              <span className="bn-dato-icono">▰</span>
              <div>
                <small>MÉTODO DE PAGO</small>
                <strong>{pagoTexto}</strong>
                <span className="bn-pago-demo">Simulado</span>
              </div>
            </div>
            <div className="bn-dato">
              <span className="bn-dato-icono">▦</span>
              <div>
                <small>FECHA Y HORA DE COMPRA</small>
                <strong>{fechaBonita(pedido.fecha)}</strong>
              </div>
            </div>
          </section>

          {/* Información del cliente y la entrega */}
          <div className="bn-info-grid">
            <section className="bn-info">
              <h2>♟ &nbsp;Datos del cliente</h2>
              <dl>
                <dt>Nombre:</dt><dd>{nombre}</dd>
                <dt>Correo:</dt><dd>{cliente.correo || pedido.correoCuenta || '—'}</dd>
                <dt>Teléfono:</dt><dd>{cliente.telefono || '—'}</dd>
              </dl>
            </section>

            <section className="bn-info">
              <h2>📍 &nbsp;Dirección de entrega</h2>
              <dl>
                <dt>Dirección:</dt><dd>{direccion}</dd>
                <dt>Comuna / Región:</dt><dd>{ubicacion}</dd>
                {entrega.vivienda === 'departamento' && (
                  <>
                    <dt>Departamento:</dt>
                    <dd>{[entrega.torre, entrega.departamento].filter(Boolean).join(' / ') || '—'}</dd>
                  </>
                )}
                {entrega.instrucciones && (
                  <>
                    <dt>Indicaciones:</dt>
                    <dd>{entrega.instrucciones}</dd>
                  </>
                )}
              </dl>
            </section>

            <section className="bn-info">
              <h2>ⓘ &nbsp;Información adicional</h2>
              <dl>
                <dt>Tipo de compra:</dt><dd>Demostración</dd>
                <dt>Fecha de registro:</dt><dd>{fechaBonita(pedido.fecha)}</dd>
                <dt>Origen:</dt><dd>HuertoHogar</dd>
                {pago.ultimosCuatro && (
                  <>
                    <dt>Tarjeta:</dt><dd>•••• {pago.ultimosCuatro}</dd>
                  </>
                )}
                {pago.metodo === 'credito' && (
                  <>
                    <dt>Cuotas:</dt><dd>{pago.cuotas || 1}</dd>
                  </>
                )}
              </dl>
            </section>
          </div>

          {/* Productos y total */}
          <div className="bn-compra-grid">
            <section className="bn-productos">
              <h2>🛒 &nbsp;Detalle de la compra</h2>
              <div className="table-responsive">
                <table className="table bn-tabla">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length > 0 ? productos.map((producto, indice) => (
                      <tr key={producto.id ?? indice}>
                        <td>
                          <div className="bn-producto-nombre">
                            {producto.imagen && (
                              <img
                                src={producto.imagen}
                                alt=""
                                onError={(evento) => {
                                  evento.currentTarget.style.display = 'none'
                                }}
                              />
                            )}
                            <span>
                              <strong>{producto.nombre || 'Producto'}</strong>
                              <small>{producto.descripcion || 'Producto HuertoHogar'}</small>
                            </span>
                          </div>
                        </td>
                        <td>{Number(producto.cantidad) || 1}</td>
                        <td>{dinero(producto.precio)}</td>
                        <td>
                          <strong>
                            {dinero((Number(producto.precio) || 0) * (Number(producto.cantidad) || 1))}
                          </strong>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4}>No hay productos en el comprobante.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bn-totales">
              <h2>Resumen de tu compra</h2>
              <div><span>Subtotal</span><strong>{dinero(subtotal)}</strong></div>
              <div><span>Envío</span><strong>{envio ? dinero(envio) : 'Gratis'}</strong></div>
              <div className="bn-total">
                <span>Total</span>
                <strong>{dinero(total)}</strong>
              </div>
            </section>
          </div>

          {/* Seguimiento horizontal bajo la boleta */}
          <section className="bn-seguimiento" aria-label="Seguimiento del pedido">
            <div className="bn-seguimiento-titulo">
              <h2>🚚 &nbsp;Seguimiento del pedido</h2>
              <p>Conoce el estado de tu compra</p>
            </div>
            {suspendido ? (
              <div className="alert alert-warning mb-0">
                <strong>Pedido suspendido.</strong>{' '}
                {pedido.motivoSuspension || 'Contacta a la tienda para más información.'}
              </div>
            ) : (
              <div className="bn-linea-pasos">
                {etapas.map((etapa, indice) => (
                  <div
                    className={'bn-paso ' + (indice < paso ? 'bn-completo' : '')}
                    key={etapa}
                  >
                    <div className="bn-circulo">{indice < paso ? '✓' : indice + 1}</div>
                    <strong>{etapa}</strong>
                    <small>
                      {indice === 0
                        ? fechaBonita(pedido.fecha)
                        : indice < paso
                          ? 'Etapa registrada'
                          : 'Etapa pendiente en esta simulación.'}
                    </small>
                  </div>
                ))}
              </div>
            )}
            <a
              className="bn-link-seguimiento"
              href={'/seguimiento-pedido?id=' + encodeURIComponent(pedido.id || '')}
            >
              Ver seguimiento completo →
            </a>
          </section>

          {/* Aviso de demostración */}
          <div className="bn-aviso">
            <span>ⓘ</span>
            <p>
              <strong>Esta es una boleta de demostración.</strong>
              <br />
              No tiene validez tributaria y es solo para fines de prueba en HuertoHogar.
              No acredita un pago real.
            </p>
          </div>

          {/* Acciones */}
          <div className="bn-acciones">
            <a className="bn-boton bn-boton-blanco" href="/">
              ← &nbsp;Volver al inicio
            </a>
            <div>
              <button
                className="bn-boton bn-boton-blanco"
                type="button"
                onClick={() => window.print()}
              >
                ▣ &nbsp;Imprimir boleta
              </button>
              <button
                className="bn-boton bn-boton-verde"
                type="button"
                onClick={() => window.print()}
                title="En el diálogo de impresión, selecciona Guardar como PDF"
              >
                ↓ &nbsp;Descargar PDF
              </button>
            </div>
          </div>
          <p className="bn-ayuda-pdf">
            Para descargar, selecciona «Guardar como PDF» en la ventana de impresión.
          </p>
        </article>
      </div>
    </main>
  )
}
