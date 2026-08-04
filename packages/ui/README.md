# @weasyprint-tsx/ui

Print-optimized Preact components for [weasyprint-tsx](../../README.md) documents.

This package provides layout **primitives** rather than a full design system. WeasyPrint's support for `display: flex` and `display: grid` is partial and comparatively expensive to lay out over large paginated documents, so every component here is built on plain block/inline-block flow, `table`/`table-cell`, floats, and CSS custom properties instead. This keeps documents fast and predictable to paginate, at the cost of the ergonomics you'd get from flex/grid in a browser context — expect to reach for `ratio`/`basis`/`gap`-style numeric props rather than `justify-content` or `grid-template-columns`.

```ts
import { H1, H2, Page, UL, LI, Table, Entry, BlockBox, Block } from "@weasyprint-tsx/ui";
```

All components accept a `style` prop; CSS custom properties are merged onto it via `mergeStyle`, so an explicit `style` value always wins over a shorthand prop that maps to the same variable. All components also forward an optional `className`, appended alongside the component's own class(es).

---

## Page layout

### `Page`

Wraps a page section. Maps to a `<section className="wsx--page">`.

```tsx
<Page page="cover">
  <H1>My Document</H1>
</Page>
```

| Prop | Type | Description |
|------|------|-------------|
| `page` | `string` | Value for the CSS `page` property (named page rule) |
| `...rest` | `ComponentProps<"section">` | All standard `<section>` attributes |

**Class names:** `wsx--page` on the `<section>`.

**CSS variables:** none — `page` is applied as a direct CSS property, not a custom property.

---

### `PageBreak`

Forces a page break at the current position. Renders `<div className="wsx--pagebreak">`.

```tsx
<PageBreak />
```

| Prop | Type | Description |
|------|------|-------------|
| `page` | `string` | Value for the CSS `page` property (named page rule) |

**Class names:** `wsx--pagebreak` on the `<div>`.

**CSS variables:** none.

---

## Headings

### `H1` – `H6`

Render `<h1>`–`<h6>` with optional marker, color, font-size, and CSS-counter overrides.

```tsx
<H1>Title</H1>
<H2 color="#1e40af" fontSize="14pt">Section</H2>
<H3 marker="§">Subsection</H3>
```

| Prop | Type | Description |
|------|------|-------------|
| `marker` | `string` | Sets `data-marker` attribute, rendered via a `::before` rule in the stylesheet |
| `color` | `string` | Text color |
| `fontSize` | `string` | Font size |
| `count` | `number` | Sets the heading's CSS counter to this value (e.g. to resume/restart numbering) |
| `...rest` | `ComponentProps<"h1">` etc. | All standard HTML heading attributes |

**Class names:** `wsx--h1`…`wsx--h6` on the respective heading element.

**CSS variables** (`N` = 1–6, e.g. `--wsx--h1--color`):

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--hN--color` | `inherit` | `color` |
| `--wsx--hN--fontsize` | `inherit` | `fontSize` |

Headings also drive CSS counters for automatic numbering (`H1` → upper-roman, `H2` → decimal, `H3` → upper-alpha, `H4` → decimal, `H5` → lower-alpha, `H6` → lower-roman) via the stylesheet's `counter-reset`/`counter-increment` rules — no additional setup needed in consuming documents.

---

## Lists

### `UL`

Unordered list wrapper. Children should be `<LI>` elements. Renders `<div className="wsx--list--ul">`.

```tsx
<UL marker="→" indent="1cm">
  <LI>Item one</LI>
  <LI>Item two</LI>
</UL>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `marker` | `string` | `"-"` | Default bullet for all items (overridable per-`LI`) |
| `indent` | `number \| string` | — | Left padding of the list |
| `spacing` | `number \| string` | — | Horizontal gap between marker and item content |
| `...rest` | `ComponentProps<"div">` | — | All standard `<div>` attributes |

