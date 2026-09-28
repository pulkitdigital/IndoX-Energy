import { PenLine } from "lucide-react";
import { articleCopy } from "@/content/blog-ui";

/** Author box (PRD §8.10): name, role, one line. Team byline — no personal names or photos. */
export default function AuthorBox({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-10 flex items-start gap-4 rounded-lg border border-border bg-card p-5 sm:p-6">
      <PenLine className="mt-1 size-6 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="font-heading text-lg font-bold text-heading">{name}</p>
        <p className="label-caps mt-1 text-muted-foreground">{role}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{articleCopy.author.line}</p>
      </div>
    </div>
  );
}
