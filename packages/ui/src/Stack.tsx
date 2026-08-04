import { ComponentProps, toChildArray, VNode } from "preact";
import "./Stack.css";
import { joinClasses, mergeStyle } from "./utils";




export interface StackProps extends ComponentProps<"div"> {
  gap?: number | string;
  align?: "left" | "right" | "middle";
}

export function StackChild({ gap, align, ...props }: StackProps) {
  return <div {...props} />
}

export function Stack({ gap, align, style, className, children, ...props }: StackProps) {

  const css = mergeStyle(style, {
    "--wsx--stack--ml": align == "left" ? 0 : "auto",
    "--wsx--stack--mr": align == "right" ? 0 : "auto",
    "--wsx--stack--gap": gap,
  }
  )
  return (
    <div
      style={css}
      className={joinClasses("wsx--stack", className)}
      {...props}
    >
      {(toChildArray(children) as VNode[]).map(e => {
        if (e.type === StackChild) {
          const { className, style, gap, align, ...props } = e.props as StackProps;
          return <div className={joinClasses("wsx--stack--child", className)}
            style={mergeStyle(style, {
              "--wsx--stack--ml": align == "left" ? 0 : "auto",
              "--wsx--stack--mr": align == "right" ? 0 : "auto",
            })}
            {...props} />
        }

        return <div className="wsx--stack--child">{e}</div>
      })}
    </div>
  );
}
