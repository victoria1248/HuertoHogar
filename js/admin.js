/* ==========================================================================
   🛡️ LÓGICA EXCLUSIVA DE ACCESO ADMINISTRATIVO (js/admin.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mostrar y ocultar contraseña (ojo 👁)
  const togglePass = document.getElementById('toggle-admin-pass');
  const passInput = document.getElementById('admin-password');

  if (togglePass && passInput) {
    togglePass.addEventListener('click', () => {
      if (passInput.type === 'password') {
        passInput.type = 'text';
        togglePass.textContent = '🙈';
      } else {
        passInput.type = 'password';
        togglePass.textContent = '👁';
      }
    });
  }

  // 2. Formulario Login Admin
  const formAdminLogin = document.getElementById('form-admin-login');

  if (formAdminLogin) {
    formAdminLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar errores
      document.getElementById('err-admin-correo').textContent = '';
      document.getElementById('err-admin-password').textContent = '';
      const alertaError = document.getElementById('admin-error-general');
      if (alertaError) alertaError.classList.add('oculto');

      const correo = document.getElementById('admin-correo').value.trim();
      const password = passInput.value;

      let esValido = true;

      if (correo === '') {
        document.getElementById('err-admin-correo').textContent = 'Ingrese su correo de administración.';
        esValido = false;
      }

      if (password === '') {
        document.getElementById('err-admin-password').textContent = 'Ingrese su contraseña de administración.';
        esValido = false;
      }

      if (!esValido) return;

      // Credenciales de administración
      const esAdminPrincipal = (correo.toLowerCase() === 'admin@huertohogar.cl' && password === 'Admin123!');
      const esAdminSecundario = (correo.toLowerCase() === 'admin@gmail.com' && password === 'Admin123!');

      if (esAdminPrincipal || esAdminSecundario) {
        alert('Credenciales de demostración correctas. El archivo original no incluye un panel de administración.');
      } else {
        if (alertaError) {
          alertaError.classList.remove('oculto');
          alertaError.textContent = "Credenciales de administración incorrectas o no autorizadas.";
        }
      }
    });
  }

});
