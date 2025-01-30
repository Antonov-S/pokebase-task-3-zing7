"use client";

import { useEffect } from "react";

import SortBy from "./sortBy";
import EmptyView from "./empty-view";
import PaginationControls from "./pagination-controls";
import ItemRow from "./item-row";
import { PokemonDetails } from "@/types/pokemon-api";
import { usePokemonCount } from "@/contexts/pokemon-count-context";

type ItemsListProps = {
  page: number;
  query: string;
  type: string;
  populatedResults: PokemonDetails[];
  totalPages: number;
  totalResults: number;
};

async function ItemsList({
  page,
  query,
  type,
  populatedResults,
  totalPages,
  totalResults
}: ItemsListProps) {
  const { setCount } = usePokemonCount();

  useEffect(() => {
    setCount(totalResults);
  }, [totalResults, setCount]);

  const previousPath =
    page > 1
      ? `/?page=${page - 1}${query ? `&query=${query}` : ""}${
          type ? `&type=${type}` : ""
        }`
      : "";

  const nextPath =
    page < totalPages
      ? `/?page=${page + 1}${query ? `&query=${query}` : ""}${
          type ? `&type=${type}` : ""
        }`
      : "";

  return (
    <div className="col-start-1 col-end-2 row-start-2 row-end-3 bg-white overflow-y-scroll relative custom-scrollbar">
      <SortBy type={type} />

      {populatedResults.length === 0 ? (
        <EmptyView />
      ) : (
        <ul>
          {populatedResults.map((pokemon, index) => (
            <ItemRow key={index} pokemon={pokemon} />
          ))}
        </ul>
      )}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </div>
  );
}

export default ItemsList;