**Class names:** `wsx--list--ul` on the wrapper `<div>`.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--list--indent` | `0.5cm` | `indent` |
| `--wsx--list--marker-spacing` | `0.1cm` | `spacing` |

---

### `OL`

Ordered list wrapper. Children should be `<LI>` elements. Renders `<div className="wsx--list--ol">`.

```tsx
<OL start={1} separator=")" format={n => String(n)}>
  <LI>First</LI>
  <LI>Second</LI>
</OL>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `start` | `number` | `0` | Starting counter value (first `LI` increments from this) |
| `format` | `(n: number) => string` | `(s) => \`${s}.\`` | Formats the counter value into marker text |
| `separator` | `string` | `"."` | Appended after the formatted marker |
| `indent` | `number \| string` | — | Left padding of the list |
| `spacing` | `number \| string` | — | Horizontal gap between marker and item content |
| `...rest` | `ComponentProps<"div">` | — | All standard `<div>` attributes |

**Class names:** `wsx--list--ol` on the wrapper `<div>`.

**CSS variables:** same as `UL` (`--wsx--list--indent`, `--wsx--list--marker-spacing`).

---

### `LI`

List item, used inside `UL` or `OL`. Renders `<div className="wsx--li">` containing a `<div className="wsx--li--marker">` plus the item content.

```tsx
<LI>Plain item</LI>
<LI marker="★">Custom marker (inside UL)</LI>
<LI value={5}>Jump the counter (inside OL)</LI>
<LI format={n => `#${n}`}>Custom per-item format (inside OL)</LI>
```

| Prop | Type | Description |
|------|------|-------------|
| `marker` | `string` | Overrides the parent `UL`'s marker for this item only |
| `value` | `number \| ((n: number) => number)` | Sets or transforms the running counter (`OL` only) |
| `format` | `(n: number) => string` | Overrides the parent `OL`'s format for this item only |
| `...rest` | `ComponentProps<"div">` | All standard `<div>` attributes |

**Class names:** `wsx--li` on the item `<div>`; `wsx--li--marker` on the inner marker `<div>`.

**CSS variables:** none directly — `LI` renders inside its parent's indent/spacing context.

---

## Table

### `Table`

Renders an HTML `<table className="wsx--table">`. Children must be `<Entry>` components.

```tsx
<Table orientation="col" headerBg="#1e40af" borderColor="#cbd5e1">
  <Entry content={["Alice", "Engineer", "Berlin"]} />
  <Entry content={["Bob", "Designer", "Paris"]} />
</Table>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"col"` \| `"row"` | `"col"` | `"col"`: each `Entry` is a column header with its `content` as the rows beneath it (`<thead>`/`<tbody>` grid). `"row"`: each `Entry` becomes one `<tr>`, its heading text is a row header (`<th scope="row">`) and `content` fills the cells across that row. |
| `headerBg` | `string` | — | Background color for header cells |
| `cellBg` | `string` | — | Background color for data cells |
| `headerFontSize` | `string` | — | Font size for header cells |
| `cellFontSize` | `string` | — | Font size for data cells |
| `borderWidth` | `string` | `1px` | Border width between cells |
| `borderColor` | `string` | `currentColor` | Border color between cells |
| `contentClass` | `string` | — | Extra class applied to all data cells (merged with each `Entry`'s own `contentClass`) |
| `headerClass` | `string` | — | Extra class applied to all header cells |
| `...rest` | `ComponentProps<"table">` | — | All standard `<table>` attributes |

**Class names:** `wsx--table` always; plus `wsx--table--row` when `orientation="col"`, or `wsx--table--col` when `orientation="row"` (these track the resulting border layout, not the `orientation` value itself). Header/data cells don't carry a fixed `wsx--` class — they're styled by `.wsx--table th` / `.wsx--table td` descendant selectors — but do receive `headerClass`/`contentClass` if supplied.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--table--header-color` | `transparent` | `headerBg` (on `Table` or per-`Entry`) |
| `--wsx--table--cell-color` | `transparent` | `cellBg` (on `Table` or per-`Entry`) |
| `--wsx--table--header-fontsize` | `inherit` | `headerFontSize` (on `Table` or per-`Entry`) |
| `--wsx--table--cell-fontsize` | `inherit` | `cellFontSize` (on `Table` or per-`Entry`) |
| `--wsx--table--border-width` | `1px` | `borderWidth` |
| `--wsx--table--border-color` | `currentColor` | `borderColor` |

