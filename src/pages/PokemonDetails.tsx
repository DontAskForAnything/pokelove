import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../utils/interfaces";
import {
  LuCloudLightning,
  LuGauge,
  LuShield,
  LuSnowflake,
  LuSwords,
} from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { Loading } from "../components/Loading/Loding";
import { convertDecimeters, convertHectograms } from "../utils/calculations";
import { useFavIds } from "../utils/useFavIds";
import { useUser } from "@clerk/clerk-react";
import { addToFavorites, removeFavorite } from "../utils/supabaseRequests";
import { Page404 } from "./404";

export const PokemonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [notExisting, setNotExisting] = useState<boolean>(false);
  const { favIds, addFavId, removeFavId } = useFavIds();
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;

    const fetchPokemonData = async () => {
      const startTime = Date.now();

      await axios
        .get(`${import.meta.env.VITE_BASE_API_URL}/pokemon/${id}`)
        .then(async (response) => {
          const elapsedTime = Date.now() - startTime;
          const delay = Math.max(1500 - elapsedTime, 0);

          if (isMounted) {
            setTimeout(() => {
              setPokemon(response.data);
            }, delay);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setNotExisting(true);
          }
        });
    };

    fetchPokemonData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (notExisting) {
    return (
      <Page404
        text={`Pokemon with id: #${id?.toString().padStart(4, "0")} does not exist`}
      />
    );
  }
  if (!pokemon) {
    return <Loading />;
  }

  return (
    <div className="flex-1  h-screen flex">
      <div className=" m-4 shadow-lg rounded-xl overflow-hidden flex-1  flex bg-pink-500">
        <div className="flex-1 bg-gray-300 flex justify-center items-center ">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="max-w-full max-h-full drag-none"
          />
        </div>
        <div className="flex-1 bg-gray-100 p-8 items-center  justify-center relative">
          <h2 className="text-3xl font-bold mb-2 text-center">
            {pokemon.name.toUpperCase()}{" "}
            <span className="opacity-60">
              #{pokemon.id.toString().padStart(4, "0")}
            </span>
          </h2>

          <div className="px-10">
            <h3 className="text-xl font-bold mb-4">Info</h3>
            <div className=" flex-row justify-between flex w-full">
              <p className="text-xl">
                Height: {convertDecimeters(pokemon.height)}
              </p>
              <p className="text-xl">
                Weight: {convertHectograms(pokemon.weight)}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {renderStatIcon(index)}
                    <span className="text-xl">{stat.base_stat}</span>
                    <span>{capitalizeWords(stat.stat.name)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {user?.id && (
            <>
              {" "}
              <div
                onClick={(event) => {
                  event.preventDefault();
                  if (favIds?.includes(pokemon?.id) && user?.id) {
                    removeFavorite(user.id, pokemon.id, removeFavId);
                  } else {
                    user?.id && addToFavorites(user.id, pokemon.id, addFavId);
                  }
                }}
                className="cursor-pointer"
              >
                {favIds?.includes(pokemon?.id) ? (
                  <FaHeart className="absolute top-10 z-50 hover:scale-110 right-12 w-8 h-8 text-pink-500 " />
                ) : (
                  <FaRegHeart className="absolute top-10 right-12 w-8 h-8 z-50 hover:scale-110  text-pink-500 " />
                )}
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to render appropriate icon for each stat
const renderStatIcon = (index: number) => {
  switch (index) {
    case 0:
      return <FaHeart className="w-6 h-6 text-red-500" />;
    case 1:
      return <LuSwords className="w-6 h-6 text-orange-500" />;
    case 2:
      return <LuShield className="w-6 h-6 text-blue-500" />;
    case 3:
      return <LuCloudLightning className="w-6 h-6 text-yellow-500" />;
    case 4:
      return <LuSnowflake className="w-6 h-6 text-cyan-500" />;
    case 5:
      return <LuGauge className="w-6 h-6 text-green-500" />;
    default:
      return null;
  }
};

export default PokemonDetailsPage;

function capitalizeWords(str: string) {
  return str
    .replace(/\b([a-z])/g, function (match) {
      return match.toUpperCase();
    })
    .replace(/-/g, " ");
}
