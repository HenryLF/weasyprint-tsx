import { ComponentChild, ComponentProps, createContext } from "preact";
import "./List.css";
import { joinClasses, mergeStyle } from "./utils";

interface LiProps {
  value?: number;
  format?: (n: number) => string;
  marker?: string;
}
interface ListProps {
  indent?: number | string;
  spacing?: number | string;
}

interface UlProps extends ComponentProps<"div">, ListProps {
  marker?: string;
}
interface OlProps extends ComponentProps<"div">, ListProps {
  start?: number;
  format?: (n: number) => string;
  separator?: string;
}

interface OLContextType {
  type: "ol";
  getValue: () => number;
  setValue: (set: ((n: number) => number) | number) => number;
  format: (n: number) => string;
  separator: string;
}

interface ULContextType {
  type: "ul";
  marker: string;
}

type ListContextType = OLContextType | ULContextType | null;
const listContext = createContext<ListContextType>(null);

function renderLiFromContext(
  ctx: ListContextType,
  children: ComponentChild,
  props: LiProps,
) {
  if (!ctx) return children;
  if (ctx.type == "ol") {
    const id = ctx.setValue(props.value ?? ((n) => n + 1));
    return (
      <>
        <div className="wsx--li--marker">
          {`${props.format?.call(null, id) ?? ctx.format(id)}${ctx.separator}`}
        </div>
        {children}
      </>
    );
  }
  return (
    <>
      <div className="wsx--li--marker">{props.marker ?? ctx.marker}</div>
      {children}
    </>
  );
}

export function LI({
  value,
  format,
  marker,
  className,
  children,
  ...props
}: LiProps & ComponentProps<"div">) {
  return (
    <div className={joinClasses(className, `wsx--li`)} {...props}>
      <listContext.Consumer>
        {(ctx) => renderLiFromContext(ctx, children, { value, format, marker })}
      </listContext.Consumer>
    </div>
  );
}

export function UL({
  marker = "-",
  indent,
  spacing,
  className,
  style,
  ...props
}: UlProps) {
  return (
    <listContext.Provider value={{ type: "ul", marker }}>
      <div
        style={mergeStyle(style, {
          "--wsx--list--indent": indent,
          "--wsx--list--marker-spacing": spacing,
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
        type: "ol",
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
        separator: separator ?? ".",
      }}
    >
      <div
        style={mergeStyle(style, {
          counterReset: "wsx--list--counter",
          "--wsx--list--indent": indent,
          "--wsx--list--marker-spacing": spacing,
        })}
        className={joinClasses(className, "wsx--list--ol")}
        {...props}
      />
    </listContext.Provider>
  );
}
