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
const staticProof = `<section class="driveway-static-proof" aria-labelledby="driveway-static-proof-title"><div class="driveway-static-proof-inner"><span class="driveway-static-kicker">Customer proof</span><h2 id="driveway-static-proof-title">Trusted by Yulee homeowners.</h2><div class="driveway-static-review-grid"><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“HydroSeal made our paver driveway look brand new. The color came back to life, the joints were properly sanded, and the finish was smooth and professional.”</p><strong>Scott M. · Google</strong></article><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“Outstanding results on our driveway, porch, and flower-bed pavers. Greg was professional, communicated clearly, and provided excellent customer service.”</p><strong>Jane J. · Google</strong></article><article class="driveway-static-review"><div class="driveway-static-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“They took their time, paid attention to every detail, and were thorough from start to finish. Our pavers look brand new and exceeded expectations.”</p><strong>Sophia K. · Google</strong></article></div></div></section>`;

const proofCss = `<style id="driveway-static-proof-style">
.driveway-static-proof{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:56px 0 0}
.driveway-static-proof-inner{margin:0;padding:0;background:transparent;border:0;border-radius:0;box-shadow:none}
.driveway-static-kicker{display:block;margin-bottom:10px;color:#0f6ea8;font-size:12px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase}
.driveway-static-proof h2{margin:0 0 14px;color:#0b2d4a;font-family:"Arial Black",Arial,sans-serif;font-size:clamp(32px,4vw,52px);line-height:1.05;letter-spacing:-1px}
.driveway-static-review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
.driveway-static-review{margin:0;padding:25px;border:1px solid #dce5ea;border-radius:24px;background:#fff;box-shadow:none;overflow:visible}
.driveway-static-review::before{display:none!important;content:none!important}
.driveway-static-stars{margin:0 0 12px;color:#ffb000;font-size:16px;line-height:1;letter-spacing:2px;font-weight:900}
.driveway-static-review p{margin:0 0 14px;color:#344657;font-size:15px;line-height:1.6}
.driveway-static-review strong{display:block;color:#68798a;font-size:13px;font-weight:800;letter-spacing:0}
section[aria-label="Recent reviews"]{width:min(1180px,calc(100% - 40px))!important;margin:30px auto 42px!important;padding:14px!important;border:1px solid #dce5ea!important;border-radius:24px!important;background:#fff!important;min-height:260px!important}
@media(max-width:980px){.driveway-static-review-grid{grid-template-columns:1fr}.driveway-static-proof{padding-top:48px}}
@media(max-width:650px){.driveway-static-proof{width:calc(100% - 24px);padding-top:42px}.driveway-static-proof h2{font-size:clamp(30px,10vw,40px)}.driveway-static-review{padding:25px}section[aria-label="Recent reviews"]{width:calc(100% - 24px)!important;margin-top:26px!important}}
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
console.log('Matched Yulee static customer proof styling to HydroSeal while keeping Elfsight underneath.');
