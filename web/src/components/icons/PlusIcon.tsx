import { Icon, type IconProps } from "./Icon";

export function PlusIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
      accent="M12 8v8M8 12h8"
    />
  );
}
