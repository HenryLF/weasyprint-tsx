import { renderToString } from "katex";
import "katex/contrib/mhchem";
import "katex/dist/katex.min.css";
import { ComponentProps } from "preact";
import styles from "./Equation.module.css";
import { joinClasses } from "./utils";

export interface EquationProps extends Omit<
  ComponentProps<"span">,
  "children"
> {
  tex: string;
  displayMode?: boolean;
  aligned?: boolean;
  chemical?: boolean;
  numberFormat?: boolean;
}
export function Equation({
  tex,
  displayMode,
  className = "",
  aligned = false,
  chemical = false,
  numberFormat = true,
  ...props
}: EquationProps) {
  const numberFormated = numberFormat ? formatNumber(tex) : tex;
  const alignedCode = aligned
    ? `\\begin{aligned}
${numberFormated}
\\end{aligned}`
    : numberFormated;
  const chemCode = chemical ? `\\ce{${alignedCode}}` : alignedCode;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: renderToString(chemCode, { displayMode }),
      }}
      className={joinClasses(className, styles.equation)}
      {...props}
    />
  );
}

export interface SymbolProps {
  children?: string;
}

export function symbolFactory(
  fn: (txt?: string, children?: string) => string | undefined,
  txt?: string,
  init?: string,
) {
  return function ({ children = init }: SymbolProps) {
    return <Equation tex={fn(txt, children) ?? ""} />;
  };
}

export function underscriptFactory(txt: string, init?: string) {
  return symbolFactory(
    (txt, children) => (children ? `${txt}_{${children}}` : `${txt}`),
    txt,
    init,
  );
}

export function functionFactory(txt: string, init: string = "x") {
  return symbolFactory(
    (txt, children) => (children ? `${txt}(${children})` : `${txt}`),
    txt,
    init,
  );
}

function formatNumber(tex: string | undefined) {
  if (!tex) return "";
  return tex.replace(/(?:\d{4,}(?:[\.|\,]\d+)?|\d+[\.|\,]\d{4,})/g, (match) => {
    const [intPart, decPart] = match.split(/\.|\,/);
    const formattedInt = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\\,");
    if (decPart === undefined) return `${formattedInt}\\:`;
    const formattedDec = decPart.replace(/(\d{3})(?=\d)/g, "$1\\,");
    return `${formattedInt},${formattedDec}\\:`;
  });
}

export function LtX(props: SymbolProps) {
  return symbolFactory((_, children) => {
    return formatNumber(children);
  })(props);
}
