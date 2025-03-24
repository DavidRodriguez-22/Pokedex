import { useParams } from "react-router-dom";
import usePokemonInfo from "../../hooks/UsePokemonInfo"; // Corregido el import
import "../pokemonDetail.css"; // (Si usas alias @ para src en Vite)
import traduccionesTipos from "../../utils/traduccionesTipos";

const PokemonDetail = () => {
  const { id } = useParams();

  // Convertimos `id` a número de forma segura
  const pokemonId = id ? parseInt(id, 10) : null;

  // Si el id no es válido, mostramos un mensaje de error
  if (!pokemonId) return <p>Error: ID de Pokémon no válido</p>;

  const { pokemon, loading, error } = usePokemonInfo(pokemonId);

  console.log("Datos del Pokémon:", pokemon); // 🔍 Verifica los datos en la consola

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!pokemon) return <p>No se encontró el Pokémon.</p>;

  // Obtener la imagen del Pokémon desde los sprites (Verificamos que existan datos)
  const sprite =
    pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"]?.front_default;

  console.log("Datos completos del Pokémon:", pokemon);
  console.log("Habilidades:", pokemon.pokemon_v2_pokemonabilities);
  console.log("Sprites:", pokemon.pokemon_v2_pokemonsprites);
  console.log("Tipos:", pokemon.pokemon_v2_pokemontypes);
  console.log("Estadísticas:", pokemon.pokemon_v2_pokemonstats);

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-numero">
        <span className="numero-visible">#{pokemon.id}</span>
      </div>

      <h3 className="pokemon-titulo">
        <span className="pokemon-nombre">{pokemon.name}</span>
      </h3>

      {sprite ? (
        <img src={sprite} alt={pokemon.name} className="pokemon-image" />
      ) : (
        <p>Imagen no disponible</p>
      )}

      <div className="pokemon-info">
        <span><p>Peso: {pokemon.weight ? pokemon.weight / 10 : "N/A"} kg</p></span>
        <span><p>Altura: {pokemon.height ? pokemon.height / 10 : "N/A"} m</p></span>

        <div className="pokemon-tipos">
          {pokemon.pokemon_v2_pokemontypes.map((tipo: any) => {
            const nombreTipo = tipo.pokemon_v2_type.name;
            return (
              <span key={nombreTipo} className={`tipo ${nombreTipo}`}>
                {traduccionesTipos[nombreTipo] || nombreTipo}
              </span>
            );
          })}
        </div>



        <h3>Habilidades:</h3>
        <ul>
          {pokemon.pokemon_v2_pokemonabilities?.length > 0 ? (
            pokemon.pokemon_v2_pokemonabilities.map((hab: any) => (
              <li key={hab.pokemon_v2_ability?.name}>{hab.pokemon_v2_ability?.name || "Desconocida"}</li>
            ))
          ) : (
            <p>No se encontraron habilidades.</p>
          )}
        </ul>

        <h3>Estadísticas:</h3>
        <ul>
          {pokemon.pokemon_v2_pokemonstats?.length > 0 ? (
            pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
              <li key={stat.pokemon_v2_stat?.name}>
                <span>{stat.pokemon_v2_stat?.name}:</span> {stat.base_stat}
              </li>
            ))
          ) : (
            <p>No se encontraron estadísticas.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
