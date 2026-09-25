"use client";

import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { CONTACT, ROUTES, hasWhatsApp, whatsappHref } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/** Sticky bottom bar on small screens: Call · WhatsApp · Get a Quote (PRD §5). */
export default function MobileActionBar() {
  const itemClass = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors";

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="flex items-stretch">
        <a href={CONTACT.tollFreeHref} onClick={() => trackEvent("call_click", { location: "action_bar" })} className={itemClass}>
          <Phone className="size-5 text-accent" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappHref()}
          onClick={() => trackEvent("whatsapp_click", { location: "action_bar" })}
          {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={itemClass}
        >
          <MessageCircle className="size-5 text-accent" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          href={ROUTES.contact}
          onClick={() => trackEvent("quote_cta_click", { location: "action_bar" })}
          className="m-1.5 flex flex-[1.3] items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground"
        >
          <FileText className="size-4" aria-hidden="true" />
          Get a Quote
        </Link>
      </div>
    </nav>
  );
}
