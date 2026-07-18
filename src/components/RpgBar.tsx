interface Props {
  value: number;
  max?: number;
  color?: string; // css var name like "gladiador", "bardo", "druida", "xp", "primary"
  label?: string;
  showValue?: boolean;
}

export function RpgBar({ value, max = 100, color = "primary", label, showValue }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colorVar = `var(--${color})`;
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[10px] font-mono text-muted-foreground">
              {Math.round(value)}/{max}
            </span>
          )}
        </div>
      )}
      <div className="rpg-bar">
        <div
          className="rpg-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${colorVar}, color-mix(in oklab, ${colorVar} 60%, white))`,
            color: colorVar,
          }}
        />
      </div>
    </div>
  );
}
