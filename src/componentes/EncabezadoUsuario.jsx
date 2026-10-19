
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

import iconPerfil from '../img/icon_perfil.png'

// ========================================
// ENCABEZADO DE USUARIO - HUERTOHOGAR
// ========================================

function EncabezadoUsuario() {
  const {
    usuario,
    autenticado,
    cerrarSesion
  } = useAuth()

  const [menuAbierto, setMenuAbierto] = useState(false)
  const contenedorRef = useRef(null)

  // ========================================
  // CERRAR MENÚ AL HACER CLIC FUERA
  // ========================================

  useEffect(() => {
    function cerrarAlHacerClicFuera(evento) {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target)
      ) {
        setMenuAbierto(false)
      }
    }

    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') {
        setMenuAbierto(false)
      }
    }

    document.addEventListener(
      'mousedown',
      cerrarAlHacerClicFuera
    )

    document.addEventListener(
      'keydown',
      cerrarConEscape
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        cerrarAlHacerClicFuera
      )

      document.removeEventListener(
        'keydown',
        cerrarConEscape
      )
    }
  }, [])

  // ========================================
  // USUARIO SIN SESIÓN INICIADA
  // ========================================

  if (!autenticado) {
    return (
      <a
        href="/login"
        title="Iniciar sesión"
        aria-label="Iniciar sesión"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          cursor: 'pointer',
          textDecoration: 'none',
          flexShrink: 0
        }}
      >
        <img
          src={iconPerfil}
          alt="Iniciar sesión"
          style={{
            width: '28px',
            height: '28px',
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />
      </a>
    )
  }

  // ========================================
  // USUARIO CON SESIÓN INICIADA
  // ========================================

  return (
    <div
      ref={contenedorRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0
      }}
    >
      <button
        type="button"
        title="Mi cuenta"
        aria-label={`Mi cuenta: ${usuario.nombre}`}
        aria-expanded={menuAbierto}
        aria-haspopup="menu"
        onClick={() => setMenuAbierto(anterior => !anterior)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
          padding: '6px',
          margin: 0,
          width: 'auto',
          minWidth: 0,
          flexShrink: 0
        }}
      >
        <img
          src={iconPerfil}
          alt=""
          style={{
            width: '28px',
            height: '28px',
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />

        <span
          style={{
            color: '#174d32',
            fontSize: '14px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          Hola, {usuario.nombre || 'Cliente'}
        </span>

        <span
          style={{
            color: '#174d32',
            fontSize: '11px'
          }}
        >
          {menuAbierto ? '▲' : '▼'}
        </span>
      </button>

      {/* MENÚ DESPLEGABLE */}

      {menuAbierto && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: '230px',
            maxWidth: '90vw',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* INFORMACIÓN DEL CLIENTE */}

          <div
            style={{
              paddingBottom: '12px',
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <strong
              style={{
                color: '#174d32',
                display: 'block',
                fontSize: '15px'
              }}
            >
              {usuario.nombre || 'Cliente'}
            </strong>

            <small
              style={{
                color: '#64748b',
                display: 'block',
                marginTop: '5px',
                fontSize: '12px',
                overflowWrap: 'anywhere'
              }}
            >
              {usuario.correo}
            </small>
          </div>

          {/* MIS PEDIDOS */}

          <a
            href="/mis-pedidos"
            role="menuitem"
            style={{
              display: 'block',
              color: '#174d32',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              padding: '8px 4px'
            }}
          >
            📦 Mis pedidos
          </a>

          {/* OPCIÓN SOLO PARA ADMINISTRADORES */}

          {usuario.rol === 'admin' && (
            <a
              href="/dashboard"
              role="menuitem"
              style={{
                display: 'block',
                color: '#174d32',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 4px'
              }}
            >
              ⚙️ Administración
            </a>
          )}

          {/* CERRAR SESIÓN */}

          <button
            type="button"
            role="menuitem"
            onClick={cerrarSesion}
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#fff1f1',
              color: '#b42318',
              border: 'none',
              borderRadius: '8px',
              padding: '11px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              textAlign: 'left'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default EncabezadoUsuario
