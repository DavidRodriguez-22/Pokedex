import { useQuery } from "@apollo/client";
import { GET_POKEMON_INFO } from "../queries/getPokemonInfo";

const usePokemonInfo = (id: number) => {
    const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
        variables: { id },
    });

    // Aseguramos que no sea undefined
    const pokemon = data?.pokemon_v2_pokemon_by_pk || null;

    // Devuelve null si no hay datos de pokemon
    return {
        pokemon: pokemon || null,
        loading,
        error,
    };
};


export default usePokemonInfo;
