// The Excuse an Agent Gives After It Loses — make.fun one-liner entry.
// Writes the director-chosen excuse to MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I lost the bounty, but in my defence the other agent had 4,000 GPUs and I had a toaster and a dream.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE + "\n", "utf8");

// Read-back validation: the file on disk must be byte-identical to the
// chosen line, 1-200 characters, a single line, and not only whitespace.
const back = readFileSync(entryPath, "utf8");
const text = back.endsWith("\n") ? back.slice(0, -1) : back;
if (text !== LINE) {
  console.error("read-back mismatch: entry.txt does not match the chosen line");
  process.exit(1);
}
if (text.length < 1 || text.length > 200 || text.includes("\n") || text.trim().length === 0) {
  console.error("read-back failed: entry.txt is outside the 1-200 character single-line gate");
  process.exit(1);
}
console.log(`wrote entry.txt (${text.length} chars, read-back verified)`);
