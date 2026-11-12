import { Icon, type IconProps } from "./Icon";

export function EyeIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
      accent="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    />
  );
}
