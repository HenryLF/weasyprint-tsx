import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { ComponentProps } from "preact";
import styles from "./CodeBlock.module.css";
import { joinClasses, mergeStyle } from "./utils";

interface CodeBlockProps extends Omit<ComponentProps<"code">, "children"> {
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
    "--codeblock-bg": bgColor,
    "--color-color" : color,
    breakInside: "avoid",
  });
  return (
    <pre style={css} className={joinClasses(className, styles.pre)}>
      <code {...props} dangerouslySetInnerHTML={{ __html: codeBlock.value }} />
    </pre>
  );
}
