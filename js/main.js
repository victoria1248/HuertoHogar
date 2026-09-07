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
       2. CONTROL DE SESIÓN DE USUARIO
       ---------------------------------------------------------------------- */
    try {
        const sesion = JSON.parse(sessionStorage.getItem('sesion_huerto') || 'null');
        const enlacePerfil = document.querySelector('.header-icons a[href="login.html"]');

        if (sesion && enlacePerfil) {
            enlacePerfil.title = `Sesión activa de ${sesion.nombre}. Clic para cerrar sesión`;
            const imagenPerfil = enlacePerfil.querySelector('img');
            if (imagenPerfil) imagenPerfil.alt = 'Cerrar sesión';

            enlacePerfil.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('sesion_huerto');
                window.location.href = 'login.html';
            });
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
