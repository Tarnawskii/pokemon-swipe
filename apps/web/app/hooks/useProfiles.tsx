import { useCallback, useEffect, useState } from "react";
import type { Profile, Region } from "../utils/types";
import { fetchRandomPokemon } from "../utils/pokeApi";
import { fetchChuckJoke, getJokeCategoryFromPokemon } from "../utils/jokeApi";
import { randomFirstName } from "../components/randomFirstName";

export default function useProfiles(region: Region, type?: string,disliked: number[] = []) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const loadOne = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const pokemon = await fetchRandomPokemon(region, 12, type, disliked);
      const category = getJokeCategoryFromPokemon(pokemon.types);
      const joke = await fetchChuckJoke(category);
      const name = `${randomFirstName() ?? "Trainer"} the ${pokemon.name}`;

      setProfiles([
        {
          key: `${pokemon.id ?? "x"}-${Date.now().toString(16)}`,
          pokemon: { ...pokemon, name },
          joke,
        },
      ]);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setProfiles([]);
      setError(message || "Failed to load Pokémon");
    } finally {
      setLoading(false);
    }
  }, [region, type, disliked]);

  useEffect(() => {
    void loadOne();
  }, [loadOne]);

  async function swipe(choice: "like" | "dislike") {
    if (loading) return;

    const current = profiles[0];
    const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
    const pokemonId = current?.pokemon?.id;
    const pokemonName = current?.pokemon?.name;
    const joke = current?.joke;

    if (username && typeof pokemonId === "number") {
      fetch("http://localhost:3001/swipe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, pokemonId, action: choice, name: pokemonName, joke }),
      }).catch(() => undefined);
    }

    await loadOne();
  }

  return { profiles, swipe, loading, error };
}
