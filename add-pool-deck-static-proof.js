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

// Idempotency: remove a previous copy before reinserting it in the requested location.
html = html
  .replace(/\s*<style id="pool-static-proof-style">[\s\S]*?<\/style>\s*/i, '\n')
  .replace(/\s*<section class="pool-static-proof"[\s\S]*?<\/section>\s*/i, '\n');

const reviewsMarker = '<section class="section gallery-embed" aria-label="Recent reviews">';
if (!html.includes(reviewsMarker)) throw new Error('Recent reviews widget section not found.');

const proof = `<section class="pool-static-proof" aria-labelledby="pool-static-proof-title">
  <div class="pool-static-proof-inner">
    <span class="pool-static-kicker">CUSTOMER PROOF</span>
    <h2 id="pool-static-proof-title">Trusted by Yulee Homeowners.</h2>
    <div class="pool-static-review-grid">
      <article class="pool-static-review">
        <div class="pool-static-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“HydroSeal did an excellent job cleaning and sealing our pool deck pavers. The difference is incredible, and they look like new again. They were professional, on time, and paid attention to every detail. I highly recommend HydroSeal for paver sealing!”</p>
        <strong>Diane R. · Google</strong>
      </article>
      <article class="pool-static-review">
        <div class="pool-static-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“Had to be the most professional job I ever had done. Greg was the best salesman and worker I have ever had. Job looks great!!! Above and beyond I ever imagined. I would recommend at anytime.”</p>
        <strong>Google Review</strong>
      </article>
      <article class="pool-static-review">
        <div class="pool-static-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“HydroSeal made our paver driveway look brand new. The color came back to life, the joints were properly sanded, and the finish was smooth and professional.”</p>
        <strong>Scott M. · Google</strong>
      </article>
    </div>
  </div>
</section>`;

const css = `<style id="pool-static-proof-style">
.pool-static-proof{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:56px 0 8px}
.pool-static-proof-inner{margin:0;padding:0;background:transparent;border:0;border-radius:0;box-shadow:none}
.pool-static-kicker{display:block;margin-bottom:10px;color:#168f88;font-size:12px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase}
.pool-static-proof h2{margin:0 0 14px;color:#0b2d4a;font-family:"Arial Black",Arial,sans-serif;font-size:clamp(32px,4vw,52px);line-height:1.05;letter-spacing:-1px}
.pool-static-review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:26px}
.pool-static-review{margin:0;padding:25px;border:1px solid #d3e9e7;border-radius:24px;background:linear-gradient(145deg,#ffffff,#f6fcfb);box-shadow:0 10px 28px rgba(39,183,173,.08);overflow:visible}
.pool-static-review::before{display:none!important;content:none!important}
.pool-static-stars{margin:0 0 12px;color:#ffb000;font-size:16px;line-height:1;letter-spacing:2px;font-weight:900}
.pool-static-review p{margin:0 0 14px;color:#344657;font-size:15px;line-height:1.62}
.pool-static-review strong{display:block;color:#68798a;font-size:13px;font-weight:800;letter-spacing:0}
@media(max-width:980px){.pool-static-review-grid{grid-template-columns:1fr}.pool-static-proof{padding-top:48px}}
@media(max-width:650px){.pool-static-proof{width:calc(100% - 24px);padding-top:42px}.pool-static-proof h2{font-size:clamp(30px,10vw,40px)}.pool-static-review{padding:22px}}
</style>`;

html = html.replace(reviewsMarker, `${proof}\n${reviewsMarker}`);
if (!html.includes('</head>')) throw new Error('Pool deck </head> marker missing.');
html = html.replace('</head>', `${css}\n</head>`);

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while moving static proof.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while moving static proof.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while moving static proof.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while moving static proof.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while moving static proof.');

for (const required of [
  'CUSTOMER PROOF',
  'Trusted by Yulee Homeowners.',
  'Diane R. · Google',
  'Had to be the most professional job I ever had done.',
  'Scott M. · Google',
  'elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67'
]) {
  if (!html.includes(required)) throw new Error(`Pool static proof verification failed: ${required}`);
}

const proofPos = html.indexOf('Trusted by Yulee Homeowners.');
const reviewsPos = html.indexOf('elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67');
if (!(proofPos >= 0 && reviewsPos > proofPos)) throw new Error('Pool static proof is not directly above the reviews widget.');

fs.writeFileSync(file, html);
console.log('Placed three-card pool deck customer proof directly above the Recent reviews widget.');
