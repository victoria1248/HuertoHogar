/* ==========================================================================
   HUERTO HOGAR - FUNCIONALIDADES GENERALES (js/main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. INVENTARIO / INSIGNIA DEL CARRITO EN EL ENCABEZADO
       ---------------------------------------------------------------------- */
    function actualizarInsigniaCarrito() {
        try {
            const carrito = JSON.parse(localStorage.getItem('carrito_huerto') || '[]');
            const totalCantidad = carrito.reduce((total, prod) => total + (Number(prod.cantidad) || 1), 0);

            const enlacesCarrito = document.querySelectorAll('.header-icons a[href="pago_envio.html"], .carrito a, a[title="Pago y envío"]');

            enlacesCarrito.forEach(enlace => {
                let contador = enlace.querySelector('.cart-badge');

                if (totalCantidad > 0) {
                    if (!contador) {
                        contador = document.createElement('span');
                        contador.className = 'cart-badge';
                        contador.style.position = 'absolute';
                        contador.style.top = '-6px';
                        contador.style.right = '-8px';
                        contador.style.backgroundColor = '#e74c3c';
                        contador.style.color = '#ffffff';
                        contador.style.borderRadius = '50%';
                        contador.style.padding = '2px 6px';
                        contador.style.fontSize = '11px';
                        contador.style.fontWeight = 'bold';
                        contador.style.border = '1.5px solid #ffffff';
                        contador.style.lineHeight = '1';

                        enlace.style.position = 'relative';
                        enlace.style.display = 'inline-block';
                        enlace.appendChild(contador);
                    }
                    contador.textContent = totalCantidad;
                } else if (contador) {
                    contador.remove();
                }
            });
        } catch (error) {
            console.error('Error al actualizar el contador del carrito:', error);
        }
    }

    // Ejecutar al cargar la página
    actualizarInsigniaCarrito();

    // Escuchar eventos de actualización del carrito
    window.addEventListener('carritoActualizado', actualizarInsigniaCarrito);


    /* ----------------------------------------------------------------------
       2. CONTROL DE SESIÓN DE USUARIO EN EL ENCABEZADO
       ¿Para qué sirve?: Revisa si hay un usuario logueado en sessionStorage/localStorage.
       Si existe sesión, reemplaza el icono de perfil por el saludo "👤 Nombre"
       y un botón de "Cerrar sesión" que limpia los datos de la sesión.
       ---------------------------------------------------------------------- */
    try {
        // Leer los datos de sesión activa guardados en el navegador
        const datosSesion = sessionStorage.getItem('sesion_huerto') || localStorage.getItem('sesion_huerto');
        const sesion = datosSesion ? JSON.parse(datosSesion) : null;
        const enlacePerfil = document.querySelector('.header-icons a[href="login.html"], .header-icons a[title="Mi cuenta"]');

        // Si hay usuario autenticado, renderizar nombre y botón de cerrar sesión
        if (sesion && sesion.nombre && enlacePerfil) {
            const contenedorUsuario = document.createElement('div');
            contenedorUsuario.className = 'user-session-info';
            contenedorUsuario.innerHTML = `
                <span class="user-greeting">👤 <strong>${sesion.nombre}</strong></span>
                <button type="button" id="btn-cerrar-sesion" class="btn-logout" title="Cerrar sesión">Cerrar sesión</button>
            `;

            enlacePerfil.replaceWith(contenedorUsuario);

            // Evento para cerrar la sesión al pulsar el botón
            const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
            if (btnCerrarSesion) {
                btnCerrarSesion.addEventListener('click', () => {
                    sessionStorage.removeItem('sesion_huerto');
                    localStorage.removeItem('sesion_huerto');
                    alert('Has cerrado sesión correctamente.');
                    window.location.reload();
                });
            }
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
    }


    /* ----------------------------------------------------------------------
       3. ENLACES Y BOTONES VACÍOS DE LA MAQUETA
       ---------------------------------------------------------------------- */
    // Enlaces sin destino
    document.querySelectorAll('a[href="#"]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Esta sección estará disponible próximamente.');
        });
    });

    // Botón de inicio con Google
    document.querySelectorAll('.btn-google').forEach(boton => {
        boton.addEventListener('click', () => {
            alert('El inicio de sesión con Google aún no está configurado. Por favor utiliza el formulario.');
        });
    });


    /* ----------------------------------------------------------------------
       4. FORMULARIO DE CONTACTO
       ---------------------------------------------------------------------- */
    const formContacto = document.querySelector('.formulario-contacto form');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!formContacto.reportValidity()) return;

            const nombre = document.getElementById('nombre')?.value || '';
            const correo = document.getElementById('correo')?.value || '';
            const asunto = document.getElementById('asunto')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value || '';

            const cuerpo = `${mensaje}\n\nDe: ${nombre}\nCorreo: ${correo}`;
            window.location.href = `mailto:info@huertohogar.cl?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        });
    }

});
