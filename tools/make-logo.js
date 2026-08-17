const opentype = require("opentype.js");
const fs = require("fs");

const buf = fs.readFileSync("anton.ttf");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const BASELINE = 259.4;
const CAP_TOP = 32.09;
const CAP_HEIGHT = BASELINE - CAP_TOP;
const SLANT = (868.064 - 828.066) / (259.39 - 32.0703); // measured on the wordmark "I"
const START_X = 478.9; // where "TENIS" starts after "JUGÁ" in the original
const SIZE = 300;

function rawPath(text, penX) {
  return font.getPath(text, penX, 0, SIZE, { kerning: true });
}

const capHeightRaw = -rawPath("N", 0).getBoundingBox().y1;
const s = CAP_HEIGHT / capHeightRaw;

function transform(path, dx) {
  for (const cmd of path.commands) {
    for (const [xk, yk] of [["x", "y"], ["x1", "y1"], ["x2", "y2"]]) {
      if (cmd[xk] === undefined) continue;
      const y = cmd[yk] * s + BASELINE;
      const x = cmd[xk] * s + dx - SLANT * (y - BASELINE);
      cmd[xk] = x;
      cmd[yk] = y;
    }
  }
  return path;
}

const comRaw = rawPath("COM", 0);
const panyRaw = rawPath("PANY", font.getAdvanceWidth("COM", SIZE, { kerning: true }));

// First pass with dx=0 to find where the skewed C's left edge lands, then shift
const probe = transform(rawPath("COM", 0), 0);
const dx = START_X - probe.getBoundingBox().x1;

const com = transform(comRaw, dx);
const pany = transform(panyRaw, dx);

// Read the JUGÁ paths straight from the wordmark SVG (black fills)
const wordmark = fs.readFileSync("wordmark.svg", "utf8");
const black = [...wordmark.matchAll(/<path d="([^"]+)" fill="black"\/>/g)].map((m) => m[1]);
if (black.length !== 5) throw new Error(`expected 5 JUGÁ paths, got ${black.length}`);

const maxX = pany.getBoundingBox().x2;
const width = Math.ceil(maxX + 2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 262" fill="none" role="img" aria-label="Jugá Company">
${black.map((d) => `<path d="${d}" fill="#000000"/>`).join("\n")}
<path d="${com.toPathData(2)}" fill="#FA743C"/>
<path d="${pany.toPathData(2)}" fill="#168AD8"/>
</svg>`;

fs.writeFileSync("logo-jugacompany.svg", svg);
console.log("width:", width, "scale:", s.toFixed(4), "bytes:", svg.length);
