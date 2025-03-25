import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_TYPE } from "../queries/getPokemonType";

const usePokemonByType = (tipo: string) => {
  const [isLoading, setIsLoading] = useState(true); // Estado de carga manual
  const { data, loading, error } = useQuery(GET_POKEMON_BY_TYPE, {
    variables: { type: tipo.toLowerCase() },
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, [data]);

  return { data, loading: loading || isLoading, error };
};

export default usePokemonByType;
