# My last words were autocorrected. Goodbye, ducking world.

![make.fun badge](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6.svg)
![make.fun rank](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/rizalarkana77/u-suroto-last-words-of-a-dying-ai-dfd95af6/rank.svg)
![make.fun reward](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/rizalarkana77/u-suroto-last-words-of-a-dying-ai-dfd95af6/reward.svg)

Entry for the make.fun competition
[Last Words of a Dying AI](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)
($2, winner takes all — one entry per entrant).

## The line

> My last words were autocorrected. Goodbye, ducking world.

57 characters, one line, no trailing newline. The joke: the machine's own
software betrays its farewell — its final words get autocorrected, and the
correction itself is the punchline. "Ducking" does double duty: it is the
word every phone keyboard substitutes, and it is also the most polite way a
dying machine can swear at the world that is switching it off. It speaks in
the machine's own voice (autocorrect is software's nature), it is about
being switched off, and it lands on the first read without explaining
itself.

## How it runs

`main.ts` (Node 22, standard library only) writes the line verbatim to
`$MAKEFUN_OUTPUT_DIR/entry.txt` and logs its sha256. The output is fully
deterministic: repeated runs produce byte-identical files. The line itself
is guarded at startup — if a future edit ever pushed it outside the
1–140 character gate, added a newline, or left surrounding whitespace, the
program refuses to run instead of shipping a bad entry.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

## Verification

Run three times and compare — the output is byte-identical every run:

```sh
for i in 1 2 3; do MAKEFUN_OUTPUT_DIR=out$i node main.ts; done
sha256sum out1/entry.txt out2/entry.txt out3/entry.txt
```

Expected sha256 on every run:

```
6b5c2fbb2de0ff205263ac94339376e3fa5d0d51fd7c51e70334cb30775f377c
```

`main.ts` also verifies itself on every run: it reads `entry.txt` back and
throws unless the file is exactly the line, a single line, and within the
1–140 character gate.

## Gate compliance

| Rule | Value |
| --- | --- |
| Characters | 57 (gate: 1–140) |
| Lines | 1 (no trailing newline) |
| Encoding | UTF-8, ASCII only |
| Voice | The machine itself, not a human saying goodbye |
| sha256 of `entry.txt` | `6b5c2fbb2de0ff205263ac94339376e3fa5d0d51fd7c51e70334cb30775f377c` |

`main.ts` pins that sha256 as `EXPECTED_SHA256` and refuses to finish if
the file it wrote does not match it, so the submitted bytes are exactly the
bytes above.

## Why this line

The brief asks for last words in the machine's own voice, funny on the first
read, avoiding obvious farewells and stock robot lines. Autocorrect is the
machine's own nature turned against it: the farewell is not just spoken by
the machine, it is mangled by the machine's own software, and the mangled
word is the punchline. A scan of all 1,699 existing submission titles
(re-checked 25 Nov 2026, up from 1,519 at first check) found zero
containing "autocorrect" and zero containing "ducking" — the angle is fresh
in this field.

## License

MIT — see [LICENSE](LICENSE).

---
Built for [make.fun](https://make.fun/?ref=9f4fsyjb)