---

### `Entry`

Data row or column for `Table`. Renders `null` — `Table` reads its props directly and never mounts it as a real element.

```tsx
<Entry content={["Name", "Role", "Location"]} headerBg="#e2e8f0" />
```

| Prop | Type | Description |
|------|------|-------------|
| `content` | `ComponentChild[]` | Cell values (rows beneath the header in `"col"` orientation, or cells across the row in `"row"` orientation) |
| `contentClass` | `string` | Extra class for this Entry's data cells |
| `headerBg` | `string` | Overrides `Table`'s `headerBg` for this Entry |
| `cellBg` | `string` | Overrides `Table`'s `cellBg` for this Entry |
| `headerFontSize` | `string` | Overrides `Table`'s `headerFontSize` for this Entry |
| `cellFontSize` | `string` | Overrides `Table`'s `cellFontSize` for this Entry |
| `...rest` | `ComponentProps<"th">` | Forwarded to the header cell (e.g. `children` as header label) |

**Class names:** none — `Entry` itself renders nothing; its `className`/`contentClass` are read by `Table` and applied to the cells it generates.

**CSS variables:** none of its own — see `Table`.

---

## BlockBox / Block

Ratio-based multi-column layout without `flex`/`grid`: `BlockBox` lays out `<Block>` children as `inline-block` columns sized with `calc()`.

### `BlockBox`

