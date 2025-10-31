import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import AvatarEditor from "../components/AvatarEditor.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(() => {
    try {
      const raw = localStorage.getItem("profile-avatar");
      return raw
        ? JSON.parse(raw)
        : { height: 100, width: 100, build: 0, head: 100 };
    } catch {
      return { height: 100, width: 100, build: 0, head: 100 };
    }
  });

  useEffect(() => {
    try {
      const e = localStorage.getItem("demo-user");
      if (e) setEmail(e);
    } catch {
      /* noop: localStorage may be unavailable */
    }
  }, []);

  const signOut = () => {
    try {
      localStorage.removeItem("demo-user");
    } catch {
      /* noop */
    }
    navigate("/signin");
  };

  const saveAvatar = (next) => {
    try {
      localStorage.setItem("profile-avatar", JSON.stringify(next));
    } catch {
      /* noop */
    }
    setAvatar(next);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg,#0b0f21 0%,#2b0b4f 45%,#3a0f6a 100%)",
        color: "#e6f7ff",
      }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1
          className="text-2xl font-semibold font-['Playfair_Display']"
          style={{ color: "#37e6ff" }}
        >
          Profile
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Avatar Editor */}
          <section
            className="md:col-span-2 rounded-xl border p-5 bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)] backdrop-blur-lg shadow-lg"
            style={{ border: "1px solid rgba(15,23,42,0.04)" }}
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#3be8d0]">
              Avatar
            </h2>
            <p className="mt-1 text-sm text-[#b6bfd0]">
              Adjust your body avatar's proportions to match your style.
            </p>
            <div className="mt-4">
              <AvatarEditor
                value={avatar}
                onChange={setAvatar}
                onSave={saveAvatar}
              />
            </div>
          </section>

          <section
            className="rounded-xl border p-5 bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)] backdrop-blur-lg shadow-lg"
            style={{ border: "1px solid rgba(15,23,42,0.04)" }}
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#3be8d0]">
              Account
            </h2>
            <div className="mt-4">
              <div className="text-sm text-[#b6bfd0]">Email</div>
              <div className="mt-1 font-medium" style={{ color: "#e6f7ff" }}>
                {email || "guest@example.com"}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={signOut}
                className="rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
                  color: "#021018",
                  border: "none",
                }}
              >
                Sign out
              </button>
            </div>
          </section>

          <section
            className="rounded-xl border p-5 bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)] backdrop-blur-lg shadow-lg"
            style={{ border: "1px solid rgba(15,23,42,0.04)" }}
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#3be8d0]">
              Billing
            </h2>
            <p className="mt-3 text-sm text-[#b6bfd0]">
              No billing connected. This is a demo UI.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
