import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";

export default function Settings() {
  const [density, setDensity] = useState("comfortable");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("settings") || "{}");
      if (s.density) setDensity(s.density);
      if (typeof s.notifications === "boolean")
        setNotifications(s.notifications);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "settings",
        JSON.stringify({ density, notifications })
      );
    } catch {}
  }, [density, notifications]);

  return (
    <div className="min-h-screen bg-theme text-theme">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold font-['Playfair_Display']">
          Settings
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-theme surface p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Interface
            </h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="density"
                  value="comfortable"
                  checked={density === "comfortable"}
                  onChange={() => setDensity("comfortable")}
                />
                Comfortable
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="density"
                  value="compact"
                  checked={density === "compact"}
                  onChange={() => setDensity("compact")}
                />
                Compact
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-theme surface p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Notifications
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <span>Email updates</span>
              <label className="inline-flex items-center gap-2 text-sm select-none">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="size-4 rounded border-zinc-300 text-rose-600"
                />
                {notifications ? "On" : "Off"}
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
