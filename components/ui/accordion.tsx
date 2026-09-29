"use client";

import type { ComponentProps } from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * shadcn-style Accordion on Base UI (this project's shadcn flavour). Styled with the semantic tokens.
 * Panels stay mounted (hidden-until-found), so answers are in the static HTML for crawlers and find-in-page.
 * No height animation (transform/opacity only rule): the panel toggles, the plus icon rotates 45°.
 */
function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("border-t border-border", className)} {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-border", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "hv-group group/trigger -mx-3 flex w-[calc(100%+1.5rem)] items-start justify-between gap-6 rounded-md px-3 py-5 text-left font-heading text-base font-bold text-heading transition-colors duration-200 hover:bg-[var(--row-hover)] focus-visible:bg-[var(--row-hover)] data-[panel-open]:bg-[var(--row-hover)] sm:text-lg",
          className,
        )}
        {...props}
      >
        <span className="hv-accent">{children}</span>
        <Plus
          className="hv-toggle-icon mt-0.5 size-5 shrink-0 text-link transition-[transform,color] duration-300 group-hover/trigger:text-accent group-data-[panel-open]/trigger:rotate-45 group-data-[panel-open]/trigger:text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel data-slot="accordion-content" keepMounted hiddenUntilFound className={cn("pb-6", className)} {...props}>
      <div className="max-w-3xl px-0 text-muted-foreground">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
