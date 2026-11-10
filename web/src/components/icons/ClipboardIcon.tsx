import { Icon, type IconProps } from "./Icon";

export function ClipboardIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M8.5 5H6.5A1.5 1.5 0 0 0 5 6.5v13A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 5h-2M9 3.5h6V7H9z"
      accent="M8.5 12h7M8.5 16h4.5"
    />
  );
}
