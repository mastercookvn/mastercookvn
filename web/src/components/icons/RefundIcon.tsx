import { Icon, type IconProps } from "./Icon";

export function RefundIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 12a8 8 0 1 0 2.6-5.9L3.5 9M3.5 4.5V9H8"
      accent="M12 8v4.3l2.8 1.7"
    />
  );
}
