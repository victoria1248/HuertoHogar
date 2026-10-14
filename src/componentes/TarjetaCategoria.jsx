function TarjetaCategoria({ clase, imagen, textoAlternativo, nombre, descripcion }) {
    return (
        <article className="tarjeta">
            <div className={`foto ${clase}`}>
                <img src={imagen} alt={textoAlternativo} />
            </div>

            <h3>{nombre}</h3>

            <p>{descripcion}</p>

            <a href="producto.html">
                Consultar productos →
            </a>
        </article>
    )
}

export default TarjetaCategoria