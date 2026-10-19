
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

// ========================================
// CSS ORIGINALES DE HUERTOHOGAR
// ========================================

import '../../css/tienda/base.css'
import '../../css/tienda/izquierda.css'
import '../../css/tienda/formulario.css'
import '../../css/tienda/botones.css'
import '../../css/tienda/responsive.css'
import '../../css/tienda/login-react.css'

// ========================================
// OBTENER CUENTAS GUARDADAS
// ========================================

function obtenerLista(clave) {
  try {
    const datos = JSON.parse(
      localStorage.getItem(clave) || '[]'
    )

    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

// ========================================
// NORMALIZAR CORREO
// ========================================

function normalizarCorreo(correo) {
  return String(correo || '')
    .trim()
    .toLowerCase()
}

// ========================================
// COMPONENTE LOGIN
// ========================================

function Login() {
  const { iniciarSesion: guardarSesion } = useAuth()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  // ========================================
  // INICIAR SESIÓN
  // ========================================

  const iniciarSesion = (evento) => {
    evento.preventDefault()

    setErrores({})
    setErrorGeneral('')

    const nuevosErrores = {}

    if (!correo.trim()) {
      nuevosErrores.correo = 'Ingrese su correo.'
    }

    if (!password) {
      nuevosErrores.password = 'Ingrese su contraseña.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const correoIngresado = normalizarCorreo(correo)

    // Cuentas creadas desde el registro
    const usuarios = obtenerLista('usuarios_huerto')

    // Cuentas administrativas
    const administradores = obtenerLista(
      'administradores_huerto'
    )

    // Usuario de demostración
    const usuarioDemo = {
      nombre: 'Estudiante Demo',
      correo: 'estudiante@gmail.com',
      clave: 'Clave123!',
      rol: 'cliente',
      estado: 'activo'
    }

    // ========================================
    // BUSCAR ADMINISTRADOR
    // ========================================

    const administradorEncontrado = administradores.find(
      (admin) =>
        normalizarCorreo(admin.correo) === correoIngresado &&
        (
          admin.clave === password ||
          admin.password === password
        )
    )

    // ========================================
    // BUSCAR CLIENTE
    // ========================================

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        normalizarCorreo(usuario.correo) === correoIngresado &&
        (
          usuario.clave === password ||
          usuario.password === password
        )
    )

    // ========================================
    // USUARIO DEMO
    // ========================================

    const existeCorreoDemoRegistrado =
      usuarios.some(
        (usuario) =>
          normalizarCorreo(usuario.correo) ===
          normalizarCorreo(usuarioDemo.correo)
      ) ||
      administradores.some(
        (admin) =>
          normalizarCorreo(admin.correo) ===
          normalizarCorreo(usuarioDemo.correo)
      )

    const esUsuarioDemo =
      !existeCorreoDemoRegistrado &&
      correoIngresado === normalizarCorreo(usuarioDemo.correo) &&
      password === usuarioDemo.clave

    let cuenta = null
    let rol = null

    if (administradorEncontrado) {
      cuenta = administradorEncontrado
      rol = 'admin'
    } else if (usuarioEncontrado) {
      cuenta = usuarioEncontrado
      rol = 'cliente'
    } else if (esUsuarioDemo) {
      cuenta = usuarioDemo
      rol = 'cliente'
    }

    // ========================================
    // VALIDAR CREDENCIALES
    // ========================================

    if (!cuenta) {
      setErrorGeneral('Correo o contraseña incorrectos.')
      return
    }

    // ========================================
    // VALIDAR ESTADO DE LA CUENTA
    // ========================================

    const estado = String(
      cuenta.estado || 'activo'
    ).toLowerCase()

    if (
      estado === 'inactivo' ||
      estado === 'suspendido' ||
      estado === 'bloqueado' ||
      cuenta.activo === false
    ) {
      setErrorGeneral(
        'Esta cuenta está desactivada o suspendida. Contacta al administrador.'
      )
      return
    }

    // ========================================
    // GUARDAR SESIÓN COMPARTIDA
    // ========================================

    const sesion = {
      nombre:
        cuenta.nombre ||
        (rol === 'admin' ? 'Administrador' : 'Cliente'),
      correo: cuenta.correo,
      rol: rol
    }

    // true = mantener sesión en localStorage
    const sesionGuardada = guardarSesion(sesion, true)

    if (!sesionGuardada) {
      setErrorGeneral('No se pudo guardar la sesión.')
      return
    }

    // ========================================
    // REDIRIGIR SEGÚN EL ROL
    // ========================================

    const destinoSolicitado = new URLSearchParams(window.location.search).get('redirigir')
    const destinoSeguro = destinoSolicitado?.startsWith('/') && !destinoSolicitado.startsWith('//')
      ? destinoSolicitado
      : null

    window.location.href = rol === 'admin'
      ? '/dashboard'
      : (destinoSeguro || '/')
  }

  // ========================================
  // DISEÑO ORIGINAL DEL LOGIN
  // ========================================

  return (
    <div className="contenedor-pantalla">

      {/* SECCIÓN IZQUIERDA */}

      <div className="seccion-izquierda">
        <div className="superposicion-gradiente"></div>
      </div>

      {/* SECCIÓN DERECHA */}

      <div className="seccion-derecha">
        <div className="tarjeta-formulario">

          <p className="texto-cambiar-form">
            <a href="/">← Volver al inicio</a>
          </p>

          <form
            id="form-login"
            className="formulario activo"
            onSubmit={iniciarSesion}
            noValidate
          >

            <div className="encabezado-form">
              <h2 className="titulo-form">
                ¡Bienvenido de nuevo!
              </h2>

              <p className="descripcion-form">
                Inicia sesión para continuar
              </p>
            </div>

            {/* ERROR GENERAL */}

            {errorGeneral && (
              <div
                id="login-error-general"
                className="alerta-error"
                role="alert"
              >
                {errorGeneral}
              </div>
            )}

            {/* CORREO ELECTRÓNICO */}

            <div className="grupo-campo">
              <label
                htmlFor="login-correo"
                className="etiqueta"
              >
                Correo electrónico
              </label>

              <div className="input-con-icono">
                <span className="icono-campo">✉</span>

                <input
                  type="email"
                  id="login-correo"
                  placeholder="Ingresar tu correo electrónico"
                  value={correo}
                  onChange={(evento) =>
                    setCorreo(evento.target.value)
                  }
                  autoComplete="email"
                />
              </div>

              <span
                className="mensaje-error"
                id="err-login-correo"
              >
                {errores.correo || ''}
              </span>
            </div>

            {/* CONTRASEÑA */}

            <div className="grupo-campo">
              <label
                htmlFor="login-password"
                className="etiqueta"
              >
                Contraseña
              </label>

              <div className="input-con-icono">
                <span className="icono-campo">🔒</span>

                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  id="login-password"
                  placeholder="Ingresar contraseña"
                  value={password}
                  onChange={(evento) =>
                    setPassword(evento.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="btn-toggle-password"
                  aria-label={
                    mostrarPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                >
                  {mostrarPassword ? '🙈' : '👁'}
                </button>
              </div>

              <span
                className="mensaje-error"
                id="err-login-password"
              >
                {errores.password || ''}
              </span>
            </div>

            {/* RECUPERAR CONTRASEÑA */}

            <div className="contenedor-olvido">
              <a
                href="/recuperar"
                className="enlace-secundario"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* BOTÓN INICIAR SESIÓN */}

            <button
              type="submit"
              className="btn-verde"
            >
              Iniciar sesión
            </button>

            {/* SEPARADOR */}

            <div className="separador-o">
              <span>o</span>
            </div>

            {/* BOTÓN GOOGLE - PENDIENTE */}

            <button
              type="button"
              className="btn-google"
              onClick={() =>
                setErrorGeneral(
                  'El inicio de sesión con Google aún no está configurado.'
                )
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              Continuar con Google
            </button>

            {/* REGISTRO */}

            <p className="texto-cambiar-form">
              ¿No tienes cuenta?{' '}
              <a href="/registro">
                Regístrate aquí
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
