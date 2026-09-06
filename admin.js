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

      // ==========================================================================
      // VERIFICACIÓN DE CREDENCIALES DE ADMINISTRACIÓN
      // ==========================================================================
      // VERIFICACIÓN DE CREDENCIALES Y ESTADO DE SUSPENSIÓN DE ADMINISTRACIÓN
      // ==========================================================================
      
      // 1. Cargar administradores registrados en localStorage
      let adminsGuardados = [];
      try {
        const datos = localStorage.getItem('administradores_huerto');
        if (datos) adminsGuardados = JSON.parse(datos);
      } catch (e) {
        adminsGuardados = [];
      }

      // Buscar si existe la cuenta ingresada
      const adminRegistrado = adminsGuardados.find(a => a.correo.toLowerCase() === correo.toLowerCase());

      // Si la cuenta existe pero se encuentra suspendida
      if (adminRegistrado && adminRegistrado.estado === 'suspendido') {
        if (alertaError) {
          alertaError.classList.remove('oculto');
          alertaError.textContent = "Cuenta actualmente suspendida por revisión corporativa.";
        }
        return;
      }

      // 2. Credenciales por defecto
      const esAdminPrincipal = (correo.toLowerCase() === 'admin@huertohogar.cl' && password === 'Admin123!');
      const esAdminSecundario = (correo.toLowerCase() === 'admin@gmail.com' && password === 'Admin123!');

      // 3. Credenciales de administradores registrados (solo si la contraseña coincide y no está suspendida)
      const esClaveValida = adminRegistrado && adminRegistrado.clave === password;

      // Si las credenciales son válidas (por defecto o registradas activas)
      if (esAdminPrincipal || esAdminSecundario || esClaveValida) {
        // Guardar sesión del administrador
        try {
          sessionStorage.setItem('sesion_admin_huerto', JSON.stringify({ correo: correo, rol: 'admin' }));
        } catch (e) {}

        // Redirigir al dashboard de administración
        window.location.href = 'dashbord.html';
      } else {
        if (alertaError) {
          alertaError.classList.remove('oculto');
          alertaError.textContent = "Correo o contraseña de administrador incorrectos o no autorizados.";
        }
      }
    });
  }

});
