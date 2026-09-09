const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
if (!fs.existsSync(file)) throw new Error('Homepage missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function freezeSeo(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: (source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '',
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [],
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = freezeSeo(html);
if (!before.title || !before.description || !before.canonical || !before.h1) {
  throw new Error('Could not freeze homepage SEO foundation before balancing local/process section.');
}

html = html.replace(/\s*<style id="home-balanced-local-process-style">[\s\S]*?<\/style>\s*/i, '\n');

const startMarker = '<section class="section split yulee-local-split">';
const start = html.indexOf(startMarker);
if (start < 0) throw new Error('Homepage local/process split section was not found.');
const end = html.indexOf('</section>', start);
if (end < 0) throw new Error('Homepage local/process split section end was not found.');

const oldSection = html.slice(start, end + '</section>'.length);
const processMarker = '<div><p class="eyebrow">Process</p>';
const processPos = oldSection.indexOf(processMarker);
if (processPos < 0) throw new Error('Process column marker was not found inside homepage local/process section.');

const closingParagraph = '<p>HydroSeal generally uses ASTM C144 kiln-dried joint sand with a compatible joint-stabilizing sealer. This is the core of our paver sanding and sealing Yulee service.</p>';
let processColumnAndClose = oldSection.slice(processPos);
if (!processColumnAndClose.includes(closingParagraph)) {
  throw new Error('Expected ASTM C144 closing paragraph is missing from Process column before removal.');
}
processColumnAndClose = processColumnAndClose.replace(closingParagraph, '');

const localColumn = `<div class="home-local-profile-column"><p class="eyebrow">Local surface profile</p><h2>Why paver sealing in Yulee changes by neighborhood and exposure</h2><p>Yulee pavers age differently based on sun, drainage, irrigation, shade and coastal exposure. We evaluate those conditions before recommending routine resealing or a more involved restoration.</p><div class="local-profile-grid"><article class="local-profile-card"><strong>Wildlight &amp; newer installations</strong><p>We check original sealer wear, joint loss and tire-lane fading before another coat is applied.</p></article><article class="local-profile-card"><strong>Nassau rain &amp; runoff</strong><p>Heavy rain and runoff can pull sand from joints, especially along driveway edges and drainage paths.</p></article><article class="local-profile-card"><strong>Irrigation &amp; rust staining</strong><p>Mineral, fertilizer and iron staining should be treated before sealing so discoloration is not locked in.</p></article><article class="local-profile-card"><strong>Screened lanais &amp; pool decks</strong><p>Shade and humidity slow drying, making moisture checks and preparation more important around pools and lanais.</p></article><article class="local-profile-card"><strong>Yulee-to-coast transition</strong><p>Closer to Fernandina Beach and Amelia Island, wind-driven moisture and coastal exposure affect preparation and drying.</p></article><article class="local-profile-card"><strong>Concrete pavers vs. stone</strong><p>Concrete pavers and natural stone need different chemistry, pressure and sealers. See our <a href="/yulee-travertine-sealing.html">travertine sealing</a> process.</p></article></div></div>`;

const newSection = `<section class="section split yulee-local-split home-balanced-local-process">${localColumn}${processColumnAndClose}`;
html = html.slice(0, start) + newSection + html.slice(end + '</section>'.length);

const css = `<style id="home-balanced-local-process-style">
.home-balanced-local-process{align-items:stretch!important;gap:clamp(24px,4vw,44px)!important}
.home-balanced-local-process>div{min-width:0}
.home-balanced-local-process .home-local-profile-column{display:flex;flex-direction:column}
.home-balanced-local-process .home-local-profile-column>p:not(.eyebrow){margin-bottom:0!important}
.home-balanced-local-process .local-profile-grid{gap:10px!important;margin-top:17px!important}
.home-balanced-local-process .local-profile-card{padding:14px 15px!important}
.home-balanced-local-process .local-profile-card strong{margin-bottom:5px!important}
.home-balanced-local-process .local-profile-card p{font-size:.90rem!important;line-height:1.43!important}
@media(max-width:900px){.home-balanced-local-process{align-items:start!important}.home-balanced-local-process .local-profile-card{padding:15px 16px!important}}
</style>`;
html = html.replace('</head>', `${css}\n</head>`);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed while balancing local/process section.');
if (after.description !== before.description) throw new Error('Homepage meta description changed while balancing local/process section.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed while balancing local/process section.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed while balancing local/process section.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Homepage H2 inventory/order changed while balancing local/process section.');
if (JSON.stringify(after.h3) !== JSON.stringify(before.h3)) throw new Error('Homepage H3 inventory/order changed while balancing local/process section.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed while balancing local/process section.');

for (const required of [
  'Wildlight &amp; newer installations',
  'Nassau rain &amp; runoff',
  'Irrigation &amp; rust staining',
  'Screened lanais &amp; pool decks',
  'Yulee-to-coast transition',
  'Concrete pavers vs. stone'
]) {
  if (!html.includes(required)) throw new Error(`Expected local/process content is missing: ${required}`);
}
if (html.includes('HydroSeal generally uses ASTM C144 kiln-dried joint sand with a compatible joint-stabilizing sealer. This is the core of our paver sanding and sealing Yulee service.')) {
  throw new Error('Removed ASTM C144 closing paragraph is still present in homepage output.');
}

fs.writeFileSync(file, html);
console.log('Balanced homepage local surface profile against Process column and removed the ASTM C144 closing paragraph without changing headings or SEO fields.');
