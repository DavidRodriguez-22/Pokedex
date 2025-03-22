import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta", // URL de la API GraphQL de PokeAPI
  cache: new InMemoryCache(),
});

export { client, gql };
