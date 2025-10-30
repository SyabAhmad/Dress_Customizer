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
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-14 lg:py-20 grid place-items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold font-['Playfair_Display']">
                Welcome back
              </h1>
              <p className="mt-2 text-[#BDBDBD]">
                Sign in to continue designing
              </p>
            </div>
            <div className="rounded-xl border border-[#31363F] bg-[#31363F]/70 shadow-sm p-6">
              {error && (
                <div className="mb-3 text-sm text-[#ff9aa2]">
                  {error}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-[#BDBDBD]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] placeholder:text-[#BDBDBD] px-3 py-2 outline-none focus:ring-2 focus:ring-[#76ABAE]"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm text-[#BDBDBD]">Password</label>
                    <a
                      className="text-sm text-[#76ABAE] hover:underline"
                      href="#"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] placeholder:text-[#BDBDBD] px-3 py-2 outline-none focus:ring-2 focus:ring-[#76ABAE]"
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
                      className="size-4 rounded border-[#3D434C] bg-[#222831]"
                      style={{ accentColor: '#76ABAE' }}
                    />
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#76ABAE] text-[#021018] font-medium shadow hover:opacity-95 transition disabled:opacity-70"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
              <div className="mt-4 text-sm text-[#BDBDBD] text-center">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#76ABAE] hover:underline"
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
