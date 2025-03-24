import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "../queries/getPokemonByName";

const usePokemon = (nombre: string) => {
  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: nombre.toLowerCase() },
  });

  return { data, loading, error };
};

export default usePokemon;
