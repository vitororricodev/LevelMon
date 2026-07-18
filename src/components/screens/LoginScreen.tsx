import { useState } from "react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";

interface Props {
  onContinue: () => void;
}

export function LoginScreen({ onContinue }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Falha no login com Google");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      onContinue();
    } catch {
      toast.error("Erro inesperado. Tente o Modo Demo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-10 text-center">
      <div className="w-full pt-2">
        <Logo size="lg" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <p className="text-sm text-muted-foreground max-w-xs">
          Seu corpo, sua aventura.
        </p>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary/80">
          <Sparkles className="w-3 h-3" />
          <span>Saúde gamificada para gamers</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-white text-gray-900 font-semibold flex items-center justify-center gap-2.5 pixel-shadow hover:brightness-95 transition disabled:opacity-60"
        >
          <GoogleIcon />
          <span>{loading ? "Conectando..." : "Entrar com Google"}</span>
        </button>
        <button
          onClick={onContinue}
          className="w-full h-11 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium border border-border hover:bg-secondary/70 transition"
        >
          Ignorar Login (Modo Demo)
        </button>
        <p className="text-[10px] text-muted-foreground/60 mt-2">
          Ao continuar você concorda em treinar seu Levelmon todos os dias 🔥
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.5 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.8 6.1C12.3 13.1 17.7 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.7-.2-3.3-.5-4.9H24v9.3h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.4z"/>
      <path fill="#FBBC05" d="M10.3 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.8-6.1z"/>
      <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.5 2.3-6.3 0-11.7-3.6-13.7-8.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}
