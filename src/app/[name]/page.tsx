import Image from "next/image";

import { fetchPokemon } from "@/lib/server-utils";
import BackButton from "@/components/ui/back-button";
import { PokemonAPI } from "@/types/pokemon-api";

export default async function Page({ params }: { params: { name: string } }) {
  const pokemon = (await fetchPokemon(params.name)) as PokemonAPI.Pokemon;

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
            {pokemon.abilities.map(a => (
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
            {pokemon.forms.map(f => (
              <li
                key={f.name}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                {f.name}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <p className="text-gray-800 font-bold">
              Base experience: <span>{pokemon.base_experience}</span>
            </p>
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
              {pokemon.types.map(t => (
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
              {pokemon.moves.map(m => (
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
              {pokemon.stats.map(s => (
                <tr key={s.stat.name} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-left">{s.stat.name}</td>
                  <td className="py-2 px-4 text-center">{s.base_stat}</td>
                  <td className="py-2 px-4 text-right">{s.effort}</td>
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
