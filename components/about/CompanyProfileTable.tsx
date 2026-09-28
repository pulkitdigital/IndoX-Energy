import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download } from "lucide-react";
import { about } from "@/content/about";
import { COMPANY_PROFILE_PDF, company } from "@/content/company";
import ScrollReveal from "@/components/animations/ScrollReveal";
import PlaceholderBadge from "@/components/ui/PlaceholderBadge";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Company Profile (PRD §8.2 section 9). Register facts (legal name, CIN, GSTIN, registered office) come from
 * content/company.ts and show a "To be added" badge while empty. The PDF button is decided at BUILD time:
 * it renders only when public/docs/indox-company-profile.pdf exists (server component, static export).
 */
export default function CompanyProfileTable({ index }: { index: string }) {
  const p = about.companyProfile;
  const pending = <PlaceholderBadge>{p.pending}</PlaceholderBadge>;
  const hasPdf = existsSync(join(process.cwd(), "public", ...COMPANY_PROFILE_PDF.split("/").filter(Boolean)));

  const rows = [
    { label: p.labels.legalName, value: company.legalName },
    { label: p.labels.cin, value: company.cin ?? pending },
    { label: p.labels.gstin, value: company.gstin ?? pending },
    { label: p.labels.office, value: company.address ?? pending },
    ...p.rows,
  ];

  return (
    <section aria-labelledby="profile-title" className="section-y border-y border-border bg-elevated">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading id="profile-title" index={index} eyebrow={p.eyebrow} title={p.title} />
          {hasPdf ? (
            <ScrollReveal className="mt-8">
              <a
                href={COMPANY_PROFILE_PDF}
                download
                className="hv-btn-line inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 text-sm font-semibold"
              >
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {p.download}
              </a>
            </ScrollReveal>
          ) : null}
        </div>
        <ScrollReveal className="lg:col-span-8">
          <dl className="overflow-hidden rounded-lg border border-border bg-card">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="label-caps pt-0.5 text-muted-foreground">{row.label}</dt>
                <dd className="text-[0.9375rem] leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
