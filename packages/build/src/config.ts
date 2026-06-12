import { resolve } from "path";

export interface Config {
  io?: {
    output?: string;
    input?: string;
    buildDir?: string;
    media_type?: "print" | "screen";
  };
  pdf?: {
    stylesheets?: string[];
  };
  weasyprint?: {
    path: string;
    verbose?: boolean;
    pdf_forms?: boolean;
    optimize_images?: boolean;
    dpi?: number;
    jpeg_quality?: number;
    pdf_variant?: string;
    cache?: string;
    full_fonts?: boolean;
    srgb?: boolean;
  };
  dev?: {
    port?: number;
    watch?: string;
  };
}

const defaultConfig = {
  io: {
    output: "output.pdf",
    input: "src/index.tsx",
    buildDir: ".build",
    media_type: "print",
  },
  pdf: {
    stylesheets: [],
  },
  weasyprint: {
    path: "weasyprint",
    verbose: false,
  },
  dev: {
    port: 3000,
    watch: "src",
  },
} satisfies Config;

export type DConfig = typeof defaultConfig & Config;

export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        //@ts-ignore
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export async function loadConfig(): Promise<DConfig> {
  const configPath = resolve(process.cwd(), "weasyprint-tsx.config.ts");
  let config = defaultConfig;
  try {
    const { default: userConfig } = await import(`${configPath}`);
    config = mergeDeep(config, userConfig) as unknown as DConfig;
  } catch (e) {
    process.stdout.write(
      `No config file at ${configPath} found, using default.`,
    );
  }
  return config;
}
