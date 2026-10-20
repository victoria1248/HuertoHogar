import PresentacionBlog from '../../componentes/blog/PresentacionBlog.jsx';
import HistoriaBlog from '../../componentes/blog/HistoriaBlog.jsx';
import OpcionesBlog from '../../componentes/blog/OpcionesBlog.jsx';
export default function Blog() {
  return <main className="container py-5"><PresentacionBlog /><HistoriaBlog /><OpcionesBlog /></main>;
}
