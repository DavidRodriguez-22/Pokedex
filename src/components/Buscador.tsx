import { useState } from "react";
import "./Buscador.css";

interface BuscadorProps {
  onSearch: (nombre: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ onSearch }) => {
  const [busqueda, setBusqueda] = useState("");

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setBusqueda(nuevoValor);
    onSearch(nuevoValor); // Llama a la función cada vez que cambia el input
  };

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={busqueda}
        onChange={manejarCambio}
        className="input-buscar"
      />
    </div>
  );
};

export default Buscador;
