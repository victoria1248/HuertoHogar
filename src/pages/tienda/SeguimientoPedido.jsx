import { useMemo } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
const logo = '/img/Logo_3.png'
import '../../css/tienda/seguimiento-pedido.css'

const moneda = n => '$' + Number(n || 0).toLocaleString('es-CL')
const fechaCL = d => {
  const fecha = new Date(d)
  return Number.isNaN(fecha.getTime()) ? 'Fecha no disponible' : fecha.toLocaleDateString('es-CL', {day:'numeric',month:'long',year:'numeric'})
}
const etapas = [
  {titulo:'Pedido confirmado',detalle:'Tu compra fue registrada',simbolo:'✓'},
  {titulo:'Preparando pedido',detalle:'Seleccionamos tus productos',simbolo:'✓'},
  {titulo:'En camino',detalle:'Tu pedido está en reparto',simbolo:'🚚'},
  {titulo:'Entregado',detalle:'¡Disfruta tus productos frescos!',simbolo:'⌂'}
]
function nivelEstado(estado) {
  const e = String(estado || '').toLowerCase()
  if (e.includes('entreg')) return 3
  if (e.includes('camino') || e.includes('repart')) return 2
  if (e.includes('prepar')) return 1
  return 0
}
function obtenerPedido(id) {
  try {
    const guardados = JSON.parse(localStorage.getItem('pedidos_huerto') || '[]')
    const lista = Array.isArray(guardados) ? guardados : []
    const ultimo = JSON.parse(sessionStorage.getItem('ultimo_pedido_huerto') || 'null')
    return lista.find(p => String(p.id) === String(id)) || (ultimo && String(ultimo.id) === String(id) ? ultimo : null)
  } catch { return null }
}
export default function SeguimientoPedido() {
  const {usuario} = useAuth()
  const id = new URLSearchParams(window.location.search).get('id')
  const pedido = useMemo(() => id ? obtenerPedido(id) : null, [id])
  const autorizado = Boolean(usuario?.correo && pedido &&
    String(usuario.correo).trim().toLowerCase() ===
    String(pedido.correoCuenta || pedido.cliente?.correo || '').trim().toLowerCase())
  if (!usuario) return <main className="seg-mensaje"><h1>Inicia sesión para ver tu seguimiento</h1><p>Tu pedido está asociado a tu cuenta de HuertoHogar.</p><a href={'/login?redirigir=' + encodeURIComponent('/seguimiento-pedido?id=' + (id || ''))}>Iniciar sesión</a></main>
  if (!autorizado) return <main className="seg-mensaje"><h1>Pedido no encontrado</h1><p>El pedido no existe o no está asociado a tu cuenta.</p><a href="/mis-pedidos">Volver a mis pedidos</a></main>
  const suspendido = String(pedido.estado || '').toLowerCase() === 'suspendido'
  const estado = nivelEstado(pedido.estado)
  const productos = Array.isArray(pedido.productos) ? pedido.productos : []
  const dir = pedido.entrega || {}
  const direccion = [dir.calle,dir.numero].filter(Boolean).join(' ')
  const lugar = [dir.comuna,dir.ciudad,dir.region].filter(Boolean).join(', ')
  const tituloEstado = suspendido ? 'Pedido suspendido' : etapas[estado].titulo
  const mostrarBoleta = () => {
    sessionStorage.setItem('ultimo_pedido_huerto',JSON.stringify(pedido))
    window.location.href='/boleta'
  }
  return <div className="seg-app">
    <header className="seg-header"><a href="/" className="seg-logo"><img src={logo} alt="HuertoHogar"/></a><nav><a href="/">⌂ <span>Inicio</span></a><a href="/productos">♧ <span>Catálogo</span></a><a href="/carrito">🛒 <span>Carrito</span></a><a className="seg-active" href="/mis-pedidos">🚚 <span>Mis pedidos</span></a></nav><a className="seg-usuario" href="/mis-pedidos">♟ &nbsp; Hola, {usuario.nombre || 'Cliente'} ⌄</a></header>
    <main className="seg-layout">
      <section className="seg-panel seg-principal">
        <a href="/mis-pedidos" className="seg-volver">← &nbsp;Volver a mis pedidos</a>
        <div className="seg-heading"><div><h1>Seguimiento de tu pedido</h1><p><strong>Pedido #{pedido.id}</strong> <span> • &nbsp;{fechaCL(pedido.fecha)}</span></p></div><div className="seg-estado">🚚 <div><strong>{tituloEstado}</strong><small>{estado===3?'Pedido entregado':'Estado registrado del pedido'}</small></div></div></div>
        {suspendido && <div role="alert" style={{padding:'18px',margin:'16px 0',borderRadius:'12px',background:'#fff0e6',color:'#8a3523'}}><strong>⚠ Tu pedido está suspendido</strong><p>Motivo: {pedido.motivoSuspension || 'Contacta a la tienda para más información.'}</p><p>El seguimiento se reanudará cuando el administrador cambie el estado.</p></div>}
        <div className="seg-ilustracion" role="img" aria-label="Ilustración de HuertoHogar: camión de reparto entre el centro de despacho y el domicilio" />
        <div className="seg-etapas" style={{'--progreso': `${estado / 3 * 100}%`}}>{etapas.map((e,i)=><div key={e.titulo} className={'seg-etapa '+(i<=estado?'completada ':'')+(i===estado?'actual':'')}><div className="seg-circulo">{i<estado?'✓':e.simbolo}</div><strong>{e.titulo}</strong><small>{i<=estado ? (i===0?fechaCL(pedido.fecha):'Estado registrado'):'Pendiente'}</small><p>{e.detalle}</p></div>)}</div>
        <div className="seg-informacion"><div><span className="seg-info-icon">🚚</span><div><strong>Repartidor</strong><p>No asignado</p><small>Sin seguimiento GPS en tiempo real</small></div></div><div><span className="seg-info-icon">📍</span><div><strong>Dirección de entrega</strong><p>{direccion || 'No indicada'}</p><small>{lugar || 'Ubicación no indicada'}</small></div></div><div><span className="seg-info-icon">◷</span><div><strong>Llegada estimada</strong><p>Pendiente de confirmar</p><small>Simulación de compra</small></div></div><a className="seg-mapa" href={direccion ? 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(direccion+' '+lugar) : '/mis-pedidos'} target={direccion?'_blank':undefined} rel="noopener noreferrer">♧ Ver en el mapa</a></div>
      </section>
      <aside className="seg-panel seg-resumen"><h2>Resumen del pedido</h2><div className="seg-productos">{productos.map((prod,i)=><div className="seg-producto" key={prod.id ?? i}><div className="seg-miniatura">🥬</div><div className="seg-producto-texto"><span>{prod.nombre || 'Producto'}</span><small>x {Number(prod.cantidad)||1}</small></div><strong>{moneda((Number(prod.precio)||0)*(Number(prod.cantidad)||1))}</strong></div>)}</div><div className="seg-totales"><div><span>Subtotal</span><span>{moneda(pedido.subtotal)}</span></div><div><span>Envío</span><span>{moneda(pedido.envio)}</span></div><div className="seg-total"><strong>Total</strong><strong>{moneda(pedido.total)}</strong></div></div><div className="seg-aviso"><strong>🌿 Tu pedido: {tituloEstado.toLowerCase()}</strong><p>Puedes consultar el estado de tu compra en esta sección.</p><small>¡Gracias por confiar en HuertoHogar!</small></div><button className="seg-detalles" onClick={mostrarBoleta}>▤ &nbsp;Ver detalles del pedido</button></aside>
    </main><footer className="seg-footer"><img src={logo} alt="HuertoHogar"/><span>Contacto &nbsp; | &nbsp; Términos y condiciones &nbsp; | &nbsp; Política de privacidad</span><span>Síguenos en: &nbsp; ◎ &nbsp; ●</span></footer>
  </div>
}
