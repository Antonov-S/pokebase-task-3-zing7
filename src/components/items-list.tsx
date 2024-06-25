import EmptyView from "./empty-view";
import {
  fetchWithQuery,
  fetchPokemonDataWithPagination,
  fetchAllPokemonsDetails,
  fetchByType,
  fetchWithQueryAndType
} from "@/lib/server-utils";
import { PokemonShort, PokemonDetails } from "@/types/pokemon-api";
import ItemRow from "./item-row";
import { LIMIT } from "@/lib/constants";
import PaginationControls from "./pagination-controls";
import SortBy from "./sortBy";

type ItemsListProps = {
  page: number;
  query: string;
  type: string;
};

async function ItemsList({ page, query, type }: ItemsListProps) {
  let results: PokemonShort[] = [];
  let totalPages = 1;

  // Използваме променлива за модифициране на стойността на type
  const effectiveType = type === "default" ? "" : type;

  // Fetch all data based on query and type
  if (query && query.trim() !== "" && effectiveType.trim() !== "") {
    const data = await fetchWithQueryAndType(query, effectiveType, page);
    results = data.results;
    totalPages = data.totalPages;
  } else if (query && query.trim() !== "") {
    const data = await fetchWithQuery(query, page);
    results = data.results;
    totalPages = data.totalPages;
  } else if (effectiveType && effectiveType.trim() !== "") {
    const data = await fetchByType(effectiveType, page);
    results = data.results;
    totalPages = data.totalPages;
  } else {
    const data = await fetchPokemonDataWithPagination(page);
    results = data.results;
    totalPages = data.totalPages;
  }

  const populatedResults = await fetchAllPokemonsDetails(results);

  // Предишна страница, само ако page > 1
  const previousPath =
    page > 1
      ? `/?page=${page - 1}${query ? `&query=${query}` : ""}${
          effectiveType ? `&type=${effectiveType}` : ""
        }`
      : "";

  // Следваща страница, само ако page < totalPages
  const nextPath =
    page < totalPages
      ? `/?page=${page + 1}${query ? `&query=${query}` : ""}${
          effectiveType ? `&type=${effectiveType}` : ""
        }`
      : "";

  return (
    <div className="col-start-1 col-end-2 row-start-2 row-end-3 bg-white overflow-y-scroll relative custom-scrollbar">
      <SortBy />

      {populatedResults.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <ul>
            {populatedResults.map((pokemon: PokemonDetails, index: number) => (
              <ItemRow key={index} pokemon={pokemon} />
            ))}
          </ul>
          <PaginationControls previousPath={previousPath} nextPath={nextPath} />
        </>
      )}
    </div>
  );
}

export default ItemsList;
