import { useMemo } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import '../../css/tienda/seguimiento-pedido.css'

const LOGO = '/img/Logo_3.png'
const ETAPAS = [
  { titulo: 'Pedido confirmado', detalle: 'Tu compra fue registrada correctamente.', icono: '✓' },
  { titulo: 'Preparando pedido', detalle: 'Seleccionamos y empacamos tus productos.', icono: '▣' },
  { titulo: 'En camino', detalle: 'Tu pedido está en reparto.', icono: '🚚' },
  { titulo: 'Entregado', detalle: '¡Disfruta tus productos frescos!', icono: '⌂' },
]

const moneda = (valor) => '$' + (Number(valor) || 0).toLocaleString('es-CL')
const fechaCL = (valor) => {
  if (!valor) return 'Fecha no disponible'
  const fecha = new Date(valor)
  return Number.isNaN(fecha.getTime())
    ? 'Fecha no disponible'
    : fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
}

const estadoNormalizado = (valor) => String(valor || '').trim().toLowerCase()
function nivelEstado(valor) {
  const estado = estadoNormalizado(valor)
  if (estado.includes('entreg')) return 3
  if (estado.includes('camino') || estado.includes('repart') || estado.includes('despach')) return 2
  if (estado.includes('prepar')) return 1
  return 0
}

function leerJSON(almacen, clave, respaldo) {
  try { return JSON.parse(almacen.getItem(clave) || 'null') ?? respaldo }
  catch { return respaldo }
}

function obtenerPedido(id) {
  if (!id) return null
  const guardados = leerJSON(localStorage, 'pedidos_huerto', [])
  const pedidos = Array.isArray(guardados) ? guardados : []
  const ultimo = leerJSON(sessionStorage, 'ultimo_pedido_huerto', null)
  return pedidos.find((pedido) => String(pedido.id) === String(id)) ||
    (ultimo && String(ultimo.id) === String(id) ? ultimo : null)
}

function calcularTotales(pedido, productos) {
  const calculado = productos.reduce((suma, producto) =>
    suma + (Number(producto.precio) || 0) * (Number(producto.cantidad) || 1), 0)
  const subtotal = pedido.subtotal == null ? calculado : Number(pedido.subtotal) || 0
  const envio = Number(pedido.envio) || 0
  const total = pedido.total == null ? subtotal + envio : Number(pedido.total) || 0
  return { subtotal, envio, total }
}

