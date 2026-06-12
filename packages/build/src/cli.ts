#!/usr/bin/env bun
import { devMode, buildOnce } from "./orchestrator";



const args = process.argv.slice(2);
const watch = args.includes("--watch");
const output = args.find((a) => !a.startsWith("--"));

if (watch) {
  devMode(output);
} else {
  buildOnce(output);
}
