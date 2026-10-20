
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

// Compatibilidad con enlaces antiguos: utilizar el Login original.
function AccesoPedidos() {
  const { autenticado } = useAuth()

  useEffect(() => {
    const destino = autenticado
      ? '/mis-pedidos'
      : '/login?redirigir=%2Fmis-pedidos'

    window.location.replace(destino)
  }, [autenticado])

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center text-center min-vh-100 py-5">
      <div className="spinner-border text-success mb-3" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <h1 className="h5 mb-2">HuertoHogar</h1>
      <p className="text-muted">
        Redirigiendo al acceso de HuertoHogar...
      </p>
    </main>
  )
}

export default AccesoPedidos
  