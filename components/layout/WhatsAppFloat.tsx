import { MessageCircle } from "lucide-react";
import ContactLink from "@/components/ui/ContactLink";

/** Floating WhatsApp button, desktop only (mobile uses MobileActionBar). Pre-filled quote message (PRD §7). Hover: scale 1.06 + one ring pulse. */
export default function WhatsAppFloat() {
  return (
    <ContactLink
      kind="whatsapp"
      location="float"
      aria-label="Chat with IndoX Energy on WhatsApp"
      title="Chat on WhatsApp"
      className="hv-float fixed right-6 bottom-6 z-40 hidden size-13 place-items-center rounded-md border border-border bg-surface text-foreground shadow-subtle lg:grid"
    >
      <MessageCircle className="size-5.5 text-accent" strokeWidth={1.5} aria-hidden="true" />
    </ContactLink>
  );
}
