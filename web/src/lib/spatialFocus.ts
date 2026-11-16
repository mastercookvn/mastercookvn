export const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

type ArrowKey = (typeof ARROW_KEYS)[number];

const TOLERANCE = 1;
const PERPENDICULAR_WEIGHT = 2;

/**
 * Nearest visible candidate in the arrow's direction, read from live layout
 * rather than DOM order. Null means nothing is there, so the caller lets the
 * browser scroll.
 */
export function findSpatialTarget(
  current: HTMLElement,
  candidates: HTMLElement[],
  key: ArrowKey
): HTMLElement | null {
  const from = current.getBoundingClientRect();
  const horizontal = key === "ArrowLeft" || key === "ArrowRight";

  const scored = candidates
    .filter(
      (candidate) =>
        candidate !== current &&
        (typeof candidate.checkVisibility !== "function" ||
          candidate.checkVisibility())
    )
    .map((candidate) => ({
      candidate,
      rect: candidate.getBoundingClientRect(),
    }))
    .filter(({ rect }) => {
      if (key === "ArrowRight") return rect.left >= from.right - TOLERANCE;
      if (key === "ArrowLeft") return rect.right <= from.left + TOLERANCE;
      if (key === "ArrowDown") return rect.top >= from.bottom - TOLERANCE;
      return rect.bottom <= from.top + TOLERANCE;
    })
    .map(({ candidate, rect }) => {
      const gap = horizontal
        ? Math.max(rect.left - from.right, from.left - rect.right, 0)
        : Math.max(rect.top - from.bottom, from.top - rect.bottom, 0);
      const offset = horizontal
        ? Math.abs(rect.top + rect.height / 2 - (from.top + from.height / 2))
        : Math.abs(rect.left + rect.width / 2 - (from.left + from.width / 2));
      const overlaps = horizontal
        ? rect.top < from.bottom && rect.bottom > from.top
        : rect.left < from.right && rect.right > from.left;
      return { candidate, gap, offset, overlaps };
    });

  const aligned = scored.filter((item) => item.overlaps);
  if (aligned.length > 0) {
    aligned.sort((a, b) => a.gap - b.gap || a.offset - b.offset);
    return aligned[0].candidate;
  }

  scored.sort(
    (a, b) =>
      a.gap +
      PERPENDICULAR_WEIGHT * a.offset -
      (b.gap + PERPENDICULAR_WEIGHT * b.offset)
  );
  return scored[0]?.candidate ?? null;
}
