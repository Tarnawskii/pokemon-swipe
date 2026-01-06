export async function fetchAllPokemonTypes(): Promise<string[]> {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();
  return (data.results as Array<{ name: string }>).map((t) => t.name);
}
