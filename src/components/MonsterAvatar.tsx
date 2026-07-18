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

function GladiadorBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      {/* flame crest */}
      <rect x="14" y="2" width="4" height="2" fill="#fde047" />
      <rect x="13" y="4" width="6" height="2" fill="#F97316" />
      <rect x="12" y="6" width="8" height="2" fill="#ea580c" />
      {/* head */}
      <rect x="10" y="8" width="12" height="10" fill="#F97316" />
      <rect x="9" y="10" width="1" height="6" fill="#F97316" />
      <rect x="22" y="10" width="1" height="6" fill="#F97316" />
      {/* eyes */}
      <rect x="12" y="12" width="2" height="2" fill="#fff" />
      <rect x="18" y="12" width="2" height="2" fill="#fff" />
      <rect x="13" y="13" width="1" height="1" fill="#1a1a1a" />
      <rect x="19" y="13" width="1" height="1" fill="#1a1a1a" />
      {/* fanged mouth */}
      <rect x="14" y="15" width="4" height="1" fill="#7c2d12" />
      <rect x="14" y="16" width="1" height="1" fill="#fff" />
      <rect x="17" y="16" width="1" height="1" fill="#fff" />
      {/* body */}
      <rect x="11" y="18" width="10" height="7" fill="#F97316" />
      <rect x="13" y="20" width="6" height="3" fill="#ea580c" />
      {/* arms + BLACK WRISTBANDS */}
      <rect x="8" y="19" width="3" height="4" fill="#F97316" />
      <rect x="21" y="19" width="3" height="4" fill="#F97316" />
      <rect x="8" y="22" width="3" height="2" fill="#111" />
      <rect x="21" y="22" width="3" height="2" fill="#111" />
      {/* feet */}
      <rect x="11" y="25" width="3" height="3" fill="#ea580c" />
      <rect x="18" y="25" width="3" height="3" fill="#ea580c" />
      {/* tail flame */}
      <rect x="24" y="18" width="2" height="2" fill="#fde047" />
    </svg>
  );
}

function BardoBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      {/* floating notes */}
      <rect x="3" y="6" width="1" height="4" fill="#A855F7" />
      <rect x="4" y="6" width="2" height="1" fill="#A855F7" />
      <rect x="3" y="10" width="2" height="1" fill="#A855F7" />
      <rect x="26" y="4" width="1" height="4" fill="#A855F7" />
      <rect x="27" y="4" width="2" height="1" fill="#A855F7" />
      <rect x="26" y="8" width="2" height="1" fill="#A855F7" />
      <rect x="28" y="14" width="1" height="3" fill="#A855F7" />
      <rect x="28" y="17" width="2" height="1" fill="#A855F7" />

      {/* bandana */}
      <rect x="10" y="6" width="12" height="2" fill="#6B21A8" />
      <rect x="8" y="6" width="2" height="3" fill="#6B21A8" />
      <rect x="13" y="8" width="2" height="1" fill="#F97316" />
      <rect x="17" y="8" width="2" height="1" fill="#F97316" />
      {/* head */}
      <rect x="10" y="8" width="12" height="10" fill="#A855F7" />
      <rect x="9" y="10" width="1" height="6" fill="#A855F7" />
      <rect x="22" y="10" width="1" height="6" fill="#A855F7" />
      {/* happy eyes (arcs) */}
      <rect x="12" y="12" width="1" height="1" fill="#1a1a1a" />
      <rect x="13" y="13" width="2" height="1" fill="#1a1a1a" />
      <rect x="15" y="12" width="1" height="1" fill="#1a1a1a" />
      <rect x="18" y="12" width="1" height="1" fill="#1a1a1a" />
      <rect x="19" y="13" width="2" height="1" fill="#1a1a1a" />
      <rect x="21" y="12" width="1" height="1" fill="#1a1a1a" />
      {/* smiling mouth */}
      <rect x="14" y="15" width="4" height="1" fill="#1a1a1a" />
      <rect x="13" y="16" width="1" height="1" fill="#1a1a1a" />
      <rect x="18" y="16" width="1" height="1" fill="#1a1a1a" />
      {/* cheeks */}
      <rect x="11" y="15" width="1" height="1" fill="#F97316" opacity="0.7" />
      <rect x="20" y="15" width="1" height="1" fill="#F97316" opacity="0.7" />
      {/* body */}
      <rect x="11" y="18" width="10" height="7" fill="#A855F7" />
      <rect x="13" y="20" width="6" height="3" fill="#C084FC" />
      {/* arms */}
      <rect x="8" y="20" width="3" height="3" fill="#A855F7" />
      <rect x="21" y="20" width="3" height="3" fill="#A855F7" />
      {/* feet */}
      <rect x="11" y="25" width="3" height="3" fill="#7E22CE" />
      <rect x="18" y="25" width="3" height="3" fill="#7E22CE" />
    </svg>
  );
}

function DruidaBaby({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
      {/* sprout on head */}
      <rect x="15" y="1" width="2" height="3" fill="#166534" />
      <rect x="13" y="3" width="2" height="2" fill="#22c55e" />
      <rect x="17" y="3" width="2" height="2" fill="#22c55e" />
      <rect x="14" y="5" width="4" height="1" fill="#166534" />
      {/* ears (leafy) */}
      <rect x="9" y="6" width="2" height="3" fill="#22c55e" />
      <rect x="21" y="6" width="2" height="3" fill="#22c55e" />
      {/* head */}
      <rect x="10" y="8" width="12" height="10" fill="#86efac" />
      <rect x="9" y="10" width="1" height="6" fill="#86efac" />
      <rect x="22" y="10" width="1" height="6" fill="#86efac" />
      {/* zen closed eyes */}
      <rect x="12" y="13" width="2" height="1" fill="#166534" />
      <rect x="18" y="13" width="2" height="1" fill="#166534" />
      {/* tiny mouth */}
      <rect x="15" y="15" width="2" height="1" fill="#166534" />
      {/* cheeks */}
      <rect x="11" y="14" width="1" height="1" fill="#22c55e" />
      <rect x="20" y="14" width="1" height="1" fill="#22c55e" />
      {/* body */}
      <rect x="11" y="18" width="10" height="7" fill="#86efac" />
      <rect x="13" y="20" width="6" height="3" fill="#bbf7d0" />
      {/* arms holding TEA CUP */}
      <rect x="8" y="20" width="3" height="3" fill="#86efac" />
      <rect x="21" y="20" width="3" height="3" fill="#86efac" />
      {/* cup */}
      <rect x="13" y="21" width="6" height="3" fill="#f5f5f4" />
      <rect x="14" y="24" width="4" height="1" fill="#a8a29e" />
      <rect x="19" y="22" width="1" height="1" fill="#f5f5f4" />
      {/* steam */}
      <rect x="14" y="19" width="1" height="1" fill="#fff" opacity="0.7" />
      <rect x="16" y="18" width="1" height="1" fill="#fff" opacity="0.7" />
      <rect x="17" y="19" width="1" height="1" fill="#fff" opacity="0.7" />
      {/* feet */}
      <rect x="11" y="25" width="3" height="3" fill="#4ade80" />
      <rect x="18" y="25" width="3" height="3" fill="#4ade80" />
    </svg>
  );
}
