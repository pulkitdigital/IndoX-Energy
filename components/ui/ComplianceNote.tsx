import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLIANCE_LINE } from "@/lib/constants";

/** Compliance line required under every product/delivery claim (PRD §6). */
export default function ComplianceNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 text-xs leading-relaxed text-muted-foreground", className)}>
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {COMPLIANCE_LINE}
    </p>
  );
}
