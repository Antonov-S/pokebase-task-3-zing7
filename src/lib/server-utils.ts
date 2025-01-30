import "server-only";

import { API_URL, DEFAULT_POKE_IMAGE, LIMIT } from "@/lib/constants";
import { PokemonAPI, PokemonDetails, PokemonShort } from "@/types/pokemon-api";

export const fetchAllPokemonCollection = async () => {
  const response = await fetch(`${API_URL}/pokemon?limit=100000`);
  const data = await response.json();
  return data.results;
};

export async function fetchPokemonDataWithPagination(
  currentPage: number
): Promise<{
  results: PokemonShort[];
  totalPages: number;
  totalCount: number;
}> {
  const allResults = await fetchAllPokemonCollection();
  const totalCount = allResults.length;
  const offset = (currentPage - 1) * LIMIT;

  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${LIMIT}`
  );
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  const results: PokemonShort[] = data.results;

  return { results, totalPages, totalCount };
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
  const promises = pokemonArray.map(pokemon =>
    fetchPokemonDetails(pokemon.url)
  );
  const detailedDataArray = await Promise.all(promises);

  const detailedPokemonArray = pokemonArray.map((pokemon, index) => ({
    ...pokemon,
    pokeImage: detailedDataArray[index].pokeImage,
    pokeTypes: detailedDataArray[index].pokeTypes,
    pokeAbilities: detailedDataArray[index].pokeAbilities
  }));

  return detailedPokemonArray;
}

export async function fetchByType(
  type: string,
  currentPage: number
): Promise<{
  results: PokemonShort[];
  totalPages: number;
  totalCount: number;
}> {
  const response = await fetch(`${API_URL}/type/${type}`);
  const data = await response.json();

  const simplifiedPokemonList: PokemonShort[] = data.pokemon.map(
    (entry: { pokemon: { name: string; url: string } }) => ({
      name: entry.pokemon.name,
      url: entry.pokemon.url
    })
  );
  const totalCount = simplifiedPokemonList.length;

  const offset = (currentPage - 1) * LIMIT;
  const results = simplifiedPokemonList.slice(offset, offset + LIMIT);
  const totalPages = Math.ceil(simplifiedPokemonList.length / LIMIT);

  return { results, totalPages, totalCount };
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
): Promise<{
  results: PokemonShort[];
  totalPages: number;
  totalCount: number;
}> {
  const allResults = await fetchAllPokemonCollection();
  const filteredResults = allResults.filter((pokemon: PokemonShort) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  const totalCount = filteredResults.length;

  const offset = (currentPage - 1) * LIMIT;
  const results = filteredResults.slice(offset, offset + LIMIT);
  const totalPages = Math.ceil(filteredResults.length / LIMIT);

  return { results, totalPages, totalCount };
}

export async function fetchWithQueryAndType(
  query: string,
  type: string,
  currentPage: number
): Promise<{
  results: PokemonShort[];
  totalPages: number;
  totalCount: number;
}> {
  const allResults = await fetchAllPokemonCollection();

  const filteredResults = allResults.filter((pokemon: PokemonShort) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalCount = filteredResults.length;

  const detailedResults = await Promise.all(
    filteredResults.map(async (pokemon: PokemonShort) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return { ...pokemon, types: details.pokeTypes };
    })
  );

  const finalResults = detailedResults.filter(pokemon =>
    pokemon.types.includes(type)
  );

  const offset = (currentPage - 1) * LIMIT;
  const results = finalResults.slice(offset, offset + LIMIT);
  const totalPages = Math.ceil(finalResults.length / LIMIT);

  return { results, totalPages, totalCount };
}

export async function fetchPokemon(name: string): Promise<PokemonAPI.Pokemon> {
  const response = await fetch(`${API_URL}/pokemon/${name}`);
  const data = await response.json();
  return data;
}
