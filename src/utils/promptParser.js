const COLOR_WORDS = {
  blue: "#2457F5",
  red: "#E11D48",
  green: "#10B981",
  emerald: "#10B981",
  purple: "#A855F7",
  violet: "#8B5CF6",
  gold: "#EAB308",
  yellow: "#F59E0B",
  white: "#FFFFFF",
  black: "#111827",
  pink: "#EC4899",
  navy: "#1E3A8A",
};

export function parsePromptToParams(prompt, base) {
  const p = (prompt || "").toLowerCase();
  let next = { ...base };

  // color
  for (const [name, hex] of Object.entries(COLOR_WORDS)) {
    if (p.includes(name)) {
      next.color = hex;
      break;
    }
  }

  // pattern keywords
  if (/(stripe|striped)/.test(p)) next.pattern = "stripes";
  else if (/(polka|dots?)/.test(p)) next.pattern = "polka";
  else if (/floral/.test(p)) next.pattern = "floral";
  else if (/lace/.test(p)) next.pattern = "lace";
  else next.pattern = base.pattern;

  // sleeves
  if (/sleeveless|no sleeves/.test(p)) next.sleeveLength = 5;
  else if (/short sleeves?/.test(p)) next.sleeveLength = 35;
  else if (/long sleeves?/.test(p)) next.sleeveLength = 85;

  // neckline
  if (/v[- ]?neck/.test(p)) next.neckline = "v-neck";
  else if (/scoop/.test(p)) next.neckline = "scoop";
  else if (/off[- ]?shoulder/.test(p)) next.neckline = "off-shoulder";
  else if (/halter/.test(p)) next.neckline = "halter";
  else if (/boat/.test(p)) next.neckline = "boat";

  // train
  if (/long train/.test(p)) next.trainLength = 90;
  else if (/short train|no train|mini/.test(p)) next.trainLength = 10;

  // fabric texture
  if (/silk/.test(p)) next.texture = "silk";
  else if (/satin/.test(p)) next.texture = "satin";
  else if (/velvet/.test(p)) next.texture = "velvet";
  else if (/chiffon/.test(p)) next.texture = "chiffon";
  else if (/lace/.test(p)) next.texture = "lace";

  // volume cues
  if (/ballgown|ball gown|princess/.test(p)) next.skirtVolume = 90;
  else if (/a[- ]?line/.test(p)) next.skirtVolume = 60;
  else if (/mermaid|slim|sheath/.test(p)) next.skirtVolume = 30;

  return next;
}
