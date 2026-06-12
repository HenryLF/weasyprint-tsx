# @weasyprint-tsx/ui

Print-optimized Preact components for [weasyprint-tsx](../../README.md) documents.

```ts
import { H1, H2, Page, UL, LI, Table, Entry, BlockBox, Block } from "@weasyprint-tsx/ui";
```

---

## Page layout

### `Page`

Wraps a page section. Maps to a `<section>` element.

```tsx
<Page page="cover">
  <H1>My Document</H1>
</Page>
```

| Prop | Type | Description |
|------|------|-------------|
| `page` | `string` | Value for the CSS `page` property (named page rule) |

---

### `PageBreak`

Forces a page break at the current position.

```tsx
<PageBreak />
```

No props.

---

## Headings

### `H1` – `H6`

Render `<h1>`–`<h6>` with optional marker and color overrides. Headings participate in CSS counters for automatic numbering if you set them up in your stylesheet.

```tsx
<H1>Title</H1>
<H2 color="#1e40af" fontSize="14pt">Section</H2>
<H3 marker="§">Subsection</H3>
```

| Prop | Type | Description |
|------|------|-------------|
| `marker` | `string` | Sets `data-marker` attribute (used by CSS `::before` counter content) |
| `color` | `string` | Inline text color |
| `fontSize` | `string` | Inline font size |
| `...rest` | `ComponentProps<"h1">` etc. | All standard HTML heading attributes |

---

### `Title`

Generic heading that accepts a `type` prop.

```tsx
<Title type="h2" color="red">Dynamic heading</Title>
```

| Prop | Type | Description |
|------|------|-------------|
| `type` | `"h1"` \| `"h2"` \| … \| `"h6"` | Which heading element to render |

---

### `ResetCounter`

Renders a hidden `<div>` that resets CSS counters. Use at the start of a section when you want numbered headings to restart.

```tsx
<ResetCounter />
```

No props.

---

## Lists

### `UL`

Unordered list. Children should be `<LI>` elements.

```tsx
<UL marker="→">
  <LI>Item one</LI>
  <LI>Item two</LI>
</UL>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `marker` | `string` | `"•"` | Bullet character |
| `gap` | `string \| number` | — | Gap between items |
| `pre` | `ComponentChildren` | — | Content rendered before the list (e.g. a label) |

---

### `OL`

Ordered list. Children should be `<LI>` elements.

```tsx
<OL counterType="lower-roman" markerPost=".">
  <LI>First</LI>
  <LI>Second</LI>
</OL>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `start` | `number` | `1` | Starting counter value |
| `counterType` | `"decimal"` \| `"lower-alpha"` \| `"upper-alpha"` \| `"lower-roman"` \| `"upper-roman"` | `"decimal"` | Counter style |
| `markerPre` | `string` | — | String prepended to the counter (e.g. `"("`) |
| `markerPost` | `string` | `"."` | String appended to the counter |
| `gap` | `string \| number` | — | Gap between items |
| `pre` | `ComponentChildren` | — | Content rendered before the list |

---

### `LI`

List item, used inside `UL` or `OL`.

```tsx
<LI>Plain item</LI>
<LI marker="★">Custom marker</LI>
```

| Prop | Type | Description |
|------|------|-------------|
| `marker` | `string` | Override the list's default marker for this item |
| `count` | `number` | Override the displayed counter value (OL only) |

---

## Table

### `Table`

Renders an HTML table. Children must be `<Entry>` components.

```tsx
<Table orientation="col" headerBg="#1e40af" borderColor="#cbd5e1">
  <Entry content={["Alice", "Engineer", "Berlin"]} />
  <Entry content={["Bob", "Designer", "Paris"]} />
</Table>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"col"` \| `"row"` | `"col"` | `"col"`: first Entry is the header row. `"row"`: first cell of each Entry is the row header. |
| `headerBg` | `string` | — | Background color for header cells |
| `cellBg` | `string` | — | Background color for data cells |
| `headerFontSize` | `string` | — | Font size for header cells |
| `cellFontSize` | `string` | — | Font size for data cells |
| `borderWidth` | `string` | `"1px"` | Border width |
| `borderColor` | `string` | `"#000"` | Border color |
| `contentClass` | `string` | — | Extra class applied to all data cells |
| `headerClass` | `string` | — | Extra class applied to all header cells |

---

### `Entry`

Data row or column for `Table`. Renders `null` — `Table` reads its props directly.

```tsx
<Entry content={["Name", "Role", "Location"]} headerBg="#e2e8f0" />
```

| Prop | Type | Description |
|------|------|-------------|
| `content` | `ComponentChild[]` | Array of cell values |
| `contentClass` | `string` | Extra class for this Entry's data cells |
| `headerBg` | `string` | Override header background for this Entry |
| `cellBg` | `string` | Override cell background for this Entry |
| `headerFontSize` | `string` | Override header font size |
| `cellFontSize` | `string` | Override cell font size |

---

## BlockBox / Block

Two-component system for multi-column / ratio-based layouts.

### `BlockBox`

Container. Lays out `<Block>` children side by side.

```tsx
<BlockBox gap="1cm" basis={50}>
  <Block ratio={2}>Wide column</Block>
  <Block ratio={1}>Narrow column</Block>
</BlockBox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `string` | `"0"` | Gap between blocks |
| `basis` | `number` | `100` | Flex basis percentage for equal-width fallback |
| `centered` | `boolean` | `false` | Center block contents horizontally |
| `align` | `"top"` \| `"middle"` \| `"bottom"` | `"top"` | Vertical alignment of blocks |

### `Block`

A single column inside `BlockBox`.

| Prop | Type | Description |
|------|------|-------------|
| `ratio` | `number` | Relative width ratio compared to siblings |
| `centered` | `boolean` | Center this block's content |
| `align` | `"top"` \| `"middle"` \| `"bottom"` | Vertical alignment override |

---

## DotLine

A repeating dot pattern, useful for fill lines in tables of contents or forms.

```tsx
<DotLine width="100%" />
<DotLine inline num={3} color="#94a3b8" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `num` | `number` | `1` | Number of dot-line rows |
| `width` | `number \| string` | `"100%"` | Width of the dot line |
| `inline` | `boolean` | `false` | Render as inline element |
| `color` | `string` | — | Dot color |
| `lineHeight` | `string` | — | Line height of each dot row |

---

## CodeBlock

Syntax-highlighted code block using highlight.js.

```tsx
<CodeBlock language="typescript" code={`const x: number = 42;`} />
```

| Prop | Type | Description |
|------|------|-------------|
| `language` | `string` | highlight.js language identifier (e.g. `"typescript"`, `"python"`, `"bash"`) |
| `code` | `string` | Source code string |

Renders with `break-inside: avoid` to prevent page breaks mid-block.

---

## Equation

LaTeX equation rendering via KaTeX.

```tsx
<Equation tex="E = mc^2" displayMode />
<Equation tex="\ce{H2O}" chemical />
<Equation tex="x &= a + b \\ y &= c + d" aligned displayMode />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tex` | `string` | — | LaTeX source |
| `displayMode` | `boolean` | `false` | Render as block-level equation |
| `aligned` | `boolean` | `false` | Wrap in `\begin{aligned}…\end{aligned}` |
| `chemical` | `boolean` | `false` | Wrap in `\ce{…}` for chemical notation |
