import { Icon, type IconProps } from "./Icon";

export function PotIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M5 10.5h14V18a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18zM3 10.5h18M2.5 14H5M19 14h2.5"
      accent="M12 7.5V6M9.5 6h5"
    />
  );
}
