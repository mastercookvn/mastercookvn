function hash(seed: string) {
  let value = 7;
  for (const char of seed) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  return value;
}

const SIZE = 25;

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </>
  );
}

/** Not a real QR code (V7). */
export function QrPlaceholder({ seed }: { seed: string }) {
  let state = hash(seed);
  const random = () => {
    state = (state * 1103515245 + 12345) >>> 0;
    return state / 4294967296;
  };
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= SIZE - 7 && y < 7) || (x < 7 && y >= SIZE - 7);

  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (!isFinder(x, y) && random() > 0.52) cells.push({ x, y });
    }
  }

  return (
    <svg
      className="qr"
      viewBox="-1 -1 27 27"
      role="img"
      aria-label="Mã QR minh họa"
    >
      <rect x="-1" y="-1" width="27" height="27" fill="#fff" />
      <g fill="#0F2444">
        {cells.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
        ))}
        <Finder x={0} y={0} />
        <Finder x={18} y={0} />
        <Finder x={0} y={18} />
      </g>
    </svg>
  );
}
