import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  COMPANY,
  COMPLIANCE_LINE,
  CONTACT,
  FOOTER_COMPANY_LINKS,
  LEGAL_LINKS,
  productHref,
  serviceHref,
  whatsappHref,
  hasWhatsApp,
} from "@/lib/constants";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { brandBlurb, megaMenu } from "@/content/common";
import Logo from "@/components/layout/Logo";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";
import FooterColumn from "@/components/layout/FooterColumn";
import FooterTruck from "@/components/animations/FooterTruck";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-elevated pb-20 lg:pb-0">
      <FooterTruck />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{brandBlurb}</p>
          <p className="mt-4 font-heading text-sm font-medium text-link">{COMPANY.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <FooterColumn
            title={megaMenu.products.title}
            links={[
              ...products.map((product) => ({ label: product.shortName, href: productHref(product.slug) })),
              { label: megaMenu.products.viewAll, href: megaMenu.products.href },
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <FooterColumn
            title={megaMenu.services.title}
            links={[
              ...services.map((service) => ({ label: service.shortName, href: serviceHref(service.slug) })),
              { label: megaMenu.services.viewAll, href: megaMenu.services.href },
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <FooterColumn title="Company" links={FOOTER_COMPANY_LINKS} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-wide">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li>
              <a href={CONTACT.tollFreeHref} className="flex items-start gap-2.5 transition-colors hover:text-foreground">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-xs">Toll-free</span>
                  <span className="text-foreground">{CONTACT.tollFree}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="flex items-start gap-2.5 break-all transition-colors hover:text-foreground">
                <Mail className="mt-0.5 size-4 shrink-0 text-link" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref()}
                {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-start gap-2.5 transition-colors hover:text-foreground"
              >
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                WhatsApp
              </a>
              {!hasWhatsApp ? <PlaceholderBadge className="mt-2 ml-6.5">Number pending</PlaceholderBadge> : null}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {COMPANY.address ?? <PlaceholderBadge>Address pending</PlaceholderBadge>}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {year} {COMPANY.legalName}
            </span>
            <span className="flex items-center gap-1.5">
              CIN: {COMPANY.cin ?? <PlaceholderBadge>To be added</PlaceholderBadge>}
            </span>
            <span className="flex items-center gap-1.5">
              GSTIN: {COMPANY.gstin ?? <PlaceholderBadge>To be added</PlaceholderBadge>}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="container-x pb-6 text-xs text-muted-foreground/80">{COMPLIANCE_LINE}</p>
      </div>
    </footer>
  );
}
