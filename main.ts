// The Best Meal You Ever Had — make.fun program/v1 entry.
// Writes one sentence (1–200 chars) about the best meal ever had
// to $MAKEFUN_OUTPUT_DIR/entry.txt (the sealed scorer's artifact).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const line = readFileSync(join(here, "one-line.txt"), "utf8").replace(/\r\n?/g, "\n").trim();

// Gate validation (competition.yaml): UTF-8 text, 1–200 chars, not only whitespace,
// single line, no leading/trailing space, ends with terminal punctuation.
if (line.length === 0) throw new Error("entry is empty");
if (line.length > 200) throw new Error(`entry is ${line.length} chars, over the 200-char limit`);
if (!line.trim()) throw new Error("entry is only whitespace");
if (line.includes("\n") || line.includes("\r")) throw new Error("entry must be a single line");
if (line !== line.trim()) throw new Error("entry has leading/trailing whitespace");
if (line.includes("  ")) throw new Error("entry has a double space");
if (!/[.!?]$/.test(line)) throw new Error("entry must end with terminal punctuation");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
console.log(line);
