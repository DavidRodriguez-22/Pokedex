import { useNavigate } from "react-router-dom";
import "../Inicio.css";


const Inicio = () => {
    const navigate = useNavigate();

    return (
        <div className="inicio-container">
            <h1>Bienvenido a la Pokédex</h1>
            <p className="intro-text">
                La enciclopedia definitiva del mundo Pokémon. Aquí podrás explorar, 
                conocer y descubrir información sobre cada Pokémon. 
                ¡Prepárate para sumergirte en esta aventura y convertirte en un verdadero Maestro Pokémon!
            </p>
            <button className="inicio-button" onClick={() => navigate("/pokedex")}>
                Ir a la Pokédex
            </button>
        </div>
    );
};

export default Inicio;
