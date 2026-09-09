/* ==========================================================================
   📝 LÓGICA DE REGISTRO DE USUARIOS (js/registro.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mostrar y ocultar contraseña (ojo 👁)
  const togglePass = document.getElementById('toggle-reg-pass');
  const passInput = document.getElementById('reg-password');
  
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

  const toggleConfirm = document.getElementById('toggle-reg-confirm-pass');
  const confirmInput = document.getElementById('reg-confirm-password');

  if (toggleConfirm && confirmInput) {
    toggleConfirm.addEventListener('click', () => {
      if (confirmInput.type === 'password') {
        confirmInput.type = 'text';
        toggleConfirm.textContent = '🙈';
      } else {
        confirmInput.type = 'password';
        toggleConfirm.textContent = '👁';
      }
    });
  }

  // 2. Medidor simple de fuerza de contraseña
  const barraFuerza = document.getElementById('barra-fuerza');
  const nivelTexto = document.getElementById('nivel-fuerza');

  if (passInput && barraFuerza && nivelTexto) {
    passInput.addEventListener('input', () => {
      const clave = passInput.value;

      if (clave.length === 0) {
        barraFuerza.style.width = '0%';
        nivelTexto.textContent = 'Débil';
        nivelTexto.style.color = '#e74c3c';
      } else if (clave.length < 6) {
        barraFuerza.style.width = '30%';
        barraFuerza.style.backgroundColor = '#e74c3c';
        nivelTexto.textContent = 'Débil';
        nivelTexto.style.color = '#e74c3c';
      } else if (clave.length < 8) {
        barraFuerza.style.width = '65%';
        barraFuerza.style.backgroundColor = '#f39c12';
        nivelTexto.textContent = 'Aceptable';
        nivelTexto.style.color = '#f39c12';
      } else {
        barraFuerza.style.width = '100%';
        barraFuerza.style.backgroundColor = '#2ecc71';
        nivelTexto.textContent = 'Fuerte';
        nivelTexto.style.color = '#2ecc71';
      }
    });
  }

  // 3. Formulario de Registro
  const formRegistro = document.getElementById('form-registro');

  if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar errores
      document.getElementById('err-nombre').textContent = '';
      document.getElementById('err-edad').textContent = '';
      document.getElementById('err-correo').textContent = '';
      document.getElementById('err-password').textContent = '';
      document.getElementById('err-confirm-pass').textContent = '';

      const nombre = document.getElementById('reg-nombre').value.trim();
      const correo = document.getElementById('reg-correo').value.trim();
      const password = passInput.value;
      const confirmPassword = confirmInput.value;

      let esValido = true;

      // Validar Nombre
      if (nombre === '') {
        document.getElementById('err-nombre').textContent = 'El nombre es obligatorio.';
        esValido = false;
      }

      if (edad === '') {
        document.getElementById('err-edad').textContent = 'la edad es obligatorio.';
        esValido = false;
      }

      // Validar Correo @gmail.com
      if (correo === '') {
        document.getElementById('err-correo').textContent = 'El correo es obligatorio.';
        esValido = false;
      } else if (!correo.toLowerCase().endsWith('@gmail.com')) {
        document.getElementById('err-correo').textContent = 'El correo debe ser @gmail.com';
        esValido = false;
      }

      // Validar Contraseña
      if (password === '') {
        document.getElementById('err-password').textContent = 'La contraseña es obligatoria.';
        esValido = false;
      } else if (password.length < 8) {
        document.getElementById('err-password').textContent = 'Debe tener al menos 8 caracteres.';
        esValido = false;
      }

      // Validar Confirmación
      if (confirmPassword !== password) {
        document.getElementById('err-confirm-pass').textContent = 'Las contraseñas no coinciden.';
        esValido = false;
      }

      /* ----------------------------------------------------------------------
         3.1 GUARDAR USUARIO E INICIAR SESIÓN AUTOMÁTICAMENTE
         ¿Para qué sirve?: Al pasar las validaciones, guarda los datos del nuevo usuario
         en el arreglo de localStorage ('usuarios_huerto'), establece la sesión activa 
         ('sesion_huerto') y redirige a la página principal con el usuario logueado.
         ---------------------------------------------------------------------- */
      if (esValido) {
        // Leer la lista de usuarios ya registrados en localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios_huerto') || '[]');

        // Verificar si ya existe un usuario registrado con el mismo correo
        const existe = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase());
        if (existe) {
          document.getElementById('err-correo').textContent = 'Este correo ya está registrado.';
          return;
        }

        // Agregar el nuevo usuario al arreglo y guardarlo en localStorage
        usuarios.push({ nombre, correo, clave: password });
        try { 
          localStorage.setItem('usuarios_huerto', JSON.stringify(usuarios)); 
        } catch { 
          document.getElementById('err-correo').textContent = 'El navegador no permite guardar datos. Abre el proyecto con Live Server.'; 
          return; 
        }

        // Iniciar sesión automáticamente guardando los datos del usuario en sessionStorage y localStorage
        const sesionData = JSON.stringify({ nombre: nombre, correo: correo });
        try {
          sessionStorage.setItem('sesion_huerto', sesionData);
          localStorage.setItem('sesion_huerto', sesionData);
        } catch (e) {
          console.error('Error guardando la sesión:', e);
        }

        alert(`¡Cuenta creada exitosamente! Bienvenido(a), ${nombre}.`);
        window.location.href = 'index.html';
      }
    });
  }

});
