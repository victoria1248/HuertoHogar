
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'

// Estilos personalizados de HuertoHogar
import './css/global.css'

// Único punto de montaje y proveedor de navegación del proyecto
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
