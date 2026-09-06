const fs = require('fs');

const file = 'public/yulee-pool-deck-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const gridMarker = '<div class="hydroseal-price-calc-grid">';
const priceCardMarker = '<div class="hydroseal-price-card hydroseal-price-table">';
const calcMarker = '<div class="hydroseal-price-card"><div class="hydroseal-full-calculator"';
const sliderClass = 'elfsight-app-1ac40f22-7acd-45c3-839e-6716f56e8387';
const platformSrc = 'https://elfsightcdn.com/platform.js';

if (!html.includes(gridMarker)) throw new Error('Pool deck pricing/calculator grid not found');
if (!html.includes(priceCardMarker)) throw new Error('Pool deck pricing card not found');
if (!html.includes(calcMarker)) throw new Error('Pool deck calculator card not found');

html = html.replace(gridMarker, '<div class="hydroseal-price-calc-grid hydroseal-pool-price-calc-grid">');
html = html.replace(
  calcMarker,
  `<div class="hydroseal-pool-slider-card"><div class="${sliderClass}" data-elfsight-app-lazy></div></div><div class="hydroseal-price-card hydroseal-pool-calculator-card"><div class="hydroseal-full-calculator"`
);

const priceStart = html.indexOf(priceCardMarker);
const sliderStart = html.indexOf('<div class="hydroseal-pool-slider-card">', priceStart);
if (priceStart < 0 || sliderStart < 0 || sliderStart <= priceStart) {
  throw new Error('Unable to remove pool deck published pricing text');
}
html = html.slice(0, priceStart) + html.slice(sliderStart);

const publishedRatesLabel = '<p class="eyebrow">Published starting rates</p>';
if (html.includes(publishedRatesLabel)) {
  html = html.replace(publishedRatesLabel, '');
}

const styles = `<style id="hydroseal-pool-slider-layout">
.hydroseal-pool-price-calc-grid{grid-template-columns:minmax(0,1.18fr) minmax(360px,.92fr);gap:28px;align-items:start}
.hydroseal-pool-slider-card{min-width:0;width:100%;overflow:hidden;border:1px solid #dce7ed;border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10);padding:10px}
.hydroseal-pool-slider-card .${sliderClass}{width:100%}
.hydroseal-pool-calculator-card{min-width:0;width:100%;max-width:520px;justify-self:end}
.hydroseal-pool-calculator-card .hydroseal-full-calculator{width:100%}
@media(max-width:900px){.hydroseal-pool-price-calc-grid{grid-template-columns:1fr}.hydroseal-pool-slider-card,.hydroseal-pool-calculator-card{grid-column:1;grid-row:auto}.hydroseal-pool-slider-card{width:100%;max-width:680px;justify-self:center}.hydroseal-pool-calculator-card{width:100%;max-width:560px;justify-self:center}}
</style>`;

if (!html.includes('id="hydroseal-pool-slider-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if (!html.includes(platformSrc)) {
  html = html.replace('</body>', `<script src="${platformSrc}" async></script>\n</body>`);
}

if ((html.match(new RegExp(sliderClass, 'g')) || []).length !== 1) {
  throw new Error('Expected exactly one pool deck before-and-after slider');
}
if (html.includes('Concrete or brick paver pool deck')) {
  throw new Error('Pool deck published pricing table still present after cleanup');
}
if (html.includes('Final pricing depends on deck size')) {
  throw new Error('Pool deck pricing note still present after cleanup');
}
if (html.includes('Published starting rates')) {
  throw new Error('Pool deck Published starting rates label still present');
}

fs.writeFileSync(file, html);
console.log('Removed pool deck pricing text and installed Elfsight before/after slider beside calculator');
