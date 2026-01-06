import { useState, useEffect } from "react";

export type SwipeEntry = {
  pokemonId: number;
  name: string;
  joke: string;
};

export function useHistory(username: string | null) {
  const [likedPokemons, setLikedPokemons] = useState<SwipeEntry[]>([]);
  const [dislikedPokemons, setDislikedPokemons] = useState<SwipeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    async function fetchHistory() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3001/get-swipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
        const data = (await response.json()) as {
          likedPokemons?: SwipeEntry[];
          dislikedPokemons?: SwipeEntry[];
        };
        if (!response.ok) {
          throw new Error("Failed to fetch history: " + response.status);
        }
        setLikedPokemons(Array.isArray(data.likedPokemons) ? data.likedPokemons : []);
        setDislikedPokemons(Array.isArray(data.dislikedPokemons) ? data.dislikedPokemons : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch history");
      }
      setIsLoading(false);
    }

    fetchHistory();
  }, [username]);

  return { likedPokemons, dislikedPokemons, isLoading, error };
}
