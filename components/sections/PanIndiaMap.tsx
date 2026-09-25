import { indiaOutline, mapPoints } from "@/content/india-map";
import { coverageCheck, networkIntro } from "@/content/home";
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

const points = mapPoints.map((point) => ({ ...point, ...project(point.lon, point.lat) }));
const hub = points[0];

export default function PanIndiaMap() {
  return (
    <section aria-labelledby="network-title" className="section-y relative overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="network-title" {...networkIntro} />
          <ScrollReveal className="mt-10" delay={0.1}>
            <CoverageCheck />
          </ScrollReveal>
        </div>

        <ScrollReveal y={40}>
          <figure className="relative mx-auto max-w-md">
            <svg viewBox={`-10 -10 ${WIDTH + 20} ${HEIGHT + 20}`} className="relative w-full" role="img" aria-labelledby="map-title map-desc">
              <title id="map-title">Illustrative map of India</title>
              <desc id="map-desc">{coverageCheck.mapNote}</desc>
              <defs>
                <pattern id="map-dots" width="9" height="9" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.1" fill="var(--border-strong)" />
                </pattern>
                <clipPath id="map-clip">
                  <path d={outlinePath} />
                </clipPath>
              </defs>

              <rect x="-10" y="-10" width={WIDTH + 20} height={HEIGHT + 20} fill="url(#map-dots)" clipPath="url(#map-clip)" />
              <path d={outlinePath} fill="var(--bg-elevated)" stroke="var(--link)" strokeWidth="1.5" strokeLinejoin="round" />

              {points.slice(1).map((point) => (
                <path
                  key={`route-${point.name}`}
                  d={`M${hub.x} ${hub.y} Q ${(hub.x + point.x) / 2} ${Math.min(hub.y, point.y) - 30} ${point.x} ${point.y}`}
                  fill="none"
                  stroke="var(--link)"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="animate-flow"
                  style={{ animationDuration: "14s" }}
                />
              ))}

              {points.map((point) => (
                <g key={point.name}>
                  <circle cx={point.x} cy={point.y} r="9" fill="var(--accent)" opacity="0.2" className="origin-center animate-pulse [transform-box:fill-box]" />
                  <circle cx={point.x} cy={point.y} r="3.5" fill="var(--accent)" />
                </g>
              ))}
            </svg>
            <figcaption className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
              <PlaceholderBadge>Coverage placeholder</PlaceholderBadge>
              {coverageCheck.mapNote}
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
