import { Icon, type IconProps } from "./Icon";

export function BowlIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M3 11.5h18a9 9 0 0 1-5.7 8.4H8.7A9 9 0 0 1 3 11.5zM8.5 20h7"
      accent="M9.5 8.2c0-1.6 1.2-1.6 1.2-3.2M13.5 8.2c0-1.6 1.2-1.6 1.2-3.2"
    />
  );
}
