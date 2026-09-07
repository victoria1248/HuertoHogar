/* ==========================================================================
   HUERTO HOGAR - LÓGICA DE PRODUCTOS (js/producto.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. FILTRADO DE PRODUCTOS POR CATEGORÍA EN LA URL
       ---------------------------------------------------------------------- */
    const parametros = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametros.get('categoria');
    const listaProductos = document.querySelectorAll('.producto');

    // Función auxiliar para quitar tildes y convertir a minúsculas
    function normalizarTexto(texto) {
        return (texto || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    if (categoriaSeleccionada) {
        const catBuscada = normalizarTexto(categoriaSeleccionada);

        listaProductos.forEach(prod => {
            const catProducto = normalizarTexto(prod.dataset.categoria || '');
            const coincide = !catProducto || catProducto === catBuscada || catBuscada === 'todos';
            prod.style.display = coincide ? '' : 'none';
        });

        // Actualizar el título de la página si corresponde
        const tituloPagina = document.querySelector('.titulo-productos, h1');
        if (tituloPagina && tituloPagina.textContent.toLowerCase().includes('producto')) {
            tituloPagina.textContent = `Productos: ${categoriaSeleccionada}`;
        }
    }


    /* ----------------------------------------------------------------------
       2. AGREGAR PRODUCTOS AL CARRITO (SIN REDIRIGIR)
       ---------------------------------------------------------------------- */
    const botonesCarrito = document.querySelectorAll('.boton-carrito');

    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();

            const nombreProducto = boton.dataset.producto;
            const precioProducto = Number(boton.dataset.precio);

            if (!nombreProducto || !precioProducto) return;

            // Obtener el carrito actual de localStorage
            let carrito = [];
            try {
                carrito = JSON.parse(localStorage.getItem('carrito_huerto') || '[]');
            } catch (err) {
                carrito = [];
            }

            // Verificar si el producto ya existe en el carrito
            const indiceExistente = carrito.findIndex(item => item.nombre === nombreProducto);

            if (indiceExistente >= 0) {
                carrito[indiceExistente].cantidad = (carrito[indiceExistente].cantidad || 1) + 1;
            } else {
                carrito.push({
                    nombre: nombreProducto,
                    precio: precioProducto,
                    cantidad: 1
                });
            }

            // Guardar el carrito actualizado
            localStorage.setItem('carrito_huerto', JSON.stringify(carrito));

            // Disparar evento para actualizar la insignia del carrito
            window.dispatchEvent(new Event('carritoActualizado'));

            // Retroalimentación visual en el botón
            const textoOriginal = boton.textContent;
            boton.textContent = '✓ ¡Agregado!';
            boton.style.backgroundColor = '#2ecc71';
            boton.style.color = '#ffffff';

            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = '';
                boton.style.color = '';
            }, 1200);
        });
    });

});
