import { useState } from "react";
import usePokemon from "../hooks/usePokemon";
import "./Buscador.css";

interface BuscadorProps {
  onSearch: (busqueda: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ onSearch }) => {
  const [busqueda, setBusqueda] = useState("");
  const { data, loading, error } = usePokemon(busqueda);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onSearch(valor); // 🔥 Enviar el valor al estado global en App.tsx
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
            <div key={pokemon.id} className="pokemon-card">
              <div className="pokemon-numero">
                <span className="numero-visible">#{pokemon.id}</span>
              </div>

              <h3 className="pokemon-titulo">
                <span className="pokemon-nombre">{pokemon.name}</span>
              </h3>

              {pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"] && (
                <img
                  src={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="pokemon-imagen"
                />
              )}

              <div className="pokemon-tipos">
                {pokemon.pokemon_v2_pokemontypes.map((tipo: any) => (
                  <span key={tipo.pokemon_v2_type.name} className={`tipo ${tipo.pokemon_v2_type.name}`}>
                    {tipo.pokemon_v2_type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buscador;
