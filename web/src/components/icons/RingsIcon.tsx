import { Icon, type IconProps } from "./Icon";

export function RingsIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M9 20.5a5.8 5.8 0 1 0 0-11.6 5.8 5.8 0 0 0 0 11.6z"
      accent="M15 20.5a5.8 5.8 0 1 0 0-11.6 5.8 5.8 0 0 0 0 11.6zM15 8.9l-1.5-2.9 1.5-2 1.5 2z"
    />
  );
}
