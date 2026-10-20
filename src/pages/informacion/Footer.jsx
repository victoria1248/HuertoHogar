import { Link } from "react-router-dom";

const enlacesContacto = [
  { texto: "Contáctanos", ruta: "/contacto" },
  { texto: "Noticias", ruta: "/noticias" },
  { texto: "Reseñas", ruta: "/resenas" },
];

export default function Footer() {
  return (
    <footer className="hh-footer-v2" aria-label="Pie de página de HuertoHogar">
      <style>{`
        .hh-footer-v2 {
          background: #176c45 !important;
          color: #fff !important;
          width: 100% !important;
          padding: 55px 0 0 !important;
          margin: 0 !important;
          font-family: inherit;
          box-sizing: border-box;
        }
        .hh-footer-v2 *, .hh-footer-v2 *::before, .hh-footer-v2 *::after {
          box-sizing: border-box;
        }
        .hh-footer-v2 .hh-footer-container {
          width: min(1180px, calc(100% - 48px)) !important;
          max-width: 1180px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          display: block !important;
        }
        .hh-footer-v2 .hh-footer-grid {
          display: grid !important;
          grid-template-columns: minmax(210px, 1.35fr) repeat(3, minmax(150px, 1fr)) !important;
          gap: 48px !important;
          align-items: start !important;
          width: 100% !important;
        }
        .hh-footer-v2 .hh-footer-group {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          min-width: 0 !important;
          width: auto !important;
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
          text-align: left !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }
        .hh-footer-v2 .hh-footer-brand img {
          display: block !important;
          width: 165px !important;
          max-width: 100% !important;
          height: auto !important;
          max-height: 120px !important;
          object-fit: contain !important;
          margin: 0 !important;
        }
        .hh-footer-v2 .hh-footer-tagline {
          font-size: 14px !important;
          line-height: 1.65 !important;
          color: #d1e9da !important;
          margin: 18px 0 0 !important;
          max-width: 230px !important;
        }
        .hh-footer-v2 .hh-footer-heading {
          color: #fff !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          line-height: 1.4 !important;
          letter-spacing: .065em !important;
          text-transform: uppercase !important;
          margin: 4px 0 22px !important;
          padding: 0 !important;
          width: auto !important;
          white-space: normal !important;
        }
        .hh-footer-v2 .hh-footer-links {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 13px !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .hh-footer-v2 .hh-footer-links a,
        .hh-footer-v2 .hh-footer-links span {
          color: #e5f3eb !important;
          text-decoration: none !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          line-height: 1.6 !important;
          display: inline !important;
          width: auto !important;
          max-width: 100% !important;
          overflow-wrap: anywhere !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }
        .hh-footer-v2 .hh-footer-links a:hover,
        .hh-footer-v2 .hh-footer-links a:focus-visible {
          color: #fff !important;
          text-decoration: underline !important;
          text-underline-offset: 4px;
        }
        .hh-footer-v2 .hh-footer-bottom {
          border-top: 1px solid rgba(255,255,255,.22) !important;
          margin-top: 44px !important;
          padding: 19px 0 23px !important;
          text-align: center !important;
          color: #d1e9da !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
        }
        @media (max-width: 950px) {
          .hh-footer-v2 .hh-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 38px 44px !important;
          }
        }
        @media (max-width: 540px) {
          .hh-footer-v2 { padding-top: 38px !important; }
          .hh-footer-v2 .hh-footer-container { width: calc(100% - 36px) !important; }
          .hh-footer-v2 .hh-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 32px 20px !important;
          }
          .hh-footer-v2 .hh-footer-brand { grid-column: 1 / -1 !important; }
          .hh-footer-v2 .hh-footer-heading { font-size: 13px !important; margin-bottom: 15px !important; }
          .hh-footer-v2 .hh-footer-links a,
          .hh-footer-v2 .hh-footer-links span { font-size: 13px !important; }
          .hh-footer-v2 .hh-footer-bottom { margin-top: 35px !important; }
        }
      `}</style>

      <div className="hh-footer-container">
        <div className="hh-footer-grid">
          <div className="hh-footer-group hh-footer-brand">
            <Link to="/" aria-label="Volver al inicio de HuertoHogar">
              <img src="/img/logo-principal.png" alt="Logo de HuertoHogar" />
            </Link>
            <p className="hh-footer-tagline">
              Del campo a tu hogar. Productos frescos para una vida más natural.
            </p>
          </div>

          <div className="hh-footer-group">
            <h2 className="hh-footer-heading">Contacto</h2>
            <nav className="hh-footer-links" aria-label="Contacto">
              {enlacesContacto.map(({ texto, ruta }) => (
                <Link key={ruta} to={ruta}>{texto}</Link>
              ))}
            </nav>
          </div>

          <div className="hh-footer-group">
            <h2 className="hh-footer-heading">Información</h2>
            <nav className="hh-footer-links" aria-label="Información">
              <Link to="/impacto">Impacto ambiental</Link>
              <Link to="/noticias">Blog y noticias</Link>
              <a href="mailto:info@huertohogar.cl">Envíanos un correo</a>
            </nav>
          </div>

          <div className="hh-footer-group">
            <h2 className="hh-footer-heading">Redes sociales</h2>
            <div className="hh-footer-links">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <span>@HuertoHogar</span>
              <a href="mailto:info@huertohogar.cl">info@huertohogar.cl</a>
              <span>+56 8765 4321</span>
            </div>
          </div>
        </div>
        <div className="hh-footer-bottom">
          © {new Date().getFullYear()} HuertoHogar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
