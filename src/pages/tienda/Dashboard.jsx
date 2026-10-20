import { useState, useEffect } from 'react'
import '../../css/tienda/administrador.css'
import '../../css/tienda/agregar-producto.css'
const imagenVerduras = '/img/verduras.png'
const imagenOrganico = '/img/Organico.png'
const imagenHerbas = '/img/Herbas.png'

import { CLAVE_INVENTARIO, leerInventario, guardarInventario } from '../../datos/inventario.js'

// El dashboard y el catálogo usan el mismo inventario compartido.

// Las ventas del gráfico se calculan desde los pedidos realmente guardados.
function calcularVentas(pedidos, periodo) {
    const ahora = new Date()
    const inicioSemana = new Date(ahora)
    const dia = (ahora.getDay() + 6) % 7
    inicioSemana.setDate(ahora.getDate() - dia)
    inicioSemana.setHours(0, 0, 0, 0)

    if (periodo === 'semana') {
        const etiquetas = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        const valores = Array(7).fill(0)
        pedidos.forEach(pedido => {
            if (pedido.estado === 'Suspendido' || pedido.estado === 'Cancelado') return
            const fecha = new Date(pedido.fecha || pedido.fechaCreacion || '')
            if (Number.isNaN(fecha.getTime()) || fecha < inicioSemana) return
            const indice = (fecha.getDay() + 6) % 7
            valores[indice] += Number(pedido.total ?? pedido.subtotal ?? 0) || 0
        })
        return { etiquetas, valores }
    }

    const año = ahora.getFullYear()
    const mes = ahora.getMonth()
    const etiquetas = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5']
    const valores = Array(5).fill(0)
    pedidos.forEach(pedido => {
        if (pedido.estado === 'Suspendido' || pedido.estado === 'Cancelado') return
        const fecha = new Date(pedido.fecha || pedido.fechaCreacion || '')
        if (Number.isNaN(fecha.getTime()) || fecha.getFullYear() !== año || fecha.getMonth() !== mes) return
        const indice = Math.min(4, Math.floor((fecha.getDate() - 1) / 7))
        valores[indice] += Number(pedido.total ?? pedido.subtotal ?? 0) || 0
    })
    return { etiquetas, valores }
}

const clavePedidos = 'pedidos_huerto'
const claveInventario = CLAVE_INVENTARIO
const imagenesAnteriores = { '/img/verduras.png': imagenVerduras, '/img/Organico.png': imagenOrganico, '/img/Herbas.png': imagenHerbas }
function imagenCorrecta(ruta) { return imagenesAnteriores[ruta] || ruta || imagenVerduras }

function formatoPrecio(valor) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(valor)
}

function cargarProductos() {
    return leerInventario().map(producto => ({
        ...producto,
        imagen: imagenCorrecta(producto.imagen)
    }))
}

