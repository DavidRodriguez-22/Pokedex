import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "../queries/getPokemonName";

const usePokemon = (nombre: string) => {
  const searchName = nombre.trim() ? `%${nombre.toLowerCase()}%` : null;
  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: searchName },
    skip: !searchName, 
  });

  return { data, loading, error };
};

export default usePokemon;
