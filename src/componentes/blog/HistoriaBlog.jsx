import { Link } from 'react-router-dom';
export default function HistoriaBlog() {
  return <section className="mb-5 py-4"><h2 className="text-center fw-bold mb-4">Cosechando bienestar: la misión de HuertoHogar</h2>
    <div className="row g-4 align-items-center"><div className="col-12 col-lg-6">
      <img src="/img/blog_2.png" alt="Agricultor trabajando en el huerto" className="img-fluid w-100 rounded-4 shadow-sm" style={{maxHeight:420,objectFit:'cover'}} /></div>
      <div className="col-12 col-lg-6"><p>En Huerto Hogar, ponemos nuestro corazón y alma en cada proyecto. Te ofrecemos soluciones integrales para crear el entorno que siempre soñaste, desde el diseño de un pequeño huerto de balcón hasta la transformación completa de tu hogar para integrar la naturaleza.</p>
      <p>No solo diseñamos, te ayudamos a cultivar tu propia comida y bienestar. Establecidos para llevar la frescura del campo chileno directamente a tu puerta, nuestra reputación se basa en la innovación, la calidad y el servicio excepcional.</p>
      <Link to="/contacto" className="btn btn-success rounded-pill px-4">Agendar una asesoría</Link></div></div>
  </section>;
}
