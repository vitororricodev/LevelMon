import { useState } from "react";
import { CLASSES, type ClassId } from "@/lib/levelmon";
import { EggAvatar } from "@/components/MonsterAvatar";
import { BackHeader } from "@/components/BackHeader";
import { Sparkles } from "lucide-react";

interface Props {
  classId: ClassId;
  onBack: () => void;
  onDone: (name: string) => void;
}

export function NamingScreen({ classId, onBack, onDone }: Props) {
  const info = CLASSES[classId];
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const valid = trimmed.length >= 2 && trimmed.length <= 16;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onDone(trimmed);
  }

  return (
    <div className="flex flex-col h-full px-6 pb-8">
      <BackHeader onBack={onBack} title="Batismo" />
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div style={{ color: `var(--${info.color})` }}>
          <EggAvatar classId={classId} hatching size={140} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-primary/80">
            <Sparkles className="w-3 h-3" />
            <span>Batismo do Levelmon</span>
            <Sparkles className="w-3 h-3" />
          </div>
          <h2 className="text-xl font-bold leading-snug max-w-xs">
            Sua energia está se materializando...
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Escolha um nome para o seu companheiro de jornada:
          </p>
        </div>

        <form onSubmit={submit} className="w-full max-w-xs space-y-3">
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={16}
            placeholder="Ex: Faísca"
            className="w-full h-12 px-4 rounded-xl bg-card text-center text-lg font-bold text-foreground placeholder:text-muted-foreground/50 border-2 border-primary/50 focus:border-primary focus:outline-none neon-border transition"
            style={{ fontFamily: "Orbitron, var(--font-display)", letterSpacing: "0.05em" }}
          />
          <p className="text-[10px] text-muted-foreground">
            De 2 a 16 caracteres.
          </p>
        </form>
      </div>

      <button
        onClick={submit as any}
        disabled={!valid}
        className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold pixel-shadow hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
    </div>
  );
}
