import { Sparkles } from "lucide-react";

interface Props {
  size?: "sm" | "lg";
}

/** LevelMon wordmark with cracking-egg glyph. */
export function Logo({ size = "lg" }: Props) {
  const textClass = size === "lg" ? "text-5xl" : "text-3xl";
  const eggSize = size === "lg" ? 56 : 36;
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="relative" style={{ width: eggSize, height: eggSize }}>
        {/* sparkles */}
        <Sparkles
          className="absolute -top-1 -left-2 text-primary animate-pulse"
          style={{ width: 12, height: 12 }}
        />
        <Sparkles
          className="absolute top-0 -right-2 text-orange-400 animate-pulse"
          style={{ width: 10, height: 10, animationDelay: "300ms" }}
        />
        <Sparkles
          className="absolute -bottom-1 left-1 text-primary/80 animate-pulse"
          style={{ width: 9, height: 9, animationDelay: "600ms" }}
        />
        <svg viewBox="0 0 32 32" width={eggSize} height={eggSize} shapeRendering="crispEdges">
          <defs>
            <linearGradient id="egg-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          {/* egg body (top) */}
          <rect x="12" y="3" width="8" height="2" fill="url(#egg-grad)" />
          <rect x="10" y="5" width="12" height="2" fill="url(#egg-grad)" />
          <rect x="9" y="7" width="14" height="4" fill="url(#egg-grad)" />
          {/* crack zig-zag (gap) */}
          <rect x="9" y="11" width="3" height="1" fill="url(#egg-grad)" />
          <rect x="13" y="11" width="2" height="1" fill="url(#egg-grad)" />
          <rect x="16" y="11" width="3" height="1" fill="url(#egg-grad)" />
          <rect x="20" y="11" width="3" height="1" fill="url(#egg-grad)" />
          {/* glow line */}
          <rect x="12" y="12" width="1" height="1" fill="#fde68a" />
          <rect x="15" y="12" width="1" height="1" fill="#fde68a" />
          <rect x="19" y="12" width="1" height="1" fill="#fde68a" />
          {/* egg body (bottom) */}
          <rect x="9" y="13" width="14" height="6" fill="url(#egg-grad)" />
          <rect x="10" y="19" width="12" height="3" fill="url(#egg-grad)" />
          <rect x="12" y="22" width="8" height="2" fill="url(#egg-grad)" />
          {/* highlight */}
          <rect x="11" y="14" width="2" height="2" fill="#fff" opacity="0.35" />
        </svg>
      </div>
      <h1
        className={`${textClass} font-black tracking-tight leading-none`}
        style={{
          fontFamily: "Orbitron, var(--font-display)",
          background: "linear-gradient(90deg, #7C3AED 0%, #A855F7 45%, #F97316 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 12px rgba(124,58,237,0.45))",
          letterSpacing: "0.04em",
        }}
      >
        LEVELMON
      </h1>
    </div>
  );
}
