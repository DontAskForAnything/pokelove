import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonDetails } from "../utils/interfaces";
import {
  LuCloudLightning,
  LuGauge,
  LuShield,
  LuSnowflake,
  LuSwords,
} from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PokemonBox = ({ pokemon }: { pokemon: Pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  if (!pokemonDetails) {
    // TODO: add search on main page, add more info on details, and add login, and favourites
    return <></>;
  }
  return (
    <Link
      to={`/pokemon/${pokemonDetails?.id}`}
      className="flex flex-row items-center justify-center rounded-lg shadow-lg overflow-hidden w-full relative hover:scale-105 transition transform"
    >
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
          {pokemon.name.toUpperCase()}{" "}
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
    </Link>
  );
};
