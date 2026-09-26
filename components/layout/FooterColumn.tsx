import Link from "next/link";
import type { NavLink } from "@/content/navigation";

type FooterColumnProps = { title: string; links: NavLink[] };

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="label-caps text-foreground">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hv-link text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
