import { Icon, type IconProps } from "./Icon";

export function LockIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M6.5 11h11A1.5 1.5 0 0 1 19 12.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-7A1.5 1.5 0 0 1 6.5 11zM8 11V7.5a4 4 0 0 1 8 0V11"
      accent="M12 15v2"
    />
  );
}
