export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-gradient">{title}</h1>
      {subtitle && (
        <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
