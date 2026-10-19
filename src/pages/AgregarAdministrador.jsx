
import { useState } from 'react'
import '../css/agregar-administrador.css'

const DOMINIOS_PERMITIDOS = [
  'gmail.com',
  'duocuc.cl',
  'huertohogar.cl'
]

function leerLista(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave) || '[]')
    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

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

function AgregarAdministrador() {
  const [sesion] = useState(leerSesion)
  const [admins, setAdmins] = useState(() =>
    leerLista('administradores_huerto')
  )
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [mostrarClave, setMostrarClave] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')

  const esAdmin =
    sesion?.rol === 'admin' ||
    sesion?.rol === 'administrador'

  function avisar(texto, tipo = 'exito') {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  function guardarAdmins(lista) {
    try {
      localStorage.setItem(
        'administradores_huerto',
        JSON.stringify(lista)
      )
      setAdmins(lista)
      return true
    } catch {
      avisar('No se pudieron guardar los cambios.', 'error')
      return false
    }
  }

  function registrarAdmin(evento) {
    evento.preventDefault()

    const correoNormalizado = correo.trim().toLowerCase()
    const partes = correoNormalizado.split('@')

    const correoValido =
      partes.length === 2 &&
      /^[a-z0-9._%+-]+$/i.test(partes[0]) &&
      DOMINIOS_PERMITIDOS.includes(partes[1])

    if (!correoValido) {
      avisar(
        'Correo no autorizado. Solo se permiten @gmail.com, @duocuc.cl y @huertohogar.cl.',
        'error'
      )
      return
    }

    if (clave.length < 8) {
      avisar(
        'La contraseña debe tener al menos 8 caracteres.',
        'error'
      )
      return
    }

    const adminsActuales = leerLista('administradores_huerto')
    const clientes = leerLista('usuarios_huerto')

    const existeAdmin = adminsActuales.some(
      (admin) =>
        String(admin.correo || '').toLowerCase() ===
        correoNormalizado
    )

    const existeCliente = clientes.some(
      (cliente) =>
        String(cliente.correo || '').toLowerCase() ===
        correoNormalizado
    )

    if (existeAdmin || existeCliente) {
      avisar(
        'Este correo ya está registrado en HuertoHogar.',
        'error'
      )
      return
    }

    const nuevoAdmin = {
      id: Date.now(),
      nombre: 'Administrador',
      correo: correoNormalizado,
      clave,
      rol: 'admin',
      estado: 'activo',
      fechaRegistro: new Date().toISOString()
    }

    if (guardarAdmins([...adminsActuales, nuevoAdmin])) {
      setCorreo('')
      setClave('')
      avisar('Administrador agregado correctamente.')
    }
  }

  function cambiarEstado(admin, indice) {
    const nuevoEstado =
      admin.estado === 'suspendido' ? 'activo' : 'suspendido'

    const lista = admins.map((item, i) =>
      i === indice
        ? { ...item, estado: nuevoEstado }
        : item
    )

    if (guardarAdmins(lista)) {
      avisar(
        `La cuenta ${admin.correo} ahora está ${
          nuevoEstado === 'activo' ? 'activa' : 'suspendida'
        }.`
      )
    }
  }

  function eliminarAdmin(admin, indice) {
    if (
      admin.correo?.toLowerCase() ===
      sesion?.correo?.toLowerCase()
    ) {
      avisar(
        'No puedes eliminar tu propia cuenta mientras estás conectado.',
        'error'
      )
      return
    }

    if (!window.confirm(
      `¿Eliminar definitivamente al administrador ${admin.correo}?`
    )) {
      return
    }

    const lista = admins.filter((_, i) => i !== indice)

    if (guardarAdmins(lista)) {
      avisar('Administrador eliminado correctamente.')
    }
  }

  function cerrarSesion(evento) {
    evento.preventDefault()
    sessionStorage.removeItem('sesion_huerto')
    localStorage.removeItem('sesion_huerto')
    window.location.href = '/login'
  }

  if (!esAdmin) {
    return (
      <div className="aa-acceso">
        <h1>Acceso restringido</h1>
        <p>Solo los administradores pueden ingresar aquí.</p>
        <a href="/login">Iniciar sesión</a>
      </div>
    )
  }

  return (
    <div className="aa-panel">
      <div
        className={`aa-overlay ${menuAbierto ? 'visible' : ''}`}
        onClick={() => setMenuAbierto(false)}
      />

      {/* MENÚ LATERAL */}
      <aside className={`aa-sidebar ${menuAbierto ? 'abierto' : ''}`}>
        <div className="aa-logo">
          <img
            src="/img/logo-principal.png"
            alt="HuertoHogar"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <strong>HuertoHogar</strong>
        </div>

        <nav className="aa-menu">
          <a href="/" className="aa-menu-item">
            <span>⌂</span> Inicio
          </a>

          <a
            href="/admin/agregar"
            className="aa-menu-item activo"
          >
            <span>🔑</span> Agregar Admin
          </a>

          <span className="aa-menu-item pendiente">
            <span>📦</span> Productos
          </span>

          <span className="aa-menu-item pendiente">
            <span>▦</span> Categorías
          </span>

          <span className="aa-menu-item pendiente">
            <span>🛒</span> Pedidos
          </span>

          <a
            href="/admin/usuarios"
            className="aa-menu-item"
          >
            <span>♙</span> Clientes
          </a>

          <span className="aa-menu-item pendiente">
            <span>🚚</span> Envíos
          </span>

          <span className="aa-menu-item pendiente">
            <span>☆</span> Reseñas
          </span>

          <span className="aa-menu-item pendiente">
            <span>▤</span> Reportes
          </span>

          <span className="aa-menu-item pendiente">
            <span>⚙</span> Configuración
          </span>
        </nav>

        <a
          href="/login"
          className="aa-cerrar"
          onClick={cerrarSesion}
        >
          ↪ Cerrar sesión
        </a>

        <img
          src="/img/cesta de verduras.png"
          alt=""
          className="aa-canasta"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="aa-contenido">
        <header className="aa-header">
          <button
            type="button"
            className="aa-hamburguesa"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
          >
            ☰
          </button>

          <div className="aa-header-derecha">
            <span>🔔</span>
            <div className="aa-usuario">
              <span>👤</span>
              <div>
                <strong>{sesion.nombre || 'Administrador'}</strong>
                <small>Administrador</small>
              </div>
            </div>
          </div>
        </header>

        <section className="aa-bienvenida">
          <h1>Gestión de Administradores</h1>
        </section>

        <section className="aa-seccion">
          <h2>🔑 Registrar Nuevo Administrador</h2>

          <p className="aa-descripcion">
            Crea credenciales para permitir que otra persona
            con el rol de administrador acceda al sistema
            desde el inicio de sesión.
          </p>

          {mensaje && (
            <div
              className={`aa-mensaje ${tipoMensaje}`}
              role="status"
            >
              <span>{mensaje}</span>
              <button
                type="button"
                onClick={() => setMensaje('')}
                aria-label="Cerrar mensaje"
              >
                ×
              </button>
            </div>
          )}

          <form
            onSubmit={registrarAdmin}
            className="aa-formulario"
            noValidate
          >
            <div className="aa-campo">
              <label htmlFor="nuevo-admin-correo">
                Correo Electrónico Admin
              </label>

              <input
                id="nuevo-admin-correo"
                type="email"
                placeholder="ejemplo@huertohogar.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="aa-campo">
              <label htmlFor="nuevo-admin-clave">
                Contraseña
              </label>

              <div className="aa-clave-contenedor">
                <input
                  id="nuevo-admin-clave"
                  type={mostrarClave ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="aa-ver-clave"
                  onClick={() => setMostrarClave(!mostrarClave)}
                  aria-label={
                    mostrarClave
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarClave ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="aa-btn-agregar"
            >
              ➕ Agregar Admin
            </button>
          </form>

          <div className="aa-listado-titulo">
            <h3>Administradores Registrados</h3>
            <span>{admins.length} registrados</span>
          </div>

          <div className="aa-tabla-contenedor">
            <table className="aa-tabla">
              <thead>
                <tr>
                  <th>Correo del Administrador</th>
                  <th>Estado</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="aa-vacio">
                      No hay administradores registrados.
                    </td>
                  </tr>
                ) : (
                  admins.map((admin, indice) => {
                    const suspendido =
                      admin.estado === 'suspendido' ||
                      admin.estado === 'inactivo'

                    return (
                      <tr key={admin.id ?? indice}>
                        <td>
                          <strong>{admin.correo}</strong>
                        </td>

                        <td>
                          <span
                            className={`aa-estado ${
                              suspendido ? 'suspendido' : 'activo'
                            }`}
                          >
                            {suspendido
                              ? '🔴 Suspendida'
                              : '🟢 Activa'}
                          </span>
                        </td>

                        <td>
                          <code>••••••••</code>
                        </td>

                        <td>
                          <div className="aa-acciones">
                            <button
                              type="button"
                              className={
                                suspendido
                                  ? 'aa-btn-reactivar'
                                  : 'aa-btn-suspender'
                              }
                              onClick={() =>
                                cambiarEstado(admin, indice)
                              }
                              disabled={
                                admin.correo?.toLowerCase() ===
                                sesion.correo?.toLowerCase()
                              }
                            >
                              {suspendido
                                ? 'Reactivar'
                                : 'Suspender'}
                            </button>

                            <button
                              type="button"
                              className="aa-btn-eliminar"
                              onClick={() =>
                                eliminarAdmin(admin, indice)
                              }
                            >
                              Eliminar
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

export default AgregarAdministrador
