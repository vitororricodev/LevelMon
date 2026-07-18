import { useState } from "react";
import { Gift, Check, X, Zap, Sparkles } from "lucide-react";

interface Props {
  onCollect: () => void;
  onClose: () => void;
  currentDay?: number; // 1..7
}

export function DailyCheckInModal({ onCollect, onClose, currentDay = 1 }: Props) {
  const [collected, setCollected] = useState(false);
  const [burst, setBurst] = useState(false);

  function handleCollect() {
    setBurst(true);
    setCollected(true);
    setTimeout(() => {
      onCollect();
    }, 900);
  }

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-black/70 backdrop-blur-sm p-5 animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-3xl bg-card border-2 border-primary neon-border p-6 text-center animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center mb-2 text-primary">
          <Gift className="w-9 h-9" />
        </div>
        <h2
          className="text-xl font-bold text-primary"
          style={{ fontFamily: "Orbitron, var(--font-display)", letterSpacing: "0.05em" }}
        >
          CHECK-IN DIÁRIO
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Colete sua recompensa e não quebre a sequência.
        </p>

        <div className="mt-5 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => {
            const day = i + 1;
            const isPast = day < currentDay;
            const isToday = day === currentDay;
            return (
              <div
                key={day}
                className={`relative aspect-square rounded-lg flex flex-col items-center justify-center border text-[10px] font-bold transition ${
                  isToday
                    ? "border-primary bg-primary/20 text-primary neon-border animate-pulse"
                    : isPast
                    ? "border-border/60 bg-secondary/60 text-muted-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground/60"
                }`}
              >
                <span>D{day}</span>
                {isPast ? (
                  <Check className="w-3 h-3 mt-0.5" strokeWidth={3} />
                ) : (
                  <Zap className="w-3 h-3 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl bg-secondary/50 border border-border p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Recompensa de hoje
          </p>
          <p className="mt-1 text-sm font-bold text-primary flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4" />
            BUFF +20% XP
          </p>
        </div>

        <button
          onClick={handleCollect}
          disabled={collected}
          className="relative mt-5 w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold pixel-shadow hover:brightness-110 transition disabled:opacity-80 overflow-hidden"
        >
          {collected ? "Coletado!" : "Coletar Recompensa"}
          {burst && (
            <span className="pointer-events-none absolute inset-0 grid place-items-center">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-ping" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
