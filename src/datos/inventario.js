// Fuente única de productos para el catálogo y el dashboard de HuertoHogar.
// Los cambios de precio y stock se guardan en localStorage para ambas pantallas.
export const CLAVE_INVENTARIO = 'huertohogar-inventario-demo-v1'

export const productosIniciales = [
  { id: 1, codigo: 'FR001', nombre: 'Manzanas Fuji', categoria: 'Frutas', precio: 1200, stock: 150, unidad: 'kilo', plural: 'kilos', imagen: '/img/catalogo/FR001.jpeg', descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.' },
  { id: 2, codigo: 'FR002', nombre: 'Naranjas Valencia', categoria: 'Frutas', precio: 1000, stock: 200, unidad: 'kilo', plural: 'kilos', imagen: '/img/catalogo/FR002.jpeg', descripcion: 'Naranjas jugosas y ricas en vitamina C, ideales para zumos frescos.' },
  { id: 3, codigo: 'FR003', nombre: 'Plátanos Cavendish', categoria: 'Frutas', precio: 800, stock: 250, unidad: 'kilo', plural: 'kilos', imagen: '/img/catalogo/FR003.jpeg', descripcion: 'Plátanos dulces, perfectos para el desayuno o como snack energético.' },
  { id: 4, codigo: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'Verduras', precio: 900, stock: 100, unidad: 'kilo', plural: 'kilos', imagen: '/img/catalogo/VR001.jpeg', descripcion: 'Zanahorias crujientes cultivadas sin pesticidas.' },
  { id: 5, codigo: 'VR002', nombre: 'Espinacas Frescas', categoria: 'Verduras', precio: 700, stock: 80, unidad: 'bolsa de 500 g', plural: 'bolsas', imagen: '/img/catalogo/VR002.jpeg', descripcion: 'Espinacas frescas y nutritivas para ensaladas y batidos.' },
  { id: 6, codigo: 'VR003', nombre: 'Pimientos Tricolores', categoria: 'Verduras', precio: 1500, stock: 120, unidad: 'kilo', plural: 'kilos', imagen: '/img/catalogo/VR003.jpeg', descripcion: 'Pimientos rojos, amarillos y verdes, ricos en antioxidantes.' },
  { id: 7, codigo: 'PO001', nombre: 'Miel Orgánica', categoria: 'Orgánicos', precio: 5000, stock: 50, unidad: 'frasco de 500 g', plural: 'frascos', imagen: '/img/catalogo/PO001.jpeg', descripcion: 'Miel orgánica producida por apicultores locales.' },
]

export function leerInventario() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_INVENTARIO) || 'null')
    if (!Array.isArray(guardados)) {
      localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(productosIniciales))
      return productosIniciales
    }

    // Migra el inventario de demostración antiguo y conserva los cambios del usuario.
    const nombresDemoAntiguos = ['Zanahoria Orgánica', 'Miel Orgánica', 'Espinacas Frescas']
    const esInventarioDemoAntiguo = guardados.length === 3 &&
      guardados.every(p => nombresDemoAntiguos.includes(p.nombre) && !p.codigo)
    if (esInventarioDemoAntiguo) {
      localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(productosIniciales))
      return productosIniciales
    }

    const combinados = [...guardados]
    productosIniciales.forEach(inicial => {
      const existe = combinados.some(p => p.codigo === inicial.codigo ||
        p.nombre?.trim().toLowerCase() === inicial.nombre.toLowerCase())
      if (!existe) combinados.push(inicial)
    })
    localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(combinados))
    return combinados
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
