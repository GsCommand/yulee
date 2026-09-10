const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-pool-deck-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Pool deck page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function snapshot(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [],
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [],
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = snapshot(html);
const imageSrc = '/yulee-pool-sealing.png';

if (!html.includes(imageSrc)) {
  const card = '<div><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p></div>';
  if (!html.includes(card)) throw new Error('Patio Paver Sealing Wildlight card not found.');

  const replacement = '<div class="pool-wildlight-image-card"><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p><figure class="pool-wildlight-card-photo"><img src="/yulee-pool-sealing.png" alt="Sealed pool deck and patio pavers in Yulee and Wildlight, Florida" loading="lazy" decoding="async" /></figure></div>';
  html = html.replace(card, replacement);
}

const css = `<style id="pool-wildlight-card-image-style">
.pool-wildlight-focus .pool-wildlight-image-card{display:flex;flex-direction:column}
.pool-wildlight-card-photo{margin:18px 0 0;overflow:hidden;border:1px solid var(--pool-line);border-radius:15px;background:#eef9f7;box-shadow:0 10px 24px rgba(15,111,129,.10)}
.pool-wildlight-card-photo img{display:block;width:100%;height:240px;object-fit:cover;object-position:center}
@media(max-width:760px){.pool-wildlight-card-photo img{height:auto;max-height:360px}}
</style>`;

if (!html.includes('id="pool-wildlight-card-image-style"')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while adding Wildlight image.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while adding Wildlight image.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while adding Wildlight image.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while adding Wildlight image.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Pool deck H2 inventory/order changed while adding Wildlight image.');
if (JSON.stringify(after.h3) !== JSON.stringify(before.h3)) throw new Error('Pool deck H3 inventory/order changed while adding Wildlight image.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while adding Wildlight image.');

const imageCount = (html.match(/src="\/yulee-pool-sealing\.png"/g) || []).length;
if (imageCount !== 1) throw new Error(`Expected exactly one Wildlight pool image, found ${imageCount}.`);

fs.writeFileSync(file, html);
console.log('Added yulee-pool-sealing.png to the Patio Paver Sealing Wildlight card.');
