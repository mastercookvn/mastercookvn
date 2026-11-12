import { Icon, type IconProps } from "./Icon";

export function ChartIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M3.5 3.5v17h17"
      accent="M8 16.5v-4M12.5 16.5V8M17 16.5v-6"
    />
  );
}
