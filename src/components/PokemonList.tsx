import usePokemones from "../hooks/UsePokemones";
import "./pokemonList.css";

const PokemonList = () => {
  const { data, loading, error, cargarMasPokemones, cargarPokemonesAnteriores, offset } = usePokemones();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pokemon-container">
      {data.pokemon_v2_pokemon.map((pokemon: any) => (
        <div key={pokemon.id} className="pokemon-card">
          <h3 className="pokemon-titulo">
            <p>#{pokemon.id} {pokemon.name}</p>
          </h3>
          {pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"] && (
            <img
              src={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="pokemon-imagen"
            />
          )}
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
