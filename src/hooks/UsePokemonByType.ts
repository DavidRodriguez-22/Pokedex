import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_TYPE } from "../queries/getPokemonByType";

const usePokemonByType = (tipo: string) => {
  const { data, loading, error } = useQuery(GET_POKEMON_BY_TYPE, {
    variables: { type: tipo.toLowerCase() },
  });
  return { data, loading, error };
};



export default usePokemonByType;
