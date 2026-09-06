/* ==========================================================================
   🛡️ LÓGICA DEL DASHBOARD DE ADMINISTRACIÓN (js/dashboard.js)
   Este script maneja:
   1. Menú lateral desplegable (3 rayitas) de izquierda a derecha.
   2. Agregar nuevos correos y contraseñas de administradores.
   3. Mostrar y gestionar la lista de administradores registrados.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     SECCIÓN 1: MENÚ LATERAL DESPLEGABLE (3 RAYITAS)
     ========================================================================== */
  const btnHamburguesa = document.querySelector('.menu-hamburguesa');
  const sidebar = document.querySelector('.sidebar');

  // Crear un fondo oscuro para cuando el menú se abre en pantallas móviles o cuando se despliega
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  // Función para alternar el menú lateral
  function alternarSidebar() {
    if (sidebar) {
      sidebar.classList.toggle('abierto');
      overlay.classList.toggle('activo');
    }
  }

  // Evento al hacer clic en el botón de 3 rayitas (☰)
  if (btnHamburguesa) {
    btnHamburguesa.addEventListener('click', (e) => {
      e.stopPropagation();
      alternarSidebar();
    });
  }

  // Cerrar el menú si se hace clic en el fondo oscuro
  overlay.addEventListener('click', () => {
    if (sidebar) sidebar.classList.remove('abierto');
    overlay.classList.remove('activo');
  });

  // Cerrar el menú al hacer clic en una opción del menú lateral
  if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('abierto');
        overlay.classList.remove('activo');

        // Si se seleccionó 'Agregar Admin', enfocar el campo de correo
        const href = link.getAttribute('href') || '';
        if (href.includes('seccion-agregar-admin')) {
          setTimeout(() => {
            const inputCorreo = document.getElementById('nuevo-admin-correo');
            if (inputCorreo) inputCorreo.focus();
          }, 300);
        }
      });
    });
  }


  /* ==========================================================================
     SECCIÓN 2: REGISTRO Y GESTIÓN DE NUEVOS ADMINISTRADORES
     ========================================================================== */
  
  // Función helper para obtener administradores desde localStorage
  function obtenerAdminsGuardados() {
    try {
      const datos = localStorage.getItem('administradores_huerto');
      return datos ? JSON.parse(datos) : [];
    } catch (e) {
      return [];
    }
  }

  // Función helper para guardar administradores en localStorage
  function guardarAdmins(listaAdmins) {
    localStorage.setItem('administradores_huerto', JSON.stringify(listaAdmins));
  }

  // Renderizar la tabla o lista de administradores agregados
  const tbodyAdmins = document.getElementById('tabla-admins-body');
  
  function renderizarListaAdmins() {
    if (!tbodyAdmins) return;

    const admins = obtenerAdminsGuardados();
    tbodyAdmins.innerHTML = '';

    if (admins.length === 0) {
      tbodyAdmins.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: #777; padding: 15px;">
            No hay administradores adicionales registrados.
          </td>
        </tr>
      `;
      return;
    }

    admins.forEach((admin, index) => {
      const esSuspendido = admin.estado === 'suspendido';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${admin.correo}</strong></td>
        <td>
          ${esSuspendido 
            ? '<span style="background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">🔴 Suspendida</span>' 
            : '<span style="background: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">🟢 Activa</span>'
          }
        </td>
        <td><code>••••••••</code></td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
            ${esSuspendido 
              ? `<button class="btn-reactivar-admin" data-index="${index}" style="background: #27ae60; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">
                  Reactivar cuenta
                </button>`
              : `<button class="btn-suspender-admin" data-index="${index}" style="background: #e67e22; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">
                  Suspender cuenta
                </button>`
            }
            <button class="btn-eliminar-admin" data-index="${index}" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 11px;">
              Eliminar
            </button>
          </div>
        </td>
      `;
      tbodyAdmins.appendChild(tr);
    });

    // Agregar evento a los botones de suspender
    document.querySelectorAll('.btn-suspender-admin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cambiarEstadoAdmin(index, 'suspendido');
      });
    });

    // Agregar evento a los botones de reactivar
    document.querySelectorAll('.btn-reactivar-admin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cambiarEstadoAdmin(index, 'activo');
      });
    });

    // Agregar evento a los botones de eliminar
    document.querySelectorAll('.btn-eliminar-admin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const indexAEliminar = parseInt(e.target.getAttribute('data-index'));
        eliminarAdmin(indexAEliminar);
      });
    });
  }

  // Función para cambiar estado de un administrador (activo / suspendido)
  function cambiarEstadoAdmin(index, nuevoEstado) {
    let admins = obtenerAdminsGuardados();
    if (admins[index]) {
      admins[index].estado = nuevoEstado;
      guardarAdmins(admins);
      renderizarListaAdmins();
    }
  }

  // Función para eliminar un administrador de localStorage
  function eliminarAdmin(index) {
    let admins = obtenerAdminsGuardados();
    admins.splice(index, 1);
    guardarAdmins(admins);
    renderizarListaAdmins();
  }

  // Manejar el formulario para agregar nuevo admin
  const formNuevoAdmin = document.getElementById('form-agregar-admin');
  const mensajeErrorAdmin = document.getElementById('mensaje-error-agregar-admin');
  const mensajeExitoAdmin = document.getElementById('mensaje-exito-agregar-admin');

  if (formNuevoAdmin) {
    formNuevoAdmin.addEventListener('submit', (e) => {
      e.preventDefault();

      if (mensajeErrorAdmin) mensajeErrorAdmin.style.display = 'none';
      if (mensajeExitoAdmin) mensajeExitoAdmin.style.display = 'none';

      const inputCorreo = document.getElementById('nuevo-admin-correo');
      const inputClave = document.getElementById('nuevo-admin-clave');

      const correo = inputCorreo.value.trim();
      const clave = inputClave.value;

      if (!correo || !clave) {
        if (mensajeErrorAdmin) {
          mensajeErrorAdmin.textContent = 'Por favor complete todos los campos.';
          mensajeErrorAdmin.style.display = 'block';
        }
        return;
      }

      // Validar que no exista ya ese correo
      const admins = obtenerAdminsGuardados();
      const correoExistente = admins.some(a => a.correo.toLowerCase() === correo.toLowerCase()) ||
                              correo.toLowerCase() === 'admin@huertohogar.cl' ||
                              correo.toLowerCase() === 'admin@gmail.com';

      if (correoExistente) {
        if (mensajeErrorAdmin) {
          mensajeErrorAdmin.textContent = 'Este correo ya tiene permisos de administrador.';
          mensajeErrorAdmin.style.display = 'block';
        }
        return;
      }

      // Guardar el nuevo administrador (por defecto activo)
      admins.push({ correo: correo, clave: clave, estado: 'activo' });
      guardarAdmins(admins);

      // Limpiar formulario y mostrar éxito
      inputCorreo.value = '';
      inputClave.value = '';

      if (mensajeExitoAdmin) {
        mensajeExitoAdmin.textContent = `Administrador (${correo}) agregado correctamente. Ahora puede iniciar sesión.`;
        mensajeExitoAdmin.style.display = 'block';
      }

      renderizarListaAdmins();
    });
  }

  // Renderizar la lista al cargar la página
  renderizarListaAdmins();

});
