export type MascotMood = "happy" | "oops" | "info";

const POT = "#1B3F78";
const RIM = "#0F2444";
const GOLD = "#D6B77E";
const HANDLE = "#B8935A";
const BLUSH = "#E8A7A0";

function Face({ mood }: { mood: MascotMood }) {
  if (mood === "happy") {
    return (
      <>
        <path
          d="M93 166q10-13 20 0M147 166q10-13 20 0"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="82" cy="186" rx="10" ry="6" fill={BLUSH} opacity=".75" />
        <ellipse cx="178" cy="186" rx="10" ry="6" fill={BLUSH} opacity=".75" />
        <path d="M108 186c8 20 36 20 44 0z" fill={GOLD} />
      </>
    );
  }
  if (mood === "oops") {
    return (
      <>
        <path
          d="M90 152l22-7M170 152l-22-7"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse cx="103" cy="168" rx="7" ry="9" fill="#fff" />
        <ellipse cx="157" cy="168" rx="7" ry="9" fill="#fff" />
        <ellipse cx="130" cy="198" rx="9" ry="7" fill={GOLD} />
        <path d="M190 136q8 12 0 18q-8-6 0-18z" fill="#9CC3EA" />
      </>
    );
  }
  return (
    <>
      <ellipse cx="103" cy="166" rx="8" ry="10.5" fill="#fff" />
      <path
        d="M148 166q9-9 18 0"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M112 192c10 11 26 11 36 0"
        fill="none"
        stroke={GOLD}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  );
}

/** The logo's chef pot, with a face per notification tone. Decorative. */
export function Mascot({
  mood = "happy",
  size = 64,
  className,
}: {
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="14 8 232 244"
      aria-hidden="true"
      className={className}
    >
      <rect x="20" y="138" width="34" height="20" rx="10" fill={HANDLE} />
      <rect x="206" y="138" width="34" height="20" rx="10" fill={HANDLE} />
      <path
        d="M46 122h168v62c0 40-30 60-62 60h-44c-32 0-62-20-62-60z"
        fill={POT}
      />
      <rect x="36" y="110" width="188" height="22" rx="11" fill={RIM} />
      <g className="mascot-hat">
        <path
          d="M84 110V88a24 24 0 0 1-6-46 28 28 0 0 1 32-20 30 30 0 0 1 40 0 28 28 0 0 1 32 20 24 24 0 0 1-6 46v22z"
          fill="#fff"
          stroke={RIM}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M112 108V84M148 108V84"
          stroke={RIM}
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".45"
        />
      </g>
      <Face mood={mood} />
    </svg>
  );
}
