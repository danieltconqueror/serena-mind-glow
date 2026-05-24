import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/serena/AppShell";
import { SectionHeader } from "@/components/serena/SectionHeader";
import { Wind, Brain, Timer, Music, BookOpen, Sparkles, Moon, Play, Pause, X } from "lucide-react";

export const Route = createFileRoute("/activities")({
  component: ActivitiesPage,
});

const CATEGORIES = [
  { id: "breath", title: "Breathwork", desc: "Calm your nervous system", icon: Wind, tone: "from-mint/30 to-primary/20", action: "breath" },
  { id: "meditate", title: "Meditation", desc: "Guided & ambient sessions", icon: Brain, tone: "from-lavender/30 to-pink-soft/20", action: "player" },
  { id: "focus", title: "Focus session", desc: "25 min deep work", icon: Timer, tone: "from-cyan/30 to-mint/20", action: "timer" },
  { id: "sounds", title: "Calming sounds", desc: "Rain · forest · waves", icon: Music, tone: "from-pink-soft/30 to-lavender/20", action: "player" },
  { id: "journal", title: "Journaling prompt", desc: "5 min reflection", icon: BookOpen, tone: "from-mint/30 to-cyan/20", action: "prompt" },
  { id: "affirm", title: "Affirmations", desc: "Soft daily reminders", icon: Sparkles, tone: "from-lavender/30 to-cyan/20", action: "affirm" },
  { id: "sleep", title: "Sleep wind-down", desc: "8 min before bed", icon: Moon, tone: "from-primary/30 to-lavender/20", action: "player" },
];

const AFFIRMATIONS = [
  "You are doing better than you think.",
  "Your feelings are valid.",
  "Rest is productive too.",
  "You are allowed to take up space.",
];

const PROMPTS = [
  "What's one small thing that made today softer?",
  "Where did you notice tension in your body?",
  "Who or what are you grateful for right now?",
];

function ActivitiesPage() {
  const [open, setOpen] = useState<null | (typeof CATEGORIES)[number]>(null);

  return (
    <AppShell>
      <SectionHeader eyebrow="Wellness" title="Activities" subtitle="Tiny moments that add up." />

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpen(c)}
            className={`group flex flex-col items-start gap-3 rounded-2xl border border-border bg-gradient-to-br ${c.tone} p-4 text-left transition hover:scale-[1.02]`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/40 backdrop-blur">
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{c.title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur sm:items-center" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong relative mx-auto w-full max-w-md rounded-t-3xl p-6 sm:rounded-3xl">
            <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary">
              <X className="h-4 w-4" />
            </button>
            <h3 className="mb-1 text-xl font-bold">{open.title}</h3>
            <p className="mb-6 text-sm text-muted-foreground">{open.desc}</p>

            {open.action === "breath" && <BreathExercise />}
            {open.action === "timer" && <FocusTimer />}
            {open.action === "player" && <FakePlayer title={open.title} />}
            {open.action === "prompt" && (
              <div className="space-y-3">
                {PROMPTS.map((p) => (
                  <div key={p} className="rounded-2xl border border-border bg-card/60 p-4 text-sm">{p}</div>
                ))}
              </div>
            )}
            {open.action === "affirm" && (
              <div className="space-y-3">
                {AFFIRMATIONS.map((a) => (
                  <div key={a} className="rounded-2xl gradient-aurora p-4 text-sm font-medium text-primary-foreground">"{a}"</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function BreathExercise() {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  useEffect(() => {
    const i = setInterval(() => {
      setPhase((p) => (p === "in" ? "hold" : p === "hold" ? "out" : "in"));
    }, 4000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex flex-col items-center py-6">
      <div
        className={`relative flex h-44 w-44 items-center justify-center rounded-full transition-transform duration-[4000ms] ease-in-out ${
          phase === "in" ? "scale-100" : phase === "hold" ? "scale-110" : "scale-75"
        }`}
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.17 155 / 0.8), oklch(0.6 0.18 175 / 0.4))",
          boxShadow: "0 0 60px oklch(0.78 0.17 155 / 0.6)",
        }}
      >
        <span className="text-lg font-semibold text-primary-foreground">
          {phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out"}
        </span>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">4 · 4 · 4 box breathing</p>
    </div>
  );
}

function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(i);
  }, [running]);
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center py-6">
      <p className="text-6xl font-bold tabular-nums text-gradient">{m}:{s}</p>
      <p className="mt-2 text-xs text-muted-foreground">Deep work session</p>
      <button
        onClick={() => setRunning((r) => !r)}
        className="mt-6 flex h-14 w-14 items-center justify-center rounded-full gradient-emerald text-primary-foreground shadow-glow"
      >
        {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
      </button>
    </div>
  );
}

function FakePlayer({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(20);
  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 400);
    return () => clearInterval(i);
  }, [playing]);
  return (
    <div className="py-2">
      <div className="mb-6 flex h-44 items-center justify-center rounded-2xl gradient-aurora">
        <div className="animate-breathe">
          <div className="h-20 w-20 rounded-full bg-white/30 backdrop-blur" />
        </div>
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">Serena · Original</p>
      <div className="mt-4 h-1 rounded-full bg-secondary">
        <div className="h-full rounded-full gradient-emerald" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{Math.floor(progress * 0.08)}:{Math.floor(progress * 0.5 % 60).toString().padStart(2, "0")}</span>
        <span>8:00</span>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-14 w-14 items-center justify-center rounded-full gradient-emerald text-primary-foreground shadow-glow"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
      </div>
    </div>
  );
}
