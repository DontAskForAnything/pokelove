import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import PokemonList from "../components/PokemonList";
import { useNavigate } from "react-router-dom";
import { RandomUsers } from "../components/RandomUsers";

export const PokemonIndexPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mt-16">
          <div className=" fixed top-0 z-20 bg-gray-200 right-0 left-0 ">
            <div className="flex justify-between items-center h-20 mx-auto container p-4 relative">
              <RandomUsers />
              <h1 className="text-2xl font-bold text-center  absolute w-full mx-auto">
                Pokémon List
              </h1>

              <SignedOut>
                <SignInButton>
                  <div className=" px-8 outline-none:focus flex justify-center items-center cursor-pointer  h-10 rounded-lg  bg-gradient-to-br from-pink-500 to-orange-400 hover:scale-105 text-white ">
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
          </div>
          <PokemonList />
        </div>
      </div>
    </>
  );
};
