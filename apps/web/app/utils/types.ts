export type Pokemon = {
  id?: number;
  name: string;
  weight: number;
  height: number;
  abilities: AbilityEntry[];
  types: TypeEntry[];
  sprites?: {
    front_default?: string | null;
    other?: {
      "official-artwork"?: {
        front_default?: string | null;
      };
    };
  };
};
export type AbilityEntry = {
  ability: {
    name: string;
  };
};

export type TypeEntry = {
  type: {
    name: string;
  };
};

export type Profile = {
  key: string;
  pokemon: Pokemon;
  joke: string;
};

export type Region = {
  name: string;
  min: number;
  max: number;
};