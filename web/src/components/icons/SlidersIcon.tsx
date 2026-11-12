import { Icon, type IconProps } from "./Icon";

export function SlidersIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M3 7h7M16 7h5M3 17h3M12 17h9"
      accent="M13 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM9 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
    />
  );
}
