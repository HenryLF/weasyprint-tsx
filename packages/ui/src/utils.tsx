import { CSSProperties, SignalLike, Signalish } from "preact";

export const cssString = (v: string | undefined) =>
  v !== undefined ? `"${v}"` : undefined;

export function joinClasses(
  ...classes: (string | SignalLike<string | undefined> | undefined)[]
): string {
  return classes.join(" ").trim();
}

export function mergeStyle(
  base: Signalish<string | CSSProperties | undefined>,
  extra: CSSProperties,
): CSSProperties | string {
  if (typeof base === "string") {
    const extraStr = Object.entries(extra)
      .filter(([, v]) => v != null)
      .map(
        ([k, v]) => `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${v}`,
      )
      .join(";");
    return extraStr ? `${base};${extraStr}` : base;
  }
  const baseObj =
    base != null && typeof base === "object" && "value" in base
      ? (base.value as CSSProperties)
      : (base as CSSProperties | undefined);
  return { ...baseObj, ...extra };
}

const ROMAN_NUMERALS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRomanNumberals(n: number, lower: boolean = false): string {
  let remaining = n;
  let result = "";
  for (const [value, numeral] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return lower ? result.toLowerCase() : result;
}
export const toLowerRoman = (n: number) => toRomanNumberals(n, true);

export function toAlphabetical(n: number, lower: boolean = false): string {
  let remaining = n;
  let result = "";
  while (remaining > 0) {
    remaining -= 1;
    result = String.fromCharCode(65 + (remaining % 26)) + result;
    remaining = Math.floor(remaining / 26);
  }
  return lower ? result.toLowerCase() : result;
}

export const toLowerAlphabetical = (n: number) => toAlphabetical(n, true);
