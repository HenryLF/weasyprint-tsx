import {
  CodeBlock,
  DotLine,
  Entry,
  H1,
  H2,
  H3,
  LI,
  OL,
  PageBreak,
  Stack,
  Table,
  UL,
} from "@weasyprint-tsx/ui";
import "./index.css";

const configCode = `import type { Config } from "@weasyprint-tsx/build";

const config: Config = {
  io: { output: "report.pdf" },
  weasyprint: {
    path: "weasyprint",
    optimize_images: true,
    dpi: 150,
  },
  dev: { port: 3000 },
};

export default config;`;

const indexCode = `import { H1, H2, Page, UL, LI } from "@weasyprint-tsx/ui";
import "./index.css";

export default function Document() {
  return (
    <html>
      <head>
        <title>My Report</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        <Page>
          <H1>My Report</H1>
          <H2>Introduction</H2>
          <UL>
            <LI>Authored in TSX</LI>
            <LI>Rendered by WeasyPrint</LI>
          </UL>
        </Page>
      </body>
    </html>
  );
}`;

export default function Document() {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>weasyprint-tsx</title>
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        {/* ── Cover ── */}
        <div style={{ marginBottom: "1.5cm" }}>
          <H1 fontSize="28pt" color="#1e40af">
            weasyprint-tsx
          </H1>
          <p style={{ fontSize: "13pt", color: "#475569", marginTop: "0.3cm" }}>
            Write PDFs in TSX — Bun bundles your Preact components into HTML,
            WeasyPrint renders them as PDF.
          </p>
          <DotLine width="100%" color="#cbd5e1" />
        </div>

        <Stack gap="1cm">
          <div className="w-1/2">
            <H3 color="#1e40af">Requirements</H3>
            <UL>
              <LI>Bun ≥ 1.0</LI>
              <LI>WeasyPrint (pip install weasyprint)</LI>
            </UL>
          </div>
          <div className="w-1/2">
            <H3 color="#1e40af">Quick start</H3>
            <OL>
              <LI>bunx @weasyprint-tsx/create my-doc</LI>
              <LI>cd my-doc &amp;&amp; bun install</LI>
              <LI>bun run dev</LI>
            </OL>
          </div>
        </Stack>
        <PageBreak />

        {/* ── Getting Started ── */}
        <H2 color="#1e40af">Getting Started</H2>

        <p>
          The <code>create-weasyprint-tsx</code> scaffolder generates a
          ready-to-use project. After installation, two scripts are available:
        </p>

        <Table
          orientation="col"
          headerBg="#1e40af"
          headerFontSize="9pt"
          cellFontSize="9pt"
          borderColor="#e2e8f0"
        >
          <Entry content={["Script", "Effect"]} />
          <Entry
            content={[
              "bun run dev",
              "Watch src/, rebuild on change, serve preview at localhost:3000",
            ]}
          />
          <Entry content={["bun run build", "Build once, write output.pdf"]} />
        </Table>

        <H3>Project structure</H3>
        <CodeBlock
          language="plaintext"
          code={`my-doc/
├── src/
│   ├── index.tsx          # Document root — export a default Preact component
│   └── index.css          # Styles — must start with @import "tailwindcss"
├── weasyprint-tsx.config.ts
└── package.json`}
        />

        <H3>Entry point</H3>
        <p>
          <code>src/index.tsx</code> must export a default component that
          renders a complete HTML document. WeasyPrint receives the full HTML
          string.
        </p>
        <CodeBlock language="tsx" code={indexCode} />

        {/* ── Configuration ── */}
        <H2 color="#1e40af">Configuration</H2>
        <p>
          Create <code>weasyprint-tsx.config.ts</code> at the project root to
          override any default:
        </p>
        <CodeBlock language="typescript" code={configCode} />

        <H3>All config fields</H3>

        <Table
          orientation="col"
          headerBg="#334155"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
          borderColor="#e2e8f0"
        >
          <Entry content={["Field", "Default", "Description"]} />
          <Entry content={["io.input", "src/index.tsx", "TSX entry point"]} />
          <Entry content={["io.output", "output.pdf", "Output PDF path"]} />
          <Entry
            content={["io.buildDir", ".build", "Intermediate HTML directory"]}
          />
          <Entry content={["io.media_type", "print", "CSS media type"]} />
          <Entry
            content={[
              "weasyprint.path",
              "weasyprint",
              "Path to WeasyPrint binary",
            ]}
          />
          <Entry content={["weasyprint.dpi", "—", "Output resolution"]} />
          <Entry
            content={[
              "weasyprint.optimize_images",
              "—",
              "Compress images in output",
            ]}
          />
          <Entry
            content={["weasyprint.pdf_forms", "—", "Enable PDF form fields"]}
          />
          <Entry
            content={["weasyprint.pdf_variant", "—", "pdf/a-1b, pdf/ua-1, …"]}
          />
          <Entry
            content={["weasyprint.full_fonts", "—", "Embed full font files"]}
          />
          <Entry
            content={["weasyprint.cache", "—", "Font/image cache folder"]}
          />
          <Entry content={["dev.port", "3000", "Dev server port"]} />
          <Entry content={["dev.watch", "src", "Directory to watch"]} />
          <Entry
            content={[
              "pdf.stylesheets",
              "[]",
              "Extra CSS files via --stylesheet",
            ]}
          />
        </Table>

        {/* ── UI Components ── */}
        <H2 color="#1e40af">UI Components</H2>
        <p>
          <code>@weasyprint-tsx/ui</code> provides print-optimized Preact
          components. Import everything from the package root:
        </p>
        <CodeBlock
          language="ts"
          code={`import { H1, H2, Page, PageBreak, UL, OL, LI, Table, Entry, BlockBox, Block, DotLine, CodeBlock, Equation } from "@weasyprint-tsx/ui";`}
        />

        <H3>Page &amp; Layout</H3>
        <Table
          orientation="row"
          headerBg="#f1f5f9"
          borderColor="#e2e8f0"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
        >
          <Entry
            content={[
              "Page",
              "Wraps a page section (<section>). Accepts page?: string for named page rules.",
            ]}
          />
          <Entry
            content={["PageBreak", "Inserts a CSS page break. No props."]}
          />
          <Entry
            content={[
              "BlockBox",
              "Multi-column flex container. Props: gap, basis, centered, align.",
            ]}
          />
          <Entry
            content={[
              "Block",
              "Column inside BlockBox. Props: ratio, centered, align.",
            ]}
          />
        </Table>

        <H3>Headings</H3>
        <Table
          orientation="row"
          headerBg="#f1f5f9"
          borderColor="#e2e8f0"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
        >
          <Entry
            content={[
              "H1 – H6",
              "Render h1–h6. Props: marker (data-marker for CSS counters), color, fontSize.",
            ]}
          />
          <Entry
            content={[
              "ResetCounter",
              "Hidden div that resets CSS counters. Use at the top of numbered sections.",
            ]}
          />
        </Table>

        <H3>Lists</H3>
        <Table
          orientation="row"
          headerBg="#f1f5f9"
          borderColor="#e2e8f0"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
        >
          <Entry
            content={[
              "UL",
              "Unordered list. Props: marker (bullet char), gap, pre.",
            ]}
          />
          <Entry
            content={[
              "OL",
              "Ordered list. Props: start, counterType (decimal/lower-alpha/upper-roman/…), markerPre, markerPost, gap, pre.",
            ]}
          />
          <Entry
            content={[
              "LI",
              "List item. Props: marker (override bullet), count (override counter).",
            ]}
          />
        </Table>

        <H3>Table</H3>
        <Table
          orientation="row"
          headerBg="#f1f5f9"
          borderColor="#e2e8f0"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
        >
          <Entry
            content={[
              "Table",
              `orientation "col" (default): first Entry is the header row. orientation "row": first cell of each Entry is the row header. Also: headerBg, cellBg, borderWidth, borderColor, headerFontSize, cellFontSize.`,
            ]}
          />
          <Entry
            content={[
              "Entry",
              "Data row/column. content: ComponentChild[] holds cell values. Accepts per-entry overrides: headerBg, cellBg.",
            ]}
          />
        </Table>

        <H3>Inline elements</H3>
        <Table
          orientation="row"
          headerBg="#f1f5f9"
          borderColor="#e2e8f0"
          headerFontSize="8.5pt"
          cellFontSize="8.5pt"
        >
          <Entry
            content={[
              "DotLine",
              "Repeating dot fill line. Props: num, width, inline, color, lineHeight.",
            ]}
          />
          <Entry
            content={[
              "CodeBlock",
              "Syntax-highlighted code (highlight.js). Props: language, code.",
            ]}
          />
          <Entry
            content={[
              "Equation",
              "LaTeX via KaTeX. Props: tex, displayMode, aligned, chemical.",
            ]}
          />
        </Table>
      </body>
    </html>
  );
}
