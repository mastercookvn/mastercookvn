import { Icon, type IconProps } from "./Icon";

export function ClocheIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 17a8 8 0 0 1 16 0M2.5 17h19M6 20h12"
      accent="M12 9V7.6M12 7.5a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"
    />
  );
}
