import ScrollReveal from "@/components/animations/ScrollReveal";

/** Static chips with a small accent square (product Applications, service Who it's for). Not interactive. */
export default function ChipList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ScrollReveal className={className}>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-[0.9375rem] font-medium">
            <span aria-hidden="true" className="size-1.5 rounded-xs bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}
