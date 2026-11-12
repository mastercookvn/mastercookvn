import { Icon, type IconProps } from "./Icon";

export function PrintIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M7 9V3.5h10V9M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H17"
      accent="M7 14h10v6.5H7z"
    />
  );
}
