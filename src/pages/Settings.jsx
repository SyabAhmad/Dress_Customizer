import { useEffect, useState } from "react";
import { aiAPI } from "../utils/api";

export default function Settings() {
  const [density, setDensity] = useState("comfortable");
  const [notifications, setNotifications] = useState(true);
  const [defaultModel, setDefaultModel] = useState("pollinations");
  const [models, setModels] = useState([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("settings") || "{}");
      if (s.density) setDensity(s.density);
      if (typeof s.notifications === "boolean") setNotifications(s.notifications);
      if (s.defaultModel) setDefaultModel(s.defaultModel);
    } catch {}
    aiAPI.listModels().then((r) => setModels(r.image_models || [])).catch(() => {});
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("settings", JSON.stringify({ density, notifications, defaultModel }));
    } catch {}
  }, [density, notifications, defaultModel]);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#f0f4f8" }}>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-lg font-bold mb-1" style={{ color: "#001a33" }}>Settings</h1>
        <p className="text-[11px] mb-5" style={{ color: "#94a3b8" }}>Customize your experience</p>

        <div className="space-y-3">
          {/* Display */}
          <Section title="Display">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#001a33" }}>Layout Density</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>Choose spacing preference</p>
              </div>
              <div className="flex gap-1">
                {["comfortable", "compact"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className="text-[11px] px-2.5 py-1 rounded-full font-medium transition-all"
                    style={{
                      background: density === d ? "#0066cc" : "#ffffff",
                      color: density === d ? "#fff" : "#94a3b8",
                      border: density === d ? "none" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* AI */}
          <Section title="AI Model">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#001a33" }}>Default Model</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>Pre-selected when you open Studio</p>
              </div>
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="rounded-full border px-2.5 py-1 text-[11px] focus:outline-none cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", color: "#001a33" }}
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id} disabled={m.requires_key && !m.key_configured}>{m.name}</option>
                ))}
              </select>
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#001a33" }}>Email updates</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>New features and tips</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className="relative w-9 h-5 rounded-full transition-colors"
                style={{ background: notifications ? "#0066cc" : "rgba(0,0,0,0.1)" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                  style={{ transform: notifications ? "translateX(18px)" : "translateX(2px)" }}
                />
              </button>
            </div>
          </Section>

          {/* API Keys */}
          <Section title="API Keys">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#001a33" }}>Google AI</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>For Gemini image generation</p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: models.find((m) => m.id === "gemini-enhanced")?.key_configured ? "rgba(16,185,129,0.1)" : "rgba(225,29,72,0.08)",
                  color: models.find((m) => m.id === "gemini-enhanced")?.key_configured ? "#10B981" : "#E11D48",
                }}
              >
                {models.find((m) => m.id === "gemini-enhanced")?.key_configured ? "Configured" : "Not set"}
              </span>
            </div>
          </Section>

          {/* About */}
          <Section title="About">
            <div className="space-y-0.5">
              <p className="text-[11px]" style={{ color: "#94a3b8" }}>Dress Customizer v1.0</p>
              <p className="text-[11px]" style={{ color: "#94a3b8" }}>AI-powered fashion design</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }}>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "#cbd5e1" }}>{title}</p>
      {children}
    </div>
  );
}
