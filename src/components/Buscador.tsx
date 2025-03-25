import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import usePokemon from "../hooks/usePokemon";
import "./Buscador.css";
import traduccionesTipos from "../utils/traduccionesTipos";

interface BuscadorProps {
  onSearch: (busqueda: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ onSearch }) => {
  const [busqueda, setBusqueda] = useState("");
  const { data, loading, error } = usePokemon(busqueda);
  const navigate = useNavigate(); // Inicializa useNavigate para la navegación

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onSearch(valor);
  };

  const manejarClickPokemon = (id: number) => {
    navigate(`/pokedex/${id}`); // Redirige a la página de detalles del Pokémon con el ID
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

      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar el Pokémon</p>}

      {data?.pokemon_v2_pokemon.length > 0 && (
        <div className="pokemon-container">
          {data.pokemon_v2_pokemon.map((pokemon: any) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => manejarClickPokemon(pokemon.id)} // Evento onClick
            >
              <div className="pokemon-numero-lista">
                <span className="numero-visible">#{pokemon.id}</span>
              </div>

              <h3 className="pokemon-titulo">
                <span className="pokemon-nombre-lista">{pokemon.name}</span>
              </h3>

              {pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"] && (
                <img
                  src={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="pokemon-imagen"
                />
              )}

              <div className="pokemon-tipos-buscador">
                {pokemon.pokemon_v2_pokemontypes.map((tipo: any) => {
                  const nombreTipo = tipo.pokemon_v2_type.name;
                  return (
                    <span key={nombreTipo} className={`tipo ${nombreTipo}`}>
                      {traduccionesTipos[nombreTipo] || nombreTipo}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buscador;
