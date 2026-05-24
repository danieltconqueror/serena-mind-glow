import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/serena/AppShell";
import { SectionHeader } from "@/components/serena/SectionHeader";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/mood")({
  component: MoodPage,
});

const MOODS = [
  { emoji: "😌", label: "Calm" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Meh" },
  { emoji: "😟", label: "Anxious" },
  { emoji: "😔", label: "Low" },
  { emoji: "🥱", label: "Tired" },
  { emoji: "🤩", label: "Hyped" },
  { emoji: "😤", label: "Frustrated" },
];

const WEEK = [
  { day: "Mon", mood: 5, stress: 6 },
  { day: "Tue", mood: 6, stress: 5 },
  { day: "Wed", mood: 4, stress: 7 },
  { day: "Thu", mood: 7, stress: 4 },
  { day: "Fri", mood: 8, stress: 3 },
  { day: "Sat", mood: 7, stress: 4 },
  { day: "Sun", mood: 8, stress: 3 },
];

function MoodPage() {
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState(4);
  const [anxiety, setAnxiety] = useState(3);
  const [energy, setEnergy] = useState(6);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <SectionHeader eyebrow="Mood" title="How are you?" subtitle="A small check-in for a clearer mind." />

      {/* Emoji picker */}
      <div className="mb-5 grid grid-cols-4 gap-2.5">
        {MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m.label)}
            className={`flex flex-col items-center gap-1 rounded-2xl border p-3 transition ${
              mood === m.label
                ? "border-primary/60 bg-primary/10 shadow-glow"
                : "border-border bg-card/60"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="mb-5 space-y-3">
        <Slider label="Stress" value={stress} setValue={setStress} color="oklch(0.84 0.08 15)" />
        <Slider label="Anxiety" value={anxiety} setValue={setAnxiety} color="oklch(0.82 0.08 295)" />
        <Slider label="Energy" value={energy} setValue={setEnergy} color="oklch(0.78 0.17 155)" />
      </div>

      {/* Journal */}
      <div className="mb-5 rounded-2xl border border-border bg-card/60 p-4">
        <p className="mb-2 text-sm font-medium">Optional journal</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="What's on your mind? Just a few words is okay."
          className="w-full resize-none rounded-xl bg-secondary/50 p-3 text-sm outline-none placeholder:text-muted-foreground/70"
        />
      </div>

      <button
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        disabled={!mood}
        className="mb-7 w-full rounded-full gradient-emerald py-4 text-sm font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40"
      >
        {saved ? "Saved 🌿" : "Save check-in"}
      </button>

      {/* Weekly graph */}
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        This week
      </p>
      <div className="mb-5 rounded-2xl border border-border bg-card/60 p-4">
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEEK} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.17 155)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.78 0.17 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0.02 155)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0.02 155)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{ background: "oklch(0.25 0.03 160)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="mood" stroke="oklch(0.78 0.17 155)" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend cards */}
      <div className="space-y-3">
        <TrendCard title="Your mood is trending up" desc="+22% positive moods compared to last week." emoji="📈" />
        <TrendCard title="Anxiety is calming" desc="Lower anxiety days correlate with your morning walks." emoji="🌿" />
        <TrendCard title="Best day: Friday" desc="You felt 'Calm' and energy was high." emoji="✨" />
      </div>
    </AppShell>
  );
}

function Slider({ label, value, setValue, color }: { label: string; value: number; setValue: (n: number) => void; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm" style={{ color }}>{value}/10</span>
      </div>
      <input
        type="range" min={1} max={10} value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="w-full"
        style={{
          accentColor: color,
        }}
      />
    </div>
  );
}

function TrendCard({ title, desc, emoji }: { title: string; desc: string; emoji: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-xl">
        {emoji}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
