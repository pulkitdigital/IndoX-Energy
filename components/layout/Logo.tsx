"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import { ROUTES } from "@/content/navigation";

// PLACEHOLDER — current logo file. Drop the final logo at public/logo/logo.png; no code change needed.
const LOGO_SRC = "/logo/logo.png";

/**
 * The single place the logo renders (TRD §5). The navy "Ind" disappears on the dark theme, so until a
 * white-text logo is supplied the mark sits on a white rounded pill in BOTH themes — the one pill on the site.
 * Falls back to a text wordmark (still on the pill) if the file is missing.
 *
 * TODO(logo): when logo-white.svg arrives, render it without the pill in dark and the colour logo in light
 * (final mark pending, PRD §12 item 1).
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
      aria-label={`${company.name}, home`}
      // bg-on-brand is the white brand token; the pill is intentional in both themes.
      className={cn("inline-flex h-11 shrink-0 items-center rounded-full bg-on-brand px-3 ring-1 ring-border", className)}
    >
      {failed ? (
        <span className="font-heading text-base leading-none font-bold tracking-tight text-brand-blue">
          IndoX <span className="text-brand-green">Energy</span>
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static export: plain <img> by design
        <img ref={imgRef} src={LOGO_SRC} alt={`${company.name} logo`} width={200} height={100} className="h-10 w-auto" onError={() => setFailed(true)} />
      )}
    </Link>
  );
}
