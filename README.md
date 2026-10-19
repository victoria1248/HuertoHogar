# 🌿 HuertoHogar

**Tienda web de productos frescos con catálogo, carrito de compras y administración de inventario.**

HuertoHogar es un proyecto académico desarrollado con React y Vite. Su propósito es representar la experiencia de una tienda de productos del campo: explorar categorías, consultar productos, realizar una compra simulada y revisar sus pedidos. También incluye herramientas para administrar productos, existencias, descuentos y cuentas de usuario.

La aplicación funciona en el navegador y almacena sus datos localmente. No requiere una base de datos ni un servidor backend para ejecutar esta versión.

## 1. Integrantes del equipo

| Nombre completo | Rol en el equipo |
| --- | --- |
| Victoria del Pilar González González | Líder del grupo |
| Matías Maximiliano Maldonado Alarcón | Integrante |
| Benjamin Ignacio Pérez Pizarro | Integrante |

## 2. Objetivos del proyecto

- Presentar productos con imagen, descripción, precio y unidad de venta.
- Facilitar la selección de cantidades y la incorporación de productos al carrito.
- Representar el proceso de compra, entrega y seguimiento de un pedido.
- Gestionar un inventario compartido entre el catálogo y el panel administrativo.
- Administrar precios, stock y descuentos desde una misma interfaz.
- Incorporar formularios con validaciones y una navegación organizada por secciones.

## 3. Tecnologías utilizadas

| Tecnología | Uso dentro del proyecto |
| --- | --- |
| React 19 | Construcción de interfaces mediante componentes y manejo del estado |
| React DOM | Montaje de la aplicación en el navegador |
| React Router DOM 7 | Navegación de las secciones que utilizan rutas React |
| Vite 8 | Servidor de desarrollo y compilación del proyecto |
| JavaScript y JSX | Lógica de la aplicación y estructura de componentes |
| CSS | Diseño, distribución, formularios y adaptación a distintos tamaños de pantalla |
| Context API | Acceso compartido a la sesión del usuario |
| localStorage y sessionStorage | Almacenamiento de datos y sesión en el navegador |
| Oxlint | Revisión estática del código |

Las dependencias se encuentran en `package.json`. El archivo `package-lock.json` registra las versiones concretas instaladas.

## 4. Instalación y ejecución

### Requisitos

- Node.js y npm. La compilación de esta versión se verificó con Node.js 24.
- Un navegador web.
- Un editor de código, como Visual Studio Code.
- Conexión a Internet para instalar las dependencias.

### Abrir el proyecto

1. Descarga y extrae el proyecto, o utiliza una copia local del repositorio.
2. Abre en Visual Studio Code la carpeta que contiene `package.json`.
3. Abre una terminal dentro de esa carpeta.
4. Si abres el proyecto por primera vez, instala las dependencias:

```bash
npm install
```

5. Inicia el proyecto:

```bash
npm run dev
```

6. En la misma terminal, escribe `h` y presiona **Enter** para mostrar la ayuda.
7. Luego, escribe `o` y presiona **Enter** para abrir el proyecto en el navegador.

### Comandos disponibles

| Comando | Función |
| --- | --- |
| `npm install` | Instala las dependencias si abres el proyecto por primera vez |
| `npm run dev` | Inicia el proyecto |
| `h` + **Enter** | Muestra la ayuda del servidor de desarrollo |
| `o` + **Enter** | Abre el proyecto en el navegador |

Los comandos `h` y `o` se escriben en la misma terminal después de iniciar el proyecto con `npm run dev`.

## 5. Cuentas y claves de demostración

Estas credenciales son exclusivamente para probar el proyecto académico.

