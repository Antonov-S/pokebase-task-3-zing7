import Image from "next/image";

import { fetchPokemon } from "@/lib/server-utils";
import BackButton from "@/components/ui/back-button";
import { DEFAULT_POKE_IMAGE } from "@/lib/constants";
import {
  Ability,
  Form,
  GameIndex,
  HeldItem,
  Move,
  PokemonAPI,
  Stat,
  Type
} from "@/types/pokemon-api";

export default async function Page({ params }: { params: { name: string } }) {
  let pokemon: PokemonAPI.Pokemon | null = null;
  try {
    pokemon = await fetchPokemon(params.name);
  } catch (error) {
    console.log("Error in Pokemon Page:", error);
  }

  if (!pokemon) return null;

  if (!pokemon.sprites?.front_default) {
    pokemon.sprites.front_default = DEFAULT_POKE_IMAGE.src;
  }
  if (!pokemon.base_experience) {
    pokemon.base_experience = 0;
  }

  return (
    <section className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-y-auto shadow-sm mt-12 p-6">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-6">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <div className="w-[300px] h-[300px] mb-8">
          <Image
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            width={300}
            height={300}
            className="object-contain w-full h-full rounded-full border border-gray-300 bg-gray-100"
          />
        </div>
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Abilities</h3>
          <ul className="py-4 flex flex-wrap justify-center gap-y-4 gap-x-12 mb-8">
            {pokemon.abilities.map((a: Ability) => (
              <li
                key={a.ability.name}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                {a.ability.name}
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold pt-12 mb-4">Forms</h3>
          <ul className="py-4 flex flex-wrap justify-center gap-y-4 gap-x-12 mb-8">
            {pokemon.forms.map((f: Form) => (
              <li
                key={f.name}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                {f.name}
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold pt-12 mb-4">Held Items</h3>
          <ul className="py-4 flex flex-wrap justify-center gap-y-4 gap-x-12 mb-8">
            {pokemon.held_items && pokemon.held_items.length > 0 ? (
              pokemon.held_items.map((item: HeldItem, index: number) => (
                <li
                  key={index}
                  className="px-4 py-2 border border-gray-200 rounded-lg"
                >
                  {item.item.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 border border-gray-200 rounded-lg">
                NO
              </li>
            )}
          </ul>
          <div className="flex items-center justify-between">
            <p className="text-gray-800 font-bold">
              Base experience: <span>{pokemon.base_experience}</span>
            </p>
            <p className="text-gray-800 font-bold">Height: {pokemon.height}</p>
            <p className="text-gray-800 font-bold">Weight: {pokemon.weight}</p>
          </div>
          <table className="min-w-full bg-white my-12">
            <thead>
              <tr className="bg-bheader text-gray-800">
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-right py-2 px-4">Slot</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.types.map((t: Type) => (
                <tr key={t.type.name} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-left">{t.type.name}</td>
                  <td className="py-2 px-4 text-right">{t.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-full bg-white my-12">
            <thead>
              <tr className="bg-bheader text-gray-800">
                <th className="text-left py-2 px-4">Moves</th>
              </tr>
            </thead>
            <tbody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {pokemon.moves.map((m: Move) => (
                <tr key={m.move.name} className="border-b border-gray-200">
                  <td className="py-2 px-4">{m.move.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-full bg-white my-12">
            <thead>
              <tr className="bg-bheader text-gray-800">
                <th className="text-left py-2 px-4">Stats</th>
                <th className="text-center py-2 px-4">Base Stats</th>
                <th className="text-right py-2 px-4">Effort</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((s: Stat) => (
                <tr key={s.stat.name} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-left">{s.stat.name}</td>
                  <td className="py-2 px-4 text-center">{s.base_stat}</td>
                  <td className="py-2 px-4 text-right">{s.effort}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-full bg-white my-12">
            <thead>
              <tr className="bg-bheader text-gray-800">
                <th className="text-left py-2 px-4">Game Version</th>
                <th className="text-right py-2 px-4">Index</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.game_indices.map((g: GameIndex) => (
                <tr key={g.version.name} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-left">{g.version.name}</td>
                  <td className="py-2 px-4 text-right">{g.game_index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div className="flex justify-end mt-16">
        <BackButton />
      </div>
    </section>
  );
}
