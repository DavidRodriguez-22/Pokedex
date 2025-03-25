import { gql } from "@apollo/client";

export const GET_POKEMON_INFO = gql`
  query GetPokemonInfo($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          name
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;
