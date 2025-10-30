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
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold font-['Playfair_Display']">
          Profile
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Avatar Editor */}
          <section className="md:col-span-2 rounded-xl border border-[#31363F] bg-[#31363F]/70 p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
              Avatar
            </h2>
            <p className="mt-1 text-sm text-[#BDBDBD]">
              Adjust your body avatar’s proportions to match your style.
            </p>
            <div className="mt-4">
              <AvatarEditor
                value={avatar}
                onChange={setAvatar}
                onSave={saveAvatar}
              />
            </div>
          </section>

          <section className="rounded-xl border border-[#31363F] bg-[#31363F]/70 backdrop-blur p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
              Account
            </h2>
            <div className="mt-4">
              <div className="text-sm text-[#BDBDBD]">Email</div>
              <div className="mt-1 font-medium">
                {email || "guest@example.com"}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={signOut}
                className="rounded-md bg-[#76ABAE] text-[#021018] px-4 py-2 shadow hover:opacity-95"
              >
                Sign out
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-[#31363F] bg-[#31363F]/70 backdrop-blur p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
              Billing
            </h2>
            <p className="mt-3 text-sm text-[#BDBDBD]">
              No billing connected. This is a demo UI.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
