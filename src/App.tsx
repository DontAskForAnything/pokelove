import { Routes, Route, Navigate } from "react-router-dom";
import { PokemonDetailsPage } from "./pages/PokemonDetails";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { PokemonIndexPage } from "./pages/PokemonIndex";
import { UserPage } from "./pages/User";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<PokemonIndexPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />

        <Route
          path="/me/"
          element={
            <SignedIn>
              <UserPage />
            </SignedIn>
          }
        />

        <Route
          path="/me/"
          element={
            <SignedOut>
              <Navigate to="/" replace />
            </SignedOut>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
