import { Icon, type IconProps } from "./Icon";

export function ChecklistIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M6.5 3h11A1.5 1.5 0 0 1 19 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3zM13 8.5h3M13 15.5h3"
      accent="M8 8.2l1.2 1.2L11.2 7M8 15.2l1.2 1.2 2-2.4"
    />
  );
}
