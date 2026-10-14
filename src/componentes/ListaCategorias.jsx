import TarjetaCategoria from './TarjetaCategoria'

function ListaCategorias() {
    return (
        <section className="categorias" aria-label="Categorías de productos">
            <TarjetaCategoria
                clase="frutas"
                imagen="/img/Frutas.png"
                textoAlternativo="Frutas frescas"
                nombre="Frutas"
                descripcion="Lo mejor de la temporada, seleccionado para ti"
            />

            <TarjetaCategoria
                clase="verduras"
                imagen="/img/verduras.png"
                textoAlternativo="Verduras frescas"
                nombre="Verduras"
                descripcion="Frescas, nutritivas y recién cosechadas"
            />

            <TarjetaCategoria
                clase="organicos"
                imagen="/img/Organico.png"
                textoAlternativo="Productos orgánicos"
                nombre="Orgánicos"
                descripcion="Productos libres de químicos, 100% naturales"
            />

            <TarjetaCategoria
                clase="lacteos"
                imagen="/img/Lacteos.png"
                textoAlternativo="Productos lácteos"
                nombre="Lácteos y más"
                descripcion="Productos lácteos, huevos y más del campo"
            />

            <TarjetaCategoria
                clase="despensa"
                imagen="/img/Despensa.png"
                textoAlternativo="Productos de despensa"
                nombre="Despensa"
                descripcion="Todo lo que necesitas para tu día a día"
            />

            <TarjetaCategoria
                clase="hierbas"
                imagen="/img/Herbas.png"
                textoAlternativo="Hierbas y plantas"
                nombre="Hierbas y plantas"
                descripcion="Aromáticas medicinales y para tu hogar"
            />
        </section>
    )
}

export default ListaCategorias