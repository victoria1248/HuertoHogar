
import React, { useMemo } from 'react'

import { useAuth } from '../context/AuthContext.jsx'

// ========================================
// PÁGINA MIS PEDIDOS
// ========================================

function MisPedidos() {
  const { usuario: sesion } = useAuth()

  const pedidos = useMemo(() => {
    if (!sesion?.correo) return []
    try {
      const correo = sesion.correo.trim().toLowerCase()
      const guardados = JSON.parse(localStorage.getItem('pedidos_huerto') || '[]')
      const lista = Array.isArray(guardados) ? guardados : []
      // También recuperar la última boleta de versiones anteriores.
      const ultimo = JSON.parse(sessionStorage.getItem('ultimo_pedido_huerto') || 'null')
      if (ultimo && !lista.some(p => p.id === ultimo.id)) lista.unshift(ultimo)
      return lista.filter(p =>
        String(p.correoCuenta || p.cliente?.correo || '').trim().toLowerCase() === correo
      ).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    } catch (error) {
      console.error('No se pudo leer el historial de pedidos:', error)
      return []
    }
  }, [sesion])

  const estilos = {
    pagina: {
      minHeight: '100vh',
      backgroundColor: '#f5f8f4',
      padding: '60px 25px',
      fontFamily: 'Arial, sans-serif',
      color: '#18392b'
    },

    tarjeta: {
      maxWidth: '1100px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '18px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
    },

    titulo: {
      color: '#174d32',
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '20px'
    },

    texto: {
      color: '#334b40',
      fontSize: '17px',
      lineHeight: '1.7'
    },

    boton: {
      display: 'inline-block',
      marginTop: '25px',
      padding: '13px 24px',
      backgroundColor: '#176b40',
      color: '#ffffff',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  }

  return (
    <main style={estilos.pagina}>
      <div style={estilos.tarjeta}>

        <h1 style={estilos.titulo}>
          📦 Mis pedidos
        </h1>

        {!sesion ? (
          // =====================================
          // USUARIO SIN SESIÓN
          // =====================================

          <section>
            <h2 style={{ color: '#18392b' }}>
              Inicia sesión para consultar tus pedidos
            </h2>

            <p style={estilos.texto}>
              Para consultar tus compras y revisar
              el estado de tus entregas, necesitas
              iniciar sesión con tu cuenta de HuertoHogar.
            </p>

            <a
              href="/login?redirigir=%2Fmis-pedidos"
              style={estilos.boton}
            >
              🔐 Iniciar sesión
            </a>

            <p
              style={{
                ...estilos.texto,
                marginTop: '25px'
              }}
            >
              ¿Todavía no tienes una cuenta?{' '}
              <a
                href="/registro"
                style={{
                  color: '#176b40',
                  fontWeight: 'bold'
                }}
              >
                Regístrate aquí
              </a>
            </p>
          </section>
        ) : (
          // =====================================
          // USUARIO CON SESIÓN
          // =====================================

          <section>
            <h2 style={{ color: '#18392b' }}>
              ¡Hola, {sesion.nombre}! 👋
            </h2>

            <p style={estilos.texto}>
              Bienvenido a tu historial de compras.
              Aquí podrás consultar tus pedidos
              y revisar el estado de cada entrega.
            </p>

            {pedidos.length === 0 ? (
              <div style={{ marginTop: '30px', padding: '35px 20px', border: '1px dashed #b8d6c2', backgroundColor: '#f8fcf9', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '45px' }}>🛒</div>
                <h3 style={{ color: '#174d32' }}>Todavía no tienes pedidos</h3>
                <p style={{ color: '#64748b' }}>Las próximas compras realizadas con tu cuenta aparecerán aquí.</p>
                <a href="/productos" style={estilos.boton}>Explorar productos</a>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '18px', marginTop: '28px' }}>
                {pedidos.map(pedido => (
                  <article key={pedido.id} style={{ border: '1px solid #d5e6d9', borderRadius: '14px', padding: '22px', background: '#f9fcfa' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px' }}>
                      <div>
                        <strong style={{ color: '#174d32', fontSize: '18px' }}>Pedido {pedido.id}</strong>
                        <p style={{ color: '#64748b', margin: '8px 0' }}>{new Date(pedido.fecha).toLocaleString('es-CL')}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ display: 'block', color: '#174d32' }}>${Number(pedido.total || 0).toLocaleString('es-CL')}</strong>
                        <span style={{ color: pedido.estado === 'Suspendido' ? '#a33c25' : '#176b40' }}>{pedido.estado || 'Preparando pedido'}</span>{pedido.estado === 'Suspendido' && <p style={{color:'#a33c25',marginTop:8}}>Motivo: {pedido.motivoSuspension || 'Contacta a la tienda.'}</p>}
                      </div>
                    </div>
                    <p style={{ color: '#334b40' }}>{Array.isArray(pedido.productos) ? pedido.productos.length : 0} producto(s)</p>
                    <button type="button" onClick={() => {
                      sessionStorage.setItem('ultimo_pedido_huerto', JSON.stringify(pedido))
                      window.location.href = '/seguimiento-pedido?id=' + encodeURIComponent(pedido.id)
                    }} style={{ ...estilos.boton, border: 'none', cursor: 'pointer', marginTop: '8px' }}>
                      Ver seguimiento del pedido
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* VOLVER AL INICIO */}

        <div style={{ marginTop: '30px' }}>
          <a
            href="/"
            style={{
              color: '#176b40',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            ← Volver al inicio
          </a>
        </div>

      </div>
    </main>
  )
}

export default MisPedidos
