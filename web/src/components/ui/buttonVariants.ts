import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      primary: "btn-primary",
      inverse: "btn-inverse",
      danger: "btn-danger",
      text: "btn-text",
    },
    size: {
      default: "",
      lg: "btn-lg",
      sm: "btn-sm",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export type ButtonStyle = VariantProps<typeof buttonVariants>;
