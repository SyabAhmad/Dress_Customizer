import { useRef, useState } from "react";
import Header from "../components/Header.jsx";
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
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white dark:from-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-8">
        <PromptBar
          prompt={prompt}
          onChange={setPrompt}
          onGenerate={onGenerate}
          isGenerating={isGenerating}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <section className="lg:col-span-5">
            <CustomizerPanel
              params={params}
              setParams={setParams}
              onSaveVariant={addVariant}
              isGenerating={isGenerating}
            />
          </section>
          <section className="lg:col-span-7">
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
