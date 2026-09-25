/**
 * Hero backdrop:
 * - the single subtle radial glow allowed by the theme rules (gradient #2 in CLAUDE.md), token-driven;
 * - a faint 1px grid;
 * - a thin dashed "route" with stop markers. It is revealed by scaling a mask rect (transform only),
 *   driven by the Hero's GSAP timeline via [data-hero="route-reveal"].
 */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />

      <svg className="absolute inset-x-0 bottom-0 h-[34%] w-full" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" fill="none">
        <defs>
          <mask id="hero-route-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="560">
            <rect data-hero="route-reveal" x="0" y="0" width="1440" height="560" fill="white" />
          </mask>
        </defs>
        <g mask="url(#hero-route-mask)">
          <path
            d="M-20 470 C 180 470, 260 380, 420 380 S 640 470, 820 430 S 1060 300, 1220 320 S 1400 360, 1460 340"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="6 9"
            strokeLinecap="round"
          />
          {[
            [420, 380],
            [820, 430],
            [1220, 320],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="7" fill="var(--bg)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="2.5" fill="var(--accent)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
