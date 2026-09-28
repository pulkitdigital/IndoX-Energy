"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MQ } from "@/lib/motion";
import { industryOptions, productOptions, quoteForm as copy, solutionOptions, volumeOptions } from "@/content/contact";
import { QUOTE_FORM_ID, QUOTE_PARAMS, ROUTES } from "@/content/navigation";
import { products } from "@/content/products";
import { QUOTE_STEP_FIELDS, quoteFullSchema, type QuoteFullInput, type QuoteFullValues } from "@/components/forms/schemas";
import { submitForm } from "@/components/forms/submitForm";
import SubmitFailure from "@/components/forms/SubmitFailure";
import { ERROR_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/forms/fieldStyles";
import { useLenis } from "@/components/animations/SmoothScrollProvider";
import Eyebrow from "@/components/ui/Eyebrow";

const labelOf = (options: { value: string; label: string }[], value: string) => options.find((o) => o.value === value)?.label ?? value;

/**
 * 2-step quote form on /contact/ (PRD §8.11, TRD §7).
 * Step 1: solution/service (multi), product, monthly volume, city/PIN. Step 2: name, company, phone, email, industry,
 * message, consent. Each step validates before moving on; Back keeps every value; focus moves to the step heading.
 * Deep links: ?service=<slug>&product=<slug> pre-select step 1 (a product also ticks its related service).
 * Landing on #quote-form scrolls it into view (Lenis when active, instant under reduced motion).
 * Submits only through submitForm(); success → /thank-you/, failure → call / WhatsApp fallback with input kept.
 */
export default function QuoteFormFull() {
  const router = useRouter();
  const lenis = useLenis();
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const scrolledRef = useRef(false);
  const movedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFullInput, unknown, QuoteFullValues>({
    resolver: zodResolver(quoteFullSchema),
    mode: "onTouched",
    defaultValues: {
      solutions: [],
      product: "",
      volume: "",
      location: "",
      name: "",
      company: "",
      phone: "",
      email: "",
      industry: "",
      message: "",
      consent: false,
    },
  });

  // Pre-select from ?service= / ?product= (read after mount: static export, no server search params).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get(QUOTE_PARAMS.product) ?? "";
    const requested = (params.get(QUOTE_PARAMS.service) ?? "").split(",").filter(Boolean);
    const validProduct = productOptions.some((o) => o.value === product) ? product : "";
    const related = products.find((p) => p.slug === validProduct)?.relatedServiceSlug;
    const solutions = [...new Set([...requested, ...(related ? [related] : [])])].filter((value) => solutionOptions.some((o) => o.value === value));
    if (validProduct) setValue("product", validProduct);
    if (solutions.length) setValue("solutions", solutions);
  }, [setValue]);

  // Landing on /contact/#quote-form: bring the form into view once (wait for Lenis unless reduced motion).
  useEffect(() => {
    if (scrolledRef.current || window.location.hash !== `#${QUOTE_FORM_ID}` || !rootRef.current) return;
    const reduced = window.matchMedia(MQ.reduced).matches;
    if (!reduced && !lenis) return;
    scrolledRef.current = true;
    const offset = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    if (lenis) lenis.scrollTo(rootRef.current, { offset: -offset - 16 });
    else rootRef.current.scrollIntoView({ behavior: "auto", block: "start" });
  }, [lenis]);

  // Move focus to the step heading after Next / Back (not on first render).
  useEffect(() => {
    if (movedRef.current) headingRef.current?.focus();
  }, [step]);

  const goTo = (next: number) => {
    movedRef.current = true;
    setFailed(false);
    setStep(next);
  };

  const onNext = async (event?: FormEvent) => {
    event?.preventDefault();
    if (await trigger(QUOTE_STEP_FIELDS[0], { shouldFocus: true })) goTo(1);
  };

  const onSubmit = async (values: QuoteFullValues) => {
    setFailed(false);
    const solutionLabels = values.solutions.map((value) => labelOf(solutionOptions, value));
    const productLabel = values.product ? labelOf(productOptions, values.product) : "";
    const result = await submitForm({
      form: "quote_full",
      subject: `Quote request: ${solutionLabels.join(", ")} (${values.location})`,
      fields: {
        "Solution / service": solutionLabels.join(", "),
        Product: productLabel || "-",
        "Monthly volume (litres)": values.volume,
        "Delivery city / PIN": values.location,
        Name: values.name,
        Company: values.company || "-",
        Phone: values.phone,
        Email: values.email ?? "-",
        Industry: values.industry || "-",
        Message: values.message || "-",
        Consent: "Yes",
      },
      requirement: solutionLabels.join(", ") || productLabel,
      honeypot: honeypotRef.current?.value,
      summary: { name: values.name, city: values.location, topics: [...values.solutions, values.product].filter(Boolean) },
    });
    if (result.ok) router.push(ROUTES.thankYou);
    else setFailed(true);
  };

  const id = (name: string) => `${uid}-${name}`;
  const errorId = (name: keyof QuoteFullInput) => `${uid}-${name}-error`;
  const aria = (name: keyof QuoteFullInput) => (errors[name] ? { "aria-invalid": true, "aria-describedby": errorId(name) } : {});
  const error = (name: keyof QuoteFullInput) =>
    errors[name] ? (
      <p id={errorId(name)} className={ERROR_CLASS}>
        {errors[name]?.message}
      </p>
    ) : null;
  const optional = <span className="font-normal text-muted-foreground"> {copy.optional}</span>;
  const field = (name: keyof QuoteFullInput, label: ReactNode, control: ReactNode, isOptional = false) => (
    <div>
      <label htmlFor={id(name)} className={LABEL_CLASS}>
        {label}
        {isOptional ? optional : null}
      </label>
      {control}
      {error(name)}
    </div>
  );
  const { fields } = copy;

  return (
    <div id={QUOTE_FORM_ID} ref={rootRef} className="scroll-mt-28 rounded-lg border border-border bg-card p-5 sm:p-8">
      <Eyebrow index={copy.index} label={copy.eyebrow} />
      <h2 className="mt-4 text-2xl sm:text-3xl">{copy.title}</h2>

      {/* Step progress */}
      <ol className="mt-6 grid grid-cols-2 gap-3" aria-label={copy.stepOf(step + 1, copy.steps.length)}>
        {copy.steps.map((label, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={label} aria-current={state === "current" ? "step" : undefined}>
              <span className={cn("block h-1 rounded-xs", state === "todo" ? "bg-border-strong" : "bg-accent")} aria-hidden="true" />
              <span className={cn("mt-2 flex items-center gap-1.5 text-sm", state === "todo" ? "text-muted-foreground" : "font-medium text-foreground")}>
                {state === "done" ? <Check className="size-3.5 text-accent" strokeWidth={2} aria-hidden="true" /> : null}
                <span className="label-caps">{String(i + 1).padStart(2, "0")}</span> {label}
              </span>
            </li>
          );
        })}
      </ol>

      <form noValidate onSubmit={step === 0 ? onNext : handleSubmit(onSubmit)} className="relative mt-8" aria-label={copy.title}>
        {/* Honeypot: off-screen, skipped by keyboard and screen readers; bots that fill it are dropped in submitForm. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("company-url")}>Leave this empty</label>
          <input ref={honeypotRef} id={id("company-url")} name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <h3 ref={headingRef} tabIndex={-1} className="text-lg outline-none">
          <span className="label-caps mr-2 text-muted-foreground">{copy.stepOf(step + 1, copy.steps.length)}</span>
          {copy.steps[step]}
        </h3>

        {step === 0 ? (
          <div className="mt-5 grid gap-5">
            <fieldset aria-describedby={errors.solutions ? errorId("solutions") : `${uid}-solutions-hint`}>
              <legend className={LABEL_CLASS}>{fields.solutions.label}</legend>
              <p id={`${uid}-solutions-hint`} className="-mt-1 mb-3 text-sm text-muted-foreground">
                {fields.solutions.hint}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {solutionOptions.map((option) => (
                  <label
                    key={option.value}
                    className="hv-chip flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background px-3 py-2.5 text-[0.9375rem] has-[:checked]:border-accent"
                  >
                    <input type="checkbox" value={option.value} className="mt-1 size-4 shrink-0 accent-[var(--accent)]" {...register("solutions")} />
                    {option.label}
                  </label>
                ))}
              </div>
              {error("solutions")}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              {field(
                "product",
                fields.product.label,
                <select id={id("product")} className={cn(FIELD_CLASS, "pr-8")} {...aria("product")} {...register("product")}>
                  <option value="">{fields.product.placeholder}</option>
                  {productOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>,
                true,
              )}
              {field(
                "volume",
                fields.volume.label,
                <select id={id("volume")} className={cn(FIELD_CLASS, "pr-8")} {...aria("volume")} {...register("volume")}>
                  <option value="">{fields.volume.placeholder}</option>
                  {volumeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>,
              )}
            </div>

            {field(
              "location",
              fields.location.label,
              <input
                id={id("location")}
                type="text"
                autoComplete="postal-code"
                placeholder={fields.location.placeholder}
                className={FIELD_CLASS}
                {...aria("location")}
                {...register("location")}
              />,
            )}
          </div>
        ) : (
          <div className="mt-5 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {field(
                "name",
                fields.name.label,
                <input id={id("name")} type="text" autoComplete="name" placeholder={fields.name.placeholder} className={FIELD_CLASS} {...aria("name")} {...register("name")} />,
              )}
              {field(
                "company",
                fields.company.label,
                <input
                  id={id("company")}
                  type="text"
                  autoComplete="organization"
                  placeholder={fields.company.placeholder}
                  className={FIELD_CLASS}
                  {...aria("company")}
                  {...register("company")}
                />,
                true,
              )}
              {field(
                "phone",
                fields.phone.label,
                <input
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder={fields.phone.placeholder}
                  className={FIELD_CLASS}
                  {...aria("phone")}
                  {...register("phone")}
                />,
              )}
              {field(
                "email",
                fields.email.label,
                <input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={fields.email.placeholder}
                  className={FIELD_CLASS}
                  {...aria("email")}
                  {...register("email")}
                />,
                true,
              )}
            </div>
            {field(
              "industry",
              fields.industry.label,
              <select id={id("industry")} className={cn(FIELD_CLASS, "pr-8")} {...aria("industry")} {...register("industry")}>
                <option value="">{fields.industry.placeholder}</option>
                {industryOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>,
              true,
            )}
            {field(
              "message",
              fields.message.label,
              <textarea
                id={id("message")}
                rows={4}
                placeholder={fields.message.placeholder}
                className={cn(FIELD_CLASS, "h-auto py-2.5")}
                {...aria("message")}
                {...register("message")}
              />,
              true,
            )}
            <div>
              <label className="flex items-start gap-3 text-[0.9375rem]">
                <input type="checkbox" className="mt-1 size-4 shrink-0 accent-[var(--accent)]" {...aria("consent")} {...register("consent")} />
                <span>
                  {fields.consent.before}{" "}
                  <Link href={ROUTES.privacy} className="hv-text-link text-link">
                    {fields.consent.link}
                  </Link>
                  {fields.consent.after}
                </span>
              </label>
              {error("consent")}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step === 1 ? (
            <button
              type="button"
              onClick={() => goTo(0)}
              className="hv-btn-line inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-strong px-5 text-sm font-semibold"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
              {copy.back}
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="hv-btn inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-70"
          >
            {step === 0 ? copy.next : isSubmitting ? copy.sending : copy.submit}
            {isSubmitting ? null : <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>

        {failed ? <SubmitFailure location="quote_full_error" /> : null}
      </form>
    </div>
  );
}
