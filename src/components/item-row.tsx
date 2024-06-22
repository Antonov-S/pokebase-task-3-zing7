import Link from "next/link";
import Image from "next/image";

import { PokemonDetails } from "@/types/pokemon-api";

type ItemRowProps = {
  pokemon: PokemonDetails;
};

function ItemRow({ pokemon }: ItemRowProps) {
  return (
    <li className="flex relative h-12 text-sm border-b border-black/10">
      <Link
        href={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`}
        className="flex-1 h-full flex items-center justify-between px-7 cursor-pointer"
      >
        <div className="flex items-center">
          <Image
            src={pokemon.pokeImage}
            alt={pokemon.name}
            width={44} // Adjusted width
            height={44} // Adjusted height
            className="w-11 h-11 rounded-full border border-gray-300 object-contain bg-gray-100"
          />

          <span className="text-gray-800 py-2 px-1 ml-3">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
        </div>

        {pokemon.pokeTypes.length > 0 ? (
          <div className="flex items-center space-x-1 ml-4">
            {pokemon.pokeTypes.map((type, index) => (
              <span key={index} className="text-gray-500">
                {type}
                {index < pokemon.pokeTypes.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
        ) : (
          <div className="ml-4"></div>
        )}
      </Link>
    </li>
  );
}

export default ItemRow;
