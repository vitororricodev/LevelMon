/** Pixel-art GBA-style forest scene with trainer + cracking egg. */
export function PixelScene({ size = 260 }: { size?: number }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        border: "4px solid #1a1030",
        boxShadow:
          "0 0 0 2px #7C3AED, 0 0 40px -4px rgba(124,58,237,0.7), inset 0 0 0 2px #0a0518",
      }}
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%" shapeRendering="crispEdges">
        {/* Sky */}
        <rect x="0" y="0" width="64" height="28" fill="#8ec5fc" />
        <rect x="0" y="0" width="64" height="10" fill="#a7d3ff" />
        {/* clouds */}
        <rect x="6" y="4" width="6" height="2" fill="#fff" />
        <rect x="5" y="5" width="8" height="2" fill="#fff" />
        <rect x="44" y="7" width="7" height="2" fill="#fff" />
        <rect x="43" y="8" width="9" height="2" fill="#fff" />
        {/* sun */}
        <rect x="52" y="4" width="6" height="6" fill="#fde047" />
        <rect x="51" y="5" width="8" height="4" fill="#fde047" />
        <rect x="52" y="4" width="6" height="6" fill="#fde047" />

        {/* Distant mountains */}
        <polygon points="0,28 10,16 20,28" fill="#6d4c8f" />
        <polygon points="14,28 26,14 38,28" fill="#5b3d7a" />
        <polygon points="30,28 44,18 58,28" fill="#6d4c8f" />
        <polygon points="48,28 60,20 64,28 64,28" fill="#5b3d7a" />
        {/* snow caps */}
        <polygon points="24,18 26,14 28,18" fill="#e9d5ff" />
        <polygon points="42,22 44,18 46,22" fill="#e9d5ff" />

        {/* Grass hill (mid) */}
        <rect x="0" y="28" width="64" height="6" fill="#4ade80" />
        <rect x="0" y="30" width="64" height="4" fill="#22c55e" />
        {/* Trees */}
        <g>
          {/* left tree */}
          <rect x="4" y="24" width="2" height="6" fill="#5a3220" />
          <rect x="2" y="20" width="6" height="6" fill="#166534" />
          <rect x="3" y="18" width="4" height="2" fill="#166534" />
          <rect x="3" y="22" width="1" height="1" fill="#22c55e" />
          {/* right tree */}
          <rect x="56" y="23" width="2" height="7" fill="#5a3220" />
          <rect x="54" y="18" width="6" height="6" fill="#166534" />
          <rect x="55" y="16" width="4" height="2" fill="#166534" />
          <rect x="57" y="20" width="1" height="1" fill="#22c55e" />
          {/* mid bush */}
          <rect x="20" y="26" width="4" height="2" fill="#166534" />
          <rect x="40" y="26" width="4" height="2" fill="#166534" />
        </g>

        {/* Ground path */}
        <rect x="0" y="34" width="64" height="30" fill="#a3e635" />
        <rect x="0" y="34" width="64" height="2" fill="#65a30d" />
        <rect x="8" y="40" width="48" height="18" fill="#c9a96a" />
        <rect x="10" y="38" width="44" height="2" fill="#a8874e" />
        <rect x="6" y="58" width="52" height="6" fill="#c9a96a" />
        {/* path pebbles */}
        <rect x="14" y="46" width="1" height="1" fill="#8b6f42" />
        <rect x="46" y="50" width="1" height="1" fill="#8b6f42" />
        <rect x="30" y="55" width="1" height="1" fill="#8b6f42" />
        <rect x="22" y="52" width="1" height="1" fill="#8b6f42" />
        {/* grass tufts */}
        <rect x="4" y="36" width="1" height="2" fill="#166534" />
        <rect x="58" y="36" width="1" height="2" fill="#166534" />
        <rect x="6" y="60" width="1" height="1" fill="#166534" />
        <rect x="56" y="60" width="1" height="1" fill="#166534" />

        {/* ---- TRAINER (humanoid, GBA style) ---- */}
        {/* facing right, standing on path */}
        <g>
          {/* hat */}
          <rect x="19" y="38" width="8" height="2" fill="#dc2626" />
          <rect x="20" y="36" width="6" height="2" fill="#dc2626" />
          <rect x="21" y="39" width="4" height="1" fill="#fff" />
          {/* hair */}
          <rect x="18" y="40" width="10" height="1" fill="#3b2410" />
          {/* face */}
          <rect x="20" y="41" width="6" height="3" fill="#fcd9b6" />
          <rect x="22" y="42" width="1" height="1" fill="#1a1a1a" />
          <rect x="24" y="42" width="1" height="1" fill="#1a1a1a" />
          <rect x="23" y="43" width="1" height="1" fill="#c2410c" />
          {/* neck */}
          <rect x="22" y="44" width="2" height="1" fill="#fcd9b6" />
          {/* body/vest */}
          <rect x="19" y="45" width="8" height="6" fill="#7C3AED" />
          <rect x="20" y="45" width="6" height="1" fill="#a855f7" />
          <rect x="22" y="47" width="2" height="2" fill="#fde047" />
          {/* arms */}
          <rect x="17" y="46" width="2" height="4" fill="#7C3AED" />
          <rect x="27" y="46" width="2" height="4" fill="#7C3AED" />
          <rect x="17" y="50" width="2" height="1" fill="#fcd9b6" />
          <rect x="27" y="50" width="2" height="1" fill="#fcd9b6" />
          {/* legs */}
          <rect x="19" y="51" width="3" height="4" fill="#1e3a8a" />
          <rect x="24" y="51" width="3" height="4" fill="#1e3a8a" />
          {/* shoes */}
          <rect x="18" y="55" width="4" height="2" fill="#111" />
          <rect x="24" y="55" width="4" height="2" fill="#111" />
        </g>

        {/* ---- EGG (cracking) ---- */}
        <g>
          {/* shadow */}
          <ellipse cx="42" cy="56" rx="6" ry="1.2" fill="#000" opacity="0.35" />
          {/* egg body */}
          <rect x="39" y="44" width="6" height="1" fill="#e9d5ff" />
          <rect x="38" y="45" width="8" height="2" fill="#e9d5ff" />
          <rect x="37" y="47" width="10" height="2" fill="#c084fc" />
          {/* crack */}
          <polygon
            points="37,49 39,50 40,49 41,50 43,49 44,50 46,49 47,49 47,50 37,50"
            fill="#7C3AED"
          />
          <rect x="39" y="50" width="1" height="1" fill="#fde047" />
          <rect x="43" y="50" width="1" height="1" fill="#fde047" />
          {/* bottom */}
          <rect x="37" y="50" width="10" height="4" fill="#c084fc" />
          <rect x="38" y="54" width="8" height="1" fill="#a855f7" />
          {/* highlight */}
          <rect x="39" y="46" width="1" height="2" fill="#fff" opacity="0.6" />
          {/* sparkles */}
          <rect x="35" y="42" width="1" height="1" fill="#fde047" />
          <rect x="48" y="44" width="1" height="1" fill="#fde047" />
          <rect x="44" y="40" width="1" height="1" fill="#fff" />
        </g>

        {/* Vignette pixel border shadow */}
        <rect x="0" y="0" width="64" height="1" fill="#000" opacity="0.2" />
        <rect x="0" y="63" width="64" height="1" fill="#000" opacity="0.25" />
      </svg>
    </div>
  );
}
