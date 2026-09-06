/* ==========================================================================
   📩 LÓGICA DE RESTABLECER CONTRASEÑA (js/recuperar.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const formRecuperar = document.getElementById('form-recuperar');

  if (formRecuperar) {
    formRecuperar.addEventListener('submit', (e) => {
      e.preventDefault();

      const errorCorreo = document.getElementById('err-recuperar-correo');
      const mensajeExito = document.getElementById('recuperar-mensaje-exito');

      if (errorCorreo) errorCorreo.textContent = '';
      if (mensajeExito) mensajeExito.classList.add('oculto');

      const correo = document.getElementById('recuperar-correo').value.trim();

      if (correo === '') {
        if (errorCorreo) errorCorreo.textContent = 'Este campo es obligatorio';
        return;
      }

      if (!correo.toLowerCase().endsWith('@gmail.com')) {
        if (errorCorreo) errorCorreo.textContent = 'Ingrese un correo válido @gmail.com';
        return;
      }

      // Si el correo es válido, se muestra el mensaje de éxito
      if (mensajeExito) mensajeExito.classList.remove('oculto');
    });
  }

});
