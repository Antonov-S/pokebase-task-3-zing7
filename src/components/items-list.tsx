"use client";

import { useEffect, useState } from "react";

import SortBy from "./sortBy";
import EmptyView from "./empty-view";
import PaginationControls from "./pagination-controls";
import ItemRow from "./item-row";
import { DataLoader } from "./data-loader";
import { PokemonDetails } from "@/types/pokemon-api";
import { usePokemonCount } from "@/contexts/pokemon-count-context";

type ItemsListProps = {
  page: number;
  query: string;
  type: string;
};

function ItemsList({ page, query, type }: ItemsListProps) {
  const [data, setData] = useState<{
    populatedResults: PokemonDetails[];
    totalPages: number;
    totalResults: number; // Добавяме новата стойност
  } | null>(null);

  const { setCount } = usePokemonCount();

  useEffect(() => {
    async function fetchData() {
      const data = await DataLoader({ page, query, type });
      setData(data);
      setCount(data.totalResults); // Актуализираме контекста със стойността на общия брой резултати
    }

    fetchData();
  }, [page, query, type, setCount]);

  if (!data) {
    return null;
  }

  const { populatedResults, totalPages } = data;

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
