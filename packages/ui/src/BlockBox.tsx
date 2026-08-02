import { ComponentProps, toChildArray, VNode } from "preact";
import { joinClasses, mergeStyle } from "./utils";
import "./BlockBox.css"
export interface BlockProps extends ComponentProps<"div"> {
  ratio?: number;
  align?: "top" | "bottom" | "middle";
}

export interface BlockBoxProps extends ComponentProps<"div"> {
  children: VNode | VNode[];

  basis?: number
  align?: "top" | "bottom" | "middle";
  gap?: string | number;
}
export function Block({ ratio, ...props }: BlockProps) {
  return <div {...props} />
}


export function BlockBox({ basis, align, gap, className, style, children, ...props }: BlockBoxProps) {
  const childArray = toChildArray(children) as VNode[]
  const boxBasis = basis ?? childArray.reduce((acc, child) => {
    const { ratio = 1 } = (child as VNode<{ ratio?: number }>).props
    return acc + ratio
  }, 0);

  return <div className={joinClasses("wsx-blockbox", className)}
    style={mergeStyle(style, {
      "--wsx-blockbox-gap": gap,
      "--wsx-blockbox-align": align,
    })}
    {...props}>


    {childArray.map(child => {
      if (child.type === Block) {
        const { ratio = 1, align, style, className, ...props } = (child as VNode<BlockProps>).props
        const width = `calc(100% * ${ratio} / ${boxBasis})`
        return <div
          style={mergeStyle(style, { width, "--wsx-blockbox-align": align })}
          className={joinClasses("wsx-block", className)}
          {...props} />
      }
      return <div style={{ width: `calc(100%/ ${boxBasis})` }} className={"wsx-block"}>
        {child}
      </div>
    })}

  </div>
}
