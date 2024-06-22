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
        <div className="flex items-center space-x-3">
          <Image
            src={pokemon.pokeImage}
            alt={pokemon.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full border border-gray-300 object-contain bg-gray-100"
          />
          <span className="text-gray-800 font-bold">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
          <span className="text-gray-500">
            {pokemon.pokeTypes.length > 0 &&
              `(${pokemon.pokeTypes.join(", ")})`}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {pokemon.pokeAbilities.length > 0 ? (
            pokemon.pokeAbilities.map((ability, index) => (
              <span key={index} className="text-gray-800">
                {ability}
                {index < pokemon.pokeAbilities.length - 1 && <span>, </span>}
              </span>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default ItemRow;
