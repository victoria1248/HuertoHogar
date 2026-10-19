import { useState } from "react";
import { Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import Contacto from "../pages/informacion/contactos.jsx";
import Impacto from "../pages/informacion/impacto.jsx";
import Noticias from "../pages/informacion/noticias.jsx";
import Resenas from "../pages/informacion/Resenas.jsx";
import Nosotros from "../pages/informacion/nosotros.jsx";
import Footer from "../pages/informacion/Footer.jsx";
import "../css/informacion/app.css";

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
  const [agregados] = useState(() => {
    try { return JSON.parse(localStorage.getItem("carrito_huerto") || "[]"); }
    catch { return []; }
  });
  const cantidad = agregados.reduce((total, producto) => total + producto.cantidad, 0);


  return (
    <>
      <div className="sitio">
        <Cabecera cantidad={cantidad} />
        <Routes>


          <Route path="/nosotros" element={<Nosotros />} />

          <Route path="/contacto" element={<Contacto />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/impacto" element={<Impacto />} />

          <Route path="*" element={<Navigate to="/productos" replace />} />
        </Routes>
        <Footer />
        <div className="copyright">© {new Date().getFullYear()} HuertoHogar · Fresco, local y sostenible</div>
      </div>
    </>
  );
}

export default Aplicacion;
