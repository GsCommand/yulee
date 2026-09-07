const fs = require('fs');

const file = 'public/yulee-driveway-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const heading = '<h2>Driveway paver sealing cost in Yulee</h2>';
const headingPos = html.indexOf(heading);
if (headingPos < 0) throw new Error('Driveway pricing H2 not found');

const sectionStart = html.lastIndexOf('<section', headingPos);
const sectionEndTag = html.indexOf('</section>', headingPos);
if (sectionStart < 0 || sectionEndTag < 0) throw new Error('Driveway pricing section bounds not found');
const sectionEnd = sectionEndTag + '</section>'.length;

const replacement = `<section class="article-block hydroseal-driveway-showcase"><h2>Driveway paver sealing cost in Yulee</h2><div class="hydroseal-driveway-calculator-grid"><figure class="hydroseal-driveway-result-image"><img src="/yulee-wildlight-paver-sealing.webp" alt="Before and after freshly resealed paver driveway by HydroSeal in Yulee, Florida" loading="lazy" decoding="async"></figure><div class="hydroseal-driveway-nocatee-calculator"><div class="hspav" data-calculator aria-label="Paver sealing cost calculator"></div></div></div></section>`;
html = html.slice(0, sectionStart) + replacement + html.slice(sectionEnd);

const styles = `<style id="hydroseal-driveway-image-layout">
.hydroseal-driveway-showcase{display:grid;gap:18px}.hydroseal-driveway-calculator-grid{display:grid;grid-template-columns:minmax(0,1.28fr) minmax(360px,.92fr);gap:28px;align-items:start}.hydroseal-driveway-result-image{margin:0;min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10);display:flex;align-items:center;justify-content:center}.hydroseal-driveway-result-image img{display:block;width:100%;height:auto;max-height:590px;object-fit:contain;object-position:center;background:#fff}.hydroseal-driveway-nocatee-calculator{min-width:0;width:100%;max-width:520px;justify-self:end}.faq-section .faq-item summary{font-size:1.16rem;line-height:1.45;padding:20px 22px;font-weight:850}.faq-section .faq-item p{font-size:1.09rem!important;line-height:1.75;padding:0 22px 22px}@media(max-width:1050px){.hydroseal-driveway-calculator-grid{grid-template-columns:minmax(0,1.12fr) minmax(350px,.88fr)}.hydroseal-driveway-nocatee-calculator{max-width:480px}}@media(max-width:900px){.hydroseal-driveway-calculator-grid{grid-template-columns:1fr}.hydroseal-driveway-result-image{width:100%;max-width:680px;justify-self:center}.hydroseal-driveway-result-image img{max-height:none}.hydroseal-driveway-nocatee-calculator{width:100%;max-width:560px;justify-self:center}.faq-section .faq-item summary{font-size:1.1rem}.faq-section .faq-item p{font-size:1.04rem!important}}
</style>`;

if (!html.includes('id="hydroseal-driveway-image-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if (html.includes('Published starting rates')) throw new Error('Driveway published rates label still present');
if (html.includes('Concrete or brick paver driveway — clean, re-sand, seal')) throw new Error('Driveway pricing table still present');
if ((html.match(/data-calculator/g) || []).length !== 1) throw new Error('Expected exactly one driveway Nocatee calculator');

fs.writeFileSync(file, html);
console.log('Restored Nocatee calculator beside Wildlight paver image');
