import PresentacionBlog from '../componentes/PresentacionBlog';
import HistoriaBlog from '../componentes/HistoriaBlog';
import OpcionesBlog from '../componentes/OpcionesBlog';

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