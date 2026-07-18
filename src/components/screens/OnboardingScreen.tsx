import { useState } from "react";
import { QUIZ, tallyClass, type ClassId } from "@/lib/levelmon";
import { ChevronRight, User, User2, UserCircle2 } from "lucide-react";
import { BackHeader } from "@/components/BackHeader";

type Gender = "masc" | "fem" | "outros";

interface Props {
  onBack: () => void;
  onDone: (result: { gender: Gender; classId: ClassId }) => void;
}

export function OnboardingScreen({ onBack, onDone }: Props) {
  const [gender, setGender] = useState<Gender | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ClassId[]>([]);
  const [fadeKey, setFadeKey] = useState(0);

  function handleBack() {
    if (!gender) {
      onBack();
      return;
    }
    if (step === 0) {
      setGender(null);
      return;
    }
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => s - 1);
    setFadeKey((k) => k + 1);
  }

  if (!gender) {
    return (
      <div className="flex flex-col h-full px-6 pb-8">
        <BackHeader onBack={handleBack} />
        <StepBadge current={0} total={QUIZ.length + 1} />
        <h2 className="mt-4 text-2xl font-bold">Escolha seu avatar</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Como seu Levelmon deve te chamar na jornada?
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {[
            { id: "masc" as const, label: "Masculino", Icon: User },
            { id: "fem" as const, label: "Feminino", Icon: User2 },
            { id: "outros" as const, label: "Outros", Icon: UserCircle2 },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setGender(id)}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary hover:neon-border transition text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary grid place-items-center text-primary group-hover:bg-primary/20">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold flex-1">{label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  const question = QUIZ[step];

  function pick(cls: ClassId) {
    const next = [...answers, cls];
    setAnswers(next);
    if (step + 1 >= QUIZ.length) {
      const winner = tallyClass(next);
      onDone({ gender: gender!, classId: winner });
    } else {
      setStep(step + 1);
      setFadeKey((k) => k + 1);
    }
  }

  return (
    <div className="flex flex-col h-full px-6 pb-8">
      <BackHeader onBack={handleBack} />
      <StepBadge current={step + 1} total={QUIZ.length + 1} />
      <div key={fadeKey} className="mt-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <p className="text-xs uppercase tracking-widest text-primary font-bold">
          Pergunta {step + 1} de {QUIZ.length}
        </p>
        <h2 className="mt-3 text-xl font-bold leading-snug">{question.q}</h2>
        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => pick(opt.class)}
              className="group flex items-start gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary hover:neon-border transition text-left"
            >
              <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary grid place-items-center font-bold text-sm">
                {opt.label}
              </div>
              <span className="text-sm font-medium leading-snug pt-1">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBadge({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all ${
            i <= current ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}