```tsx
<BlockBox gap="1cm">
  <Block ratio={2}>Wide column</Block>
  <Block ratio={1}>Narrow column</Block>
</BlockBox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `basis` | `number` | sum of children's `ratio` (each defaulting to `1`) | Total ratio units the columns are divided into. Set explicitly to reserve empty space (e.g. columns summing to less than `basis`). |
| `align` | `"top"` \| `"bottom"` \| `"middle"` | `"middle"` | Default vertical alignment for blocks (`vertical-align`), overridable per `Block` |
| `gap` | `string \| number` | — | Horizontal gap between blocks |
| `children` | `VNode \| VNode[]` | — | `Block` elements (or any other children, each wrapped in an equal-width column) |
| `...rest` | `ComponentProps<"div">` | — | All standard `<div>` attributes |

**Class names:** `wsx--blockbox` on the container `<div>`; `wsx--block` on each generated column `<div>` (whether it came from a `Block` child or a plain child).

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--blockbox--gap` | `0` | `gap` |
| `--wsx--blockbox--align` | `middle` | `align` (container default; a `Block`'s own `align` overrides it locally on that block) |

### `Block`

A single column inside `BlockBox`. Must be a direct child for its `ratio`/`align` to be read — `BlockBox` inspects each child's props itself and renders the column `<div>` on its behalf, rather than `Block` rendering its own layout.

| Prop | Type | Description |
|------|------|-------------|
| `ratio` | `number` | Relative width versus sibling `Block`s (default `1`); width is `calc(100% * ratio / basis)` |
| `align` | `"top"` \| `"bottom"` \| `"middle"` | Vertical alignment override for this block only |
| `...rest` | `ComponentProps<"div">` | All standard `<div>` attributes |

**Class names:** none of its own — see `wsx--block` above, applied by `BlockBox`.

---

## Stack

Vertical stack of children with configurable per-child left/right margins — a `display: block` alternative to a flex column.

```tsx
<Stack gap="4mm">
  <div>First</div>
  <StackChild align="right">Right-aligned</StackChild>
  <div>Third</div>
</Stack>
```

| Prop (`Stack`) | Type | Description |
|------|------|-------------|
| `gap` | `number \| string` | Vertical gap between stacked children |
| `align` | `"left"` \| `"right"` \| `"middle"` | Default horizontal alignment for all children (`"middle"` centers, `"left"`/`"right"` push flush to that side) |
| `children` | — | Any children; plain children and `StackChild` children are both wrapped in a `"wsx--stack--child"` row |
| `...rest` | `ComponentProps<"div">` | All standard `<div>` attributes |

`StackChild` is a marker component — wrap a child in it only to override `gap`/`align` for that one item; `Stack` reads its props and re-renders the row itself.

| Prop (`StackChild`) | Type | Description |
|------|------|-------------|
| `align` | `"left"` \| `"right"` \| `"middle"` | Horizontal alignment override for this child only |

**Class names:** `wsx--stack` on the container `<div>`; `wsx--stack--child` on each generated child row.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--stack--gap` | `5mm` | `gap` on `Stack` |
| `--wsx--stack--ml` | `auto` | `align` (`"left"` → `0`, else `auto`) |
| `--wsx--stack--mr` | `auto` | `align` (`"right"` → `0`, else `auto`) |

---

## DotLine

A repeating dot pattern, useful for fill lines in tables of contents or forms.

```tsx
<DotLine width="100%" />
<DotLine inline width="4cm" lineHeight="1.2em" />
<DotLine count={3} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` (renders 1 line) | Number of stacked dot-line rows |
| `inline` | `boolean` | `false` | Render a single `inline-block` dot line instead of `count` block-level rows |
| `width` | `number \| string` | — | Width of each dot line |
| `lineHeight` | `string` | — | Minimum height of each dot-line row |
| `marginBottom` | `string` | — | Bottom margin of each dot-line row |
| `...rest` | `ComponentProps<"div">` | — | All standard `<div>` attributes |

**Class names:** `wsx--dotline` on each dot-line row `<div>`.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--dotline--line-height` | `1em` | `lineHeight` |
| `--wsx--dotline--margin-bottom` | `0.2em` | `marginBottom` |

---

## CodeBlock

Syntax-highlighted code block using highlight.js (Atom One Dark theme by default).

```tsx
<CodeBlock language="typescript" code={`const x: number = 42;`} />
<CodeBlock language="python" code="print('hi')" bgColor="#f8fafc" color="#0f172a" />
```

| Prop | Type | Description |
|------|------|-------------|
| `language` | `string` | highlight.js language identifier (e.g. `"typescript"`, `"python"`, `"bash"`) |
| `code` | `string` | Source code string |
| `bgColor` | `string` | Background color |
| `color` | `string` | Text color |
| `...rest` | `Omit<ComponentProps<"code">, "children">` | Forwarded to the inner `<code>` element |

**Class names:** `wsx--code-block` on the outer `<pre>`. The inner `<code>` gets its highlight.js token classes from `hljs.highlight()`, not a `wsx--` class.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--code-block--bg` | `#0f172a` | `bgColor` |
| `--wsx--code-block--color` | `#cbd5e1` | `color` |

Renders with `break-inside: avoid` to prevent page breaks mid-block.

---

## LaTeX

LaTeX/chemistry equation rendering via KaTeX.

```tsx
<LaTeX displayMode>{"E = mc^2"}</LaTeX>
<LaTeX tex="H2O" chemical />
<LaTeX aligned displayMode>{"x &= a + b \\\\ y &= c + d"}</LaTeX>
<LaTeX numberFormat={false}>{"1234567"}</LaTeX>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tex` | `string` | — | LaTeX source (takes precedence over `children`) |
| `children` | `string` | — | LaTeX source, used if `tex` is not set |
| `displayMode` | `boolean` | `false` | Render as block-level (display) equation instead of inline |
| `aligned` | `boolean` | `false` | Wrap in `\begin{aligned}…\end{aligned}` |
| `chemical` | `boolean` | `false` | Wrap in `\ce{…}` for chemical notation |
| `numberFormat` | `boolean` | `true` | Auto-inserts thousands separators (`\,`) into bare numbers in the source |
| `padding` | `number \| string` | — | Padding around the rendered equation |
| `...rest` | `ComponentProps<"div">` | — | All standard `<div>` attributes |

**Class names:** `wsx--latex` on the `<div>`.

**CSS variables:**

| Variable | Default | Set by |
|----------|---------|--------|
| `--wsx--latex--padding` | `2px` | `padding` |

---

## Chart

Renders a [chart.js](https://www.chartjs.org/) chart server-side as a base64-encoded PNG `<img>` (via `@napi-rs/canvas`, no browser required).

### `Chart`

```tsx
import type { ChartConfiguration } from "chart.js";
import { Chart } from "@weasyprint-tsx/ui";

const config: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [{ label: "Sales", data: [12, 8, 21] }],
  },
};

<Chart config={config} width={600} height={300} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `ChartConfiguration` | — | chart.js configuration object (rendered with `animation: false`, `responsive: false`) |
| `width` | `number` | `800` | Canvas width in pixels |
| `height` | `number` | `500` | Canvas height in pixels |
| `...rest` | `Omit<ComponentProps<"img">, "src">` | — | All standard `<img>` attributes except `src` |

**Class names:** none — plain `<img>`, only your own `className` if passed.

**CSS variables:** none — plain `<img>`, no component class.

---

### `chartFunction`

Samples a numeric function into a data array for chart datasets. Produces `sample + 1` values evaluated at `n * step` for `n` in `0..sample`.

```ts
chartFunction(func, options?)
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `func` | `(n: number) => number` | — | Function to sample |
| `options.step` | `number` | `1` | Multiplier applied to the index before calling `func` |
| `options.sample` | `number` | `100` | Number of intervals (yields `sample + 1` points) |

```tsx
import { Chart, chartFunction } from "@weasyprint-tsx/ui";

<Chart config={{
  type: "line",
  data: {
    labels: chartFunction(n => n, { step: 0.1 }),
    datasets: [{ label: "sin(x)", data: chartFunction(Math.sin, { step: 0.1 }) }],
  },
}} />
```

---

### `labelFunction`

Same signature as `chartFunction` but the sampling function may return a `number` or `string`. Use to generate axis labels.

```ts
labelFunction(func, options?)
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `func` | `(n: number) => number \| string` | — | Function to sample |
| `options.step` | `number` | `1` | Multiplier applied to the index |
| `options.sample` | `number` | `100` | Number of intervals (yields `sample + 1` values) |

---

## QrCode

Renders a QR code server-side as a base64-encoded PNG `<img>`, wrapped in a link to the encoded URL.

```tsx
<QrCode href="https://example.com" size={150} color="#000" bgColor="#fff" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | URL to encode, and the `href` of the wrapping `<a>` |
| `size` | `number` | `200` | Target pixel size (actual output is rounded to a whole number of QR modules) |
| `margin` | `number` | `4` | Quiet-zone margin in pixels |
| `color` | `string` | `"#000"` | Module (foreground) color |
| `bgColor` | `string` | `"transparent"` | Background color |
| `...rest` | `Omit<ComponentProps<"img">, "src">` | — | All standard `<img>` attributes except `src` |

**Class names:** none — the `<a>` wrapper and `<img>` carry no `wsx--` class, only your own `className` on the `<img>` if passed.

**CSS variables:** none — colors are baked into the generated PNG, not applied via CSS.

---

## Utilities

A handful of small helpers are also exported for building custom components on top of the same conventions:

| Export | Description |
|--------|-------------|
| `joinClasses(...classes)` | Joins class names, filtering out `undefined`/empty values |
| `mergeStyle(base, extra)` | Merges an inline `style` prop (object or string) with an object of extra properties, dropping `null`/`undefined` entries |
| `cssString(value)` | Wraps a string in literal double quotes for use as a CSS `content` value, or `undefined` if the input is `undefined` |
| `toRomanNumberals(n, lower?)` / `toLowerRoman(n)` | Converts a number to Roman numerals |
| `toAlphabetical(n, lower?)` / `toLowerAlphabetical(n)` | Converts a number to a base-26 letter sequence (`A`, `B`, … `Z`, `AA`, …) |
