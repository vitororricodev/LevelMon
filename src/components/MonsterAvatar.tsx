import type { ClassId } from "@/lib/levelmon";
import { Flame, HeartPulse, Shield, Zap, type LucideIcon } from "lucide-react";

export type MonsterStage = "baby" | "teen" | "adult";

const GLADIADOR_ART: Record<MonsterStage, string> = {
  baby: "/gladiador-baby.gif",
  teen: "/gladiador-teen.gif",
  adult: "/gladiador-adult.gif",
};

/** Monster art per class and evolution stage. */
export function MonsterAvatar({
  classId,
  size = 128,
  stage = "baby",
  floating = true,
  glow = true,
}: {
  classId: ClassId;
  size?: number;
  stage?: MonsterStage;
  floating?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative ${floating ? "animate-float" : ""}`}
      style={{
        width: size,
        height: size,
        filter: glow ? `drop-shadow(0 8px 20px var(--${classId}))` : undefined,
      }}
    >
      <img
        src={GLADIADOR_ART[stage]}
        alt={`Gladiador ${stage}`}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

interface MonsterProfileHeroProps {
  classId: ClassId;
  stage?: MonsterStage;
  name: string;
  className: string;
  level: number;
  xp: number;
  xpMax?: number;
  stats: { label: string; value: number }[];
}

const ATTRIBUTE_STYLES: { Icon: LucideIcon; color: string }[] = [
  { Icon: Flame, color: "#f58a1f" },
  { Icon: Shield, color: "#e84d6a" },
  { Icon: HeartPulse, color: "#65bd48" },
  { Icon: Zap, color: "#45aee4" },
];

/** Profile hero inspired by the character-card reference. */
export function MonsterProfileHero({
  classId,
  stage = "baby",
  name,
  className,
  level,
  xp,
  xpMax = 100,
  stats,
}: MonsterProfileHeroProps) {
  const xpPct = Math.min(100, Math.max(0, (xp / xpMax) * 100));

  return (
    <section className="overflow-hidden border-b border-border bg-card">
      <div className="relative bg-[#faefde] px-5 pb-3 pt-5 text-[#241b16]">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#7a6254]">
              Personagem
            </p>
            <h1 className="mt-1 max-w-[220px] truncate text-xl font-black">{name}</h1>
          </div>
          <div className="rounded-xl border border-[#d8c3aa] bg-[#fff8ed]/90 px-3 py-2 text-right shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b6d5c]">Nível</p>
            <p className="text-lg font-black leading-none">{level}</p>
          </div>
        </div>

        <div className="relative z-0 flex min-h-[215px] items-center justify-center">
          <MonsterAvatar classId={classId} stage={stage} size={225} floating={false} glow={false} />
        </div>

        <div className="relative z-10 -mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6d5c]">Classe</p>
            <p className="text-sm font-black uppercase tracking-wide">{className}</p>
          </div>
          <div className="w-36">
            <div className="mb-1 flex justify-between text-[9px] font-bold uppercase text-[#7a6254]">
              <span>XP</span>
              <span>
                {xp}/{xpMax}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#d8c7b3]">
              <div
                className="h-full rounded-full bg-[#f58a1f] transition-[width] duration-700"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        {stats.slice(0, 4).map((stat, index) => {
          const style = ATTRIBUTE_STYLES[index % ATTRIBUTE_STYLES.length];
          const Icon = style.Icon;

          return (
            <div
              key={stat.label}
              className="grid grid-cols-[20px_92px_1fr_26px] items-center gap-2"
            >
              <Icon className="h-4 w-4" style={{ color: style.color }} strokeWidth={2.75} />
              <span className="truncate text-[10px] font-bold uppercase tracking-wide text-card-foreground">
                {stat.label}
              </span>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${stat.value}%`, backgroundColor: style.color }}
                />
              </div>
              <span className="text-right text-xs font-black text-card-foreground">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
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
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 24px var(--${classId ?? "primary"}))`,
      }}
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
