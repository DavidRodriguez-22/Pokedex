import usePokemones from "../hooks/UsePokemones";
import "./pokemonList.css";

interface PokemonListProps {
  filtro: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ filtro }) => {
  const { data, loading, error, cargarMasPokemones, cargarPokemonesAnteriores, offset } = usePokemones();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Traducción del tipo de Pokémon
  const traduccionesTipos: { [key: string]: string } = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"
  };

  const pokemonesFiltrados = data.pokemon_v2_pokemon.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pokemon-container">
      {pokemonesFiltrados.map((pokemon: any) => (
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
            {pokemon.pokemon_v2_pokemontypes.map((tipo: any) => {
              const nombreTipo = tipo.pokemon_v2_type.name;
              return (
                <span key={nombreTipo} className={`tipo ${nombreTipo}`}>
                  {traduccionesTipos[nombreTipo] || nombreTipo} {/* Traducción o nombre original */}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <div className="botonera">
        <button onClick={cargarPokemonesAnteriores} disabled={offset === 0} className="boton-anterior">
          Anterior
        </button>
        <button onClick={cargarMasPokemones} className="boton-siguiente">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
/* Prueba de cambiotikitiki */