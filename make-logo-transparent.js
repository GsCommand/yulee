const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const file = path.join(__dirname, 'public', 'images', 'yulee-hydroseal-logo.webp');
if (!fs.existsSync(file)) throw new Error('Yulee HydroSeal logo missing from public build output.');

(async () => {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Expected RGBA logo buffer, got ${channels} channels.`);

  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  let cleared = 0;

  // Remove the edge-connected off-white/very-light-gray matte around the logo.
  // The wider threshold catches the slightly gray WebP background while preserving
  // the saturated blue/cyan logo artwork and dark lettering.
  const isBackground = (idx) => {
    const o = idx * 4;
    const r = data[o], g = data[o + 1], b = data[o + 2], a = data[o + 3];
    if (a === 0) return true;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const avg = (r + g + b) / 3;
    return avg >= 220 && min >= 205 && (max - min) <= 30;
  };

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (seen[idx] || !isBackground(idx)) return;
    seen[idx] = 1;
    queue[tail++] = idx;
  };

  for (let x = 0; x < width; x++) { push(x, 0); push(x, height - 1); }
  for (let y = 0; y < height; y++) { push(0, y); push(width - 1, y); }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);
    const o = idx * 4;
    data[o + 3] = 0;
    cleared++;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 98, alphaQuality: 100 })
    .toFile(`${file}.tmp.webp`);

  fs.renameSync(`${file}.tmp.webp`, file);
  console.log(`Made Yulee HydroSeal logo background transparent: ${cleared} edge-connected pixels cleared.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
