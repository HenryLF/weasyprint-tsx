import { createCanvas } from "@napi-rs/canvas";
import type { ChartConfiguration } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { ComponentProps } from "preact";

export interface ChartProps extends Omit<ComponentProps<"img">, "src"> {
  config: ChartConfiguration;
  width?: number;
  height?: number;
}

export function Chart({
  config,
  width = 800,
  height = 500,
  ...props
}: ChartProps) {
  const canvas = createCanvas(width, height);

  const chart = new ChartJS(canvas as unknown as HTMLCanvasElement, {
    ...config,
    options: {
      ...config.options,
      animation: false,
      responsive: false,
    },
  });

  const dataUrl = `data:image/png;base64,${canvas.toBuffer("image/png").toString("base64")}`;
  chart.destroy();

  return <img src={dataUrl} width={width} height={height} {...props} />;
}

type FunctionOptions = {
  step?: number;
  sample?: number;
};

export function chartFunction(
  func: (n: number) => number,
  options?: FunctionOptions,
) {
  const { sample = 100, step = 1 } = options ?? {};
  return Array.from({ length: sample + 1 }, (_, n) => func(n * step));
}

export function labelFunction(
  func: (n: number) => number | string,
  options?: FunctionOptions,
) {
  const { sample = 100, step = 1 } = options ?? {};
  return Array.from({ length: sample + 1 }, (_, n) => func(n * step));
}

