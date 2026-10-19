import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Cabecera from './componentes/Cabecera'
import Footer from './componentes/Footer'

import Recetas from './pages/Recetas'
import ConsejosCultivo from './pages/ConsejosCultivo'
import Blog from './pages/Blog'

import './css/comun.css'
import './css/estilos.css'

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
                {/* Páginas con cabecera y footer */}
                <Route element={<EstructuraTienda />}>
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/recetas" element={<Recetas />} />
                    <Route
                        path="/blog/consejos"
                        element={<ConsejosCultivo />}
                    />
                </Route>

                {/* Panel del administrador */}
            </Routes>
        </BrowserRouter>
    )
}

export default App