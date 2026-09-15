/* ==========================================================
   AGREGAR ADMINISTRADORES - HUERTOHOGAR
   Archivo: js/agregar_admin.js
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agregar-admin');
    if (!form) return;

    const correoInput = document.getElementById('nuevo-admin-correo');
    const claveInput = document.getElementById('nuevo-admin-clave');
    const errorBox = document.getElementById('mensaje-error-agregar-admin');
    const exitoBox = document.getElementById('mensaje-exito-agregar-admin');
    const tabla = document.getElementById('tabla-admins-body');

    // Acepta correos como gmail.com, hotmail.com, empresa.cl, empresa.com, etc.
    // Exige texto antes del @, compañía después del @ y terminación .cl o .com.
    const correoValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(cl|com)$/i;

    const mostrarError = (mensaje) => {
        errorBox.textContent = mensaje;
        errorBox.style.display = 'block';
        exitoBox.textContent = '';
        exitoBox.style.display = 'none';
    };

    const mostrarExito = (mensaje) => {
        exitoBox.textContent = mensaje;
        exitoBox.style.display = 'block';
        errorBox.textContent = '';
        errorBox.style.display = 'none';
    };

    const obtenerAdmins = () => {
        try {
            const datos = JSON.parse(localStorage.getItem('administradores_huerto') || '[]');
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    };

    const guardarAdmins = (admins) => {
        localStorage.setItem('administradores_huerto', JSON.stringify(admins));
    };

    const pintarTabla = () => {
        if (!tabla) return;
        const admins = obtenerAdmins();
        tabla.innerHTML = '';

        if (admins.length === 0) {
            tabla.innerHTML = '<tr><td colspan="4">No hay administradores registrados.</td></tr>';
            return;
        }

        admins.forEach((admin, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${admin.correo}</td>
                <td>${admin.estado || 'activo'}</td>
                <td>••••••••</td>
                <td style="text-align:center;"><button type="button" class="btn-eliminar-admin" data-index="${index}">Eliminar</button></td>
            `;
            tabla.appendChild(fila);
        });

        tabla.querySelectorAll('.btn-eliminar-admin').forEach((boton) => {
            boton.addEventListener('click', () => {
                const adminsActuales = obtenerAdmins();
                adminsActuales.splice(Number(boton.dataset.index), 1);
                guardarAdmins(adminsActuales);
                pintarTabla();
                mostrarExito('Administrador eliminado correctamente.');
            });
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const correo = correoInput.value.trim().toLowerCase();
        const clave = claveInput.value;

        if (!correoValido.test(correo)) {
            mostrarError('Ingrese un correo válido, por ejemplo: admin@gmail.com, admin@hotmail.com o admin@empresa.cl.');
            return;
        }

        if (clave.length < 8) {
            mostrarError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        const admins = obtenerAdmins();
        const existe = admins.some(admin => admin.correo.toLowerCase() === correo);

        if (existe) {
            mostrarError('Este correo ya está registrado como administrador.');
            return;
        }

        admins.push({
            id: Date.now(),
            correo,
            clave,
            estado: 'activo',
            fechaRegistro: new Date().toISOString()
        });

        try {
            guardarAdmins(admins);
            form.reset();
            mostrarExito('Administrador agregado correctamente.');
            pintarTabla();
        } catch (error) {
            mostrarError('No se pudo guardar el administrador.');
        }
    });

    pintarTabla();
});
