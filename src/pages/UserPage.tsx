import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserWithFavorites } from "../utils/interfaces";
import { fetchUserDataAndFavorites } from "../utils/supabaseRequests";
import { PokemonBox } from "../components/PokemonBox";

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<UserWithFavorites | null>();
  useEffect(() => {
    id && fetchUserDataAndFavorites(id).then((data) => setData(data));
  }, [id]);

  return (
    <div className="flex-1 flex h-screen">
      <div className="m-4 shadow-lg rounded-xl w-full flex-1  bg-gray-100 ">
        <div className="flex-1 bg-gray-100  flex  flex-col">
          <h2 className="ml-4 text-4xl  mb-2 text-center p-6">
            <span className="font-bold">@{data?.user.username}</span>'s
            Favorites
          </h2>
          <div className="mx-12 gap-5 grid grid-cols-2  pb-8 ">
            {data?.favorite_pokemons_id.map((pokemon_id, index) => (
              <PokemonBox id={pokemon_id} key={index} justDisplay={true} />
            ))}
          </div>
          {/* //todo : no favourite, yet */}
        </div>
      </div>
    </div>
  );
};
