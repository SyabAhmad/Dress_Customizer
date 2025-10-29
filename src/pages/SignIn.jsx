import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Fake auth flow
    await new Promise((r) => setTimeout(r, 600));
    try {
      if (remember) localStorage.setItem("demo-user", email);
      navigate("/studio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-14 lg:py-20 grid place-items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold font-['Playfair_Display']">
                Welcome back
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Sign in to continue designing
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
              {error && (
                <div className="mb-3 text-sm text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm">Password</label>
                    <a
                      className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
                      href="#"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="size-4 rounded border-zinc-300 dark:border-zinc-700 text-rose-600 focus:ring-rose-500"
                    />
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 text-white px-4 py-2.5 font-medium shadow hover:bg-rose-700 disabled:opacity-70"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
              <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
