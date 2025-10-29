import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const e = localStorage.getItem("demo-user");
      if (e) setEmail(e);
    } catch {}
  }, []);

  const signOut = () => {
    try {
      localStorage.removeItem("demo-user");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white text-zinc-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold font-['Playfair_Display']">
          Profile
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-rose-200 bg-white/70 backdrop-blur p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Account
            </h2>
            <div className="mt-4">
              <div className="text-sm text-zinc-500">Email</div>
              <div className="mt-1 font-medium">
                {email || "guest@example.com"}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={signOut}
                className="px-4 py-2.5 rounded-lg bg-rose-600 text-white shadow hover:bg-rose-700"
              >
                Sign out
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-rose-200 bg-white/70 backdrop-blur p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Billing
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              No billing connected. This is a demo UI.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
