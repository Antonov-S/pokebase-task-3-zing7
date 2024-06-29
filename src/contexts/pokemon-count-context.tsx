"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PokemonCountContextType = {
  count: number;
  setCount: (count: number) => void;
};

const PokemonCountContext = createContext<PokemonCountContextType | undefined>(
  undefined
);

export const usePokemonCount = () => {
  const context = useContext(PokemonCountContext);
  if (context === undefined) {
    throw new Error(
      "usePokemonCount must be used within a PokemonCountProvider"
    );
  }
  return context;
};

export const PokemonCountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <PokemonCountContext.Provider value={{ count, setCount }}>
      {children}
    </PokemonCountContext.Provider>
  );
};
