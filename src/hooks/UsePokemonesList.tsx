import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../queries/getPokemonList";

const PAGE_SIZE = 30;

const usePokemones = () => {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga manual

  const { data, loading, error, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { limit: PAGE_SIZE, offset },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [data]);

  const cargarMasPokemones = () => {
    setOffset((prevOffset) => {
      const nuevoOffset = prevOffset + PAGE_SIZE;
      fetchMore({
        variables: { limit: PAGE_SIZE, offset: nuevoOffset },
      });
      return nuevoOffset;
    });
  };

  const cargarPokemonesAnteriores = () => {
    setOffset((prevOffset) => {
      const nuevoOffset = Math.max(0, prevOffset - PAGE_SIZE);
      fetchMore({
        variables: { limit: PAGE_SIZE, offset: nuevoOffset },
      });
      return nuevoOffset;
    });
  };

  return { data, loading: loading || isLoading, error, cargarMasPokemones, cargarPokemonesAnteriores, offset };
};

export default usePokemones;
