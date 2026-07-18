import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CLASSES,
  getEvolutionStage,
  getMissions,
  TIER_META,
  type ClassId,
  type Tier,
} from "@/lib/levelmon";
import { MonsterAvatar, MonsterProfileHero, type MonsterStage } from "@/components/MonsterAvatar";
import { DailyCheckInModal } from "@/components/DailyCheckInModal";
import {
  Check,
  Flame,
  Home,
  ListChecks,
  Globe2,
  User,
  X,
  PartyPopper,
  Zap,
  Coins,
} from "lucide-react";

interface Props {
  classId: ClassId;
  stage: MonsterStage;
  levelmonName: string;
  tier: Tier;
  conditioningIndex: number;
  onReset: () => void;
}

const XP_MAX = 100;
const INITIAL_XP_BY_STAGE: Record<MonsterStage, number> = { baby: 0, teen: 300, adult: 900 };
const STAGE_LABELS: Record<MonsterStage, string> = { baby: "Baby", teen: "Teen", adult: "Adulto" };

export function DashboardScreen({
  classId,
  stage,
  levelmonName,
  tier,
  conditioningIndex,
  onReset,
}: Props) {
  const info = CLASSES[classId];
  const missions = getMissions(classId, tier);
  const tierMeta = TIER_META[tier];
  const [checked, setChecked] = useState<boolean[]>(() => missions.map(() => false));
  const [totalXp, setTotalXp] = useState(() => INITIAL_XP_BY_STAGE[stage]);
  const [coins, setCoins] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showDaily, setShowDaily] = useState(true);
  const [buffActive, setBuffActive] = useState(false);
  const currentStage = getEvolutionStage(totalXp);
  const previousStage = useRef(currentStage);
  const level = Math.floor(totalXp / XP_MAX) + 1;
  const xp = totalXp % XP_MAX;

  useEffect(() => {
    if (previousStage.current !== currentStage) {
      previousStage.current = currentStage;
      setShowLevelUp(true);
    }
  }, [currentStage]);

  function toggle(index: number) {
    if (checked[index]) return;
    const mission = missions[index];
    const rewardXp = buffActive ? Math.round(mission.xp * 1.2) : mission.xp;
    const next = [...checked];
    next[index] = true;
    setChecked(next);
    setTotalXp((value) => value + rewardXp);
    setCoins((value) => value + mission.coins);
    toast.success(`+${rewardXp} XP • +${mission.coins} moedas — ${mission.title}`);
  }

  return (
    <div className="flex flex-col h-full">
      <MonsterProfileHero
        classId={classId}
        stage={currentStage}
        name={levelmonName}
        className={info.name}
        level={level}
        xp={xp}
        xpMax={XP_MAX}
        stats={info.stats}
      />

      <div className="flex flex-wrap items-center gap-2 px-5 py-3 text-xs">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="font-semibold">Sequência: 1 dia</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
          <Coins className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-semibold">{coins} moedas</span>
        </div>
        <div className="rounded-full border border-border bg-secondary px-2.5 py-1 font-semibold">
          Fluxo {tierMeta.label} {tierMeta.emoji} · {conditioningIndex}/10
        </div>
        {buffActive && (
          <div className="flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/20 px-2.5 py-1 text-primary animate-in fade-in zoom-in-95 duration-300">
            <Zap className="h-3.5 w-3.5" />
            <span className="font-bold">Buff de Login Ativo</span>
          </div>
        )}
        <button
          onClick={onReset}
          className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          reiniciar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Missões de Hoje</h3>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Complete missões para evoluir de Baby para Teen e Adulto.
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {checked.filter(Boolean).length}/{missions.length}
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {missions.map((mission, index) => (
            <button
              key={mission.id}
              onClick={() => toggle(index)}
              disabled={checked[index]}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                checked[index]
                  ? "border-border/60 bg-card/40 opacity-70"
                  : "border-border bg-card hover:border-primary hover:neon-border"
              }`}
            >
              <div
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition"
                style={{
                  borderColor: checked[index] ? `var(--${info.color})` : "var(--border)",
                  background: checked[index] ? `var(--${info.color})` : "transparent",
                }}
              >
                {checked[index] && <Check className="h-4 w-4 text-black" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${checked[index] ? "line-through" : ""}`}>
                  {mission.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{mission.desc}</p>
              </div>
              <span
                className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold"
                style={{
                  background: "color-mix(in oklab, var(--xp) 20%, transparent)",
                  color: "var(--xp)",
                }}
              >
                +{mission.xp} XP
                <br />+{mission.coins} 🪙
              </span>
            </button>
          ))}
        </div>
      </div>

      <nav className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/90 backdrop-blur-xl">
        <div className="grid h-16 grid-cols-4">
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
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {showLevelUp && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black/70 p-6 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-primary bg-card p-6 text-center neon-border animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowLevelUp(false)}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-2 flex justify-center text-primary">
              <PartyPopper className="h-10 w-10" />
            </div>
            <h2
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EVOLUÇÃO!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {levelmonName} evoluiu para{" "}
              <b className="text-foreground">{STAGE_LABELS[currentStage]}</b>!
              <br />
              Seu monstro ganhou novas habilidades.
            </p>
            <div className="mt-4 flex justify-center">
              <MonsterAvatar classId={classId} stage={currentStage} size={150} />
            </div>
            <button
              onClick={() => setShowLevelUp(false)}
              className="mt-5 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:brightness-110"
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
            toast.success("Buff de +20% XP ativado!");
          }}
        />
      )}
    </div>
  );
}
