import { Icon, type IconProps } from "./Icon";

export function BookIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M5 19.5V5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2 1.5 1.5 0 0 0 1.5 1H19"
      accent="M9 7.5h6"
    />
  );
}
