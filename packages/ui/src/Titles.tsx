import { ComponentProps, ComponentType } from "preact";
import styles from "./Title.module.css";
import { joinClasses, mergeStyle } from "./utils";

type Htype = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Hprops<h extends Htype> = ComponentProps<h> & {
  marker?: string;
  color?: string;
  fontSize?: string;
};

export function H1({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h1">) {
  return (
    <h1
      data-marker={marker}
      className={joinClasses(className, styles.h1)}
      style={mergeStyle(style, { "--h1-color": color, "--h1-fontsize": fontSize })}
      {...props}
    />
  );
}
export function H2({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h2">) {
  return (
    <h2
      data-marker={marker}
      className={joinClasses(className, styles.h2)}
      style={mergeStyle(style, { "--h2-color": color, "--h2-fontsize": fontSize })}
      {...props}
    />
  );
}
export function H3({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h3">) {
  return (
    <h3
      data-marker={marker}
      className={joinClasses(className, styles.h3)}
      style={mergeStyle(style, { "--h3-color": color, "--h3-fontsize": fontSize })}
      {...props}
    />
  );
}
export function H4({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h4">) {
  return (
    <h4
      data-marker={marker}
      className={joinClasses(className, styles.h4)}
      style={mergeStyle(style, { "--h4-color": color, "--h4-fontsize": fontSize })}
      {...props}
    />
  );
}
export function H5({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h5">) {
  return (
    <h5
      data-marker={marker}
      className={joinClasses(className, styles.h5)}
      style={mergeStyle(style, { "--h5-color": color, "--h5-fontsize": fontSize })}
      {...props}
    />
  );
}
export function H6({ className = "", marker, color, fontSize, style, ...props }: Hprops<"h6">) {
  return (
    <h6
      data-marker={marker}
      className={joinClasses(className, styles.h6)}
      style={mergeStyle(style, { "--h6-color": color, "--h6-fontsize": fontSize })}
      {...props}
    />
  );
}

const TAG_MAP = { h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 };

type TitleProps<h extends Htype> = Hprops<h> & { type: h };
export function Title<h extends Htype>({ type, ...props }: TitleProps<h>) {
  const Tag = TAG_MAP[type] as ComponentType<Hprops<h>>;
  return <Tag {...(props as Hprops<h>)} />;
}

export function ResetCounter({
  type,
  value,
}: {
  type: Htype | Htype[];
  value?: number | (number | null)[];
}) {
  const types = Array.isArray(type) ? type : [type];
  const values = Array.isArray(value) ? value : [value];
  return (
    <div
      style={{
        counterReset: types
          .map((t, k) =>
            `count-${t} ${(values[k % types.length] ?? 1) - 1}`.trim(),
          )
          .join(" "),
        visibility: "hidden",
        height: 0,
        width: 0,
      }}
    />
  );
}
