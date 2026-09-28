import { MessageCircle, Phone } from "lucide-react";
import { miniQuoteForm } from "@/content/common";
import { company } from "@/content/company";
import CtaLink from "@/components/ui/CtaLink";

/**
 * Inline failure state shared by every lead form: plain message + tracked call and WhatsApp buttons.
 * The form keeps its values (react-hook-form), so nothing typed is lost.
 */
export default function SubmitFailure({ location }: { location: string }) {
  const { failure } = miniQuoteForm;
  return (
    <div role="alert" className="mt-5 rounded-md border border-destructive/60 bg-background p-4">
      <p className="font-semibold text-destructive">{failure.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{failure.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <CtaLink contact={{ kind: "call", location }} variant="outline" size="sm">
          <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
          {failure.call} {company.tollFree}
        </CtaLink>
        <CtaLink contact={{ kind: "whatsapp", location }} variant="outline" size="sm">
          <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
          {failure.whatsapp}
        </CtaLink>
      </div>
    </div>
  );
}
