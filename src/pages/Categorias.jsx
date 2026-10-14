import PresentacionCategorias from '../componentes/PresentacionCategorias'
import ListaCategorias from '../componentes/ListaCategorias'
import CampoHogar from '../componentes/CampoHogar'
import Beneficios from '../componentes/Beneficios'

function Categorias() {
    return (
        <main>
            <PresentacionCategorias />
            <ListaCategorias />
            <CampoHogar />
            <Beneficios />
        </main>
    )
}

export default Categorias