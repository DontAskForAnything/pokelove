import { UserWithFavorites } from "./interfaces";
import { supabase } from "./supabase";

export async function fetchFavorites(
  user_id: string,
  setArrayOfFavIds: (array: number[]) => void,
) {
  const { data, error } = await supabase
    .from("favorites")
    .select("pokemon_id")
    .filter("user_id", "eq", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching Favorites:", error.message);
    return [];
  }

  const pokemonIds = data.map((pokemon) => pokemon.pokemon_id);
  setArrayOfFavIds(pokemonIds);
}

export async function removeFavorite(
  user_id: string,
  pokemon_id: number,
  removeFavId: (id: number) => void,
) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user_id)
    .eq("pokemon_id", pokemon_id);

  if (error) {
    console.error("Error while removing favourite pokemon:", error.message);
    return;
  }
  removeFavId(pokemon_id);
}

export async function addToFavorites(
  user_id: string,
  pokemon_id: number,
  addFavId: (id: number) => void,
) {
  const { error } = await supabase.from("favorites").insert([
    {
      user_id: user_id,
      pokemon_id: pokemon_id,
    },
  ]);

  if (error) {
    console.error("Error while removing favourite pokemon:", error.message);
    return;
  }
  addFavId(pokemon_id);
}

export const fetchUserDataAndFavorites = async (
  userId: string,
): Promise<UserWithFavorites | null> => {
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (userError) {
      throw new Error(`Error fetching user data: ${userError.message}`);
    }

    const { data: favoritePokemons, error: favoriteError } = await supabase
      .from("favorites")
      .select("pokemon_id")
      .eq("user_id", userId);

    if (favoriteError) {
      throw new Error(
        `Error fetching favorite Pokemon IDs: ${favoriteError.message}`,
      );
    }

    const favoritePokemonIds = favoritePokemons.map(
      (pokemon) => pokemon.pokemon_id,
    );

    return {
      user: userData,
      favorite_pokemons_id: favoritePokemonIds,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getRandomUsers = async (limit: number = 5) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("random()")
    .limit(limit);

  if (error) {
    console.error("Error while removing favourite pokemon:", error.message);
    return;
  }
  console.log("Random Users:", data);
  return data;
};
