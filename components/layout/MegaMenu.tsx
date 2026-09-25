import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { megaMenu } from "@/content/common";
import { productHref, serviceHref } from "@/lib/constants";

type MegaMenuProps = {
  menu: "products" | "services";
  id: string;
  onNavigate: () => void;
};

/** Desktop mega menu panel. Products: 5 cards. Services: 7 items in 2 columns. */
export default function MegaMenu({ menu, id, onNavigate }: MegaMenuProps) {
  const meta = megaMenu[menu];

  return (
    <div id={id} className="rounded-lg border border-border bg-popover p-4 shadow-card">
      {menu === "products" ? (
        <ul className="grid grid-cols-5 gap-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={productHref(product.slug)}
                onClick={onNavigate}
                className="group flex h-full flex-col gap-3 rounded-md border border-transparent p-4 transition-colors duration-300 hover:border-border hover:bg-elevated"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-link-soft text-link transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                  <Icon name={product.icon} className="size-5" />
                </span>
                <span className="font-heading text-sm font-semibold">{product.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{product.oneLiner}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service.slug)}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-md p-3 transition-colors duration-300 hover:bg-elevated"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-link-soft group-hover:text-link">
                  <Icon name={service.icon} className="size-4.5" />
                </span>
                <span>
                  <span className="block font-heading text-sm font-semibold">{service.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{service.oneLiner}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex justify-end border-t border-border px-2 pt-3">
        <Link href={meta.href} onClick={onNavigate} className="group inline-flex items-center gap-1.5 text-sm font-medium text-link">
          {meta.viewAll}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
