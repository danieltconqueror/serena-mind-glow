import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { AssistantButton } from "./AssistantButton";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md pb-28">
      <div className="px-5 pt-8">{children}</div>
      <AssistantButton />
      <BottomNav />
    </div>
  );
}
