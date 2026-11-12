import { Icon, type IconProps } from "./Icon";

export function ClockIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
      accent="M12 7v5.3l3.3 2"
    />
  );
}
