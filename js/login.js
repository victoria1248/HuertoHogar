/* ==========================================================================
   🔑 LÓGICA DE INICIO DE SESIÓN DE USUARIOS (js/login.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mostrar y ocultar contraseña (ojo 👁)
  const togglePass = document.getElementById('toggle-login-pass');
  const passInput = document.getElementById('login-password');

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

  // 2. Formulario de Login
  const formLogin = document.getElementById('form-login');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar errores
      document.getElementById('err-login-correo').textContent = '';
      document.getElementById('err-login-password').textContent = '';
      const alertaError = document.getElementById('login-error-general');
      if (alertaError) alertaError.classList.add('oculto');

      const correo = document.getElementById('login-correo').value.trim();
      const password = passInput.value;

      let esValido = true;

      if (correo === '') {
        document.getElementById('err-login-correo').textContent = 'Ingrese su correo.';
        esValido = false;
      }

      if (password === '') {
        document.getElementById('err-login-password').textContent = 'Ingrese su contraseña.';
        esValido = false;
      }

      if (!esValido) return;

      /* ----------------------------------------------------------------------
         2.1 VERIFICACIÓN DE CREDENCIALES E INICIO DE SESIÓN
         ¿Para qué sirve?: Carga los usuarios registrados en localStorage, los compara
         con los datos ingresados y, si coinciden, guarda la sesión en el navegador
         ('sesion_huerto') y redirige a la página principal.
         ---------------------------------------------------------------------- */
      // Cargar lista de usuarios guardados en el navegador
      let usuarios = JSON.parse(localStorage.getItem('usuarios_huerto') || '[]');
      const demo = [
        {
          nombre: "Estudiante Demo",
          correo: "estudiante@gmail.com",
          clave: "Clave123!"
        }
      ];

      usuarios = usuarios.concat(demo);
      
      // Buscar si coinciden el correo y la contraseña ingresada
      const usuarioEncontrado = usuarios.find(u => 
        u.correo.toLowerCase() === correo.toLowerCase() && u.clave === password
      );

      // Si las credenciales son válidas, guardar la sesión activa
      if (usuarioEncontrado) {
        const sesionData = JSON.stringify({ nombre: usuarioEncontrado.nombre, correo: usuarioEncontrado.correo });
        try { 
          sessionStorage.setItem("sesion_huerto", sesionData); 
          localStorage.setItem("sesion_huerto", sesionData); 
        } catch { 
          alert("El navegador no permite guardar la sesión. Abre el proyecto con Live Server."); 
          return; 
        }
        window.location.href = "index.html";
      } else {
        if (alertaError) {
          alertaError.classList.remove('oculto');
          alertaError.textContent = "Correo o contraseña incorrectos";
        }
      }
    });
  }

});
