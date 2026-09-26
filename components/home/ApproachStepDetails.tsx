import { approachSteps, type ApproachStep } from "@/content/home";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";

/** Image + detail lines for one Our Approach step. */
export default function ApproachStepDetails({ step, index }: { step: ApproachStep; index: number }) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start md:gap-12">
      <FigureFrame caption={`FIG. 02.${n} — ${step.title}`} className="max-w-md">
        <ImageSlot slot={step.image} framed={false} reveal={false} />
      </FigureFrame>
      <div>
        <p className="label-caps text-muted-foreground">
          Step {n} / {String(approachSteps.length).padStart(2, "0")}
        </p>
        <p className="mt-3 hidden font-heading text-2xl font-bold md:block">{step.title}</p>
        <p className="mt-2 hidden text-muted-foreground md:block">{step.line}</p>
        <ul className="mt-5 divide-y divide-border border-y border-border md:mt-7">
          {step.details.map((detail, i) => (
            <li key={detail} className="flex items-baseline gap-4 py-3 text-[0.9375rem] leading-relaxed">
              <span className="label-caps shrink-0 text-muted-foreground">{String.fromCharCode(97 + i)}</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
