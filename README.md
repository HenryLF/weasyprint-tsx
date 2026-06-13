# weasyprint-tsx

Write PDFs in TSX. Uses [Bun](https://bun.sh) to bundle your Preact components into HTML, then [WeasyPrint](https://weasyprint.org) to render them as PDF.

## Requirements

- [Bun](https://bun.sh) ≥ 1.0
- [WeasyPrint](https://weasyprint.org) — `pip install weasyprint`

## Quick start

```bash
bunx @weasyprint-tsx/create my-doc
cd my-doc
bun install
bun run dev
```

Open `http://localhost:3000` to preview the document live. The PDF is written to `output.pdf` on every save.

## Scripts

| Script | Effect |
|--------|--------|
| `bun run dev` | Watch `src/`, rebuild HTML + PDF on change, serve preview at port 3000 |
| `bun run build` | Build once and write `output.pdf` |

## Project structure

```
my-doc/
├── src/
│   ├── index.tsx          # Document root — must export a default Preact component
│   └── index.css          # Styles — must begin with @import "tailwindcss"
├── weasyprint-tsx.config.ts
└── package.json
```

`src/index.tsx` must export a default component that renders a **complete HTML document** (`<html>`, `<head>`, `<body>`). WeasyPrint receives the full HTML string.

## Configuration

Create or edit `weasyprint-tsx.config.ts` at the project root:

```ts
import type { Config } from "@weasyprint-tsx/build";

const config: Config = {
  io: { output: "report.pdf" },
  weasyprint: { path: "weasyprint", optimize_images: true },
};

export default config;
```

### `io`

| Field | Default | Description |
|-------|---------|-------------|
| `input` | `"src/index.tsx"` | Entry point |
| `output` | `"output.pdf"` | Output PDF path |
| `buildDir` | `".build"` | Intermediate HTML directory |
| `media_type` | `"print"` | CSS media type passed to WeasyPrint |

### `weasyprint`

| Field | Default | Description |
|-------|---------|-------------|
| `path` | `"weasyprint"` | Path to the WeasyPrint binary |
| `verbose` | `false` | Print WeasyPrint stdout |
| `dpi` | — | Output resolution |
| `optimize_images` | — | Compress images in output |
| `pdf_forms` | — | Enable PDF form fields |
| `pdf_variant` | — | `"pdf/a-1b"`, `"pdf/a-2b"`, `"pdf/a-3b"`, `"pdf/a-4b"`, `"pdf/ua-1"` |
| `cache` | — | WeasyPrint font/image cache folder |
| `full_fonts` | — | Embed full font files (not just subsets) |
| `srgb` | — | Force sRGB color profile |
| `jpeg_quality` | — | JPEG compression quality (0–95) |

### `dev`

| Field | Default | Description |
|-------|---------|-------------|
| `port` | `3000` | Dev server port |
| `watch` | `"src"` | Directory to watch for changes |

### `pdf`

| Field | Default | Description |
|-------|---------|-------------|
| `stylesheets` | `[]` | Additional CSS files passed to WeasyPrint via `--stylesheet` |

## UI components

`@weasyprint-tsx/ui` provides print-optimized Preact components. See [`packages/ui/README.md`](packages/ui/README.md) for the full API.

```tsx
import { H1, H2, Page, UL, LI, Table, Entry } from "@weasyprint-tsx/ui";
```
