import { useEffect, useMemo, useState } from "react";

/**
 * AvatarEditor
 * Props:
 * - value: legacy or new shape:
 *   Legacy: { height: pct, width: pct, build: -50..50, head: pct }
 *   New: { heightCm: number, widthCm: number, unit: 'cm'|'in', build: -50..50, headPct: 80..120 }
 * - onChange: (next) => void
 * - onSave: (next) => void
 * - className?: string
 */
export default function AvatarEditor({
  value,
  onChange,
  onSave,
  className = "",
}) {
  const canon = toCanonical(value);
  const [params, setParams] = useState(canon);

  useEffect(() => {
    if (!value) return;
    setParams(toCanonical(value));
  }, [value]);

  const update = (patch) => {
    const next = { ...params, ...patch };
    setParams(next);
    onChange?.(next);
  };

  const reset = () => {
    const next = DEFAULTS;
    setParams(next);
    onChange?.(next);
  };

  const save = () => onSave?.(params);

  // Compute silhouette metrics
  const metrics = useMemo(() => computeMetrics(params), [params]);

  return (
    <div className={"grid gap-5 lg:grid-cols-2 " + className}>
      <div className="rounded-xl border border-[#31363F] bg-[#222831] p-3 flex items-center justify-center">
        <div className="w-full max-w-sm aspect-5/7 rounded-md bg-[#1E2329] grid place-items-center">
          <svg
            viewBox="0 0 200 280"
            className="w-full h-full"
            role="img"
            aria-label="Avatar preview"
          >
            <g
              transform={`translate(100,20) scale(${metrics.scaleX} ${metrics.scaleY}) translate(-100,-20)`}
              style={{ transition: "transform 120ms ease" }}
            >
              {/* Head */}
              <ellipse
                cx={100}
                cy={metrics.headCY}
                rx={metrics.headR}
                ry={metrics.headR * 1.1}
                fill="#76ABAE"
                opacity="0.95"
              />
              {/* Neck */}
              <rect
                x={100 - 6}
                y={metrics.neckY}
                width={12}
                height={10}
                rx={3}
                fill="#99C7C9"
                opacity="0.9"
              />

              {/* Torso (with shoulders, waist, hips) */}
              <path
                d={metrics.torsoPath}
                fill="#76ABAE"
                opacity="0.88"
                stroke="#0f1520"
                strokeOpacity="0.25"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* Arms with elbows and hands */}
              <path
                d={metrics.leftArmPath}
                fill="#6DA0A3"
                opacity="0.9"
                stroke="#0f1520"
                strokeOpacity="0.25"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d={metrics.rightArmPath}
                fill="#6DA0A3"
                opacity="0.9"
                stroke="#0f1520"
                strokeOpacity="0.25"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <ellipse
                cx={metrics.leftHand.cx}
                cy={metrics.leftHand.cy}
                rx={metrics.leftHand.r}
                ry={metrics.leftHand.r * 0.7}
                fill="#6DA0A3"
              />
              <ellipse
                cx={metrics.rightHand.cx}
                cy={metrics.rightHand.cy}
                rx={metrics.rightHand.r}
                ry={metrics.rightHand.r * 0.7}
                fill="#6DA0A3"
              />

              {/* Legs with knees */}
              <path
                d={metrics.leftLegPath}
                fill="#5B8B8E"
                opacity="0.95"
                stroke="#0f1520"
                strokeOpacity="0.25"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d={metrics.rightLegPath}
                fill="#5B8B8E"
                opacity="0.95"
                stroke="#0f1520"
                strokeOpacity="0.25"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* Feet */}
              <ellipse
                cx={metrics.leftFoot.cx}
                cy={metrics.leftFoot.cy}
                rx={metrics.leftFoot.rx}
                ry={metrics.leftFoot.ry}
                fill="#5B8B8E"
                opacity="0.95"
              />
              <ellipse
                cx={metrics.rightFoot.cx}
                cy={metrics.rightFoot.cy}
                rx={metrics.rightFoot.rx}
                ry={metrics.rightFoot.ry}
                fill="#5B8B8E"
                opacity="0.95"
              />

              {/* Subtle highlight */}
              <ellipse
                cx="118"
                cy="125"
                rx="12"
                ry="34"
                fill="#ffffff"
                opacity="0.04"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="rounded-xl border border-[#31363F] bg-[#31363F]/70 p-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
          Avatar controls
        </h3>
        <UnitControls
          unit={params.unit}
          onChange={(u) => update(convertUnits(params, u))}
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField
            label={`Height (${params.unit})`}
            min={params.unit === "cm" ? 140 : 55}
            max={params.unit === "cm" ? 200 : 79}
            step={params.unit === "cm" ? 1 : 0.5}
            value={
              params.unit === "cm"
                ? Math.round(params.heightCm)
                : round1(cmToIn(params.heightCm))
            }
            onChange={(v) => {
              const cm =
                params.unit === "cm"
                  ? clamp(v, 140, 200)
                  : inToCm(clamp(v, 55, 79));
              update({ heightCm: cm });
            }}
          />
          <NumberField
            label={`Width (${params.unit})`}
            min={params.unit === "cm" ? 34 : 13.5}
            max={params.unit === "cm" ? 55 : 21.7}
            step={params.unit === "cm" ? 0.5 : 0.2}
            value={
              params.unit === "cm"
                ? round1(params.widthCm)
                : round1(cmToIn(params.widthCm))
            }
            onChange={(v) => {
              const cm =
                params.unit === "cm"
                  ? clamp(v, 34, 55)
                  : inToCm(clamp(v, 13.5, 21.7));
              update({ widthCm: cm });
            }}
          />
        </div>
        <div className="mt-4 space-y-4">
          <Slider
            label="Build (Slim ↔ Heavy)"
            min={-50}
            max={50}
            value={params.build}
            onChange={(v) => update({ build: v })}
          />
          <Slider
            label="Head size (%)"
            min={80}
            max={120}
            value={params.headPct}
            onChange={(v) => update({ headPct: v })}
          />
          <Slider
            label="Arm length (%)"
            min={80}
            max={120}
            value={params.armLenPct}
            onChange={(v) => update({ armLenPct: v })}
          />
          <Slider
            label="Leg length (%)"
            min={80}
            max={120}
            value={params.legLenPct}
            onChange={(v) => update({ legLenPct: v })}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={save}
            className="rounded-md bg-[#76ABAE] text-[#021018] px-4 py-2 shadow hover:opacity-95"
          >
            Save avatar
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-[#3D434C] px-4 py-2 text-[#EEEEEE] hover:bg-[#31363F]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, min = 0, max = 100 }) {
  return (
    <label className="block text-sm">
      <div className="mb-1 text-[#BDBDBD] flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: "#76ABAE" }}
      />
    </label>
  );
}
const DEFAULTS = {
  heightCm: 170,
  widthCm: 42,
  unit: "cm",
  build: 0,
  headPct: 100,
  armLenPct: 100,
  legLenPct: 100,
};

