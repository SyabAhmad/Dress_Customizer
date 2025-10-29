export { DressSVG } from "./dressGenerator.jsx";
/*

// Stale JSX content kept below for reference only. It is disabled by this block comment.
        {/* Patterns */}
        <pattern id="pattern-stripes" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="white" opacity="0.06" />
          <rect x="0" y="0" width="16" height="8" fill="white" opacity="0.12" />
        </pattern>
        <pattern id="pattern-polka" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.5" fill="white" opacity="0.15" />
          <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.12" />
        </pattern>
        <pattern id="pattern-floral" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 2c3 5-3 5 0 10 3-5-3-5 0-10Z" fill="white" opacity="0.12" />
          <path d="M2 12c5 3 5-3 10 0-5-3-5 3-10 0Z" fill="white" opacity="0.1" />
        </pattern>
        <pattern id="pattern-lace" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="7.5" fill="none" stroke="white" strokeWidth="1" opacity="0.18" />
          <circle cx="9" cy="9" r="3.5" fill="none" stroke="white" strokeWidth="1" opacity="0.18" />
        </pattern>

        {/* Textures */}
        <filter id="texture-silk">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="2" />
          <feColorMatrix type="saturate" values="0.2" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.35" />
          </feComponentTransfer>
        </filter>
        <filter id="texture-satin">
          <feTurbulence baseFrequency="0.6" numOctaves="1" seed="3" />
          <feGaussianBlur stdDeviation="0.6" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.4" />
          </feComponentTransfer>
        </filter>
        <filter id="texture-velvet">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="9" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.6" />
          </feComponentTransfer>
        </filter>
        <filter id="texture-lace">
          <feTurbulence baseFrequency="0.9" numOctaves="2" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.25" />
          </feComponentTransfer>
        </filter>
        <filter id="texture-chiffon">
          <feTurbulence baseFrequency="0.4" numOctaves="1" />
          <feGaussianBlur stdDeviation="0.9" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.2" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* mannequin silhouette hint */}
      <g opacity="0.05">
        <rect x="245" y="80" width="10" height="500" rx="5" fill="#000" />
        <circle cx="250" cy="50" r="25" fill="#000" />
      </g>

      {/* Dress group */}
      <g>
        {/* Skirt with train */}
        <path
          d={skirtPath(skirtWidth, train)}
          fill={color}
          stroke={shade(color, -20)}
          strokeWidth="2"
        />

        {/* Bodice */}
        <path d={bodicePath(neckline)} fill={color} stroke={shade(color, -20)} strokeWidth="2" />

        {/* Sleeves */}
        {sleeve > 8 && (
          <g>
            <path d={leftSleevePath(sleeve)} fill={color} stroke={shade(color, -20)} strokeWidth="2" />
            <path d={rightSleevePath(sleeve)} fill={color} stroke={shade(color, -20)} strokeWidth="2" />
          </g>
        )}

        {/* Pattern overlay */}
        {pattern !== "solid" && (
          <g opacity="0.4">
            <path d={skirtPath(skirtWidth, train)} fill={`url(#pattern-${pattern})`} />
            <path d={bodicePath(neckline)} fill={`url(#pattern-${pattern})`} />
            {sleeve > 8 && (
              <>
                <path d={leftSleevePath(sleeve)} fill={`url(#pattern-${pattern})`} />
                <path d={rightSleevePath(sleeve)} fill={`url(#pattern-${pattern})`} />
              </>
            )}
          </g>
        )}

        {/* Texture sheen */}
        <g opacity={textureOpacity} style={{ mixBlendMode: "overlay" }}>
          <path d={skirtPath(skirtWidth, train)} fill="url(#shine)" />
          <path d={bodicePath(neckline)} fill="url(#shine)" />
        </g>

        {/* Texture filter */}
        <g filter={`url(#${textureId})`} opacity={textureOpacity}>
          <path d={skirtPath(skirtWidth, train)} fill="#000" />
          <path d={bodicePath(neckline)} fill="#000" />
          {sleeve > 8 && (
            <>
              <path d={leftSleevePath(sleeve)} fill="#000" />
              <path d={rightSleevePath(sleeve)} fill="#000" />
            </>
          )}
        </g>

        {/* subtle shadow */}
        <ellipse cx="260" cy="610" rx={skirtWidth * 0.6} ry="18" fill="#000" opacity="0.12" />
      </g>
    </svg>
  );
});

function bodicePath(neckline) {
  // Base bodice coordinates
  const topY = 150;
  const waistY = 250;
  const half = 70; // half width
  let necklinePath = "";
  switch (neckline) {
    case "scoop":
      necklinePath = `M ${250 - half} ${topY} C 230 ${topY + 30}, 270 ${topY + 30}, ${250 + half} ${topY}`;
      break;
    case "off-shoulder":
      necklinePath = `M ${250 - half - 30} ${topY + 5} Q 250 ${topY - 10}, ${250 + half + 30} ${topY + 5}`;
      break;
    case "halter":
      necklinePath = `M ${250 - half + 20} ${topY} L 250 ${topY - 20} L ${250 + half - 20} ${topY}`;
      break;
    case "boat":
      necklinePath = `M ${250 - half - 10} ${topY} L ${250 + half + 10} ${topY}`;
      break;
    default:
      // v-neck
      necklinePath = `M ${250 - half} ${topY} L 250 ${topY + 25} L ${250 + half} ${topY}`;
  }
  const path = [
    necklinePath,
    `L ${250 + half - 10} ${waistY}`,
    `Q 250 ${waistY + 10}, ${250 - half + 10} ${waistY}`,
    `Z`,
  ].join(" ");
  return path;
}

function skirtPath(width, train) {
  const waistY = 250;
  const hemY = 580 + train * 0.15;
  const left = 250 - width;
  const right = 250 + width + train * 0.6;
  const ctrlY = waistY + 120 + width * 0.25;
  return `M ${250 - 60} ${waistY}
    C ${left} ${ctrlY}, ${left} ${hemY}, ${250 - 20} ${hemY}
    L ${right} ${hemY}
    C ${right - 40} ${ctrlY}, ${250 + 60} ${waistY}, ${250 + 60} ${waistY}
    Z`;
}

function leftSleevePath(length) {
  const topY = 160;
  const x = 250 - 70;
  const y = topY + length;
  return `M ${x} ${topY} C ${x - 40} ${topY + 30}, ${x - 20} ${y - 20}, ${x - 10} ${y} L ${x + 10} ${y} C ${x} ${y - 20}, ${x + 10} ${topY + 10}, ${x} ${topY} Z`;
}

function rightSleevePath(length) {
  const topY = 160;
  const x = 250 + 70;
  const y = topY + length;
  return `M ${x} ${topY} C ${x + 40} ${topY + 30}, ${x + 20} ${y - 20}, ${x + 10} ${y} L ${x - 10} ${y} C ${x} ${y - 20}, ${x - 10} ${topY + 10}, ${x} ${topY} Z`;
}

function shade(hex, percent) {
  // simple hex shade adjuster
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const toHex = (c) => (0 | (c + (t - c) * p)).toString(16).padStart(2, "0");
  return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
}
