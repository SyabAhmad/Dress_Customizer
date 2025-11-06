import { useEffect, useState } from "react";

export default function Settings() {
  const [density, setDensity] = useState("comfortable");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("settings") || "{}");
      if (s.density) setDensity(s.density);
      if (typeof s.notifications === "boolean")
        setNotifications(s.notifications);
    } catch {
      /* noop: ignore JSON/localStorage errors */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "settings",
        JSON.stringify({ density, notifications })
      );
    } catch {
      /* noop */
    }
  }, [density, notifications]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #87CEEB 0%, #87CEEB 30%, #ADD8E6 70%, #E0F6FF 100%)",
        color: "#001a33",
      }}
    >
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold font-['Playfair_Display']">
          Settings
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-[#31363F] bg-[#31363F]/70 p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
              Interface
            </h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 text-[#EEEEEE]">
                <input
                  type="radio"
                  name="density"
                  value="comfortable"
                  checked={density === "comfortable"}
                  onChange={() => setDensity("comfortable")}
                  style={{ accentColor: "#76ABAE" }}
                />
                Comfortable
              </label>
              <label className="flex items-center gap-2 text-[#EEEEEE]">
                <input
                  type="radio"
                  name="density"
                  value="compact"
                  checked={density === "compact"}
                  onChange={() => setDensity("compact")}
                  style={{ accentColor: "#76ABAE" }}
                />
                Compact
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-[#31363F] bg-[#31363F]/70 p-5 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
              Notifications
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[#EEEEEE]">Email updates</span>
              <label className="inline-flex items-center gap-2 text-sm select-none">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="size-4 rounded border-[#3D434C] bg-[#222831]"
                  style={{ accentColor: "#76ABAE" }}
                />
                <span className="text-[#BDBDBD]">
                  {notifications ? "On" : "Off"}
                </span>
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
