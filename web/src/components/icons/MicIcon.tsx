import { Icon, type IconProps } from "./Icon";

export function MicIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 3a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-7 0v-5A3.5 3.5 0 0 1 12 3z"
      accent="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7"
    />
  );
}
