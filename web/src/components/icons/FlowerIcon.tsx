import { Icon, type IconProps } from "./Icon";

export function FlowerIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 8.8c-2.7-2.7 0-5.8 0-5.8s2.7 3.1 0 5.8zM15.2 12c2.7-2.7 5.8 0 5.8 0s-3.1 2.7-5.8 0zM12 15.2c2.7 2.7 0 5.8 0 5.8s-2.7-3.1 0-5.8zM8.8 12c-2.7 2.7-5.8 0-5.8 0s3.1-2.7 5.8 0z"
      accent="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
    />
  );
}
