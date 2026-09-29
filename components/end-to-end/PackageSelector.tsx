"use client";

import { useId, useState } from "react";
import { RotateCcw } from "lucide-react";
import { endToEnd } from "@/content/end-to-end";
import { needs, recommend, type NeedId } from "@/content/packages";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import DottedField from "@/components/decor/DottedField";
import { REVEAL } from "@/lib/motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

/**
 * "Build your package" (PRD §8.8) — client-side only; nothing is sent until the visitor clicks through to the quote
 * form. Native checkboxes (keyboard + screen reader friendly), recommendation from content/packages.ts announced via
 * aria-live, "Request a quote for this" deep-links the selected needs, Reset clears. No selection = neutral prompt.
 */
export default function PackageSelector({ index }: { index: string }) {
  const uid = useId();
  const [selected, setSelected] = useState<NeedId[]>([]);
  const copy = endToEnd.selector;
  const result = recommend(selected);
  const model = result ? endToEnd.models.items.find((m) => m.id === result.model) : undefined;

  const toggle = (id: NeedId) => setSelected((current) => (current.includes(id) ? current.filter((n) => n !== id) : [...current, id]));

  return (
    <section aria-labelledby="package-title" className="relative isolate section-y border-y border-border bg-elevated">
        <DottedField side="left" />
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="package-title" index={index} eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>

        <div className="grid gap-4 lg:col-span-7">
          <fieldset className="rounded-lg border border-border bg-card p-5 sm:p-6">
            <legend className="label-caps px-1 text-muted-foreground">{copy.legend}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {needs.map((need, i) => (
                <ScrollReveal key={need.id} delay={i * REVEAL.stagger} y={14}>
                <label
                  htmlFor={`${uid}-${need.id}`}
                  className="hv-chip flex h-full cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3.5 py-3 text-[0.9375rem] font-medium has-[:checked]:border-accent has-[:checked]:bg-[var(--row-hover)]"
                >
                  <input
                    id={`${uid}-${need.id}`}
                    type="checkbox"
                    checked={selected.includes(need.id)}
                    onChange={() => toggle(need.id)}
                    className="size-4 shrink-0 accent-[var(--accent)]"
                  />
                  {need.label}
                </label>
                </ScrollReveal>
              ))}
            </div>
          </fieldset>

          <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
            {/* Screen readers hear the result change; the visible card below says the same thing. */}
            <p className="sr-only" aria-live="polite">
              {model && result ? `${copy.announce(model.name)} ${result.reason}` : copy.announceEmpty}
            </p>

            {model && result ? (
              <div>
                <p className="label-caps text-muted-foreground">{copy.recommendedLabel}</p>
                <div className="mt-3 flex items-start gap-4">
                  <Icon name={model.icon} className="mt-1 size-7 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-2xl">{model.name}</h3>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed">{result.reason}</p>
                    <p className="mt-2 text-[0.9375rem] text-muted-foreground">
                      <span className="font-medium text-foreground">{copy.includesLabel}:</span> {model.summary}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">{copy.prompt}</p>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
              {result ? (
                <CtaLink href={result.href} size="md" arrow className="w-full sm:w-auto">
                  {copy.request}
                </CtaLink>
              ) : null}
              <button
                type="button"
                onClick={() => setSelected([])}
                disabled={selected.length === 0}
                className="hv-btn-line inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-strong px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {copy.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
