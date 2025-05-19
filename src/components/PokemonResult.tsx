"use client";

import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import TypeBadge from "./TypeBadge";
import { motion } from "framer-motion";
import { GET_POKEMON } from "../lib/pokemonQuery";
import {
  GiHealthNormal,
  GiFist,
  GiWeight,
  GiBodyHeight,
  GiRun,
} from "react-icons/gi";

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  image: string;
  name: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions: Evolution[];
}

const pokemonTypeColor: {
  [key: string]: { color: string };
} = {
  normal: { color: "#A8A77A" },
  fighting: { color: "#C22E28" },
  flying: { color: "#A98FF3" },
  poison: { color: "#A33EA1" },
  ground: { color: "#E2BF65" },
  rock: { color: "#B6A136" },
  bug: { color: "#A6B91A" },
  ghost: { color: "#735797" },
  steel: { color: "#B7B7CE" },
  fire: { color: "#EE8130" },
  water: { color: "#6390F0" },
  grass: { color: "#7AC74C" },
  electric: { color: "#F7D02C" },
  psychic: { color: "#F95587" },
  ice: { color: "#96D9D6" },
  dragon: { color: "#6F35FC" },
  dark: { color: "#705746" },
  fairy: { color: "#D685AD" },
  stellar: { color: "#FFCC00" },
  unknown: { color: "#A0A0A0" },
};

export default function PokemonResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const [activeTab, setActiveTab] = useState<"about" | "attacks">("about");

  const { loading, error, data } = useQuery<{ pokemon: Pokemon | null }>(
    GET_POKEMON,
    {
      variables: { name: searchTerm },
      skip: !searchTerm,
    }
  );

  const handleEvolutionClick = (name: string) => {
    router.push(`/?search=${encodeURIComponent(name)}`);
  };

  if (!searchTerm) {
    return (
      <p className="text-center text-gray-500">
        Please enter the name of the Pokémon to search..
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500">กำลังโหลด...</p>;
  }

  if (error || !data?.pokemon) {
    return (
      <p className="text-center text-red-500">
        ไม่พบ Pokémon นี้ กรุณาลองชื่ออื่น
      </p>
    );
  }

  const pokemon = data.pokemon;
  const primaryType = pokemon.types[0].toLowerCase();
  const backgroundColor = pokemonTypeColor[primaryType]?.color || "#FFFFFF";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto p-4 rounded-lg shadow-lg text-black"
      style={{
        background: `linear-gradient(to bottom, #FFFFFF, ${backgroundColor})`,
      }}
    >
      <div className="text-center ">
        <div className="ml-auto mr-auto p-4 bg-white w-fit rounded-4xl mb-3">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto w-40 h-40 object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold">{pokemon.name}</h2>
        <p className="text-sm text-gray-800">
          #{pokemon.number} - {pokemon.classification}
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4 border-b border-white/30 bg-white w-fit mx-auto rounded-2xl mb-2 p-2 relative">
        <div className="absolute inset-0 flex gap-4 p-2 pointer-events-none">
          <motion.div
            layoutId="tabHighlight"
            className="w-[85px] h-full rounded-xl bg-orange-300"
            initial={false}
            animate={{ x: activeTab === "about" ? 0 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <button
          className={`px-4 py-1 rounded-xl relative z-10 transition-colors duration-300 ${
            activeTab === "about"
              ? "text-black font-semibold"
              : "text-gray-500 font-semibold"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`px-4 py-1 rounded-xl relative z-10 transition-colors duration-300 ${
            activeTab === "attacks"
              ? "text-black font-semibold"
              : "text-gray-500 font-semibold"
          }`}
          onClick={() => setActiveTab("attacks")}
        >
          Attacks
        </button>
      </div>

      {activeTab === "about" ? (
        <motion.div
          className="bg-white text-black p-4 rounded-2xl"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4  p-5">
            <div>
              <span className="flex items-center mb-2">
                <GiWeight className="inline-block mr-2" />
                <p>Weight</p>
              </span>
              <span className="flex  px-4 py-2 border-2 border-gray-300 rounded-2xl w-3/4">
                <p className="text-sm">
                  {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </p>
              </span>
            </div>
            <div>
              <span className="flex items-center mb-2">
                <GiBodyHeight className="inline-block mr-2" />
                <p>Height</p>
              </span>
              <span className="flex  px-4 py-2 border-2 border-gray-300 rounded-2xl w-3/4">
                <p className="text-sm">
                  {pokemon.height.minimum} - {pokemon.height.maximum}
                </p>
              </span>
            </div>
            <div>
              <span className="flex items-center mb-2">
                <GiRun className="inline-block mr-2" />
                <p>Escape Rate</p>
              </span>
              <span className="flex  px-4 py-2 border-2 border-gray-300 rounded-2xl w-3/4">
                <p className="text-sm">
                  {(pokemon.fleeRate * 100).toFixed(2)}%
                </p>
              </span>
            </div>
            <div>
              <span className="flex items-center mb-2">
                <GiHealthNormal className="inline-block mr-2" />
                <p>Max HP</p>
              </span>
              <span className="flex  px-4 py-2 border-2 border-gray-300 rounded-2xl w-3/4">
                <p className="text-sm">{pokemon.maxHP}</p>
              </span>
            </div>
            <div>
              <span className="flex items-center mb-2">
                <GiFist className="inline-block mr-2" />
                <p>Max CP</p>
              </span>
              <span className="flex  px-4 py-2 border-2 border-gray-300 rounded-2xl w-3/4">
                <p className="text-sm">{pokemon.maxCP}</p>
              </span>
            </div>
          </div>
          <div className="flex mb-2 pl-5">
            <p className="font-medium mb-1 mr-2">Resistance:</p>
            <div className="flex flex-wrap gap-2">
              {pokemon.resistant.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
          <div className="flex mb-2 pl-5">
            <p className="font-medium mb-1 mr-2">Weakness:</p>
            <div className="flex flex-wrap gap-2">
              {pokemon.weaknesses.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>

          <div className="mt-4 ml-2">
            <h3 className="font-semibold text-lg">Evolution</h3>
            {pokemon.evolutions ? (
              <div className="mt-3 ml-2">
                {pokemon.evolutions.map((evo) => (
                  <p key={evo.id}>
                    <button
                      onClick={() => handleEvolutionClick(evo.name)}
                      className="hover:underline"
                    >
                      <img
                        src={evo.image}
                        alt={evo.name}
                        className="inline-block mr-2 w-40"
                      ></img>
                      {evo.name}
                    </button>
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No Evolutions</p>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white text-black p-4 rounded-2xl"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-semibold">Quick Attack</h4>
          <ul className="list-disc list-inside mb-4">
            {pokemon.attacks.fast.map((atk) => (
              <li
                key={atk.name}
                className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl"
              >
                <TypeBadge type={atk.type} />
                <span className="flex-1 font-medium">{atk.name}</span>
                <span className="text-gray-600 font-medium">
                  {atk.damage} dmg
                </span>
              </li>
            ))}
          </ul>
          <h4 className="font-semibold">Spacial Attack</h4>
          <ul className="list-disc list-inside">
            {pokemon.attacks.special.map((atk) => (
              <li
                key={atk.name}
                className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl"
              >
                <TypeBadge type={atk.type} />
                <span className="flex-1 font-medium">{atk.name}</span>
                <span className="text-gray-600 font-medium">
                  {atk.damage} dmg
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
