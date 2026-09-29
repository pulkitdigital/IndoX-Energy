import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEGAL_DRAFT_NOTICE } from "@/content/legal";

/**
 * Draft notice for the legal pages (top and bottom).
 * REMOVE ONLY AFTER THE CLIENT CONFIRMS IN WRITING that IndoX Energy's legal adviser has approved the text
 * of /privacy/ and /terms/. Until then the site must not go live without this banner (see CLAUDE.md, "Legal pages").
 */
export default function DraftBanner({ className }: { className?: string }) {
  return (
    <aside role="note" aria-label={LEGAL_DRAFT_NOTICE.title} className={cn("flex items-start gap-3 rounded-lg border border-accent bg-card p-4 sm:p-5", className)}>
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="label-caps text-heading">{LEGAL_DRAFT_NOTICE.title}</p>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{LEGAL_DRAFT_NOTICE.text}</p>
      </div>
    </aside>
  );
}