function cmToIn(cm) {
  return cm / 2.54;
}
function inToCm(inch) {
  return inch * 2.54;
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function round1(v) {
  return Math.round(v * 10) / 10;
}

function toCanonical(v) {
  if (!v) return { ...DEFAULTS };
  // New shape
  if (typeof v.heightCm === "number" && typeof v.widthCm === "number") {
    return {
      heightCm: v.heightCm,
      widthCm: v.widthCm,
      unit: v.unit === "in" ? "in" : "cm",
      build: typeof v.build === "number" ? v.build : 0,
      headPct: typeof v.headPct === "number" ? v.headPct : 100,
      armLenPct: typeof v.armLenPct === "number" ? v.armLenPct : 100,
      legLenPct: typeof v.legLenPct === "number" ? v.legLenPct : 100,
    };
  }
  // Legacy percent shape
  const baseH = DEFAULTS.heightCm; // 170
  const baseW = DEFAULTS.widthCm; // 42
  const heightPct = typeof v.height === "number" ? v.height : 100;
  const widthPct = typeof v.width === "number" ? v.width : 100;
  return {
    heightCm: baseH * (heightPct / 100),
    widthCm: baseW * (widthPct / 100),
    unit: "cm",
    build: typeof v.build === "number" ? v.build : 0,
    headPct: typeof v.head === "number" ? v.head : 100,
    armLenPct: 100,
    legLenPct: 100,
  };
}

function convertUnits(params, toUnit) {
  if (params.unit === toUnit) return params;
  return { ...params, unit: toUnit };
}

function UnitControls({ unit, onChange }) {
  return (
    <div className="mt-3 inline-flex items-center rounded-md border border-[#3D434C] overflow-hidden">
      {["cm", "in"].map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={`px-3 py-1.5 text-sm ${
            unit === u ? "bg-[#76ABAE] text-[#021018]" : "text-[#EEEEEE]"
          }`}
        >
          {u.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function NumberField({ label, value, onChange, min, max, step = 1 }) {
  return (
    <label className="block text-sm">
      <div className="mb-1 text-[#BDBDBD]">{label}</div>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-[#3D434C] bg-[#222831] text-[#EEEEEE] px-3 py-2 outline-none focus:ring-2"
        style={{ accentColor: "#76ABAE" }}
      />
      <div className="mt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: "#76ABAE" }}
        />
      </div>
    </label>
  );
}

function computeMetrics({
  heightCm = 170,
  widthCm = 42,
  build = 0,
  headPct = 100,
  armLenPct = 100,
  legLenPct = 100,
}) {
  const BASE_HEIGHT = 170; // cm
  const BASE_WIDTH = 42; // cm (shoulder breadth)
  const scaleX = widthCm / BASE_WIDTH;
  const scaleY = heightCm / BASE_HEIGHT;
  const headR = 12 * (headPct / 100);
  const headCY = 28;
  const neckY = headCY + headR + 2;

  // Build shaping (0..1)
  const t = (build + 50) / 100; // -50 slim → 0, +50 heavy → 1
  // Neutral baseline (gender-agnostic): straighter torso ratios
  const baseShoulder = 40; // half-width at shoulders
  const baseChest = 32;
  const baseWaist = 30;
  const baseHip = 32;

  // Build scales overall width modestly while preserving neutral ratios
  const shoulder = baseShoulder * (0.95 + 0.25 * t);
  const chest = baseChest * (0.95 + 0.25 * t);
  const waist = baseWaist * (0.95 + 0.15 * t);
  const hip = baseHip * (0.95 + 0.25 * t);

  // Vertical landmarks
  const chestY = neckY + 10;
  const waistY = chestY + 38;
  const hipY = waistY + 28;
  const crotchY = hipY + 26;

  // Base limb landmarks
  const elbowYBase = waistY + 10;
  const wristYBase = hipY + 18;
  const kneeYBase = crotchY + 54;
  const footYBase = 260;

  // Adjust limb lengths
  const shoulderY = chestY - 4;
  const armScale = armLenPct / 100;
  const shoulderToElbow = elbowYBase - shoulderY;
  const elbowToWrist = wristYBase - elbowYBase;
  const elbowY = shoulderY + shoulderToElbow * armScale;
  const wristY = elbowY + elbowToWrist * armScale;

  const legScale = legLenPct / 100;
  const thighLen = kneeYBase - crotchY;
  const shankLen = footYBase - kneeYBase;
  const kneeY = crotchY + thighLen * legScale;
  const footY = kneeY + shankLen * legScale;

  // Torso with shoulders and curves
  const left = [
    `M ${100 - shoulder} ${neckY + 2}`,
    `C ${100 - shoulder + 6} ${neckY + 8}, ${100 - chest - 2} ${chestY - 2}, ${
      100 - chest
    } ${chestY}`,
    `Q ${100 - chest + 6} ${chestY + 12}, ${100 - waist} ${waistY}`,
    `Q ${100 - waist - 4} ${waistY + 14}, ${100 - hip} ${hipY}`,
    `L ${100 - 16} ${crotchY}`,
  ].join(" ");
  const right = [
    `L ${100 + 16} ${crotchY}`,
    `L ${100 + hip} ${hipY}`,
    `Q ${100 + waist + 4} ${waistY + 14}, ${100 + waist} ${waistY}`,
    `Q ${100 + chest - 6} ${chestY + 12}, ${100 + chest} ${chestY}`,
    `C ${100 + chest + 2} ${chestY - 2}, ${100 + shoulder - 6} ${neckY + 8}, ${
      100 + shoulder
    } ${neckY + 2}`,
    `L ${100 - shoulder} ${neckY + 2}`,
  ].join(" ");
  const torsoPath = `${left} ${right}`;

  // Arms with elbows: shoulder → elbow → wrist; slight taper
  const armOut = shoulder + 18;
  const armIn = shoulder - 4;
  const leftArmPath = [
    `M ${100 - shoulder} ${shoulderY}`,
    `C ${100 - armOut} ${chestY + 2}, ${100 - armOut} ${elbowY}, ${
      100 - armIn
    } ${elbowY + 4}`,
    `L ${100 - armIn - 2} ${wristY}`,
    `L ${100 - shoulder + 2} ${wristY - 6}`,
    "Z",
  ].join(" ");
  const rightArmPath = [
    `M ${100 + shoulder} ${shoulderY}`,
    `C ${100 + armOut} ${chestY + 2}, ${100 + armOut} ${elbowY}, ${
      100 + armIn
    } ${elbowY + 4}`,
    `L ${100 + armIn + 2} ${wristY}`,
    `L ${100 + shoulder - 2} ${wristY - 6}`,
    "Z",
  ].join(" ");

  const leftHand = { cx: 100 - armIn - 4, cy: wristY + 4, r: 4 };
  const rightHand = { cx: 100 + armIn + 4, cy: wristY + 4, r: 4 };

  // Legs with slight knee taper
  const calf = 11 * (0.9 + 0.3 * t);
  const leftLegPath = `M ${100 - 16} ${crotchY} C ${100 - 18} ${
    crotchY + 18
  }, ${100 - 18} ${kneeY - 6}, ${100 - 14} ${kneeY} L ${
    100 - 12 - calf
  } ${footY} L ${100 - 6} ${footY} L ${100 - 10} ${kneeY} C ${100 - 13} ${
    kneeY - 6
  }, ${100 - 15} ${crotchY + 18}, ${100 - 16} ${crotchY} Z`;
  const rightLegPath = `M ${100 + 16} ${crotchY} C ${100 + 18} ${
    crotchY + 18
  }, ${100 + 18} ${kneeY - 6}, ${100 + 14} ${kneeY} L ${
    100 + 12 + calf
  } ${footY} L ${100 + 6} ${footY} L ${100 + 10} ${kneeY} C ${100 + 13} ${
    kneeY - 6
  }, ${100 + 15} ${crotchY + 18}, ${100 + 16} ${crotchY} Z`;

  // Feet (fixed size, follow leg length)
  const leftFoot = { cx: 100 - 10, cy: footY + 3, rx: 8, ry: 3.5 };
  const rightFoot = { cx: 100 + 10, cy: footY + 3, rx: 8, ry: 3.5 };

  return {
    scaleX,
    scaleY,
    headR,
    headCY,
    neckY,
    torsoPath,
    leftArmPath,
    rightArmPath,
    leftHand,
    rightHand,
    leftLegPath,
    rightLegPath,
    leftFoot,
    rightFoot,
  };
}
