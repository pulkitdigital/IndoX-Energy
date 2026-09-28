"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { company } from "@/content/company";
import { findCoverage, type CoverageArea } from "@/content/coverage";
import { ROUTES } from "@/content/navigation";
import { coverageCopy } from "@/content/home";
import { EASE_OUT } from "@/lib/motion";
import ContactLink from "@/components/ui/ContactLink";
import CtaLink from "@/components/ui/CtaLink";

const schema = z.object({
  location: z
    .string()
    .trim()
    .refine((value) => /^\d{6}$/.test(value) || /^[A-Za-z][A-Za-z .'-]{1,59}$/.test(value), coverageCopy.errorMessage),
});

type CoverageValues = z.infer<typeof schema>;
type Result = { query: string; match: CoverageArea | null };

/**
 * Client-side availability check (TRD §7). Matches city / PIN against content/coverage.ts; nothing is sent anywhere.
 * No match — or no coverage data yet — answers "Our team will confirm availability for your location" + quote link.
 */
export default function CoverageCheck() {
  const reduceMotion = useReducedMotion();
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoverageValues>({ resolver: zodResolver(schema), defaultValues: { location: "" } });

  const onSubmit = ({ location }: CoverageValues) => setResult({ query: location, match: findCoverage(location) });

  const matchText = (r: Result) =>
    r.match ? (r.match.status === "active" ? coverageCopy.matchActive : coverageCopy.matchExpanding).replace("{location}", r.match.city) : coverageCopy.noMatch;

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-7">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="coverage-location" className="label-caps text-muted-foreground">
          {coverageCopy.label}
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
            <input
              id="coverage-location"
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              placeholder={coverageCopy.placeholder}
              aria-invalid={errors.location ? "true" : "false"}
              aria-describedby={errors.location ? "coverage-error" : undefined}
              {...register("location", { onChange: () => setResult(null) })}
              className="h-12 w-full rounded-md border border-input bg-background pr-4 pl-10 text-base transition-colors outline-none placeholder:text-muted-foreground focus:border-link aria-[invalid=true]:border-destructive"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
          >
            {coverageCopy.button}
          </button>
        </div>
        {errors.location ? (
          <p id="coverage-error" role="alert" className="mt-2 text-sm text-destructive">
            {errors.location.message}
          </p>
        ) : null}
      </form>

      <div aria-live="polite">
        <AnimatePresence>
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="mt-6 border-t border-border pt-5"
            >
              <p className="flex items-start gap-2.5 font-medium">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent" />
                {matchText(result)}
              </p>
              {!result.match ? <p className="mt-2 pl-4 text-sm text-muted-foreground">{coverageCopy.noMatchBody}</p> : null}
              <div className="mt-5 flex flex-wrap gap-3 pl-4">
                <CtaLink href={ROUTES.quote} size="sm" arrow>
                  {coverageCopy.quoteLabel}
                </CtaLink>
                <ContactLink
                  kind="call"
                  location="coverage_check"
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-border-strong px-4 text-sm transition-colors hover:border-foreground"
                >
                  <Phone className="size-3.5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  {company.tollFree}
                </ContactLink>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
