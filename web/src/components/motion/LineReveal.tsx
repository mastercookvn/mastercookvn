import { Reveal } from "./Reveal";

type LineRevealProps = {
  lines: string[];
  startMs: number;
  staggerMs?: number;
  immediate?: boolean;
};

/** M02 */
export function LineReveal({
  lines,
  startMs,
  staggerMs = 120,
  immediate = false,
}: LineRevealProps) {
  return lines.map((line, index) => (
    <Reveal
      key={line}
      as="span"
      variant="line"
      className="line-mask"
      delayMs={startMs + index * staggerMs}
      immediate={immediate}
    >
      <span>{line}</span>
    </Reveal>
  ));
}
