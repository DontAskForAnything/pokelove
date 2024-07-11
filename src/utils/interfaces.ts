export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
  front_default: string;
}
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Ability {
  name: string;
  url: string;
}

interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetails {
  id: number;
  height: number;
  name: string;
  sprites: PokemonSprites;
  weight: number;
  abilities: PokemonAbility[];

  stats: PokemonStat[];
}
