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
    <div className="rounded-xl border border-rose-200 p-4 bg-white/70 backdrop-blur shadow-sm">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
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
              className="h-9 w-12 rounded border border-rose-200"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((c) => (
                <button
                  key={c}
                  onClick={() => set("color", c)}
                  aria-pressed={params.color === c}
                  className={`h-7 w-7 rounded-full border border-rose-200 ring-2 ring-transparent ${
                    params.color === c ? "ring-rose-400" : ""
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
            className="mt-2 w-full rounded-lg border border-rose-200 bg-white/60 px-3 py-2"
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
            className="mt-2 w-full rounded-lg border border-rose-200 bg-white/60 px-3 py-2"
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
            className="mt-2 w-full rounded-lg border border-rose-200 bg-white/60 px-3 py-2"
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
          className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2 hover:bg-rose-100/50"
        >
          <SaveIcon className="w-4 h-4" /> Save variant
        </button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div className="text-xs text-zinc-500">{children}</div>;
}

function Slider({ label, value, onChange }) {
  return (
    <div>
      <Label>
        {label}
        <span className="ml-2 text-zinc-400">{value}</span>
      </Label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-rose-600"
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
