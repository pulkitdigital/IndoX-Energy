"use client";

import type { ReactNode } from "react";
import { hasWhatsApp, telHref, whatsappHref } from "@/content/company";
import { trackEvent } from "@/lib/analytics";

type ContactLinkProps = {
  kind: "call" | "whatsapp";
  /** Where on the page the link sits — sent with the analytics event. */
  location: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  title?: string;
  /** Pre-filled WhatsApp message. */
  message?: string;
};

/**
 * The ONLY way to render a tel: or wa.me link. Fires call_click / whatsapp_click (TRD §8) on click.
 * WhatsApp opens in a new tab once the number is configured; until then it falls back to /contact/.
 */
export default function ContactLink({ kind, location, children, className, message, ...rest }: ContactLinkProps) {
  const isWhatsApp = kind === "whatsapp";
  return (
    <a
      href={isWhatsApp ? whatsappHref(message) : telHref}
      onClick={() => trackEvent(isWhatsApp ? "whatsapp_click" : "call_click", { location })}
      {...(isWhatsApp && hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
