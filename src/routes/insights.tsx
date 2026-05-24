import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/serena/AppShell";
import { SectionHeader } from "@/components/serena/SectionHeader";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { Award, Flame, Moon, Heart } from "lucide-react";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
});

const MONTH = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  mood: 5 + Math.sin(i / 3) * 1.5 + (i / 30) * 2 + (Math.random() - 0.5),
}));
const STRESS = Array.from({ length: 7 }, (_, i) => ({
  day: ["M", "T", "W", "T", "F", "S", "S"][i],
  level: 7 - i * 0.6 + Math.random(),
}));
const SLEEP = Array.from({ length: 7 }, (_, i) => ({
  day: ["M", "T", "W", "T", "F", "S", "S"][i],
  hours: 6.5 + Math.random() * 2,
}));

function InsightsPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Insights" title="Your patterns" subtitle="Gentle data, kindly told." />

      {/* Milestones */}
      <div className="mb-5 grid grid-cols-3 gap-2.5">
        <Milestone icon={<Flame className="h-4 w-4" />} value="5" label="Day streak" />
        <Milestone icon={<Heart className="h-4 w-4" />} value="78" label="Wellness" />
        <Milestone icon={<Award className="h-4 w-4" />} value="12" label="Sessions" />
      </div>

      {/* Monthly mood */}
      <Card title="Monthly mood trend" hint="Trending upward 🌱">
        <div className="h-44">
          <ResponsiveContainer>
            <AreaChart data={MONTH} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="mood-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.17 155)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="oklch(0.78 0.17 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="mood" stroke="oklch(0.78 0.17 155)" strokeWidth={2.5} fill="url(#mood-g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Stress */}
      <Card title="Stress this week" hint="-18% from last week">
        <div className="h-36">
          <ResponsiveContainer>
            <LineChart data={STRESS} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="level" stroke="oklch(0.84 0.08 15)" strokeWidth={3} dot={{ fill: "oklch(0.84 0.08 15)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Sleep */}
      <Card title="Sleep consistency" hint="Avg 7h 24m" icon={<Moon className="h-4 w-4 text-lavender" />}>
        <div className="h-36">
          <ResponsiveContainer>
            <BarChart data={SLEEP} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0.02 155)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" fill="oklch(0.82 0.08 295)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Heatmap */}
      <Card title="Emotional heatmap" hint="Last 6 weeks">
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 42 }).map((_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className="aspect-square rounded-md"
                style={{
                  background: `oklch(0.78 0.17 155 / ${0.15 + intensity * 0.85})`,
                }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1].map((a) => (
              <div key={a} className="h-2.5 w-2.5 rounded-sm" style={{ background: `oklch(0.78 0.17 155 / ${a})` }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </Card>

      {/* Summary */}
      <div className="rounded-2xl gradient-aurora p-5 text-primary-foreground shadow-glow">
        <p className="text-xs font-medium uppercase tracking-wider opacity-80">Weekly summary</p>
        <p className="mt-2 text-base leading-relaxed">
          Your stress dropped while your sleep improved. Mornings have been your steadiest moments — consider keeping that rhythm 🌿
        </p>
      </div>
    </AppShell>
  );
}

const tooltipStyle = {
  background: "oklch(0.25 0.03 160)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 12,
  fontSize: 12,
};

function Milestone({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-3 text-center">
      <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Card({ title, hint, icon, children }: { title: string; hint?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-5 rounded-2xl border border-border bg-card/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-semibold">{title}</p>
        </div>
        {hint && <span className="text-[10px] text-primary/90">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
