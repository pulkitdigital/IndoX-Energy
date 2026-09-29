import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavLink } from "@/content/navigation";

type FooterColumnProps = { title: string; links: NavLink[] };

/** Footer link column. Hover / focus: link nudges right, 2px accent underline slides in, arrow slides out after the text. */
export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="label-caps border-b border-border pb-3 text-foreground">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hv-link hv-group inline-block text-sm text-muted-foreground transition-[color,transform] duration-200 hover:translate-x-1 hover:text-foreground focus-visible:translate-x-1 focus-visible:text-foreground motion-reduce:hover:translate-x-0"
            >
              {link.label}
              <ChevronRight className="hv-arrow-in absolute top-1/2 left-full ml-1.5 -mt-[7px] size-3.5 text-accent" strokeWidth={2} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
