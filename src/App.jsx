import { BrowserRouter,Routes,Route, Outlet,} from 'react-router-dom'

import Cabecera from './componentes/Cabecera'
import Inicio from './componentes/Inicio'
import Footer from './componentes/Footer'

import Categorias from './pages/Categorias'
import Blog from './pages/Blog'
import Dashboard from './pages/Dashboard'

import './css/comun.css'
import './css/estilos.css'
import './css/categorias.css'
import './css/blog.css'
import './css/responsive.css'

function EstructuraTienda() {
    return (
        <div className="pagina">
            <Cabecera />
            <Outlet />
            <Footer />
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Páginas de la tienda */}
                <Route element={<EstructuraTienda />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/blog" element={<Blog />} />
                </Route>

                {/* Panel del administrador */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
