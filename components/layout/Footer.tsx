import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FOOTER_LEGAL_LINE, company, hasWhatsApp, mailHref } from "@/content/company";
import { footerColumns, legalLinks } from "@/content/navigation";
import { brandBlurb } from "@/content/common";
import Logo from "@/components/layout/Logo";
import FooterColumn from "@/components/layout/FooterColumn";
import FooterTruck from "@/components/animations/FooterTruck";
import ContactLink from "@/components/ui/ContactLink";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";

/** Footer: 5 columns + bottom strip (PRD §6). No Payments link. The truck drives behind the content. */
export default function Footer() {
  const year = new Date().getFullYear();
  const [productsCol, servicesCol, companyCol] = footerColumns;

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-elevated pb-20 lg:pb-0">
      <FooterTruck />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{brandBlurb}</p>
          <p className="mt-4 font-heading text-sm font-bold text-link">{company.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <FooterColumn {...productsCol} />
        </div>
        <div className="lg:col-span-2">
          <FooterColumn {...servicesCol} />
        </div>
        <div className="lg:col-span-2">
          <FooterColumn {...companyCol} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="label-caps text-foreground">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li>
              <ContactLink kind="call" location="footer" className="hv-group flex items-start gap-2.5 transition-colors duration-200 hover:text-foreground">
                <Phone className="hv-icon mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="block text-xs">Toll-free</span>
                  <span className="text-foreground">{company.tollFree}</span>
                </span>
              </ContactLink>
            </li>
            <li>
              <a href={mailHref} className="hv-group flex items-start gap-2.5 break-all transition-colors duration-200 hover:text-foreground">
                <Mail className="hv-icon mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li>
              <ContactLink kind="whatsapp" location="footer" className="hv-group flex items-start gap-2.5 transition-colors duration-200 hover:text-foreground">
                <MessageCircle className="hv-icon mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </ContactLink>
              {!hasWhatsApp ? <PlaceholderBadge className="mt-2 ml-6.5">Number pending</PlaceholderBadge> : null}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {company.address ?? <PlaceholderBadge>Address pending</PlaceholderBadge>}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {year} {company.legalName}
            </span>
            <span className="flex items-center gap-1.5">CIN: {company.cin ?? <PlaceholderBadge>To be added</PlaceholderBadge>}</span>
            <span className="flex items-center gap-1.5">GSTIN: {company.gstin ?? <PlaceholderBadge>To be added</PlaceholderBadge>}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hv-link transition-colors duration-200 hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="container-x pb-6 text-xs text-muted-foreground">{FOOTER_LEGAL_LINE}</p>
      </div>
    </footer>
  );
}
