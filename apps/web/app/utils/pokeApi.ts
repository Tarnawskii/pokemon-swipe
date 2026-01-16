import type { Pokemon, Region } from "./types";

/* ---------------- Regions ---------------- */

export const regions: Region[] = [
  { name: "Kanto", min: 1, max: 151 },
  { name: "Johto", min: 152, max: 251 },
  { name: "Hoenn", min: 252, max: 386 },
  { name: "Sinnoh", min: 387, max: 493 },
  { name: "Unova", min: 494, max: 649 },
  { name: "Kalos", min: 650, max: 721 },
  { name: "Alola", min: 722, max: 809 },
  { name: "Galar", min: 810, max: 898 },
  { name: "Paldea", min: 899, max: 1008 },
];

export const allRegion: Region = {
  name: "All",
  min: 1,
  max: 1008,
};


export function getRegionForId(id?: number): Region {
  if (!id) return allRegion;

  for (const region of regions) {
    if (id >= region.min && id <= region.max) {
      return region;
    }
  }

  return allRegion;
}

export async function fetchPokemonById(id: number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  return res.json();
}

export async function fetchRandomPokemon(
  region: Region,
  maxTries = 10,
  type?: string,
  disliked: number[] = []
): Promise<Pokemon> {
  const username = localStorage.getItem("username");
  if (!username) {
    throw new Error("No username found");
  }
  const wantedType = type?.toLowerCase();

  for (let attempt = 0; attempt < maxTries; attempt++) {
    const randomId =
      region.min +
      Math.floor(Math.random() * (region.max - region.min + 1));


    if (disliked.includes(randomId)) {
      continue;
    }

    try {
      const pokemon = await fetchPokemonById(randomId);

      if (wantedType) {
        const hasType = pokemon.types.some(
          (t) => t.type.name === wantedType
        );

        if (!hasType) {
          continue; 
        }
      }

      return pokemon;
    } catch {
      continue;
    }
  }

  throw new Error("No Pokémon found. Try changing region or type.");
}
