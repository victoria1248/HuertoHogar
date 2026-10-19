import { productosIniciales } from '../datos/productosIniciales.js'
// Fuente única de productos para el catálogo y el dashboard de HuertoHogar.
// Los cambios de precio y stock se guardan en localStorage para ambas pantallas.
export const CLAVE_INVENTARIO = 'huertohogar-inventario-demo-v1'

export function leerInventario() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_INVENTARIO) || 'null')
    if (!Array.isArray(guardados)) {
      localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(productosIniciales))
      return productosIniciales
    }

    // Una lista guardada es autoritativa, incluso vacía: no resucitar eliminados.
    return guardados

  } catch {
    return productosIniciales
  }
}

export function guardarInventario(productos) {
  // Normaliza el formato antes de guardarlo para que el dashboard y el catálogo
  // lean siempre los mismos campos y las categorías sean consistentes.
  const lista = productos.map((producto, indice) => ({
    ...producto,
    id: producto.id ?? indice + 1,
    nombre: String(producto.nombre || '').trim(),
    categoria: String(producto.categoria || 'Otros').trim(),
    precio: Number(producto.precio) || 0,
    stock: Number(producto.stock) || 0,
    unidad: producto.unidad || 'unidad',
    plural: producto.plural || 'unidades',
    descuento: Boolean(producto.descuento),
    descuentoPorcentaje: producto.descuento ? Math.min(90, Math.max(1, Number(producto.descuentoPorcentaje) || 10)) : 0,
    descripcion: producto.descripcion || '',
  }))
  localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(lista))
  window.dispatchEvent(new Event('inventarioActualizado'))
  window.dispatchEvent(new StorageEvent('storage', { key: CLAVE_INVENTARIO, newValue: JSON.stringify(lista) }))
}
