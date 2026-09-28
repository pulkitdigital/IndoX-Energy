import { z } from "zod";
import { miniQuoteForm } from "@/content/common";
import { quoteForm } from "@/content/contact";
import { newsletterCopy } from "@/content/blog-ui";

/** Indian mobile: 10 digits starting 6–9 (TRD §7). */
export const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Accepts "+91 98765 43210", "098765-43210" etc. and keeps the 10-digit number. */
export function normalizeIndianMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

const { errors } = miniQuoteForm;

/** MiniQuoteForm: Name, Phone, Requirement (pre-selected to the page), City. */
export const miniQuoteSchema = z.object({
  name: z.string().trim().min(2, errors.name).max(80, errors.name),
  phone: z.string().trim().transform(normalizeIndianMobile).pipe(z.string().regex(INDIAN_MOBILE, errors.phone)),
  requirement: z.string().trim().min(1, errors.requirement),
  city: z.string().trim().min(2, errors.city).max(80, errors.city),
});

/** What the inputs hold (raw phone). */
export type MiniQuoteInput = z.input<typeof miniQuoteSchema>;
/** What gets submitted (normalized phone). */
export type MiniQuoteValues = z.output<typeof miniQuoteSchema>;

const quoteErrors = quoteForm.errors;
const emptyToUndefined = (value: string) => (value.trim() === "" ? undefined : value.trim());

/**
 * QuoteFormFull (PRD §8.11), 2 steps. Required: solutions, volume, location (step 1); name, phone, consent (step 2).
 * Optional: product, company, email, industry, message.
 */
export const quoteFullSchema = z.object({
  // Step 1 — What do you need?
  solutions: z.array(z.string()).min(1, quoteErrors.solutions),
  product: z.string(),
  volume: z.string().min(1, quoteErrors.volume),
  location: z
    .string()
    .trim()
    .refine((value) => /^\d{6}$/.test(value) || /^[A-Za-z][A-Za-z .,'-]{1,79}$/.test(value), quoteErrors.location),
  // Step 2 — About you
  name: z.string().trim().min(2, quoteErrors.name).max(80, quoteErrors.name),
  company: z.string().trim().max(120),
  phone: z.string().trim().transform(normalizeIndianMobile).pipe(z.string().regex(INDIAN_MOBILE, quoteErrors.phone)),
  email: z
    .string()
    .transform(emptyToUndefined)
    .pipe(z.email(quoteErrors.email).optional()),
  industry: z.string(),
  message: z.string().trim().max(2000, quoteErrors.message),
  consent: z.boolean().refine((value) => value, quoteErrors.consent),
});

export type QuoteFullInput = z.input<typeof quoteFullSchema>;
export type QuoteFullValues = z.output<typeof quoteFullSchema>;

/** Fields validated before "Next" on each step. */
export const QUOTE_STEP_FIELDS: (keyof QuoteFullInput)[][] = [
  ["solutions", "product", "volume", "location"],
  ["name", "company", "phone", "email", "industry", "message", "consent"],
];

/** NewsletterForm: email only. */
export const newsletterSchema = z.object({
  email: z.string().trim().pipe(z.email(newsletterCopy.error)),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;
