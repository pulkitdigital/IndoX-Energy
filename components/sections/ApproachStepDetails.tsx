import { Check } from "lucide-react";
import { approachSteps, type ApproachStep } from "@/content/home";
import ImageSlot from "@/components/ui/ImageSlot";

/** Image + detail bullets for one Our Approach step. */
export default function ApproachStepDetails({ step, index }: { step: ApproachStep; index: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10">
      <ImageSlot slot={step.image} />
      <div>
        <p className="font-heading text-xs tracking-[0.18em] text-link uppercase">
          Step {String(index + 1).padStart(2, "0")} / {String(approachSteps.length).padStart(2, "0")}
        </p>
        <p className="mt-2 hidden font-heading text-2xl font-semibold md:block">
          {step.title} <span className="text-muted-foreground">— {step.line}</span>
        </p>
        <ul className="mt-4 grid gap-3 md:mt-6">
          {step.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
