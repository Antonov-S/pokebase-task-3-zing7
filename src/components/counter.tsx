"use client";

import { usePokemonCount } from "@/contexts/pokemon-count-context";

function Counter() {
  const { count } = usePokemonCount();

  return (
    <p className="mr-5 text-sm">
      <b>{count}</b> Pokemons found
    </p>
  );
}

export default Counter;
