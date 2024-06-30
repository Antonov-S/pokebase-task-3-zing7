namespace PokemonAPI {
  type Pokemon = {
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    base_experience: number;
    cries: {
      latest: string;
      legacy: string;
    };
    forms: {
      name: string;
      url: string;
    }[];
    game_indices: {
      game_index: number;
      version: {
        name: string;
        url: string;
      };
    }[];
    height: number;
    held_items: [];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: {
      move: {
        name: string;
        url: string;
      };
    }[];
    name: string;
    order: number;
    past_abilities: [];
    past_types: [];
    species: {
      name: string;
      url: string;
    };
    sprites: {
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
      other: {};
      versions: {};
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    weight: number;
  };
}

export type PokemonShort = {
  name: string;
  url: string;
};

export type PokemonDetails = PokemonShort & {
  pokeImage: string;
  pokeTypes: string[];
  pokeAbilities: string[];
};

export type HeldItem = {
  item: {
    name: string;
    url: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }[];
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Form = {
  name: string;
  url: string;
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Move = {
  move: {
    name: string;
    url: string;
  };
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type GameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};
