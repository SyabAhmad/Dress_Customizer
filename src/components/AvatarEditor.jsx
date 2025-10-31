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
        <div className="w-full max-w-sm aspect-5/7 rounded-md bg-gradient-to-br from-[#1E2329] to-[#2a3138] grid place-items-center">
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
              {/* Advanced realistic body gradients for anatomical accuracy */}
              <defs>
                {/* Realistic multi-tone skin gradients */}
                <radialGradient id="faceGradient" cx="45%" cy="25%" r="60%">
                  <stop offset="0%" stopColor="#FEE5D9" />
                  <stop offset="40%" stopColor="#FDBCB4" />
                  <stop offset="80%" stopColor="#F4A460" />
                  <stop offset="100%" stopColor="#DEB887" />
                </radialGradient>

                <radialGradient id="bodyGradient" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FDBCB4" />
                  <stop offset="50%" stopColor="#F4A460" />
                  <stop offset="100%" stopColor="#D2691E" />
                </radialGradient>

                {/* Realistic shadow gradients */}
                <radialGradient id="faceShadow" cx="60%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                </radialGradient>

                <linearGradient
                  id="bodyShadow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                </linearGradient>

                {/* Realistic fabric gradients */}
                <linearGradient
                  id="shirtGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#E8F4FD" />
                  <stop offset="50%" stopColor="#B8D4E8" />
                  <stop offset="100%" stopColor="#7FA4C4" />
                </linearGradient>

                <linearGradient
                  id="pantsGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B9DC3" />
                  <stop offset="50%" stopColor="#5A6B8C" />
                  <stop offset="100%" stopColor="#3D4A63" />
                </linearGradient>
              </defs>

              {/* Realistic head with anatomical accuracy */}
              <ellipse
                cx={100}
                cy={metrics.headCY}
                rx={metrics.headR}
                ry={metrics.headR * 1.1}
                fill="url(#faceGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />

              {/* Realistic facial features */}
              {/* Eyes with iris and realistic shading */}
              <ellipse
                cx={92}
                cy={metrics.headCY - 3}
                rx="2.2"
                ry="3.2"
                fill="#2C1810"
              />
              <ellipse
                cx={108}
                cy={metrics.headCY - 3}
                rx="2.2"
                ry="3.2"
                fill="#2C1810"
              />
              <ellipse
                cx={92.5}
                cy={metrics.headCY - 2.5}
                rx="1"
                ry="1.5"
                fill="#4A4A4A"
              />
              <ellipse
                cx={108.5}
                cy={metrics.headCY - 2.5}
                rx="1"
                ry="1.5"
                fill="#4A4A4A"
              />
              <ellipse
                cx={92.8}
                cy={metrics.headCY - 3}
                rx="0.4"
                ry="0.6"
                fill="#FFFFFF"
              />
              <ellipse
                cx={108.8}
                cy={metrics.headCY - 3}
                rx="0.4"
                ry="0.6"
                fill="#FFFFFF"
              />

              {/* Realistic nose with shading */}
              <path
                d="M 100 25 Q 98 28 100 31 Q 102 28 100 25"
                fill="#DEB887"
                stroke="#D2691E"
                strokeWidth="0.4"
              />
              <path
                d="M 100 26 Q 99 28 100 30"
                stroke="#F4A460"
                strokeWidth="0.3"
                fill="none"
              />

              {/* Realistic mouth with lip shading */}
              <ellipse cx={100} cy={35} rx="4" ry="2" fill="#CD853F" />
              <path
                d="M 96 35 Q 100 37 104 35"
                stroke="#8B4513"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse
                cx={100}
                cy={35.5}
                rx="3.5"
                ry="1.5"
                fill="#F4A460"
                opacity="0.7"
              />

              {/* Realistic ears */}
              <ellipse
                cx={85}
                cy={metrics.headCY}
                rx="3"
                ry="5"
                fill="url(#faceGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />
              <ellipse
                cx={115}
                cy={metrics.headCY}
                rx="3"
                ry="5"
                fill="url(#faceGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />

              {/* Realistic neck with anatomical shading */}
              <ellipse
                cx={100}
                cy={metrics.neckY + 5}
                rx={8}
                ry={10}
                fill="url(#bodyGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />
              <ellipse
                cx={100}
                cy={metrics.neckY + 5}
                rx={8}
                ry={10}
                fill="url(#bodyShadow)"
              />

              {/* Realistic hair with natural flow */}
              <ellipse
                cx={100}
                cy={metrics.headCY - 10}
                rx={metrics.headR + 3}
                ry={metrics.headR * 0.9}
                fill="#3C2414"
                opacity="0.95"
              />
              <path
                d="M 85 15 Q 100 8 115 15 Q 113 12 100 10 Q 87 12 85 15"
                fill="#2C1810"
              />
              <path
                d="M 88 18 Q 100 13 112 18"
                stroke="#1A0F08"
                strokeWidth="0.5"
                fill="none"
              />

              {/* Realistic torso with anatomical proportions */}
              <path
                d={metrics.torsoPath}
                fill="url(#shirtGradient)"
                stroke="#5A7CA5"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />

              {/* Realistic shirt details */}
              <ellipse
                cx={100}
                cy={metrics.neckY + 8}
                rx={7}
                ry={5}
                fill="#FFFFFF"
                opacity="0.95"
              />
              <circle cx={100} cy={metrics.neckY + 15} r="1.2" fill="#7FA4C4" />
              <circle cx={100} cy={metrics.neckY + 20} r="1.2" fill="#7FA4C4" />
              <circle cx={100} cy={metrics.neckY + 25} r="1.2" fill="#7FA4C4" />

              {/* Realistic collar bones */}
              <path
                d="M 93 18 Q 100 20 107 18"
                stroke="#5A7CA5"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Realistic arms with anatomical accuracy */}
              <path
                d={metrics.leftArmPath}
                fill="url(#bodyGradient)"
                stroke="#D2691E"
                strokeWidth="0.4"
                strokeLinejoin="round"
              />
              <path
                d={metrics.rightArmPath}
                fill="url(#bodyGradient)"
                stroke="#D2691E"
                strokeWidth="0.4"
                strokeLinejoin="round"
              />

              {/* Realistic hands with finger details */}
              <ellipse
                cx={metrics.leftHand.cx}
                cy={metrics.leftHand.cy}
                rx={metrics.leftHand.r}
                ry={metrics.leftHand.r * 0.8}
                fill="url(#bodyGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />
              <ellipse
                cx={metrics.rightHand.cx}
                cy={metrics.rightHand.cy}
                rx={metrics.rightHand.r}
                ry={metrics.rightHand.r * 0.8}
                fill="url(#bodyGradient)"
                stroke="#D2691E"
                strokeWidth="0.3"
              />

              {/* Finger details */}
              <ellipse
                cx={metrics.leftHand.cx - 3}
                cy={metrics.leftHand.cy + 2}
                rx="1.5"
                ry="2"
                fill="url(#bodyGradient)"
              />
              <ellipse
                cx={metrics.rightHand.cx + 3}
                cy={metrics.rightHand.cy + 2}
                rx="1.5"
                ry="2"
                fill="url(#bodyGradient)"
              />

              {/* Realistic legs with anatomical proportions */}
              <path
                d={metrics.leftLegPath}
                fill="url(#pantsGradient)"
                stroke="#4A5A73"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <path
                d={metrics.rightLegPath}
                fill="url(#pantsGradient)"
                stroke="#4A5A73"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />

              {/* Realistic knee shading */}
              <ellipse
                cx={100 - 14}
                cy={metrics.kneeY}
                rx="6"
                ry="3"
                fill="#6B7B8C"
                opacity="0.6"
              />
              <ellipse
                cx={100 + 14}
                cy={metrics.kneeY}
                rx="6"
                ry="3"
                fill="#6B7B8C"
                opacity="0.6"
              />

              {/* Realistic feet with shoe details */}
              <ellipse
                cx={metrics.leftFoot.cx}
                cy={metrics.leftFoot.cy}
                rx={metrics.leftFoot.rx}
                ry={metrics.leftFoot.ry}
                fill="#2C3E50"
                stroke="#1A252F"
                strokeWidth="0.4"
              />
              <ellipse
                cx={metrics.rightFoot.cx}
                cy={metrics.rightFoot.cy}
                rx={metrics.rightFoot.rx}
                ry={metrics.rightFoot.ry}
                fill="#2C3E50"
                stroke="#1A252F"
                strokeWidth="0.4"
              />

              {/* Shoe details */}
              <ellipse
                cx={metrics.leftFoot.cx}
                cy={metrics.leftFoot.cy}
                rx="6"
                ry="2"
                fill="#34495E"
              />
              <ellipse
                cx={metrics.rightFoot.cx}
                cy={metrics.rightFoot.cy}
                rx="6"
                ry="2"
                fill="#34495E"
              />

              {/* Realistic body highlights and shadows */}
              <ellipse
                cx="115"
                cy="120"
                rx="20"
                ry="50"
                fill="#FFFFFF"
                opacity="0.08"
              />
              <ellipse
                cx="85"
                cy="140"
                rx="15"
                ry="35"
                fill="#000000"
                opacity="0.2"
              />
              <ellipse
                cx="105"
                cy="200"
                rx="12"
                ry="25"
                fill="#000000"
                opacity="0.15"
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
    kneeY,
  };
}
