/* ==========================================================================
   🇨🇱 LÓGICA DE PAGO Y ENVÍO (js/pago_envio.js)
   ========================================================================== */

// Regiones y comunas principales de Chile
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

  const selectRegion = document.getElementById('region_envio');
  const selectComuna = document.getElementById('comuna_envio');
  const selectCiudad = document.getElementById('ciudad_envio');

  // Cargar Regiones
  if (selectRegion) {
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

  // Cambio Casa / Dpto
  const radiosVivienda = document.querySelectorAll('input[name="tipo_vivienda"]');
  const campoCasa = document.getElementById('campo-casa');
  const campoDpto = document.getElementById('campo-dpto');

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

  // Débito / Crédito
  const cajasMetodo = document.querySelectorAll('.caja-metodo');
  const contenedorCuotas = document.getElementById('contenedor-cuotas');

  cajasMetodo.forEach(caja => {
    caja.tabIndex = 0;
    caja.setAttribute('role', 'button');
    caja.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); caja.click(); } });
    caja.addEventListener('click', () => {
      cajasMetodo.forEach(c => c.classList.remove('seleccionado'));
      caja.classList.add('seleccionado');

      if (caja.dataset.metodo === 'credito') {
        contenedorCuotas.classList.remove('oculto');
      } else {
        contenedorCuotas.classList.add('oculto');
      }
    });
  });

  // Marca de tarjeta (Visa, Mastercard, Amex, Redcompra)
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

  // Formato MM/AA
  const inputCardExp = document.getElementById('card_exp');
  if (inputCardExp) {
    inputCardExp.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2, 4);
      e.target.value = v;
    });
  }

  // Validación y envío (alert "hola mundo")
  const formPago = document.getElementById('form-pago-completo');

  if (formPago) {
    formPago.addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');

      const nombre = document.getElementById('nombre_completo').value.trim();
      const domicilio = document.getElementById('domicilio').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const region = document.getElementById('region_envio').value;
      const comuna = document.getElementById('comuna_envio').value;
      const ciudad = document.getElementById('ciudad_envio').value;

      const cardNombre = document.getElementById('card_nombre').value.trim();
      const cardNumero = document.getElementById('card_numero').value.replace(/\s+/g, '');
      const cardExp = document.getElementById('card_exp').value.trim();
      const cardCvv = document.getElementById('card_cvv').value.trim();
      const cardZip = document.getElementById('card_zip').value.trim();

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
      const tipo = document.querySelector('input[name="tipo_vivienda"]:checked').value;
      if (tipo === 'casa' && !document.getElementById('numero_casa').value.trim()) erroresExtra.push(['err-numero_casa', 'Ingresa el número de casa.']);
      if (tipo === 'dpto' && (!document.getElementById('piso_dpto').value.trim() || !document.getElementById('numero_dpto').value.trim())) erroresExtra.push(['err-dpto', 'Ingresa el piso y número de departamento.']);
      if (!/^\+?[0-9 ()-]{8,16}$/.test(telefono)) erroresExtra.push(['err-telefono', 'Ingresa un teléfono válido.']);
      if (!/^\d{13,16}$/.test(cardNumero)) erroresExtra.push(['err-card_numero', 'Ingresa entre 13 y 16 dígitos.']);
      const fecha = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(cardExp);
      if (!fecha || new Date(2000 + Number(fecha[2]), Number(fecha[1]), 1) <= new Date()) erroresExtra.push(['err-card_exp', 'Ingresa una fecha vigente MM/AA.']);
      if (!/^\d{3,4}$/.test(cardCvv)) erroresExtra.push(['err-card_cvv', 'Ingresa 3 o 4 dígitos.']);
      if (!/^\d{7}$/.test(cardZip)) erroresExtra.push(['err-card_zip', 'Ingresa 7 dígitos.']);
      if (!document.getElementById('card_region').value.trim()) erroresExtra.push(['err-card_region', 'Obligatorio.']);
      erroresExtra.forEach(([id, mensaje]) => { document.getElementById(id).textContent = mensaje; });
      if (erroresExtra.length) esValido = false;
      if (esValido) {
        alert('Datos de demostración validados. No se ha realizado ningún cobro ni pedido.');
      }
    });
  }

});
