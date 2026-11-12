import { Icon, type IconProps } from "./Icon";

export function CloseIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
      accent="M9 9l6 6M15 9l-6 6"
    />
  );
}
