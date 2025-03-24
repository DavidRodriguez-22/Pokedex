import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/graphql";
import Inicio from "./Pages/Inicio";
import Pokedex from "./Pages/Pokedex";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    {/* Página de inicio */}
                    <Route path="/" element={<Inicio />} />

                    {/* Página de la Pokédex */}
                    <Route path="/pokedex" element={<Pokedex />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
};

export default App;
