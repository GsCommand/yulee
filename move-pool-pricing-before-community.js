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
const pricingRe = /<section class="article-block hydroseal-pool-slider-section pool-pricing-section">[\s\S]*?<\/section>/i;
const communityMarker = /<section class="article-block pool-community-section"[^>]*>/i;

const pricingMatch = html.match(pricingRe);
if (!pricingMatch) throw new Error('Pool deck pricing/calculator section not found.');
if (!communityMarker.test(html)) throw new Error('Verified patios and lanais community section not found.');

const pricingSection = pricingMatch[0];
html = html.replace(pricingRe, '');
html = html.replace(communityMarker, `${pricingSection}\n$&`);

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while reordering pricing.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while reordering pricing.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while reordering pricing.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while reordering pricing.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while reordering pricing.');

const pricingPos = html.indexOf('Pool deck paver sealing cost in Yulee');
const communityPos = html.indexOf('Yulee communities with documented rear paver outdoor-living areas');
if (!(pricingPos >= 0 && communityPos > pricingPos)) {
  throw new Error('Pool deck pricing section was not placed above the verified patios and lanais section.');
}

fs.writeFileSync(file, html);
console.log('Moved Pool deck paver sealing cost in Yulee directly above Verified patios and lanais.');
