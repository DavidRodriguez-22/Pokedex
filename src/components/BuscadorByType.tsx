import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePokemonByType from "../hooks/UsePokemonByType";
import "./Buscador.css";
import traduccionesTipos from "../utils/traduccionesTipos";

const tiposPokemon = [
  "fire", "water", "grass", "electric", "rock", "ground", "psychic", "ice", "dragon", 
  "dark", "fairy", "steel", "flying", "bug", "poison", "fighting", "ghost", "normal"
];

interface BuscadorPorTiposProps {
  setFiltro: (tipo: string) => void;
}

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites?: {
    sprites?: {
      other?: {
        ["official-artwork"]?: {
          front_default?: string;
        };
      };
    };
  }[];
  pokemon_v2_pokemontypes?: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
}

interface PokemonType {
  pokemon_v2_pokemon: Pokemon;
}

const BuscadorPorTipos: React.FC<BuscadorPorTiposProps> = ({ setFiltro }) => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const { data, loading, error } = usePokemonByType(tipoSeleccionado || ""); 
  const navigate = useNavigate();

  const manejarCambio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value;
    setTipoSeleccionado(tipo);
    setFiltro(tipo);
  };
  
  if (loading)
    return (
      <div className="loading-container">
        <img src="/cargando.gif" alt="Cargando..." />
        <p className="loading-text">Cargando...</p>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const manejarClickPokemon = (id: number) => {
    navigate(`/pokedex/${id}`);
  };


  return (
    <div className="buscador-container">
      <select value={tipoSeleccionado} onChange={manejarCambio} className="input-buscar">
        <option value="">Selecciona un tipo</option>
        {tiposPokemon.map((tipo) => (
          <option key={tipo} value={tipo}>
            {traduccionesTipos[tipo] || tipo}
          </option>
        ))}
      </select>

      {loading && tipoSeleccionado && <p>Cargando...</p>}
      {error && tipoSeleccionado && <p>Error al cargar los Pokémon</p>}

      {tipoSeleccionado && data?.pokemon_v2_pokemontype?.length > 0 && (
        <div className="pokemon-container">
          {data.pokemon_v2_pokemontype.map(({ pokemon_v2_pokemon }: PokemonType) => (
            <div 
              key={pokemon_v2_pokemon.id} 
              className="pokemon-card" 
              onClick={() => manejarClickPokemon(pokemon_v2_pokemon.id)}
            >
              <div className="pokemon-numero-lista">
                <span className="numero-visible">#{pokemon_v2_pokemon.id}</span>
              </div>

              <h3 className="pokemon-titulo">
                <span className="pokemon-nombre-lista">{pokemon_v2_pokemon.name}</span>
              </h3>

              {pokemon_v2_pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"]?.front_default && (
                <img
                  src={pokemon_v2_pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
                  alt={pokemon_v2_pokemon.name}
                  className="pokemon-imagen"
                />
              )}

              <div className="pokemon-tipos-busqueda-tipo">
                {pokemon_v2_pokemon.pokemon_v2_pokemontypes?.map(({ pokemon_v2_type }) => (
                  <span key={pokemon_v2_type.name} className={`tipo ${pokemon_v2_type.name}`}>
                    {traduccionesTipos[pokemon_v2_type.name] || pokemon_v2_type.name}
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

export default BuscadorPorTipos;
