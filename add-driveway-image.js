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

const replacement = `<section class="article-block hydroseal-driveway-showcase"><h2>Driveway paver sealing cost in Yulee</h2><figure class="hydroseal-driveway-result-image"><img src="/driveway-paver-resealed.webp" alt="Before and after freshly resealed paver driveway by HydroSeal in Yulee, Florida" loading="lazy" decoding="async"></figure></section>`;
html = html.slice(0, sectionStart) + replacement + html.slice(sectionEnd);

const styles = `<style id="hydroseal-driveway-image-layout">
.hydroseal-driveway-showcase{display:grid;gap:18px}.hydroseal-driveway-result-image{margin:0;width:min(100%,820px);justify-self:center;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:0 18px 50px rgba(20,50,75,.10)}.hydroseal-driveway-result-image img{display:block;width:100%;height:auto;object-fit:contain}.faq-section .faq-item summary{font-size:1.16rem;line-height:1.45;padding:20px 22px;font-weight:850}.faq-section .faq-item p{font-size:1.09rem!important;line-height:1.75;padding:0 22px 22px}@media(max-width:900px){.faq-section .faq-item summary{font-size:1.1rem}.faq-section .faq-item p{font-size:1.04rem!important}}
</style>`;

if (!html.includes('id="hydroseal-driveway-image-layout"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

if (html.includes('Published starting rates')) throw new Error('Driveway published rates label still present');
if (html.includes('Concrete or brick paver driveway — clean, re-sand, seal')) throw new Error('Driveway pricing table still present');

fs.writeFileSync(file, html);
console.log('Kept driveway before-and-after image with calculator removed');
