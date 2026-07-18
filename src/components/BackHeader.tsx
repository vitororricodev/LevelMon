import { ChevronLeft } from "lucide-react";

interface Props {
  onBack: () => void;
  title?: string;
}

export function BackHeader({ onBack, title }: Props) {
  return (
    <div className="sticky top-0 z-10 flex items-center h-12 px-2 -mx-2 bg-background/80 backdrop-blur-md">
      <button
        onClick={onBack}
        aria-label="Voltar"
        className="flex items-center gap-1 h-9 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase tracking-widest">Voltar</span>
      </button>
      {title && (
        <span className="ml-auto mr-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
      )}
    </div>
  );
}
