import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_INFO } from "../queries/getPokemonDetail";

const usePokemonInfo = (id: number) => {
    const [isLoading, setIsLoading] = useState(true); 
    const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
        variables: { id },
    });

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, [data]);

    const pokemon = data?.pokemon_v2_pokemon_by_pk || null;

    return {
        pokemon: pokemon || null,
        loading: loading || isLoading, 
        error,
    };
};

export default usePokemonInfo;

