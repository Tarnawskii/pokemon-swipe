import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ModalType = "login" | "register";

type Props = {
  type: "login" | "register";
  onClose: () => void;
};

export default function AuthModal({ type, onClose }: Props) {
  const title = type === "login" ? "Login" : "Register";

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (type === "login") {
        // ----- LOGIN -----
        const identifier = String(formData.get("identifier"));
        const password = String(formData.get("password"));

        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Invalid username/email or password");
        }

        localStorage.setItem("username", data.username);
        onClose();
        router.push("/swipe");
      } else {
        // ----- REGISTER -----
        const username = String(formData.get("username"));
        const email = String(formData.get("email"));
        const dob = String(formData.get("dob"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const success = await response.json();

        if (!response.ok || !success) {
          throw new Error("Registration failed - username or email may already exist");
        }

        localStorage.setItem("username", username);
        onClose();
        router.push("/swipe");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.65)" }} />
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={onClose}
        style={{ background: "transparent" }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl p-6"
        style={{ background: "var(--app-card, #EDF2F4)", border: "2px solid var(--app-secondary)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
            style={{ background: "var(--app-accent)", color: "#0b1b1a", fontFamily: "var(--font-display)" }}
          >
            <span>Close</span>
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        </div>

        <p className="mt-3 text-sm" style={{ color: "#1f2937", fontFamily: "var(--font-body)" }}>
          {type === "login" ? "Login to start swiping." : "Create an account to start swiping."}
        </p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {type === "login" ? (
            <>
              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Username or email
                </span>
                <input
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>
            </>
          ) : (
            <>
              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Username
                </span>
                <input
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Date of birth
                </span>
                <input
                  name="dob"
                  type="date"
                  required
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>

              <label className="block">
                <span className="block text-xs" style={{ color: "#111827", fontFamily: "var(--font-display)" }}>
                  Re-enter password
                </span>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="mt-1 w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(43, 45, 66, 0.08)",
                    color: "#111827",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </label>
            </>
          )}

          {error ? (
            <p className="text-sm" style={{ color: "#b91c1c", fontFamily: "var(--font-body)" }}>
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
            style={{
              background: type === "login" ? "var(--app-accent)" : "var(--app-secondary)",
              color: "#111827",
              fontFamily: "var(--font-display)",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (type === "login" ? "Logging in..." : "Registering...") : title}
          </button>
        </form>
      </div>
    </div>
  );
}
