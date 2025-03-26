import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePokemon from "../hooks/usePokemonName";
import "./BuscadorName.css";
import traduccionesTipos from "../utils/traduccionesTipos";

const Buscador: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const { data, loading, error } = usePokemon(busqueda.trim().length > 0 ? busqueda : "");

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const manejarClickPokemon = (id: number) => {
    navigate(`/pokedex/${id}`);
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
              onClick={() => manejarClickPokemon(pokemon.id)}
              style={{ cursor: "pointer" }} 
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

              <div className="pokemon-tipos-lista">
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
