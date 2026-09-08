const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'wildlight-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('wildlight-paver-sealing.html missing from public build.');

let html = fs.readFileSync(file, 'utf8');

const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descBefore = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const jsonBefore = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
const h1Before = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
if (!titleBefore || !descBefore || !canonicalBefore || !h1Before) throw new Error('Could not freeze protected SEO fields.');

const sectionRe = /<section><p class="eyebrow">Related paver services<\/p><h2>More Yulee paver sealing information<\/h2><div class="location-services">[\s\S]*?<\/div><\/section>/i;
if (!sectionRe.test(html)) throw new Error('Related paver services section not found.');

const replacement = `<section class="wildlight-related-services"><p class="eyebrow">Related paver services</p><h2>More Yulee paver sealing information</h2><div class="wildlight-service-link-grid">
  <article class="wildlight-service-link-card">
    <a class="wildlight-service-image-link" href="/yulee-driveway-paver-sealing.html" aria-label="Driveway Paver Sealing"><img src="/driveway-lnk.png" alt="Driveway Paver Sealing" loading="lazy" decoding="async" /></a>
    <h3>Driveway Paver Sealing</h3>
    <a class="wildlight-service-text-link" href="/yulee-driveway-paver-sealing.html">Driveway paver sealing Yulee</a>
  </article>
  <article class="wildlight-service-link-card">
    <a class="wildlight-service-image-link" href="/yulee-pool-deck-paver-sealing.html" aria-label="Pool Deck and Patio Pavers"><img src="/pool-deck-link.png" alt="Pool Deck and Patio Pavers" loading="lazy" decoding="async" /></a>
    <h3>Pool Deck &amp; Patio Pavers</h3>
    <a class="wildlight-service-text-link" href="/yulee-pool-deck-paver-sealing.html">Pool deck paver sealing Yulee</a>
  </article>
  <article class="wildlight-service-link-card">
    <a class="wildlight-service-image-link" href="/yulee-travertine-sealing.html" aria-label="Travertine Sealing"><img src="/travertine-link.png" alt="Travertine Sealing" loading="lazy" decoding="async" /></a>
    <h3>Travertine Sealing</h3>
    <a class="wildlight-service-text-link" href="/yulee-travertine-sealing.html">Travertine sealing Yulee</a>
  </article>
</div></section>`;

html = html.replace(sectionRe, replacement);

const style = `<style id="wildlight-related-service-card-style">
body.y-shared-top .wildlight-related-services{margin-top:8px}
body.y-shared-top .wildlight-service-link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}
body.y-shared-top .wildlight-service-link-card{overflow:hidden;border:1px solid #dce5ea;border-radius:24px;background:#fff;box-shadow:0 14px 36px rgba(11,45,74,.09);padding:0 0 22px}
body.y-shared-top .wildlight-service-image-link{display:block;overflow:hidden;background:#eef7f8;aspect-ratio:16/10}
body.y-shared-top .wildlight-service-image-link img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .25s ease}
body.y-shared-top .wildlight-service-link-card:hover .wildlight-service-image-link img{transform:scale(1.025)}
body.y-shared-top .wildlight-service-link-card h3{margin:20px 20px 8px;font-family:"Arial Black",Arial,sans-serif;font-size:22px;line-height:1.08;color:#0b2d4a}
body.y-shared-top .wildlight-service-text-link{display:inline-block;margin:0 20px;color:#0f6ea8;font-weight:900;text-decoration:none}
body.y-shared-top .wildlight-service-text-link:hover,body.y-shared-top .wildlight-service-text-link:focus-visible{color:#168f88;text-decoration:underline}
@media(max-width:900px){body.y-shared-top .wildlight-service-link-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){body.y-shared-top .wildlight-service-link-grid{grid-template-columns:1fr;gap:14px}body.y-shared-top .wildlight-service-link-card h3{font-size:21px}}
</style>`;

const oldStyle = /<style id="wildlight-related-service-card-style">[\s\S]*?<\/style>\s*/i;
if (oldStyle.test(html)) html = html.replace(oldStyle, `${style}\n`);
else html = html.replace('</head>', `${style}\n</head>`);

const titleAfter = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descAfter = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalAfter = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const jsonAfter = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
const h1After = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];

if (titleAfter !== titleBefore || descAfter !== descBefore || canonicalAfter !== canonicalBefore || h1After !== h1Before || JSON.stringify(jsonAfter) !== JSON.stringify(jsonBefore)) {
  throw new Error('Protected SEO content changed during related-service card styling.');
}
for (const needle of ['/driveway-lnk.png','/pool-deck-link.png','/travertine-link.png','Driveway Paver Sealing','Pool Deck &amp; Patio Pavers','Travertine Sealing']) {
  if (!html.includes(needle)) throw new Error(`Verification failed: ${needle}`);
}
for (const filler of ['Detailed driveway cleaning, re-sanding, restoration and sealing.','Pool deck, patio and lanai paver preparation and sealing.','Stone-safe cleaning and breathable protection for natural stone.','Return to the main Yulee paver sealing authority page.']) {
  if (html.includes(filler)) throw new Error(`Filler text still present: ${filler}`);
}

fs.writeFileSync(file, html);
console.log('Styled Wildlight related-service cards with driveway, pool-deck, and travertine images; titles and links preserved, filler removed.');
