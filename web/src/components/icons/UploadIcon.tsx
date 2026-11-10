import { Icon, type IconProps } from "./Icon";

export function UploadIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"
      accent="M12 15.5V4M7.5 8.5L12 4l4.5 4.5"
    />
  );
}
