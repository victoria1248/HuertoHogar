
import { useState } from 'react'
import '../../css/tienda/administrar-usuarios.css'

// Leer clientes guardados por Registro.jsx
function leerUsuarios() {
    try {
        const datos = JSON.parse(
            localStorage.getItem('usuarios_huerto') || '[]'
        )
        return Array.isArray(datos) ? datos : []
    } catch {
        return []
    }
}

// Leer la sesión creada por Login.jsx
function leerSesion() {
    try {
        return JSON.parse(
            sessionStorage.getItem('sesion_huerto') ||
            localStorage.getItem('sesion_huerto') ||
            'null'
        )
    } catch {
        return null
    }
}

function AdministrarUsuarios() {
    const [usuarios, setUsuarios] = useState(leerUsuarios)
    const [sesion] = useState(leerSesion)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState('todos')
    const [mensaje, setMensaje] = useState('')
    const [tipoMensaje, setTipoMensaje] = useState('exito')

    // Esta comprobación es solo para la demostración local.
    const esAdministrador = sesion?.rol === 'admin' ||
        sesion?.rol === 'administrador'

    function mostrarMensaje(texto, tipo = 'exito') {
        setMensaje(texto)
        setTipoMensaje(tipo)
    }

    function guardarUsuarios(lista) {
        try {
            localStorage.setItem(
                'usuarios_huerto',
                JSON.stringify(lista)
            )
            setUsuarios(lista)
            return true
        } catch {
            mostrarMensaje(
                'No se pudieron guardar los cambios en el navegador.',
                'error'
            )
            return false
        }
    }

    function cambiarEstado(usuario, indiceOriginal) {
        const nuevoEstado =
            usuario.estado === 'inactivo' ? 'activo' : 'inactivo'

        const listaActualizada = usuarios.map((item, indice) =>
            indice === indiceOriginal
                ? { ...item, estado: nuevoEstado }
                : item
        )

        if (guardarUsuarios(listaActualizada)) {
            mostrarMensaje(
                `La cuenta de ${usuario.nombre} ahora está ${nuevoEstado}.`
            )
        }
    }

    function eliminarUsuario(usuario, indiceOriginal) {
        const confirmado = window.confirm(
            `¿Estás seguro de que deseas eliminar la cuenta de "${usuario.nombre}" (${usuario.correo})?`
        )

        if (!confirmado) return

        const listaActualizada = usuarios.filter(
            (_, indice) => indice !== indiceOriginal
        )

        if (!guardarUsuarios(listaActualizada)) return

        // Si la cuenta eliminada tiene una sesión abierta
        // en este navegador, borrar esa sesión.
        try {
            const sesionActual = leerSesion()
            if (
                sesionActual?.correo?.toLowerCase() ===
                usuario.correo?.toLowerCase()
            ) {
                sessionStorage.removeItem('sesion_huerto')
                localStorage.removeItem('sesion_huerto')
            }
        } catch {
            // No interrumpir la eliminación si no hay sesión.
        }

        mostrarMensaje(
            `La cuenta de ${usuario.nombre} fue eliminada correctamente.`
        )
    }

    function cerrarSesion(evento) {
        evento.preventDefault()
        sessionStorage.removeItem('sesion_huerto')
        localStorage.removeItem('sesion_huerto')
        window.location.href = '/login'
    }

    const usuariosFiltrados = usuarios
        .map((usuario, indiceOriginal) => ({
            ...usuario,
            indiceOriginal
        }))
        .filter((usuario) => {
            const texto = busqueda.trim().toLowerCase()
            const coincideTexto =
                String(usuario.nombre || '').toLowerCase().includes(texto) ||
                String(usuario.correo || '').toLowerCase().includes(texto)

            const estado = usuario.estado || 'activo'
            const coincideEstado =
                filtro === 'todos' || estado === filtro

            return coincideTexto && coincideEstado
        })

    const clientesActivos = usuarios.filter(
        (usuario) => usuario.estado !== 'inactivo'
    ).length

    const clientesInactivos = usuarios.filter(
        (usuario) => usuario.estado === 'inactivo'
    ).length

    // No permitir acceso visual a clientes comunes.
    if (!esAdministrador) {
        return (
            <div className="acceso-admin container py-5 text-center">
                <h1>Acceso restringido</h1>
                <p>
                    Esta sección está disponible únicamente para administradores.
                </p>
                <p>
                    Debes iniciar sesión con una cuenta que tenga rol administrador.
                </p>
                <a href="/login">Ir al inicio de sesión</a>
            </div>
        )
    }

    return (
        <div className="admin-container">

            {/* Fondo oscuro del menú lateral */}
            <div
                className={`sidebar-overlay ${menuAbierto ? 'activo' : ''}`}
                onClick={() => setMenuAbierto(false)}
                aria-hidden="true"
            />

            {/* MENÚ LATERAL */}
            <aside className={`sidebar ${menuAbierto ? 'abierto' : ''}`}>
                <div className="sidebar-logo">
                    <img
                        src="/img/logo-principal.png"
                        alt="HuertoHogar"
                        onError={(evento) => {
                            evento.currentTarget.style.display = 'none'
                        }}
                    />
                    <strong>HuertoHogar</strong>
                </div>

                <nav className="menu-admin" aria-label="Menú administrador">
                    <a className="menu-item" href="/">
                        <span>⌂</span> Inicio
                    </a>

                    <a href="/admin/agregar" className="menu-item">
                        <span>🔑</span> Agregar Admin
                    </a>

                    <span className="menu-item menu-pendiente">
                        <span>▣</span> Productos
                    </span>

                    <span className="menu-item menu-pendiente">
                        <span>▦</span> Categorías
                    </span>

                    <span className="menu-item menu-pendiente">
                        <span>🛒</span> Pedidos
                    </span>

                    <a
                        href="/admin/usuarios"
                        className="menu-item activo"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <span>♙</span> Clientes
                    </a>

                    <span className="menu-item menu-pendiente">
                        <span>🚚</span> Envíos
                    </span>

                    <span className="menu-item menu-pendiente">
                        <span>☆</span> Reseñas
                    </span>

                    <span className="menu-item menu-pendiente">
                        <span>▤</span> Reportes
                    </span>

                    <span className="menu-item menu-pendiente">
                        <span>⚙</span> Configuración
                    </span>
                </nav>

                <a
                    href="/login"
                    className="cerrar-sesion"
                    onClick={cerrarSesion}
                >
                    ↪ Cerrar sesión
                </a>

                <img
                    src="/img/cesta de verduras.png"
                    className="imagen-canasta"
                    alt=""
                    onError={(evento) => {
                        evento.currentTarget.style.display = 'none'
                    }}
                />
            </aside>

            {/* CONTENIDO */}
            <main className="contenido-admin">

                {/* ENCABEZADO */}
                <header className="admin-header d-flex align-items-center justify-content-between gap-3">
                    <button
                        type="button"
                        className="menu-hamburguesa"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        aria-label="Abrir o cerrar menú"
                        aria-expanded={menuAbierto}
                    >
                        ☰
                    </button>

                    <div className="header-derecha d-flex align-items-center gap-3">
                        <span className="campana" aria-label="Notificaciones">
                            🔔
                        </span>

                        <div className="usuario-admin">
                            <span className="icono-usuario">👤</span>
                            <div>
                                <strong>{sesion.nombre || 'Administrador'}</strong>
                                <small>Administrador</small>
                            </div>
                        </div>
                    </div>
                </header>

                {/* BIENVENIDA */}
                <section className="bienvenida">
                    <h1>¡Hola, administrador!</h1>
                    <p>Gestiona las cuentas registradas en HuertoHogar.</p>
                </section>

                {/* ESTADÍSTICAS */}
                <section className="estadisticas">
                    <div className="estadistica">
                        <div className="estadistica-icono">👥</div>
                        <div>
                            <span>Clientes registrados</span>
                            <strong>{usuarios.length}</strong>
                        </div>
                    </div>

                    <div className="estadistica">
                        <div className="estadistica-icono">✓</div>
                        <div>
                            <span>Clientes activos</span>
                            <strong>{clientesActivos}</strong>
                        </div>
                    </div>

                    <div className="estadistica">
                        <div className="estadistica-icono">⏸</div>
                        <div>
                            <span>Clientes inactivos</span>
                            <strong>{clientesInactivos}</strong>
                        </div>
                    </div>

                    <div className="estadistica">
                        <div className="estadistica-icono">🔎</div>
                        <div>
                            <span>Resultados de búsqueda</span>
                            <strong>{usuariosFiltrados.length}</strong>
                        </div>
                    </div>
                </section>

                {/* GESTIÓN DE CLIENTES */}
                <section
                    id="seccion-gestion-usuarios"
                    className="seccion-agregar-admin"
                >
                    <div className="gestion-encabezado d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div>
                            <h2>👥 Usuarios Registrados</h2>
                            <p>
                                Revisa los clientes registrados, consulta sus estados
                                y administra sus cuentas.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn-actualizar btn btn-outline-success"
                            onClick={() => {
                                setUsuarios(leerUsuarios())
                                mostrarMensaje('Listado actualizado.')
                            }}
                        >
                            ↻ Actualizar
                        </button>
                    </div>

                    {/* BUSCADOR Y FILTRO */}
                    <div className="gestion-filtros d-flex flex-wrap gap-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por nombre o correo..."
                            aria-label="Buscar usuarios"
                            value={busqueda}
                            onChange={(evento) => setBusqueda(evento.target.value)}
                        />

                        <select
                            className="form-select"
                            aria-label="Filtrar usuarios por estado"
                            value={filtro}
                            onChange={(evento) => setFiltro(evento.target.value)}
                        >
                            <option value="todos">Todos los estados</option>
                            <option value="activo">Activos</option>
                            <option value="inactivo">Inactivos</option>
                        </select>
                    </div>

                    {/* MENSAJES */}
                    {mensaje && (
                        <div
                            className={`alerta-mensaje-admin ${tipoMensaje} alert ${tipoMensaje === 'error' ? 'alert-danger' : 'alert-success'} d-flex justify-content-between align-items-center gap-3`}
                            role="status"
                        >
                            {mensaje}
                            <button
                                type="button"
                                onClick={() => setMensaje('')}
                                aria-label="Cerrar mensaje"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* TABLA */}
                    <div className="tabla-contenedor table-responsive">
                        <table className="tabla-clientes table align-middle">
                            <thead>
                                <tr>
                                    <th>Nombre completo</th>
                                    <th>Correo electrónico</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuariosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="tabla-vacia">
                                            No se encontraron usuarios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    usuariosFiltrados.map((usuario) => {
                                        const inactivo = usuario.estado === 'inactivo'

                                        return (
                                            <tr key={usuario.id ?? usuario.indiceOriginal}>
                                                <td>
                                                    <strong>
                                                        {usuario.nombre || 'Sin nombre'}
                                                    </strong>
                                                </td>

                                                <td>{usuario.correo || 'Sin correo'}</td>

                                                <td>
                                                    <span
                                                        className={`estado-usuario ${inactivo ? 'inactivo' : 'activo'
                                                            }`}
                                                    >
                                                        {inactivo ? '🔴 Inactivo' : '🟢 Activo'}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="acciones-usuario d-flex flex-wrap gap-2">
                                                        <button
                                                            type="button"
                                                            className={
                                                                inactivo
                                                                    ? 'btn-activar'
                                                                    : 'btn-desactivar'
                                                            }
                                                            onClick={() =>
                                                                cambiarEstado(
                                                                    usuario,
                                                                    usuario.indiceOriginal
                                                                )
                                                            }
                                                        >
                                                            {inactivo ? 'Activar' : 'Desactivar'}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn-eliminar-usuario btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                eliminarUsuario(
                                                                    usuario,
                                                                    usuario.indiceOriginal
                                                                )
                                                            }
                                                        >
                                                            🗑 Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdministrarUsuarios
