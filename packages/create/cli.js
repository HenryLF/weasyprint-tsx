#!/usr/bin/env node

import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const name = process.argv[2] ?? "my-doc";
const dest = join(process.cwd(), name);
const templateDir = join(import.meta.dir, "template");

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
