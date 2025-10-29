import React, { forwardRef } from "react";
import { DressSVG } from "../utils/dressGenerator.jsx";

const Preview = forwardRef(function Preview(
  { params, isGenerating, onExportSvg, onExportPng },
  ref
) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Preview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onExportSvg}
            className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            SVG
          </button>
          <button
            onClick={onExportPng}
            className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            PNG
          </button>
        </div>
      </div>

      <div className="mt-3 aspect-[5/7] w-full rounded-lg bg-zinc-50 dark:bg-zinc-950 grid place-items-center overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center text-sm text-zinc-500">
            <div className="h-8 w-8 rounded-full border-2 border-zinc-300 border-t-blue-600 animate-spin" />
            <span className="mt-2">Rendering…</span>
          </div>
        ) : (
          <DressSVG ref={ref} params={params} />
        )}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Tip: Save variants to compare styles side-by-side.
      </p>
    </div>
  );
});

export default Preview;
