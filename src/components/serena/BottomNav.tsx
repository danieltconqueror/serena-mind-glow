import { Link, useLocation } from "@tanstack/react-router";
import { Home, Heart, Sparkles, Users, TrendingUp } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/mood", label: "Mood", icon: Heart },
  { to: "/activities", label: "Activities", icon: Sparkles },
  { to: "/community", label: "Community", icon: Users },
  { to: "/insights", label: "Insights", icon: TrendingUp },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-3 pb-3 pt-2">
      <div className="glass-strong flex items-center justify-between rounded-full px-2 py-2 shadow-soft">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/home" && pathname === "/home");
          return (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[10px] font-medium transition"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  active
                    ? "gradient-emerald text-primary-foreground shadow-glow"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" size={18} />
              </div>
              <span className={active ? "text-foreground" : "text-muted-foreground"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
