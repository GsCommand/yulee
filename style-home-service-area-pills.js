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
  throw new Error('Could not freeze homepage SEO foundation before service-area styling.');
}

html = html.replace(/\s*<style id="home-service-area-pills-style">[\s\S]*?<\/style>\s*/i, '\n');

const startMarker = '<section id="areas" class="section">';
const start = html.indexOf(startMarker);
if (start < 0) throw new Error('Homepage service-area section was not found.');
const end = html.indexOf('</section>', start);
if (end < 0) throw new Error('Homepage service-area section end was not found.');

const oldSection = html.slice(start, end + '</section>'.length);
if (!oldSection.includes('<h2>Yulee neighborhoods and Nassau County areas we serve</h2>')) {
  throw new Error('Expected service-area H2 was not found.');
}

const newSection = `<section id="areas" class="section home-service-area-section"><div class="section-heading"><p class="eyebrow">Service area</p><h2>Yulee neighborhoods and Nassau County areas we serve</h2><p>HydroSeal provides paver sealing services Yulee FL homeowners can use throughout Yulee and nearby Nassau County communities.</p></div><div class="home-area-pill-row" aria-label="HydroSeal service areas"><a class="home-area-pill" href="/wildlight-paver-sealing.html">Wildlight</a><span class="home-area-pill">Amelia Concourse</span><span class="home-area-pill">Timber Creek</span><span class="home-area-pill">Heron Isles</span><span class="home-area-pill">Plummer Creek</span><a class="home-area-pill" href="/fernandina-beach-paver-sealing.html">Fernandina Beach</a><a class="home-area-pill" href="/amelia-island-paver-sealing.html">Amelia Island</a><span class="home-area-pill">Callahan</span><a class="home-area-pill" href="/service-areas.html">Nassau County</a></div></section>`;

html = html.slice(0, start) + newSection + html.slice(end + '</section>'.length);

const css = `<style id="home-service-area-pills-style">
.home-service-area-section{position:relative;overflow:hidden;padding-top:clamp(46px,6vw,72px)!important;padding-bottom:clamp(46px,6vw,72px)!important;border:1px solid #d9e8ee;border-radius:30px;background:linear-gradient(145deg,#f7fcff 0%,#eefaf7 48%,#f7fbff 100%);box-shadow:0 18px 48px rgba(11,54,88,.08)}
.home-service-area-section::after{content:"";position:absolute;right:-110px;top:-115px;width:280px;height:280px;border-radius:50%;background:linear-gradient(145deg,rgba(57,191,234,.13),rgba(35,178,156,.09));pointer-events:none}
.home-service-area-section>.section-heading{position:relative;z-index:1;max-width:900px;margin:0 auto 28px;text-align:center}
.home-service-area-section>.section-heading .eyebrow{display:inline-flex;align-items:center;padding:7px 12px;border-radius:999px;background:#e6f8f6;color:#117d78;font-weight:900;letter-spacing:1.35px}
.home-service-area-section>.section-heading h2{color:#0b3658}
.home-service-area-section>.section-heading p:last-child{max-width:760px;margin-left:auto;margin-right:auto;color:#536475}
.home-area-pill-row{position:relative;z-index:1;display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:9px;width:100%;overflow-x:auto;padding:7px 4px 10px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.home-area-pill-row::-webkit-scrollbar{display:none}
.home-area-pill{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;min-height:42px;padding:10px 15px;border:1px solid rgba(15,110,168,.16);border-radius:999px;color:#0b3658;font-size:.84rem;font-weight:900;line-height:1;text-decoration:none;white-space:nowrap;box-shadow:0 8px 20px rgba(11,54,88,.08)}
.home-area-pill:nth-child(3n+1){background:linear-gradient(135deg,#dff5ff,#e9fbff);border-color:#b9e6f3}
.home-area-pill:nth-child(3n+2){background:linear-gradient(135deg,#ddf8f2,#ecfcf8);border-color:#bce9dd;color:#126e69}
.home-area-pill:nth-child(3n){background:linear-gradient(135deg,#e7f1ff,#eef8ff);border-color:#c9dcf0;color:#174f80}
a.home-area-pill{cursor:pointer}
a.home-area-pill:hover,a.home-area-pill:focus-visible{transform:translateY(-1px);box-shadow:0 11px 24px rgba(11,54,88,.13);border-color:#69c9df}
@media(max-width:1050px){.home-area-pill-row{justify-content:flex-start}}
@media(max-width:640px){.home-service-area-section{border-radius:22px;padding-left:12px!important;padding-right:12px!important}.home-area-pill{min-height:40px;padding:9px 13px;font-size:.81rem}}
</style>`;

html = html.replace('</head>', `${css}\n</head>`);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed during service-area styling.');
if (after.description !== before.description) throw new Error('Homepage meta description changed during service-area styling.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed during service-area styling.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed during service-area styling.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Homepage H2 inventory/order changed during service-area styling.');
if (JSON.stringify(after.h3) !== JSON.stringify(before.h3)) throw new Error('Homepage H3 inventory/order changed during service-area styling.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed during service-area styling.');

for (const removed of [
  '<span>Yulee</span>',
  '<strong>Detailed local paver pages:</strong>'
]) {
  if (html.includes(removed)) throw new Error(`Removed service-area content is still present: ${removed}`);
}
for (const required of [
  'href="/wildlight-paver-sealing.html">Wildlight</a>',
  'href="/fernandina-beach-paver-sealing.html">Fernandina Beach</a>',
  'href="/amelia-island-paver-sealing.html">Amelia Island</a>',
  'href="/service-areas.html">Nassau County</a>'
]) {
  if (!html.includes(required)) throw new Error(`Expected linked service-area pill is missing: ${required}`);
}

fs.writeFileSync(file, html);
console.log('Styled homepage service areas as one-line blue/green pills; removed Yulee pill and detailed-links paragraph.');
