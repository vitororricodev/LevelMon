import { CLASSES, type ClassId } from "@/lib/levelmon";
import { Droplet, Footprints, Swords, MessageCircle, Users, Eye, BookOpen, TreePine, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BackHeader } from "@/components/BackHeader";

const ICONS: Record<ClassId, LucideIcon[]> = {
  gladiador: [Droplet, Footprints, Swords],
  bardo: [MessageCircle, Users, Eye],
  druida: [BookOpen, TreePine, Moon],
};

interface Props {
  classId: ClassId;
  onBack: () => void;
  onAccept: () => void;
}

export function JourneyScreen({ classId, onBack, onAccept }: Props) {
  const info = CLASSES[classId];
  const icons = ICONS[classId];

  return (
    <div className="flex flex-col h-full px-6 pb-8">
      <BackHeader onBack={onBack} />
      <div className="text-center">

        <p className="text-xs uppercase tracking-widest text-primary font-bold">Trilha Diária</p>
        <h1 className="mt-2 text-2xl font-bold">Sua Trilha Diária Sugerida</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O foco de <b style={{ color: `var(--${info.color})` }}>{info.name}</b> é treinar {" "}
          {classId === "gladiador" && "corpo e disciplina"}
          {classId === "bardo" && "conexão e presença"}
          {classId === "druida" && "mente e natureza"}.
        </p>
      </div>

      <div className="mt-6 flex-1 flex flex-col gap-3 overflow-y-auto">
        {info.missions.map((m, i) => {
          const Icon = icons[i];
          return (
            <div
              key={m.title}
              className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border"
              style={{ boxShadow: `inset 3px 0 0 0 var(--${info.color})` }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-xl grid place-items-center"
                style={{
                  background: `color-mix(in oklab, var(--${info.color}) 20%, transparent)`,
                  color: `var(--${info.color})`,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">{m.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onAccept}
        className="mt-6 w-full h-14 rounded-xl font-bold text-base pixel-shadow hover:brightness-110 transition"
        style={{
          background: `linear-gradient(135deg, var(--primary), var(--${info.color}))`,
          color: "white",
        }}
      >
        Aceitar Missões e Iniciar Jogo
      </button>
    </div>
  );
}
