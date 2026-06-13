import { ComponentProps, toChildArray, VNode } from "preact";
import styles from "./BlockBox.module.css";
import { joinClasses, mergeStyle } from "./utils";

export interface BlockBoxProps extends ComponentProps<"div"> {
  children: VNode<BlockProps>[] | VNode<BlockProps>;
  gap?: string;
  basis?: number;
  centered?: boolean;
  align?: "middle" | "top" | "bottom";
}

export interface BlockProps extends ComponentProps<"div"> {
  ratio?: number;
  centered?: boolean;
  align?: "middle" | "top" | "bottom";
}

export function Block({ children }: BlockProps) {
  return children;
}

export function BlockBox({
  children,
  className,
  basis,
  gap,
  align,
  centered: parentCentered = true,
  style,
  ...props
}: BlockBoxProps) {
  const blockList = toChildArray(children).filter(
    (child) => (child as VNode).type === Block,
  ) as VNode<BlockProps>[];

  const blockBasis =
    basis ?? blockList.reduce((acc, b) => acc + (b.props.ratio ?? 1), 0);

  const child = blockList.map(
    ({ props: { style, ratio = 1, className, centered, align, ...props } }) => (
      <div
        style={mergeStyle(style, {
          "--ratio": ratio,
          "--block-box-align": align,
        })}
        className={joinClasses(
          className,
          styles.block,
          (centered ?? parentCentered) ? styles.centered : undefined,
        )}
        {...props}
      />
    ),
  );

  return (
    <div
      children={child}
      className={joinClasses(className, styles.container)}
      style={mergeStyle(style, {
        "--block-box-basis": blockBasis,
        "--block-box-gap": gap,
        "--block-box-align": align,
      })}
      {...props}
    />
  );
}
