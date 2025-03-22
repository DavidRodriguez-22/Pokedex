import { ApolloProvider } from "@apollo/client";
import { client } from "./services/graphql";
import PokemonList from "./components/PokemonList";
import Navbar from "./components/Navbar";
import Buscador from "./components/Buscador";

const App = () => {
  return (
    
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Buscador />
        <PokemonList />
      </>
    </ApolloProvider>
    
  );
};

export default App;