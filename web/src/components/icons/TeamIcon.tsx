import { Icon, type IconProps } from "./Icon";

export function TeamIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M2.5 20c.4-3.3 3-5.2 6.5-5.2s6.1 1.9 6.5 5.2M9 11.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8z"
      accent="M15.5 4.7a3.4 3.4 0 0 1 0 6.2M17.8 15c2 .7 3.4 2.4 3.7 5"
    />
  );
}
