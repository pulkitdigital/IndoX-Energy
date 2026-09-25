"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, MAIN_NAV, ROUTES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import Logo from "@/components/layout/Logo";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileNav from "@/components/layout/MobileNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import CtaLink from "@/components/ui/CtaLink";

type MenuKey = "products" | "services";

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, [cancelClose]);

  const open = useCallback(
    (menu: MenuKey) => {
      cancelClose();
      setOpenMenu(menu);
    },
    [cancelClose],
  );

  // Close mega menu on Escape or when focus leaves the header.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenMenu(null);
    const onFocus = (event: FocusEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("focusin", onFocus);
    };
  }, [openMenu]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href: string) => (href === ROUTES.home ? pathname === href : pathname.startsWith(href.replace(/\/$/, "")));
  const solid = scrolled || openMenu !== null;

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            // The one place blur is allowed (CLAUDE.md theme rules): sticky header after scroll.
            solid ? "border-border bg-overlay backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent",
          )}
        >
          <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-18">
            <Logo />

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-0.5 2xl:gap-1">
                {MAIN_NAV.map((item) =>
                  item.kind === "mega" ? (
                    <li key={item.label} onMouseEnter={() => open(item.menu)}>
                      <button
                        type="button"
                        aria-expanded={openMenu === item.menu}
                        aria-controls={`mega-${item.menu}`}
                        onClick={() => (openMenu === item.menu ? setOpenMenu(null) : open(item.menu))}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm whitespace-nowrap transition-colors hover:text-foreground",
                          openMenu === item.menu || isActive(item.href) ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-3.5 transition-transform duration-300", openMenu === item.menu && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ) : (
                    <li key={item.label} onMouseEnter={scheduleClose}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "rounded-md px-2.5 py-2 text-sm whitespace-nowrap transition-colors hover:text-foreground",
                          isActive(item.href) ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={CONTACT.tollFreeHref}
                onClick={() => trackEvent("call_click", { location: "header" })}
                aria-label={`Call toll-free ${CONTACT.tollFree}`}
                className="group hidden items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              >
                <span className="grid size-8 place-items-center rounded-md bg-accent-soft text-accent">
                  <Phone className="size-3.5" aria-hidden="true" />
                </span>
                <span className="leading-tight whitespace-nowrap xl:hidden 2xl:block">
                  <span className="block text-[10px] tracking-wider uppercase">Toll-free</span>
                  <span className="font-medium text-foreground">{CONTACT.tollFree}</span>
                </span>
              </a>
              <a
                href={CONTACT.tollFreeHref}
                onClick={() => trackEvent("call_click", { location: "header_mobile" })}
                aria-label={`Call toll-free ${CONTACT.tollFree}`}
                className="grid size-10 place-items-center rounded-md border border-border bg-surface text-accent md:hidden"
              >
                <Phone className="size-4" aria-hidden="true" />
              </a>
              <ThemeToggle className="hidden xl:grid" />
              <CtaLink href={ROUTES.contact} size="sm" magnetic track="quote_cta_click" className="hidden sm:inline-flex">
                Get a Quote
              </CtaLink>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className="grid size-10 place-items-center rounded-md border border-border bg-surface xl:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openMenu ? (
            <motion.div
              key={openMenu}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={cancelClose}
              className="absolute inset-x-0 top-full hidden pt-2 xl:block"
            >
              <div className={cn("container-x", openMenu === "services" && "max-w-4xl")}>
                <MegaMenu menu={openMenu} id={`mega-${openMenu}`} onNavigate={() => setOpenMenu(null)} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
