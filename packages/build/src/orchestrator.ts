import { watch } from "fs";
import { join } from "path";
import { buildHTML, buildPDF } from "./build";
import { loadConfig } from "./config";
import { bumpPing, startServer } from "./server";

export async function buildOnce(output?: string) {
  const cfg = await loadConfig();
  if (output) cfg.io.output = output;
  let t0 = performance.now();

  await buildHTML(cfg);
  process.stdout.write(
    `Bun HTML build -- ${(performance.now() - t0).toFixed(2)} ms`,
  );
  await buildPDF(cfg);
  t0 = performance.now();
  process.stdout.write(
    `Weasyprint PDF build -- ${(performance.now() - t0).toFixed(2)} ms → ${cfg.io.output}`,
  );
}

export async function devMode(output?: string) {
  const cfg = await loadConfig();
  const WATCH_DIRS = cfg.dev.watch.map((p) => join(process.cwd(), p));

  if (output) cfg.io.output = cfg.io.output ?? output;
  process.stdout.write(`Dev: http://localhost:${cfg.dev.port}`);

  let pdfBusy = false;
  let lastHash: number | BigInt = 0;
  async function rebuild(): Promise<void> {
    try {
      const hash = await buildHTML(cfg, true);
      bumpPing();
      if (hash !== lastHash && !pdfBusy) {
        lastHash = hash;
        pdfBusy = true;
        buildPDF(cfg)
          .then(() => {})
          .catch((e) => process.stderr.write(`Weasyprint error: ${e}\n`))
          .finally(() => {
            pdfBusy = false;
          });
      }
    } catch (e) {
      process.stderr.write(`Build error: ${e}\n`);
    }
  }

  await rebuild();

  startServer(cfg.dev.port, cfg.io.buildDir);

  WATCH_DIRS.forEach((dir) =>
    watch(dir, { recursive: true }, async (_, f) => {
      process.stdout.write(`file changed ${f}`);
      await rebuild();
    }),
  );

  await Bun.sleep(Infinity);
}
