import { useState } from "react";
import { CLASSES, getTier, TIER_META, type ClassId, type Tier } from "@/lib/levelmon";
import { BackHeader } from "@/components/BackHeader";
import { MonsterAvatar } from "@/components/MonsterAvatar";

interface Props {
  classId: ClassId;
  levelmonName: string;
  onBack: () => void;
  onDone: (index: number, tier: Tier) => void;
}

const CLASS_AREA: Record<ClassId, string> = {
  gladiador: "condicionamento físico",
  bardo: "interação social",
  druida: "leitura e detox digital",
};

export function ConditioningScreen({ classId, levelmonName, onBack, onDone }: Props) {
  const info = CLASSES[classId];
  const [index, setIndex] = useState(5);
  const tier = getTier(index);
  const meta = TIER_META[tier];

  const color = `var(--${info.color})`;

  return (
    <div className="flex flex-col h-full px-6 pb-8">
      <BackHeader onBack={onBack} title="Ajuste" />

      <div className="text-center mt-2">
        <p
          className="text-[10px] uppercase tracking-widest font-bold"
          style={{ color, fontFamily: "var(--font-display)" }}
        >
          Ajuste da Jornada
        </p>
        <h1 className="mt-2 text-xl font-bold">Qual seu nível atual?</h1>
        <p className="mt-1 text-xs text-muted-foreground px-2">
          Avalie seu nível atual em <b className="text-foreground">{CLASS_AREA[classId]}</b>{" "}
          para calibrar as missões de {levelmonName}.
        </p>
      </div>

      <div className="mt-6 flex justify-center" style={{ color }}>
        <MonsterAvatar classId={classId} size={92} />
      </div>

      {/* Big index number */}
      <div className="mt-4 text-center">
        <div
          className="inline-block px-6 py-2 rounded-xl border-2"
          style={{
            borderColor: color,
            background: `color-mix(in oklab, ${color} 12%, transparent)`,
            boxShadow: `0 0 24px color-mix(in oklab, ${color} 40%, transparent)`,
          }}
        >
          <span
            className="text-4xl font-bold tabular-nums"
            style={{ color, fontFamily: "var(--font-display)" }}
          >
            {index}
          </span>
          <span className="text-sm text-muted-foreground ml-1">/ 10</span>
        </div>
        <p className="mt-3 text-sm font-bold uppercase tracking-widest" style={{ color }}>
          Fluxo {meta.label} {meta.emoji}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Multiplicador de XP: <b className="text-foreground">×{meta.multiplier.toFixed(2)}</b>
        </p>
      </div>

      {/* Pixel-art slider */}
      <div className="mt-6 px-1">
        <div className="relative h-8 rounded-md border-2 border-border bg-secondary/50 overflow-hidden pixel-shadow">
          <div
            className="absolute inset-y-0 left-0 transition-all"
            style={{
              width: `${(index / 10) * 100}%`,
              background: `linear-gradient(90deg, var(--druida), var(--bardo), var(--gladiador))`,
            }}
          />
          <div className="absolute inset-0 flex">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-black/40 last:border-r-0" />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-label="Índice de condicionamento"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
          <span>0 Novato</span>
          <span>5 Médio</span>
          <span>10 Hardcore</span>
        </div>
      </div>

      {/* Tier legend */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider font-bold">
        {(["leve", "moderado", "alto"] as Tier[]).map((t) => {
          const active = t === tier;
          const m = TIER_META[t];
          return (
            <div
              key={t}
              className="p-2 rounded-lg border-2 transition"
              style={{
                borderColor: active ? color : "var(--border)",
                background: active
                  ? `color-mix(in oklab, ${color} 15%, transparent)`
                  : "transparent",
                color: active ? color : "var(--muted-foreground)",
              }}
            >
              <div>{m.emoji}</div>
              <div className="mt-0.5">{m.label}</div>
              <div className="text-[8px] opacity-70 mt-0.5">
                {t === "leve" && "0-3"}
                {t === "moderado" && "4-7"}
                {t === "alto" && "8-10"}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onDone(index, tier)}
        className="mt-6 w-full h-14 rounded-xl font-bold text-base pixel-shadow hover:brightness-110 transition"
        style={{
          background: `linear-gradient(135deg, var(--primary), ${color})`,
          color: "white",
        }}
      >
        Calibrar Jornada
      </button>
    </div>
  );
}
