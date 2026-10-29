import{a as e,c as t,d as n,i as r,n as i,r as a,s as o,u as s}from"./index-Du3InwDM.js";import{n as c}from"./carritoPorCuenta-CMsmjm3H.js";var l=n(s(),1),u=i(),d=`info@huertohogar.cl`;function f(){let[e,t]=(0,l.useState)({nombre:``,correo:``,asunto:``,mensaje:``});function n(e){let{name:n,value:r}=e.target;t(e=>({...e,[n]:r}))}function r(t){t.preventDefault();let n=encodeURIComponent(e.asunto.trim()),r=encodeURIComponent(`Nombre: ${e.nombre.trim()}\nCorreo: ${e.correo.trim()}\n\n`+e.mensaje.trim());window.location.href=`mailto:${d}?subject=${n}&body=${r}`}return(0,u.jsxs)(`main`,{className:`pagina-contacto contacto-amplio py-4 py-md-5`,children:[(0,u.jsx)(`style`,{children:`
        .pagina-contacto.contacto-amplio {
          width: min(1280px, calc(100% - 48px)) !important;
          max-width: 1280px !important;
          margin: 0 auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          display: block !important;
        }
        .contacto-amplio > .contacto-distribucion {
          display: grid !important;
          grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.65fr) !important;
          gap: 30px !important;
          align-items: start !important;
          width: 100% !important;
          margin: 0 !important;
        }
        .contacto-amplio .contacto-info,
        .contacto-amplio .contacto-formulario {
          width: 100% !important;
          max-width: none !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 30px !important;
          box-sizing: border-box !important;
        }
        .contacto-amplio .contacto-formulario form { width: 100%; max-width: none; }
        .contacto-amplio .contacto-formulario .form-control { width: 100%; }
        @media (max-width: 767px) {
          .pagina-contacto.contacto-amplio { width: calc(100% - 28px) !important; }
          .contacto-amplio > .contacto-distribucion { grid-template-columns: minmax(0, 1fr) !important; gap: 18px !important; }
          .contacto-amplio .contacto-info,
          .contacto-amplio .contacto-formulario { padding: 22px !important; }
        }
      `}),(0,u.jsxs)(`div`,{className:`contacto-distribucion`,children:[(0,u.jsxs)(`section`,{className:`contacto-info`,"aria-labelledby":`titulo-contacto`,children:[(0,u.jsx)(`h1`,{id:`titulo-contacto`,className:`fw-bold mb-4`,children:`Contáctanos`}),(0,u.jsxs)(`div`,{className:`dato-contacto d-flex align-items-center gap-3 mb-3`,children:[(0,u.jsx)(`span`,{className:`icono-contacto`,"aria-hidden":`true`,children:`✉`}),(0,u.jsx)(`a`,{href:`mailto:${d}`,children:d})]}),(0,u.jsxs)(`div`,{className:`dato-contacto d-flex align-items-center gap-3 mb-3`,children:[(0,u.jsx)(`span`,{className:`icono-contacto`,"aria-hidden":`true`,children:`☎`}),(0,u.jsx)(`a`,{href:`tel:+5687654321`,children:`+56 8765 4321`})]}),(0,u.jsxs)(`div`,{className:`dato-contacto d-flex align-items-center gap-3 mb-3`,children:[(0,u.jsx)(`span`,{className:`icono-contacto`,"aria-hidden":`true`,children:`⌖`}),(0,u.jsx)(`span`,{children:`Huerto Hogar (Región de Valparaíso, Chile)`})]})]}),(0,u.jsxs)(`section`,{className:`contacto-formulario`,"aria-labelledby":`titulo-formulario`,children:[(0,u.jsx)(`h2`,{id:`titulo-formulario`,className:`h3 fw-bold mb-2`,children:`Envíanos un mensaje`}),(0,u.jsx)(`p`,{className:`text-secondary mb-4`,children:`Completa el formulario para comunicarte con nosotros.`}),(0,u.jsxs)(`form`,{onSubmit:r,className:`row g-3`,children:[(0,u.jsxs)(`div`,{className:`col-12`,children:[(0,u.jsx)(`label`,{className:`form-label`,htmlFor:`nombre`,children:`Nombre`}),(0,u.jsx)(`input`,{className:`form-control`,id:`nombre`,name:`nombre`,type:`text`,autoComplete:`name`,value:e.nombre,onChange:n,required:!0})]}),(0,u.jsxs)(`div`,{className:`col-12`,children:[(0,u.jsx)(`label`,{className:`form-label`,htmlFor:`correo`,children:`Tu correo`}),(0,u.jsx)(`input`,{className:`form-control`,id:`correo`,name:`correo`,type:`email`,autoComplete:`email`,value:e.correo,onChange:n,required:!0})]}),(0,u.jsxs)(`div`,{className:`col-12`,children:[(0,u.jsx)(`label`,{className:`form-label`,htmlFor:`asunto`,children:`Asunto`}),(0,u.jsx)(`input`,{className:`form-control`,id:`asunto`,name:`asunto`,type:`text`,value:e.asunto,onChange:n,required:!0})]}),(0,u.jsxs)(`div`,{className:`col-12`,children:[(0,u.jsx)(`label`,{className:`form-label`,htmlFor:`mensaje`,children:`Mensaje`}),(0,u.jsx)(`textarea`,{className:`form-control`,id:`mensaje`,name:`mensaje`,value:e.mensaje,onChange:n,rows:5,required:!0})]}),(0,u.jsx)(`div`,{className:`col-12 d-grid d-sm-flex`,children:(0,u.jsx)(`button`,{className:`btn btn-success px-4 py-2`,type:`submit`,children:`Enviar mensaje`})}),(0,u.jsx)(`p`,{className:`col-12 small text-secondary mb-0`,children:`Al enviar, se abrirá tu aplicación de correo con el mensaje preparado. Deberás confirmar el envío allí.`})]})]})]})]})}var p=[{icono:`🌱`,titulo:`Plantas cultivadas`,valor:`248`,unidad:`unidades`},{icono:`💧`,titulo:`Agua ahorrada`,valor:`1240`,unidad:`litros`},{icono:`🌳`,titulo:`CO2 reducido`,valor:`42`,unidad:`kg`},{icono:`♻️`,titulo:`Residuos reutilizados`,valor:`86`,unidad:`kg`}],m=[[45,155],[115,125],[185,95],[255,75],[325,55],[395,25]],h=[`Ene`,`Feb`,`Mar`,`Abr`,`May`,`Jun`],g=[40,80,120,160,200];function _(){let e=m.map(([e,t])=>`${e},${t}`).join(` `),t=`45,180 ${e} 395,180`;return(0,u.jsx)(`main`,{className:`bg-light py-5`,children:(0,u.jsxs)(`div`,{className:`container-fluid px-4 px-lg-5`,style:{maxWidth:1600,margin:`0 auto`},children:[(0,u.jsxs)(`header`,{className:`text-center mb-5`,children:[(0,u.jsx)(`span`,{className:`badge rounded-pill text-bg-success px-3 py-2 mb-3`,children:`Nuestro compromiso`}),(0,u.jsx)(`h1`,{className:`display-6 fw-bold text-success mb-2`,children:`Información del medio ambiente`}),(0,u.jsx)(`p`,{className:`text-secondary mb-0`,children:`Conoce los indicadores ambientales de HuertoHogar.`})]}),(0,u.jsx)(`section`,{className:`row g-4 mb-5`,"aria-label":`Indicadores ambientales`,children:p.map(e=>(0,u.jsx)(`div`,{className:`col-12 col-sm-6 col-lg-3`,children:(0,u.jsx)(`article`,{className:`card border-0 shadow-sm rounded-4 h-100 text-center bg-white`,children:(0,u.jsxs)(`div`,{className:`card-body p-4 p-xl-5 d-flex flex-column align-items-center justify-content-center`,style:{minHeight:230},children:[(0,u.jsx)(`span`,{className:`fs-1 mb-3`,"aria-hidden":`true`,children:e.icono}),(0,u.jsx)(`h2`,{className:`h6 fw-semibold text-secondary mb-3`,children:e.titulo}),(0,u.jsx)(`p`,{className:`display-6 fw-bold text-success mb-0`,children:e.valor}),(0,u.jsx)(`p`,{className:`text-secondary small mb-0`,children:e.unidad})]})})},e.titulo))}),(0,u.jsx)(`section`,{className:`card border-0 shadow-sm rounded-4 overflow-hidden`,children:(0,u.jsxs)(`div`,{className:`card-body p-4 p-md-5`,children:[(0,u.jsxs)(`div`,{className:`d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-4`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h2`,{className:`h4 fw-bold text-success mb-1`,children:`Impacto ambiental durante el año`}),(0,u.jsx)(`p`,{className:`text-secondary mb-0`,children:`Evolución ilustrativa de enero a junio.`})]}),(0,u.jsx)(`span`,{className:`badge text-bg-light border text-success align-self-start`,children:`Enero – Junio`})]}),(0,u.jsx)(`div`,{className:`w-100`,style:{overflowX:`auto`},children:(0,u.jsxs)(`svg`,{viewBox:`0 0 440 225`,role:`img`,"aria-label":`Gráfico ilustrativo de impacto ambiental de enero a junio`,style:{display:`block`,width:`100%`,minWidth:320,height:`auto`},children:[g.map((e,t)=>(0,u.jsxs)(`g`,{children:[(0,u.jsx)(`line`,{x1:`40`,y1:e-10,x2:`410`,y2:e-10,stroke:`#e2e8e2`,strokeDasharray:`4 4`}),(0,u.jsx)(`text`,{x:`28`,y:e-5,textAnchor:`end`,fontSize:`11`,fill:`#64748b`,children:(5-t)*40})]},e)),(0,u.jsx)(`polygon`,{points:t,fill:`#8fc779`,opacity:`0.25`}),(0,u.jsx)(`polyline`,{points:e,fill:`none`,stroke:`#65a936`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`}),m.map(([e,t],n)=>(0,u.jsx)(`circle`,{cx:e,cy:t,r:`4.5`,fill:`#65a936`},h[n])),h.map((e,t)=>(0,u.jsx)(`text`,{x:45+t*70,y:`205`,textAnchor:`middle`,fontSize:`12`,fill:`#475569`,children:e},e))]})}),(0,u.jsx)(`p`,{className:`text-secondary small mt-3 mb-0`,children:`Gráfico ilustrativo de los avances ambientales. Los valores mostrados son de demostración y no corresponden a mediciones verificadas.`})]})})]})})}var v=[{titulo:`Cultivo sostenible`,imagen:`/img/cultivo.png`,texto:`Se incorporan nuevas técnicas de cultivo sostenible para preservar el medio ambiente y aprovechar mejor los recursos disponibles.`},{titulo:`Ahorro de agua`,imagen:`/img/ahorro-agua.png`,texto:`Utilizamos métodos de riego eficientes para disminuir el consumo de agua y evitar su desperdicio.`},{titulo:`Reciclaje y compostaje`,imagen:`/img/reciclaje-compos.png`,texto:`Reutilizamos residuos orgánicos para producir compost, reduciendo la cantidad de desechos generados.`},{titulo:`Biodiversidad`,imagen:`/img/biodiversidad.png`,texto:`Los espacios verdes ayudan a proporcionar refugio y alimento a numerosas especies que forman parte del ecosistema.`}];function y(){let[e,t]=(0,l.useState)(0),n=v[e];return(0,u.jsx)(`main`,{className:`w-100 py-5`,style:{backgroundColor:`#f4f8f3`,minHeight:`70vh`},children:(0,u.jsxs)(`div`,{className:`container px-3 px-md-4`,style:{maxWidth:`1140px`},children:[(0,u.jsxs)(`header`,{className:`text-center mb-4 mb-md-5`,children:[(0,u.jsx)(`p`,{className:`text-success fw-bold text-uppercase small mb-2`,style:{letterSpacing:`0.12em`},children:`Actualidad y medio ambiente`}),(0,u.jsx)(`h1`,{className:`display-5 fw-bold text-dark mb-3`,children:`Noticias del Huerto`}),(0,u.jsx)(`p`,{className:`text-secondary mx-auto mb-0`,style:{maxWidth:`650px`},children:`Descubre ideas y prácticas para cuidar nuestros cultivos y el planeta.`})]}),(0,u.jsx)(`section`,{className:`card border-0 shadow-lg rounded-4 overflow-hidden`,"aria-label":`Noticias del huerto`,children:(0,u.jsxs)(`div`,{className:`row g-0 align-items-stretch`,children:[(0,u.jsx)(`div`,{className:`col-12 col-lg-6`,children:(0,u.jsx)(`img`,{src:n.imagen,alt:n.titulo,className:`d-block w-100 h-100`,style:{objectFit:`cover`,minHeight:`280px`,maxHeight:`460px`}})}),(0,u.jsx)(`div`,{className:`col-12 col-lg-6 d-flex align-items-center`,children:(0,u.jsxs)(`div`,{className:`p-4 p-md-5 w-100`,children:[(0,u.jsx)(`span`,{className:`badge rounded-pill text-bg-success mb-3`,children:`Medio ambiente`}),(0,u.jsx)(`h2`,{className:`h2 fw-bold text-dark mb-3`,children:n.titulo}),(0,u.jsx)(`p`,{className:`fs-5 text-secondary lh-lg mb-4`,children:n.texto}),(0,u.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between flex-wrap gap-3`,children:[(0,u.jsxs)(`span`,{className:`small text-secondary`,"aria-live":`polite`,children:[`Noticia `,e+1,` de `,v.length]}),(0,u.jsxs)(`div`,{className:`d-flex gap-2`,children:[(0,u.jsxs)(`button`,{type:`button`,className:`btn btn-outline-success rounded-pill px-3`,onClick:()=>{t(e=>(e-1+v.length)%v.length)},"aria-label":`Noticia anterior`,children:[(0,u.jsx)(`span`,{"aria-hidden":`true`,children:`←`}),` Anterior`]}),(0,u.jsxs)(`button`,{type:`button`,className:`btn btn-success rounded-pill px-3`,onClick:()=>{t(e=>(e+1)%v.length)},"aria-label":`Noticia siguiente`,children:[`Siguiente `,(0,u.jsx)(`span`,{"aria-hidden":`true`,children:`→`})]})]})]})]})})]})}),(0,u.jsx)(`div`,{className:`d-flex justify-content-center gap-2 mt-4`,"aria-label":`Seleccionar noticia`,children:v.map((n,r)=>(0,u.jsx)(`button`,{type:`button`,onClick:()=>t(r),className:`btn rounded-pill ${e===r?`btn-success`:`btn-outline-success`}`,style:{width:`36px`,height:`10px`,padding:0},"aria-label":`Ver noticia ${r+1}: ${n.titulo}`,"aria-current":e===r?`true`:void 0},n.titulo))})]})})}var b=`huertoHogarResenas`,x=[{id:1,nombre:`Cliente`,texto:`Excelente calidad de los productos.`,estrellas:5},{id:2,nombre:`Cliente`,texto:`Buenos productos y atención.`,estrellas:4}];function S(){let[e,t]=(0,l.useState)(()=>{try{let e=localStorage.getItem(b);return e?JSON.parse(e):x}catch{return x}}),[n,r]=(0,l.useState)(``),[i,a]=(0,l.useState)(``),[o,s]=(0,l.useState)(5);(0,l.useEffect)(()=>{localStorage.setItem(b,JSON.stringify(e))},[e]);let c=e.length?e.reduce((e,t)=>e+t.estrellas,0)/e.length:0;function d(e){e.preventDefault();let c={id:Date.now(),nombre:n.trim()||`Cliente`,texto:i.trim(),estrellas:o};c.texto&&(t(e=>[c,...e]),r(``),a(``),s(5))}return(0,u.jsxs)(`main`,{className:`pagina-resenas`,children:[(0,u.jsx)(`h1`,{children:`Reseñas`}),(0,u.jsxs)(`section`,{className:`resumen-resenas`,children:[(0,u.jsxs)(`form`,{className:`formulario-resena`,onSubmit:d,children:[(0,u.jsx)(`label`,{htmlFor:`nombre-resena`,children:`Nombre (opcional)`}),(0,u.jsx)(`input`,{id:`nombre-resena`,value:n,onChange:e=>r(e.target.value),placeholder:`Escribe tu nombre`,maxLength:50}),(0,u.jsx)(`label`,{htmlFor:`texto-resena`,children:`Escribe tu reseña`}),(0,u.jsx)(`textarea`,{id:`texto-resena`,value:i,onChange:e=>a(e.target.value),placeholder:`Cuéntanos tu experiencia con Huerto Hogar...`,rows:4,maxLength:500,required:!0}),(0,u.jsxs)(`div`,{className:`selector-estrellas`,children:[(0,u.jsx)(`span`,{children:`Tu calificación:`}),[1,2,3,4,5].map(e=>(0,u.jsx)(`button`,{type:`button`,className:e<=o?`estrella activa`:`estrella`,onClick:()=>s(e),"aria-label":`${e} estrellas`,"aria-pressed":o===e,children:`★`},e)),(0,u.jsxs)(`span`,{children:[o,`/5`]})]}),(0,u.jsx)(`button`,{className:`boton-publicar`,type:`submit`,children:`Publicar reseña`})]}),(0,u.jsxs)(`div`,{className:`promedio-resenas`,children:[(0,u.jsx)(`strong`,{children:c.toFixed(1).replace(`.`,`,`)}),(0,u.jsxs)(`div`,{className:`estrellas-promedio`,"aria-label":`Promedio ${c.toFixed(1)} de 5`,children:[`★`.repeat(Math.round(c)),`☆`.repeat(5-Math.round(c))]}),(0,u.jsxs)(`p`,{children:[e.length,` reseñas`]})]})]}),(0,u.jsxs)(`section`,{className:`lista-resenas`,children:[(0,u.jsx)(`h2`,{children:`Opiniones de nuestros clientes`}),e.length===0?(0,u.jsx)(`p`,{children:`Sé la primera persona en dejar una reseña.`}):e.map(e=>(0,u.jsxs)(`article`,{className:`tarjeta-resena`,children:[(0,u.jsxs)(`div`,{className:`cabecera-resena`,children:[(0,u.jsx)(`strong`,{children:e.nombre}),(0,u.jsxs)(`span`,{className:`estrellas-tarjeta`,children:[`★`.repeat(e.estrellas),`☆`.repeat(5-e.estrellas)]})]}),(0,u.jsx)(`p`,{children:e.texto})]},e.id))]})]})}var C=[{icono:`🌿`,titulo:`Nuestra misión`,descripcion:`Acercar productos frescos y naturales a las familias, promoviendo una alimentación consciente y una relación más responsable con el medio ambiente.`},{icono:`🤝`,titulo:`Nuestro compromiso`,descripcion:`Queremos facilitar una compra sencilla, cercana y transparente, destacando la importancia de los productos de temporada.`},{icono:`🌎`,titulo:`Un futuro sostenible`,descripcion:`Impulsamos pequeñas acciones cotidianas que ayudan a reducir residuos, cuidar el agua y valorar los recursos naturales.`}];function w(){return(0,u.jsx)(`main`,{className:`w-100 py-5`,style:{background:`linear-gradient(180deg, #f4faf4 0%, #ffffff 100%)`,minHeight:`70vh`},children:(0,u.jsxs)(`div`,{className:`mx-auto px-3 px-md-4`,style:{width:`100%`,maxWidth:`1200px`},children:[(0,u.jsxs)(`header`,{className:`text-center mx-auto mb-5`,style:{maxWidth:`790px`},children:[(0,u.jsx)(`span`,{className:`d-inline-block rounded-pill px-4 py-2 mb-3 fw-bold`,style:{backgroundColor:`#e2f2e5`,color:`#237244`,letterSpacing:`0.1em`,fontSize:`0.8rem`},children:`QUIÉNES SOMOS`}),(0,u.jsx)(`h1`,{className:`fw-bold mb-3`,style:{color:`#193e2a`,fontSize:`clamp(2rem, 4vw, 3.2rem)`,lineHeight:1.15},children:`Conectamos tu hogar con la naturaleza`}),(0,u.jsx)(`p`,{className:`lead mb-0`,style:{color:`#58685d`,lineHeight:1.7},children:`En HuertoHogar creemos que comer bien comienza con elegir productos frescos y cuidar nuestro entorno.`})]}),(0,u.jsx)(`section`,{"aria-label":`Nuestros valores`,className:`row g-4 justify-content-center`,children:C.map(e=>(0,u.jsx)(`div`,{className:`col-12 col-md-6 col-lg-4 d-flex`,children:(0,u.jsx)(`article`,{className:`card border-0 shadow-sm rounded-4 h-100 w-100`,style:{backgroundColor:`#ffffff`,minWidth:0,overflowWrap:`normal`},children:(0,u.jsxs)(`div`,{className:`card-body p-4 p-xl-5 text-center d-flex flex-column align-items-center`,children:[(0,u.jsx)(`div`,{className:`rounded-circle d-flex align-items-center justify-content-center mb-4`,style:{width:`80px`,height:`80px`,backgroundColor:`#eaf6ec`,fontSize:`2.2rem`},"aria-hidden":`true`,children:e.icono}),(0,u.jsx)(`h2`,{className:`h4 fw-bold mb-3`,style:{color:`#237244`},children:e.titulo}),(0,u.jsx)(`p`,{className:`mb-0`,style:{color:`#536358`,lineHeight:1.8,fontSize:`1rem`},children:e.descripcion})]})})},e.titulo))}),(0,u.jsx)(`div`,{className:`text-center mt-5 pt-2`,children:(0,u.jsx)(`p`,{className:`mb-0 fw-medium`,style:{color:`#237244`},children:`🌱 Cultivamos una forma más consciente de vivir.`})})]})})}var T=[{texto:`Contáctanos`,ruta:`/contacto`},{texto:`Noticias`,ruta:`/noticias`},{texto:`Reseñas`,ruta:`/resenas`}];function E(){return(0,u.jsxs)(`footer`,{className:`hh-footer-v2`,"aria-label":`Pie de página de HuertoHogar`,children:[(0,u.jsx)(`style`,{children:`
        .hh-footer-v2 {
          background: #176c45 !important;
          color: #fff !important;
          width: 100% !important;
          padding: 55px 0 0 !important;
          margin: 0 !important;
          font-family: inherit;
          box-sizing: border-box;
        }
        .hh-footer-v2 *, .hh-footer-v2 *::before, .hh-footer-v2 *::after {
          box-sizing: border-box;
        }
        .hh-footer-v2 .hh-footer-container {
          width: min(1180px, calc(100% - 48px)) !important;
          max-width: 1180px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          display: block !important;
        }
        .hh-footer-v2 .hh-footer-grid {
          display: grid !important;
          grid-template-columns: minmax(210px, 1.35fr) repeat(3, minmax(150px, 1fr)) !important;
          gap: 48px !important;
          align-items: start !important;
          width: 100% !important;
        }
        .hh-footer-v2 .hh-footer-group {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          min-width: 0 !important;
          width: auto !important;
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
          text-align: left !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
        }
        .hh-footer-v2 .hh-footer-brand img {
          display: block !important;
          width: 165px !important;
          max-width: 100% !important;
          height: auto !important;
          max-height: 120px !important;
          object-fit: contain !important;
          margin: 0 !important;
        }
        .hh-footer-v2 .hh-footer-tagline {
          font-size: 14px !important;
          line-height: 1.65 !important;
          color: #d1e9da !important;
          margin: 18px 0 0 !important;
          max-width: 230px !important;
        }
        .hh-footer-v2 .hh-footer-heading {
          color: #fff !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          line-height: 1.4 !important;
          letter-spacing: .065em !important;
          text-transform: uppercase !important;
          margin: 4px 0 22px !important;
          padding: 0 !important;
          width: auto !important;
          white-space: normal !important;
        }
        .hh-footer-v2 .hh-footer-links {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 13px !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .hh-footer-v2 .hh-footer-links a,
        .hh-footer-v2 .hh-footer-links span {
          color: #e5f3eb !important;
          text-decoration: none !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          line-height: 1.6 !important;
          display: inline !important;
          width: auto !important;
          max-width: 100% !important;
          overflow-wrap: anywhere !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }
        .hh-footer-v2 .hh-footer-links a:hover,
        .hh-footer-v2 .hh-footer-links a:focus-visible {
          color: #fff !important;
          text-decoration: underline !important;
          text-underline-offset: 4px;
        }
        .hh-footer-v2 .hh-footer-bottom {
          border-top: 1px solid rgba(255,255,255,.22) !important;
          margin-top: 44px !important;
          padding: 19px 0 23px !important;
          text-align: center !important;
          color: #d1e9da !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
        }
        @media (max-width: 950px) {
          .hh-footer-v2 .hh-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 38px 44px !important;
          }
        }
        @media (max-width: 540px) {
          .hh-footer-v2 { padding-top: 38px !important; }
          .hh-footer-v2 .hh-footer-container { width: calc(100% - 36px) !important; }
          .hh-footer-v2 .hh-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 32px 20px !important;
          }
          .hh-footer-v2 .hh-footer-brand { grid-column: 1 / -1 !important; }
          .hh-footer-v2 .hh-footer-heading { font-size: 13px !important; margin-bottom: 15px !important; }
          .hh-footer-v2 .hh-footer-links a,
          .hh-footer-v2 .hh-footer-links span { font-size: 13px !important; }
          .hh-footer-v2 .hh-footer-bottom { margin-top: 35px !important; }
        }
      `}),(0,u.jsxs)(`div`,{className:`hh-footer-container`,children:[(0,u.jsxs)(`div`,{className:`hh-footer-grid`,children:[(0,u.jsxs)(`div`,{className:`hh-footer-group hh-footer-brand`,children:[(0,u.jsx)(a,{to:`/`,"aria-label":`Volver al inicio de HuertoHogar`,children:(0,u.jsx)(`img`,{src:`/img/logo-principal.png`,alt:`Logo de HuertoHogar`})}),(0,u.jsx)(`p`,{className:`hh-footer-tagline`,children:`Del campo a tu hogar. Productos frescos para una vida más natural.`})]}),(0,u.jsxs)(`div`,{className:`hh-footer-group`,children:[(0,u.jsx)(`h2`,{className:`hh-footer-heading`,children:`Contacto`}),(0,u.jsx)(`nav`,{className:`hh-footer-links`,"aria-label":`Contacto`,children:T.map(({texto:e,ruta:t})=>(0,u.jsx)(a,{to:t,children:e},t))})]}),(0,u.jsxs)(`div`,{className:`hh-footer-group`,children:[(0,u.jsx)(`h2`,{className:`hh-footer-heading`,children:`Información`}),(0,u.jsxs)(`nav`,{className:`hh-footer-links`,"aria-label":`Información`,children:[(0,u.jsx)(a,{to:`/impacto`,children:`Impacto ambiental`}),(0,u.jsx)(a,{to:`/noticias`,children:`Blog y noticias`}),(0,u.jsx)(`a`,{href:`mailto:info@huertohogar.cl`,children:`Envíanos un correo`})]})]}),(0,u.jsxs)(`div`,{className:`hh-footer-group`,children:[(0,u.jsx)(`h2`,{className:`hh-footer-heading`,children:`Redes sociales`}),(0,u.jsxs)(`div`,{className:`hh-footer-links`,children:[(0,u.jsx)(`a`,{href:`https://www.facebook.com/`,target:`_blank`,rel:`noopener noreferrer`,children:`Facebook`}),(0,u.jsx)(`a`,{href:`https://www.instagram.com/`,target:`_blank`,rel:`noopener noreferrer`,children:`Instagram`}),(0,u.jsx)(`span`,{children:`@HuertoHogar`}),(0,u.jsx)(`a`,{href:`mailto:info@huertohogar.cl`,children:`info@huertohogar.cl`}),(0,u.jsx)(`span`,{children:`+56 8765 4321`})]})]})]}),(0,u.jsxs)(`div`,{className:`hh-footer-bottom`,children:[`© `,new Date().getFullYear(),` HuertoHogar. Todos los derechos reservados.`]})]})]})}function D({cantidad:e}){return(0,u.jsxs)(`header`,{className:`cabecera`,children:[(0,u.jsxs)(a,{to:`/`,className:`marca`,"aria-label":`HuertoHogar - Productos`,children:[(0,u.jsx)(`img`,{src:`/img/logo-principal.png`,alt:``,onError:e=>{e.currentTarget.src=`/img/logo_1.png`}}),(0,u.jsx)(`span`,{children:`HuertoHogar`})]}),(0,u.jsxs)(`nav`,{"aria-label":`Navegación principal`,children:[[[`Inicio`,`/`],[`Categorías`,`/categorias`],[`Blog`,`/blog`],[`Productos`,`/productos`],[`Carrito`,`/carrito`],[`Nosotros`,`/nosotros`],[`Noticias`,`/noticias`],[`Impacto ambiental`,`/impacto`],[`Reseñas`,`/resenas`],[`Contacto`,`/contacto`]].map(([e,t])=>(0,u.jsx)(r,{to:t,className:({isActive:e})=>e?`nav-enlace activo`:`nav-enlace`,children:e},t)),e>0&&(0,u.jsxs)(`span`,{className:`nav-enlace`,"aria-live":`polite`,children:[`🛒 Agregados: `,e]})]})]})}function O(){let[n]=(0,l.useState)(()=>{try{return c()}catch{return[]}}),r=n.reduce((e,t)=>e+t.cantidad,0);return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(`div`,{className:`sitio`,children:[(0,u.jsx)(D,{cantidad:r}),(0,u.jsxs)(t,{children:[(0,u.jsx)(o,{path:`/nosotros`,element:(0,u.jsx)(w,{})}),(0,u.jsx)(o,{path:`/contacto`,element:(0,u.jsx)(f,{})}),(0,u.jsx)(o,{path:`/resenas`,element:(0,u.jsx)(S,{})}),(0,u.jsx)(o,{path:`/noticias`,element:(0,u.jsx)(y,{})}),(0,u.jsx)(o,{path:`/impacto`,element:(0,u.jsx)(_,{})}),(0,u.jsx)(o,{path:`*`,element:(0,u.jsx)(e,{to:`/productos`,replace:!0})})]}),(0,u.jsx)(E,{}),(0,u.jsxs)(`div`,{className:`copyright`,children:[`© `,new Date().getFullYear(),` HuertoHogar · Fresco, local y sostenible`]})]})})}export{O as default};