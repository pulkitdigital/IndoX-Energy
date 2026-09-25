import { cn } from "@/lib/utils";
import { customerSegments, industries, industriesIntro } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import ImageSlot from "@/components/ui/ImageSlot";

/**
 * Industries We Serve (7 image tiles) + Customer Segments spec row.
 * Desktop: 4-column grid where the first tile spans two columns, so 7 tiles fill two even rows.
 */
export default function IndustriesGrid() {
  return (
    <section aria-labelledby="industries-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="industries-title" {...industriesIntro} layout="split" />

        <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <li key={industry.title} className={cn(i === 0 && "sm:col-span-2")}>
              <ScrollReveal delay={(i % 4) * 0.05} className="group h-full">
                <div className={cn("relative overflow-hidden rounded-lg border border-border", i === 0 ? "aspect-[2/1] sm:aspect-auto sm:h-56" : "h-56")}>
                  <ImageSlot slot={industry.image} fill framed={false} parallax />
                  <span className="absolute top-3 left-3 rounded-sm border border-border bg-popover px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2.5">
                  <Icon name={industry.icon} className="size-4.5 text-accent" />
                  <h3 className="text-lg font-bold">{industry.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-16 flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:gap-8">
          <h3 className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{customerSegments.label}</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {customerSegments.items.map((segment) => (
              <li key={segment} className="flex items-center gap-2 font-heading text-base font-semibold">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {segment}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
