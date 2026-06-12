import { renderToString } from "katex";
import "katex/contrib/mhchem";
import "katex/dist/katex.min.css";
import { ComponentProps } from "preact";
import styles from "./Equation.module.css";
import { joinClasses } from "./utils";

interface EquationProps extends Omit<ComponentProps<"span">, "children"> {
  tex: string;
  displayMode?: boolean;
  aligned?: boolean;
  chemical?: boolean;
}
export function Equation({
  tex,
  displayMode,
  className = "",
  aligned = false,
  chemical = false,
  ...props
}: EquationProps) {
  const alignedCode = aligned
    ? `\\begin{aligned}
${tex}
\\end{aligned}`
    : tex;
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
