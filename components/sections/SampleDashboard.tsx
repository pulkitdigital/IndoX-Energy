"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleDashboard } from "@/content/home";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Builds a smooth-ish SVG polyline path from values (0–100) into a 300×100 box. */
function trendPath(values: number[]): string {
  const step = 300 / (values.length - 1);
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${(100 - v).toFixed(1)}`).join(" ");
}

/** Code-built dashboard mockup with animated charts. Always labelled "Sample" — illustrative data only. */
export default function SampleDashboard() {
  const reduceMotion = useReducedMotion();
  const inView = { once: true, amount: 0.4 } as const;
  const maxUsage = Math.max(...sampleDashboard.weeklyUsage);
  const line = trendPath(sampleDashboard.trend);

  return (
    <div
      role="img"
      aria-label={`${sampleDashboard.label}: tank levels, weekly consumption, trend and alerts`}
      className="relative overflow-hidden rounded-lg border border-border bg-card shadow-card"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        <span className="font-heading text-xs text-muted-foreground">{sampleDashboard.title}</span>
        <PlaceholderBadge>Sample</PlaceholderBadge>
      </div>

      <div aria-hidden="true" className="grid gap-4 p-4 sm:grid-cols-6 sm:p-5">
        {/* Tank levels */}
        {sampleDashboard.sites.map((site, i) => (
          <div key={site.name} className="rounded-lg border border-border bg-elevated p-4 sm:col-span-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{site.name}</span>
              <span className={cn("size-1.5 rounded-full", site.level < 40 ? "bg-accent" : "bg-link")} />
            </div>
            <div className="mt-3 flex items-end gap-3">
              <div className="relative h-16 w-8 overflow-hidden rounded-lg border border-border bg-card">
                <motion.div
                  className={cn("absolute inset-x-0 bottom-0 rounded-b-[7px]", site.level < 40 ? "bg-accent" : "bg-link")}
                  initial={reduceMotion ? false : { height: "0%" }}
                  whileInView={{ height: `${site.level}%` }}
                  style={reduceMotion ? { height: `${site.level}%` } : undefined}
                  viewport={inView}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: EASE }}
                />
              </div>
              <span className="font-heading text-2xl font-semibold">
                {site.level}
                <span className="text-sm text-muted-foreground">%</span>
              </span>
            </div>
          </div>
        ))}

        {/* Weekly usage bars */}
        <div className="rounded-lg border border-border bg-elevated p-4 sm:col-span-3">
          <p className="text-xs text-muted-foreground">Weekly consumption</p>
          <div className="mt-4 flex h-28 items-end gap-2">
            {sampleDashboard.weeklyUsage.map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex h-24 w-full items-end">
                  <motion.div
                    className="w-full rounded-md bg-link"
                    initial={reduceMotion ? false : { height: "0%" }}
                    whileInView={{ height: `${(value / maxUsage) * 100}%` }}
                    style={reduceMotion ? { height: `${(value / maxUsage) * 100}%` } : undefined}
                    viewport={inView}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: EASE }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{sampleDashboard.weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend line */}
        <div className="rounded-lg border border-border bg-elevated p-4 sm:col-span-3">
          <p className="text-xs text-muted-foreground">Efficiency trend</p>
          <svg viewBox="0 0 300 100" className="mt-4 h-28 w-full overflow-visible" preserveAspectRatio="none">
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--border-strong)" strokeDasharray="3 5" />
            ))}
            <motion.path
              d={`${line} L300 100 L0 100 Z`}
              fill="var(--accent-soft)"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inView}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
            />
          </svg>
        </div>

        {/* Alerts */}
        <div className="rounded-lg border border-border bg-elevated p-4 sm:col-span-6">
          <p className="text-xs text-muted-foreground">Alerts</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {sampleDashboard.alerts.map((alert, i) => (
              <motion.li
                key={alert.text}
                className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2.5 text-xs"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
              >
                {alert.tone === "warn" ? (
                  <AlertTriangle className="size-4 shrink-0 text-accent" />
                ) : (
                  <CheckCircle2 className="size-4 shrink-0 text-link" />
                )}
                {alert.text}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-border px-5 py-3 text-center text-[11px] text-muted-foreground">{sampleDashboard.label}</p>
    </div>
  );
}
