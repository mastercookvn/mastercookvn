import { Icon, type IconProps } from "./Icon";

export function WarningIcon(props: IconProps) {
  return (
    <Icon {...props} main="M12 4l9 16H3z" accent="M12 10.5v4M12 17.3h.01" />
  );
}
