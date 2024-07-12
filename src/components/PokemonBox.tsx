import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonDetails } from "../utils/interfaces";
import {
  LuCloudLightning,
  LuGauge,
  LuShield,
  LuSnowflake,
  LuSwords,
} from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFavorite } from "../utils/supabaseRequests";
import { useUser } from "@clerk/clerk-react";
import { useFavIds } from "../utils/useFavIds";

export const PokemonBox = ({
  id,
  justDisplay = false,
}: {
  id: number;
  justDisplay?: boolean;
}) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );
  const { favIds, addFavId, removeFavId } = useFavIds();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/pokemon/${id}`,
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <></>;
  }
  return (
    <div
      onClick={() => {
        !justDisplay && navigate(`/pokemon/${pokemonDetails?.id}`);
      }}
      className="flex flex-row items-center justify-center rounded-lg shadow-lg overflow-hidden w-full relative hover:scale-105 transition bg-white transform"
    >
      {!justDisplay && (
        <div
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (favIds?.includes(pokemonDetails?.id) && user?.id) {
              removeFavorite(user.id, pokemonDetails.id, removeFavId);
            } else {
              user?.id && addToFavorites(user.id, pokemonDetails.id, addFavId);
            }
          }}
          className="cursor-pointer"
        >
          {favIds?.includes(pokemonDetails?.id) ? (
            <FaHeart className="absolute top-4 z-50 hover:scale-110 right-6 w-5 h-5 text-pink-500 " />
          ) : (
            <FaRegHeart className="absolute top-4 right-6 w-5 h-5 z-50 hover:scale-110  text-pink-500 " />
          )}
        </div>
      )}
      <div className="relative">
        <img
          src={pokemonDetails?.sprites.other["official-artwork"].front_default}
          alt={pokemonDetails?.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          {pokemonDetails.name.toUpperCase()}{" "}
          <span className="opacity-50">
            #{pokemonDetails?.id.toString().padStart(4, "0")}
          </span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaHeart className="w-5 h-5 text-red-500" />
              <span>{pokemonDetails?.stats[0].base_stat} HP</span>
            </div>
            <div className="flex items-center gap-2">
              <LuSwords className="w-5 h-5 text-orange-500" />
              <span>{pokemonDetails?.stats[1].base_stat} ATK</span>
            </div>
            <div className="flex items-center gap-2">
              <LuShield className="w-5 h-5 text-blue-500" />
              <span>{pokemonDetails?.stats[2].base_stat} DEF</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LuCloudLightning className="w-5 h-5 text-yellow-500" />
              <span>{pokemonDetails?.stats[3].base_stat} SPATK</span>
            </div>
            <div className="flex items-center gap-2">
              <LuSnowflake className="w-5 h-5 text-cyan-500" />
              <span>{pokemonDetails?.stats[4].base_stat} SPDEF</span>
            </div>
            <div className="flex items-center gap-2">
              <LuGauge className="w-5 h-5 text-green-500" />
              <span>{pokemonDetails?.stats[5].base_stat} SPD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
