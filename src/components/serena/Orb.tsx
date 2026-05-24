type Props = { size?: number; className?: string };

export function Orb({ size = 200, className = "" }: Props) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-70 animate-orb"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.85 0.18 155 / 0.9), oklch(0.6 0.18 175 / 0.6) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-6 rounded-full blur-2xl opacity-80 animate-orb"
        style={{
          animationDelay: "1.2s",
          background:
            "radial-gradient(circle at 70% 60%, oklch(0.85 0.09 215 / 0.8), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-10 rounded-full opacity-90 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, oklch(0.95 0.04 155 / 0.85), oklch(0.75 0.16 155 / 0.4) 60%, transparent 80%)",
          boxShadow: "0 0 80px -10px oklch(0.78 0.17 155 / 0.7)",
        }}
      />
    </div>
  );
}
