"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** "icon" = round icon button (header). "row" = full-width labelled row (mobile menu). */
  variant?: "icon" | "row";
};

/**
 * Light/dark switch. The theme is unknown during SSR, so the button renders a neutral,
 * same-size shell until mounted — no hydration mismatch, no layout shift.
 */
export default function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const nextLabel = isDark ? "Switch to light theme" : "Switch to dark theme";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const IconComponent = isDark ? Sun : Moon;

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={!mounted}
        aria-label={nextLabel}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3.5 text-sm transition-colors hover:border-border-strong",
          className,
        )}
      >
        <span>{mounted ? (isDark ? "Dark theme" : "Light theme") : "Theme"}</span>
        <span className="flex items-center gap-2 text-muted-foreground">
          {mounted ? <IconComponent className="size-4" aria-hidden="true" /> : <span className="size-4" />}
          {mounted ? (isDark ? "Switch to light" : "Switch to dark") : null}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!mounted}
      aria-label={nextLabel}
      title={mounted ? nextLabel : undefined}
      className={cn(
        "grid size-10 place-items-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-border-strong hover:bg-surface-hover",
        className,
      )}
    >
      {mounted ? <IconComponent className="size-4" aria-hidden="true" /> : <span className="size-4" aria-hidden="true" />}
    </button>
  );
}
