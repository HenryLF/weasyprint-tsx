import { ComponentProps, createContext } from "preact";
import "./List.css";
import { cssString, joinClasses, mergeStyle } from "./utils";

export interface ListItemProps extends ComponentProps<"div"> {
  value?: number;
  format?: (n: number) => string;
  marker?: string;
  indent?: number | string;
  spacing?: number | string
}

interface ListProps extends ComponentProps<"div"> {
  indent?: number | string;
  spacing?: number | string;
}

export interface UlProps extends ListProps {
  marker?: string;
}
export interface OlProps extends ListProps {
  start?: number;
  format?: (n: number) => string;
  separator?: string;
}

interface OLContextType {
  getValue: () => number;
  setValue: (set: ((n: number) => number) | number) => number;
  format: (n: number) => string;
  separator: string;
}


type ListContextType = OLContextType | null;
const listContext = createContext<ListContextType>(null);

function renderLiFromContext(
  ctx: ListContextType,
  itemProps: ListItemProps,
) {
  const { style, className, children, spacing, indent, marker, ...props } = itemProps
  const css = mergeStyle(style, {
    "--wsx--list--marker": cssString(marker),
    "--wsx--list--marker-spacing": spacing,
    "--wsx--list--indent": indent,
  }
  )
  if (ctx) {
    const id = ctx.setValue(itemProps.value ?? ((n) => n + 1));
    return (
      <div
        className={joinClasses(className, `wsx--li`)}
        style={css}
        {...props}>
        <div className="wsx--li--marker">
          {`${itemProps.format?.call(null, id) ?? ctx.format(id)}${ctx.separator}`}
        </div>
        {children}
      </div>

    );
  }

  return (
    <div
      className={joinClasses(className, `wsx--li`, `wsx--ul--item`)}
      style={css}
      {...props}
    >
      {children}
    </div>
  );
}

export function LI(
  props
    : ListItemProps) {

  return (
    <listContext.Consumer>
      {(ctx) => renderLiFromContext(ctx, props)}
    </listContext.Consumer>
  );
}

export function UL({
  marker,
  indent,
  spacing,
  className,
  style,
  ...props
}: UlProps) {
  return (
    <listContext.Provider value={null}>
      <div
        style={mergeStyle(style, {
          "--wsx--list--indent": indent,
          "--wsx--list--marker-spacing": spacing,
          "--wsx--list--marker": cssString(marker),
        })}
        className={joinClasses(className, "wsx--list--ul")}
        {...props}
      />
    </listContext.Provider>
  );
}

export function OL({
  start = 0,
  format,
  separator,
  indent,
  className,
  style,
  spacing,
  ...props
}: OlProps) {
  let value = start;
  return (
    <listContext.Provider
      value={{
        getValue() {
          return value;
        },
        setValue(set) {
          if (typeof set == "number") {
            value = set;
          } else {
            value = set(value);
          }
          return value;
        },
        format: format || ((s) => `${s}.`),
        separator: separator ?? "",
      }}
    >
      <div
        style={mergeStyle(style, {
          "--wsx--list--indent": indent,
          "--wsx--list--marker-spacing": spacing,
        })}
        className={joinClasses(className, "wsx--list--ol")}
        {...props}
      />
    </listContext.Provider>
  );
}
