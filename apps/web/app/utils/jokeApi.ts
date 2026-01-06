/* ---------------- Fetch joke ---------------- */

export async function fetchChuckJoke(category?: string): Promise<string> {
  let url = "https://api.chucknorris.io/jokes/random";

  if (category) {
    url += "?category=" + category;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load joke");
  }

  const data = await response.json();

  return data.value || "";
}

export function getJokeCategoryFromPokemon(pokemonTypes: { type: { name: string } }[]) {
  if (!pokemonTypes || pokemonTypes.length === 0) {
    return undefined;
  }

  const type = pokemonTypes[0].type.name;

  if (type === "fire") return "celebrity";
  if (type === "water") return "animal";
  if (type === "grass") return "money";
  if (type === "electric") return "dev";
  if (type === "psychic") return "science";
  if (type === "fighting") return "career";
  if (type === "dark") return "explicit";
  if (type === "fairy") return "religion";
  if (type === "steel") return "dev";
  if (type === "ghost") return "political";

  // fallback if no match
  return undefined;
}
