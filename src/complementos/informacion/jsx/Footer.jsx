import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="/img/logo-principal.png"
          alt="Huerto Hogar"
        />
      </div>

      <div className="footer-columna">
        <h3>CONTACTO</h3>
        <Link to="/contacto">Contáctanos</Link>
        <Link to="/noticias">Noticias</Link>
        <Link to="/resenas">Reseñas</Link>
      </div>

      <div className="footer-columna">
        <h3>INFORMACIÓN</h3>
        <Link to="/impacto">Impacto ambiental</Link>
        <Link to="/noticias">Blog y noticias</Link>
        <a href="mailto:info@huertohogar.cl">
          Envíanos un correo
        </a>
      </div>

      <div className="footer-columna">
        <h3>REDES SOCIALES</h3>
        <div className="redes-sociales">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <p>@HuertoHogar</p>
        <p>info@huertohogar.cl</p>
        <p>+56 8765 4321</p>
      </div>
    </footer>
  );
}
