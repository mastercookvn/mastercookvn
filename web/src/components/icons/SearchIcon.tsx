import { Icon, type IconProps } from "./Icon";

export function SearchIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
      accent="M20.5 20.5L16 16"
    />
  );
}
