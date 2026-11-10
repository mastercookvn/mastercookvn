import { Icon, type IconProps } from "./Icon";

export function ScaleIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 4v16.5M7 20.5h10M5 7h14"
      accent="M5 7l-2.5 6.5a2.8 2.8 0 0 0 5 0zM19 7l-2.5 6.5a2.8 2.8 0 0 0 5 0z"
    />
  );
}
