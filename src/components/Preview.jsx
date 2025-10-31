import React, { forwardRef } from "react";
import { DressSVG } from "../utils/dressGenerator.jsx";

const Preview = forwardRef(function Preview(
  { params, isGenerating, onExportSvg, onExportPng },
  ref
) {
  return (
    <div
      className="rounded-xl border p-4 bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)] backdrop-blur-lg shadow-lg"
      style={{ border: "1px solid rgba(15,23,42,0.04)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-sm font-medium uppercase tracking-wider text-[#3be8d0]">
          Preview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onExportSvg}
            className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(124,92,255,0.3)] text-[#e6f7ff] hover:bg-gradient-to-r hover:from-[rgba(124,92,255,0.2)] hover:to-[rgba(59,232,208,0.2)] transition-all duration-200"
          >
            SVG
          </button>
          <button
            onClick={onExportPng}
            className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(124,92,255,0.3)] text-[#e6f7ff] hover:bg-gradient-to-r hover:from-[rgba(124,92,255,0.2)] hover:to-[rgba(59,232,208,0.2)] transition-all duration-200"
          >
            PNG
          </button>
        </div>
      </div>

      <div className="mt-3 aspect-5/7 w-full rounded-lg bg-gradient-to-br from-[rgba(124,92,255,0.05)] to-[rgba(59,232,208,0.05)] grid place-items-center overflow-hidden border border-[rgba(124,92,255,0.2)]">
        {isGenerating ? (
          <div className="flex flex-col items-center text-sm text-[#3be8d0]">
            <div className="h-8 w-8 rounded-full border-2 border-[#7c5cff] border-t-[#3be8d0] animate-spin" />
            <span className="mt-2">Rendering…</span>
          </div>
        ) : (
          <DressSVG ref={ref} params={params} />
        )}
      </div>
      <p className="mt-3 text-xs text-[#b6bfd0]">
        Tip: Save variants to compare styles side-by-side.
      </p>
    </div>
  );
});

export default Preview;
