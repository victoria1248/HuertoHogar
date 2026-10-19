import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

// Compatibilidad con enlaces antiguos: utilizar el Login original.
function AccesoPedidos() {
  const { autenticado } = useAuth()

  useEffect(() => {
    window.location.replace(autenticado ? '/mis-pedidos' : '/login?redirigir=%2Fmis-pedidos')
  }, [autenticado])

  return <main style={{ padding: '48px', textAlign: 'center' }}>Redirigiendo al acceso de HuertoHogar...</main>
}

export default AccesoPedidos
