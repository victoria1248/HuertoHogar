
import { useState } from 'react'

import '../css/estilo.css'
import '../css/index.css'

import { useAuth } from '../context/AuthContext.jsx'

// ========================================
// CABECERA PRINCIPAL DE HUERTOHOGAR
// ========================================

function Cabecera() {
  const {
    usuario,
    autenticado,
    cerrarSesion
  } = useAuth()

  const [menuAbierto, setMenuAbierto] = useState(false)

  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Categorías', ruta: '/categorias' },
    { nombre: 'Nosotros', ruta: '/nosotros' },
    { nombre: 'Blog', ruta: '/blog' },
    { nombre: 'Contacto', ruta: '/contacto' },
    { nombre: 'Impacto', ruta: '/impacto' },
    { nombre: 'Noticias', ruta: '/noticias' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Mis pedidos', ruta: '/mis-pedidos' }
  ]

  const estiloEnlace = {
    color: '#174d32',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  }

  return (
    <header className="sitio-header">
      <div className="header-container">

        {/* LOGO */}

        <a className="logo" href="/">
          <img
            src="/img/Logo_3.png"
            alt="HuertoHogar"
          />
        </a>

        {/* NAVEGACIÓN */}

        <nav
          className="nav-menu"
          aria-label="Menú principal"
        >
          <ul>
            {enlaces.map(enlace => (
              <li key={enlace.ruta}>
                <a href={enlace.ruta}>
                  {enlace.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* USUARIO Y CARRITO */}

        <div
          className="header-icons"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >

          {!autenticado ? (
            <a
              href="/login"
              title="Iniciar sesión"
              style={estiloEnlace}
            >
              Iniciar sesión
            </a>
          ) : (
            <div style={{ position: 'relative' }}>

              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-expanded={menuAbierto}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#174d32',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                <span style={{ fontSize: '22px' }}>
                  👤
                </span>

                Hola, {usuario.nombre}

                <span>
                  {menuAbierto ? '▲' : '▼'}
                </span>
              </button>

              {menuAbierto && (
                <div
                  style={{
                    position: 'absolute',
                    top: '42px',
                    right: 0,
                    minWidth: '190px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow:
                      '0 8px 30px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <a
                    href="/mis-pedidos"
                    style={estiloEnlace}
                  >
                    📦 Mis pedidos
                  </a>

                  {usuario.rol === 'admin' && (
                    <a
                      href="/admin/usuarios"
                      style={estiloEnlace}
                    >
                      ⚙️ Administración
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={cerrarSesion}
                    style={{
                      backgroundColor: '#fff1f1',
                      color: '#b42318',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          <a
            href="/carrito"
            title="Ver carrito"
            style={{
              fontSize: '23px',
              textDecoration: 'none'
            }}
          >
            🛒
          </a>

        </div>
      </div>
    </header>
  )
}

export default Cabecera
