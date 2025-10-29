import { useRef, useState } from "react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import PromptBar from "../components/PromptBar.jsx";
import CustomizerPanel from "../components/CustomizerPanel.jsx";
import Preview from "../components/Preview.jsx";
import VariantsTray from "../components/VariantsTray.jsx";
import { parsePromptToParams } from "../utils/promptParser.js";

export default function Studio() {
  const [prompt, setPrompt] = useState("");
  const [params, setParams] = useState({
    color: "#EC4899",
    pattern: "solid",
    sleeveLength: 70,
    neckline: "v-neck",
    trainLength: 50,
    texture: "satin",
    textureIntensity: 40,
    skirtVolume: 60,
  });
  const [variants, setVariants] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  const onGenerate = async () => {
    setIsGenerating(true);
    const updated = parsePromptToParams(prompt, params);
    await new Promise((r) => setTimeout(r, 500));
    setParams(updated);
    setIsGenerating(false);
  };

  const addVariant = async () => {
    const el = previewRef.current;
    if (!el) return;
    const svg = el.outerHTML;
    const name = prompt?.trim() || "Design";
    const thumb = await svgToPngDataUrl(svg, 200, 280);
    const newVar = {
      id: crypto.randomUUID(),
      name,
      timestamp: Date.now(),
      svg,
      params,
      thumb,
    };
    setVariants((v) => [newVar, ...v].slice(0, 12));
  };

  const loadVariant = (v) => {
    setParams(v.params);
    setPrompt(v.name === "Design" ? "" : v.name);
  };

  const exportSvg = () => {
    const el = previewRef.current;
    if (!el) return;
    const svg = el.outerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dress-design-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPng = async () => {
    const el = previewRef.current;
    if (!el) return;
    const svg = el.outerHTML;
    const dataUrl = await svgToPngDataUrl(svg, 800, 1120);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `dress-design-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white text-zinc-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-8">
        {/* Layout with sidebar on the left */}
        <div className="mt-6 lg:flex lg:gap-6">
          {/* Sidebar (large screens) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="rounded-xl border border-rose-200 bg-white/70 backdrop-blur min-h-[520px] p-3 flex flex-col gap-2 shadow-sm">
              <div className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Navigation
              </div>
              <SidebarItem
                to="/settings"
                icon={<SettingsIcon className="w-4 h-4" />}
                label="Settings"
              />
              <SidebarItem
                to="/recent-chats"
                icon={<ChatIcon className="w-4 h-4" />}
                label="Recent chats"
              />
              <SidebarItem
                to="/profile"
                icon={<UserIcon className="w-4 h-4" />}
                label="Profile"
              />
            </nav>
          </aside>

          {/* Main content area */}
          <div className="flex-1">
            {/* Inputs + Suggestions and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left column: inputs and customization */}
              <section className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4">
                <PromptBar
                  prompt={prompt}
                  onChange={setPrompt}
                  onGenerate={onGenerate}
                  isGenerating={isGenerating}
                />
                <CustomizerPanel
                  params={params}
                  setParams={setParams}
                  onSaveVariant={addVariant}
                  isGenerating={isGenerating}
                />
              </section>

              {/* Right column: big preview */}
              <section className="lg:col-span-7 order-1 lg:order-2">
                <Preview
                  params={params}
                  ref={previewRef}
                  isGenerating={isGenerating}
                  onExportSvg={exportSvg}
                  onExportPng={exportPng}
                />
              </section>
            </div>

            <VariantsTray variants={variants} onSelect={loadVariant} />
          </div>
        </div>
      </main>
    </div>
  );
}

async function svgToPngDataUrl(svgText, width, height) {
  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.crossOrigin = "anonymous";
  const dataUrl = await new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
  return dataUrl;
}

function SidebarItem({ icon, label, to, active = false }) {
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors " +
        (active
          ? "bg-rose-100 text-rose-700"
          : "text-zinc-700 hover:bg-rose-100 hover:text-rose-700")
      }
    >
      <span className="shrink-0 text-rose-500">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="m5.6 5.6 1.4 1.4" />
      <path d="m17 17 1.4 1.4" />
      <path d="m5.6 18.4 1.4-1.4" />
      <path d="m17 7 1.4-1.4" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
