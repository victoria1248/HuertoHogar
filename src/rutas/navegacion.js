// Entrada única: carga solo los estilos y componentes de la sección elegida.
// Al cambiar de módulo se recarga la página para no mezclar estilos globales.
const equivalencias = {
  'index.html': '/', 'categoria.html': '/categorias', 'producto.html': '/productos',
  'blog.html': '/blog', 'nosotros.html': '/nosotros', 'contactos.html': '/contacto',
  'contacto.html': '/contacto', 'impacto.html': '/impacto', 'noticia.html': '/noticias',
  'resenas.html': '/resenas', 'login.html': '/login', 'registro.html': '/registro',
  'pago_envio.html': '/pago-envio', 'carrito.html': '/carrito',
  'dashbord.html': '/dashboard', 'admin.html': '/admin/usuarios',
  'agregar_admin.html': '/admin/agregar', 'gestion_clientes.html': '/admin/usuarios'
};
function normalizar(url) {
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  if (url.pathname === '/catalogo') url.pathname = '/productos';
  const destino = equivalencias[url.pathname.split('/').pop()];
  if (destino) url.pathname = destino;
  return url;
}
export function modulo(path) {
  if (['/blog', '/blog/recetas', '/blog/consejos'].includes(path)) return 'blog';
  if (['/nosotros', '/contacto', '/impacto', '/noticias', '/resenas'].includes(path)) return 'informacion';
  return 'tienda';
}
const actual = normalizar(new URL(location.href));
actual.pathname = actual.pathname.replace(/\/+$/, '') || '/';
if (actual.href !== location.href) history.replaceState(null, '', actual.href);
const seccion = modulo(actual.pathname);
document.addEventListener('click', (event) => {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const enlace = event.target.closest('a[href]');
  if (!enlace || enlace.target === '_blank' || enlace.hasAttribute('download')) return;
  const original = new URL(enlace.href, location.href);
  if (original.origin !== location.origin) return;
  const destino = normalizar(new URL(original.href));
  if (destino.href !== original.href || modulo(destino.pathname) !== seccion) {
    event.preventDefault();
    event.stopPropagation();
    location.assign(destino.href);
  }
}, true);

export { seccion };
