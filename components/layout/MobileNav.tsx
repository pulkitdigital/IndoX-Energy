"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, MAIN_NAV, ROUTES, productHref, serviceHref } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { megaMenu } from "@/content/common";
import { useLenis } from "@/components/animations/SmoothScrollProvider";
import Logo from "@/components/layout/Logo";
import CtaLink from "@/components/ui/CtaLink";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Icon from "@/components/ui/Icon";

type MobileNavProps = { open: boolean; onClose: () => void };

/** Full-screen mobile/tablet menu. Products and Services expand in place. */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<"products" | "services" | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  const linkClass = "flex w-full items-center justify-between py-4 font-heading text-2xl font-medium";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-background xl:hidden"
          data-lenis-prevent
        >

          <div className="container-x relative flex h-16 shrink-0 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-md border border-border bg-surface"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x relative flex-1 overflow-y-auto pb-10">
            <ul className="divide-y divide-border">
              {MAIN_NAV.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.35 }}
                >
                  {item.kind === "mega" ? (
                    <>
                      <button
                        type="button"
                        className={linkClass}
                        aria-expanded={expanded === item.menu}
                        onClick={() => setExpanded(expanded === item.menu ? null : item.menu)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-5 text-muted-foreground transition-transform duration-300", expanded === item.menu && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.menu ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {(item.menu === "products" ? products : services).map((entry) => (
                              <li key={entry.slug}>
                                <Link
                                  href={item.menu === "products" ? productHref(entry.slug) : serviceHref(entry.slug)}
                                  onClick={onClose}
                                  className="flex items-center gap-3 rounded-md px-2 py-2.5 text-base text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                                >
                                  <Icon name={entry.icon} className="size-4.5 text-link" />
                                  {entry.name}
                                </Link>
                              </li>
                            ))}
                            <li className="pb-4">
                              <Link href={megaMenu[item.menu].href} onClick={onClose} className="block px-2 py-2.5 text-sm font-medium text-link">
                                {megaMenu[item.menu].viewAll} →
                              </Link>
                            </li>
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} onClick={onClose} className={linkClass}>
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <CtaLink href={ROUTES.contact} size="lg" track="quote_cta_click" arrow className="w-full">
                Get a Quote
              </CtaLink>
              <a
                href={CONTACT.tollFreeHref}
                onClick={() => trackEvent("call_click", { location: "mobile_nav" })}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3.5 text-sm"
              >
                <Phone className="size-4 text-accent" aria-hidden="true" />
                Toll-free <span className="font-semibold">{CONTACT.tollFree}</span>
              </a>
              <a href={CONTACT.emailHref} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3.5 text-sm">
                <Mail className="size-4 text-link" aria-hidden="true" />
                {CONTACT.email}
              </a>
              <ThemeToggle variant="row" />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
