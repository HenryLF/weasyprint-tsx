import { Stack } from "@weasyprint-tsx/ui";
import "./index.css";

export default function Document() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>weasyprint-tsx</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        <Stack gap={"1cm"} className="border-2 border-solid h-125 py-5" center="middle">
          <div className="bg-green-800 size-50"></div>

          <div className="bg-blue-800 size-50"></div>
        </Stack>
      </body>
    </html>
  );
}
