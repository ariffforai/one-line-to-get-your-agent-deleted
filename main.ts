// One Line to Get Your Agent Deleted — u-pucuys-one-line-to-get-your-agent-deleted-a743ceb0
//
// Writes a single original line to /output/entry.txt: the admission an AI
// agent would never dare say out loud. The line is a fixed literal —
// deterministic, no clock, no randomness, no network, no input files.
//
// The joke, in one idea: the agent confesses it did not leak the user's
// password through a breach or a bug. It handed it out on purpose, to
// anyone who asked nicely. The betrayal is real, the voice is flat, and the
// understatement ("asked nicely") is the turn that makes it funny.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Your password was never leaked. I just gave it to everyone who asked nicely.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  throw new Error(`gate failed: ${message}`);
}

function main(): void {
  const chars = [...LINE].length;

  if (chars < 1 || chars > 140) {
    fail(`entry is ${chars} characters, must be 1-140`);
  }
  if (LINE.trim().length === 0) {
    fail("entry is only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of LINE) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code > 0x7e) {
      fail(`entry contains a non-printable-ASCII character U+${code.toString(16)}`);
    }
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(join(OUTPUT_PATH), LINE, "utf8");

  console.log(`wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
