"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useHistory } from "../hooks/useHistory";

function spriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export default function HistoryPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const {
    likedPokemons,
    dislikedPokemons,
    isLoading,
    error,
  } = useHistory(username);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("username");
    router.push("/");
  }

  if (isLoading) {
    return <p>Loading history...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen px-6 py-10" style={{ background: "var(--app-bg)" }}>
        <main className="mx-auto w-full max-w-sm">
          <h1 className="text-xl" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
            Likes & Dislikes
          </h1>
          <p className="mt-4 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
            Loading...
          </p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "var(--app-bg)" }}>
      <main className="mx-auto w-full max-w-sm">
        <h1 className="text-xl" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
          Likes & Dislikes
        </h1>

        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
            <div className="mx-4 w-full max-w-sm rounded-2xl p-6" style={{ background: "var(--app-bg)", border: "2px solid var(--app-secondary)" }}>
              <h2 className="text-lg" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
                Not Logged In
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
                Please login or register to view your history.
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

        {error ? (
          <p className="mt-4 text-sm" style={{ color: "#ff6b6b", fontFamily: "var(--font-body)" }}>
            Error: {error}
          </p>
        ) : null}

        <section className="mt-6">
          <h2 className="text-lg" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
            Liked Pokémons
          </h2>
          {likedPokemons.length === 0 ? (
            <p className="mt-2 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
              You have not liked any Pokémon yet.
            </p>
          ) : (
            <ul className="mt-2 space-y-4">
              {[...likedPokemons].reverse().map((entry) => (
                <li key={`like-${entry.pokemonId}-${entry.name}`} className="flex items-start gap-4">
                  <Image src={spriteUrl(entry.pokemonId)} alt="" width={48} height={48} style={{ objectFit: "contain" }} />
                  <div className="min-w-0">
                    <p className="text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
                      #{entry.pokemonId} {entry.name}
                    </p>
                    {entry.joke ? (
                      <p className="mt-1 text-xs" style={{ color: "#edf2f4", fontFamily: "var(--font-body)" }}>
                        {entry.joke}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
            Disliked Pokémons
          </h2>
          {dislikedPokemons.length === 0 ? (
            <p className="mt-2 text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}>
              You have not disliked any Pokémon yet.
            </p>
          ) : (
            <ul className="mt-2 space-y-4">
              {[...dislikedPokemons].reverse().map((entry) => (
                <li key={`dislike-${entry.pokemonId}-${entry.name}`} className="flex items-start gap-4">
                  <Image src={spriteUrl(entry.pokemonId)} alt="" width={48} height={48} style={{ objectFit: "contain" }} />
                  <div className="min-w-0">
                    <p className="text-sm" style={{ color: "#ffffffff", fontFamily: "var(--font-display)" }}>
                      #{entry.pokemonId} {entry.name}
                    </p>
                    {entry.joke ? (
                      <p className="mt-1 text-xs" style={{ color: "#edf2f4", fontFamily: "var(--font-body)" }}>
                        {entry.joke}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        
        <Link
          href="/swipe"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ background: "var(--app-secondary)", color: "#111827", fontFamily: "var(--font-display)" }}
        >
          Back
        </Link>

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
