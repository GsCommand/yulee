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
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = snapshot(html);

const oldGrid = '<div class="article-grid"><div><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p></div><div><h3>Paver Lanai Sealing Wildlight</h3><p>Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.</p></div></div>';

if (!html.includes(oldGrid)) {
  throw new Error('Pool deck Wildlight two-card block not found; refusing partial removal.');
}

html = html.replace(oldGrid, '');
html = html.replace(/<style id="pool-wildlight-card-image-style">[\s\S]*?<\/style>/i, '');

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed during Wildlight cleanup.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed during Wildlight cleanup.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed during Wildlight cleanup.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed during Wildlight cleanup.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed during Wildlight cleanup.');

for (const removed of [
  'Patio Paver Sealing Wildlight',
  'Paver Lanai Sealing Wildlight',
  'Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.',
  'Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.',
  'src="/yulee-pool-sealing.png"',
  'pool-wildlight-wide-photo',
  'pool-wildlight-wide-caption'
]) {
  if (html.includes(removed)) throw new Error(`Pool deck Wildlight cleanup left behind: ${removed}`);
}

if (!html.includes('<h2>Pool Deck Paver Sealing Wildlight Yulee</h2>')) {
  throw new Error('Main Pool Deck Paver Sealing Wildlight Yulee heading was unexpectedly removed.');
}

fs.writeFileSync(file, html);
console.log('Removed Pool Deck Wildlight patio/lanai cards and image overlay; main Wildlight section preserved.');
