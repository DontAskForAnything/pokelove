import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { PokemonBox } from "../components/PokemonBox";
import { useFavIds } from "../utils/useFavIds";

export const MePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { favIds, removeFavId } = useFavIds();

  return (
    <div className="flex-1 flex h-screen">
      <div className="m-4 shadow-lg rounded-xl w-full flex-1  bg-gray-100 ">
        <div className="bg-gray-300 flex-row p-4 flex justify-between items-center relative">
          <div className="bg-gray-300 flex-row flex items-center">
            <img
              onClick={() => navigate("/me")}
              src={user?.imageUrl}
              alt={"@" + user?.username + "avatar"}
              className="h-24 aspect-square rounded-xl hover:scale-105 cursor-pointer"
            />
            <h2 className="ml-4 text-4xl font-semibold mb-2 text-center">
              @{user?.username}
            </h2>
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

        <div className="flex-1 bg-gray-100  flex  flex-col">
          <h2 className="ml-4 text-4xl font-bold mb-2 text-center p-6">
            My Favorites
          </h2>
          <div className="mx-12 gap-5 grid grid-cols-2  pb-8 ">
            {favIds.map((pokemon_id, index) => (
              <PokemonBox id={pokemon_id} key={index} />
            ))}
          </div>
          {/* //todo : no favourite, yet */}
        </div>
      </div>
    </div>
  );
};
