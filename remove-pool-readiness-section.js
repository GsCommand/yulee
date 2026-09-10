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
const targetRe = /<section\s+class="section split pool-readiness-split">[\s\S]*?<\/section>/i;
const match = html.match(targetRe);
if (!match) throw new Error('Pool deck new-installations / surface-specific split section not found.');

const target = match[0];
const requiredText = [
  'Do not rush a brand-new pool deck into sealer',
  'Pool decks need more than a quick pressure wash'
];
for (const text of requiredText) {
  if (!target.includes(text)) throw new Error(`Expected target text missing from pool readiness section: ${text}`);
}

html = html.replace(targetRe, '');

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed during section removal.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed during section removal.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed during section removal.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed during section removal.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed during section removal.');

for (const text of requiredText) {
  if (html.includes(text)) throw new Error(`Removed pool deck section text still present: ${text}`);
}
if (html.includes('New installations') && html.includes('Surface-specific work')) {
  throw new Error('Pool deck split-section eyebrow text still appears together after removal.');
}

fs.writeFileSync(file, html);
console.log('Removed pool deck New installations / Surface-specific work split section; protected SEO fields unchanged.');
