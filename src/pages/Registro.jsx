
import { useState } from 'react'

import '../css/base.css'
import '../css/izquierda.css'
import '../css/formulario.css'
import '../css/botones.css'
import '../css/responsive.css'
import '../css/login-react.css'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')

  const [errores, setErrores] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

  function manejarRegistro(e) {
    e.preventDefault()

    const nuevosErrores = {}

    const nombreValor = nombre.trim()
    const edadValor = Number(edad)
    const correoValor = correo.trim().toLowerCase()

    // VALIDAR NOMBRE
    if (nombreValor.length < 3) {
      nuevosErrores.nombre =
        'Ingrese un nombre válido de al menos 3 caracteres.'
    }

    // VALIDAR EDAD
    if (edad === '') {
      nuevosErrores.edad = 'Ingrese su edad.'
    } else if (!Number.isInteger(edadValor)) {
      nuevosErrores.edad = 'La edad debe ser un número entero.'
    } else if (edadValor < 18) {
      nuevosErrores.edad =
        'Debes tener 18 años o más para registrarte.'
    } else if (edadValor > 100) {
      nuevosErrores.edad =
        'La edad máxima permitida es de 100 años.'
    }

    // VALIDAR CORREO
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoValor)) {
      nuevosErrores.correo =
        'Ingrese un correo electrónico válido.'
    }

    // VALIDAR CONTRASEÑA
    if (password.length < 8) {
      nuevosErrores.password =
        'La contraseña debe tener al menos 8 caracteres.'
    }

    // CONFIRMAR CONTRASEÑA
    if (confirmar === '' || password !== confirmar) {
      nuevosErrores.confirmar =
        'Las contraseñas no coinciden.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    // RECUPERAR USUARIOS GUARDADOS
    let usuarios = []

    try {
      usuarios = JSON.parse(
        localStorage.getItem('usuarios_huerto') || '[]'
      )

      if (!Array.isArray(usuarios)) {
        usuarios = []
      }
    } catch (error) {
      console.error(error)
      usuarios = []
    }

    // COMPROBAR CORREO REPETIDO
    const correoExiste = usuarios.some(
      (usuario) =>
        String(usuario.correo || '').toLowerCase() === correoValor
    )

    if (correoExiste) {
      setErrores({
        correo: 'Este correo ya está registrado.'
      })
      return
    }

    // CREAR USUARIO
    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombreValor,
      edad: edadValor,
      correo: correoValor,
      clave: password,
      estado: 'activo',
      fechaRegistro: new Date().toISOString()
    }

    usuarios.push(nuevoUsuario)

    // GUARDAR USUARIO
    try {
      localStorage.setItem(
        'usuarios_huerto',
        JSON.stringify(usuarios)
      )

      alert('Cuenta creada correctamente.')

      window.location.href = '/login'
    } catch (error) {
      console.error(error)
      alert('No se pudo guardar la cuenta en este navegador.')
    }
  }

  return (
    <div className="contenedor-pantalla">

      {/* SECCIÓN IZQUIERDA */}
      <div className="seccion-izquierda">
        <div className="superposicion-gradiente"></div>
      </div>

      {/* SECCIÓN DERECHA */}
      <div className="seccion-derecha">

        <div className="tarjeta-formulario">

          <p className="texto-cambiar-form">
            <a href="/">
              ← Volver al inicio
            </a>
          </p>

          <form
            id="form-registro"
            className="formulario activo"
            onSubmit={manejarRegistro}
            noValidate
          >

            {/* ENCABEZADO */}
            <div className="encabezado-form">

              <h2 className="titulo-form">
                Crear cuenta
              </h2>

              <p className="descripcion-form">
                Registro de demostración: utiliza una clave
                ficticia. Los datos se guardan en este navegador.
              </p>

            </div>

            {/* NOMBRE */}
            <div className="grupo-campo">

              <label className="etiqueta" htmlFor="reg-nombre">
                Nombre completo
              </label>

              <div className="input-con-icono">
                <input
                  id="reg-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <span
                className="mensaje-error"
                id="err-nombre"
                aria-live="polite"
              >
                {errores.nombre || ''}
              </span>

            </div>

            {/* EDAD */}
            <div className="grupo-campo">

              <label className="etiqueta" htmlFor="reg-edad">
                Edad
              </label>

              <div className="input-con-icono">
                <input
                  id="reg-edad"
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  min="18"
                  max="100"
                />
              </div>

              <span
                className="mensaje-error"
                id="err-edad"
                aria-live="polite"
              >
                {errores.edad || ''}
              </span>

            </div>

            {/* CORREO */}
            <div className="grupo-campo">

              <label className="etiqueta" htmlFor="reg-correo">
                Correo Gmail
              </label>

              <div className="input-con-icono">
                <input
                  id="reg-correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <span
                className="mensaje-error"
                id="err-correo"
                aria-live="polite"
              >
                {errores.correo || ''}
              </span>

            </div>

            {/* CONTRASEÑA */}
            <div className="grupo-campo">

              <label className="etiqueta" htmlFor="reg-password">
                Contraseña (mínimo 8 caracteres)
              </label>

              <div className="input-con-icono">

                <input
                  id="reg-password"
                  type={mostrarPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                  aria-label={
                    mostrarPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                </button>

              </div>

              <span
                className="mensaje-error"
                id="err-password"
                aria-live="polite"
              >
                {errores.password || ''}
              </span>

            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div className="grupo-campo">

              <label
                className="etiqueta"
                htmlFor="reg-confirm-password"
              >
                Confirmar contraseña
              </label>

              <div className="input-con-icono">

                <input
                  id="reg-confirm-password"
                  type={mostrarConfirmar ? 'text' : 'password'}
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() =>
                    setMostrarConfirmar(!mostrarConfirmar)
                  }
                  aria-label={
                    mostrarConfirmar
                      ? 'Ocultar confirmación'
                      : 'Mostrar confirmación'
                  }
                >
                  {mostrarConfirmar ? 'Ocultar' : 'Mostrar'}
                </button>

              </div>

              <span
                className="mensaje-error"
                id="err-confirm-pass"
                aria-live="polite"
              >
                {errores.confirmar || ''}
              </span>

            </div>

            {/* BOTÓN CREAR CUENTA */}
            <button type="submit" className="btn-verde">
              Crear cuenta
            </button>

            {/* ENLACE LOGIN */}
            <p className="texto-cambiar-form">
              <a href="/login">
                Ya tengo una cuenta
              </a>
            </p>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Registro
