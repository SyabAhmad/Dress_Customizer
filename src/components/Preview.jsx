import React, { forwardRef } from "react";
import { DressSVG } from "../utils/dressGenerator.jsx";

const Preview = forwardRef(function Preview(
  { params, isGenerating, onExportSvg, onExportPng },
  ref
) {
  return (
    <div className="rounded-xl border border-[#31363F] p-4 bg-[#31363F]/70 backdrop-blur shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
          Preview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onExportSvg}
            className="text-xs px-3 py-1.5 rounded-md border border-[#31363F] text-[#BDBDBD] hover:bg-[#31363F]"
          >
            SVG
          </button>
          <button
            onClick={onExportPng}
            className="text-xs px-3 py-1.5 rounded-md border border-[#31363F] text-[#BDBDBD] hover:bg-[#31363F]"
          >
            PNG
          </button>
        </div>
      </div>

      <div className="mt-3 aspect-5/7 w-full rounded-lg bg-[#222831] grid place-items-center overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center text-sm text-[#BDBDBD]">
            <div className="h-8 w-8 rounded-full border-2 border-[#5E9396] border-t-[#76ABAE] animate-spin" />
            <span className="mt-2">Rendering…</span>
          </div>
        ) : (
          <DressSVG ref={ref} params={params} />
        )}
      </div>
      <p className="mt-3 text-xs text-[#BDBDBD]">
        Tip: Save variants to compare styles side-by-side.
      </p>
    </div>
  );
});

export default Preview;
