import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../services/graphql";
import PokemonList from "../PokemonList";
import Navbar from "../Navbar";
import Buscador from "../BuscadorName.tsx";
import BuscadorPorTipos from "../BuscadorType.tsx";

const App = () => {
  const [filtro, setFiltro] = useState("");

  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Buscador onSearch={setFiltro} />
        <BuscadorPorTipos setFiltro={setFiltro} />
        <PokemonList filtro={filtro} />
        
        
      </>
    </ApolloProvider>
  );
};

export default App;