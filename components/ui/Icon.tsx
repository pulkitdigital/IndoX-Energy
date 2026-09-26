import { ICONS, type IconName } from "@/lib/icons";

type IconProps = { name: IconName; className?: string; strokeWidth?: number };

/** Plain lucide line icon from the registry, 1.5 stroke. Decorative (aria-hidden). Never put it in a coloured tile. */
export default function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
