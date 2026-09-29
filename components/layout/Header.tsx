"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, MENU } from "@/lib/motion";
import { company } from "@/content/company";
import { ROUTES, mainNav, quoteCta, type MegaKey } from "@/content/navigation";
import Logo from "@/components/layout/Logo";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileNav from "@/components/layout/MobileNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ContactLink from "@/components/ui/ContactLink";
import CtaLink from "@/components/ui/CtaLink";

/** Sticky header: transparent at the top, shrinks and turns solid (with the one allowed blur) after scroll. */
export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaKey | null>(null);
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
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), MENU.closeDelayMs);
  }, [cancelClose]);

  const open = useCallback(
    (menu: MegaKey) => {
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
  // White-on-transparent only over the Home hero; inner pages start light/theme-coloured, so they use the solid style.
  const solid = scrolled || openMenu !== null || pathname !== ROUTES.home;
  const navItemClass = "hv-link inline-flex items-center gap-1 py-1.5 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200";
  const navTextClass = (active: boolean) =>
    solid
      ? active
        ? "text-foreground hover:text-foreground focus-visible:text-foreground"
        : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"
      : active
        ? "text-foreground hover:text-foreground focus-visible:text-foreground"
        : "text-foreground/75 hover:text-foreground focus-visible:text-foreground";
  const iconBorderClass = solid ? "border-border text-foreground" : "border-foreground/30 text-foreground";

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-500",
            // The one place blur is allowed: the sticky header after scroll.
            solid ? "border-border bg-overlay backdrop-blur-lg" : "border-transparent bg-transparent",
          )}
        >
          <div className={cn("container-x flex items-center justify-between gap-4 transition-[height] duration-500", solid ? "h-16" : "h-18 lg:h-20")}>
            <Logo />

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-4 2xl:gap-7">
                {mainNav.map((item) =>
                  item.kind === "mega" ? (
                    <li key={item.label} onMouseEnter={() => open(item.menu)}>
                      <button
                        type="button"
                        aria-expanded={openMenu === item.menu}
                        aria-controls={`mega-${item.menu}`}
                        onClick={() => (openMenu === item.menu ? setOpenMenu(null) : open(item.menu))}
                        className={cn(navItemClass, navTextClass(openMenu === item.menu || isActive(item.href)))}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-3.5 transition-transform duration-300", openMenu === item.menu && "rotate-180")}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ) : (
                    <li key={item.label} onMouseEnter={scheduleClose}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(navItemClass, navTextClass(isActive(item.href)))}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2 2xl:gap-3">
              <ContactLink
                kind="call"
                location="header"
                aria-label={`Call toll-free ${company.tollFree}`}
                className="hv-group hidden items-center gap-2.5 rounded-md px-2 py-1.5 md:inline-flex"
              >
                <Phone className="hv-icon-rot size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <span className="leading-tight whitespace-nowrap">
                  <span className={cn("label-caps block transition-colors duration-500", solid ? "text-muted-foreground" : "text-foreground/70")}>
                    Toll-free
                  </span>
                  <span className={cn("hv-accent font-heading text-sm font-bold transition-colors duration-500", solid ? "text-foreground" : "text-foreground")}>
                    {company.tollFree}
                  </span>
                </span>
              </ContactLink>
              <ContactLink
                kind="call"
                location="header_mobile"
                aria-label={`Call toll-free ${company.tollFree}`}
                className={cn("grid size-10 place-items-center rounded-md border transition-colors duration-500 md:hidden", iconBorderClass)}
              >
                <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </ContactLink>
              <ThemeToggle className="hidden xl:grid" />
              <CtaLink href={quoteCta.href} size="md" magnetic arrow className="hidden sm:inline-flex">
                {quoteCta.label}
              </CtaLink>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className={cn("grid size-10 place-items-center rounded-md border transition-colors duration-500 xl:hidden", iconBorderClass)}
              >
                <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openMenu ? (
            <motion.div
              key={openMenu}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: MENU.fromScale }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: MENU.fromScale }}
              transition={{ duration: MENU.duration, ease: EASE_OUT }}
              onMouseEnter={cancelClose}
              className="absolute inset-x-0 top-full hidden origin-top pt-2 xl:block"
            >
              <div className={cn("container-x", openMenu === "services" && "max-w-5xl")}>
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