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
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-14 lg:py-20 grid place-items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold font-['Playfair_Display']">
                Create your account
              </h1>
              <p className="mt-2 text-[#BDBDBD]">
                Start crafting beautiful designs
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
                  <label className="block text-sm mb-1 text-[#BDBDBD]">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] placeholder:text-[#BDBDBD] px-3 py-2 outline-none focus:ring-2 focus:ring-[#76ABAE]"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
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
                  <label className="block text-sm mb-1 text-[#BDBDBD]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] placeholder:text-[#BDBDBD] px-3 py-2 outline-none focus:ring-2 focus:ring-[#76ABAE]"
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-[#BDBDBD]">Confirm password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] placeholder:text-[#BDBDBD] px-3 py-2 outline-none focus:ring-2 focus:ring-[#76ABAE]"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#76ABAE] text-[#021018] font-medium shadow hover:opacity-95 transition disabled:opacity-70"
                >
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>
              <div className="mt-4 text-sm text-[#BDBDBD] text-center">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#76ABAE] hover:underline"
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
