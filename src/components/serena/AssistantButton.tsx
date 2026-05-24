import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

const SUGGESTIONS = [
  "Suggest a calming activity",
  "Where can I find breathing exercises?",
  "Show my sleep trends",
  "What's my streak?",
];

const RESPONSES: Record<string, string> = {
  "Suggest a calming activity":
    "Try the 4-7-8 breathing exercise — it only takes 2 minutes and helps your nervous system reset. You'll find it under Activities → Breathing.",
  "Where can I find breathing exercises?":
    "Head to the Activities tab — the first card is 'Breathwork'. There are 4 guided sessions ranging from 2 to 10 minutes.",
  "Show my sleep trends":
    "Your sleep consistency is up 18% this week 🌙 You've averaged 7h 24m and your wind-down routine is helping. Tap Insights → Sleep to see the chart.",
  "What's my streak?":
    "You're on a 5-day check-in streak — that's beautiful consistency. One more day and you unlock the 'Calm Week' milestone ✨",
};

function reply(prompt: string) {
  return (
    RESPONSES[prompt] ??
    "I'm a little assistant inside Serena — I can help you navigate the app, find activities, and understand your insights. Try one of the suggested chips below."
  );
}

type Msg = { role: "user" | "serena"; text: string };

export function AssistantButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "serena",
      text: "Hi, I'm Serena 🌿 — your gentle guide through the app. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "serena", text: reply(text) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Serena assistant"
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full gradient-aurora text-primary-foreground shadow-glow transition hover:scale-105"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
          <div className="glass-strong relative mx-auto w-full max-w-md rounded-t-3xl p-5 sm:rounded-3xl animate-in slide-in-from-bottom duration-300">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-emerald">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Serena</p>
                  <p className="text-xs text-muted-foreground">Your wellness guide</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-3 max-h-80 space-y-2 overflow-y-auto no-scrollbar pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "serena"
                      ? "bg-secondary text-foreground"
                      : "ml-auto gradient-emerald text-primary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Serena anything…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-full gradient-emerald text-primary-foreground"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
