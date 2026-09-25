import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref } from "@/lib/constants";
import { services as allServices, type Service } from "@/content/services";
import { megaMenu } from "@/content/common";
import { servicesIntro, type SectionIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";

type ServiceGridProps = {
  services?: Service[];
  intro?: SectionIntro;
  showViewAll?: boolean;
};

/**
 * Services as a numbered spec list (not cards): sticky heading on the left, divided rows on the right.
 * Hover: row tint, name turns --link, arrow slides in.
 */
export default function ServiceGrid({ services = allServices, intro = servicesIntro, showViewAll = true }: ServiceGridProps) {
  return (
    <section aria-labelledby="services-title" className="section-y border-t border-border bg-elevated">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="services-title" {...intro} />
            {showViewAll ? (
              <ScrollReveal className="mt-8">
                <CtaLink href={megaMenu.services.href} variant="outline" arrow>
                  {megaMenu.services.viewAll}
                </CtaLink>
              </ScrollReveal>
            ) : null}
          </div>
        </div>

        <ol className="border-t border-border lg:col-span-8">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-border">
              <ScrollReveal delay={i * 0.04} y={12}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 px-1 py-6 transition-colors duration-300 hover:bg-surface-hover sm:grid-cols-[3rem_auto_1fr_auto] sm:px-3"
                >
                  <span className="hidden font-mono text-xs tracking-[0.14em] text-muted-foreground sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-10 place-items-center rounded-md border border-border bg-card text-accent transition-colors duration-300 group-hover:border-accent">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-lg font-bold transition-colors duration-300 group-hover:text-link sm:text-xl">{service.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{service.oneLiner}</span>
                  </span>
                  <ArrowRight
                    className="size-5 -translate-x-2 text-link opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
