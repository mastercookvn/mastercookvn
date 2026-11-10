type LogoTone = "light" | "dark";

type LogoMarkProps = {
  size?: number;
  tone?: LogoTone;
};

const COLORS = {
  light: {
    pot: "#1B3F78",
    rim: "#0F2444",
    hat: "#FFFFFF",
    line: "#0F2444",
    eye: "#FFFFFF",
    smile: "#D6B77E",
    handle: "#B8935A",
  },
  dark: {
    pot: "#3A67A8",
    rim: "#D6B77E",
    hat: "#F8F7F2",
    line: "#F8F7F2",
    eye: "#FFFFFF",
    smile: "#D6B77E",
    handle: "#D6B77E",
  },
} as const;

export function LogoMark({ size = 40, tone = "light" }: LogoMarkProps) {
  const color = COLORS[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox="14 8 232 244"
      role="img"
      aria-label="Logo MasterCookVN"
    >
      <rect x="20" y="138" width="34" height="20" rx="10" fill={color.handle} />
      <rect
        x="206"
        y="138"
        width="34"
        height="20"
        rx="10"
        fill={color.handle}
      />
      <path
        d="M46 122h168v62c0 40-30 60-62 60h-44c-32 0-62-20-62-60z"
        fill={color.pot}
      />
      <rect x="36" y="110" width="188" height="22" rx="11" fill={color.rim} />
      <path
        d="M84 110V88a24 24 0 0 1-6-46 28 28 0 0 1 32-20 30 30 0 0 1 40 0 28 28 0 0 1 32 20 24 24 0 0 1-6 46v22z"
        fill={color.hat}
        stroke={color.line}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M112 108V84M148 108V84"
        stroke={color.line}
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".45"
      />
      <ellipse cx="103" cy="164" rx="8" ry="10.5" fill={color.eye} />
      <ellipse cx="157" cy="164" rx="8" ry="10.5" fill={color.eye} />
      <path
        d="M110 192c10 13 30 13 40 0"
        fill="none"
        stroke={color.smile}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
