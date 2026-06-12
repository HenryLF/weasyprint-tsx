#!/usr/bin/env node

import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join,dirname } from "path";
import { fileURLToPath } from "url";

const name = process.argv[2] ?? "my-doc";
const dest = join(process.cwd(), name);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateDir = join(__dirname, "template");

if (existsSync(dest)) {
  process.stderr.write(`Error: directory '${name}' already exists\n`);
  process.exit(1);
}

cpSync(templateDir, dest, { recursive: true });

const pkgPath = join(dest, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.name = name;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

process.stdout.write(`
Created '${name}/'.

  cd ${name}
  bun run dev

`);
