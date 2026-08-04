import { ComponentProps } from "preact";
import "./Title.css";
import { joinClasses, mergeStyle } from "./utils";

export type Htype = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Hprops<h extends Htype> = ComponentProps<h> & {
  marker?: string;
  color?: string;
  fontSize?: string;
  count?: number;
};

export function H1({
  count,
  marker,
  color,
  fontSize,
  className,
  style,
  ...props
}: Hprops<"h1">) {
  return (
    <h1
      data-marker={marker}
      className={joinClasses(className, "wsx--h1")}
      style={mergeStyle(style, {
        "--wsx--h1--color": color,
        "--wsx--h1--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h1 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
export function H2({
  count,
  className,
  marker,
  color,
  fontSize,
  style,
  ...props
}: Hprops<"h2">) {
  return (
    <h2
      data-marker={marker}
      className={joinClasses(className, "wsx--h2")}
      style={mergeStyle(style, {
        "--wsx--h2--color": color,
        "--wsx--h2--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h2 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
export function H3({
  count,
  className,
  marker,
  color,
  fontSize,
  style,
  ...props
}: Hprops<"h3">) {
  return (
    <h3
      data-marker={marker}
      className={joinClasses(className, "wsx--h3")}
      style={mergeStyle(style, {
        "--wsx--h3--color": color,
        "--wsx--h3--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h3 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
export function H4({
  count,
  className,
  marker,
  color,
  fontSize,
  style,
  ...props
}: Hprops<"h4">) {
  return (
    <h4
      data-marker={marker}
      className={joinClasses(className, "wsx--h4")}
      style={mergeStyle(style, {
        "--wsx--h4--color": color,
        "--wsx--h4--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h4 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
export function H5({
  count,
  className,
  marker,
  color,
  fontSize,
  style,
  ...props
}: Hprops<"h5">) {
  return (
    <h5
      data-marker={marker}
      className={joinClasses(className, "wsx--h5")}
      style={mergeStyle(style, {
        "--wsx--h5--color": color,
        "--wsx--h5--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h5 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
export function H6({
  count,
  className,
  marker,
  color,
  fontSize,
  style,
  ...props
}: Hprops<"h6">) {
  return (
    <h6
      data-marker={marker}
      className={joinClasses(className, "wsx--h6")}
      style={mergeStyle(style, {
        "--wsx--h6--color": color,
        "--wsx--h6--fontsize": fontSize,
        counterSet: count ? `--wsx--counter-h6 ${count}` : undefined,
      })}
      {...props}
    />
  );
}
