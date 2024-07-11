import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import PokemonList from "../components/PokemonList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchFavorites } from "../utils/supabaseRequests";
import { useFavIds } from "../utils/useFavIds";

export const PokemonIndexPage = () => {
  const { setArrayOfFavIds } = useFavIds();
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      user?.id && fetchFavorites(user.id, setArrayOfFavIds);
    }
  }, [isLoaded, setArrayOfFavIds, user]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center h-14 mb-4">
        <h1 className="text-2xl font-bold ">Pokémon List</h1>
        <SignedOut>
          <SignInButton>
            <div className=" px-8 outline-none:focus flex justify-center items-center cursor-pointer  h-10 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 hover:scale-105 text-white ">
              Sign In
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <img
            onClick={() => navigate("/me")}
            src={user?.imageUrl}
            alt={"@" + user?.username + " avatar"}
            className="h-full aspect-square rounded-xl hover:scale-105 cursor-pointer"
          />
        </SignedIn>
      </div>
      <PokemonList />
    </div>
  );
};
