"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { miniQuoteForm, requirementOptions } from "@/content/common";
import { ROUTES } from "@/content/navigation";
import { miniQuoteSchema, type MiniQuoteInput, type MiniQuoteValues } from "@/components/forms/schemas";
import { submitForm } from "@/components/forms/submitForm";
import SubmitFailure from "@/components/forms/SubmitFailure";
import { FIELD_CLASS } from "@/components/forms/fieldStyles";
import Eyebrow from "@/components/ui/Eyebrow";

type MiniQuoteFormProps = {
  /** Pre-selected Requirement — the current page's product / service name. */
  requirement: string;
  /** Anchor id so an "Enquire" button can jump here. */
  id?: string;
  /** Heading; defaults to the product wording in content/common.ts. Service pages pass their own. */
  title?: string;
  className?: string;
};

const FIELD = FIELD_CLASS;

/**
 * 4-field quote form for product, service and EV pages (PRD §7): Name, Phone, Requirement (pre-selected), City.
 * zod validation with inline errors; submits only through submitForm(). Success → /thank-you/. Failure → inline
 * alert with call + WhatsApp fallback; react-hook-form keeps every value, so nothing typed is lost.
 */
export default function MiniQuoteForm({ requirement, id, title = miniQuoteForm.title, className }: MiniQuoteFormProps) {
  const router = useRouter();
  const uid = useId();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [failed, setFailed] = useState(false);
  const options = requirementOptions.includes(requirement) ? requirementOptions : [requirement, ...requirementOptions];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MiniQuoteInput, unknown, MiniQuoteValues>({
    resolver: zodResolver(miniQuoteSchema),
    defaultValues: { name: "", phone: "", requirement, city: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: MiniQuoteValues) => {
    setFailed(false);
    const result = await submitForm({
      form: "mini_quote",
      subject: `Quote enquiry: ${values.requirement} (${values.city})`,
      fields: { Name: values.name, Phone: values.phone, Requirement: values.requirement, City: values.city },
      requirement: values.requirement,
      honeypot: honeypotRef.current?.value,
      summary: { name: values.name, city: values.city, topics: [values.requirement] },
    });
    if (result.ok) router.push(ROUTES.thankYou);
    else setFailed(true);
  };

  const { fields } = miniQuoteForm;
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;
  const describe = (name: keyof MiniQuoteInput) => (errors[name] ? { "aria-invalid": true, "aria-describedby": errorId(name) } : {});
  const error = (name: keyof MiniQuoteInput) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-1.5 text-sm text-destructive">
        {errors[name]?.message}
      </p>
    ) : null;

  return (
    <div id={id} className={cn("scroll-mt-28 rounded-lg border border-border bg-card p-5 sm:p-7", className)}>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Eyebrow label={miniQuoteForm.eyebrow} />
          <h2 className="mt-4 text-xl sm:text-2xl">{title}</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{miniQuoteForm.description}</p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative lg:col-span-8" aria-label={title}>
          {/* Honeypot: off-screen, skipped by keyboard and screen readers; bots that fill it are dropped in submitForm. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={fieldId("company-url")}>Leave this empty</label>
            <input ref={honeypotRef} id={fieldId("company-url")} name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={fieldId("name")} className="mb-1.5 block text-sm font-medium">
                {fields.name.label}
              </label>
              <input id={fieldId("name")} type="text" autoComplete="name" placeholder={fields.name.placeholder} className={FIELD} {...describe("name")} {...register("name")} />
              {error("name")}
            </div>
            <div>
              <label htmlFor={fieldId("phone")} className="mb-1.5 block text-sm font-medium">
                {fields.phone.label}
              </label>
              <input
                id={fieldId("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={fields.phone.placeholder}
                className={FIELD}
                {...describe("phone")}
                {...register("phone")}
              />
              {error("phone")}
            </div>
            <div>
              <label htmlFor={fieldId("requirement")} className="mb-1.5 block text-sm font-medium">
                {fields.requirement.label}
              </label>
              <select id={fieldId("requirement")} className={cn(FIELD, "pr-8")} {...describe("requirement")} {...register("requirement")}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {error("requirement")}
            </div>
            <div>
              <label htmlFor={fieldId("city")} className="mb-1.5 block text-sm font-medium">
                {fields.city.label}
              </label>
              <input id={fieldId("city")} type="text" autoComplete="address-level2" placeholder={fields.city.placeholder} className={FIELD} {...describe("city")} {...register("city")} />
              {error("city")}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{miniQuoteForm.note}</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="hv-btn inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
            >
              {isSubmitting ? miniQuoteForm.sending : miniQuoteForm.submit}
              {isSubmitting ? null : <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />}
            </button>
          </div>

          {failed ? <SubmitFailure location="mini_quote_error" /> : null}
        </form>
      </div>
    </div>
  );
}
