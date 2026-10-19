
import { useState } from 'react'
import logoHuerto from '../img/Logo_2.png'
import '../css/pago_envio.css'
import { leerInventario, guardarInventario } from '../servicios/inventario.js'

const CLAVE_CARRITO = 'carrito_huerto'
const TARJETA_PRUEBA = '4242424242424242'

function leerCarrito() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(CLAVE_CARRITO) || '[]'
    )
    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

function formatoPrecio(valor) {
  return '$' + Number(valor || 0).toLocaleString('es-CL')
}

function formatoTarjeta(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatoVencimiento(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 4)
  return numeros.length > 2
    ? numeros.slice(0, 2) + '/' + numeros.slice(2)
    : numeros
}

const inicial = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  region: '',
  comuna: '',
  ciudad: '',
  calle: '',
  numero: '',
  vivienda: 'casa',
  torre: '',
  departamento: '',
  instrucciones: '',
  titular: '',
  numeroTarjeta: '',
  vencimiento: '',
  cvv: '',
  cuotas: '1'
}

const regiones = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  "Libertador General Bernardo O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes y de la Antártica Chilena'
]

function TarjetaVisual({
  datos,
  metodoPago,
  mostrarReverso,
  setMostrarReverso
}) {
  const numero = datos.numeroTarjeta
    ? datos.numeroTarjeta.padEnd(19, '•')
    : '•••• •••• •••• ••••'

  return (
    <div className="pago-visual-contenedor">
      <div className="pago-visual-encabezado">
        <div>
          <span className="pago-visual-etiqueta">
            VISTA PREVIA INTERACTIVA
          </span>
          <h3>Tu tarjeta de demostración</h3>
        </div>

        <span className="pago-visual-en-vivo">
          <span className="pago-punto-vivo" />
          En vivo
        </span>
      </div>

      <div className="pago-tarjeta-escena">
        <div
          className={
            'pago-tarjeta-3d ' +
            (mostrarReverso ? 'girada' : '')
          }
        >
          <div className="pago-tarjeta-cara pago-tarjeta-frente">
            <div className="pago-tarjeta-decoracion" />

            <div className="pago-tarjeta-superior">
              <div className="pago-tarjeta-banco">
                <span className="pago-tarjeta-hoja">✦</span>
                <span>HUERTOHOGAR</span>
              </div>

              <span className="pago-tarjeta-tipo">
                {metodoPago === 'debito' ? 'DÉBITO' : 'CRÉDITO'}
              </span>
            </div>

            <div className="pago-tarjeta-chip">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="pago-tarjeta-numero">
              {numero}
            </div>

            <div className="pago-tarjeta-inferior">
              <div className="pago-tarjeta-dato">
                <small>TITULAR</small>
                <strong>
                  {datos.titular.trim().toUpperCase() ||
                    'NOMBRE DEL TITULAR'}
                </strong>
              </div>

              <div className="pago-tarjeta-dato">
                <small>VENCE</small>
                <strong>
                  {datos.vencimiento || 'MM/AA'}
                </strong>
              </div>
            </div>

            <span className="pago-tarjeta-marca">
              DEMO
            </span>
          </div>

          <div className="pago-tarjeta-cara pago-tarjeta-atras">
            <div className="pago-banda-magnetica" />

            <div className="pago-firma-contenedor">
              <div className="pago-firma-lineas">
                {datos.titular || 'Firma del titular'}
              </div>

              <div className="pago-cvv-visual">
                {datos.cvv || '•••'}
              </div>
            </div>

            <div className="pago-reverso-texto">
              <strong>HUERTOHOGAR</strong>
              <p>
                Tarjeta ficticia para demostración académica.
                No válida para compras reales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pago-visual-acciones">
        <button
          type="button"
          className={!mostrarReverso ? 'activo' : ''}
          onClick={() => setMostrarReverso(false)}
        >
          <span>▣</span> Ver frente
        </button>

        <button
          type="button"
          className={mostrarReverso ? 'activo' : ''}
          onClick={() => setMostrarReverso(true)}
        >
          <span>↻</span> Ver reverso
        </button>
      </div>

      <p className="pago-visual-ayuda">
        Los datos que escribas aparecerán automáticamente
        en la tarjeta. Selecciona CVV para girarla.
      </p>
    </div>
  )
}

