import { Icon, type IconProps } from "./Icon";

export function DownloadIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"
      accent="M12 4v11.5M7.5 11l4.5 4.5 4.5-4.5"
    />
  );
}
