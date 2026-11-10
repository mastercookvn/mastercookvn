/**
 * Vietnamese lunar calendar (âm lịch), computed for UTC+7 with the astronomical
 * algorithm by Hồ Ngọc Đức. Used to place death anniversaries (đám giỗ), which
 * families count by lunar date, on the solar calendar.
 */

export type LunarDate = {
  day: number;
  month: number;
  year: number;
  leap: boolean;
};

const TIME_ZONE = 7;

const jdFromDate = (day: number, month: number, year: number) => {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  return jd < 2299161
    ? day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083
    : jd;
};

const jdToDate = (jd: number) => {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: b * 100 + d - 4800 + Math.floor(m / 10),
  };
};

const newMoon = (k: number) => {
  const t = k / 1236.85;
  const t2 = t * t;
  const t3 = t2 * t;
  const dr = Math.PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * t2 - 0.000000155 * t3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * dr);
  const m = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3;
  const mpr = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3;
  const f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3;
  let c1 =
    (0.1734 - 0.000393 * t) * Math.sin(m * dr) + 0.0021 * Math.sin(2 * dr * m);
  c1 =
    c1 -
    0.4068 * Math.sin(mpr * dr) +
    0.0161 * Math.sin(dr * 2 * mpr) -
    0.0004 * Math.sin(dr * 3 * mpr);
  c1 =
    c1 +
    0.0104 * Math.sin(dr * 2 * f) -
    0.0051 * Math.sin(dr * (m + mpr)) -
    0.0074 * Math.sin(dr * (m - mpr)) +
    0.0004 * Math.sin(dr * (2 * f + m));
  c1 =
    c1 -
    0.0004 * Math.sin(dr * (2 * f - m)) -
    0.0006 * Math.sin(dr * (2 * f + mpr)) +
    0.001 * Math.sin(dr * (2 * f - mpr)) +
    0.0005 * Math.sin(dr * (2 * mpr + m));
  const deltaT =
    t < -11
      ? 0.001 +
        0.000839 * t +
        0.0002261 * t2 -
        0.00000845 * t3 -
        0.000000081 * t * t3
      : -0.000278 + 0.000265 * t + 0.000262 * t2;
  return jd1 + c1 - deltaT;
};

const newMoonDay = (k: number) => Math.floor(newMoon(k) + 0.5 + TIME_ZONE / 24);

const sunLongitude = (jdn: number) => {
  const t = (jdn - 2451545.5 - TIME_ZONE / 24) / 36525;
  const t2 = t * t;
  const dr = Math.PI / 180;
  const m = 357.5291 + 35999.0503 * t - 0.0001559 * t2 - 0.00000048 * t * t2;
  const l0 = 280.46645 + 36000.76983 * t + 0.0003032 * t2;
  let dl = (1.9146 - 0.004817 * t - 0.000014 * t2) * Math.sin(dr * m);
  dl += (0.019993 - 0.000101 * t) * Math.sin(dr * 2 * m);
  dl += 0.00029 * Math.sin(dr * 3 * m);
  let l = (l0 + dl) * dr;
  l -= Math.PI * 2 * Math.floor(l / (Math.PI * 2));
  return Math.floor((l / Math.PI) * 6);
};

const lunarMonth11 = (year: number) => {
  const off = jdFromDate(31, 12, year) - 2415021;
  const k = Math.floor(off / 29.530588853);
  const nm = newMoonDay(k);
  return sunLongitude(nm) >= 9 ? newMoonDay(k - 1) : nm;
};

const leapMonthOffset = (a11: number) => {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last: number;
  let i = 1;
  let arc = sunLongitude(newMoonDay(k + i));
  do {
    last = arc;
    i += 1;
    arc = sunLongitude(newMoonDay(k + i));
  } while (arc !== last && i < 14);
  return i - 1;
};

export function solarToLunar(date: Date): LunarDate {
  const dayNumber = jdFromDate(
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  );
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = newMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = newMoonDay(k);
  let a11 = lunarMonth11(date.getFullYear());
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = date.getFullYear();
    a11 = lunarMonth11(date.getFullYear() - 1);
  } else {
    lunarYear = date.getFullYear() + 1;
    b11 = lunarMonth11(date.getFullYear() + 1);
  }
  const day = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let leap = false;
  let month = diff + 11;
  if (b11 - a11 > 365) {
    const leapDiff = leapMonthOffset(a11);
    if (diff >= leapDiff) {
      month = diff + 10;
      if (diff === leapDiff) leap = true;
    }
  }
  if (month > 12) month -= 12;
  if (month >= 11 && diff < 4) lunarYear -= 1;
  return { day, month, year: lunarYear, leap };
}

/** Solar date of a lunar date, or null when that lunar day does not exist. */
export function lunarToSolar(
  day: number,
  month: number,
  year: number,
  leap = false
): Date | null {
  let a11: number;
  let b11: number;
  if (month < 11) {
    a11 = lunarMonth11(year - 1);
    b11 = lunarMonth11(year);
  } else {
    a11 = lunarMonth11(year);
    b11 = lunarMonth11(year + 1);
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = month - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = leapMonthOffset(a11);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (leap && month !== leapMonth) return null;
    if (leap || off >= leapOff) off += 1;
  } else if (leap) {
    return null;
  }
  const monthStart = newMoonDay(k + off);
  const solar = jdToDate(monthStart + day - 1);
  const result = new Date(solar.year, solar.month - 1, solar.day);
  const check = solarToLunar(result);
  return check.day === day && check.month === month ? result : null;
}

export const LUNAR_MONTH_NAMES = [
  "Giêng",
  "Hai",
  "Ba",
  "Tư",
  "Năm",
  "Sáu",
  "Bảy",
  "Tám",
  "Chín",
  "Mười",
  "Mười một",
  "Chạp",
];

/** "15/10" for the calendar cell, "Mùng 1 tháng 10" style for labels. */
export const formatLunarShort = (lunar: LunarDate) =>
  `${lunar.day}/${lunar.month}${lunar.leap ? "N" : ""}`;

export const formatLunarLong = (lunar: LunarDate) =>
  `${lunar.day <= 10 ? `Mùng ${lunar.day}` : lunar.day === 15 ? "Rằm" : `Ngày ${lunar.day}`} tháng ${LUNAR_MONTH_NAMES[lunar.month - 1]}${lunar.leap ? " (nhuận)" : ""}`;
