import Link from "next/link";

import EmptyView from "./empty-view";
import {
  fetchAllPokemonCollection,
  fetchPokemonDetails,
  fetchPokemonDataWithPagination,
  fetchAllPokemonDetails
} from "@/lib/server-utils";
import Search from "./search";
import { PokemonShort, PokemonDetails } from "@/types/pokemon-api";
import ItemRow from "./item-row";
import { API_URL, LIMIT } from "@/lib/constants";
import PaginationControls from "./pagination-controls";

type itemsListProps = {
  page: number;
};

async function ItemsList({ page }: itemsListProps) {
  const { results, totalPages } = await fetchPokemonDataWithPagination(page);
  const populatedResults = await fetchAllPokemonDetails(results);

  const previousPath = page > 1 ? `/?page=${page - 1}` : "";
  const nextPath = totalPages > LIMIT * page ? `/?page=${page + 1}` : "";

  return (
    <ul className="col-start-1 col-end-2 row-start-2 row-end-3 bg-white overflow-y-scroll relative custom-scrollbar">
      {/* <EmptyView /> */}

      <Search />

      {populatedResults.map((pokemon: PokemonDetails, index: number) => {
        return <ItemRow key={index} pokemon={pokemon} />;
      })}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </ul>
  );
}

export default ItemsList;
