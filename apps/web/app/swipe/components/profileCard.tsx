import Image from "next/image";
import type { Profile, Region } from "../../utils/types";
import { useState } from "react";

type ProfileCardProps = {
  current: Profile | null;
  isLoading: boolean;
  selectedRegion: Region;
  getRegionForId: (id: number) => Region;
};

export default function ProfileCard({
  current,
  isLoading,
  selectedRegion,
  getRegionForId,
}: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Show loading / empty state
  if (!current) {
    return (
      <p
        className="mt-6 text-sm"
        style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
      >
        {isLoading ? "Loading Pokémon..." : "No Pokémon loaded."}
      </p>
    );
  }

  const imageUrl =
    current.pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    current.pokemon.sprites?.front_default ||
    "";
  const regionLabel =
    typeof current.pokemon.id === "number"
      ? getRegionForId(current.pokemon.id).name
      : selectedRegion.name;

  return (
    <div
      className="mt-5 w-full overflow-hidden rounded-3xl"
      style={{
        border: "2px solid var(--app-secondary)",
        background: "rgba(237,242,244,0.08)",
        height: "66vh",
        maxHeight: "660px",
      }}
    >
      <div className="relative h-full w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={current.pokemon.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 384px"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        )}

        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            background:
              "linear-gradient(transparent 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.92) 100%)",
          }}
        >
          <button
            type="button"
            className="text-left w-full"
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: "pointer" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2
                className="text-xl"
                style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
              >
                {current.pokemon.name}
              </h2>
              <span
                className="text-xs font-semibold"
                style={{
                  color: "var(--app-secondary)",
                  fontFamily: "var(--font-body)",
                  textDecoration: "underline",
                }}
              >
                {regionLabel} · {expanded ? "Less ▲" : "More ▼"}
              </span>
            </div>
          </button>

          <p
            className="mt-2 text-sm leading-6"
            style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
          >
            {current.joke || "(No description yet)"}
          </p>

       
          {expanded && (
            <div
              className="mt-3 space-y-1 text-sm"
              style={{ color: "#ffffff", fontFamily: "var(--font-body)" }}
            >
              <p>Type: {current.pokemon.types.map((t) => t.type.name).join(", ")}</p>
              <p>Weight: {current.pokemon.weight}</p>
              <p>Height: {current.pokemon.height}</p>
              <p>
                Skill: {current.pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
