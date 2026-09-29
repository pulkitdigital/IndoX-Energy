import { ev } from "@/content/ev";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import GridLines from "@/components/decor/GridLines";

/**
 * AC vs DC comparison (PRD §8.7 section 5). A real <table> (caption, scope="col"/"row"); qualitative wording only —
 * no kW, times, prices or connector counts. On narrow screens the table scrolls sideways inside its own
 * container (min width), never the page, and the row-label column stays pinned while it scrolls. Column headers
 * carry the 4:3 ev-ac / ev-dc images.
 */
export default function ACvsDCTable({ index }: { index: string }) {
  const t = ev.acdc;
  return (
    <section aria-labelledby="ev-acdc-title" className="relative isolate section-y">
        <GridLines side="left" />
      <div className="container-x">
        <SectionHeading id="ev-acdc-title" index={index} eyebrow={t.eyebrow} title={t.title} description={t.description} layout="split" />
        <ScrollReveal className="mt-12">
          {/* tabIndex lets keyboard users scroll the table when it overflows. */}
          <div tabIndex={0} role="region" aria-labelledby="ev-acdc-title" className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">{t.caption}</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="label-caps sticky left-0 z-10 w-1/4 bg-card p-5 align-bottom text-muted-foreground">
                    {t.featureLabel}
                  </th>
                  {t.columns.map((column) => (
                    <th key={column.key} scope="col" className="w-[37.5%] p-5 align-bottom">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
                        <ImageSlot slot={column.image} fill framed={false} zoomOnHover={false} />
                      </div>
                      <span className="mt-4 block font-heading text-lg font-bold text-heading">{column.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-b-0">
                    <th scope="row" className="label-caps sticky left-0 z-10 bg-card p-5 align-top text-muted-foreground">
                      {row.label}
                    </th>
                    <td className="p-5 align-top text-[0.9375rem] leading-relaxed">{row.ac}</td>
                    <td className="p-5 align-top text-[0.9375rem] leading-relaxed">{row.dc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{t.note}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
