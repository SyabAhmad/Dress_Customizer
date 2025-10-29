import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Fake signup flow
    await new Promise((r) => setTimeout(r, 700));
    try {
      localStorage.setItem("demo-user", email);
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
                Create your account
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Start crafting beautiful designs
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
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
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
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Confirm password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 text-white px-4 py-2.5 font-medium shadow hover:bg-rose-700 disabled:opacity-70"
                >
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>
              <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
