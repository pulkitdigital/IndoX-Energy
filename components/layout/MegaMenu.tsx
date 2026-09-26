import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import { megaMenus, type MegaKey } from "@/content/navigation";

type MegaMenuProps = { menu: MegaKey; id: string; onNavigate: () => void };

/**
 * Desktop mega menu panel. Products: 5 ruled columns. Services: 7 items in 2 ruled columns.
 * Hover / focus (hv-menu): background shifts to elevated, icon nudges 2px, arrow slides in.
 */
export default function MegaMenu({ menu, id, onNavigate }: MegaMenuProps) {
  const data = megaMenus[menu];
  const isProducts = menu === "products";

  return (
    <div id={id} className="overflow-hidden rounded-lg border border-border bg-popover shadow-subtle">
      <p className="label-caps border-b border-border px-5 py-3 text-muted-foreground">{data.title}</p>
      <ul className={cn("grid", isProducts ? "grid-cols-5 divide-x divide-border" : "grid-cols-2")}>
        {data.items.map((item, i) => (
          <li key={item.href} className={cn(!isProducts && "border-b border-border odd:border-r")}>
            <Link href={item.href} onClick={onNavigate} className={cn("hv-menu flex h-full gap-3 p-5", isProducts ? "flex-col" : "items-start")}>
              <span className={cn("flex items-center justify-between", !isProducts && "pt-0.5")}>
                <Icon name={item.icon} className="hv-icon hv-accent size-5 text-muted-foreground" />
                {isProducts ? <span className="label-caps text-muted-foreground">{String(i + 1).padStart(2, "0")}</span> : null}
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-heading text-[0.9375rem] leading-snug font-bold">{item.label}</span>
                  <ArrowRight className="hv-arrow-in size-4 shrink-0 text-link" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted-foreground">{item.oneLiner}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={cn("flex justify-end px-5 py-3", isProducts && "border-t border-border")}>
        <Link href={data.href} onClick={onNavigate} className="hv-link inline-flex items-center gap-1.5 text-sm font-semibold text-link">
          {data.viewAll}
          <ArrowRight className="hv-arrow size-4" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
