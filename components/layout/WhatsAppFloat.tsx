"use client";

import { MessageCircle } from "lucide-react";
import { hasWhatsApp, whatsappHref } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/** Floating WhatsApp button, desktop only (mobile uses MobileActionBar). Pre-filled quote message. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref()}
      onClick={() => trackEvent("whatsapp_click", { location: "float" })}
      {...(hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Chat with IndoX Energy on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-lg bg-accent text-accent-foreground shadow-card transition-transform duration-300 hover:-translate-y-0.5 lg:grid"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
