import { ICONS, type IconName } from "@/lib/icons";

type IconProps = { name: IconName; className?: string; strokeWidth?: number };

/** Renders a registry icon by name. Decorative by default (aria-hidden). */
export default function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
