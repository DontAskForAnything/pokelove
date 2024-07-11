import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../utils/interfaces";
import {
  LuCloudLightning,
  LuGauge,
  LuShield,
  LuSnowflake,
  LuSwords,
} from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Loading } from "../components/Loding";

// Component for displaying Pokemon details based on ID
export const PokemonDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Accessing URL parameter 'id'

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch Pokemon data
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
        setPokemon(response.data);
        const speciesUrl = response.data.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionChainResponse = await axios.get(evolutionChainUrl);
        const evolutionChainData = evolutionChainResponse.data;
        console.log(evolutionChainData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();

    return () => {};
  }, [id]);

  if (!pokemon) {
    return <Loading />;
  }

  function convertDecimeters(decimeters: number) {
    // Calculate meters and centimeters
    const meters = Math.floor(decimeters / 10); // 1 meter is 10 decimeters
    const centimeters = (decimeters % 10) * 10; // 1 decimeter is 10 centimeters

    // Construct the result string
    let result = "";

    if (meters > 0) {
      result += `${meters} m`;
    }

    if (centimeters > 0) {
      if (result !== "") result += " "; // Add space if meters were included
      result += `${centimeters} cm`;
    }

    return result;
  }

  function convertHectograms(hectograms: number) {
    // Calculate kilograms and grams
    const kilograms = Math.floor(hectograms / 10); // 1 kilogram is 10 hectograms
    const grams = (hectograms % 10) * 100; // 1 hectogram is 100 grams

    // Construct the result string
    let result = "";

    if (kilograms > 0) {
      result += `${kilograms} kg`;
    }

    if (grams > 0) {
      if (result !== "") result += " "; // Add space if kilograms were included
      result += `${grams} g`;
    }

    return result;
  }

  return (
    <div className="  flex-1  h-screen flex">
      <div className=" m-4 shadow-lg rounded-xl overflow-hidden flex-1  flex bg-pink-500">
        <div className="flex-1 bg-gray-200 flex justify-center items-center ">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="flex-1 bg-gray-100 p-8 items-center  justify-center">
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
