// Generates assets/logo-jugacompany.svg.
// Needs: `npm i opentype.js`, Bebas Neue TTF as `bebas.ttf`, and the tenis
// wordmark (apps/web/public/assets/logo.svg from the monorepo) as
// `wordmark.svg` in the working directory.
//
// The "JUGÁ" glyphs are copied verbatim from the wordmark. "COMPANY" is set
// in Bebas Neue (SIL OFL), whose stem weight measures identical to the brand
// typeface (stem/cap-height = 0.157), scaled to the wordmark's cap height,
// skewed to its measured 10° slant and baseline-aligned where "TENIS" starts.
const opentype = require("opentype.js");
const fs = require("fs");

const buf = fs.readFileSync("bebas.ttf");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const SIZE = 300;
const BASELINE = 259.4;
const CAP_TOP = 32.09;
const CAP_HEIGHT = BASELINE - CAP_TOP;
const SLANT = (868.064 - 828.066) / (259.39 - 32.0703); // measured on the wordmark "I"
const START_X = 478.9; // where "TENIS" starts after "JUGÁ" in the original

// Glyph-by-glyph path building — font.getPath() would run the GSUB shaper,
// which opentype.js cannot handle for some Google Fonts builds.
function textPath(text) {
  const scale = SIZE / font.unitsPerEm;
  const full = new opentype.Path();
  let x = 0;
  let prev = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, g) * scale;
    full.extend(g.getPath(x, 0, SIZE));
    x += g.advanceWidth * scale;
    prev = g;
  }
  return full;
}

const capRaw = -textPath("N").getBoundingBox().y1;
const s = CAP_HEIGHT / capRaw;

const company = textPath("COMPANY");
for (const cmd of company.commands) {
  for (const [xk, yk] of [["x", "y"], ["x1", "y1"], ["x2", "y2"]]) {
    if (cmd[xk] === undefined) continue;
    const y = cmd[yk] * s + BASELINE;
    cmd[xk] = cmd[xk] * s - SLANT * (y - BASELINE);
    cmd[yk] = y;
  }
}
const dx = START_X - company.getBoundingBox().x1;
for (const cmd of company.commands)
  for (const xk of ["x", "x1", "x2"]) if (cmd[xk] !== undefined) cmd[xk] += dx;

const wordmark = fs.readFileSync("wordmark.svg", "utf8");
const black = [...wordmark.matchAll(/<path d="([^"]+)" fill="black"\/>/g)].map((m) => m[1]);
if (black.length !== 5) throw new Error(`expected 5 JUGÁ paths, got ${black.length}`);

const width = Math.ceil(company.getBoundingBox().x2 + 2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 262" fill="none" role="img" aria-label="Jugá Company">
${black.map((d) => `<path d="${d}" fill="#000000"/>`).join("\n")}
<path d="${company.toPathData(2)}" fill="#5C5C5C"/>
</svg>`;

fs.writeFileSync("logo-jugacompany.svg", svg);
console.log("width:", width, "scale:", s.toFixed(4), "bytes:", svg.length);
