"use client";

import { useSyncExternalStore } from "react";

// A problem typed on the landing page before signing up. It's kept in
// localStorage (not the URL) so it survives registration, email verification
// in another tab and onboarding, and then pre-fills the first chat.
const KEY = "dashclue:pending-problem";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const EVENT = "dashclue:pending-problem";

type Stored = { text: string; savedAt: number };

function read(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Stored;
    if (Date.now() - stored.savedAt > MAX_AGE_MS) return null;
    return stored.text || null;
  } catch {
    return null;
  }
}

export function savePendingProblem(text: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ text, savedAt: Date.now() }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Storage blocked (private mode): the user just types it again later.
  }
}

export function clearPendingProblem() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {}
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

// null during server rendering and when nothing is saved.
export function usePendingProblem(): string | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export { read as readPendingProblem };
