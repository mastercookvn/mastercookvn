import { Icon, type IconProps } from "./Icon";

export function QrIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"
      accent="M14 14h2.5v2.5H14zM18 18h2v2h-2zM14 20h1M20 14v1.5"
    />
  );
}
