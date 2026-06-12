import type { Config } from "@weasyprint-tsx/build";

const config: Config = {
  io: {
    engine: "weasyprint",
    output: "output.pdf",
  },
  weasyprint: {
    pdf_forms: true,
  },
  watchdog: {
    path: "./src",
    debounce: 500,
  },
};

export default config;
