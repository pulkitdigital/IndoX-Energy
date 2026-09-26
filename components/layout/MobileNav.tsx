"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, MENU } from "@/lib/motion";
import { company, mailHref } from "@/content/company";
import { mainNav, megaMenus, quoteCta, type MegaKey } from "@/content/navigation";
import { useLenis } from "@/components/animations/SmoothScrollProvider";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ContactLink from "@/components/ui/ContactLink";
import CtaLink from "@/components/ui/CtaLink";
import Icon from "@/components/ui/Icon";

type MobileNavProps = { open: boolean; onClose: () => void };

/** Full-screen mobile / tablet menu. Products and Services expand in place (PRD §6). */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<MegaKey | null>(null);
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

  const rowClass = "flex w-full items-center justify-between py-4 font-heading text-xl font-bold";
  const rowCard = "hv-chip flex items-center gap-3 rounded-md border border-border px-4 py-3.5 text-sm";

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
          transition={{ duration: reduceMotion ? 0 : MENU.mobileFade }}
          className="fixed inset-0 z-[60] flex flex-col bg-background xl:hidden"
          data-lenis-prevent
        >
          <div className="container-x flex h-18 shrink-0 items-center justify-between border-b border-border">
            <Logo />
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-md border border-border">
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pb-10">
            <ul className="divide-y divide-border">
              {mainNav.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: MENU.mobileStagger * index + 0.05, duration: 0.35, ease: EASE_OUT }}
                >
                  {item.kind === "mega" ? (
                    <>
                      <button type="button" className={rowClass} aria-expanded={expanded === item.menu} onClick={() => setExpanded(expanded === item.menu ? null : item.menu)}>
                        {item.label}
                        <ChevronDown
                          className={cn("size-5 text-muted-foreground transition-transform duration-300", expanded === item.menu && "rotate-180")}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.menu ? (
                          <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.2 }}
                            className="pb-4"
                          >
                            {megaMenus[item.menu].items.map((entry) => (
                              <li key={entry.href}>
                                <Link
                                  href={entry.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 rounded-sm px-1 py-2.5 text-base text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  <Icon name={entry.icon} className="size-4.5 shrink-0" />
                                  {entry.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link href={megaMenus[item.menu].href} onClick={onClose} className="inline-flex items-center gap-1.5 px-1 py-2.5 text-sm font-semibold text-link">
                                {megaMenus[item.menu].viewAll}
                                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                              </Link>
                            </li>
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} onClick={onClose} className={rowClass}>
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <CtaLink href={quoteCta.href} size="lg" arrow className="w-full">
                {quoteCta.label}
              </CtaLink>
              <ContactLink kind="call" location="mobile_nav" className={rowCard}>
                <Phone className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                Toll-free <span className="font-semibold">{company.tollFree}</span>
              </ContactLink>
              <a href={mailHref} className={rowCard}>
                <Mail className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                {company.email}
              </a>
              <ThemeToggle variant="row" />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
