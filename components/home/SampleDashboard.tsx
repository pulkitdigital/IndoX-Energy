"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { sampleDashboard } from "@/content/home";

type Grow = { value: number; delay: number; duration: number };

/** Bars / tank fills: collapsed to scaleY(0) until the dashboard enters the viewport, then grow to their value. */
const growVariants: Variants = {
  hidden: { scaleY: 0 },
  shown: ({ value, delay, duration }: Grow) => ({ scaleY: value, transition: { duration, delay, ease: EASE_OUT } }),
};

/**
 * Code-built dashboard mockup. Always labelled "Sample data" (PRD §9 rule 5) — illustrative values only.
 * Bars and tank fills grow with scaleY from the bottom (transform only).
 *
 * The in-view trigger lives on the (never transformed) dashboard root and reaches the bars through variants.
 * Observing each bar itself does not work: at scaleY(0) its box has zero height (and the tank fills are clipped by
 * their overflow-hidden tube), so IntersectionObserver never reports it as visible and the bars stay at 0.
 */
export default function SampleDashboard() {
  const reduceMotion = useReducedMotion();
  const maxUsage = Math.max(...sampleDashboard.weeklyUsage);
  const grow = (value: number, delay: number, duration = 1) =>
    reduceMotion ? { style: { scaleY: value } } : { variants: growVariants, custom: { value, delay, duration } satisfies Grow };

  return (
    <motion.div
      role="img"
      aria-label="Sample data dashboard mockup: tank levels by site, weekly consumption and alerts. Illustrative only."
      className="overflow-hidden rounded-lg border border-border bg-card"
      {...(reduceMotion ? {} : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.3 } })}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
        <span className="font-heading text-base font-bold">{sampleDashboard.title}</span>
        <span className="label-caps rounded-xs border border-dashed border-border-strong px-2 py-0.5 text-foreground">{sampleDashboard.label}</span>
      </div>

      <div aria-hidden="true" className="grid gap-px bg-border sm:grid-cols-6">
        {sampleDashboard.sites.map((site, i) => {
          const low = site.level < 40;
          return (
            <div key={site.name} className="bg-card p-5 sm:col-span-2">
              <div className="label-caps flex items-center justify-between text-muted-foreground">
                <span>{site.name}</span>
                <span>{low ? "Low" : "OK"}</span>
              </div>
              <div className="mt-4 flex items-end gap-4">
                <div className="relative h-20 w-9 overflow-hidden rounded-sm border border-border-strong">
                  <motion.div className={cn("absolute inset-0 origin-bottom", low ? "bg-accent" : "bg-link")} {...grow(site.level / 100, 0.2 + i * 0.12, 1.3)} />
                </div>
                <span className="font-heading text-3xl leading-none font-bold">
                  {site.level}
                  <span className="text-base text-muted-foreground">%</span>
                </span>
              </div>
            </div>
          );
        })}

        <div className="bg-card p-5 sm:col-span-4">
          <p className="label-caps text-muted-foreground">Weekly consumption (L)</p>
          <div className="mt-4 flex h-28 items-end gap-2">
            {sampleDashboard.weeklyUsage.map((value, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div className="relative w-full flex-1">
                  <motion.div className="absolute inset-0 origin-bottom rounded-t-xs bg-link" {...grow(value / maxUsage, 0.3 + i * 0.06, 0.9)} />
                </div>
                <span className="label-caps text-muted-foreground">{sampleDashboard.weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-5 sm:col-span-2">
          <p className="label-caps text-muted-foreground">Alerts</p>
          <ul className="mt-4 grid gap-3">
            {sampleDashboard.alerts.map((alert) => (
              <li key={alert.text} className="flex items-start gap-2.5 text-[0.8125rem] leading-snug">
                {alert.tone === "warn" ? (
                  <AlertTriangle className="mt-px size-4 shrink-0 text-accent" strokeWidth={1.5} />
                ) : (
                  <CheckCircle2 className="mt-px size-4 shrink-0 text-link" strokeWidth={1.5} />
                )}
                {alert.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="label-caps border-t border-border px-5 py-2.5 text-muted-foreground">{sampleDashboard.note}</p>
    </motion.div>
  );
}
