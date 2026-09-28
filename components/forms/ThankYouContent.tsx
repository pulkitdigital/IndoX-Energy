"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { REVEAL } from "@/lib/motion";
import type { BlogCategory } from "@/lib/blog";
import { trackEvent } from "@/lib/analytics";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";
import { relatedCategoriesFor, thankYou as copy } from "@/content/common";
import { company } from "@/content/company";
import { CONVERSION_FIRED_KEY, LEAD_SUMMARY_KEY, type LeadSummary } from "@/components/forms/submitForm";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BlogCard, { type BlogCardPost } from "@/components/blog/BlogCard";
import ProcessStrip from "@/components/templates/ProcessStrip";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

type ThankYouPost = BlogCardPost & { key: string; category: BlogCategory };

/** How long to wait (ms, total) for gtag / fbq to load after consent before giving up on the backup conversion. */
const TRACKER_WAIT = { stepMs: 300, tries: 20 } as const;

function readSummary(): LeadSummary | null {
  try {
    const raw = sessionStorage.getItem(LEAD_SUMMARY_KEY);
    if (!raw) return null;
    const data: Partial<LeadSummary> = JSON.parse(raw);
    return {
      form: data.form ?? "mini_quote",
      requirement: typeof data.requirement === "string" ? data.requirement : "",
      name: typeof data.name === "string" ? data.name : "",
      city: typeof data.city === "string" ? data.city : "",
      topics: Array.isArray(data.topics) ? data.topics.filter((t): t is string => typeof t === "string") : [],
    };
  } catch {
    return null;
  }
}

/**
 * Backup page-level conversion (TRD §8): fires lead_submit (GA4 generate_lead, Meta Lead, Google Ads conversion)
 * once per lead, only with analytics consent, only after a real submit (a stored summary), and never again on
 * refresh (CONVERSION_FIRED_KEY; submitForm clears it for the next lead). Waits for the tags to load.
 */
function useBackupConversion(summary: LeadSummary | null) {
  useEffect(() => {
    if (!summary) return;
    let timer: number | undefined;
    const alreadyFired = () => {
      try {
        return sessionStorage.getItem(CONVERSION_FIRED_KEY) === "1";
      } catch {
        return true; // storage blocked: cannot guard against refreshes, so don't risk double counting
      }
    };
    const attempt = (triesLeft: number) => {
      if (alreadyFired() || readConsent() !== "accepted") return;
      if (!window.gtag && !window.fbq) {
        if (triesLeft > 0) timer = window.setTimeout(() => attempt(triesLeft - 1), TRACKER_WAIT.stepMs);
        return;
      }
      trackEvent("lead_submit", { form: summary.form, requirement: summary.requirement, source: "thank_you_page" });
      try {
        sessionStorage.setItem(CONVERSION_FIRED_KEY, "1");
      } catch {
        // ignore
      }
    };
    attempt(TRACKER_WAIT.tries);
    const onConsent = () => attempt(TRACKER_WAIT.tries);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
  }, [summary]);
}

/**
 * /thank-you/ body (PRD §8.12). Reads the lead summary from sessionStorage (set by submitForm): personalised
 * heading + name / requirement / city. Direct visits get the generic confirmation. Related articles: 2 posts matching
 * the requested topics, otherwise the first 2 (server passes the list; SSR shows the first 2).
 */
export default function ThankYouContent({ posts }: { posts: ThankYouPost[] }) {
  const [summary, setSummary] = useState<LeadSummary | null>(null);

  useEffect(() => {
    setSummary(readSummary());
  }, []);
  useBackupConversion(summary);

  const categories = summary ? relatedCategoriesFor(summary.topics) : [];
  const matching = posts.filter((post) => categories.includes(post.category));
  const related = [...matching, ...posts.filter((post) => !matching.includes(post))].slice(0, 2);
  const rows = summary
    ? [
        { label: copy.summaryLabels.name, value: summary.name },
        { label: copy.summaryLabels.requirement, value: summary.requirement },
        { label: copy.summaryLabels.city, value: summary.city },
      ].filter((row) => row.value)
    : [];

  return (
    <>
      <section aria-labelledby="thank-you-title" className="pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow index="00" label={copy.eyebrow} />
            <h1 id="thank-you-title" className="text-section mt-6">
              {summary?.name ? copy.titleWithName(summary.name) : copy.title}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">{copy.text}</p>

            <div className="mt-10 border-t border-border pt-8">
              <p>{copy.urgent}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <CtaLink contact={{ kind: "whatsapp", location: "thank_you", message: copy.whatsappMessage(summary?.requirement ?? "") }} size="lg">
                  <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {copy.whatsapp}
                </CtaLink>
                <CtaLink contact={{ kind: "call", location: "thank_you" }} variant="outline" size="lg">
                  <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {copy.call} {company.tollFree}
                </CtaLink>
              </div>
            </div>
          </div>

          {rows.length ? (
            <ScrollReveal className="lg:col-span-5 lg:pt-14">
              <div className="rounded-lg border border-border bg-card">
                <p className="label-caps border-b border-border px-5 py-3 text-muted-foreground">{copy.summaryTitle}</p>
                <dl>
                  {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border px-5 py-3.5 last:border-b-0">
                      <dt className="label-caps pt-0.5 text-muted-foreground">{row.label}</dt>
                      <dd className="font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-y border-y border-border bg-elevated">
        <div className="container-x">
          <SectionHeading id="next-title" index={copy.next.index} eyebrow={copy.next.eyebrow} title={copy.next.title} />
          <ScrollReveal className="mt-14">
            <ProcessStrip steps={copy.next.steps} stepLabel={copy.next.stepLabel} />
          </ScrollReveal>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-posts-title" className="section-y">
          <div className="container-x">
            <SectionHeading id="related-posts-title" index={copy.related.index} eyebrow={copy.related.eyebrow} title={copy.related.title} />
            <ul className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2">
              {related.map((post, i) => (
                <li key={post.key}>
                  <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                    <BlogCard post={post} readMore={copy.related.readMore} />
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
