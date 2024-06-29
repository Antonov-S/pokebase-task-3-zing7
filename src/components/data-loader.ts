import {
  fetchAllPokemonsDetails,
  fetchByType,
  fetchWithQuery,
  fetchWithQueryAndType,
  fetchPokemonDataWithPagination
} from "@/lib/server-utils";
import { PokemonDetails, PokemonShort } from "@/types/pokemon-api";

type DataLoaderProps = {
  page: number;
  query: string;
  type: string;
};

export async function DataLoader({ page, query, type }: DataLoaderProps) {
  let results: PokemonShort[] = [];
  let totalPages = 1;
  let totalCount = 0;

  const effectiveType = type === "default" ? "" : type;

  if (query && query.trim() !== "" && effectiveType.trim() !== "") {
    const data = await fetchWithQueryAndType(query, effectiveType, page);
    results = data.results;
    totalPages = data.totalPages;
    totalCount = data.totalCount;
  } else if (query && query.trim() !== "") {
    const data = await fetchWithQuery(query, page);
    results = data.results;
    totalPages = data.totalPages;
    totalCount = data.totalCount;
  } else if (effectiveType && effectiveType.trim() !== "") {
    const data = await fetchByType(effectiveType, page);
    results = data.results;
    totalPages = data.totalPages;
    totalCount = data.totalCount;
  } else {
    const data = await fetchPokemonDataWithPagination(page);
    results = data.results;
    totalPages = data.totalPages;
    totalCount = data.totalCount;
  }

  const totalResults = totalCount;

  const populatedResults: PokemonDetails[] = await fetchAllPokemonsDetails(
    results
  );

  return { populatedResults, totalPages, totalResults };
}
