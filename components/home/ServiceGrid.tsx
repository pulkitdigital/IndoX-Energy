import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { megaMenus, serviceHref } from "@/content/navigation";
import { servicesIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";
import DottedField from "@/components/decor/DottedField";
import { REVEAL } from "@/lib/motion";

/**
 * Services — a ruled list of 7 rows (number · name + group · one line · icon · arrow), not cards. Sticky heading left.
 * Hover / focus (hv-row): the row background shifts, the number turns accent, a preview icon fades in on the right
 * and the arrow slides in. On touch the arrow is always visible, so every row still reads as a link.
 */
export default function ServiceGrid() {
  return (
    <section aria-labelledby="services-title" className="relative isolate section-y">
        <DottedField side="right" />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="services-title" {...servicesIntro} />
            <ScrollReveal className="mt-8">
              <CtaLink href={megaMenus.services.href} variant="outline" arrow>
                {megaMenus.services.viewAll}
              </CtaLink>
            </ScrollReveal>
          </div>
        </div>

        <ol className="border-t border-border-strong lg:col-span-8">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ScrollReveal delay={i * REVEAL.stagger} y={12}>
                <Link
                  href={serviceHref(service.slug)}
                  className="hv-row grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 gap-y-1 border-b border-border px-1 py-5 sm:grid-cols-[2.75rem_minmax(0,5fr)_minmax(0,6fr)_auto] sm:items-center sm:gap-x-6 sm:px-3 sm:py-6"
                >
                  <span className="hv-accent label-caps pt-1 text-muted-foreground sm:pt-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-heading text-lg leading-snug font-bold">{service.name}</span>
                    <span className="label-caps mt-1 block text-muted-foreground">{service.group}</span>
                  </span>
                  <span className="col-start-2 text-[0.9375rem] leading-relaxed text-muted-foreground sm:col-start-auto">{service.promise}</span>
                  <span className="col-start-3 row-start-1 flex items-center gap-3 pt-1 sm:col-start-auto sm:row-start-auto sm:pt-0">
                    <Icon name={service.icon} className="hv-fade-in hv-fine-only size-5 text-accent" />
                    <ArrowRight className="hv-arrow-in hv-fine-only size-5 text-link" strokeWidth={1.5} aria-hidden="true" />
                    <ArrowRight className="hv-touch-only size-5 text-link" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
