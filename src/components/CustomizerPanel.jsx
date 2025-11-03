import React from "react";

export default function CustomizerPanel({
  params,
  setParams,
  onSaveVariant,
  isGenerating,
}) {
  const set = (k, v) => setParams((p) => ({ ...p, [k]: v }));

  const presets = [
    "#111827",
    "#2457F5",
    "#E11D48",
    "#10B981",
    "#A855F7",
    "#F59E0B",
    "#FFFFFF",
  ];

  return (
    <div
      className="rounded-xl border p-4 backdrop-blur-lg shadow-lg"
      style={{
        border: "1px solid rgba(255,255,255,0.3)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
        color: "#001a33",
      }}
    >
      <h2 className="text-sm font-medium uppercase tracking-wider text-[#0066cc]">
        Customize
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label>Color</Label>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={params.color}
              onChange={(e) => set("color", e.target.value)}
              className="h-9 w-12 rounded-lg border border-[rgba(124,92,255,0.3)] bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)]"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((c) => (
                <button
                  key={c}
                  onClick={() => set("color", c)}
                  aria-pressed={params.color === c}
                  className={`h-7 w-7 rounded-full border-2 border-transparent ring-2 ring-transparent transition-all duration-200 hover:scale-110 ${
                    params.color === c
                      ? "ring-[linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)] ring-offset-2"
                      : "hover:ring-[rgba(124,92,255,0.5)]"
                  }`}
                  style={{ background: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Pattern</Label>
          <select
            value={params.pattern}
            onChange={(e) => set("pattern", e.target.value)}
            className="mt-2 w-full rounded-lg border px-3 py-2 backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.3)",
              color: "#001a33",
            }}
          >
            <option value="solid">Solid</option>
            <option value="stripes">Stripes</option>
            <option value="polka">Polka</option>
            <option value="floral">Floral</option>
            <option value="lace">Lace</option>
          </select>
        </div>

        <Slider
          label="Sleeve length"
          value={params.sleeveLength}
          onChange={(v) => set("sleeveLength", v)}
        />

        <div>
          <Label>Neckline</Label>
          <select
            value={params.neckline}
            onChange={(e) => set("neckline", e.target.value)}
            className="mt-2 w-full rounded-lg border px-3 py-2 backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.3)",
              color: "#001a33",
            }}
          >
            <option value="v-neck">V‑neck</option>
            <option value="scoop">Scoop</option>
            <option value="off-shoulder">Off‑shoulder</option>
            <option value="halter">Halter</option>
            <option value="boat">Boat</option>
          </select>
        </div>

        <Slider
          label="Train length"
          value={params.trainLength}
          onChange={(v) => set("trainLength", v)}
        />

        <Slider
          label="Skirt volume"
          value={params.skirtVolume}
          onChange={(v) => set("skirtVolume", v)}
        />

        <div>
          <Label>Fabric texture</Label>
          <select
            value={params.texture}
            onChange={(e) => set("texture", e.target.value)}
            className="mt-2 w-full rounded-lg border px-3 py-2 backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.3)",
              color: "#001a33",
            }}
          >
            <option value="silk">Silk</option>
            <option value="satin">Satin</option>
            <option value="lace">Lace</option>
            <option value="velvet">Velvet</option>
            <option value="chiffon">Chiffon</option>
          </select>
        </div>

        <Slider
          label="Texture intensity"
          value={params.textureIntensity}
          onChange={(v) => set("textureIntensity", v)}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onSaveVariant}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
            color: "#ffffff",
            border: "none",
          }}
        >
          <SaveIcon className="w-4 h-4" /> Save variant
        </button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-xs font-medium" style={{ color: "#001a33" }}>
      {children}
    </div>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <div>
      <Label>
        {label}
        <span className="ml-2 font-normal" style={{ color: "#0066cc" }}>
          {value}
        </span>
      </Label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,102,204,0.5) 0%, rgba(0,153,255,0.5) 100%)",
          outline: "none",
        }}
      />
    </div>
  );
}

function SaveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 3h14l2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M17 21v-8H7v8" />
      <path d="M7 3v5h8" />
    </svg>
  );
}
