import { Icon, type IconProps } from "./Icon";

export function MenuIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M6.5 3.5h11A1.5 1.5 0 0 1 19 5v14a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 1.5-1.5z"
      accent="M9 8.5h6M9 12h6M9 15.5h3.5"
    />
  );
}
