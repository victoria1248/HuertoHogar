/* Registro de usuarios HuertoHogar */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-registro");
  if (!form) return;

  const nombre = document.getElementById("reg-nombre");
  const edad = document.getElementById("reg-edad");
  const correo = document.getElementById("reg-correo");
  const password = document.getElementById("reg-password");
  const confirmar = document.getElementById("reg-confirm-password");

  const error = (id, texto) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    [
      "err-nombre",
      "err-edad",
      "err-correo",
      "err-password",
      "err-confirm-pass",
    ].forEach((id) => error(id, ""));

    let valido = true;
    const nombreValor = nombre.value.trim();
    const edadValor = Number(edad.value);
    const correoValor = correo.value.trim().toLowerCase();
    const passwordValor = password.value;
    const confirmarValor = confirmar.value;

    if (nombreValor.length < 3) {
      error("err-nombre", "Ingrese un nombre válido de al menos 3 caracteres.");
      valido = false;
    }

    // ==========================================================
    // VALIDAR EDAD - MÍNIMO 18 AÑOS
    // ==========================================================

    if (edad.value === "") {
      error("err-edad", "Ingrese su edad.");
      valido = false;
    } else if (!Number.isInteger(edadValor)) {
      error("err-edad", "La edad debe ser un número entero.");
      valido = false;
    } else if (edadValor < 18) {
      error("err-edad", "Debes tener 18 años o más para registrarte.");
      valido = false;
    }

    // ==========================================================
    // VALIDAR EDAD - MÁXIMO 100 AÑOS
    // ==========================================================

    if (edad.value !== "" && Number.isInteger(edadValor) && edadValor > 100) {
      error("err-edad", "La edad máxima permitida es de 100 años.");
      valido = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoValor)) {
      error("err-correo", "Ingrese un correo electrónico válido.");
      valido = false;
    }

    if (passwordValor.length < 8) {
      error("err-password", "La contraseña debe tener al menos 8 caracteres.");
      valido = false;
    }

    if (confirmarValor === "" || passwordValor !== confirmarValor) {
      error("err-confirm-pass", "Las contraseñas no coinciden.");
      valido = false;
    }

    if (!valido) return;

    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios_huerto") || "[]");
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch (e) {
      usuarios = [];
    }

    if (
      usuarios.some((u) => String(u.correo || "").toLowerCase() === correoValor)
    ) {
      error("err-correo", "Este correo ya está registrado.");
      return;
    }

    usuarios.push({
      id: Date.now(),
      nombre: nombreValor,
      edad: edadValor,
      correo: correoValor,
      clave: passwordValor,
      estado: "activo",
      fechaRegistro: new Date().toISOString(),
    });

    try {
      localStorage.setItem("usuarios_huerto", JSON.stringify(usuarios));
      alert("Cuenta creada correctamente.");
      window.location.href = "login.html";
    } catch (e) {
      alert("No se pudo guardar la cuenta en este navegador.");
      console.error(e);
    }
  });
});
