import { Link } from 'react-router-dom'

function Inicio() {
    return (
        <main className="hero">
            <div className="hero-text">
                <h1>
                    Del campo <br />
                    a tu <span>hogar</span>
                </h1>

                <Link to="/categorias" className="btn-primary">
                    Comenzar a comprar
                </Link>

                <p>
                    Llevamos la frescura y la calidad de los productos
                    del campo chileno directamente a la puerta de tu casa
                </p>
            </div>

            <div className="hero-image">
                <img
                    src="/img/cesta de verduras.png"
                    alt="Frutas y verduras del campo"
                />
            </div>
        </main>
    )
}

export default Inicio