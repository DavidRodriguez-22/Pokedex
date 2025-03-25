import usePokemones from "../hooks/UsePokemones";
import "./pokemonList.css";
import traduccionesTipos from "../utils/traduccionesTipos";
import { useNavigate } from "react-router-dom";

interface PokemonListProps {
  filtro: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ filtro }) => {
  const navigate = useNavigate(); // Agregamos useNavigate para la navegación
  const { data, loading, error, cargarMasPokemones, cargarPokemonesAnteriores, offset } = usePokemones();

  if (loading)
    return (
      <div className="loading-container">
        <img src="/cargando.gif" alt="Cargando..." />
        <p className="loading-text">Cargando...</p>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const pokemonesFiltrados = data.pokemon_v2_pokemon.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pokemon-container">
      {pokemonesFiltrados.map((pokemon: any) => (
        <div
          key={pokemon.id}
          className="pokemon-card"
          onClick={() => {
            console.log(`Navegando a: /pokedex/${pokemon.id}`); 
            navigate(`/pokedex/${pokemon.id}`);
          }}

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