| Tipo de cuenta | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@huertohogar.cl` | `Admin123!` |
| Cliente | `cliente@huertohogar.cl` | `Cliente123!` |
| Cliente de demostración adicional | `estudiante@gmail.com` | `Clave123!` |

### Ingresar como administrador

1. Abre el inicio de HuertoHogar.
2. Selecciona la opción de iniciar sesión desde el icono de usuario.
3. Ingresa el correo y la contraseña del administrador.
4. Al iniciar sesión, la aplicación dirige la cuenta administrativa al dashboard.

Las cuentas `admin@huertohogar.cl` y `cliente@huertohogar.cl` se crean automáticamente en el almacenamiento local al cargar una página del módulo tienda, siempre que no exista una cuenta con el mismo correo. No se reemplazan las claves de cuentas que ya existan.

### Ingresar como cliente

Puedes utilizar una cuenta de prueba o crear una desde **Registro**. El formulario de acceso reconoce el tipo de cuenta según sus datos; no es necesario modificar el código para ingresar como administrador.

La opción para recordar la sesión utiliza `localStorage`. Sin esa opción, la sesión se guarda en `sessionStorage`. El menú de usuario permite cerrar sesión.

## 6. Secciones de la tienda

### Inicio

Presenta la identidad de HuertoHogar, una imagen de productos frescos y el botón **Comenzar a comprar**. Incluye navegación hacia las secciones del sitio, acceso de usuario, carrito y pie de página con información de contacto.

### Categorías

Organiza la exploración de los productos en grupos como frutas, verduras, orgánicos, lácteos, despensa y hierbas. Los enlaces permiten acceder al catálogo por categoría. La existencia de una categoría no implica que siempre tenga productos disponibles.

### Productos y catálogo

Cada producto disponible puede mostrar:

- Nombre e imagen.
- Descripción.
- Precio en pesos chilenos y unidad de venta.
- Stock disponible.
- Selector para aumentar o disminuir la cantidad.
- Botón para agregar al carrito.
- Porcentaje de descuento, precio anterior y precio rebajado cuando corresponde.

El catálogo permite filtrar por categoría y utiliza el inventario compartido con el dashboard. La dirección `/catalogo` conduce a `/productos`.

### Carrito

Reúne los productos seleccionados y permite revisar cantidades, modificar la selección y eliminar productos. Presenta el resumen de la compra y el acceso a **Pago y envío**.

### Registro de clientes

El formulario solicita nombre, edad, correo, contraseña y confirmación de contraseña. Sus validaciones incluyen:

| Campo | Regla |
| --- | --- |
| Nombre | Al menos 3 caracteres después de quitar espacios exteriores |
| Edad | Número entero entre 18 y 100 años |
| Correo | Formato válido y control de duplicados entre clientes registrados |
| Contraseña | Al menos 8 caracteres |
| Confirmación | Debe coincidir con la contraseña |

Crear una cuenta desde este formulario registra un cliente. Los administradores se gestionan desde su sección específica.

## 7. Compra y pago de demostración

### Datos de entrega

El formulario solicita los datos de contacto y dirección: nombre, apellido, correo, teléfono, región, comuna, ciudad, calle, número y tipo de vivienda. Cuando se selecciona departamento, también requiere los datos correspondientes de torre y departamento.

### Datos para probar el pago

| Campo | Valor de prueba |
| --- | --- |
| Número de tarjeta | `4242 4242 4242 4242` |
| CVV | `123` |
| Vencimiento | Una fecha futura con formato `MM/AA` |
| Titular | Un nombre de demostración |

La interfaz representa pagos con débito o crédito; para crédito permite seleccionar cuotas. La tarjeta visual refleja los datos ingresados y puede mostrar su reverso al seleccionar el CVV.

**El pago es simulado: no realiza cobros ni se conecta a una entidad bancaria. Utiliza únicamente los datos de prueba.** El costo de envío está configurado en $0 en esta versión.

### Resultado de la compra

Al confirmar una compra válida, el sistema comprueba las existencias, descuenta las cantidades del inventario, registra el pedido, conserva la información para la boleta y vacía el carrito.

Para asociar claramente la compra con una cuenta, inicia sesión como cliente antes de completarla.

### Boleta

Muestra un comprobante con los productos, cantidades, importes, datos del cliente, entrega y resumen del pago. Incluye acciones de impresión; desde el diálogo del navegador se puede guardar como PDF.

Es un comprobante de demostración del proyecto, no una boleta electrónica tributaria.

## 8. Pedidos y seguimiento

**Mis pedidos** permite consultar los pedidos asociados a la cuenta del cliente. Desde el historial se puede abrir el seguimiento de una compra.

La pantalla de seguimiento presenta el estado del pedido, sus etapas e información de entrega. Los estados que puede seleccionar la administración son:

- Pedido confirmado.
- Preparando pedido.
- En camino.
- Entregado.
- Suspendido.

Los pedidos nuevos se registran inicialmente como **Preparando pedido**. La administración puede suspender un pedido e indicar el motivo. El seguimiento representa los cambios guardados por el administrador; no corresponde a rastreo GPS ni a una integración con un transportista.

## 9. Panel administrativo

### Resumen del negocio

El dashboard presenta información del inventario, existencias, valor de venta del stock y productos que necesitan reposición. Se considera stock bajo cuando un producto tiene menos de 10 unidades de su unidad de venta.

También incluye un gráfico con selección semanal o mensual. **Los valores de ese gráfico son datos de ejemplo definidos en el código; no se calculan desde los pedidos realizados.**

### Inventario y reposición

Permite revisar productos, buscar por nombre o categoría, filtrar por stock bajo y agregar existencias a un producto seleccionado.

El stock se expresa según la unidad de venta de cada producto. Por ejemplo, en un producto vendido por kilo, una cantidad de 10 representa 10 kilos; en uno vendido por frasco, representa 10 frascos.

### Crear productos

El formulario **Nuevo producto** incluye:

| Dato | Descripción |
| --- | --- |
| Nombre | Identificación del producto |
| Categoría | Grupo al que pertenece |
| Precio | Valor base en pesos chilenos |
| Stock inicial | Existencias iniciales, como número entero igual o mayor que cero |
| Unidad de venta | Kilo, unidad, bolsa de 500 g, frasco de 500 g, litro o paquete |
| Descuento | Activación opcional y porcentaje entre 1 % y 90 % |
| Descripción | Texto de hasta 400 caracteres que se guarda para el catálogo |
| Imagen | URL opcional o archivo de imagen de menos de 900 KB |

El precio debe ser positivo. Una vez guardado, el producto se incorpora al inventario utilizado por el catálogo.

### Editar productos y descuentos

Permite seleccionar un producto y modificar nombre, categoría, precio, stock, unidad de venta, descripción, imagen y descuento.

El precio rebajado se obtiene aplicando el porcentaje al precio base y redondeando a pesos enteros. Por ejemplo, un producto de $1.000 con un 10 % de descuento se muestra a $900.

### Eliminar productos

El panel permite seleccionar un producto y confirmar su eliminación. Como particularidad de esta versión, la carga del inventario vuelve a incorporar los productos iniciales que no encuentre: un producto del conjunto inicial puede reaparecer tras volver a cargar el inventario.

### Gestión de pedidos

Permite buscar pedidos por número, correo o cliente, revisar su contenido y cambiar el estado de entrega. También ofrece un campo para indicar el motivo de suspensión.

### Gestión de usuarios

Permite consultar clientes registrados, activar o desactivar sus cuentas y eliminarlas con confirmación. El inicio de sesión comprueba el estado de la cuenta antes de permitir el acceso.

### Gestión de administradores

Permite registrar cuentas administrativas. Los correos admitidos para esta función pertenecen a los dominios:

- `@gmail.com`
- `@duocuc.cl`
- `@huertohogar.cl`

La contraseña debe tener al menos 8 caracteres. El registro administrativo comprueba que el correo no esté registrado previamente como administrador o cliente.

## 10. Blog e información

| Sección | Contenido |
| --- | --- |
| Blog | Presentación del espacio informativo y acceso a sus contenidos |
| Recetas | Propuestas de preparación con ingredientes e instrucciones |
| Consejos de cultivo | Recomendaciones para comenzar y cuidar un huerto |
| Nosotros | Misión, compromiso y enfoque sostenible de HuertoHogar |
| Contacto | Datos de contacto y formulario que abre el cliente de correo mediante `mailto:` |
| Noticias | Contenidos informativos con navegación entre publicaciones |
| Impacto ambiental | Indicadores y representación gráfica con datos ilustrativos |

El formulario de contacto no envía mensajes mediante un backend propio. Los indicadores ambientales son ejemplos de presentación, no mediciones en tiempo real.

## 11. Rutas principales

| Ruta | Pantalla o función |
| --- | --- |
| `/` | Inicio |
| `/categorias` | Categorías |
| `/productos` | Catálogo |
| `/catalogo` | Acceso equivalente al catálogo |
| `/login` | Inicio de sesión |
| `/registro` | Registro de clientes |
| `/carrito` | Carrito de compras |
| `/pago-envio` | Entrega y pago simulado |
| `/boleta` | Comprobante de la compra |
| `/acceso-pedidos` | Redirección a pedidos o al inicio de sesión |
| `/mis-pedidos` | Historial del cliente |
| `/seguimiento-pedido` | Seguimiento del pedido seleccionado |
| `/dashboard` y `/admin` | Panel administrativo |
| `/admin/usuarios` | Gestión de clientes |
| `/admin/agregar` | Gestión de administradores |
| `/blog` | Blog |
| `/blog/recetas` | Recetas |
| `/blog/consejos` | Consejos de cultivo |
| `/nosotros` | Información del proyecto |
| `/contacto` | Contacto |
| `/noticias` | Noticias |
| `/impacto` | Impacto ambiental |

## 12. Organización del código

| Ubicación | Responsabilidad |
| --- | --- |
| `index.html` | Documento HTML que carga la aplicación |
| `src/main.jsx` | Montaje de React y proveedores de navegación y sesión |
| `src/App.jsx` | Selección y carga del módulo activo |
| `src/modulos/` | Organización de tienda, blog e información |
| `src/pages/tienda/` | Páginas comerciales y administrativas |
| `src/pages/blog/` | Páginas del blog |
| `src/pages/informacion/` | Páginas informativas |
| `src/componentes/` | Componentes reutilizados por sección |
| `src/context/AuthContext.jsx` | Estado y operaciones de la sesión |
| `src/datos/inventario.js` | Productos iniciales, lectura y guardado del inventario |
| `src/rutas/navegacion.js` | Selección de módulos y compatibilidad con enlaces anteriores |
| `src/css/` | Estilos generales y por sección |
| `public/img/` | Imágenes del sitio y de los productos |
| `package.json` | Dependencias y comandos |
| `package-lock.json` | Versiones concretas de dependencias |
| `vite.config.js` | Configuración de Vite |

Las secciones conservan sus propios estilos. El cambio entre tienda, blog e información recarga la página para separar los estilos globales de cada módulo.

## 13. Almacenamiento de datos

| Clave | Almacenamiento | Datos |
| --- | --- | --- |
| `usuarios_huerto` | localStorage | Clientes registrados |
| `administradores_huerto` | localStorage | Cuentas administrativas |
| `huertohogar-inventario-demo-v1` | localStorage | Productos, precios, stock y descuentos |
| `carrito_huerto` | localStorage | Selección del carrito |
| `pedidos_huerto` | localStorage | Historial de pedidos |
| `sesion_huerto` | localStorage o sessionStorage | Cuenta y rol de la sesión |
| `ultimo_pedido_huerto` | sessionStorage | Pedido utilizado para mostrar la boleta |

Los datos pertenecen al navegador y al origen utilizado, es decir, a la combinación de protocolo, dirección y puerto. No se comparten automáticamente con otro equipo, navegador o dirección. Al borrar los datos del sitio también se eliminan los registros locales.

Subir el código a GitHub no sube los productos, cuentas o pedidos creados dentro del navegador.

## 14. Recorrido sugerido para una demostración

1. Ejecutar la aplicación e ingresar como administrador.
2. Crear un producto con descripción, stock, imagen y descuento.
3. Abrir el catálogo y revisar los datos del producto.
4. Cerrar sesión e ingresar con una cuenta de cliente.
5. Agregar productos al carrito y revisar las cantidades.
6. Completar la entrega y utilizar los datos de pago de prueba.
7. Revisar la boleta y el pedido en **Mis pedidos**.
8. Volver a ingresar como administrador para comprobar las existencias y cambiar el estado del pedido.
9. Consultar nuevamente el seguimiento desde la cuenta del cliente.

Realiza el recorrido en el mismo navegador y origen para mantener el inventario y los pedidos compartidos.

## 15. Alcance y secciones pendientes

Esta versión es un prototipo académico de frontend. Las cuentas, contraseñas y roles se gestionan en el navegador; no hay autenticación ni autorización respaldadas por un servidor. Las credenciales de prueba no deben utilizarse como cuentas de un servicio real.

La ruta `/resenas` existe, pero actualmente muestra una presentación de categorías: no implementa un sistema de publicación de reseñas. El enlace de recuperación de contraseña apunta a `/recuperar`, cuya pantalla no está implementada.

Algunas imágenes del blog no están incluidas en los recursos disponibles y requieren incorporar sus archivos en `public/img/`. El resto del contenido puede consultarse independientemente de esas imágenes.

## 16. Archivos del repositorio

El repositorio debe conservar `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, la configuración del proyecto y este `README.md`.

Las carpetas `node_modules/` y `dist/` se generan localmente mediante los comandos de instalación y compilación. No es necesario incluirlas para compartir el código fuente.

---

**HuertoHogar · Proyecto académico desarrollado por Victoria del Pilar González González, Matías Maximiliano Maldonado Alarcón y Benjamin Ignacio Pérez Pizarro.**
