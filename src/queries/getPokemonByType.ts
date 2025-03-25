import { gql } from "@apollo/client";

export const GET_POKEMON_BY_TYPE = gql`
  query GetPokemonByType($type: String!) {
    pokemon_v2_pokemontype(
      where: { pokemon_v2_type: { name: { _eq: $type } } }
    ) {
      pokemon_v2_pokemon {
        id
        name
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {  # Agregamos la relación de tipos
          pokemon_v2_type {
            name  # Obtenemos el nombre del tipo
          }
        }
      }
    }
  }
`;

