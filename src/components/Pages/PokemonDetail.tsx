import { useParams } from "react-router-dom";
import usePokemonInfo from "../../hooks/UsePokemonInfo";
import "../pokemonDetail.css";
import traduccionesTipos from "../../utils/traduccionesTipos";
import Navbar from "../Navbar";

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

  const tiposPokemon: string[] = pokemon.pokemon_v2_pokemontypes
    .slice(0, 2)
    .map((tipo: any) => tipo.pokemon_v2_type.name.toLowerCase());

  let movimientosPrincipales = pokemon.pokemon_v2_pokemonmoves
    .filter((mov: any) => mov.level !== null)
    .sort((a: any, b: any) => b.level - a.level);

  const movimientosUnicos = new Map();
  movimientosPrincipales = movimientosPrincipales.filter((mov: any) => {
    if (!movimientosUnicos.has(mov.pokemon_v2_move.name)) {
      movimientosUnicos.set(mov.pokemon_v2_move.name, true);
      return true;
    }
    return false;
  });

  movimientosPrincipales = movimientosPrincipales.slice(0, 2);

  return (
    <div>
      <Navbar />
      <div className="pokemon-detail-page">
        <div className={`pokemon-detail-container ${tiposPokemon[0] || ""}`}>
          {sprite ? (
            <img src={sprite} alt={pokemon.name} className="pokemon-image" />
          ) : (
            <p>Imagen no disponible</p>
          )}

          <div className="pokemon-header">
            <span className="pokemon-numero">#{pokemon.id}</span>
            <h3 className="pokemon-nombre">{pokemon.name}</h3>
          </div>

          <div className="pokemon-tipos-detalles">
            {tiposPokemon.map((nombreTipo: string) => (
              <span key={nombreTipo} className={`tipo ${nombreTipo}`}>
                {traduccionesTipos[nombreTipo] || nombreTipo}
              </span>
            ))}
          </div>

          <div className="pokemon-info">
            <p><strong>Peso:</strong> {pokemon.weight ? pokemon.weight / 10 : "N/A"} kg</p>
            <p><strong>Altura:</strong> {pokemon.height ? pokemon.height / 10 : "N/A"} m</p>

            <div className="pokemon-habilidades">
              <h3>Ataques principales:</h3>
              <div className="habilidades-container">
                {movimientosPrincipales.length > 0 ? (
                  movimientosPrincipales.map((mov: any) => {
                    const tipoMovimiento = mov.pokemon_v2_move.pokemon_v2_type.name.toLowerCase();
                    return (
                      <div key={mov.pokemon_v2_move.name} className="habilidad">
                        <img
                          src={`/tipos/ataque_${tipoMovimiento}.png`}
                          alt={tipoMovimiento}
                          className="habilidad-icono"
                          onError={(e) => (e.currentTarget.src = "/tipos/ataque_default.png")}
                        />
                        <span className="habilidad-nombre">{mov.pokemon_v2_move.name || "Desconocida"}</span>
                      </div>
                    );
                  })
                ) : (
                  <p>No se encontraron ataques principales.</p>
                )}
              </div>
            </div>

            
                    {/* Estadísticas del Pokémon */}
          <div className="pokemon-stats">
            <h3>Estadísticas:</h3>
            <div className="stats-grid">
              {pokemon.pokemon_v2_pokemonstats?.length > 0 ? (
                pokemon.pokemon_v2_pokemonstats.map((stat: any) => {
                  const porcentaje = (stat.base_stat / 150) * 10; // Normalizar a 10 bloques
                  return (
                    <div key={stat.pokemon_v2_stat.name} className="stat-column">
                      <div className="stat-blocks">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`stat-block ${
                              i < porcentaje ? `filled ${tiposPokemon[0]}` : ""
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="stat-name">{stat.pokemon_v2_stat.name}</span>
                    </div>
                  );
                })
              ) : (
                <p>No se encontraron estadísticas.</p>
              )}
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
