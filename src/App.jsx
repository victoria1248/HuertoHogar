import { lazy, Suspense } from 'react'
import { seccion } from './rutas/navegacion.js'

const modulos = {
  tienda: lazy(() => import('./modulos/Tienda.jsx')),
  blog: lazy(() => import('./modulos/Blog.jsx')),
  informacion: lazy(() => import('./modulos/Informacion.jsx')),
}
const Seccion = modulos[seccion]

export default function App() {
  return <Suspense fallback={<p role="status">Cargando HuertoHogar…</p>}><Seccion /></Suspense>
}
