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
        <div className="mt-20">
          <div className=" fixed top-0 z-20 bg-gray-200 right-0 left-0 ">
            <div className="flex justify-between items-center h-20 mx-auto container p-4 relative z-20">
              <RandomUsers />
              <h1 className="text-2xl font-bold text-center z-10 absolute w-full mx-auto">
                Pokémon List
              </h1>
              <SignedOut>
                <SignInButton>
                  <div className=" z-20 px-8 outline-none:focus flex justify-center items-center cursor-pointer  h-10 rounded-lg  bg-white hover:scale-105 text-black font-semibold transition-transform ">
                    Sign In
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <img
                  onClick={() => navigate("/me")}
                  src={user?.imageUrl}
                  alt={"@" + user?.username + " avatar"}
                  className="z-20 h-full aspect-square rounded-xl hover:scale-105 cursor-pointer drag-none"
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
