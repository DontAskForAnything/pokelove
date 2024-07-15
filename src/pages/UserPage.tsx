import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserWithFavorites } from "../utils/interfaces";
import { fetchUserDataAndFavorites } from "../utils/supabaseRequests";
import { PokemonBox } from "../components/PokemonBox";
import { NoFavoritePokemons } from "../components/NoFavouritePokemons";
import { Loading } from "../components/Loading/Loding";
import { Page404 } from "./404";

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<UserWithFavorites | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (id) {
      const startTime = Date.now();

      fetchUserDataAndFavorites(id)
        .then((data) => {
          const elapsedTime = Date.now() - startTime;
          const delay = Math.max(2000 - elapsedTime, 0);

          if (isMounted) {
            setTimeout(() => {
              setData(data);
              setLoading(false);
            }, delay);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return <Page404 text={"This user does not exist"} />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 flex min-h-screen">
      <div className="m-4 shadow-lg rounded-xl w-full overflow-hidden  bg-gray-100 ">
        {data?.favorite_pokemons_id.length ? (
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
          </div>
        ) : (
          <NoFavoritePokemons user_name={data?.user.username} />
        )}
      </div>
    </div>
  );
};
