import { Icon, type IconProps } from "./Icon";

export function CakeIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4.5 12h15v7.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 16c2 1.4 3.5 1.4 5 0s3.5-1.4 5 0 3 1.4 5 0"
      accent="M12 12V7.5M12 4.8h.01"
    />
  );
}
