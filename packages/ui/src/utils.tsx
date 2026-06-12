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
  return { ...(base?.value as CSSProperties), ...extra };
}
