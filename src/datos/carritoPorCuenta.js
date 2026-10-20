// Carritos independientes por correo; los visitantes usan un carrito temporal.
export function claveCarritoActual() {
  let sesion = null
  try { sesion = JSON.parse(sessionStorage.getItem('sesion_huerto') || localStorage.getItem('sesion_huerto') || 'null') } catch {}
  const correo = sesion?.correo?.trim().toLowerCase()
  return correo ? `carrito_huerto_usuario_${encodeURIComponent(correo)}` : 'carrito_huerto_invitado'
}
export function leerCarritoActual() {
  try {
    const datos = JSON.parse(localStorage.getItem(claveCarritoActual()) || '[]')
    return Array.isArray(datos) ? datos : []
  } catch { return [] }
}
export function guardarCarritoActual(productos) {
  localStorage.setItem(claveCarritoActual(), JSON.stringify(productos))
  window.dispatchEvent(new Event('carritoActualizado'))
}
export function limpiarCarritoActual() {
  localStorage.removeItem(claveCarritoActual())
  window.dispatchEvent(new Event('carritoActualizado'))
}
