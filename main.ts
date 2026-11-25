// Last Words of a Dying AI — make.fun entry
// Writes the AI's one-line farewell to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node standard library only. Deterministic: every run writes the same bytes.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My last words were autocorrected. Goodbye, ducking world.";

// The competition gate is 1-140 characters, a single line, UTF-8, and no
// trailing newline. Guard the constant itself so a future edit that breaks
// the gate fails loudly at startup instead of shipping a bad entry.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`LINE out of gate: ${LINE.length} characters`);
}
if (LINE.includes("\n") || LINE !== LINE.trim()) {
  throw new Error("LINE must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const sha256 = createHash("sha256").update(LINE, "utf8").digest("hex");
console.log(
  `wrote ${outPath} (${LINE.length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes, sha256 ${sha256})`,
);

// Read-back verification: the file on disk must be exactly the line,
// one line, within the competition gate of 1-140 characters.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("read-back mismatch: entry.txt != LINE");
if (back.length < 1 || back.length > 140) throw new Error("entry out of gate: length " + back.length);
if (back.includes("\n")) throw new Error("entry must be a single line");
const backHash = createHash("sha256").update(back, "utf8").digest("hex");
if (backHash !== sha256) throw new Error("read-back sha256 mismatch");
console.log(`verified read-back: ${back.length} chars, single line, sha256 ${backHash}`);
