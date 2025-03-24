import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import Pokedex from "./Pages/Pokedex";


const App = () => {
    console.log("Renderizando App...");
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/pokedex" element={<Pokedex />} />
            </Routes>
        </Router>
    );
};

export default App;
