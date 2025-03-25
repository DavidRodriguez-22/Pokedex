import "./pokemonStats.css"; // Archivo CSS para estilos

interface Stat {
  name: string;
  value: number;
}

const PokemonStats = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="stats-container">
      {stats.map((stat) => (
        <div key={stat.name} className="stat-item">
          <span className="stat-name">{stat.name.toUpperCase()}</span>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${(stat.value / 255) * 100}%` }}>
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
