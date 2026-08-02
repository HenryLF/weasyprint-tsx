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

export function Stack({ gap, align, style, children, ...props }: StackProps) {

  const css = mergeStyle(style, {
    "--wsxUI-stack-ml": align == "left" ? 0 : "auto",
    "--wsxUI-stack-mr": align == "right" ? 0 : "auto",
  }
  )
  return (
    <div
      style={css}
      {...props}
    >
      {(toChildArray(children) as VNode[]).map(e => {
        if (e.type === StackChild) {
          const { className, style, gap, align, ...props } = e.props as StackProps;
          return <div className={joinClasses("wsxUI_stack_child", className)}
            style={mergeStyle(style, {
              "--wsxUI-stack-ml": align == "left" ? 0 : "auto",
              "--wsxUI-stack-mr": align == "right" ? 0 : "auto",
            })}
            {...props} />
        }

        return <div className="wsxUI_stack_child">{e}</div>
      })}
    </div>
  );
}
