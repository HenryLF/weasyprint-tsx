import { renderToString } from "katex";
import { ComponentProps } from "preact";
import "./Equation.css";
import { joinClasses, mergeStyle } from "./utils";

export interface LatexProps extends ComponentProps<"div"> {
  children?: string;
  tex?: string;
  displayMode?: boolean;
  aligned?: boolean;
  chemical?: boolean;
  numberFormat?: boolean;
  padding?: number | string;
}

export function LaTeX({
  children,
  tex,
  displayMode = false,
  aligned = false,
  chemical = false,
  numberFormat = true,
  padding,
  className,
  style,
  ...props
}: LatexProps) {
  let child = tex ?? children;
  if (numberFormat) child = formatNumber(child);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: renderToString(
          `${chemical ? "\\ce{" : ""} ${aligned ? "\\begin{aligned}" : ""} ${child} ${aligned ? "\\end{aligned}" : ""} ${chemical ? "}" : ""}`,
          { displayMode },
        ),
      }}
      className={joinClasses("wsx--latex", className)}
      style={mergeStyle(style, { "--wsx--latex--padding": padding })}
      {...props}
    />
  );
}

function formatNumber(tex: string | undefined) {
  if (!tex) return "";
  return tex.replace(/\d+(?:[\.|\,]\d+)?/g, (match, offset, string) => {
    const [intPart, decPart] = match.split(/\.|\,/);
    const formattedInt = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\\,");
    const nextNonSpace = string.slice(offset + match.length).match(/\S/)?.[0];
    const trailingSpace =
      nextNonSpace !== undefined && /[\\a-zA-Z]/.test(nextNonSpace)
        ? "\\:"
        : "";
    if (decPart === undefined) return `${formattedInt}${trailingSpace}`;
    const formattedDec = decPart.replace(/(\d{3})(?=\d)/g, "$1\\,");
    return `${formattedInt},${formattedDec}${trailingSpace}`;
  });
}
