
import { useEffect } from 'react'

// ========================================
// PÁGINAS ORIGINALES
// ========================================

import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import AdministrarUsuarios from './pages/AdministrarUsuarios.jsx'
import AgregarAdministrador from './pages/AgregarAdministrador.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MenuAdminCompartido from './componentes/MenuAdminCompartido.jsx'
import Carrito from './pages/Carrito.jsx'
import PagoEnvio from './pages/PagoEnvio.jsx'
import Boleta from './pages/Boleta.jsx'

// ========================================
// SISTEMA DE PEDIDOS
// ========================================

import AccesoPedidos from './pages/AccesoPedidos.jsx'
import MisPedidos from './pages/MisPedidos.jsx'
import SeguimientoPedido from './pages/SeguimientoPedido.jsx'

// ========================================
// PÁGINAS DE HUERTOHOGAR
// ========================================

import Inicio from './pages/Inicio.jsx'
import Categorias from './pages/Categorias.jsx'
import Productos from './pages/Productos.jsx'

// ========================================
// CUENTAS DE PRUEBA
// ========================================

function inicializarCuentasPrueba() {
  const cuentasPrueba = [
    {
      clave: 'administradores_huerto',
      usuario: {
        id: 'admin-demo',
        nombre: 'Administrador',
        apellido: 'HuertoHogar',
        correo: 'admin@huertohogar.cl',
        password: 'Admin123!',
        rol: 'admin',
        activo: true
      }
    },
    {
      clave: 'usuarios_huerto',
      usuario: {
        id: 'cliente-demo',
        nombre: 'Cliente',
        apellido: 'Prueba',
        correo: 'cliente@huertohogar.cl',
        password: 'Cliente123!',
        rol: 'cliente',
        activo: true
      }
    }
  ]

  cuentasPrueba.forEach(({ clave, usuario }) => {
    try {
      const datosGuardados = JSON.parse(
        localStorage.getItem(clave) || '[]'
      )

      const usuarios = Array.isArray(datosGuardados)
        ? datosGuardados
        : []

      const existe = usuarios.some(
        cuenta =>
          cuenta.correo?.toLowerCase() ===
          usuario.correo.toLowerCase()
      )

      if (!existe) {
        usuarios.push(usuario)

        localStorage.setItem(
          clave,
          JSON.stringify(usuarios)
        )
      }
    } catch (error) {
      console.error(
        'Error al inicializar cuentas de prueba:',
        error
      )
    }
  })
}

// ========================================
// PÁGINA EN PREPARACIÓN
// ========================================

function PaginaEnPreparacion() {
  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#18392b'
      }}
    >
      <h1 style={{ color: '#174d32' }}>
        HuertoHogar
      </h1>

      <h2>Sección en preparación</h2>

      <p>
        Estamos integrando esta sección
        a la nueva versión de HuertoHogar.
      </p>

      <a
        href="/"
        style={{ color: '#176b40' }}
      >
        Volver al inicio
      </a>
    </div>
  )
}

// ========================================
// APLICACIÓN PRINCIPAL
// ========================================

function App() {
  useEffect(() => {
    inicializarCuentasPrueba()
  }, [])

  const rutaActual =
    window.location.pathname.replace(/\/+$/, '') || '/'

  // ======================================
  // INICIO
  // ======================================

  if (rutaActual === '/') {
    return <Inicio />
  }

  // ======================================
  // CATEGORÍAS
  // ======================================

  if (rutaActual === '/categorias') {
    return <Categorias />
  }

  // ======================================
  // PRODUCTOS
  // ======================================

  if (rutaActual === '/productos') {
    return <Productos />
  }

  // ======================================
  // LOGIN ORIGINAL
  // ======================================

  if (rutaActual === '/login') {
    return <Login />
  }

  // ======================================
  // REGISTRO ORIGINAL
  // ======================================

  if (rutaActual === '/registro') {
    return <Registro />
  }

  // ======================================
  // ADMINISTRACIÓN
  // ======================================

  if (rutaActual === '/dashboard' || rutaActual === '/admin') {
    return <>
      <MenuAdminCompartido />
      <Dashboard />
    </>
  }

  if (rutaActual === '/admin/usuarios') {
    return <>
      <MenuAdminCompartido />
      <AdministrarUsuarios />
    </>
  }

  if (rutaActual === '/admin/agregar') {
    return <>
      <MenuAdminCompartido />
      <AgregarAdministrador />
    </>
  }

  // ======================================
  // CARRITO Y COMPRAS
  // ======================================

  if (rutaActual === '/carrito') {
    return <Carrito />
  }

  if (rutaActual === '/pago-envio') {
    return <PagoEnvio />
  }

  if (rutaActual === '/boleta') {
    return <Boleta />
  }

  // ======================================
  // ACCESO A PEDIDOS
  // ======================================

  if (rutaActual === '/acceso-pedidos') {
    return <AccesoPedidos />
  }

  // ======================================
  // MIS PEDIDOS
  // ======================================

  if (rutaActual === '/seguimiento-pedido') {
    return <SeguimientoPedido />
  }

  if (rutaActual === '/mis-pedidos') {
    return <MisPedidos />
  }

  // ======================================
  // OTRAS PÁGINAS
  // ======================================

  if (
    rutaActual === '/blog' ||
    rutaActual === '/nosotros' ||
    rutaActual === '/contacto' ||
    rutaActual === '/impacto' ||
    rutaActual === '/noticias' ||
    rutaActual === '/resenas'
  ) {
    return <PaginaEnPreparacion />
  }

  // ======================================
  // ERROR 404
  // ======================================

  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#18392b'
      }}
    >
      <h1 style={{ color: '#174d32' }}>
        Error 404
      </h1>

      <p>
        La página que buscas no existe.
      </p>

      <a
        href="/"
        style={{ color: '#176b40' }}
      >
        Volver al inicio
      </a>
    </div>
  )
}

export default App
