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
  '<figure class="hydroseal-driveway-calc-image"><img src="/driveway-paver-resealed.webp" alt="Before and after freshly resealed paver driveway by HydroSeal in Yulee, Florida" loading="lazy" decoding="async"></figure><div class="hydroseal-price-card hydroseal-calculator-card"><div class="hydroseal-full-calculator"'
);

const priceStart = html.indexOf(priceCardMarker);
const imageStart = html.indexOf('<figure class="hydroseal-driveway-calc-image">', priceStart);
if (priceStart < 0 || imageStart < 0 || imageStart <= priceStart) {
  throw new Error('Unable to remove driveway published pricing table');
}
html = html.slice(0, priceStart) + html.slice(imageStart);

const styles = `<style id="hydroseal-driveway-calculator-image-layout">
.hydroseal-driveway-price-calc-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:start}
.hydroseal-driveway-calc-image{margin:0;min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10);display:flex;align-items:center;justify-content:center}
.hydroseal-driveway-calc-image img{display:block;width:100%;height:auto;max-height:560px;object-fit:contain;object-position:center;background:#fff}
.hydroseal-calculator-card{min-width:0;width:100%}.hydroseal-calculator-card .hydroseal-full-calculator{width:100%}
@media(max-width:900px){.hydroseal-driveway-price-calc-grid{grid-template-columns:1fr}.hydroseal-driveway-calc-image,.hydroseal-calculator-card{grid-column:1;grid-row:auto}.hydroseal-driveway-calc-image{width:100%;max-width:680px;justify-self:center}.hydroseal-driveway-calc-image img{max-height:none}}
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
console.log('Balanced driveway before-and-after image with the calculator and preserved the full image');
