import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { ComponentProps } from "preact";
import "./CodeBlock.css";
import { joinClasses, mergeStyle } from "./utils";


export interface CodeBlockProps extends Omit<
  ComponentProps<"code">,
  "children"
> {
  language: string;
  code: string;
  bgColor?: string;
  color?: string;
}

export function CodeBlock({
  code,
  language,
  bgColor,
  color,
  style,
  className,
  ...props
}: CodeBlockProps) {
  const codeBlock = hljs.highlight(code, { language: language });
  const css = mergeStyle(style, {
    "--wsx--code-block--bg": bgColor,
    "--wsx--code-block--color": color,
    breakInside: "avoid",
  });
  return (
    <pre style={css} className={joinClasses(className, "wsx--code-block")}>
      <code {...props} dangerouslySetInnerHTML={{ __html: codeBlock.value }} />
    </pre>
  );
}
