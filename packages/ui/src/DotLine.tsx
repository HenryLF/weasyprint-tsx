import { ComponentProps } from "preact";
import "./DotLine.css";
import { joinClasses, mergeStyle } from "./utils";

export interface DotLineProps extends ComponentProps<"div"> {
  count?: number;
  inline?: boolean;
  width?: string | number;
  lineHeight?: string;
  marginBottom?: string;
}

export function DotLine({
  count = 0,
  lineHeight,
  marginBottom,
  className,
  inline,
  width,
  style,
  ...props
}: DotLineProps) {
  return (
    <>
      {Array(inline ? 1 : count || 1)
        .fill(0)
        .map((_) => (
          <div
            style={mergeStyle(style, {
              "--wsx--dotline--line-height": lineHeight,
              "--wsx--dotline--margin-bottom": marginBottom,
              width,
              display: inline ? "inline-block" : undefined,
            })}
            className={joinClasses(className, "wsx--dotline")}
            {...props}
          />
        ))}
    </>
  );
}
