// Comportamiento compartido de la maqueta local.
window.Huerto = { leerUsuarios() { try { const lista = JSON.parse(localStorage.getItem('usuarios_huerto') || '[]'); return Array.isArray(lista) ? lista.filter(u => u && typeof u.correo === 'string' && typeof u.clave === 'string') : []; } catch { return []; } } };
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); alert('Este contenido no está incluido en esta versión del proyecto.'); }));
  document.querySelectorAll('.btn-google').forEach(b => b.addEventListener('click', () => alert('El inicio con Google no está configurado. Usa el formulario de inicio de sesión.')));
  try {
    const sesion = JSON.parse(sessionStorage.getItem('sesion_huerto') || 'null');
    const perfil = document.querySelector('.header-icons a[href="login.html"]');
    if (sesion && perfil) {
      perfil.title = 'Sesión de ' + sesion.nombre + '. Pulsa para cerrar sesión';
      perfil.querySelector('img').alt = 'Cerrar sesión';
      perfil.addEventListener('click', e => { e.preventDefault(); sessionStorage.removeItem('sesion_huerto'); window.location.href = 'login.html'; });
    }
  } catch { /* Sin sesión guardada. */ }
  const form = document.querySelector('.formulario-contacto form');
  if (form) form.addEventListener('submit', e => { e.preventDefault(); if (!form.reportValidity()) return; const asunto = document.getElementById('asunto').value; const cuerpo = document.getElementById('mensaje').value + '\n\nNombre: ' + document.getElementById('nombre').value + '\nCorreo: ' + document.getElementById('correo').value; window.location.href = 'mailto:info@huertohogar.cl?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo); });
  const detalle = document.querySelector('.btn-details');
  if (detalle) detalle.addEventListener('click', () => { window.location.href = 'contactos.html'; });
  const cerrar = document.querySelector('.close-btn');
  if (cerrar) cerrar.remove();
});
