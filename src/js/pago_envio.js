/* ==========================================================================
   HUERTO HOGAR - LÓGICA DE PAGO Y ENVÍO (js/pago_envio.js)
   ========================================================================== */

// Base de datos de Regiones y Comunas principales de Chile
const DATOS_CHILE = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
  "Región de Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
  "Región de Atacama": ["Copiapó", "Vallenar", "Chañaral", "Caldera"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Quillota", "Los Andes", "San Antonio"],
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "Ñuñoa", "La Florida", "San Bernardo"],
  "Región del O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Pichilemu"],
  "Región del Maule": ["Talca", "Curicó", "Linares", "Constitución"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Quirihue"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"],
  "Región de La Araucanía": ["Temuco", "Angol", "Villarrica", "Pucón"],
  "Región de Los Ríos": ["Valdivia", "La Unión", "Panguipulli"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"],
  "Región de Aysén": ["Coyhaique", "Puerto Aysén", "Cochrane"],
  "Región de Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------
     1. MOSTRAR Y GESTIONAR EL RESUMEN DEL CARRITO
     ---------------------------------------------------------------------- */
  const contenedorResumen = document.getElementById('info-producto-resumen');

  function renderizarResumenCarrito() {
    if (!contenedorResumen) return;

    let carrito = [];
    try {
      carrito = JSON.parse(localStorage.getItem('carrito_huerto') || '[]');
    } catch (e) {
      carrito = [];
    }

    if (carrito.length === 0) {
      contenedorResumen.innerHTML = `
        <p style="color: #666; font-style: italic; margin-bottom: 12px;">Tu carrito está vacío.</p>
        <a href="producto.html" style="color: #27ae60; text-decoration: underline; font-weight: bold;">← Ver productos</a>
      `;
      return;
    }

    let html = '<ul style="list-style: none; padding: 0; margin: 0 0 15px 0;">';
    let totalGeneral = 0;
    let totalProductosCount = 0;

    carrito.forEach((item, index) => {
      const precio = Number(item.precio) || 0;
      const cantidad = Number(item.cantidad) || 1;
      const subtotal = precio * cantidad;

      totalGeneral += subtotal;
      totalProductosCount += cantidad;

      html += `
        <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed #cbd5e1;">
          <div style="flex: 1; padding-right: 8px;">
            <strong style="color: #1e293b; font-size: 14px;">${item.nombre}</strong>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">$${precio.toLocaleString('es-CL')} c/u</div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; background: #f8fafc;">
              <button type="button" data-action="decrementar" data-index="${index}" style="border: none; background: #e2e8f0; width: 22px; height: 22px; cursor: pointer; font-weight: bold;">-</button>
              <span style="padding: 0 6px; font-size: 12px; font-weight: bold; min-width: 16px; text-align: center;">${cantidad}</span>
              <button type="button" data-action="incrementar" data-index="${index}" style="border: none; background: #e2e8f0; width: 22px; height: 22px; cursor: pointer; font-weight: bold;">+</button>
            </div>
            <span style="font-weight: bold; color: #0f172a; min-width: 60px; text-align: right; font-size: 13px;">$${subtotal.toLocaleString('es-CL')}</span>
            <button type="button" data-action="eliminar" data-index="${index}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 15px; margin-left: 2px; line-height: 1;" title="Eliminar del carrito">✕</button>
          </div>
        </li>
      `;
    });

    html += '</ul>';
    html += `
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="margin-bottom: 6px; font-size: 13px; color: #475569; display: flex; justify-content: space-between;">
          <span>Productos (${totalProductosCount}):</span>
          <strong>$${totalGeneral.toLocaleString('es-CL')}</strong>
        </p>
        <p style="margin-bottom: 6px; font-size: 13px; color: #475569; display: flex; justify-content: space-between;">
          <span>Envío:</span>
          <strong style="color: #16a34a;">Gratis</strong>
        </p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #cbd5e1;">
        <p style="font-size: 17px; font-weight: bold; color: #166534; display: flex; justify-content: space-between; margin: 0;">
          <span>Total:</span>
          <span>$${totalGeneral.toLocaleString('es-CL')}</span>
        </p>
      </div>
    `;

    contenedorResumen.innerHTML = html;
  }

  // Delegación de eventos para los botones del carrito (+, -, ✕)
  if (contenedorResumen) {
    contenedorResumen.addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-action]');
      if (!boton) return;

      const accion = boton.dataset.action;
      const index = parseInt(boton.dataset.index, 10);

      let carrito = [];
      try {
        carrito = JSON.parse(localStorage.getItem('carrito_huerto') || '[]');
      } catch (err) {
        carrito = [];
      }

      if (isNaN(index) || !carrito[index]) return;

      if (accion === 'incrementar') {
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
      } else if (accion === 'decrementar') {
        carrito[index].cantidad = (carrito[index].cantidad || 1) - 1;
        if (carrito[index].cantidad <= 0) {
          carrito.splice(index, 1);
        }
      } else if (accion === 'eliminar') {
        carrito.splice(index, 1);
      }

      localStorage.setItem('carrito_huerto', JSON.stringify(carrito));
      renderizarResumenCarrito();
      window.dispatchEvent(new Event('carritoActualizado'));
    });
  }

  // Cargar resumen inicial
  renderizarResumenCarrito();


  /* ----------------------------------------------------------------------
     2. REGIONES Y COMUNAS DINÁMICAS (CHILE)
     ---------------------------------------------------------------------- */
  const selectRegion = document.getElementById('region_envio');
  const selectComuna = document.getElementById('comuna_envio');
  const selectCiudad = document.getElementById('ciudad_envio');

  if (selectRegion && selectComuna && selectCiudad) {
    Object.keys(DATOS_CHILE).forEach(region => {
      const opt = document.createElement('option');
      opt.value = region;
      opt.textContent = region;
      selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener('change', () => {
      const regionSel = selectRegion.value;
      selectComuna.innerHTML = '<option value="">Selecciona tu comuna...</option>';
      selectCiudad.innerHTML = '<option value="">Selecciona tu ciudad...</option>';

      if (regionSel && DATOS_CHILE[regionSel]) {
        selectComuna.disabled = false;
        selectCiudad.disabled = false;

        DATOS_CHILE[regionSel].forEach(item => {
          const optComuna = document.createElement('option');
          optComuna.value = item;
          optComuna.textContent = item;
          selectComuna.appendChild(optComuna);

          const optCiudad = document.createElement('option');
          optCiudad.value = item;
          optCiudad.textContent = item;
          selectCiudad.appendChild(optCiudad);
        });
      } else {
        selectComuna.disabled = true;
        selectCiudad.disabled = true;
      }
    });
  }


  /* ----------------------------------------------------------------------
     3. SELECCIÓN TIPO DE VIVIENDA (CASA / DEPARTAMENTO)
     ---------------------------------------------------------------------- */
  const radiosVivienda = document.querySelectorAll('input[name="tipo_vivienda"]');
  const campoCasa = document.getElementById('campo-casa');
  const campoDpto = document.getElementById('campo-dpto');

  if (campoCasa && campoDpto) {
    radiosVivienda.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'casa') {
          campoCasa.classList.remove('oculto');
          campoDpto.classList.add('oculto');
        } else {
          campoCasa.classList.add('oculto');
          campoDpto.classList.remove('oculto');
        }
      });
    });
  }


  /* ----------------------------------------------------------------------
     4. SELECCIÓN MÉTODO DE PAGO (DÉBITO / CRÉDITO)
     ---------------------------------------------------------------------- */
  const cajasMetodo = document.querySelectorAll('.caja-metodo');
  const contenedorCuotas = document.getElementById('contenedor-cuotas');

  cajasMetodo.forEach(caja => {
    caja.tabIndex = 0;
    caja.setAttribute('role', 'button');
    caja.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        caja.click();
      }
    });

    caja.addEventListener('click', () => {
      cajasMetodo.forEach(c => c.classList.remove('seleccionado'));
      caja.classList.add('seleccionado');

      if (contenedorCuotas) {
        if (caja.dataset.metodo === 'credito') {
          contenedorCuotas.classList.remove('oculto');
        } else {
          contenedorCuotas.classList.add('oculto');
        }
      }
    });
  });


  /* ----------------------------------------------------------------------
     5. FORMATO Y DETECCIÓN DE MARCA DE TARJETA
     ---------------------------------------------------------------------- */
  const inputCardNumero = document.getElementById('card_numero');
  const badgeMarca = document.getElementById('card-brand-badge');

  if (inputCardNumero && badgeMarca) {
    inputCardNumero.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();

      if (v.startsWith('4')) badgeMarca.textContent = 'VISA';
      else if (/^(5[1-5]|2[2-7])/.test(v)) badgeMarca.textContent = 'MC';
      else if (/^(34|37)/.test(v)) badgeMarca.textContent = 'AMEX';
      else if (v.length > 0) badgeMarca.textContent = 'REDCOMPRA';
      else badgeMarca.textContent = '💳';
    });
  }

  // Formato MM/AA en fecha de expiración
  const inputCardExp = document.getElementById('card_exp');
  if (inputCardExp) {
    inputCardExp.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2, 4);
      e.target.value = v;
    });
  }


  /* ----------------------------------------------------------------------
     6. VALIDACIÓN Y PROCESAMIENTO DEL FORMULARIO DE PAGO
     ---------------------------------------------------------------------- */
  const formPago = document.getElementById('form-pago-completo');

  if (formPago) {
    formPago.addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');

      const nombre = document.getElementById('nombre_completo')?.value.trim() || '';
      const domicilio = document.getElementById('domicilio')?.value.trim() || '';
      const telefono = document.getElementById('telefono')?.value.trim() || '';
      const region = document.getElementById('region_envio')?.value || '';
      const comuna = document.getElementById('comuna_envio')?.value || '';
      const ciudad = document.getElementById('ciudad_envio')?.value || '';

      const cardNombre = document.getElementById('card_nombre')?.value.trim() || '';
      const cardNumero = (document.getElementById('card_numero')?.value || '').replace(/\s+/g, '');
      const cardExp = document.getElementById('card_exp')?.value.trim() || '';
      const cardCvv = document.getElementById('card_cvv')?.value.trim() || '';
      const cardZip = document.getElementById('card_zip')?.value.trim() || '';

      let esValido = true;

      if (!nombre) { document.getElementById('err-nombre_completo').textContent = 'Obligatorio.'; esValido = false; }
      if (!domicilio) { document.getElementById('err-domicilio').textContent = 'Obligatorio.'; esValido = false; }
      if (!telefono) { document.getElementById('err-telefono').textContent = 'Obligatorio.'; esValido = false; }
      if (!region) { document.getElementById('err-region_envio').textContent = 'Obligatorio.'; esValido = false; }
      if (!comuna) { document.getElementById('err-comuna_envio').textContent = 'Obligatorio.'; esValido = false; }
      if (!ciudad) { document.getElementById('err-ciudad_envio').textContent = 'Obligatorio.'; esValido = false; }

      if (!cardNombre) { document.getElementById('err-card_nombre').textContent = 'Obligatorio.'; esValido = false; }
      if (!cardNumero || cardNumero.length < 13) { document.getElementById('err-card_numero').textContent = 'Mín. 13 dígitos.'; esValido = false; }
      if (!cardExp) { document.getElementById('err-card_exp').textContent = 'Obligatorio.'; esValido = false; }
      if (!cardCvv) { document.getElementById('err-card_cvv').textContent = 'Obligatorio.'; esValido = false; }
      if (!cardZip) { document.getElementById('err-card_zip').textContent = 'Obligatorio.'; esValido = false; }

      const erroresExtra = [];
      const tipoViviendaRadio = document.querySelector('input[name="tipo_vivienda"]:checked');
      const tipo = tipoViviendaRadio ? tipoViviendaRadio.value : 'casa';

      if (tipo === 'casa' && !document.getElementById('numero_casa')?.value.trim()) {
        erroresExtra.push(['err-numero_casa', 'Ingresa el número de casa.']);
      }
      if (tipo === 'dpto' && (!document.getElementById('piso_dpto')?.value.trim() || !document.getElementById('numero_dpto')?.value.trim())) {
        erroresExtra.push(['err-dpto', 'Ingresa el piso y número de departamento.']);
      }
      if (!/^\+?[0-9 ()-]{8,16}$/.test(telefono)) erroresExtra.push(['err-telefono', 'Ingresa un teléfono válido.']);
      if (!/^\d{13,16}$/.test(cardNumero)) erroresExtra.push(['err-card_numero', 'Ingresa entre 13 y 16 dígitos.']);
      const fecha = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(cardExp);
      if (!fecha || new Date(2000 + Number(fecha[2]), Number(fecha[1]), 1) <= new Date()) {
        erroresExtra.push(['err-card_exp', 'Ingresa una fecha vigente MM/AA.']);
      }
      if (!/^\d{3,4}$/.test(cardCvv)) erroresExtra.push(['err-card_cvv', 'Ingresa 3 o 4 dígitos.']);
      if (!/^\d{7}$/.test(cardZip)) erroresExtra.push(['err-card_zip', 'Ingresa 7 dígitos.']);
      if (!document.getElementById('card_region')?.value.trim()) erroresExtra.push(['err-card_region', 'Obligatorio.']);

      erroresExtra.forEach(([id, mensaje]) => {
        const elemErr = document.getElementById(id);
        if (elemErr) elemErr.textContent = mensaje;
      });

      if (erroresExtra.length) esValido = false;

      if (esValido) {
        alert('¡Datos de pago y envío validados correctamente! Tu pedido ha sido procesado.');
        localStorage.removeItem('carrito_huerto');
        renderizarResumenCarrito();
        window.dispatchEvent(new Event('carritoActualizado'));
      }
    });
  }

});
