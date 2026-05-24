import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Moon, Zap, Target, Heart } from "lucide-react";
import { Orb } from "@/components/serena/Orb";
import { loadProfile, saveProfile } from "@/lib/serena-store";

export const Route = createFileRoute("/")({
  component: Onboarding,
});

const GOALS = [
  { id: "stress", label: "Reduce stress", icon: Heart },
  { id: "sleep", label: "Improve sleep", icon: Moon },
  { id: "motivation", label: "Feel more motivated", icon: Zap },
  { id: "focus", label: "Improve focus", icon: Target },
  { id: "emotions", label: "Understand emotions better", icon: Sparkles },
];

const MOODS = [
  { emoji: "😌", label: "Calm" },
  { emoji: "🙂", label: "Okay" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😟", label: "Anxious" },
  { emoji: "😔", label: "Low" },
  { emoji: "🥱", label: "Tired" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState(4);
  const [energy, setEnergy] = useState(6);
  const [name, setName] = useState("");

  function next() {
    setStep((s) => s + 1);
  }

  function finish() {
    saveProfile({
      ...loadProfile(),
      name: name.trim() || "friend",
      goals,
      mood,
      stress,
      energy,
      onboarded: true,
    });
    setTimeout(() => navigate({ to: "/home" }), 2200);
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
      {/* progress */}
      {step > 0 && step < 4 && (
        <div className="mb-8 flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i <= step ? "gradient-emerald" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Orb size={240} className="mb-8" />
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
            Serena
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gradient">
            Welcome to Serena
          </h1>
          <p className="mb-12 max-w-xs text-base text-muted-foreground">
            A calmer space for your mind.
          </p>
          <button
            onClick={next}
            className="group flex items-center gap-2 rounded-full gradient-emerald px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Begin
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-1 flex-col">
          <h2 className="mb-2 text-2xl font-bold">What brings you here?</h2>
          <p className="mb-8 text-sm text-muted-foreground">Choose any that resonate.</p>
          <div className="space-y-3">
            {GOALS.map(({ id, label, icon: Icon }) => {
              const active = goals.includes(id);
              return (
                <button
                  key={id}
                  onClick={() =>
                    setGoals((g) =>
                      g.includes(id) ? g.filter((x) => x !== id) : [...g, id]
                    )
                  }
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-primary/60 bg-primary/10 shadow-glow"
                      : "border-border bg-card/60 hover:border-primary/30"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      active ? "gradient-emerald text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{label}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={next}
            disabled={goals.length === 0}
            className="mt-8 rounded-full gradient-emerald py-4 text-sm font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-1 flex-col">
          <h2 className="mb-2 text-2xl font-bold">How have you been feeling?</h2>
          <p className="mb-6 text-sm text-muted-foreground">No wrong answers, ever.</p>

          <div className="mb-8 grid grid-cols-3 gap-3">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition ${
                  mood === m.label
                    ? "border-primary/60 bg-primary/10 shadow-glow"
                    : "border-border bg-card/60"
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-card/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Stress level</span>
              <span className="text-sm text-primary">{stress}/10</span>
            </div>
            <input
              type="range" min={1} max={10} value={stress}
              onChange={(e) => setStress(+e.target.value)}
              className="serena-slider w-full"
            />
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Energy today</span>
              <span className="text-sm text-primary">{energy}/10</span>
            </div>
            <input
              type="range" min={1} max={10} value={energy}
              onChange={(e) => setEnergy(+e.target.value)}
              className="serena-slider w-full"
            />
          </div>

          <button
            onClick={next}
            disabled={!mood}
            className="mt-8 rounded-full gradient-emerald py-4 text-sm font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-1 flex-col">
          <h2 className="mb-2 text-2xl font-bold">What should we call you?</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Just a first name or nickname — that's it.
          </p>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-2xl border border-border bg-card/60 px-5 py-4 text-lg outline-none transition focus:border-primary/60"
          />
          <button
            onClick={() => {
              finish();
              setStep(4);
            }}
            disabled={!name.trim()}
            className="mt-auto rounded-full gradient-emerald py-4 text-sm font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40"
          >
            Create my space
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Orb size={200} className="mb-10" />
          <h2 className="mb-2 text-xl font-semibold">
            Building your personalized wellness space…
          </h2>
          <p className="mb-8 max-w-xs text-sm text-muted-foreground">
            Tuning gentle reminders, soft sounds, and a calmer rhythm just for you.
          </p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full gradient-emerald"
              style={{
                animation: "shimmer 2s linear infinite",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.17 155), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        .serena-slider {
          -webkit-appearance: none;
          height: 6px;
          background: linear-gradient(to right, oklch(0.78 0.17 155), oklch(0.82 0.08 295));
          border-radius: 999px;
          outline: none;
        }
        .serena-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 999px;
          background: white;
          border: 3px solid oklch(0.78 0.17 155);
          box-shadow: 0 0 20px oklch(0.78 0.17 155 / 0.6);
          cursor: pointer;
        }
        .serena-slider::-moz-range-thumb {
          height: 22px;
          width: 22px;
          border-radius: 999px;
          background: white;
          border: 3px solid oklch(0.78 0.17 155);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
