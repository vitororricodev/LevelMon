import type { ClassId } from "@/lib/levelmon";

/** Pixel-art-ish CSS monster silhouettes tinted per class. */
export function MonsterAvatar({ classId, size = 128 }: { classId: ClassId; size?: number }) {
  const palette: Record<ClassId, { body: string; accent: string; eye: string }> = {
    gladiador: { body: "var(--gladiador)", accent: "var(--gladiador-glow)", eye: "#1a1a1a" },
    bardo: { body: "var(--bardo)", accent: "var(--bardo-glow)", eye: "#1a1a1a" },
    druida: { body: "var(--druida)", accent: "var(--druida-glow)", eye: "#1a1a1a" },
  };
  const p = palette[classId];
  return (
    <div
      className="relative animate-float"
      style={{ width: size, height: size, color: p.body, filter: "drop-shadow(0 8px 20px currentColor)" }}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
        {/* head */}
        <rect x="10" y="8" width="12" height="10" fill={p.body} />
        <rect x="9" y="10" width="1" height="6" fill={p.body} />
        <rect x="22" y="10" width="1" height="6" fill={p.body} />
        {/* ears / flame / leaf tips */}
        <rect x="10" y="5" width="3" height="3" fill={p.accent} />
        <rect x="19" y="5" width="3" height="3" fill={p.accent} />
        <rect x="11" y="3" width="2" height="2" fill={p.accent} />
        <rect x="19" y="3" width="2" height="2" fill={p.accent} />
        {/* eyes */}
        <rect x="12" y="12" width="2" height="2" fill="#fff" />
        <rect x="18" y="12" width="2" height="2" fill="#fff" />
        <rect x="13" y="13" width="1" height="1" fill={p.eye} />
        <rect x="19" y="13" width="1" height="1" fill={p.eye} />
        {/* cheek */}
        <rect x="11" y="15" width="1" height="1" fill={p.accent} />
        <rect x="20" y="15" width="1" height="1" fill={p.accent} />
        {/* body */}
        <rect x="11" y="18" width="10" height="8" fill={p.body} />
        <rect x="12" y="20" width="8" height="4" fill={p.accent} opacity="0.5" />
        {/* feet */}
        <rect x="11" y="26" width="3" height="2" fill={p.body} />
        <rect x="18" y="26" width="3" height="2" fill={p.body} />
        {/* tail */}
        <rect x="22" y="20" width="2" height="2" fill={p.accent} />
        <rect x="24" y="18" width="2" height="2" fill={p.accent} />
      </svg>
    </div>
  );
}

export function EggAvatar({ classId, size = 128, hatching = false }: { classId: ClassId | null; size?: number; hatching?: boolean }) {
  const palette: Record<string, { body: string; accent: string }> = {
    gladiador: { body: "var(--gladiador)", accent: "#2a1408" },
    bardo: { body: "var(--bardo)", accent: "#2a0a2a" },
    druida: { body: "var(--druida)", accent: "#0f2416" },
    default: { body: "var(--muted)", accent: "#1a1a20" },
  };
  const p = palette[classId ?? "default"];
  return (
    <div
      className={hatching ? "animate-egg" : ""}
      style={{ width: size, height: size, filter: `drop-shadow(0 0 24px ${p.body})` }}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
        <rect x="12" y="4" width="8" height="2" fill={p.body} />
        <rect x="10" y="6" width="12" height="2" fill={p.body} />
        <rect x="8" y="8" width="16" height="4" fill={p.body} />
        <rect x="7" y="12" width="18" height="10" fill={p.body} />
        <rect x="8" y="22" width="16" height="4" fill={p.body} />
        <rect x="10" y="26" width="12" height="2" fill={p.body} />
        {/* pattern */}
        <rect x="12" y="10" width="2" height="2" fill={p.accent} />
        <rect x="18" y="12" width="2" height="2" fill={p.accent} />
        <rect x="14" y="14" width="4" height="2" fill={p.accent} />
        <rect x="10" y="16" width="2" height="2" fill={p.accent} />
        <rect x="20" y="16" width="2" height="2" fill={p.accent} />
        <rect x="14" y="18" width="4" height="2" fill={p.accent} />
        <rect x="12" y="20" width="2" height="2" fill={p.accent} />
        <rect x="18" y="22" width="2" height="2" fill={p.accent} />
      </svg>
    </div>
  );
}
