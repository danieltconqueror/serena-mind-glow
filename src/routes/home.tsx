import { createFileRoute, Link } from "@tanstack/react-router";
import { useProfile } from "@/lib/serena-store";
import { AppShell } from "@/components/serena/AppShell";
import {
  Flame, Moon, Wind, Sparkles, ArrowRight, Heart, Activity,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const QUOTES = [
  "You don't have to be perfect to be enough.",
  "Small steps still move you forward.",
  "Breathe. You're allowed to slow down.",
  "Today is a gentle place to begin again.",
];

function HomePage() {
  const profile = useProfile();
  const name = profile.name || "friend";
  const quote = QUOTES[new Date().getDate() % QUOTES.length];
  const score = 78;

  return (
    <AppShell>
      {/* Greeting */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            {new Date().toLocaleDateString(undefined, { weekday: "long" })}
          </p>
          <h1 className="text-2xl font-bold">
            Hi, <span className="text-gradient">{name}</span> 🌿
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-card/60 px-3 py-2 text-sm">
          <Flame className="h-4 w-4 text-primary" />
          <span className="font-semibold">5</span>
          <span className="text-xs text-muted-foreground">days</span>
        </div>
      </div>

      {/* Wellness score */}
      <div className="relative mb-5 overflow-hidden rounded-3xl gradient-aurora p-6 text-primary-foreground shadow-glow">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs font-medium opacity-80">Wellness score</p>
            <p className="mt-1 text-5xl font-bold">{score}</p>
            <p className="mt-1 text-xs opacity-90">+6 from last week ✨</p>
          </div>
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - score / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mb-5 glass rounded-2xl p-5">
        <p className="text-xs uppercase tracking-wider text-primary/80">Today's note</p>
        <p className="mt-2 text-base font-medium leading-relaxed">"{quote}"</p>
      </div>

      {/* Quick stats */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatCard
          icon={<Moon className="h-4 w-4" />}
          label="Sleep"
          value="7h 24m"
          tone="lavender"
          hint="Above goal"
        />
        <StatCard
          icon={<Activity className="h-4 w-4" />}
          label="Stress"
          value="Low"
          tone="mint"
          hint="-18% this week"
        />
      </div>

      {/* Breathing shortcut */}
      <Link
        to="/activities"
        className="mb-5 flex items-center justify-between rounded-2xl border border-border bg-card/60 p-5 transition hover:border-primary/40"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl gradient-emerald">
            <Wind className="h-5 w-5 text-primary-foreground" />
            <span className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl" />
          </div>
          <div>
            <p className="font-semibold">2-minute breath</p>
            <p className="text-xs text-muted-foreground">Reset in a moment</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      {/* Recommended */}
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Recommended for you
      </p>
      <div className="mb-5 space-y-3">
        <RecCard
          title="Evening wind-down"
          duration="8 min"
          desc="A soft session to ease into sleep."
          tone="lavender"
        />
        <RecCard
          title="Focus flow"
          duration="25 min"
          desc="Lo-fi soundscape with a gentle timer."
          tone="cyan"
        />
      </div>

      {/* Daily check-in */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Daily check-in</p>
            <p className="mt-1 text-xs text-muted-foreground">
              How are you feeling right now? It takes 30 seconds.
            </p>
            <Link
              to="/mood"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary"
            >
              Check in <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon, label, value, hint, tone,
}: { icon: React.ReactNode; label: string; value: string; hint: string; tone: "mint" | "lavender" | "cyan" }) {
  const toneClass =
    tone === "mint" ? "bg-mint/15 text-mint"
    : tone === "lavender" ? "bg-lavender/15 text-lavender"
    : "bg-cyan/15 text-cyan";
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4">
      <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${toneClass}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      <p className="mt-0.5 text-[10px] text-primary/80">{hint}</p>
    </div>
  );
}

function RecCard({ title, duration, desc, tone }: { title: string; duration: string; desc: string; tone: "lavender" | "cyan" }) {
  const grad = tone === "lavender"
    ? "from-lavender/30 to-pink-soft/20"
    : "from-cyan/30 to-mint/20";
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${grad} p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">{duration}</p>
          <h3 className="mt-1 text-lg font-bold">{title}</h3>
          <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">{desc}</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-background shadow-glow">
          ▶
        </button>
      </div>
    </div>
  );
}
