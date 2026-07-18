import { useState } from "react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { PixelScene } from "@/components/PixelScene";

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
    <div className="flex flex-col items-center justify-between h-full px-6 py-8 text-center">
      {/* Title */}
      <div className="w-full pt-4 flex flex-col items-center gap-2">
        <h1
          className="text-white text-4xl leading-none"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow:
              "0 0 12px rgba(124,58,237,0.9), 3px 3px 0 #1a1030, 6px 6px 0 rgba(0,0,0,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          LEVELMON
        </h1>
        <p
          className="text-[10px] tracking-[0.25em] text-white/70 mt-1"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          SEU CORPO, SUA AVENTURA.
        </p>
      </div>

      {/* Pixel scene */}
      <div className="flex-1 w-full grid place-items-center py-4">
        <PixelScene size={260} />
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-lg bg-[#7C3AED] hover:bg-[#6d28d9] active:translate-y-0.5 transition text-white text-sm tracking-widest"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            boxShadow: "0 4px 0 0 #4c1d95, 0 0 20px -4px rgba(124,58,237,0.8)",
          }}
        >
          COMEÇAR
        </button>
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full h-14 rounded-lg bg-transparent border-2 border-[#7C3AED] text-white text-[11px] tracking-widest hover:bg-[#7C3AED]/15 active:translate-y-0.5 transition disabled:opacity-60"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          {loading ? "CONECTANDO..." : "ENTRAR COM GOOGLE"}
        </button>
      </div>
    </div>
  );
}
