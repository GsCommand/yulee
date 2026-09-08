const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

const widgetId = 'elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67';
const wildlightMarker = '<section class="feature-band driveway-wildlight-focus">';
const reviewRegex = new RegExp(`<section[^>]*aria-label="Recent reviews"[^>]*>[\\s\\S]*?<div class="${widgetId}"[^>]*><\\/div>[\\s\\S]*?<\\/section>`, 'g');
const matches = html.match(reviewRegex) || [];

if (!html.includes(wildlightMarker)) {
  throw new Error('Wildlight focus section not found; refusing to move reviews.');
}
if (matches.length !== 1) {
  throw new Error(`Expected exactly one Recent reviews widget block, found ${matches.length}.`);
}

const reviewBlock = matches[0];
const staticProof = `<section class="driveway-static-proof" aria-labelledby="driveway-static-proof-title"><div class="driveway-static-proof-inner"><p class="eyebrow">Customer proof</p><h2 id="driveway-static-proof-title">Trusted by Yulee homeowners.</h2><div class="driveway-static-review-grid"><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“HydroSeal made our paver driveway look brand new. The color came back to life, the joints were properly sanded, and the finish was smooth and professional.”</p><strong>Scott M. · Google</strong></article><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“Outstanding results on our driveway, porch, and flower-bed pavers. Greg was professional, communicated clearly, and provided excellent customer service.”</p><strong>Jane J. · Google</strong></article><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“They took their time, paid attention to every detail, and were thorough from start to finish. Our pavers look brand new and exceeded expectations.”</p><strong>Sophia K. · Google</strong></article></div></div></section>`;

const proofCss = `<style id="driveway-static-proof-style">
.driveway-static-proof{width:min(1180px,calc(100% - 40px));margin:8px auto 26px;padding:0}
.driveway-static-proof-inner{background:linear-gradient(180deg,#f8fbfd 0%,#fff 100%);border:1px solid #dce5ea;border-radius:26px;padding:clamp(24px,4vw,36px);box-shadow:0 14px 36px rgba(11,45,74,.07)}
.driveway-static-proof .eyebrow{margin:0 0 8px;color:#0f6ea8;font-size:11px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase}
.driveway-static-proof h2{margin:0;color:#0b2d4a;font-size:clamp(30px,3vw,42px);line-height:1.06;letter-spacing:-.8px}
.driveway-static-review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}
.driveway-static-review{position:relative;background:#fff;border:1px solid #dce5ea;border-radius:18px;padding:22px 22px 20px;box-shadow:0 8px 22px rgba(11,45,74,.05);overflow:hidden}
.driveway-static-review::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#39bfea}
.driveway-static-review:nth-child(2)::before{background:#0f6ea8}
.driveway-static-review:nth-child(3)::before{background:#5f7f9b}
.driveway-static-stars{margin-bottom:11px;color:#ffb000;font-size:21px;line-height:1;letter-spacing:2px;font-weight:900}
.driveway-static-review p{margin:0 0 15px;color:#42576b;font-size:15px;line-height:1.68}
.driveway-static-review strong{color:#0b2d4a;font-size:13px;letter-spacing:.2px}
@media(max-width:850px){.driveway-static-review-grid{grid-template-columns:1fr}}
@media(max-width:560px){.driveway-static-proof{width:min(100% - 24px,1180px);margin-bottom:22px}.driveway-static-proof-inner{padding:22px 16px;border-radius:21px}.driveway-static-review{padding:20px 18px}}
</style>`;

html = html.replace(reviewRegex, '');
html = html.replace(wildlightMarker, `${staticProof}\n${reviewBlock}\n${wildlightMarker}`);

if (!html.includes('id="driveway-static-proof-style"')) {
  html = html.replace('</head>', `${proofCss}\n</head>`);
}

const widgetCount = (html.match(new RegExp(widgetId, 'g')) || []).length;
if (widgetCount !== 1) throw new Error(`Expected one reviews widget after move, found ${widgetCount}.`);

const staticCount = (html.match(/driveway-static-proof-title/g) || []).length;
if (staticCount !== 2) throw new Error(`Expected static proof title id/reference pair, found ${staticCount}.`);

const staticPos = html.indexOf('Trusted by Yulee homeowners.');
const reviewPos = html.indexOf(widgetId);
const wildlightPos = html.indexOf('Driveway Paver Sealing Wildlight Yulee FL');
if (reviewPos < 0 || staticPos < 0 || wildlightPos < 0 || !(staticPos < reviewPos && reviewPos < wildlightPos)) {
  throw new Error('Static proof, reviews widget and Wildlight section are not in the requested order.');
}

for (const reviewer of ['Scott M. · Google', 'Jane J. · Google', 'Sophia K. · Google']) {
  if (!html.includes(reviewer)) throw new Error(`Static review missing: ${reviewer}`);
}

fs.writeFileSync(file, html);
console.log('Placed static Yulee homeowner reviews above the Recent reviews Elfsight widget, both above Wildlight focus.');
