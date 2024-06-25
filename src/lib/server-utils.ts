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

  let pokeAbilities: string[] = [];
  if (data.abilities && data.abilities.length > 0) {
    pokeAbilities = data.abilities.map(
      (typeEntry: { ability: { name: string } }) => typeEntry.ability.name
    );
  }

  return { pokeImage, pokeTypes, pokeAbilities };
}

export async function fetchAllPokemonsDetails(
  pokemonArray: PokemonShort[]
): Promise<PokemonDetails[]> {
  const promises = pokemonArray.map(async pokemon => {
    const details = await fetchPokemonDetails(pokemon.url);
    return {
      ...pokemon,
      pokeImage: details.pokeImage,
      pokeTypes: details.pokeTypes,
      pokeAbilities: details.pokeAbilities
    };
  });

  const detailedPokemonArray = await Promise.all(promises);
  return detailedPokemonArray;
}

export async function fetchByType(
  type: string,
  currentPage: number
): Promise<{ results: PokemonShort[]; totalPages: number }> {
  const response = await fetch(`${API_URL}/type/${type}`);
  const data = await response.json();

  // Трансформиране на данните да съдържат само name и url
  const simplifiedPokemonList: PokemonShort[] = data.pokemon.map(
    (entry: { pokemon: { name: string; url: string } }) => ({
      name: entry.pokemon.name,
      url: entry.pokemon.url
    })
  );

  // Изчисляване на офсета
  const offset = (currentPage - 1) * LIMIT;

  // Връщане на записите според офсета и лимита
  const results = simplifiedPokemonList.slice(offset, offset + LIMIT);

  // Изчисляване на общия брой страници
  const totalPages = Math.ceil(simplifiedPokemonList.length / LIMIT);

  return { results, totalPages };
}

export async function fetchPokemonPages(query: string) {
  const response = await fetch(`${API_URL}/pokemon?query=${query}`);
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  return totalPages;
}

export async function fetchWithQuery(
  query: string,
  currentPage: number
): Promise<{ results: PokemonShort[]; totalPages: number }> {
  const allResults = await fetchAllPokemonCollection();

  // Филтриране на резултатите по query
  const filteredResults = allResults.filter((pokemon: PokemonShort) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  // Изчисляване на офсета
  const offset = (currentPage - 1) * LIMIT;

  // Връщане на записите според офсета и лимита
  const results = filteredResults.slice(offset, offset + LIMIT);

  // Изчисляване на общия брой страници
  const totalPages = Math.ceil(filteredResults.length / LIMIT);

  return { results, totalPages };
}

export async function fetchWithQueryAndType(
  query: string,
  type: string,
  currentPage: number
): Promise<{ results: PokemonShort[]; totalPages: number }> {
  const allResults = await fetchAllPokemonCollection();

  // Филтриране на резултатите по query
  const filteredResults = allResults.filter((pokemon: PokemonShort) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  // Получаване на подробности за всеки покемон и филтриране по тип
  const detailedResults = await Promise.all(
    filteredResults.map(async (pokemon: PokemonShort) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return { ...pokemon, types: details.pokeTypes };
    })
  );

  const finalResults = detailedResults.filter(pokemon =>
    pokemon.types.includes(type)
  );

  // Изчисляване на офсета
  const offset = (currentPage - 1) * LIMIT;

  // Връщане на записите според офсета и лимита
  const results = finalResults.slice(offset, offset + LIMIT);

  // Изчисляване на общия брой страници
  const totalPages = Math.ceil(finalResults.length / LIMIT);

  return { results, totalPages };
}
