"use client";

import { useState } from "react";
import  AuthModal  from "./components/AuthModal";

type ModalType = "login" | "register";

export default function Home() {
  const [modal, setModal] = useState<ModalType | null>(null);

  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "var(--app-bg)" }}>
      <main className="mx-auto max-w-3xl">
        <header
          className="rounded-2xl p-6"
          style={{ background: "rgba(237, 242, 244, 0.08)", border: "2px solid var(--app-secondary)" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs"
              style={{
                background: "var(--app-secondary)",
                color: "#191919ff",
                fontFamily: "var(--font-display)",
              }}
            >
              PokéSwipe
            </span>
            
          </div>
          <h1
            className="mt-3 text-xl leading-8 sm:text-2xl"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-display)" }}
          >
            A Pokémon-style swipe app
          </h1>

          <p
            className="mt-4 text-sm leading-6"
            style={{ color: "#ffffffff", fontFamily: "var(--font-body)" }}
          >
            Swipe{" "}
            <span
              className="rounded-md px-2 py-0.5 font-semibold"
              style={{
                background: "var(--app-accent)",
                color: "#000000ff",
                fontFamily: "var(--font-display)",
              }}
            >
              LIKE
            </span>{" "}
            or{" "}
            <span
              className="rounded-md px-2 py-0.5 font-semibold"
              style={{
                background: "var(--app-primary)",
                color: "#000000ff",
                fontFamily: "var(--font-display)",
              }}
            >
              DISLIKE
            </span>{" "}
            on Pokémon. No matching — just a simple way to keep track of the Pokémon you like.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setModal("login")}
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
              style={{
                background: "var(--app-accent)",
                color: "#000000ff",
                fontFamily: "var(--font-display)",
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setModal("register")}
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
              style={{
                background: "var(--app-secondary)",
                color: "#000000ff",
                fontFamily: "var(--font-display)",
              }}
            >
              Register
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(237, 242, 244, 0.08)", border: "2px solid var(--app-accent)" }}
          >
            <h2
              className="text-sm"
              style={{ color: "var(--app-secondary)", fontFamily: "var(--font-display)" }}
            >
              How it works
            </h2>
            <ul
              className="mt-4 space-y-2 text-sm"
              style={{ color: "#edf2f4", fontFamily: "var(--font-body)" }}
            >
              <li>1. You see one Pokémon at a time.</li>
              <li>2. Swipe YES to like, NO to skip.</li>
              <li>3. That’s it — no matches, no chat.</li>
            </ul>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(237, 242, 244, 0.08)", border: "2px solid var(--app-primary)" }}
          >
            <h2
              className="text-sm"
              style={{ color: "var(--app-accent)", fontFamily: "var(--font-display)" }}
            >
              Why
            </h2>
            <p
              className="mt-4 text-sm leading-6"
              style={{ color: "#edf2f4", fontFamily: "var(--font-body)" }}
            >
              A nostalgic, arcade-style way to browse Pokémon and build a personal “liked” list.
            </p>
          </div>
        </section>
      </main>

      {modal ? <AuthModal type={modal} onClose={() => setModal(null)} /> : null}
    </div>
  );
}
