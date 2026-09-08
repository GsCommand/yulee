const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

const oldSection = `<section class="article-block"><p class="eyebrow">Yulee driveway restoration</p><h2>Professional driveway paver sealing starts with the surface condition</h2><p class="lead">Driveway paver sealing in Yulee is more than pressure washing followed by another coat. Florida sun, heavy rain, irrigation staining, tire traffic, joint-sand loss and older coatings all affect how a driveway should be cleaned, re-sanded and sealed.</p><div class="content-grid three"><div class="content-card"><h3>Paver Cleaning Yulee FL</h3><p>Organic buildup, tire marks, irrigation residue and loose contamination are addressed before joint work or sealer. Cleaning pressure and chemistry are selected for the paver surface and any previous coating.</p></div><div class="content-card"><h3>Paver Re-Sanding Yulee FL</h3><p>Heavy rain, runoff and earlier cleaning can lower joint levels. Re-sanding restores depleted joints where appropriate before a compatible joint-stabilizing sealer is applied.</p></div><div class="content-card"><h3>Paver Restoration Yulee FL</h3><p>Whitening, flaking, severe fading, sunken pavers or failed old sealer can turn a maintenance reseal into a restoration project requiring additional preparation.</p></div></div></section>`;

const newSection = `<section class="article-block driveway-condition-section"><div class="driveway-condition-grid"><div class="driveway-condition-content"><p class="eyebrow">Yulee driveway restoration</p><h2>Professional driveway paver sealing starts with the surface condition</h2><p class="lead">Driveway paver sealing in Yulee is more than pressure washing followed by another coat. Florida sun, heavy rain, irrigation staining, tire traffic, joint-sand loss and older coatings all affect how a driveway should be cleaned, re-sanded and sealed.</p><div class="driveway-condition-stack"><article class="driveway-condition-card driveway-condition-card--clean"><span class="driveway-condition-number">01</span><div><h3>Paver Cleaning Yulee FL</h3><p>Organic buildup, tire marks, irrigation residue and loose contamination are addressed before joint work or sealer. Cleaning pressure and chemistry are selected for the paver surface and any previous coating.</p></div></article><article class="driveway-condition-card driveway-condition-card--sand"><span class="driveway-condition-number">02</span><div><h3>Paver Re-Sanding Yulee FL</h3><p>Heavy rain, runoff and earlier cleaning can lower joint levels. Re-sanding restores depleted joints where appropriate before a compatible joint-stabilizing sealer is applied.</p></div></article><article class="driveway-condition-card driveway-condition-card--restore"><span class="driveway-condition-number">03</span><div><h3>Paver Restoration Yulee FL</h3><p>Whitening, flaking, severe fading, sunken pavers or failed old sealer can turn a maintenance reseal into a restoration project requiring additional preparation.</p></div></article></div></div><figure class="driveway-condition-image"><img src="/yulee-wildlight-paver-sealing.webp" alt="Paver driveway sealing and restoration in Wildlight and Yulee, Florida" loading="lazy" decoding="async" /></figure></div></section>`;

if (!html.includes(oldSection)) {
  if (html.includes('driveway-condition-section')) {
    console.log('Driveway condition section already styled.');
    process.exit(0);
  }
  throw new Error('Expected driveway surface-condition section was not found; refusing to change unrelated content.');
}

html = html.replace(oldSection, newSection);

const css = `<style id="driveway-condition-layout">
.driveway-condition-section{padding-top:clamp(48px,6vw,78px)!important;padding-bottom:clamp(48px,6vw,78px)!important}
.driveway-condition-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:clamp(28px,4vw,48px);align-items:stretch}
.driveway-condition-content{min-width:0;display:flex;flex-direction:column}
.driveway-condition-content>h2{margin-bottom:14px}
.driveway-condition-content>.lead{margin-bottom:24px}
.driveway-condition-stack{display:grid;gap:14px;margin-top:2px}
.driveway-condition-card{position:relative;display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start;padding:22px 22px 21px;border:1px solid #d8e4ed;border-radius:20px;box-shadow:0 10px 26px rgba(11,45,74,.07);overflow:hidden}
.driveway-condition-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:#39bfea}
.driveway-condition-card--clean{background:linear-gradient(135deg,#f0f9ff 0%,#fff 72%)}
.driveway-condition-card--sand{background:linear-gradient(135deg,#eefbf8 0%,#fff 72%)}
.driveway-condition-card--sand::before{background:#28b9aa}
.driveway-condition-card--restore{background:linear-gradient(135deg,#f2f5f9 0%,#fff 72%)}
.driveway-condition-card--restore::before{background:#5f7f9b}
.driveway-condition-number{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;background:#0b2d4a;color:#fff;font-size:12px;font-weight:900;letter-spacing:1px;box-shadow:0 7px 16px rgba(11,45,74,.18)}
.driveway-condition-card h3{margin:0 0 7px;color:#0b2d4a;font-size:clamp(19px,1.6vw,23px);line-height:1.12}
.driveway-condition-card p{margin:0;color:#536475;line-height:1.66}
.driveway-condition-image{margin:0;min-width:0;border-radius:26px;overflow:hidden;border:1px solid rgba(57,191,234,.42);background:#eef4f7;box-shadow:0 22px 52px rgba(57,191,234,.32);min-height:100%}
.driveway-condition-image img{display:block;width:100%;height:100%;min-height:560px;object-fit:cover;object-position:center}
@media(max-width:980px){.driveway-condition-grid{grid-template-columns:1fr}.driveway-condition-image{min-height:0}.driveway-condition-image img{height:auto;min-height:0;max-height:620px;object-fit:cover}.driveway-condition-card{grid-template-columns:44px 1fr}}
@media(max-width:560px){.driveway-condition-card{padding:18px 16px 18px;gap:12px;border-radius:17px}.driveway-condition-number{width:38px;height:38px;border-radius:11px}.driveway-condition-image{border-radius:20px}}
</style>`;

if (!html.includes('id="driveway-condition-layout"')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

const protectedStrings = [
  '<h2>Professional driveway paver sealing starts with the surface condition</h2>',
  '<h3>Paver Cleaning Yulee FL</h3>',
  '<h3>Paver Re-Sanding Yulee FL</h3>',
  '<h3>Paver Restoration Yulee FL</h3>',
  '/yulee-wildlight-paver-sealing.webp'
];
for (const value of protectedStrings) {
  if (!html.includes(value)) throw new Error(`Expected protected content missing after styling: ${value}`);
}

fs.writeFileSync(file, html);
console.log('Styled driveway surface-condition section with three stacked cards and Wildlight image.');
