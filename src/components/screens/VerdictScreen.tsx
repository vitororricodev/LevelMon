import { useEffect, useState } from "react";
import { CLASSES, type ClassId } from "@/lib/levelmon";
import { MonsterAvatar, EggAvatar, type MonsterStage } from "@/components/MonsterAvatar";
import { RpgBar } from "@/components/RpgBar";
import { BackHeader } from "@/components/BackHeader";
import { Sparkles } from "lucide-react";

interface Props {
  classId: ClassId;
  stage: MonsterStage;
  levelmonName: string;
  onBack: () => void;
  onContinue: () => void;
}

export function VerdictScreen({ classId, stage, levelmonName, onBack, onContinue }: Props) {
  const [phase, setPhase] = useState<"loading" | "hatching" | "revealed">("loading");
  const info = CLASSES[classId];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hatching"), 1200);
    const t2 = setTimeout(() => setPhase("revealed"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col h-full px-6 pb-8 items-center text-center">
      <div className="w-full">
        <BackHeader onBack={onBack} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {phase !== "revealed" ? (
          <>
            <EggAvatar classId={classId} hatching={phase === "hatching"} size={160} />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-primary animate-pulse">
                Sincronizando dados...
              </p>
              <p className="text-sm text-muted-foreground">Sua energia está sendo lida...</p>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center gap-4">
            <div className="animate-glow" style={{ color: `var(--${info.color})` }}>
              <MonsterAvatar classId={classId} stage={stage} size={160} />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>Sua classe é</span>
                <Sparkles className="w-3 h-3" />
              </div>
              <h1
                className="mt-2 text-3xl font-bold"
                style={{
                  color: `var(--${info.color})`,
                  fontFamily: "Orbitron, var(--font-display)",
                  letterSpacing: "0.03em",
                }}
              >
                {info.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                <b className="text-foreground">{levelmonName}</b> nasceu! Sua energia ressoa com{" "}
                <b>{info.name}</b>.
              </p>
            </div>

            <div className="w-full mt-2 rounded-2xl bg-card border border-border p-5 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Levelmon
                  </p>
                  <p className="text-lg font-bold">{levelmonName}</p>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-md font-bold"
                  style={{
                    background: `color-mix(in oklab, var(--${info.color}) 20%, transparent)`,
                    color: `var(--${info.color})`,
                  }}
                >
                  Lvl 1
                </span>
              </div>
              <div className="space-y-2 pt-1">
                {info.stats.map((s) => (
                  <RpgBar key={s.label} label={s.label} value={s.value} color={info.color} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {phase === "revealed" && (
        <button
          onClick={onContinue}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold pixel-shadow hover:brightness-110 transition animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          Ver minha trilha diária
        </button>
      )}
    </div>
  );
}
