import { Icon, type IconProps } from "./Icon";

export function UserIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4.5 20.5c.6-3.8 3.5-5.8 7.5-5.8s6.9 2 7.5 5.8"
      accent="M12 11.5a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6z"
    />
  );
}
