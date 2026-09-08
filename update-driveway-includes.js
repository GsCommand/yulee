const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1Before = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
const jsonLdBefore = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];

const oldBlock = /<article class="ys-proof"><h2>Includes<\/h2><ul>[\s\S]*?<\/ul><\/article>/i;
if (!oldBlock.test(html)) throw new Error('Driveway Includes card not found after shared layout transform.');

const newBlock = `<article class="ys-proof"><h2>Includes</h2><ul><li>Driveway Deep Cleaning</li><li>Complete Paver Re-Sand</li><li>Joint-Sand Stabilization</li><li>2 Breathable Sealer Applications</li></ul></article>`;
html = html.replace(oldBlock, newBlock);

const expected = [
  'Driveway Deep Cleaning',
  'Complete Paver Re-Sand',
  'Joint-Sand Stabilization',
  '2 Breathable Sealer Applications',
];
for (const item of expected) {
  if (!html.includes(`<li>${item}</li>`)) throw new Error(`Missing updated Includes item: ${item}`);
}

const titleAfter = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const canonicalAfter = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1After = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
const jsonLdAfter = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];

if (titleAfter !== titleBefore) throw new Error('Title changed while updating driveway Includes card.');
if (canonicalAfter !== canonicalBefore) throw new Error('Canonical changed while updating driveway Includes card.');
if (h1After !== h1Before) throw new Error('H1 changed while updating driveway Includes card.');
if (JSON.stringify(jsonLdAfter) !== JSON.stringify(jsonLdBefore)) throw new Error('JSON-LD changed while updating driveway Includes card.');

fs.writeFileSync(file, html);
console.log('Updated driveway Includes card wording only.');
