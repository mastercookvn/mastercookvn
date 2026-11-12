import { Icon, type IconProps } from "./Icon";

export function PinIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 21.5c5-5.3 7.5-8.8 7.5-12a7.5 7.5 0 0 0-15 0c0 3.2 2.5 6.7 7.5 12z"
      accent="M12 12a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z"
    />
  );
}