export default function SeguimientoPedido() {
  const { usuario } = useAuth()
  const id = new URLSearchParams(window.location.search).get('id')
  const pedido = useMemo(() => obtenerPedido(id), [id])

  const correoUsuario = String(usuario?.correo || '').trim().toLowerCase()
  const correoPedido = String(pedido?.correoCuenta || pedido?.cliente?.correo || '').trim().toLowerCase()
  const autorizado = Boolean(correoUsuario && pedido && correoPedido && correoUsuario === correoPedido)

  if (!usuario) {
    const regreso = '/seguimiento-pedido?id=' + encodeURIComponent(id || '')
    return (
      <main className="seg-pantalla-mensaje container py-5 text-center">
        <div className="seg-mensaje-card mx-auto p-5">
          <div className="seg-mensaje-icono">🔒</div>
          <h1>Inicia sesión para ver tu pedido</h1>
          <p>El seguimiento está disponible para la cuenta que realizó la compra.</p>
          <a className="btn seg-btn-verde px-4" href={'/login?redirigir=' + encodeURIComponent(regreso)}>Iniciar sesión</a>
        </div>
      </main>
    )
  }

  if (!autorizado) {
    return (
      <main className="seg-pantalla-mensaje container py-5 text-center">
        <div className="seg-mensaje-card mx-auto p-5">
          <div className="seg-mensaje-icono">📦</div>
          <h1>Pedido no encontrado</h1>
          <p>No existe este pedido o no pertenece a tu cuenta.</p>
          <a className="btn seg-btn-verde px-4" href="/mis-pedidos">Volver a mis pedidos</a>
        </div>
      </main>
    )
  }

  const suspendido = estadoNormalizado(pedido.estado).includes('suspend')
  const nivel = nivelEstado(pedido.estado)
  const estadoActual = suspendido ? 'Pedido suspendido' : ETAPAS[nivel].titulo
  const productos = Array.isArray(pedido.productos) ? pedido.productos : []
  const { subtotal, envio, total } = calcularTotales(pedido, productos)
  const entrega = pedido.entrega || {}
  const direccion = [entrega.calle, entrega.numero].filter(Boolean).join(' ')
  const ubicacion = [entrega.comuna, entrega.ciudad, entrega.region].filter(Boolean).join(', ')
  const mapsUrl = direccion
    ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([direccion, ubicacion].filter(Boolean).join(', '))
    : null

  const mostrarBoleta = () => {
    sessionStorage.setItem('ultimo_pedido_huerto', JSON.stringify(pedido))
    window.location.href = '/boleta'
  }

  return (
    <div className="seg-app">
      <header className="seg-topbar">
        <a href="/" className="seg-brand" aria-label="HuertoHogar, ir al inicio">
          <img src={LOGO} alt="" />
          <span><strong>HuertoHogar</strong><small>Del campo a tu hogar</small></span>
        </a>
        <nav className="seg-toplinks" aria-label="Navegación principal">
          <a href="/">⌂ <span>Inicio</span></a>
          <a href="/productos">♧ <span>Catálogo</span></a>
          <a href="/carrito">🛒 <span>Carrito</span></a>
          <a href="/mis-pedidos" className="activo">🚚 <span>Mis pedidos</span></a>
        </nav>
        <a className="seg-topuser" href="/mis-pedidos">◉ <span>Hola, {usuario.nombre || 'Cliente'}</span></a>
      </header>

      <div className="seg-shell">
        <aside className="seg-sidebar" aria-label="Menú de cuenta">
          <div className="seg-sidebar-label">MI CUENTA</div>
          <a href="/mis-pedidos">♙ <span>Mi cuenta</span></a>
          <a href="/mis-pedidos" className="seleccionado">▣ <span>Mis pedidos</span></a>
          <a href="/productos">♡ <span>Explorar productos</span></a>
          <a href="/carrito">▤ <span>Mi carrito</span></a>
          <div className="seg-sidebar-ayuda">
            <span className="seg-ayuda-icono">☏</span>
            <strong>¿Necesitas ayuda?</strong>
            <small>Estamos para ayudarte.</small>
            <a href="/contactos">Contactar soporte</a>
          </div>
          <div className="seg-sidebar-art" role="img" aria-label="Productos frescos de HuertoHogar" />
        </aside>

        <main className="seg-main">
          <div className="seg-breadcrumb"><a href="/mis-pedidos">Mis pedidos</a><span>›</span><span>Seguimiento de pedido</span></div>

          <section className="seg-hero" aria-labelledby="seg-titulo">
            <div className="seg-hero-content">
              <span className="seg-pill">▣ &nbsp; Pedido #{pedido.id}</span>
              <h1 id="seg-titulo">{suspendido ? 'Tu pedido está suspendido' : nivel === 3 ? '¡Tu pedido fue entregado!' : nivel === 2 ? 'Tu pedido va en camino' : nivel === 1 ? 'Estamos preparando tu pedido' : '¡Recibimos tu pedido!'}</h1>
              <p>{suspendido ? 'Revisa el motivo y contacta a la tienda si necesitas ayuda.' : 'Productos frescos del campo hasta tu hogar. Consulta aquí el avance de tu compra.'}</p>
              <span className="seg-fecha">▦ &nbsp; Compra realizada el {fechaCL(pedido.fecha)}</span>
            </div>
            
            <div className="seg-hero-status">
              <small>ESTADO ACTUAL</small>
              <strong>{estadoActual}</strong>
              <div className="seg-mini-bar"><span style={{ width: suspendido ? '0%' : `${((nivel + 1) / 4) * 100}%` }} /></div>
              <span>{suspendido ? 'Seguimiento pausado' : `${nivel + 1} de 4 etapas`}</span>
            </div>
          </section>

          {suspendido && (
            <div className="alert alert-warning seg-alerta" role="alert">
              <strong>⚠ Pedido suspendido</strong>
              <p className="mb-0">Motivo: {pedido.motivoSuspension || 'Contacta a la tienda para obtener más información.'}</p>
            </div>
          )}

          <section className="seg-card seg-timeline" aria-label="Etapas de seguimiento">
            <div className="seg-pasos" style={{ '--progreso': suspendido ? '0%' : `${(nivel / 3) * 100}%` }}>
              {ETAPAS.map((etapa, indice) => {
                const completada = !suspendido && indice <= nivel
                const actual = !suspendido && indice === nivel
                return (
                  <div className={`seg-paso ${completada ? 'completado' : ''} ${actual ? 'actual' : ''}`} key={etapa.titulo}>
                    <span className="seg-paso-icono">{completada && indice < nivel ? '✓' : etapa.icono}</span>
                    <strong>{etapa.titulo}</strong>
                    <small>{indice === 0 && completada ? fechaCL(pedido.fecha) : completada ? 'Estado registrado' : 'Pendiente'}</small>
                    <p>{etapa.detalle}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="row g-3 seg-content-row">
            <div className="col-12 col-xl-7">
              <section className="seg-card seg-map-card h-100">
                <div className="seg-card-title"><h2>📍 Ruta de tu pedido</h2>{mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Ver dirección en Google Maps ↗</a>}</div>
                <div className="seg-map-illustration" role="img" aria-label="Ilustración decorativa de un recorrido de reparto, sin ubicación GPS en tiempo real">
                  
                </div>
                <p className="seg-map-note">Mapa ilustrativo · No contamos con rastreo GPS en tiempo real.</p>
              </section>
            </div>
            <div className="col-12 col-xl-5">
              <section className="seg-card seg-delivery-card h-100">
                <div className="seg-card-title"><h2>▣ Información de entrega</h2></div>
                <div className="seg-delivery-item"><span>📍</span><div><strong>Dirección</strong><p>{direccion || 'No indicada'}<br />{ubicacion || 'Ubicación no indicada'}</p></div></div>
                <div className="seg-delivery-item"><span>♙</span><div><strong>Repartidor</strong><p>Por asignar</p><small>No se ha registrado un repartidor.</small></div></div>
                <div className="seg-delivery-item"><span>◷</span><div><strong>Llegada estimada</strong><p>Pendiente de confirmar</p><small>Sin fecha estimada registrada.</small></div></div>
              </section>
            </div>
            <div className="col-12">
              <section className="seg-card seg-history">
                <div className="seg-card-title"><h2>◷ Historial de actividad</h2></div>
                <div className="seg-history-list">
                  {ETAPAS.slice(0, suspendido ? 1 : nivel + 1).reverse().map((etapa, indice) => (
                    <div className="seg-history-entry" key={etapa.titulo}>
                      <span className="seg-history-icon">{etapa.icono}</span>
                      <div><small>{indice === (suspendido ? 0 : nivel) ? fechaCL(pedido.fecha) : 'Fecha no registrada'}</small><strong>{etapa.titulo}</strong></div>
                      <p>{etapa.detalle}</p>
                    </div>
                  ))}
                  {suspendido && <div className="seg-history-entry"><span className="seg-history-icon">!</span><div><small>Fecha no registrada</small><strong>Pedido suspendido</strong></div><p>{pedido.motivoSuspension || 'Sin motivo informado'}</p></div>}
                </div>
                <small className="seg-history-disclaimer">Las etapas se deducen del estado actual. No se dispone de un registro de fechas por etapa.</small>
              </section>
            </div>
          </div>
        </main>

        <aside className="seg-rightbar">
          <section className="seg-card seg-summary">
            <h2>▣ Resumen del pedido</h2>
            <div className="seg-summary-products">
              {productos.length === 0 && <p className="text-muted">No hay productos registrados.</p>}
              {productos.map((producto, indice) => (
                <div className="seg-product" key={producto.id ?? indice}>
                  <div className="seg-product-image">{producto.imagen ? <img src={producto.imagen} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} /> : '🥬'}</div>
                  <div className="seg-product-description"><strong>{producto.nombre || 'Producto'}</strong><small>x {Number(producto.cantidad) || 1}</small></div>
                  <strong>{moneda((Number(producto.precio) || 0) * (Number(producto.cantidad) || 1))}</strong>
                </div>
              ))}
            </div>
            <div className="seg-summary-line"><span>Subtotal</span><strong>{moneda(subtotal)}</strong></div>
            <div className="seg-summary-line"><span>Envío</span><strong>{envio ? moneda(envio) : 'Gratis'}</strong></div>
            <div className="seg-summary-total"><span>Total</span><strong>{moneda(total)}</strong></div>
            <button type="button" className="btn seg-btn-verde w-100" onClick={mostrarBoleta}>▣ &nbsp; Ver boleta del pedido</button>
            <button type="button" className="btn seg-btn-outline w-100 mt-2" onClick={() => { sessionStorage.setItem('ultimo_pedido_huerto', JSON.stringify(pedido)); window.location.href = '/boleta' }}>↓ &nbsp; Descargar comprobante desde boleta</button>
          </section>
          <section className="seg-card seg-help"><h2>☏ ¿Problemas con tu pedido?</h2><p>Si necesitas información adicional, escríbenos.</p><a href="/contactos" className="btn seg-btn-outline">Ir a contacto →</a></section>
          <div className="seg-thanks" role="img" aria-label="Gracias por confiar en HuertoHogar" />
        </aside>
      </div>
    </div>
  )
}