function PagoEnvio() {
  const [carrito] = useState(leerCarrito)
  const [datos, setDatos] = useState(inicial)
  const [metodoPago, setMetodoPago] = useState('debito')
  const [mostrarReverso, setMostrarReverso] = useState(false)
  const [mostrarCVV, setMostrarCVV] = useState(false)
  const [error, setError] = useState('')
  const [procesando, setProcesando] = useState(false)

  function actualizar(campo, valor) {
    setDatos(anterior => ({
      ...anterior,
      [campo]: valor
    }))
    setError('')
  }

  function seleccionarMetodo(metodo) {
    setMetodoPago(metodo)
    setDatos(anterior => ({
      ...anterior,
      cuotas: '1'
    }))
    setMostrarReverso(false)
  }

  const cantidadTotal = carrito.reduce(
    (total, p) => total + (Number(p.cantidad) || 1),
    0
  )

  const subtotal = carrito.reduce(
    (total, p) =>
      total +
      (Number(p.precio) || 0) *
      (Number(p.cantidad) || 1),
    0
  )

  const envio = 0
  const total = subtotal + envio

  function confirmarCompra(evento) {
    evento.preventDefault()
    setError('')

    if (carrito.length === 0) {
      setError('Agrega productos antes de continuar.')
      return
    }

    const obligatorios = [
      'nombre', 'apellido', 'correo', 'telefono',
      'region', 'comuna', 'ciudad', 'calle',
      'numero', 'titular', 'numeroTarjeta',
      'vencimiento', 'cvv'
    ]

    if (obligatorios.some(campo => !datos[campo].trim())) {
      setError('Completa todos los campos obligatorios.')
      return
    }

    if (
      datos.vivienda === 'departamento' &&
      (!datos.torre.trim() || !datos.departamento.trim())
    ) {
      setError('Completa los datos del departamento.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }

    if (datos.telefono.replace(/\D/g, '').length < 9) {
      setError('Ingresa un teléfono válido.')
      return
    }

    const numero = datos.numeroTarjeta.replace(/\D/g, '')

    if (numero !== TARJETA_PRUEBA) {
      setError(
        'Usa únicamente la tarjeta de demostración 4242 4242 4242 4242.'
      )
      return
    }

    const coincidencia = datos.vencimiento.match(
      /^(\d{2})\/(\d{2})$/
    )

    if (!coincidencia) {
      setError('El vencimiento debe tener formato MM/AA.')
      return
    }

    const mes = Number(coincidencia[1])
    const anio = 2000 + Number(coincidencia[2])
    const hoy = new Date()

    if (
      mes < 1 ||
      mes > 12 ||
      anio < hoy.getFullYear() ||
      (
        anio === hoy.getFullYear() &&
        mes < hoy.getMonth() + 1
      )
    ) {
      setError('Ingresa una fecha de vencimiento futura.')
      return
    }

    if (datos.cvv !== '123') {
      setError('El CVV de demostración es 123.')
      return
    }

    const pedido = {
      id: 'HH-' + Date.now(),
      fecha: new Date().toISOString(),
      cliente: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        telefono: datos.telefono
      },
      entrega: {
        region: datos.region,
        comuna: datos.comuna,
        ciudad: datos.ciudad,
        calle: datos.calle,
        numero: datos.numero,
        vivienda: datos.vivienda,
        torre: datos.vivienda === 'departamento'
          ? datos.torre : '',
        departamento: datos.vivienda === 'departamento'
          ? datos.departamento : '',
        instrucciones: datos.instrucciones
      },
      pago: {
        metodo: metodoPago,
        cuotas: metodoPago === 'credito'
          ? datos.cuotas : '1',
        ultimosCuatro: numero.slice(-4),
        estado: 'Simulado - sin cobro real'
      },
      productos: carrito,
      subtotal,
      envio,
      total
    }

    try {
      setProcesando(true)

      // Verificar y descontar el stock real del inventario compartido.
      // Se hace al confirmar la compra, no al agregar productos al carrito.
      const inventarioActual = leerInventario()
      const cantidadesPorProducto = new Map()

      carrito.forEach(item => {
        const clave = String(item.id ?? item.codigo ?? item.nombre)
        const cantidad = Number(item.cantidad) || 0
        cantidadesPorProducto.set(
          clave,
          (cantidadesPorProducto.get(clave) || 0) + cantidad
        )
      })

      const productosAActualizar = []
      for (const [clave, cantidad] of cantidadesPorProducto.entries()) {
        const itemCarrito = carrito.find(item => String(item.id ?? item.codigo ?? item.nombre) === clave)
        const productoInventario = inventarioActual.find(producto =>
          String(producto.codigo ?? producto.id) === String(itemCarrito?.id ?? itemCarrito?.codigo) ||
          String(producto.id) === String(itemCarrito?.id) ||
          String(producto.nombre).trim().toLowerCase() === String(itemCarrito?.nombre).trim().toLowerCase()
        )

        if (!productoInventario) {
          setError(`No se encontró «${itemCarrito?.nombre || 'un producto'}» en el inventario. Vuelve al catálogo y agrega el producto nuevamente.`)
          setProcesando(false)
          return
        }

        if (!Number.isFinite(cantidad) || cantidad <= 0 || Number(productoInventario.stock) < cantidad) {
          setError(`Stock insuficiente para «${productoInventario.nombre}». Disponible: ${productoInventario.stock} ${productoInventario.plural || productoInventario.unidad || 'unidades'}. Vuelve al carrito y ajusta la cantidad.`)
          setProcesando(false)
          return
        }

        productosAActualizar.push({ id: productoInventario.id, cantidad })
      }

      const inventarioActualizado = inventarioActual.map(producto => {
        const descuento = productosAActualizar.find(item => String(item.id) === String(producto.id))
        return descuento
          ? { ...producto, stock: Number(producto.stock) - descuento.cantidad }
          : producto
      })

      // Guardar el inventario antes de vaciar el carrito. Dashboard y catálogo
      // leen esta misma clave de localStorage.
      guardarInventario(inventarioActualizado)

      // Conservar la boleta actual y agregar la compra al historial.
      // La sesión persistente identifica al dueño del pedido.
      const sesionGuardada =
        localStorage.getItem('sesion_huerto') ||
        sessionStorage.getItem('sesion_huerto')
      let sesionActual = null
      try {
        sesionActual = sesionGuardada ? JSON.parse(sesionGuardada) : null
      } catch {
        sesionActual = null
      }
      pedido.correoCuenta = String(sesionActual?.correo || datos.correo || '')
        .trim().toLowerCase()
      pedido.estado = 'Preparando pedido'

      const historialGuardado = JSON.parse(
        localStorage.getItem('pedidos_huerto') || '[]'
      )
      const historial = Array.isArray(historialGuardado)
        ? historialGuardado : []
      localStorage.setItem(
        'pedidos_huerto',
        JSON.stringify([pedido, ...historial.filter(p => p.id !== pedido.id)])
      )
      sessionStorage.setItem(
        'ultimo_pedido_huerto',
        JSON.stringify(pedido)
      )

      localStorage.removeItem(CLAVE_CARRITO)
      window.dispatchEvent(new Event('carritoActualizado'))

      window.location.href = '/boleta'
    } catch {
      setProcesando(false)
      setError('No se pudo guardar la compra simulada.')
    }
  }

  return (
    <div className="pagina-pago">
      <header className="pago-header">
        <a href="/" className="pago-marca">
          <img src={logoHuerto} alt="HuertoHogar" />
        </a>

        <nav className="pago-navegacion">
          <a href="/">Inicio</a>
          <a href="/carrito">← Volver al carrito</a>
        </nav>
      </header>

      <div className="contenedor-pasos">
        <div className="linea-pasos">
          <span className="puntero-paso" />
        </div>

        <div className="texto-pasos">
          CARRITO → PAGO Y ENVÍO → BOLETA
        </div>
      </div>

      <div className="pago-introduccion">
        <span className="pago-subtitulo">
          FINALIZA TU COMPRA
        </span>

        <h1>Pago y envío</h1>

        <p>
          Completa los datos de entrega y revisa tu pago
          de demostración.
        </p>
      </div>

      {error && (
        <div className="pago-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      <form
        className="contenedor-principal-pago"
        onSubmit={confirmarCompra}
      >
        {/* DATOS DE ENTREGA */}
        <section className="tarjeta-seccion-pago">
          <div className="pago-seccion-cabecera">
            <span className="pago-seccion-icono">📍</span>
            <div>
              <span className="pago-seccion-paso">PASO 01</span>
              <h2 className="titulo-seccion-pago">
                Datos de entrega
              </h2>
            </div>
          </div>

          <div className="fila-doble">
            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-nombre">
                Nombre *
              </label>
              <input
                id="p-nombre"
                className="input-pago"
                value={datos.nombre}
                onChange={e => actualizar('nombre', e.target.value)}
                required
              />
            </div>

            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-apellido">
                Apellido *
              </label>
              <input
                id="p-apellido"
                className="input-pago"
                value={datos.apellido}
                onChange={e => actualizar('apellido', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-correo">
              Correo electrónico *
            </label>
            <input
              id="p-correo"
              type="email"
              className="input-pago"
              placeholder="ejemplo@correo.com"
              value={datos.correo}
              onChange={e => actualizar('correo', e.target.value)}
              required
            />
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-telefono">
              Teléfono *
            </label>
            <input
              id="p-telefono"
              type="tel"
              className="input-pago"
              placeholder="+56 9 1234 5678"
              value={datos.telefono}
              onChange={e => actualizar('telefono', e.target.value)}
              required
            />
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-region">
              Región *
            </label>
            <select
              id="p-region"
              className="select-pago"
              value={datos.region}
              onChange={e => actualizar('region', e.target.value)}
              required
            >
              <option value="">Seleccionar región</option>
              {regiones.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="fila-doble">
            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-comuna">
                Comuna *
              </label>
              <input
                id="p-comuna"
                className="input-pago"
                value={datos.comuna}
                onChange={e => actualizar('comuna', e.target.value)}
                required
              />
            </div>

            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-ciudad">
                Ciudad *
              </label>
              <input
                id="p-ciudad"
                className="input-pago"
                value={datos.ciudad}
                onChange={e => actualizar('ciudad', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-calle">
              Calle o avenida *
            </label>
            <input
              id="p-calle"
              className="input-pago"
              value={datos.calle}
              onChange={e => actualizar('calle', e.target.value)}
              required
            />
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-numero">
              Número de domicilio *
            </label>
            <input
              id="p-numero"
              className="input-pago"
              value={datos.numero}
              onChange={e => actualizar('numero', e.target.value)}
              required
            />
          </div>

          <div className="campo-pago">
            <span className="etiqueta-pago">
              Tipo de vivienda
            </span>

            <div className="selector-vivienda">
              <label>
                <input
                  type="radio"
                  name="vivienda"
                  checked={datos.vivienda === 'casa'}
                  onChange={() => actualizar('vivienda', 'casa')}
                />
                Casa
              </label>

              <label>
                <input
                  type="radio"
                  name="vivienda"
                  checked={datos.vivienda === 'departamento'}
                  onChange={() => actualizar('vivienda', 'departamento')}
                />
                Departamento
              </label>
            </div>
          </div>

          {datos.vivienda === 'departamento' && (
            <div className="input-dpto-doble">
              <div className="campo-pago">
                <label className="etiqueta-pago" htmlFor="p-torre">
                  Torre / edificio *
                </label>
                <input
                  id="p-torre"
                  className="input-pago"
                  value={datos.torre}
                  onChange={e => actualizar('torre', e.target.value)}
                  required
                />
              </div>

              <div className="campo-pago">
                <label className="etiqueta-pago" htmlFor="p-depto">
                  Departamento *
                </label>
                <input
                  id="p-depto"
                  className="input-pago"
                  value={datos.departamento}
                  onChange={e => actualizar('departamento', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-instrucciones">
              Indicaciones de entrega (opcional)
            </label>
            <textarea
              id="p-instrucciones"
              className="input-pago"
              rows={3}
              placeholder="Referencias para encontrar tu domicilio..."
              value={datos.instrucciones}
              onChange={e => actualizar('instrucciones', e.target.value)}
            />
          </div>
        </section>

        {/* MÉTODO DE PAGO */}
        <section className="tarjeta-seccion-pago">
          <div className="pago-seccion-cabecera">
            <span className="pago-seccion-icono">💳</span>
            <div>
              <span className="pago-seccion-paso">PASO 02</span>
              <h2 className="titulo-seccion-pago">
                Método de pago
              </h2>
            </div>
          </div>

          <div className="pago-aviso-prueba">
            🔒 Entorno de demostración.
            No ingreses información bancaria real.
          </div>

          <span className="etiqueta-pago pago-label-metodo">
            Selecciona cómo deseas pagar
          </span>

          <div className="opciones-metodo-pago">
            <button
              type="button"
              aria-pressed={metodoPago === 'debito'}
              className={
                'caja-metodo ' +
                (metodoPago === 'debito' ? 'seleccionado' : '')
              }
              onClick={() => seleccionarMetodo('debito')}
            >
              <span className="pago-metodo-icono">▣</span>
              <span className="pago-metodo-texto">
                <strong>Débito</strong>
                <small>Pago en una cuota</small>
              </span>
              <span className="pago-metodo-radio" />
            </button>

            <button
              type="button"
              aria-pressed={metodoPago === 'credito'}
              className={
                'caja-metodo ' +
                (metodoPago === 'credito' ? 'seleccionado' : '')
              }
              onClick={() => seleccionarMetodo('credito')}
            >
              <span className="pago-metodo-icono">▤</span>
              <span className="pago-metodo-texto">
                <strong>Crédito</strong>
                <small>Selecciona cuotas</small>
              </span>
              <span className="pago-metodo-radio" />
            </button>
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-titular">
              Nombre del titular *
            </label>
            <input
              id="p-titular"
              className="input-pago"
              placeholder="NOMBRE APELLIDO"
              value={datos.titular}
              maxLength={32}
              autoComplete="off"
              onFocus={() => setMostrarReverso(false)}
              onChange={e => actualizar('titular', e.target.value)}
              required
            />
          </div>

          <div className="campo-pago">
            <label className="etiqueta-pago" htmlFor="p-tarjeta">
              Número de tarjeta de prueba *
            </label>

            <div className="input-card-number-wrapper">
              <input
                id="p-tarjeta"
                className="input-pago"
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                maxLength={19}
                autoComplete="off"
                value={datos.numeroTarjeta}
                onFocus={() => setMostrarReverso(false)}
                onChange={e =>
                  actualizar(
                    'numeroTarjeta',
                    formatoTarjeta(e.target.value)
                  )
                }
                required
              />
              <span className="card-brand-badge">💳</span>
            </div>
          </div>

          <div className="fila-doble">
            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-vencimiento">
                Vencimiento *
              </label>
              <input
                id="p-vencimiento"
                className="input-pago"
                placeholder="MM/AA"
                inputMode="numeric"
                maxLength={5}
                autoComplete="off"
                value={datos.vencimiento}
                onFocus={() => setMostrarReverso(false)}
                onChange={e =>
                  actualizar(
                    'vencimiento',
                    formatoVencimiento(e.target.value)
                  )
                }
                required
              />
            </div>

            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-cvv">
                CVV de prueba *
              </label>

              <div className="pago-cvv-input">
                <input
                  id="p-cvv"
                  type={mostrarCVV ? 'text' : 'password'}
                  className="input-pago"
                  placeholder="123"
                  inputMode="numeric"
                  maxLength={3}
                  autoComplete="off"
                  value={datos.cvv}
                  onFocus={() => setMostrarReverso(true)}
                  onChange={e =>
                    actualizar(
                      'cvv',
                      e.target.value.replace(/\D/g, '').slice(0, 3)
                    )
                  }
                  required
                />

                <button
                  type="button"
                  className="pago-mostrar-cvv"
                  onClick={() => setMostrarCVV(!mostrarCVV)}
                  aria-label={
                    mostrarCVV ? 'Ocultar CVV' : 'Mostrar CVV'
                  }
                >
                  {mostrarCVV ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>
          </div>

          {metodoPago === 'credito' && (
            <div className="campo-pago">
              <label className="etiqueta-pago" htmlFor="p-cuotas">
                Número de cuotas
              </label>
              <select
                id="p-cuotas"
                className="select-pago"
                value={datos.cuotas}
                onChange={e => actualizar('cuotas', e.target.value)}
              >
                <option value="1">1 cuota</option>
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
              </select>
              <small className="pago-nota-cuotas">
                Cuotas ilustrativas sin intereses calculados.
              </small>
            </div>
          )}

          <TarjetaVisual
            datos={datos}
            metodoPago={metodoPago}
            mostrarReverso={mostrarReverso}
            setMostrarReverso={setMostrarReverso}
          />
        </section>

        {/* RESUMEN DE COMPRA */}
        <aside className="columna-derecha-resumen">
          <div className="rectangulo-resumen">
            <div className="pago-resumen-cabecera">
              <span>🧾</span>
              <h2>Resumen de compra</h2>
            </div>

            {carrito.length === 0 ? (
              <div className="pago-carrito-vacio">
                <span>🛒</span>
                <p>Tu carrito está vacío.</p>
                <a href="/carrito">Volver al carrito</a>
              </div>
            ) : (
              <div className="pago-productos">
                {carrito.map((producto, indice) => (
                  <div
                    className="pago-producto"
                    key={producto.id ?? indice}
                  >
                    <span>
                      {producto.nombre || 'Producto'}
                      {' '}× {Number(producto.cantidad) || 1}
                    </span>
                    <strong>
                      {formatoPrecio(
                        (Number(producto.precio) || 0) *
                        (Number(producto.cantidad) || 1)
                      )}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            <div className="pago-resumen-linea">
              <span>Productos ({cantidadTotal})</span>
              <strong>{formatoPrecio(subtotal)}</strong>
            </div>

            <div className="pago-resumen-linea">
              <span>Envío</span>
              <strong className="pago-gratis">Gratis</strong>
            </div>

            <div className="pago-resumen-total">
              <span>Total a pagar</span>
              <strong>{formatoPrecio(total)}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="btn-comprar-grande"
            disabled={procesando || carrito.length === 0}
          >
            {procesando
              ? 'Procesando...'
              : 'Confirmar compra →'}
          </button>

          <div className="pago-pie-seguridad">
            🔒 Simulación académica, sin cobros reales.
          </div>
        </aside>
      </form>
    </div>
  )
}

export default PagoEnvio
