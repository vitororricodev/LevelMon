import type { ClassId } from "@/lib/levelmon";

/** Baby-monster art per class (stage 2). */
export function MonsterAvatar({ classId, size = 128 }: { classId: ClassId; size?: number }) {
  return (
    <div
      className="relative animate-float"
      style={{ width: size, height: size, filter: `drop-shadow(0 8px 20px var(--${classId}))` }}
    >
      {classId === "gladiador" && <GladiadorBaby size={size} />}
      {classId === "bardo" && <BardoBaby size={size} />}
      {classId === "druida" && <DruidaBaby size={size} />}
    </div>
  );
}

/** Egg art per class (stage 1). */
export function EggAvatar({
  classId,
  size = 128,
  hatching = false,
}: {
  classId: ClassId | null;
  size?: number;
  hatching?: boolean;
}) {
  return (
    <div
      className={hatching ? "animate-egg" : ""}
      style={{ width: size, height: size, filter: `drop-shadow(0 0 24px var(--${classId ?? "primary"}))` }}
    >
      {classId === "gladiador" && <GladiadorEgg size={size} />}
      {classId === "bardo" && <BardoEgg size={size} />}
      {classId === "druida" && <DruidaEgg size={size} />}
      {!classId && <MysteryEgg size={size} />}
    </div>
  );
}

/* ------------------------------- EGGS -------------------------------- */

function EggShell({ children, base }: { children?: React.ReactNode; base: string }) {
  return (
    <>
      {/* silhouette */}
      <rect x="12" y="4" width="8" height="2" fill={base} />
      <rect x="10" y="6" width="12" height="2" fill={base} />
      <rect x="8" y="8" width="16" height="4" fill={base} />
      <rect x="7" y="12" width="18" height="10" fill={base} />
      <rect x="8" y="22" width="16" height="4" fill={base} />
      <rect x="10" y="26" width="12" height="2" fill={base} />
      {/* subtle highlight */}
      <rect x="10" y="10" width="2" height="4" fill="#ffffff" opacity="0.18" />
      {children}
    </>
  );
}

function GladiadorEgg({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      <EggShell base="#F97316">
        {/* flame patterns */}
        <rect x="12" y="10" width="2" height="2" fill="#7c2d12" />
        <rect x="13" y="12" width="2" height="1" fill="#7c2d12" />
        <rect x="18" y="12" width="2" height="2" fill="#7c2d12" />
        <rect x="19" y="14" width="1" height="1" fill="#7c2d12" />
        <rect x="11" y="16" width="2" height="3" fill="#b91c1c" />
        <rect x="12" y="19" width="1" height="1" fill="#b91c1c" />
        <rect x="14" y="18" width="1" height="2" fill="#fde047" />
        <rect x="19" y="17" width="2" height="3" fill="#b91c1c" />
        <rect x="20" y="20" width="1" height="1" fill="#b91c1c" />
        <rect x="16" y="22" width="2" height="2" fill="#fde047" />
      </EggShell>
    </svg>
  );
}

function BardoEgg({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      <EggShell base="#E9D5FF">
        {/* musical note (purple) */}
        <rect x="18" y="10" width="1" height="8" fill="#6B21A8" />
        <rect x="19" y="10" width="3" height="1" fill="#6B21A8" />
        <rect x="21" y="11" width="1" height="3" fill="#6B21A8" />
        <rect x="15" y="17" width="4" height="2" fill="#6B21A8" />
        <rect x="14" y="18" width="1" height="1" fill="#6B21A8" />
        {/* tiny dots */}
        <rect x="10" y="14" width="1" height="1" fill="#A855F7" />
        <rect x="12" y="20" width="1" height="1" fill="#A855F7" />
      </EggShell>
    </svg>
  );
}

function DruidaEgg({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      <EggShell base="#BBF7D0">
        {/* two leaves */}
        <rect x="11" y="12" width="2" height="1" fill="#166534" />
        <rect x="10" y="13" width="4" height="2" fill="#166534" />
        <rect x="11" y="15" width="3" height="1" fill="#166534" />
        <rect x="12" y="16" width="1" height="1" fill="#166534" />
        <rect x="13" y="14" width="1" height="1" fill="#22c55e" />

        <rect x="19" y="16" width="2" height="1" fill="#166534" />
        <rect x="18" y="17" width="4" height="2" fill="#166534" />
        <rect x="19" y="19" width="3" height="1" fill="#166534" />
        <rect x="20" y="20" width="1" height="1" fill="#166534" />
        <rect x="20" y="18" width="1" height="1" fill="#22c55e" />
      </EggShell>
    </svg>
  );
}

