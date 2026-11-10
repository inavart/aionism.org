"""md -> site/content/manifesto-v1.5.ts. Usage: gen_manifesto.py <src.md> <out.ts>"""
import sys, re, json
src = open(sys.argv[1], encoding="utf-8").read().lstrip("﻿")
lines = src.split("\n")
assert lines[0].startswith("# "), lines[0]
title = lines[0][2:].strip()
assert lines[1].startswith("## "), lines[1]
subtitle = lines[1][3:].strip()
vline = next(l for l in lines if l.startswith("Version "))
m = re.match(r"Version (v[\d.]+) — (\w+) · (\d\d\.\d\d\.\d{4}) · (.+)$", vline)
assert m, vline
version, kind, date, status = m.groups()
sections, cur = [], None
for l in lines[lines.index(vline) + 1:]:
    if l.startswith("## "):
        cur = {"heading": l[3:].strip(), "body": []}; sections.append(cur); continue
    if not l.strip(): continue
    assert cur is not None, l
    if re.match(r"^\s{2,}- ", l): cur["body"].append("  - " + l.strip()[2:])
    else: cur["body"].append(l.rstrip())
# footnote = last italic-only paragraph
last = sections[-1]["body"][-1]
assert last.startswith("*") and last.endswith("*"), last
footnote = sections[-1]["body"].pop()[1:-1]
def j(x): return json.dumps(x, ensure_ascii=False)
out = ["// GENERATED from the manifesto markdown — edit the markdown source and regenerate, not this file.",
       "//",
       "// Body line format:",
       '//   "- text"    bullet item          "  - text"  nested item under the previous numbered item',
       '//   "1. text"   numbered item        "> text"    quoted paragraph',
       "//   anything else is a paragraph; **bold** and *italic* are rendered inline.",
       "",
       f"export const MANIFESTO_VERSION = {j(version)};",
       f"export const MANIFESTO_KIND = {j(kind)};",
       f"export const MANIFESTO_DATE = {j(date)};",
       f"export const MANIFESTO_STATUS = {j(status)};",
       f"export const MANIFESTO_TITLE = {j(title)};",
       f"export const MANIFESTO_SUBTITLE = {j(subtitle)};",
       f"export const MANIFESTO_FOOTNOTE = {j(footnote)};",
       "",
       "export type ManifestoSection = {",
       "    heading: string;",
       "    body: string[];",
       "};",
       "",
       "export const MANIFESTO_SECTIONS: ManifestoSection[] = ["]
for s in sections:
    out.append("    {")
    out.append(f"        heading: {j(s['heading'])},")
    out.append("        body: [")
    for b in s["body"]: out.append(f"            {j(b)},")
    out.append("        ],")
    out.append("    },")
out.append("];")
out.append("")
out.append("// Plain-text version of the whole concept (used by the /check-ai prompt).")
out.append("export const MANIFESTO_TEXT = " + j(src.strip()) + ";")
out.append("")
open(sys.argv[2], "w", encoding="utf-8").write("\n".join(out))
# round-trip check: words of generated sections == words of source
w = lambda t: re.findall(r"\w+", t)
gen = " ".join([title, subtitle, vline] + [s["heading"] + " " + " ".join(s["body"]) for s in sections] + [footnote])
assert w(gen) == w(src), (len(w(gen)), len(w(src)))
print(f"OK: {len(sections)} sections, {len(w(src))} words, version {version}, date {date}")
