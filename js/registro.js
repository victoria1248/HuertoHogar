/* ==========================================================================
   🛡️ LÓGICA DE ACCESO ADMINISTRATIVO
   Archivo: js/admin.js
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       SECCIÓN 1: CONFIGURACIÓN Y DOMINIOS PERMITIDOS
       ========================================================================== */
    const DOMINIOS_PERMITIDOS = [
      '@duocuc.cl',
      '@gmail.com',
      '@hotmail.com',
      '@yahoo.com',
      '@outlook.com',
      '@outlook.cl',
      '@icloud.com'
    ];

    /* ==========================================================================
       SECCIÓN 2: MOSTRAR / OCULTAR CONTRASEÑA
       ========================================================================== */
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

    /* ==========================================================================
       SECCIÓN 3: FORMULARIO DE LOGIN DE ADMINISTRADOR
       ========================================================================== */
    const formAdminLogin = document.getElementById('form-admin-login');

    if (formAdminLogin) {
      formAdminLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        // 3.1 Limpiar mensajes de error
        const errCorreo = document.getElementById('err-admin-correo');
        const errPass = document.getElementById('err-admin-password');
        const alertaError = document.getElementById('admin-error-general');

        if (errCorreo) errCorreo.textContent = '';
        if (errPass) errPass.textContent = '';
        if (alertaError) alertaError.classList.add('oculto');

        // 3.2 Obtener datos del formulario
        const inputCorreo = document.getElementById('admin-correo');
        const correo = inputCorreo ? inputCorreo.value.trim() : '';
        const password = passInput ? passInput.value : '';

        let esValido = true;

        // 3.3 Validación de correo requerido y dominio permitido
        if (correo === '') {
          if (errCorreo) errCorreo.textContent = 'Ingrese su correo de administración.';
          esValido = false;
        } else {
          const correoValido = DOMINIOS_PERMITIDOS.some(dominio =>
            correo.toLowerCase().endsWith(dominio)
          );

          if (!correoValido) {
            if (errCorreo) errCorreo.textContent = 'El correo debe utilizar un dominio válido (@gmail.com, @duocuc.cl, etc.).';
            esValido = false;
          }
        }

        // 3.4 Validación de contraseña
        if (password === '') {
          if (errPass) errPass.textContent = 'Ingrese su contraseña de administración.';
          esValido = false;
        }

        if (!esValido) return;

        // 3.5 Cargar administradores registrados en localStorage
        let adminsGuardados = [];
        try {
          const datos = localStorage.getItem('administradores_huerto');
          if (datos) {
            adminsGuardados = JSON.parse(datos);
          }
        } catch (err) {
          adminsGuardados = [];
        }

        // 3.6 Buscar cuenta registrada
        const adminRegistrado = adminsGuardados.find(
          admin => admin.correo.toLowerCase() === correo.toLowerCase()
        );

        // 3.7 Validar estado de la cuenta
        if (adminRegistrado && adminRegistrado.estado === 'suspendido') {
          if (alertaError) {
            alertaError.classList.remove('oculto');
            alertaError.textContent = 'Cuenta actualmente suspendida por revisión corporativa.';
          }
          return;
        }

        // 3.8 Validar credenciales (principales por defecto o registradas)
        const esAdminPrincipal = (correo.toLowerCase() === 'admin@huertohogar.cl' && password === 'Admin123!');
        const esAdminSecundario = (correo.toLowerCase() === 'admin@gmail.com' && password === 'Admin123!');
        const esClaveValida = adminRegistrado && adminRegistrado.clave === password;

        if (esAdminPrincipal || esAdminSecundario || esClaveValida) {
          try {
            sessionStorage.setItem(
              'sesion_admin_huerto',
              JSON.stringify({ correo: correo, rol: 'admin' })
            );
          } catch (err) {}

          window.location.href = 'dashbord.html';
        } else {
          if (alertaError) {
            alertaError.classList.remove('oculto');
            alertaError.textContent = 'Correo o contraseña de administrador incorrectos o no autorizados.';
          }
        }
      });
    }
  });
})();
