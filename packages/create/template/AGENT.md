# weasyprint-tsx Project — LLM Context

This is a **weasyprint-tsx** document project. The output is a PDF file generated from Preact/TSX source.

## Pipeline

```
src/index.tsx  →  Bun.build()  →  .build/index.html  →  WeasyPrint  →  output.pdf
```

- **Bun** bundles the TSX entry point (and its imports) into a static HTML file
- **WeasyPrint** converts that HTML into a PDF using CSS print rules
- The dev server (`port 3000`) serves the HTML with live reload injected

## Commands

```bash
bun run dev      # watch src/, rebuild on change, serve preview at localhost:3000
bun run build    # build once, write output.pdf
```

## Entry point (`src/index.tsx`)

Must export a **default Preact component** that returns a **complete HTML document**:

```tsx
import { H1, Page } from "@weasyprint-tsx/ui";
import "./index.css";

export default function Document() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>My Document</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        <Page>
          <H1>My Document</H1>
        </Page>
      </body>
    </html>
  );
}
```

The component must render `<html>`, `<head>`, and `<body>` — WeasyPrint receives the full HTML string.

## Stylesheet (`src/index.css`)

Must start with `@import "tailwindcss"`. Page size and margins are set via `@page`:

```css
@import "tailwindcss";

@page {
  size: A4;
  margin: 2cm 1.5cm;
}
```

CSS `@page` rules control paper size, margins, and page headers/footers. Do **not** use `html { width: 21cm }` — let WeasyPrint handle page geometry via `@page`.

## Configuration (`weasyprint-tsx.config.ts`)

```ts
import type { Config } from "@weasyprint-tsx/build";

const config: Config = {
  io: {
    output: "output.pdf",   // output path
    input: "src/index.tsx", // entry point
  },
  weasyprint: {
    path: "weasyprint",     // path to weasyprint binary
  },
};

export default config;
```

## UI Components (`@weasyprint-tsx/ui`)

All components are Preact components (not React). Import from `@weasyprint-tsx/ui`:

```ts
import {
  // Layout
  Page, PageBreak,
  BlockBox, Block,
  // Headings
  H1, H2, H3, H4, H5, H6, Title, ResetCounter,
  // Lists
  UL, OL, LI,
  // Table
  Table, Entry,
  // Inline
  DotLine, CodeBlock, Equation,
} from "@weasyprint-tsx/ui";
```

See the full API: https://github.com/weasyprint-tsx/weasyprint-tsx/blob/main/packages/ui/README.md

## CSS References

- **WeasyPrint CSS support**: https://doc.courtbouillon.org/weasyprint/stable/first_steps.html
- **Tailwind CSS v4 docs**: https://tailwindcss.com/docs

## Constraints for LLMs

- **No `position: fixed` or `position: sticky`** — these do not work in print media
- **No `vh` / `vw` units** — viewport units are meaningless in print context
- **No `@media screen`** — the document is rendered in print media; use `@media print` or no media query
- **Page geometry** belongs in `@page` rules, not on `html` or `body`
- **All layout** should use CSS that WeasyPrint supports. Flexbox and CSS Grid have partial support — prefer block layout or the `BlockBox`/`Block` components for multi-column content
- **Images** must be embedded as base64 data URIs or served by the dev server; external URLs may not resolve during build
- **Fonts** must be declared in CSS with `@font-face` or imported via Tailwind; Google Fonts CDN links work at build time
