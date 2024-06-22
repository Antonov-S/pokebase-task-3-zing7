// import "server-only";

import { API_URL, DEFAULT_POKE_IMAGE, LIMIT } from "@/lib/constants";
import { PokemonDetails, PokemonShort } from "@/types/pokemon-api";

export const fetchAllPokemonCollection = async () => {
  const response = await fetch(`${API_URL}/pokemon?limit=100000`);
  const data = await response.json();
  return data.results;
};

export async function fetchPokemonDataWithPagination(currentPage: number) {
  const offset = (currentPage - 1) * LIMIT;

  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${LIMIT}`
  );
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  const results = data.results;
  return { results, totalPages };
}

export async function fetchPokemonDetails(url: string) {
  const response = await fetch(url);
  const data = await response.json();

  const pokeImage = data.sprites.front_default || DEFAULT_POKE_IMAGE;

  let pokeTypes: string[] = [];
  if (data.types && data.types.length > 0) {
    pokeTypes = data.types.map(
      (typeEntry: { type: { name: string } }) => typeEntry.type.name
    );
  }

  return { pokeImage, pokeTypes };
}

export async function fetchAllPokemonDetails(
  pokemonArray: PokemonShort[]
): Promise<PokemonDetails[]> {
  const promises = pokemonArray.map(async pokemon => {
    const details = await fetchPokemonDetails(pokemon.url);
    return {
      ...pokemon,
      pokeImage: details.pokeImage,
      pokeTypes: details.pokeTypes
    };
  });

  const detailedPokemonArray = await Promise.all(promises);
  return detailedPokemonArray;
}

export async function fetchPokemonPages(query: string) {
  const response = await fetch(`${API_URL}/pokemon?query=${query}`);
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  return totalPages;
}
