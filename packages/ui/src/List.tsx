import { ComponentChildren, ComponentProps } from "preact";
import styles from "./List.module.css";
import { cssString, joinClasses, mergeStyle } from "./utils";

export type CounterType =
  | "decimal"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman";

interface ListItemProps extends ComponentProps<"div"> {
  count?: number;
  marker?: string;
}

interface ListProps extends ComponentProps<"div"> {
  pre?: ComponentChildren;
  gap?: string | number;
}

interface OLProps extends ListProps {
  start?: number;
  counterType?: CounterType;
  markerPre?: string;
  markerPost?: string;
}

interface ULProps extends ListProps {
  marker?: string;
}

export function LI({
  className = "",
  count = NaN,
  style,
  marker,
  ...props
}: ListItemProps) {
  const css = mergeStyle(style, {
    counterReset: count ? `list-items ${count - 1}` : undefined,
    "--ul-marker": cssString(marker),
  });
  return (
    <div style={css} {...props} className={joinClasses(className, styles.li)} />
  );
}

function Body({
  pre,
  children,
}: {
  pre?: ComponentChildren;
  children: ComponentChildren;
}) {
  if (!pre) return <>{children}</>;
  return (
    <div className={styles.preWrapper}>
      <div className={styles.pre}>{pre}</div>
      <div>{children}</div>
    </div>
  );
}

export function OL({
  className = "",
  start = 1,
  counterType = "decimal",
  markerPre,
  markerPost,
  style,
  pre,
  gap,
  children,
  ...props
}: OLProps) {
  const css = mergeStyle(style, {
    counterReset: `list-items ${start - 1}`,
    "--ol-marker-pre": cssString(markerPre),
    "--ol-marker-post": cssString(markerPost),
    "--list-gap": gap,
  });
  return (
    <div
      {...props}
      className={joinClasses(className, styles.ol)}
      style={css}
      data-counter={counterType}
    >
      <Body pre={pre}>{children}</Body>
    </div>
  );
}

export function UL({
  className = "",
  marker,
  style,
  children,
  pre,
  gap,
  ...props
}: ULProps) {
  const css = mergeStyle(style, {
    "--ul-marker": cssString(marker),
    "--list-gap": gap,
  });
  return (
    <div {...props} className={joinClasses(className, styles.ul)} style={css}>
      <Body pre={pre}>{children}</Body>
    </div>
  );
}

export function List({
  kind,
  ...props
}: ListProps & { kind: "ul" | "ol"; start?: number }) {
  return kind === "ul" ? <UL {...props} /> : <OL {...props} />;
}
