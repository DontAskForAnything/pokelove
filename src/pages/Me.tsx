import { SignOutButton, useUser } from "@clerk/clerk-react";
import { PokemonBox } from "../components/PokemonBox";
import { useFavIds } from "../utils/useFavIds";
import { NoFavoritePokemons } from "../components/NoFavouritePokemons";
import { LuShare } from "react-icons/lu";

export const MePage = () => {
  const { user } = useUser();
  const { favIds, removeFavId } = useFavIds();

  return (
    <div className="flex-1 flex h-screen">
      <div className="m-4 shadow-lg rounded-xl w-full flex-1  bg-gray-100 ">
        <div className="bg-gray-300 flex-row p-4 flex justify-between items-center relative">
          <div className="bg-gray-300 flex-row flex items-center">
            <img
              src={user?.imageUrl}
              alt={"@" + user?.username + "avatar"}
              className="h-24 aspect-square rounded-xl hover:scale-105 cursor-pointer"
            />
            <h2 className="ml-4 text-4xl font-semibold mb-2 text-center">
              @{user?.username}
            </h2>

            <LuShare
              onClick={async () => {
                const url = `${window.location.origin}/user/${user?.id}`;

                navigator.clipboard
                  .writeText(url)
                  .then(() => alert(`Copied your share url to clipboard`))
                  .catch((err) => console.error("Failed to copy:", err));
              }}
              className="h-5 w-6 rounded-tl-xl ml-4 cursor-pointer  font-semibold opacity-80 hover:opacity-100 hover:scale-125 text-black"
            />
          </div>
          <SignOutButton>
            <div
              onClick={() => {
                favIds.forEach((id) => {
                  removeFavId(id);
                });
              }}
              className="absolute top-0 right-0 pr-6 pl-6 rounded-bl-xl pt-4 pb-4 bg-white cursor-pointer font-bold opacity-80 hover:opacity-100 hover:scale-105 text-black"
            >
              Sign Out
            </div>
          </SignOutButton>
        </div>

        {favIds.length > 0 ? (
          <div className="flex-1 bg-gray-100  flex flex-col">
            <h2 className="ml-4 text-4xl font-bold mb-2 text-center p-6">
              My Favorites
            </h2>
            <div className="mx-12 gap-5 grid grid-cols-2  pb-8 ">
              {favIds.map((pokemon_id, index) => (
                <PokemonBox id={pokemon_id} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <NoFavoritePokemons />
        )}
      </div>
    </div>
  );
};
