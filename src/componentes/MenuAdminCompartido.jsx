import { useEffect, useState } from 'react'
import '../css/menu-admin-compartido.css'

const opciones = [
  { ruta: '/dashboard', icono: '▦', nombre: 'Inicio · Resumen' },
  { ruta: '/dashboard?seccion=inventario', icono: '📦', nombre: 'Inventario' },
  { ruta: '/dashboard?seccion=agregar-producto', icono: '🛍️', nombre: 'Agregar producto' },
  { ruta: '/dashboard?seccion=eliminar-producto', icono: '🗑️', nombre: 'Eliminar producto' },
  { ruta: '/dashboard?seccion=pedidos', icono: '🚚', nombre: 'Gestión de pedidos' },
  { ruta: '/admin/usuarios', icono: '👥', nombre: 'Gestión de usuarios' },
  { ruta: '/admin/agregar', icono: '➕', nombre: 'Agregar administrador' }
]

export default function MenuAdminCompartido() {
  const [abierto, setAbierto] = useState(false)
  const ruta = window.location.pathname
  const seccion = new URLSearchParams(window.location.search).get('seccion')
  const inventario = seccion === 'inventario'
  const agregarProducto = seccion === 'agregar-producto'
  const eliminarProducto = seccion === 'eliminar-producto'
  const pedidos = seccion === 'pedidos'
  useEffect(() => {
    const tecla = (evento) => { if (evento.key === 'Escape') setAbierto(false) }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])
  return (
    <div className="menu-hh-compartido">
      <button className="menu-hh-abrir" type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-controls="menu-hh-lateral" aria-label={abierto ? 'Cerrar menú administrativo' : 'Abrir menú administrativo'}>☰ <span>Menú</span></button>
      {abierto && <button className="menu-hh-sombra" type="button" onClick={() => setAbierto(false)} aria-label="Cerrar menú" />}
      <aside id="menu-hh-lateral" className={`menu-hh-panel ${abierto ? 'visible' : ''}`} aria-hidden={!abierto}>
        <a className="menu-hh-logo" href="/dashboard"><span>🌱</span><span>HuertoHogar<small>Administración</small></span></a>
        <p className="menu-hh-grupo">MI NEGOCIO</p>
        <nav className="menu-hh-opciones" aria-label="Navegación administrativa">
          {opciones.map((opcion, i) => {
            const activo = ruta + window.location.search === opcion.ruta || (i === 0 && ruta === '/dashboard' && !seccion)
            return <a key={opcion.ruta} href={opcion.ruta} className={`menu-hh-enlace ${activo ? 'activo' : ''}`} tabIndex={abierto ? 0 : -1} aria-current={activo ? 'page' : undefined}><span aria-hidden="true">{opcion.icono}</span><span>{opcion.nombre}</span></a>
          })}
        </nav>
        <div className="menu-hh-pie">
          <div className="menu-hh-consejo">🌿<strong>Un huerto bien cuidado</strong><p>Revisa tu stock para mantener tus productos disponibles.</p></div>
          <a href="/" tabIndex={abierto ? 0 : -1}>← Volver a la tienda</a>
        </div>
      </aside>
    </div>
  )
}
