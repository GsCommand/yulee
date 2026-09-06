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
.hydroseal-driveway-price-calc-grid{grid-template-columns:minmax(0,1.28fr) minmax(360px,.92fr);gap:28px;align-items:start}
.hydroseal-driveway-calc-image{margin:0;min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10);display:flex;align-items:center;justify-content:center}
.hydroseal-driveway-calc-image img{display:block;width:100%;height:auto;max-height:590px;object-fit:contain;object-position:center;background:#fff}
.hydroseal-calculator-card{min-width:0;width:100%;max-width:520px;justify-self:end}.hydroseal-calculator-card .hydroseal-full-calculator{width:100%}.hydroseal-calculator-card .calc-brand{padding:16px 20px 10px}.hydroseal-calculator-card .calc-progress{padding:0 20px 12px}.hydroseal-calculator-card .calc-step{padding:16px 20px 18px}.hydroseal-calculator-card .calc-grid{gap:9px}.hydroseal-calculator-card .calc-choice,.hydroseal-calculator-card .calc-addon{padding:12px}.hydroseal-calculator-card .calc-actions{margin-top:12px}.hydroseal-calculator-card .calc-next{min-height:36px;width:auto;padding:7px 13px;font-size:.84rem;line-height:1}.hydroseal-calculator-card .calc-brand h3{margin-top:2px;margin-bottom:5px}.hydroseal-calculator-card .calc-brand p{font-size:.9rem}.hydroseal-calculator-card .calc-step>p{margin-bottom:14px}.hydroseal-calculator-card .calc-step h4{margin-bottom:4px}
@media(max-width:1050px){.hydroseal-driveway-price-calc-grid{grid-template-columns:minmax(0,1.12fr) minmax(350px,.88fr)}.hydroseal-calculator-card{max-width:480px}}
@media(max-width:900px){.hydroseal-driveway-price-calc-grid{grid-template-columns:1fr}.hydroseal-driveway-calc-image,.hydroseal-calculator-card{grid-column:1;grid-row:auto}.hydroseal-driveway-calc-image{width:100%;max-width:680px;justify-self:center}.hydroseal-driveway-calc-image img{max-height:none}.hydroseal-calculator-card{width:100%;max-width:560px;justify-self:center}.hydroseal-calculator-card .calc-next{width:auto}}
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
console.log('Tightened driveway calculator vertical spacing and narrowed Continue buttons');
