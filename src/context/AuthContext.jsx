
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

// ========================================
// CONTEXTO DE AUTENTICACIÓN
// ========================================

const AuthContext = createContext(null)

const CLAVE_SESION = 'sesion_huerto'

// ========================================
// OBTENER SESIÓN GUARDADA
// ========================================

function obtenerSesionGuardada() {
  try {
    const datos =
      sessionStorage.getItem(CLAVE_SESION) ||
      localStorage.getItem(CLAVE_SESION)

    if (!datos) return null

    const sesion = JSON.parse(datos)

    if (
      !sesion ||
      typeof sesion !== 'object' ||
      !sesion.correo
    ) {
      return null
    }

    return sesion
  } catch (error) {
    console.error('Error al recuperar la sesión:', error)
    return null
  }
}

// ========================================
// PROVEEDOR DE AUTENTICACIÓN
// ========================================

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    obtenerSesionGuardada
  )

  // Mantener sincronizada la sesión.
  useEffect(() => {
    function actualizarSesion() {
      setUsuario(obtenerSesionGuardada())
    }

    window.addEventListener(
      'storage',
      actualizarSesion
    )

    window.addEventListener(
      'sesionActualizada',
      actualizarSesion
    )

    return () => {
      window.removeEventListener(
        'storage',
        actualizarSesion
      )

      window.removeEventListener(
        'sesionActualizada',
        actualizarSesion
      )
    }
  }, [])

  // ======================================
  // INICIAR SESIÓN
  // ======================================

  function iniciarSesion(datosUsuario, recordar = false) {
    if (!datosUsuario?.correo) {
      return false
    }

    const sesion = {
      nombre: datosUsuario.nombre || 'Cliente',
      correo: datosUsuario.correo,
      rol: datosUsuario.rol || 'cliente'
    }

    try {
      sessionStorage.removeItem(CLAVE_SESION)
      localStorage.removeItem(CLAVE_SESION)

      const almacenamiento = recordar
        ? localStorage
        : sessionStorage

      almacenamiento.setItem(
        CLAVE_SESION,
        JSON.stringify(sesion)
      )

      setUsuario(sesion)

      window.dispatchEvent(
        new Event('sesionActualizada')
      )

      return true
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      return false
    }
  }

  // ======================================
  // CERRAR SESIÓN
  // ======================================

  function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION)
    localStorage.removeItem(CLAVE_SESION)

    setUsuario(null)

    window.dispatchEvent(
      new Event('sesionActualizada')
    )

    window.location.href = '/'
  }

  // ======================================
  // DATOS COMPARTIDOS
  // ======================================

  const autenticado = Boolean(usuario)

  const esAdministrador = usuario?.rol === 'admin'

  const esCliente = usuario?.rol === 'cliente'

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        esAdministrador,
        esCliente,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ========================================
// HOOK PARA USAR LA SESIÓN
// ========================================

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    )
  }

  return contexto
}

export default AuthContext
