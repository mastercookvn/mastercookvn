import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge would otherwise read text-14-5 as a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "10-5",
        "11",
        "11-5",
        "12",
        "12-5",
        "13",
        "13-5",
        "14",
        "14-5",
        "15",
        "15-5",
        "16",
        "16-5",
        "17",
        "18",
        "20",
        "22",
        "23",
        "24",
        "27",
        "30",
        "32",
        "34",
        "39",
        "44",
        "56",
        "70",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
