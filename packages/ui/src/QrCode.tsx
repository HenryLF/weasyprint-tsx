import { createCanvas } from "@napi-rs/canvas";
import { ComponentProps } from "preact";
import { create as createQR } from "qrcode";

export interface QrCodeProps extends Omit<ComponentProps<"img">, "src"> {
  href: string;
  size?: number;
  margin?: number;
  color?: string;
  bgColor?: string;
}

export function QrCode({
  color = "#000",
  bgColor = "transparent",
  href,
  size = 200,
  margin = 4,
  ...props
}: QrCodeProps) {
  const qr = createQR(href);
  const moduleCount = qr.modules.size;
  const cellSize = Math.floor((size - margin * 2) / moduleCount);
  const actualSize = cellSize * moduleCount + margin * 2;

  const canvas = createCanvas(actualSize, actualSize);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, actualSize, actualSize);

  ctx.fillStyle = color;
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.modules.get(row, col)) {
        ctx.fillRect(
          margin + col * cellSize,
          margin + row * cellSize,
          cellSize,
          cellSize,
        );
      }
    }
  }

  const dataUrl = `data:image/png;base64,${canvas.toBuffer("image/png").toString("base64")}`;

  return (
    <a href={href}>
      <img src={dataUrl} width={actualSize} height={actualSize} {...props} />
    </a>
  );
}
