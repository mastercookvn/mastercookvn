const DIGITS = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];

const GROUP_NAMES = ["", "nghìn", "triệu", "tỷ"];

/** 0–999, `full` when a higher group came before ("không trăm linh năm"). */
function readGroup(value: number, full: boolean): string {
  const hundreds = Math.floor(value / 100);
  const tens = Math.floor((value % 100) / 10);
  const units = value % 10;
  const words: string[] = [];

  if (hundreds > 0 || full) words.push(DIGITS[hundreds], "trăm");

  if (tens > 1) {
    words.push(DIGITS[tens], "mươi");
  } else if (tens === 1) {
    words.push("mười");
  } else if (units > 0 && (hundreds > 0 || full)) {
    words.push("linh");
  }

  if (units === 1 && tens > 1) words.push("mốt");
  else if (units === 5 && tens > 0) words.push("lăm");
  else if (units > 0) words.push(DIGITS[units]);

  return words.join(" ");
}

function readNumber(value: number): string {
  if (value === 0) return DIGITS[0];

  const billions = Math.floor(value / 1e9);
  const rest = value % 1e9;
  const groups: number[] = [];
  for (
    let remaining = rest;
    remaining > 0;
    remaining = Math.floor(remaining / 1000)
  ) {
    groups.push(remaining % 1000);
  }

  const words: string[] = [];
  if (billions > 0) words.push(readNumber(billions), GROUP_NAMES[3]);
  for (let index = groups.length - 1; index >= 0; index -= 1) {
    if (groups[index] === 0) continue;
    const higherBefore = words.length > 0;
    words.push(readGroup(groups[index], higherBefore));
    if (GROUP_NAMES[index]) words.push(GROUP_NAMES[index]);
  }
  return words.join(" ");
}

/** "Mười hai triệu không trăm linh năm nghìn đồng", for the "Bằng chữ" line. */
export function moneyInWords(amount: number): string {
  const text = `${readNumber(Math.round(Math.abs(amount)))} đồng`;
  return `${amount < 0 ? "Âm " : ""}${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
