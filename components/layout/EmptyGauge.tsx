/**
 * Decorative empty fuel gauge for the 404 page, drawn in code with theme tokens (no text, no logo in the SVG).
 * Static: the needle rests at "empty", so nothing animates and reduced motion needs no special case.
 */
const CX = 200;
const CY = 200;
const R = 150;

/** Point on the dial. 0° = left end (empty), 180° = right end (full). */
function point(angle: number, radius: number) {
  const rad = (Math.PI * (180 - angle)) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) };
}

const TICKS = Array.from({ length: 13 }, (_, i) => i * 15);

export default function EmptyGauge({ className }: { className?: string }) {
  const start = point(0, R);
  const end = point(180, R);
  const reserve = point(30, R);
  const needleTip = point(3, R - 26);
  return (
    <svg viewBox="0 0 400 250" role="img" aria-label="Fuel gauge showing empty" className={className}>
      {/* Dial arc */}
      <path d={`M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${end.x} ${end.y}`} fill="none" strokeWidth="2" className="stroke-border-strong" />
      {/* Reserve zone */}
      <path d={`M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${reserve.x} ${reserve.y}`} fill="none" strokeWidth="8" strokeLinecap="butt" className="stroke-accent" />
      {/* Ticks */}
      {TICKS.map((angle) => {
        const major = angle % 45 === 0;
        const a = point(angle, R - (major ? 22 : 14));
        const b = point(angle, R - 4);
        return <line key={angle} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={major ? 2 : 1} className="stroke-border-strong" />;
      })}
      {/* Needle resting at empty */}
      <line x1={CX} y1={CY} x2={needleTip.x} y2={needleTip.y} strokeWidth="4" strokeLinecap="round" className="stroke-heading" />
      <circle cx={CX} cy={CY} r="12" strokeWidth="2" className="fill-background stroke-heading" />
      <circle cx={CX} cy={CY} r="3" className="fill-accent" />
      {/* Baseline */}
      <line x1={CX - R - 20} y1={CY + 24} x2={CX + R + 20} y2={CY + 24} strokeWidth="1" className="stroke-border" />
    </svg>
  );
}
