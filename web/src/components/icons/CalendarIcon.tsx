import { Icon, type IconProps } from "./Icon";

export function CalendarIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4.5 5.5h15A1.5 1.5 0 0 1 21 7v12.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V7a1.5 1.5 0 0 1 1.5-1.5zM3 10h18M8 3v4M16 3v4"
      accent="M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01"
    />
  );
}
