import { Icon, type IconProps } from "./Icon";

export function ContractIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      main="M6.5 3H15l4 4v12.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3zM15 3v4h4"
      accent="M8.5 11h7M8.5 14.5h4M8.5 18c1.2-1.5 2-1.5 2.8 0s1.7 1 2.7 0"
    />
  );
}
