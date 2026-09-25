import { whyIntro, whyPoints } from "@/content/home";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/** Why IndoX Energy — 3×2 grid divided by 1px rules, led by oversized numerals (no cards, no chips). */
export default function WhyIndox() {
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="why-title" {...whyIntro} layout="split" />
        <ul className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point, i) => (
            <li
              key={point.title}
              className="border-b border-border sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <ScrollReveal delay={(i % 3) * 0.06} className="group h-full p-7 transition-colors duration-300 hover:bg-surface-hover sm:p-9">
                <div className="flex items-start justify-between">
                  <span aria-hidden="true" className="font-heading text-6xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={point.icon} className="size-5 text-accent" />
                </div>
                <h3 className="mt-8 text-xl font-bold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{point.description}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
