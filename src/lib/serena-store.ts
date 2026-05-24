// Lightweight client-side state for the Serena prototype.
// Uses localStorage so the onboarding flow + name persist between routes.

import { useEffect, useState } from "react";

const KEY = "serena:profile:v1";

export type SerenaProfile = {
  name: string;
  goals: string[];
  mood: string;
  stress: number;
  energy: number;
  onboarded: boolean;
};

const DEFAULT: SerenaProfile = {
  name: "",
  goals: [],
  mood: "",
  stress: 4,
  energy: 6,
  onboarded: false,
};

export function loadProfile(): SerenaProfile {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveProfile(p: SerenaProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("serena:profile"));
}

export function useProfile() {
  const [profile, setProfile] = useState<SerenaProfile>(DEFAULT);
  useEffect(() => {
    setProfile(loadProfile());
    const handler = () => setProfile(loadProfile());
    window.addEventListener("serena:profile", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("serena:profile", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return profile;
}
