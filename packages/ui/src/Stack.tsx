import { ComponentProps } from "preact";
import styles from "./Stack.module.css";
import { joinClasses, mergeStyle } from "./utils";

interface StackProps extends ComponentProps<"div"> {
  gap?: number | string;
  align?: "left" | "right";
}

export function Stack({ gap, align, className, style, ...props }: StackProps) {
  const css = mergeStyle(style, {
    "--stack-gap": gap,
    "--stack-ml": align === "left" ? undefined : "auto",
    "--stack-mr": align === "right" ? undefined : "auto",
  });

  return (
    <div
      style={css}
      className={joinClasses(className, styles.stack)}
      {...props}
    />
  );
}
