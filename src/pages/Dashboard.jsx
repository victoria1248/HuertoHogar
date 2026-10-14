import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/administrador.css'

// Datos iniciales de demostración.
const productosIniciales = [
    {
        id: 1,
        nombre: 'Zanahoria Orgánica',
        categoria: 'Verduras',
        precio: 1990,
        stock: 8,
        imagen: '/img/verduras.png',
    },
    {
        id: 2,
        nombre: 'Miel Orgánica',
        categoria: 'Orgánicos',
        precio: 5990,
        stock: 5,
        imagen: '/img/Organico.png',
    },
    {
        id: 3,
        nombre: 'Espinacas Frescas',
        categoria: 'Verduras',
        precio: 1490,
        stock: 12,
        imagen: '/img/Herbas.png',
    },
]

// Montos de ejemplo para el gráfico.
const ventasEjemplo = {
    semana: {
        etiquetas: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        valores: [420000, 580000, 490000, 670000, 760000, 920000, 700000],
    },
    mes: {
        etiquetas: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        valores: [3200000, 4100000, 3800000, 4540000],
    },
}

const claveInventario = 'huertohogar-inventario-demo-v1'

function formatoPrecio(valor) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(valor)
}

function cargarProductos() {
    try {
        const guardados = JSON.parse(localStorage.getItem(claveInventario))

        const sonValidos =
            Array.isArray(guardados) &&
            guardados.length > 0 &&
            guardados.every((producto) =>
                producto &&
                typeof producto.id === 'number' &&
                typeof producto.nombre === 'string' &&
                typeof producto.categoria === 'string' &&
                typeof producto.imagen === 'string' &&
                Number.isFinite(producto.precio) &&
                Number.isInteger(producto.stock) &&
                producto.stock >= 0
            )

        return sonValidos ? guardados : productosIniciales
    } catch {
        return productosIniciales
    }
}

function Dashboard() {
    const [productos, setProductos] = useState(cargarProductos)
    const [seccion, setSeccion] = useState('resumen')
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [soloStockBajo, setSoloStockBajo] = useState(false)
    const [periodo, setPeriodo] = useState('semana')
    const [productoSeleccionado, setProductoSeleccionado] = useState('')
    const [cantidad, setCantidad] = useState('1')
    const [mensaje, setMensaje] = useState('')

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

    const ventas = ventasEjemplo[periodo]
    const ventaMaxima = Math.max(...ventas.valores)
    const totalVentas = ventas.valores.reduce((total, valor) => total + valor, 0)

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
            localStorage.setItem(claveInventario, JSON.stringify(actualizados))
            setMensaje(`Se agregaron ${unidades} unidades a ${producto.nombre}.`)
        } catch {
            setMensaje('Stock actualizado en pantalla. No se pudo guardar en este navegador.')
        }

        setCantidad('1')
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

            {/* Menú lateral */}
            <aside
                id="menu-administrador"
                className={`hh-sidebar ${menuAbierto ? 'abierto' : ''}`}
            >
                <Link to="/" className="hh-marca">
                    <span className="hh-marca-icono">🌱</span>
                    <span>
                        HuertoHogar
                        <small>Administración</small>
                    </span>
                </Link>

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
                </nav>

                <div className="hh-sidebar-abajo">
                    <div className="hh-consejo">
                        <span>🌿</span>
                        <strong>Un huerto bien cuidado</strong>
                        <p>Revisa tu stock para mantener tus productos disponibles.</p>
                    </div>

                    <Link to="/" className="hh-volver">
                        ← Volver a la tienda
                    </Link>
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
                                    : 'Tu inventario'}
                            </h1>
                            <p>
                                {seccion === 'resumen'
                                    ? 'Un vistazo a tus ventas y productos disponibles.'
                                    : 'Busca productos y actualiza sus existencias.'}
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

                    {seccion === 'resumen' ? (
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
                                            <img src={producto.imagen} alt={producto.nombre} />
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
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {productosFiltrados.map((producto) => (
                                                <tr key={producto.id}>
                                                    <td>
                                                        <div className="hh-tabla-producto">
                                                            <img
                                                                src={producto.imagen}
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
                                                </tr>
                                            ))}

                                            {productosFiltrados.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="hh-vacio">
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