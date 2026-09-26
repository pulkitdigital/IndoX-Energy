import { cn } from "@/lib/utils";
import { COMPLIANCE_LINE } from "@/content/company";

/** "Subject to applicable regulations, location, product and quantity." — under every supply / delivery claim (PRD §7). */
export default function ComplianceLine({ className }: { className?: string }) {
  return (
    <p className={cn("label-caps flex items-start gap-2 text-muted-foreground", className)}>
      <span aria-hidden="true">*</span>
      {COMPLIANCE_LINE}
    </p>
  );
}
