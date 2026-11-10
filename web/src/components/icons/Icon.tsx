export type IconProps = {
  size?: number;
  className?: string;
};

type IconBaseProps = IconProps & {
  main: string;
  accent?: string;
};

/** 24 px grid. The second path uses --icon-accent. */
export function Icon({ size = 20, className, main, accent }: IconBaseProps) {
  const strokeWidth = Math.min(1.7, Math.max(0.95, 30 / size)).toFixed(2);

  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={main} />
      {accent ? <path d={accent} stroke="var(--icon-accent)" /> : null}
    </svg>
  );
}
