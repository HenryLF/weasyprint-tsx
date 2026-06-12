import "./index.css";

import { H1, H2, LI, UL } from "@weasyprint-tsx/ui";

export default function Document() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>My Document</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        <H1>My Document</H1>
        <H2>Introduction</H2>
        <p>Edit <code>src/index.tsx</code> to start writing your document.</p>
        <UL>
          <LI>Use components from <code>@weasyprint-tsx/ui</code></LI>
          <LI>Style with Tailwind utility classes or plain CSS in <code>src/index.css</code></LI>
          <LI>Run <code>bun run dev</code> for live preview</LI>
        </UL>
      </body>
    </html>
  );
}
