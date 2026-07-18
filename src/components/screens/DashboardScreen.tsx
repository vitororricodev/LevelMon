import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CLASSES, getMissions, TIER_META, CLASS_TIER_EMOJI, type ClassId, type Tier } from "@/lib/levelmon";
import { MonsterAvatar } from "@/components/MonsterAvatar";
import { RpgBar } from "@/components/RpgBar";
import { DailyCheckInModal } from "@/components/DailyCheckInModal";
import { Check, Flame, Home, ListChecks, Globe2, User, X, PartyPopper, Zap } from "lucide-react";

interface Props {
  classId: ClassId;
  levelmonName: string;
  tier: Tier;
  conditioningIndex: number;
  onReset: () => void;
}

const BASE_XP_PER_MISSION = 33;
const XP_MAX = 100;

export function DashboardScreen({ classId, levelmonName, tier, conditioningIndex, onReset }: Props) {
  const info = CLASSES[classId];
  const missions = getMissions(classId, tier);
  const tierMeta = TIER_META[tier];
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [showDaily, setShowDaily] = useState(true);
  const [buffActive, setBuffActive] = useState(false);


  const tierXp = Math.round(BASE_XP_PER_MISSION * tierMeta.multiplier);
  const xpPerMission = buffActive ? Math.round(tierXp * 1.2) : tierXp;


  function toggle(i: number) {
    if (checked[i]) return;
    const next = [...checked];
    next[i] = true;
    setChecked(next);
    setXp((prev) => Math.min(XP_MAX, prev + xpPerMission));
    setPulse(true);
    setTimeout(() => setPulse(false), 800);
    toast.success(`+${xpPerMission} XP — ${missions[i].title}`);
  }


  useEffect(() => {
    if (checked.every(Boolean)) {
      const t = setTimeout(() => {
        setLevel((l) => l + 1);
        setXp(0);
        setShowLevelUp(true);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [checked]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0" style={{ color: `var(--${info.color})` }}>
            <MonsterAvatar classId={classId} size={72} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {info.name}
                </p>
                <h2 className="text-lg font-bold truncate">{levelmonName}</h2>
              </div>
              <div
                className="text-xs px-2.5 py-1 rounded-md font-bold shrink-0"
                style={{
                  background: `color-mix(in oklab, var(--${info.color}) 20%, transparent)`,
                  color: `var(--${info.color})`,
                }}
              >
                Lvl {level}
              </div>
            </div>
            <div className={`mt-2 ${pulse ? "animate-glow" : ""}`} style={{ color: "var(--xp)" }}>
              <RpgBar value={xp} max={XP_MAX} color="xp" showValue label="XP" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold">Sequência: 1 dia</span>
          </div>
          {buffActive && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary animate-in fade-in zoom-in-95 duration-300">
              <Zap className="w-3.5 h-3.5" />
              <span className="font-bold">Buff de Login Ativo ⚡</span>
            </div>
          )}
          <button
            onClick={onReset}
            className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            reiniciar
          </button>
        </div>
      </div>

      {/* Missions */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider">Missões de Hoje</h3>
          <span className="text-xs text-muted-foreground">
            {checked.filter(Boolean).length}/3
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {missions.map((m, i) => (
            <button
              key={m.title}
              onClick={() => toggle(i)}
              disabled={checked[i]}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition ${
                checked[i]
                  ? "bg-card/40 border-border/60 opacity-70"
                  : "bg-card border-border hover:border-primary hover:neon-border"
              }`}
            >
              <div
                className="shrink-0 mt-0.5 w-6 h-6 rounded-md border-2 grid place-items-center transition"
                style={{
                  borderColor: checked[i] ? `var(--${info.color})` : "var(--border)",
                  background: checked[i] ? `var(--${info.color})` : "transparent",
                }}
              >
                {checked[i] && <Check className="w-4 h-4 text-black" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${checked[i] ? "line-through" : ""}`}>
                  {m.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
              </div>
              <span
                className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: `color-mix(in oklab, var(--xp) 20%, transparent)`,
                  color: `var(--xp)`,
                }}
              >
                +{xpPerMission} XP
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-card/60 border border-dashed border-border">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Atributos do Levelmon
          </p>
          <div className="space-y-2">
            {info.stats.slice(0, 3).map((s) => (
              <RpgBar key={s.label} label={s.label} value={s.value} color={info.color} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-4 h-16">
          {[
            { Icon: Home, label: "Início", active: true },
            { Icon: ListChecks, label: "Missões" },
            { Icon: Globe2, label: "Mundo" },
            { Icon: User, label: "Perfil" },
          ].map(({ Icon, label, active }) => (
            <button
              key={label}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Level up modal */}
      {showLevelUp && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black/70 backdrop-blur-sm p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-3xl bg-card border-2 border-primary neon-border p-6 text-center relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowLevelUp(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex justify-center mb-2 text-primary">
              <PartyPopper className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>
              LEVEL UP!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {levelmonName} evoluiu para <b className="text-foreground">Lvl {level}</b>.
              <br />Seu monstro ganhou poder!
            </p>
            <div className="mt-4 flex justify-center" style={{ color: `var(--${info.color})` }}>
              <MonsterAvatar classId={classId} size={110} />
            </div>
            <button
              onClick={() => setShowLevelUp(false)}
              className="mt-5 w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition"
            >
              Continuar a aventura
            </button>
          </div>
        </div>
      )}

      {showDaily && (
        <DailyCheckInModal
          currentDay={1}
          onClose={() => setShowDaily(false)}
          onCollect={() => {
            setBuffActive(true);
            setShowDaily(false);
            toast.success("BUFF de +20% XP ativado! ⚡");
          }}
        />
      )}
    </div>
  );
}

