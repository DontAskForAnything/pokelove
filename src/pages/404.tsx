import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pokemonData = [
  {
    name: "Snorlax",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    color: "bg-slate-400",
    textColor: "text-slate-400",
  },
  {
    name: "Cubone",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png",
    color: "bg-stone-400",
    textColor: "text-stone-400",
  },
  {
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    color: "bg-orange-400",
    textColor: "text-orange-400",
  },
];

export const Page404 = ({
  text = "Sorry! The page you're looking for is not here.",
}) => {
  const navigate = useNavigate();

  const [selectedPokemon, setSelectedPokemon] = useState(pokemonData[0]);

  useEffect(() => {
    const randomPokemon =
      pokemonData[Math.floor(Math.random() * pokemonData.length)];
    setSelectedPokemon(randomPokemon);
  }, []);

  return (
    <div
      className={`${selectedPokemon.color} w-screen h-screen justify-center flex-col flex items-center flex-1`}
    >
      <div className="justify-center flex items-center">
        <h3
          style={{ fontSize: 300 }}
          className={`font-bold mb-2 text-stone-200`}
        >
          4
        </h3>
        <img
          src={selectedPokemon.image}
          alt={selectedPokemon.name}
          className="h-96 drag-none"
        />
        <h3
          style={{ fontSize: 300 }}
          className={`font-bold mb-2 text-stone-200`}
        >
          4
        </h3>
      </div>
      <h3 className={`font-bold mb-2 text-lg text-stone-200`}>{text}</h3>
      <div
        onClick={() => navigate("/")}
        className={`mt-4 bg-stone-200 px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition`}
      >
        <h3 className={`font-bold text-lg  ${selectedPokemon.textColor} `}>
          Back home
        </h3>
      </div>
    </div>
  );
};
