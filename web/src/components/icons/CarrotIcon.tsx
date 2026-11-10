import { Icon, type IconProps } from "./Icon";

export function CarrotIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M14.5 9.5c-1.8-1.8-4.3-1.5-5.7-.1C6.5 11.7 4 18 3.5 20.5c2.5-.5 8.8-3 11.1-5.3 1.4-1.4 1.7-3.9-.1-5.7zM8 14l2 2M6.3 17.7l1.2 1.2"
      accent="M14.5 9.5c-.3-2 .7-4.2 2.8-5.5M14.5 9.5c2 .3 4.2-.7 5.5-2.8"
    />
  );
}
