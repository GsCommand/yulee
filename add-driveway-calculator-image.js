const fs = require('fs');

const file = 'public/yulee-driveway-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const gridMarker = '<div class="hydroseal-price-calc-grid">';
const calcMarker = '<div class="hydroseal-price-card"><div class="hydroseal-full-calculator"';

if (!html.includes(gridMarker)) throw new Error('Driveway pricing/calculator grid not found');
if (!html.includes(calcMarker)) throw new Error('Driveway calculator card not found');

html = html.replace(gridMarker, '<div class="hydroseal-price-calc-grid hydroseal-driveway-price-calc-grid">');
html = html.replace(
  calcMarker,
  '<figure class="hydroseal-driveway-calc-image"><img src="/driveway-paver-resealed.webp" alt="Freshly resealed paver driveway by HydroSeal in Yulee, Florida" loading="lazy" decoding="async"></figure><div class="hydroseal-price-card hydroseal-calculator-card"><div class="hydroseal-full-calculator"'
);

const styles = `<style id="hydroseal-driveway-calculator-image-layout">
.hydroseal-driveway-price-calc-grid{grid-template-columns:minmax(300px,.9fr) minmax(220px,.68fr) minmax(390px,1.15fr);gap:24px;align-items:start}
.hydroseal-driveway-calc-image{margin:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10)}
.hydroseal-driveway-calc-image img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover}
@media(max-width:1100px){.hydroseal-driveway-price-calc-grid{grid-template-columns:1fr 1fr}.hydroseal-driveway-calc-image{grid-column:1/-1;width:min(100%,620px);justify-self:center}.hydroseal-calculator-card{grid-column:2}.hydroseal-price-table{grid-column:1;grid-row:2}.hydroseal-driveway-calc-image{grid-row:1}.hydroseal-calculator-card{grid-row:2}}
@media(max-width:900px){.hydroseal-driveway-price-calc-grid{grid-template-columns:1fr}.hydroseal-driveway-calc-image,.hydroseal-price-table,.hydroseal-calculator-card{grid-column:1;grid-row:auto}.hydroseal-driveway-calc-image{width:100%;max-width:620px}}
</style>`;

if (!html.includes('id="hydroseal-driveway-calculator-image-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if ((html.match(/driveway-paver-resealed\.webp/g) || []).length !== 1) {
  throw new Error('Expected exactly one driveway calculator image');
}

fs.writeFileSync(file, html);
console.log('Added driveway-paver-resealed.webp beside the driveway calculator');
