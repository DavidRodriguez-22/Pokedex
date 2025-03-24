import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../services/graphql";
import PokemonList from "../PokemonList";
import Navbar from "../Navbar";
import Buscador from "../Buscador.tsx";

const App = () => {
  const [filtro, setFiltro] = useState("");

  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Buscador onSearch={setFiltro} />
        <PokemonList filtro={filtro} />
      </>
    </ApolloProvider>
  );
};

export default App;
/* Prueba de cambiotikitiki */