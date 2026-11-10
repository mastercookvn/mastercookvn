import { Icon, type IconProps } from "./Icon";

export function CrateIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M12 3.5l8.5 4.7v8.6L12 21.5l-8.5-4.7V8.2z"
      accent="M3.5 8.2L12 13l8.5-4.8M12 13v8.5"
    />
  );
}
