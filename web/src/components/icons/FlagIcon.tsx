import { Icon, type IconProps } from "./Icon";

export function FlagIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M6 21V3.5"
      accent="M6 4.5c4-2 7 2 12 0v9c-5 2-8-2-12 0z"
    />
  );
}
