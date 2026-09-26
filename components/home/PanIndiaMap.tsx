import { indiaOutline, mapPoints } from "@/content/india-map";
import { coverage, coverageConfirmed } from "@/content/coverage";
import { coverageCopy, networkIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";
import CoverageCheck from "@/components/forms/CoverageCheck";

/* Simple equirectangular projection into the SVG viewBox. */
const BOUNDS = { minLon: 67.5, maxLon: 98, minLat: 7.5, maxLat: 37.5 };
const WIDTH = 400;
const HEIGHT = 440;
const project = (lon: number, lat: number) => ({
  x: ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * WIDTH,
  y: ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * HEIGHT,
});

const outlinePath =
  indiaOutline
    .map(([lon, lat], i) => {
      const { x, y } = project(lon, lat);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ") + " Z";

/** Graticule every 5° — drawn as tick marks on the frame edge, not a full grid. */
const LON_TICKS = [70, 75, 80, 85, 90, 95];
const LAT_TICKS = [10, 15, 20, 25, 30, 35];

/** Reference cities: neutral crosshairs, for orientation only. They are NOT coverage. */
const referencePoints = mapPoints.map((p) => ({ ...p, ...project(p.lon, p.lat) }));
/** Confirmed coverage from content/coverage.ts (empty until the client supplies it). */
const coveragePoints = coverage.map((area) => ({ ...area, ...project(area.lon, area.lat) }));

export default function PanIndiaMap() {
  return (
    <section aria-labelledby="network-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHeading id="network-title" {...networkIntro} />
          <ScrollReveal className="mt-10" delay={0.1}>
            <CoverageCheck />
          </ScrollReveal>
        </div>

        <ScrollReveal y={32} className="lg:col-span-6">
          <figure className="mx-auto max-w-md">
            <svg viewBox={`-24 -16 ${WIDTH + 40} ${HEIGHT + 40}`} className="w-full" role="img" aria-labelledby="map-title map-desc">
              <title id="map-title">Map of India</title>
              <desc id="map-desc">{coverageConfirmed ? `${coverage.length} coverage areas marked.` : coverageCopy.mapNote}</desc>

              {/* Frame + degree ticks */}
              <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="none" stroke="var(--border)" />
              {LON_TICKS.map((lon) => {
                const { x } = project(lon, BOUNDS.minLat);
                return (
                  <g key={`lon-${lon}`}>
                    <line x1={x} x2={x} y1={HEIGHT} y2={HEIGHT - 6} stroke="var(--border-strong)" />
                    <text x={x} y={HEIGHT + 14} textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-body)">
                      {lon}°E
                    </text>
                  </g>
                );
              })}
              {LAT_TICKS.map((lat) => {
                const { y } = project(BOUNDS.minLon, lat);
                return (
                  <g key={`lat-${lat}`}>
                    <line x1="0" x2="6" y1={y} y2={y} stroke="var(--border-strong)" />
                    <text x="-5" y={y + 3} textAnchor="end" fontSize="9" fill="var(--text-muted)" fontFamily="var(--font-body)">
                      {lat}°
                    </text>
                  </g>
                );
              })}

              <path d={outlinePath} fill="var(--surface)" stroke="var(--text-muted)" strokeWidth="1" strokeLinejoin="round" />

              {referencePoints.map((p) => (
                <g key={p.name} stroke="var(--text-muted)" strokeWidth="1">
                  <line x1={p.x - 5} x2={p.x + 5} y1={p.y} y2={p.y} />
                  <line x1={p.x} x2={p.x} y1={p.y - 5} y2={p.y + 5} />
                </g>
              ))}

              {coveragePoints.map((p) =>
                p.status === "active" ? (
                  <circle key={p.city} cx={p.x} cy={p.y} r="4.5" fill="var(--accent)" />
                ) : (
                  <circle key={p.city} cx={p.x} cy={p.y} r="4.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                ),
              )}
            </svg>

            <figcaption className="mt-5 border-t border-border pt-4">
              <ul className="label-caps flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                  {coverageCopy.legend.active}
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full border border-accent" />
                  {coverageCopy.legend.expanding}
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-sm leading-none">+</span>
                  {coverageCopy.legend.reference}
                </li>
              </ul>
              {!coverageConfirmed ? (
                <div className="mt-4 flex flex-col items-start gap-2 text-xs text-muted-foreground">
                  <PlaceholderBadge>Coverage to be confirmed</PlaceholderBadge>
                  {coverageCopy.mapNote}
                </div>
              ) : null}
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
