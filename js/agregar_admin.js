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


    // ==========================================================
    // DOMINIOS DE CORREO PERMITIDOS
    // ==========================================================

    const dominiosPermitidos = [
        'gmail.com',
        'duocuc.cl',
        'huertohogar.cl'
    ];


    // ==========================================================
    // MOSTRAR ERROR
    // ==========================================================

    const mostrarError = (mensaje) => {

        errorBox.textContent = mensaje;
        errorBox.style.display = 'block';

        exitoBox.textContent = '';
        exitoBox.style.display = 'none';
    };


    // ==========================================================
    // MOSTRAR ÉXITO
    // ==========================================================

    const mostrarExito = (mensaje) => {

        exitoBox.textContent = mensaje;
        exitoBox.style.display = 'block';

        errorBox.textContent = '';
        errorBox.style.display = 'none';
    };


    // ==========================================================
    // VALIDAR CORREO
    // ==========================================================

    const validarCorreo = (correo) => {

        // Separar el correo por el @
        const partes = correo.split('@');

        // Debe existir solamente un @
        if (partes.length !== 2) {
            return false;
        }

        const usuario = partes[0];
        const dominio = partes[1];

        // Debe existir algo antes del @
        if (usuario.trim() === '') {
            return false;
        }

        // Revisar si el dominio está permitido
        return dominiosPermitidos.includes(dominio);
    };


    // ==========================================================
    // OBTENER ADMINISTRADORES
    // ==========================================================

    const obtenerAdmins = () => {

        try {

            const datos = JSON.parse(
                localStorage.getItem('administradores_huerto') || '[]'
            );

            return Array.isArray(datos) ? datos : [];

        } catch (error) {

            return [];

        }
    };


    // ==========================================================
    // GUARDAR ADMINISTRADORES
    // ==========================================================

    const guardarAdmins = (admins) => {

        localStorage.setItem(
            'administradores_huerto',
            JSON.stringify(admins)
        );
    };


    // ==========================================================
    // MOSTRAR ADMINISTRADORES
    // ==========================================================

    const pintarTabla = () => {

        if (!tabla) return;

        const admins = obtenerAdmins();

        tabla.innerHTML = '';

        if (admins.length === 0) {

            tabla.innerHTML =
                '<tr><td colspan="4">No hay administradores registrados.</td></tr>';

            return;
        }


        admins.forEach((admin, index) => {

            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${admin.correo}</td>

                <td>${admin.estado || 'activo'}</td>

                <td>••••••••</td>

                <td style="text-align:center;">
                    <button
                        type="button"
                        class="btn-eliminar-admin"
                        data-index="${index}">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });


        // Botones eliminar
        tabla.querySelectorAll('.btn-eliminar-admin')
            .forEach((boton) => {

                boton.addEventListener('click', () => {

                    const adminsActuales = obtenerAdmins();

                    adminsActuales.splice(
                        Number(boton.dataset.index),
                        1
                    );

                    guardarAdmins(adminsActuales);

                    pintarTabla();

                    mostrarExito(
                        'Administrador eliminado correctamente.'
                    );
                });
            });
    };


    // ==========================================================
    // AGREGAR ADMINISTRADOR
    // ==========================================================

    form.addEventListener('submit', (event) => {

        event.preventDefault();


        const correo =
            correoInput.value.trim().toLowerCase();

        const clave =
            claveInput.value;


        // ======================================================
        // 1. PRIMERO VALIDAR EL CORREO
        // ======================================================

        if (!validarCorreo(correo)) {

            mostrarError(
                'Correo no autorizado. Solo se permiten @gmail.com, @duocuc.cl y @huertohogar.cl.'
            );

            correoInput.focus();

            // IMPORTANTE:
            // Se detiene aquí y NO se agrega el administrador.
            return;
        }


        // ======================================================
        // 2. VALIDAR CONTRASEÑA
        // ======================================================

        if (clave.length < 8) {

            mostrarError(
                'La contraseña debe tener al menos 8 caracteres.'
            );

            claveInput.focus();

            return;
        }


        // ======================================================
        // 3. REVISAR SI YA EXISTE
        // ======================================================

        const admins = obtenerAdmins();

        const existe = admins.some(
            admin => admin.correo.toLowerCase() === correo
        );


        if (existe) {

            mostrarError(
                'Este correo ya está registrado como administrador.'
            );

            return;
        }


        // ======================================================
        // 4. SOLO SI PASÓ TODAS LAS VALIDACIONES SE AGREGA
        // ======================================================

        admins.push({

            id: Date.now(),

            correo: correo,

            clave: clave,

            estado: 'activo',

            fechaRegistro: new Date().toISOString()

        });


        // ======================================================
        // 5. GUARDAR
        // ======================================================

        try {

            guardarAdmins(admins);

            form.reset();

            mostrarExito(
                'Correo válido. Administrador agregado correctamente.'
            );

            pintarTabla();

        } catch (error) {

            mostrarError(
                'No se pudo guardar el administrador.'
            );
        }
    });


    // Mostrar tabla al cargar
    pintarTabla();

});
