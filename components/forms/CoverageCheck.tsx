"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { CONTACT, ROUTES } from "@/lib/constants";
import { coverageCheck } from "@/content/home";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "@/components/ui/CtaLink";

const schema = z.object({
  location: z
    .string()
    .trim()
    .refine((value) => /^\d{6}$/.test(value) || /^[A-Za-z][A-Za-z .'-]{1,59}$/.test(value), coverageCheck.errorMessage),
});

type CoverageValues = z.infer<typeof schema>;

/**
 * Client-only availability check. Nothing is submitted anywhere — coverage isn't confirmed yet,
 * so every entry gets the "our team will confirm" response plus a route to quote / call.
 */
export default function CoverageCheck() {
  const reduceMotion = useReducedMotion();
  const [checked, setChecked] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoverageValues>({ resolver: zodResolver(schema), defaultValues: { location: "" } });

  const onSubmit = ({ location }: CoverageValues) => setChecked(location);

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="coverage-location" className="text-sm font-medium">
          {coverageCheck.label}
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="coverage-location"
              type="text"
              autoComplete="postal-code"
              placeholder={coverageCheck.placeholder}
              aria-invalid={errors.location ? "true" : "false"}
              aria-describedby={errors.location ? "coverage-error" : undefined}
              {...register("location", { onChange: () => setChecked(null) })}
              className="h-12 w-full rounded-md border border-input bg-background pr-4 pl-11 text-base transition-colors outline-none placeholder:text-muted-foreground focus:border-link focus-visible:outline-none aria-[invalid=true]:border-destructive"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-transform duration-300 hover:-translate-y-0.5"
          >
            {coverageCheck.button}
          </button>
        </div>
        {errors.location ? (
          <p id="coverage-error" role="alert" className="mt-2 pl-4 text-sm text-destructive">
            {errors.location.message}
          </p>
        ) : null}
      </form>

      <div aria-live="polite">
        <AnimatePresence>
          {checked ? (
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-lg border border-border bg-accent-soft p-5"
            >
              <p className="flex items-center gap-2 font-heading font-semibold">
                <CheckCircle2 className="size-5 text-accent" aria-hidden="true" />
                {coverageCheck.successTitle}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{coverageCheck.successBody.replace("{location}", checked)}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <CtaLink href={ROUTES.contact} size="sm" arrow track="quote_cta_click">
                  Get a Quote
                </CtaLink>
                <a
                  href={CONTACT.tollFreeHref}
                  onClick={() => trackEvent("call_click", { location: "coverage_check" })}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-border-strong bg-surface px-4 text-sm hover:border-link"
                >
                  <Phone className="size-3.5 text-accent" aria-hidden="true" />
                  {CONTACT.tollFree}
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
