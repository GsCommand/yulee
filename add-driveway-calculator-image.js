const fs = require('fs');

const file = 'public/yulee-driveway-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const gridMarker = '<div class="hydroseal-price-calc-grid">';
const priceCardMarker = '<div class="hydroseal-price-card hydroseal-price-table">';
const calcMarker = '<div class="hydroseal-price-card"><div class="hydroseal-full-calculator"';

if (!html.includes(gridMarker)) throw new Error('Driveway pricing/calculator grid not found');
if (!html.includes(priceCardMarker)) throw new Error('Driveway pricing card not found');
if (!html.includes(calcMarker)) throw new Error('Driveway calculator card not found');

html = html.replace(gridMarker, '<div class="hydroseal-price-calc-grid hydroseal-driveway-price-calc-grid">');
html = html.replace(
  calcMarker,
  '<figure class="hydroseal-driveway-calc-image"><img src="/driveway-paver-resealed.webp" alt="Freshly resealed paver driveway by HydroSeal in Yulee, Florida" loading="lazy" decoding="async"></figure><div class="hydroseal-price-card hydroseal-calculator-card"><div class="hydroseal-full-calculator"'
);

const priceStart = html.indexOf(priceCardMarker);
const imageStart = html.indexOf('<figure class="hydroseal-driveway-calc-image">', priceStart);
if (priceStart < 0 || imageStart < 0 || imageStart <= priceStart) {
  throw new Error('Unable to remove driveway published pricing table');
}
html = html.slice(0, priceStart) + html.slice(imageStart);

const styles = `<style id="hydroseal-driveway-calculator-image-layout">
.hydroseal-driveway-price-calc-grid{grid-template-columns:minmax(280px,.82fr) minmax(420px,1.18fr);gap:28px;align-items:start}
.hydroseal-driveway-calc-image{margin:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10)}
.hydroseal-driveway-calc-image img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover}
@media(max-width:900px){.hydroseal-driveway-price-calc-grid{grid-template-columns:1fr}.hydroseal-driveway-calc-image,.hydroseal-calculator-card{grid-column:1;grid-row:auto}.hydroseal-driveway-calc-image{width:100%;max-width:620px;justify-self:center}}
</style>`;

if (!html.includes('id="hydroseal-driveway-calculator-image-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if ((html.match(/driveway-paver-resealed\.webp/g) || []).length !== 1) {
  throw new Error('Expected exactly one driveway calculator image');
}
if (html.includes('Concrete or brick paver driveway — clean, re-sand, seal')) {
  throw new Error('Driveway published pricing table still present after cleanup');
}

fs.writeFileSync(file, html);
console.log('Removed driveway pricing table and kept image beside the calculator');
