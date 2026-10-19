import { BrowserRouter, Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import Contacto from "./jsx/contactos.jsx";
import Impacto from "./jsx/impacto.jsx";
import Noticias from "./jsx/noticias.jsx";
import Resenas from "./jsx/reseñas.jsx";
import Nosotros from "./jsx/nosotros.jsx";
import Footer from "./jsx/Footer.jsx";
import "./App.css";

function Cabecera({ cantidad }) {
  const enlaces = [
    ["Inicio", "/"],
    ["Categorías", "/categorias"],
    ["Blog", "/blog"],
    ["Productos", "/productos"],
    ["Carrito", "/carrito"],
    ["Nosotros", "/nosotros"],
    ["Noticias", "/noticias"],
    ["Impacto ambiental", "/impacto"],
    ["Reseñas", "/resenas"],
    ["Contacto", "/contacto"],
  ];
  return (
    <header className="cabecera">
      <Link to="/" className="marca" aria-label="HuertoHogar - Productos">
        <img src="/img/logo-principal.png" alt="" onError={e => { e.currentTarget.src = "/img/logo_1.png"; }} />
        <span>HuertoHogar</span>
      </Link>
      <nav aria-label="Navegación principal">
        {enlaces.map(([nombre, ruta]) => (
          <NavLink key={ruta} to={ruta} className={({ isActive }) => isActive ? "nav-enlace activo" : "nav-enlace"}>
            {nombre}
          </NavLink>
        ))}
        {cantidad > 0 && <span className="nav-enlace" aria-live="polite">🛒 Agregados: {cantidad}</span>}
      </nav>
    </header>
  );
}

function Aplicacion() {
  return (
    <BrowserRouter>
      <div className="sitio">
        <Cabecera />
        <Routes>
          {/*<Route path="/" element={<Navigate to="/inicio" replace />} />*/}
          {/*<Route path="/categorias" element={<Categorias />} />*/}
          <Route path="/nosotros" element={<Nosotros />} />
          {/*<Route path="/blog" element={<Blog />} />*/}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/impacto" element={<Impacto />} />

          <Route path="*" element={<Navigate to="/productos" replace />} />
        </Routes>
        <Footer />
        <div className="copyright">© {new Date().getFullYear()} HuertoHogar · Fresco, local y sostenible</div>
      </div>
    </BrowserRouter>
  );
}

export default Aplicacion;
