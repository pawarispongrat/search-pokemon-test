"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
import SearchInput from "../components/SearchInput";
import PokemonResult from "../components/PokemonResult";
import { MdOutlineCatchingPokemon } from "react-icons/md";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-8 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-amber-600 flex items-center gap-2">
          <MdOutlineCatchingPokemon size={32} />
          Pokémon Search
          <MdOutlineCatchingPokemon size={32} />
        </h1>
        <SearchInput />
        <PokemonResult />
      </div>
    </ApolloProvider>
  );
}
