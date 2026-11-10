import { Icon, type IconProps } from "./Icon";

export function CoinIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
      accent="M14.5 9.3c-.5-1-1.4-1.5-2.5-1.5-1.5 0-2.6.8-2.6 2 0 2.9 5.2 1.3 5.2 4.3 0 1.2-1.1 2.1-2.6 2.1-1.2 0-2.1-.6-2.6-1.6M12 6.2v11.6"
    />
  );
}
