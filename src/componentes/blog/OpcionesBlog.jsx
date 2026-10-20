import { Link } from 'react-router-dom';
const opciones=[{img:'/img/Comida.jpeg',alt:'Preparación con alimentos frescos',titulo:'Recetas',ruta:'/blog/recetas'},
{img:'/img/Trigo.jpeg',alt:'Cultivo de trigo',titulo:'Consejos de cultivo',ruta:'/blog/consejos'},
{img:'/img/Cultivos.jpeg',alt:'Persona trabajando en un huerto',titulo:'Ver nuestros huertos',ruta:'/nosotros'}];
export default function OpcionesBlog() {
 return <section className="row g-4 mb-4" aria-label="Explorar el blog">{opciones.map(op=><div className="col-12 col-md-4" key={op.ruta}>
   <article className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"><img src={op.img} alt={op.alt} className="card-img-top" style={{height:220,objectFit:'cover'}} />
   <div className="card-body d-grid"><Link className="btn btn-outline-success fw-semibold" to={op.ruta}>{op.titulo}</Link></div></article></div>)}</section>;
}
