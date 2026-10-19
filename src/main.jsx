import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { seccion } from './rutas/navegacion.js'

async function iniciar() {
  let modulo
  if (seccion === 'principal') {
    await import('./complementos/blog/index.css')
    modulo = await import('./complementos/blog/App.jsx')
  } else if (seccion === 'informacion') {
    await import('./complementos/informacion/index.css')
    modulo = await import('./complementos/informacion/App.jsx')
  } else {
    await import('./index.css')
    modulo = await import('./App.jsx')
  }
  const App = modulo.default
  createRoot(document.getElementById('root')).render(
    <StrictMode><AuthProvider><App /></AuthProvider></StrictMode>
  )
}
iniciar().catch(error => {
  console.error(error)
  document.getElementById('root').textContent = 'No se pudo cargar la página. Recarga para intentarlo de nuevo.'
})
