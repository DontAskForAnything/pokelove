import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Pokemon } from "../utils/interfaces";
import { PokemonBox } from "./PokemonBox";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 20;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const fetchPokemons = async (page: number) => {
    setIsLoading(true);
    const offset = (page - 1) * itemsPerPage;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/pokemon?offset=${offset}&limit=${itemsPerPage}`,
      );
      const newPokemons = response.data.results.map((result: Pokemon) => ({
        name: result.name,
        url: result.url,
      }));
      setPokemons((prevPokemons) => {
        // Only return newPokemons if it's the first page, otherwise concat
        return page === 1 ? newPokemons : [...prevPokemons, ...newPokemons];
      });
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading],
  );

  return (
    <div className="grid grid-cols-2 gap-5">
      {pokemons.map((pokemon, index) => {
        return (
          <PokemonBox
            key={index}
            id={Number(
              pokemon.url.split("/")[pokemon.url.split("/").length - 2],
            )}
          />
        );
      })}
      {isLoading && <div className="text-center py-4">Loading...</div>}
      <div ref={lastPokemonElementRef} />
    </div>
  );
};

export default PokemonList;
