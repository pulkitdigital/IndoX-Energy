import type { Metadata } from "next";
import { notFoundPage } from "@/content/common";
import { ROUTES } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CtaLink from "@/components/ui/CtaLink";
import Eyebrow from "@/components/ui/Eyebrow";
import EmptyGauge from "@/components/layout/EmptyGauge";

// No canonical: this page is served at whatever URL was missing. Next adds noindex to not-found responses.
export const metadata: Metadata = {
  title: { absolute: notFoundPage.seo.title },
  description: notFoundPage.seo.description,
};

/** 404 (PRD §8.14): static export writes this as out/404.html; public/.htaccess points ErrorDocument 404 at it. */
export default function NotFound() {
  const links = [
    { label: "Home", href: ROUTES.home },
    { label: "Products", href: ROUTES.products },
    { label: "Services", href: ROUTES.services },
    { label: "Contact", href: ROUTES.contact },
  ];
  return (
    <section aria-labelledby="not-found-title" className="pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-7">
          <Eyebrow index="404" label={notFoundPage.eyebrow} />
          <h1 id="not-found-title" className="text-display mt-6">
            {notFoundPage.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">{notFoundPage.text}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <li key={link.href}>
                <CtaLink href={link.href} variant={i === 0 ? "primary" : "outline"} arrow>
                  {link.label}
                </CtaLink>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <EmptyGauge />
        </div>
      </div>
    </section>
  );
}
