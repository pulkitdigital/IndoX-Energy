"use client";

import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsletterCopy as copy } from "@/content/blog-ui";
import { newsletterSchema, type NewsletterValues } from "@/components/forms/schemas";
import { submitForm } from "@/components/forms/submitForm";
import { ERROR_CLASS, FIELD_CLASS } from "@/components/forms/fieldStyles";

/**
 * Newsletter signup (TRD §7): email only, zod validation, submitted through submitForm() as form "newsletter"
 * (no lead conversion is fired for it). Inline success; inline failure keeps the typed email.
 */
export default function NewsletterForm({ className }: { className?: string }) {
  const uid = useId();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  const onSubmit = async ({ email }: NewsletterValues) => {
    setState("idle");
    const result = await submitForm({ form: "newsletter", subject: "Newsletter signup", fields: { Email: email }, honeypot: honeypotRef.current?.value });
    setState(result.ok ? "done" : "failed");
  };

  if (state === "done") {
    return (
      <p role="status" className={cn("flex items-center gap-2 rounded-md border border-accent bg-card px-4 py-3 font-medium", className)}>
        <Check className="size-4 text-accent" strokeWidth={2} aria-hidden="true" />
        {copy.success}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={cn("relative", className)} aria-label={copy.title}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Leave this empty</label>
        <input ref={honeypotRef} id={`${uid}-hp`} name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium">
        {copy.label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${uid}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.placeholder}
          className={FIELD_CLASS}
          {...(errors.email ? { "aria-invalid": true, "aria-describedby": `${uid}-email-error` } : {})}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="hv-btn inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
        >
          {isSubmitting ? copy.sending : copy.submit}
          {isSubmitting ? null : <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>
      {errors.email ? (
        <p id={`${uid}-email-error`} className={ERROR_CLASS}>
          {errors.email.message}
        </p>
      ) : null}
      {state === "failed" ? (
        <p role="alert" className={ERROR_CLASS}>
          {copy.failure}
        </p>
      ) : null}
    </form>
  );
}
