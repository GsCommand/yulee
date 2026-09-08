const fs = require('fs');
const path = require('path');

const homeFile = path.join(__dirname, 'public', 'index.html');
const wildlightFile = path.join(__dirname, 'public', 'wildlight-paver-sealing.html');
if (!fs.existsSync(homeFile)) throw new Error('index.html missing from public build.');
if (!fs.existsSync(wildlightFile)) throw new Error('wildlight-paver-sealing.html missing from public build.');

function freezeSeo(html, label) {
  const title = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
  const desc = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
  const json = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
  const h1 = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
  if (!title || !desc || !canonical || !h1) throw new Error(`Could not freeze protected SEO fields for ${label}.`);
  return { title, desc, canonical, json, h1 };
}

function assertSeo(html, before, label) {
  const after = freezeSeo(html, label);
  if (
    after.title !== before.title ||
    after.desc !== before.desc ||
    after.canonical !== before.canonical ||
    after.h1 !== before.h1 ||
    JSON.stringify(after.json) !== JSON.stringify(before.json)
  ) throw new Error(`Protected SEO content changed on ${label}.`);
}

let home = fs.readFileSync(homeFile, 'utf8');
let wildlight = fs.readFileSync(wildlightFile, 'utf8');
const homeSeo = freezeSeo(home, 'homepage');
const wildlightSeo = freezeSeo(wildlight, 'Wildlight');

const homeServicesRe = /<section\s+id="services"\s+class="section"[^>]*>[\s\S]*?<\/section>/i;
if (!homeServicesRe.test(home)) throw new Error('Homepage services section not found.');

const homeReplacement = `<section id="services" class="section home-image-services"><div class="section-heading"><p class="eyebrow">Services</p><h2>Paver sealing services in Yulee</h2></div><div class="home-service-image-grid">
  <article class="home-service-image-card">
    <a class="home-service-image-link" href="/yulee-driveway-paver-sealing.html" aria-label="Driveway Paver Sealing"><img src="/driveway-lnk.png" alt="Driveway Paver Sealing" loading="lazy" decoding="async" /></a>
    <h3>Driveway Paver Sealing</h3>
    <a class="home-service-text-link" href="/yulee-driveway-paver-sealing.html">Driveway paver sealing in Yulee</a>
  </article>
  <article class="home-service-image-card">
    <a class="home-service-image-link" href="/yulee-pool-deck-paver-sealing.html" aria-label="Pool Deck and Patio Pavers"><img src="/pool-deck-link.png" alt="Pool Deck and Patio Pavers" loading="lazy" decoding="async" /></a>
    <h3>Pool Deck &amp; Patio Pavers</h3>
    <a class="home-service-text-link" href="/yulee-pool-deck-paver-sealing.html">Pool deck sealing in Yulee</a>
  </article>
  <article class="home-service-image-card">
    <a class="home-service-image-link" href="/yulee-travertine-sealing.html" aria-label="Travertine Sealing"><img src="/travertine-link.png" alt="Travertine Sealing" loading="lazy" decoding="async" /></a>
    <h3>Travertine Sealing</h3>
    <a class="home-service-text-link" href="/yulee-travertine-sealing.html">Travertine sealing in Yulee</a>
  </article>
</div></section>`;

home = home.replace(homeServicesRe, homeReplacement);

const homeStyle = `<style id="home-image-service-card-style">
.home-image-services{padding-top:clamp(52px,6vw,78px)!important;padding-bottom:clamp(52px,6vw,78px)!important}
.home-image-services>.section-heading{text-align:center;margin-left:auto;margin-right:auto}
.home-service-image-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:26px}
.home-service-image-card{overflow:hidden;border:1px solid #dce5ea;border-radius:24px;background:#fff;box-shadow:0 14px 36px rgba(11,45,74,.09);padding:0 0 22px}
.home-service-image-link{display:block;overflow:hidden;background:#eef7f8;aspect-ratio:16/10}
.home-service-image-link img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .25s ease}
.home-service-image-card:hover .home-service-image-link img{transform:scale(1.025)}
.home-service-image-card h3{margin:20px 20px 8px;font-family:"Arial Black",Arial,sans-serif;font-size:22px;line-height:1.08;color:#0b2d4a}
.home-service-text-link{display:inline-block;margin:0 20px;color:#0f6ea8;font-weight:900;text-decoration:none}
.home-service-text-link:hover,.home-service-text-link:focus-visible{color:#168f88;text-decoration:underline}
@media(max-width:900px){.home-service-image-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.home-service-image-grid{grid-template-columns:1fr;gap:14px}.home-service-image-card h3{font-size:21px}}
</style>`;

const oldHomeStyle = /<style id="home-image-service-card-style">[\s\S]*?<\/style>\s*/i;
if (oldHomeStyle.test(home)) home = home.replace(oldHomeStyle, `${homeStyle}\n`);
else home = home.replace('</head>', `${homeStyle}\n</head>`);

// Remove the misplaced related-services card section from Wildlight. Handle either
// the transformed image-card version or the original text-card version.
const transformedWildlightRe = /<section\s+class="wildlight-related-services"[^>]*>[\s\S]*?<\/section>/i;
const originalWildlightRe = /<section><p class="eyebrow">Related paver services<\/p><h2>More Yulee paver sealing information<\/h2><div class="location-services">[\s\S]*?<\/div><\/section>/i;
if (transformedWildlightRe.test(wildlight)) wildlight = wildlight.replace(transformedWildlightRe, '');
else if (originalWildlightRe.test(wildlight)) wildlight = wildlight.replace(originalWildlightRe, '');
else throw new Error('Wildlight related-service section not found for removal.');

wildlight = wildlight.replace(/<style id="wildlight-related-service-card-style">[\s\S]*?<\/style>\s*/i, '');

assertSeo(home, homeSeo, 'homepage');
assertSeo(wildlight, wildlightSeo, 'Wildlight');

for (const needle of ['/driveway-lnk.png','/pool-deck-link.png','/travertine-link.png','Driveway Paver Sealing','Pool Deck &amp; Patio Pavers','Travertine Sealing']) {
  if (!home.includes(needle)) throw new Error(`Homepage verification failed: ${needle}`);
}
for (const filler of [
  'Driveway paver sealing Yulee service with cleaning, stain evaluation, paver sanding and sealing, joint-sand replacement and breathable sealer.',
  'Pool deck paver sealing Yulee service with traction-aware cleaning and sealing for screened pool decks, coping areas, patios and wet-zone pavers.',
  'Stone-safe cleaning, fill inspection and breathable sealer selected for travertine and natural stone.'
]) {
  if (home.includes(filler)) throw new Error(`Homepage filler text still present: ${filler}`);
}
if (wildlight.includes('wildlight-related-services') || wildlight.includes('<p class="eyebrow">Related paver services</p><h2>More Yulee paver sealing information</h2>')) {
  throw new Error('Wildlight related-services section still present.');
}

fs.writeFileSync(homeFile, home);
fs.writeFileSync(wildlightFile, wildlight);
console.log('Moved three image-led service cards to homepage; removed misplaced Wildlight section; protected SEO fields unchanged.');
