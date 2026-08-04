import { ComponentProps } from "preact";
import "./Page.css";
import { joinClasses, mergeStyle } from "./utils";
export interface PageProps {
  page?: string;
}

export function PageBreak({ page }: PageProps) {
  return (
    <div
      style={{
        page,
      }}
      className={"wsx--pagebreak"}
    />
  );
}
export function Page({
  page,
  style,
  className = "",
  ...props
}: PageProps & ComponentProps<"section">) {
  const css = mergeStyle(style, { page })
  return (
    <section
      style={css}
      className={joinClasses(className, "wsx--page")}
      {...props}
    />
  );
}
