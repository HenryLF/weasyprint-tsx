import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { ComponentProps } from "preact";

interface CodeBlockProps extends Omit<ComponentProps<"code">, "children"> {
  language: string;
  code: string;
}

export function CodeBlock({ code, language, ...props }: CodeBlockProps) {
  const codeBlock = hljs.highlight(code, { language: language });
  return (
    <pre style={{breakInside : "avoid"}}>
      <code {...props} dangerouslySetInnerHTML={{ __html: codeBlock.value }} />
    </pre>
  );
}
