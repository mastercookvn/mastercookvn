import { Icon, type IconProps } from "./Icon";

export function HomeIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5"
      accent="M10 20v-5.5h4V20"
    />
  );
}
