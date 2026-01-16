"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchAllPokemonTypes } from "../utils/pokemonTypes";
import { useRouter } from "next/navigation";
import type { Region } from "../utils/types";
import useProfiles from "../hooks/useProfiles";
import ProfileCard from "./components/profileCard";
import { useHistory } from "../hooks/useHistory";

const regions: Region[] = [
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

const ALL_REGION: Region = { name: "All", min: 1, max: 1008 };

function getRegionForId(id: number): Region {
  return regions.find((r) => id >= r.min && id <= r.max) ?? ALL_REGION;
}

export default function SwipeClient() {
  const router = useRouter();

  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>(ALL_REGION);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");

  const { dislikedPokemons } = useHistory(username);

  const dislikedIds = useMemo(
    () => dislikedPokemons.map((p) => p.pokemonId),
    [dislikedPokemons]
  );

  const isLoggedIn = Boolean(username);

  const { profiles, swipe, loading, error } = useProfiles(
    selectedRegion,
    selectedType,
    dislikedIds,
    isLoggedIn
  );

  const currentProfile = profiles.length > 0 ? profiles[0] : null;

  useEffect(() => {
    fetchAllPokemonTypes()
      .then(setTypes)
      .catch(() => setTypes([]));
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      setShowLoginModal(true);
    } else {
      setUsername(storedUsername);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("username");
    router.push("/");
  }

  async function handleSwipe(direction: "like" | "dislike") {
    if (loading) return;
    await swipe(direction);
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "var(--app-bg)" }}>
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
          <div className="mx-4 w-full max-w-sm rounded-2xl p-6" style={{ background: "var(--app-bg)", border: "2px solid var(--app-secondary)" }}>
            <h2 className="text-lg" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
              Not Logged In
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
              Please login or register to start swiping.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 rounded-xl px-4 py-2 text-sm font-semibold"
                style={{ background: "var(--app-secondary)", color: "#111827", fontFamily: "var(--font-display)" }}
              >
                Login / Register
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 rounded-xl px-4 py-2 text-sm font-semibold"
                style={{ background: "rgba(255, 255, 255, 0.1)", color: "#ffffffff", fontFamily: "var(--font-display)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="mx-auto flex w-full max-w-sm flex-col items-center">
        {/* ---- header ---- */}
        <h1 className="text-xl" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
          Swipe pokemons
        </h1>
        <h2 className="mt-2 text-sm leading-6" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
          Swipe yes/no on Pokémon you like — no matching, just collecting favorites.
        </h2>

        {/* ---- type select ---- */}
        <div className="mt-4 w-full">
          <label className="block">
            <span className="block text-xs" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
              Pokémon Type
            </span>
            <select
              className="mt-2 w-full rounded-xl px-3 py-2 text-sm outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ background: "rgba(119, 120, 123)", color: "#ffffffff", fontFamily: "var(--font-body)" }}
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* ---- region select ---- */}
        <div className="mt-4 w-full">
          <label className="block">
            <span className="block text-xs" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
              Region
            </span>
            <select
              className="mt-2 w-full rounded-xl px-3 py-2 text-sm outline-none"
              value={selectedRegion.name}
              onChange={(e) => {
                const region =
                  regions.find((r) => r.name === e.target.value) || ALL_REGION;
                setSelectedRegion(region);
              }}
              style={{ background: "rgba(119, 120, 123)", color: "#ffffffff", fontFamily: "var(--font-body)" }}
            >
              <option value={ALL_REGION.name}>
                {ALL_REGION.name} ({ALL_REGION.min}-{ALL_REGION.max})
              </option>
              {regions.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name} ({r.min}-{r.max})
                </option>
              ))}
            </select>
          </label>

          <ProfileCard
            key={currentProfile?.key ?? "empty"}
            current={currentProfile}
            isLoading={loading}
            selectedRegion={selectedRegion}
            getRegionForId={getRegionForId}
          />
        </div>

        {error && (
          <p className="mt-6 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
            {error}
          </p>
        )}

        {/* ---- buttons ---- */}
        <div className="mt-5 flex w-full gap-3">
          <button
            type="button"
            onClick={() => handleSwipe("dislike")}
            disabled={!currentProfile || loading}
            className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
            style={{ background: "var(--app-primary)", color: "#0b1b1a", fontFamily: "var(--font-display)" }}
          >
            Dislike
          </button>

          <button
            type="button"
            onClick={() => handleSwipe("like")}
            disabled={!currentProfile || loading}
            className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
            style={{ background: "var(--app-accent)", color: "#0b1b1a", fontFamily: "var(--font-display)" }}
          >
            Like
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/history")}
          className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ background: "var(--app-secondary)", color: "#0b1b1a", fontFamily: "var(--font-display)" }}
        >
          Check your likes and dislikes
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ background: "#ff6b6b", color: "#ffffffff", fontFamily: "var(--font-display)" }}
        >
          Logout
        </button>
      </main>
    </div>
  );
}