function Dashboard() {
    const [productos, setProductos] = useState(cargarProductos)
    const [seccion, setSeccion] = useState(() => ['inventario','agregar-producto','editar-producto','eliminar-producto','pedidos'].includes(new URLSearchParams(window.location.search).get('seccion')) ? new URLSearchParams(window.location.search).get('seccion') : 'resumen')
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [soloStockBajo, setSoloStockBajo] = useState(false)
    const [periodo, setPeriodo] = useState('semana')
    const [productoSeleccionado, setProductoSeleccionado] = useState('')
    const [cantidad, setCantidad] = useState('1')
    const [mensaje, setMensaje] = useState('')
    const [nuevo, setNuevo] = useState({nombre:'',categoria:'Verduras',precio:'',stock:'',unidad:'kilo',plural:'kilos',descuento:false,descuentoPorcentaje:'10',imagen:'',descripcion:''})
    const [productoAEditar, setProductoAEditar] = useState('')
    const [edicion, setEdicion] = useState({nombre:'',categoria:'Frutas',precio:'',stock:'',unidad:'kilo',plural:'kilos',descuento:false,descuentoPorcentaje:'10',imagen:'',descripcion:''})
    const [archivoImagen, setArchivoImagen] = useState(null)
    const [pedidos, setPedidos] = useState(() => {
        try { const datos = JSON.parse(localStorage.getItem(clavePedidos) || '[]'); return Array.isArray(datos) ? datos : [] } catch { return [] }
    })
    const [busquedaPedido, setBusquedaPedido] = useState('')
    const [motivosSuspension, setMotivosSuspension] = useState({})
    const [productoAEliminar, setProductoAEliminar] = useState('')
    useEffect(() => {
        const sincronizar = () => {
            try { const datos = JSON.parse(localStorage.getItem(clavePedidos) || '[]'); setPedidos(Array.isArray(datos) ? datos : []) } catch { setPedidos([]) }
        }
        const sincronizarInventario = () => setProductos(cargarProductos())
        window.addEventListener('storage', sincronizar)
        window.addEventListener('pedidosActualizados', sincronizar)
        window.addEventListener('inventarioActualizado', sincronizarInventario)
        return () => {
            window.removeEventListener('storage', sincronizar)
            window.removeEventListener('pedidosActualizados', sincronizar)
            window.removeEventListener('inventarioActualizado', sincronizarInventario)
        }
    }, [])

    function actualizarPedido(id, estado) {
        const actual = pedidos.find(p => String(p.id) === String(id))
        if (!actual) return
        const motivo = (motivosSuspension[id] || '').trim()
        if (estado === 'Suspendido' && motivo.length < 5) {
            setMensaje('Para suspender el pedido escribe un motivo de al menos 5 caracteres.')
            return
        }
        const nuevos = pedidos.map(p => String(p.id) === String(id) ? {
            ...p, estado, motivoSuspension: estado === 'Suspendido' ? motivo : '',
            fechaActualizacion: new Date().toISOString()
        } : p)
        try {
            localStorage.setItem(clavePedidos, JSON.stringify(nuevos))
            setPedidos(nuevos)
            setMensaje(`Pedido ${id} actualizado a ${estado}.`)
            window.dispatchEvent(new Event('pedidosActualizados'))
        } catch { setMensaje('No se pudo guardar el estado del pedido.') }
    }

    function eliminarProducto(evento) {
        evento.preventDefault()
        const producto = productos.find(p => String(p.id) === String(productoAEliminar))
        if (!producto) { setMensaje('Selecciona un producto.'); return }
        if (!window.confirm(`¿Eliminar definitivamente «${producto.nombre}» del inventario?`)) return
        const nuevos = productos.filter(p => String(p.id) !== String(productoAEliminar))
        try {
            guardarInventario(nuevos)
            setProductos(nuevos)
            setProductoAEliminar('')
            setMensaje(`Producto «${producto.nombre}» eliminado.`)
        } catch { setMensaje('No se pudo guardar la eliminación.') }
    }

    function seleccionarProductoEdicion(id) {
        setProductoAEditar(String(id))
        const producto = productos.find(item => String(item.id) === String(id))
        if (!producto) return
        setEdicion({
            nombre: producto.nombre || '',
            categoria: producto.categoria || 'Frutas',
            precio: String(producto.precio ?? ''),
            stock: String(producto.stock ?? 0),
            unidad: producto.unidad || 'unidad',
            plural: producto.plural || 'unidades',
            descuento: Boolean(producto.descuento),
            descuentoPorcentaje: String(producto.descuentoPorcentaje || 10),
            imagen: producto.imagen || '',
            descripcion: producto.descripcion || ''
        })
        setMensaje('')
    }

    function guardarEdicionProducto(evento) {
        evento.preventDefault()
        const producto = productos.find(item => String(item.id) === String(productoAEditar))
        const nombre = edicion.nombre.trim()
        const precio = Number(edicion.precio)
        const stock = Number(edicion.stock)
        const porcentaje = Number(edicion.descuentoPorcentaje)
        if (!producto) { setMensaje('Selecciona el producto que deseas editar.'); return }
        if (!nombre || !edicion.categoria || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(stock) || stock < 0) {
            setMensaje('Revisa el nombre, categoría, precio y stock. El stock debe ser un número entero igual o mayor que cero.')
            return
        }
        if (edicion.descuento && (!Number.isFinite(porcentaje) || porcentaje < 1 || porcentaje > 90)) {
            setMensaje('El descuento debe estar entre 1% y 90%.')
            return
        }
        const actualizados = productos.map(item => String(item.id) === String(productoAEditar) ? {
            ...item,
            nombre,
            categoria: edicion.categoria,
            precio,
            stock,
            unidad: edicion.unidad,
            plural: edicion.plural,
            descuento: Boolean(edicion.descuento),
            descuentoPorcentaje: edicion.descuento ? porcentaje : 0,
            imagen: edicion.imagen.trim() || item.imagen,
            descripcion: edicion.descripcion.trim()
        } : item)
        try {
            guardarInventario(actualizados)
            setProductos(actualizados)
            setMensaje(`Los cambios de «${nombre}» se guardaron. El catálogo mostrará el precio y la unidad actualizados.`)
        } catch {
            setMensaje('No se pudieron guardar los cambios en este navegador.')
        }
    }

    const productosBajos = productos.filter((producto) => producto.stock < 10)

    const unidadesTotales = productos.reduce(
        (total, producto) => total + producto.stock,
        0
    )

    const valorInventario = productos.reduce(
        (total, producto) => total + producto.precio * producto.stock,
        0
    )

    const productosFiltrados = productos.filter((producto) => {
        const texto = `${producto.nombre} ${producto.categoria}`.toLowerCase()
        const coincideBusqueda = texto.includes(busqueda.trim().toLowerCase())
        const coincideStock = !soloStockBajo || producto.stock < 10

        return coincideBusqueda && coincideStock
    })

    const ventas = calcularVentas(pedidos, periodo)
    const ventaMaxima = Math.max(1, ...ventas.valores)
    const totalVentas = ventas.valores.reduce((total, valor) => total + valor, 0)
    const hayVentas = ventas.valores.some(valor => valor > 0)

    function cambiarSeccion(nuevaSeccion) {
        setSeccion(nuevaSeccion)
        setMenuAbierto(false)
        setMensaje('')
    }

    function verStockBajo() {
        cambiarSeccion('inventario')
        setBusqueda('')
        setSoloStockBajo(true)
    }

    function reponerStock(evento) {
        evento.preventDefault()

        const unidades = Number(cantidad)
        const producto = productos.find(
            (item) => item.id === Number(productoSeleccionado)
        )

        if (!producto || !Number.isInteger(unidades) || unidades < 1 || unidades > 10000) {
            setMensaje('Selecciona un producto e ingresa entre 1 y 10.000 unidades.')
            return
        }

        const actualizados = productos.map((item) =>
            item.id === producto.id
                ? { ...item, stock: item.stock + unidades }
                : item
        )

        setProductos(actualizados)

        try {
            guardarInventario(actualizados)
            setMensaje(`Se agregaron ${unidades} unidades a ${producto.nombre}.`)
        } catch {
            setMensaje('Stock actualizado en pantalla. No se pudo guardar en este navegador.')
        }

        setCantidad('1')
    }

    async function agregarProducto(evento) {
        evento.preventDefault()
        const nombre = nuevo.nombre.trim()
        const precio = Number(nuevo.precio)
        const stock = Number(nuevo.stock)
        if (!nombre || !nuevo.categoria.trim() || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(stock) || stock < 0 || (nuevo.descuento && (!Number.isFinite(Number(nuevo.descuentoPorcentaje)) || Number(nuevo.descuentoPorcentaje) < 1 || Number(nuevo.descuentoPorcentaje) > 90))) {
            setMensaje('Completa nombre, categoría, precio positivo y stock válido. Si activas descuento, debe ser de 1% a 90%.')
            return
        }
        let imagen = nuevo.imagen.trim() || imagenVerduras
        if (archivoImagen) {
            if (!archivoImagen.type.startsWith('image/') || archivoImagen.size > 900000) {
                setMensaje('Selecciona una imagen válida de menos de 900 KB.')
                return
            }
            try {
                imagen = await new Promise((resolve, reject) => {
                    const lector = new FileReader()
                    lector.onload = () => resolve(lector.result)
                    lector.onerror = reject
                    lector.readAsDataURL(archivoImagen)
                })
            } catch {
                setMensaje('No se pudo leer la imagen.')
                return
            }
        }
        const agregado = {id: Math.max(0, ...productos.map(p => Number(p.id) || 0)) + 1, nombre, categoria: nuevo.categoria.trim(), precio, stock, unidad: nuevo.unidad, plural: nuevo.plural, descuento: Boolean(nuevo.descuento), descuentoPorcentaje: nuevo.descuento ? Number(nuevo.descuentoPorcentaje) || 10 : 0, imagen, descripcion: nuevo.descripcion.trim()}
        const actualizados = [...productos, agregado]
        try {
            guardarInventario(actualizados)
            setProductos(actualizados)
            setNuevo({nombre:'',categoria:'Verduras',precio:'',stock:'',unidad:'kilo',plural:'kilos',descuento:false,descuentoPorcentaje:'10',imagen:'',descripcion:''})
            setArchivoImagen(null)
            evento.target.reset()
            setMensaje(`Producto «${nombre}» agregado al inventario.`)
        } catch {
            setMensaje('No se pudo guardar. Prueba con una imagen más pequeña o libera espacio del navegador.')
        }
    }

    return (
        <div className="hh-admin">
            {menuAbierto && (
                <button
                    type="button"
                    className="hh-fondo-menu"
                    aria-label="Cerrar menú"
                    onClick={() => setMenuAbierto(false)}
                />
            )}

            {/* Menú lateral desplegable hacia la derecha */}
            <aside
                id="menu-administrador"
                className={`hh-sidebar ${menuAbierto ? 'abierto' : ''}`}
            >
                <a href="/" className="hh-marca">
                    <span className="hh-marca-icono">🌱</span>
                    <span>
                        HuertoHogar
                        <small>Administración</small>
                    </span>
                </a>

                <p className="hh-menu-titulo">MI NEGOCIO</p>

                <nav aria-label="Menú de administración">
                    <button
                        type="button"
                        className={`hh-menu-item ${seccion === 'resumen' ? 'activo' : ''}`}
                        aria-current={seccion === 'resumen' ? 'page' : undefined}
                        onClick={() => cambiarSeccion('resumen')}
                    >
                        <span aria-hidden="true">▦</span>
                        Resumen
                    </button>

                    <button
                        type="button"
                        className={`hh-menu-item ${seccion === 'inventario' ? 'activo' : ''}`}
                        aria-current={seccion === 'inventario' ? 'page' : undefined}
                        onClick={() => cambiarSeccion('inventario')}
                    >
                        <span aria-hidden="true">📦</span>
                        Inventario
                        <span className="hh-contador">{productos.length}</span>
                    </button>
                    <button
                        type="button"
                        className={`hh-menu-item ${seccion === 'editar-producto' ? 'activo' : ''}`}
                        aria-current={seccion === 'editar-producto' ? 'page' : undefined}
                        onClick={() => cambiarSeccion('editar-producto')}
                    >
                        <span aria-hidden="true">✏️</span>
                        Editar productos
                    </button>
                <p className="hh-menu-titulo" style={{marginTop: 24}}>ADMINISTRACIÓN</p>
                    <a href="/admin/usuarios" className="hh-menu-item">👥 Gestión de usuarios</a>
                    <a href="/admin/agregar" className="hh-menu-item">➕ Agregar administrador</a>
                </nav>

                <div className="hh-sidebar-abajo">
                    <div className="hh-consejo">
                        <span>🌿</span>
                        <strong>Un huerto bien cuidado</strong>
                        <p>Revisa tu stock para mantener tus productos disponibles.</p>
                    </div>

                    <a href="/" className="hh-volver">
                        ← Volver a la tienda
                    </a>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="hh-main">
                <header className="hh-header">
                    <div className="hh-header-titulo">
                        <button
                            type="button"
                            className="hh-boton-menu"
                            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuAbierto}
                            aria-controls="menu-administrador"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        >
                            ☰
                        </button>

                        <span>Panel de administración</span>
                    </div>

                    <div className="hh-perfil">
                        <span className="hh-avatar">AD</span>
                        <div>
                            <strong>Administrador</strong>
                            <small>HuertoHogar</small>
                        </div>
                    </div>
                </header>

                <div className="hh-contenido">
                    <div className="hh-bienvenida">
                        <div>
                            <span className="hh-etiqueta">DATOS DE DEMOSTRACIÓN</span>
                            <h1>
                                {seccion === 'resumen'
                                    ? '¡Hola, administrador!'
                                    : seccion === 'agregar-producto' ? 'Agregar producto' : seccion === 'editar-producto' ? 'Editar productos' : seccion === 'eliminar-producto' ? 'Eliminar producto' : seccion === 'pedidos' ? 'Gestión de pedidos' : 'Tu inventario'}
                            </h1>
                            <p>
                                {seccion === 'resumen'
                                    ? 'Un vistazo a tus ventas y productos disponibles.'
                                    : seccion === 'agregar-producto' ? 'Registra un nuevo producto con precio, stock e imagen.' : seccion === 'editar-producto' ? 'Modifica la unidad de venta, precio, categoría y descuentos de los productos del catálogo.' : seccion === 'eliminar-producto' ? 'Retira productos que ya no estarán disponibles.' : seccion === 'pedidos' ? 'Revisa las compras y actualiza el estado de los envíos.' : 'Busca productos y actualiza sus existencias.'}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="hh-boton hh-boton-blanco"
                            onClick={verStockBajo}
                        >
                            Stock bajo: {productosBajos.length}
                        </button>
                    </div>

                    <section className="hh-estadisticas" aria-label="Resumen del inventario">
                        <article className="hh-tarjeta">
                            <span className="hh-icono">📦</span>
                            <p>Productos</p>
                            <strong>{productos.length}</strong>
                            <small>En el catálogo de ejemplo</small>
                        </article>

                        <article className="hh-tarjeta">
                            <span className="hh-icono">🛒</span>
                            <p>Unidades disponibles</p>
                            <strong>{unidadesTotales}</strong>
                            <small>Total en inventario</small>
                        </article>

                        <article className="hh-tarjeta">
                            <span className="hh-icono">💰</span>
                            <p>Valor de venta del stock</p>
                            <strong>{formatoPrecio(valorInventario)}</strong>
                            <small>Precio × unidades disponibles</small>
                        </article>

                        <article className="hh-tarjeta hh-tarjeta-alerta">
                            <span className="hh-icono">⚠</span>
                            <p>Productos con stock bajo</p>
                            <strong>{productosBajos.length}</strong>
                            <small>Menos de 10 unidades</small>
                        </article>
                    </section>

                    {seccion === 'agregar-producto' ? (
                        <section className="hh-panel hh-agregar-producto">
                            <h2>Nuevo producto</h2>
                            <p>Los productos se guardan en el inventario de este navegador.</p>
                            <form className="hh-nuevo-form" onSubmit={agregarProducto}>
                                <label>Nombre del producto<input required maxLength={100} value={nuevo.nombre} onChange={e=>setNuevo({...nuevo,nombre:e.target.value})} placeholder="Ej. Manzanas rojas" /></label>
                                <label>Categoría<select value={nuevo.categoria} onChange={e=>setNuevo({...nuevo,categoria:e.target.value})}><option>Verduras</option><option>Frutas</option><option>Orgánicos</option><option>Lácteos</option><option>Despensa</option><option>Hierbas</option><option>Otros</option></select></label>
                                <label>Precio (CLP)<input required type="number" min="1" step="1" value={nuevo.precio} onChange={e=>setNuevo({...nuevo,precio:e.target.value})} /></label>
                                <label>Stock inicial<input required type="number" min="0" step="1" value={nuevo.stock} onChange={e=>setNuevo({...nuevo,stock:e.target.value})} /></label>
                                <label>Se vende por<select value={nuevo.unidad} onChange={e=>{const opciones={kilo:'kilos',unidad:'unidades','bolsa de 500 g':'bolsas','frasco de 500 g':'frascos',litro:'litros',paquete:'paquetes'};setNuevo({...nuevo,unidad:e.target.value,plural:opciones[e.target.value]||'unidades'})}}><option value="kilo">Kilo</option><option value="unidad">Unidad</option><option value="bolsa de 500 g">Bolsa de 500 g</option><option value="frasco de 500 g">Frasco de 500 g</option><option value="litro">Litro</option><option value="paquete">Paquete</option></select></label>
                                <label className="hh-check-descuento"><input type="checkbox" checked={nuevo.descuento} onChange={e=>setNuevo({...nuevo,descuento:e.target.checked})} /> ¿Este producto tendrá descuento?</label>
                                {nuevo.descuento && <label>Descuento (%)<input required type="number" min="1" max="90" step="1" value={nuevo.descuentoPorcentaje} onChange={e=>setNuevo({...nuevo,descuentoPorcentaje:e.target.value})} /></label>}
                                <label className="hh-nuevo-ancho">Descripción del producto<textarea maxLength={400} rows={4} value={nuevo.descripcion} onChange={e=>setNuevo({...nuevo,descripcion:e.target.value})} placeholder="Describe sus características, origen y usos." /></label>
                                <label className="hh-nuevo-ancho">URL de imagen (opcional)<input type="url" placeholder="https://..." value={nuevo.imagen} onChange={e=>setNuevo({...nuevo,imagen:e.target.value})} /></label>
                                <div className="hh-nuevo-ancho hh-subida"><span>Imagen del producto (máximo 900 KB)</span><label className="hh-subida-boton" htmlFor="hh-archivo-producto">📷 Seleccionar imagen</label><input id="hh-archivo-producto" className="hh-archivo-oculto" type="file" accept="image/*" onChange={e=>setArchivoImagen(e.target.files?.[0] || null)} /><small>{archivoImagen ? `Seleccionada: ${archivoImagen.name}` : 'PNG, JPG o WebP. También puedes utilizar una URL.'}</small></div>
                                <button className="hh-boton hh-boton-verde" type="submit">＋ Guardar producto</button>
                            </form>
                            <p className="hh-mensaje" role="status">{mensaje}</p>
                        </section>
                    ) : seccion === 'editar-producto' ? (
                        <section className="hh-panel hh-agregar-producto">
                            <h2>Editar productos del catálogo</h2>
                            <p>Elige un producto para cambiar cómo se vende, su precio, stock o descuento. Los cambios se guardan en el inventario compartido.</p>
                            <label className="hh-selector-edicion">Producto que deseas editar
                                <select value={productoAEditar} onChange={e=>seleccionarProductoEdicion(e.target.value)}>
                                    <option value="">Selecciona un producto</option>
                                    {productos.map(p=><option key={p.id} value={p.id}>{p.nombre} — {formatoPrecio(p.precio)}</option>)}
                                </select>
                            </label>
                            {productoAEditar && <form className="hh-nuevo-form" onSubmit={guardarEdicionProducto}>
                                <label>Nombre del producto<input required maxLength={100} value={edicion.nombre} onChange={e=>setEdicion({...edicion,nombre:e.target.value})} /></label>
                                <label>Categoría<select value={edicion.categoria} onChange={e=>setEdicion({...edicion,categoria:e.target.value})}><option>Verduras</option><option>Frutas</option><option>Orgánicos</option><option>Lácteos</option><option>Despensa</option><option>Hierbas</option><option>Otros</option></select></label>
                                <label>Precio normal (CLP)<input required type="number" min="1" step="1" value={edicion.precio} onChange={e=>setEdicion({...edicion,precio:e.target.value})} /></label>
                                <label>Stock disponible<input required type="number" min="0" step="1" value={edicion.stock} onChange={e=>setEdicion({...edicion,stock:e.target.value})} /></label>
                                <label>Se vende por<select value={edicion.unidad} onChange={e=>{const opciones={kilo:'kilos',unidad:'unidades','bolsa de 500 g':'bolsas','frasco de 500 g':'frascos',litro:'litros',paquete:'paquetes'};setEdicion({...edicion,unidad:e.target.value,plural:opciones[e.target.value]||'unidades'})}}><option value="kilo">Kilo</option><option value="unidad">Unidad</option><option value="bolsa de 500 g">Bolsa de 500 g</option><option value="frasco de 500 g">Frasco de 500 g</option><option value="litro">Litro</option><option value="paquete">Paquete</option></select></label>
                                <label className="hh-check-descuento"><input type="checkbox" checked={edicion.descuento} onChange={e=>setEdicion({...edicion,descuento:e.target.checked})} /> ¿Este producto tendrá descuento?</label>
                                {edicion.descuento && <label>Descuento (%)<input required type="number" min="1" max="90" step="1" value={edicion.descuentoPorcentaje} onChange={e=>setEdicion({...edicion,descuentoPorcentaje:e.target.value})} /><small>El precio rebajado se calcula automáticamente.</small></label>}
                                <label className="hh-nuevo-ancho">Descripción<input maxLength="400" value={edicion.descripcion} onChange={e=>setEdicion({...edicion,descripcion:e.target.value})} /></label>
                                <label className="hh-nuevo-ancho">URL de imagen<input type="url" placeholder="https://... o deja la actual" value={edicion.imagen.startsWith('data:') ? '' : edicion.imagen} onChange={e=>setEdicion({...edicion,imagen:e.target.value})} /></label>
                                <button className="hh-boton hh-boton-verde" type="submit">Guardar cambios</button>
                            </form>}
                            <p className="hh-mensaje" role="status">{mensaje}</p>
                        </section>
                    ) : seccion === 'eliminar-producto' ? (
                        <section className="hh-panel hh-agregar-producto hh-eliminar-producto">
                            <h2>Eliminar producto</h2>
                            <p>Selecciona el producto que deseas retirar del inventario. Esta acción no puede deshacerse.</p>
                            <form className="hh-nuevo-form" onSubmit={eliminarProducto}>
                                <label className="hh-nuevo-ancho">Producto a eliminar
                                    <select required value={productoAEliminar} onChange={e=>setProductoAEliminar(e.target.value)}>
                                        <option value="">Selecciona un producto</option>
                                        {productos.map(p=><option key={p.id} value={p.id}>{p.nombre} — {formatoPrecio(p.precio)} — {p.stock} uds.</option>)}
                                    </select>
                                </label>
                                <button className="hh-boton hh-boton-verde" style={{background:'#a52d2d'}} type="submit">🗑 Eliminar producto</button>
                            </form>
                            <p className="hh-mensaje" role="status">{mensaje}</p>
                        </section>
                    ) : seccion === 'pedidos' ? (
                        <section className="hh-panel hh-gestion-pedidos">
                            <div className="hh-panel-header"><div><h2>Gestión de pedidos y envíos</h2><p>Consulta pedidos, cambia su estado o suspende un envío indicando el motivo.</p></div><strong>{pedidos.length} pedidos</strong></div>
                            <input className="hh-buscar-pedidos" placeholder="Buscar por número, correo o cliente..." value={busquedaPedido} onChange={e=>setBusquedaPedido(e.target.value)} />
                            <p className="hh-mensaje" role="status">{mensaje}</p>
                            {pedidos.filter(p=>`${p.id} ${p.correoCuenta || ''} ${p.cliente?.nombre || ''}`.toLowerCase().includes(busquedaPedido.toLowerCase())).map(p=>(
                                <article key={p.id} className="hh-pedido-admin">
                                    <div className="hh-pedido-titulo"><div><strong>Pedido #{p.id}</strong><small>{p.fecha ? new Date(p.fecha).toLocaleString('es-CL') : 'Fecha no disponible'}</small></div><strong>{formatoPrecio(p.total)}</strong></div>
                                    <p><b>Cliente:</b> {p.cliente?.nombre || p.correoCuenta || 'Sin nombre'} · {p.correoCuenta || p.cliente?.correo || 'Sin correo'}</p>
                                    <p><b>Entrega:</b> {[p.entrega?.calle,p.entrega?.numero,p.entrega?.comuna,p.entrega?.region].filter(Boolean).join(', ') || 'No indicada'}</p>
                                    <p><b>Productos:</b> {(p.productos || []).map(x=>`${x.nombre || 'Producto'} × ${x.cantidad || 1}`).join(', ') || 'No indicados'}</p>
                                    <div className="hh-pedido-acciones"><label>Estado del envío<select value={p.estado || 'Preparando pedido'} onChange={e=>actualizarPedido(p.id,e.target.value)}><option>Pedido confirmado</option><option>Preparando pedido</option><option>En camino</option><option>Entregado</option><option>Suspendido</option></select></label></div>
                                    <div className="hh-suspender"><label>Motivo de suspensión<input placeholder="Ej.: Falta de stock o dirección incompleta" value={motivosSuspension[p.id] ?? p.motivoSuspension ?? ''} onChange={e=>setMotivosSuspension(v=>({...v,[p.id]:e.target.value}))} /></label><button type="button" onClick={()=>actualizarPedido(p.id,'Suspendido')}>Suspender pedido</button></div>
                                    {p.estado === 'Suspendido' && <p className="hh-aviso-suspension">⚠ Pedido suspendido. Motivo: {p.motivoSuspension || 'No especificado'}</p>}
                                </article>
                            ))}
                            {pedidos.length === 0 && <p>Todavía no hay pedidos registrados en este navegador.</p>}
                        </section>
                    ) : seccion === 'resumen' ? (
                        <div className="hh-grid">
                            <section className="hh-panel">
                                <div className="hh-panel-header">
                                    <div>
                                        <h2>Ventas</h2>
                                        <p>Montos de ejemplo por período</p>
                                    </div>

                                    <select
                                        aria-label="Período de ventas"
                                        value={periodo}
                                        onChange={(evento) => setPeriodo(evento.target.value)}
                                    >
                                        <option value="semana">Esta semana</option>
                                        <option value="mes">Este mes</option>
                                    </select>
                                </div>

                                <strong className="hh-ventas-total">
                                    {formatoPrecio(totalVentas)}
                                </strong>

                                {!hayVentas && (
                                    <p role="status" className="hh-vacio">
                                        No hay ventas registradas para este período. El gráfico se completará cuando existan pedidos reales.
                                    </p>
                                )}
                                <div className="hh-grafico">
                                    {ventas.valores.map((valor, indice) => (
                                        <div className="hh-columna" key={ventas.etiquetas[indice]}>
                                            <div className="hh-barra-espacio">
                                                <div
                                                    className="hh-barra"
                                                    role="img"
                                                    aria-label={`${ventas.etiquetas[indice]}: ${formatoPrecio(valor)}`}
                                                    title={formatoPrecio(valor)}
                                                    style={{
                                                        height: `${(valor / ventaMaxima) * 100}%`,
                                                    }}
                                                />
                                            </div>

                                            <span>{ventas.etiquetas[indice]}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="hh-panel">
                                <div className="hh-panel-header">
                                    <div>
                                        <h2>Necesitan reposición</h2>
                                        <p>Productos con menos de 10 unidades</p>
                                    </div>
                                </div>

                                {productosBajos.length === 0 ? (
                                    <p className="hh-vacio">
                                        🌿 Todos los productos tienen stock suficiente.
                                    </p>
                                ) : (
                                    productosBajos.map((producto) => (
                                        <div className="hh-producto" key={producto.id}>
                                            <img src={imagenCorrecta(producto.imagen)} alt={producto.nombre} />
                                            <div>
                                                <strong>{producto.nombre}</strong>
                                                <span>{producto.categoria}</span>
                                            </div>
                                            <span className="hh-badge bajo">
                                                {producto.stock} uds.
                                            </span>
                                        </div>
                                    ))
                                )}

                                <button
                                    type="button"
                                    className="hh-boton hh-boton-verde"
                                    onClick={verStockBajo}
                                >
                                    Gestionar inventario →
                                </button>
                            </section>
                        </div>
                    ) : (
                        <>
                            <section className="hh-panel">
                                <div className="hh-panel-header">
                                    <div>
                                        <h2>Productos disponibles</h2>
                                        <p>{productosFiltrados.length} resultados</p>
                                    </div>
                                </div>

                                <div className="hh-filtros">
                                    <input
                                        type="search"
                                        aria-label="Buscar por nombre o categoría"
                                        placeholder="Buscar producto o categoría..."
                                        value={busqueda}
                                        onChange={(evento) => setBusqueda(evento.target.value)}
                                    />

                                    <label className="hh-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={soloStockBajo}
                                            onChange={(evento) =>
                                                setSoloStockBajo(evento.target.checked)
                                            }
                                        />
                                        Solo stock bajo
                                    </label>
                                </div>

                                <div className="hh-tabla-contenedor">
                                    <table className="hh-tabla">
                                        <thead>
                                            <tr>
                                                <th scope="col">Producto</th>
                                                <th scope="col">Categoría</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {productosFiltrados.map((producto) => (
                                                <tr key={producto.id}>
                                                    <td>
                                                        <div className="hh-tabla-producto">
                                                            <img
                                                                src={imagenCorrecta(producto.imagen)}
                                                                alt=""
                                                            />
                                                            <strong>{producto.nombre}</strong>
                                                        </div>
                                                    </td>
                                                    <td>{producto.categoria}</td>
                                                    <td>{formatoPrecio(producto.precio)}</td>
                                                    <td>{producto.stock}</td>
                                                    <td>
                                                        <span
                                                            className={`hh-badge ${
                                                                producto.stock < 10 ? 'bajo' : 'normal'
                                                            }`}
                                                        >
                                                            {producto.stock < 10
                                                                ? 'Stock bajo'
                                                                : 'Disponible'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="hh-boton hh-boton-verde"
                                                            onClick={() => {
                                                                seleccionarProductoEdicion(producto.id)
                                                                cambiarSeccion('editar-producto')
                                                            }}
                                                            aria-label={`Editar ${producto.nombre}`}
                                                        >
                                                            ✏️ Editar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {productosFiltrados.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="hh-vacio">
                                                        No se encontraron productos.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className="hh-panel hh-reposicion">
                                <h2>Reponer stock</h2>
                                <p>Agrega unidades al inventario de demostración.</p>

                                <form className="hh-formulario" onSubmit={reponerStock}>
                                    <label>
                                        Producto
                                        <select
                                            required
                                            value={productoSeleccionado}
                                            onChange={(evento) =>
                                                setProductoSeleccionado(evento.target.value)
                                            }
                                        >
                                            <option value="">Selecciona un producto</option>
                                            {productos.map((producto) => (
                                                <option key={producto.id} value={producto.id}>
                                                    {producto.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label>
                                        Unidades a agregar
                                        <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            step="1"
                                            required
                                            value={cantidad}
                                            onChange={(evento) => setCantidad(evento.target.value)}
                                        />
                                    </label>

                                    <button type="submit" className="hh-boton hh-boton-verde">
                                        Agregar unidades
                                    </button>
                                </form>

                                <p className="hh-mensaje" role="status">
                                    {mensaje}
                                </p>
                            </section>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard