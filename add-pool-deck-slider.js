const fs = require('fs');

const file = 'public/yulee-pool-deck-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const heading = '<h2>Pool deck paver sealing cost in Yulee</h2>';
const sliderClass = 'elfsight-app-1ac40f22-7acd-45c3-839e-6716f56e8387';
const platformSrc = 'https://elfsightcdn.com/platform.js';

const headingPos = html.indexOf(heading);
if (headingPos < 0) throw new Error('Pool deck pricing H2 not found');

const sectionStart = html.lastIndexOf('<section', headingPos);
const sectionEndTag = html.indexOf('</section>', headingPos);
if (sectionStart < 0 || sectionEndTag < 0) throw new Error('Pool deck pricing section bounds not found');
const sectionEnd = sectionEndTag + '</section>'.length;

const replacement = `<section class="article-block hydroseal-pool-slider-section"><h2>Pool deck paver sealing cost in Yulee</h2><div class="hydroseal-pool-slider-card"><div class="${sliderClass}" data-elfsight-app-lazy></div></div></section>`;
html = html.slice(0, sectionStart) + replacement + html.slice(sectionEnd);

const styles = `<style id="hydroseal-pool-slider-layout">
.hydroseal-pool-slider-section{display:grid;gap:18px}.hydroseal-pool-slider-card{min-width:0;width:min(100%,820px);justify-self:center;overflow:hidden;border:1px solid #dce7ed;border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10);padding:10px}.hydroseal-pool-slider-card .${sliderClass}{width:100%}
</style>`;

if (!html.includes('id="hydroseal-pool-slider-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if (!html.includes(platformSrc)) {
  html = html.replace('</body>', `<script src="${platformSrc}" async></script>\n</body>`);
}

const exactWidgetMarkup = `class="${sliderClass}" data-elfsight-app-lazy`;
if ((html.split(exactWidgetMarkup).length - 1) !== 1) {
  throw new Error('Expected exactly one pool deck before-and-after slider widget');
}
if (html.includes('Published starting rates')) throw new Error('Pool deck published rates label still present');
if (html.includes('Concrete or brick paver pool deck')) throw new Error('Pool deck pricing table still present');
if (html.includes('Final pricing depends on deck size')) throw new Error('Pool deck pricing note still present');

fs.writeFileSync(file, html);
console.log('Kept Elfsight pool deck before-and-after slider with calculator removed');
