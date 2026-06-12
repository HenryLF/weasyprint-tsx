import tailwindcss from "@tailwindcss/postcss";
import { BunPlugin } from "bun";
import { join } from "path";
import postcss from "postcss";
import customProperties from "postcss-custom-properties";
import { h } from "preact";
import { renderToStaticMarkup } from "preact-render-to-string";
import { DConfig } from "./config";
import { DEV_SCRIPT } from "./server";

const tailwindPlugin: BunPlugin = {
  name: "tailwind-postcss",
  setup(build) {
    build.onLoad({ filter: /index\.css$/ }, async (args) => {
      const css = await Bun.file(args.path).text();
      const result = await postcss([
        tailwindcss(),
        customProperties({ preserve: false }),
      ]).process(css, { from: args.path });
      return { contents: result.css, loader: "css" };
    });
  },
};

export async function buildHTML(cfg: DConfig, dev: boolean = false) {
  const ROOT = process.cwd();
  const INPUT = join(ROOT, cfg.io.input);
  const BUILD_DIR = join(ROOT, cfg.io.buildDir);
  const BUILD_PATH = join(BUILD_DIR, "index.html");
  const t0 = performance.now();

  await import("fs/promises").then((fs) =>
    fs.rm(BUILD_DIR, { recursive: true, force: true }),
  );

  const build = await Bun.build({
    entrypoints: [INPUT],
    outdir: BUILD_DIR,
    target: "bun",
    optimizeImports: ["preact", "@weasyprint-tsx/ui"],
    plugins: [tailwindPlugin],
  });
  if (!build.success) {
    process.stderr.write(build.logs.map(String).join("\n") + "\n");
    return 0;
  }

  const { default: Document } = await import(
    join(BUILD_DIR, `index.js?t=${performance.now()}`)
  );

  let html = "<!DOCTYPE html>" + renderToStaticMarkup(h(Document, {}));

  if (dev) {
    html = html.replace("</html>", `${DEV_SCRIPT}</html>`);
  }
  await Bun.write(BUILD_PATH, html);
  process.stdout.write(
    `Bun HTML build -- ${(performance.now() - t0).toFixed(2)}ms\n`,
  );
  const css = await Bun.file(join(BUILD_DIR, "index.css")).text();
  return Bun.hash(html + css);
}

function buildArgs(cfg: DConfig): string[] {
  const wp = cfg.weasyprint ?? {};
  const args = [cfg.weasyprint.path];

  if (cfg.io.media_type && cfg.io.media_type !== "print")
    args.push("--media-type", cfg.io.media_type);

  for (const ss of cfg.pdf?.stylesheets ?? []) args.push("--stylesheet", ss);

  if (wp.pdf_forms) args.push("--pdf-forms");
  if (wp.optimize_images) args.push("--optimize-images");
  if (wp.dpi) args.push("--dpi", String(wp.dpi));
  if (wp.jpeg_quality) args.push("--jpeg-quality", String(wp.jpeg_quality));
  if (wp.pdf_variant) args.push("--pdf-variant", wp.pdf_variant);
  if (wp.cache) args.push("--cache-folder", wp.cache);
  if (wp.full_fonts) args.push("--full-fonts");
  if (wp.srgb) args.push("--srgb");

  args.push(`${cfg.io.buildDir ?? ".build"}/index.html`, cfg.io.output);
  return args;
}

export async function buildPDF(cfg: DConfig): Promise<void> {
  const args = buildArgs(cfg);
  const t0 = performance.now();
  const proc = Bun.spawn(args, {
    cwd: process.cwd(),
    stderr: cfg.weasyprint.verbose ? "inherit" : "ignore",
    stdout: cfg.weasyprint.verbose ? "inherit" : "ignore",
  });
  const code = await proc.exited;
  if (code !== 0) throw new Error(`WeasyPrint exited with code ${code}`);
  process.stdout.write(
    `Weasyprint PDF -- ${(performance.now() - t0).toFixed(2)}ms → ${cfg.io.output}\n`,
  );
}
