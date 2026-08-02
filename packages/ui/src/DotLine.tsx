import { ComponentProps } from "preact";

export interface DotLineProps extends ComponentProps<'div'> {
  count?: number,
  lineHeight?: string
}

export function DotLine({ count = 0, ...props }: DotLineProps) {


  return <div>

  </div>
}