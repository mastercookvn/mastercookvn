import { Icon, type IconProps } from "./Icon";

export function LogoutIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M13.5 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h7.5"
      accent="M10 12h11M17.5 8.5L21 12l-3.5 3.5"
    />
  );
}
