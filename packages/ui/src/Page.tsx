import { ComponentProps } from "preact";
import styles from "./Page.module.css";
import { joinClasses, mergeStyle } from "./utils";
interface PageProps {
  page?: string;
}

export function PageBreak({ page }: PageProps) {
  return (
    <div
      style={{
        page,
      }}
      className={styles.pagebreak}
    />
  );
}
export function Page({
  page,
  style,
  className = "",
  ...props
}: PageProps & ComponentProps<"section">) {
  const css = mergeStyle(style, { page });

  return (
    <section
      style={css}
      className={joinClasses(className, styles.page)}
      {...props}
    />
  );
}
