import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/serena/AppShell";
import { SectionHeader } from "@/components/serena/SectionHeader";
import { Heart, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

const CIRCLES = [
  { name: "Calm Mornings", members: "2.1k", emoji: "🌅" },
  { name: "Sleep Better", members: "1.4k", emoji: "🌙" },
  { name: "Anxiety Friends", members: "3.8k", emoji: "🌿" },
  { name: "Focus Pals", members: "920", emoji: "🎯" },
];

const POSTS = [
  {
    user: "soft.cloud",
    avatar: "🌸",
    time: "2h",
    text: "First week of journaling done. It actually does feel lighter — even just 3 lines a day. Anyone else?",
    likes: 124,
    comments: 18,
    circle: "Calm Mornings",
  },
  {
    user: "moss.kid",
    avatar: "🍃",
    time: "5h",
    text: "Reminder: you don't have to earn your rest. 🌿",
    likes: 482,
    comments: 31,
    circle: "Anxiety Friends",
  },
  {
    user: "low.tide",
    avatar: "🌊",
    time: "1d",
    text: "Tried the 4-7-8 breathing before bed for a week. Falling asleep 20 mins faster on average. Highly recommend.",
    likes: 267,
    comments: 42,
    circle: "Sleep Better",
  },
  {
    user: "quiet.fern",
    avatar: "🌱",
    time: "1d",
    text: "Bad day. Just needed to put it somewhere. Thanks for being here.",
    likes: 891,
    comments: 76,
    circle: "Anxiety Friends",
  },
];

function CommunityPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  return (
    <AppShell>
      <SectionHeader eyebrow="Community" title="You're not alone." subtitle="Anonymous, supportive, soft." />

      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Circles</p>
      <div className="mb-6 -mx-5 flex gap-3 overflow-x-auto px-5 no-scrollbar">
        {CIRCLES.map((c) => (
          <div key={c.name} className="flex min-w-[140px] flex-col items-start gap-2 rounded-2xl border border-border bg-card/60 p-4">
            <span className="text-2xl">{c.emoji}</span>
            <p className="text-sm font-semibold leading-tight">{c.name}</p>
            <p className="text-[10px] text-muted-foreground">{c.members} members</p>
          </div>
        ))}
      </div>

      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Feed</p>
      <div className="space-y-3">
        {POSTS.map((p, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-aurora text-lg">{p.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">@{p.user}</p>
                <p className="text-[10px] text-muted-foreground">{p.circle} · {p.time}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                <Sparkles className="mr-0.5 inline h-2.5 w-2.5" /> safe
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{p.text}</p>
            <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
              <button
                onClick={() => setLiked((l) => ({ ...l, [i]: !l[i] }))}
                className="flex items-center gap-1.5 transition"
              >
                <Heart className={`h-4 w-4 ${liked[i] ? "fill-pink-soft text-pink-soft" : ""}`} />
                {p.likes + (liked[i] ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                {p.comments}
              </button>
              <span className="ml-auto text-[10px]">💚 sending love</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
