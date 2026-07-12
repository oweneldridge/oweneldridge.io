"use client";

import { useSyncExternalStore } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

// Tiny store over "what theme is showing right now": the html attribute
// when the visitor has picked one, the system preference otherwise.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  listeners.add(onChange);
  return () => {
    media.removeEventListener("change", onChange);
    listeners.delete(onChange);
  };
}

function getTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerTheme(): Theme | null {
  // The server can't know; the button renders with a neutral label
  // until hydration catches up.
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function flip() {
    const next = (theme ?? getTheme()) === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private browsing, storage full, whatever: the page still flips
    }
    listeners.forEach((notify) => notify());
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={flip}
      aria-label={
        theme === null
          ? "Switch color theme"
          : theme === "dark"
            ? "Switch to the light theme"
            : "Switch to the dark theme"
      }
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="4.5" className={styles.sunCore} />
        <g className={styles.rays}>
          <line x1="10" y1="1.5" x2="10" y2="3.5" />
          <line x1="10" y1="16.5" x2="10" y2="18.5" />
          <line x1="1.5" y1="10" x2="3.5" y2="10" />
          <line x1="16.5" y1="10" x2="18.5" y2="10" />
          <line x1="4" y1="4" x2="5.4" y2="5.4" />
          <line x1="14.6" y1="14.6" x2="16" y2="16" />
          <line x1="16" y1="4" x2="14.6" y2="5.4" />
          <line x1="5.4" y1="14.6" x2="4" y2="16" />
        </g>
        <path
          className={styles.moon}
          d="M15.5 11.6a6 6 0 1 1-7.1-7.1 4.8 4.8 0 1 0 7.1 7.1Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </button>
  );
}
