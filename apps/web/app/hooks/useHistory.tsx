import { useEffect, useState } from "react";

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
        const res = await fetch("http://localhost:3001/get-swipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await res.json();

        setLikedPokemons(data.likedPokemons || []);
        setDislikedPokemons(data.dislikedPokemons || []);
      } catch {
        setError("Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [username]);

  return {
    likedPokemons,
    dislikedPokemons,
    isLoading,
    error,
  };
}