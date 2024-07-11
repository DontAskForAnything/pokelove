import { Routes, Route, Navigate } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import { PokemonDetailsPage } from "./pages/PokemonDetails";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
    </Routes>
  );
}

export default App;