function MysteryEgg({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      <EggShell base="#3f3f46" />
    </svg>
  );
}

/* ------------------------------- BABIES -------------------------------- */

/* ------- HUMANOID BATTLE SPRITES (GBA / Pokémon FireRed style) ------- */

function GladiadorBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} shapeRendering="crispEdges">
      {/* flame crest / horns */}
      <rect x="13" y="1" width="2" height="2" fill="#fde047" />
      <rect x="17" y="1" width="2" height="2" fill="#fde047" />
      <rect x="12" y="3" width="8" height="2" fill="#F97316" />
      {/* head — humanoid skin with fiery tone */}
      <rect x="11" y="5" width="10" height="7" fill="#fbbf24" />
      <rect x="10" y="6" width="1" height="5" fill="#fbbf24" />
      <rect x="21" y="6" width="1" height="5" fill="#fbbf24" />
      {/* pointed ears */}
      <rect x="9" y="7" width="1" height="2" fill="#F97316" />
      <rect x="22" y="7" width="1" height="2" fill="#F97316" />
      {/* war paint stripes */}
      <rect x="12" y="8" width="2" height="1" fill="#b91c1c" />
      <rect x="18" y="8" width="2" height="1" fill="#b91c1c" />
      {/* fierce eyes */}
      <rect x="13" y="9" width="1" height="1" fill="#fff" />
      <rect x="18" y="9" width="1" height="1" fill="#fff" />
      <rect x="14" y="9" width="1" height="1" fill="#111" />
      <rect x="19" y="9" width="1" height="1" fill="#111" />
      {/* fanged mouth */}
      <rect x="14" y="11" width="4" height="1" fill="#7c2d12" />
      <rect x="14" y="12" width="1" height="1" fill="#fff" />
      <rect x="17" y="12" width="1" height="1" fill="#fff" />
      {/* neck */}
      <rect x="14" y="12" width="4" height="1" fill="#fbbf24" />
      {/* shoulder pads */}
      <rect x="9" y="13" width="4" height="2" fill="#7c2d12" />
      <rect x="19" y="13" width="4" height="2" fill="#7c2d12" />
      <rect x="10" y="13" width="1" height="1" fill="#fde047" />
      <rect x="21" y="13" width="1" height="1" fill="#fde047" />
      {/* torso (armored gladiator vest) */}
      <rect x="11" y="14" width="10" height="8" fill="#dc2626" />
      <rect x="11" y="14" width="10" height="1" fill="#F97316" />
      <rect x="15" y="16" width="2" height="4" fill="#fde047" />
      <rect x="14" y="17" width="4" height="1" fill="#fde047" />
      {/* combat belt */}
      <rect x="11" y="22" width="10" height="2" fill="#111" />
      <rect x="15" y="22" width="2" height="2" fill="#fbbf24" />
      {/* arms in battle stance (fists up) */}
      <rect x="8" y="14" width="2" height="4" fill="#fbbf24" />
      <rect x="22" y="14" width="2" height="4" fill="#fbbf24" />
      {/* black wristbands */}
      <rect x="8" y="18" width="2" height="2" fill="#111" />
      <rect x="22" y="18" width="2" height="2" fill="#111" />
      {/* fists (fire wrap) */}
      <rect x="7" y="20" width="3" height="2" fill="#F97316" />
      <rect x="22" y="20" width="3" height="2" fill="#F97316" />
      <rect x="7" y="19" width="1" height="1" fill="#fde047" />
      <rect x="24" y="19" width="1" height="1" fill="#fde047" />
      {/* legs (battle pants) */}
      <rect x="11" y="24" width="4" height="7" fill="#7c2d12" />
      <rect x="17" y="24" width="4" height="7" fill="#7c2d12" />
      <rect x="12" y="26" width="2" height="1" fill="#b91c1c" />
      <rect x="18" y="26" width="2" height="1" fill="#b91c1c" />
      {/* boots */}
      <rect x="10" y="31" width="6" height="3" fill="#111" />
      <rect x="16" y="31" width="6" height="3" fill="#111" />
      <rect x="10" y="34" width="6" height="1" fill="#3f3f46" />
      <rect x="16" y="34" width="6" height="1" fill="#3f3f46" />
      {/* fire tail behind */}
      <rect x="24" y="22" width="2" height="2" fill="#F97316" />
      <rect x="26" y="20" width="2" height="2" fill="#fde047" />
      <rect x="25" y="24" width="2" height="2" fill="#dc2626" />
      {/* ground shadow */}
      <ellipse cx="16" cy="36" rx="9" ry="1.4" fill="#000" opacity="0.35" />
    </svg>
  );
}

function BardoBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} shapeRendering="crispEdges">
      {/* floating notes */}
      <rect x="2" y="6" width="1" height="4" fill="#fde047" />
      <rect x="3" y="6" width="2" height="1" fill="#fde047" />
      <rect x="27" y="4" width="1" height="4" fill="#A855F7" />
      <rect x="28" y="4" width="2" height="1" fill="#A855F7" />
      <rect x="29" y="14" width="1" height="3" fill="#fde047" />
      {/* headphones (top band) */}
      <rect x="11" y="4" width="10" height="1" fill="#4c1d95" />
      <rect x="9" y="5" width="2" height="4" fill="#fde047" />
      <rect x="21" y="5" width="2" height="4" fill="#fde047" />
      {/* bandana */}
      <rect x="11" y="5" width="10" height="2" fill="#7C3AED" />
      <rect x="12" y="7" width="2" height="1" fill="#fde047" />
      <rect x="16" y="7" width="2" height="1" fill="#fde047" />
      {/* head */}
      <rect x="11" y="7" width="10" height="6" fill="#c084fc" />
      <rect x="10" y="8" width="1" height="4" fill="#c084fc" />
      <rect x="21" y="8" width="1" height="4" fill="#c084fc" />
      {/* pointy ears */}
      <rect x="9" y="8" width="1" height="2" fill="#A855F7" />
      <rect x="22" y="8" width="1" height="2" fill="#A855F7" />
      {/* eyes (confident wink) */}
      <rect x="13" y="9" width="2" height="1" fill="#111" />
      <rect x="18" y="9" width="1" height="1" fill="#fde047" />
      <rect x="19" y="9" width="1" height="1" fill="#111" />
      {/* smile */}
      <rect x="14" y="11" width="4" height="1" fill="#111" />
      <rect x="13" y="12" width="1" height="1" fill="#111" />
      <rect x="18" y="12" width="1" height="1" fill="#111" />
      {/* cheeks */}
      <rect x="11" y="11" width="1" height="1" fill="#F97316" opacity="0.8" />
      <rect x="20" y="11" width="1" height="1" fill="#F97316" opacity="0.8" />
      {/* neck */}
      <rect x="14" y="13" width="4" height="1" fill="#c084fc" />
      {/* torso — bard vest with lightning bolt */}
      <rect x="11" y="14" width="10" height="8" fill="#7C3AED" />
      <rect x="11" y="14" width="10" height="1" fill="#A855F7" />
      {/* yellow lightning bolt */}
      <polygon points="17,15 14,19 16,19 15,22 19,17 17,17" fill="#fde047" />
      {/* belt */}
      <rect x="11" y="22" width="10" height="2" fill="#4c1d95" />
      <rect x="15" y="22" width="2" height="2" fill="#fde047" />
      {/* arm holding lyre / mic */}
      <rect x="8" y="15" width="2" height="4" fill="#c084fc" />
      <rect x="6" y="18" width="3" height="3" fill="#fde047" />
      <rect x="7" y="19" width="1" height="1" fill="#111" />
      {/* other arm raised — spark in hand */}
      <rect x="22" y="13" width="2" height="4" fill="#c084fc" />
      <rect x="23" y="10" width="2" height="3" fill="#fde047" />
      <rect x="24" y="8" width="1" height="2" fill="#A855F7" />
      {/* legs */}
      <rect x="11" y="24" width="4" height="7" fill="#4c1d95" />
      <rect x="17" y="24" width="4" height="7" fill="#4c1d95" />
      <rect x="12" y="27" width="2" height="1" fill="#fde047" />
      <rect x="18" y="27" width="2" height="1" fill="#fde047" />
      {/* boots */}
      <rect x="10" y="31" width="6" height="3" fill="#111" />
      <rect x="16" y="31" width="6" height="3" fill="#111" />
      <rect x="10" y="34" width="6" height="1" fill="#7C3AED" />
      <rect x="16" y="34" width="6" height="1" fill="#7C3AED" />
      {/* shadow */}
      <ellipse cx="16" cy="36" rx="9" ry="1.4" fill="#000" opacity="0.35" />
    </svg>
  );
}

function DruidaBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} shapeRendering="crispEdges">
      {/* hood of leaves */}
      <rect x="15" y="1" width="2" height="2" fill="#166534" />
      <rect x="13" y="2" width="6" height="2" fill="#22c55e" />
      <rect x="11" y="4" width="10" height="2" fill="#166534" />
      <rect x="10" y="6" width="12" height="2" fill="#166534" />
      <rect x="12" y="8" width="1" height="1" fill="#22c55e" />
      <rect x="19" y="8" width="1" height="1" fill="#22c55e" />
      {/* pointy elf ears */}
      <rect x="9" y="9" width="1" height="3" fill="#86efac" />
      <rect x="22" y="9" width="1" height="3" fill="#86efac" />
      <rect x="8" y="10" width="1" height="1" fill="#86efac" />
      <rect x="23" y="10" width="1" height="1" fill="#86efac" />
      {/* face */}
      <rect x="11" y="8" width="10" height="5" fill="#bbf7d0" />
      {/* face marks */}
      <rect x="12" y="11" width="1" height="1" fill="#166534" />
      <rect x="19" y="11" width="1" height="1" fill="#166534" />
      {/* zen closed eyes */}
      <rect x="13" y="10" width="2" height="1" fill="#166534" />
      <rect x="17" y="10" width="2" height="1" fill="#166534" />
      {/* smile */}
      <rect x="14" y="12" width="4" height="1" fill="#166534" />
      {/* neck */}
      <rect x="14" y="13" width="4" height="1" fill="#bbf7d0" />
      {/* leaf cloak (shoulders) */}
      <rect x="8" y="14" width="16" height="2" fill="#166534" />
      <rect x="7" y="15" width="18" height="2" fill="#14532d" />
      {/* torso (druid robe) */}
      <rect x="11" y="16" width="10" height="6" fill="#22c55e" />
      <rect x="11" y="16" width="10" height="1" fill="#4ade80" />
      {/* rune on chest */}
      <rect x="15" y="18" width="2" height="1" fill="#fde047" />
      <rect x="15" y="20" width="2" height="1" fill="#fde047" />
      <rect x="14" y="19" width="4" height="1" fill="#fde047" />
      {/* belt (vine) */}
      <rect x="11" y="22" width="10" height="1" fill="#166534" />
      {/* arms */}
      <rect x="8" y="16" width="2" height="5" fill="#bbf7d0" />
      <rect x="22" y="15" width="2" height="7" fill="#bbf7d0" />
      {/* wooden staff (living branch) */}
      <rect x="24" y="4" width="2" height="18" fill="#5a3220" />
      <rect x="23" y="4" width="1" height="1" fill="#5a3220" />
      <rect x="26" y="6" width="1" height="1" fill="#5a3220" />
      {/* leafy top of staff */}
      <rect x="22" y="2" width="6" height="2" fill="#22c55e" />
      <rect x="23" y="0" width="4" height="2" fill="#166534" />
      <rect x="24" y="1" width="2" height="1" fill="#fde047" />
      {/* skirt of leaves */}
      <rect x="10" y="23" width="12" height="2" fill="#166534" />
      <rect x="9" y="23" width="1" height="2" fill="#166534" />
      <rect x="22" y="23" width="1" height="2" fill="#166534" />
      {/* legs */}
      <rect x="11" y="25" width="4" height="6" fill="#4ade80" />
      <rect x="17" y="25" width="4" height="6" fill="#4ade80" />
      {/* sandals */}
      <rect x="10" y="31" width="6" height="2" fill="#5a3220" />
      <rect x="16" y="31" width="6" height="2" fill="#5a3220" />
      <rect x="10" y="33" width="6" height="1" fill="#3b2410" />
      <rect x="16" y="33" width="6" height="1" fill="#3b2410" />
      {/* floating leaves */}
      <rect x="4" y="10" width="1" height="1" fill="#22c55e" />
      <rect x="5" y="16" width="1" height="1" fill="#4ade80" />
      <rect x="3" y="22" width="1" height="1" fill="#22c55e" />
      {/* shadow */}
      <ellipse cx="16" cy="35" rx="9" ry="1.4" fill="#000" opacity="0.35" />
    </svg>
  );
}
