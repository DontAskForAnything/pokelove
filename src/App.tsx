import { Routes, Route, Navigate } from "react-router-dom";
import { PokemonDetailsPage } from "./pages/PokemonDetails";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { PokemonIndexPage } from "./pages/PokemonIndex";
import { MePage } from "./pages/Me";
import { useEffect } from "react";
import { fetchFavorites } from "./utils/supabaseRequests";
import { useFavIds } from "./utils/useFavIds";
import { UserPage } from "./pages/UserPage";

function App() {
  const { setArrayOfFavIds } = useFavIds();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (user) {
      user?.id && fetchFavorites(user.id, setArrayOfFavIds);
    }
  }, [isLoaded, setArrayOfFavIds, user]);

  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<PokemonIndexPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route
          path="/me/"
          element={
            <>
              <SignedIn>
                <MePage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
