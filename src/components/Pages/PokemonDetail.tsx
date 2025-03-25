import { useParams } from "react-router-dom";
import usePokemonInfo from "../../hooks/UsePokemonInfo";
import "../pokemonDetail.css";
import traduccionesTipos from "../../utils/traduccionesTipos";

const PokemonDetail = () => {
  const { id } = useParams();
  const pokemonId = id ? parseInt(id, 10) : null;

  if (!pokemonId) return <p>Error: ID de Pokémon no válido</p>;

  const { pokemon, loading, error } = usePokemonInfo(pokemonId);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!pokemon) return <p>No se encontró el Pokémon.</p>;

  const sprite =
    pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.other?.["official-artwork"]?.front_default;

  // Obtener los tipos del Pokémon
  const tiposPokemon: string[] = pokemon.pokemon_v2_pokemontypes.map(
    (tipo: any) => tipo.pokemon_v2_type.name
  );

  return (
    <div className="pokemon-detail-page">
      <div className={`pokemon-detail-container ${tiposPokemon[0] || ""}`}>
        {/* Imagen del Pokémon */}
        {sprite ? (
          <img src={sprite} alt={pokemon.name} className="pokemon-image" />
        ) : (
          <p>Imagen no disponible</p>
        )}

        {/* Nombre y número del Pokémon */}
        <div className="pokemon-header">
          <span className="pokemon-numero">#{pokemon.id}</span>
          <h3 className="pokemon-nombre">{pokemon.name}</h3>
        </div>

        {/* Tipos del Pokémon */}
        <div className="pokemon-tipos-detalles">
          {tiposPokemon.map((nombreTipo: string) => (
            <span key={nombreTipo} className={`tipo ${nombreTipo}`}>
              {traduccionesTipos[nombreTipo] || nombreTipo}
            </span>
          ))}
        </div>

        {/* Información del Pokémon */}
        <div className="pokemon-info">
          <p><strong>Peso:</strong> {pokemon.weight ? pokemon.weight / 10 : "N/A"} kg</p>
          <p><strong>Altura:</strong> {pokemon.height ? pokemon.height / 10 : "N/A"} m</p>

          {/* Ataques del Pokémon filtrados por tipo */}
          <div className="pokemon-habilidades">
            <h3>Ataques:</h3>
            <div className="habilidades-container">
              {pokemon.pokemon_v2_pokemonmoves
                .filter((mov: any) =>
                  tiposPokemon.includes(mov.pokemon_v2_move.pokemon_v2_type.name)
                ) // Filtra solo los ataques del mismo tipo
                .map((mov: any) => {
                  const tipoMovimiento = mov.pokemon_v2_move.pokemon_v2_type.name.toLowerCase();
                  return (
                    <div key={mov.pokemon_v2_move.name} className="habilidad">
                      <img
                        src={`/tipos/ataque_${tipoMovimiento}.png`}
                        alt={tipoMovimiento}
                        className="habilidad-icono"
                      />
                      <span className="habilidad-nombre">{mov.pokemon_v2_move.name || "Desconocida"}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>

          {/* Estadísticas del Pokémon */}
          <div className="pokemon-stats">
            <h3>Estadísticas:</h3>
            <ul>
              {pokemon.pokemon_v2_pokemonstats?.length > 0 ? (
                pokemon.pokemon_v2_pokemonstats.map((stat: any) => (
                  <li key={stat.pokemon_v2_stat?.name}>
                    <strong>{stat.pokemon_v2_stat?.name}:</strong> {stat.base_stat}
                  </li>
                ))
              ) : (
                <p>No se encontraron estadísticas.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
