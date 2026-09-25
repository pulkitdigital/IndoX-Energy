"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { COMPANY, ROUTES } from "@/lib/constants";

// PLACEHOLDER — expected logo file. Drop the final logo at public/logo/logo.png; no code change needed.
const LOGO_SRC = "/logo/logo.png";

/**
 * TEMPORARY logo: shows the logo image directly, no pill/background wrapper.
 * Falls back to a text wordmark if public/logo/logo.png is missing.
 *
 * TODO(logo): once final vector logos are supplied, replace this component with a theme-aware pair:
 *   - dark theme:  public/logo/logo-white.svg
 *   - light theme: public/logo/logo-color.svg
 * Final mark — lightning-leaf vs plain wordmark — is pending client sign-off (PRD §9 item 1).
 */
export default function Logo({ className }: { className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <Link
      href={ROUTES.home}
      aria-label={`${COMPANY.name} — home`}
      className={cn(
        "inline-flex h-10 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {failed ? (
        <span className="font-heading text-base leading-none font-semibold tracking-tight text-brand-blue">
          IndoX <span className="font-medium">Energy</span>
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static export: plain <img> by design
        <img
          ref={imgRef}
          src={LOGO_SRC}
          alt={`${COMPANY.name} logo`}
          width={180}
          height={44}
          className="h-11 w-auto"
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  );
}