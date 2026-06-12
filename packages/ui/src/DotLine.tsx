import { ComponentProps } from "preact";
import styles from "./DotLine.module.css";
import { joinClasses, mergeStyle } from "./utils";

interface DotLineProps extends ComponentProps<"span"> {
  num?: number;
  width?: number | string;
  inline?: boolean;
  color?: string;
  lineHeight?: string;
}

export function DotLine({
  num = 1,
  children,
  width = "100%",
  style,
  className = "",
  inline,
  color,
  lineHeight,
  ...props
}: DotLineProps) {
  if (num === 0) return;
  const css = mergeStyle(style, { width, "--dotline-color": color, "--dotline-height": lineHeight });

  if (inline)
    return (
      <span
        className={joinClasses(className, styles.inline)}
        style={css}
        {...props}
      />
    );

  return (
    <span className={joinClasses(className, styles.block)} style={css} {...props}>
      {Array.from({ length: num }, (_, k) => (
        <span key={k} className={styles.line}>
          {k === 0 ? children : null}
        </span>
      ))}
    </span>
  );
}
