"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOVER, MQ } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { hasWhatsApp, telHref, whatsappHref } from "@/content/company";
import { trackEvent } from "@/lib/analytics";

export type CtaVariant = "primary" | "outline" | "text" | "onBrand" | "outlineOnBrand";

type CtaLinkProps = {
  children: ReactNode;
  /** Internal route. Use `contact` instead for call / WhatsApp buttons. */
  href?: string;
  /** Renders a tracked tel: / wa.me button (fires call_click / whatsapp_click). */
  contact?: { kind: "call" | "whatsapp"; location: string; /** Pre-filled WhatsApp message. */ message?: string };
  /**
   * primary = solid brand-blue, white text. outline = 1px border, neutral text (accent border + solid wipe on hover).
   * text = link-coloured text with slide-in underline. onBrand / outlineOnBrand = on the solid brand-blue band.
   */
  variant?: CtaVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Trailing arrow that nudges 4px right on hover / focus. */
  arrow?: boolean;
  /** Pulls slightly toward the cursor (desktop fine pointer only, off under reduced motion). Used for "Get a Quote". */
  magnetic?: boolean;
  "aria-label"?: string;
};

/** Hover behaviour comes from the shared hover system in app/globals.css (hv-btn / hv-btn-line / hv-link). */
const VARIANTS: Record<CtaVariant, string> = {
  primary: "hv-btn bg-primary font-semibold text-primary-foreground",
  outline: "hv-btn-line border border-border-strong font-semibold text-foreground",
  text: "hv-link h-auto! px-0! font-semibold text-link",
  onBrand: "hv-btn on-brand bg-on-brand font-semibold text-brand-blue",
  outlineOnBrand: "hv-btn-line on-brand border border-on-brand/45 font-semibold text-on-brand",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
} as const;

/** Link styled as a button: 6px radius, solid fill or hairline outline, never a pill. */
export default function CtaLink({ href, contact, children, variant = "primary", size = "md", className, arrow = false, magnetic = false, ...rest }: CtaLinkProps) {
  const reduceMotion = useReducedMotion();
  const desktopFine = useMediaQuery(MQ.desktopFine);
  const magnetOn = magnetic && desktopFine && !reduceMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, HOVER.magnetSpring);
  const y = useSpring(rawY, HOVER.magnetSpring);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!magnetOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * HOVER.magnetStrength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * HOVER.magnetStrength);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const classes = cn("inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap", SIZES[size], VARIANTS[variant], !magnetic && className);
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" /> : null}
    </>
  );

  let link: ReactNode;
  if (contact) {
    const isWhatsApp = contact.kind === "whatsapp";
    link = (
      <a
        href={isWhatsApp ? whatsappHref(contact.message) : telHref}
        onClick={() => trackEvent(isWhatsApp ? "whatsapp_click" : "call_click", { location: contact.location })}
        {...(isWhatsApp && hasWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(classes, magnetic && "w-full")}
        {...rest}
      >
        {content}
      </a>
    );
  } else {
    link = (
      <Link href={href ?? "/"} className={cn(classes, magnetic && "w-full")} {...rest}>
        {content}
      </Link>
    );
  }

  if (!magnetic) return link;

  // Magnetic pull moves an outer wrapper (motion); the hover lift / colour lives on the inner link (CSS) — never the same element.
  return (
    <motion.span className={cn("inline-flex", className)} style={magnetOn ? { x, y } : undefined} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {link}
    </motion.span>
  );
}
