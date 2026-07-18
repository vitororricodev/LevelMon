import { type ReactNode } from "react";

/** Mobile-first frame: centers a "phone" viewport on desktop. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex items-stretch md:items-center justify-center md:p-6">
      <div
        className="relative w-full md:max-w-[420px] md:h-[860px] md:rounded-[2.5rem] bg-background md:border md:border-border md:shadow-[0_30px_80px_-20px_rgba(124,58,237,0.35)] overflow-hidden flex flex-col"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 45%), radial-gradient(circle at 100% 100%, color-mix(in oklab, var(--bardo) 12%, transparent) 0%, transparent 40%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
