import type { CSSProperties } from "react";

import { LogoMark } from "./LogoMark";

type LogoProps = {
  tone?: "light" | "dark";
  size?: number;
};

export function Logo({ tone = "light", size = 38 }: LogoProps) {
  const onDark = tone === "dark";
  const style = {
    "--logo-text": onDark ? "#FFFFFF" : "#0F2444",
    "--logo-accent": onDark ? "#D6B77E" : "#80622F",
    fontSize: size * 0.5,
  } as CSSProperties;

  return (
    <span className="logo" style={style}>
      <LogoMark size={size} tone={tone} />
      <span className="logo-text">
        MasterCook<em>VN</em>
      </span>
    </span>
  );
}
