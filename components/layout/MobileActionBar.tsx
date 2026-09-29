import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { quoteCta } from "@/content/navigation";
import ContactLink from "@/components/ui/ContactLink";

/** Sticky bottom bar on small screens: Call · WhatsApp · Get a Quote (PRD §6). */
export default function MobileActionBar() {
  const itemClass = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-150 active:bg-[var(--row-hover)]";

  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-stretch divide-x divide-border">
        <ContactLink kind="call" location="action_bar" className={itemClass}>
          <Phone className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
          Call
        </ContactLink>
        <ContactLink kind="whatsapp" location="action_bar" className={itemClass}>
          <MessageCircle className="size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
          WhatsApp
        </ContactLink>
        <div className="flex flex-[1.4] p-1.5">
          <Link href={quoteCta.href} className="hv-btn flex flex-1 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground active:bg-[var(--primary-active)]">
            {quoteCta.label}
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
