import PresentacionBlog from '../../componentes/blog/PresentacionBlog.jsx';
import HistoriaBlog from '../../componentes/blog/HistoriaBlog.jsx';
import OpcionesBlog from '../../componentes/blog/OpcionesBlog.jsx';

function Blog() {
  return (
    <main className="blog">
      <PresentacionBlog />
      <HistoriaBlog />
      <OpcionesBlog />
    </main>
  );
}

export default Blog;