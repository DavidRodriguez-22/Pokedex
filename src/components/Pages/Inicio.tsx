import { useNavigate } from "react-router-dom";
import "../Inicio.css"; // Un nivel arriba para acceder a 'components'


const Inicio = () => {
    const navigate = useNavigate();

    return (
        <div className="inicio-container">
            <h1>Bienvenido a la Pokédex</h1>
            <p>Explora y descubre Pokémon.</p>
            <button className="inicio-button" onClick={() => navigate("/pokedex")}>
                Ir a la Pokédex
            </button>
        </div>
    );
};

export default Inicio;
