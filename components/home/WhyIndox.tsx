import { whyIntro, whyPoints } from "@/content/home";
import { REVEAL } from "@/lib/motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * Why IndoX Energy — 6 points (PRD §8.1 titles) in a 3×2 grid separated only by 1px lines. No cards, no icon tiles:
 * a plain 1.5-stroke icon beside the number.
 */
export default function WhyIndox() {
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="why-title" {...whyIntro} />
        <ul className="mt-12 grid border-t border-border-strong sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point, i) => (
            <li
              key={point.title}
              className="border-b border-border py-7 sm:px-7 sm:py-9 sm:max-lg:odd:border-r sm:max-lg:odd:pl-0 sm:max-lg:even:pr-0 lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <ScrollReveal delay={(i % 3) * REVEAL.stagger}>
                <div className="flex items-center justify-between">
                  <Icon name={point.icon} className="size-6 text-accent" />
                  <span className="label-caps text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl">{point.title}</h3>
                <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">{point.description}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
