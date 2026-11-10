import { Icon, type IconProps } from "./Icon";

export function BroomIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M4 21c.5-4 2-6.5 4.5-8l3.8 3.8C10.8 19.3 8.5 20.7 4 21z"
      accent="M10.5 14.8L19.5 3.5"
    />
  );
}
