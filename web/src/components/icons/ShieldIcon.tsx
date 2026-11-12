import { Icon, type IconProps } from "./Icon";

export function ShieldIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 3l7.5 2.7v5.8c0 4.4-3 7.5-7.5 9.5-4.5-2-7.5-5.1-7.5-9.5V5.7z"
      accent="M9 11.8l2.2 2.2 3.8-4"
    />
  );
}
