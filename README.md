# Dress Customizer — Frontend (React + Vite + Tailwind)

Beautiful, responsive UI for an AI-powered clothing design tool. Enter a natural-language prompt (e.g. “Generate a blue evening gown with lace sleeves and a long train”) and tweak details like color, pattern, sleeves, neckline, fabric texture, train length, and skirt volume. Save variants, preview, and export as SVG/PNG — all client-side.

## Features

- Prompt-based param extraction (simple heuristic parser)
- Real-time vector mock-up with SVG (bodice, sleeves, skirt, train)
- Patterns (solid, stripes, polka, floral, lace)
- Fabric textures (silk, satin, lace, velvet, chiffon) via SVG filters
- Controls: color, sleeve length, neckline, train, texture intensity, skirt volume
- Save variants with thumbnails and one-click restore
- Export current design to SVG or PNG
- Light/Dark theme toggle

## Getting started

```powershell
npm install
npm run dev
```

Then open the URL from the console (usually http://localhost:5173).

Build for production:

```powershell
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` — Main composition and state wiring
- `src/components/Header.jsx` — Top navbar with theme toggle
- `src/components/PromptBar.jsx` — Prompt input and generate action
- `src/components/CustomizerPanel.jsx` — Controls for parameters
- `src/components/Preview.jsx` — SVG preview, export buttons
- `src/components/VariantsTray.jsx` — Saved variants strip
- `src/utils/dressGenerator.jsx` — SVG generator for the dress
- `src/utils/promptParser.js` — Heuristic mapping of prompt → params

## Notes

- This is a frontend-only prototype; there’s no real AI model call. The prompt is parsed with keyword heuristics and mapped to visual parameters.
- The SVG silhouette is intentionally stylized to serve as a quick mock-up.
- Tailwind v4 utilities are used via `@tailwindcss/vite` and `@import "tailwindcss"` in `src/index.css`.

