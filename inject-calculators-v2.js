const fs = require('fs');

const pages = [
  {
    file: 'public/yulee-driveway-paver-sealing.html',
    heading: 'Driveway paver sealing cost in Yulee',
    ratesId: 'yulee-driveway-pricing-title',
    calculatorId: 'yulee-driveway-calculator-title',
    calculatorHeading: 'HydroSeal driveway paver sealing cost calculator',
    calculatorCopy: 'Choose your approximate square footage, material, condition and optional services for your driveway project.'
  },
  {
    file: 'public/yulee-pool-deck-paver-sealing.html',
    heading: 'Pool deck paver sealing cost in Yulee',
    ratesId: 'yulee-pool-pricing-title',
    calculatorId: 'yulee-pool-calculator-title',
    calculatorHeading: 'HydroSeal pool deck paver sealing cost calculator',
    calculatorCopy: 'Choose your approximate square footage, material, condition and optional services for your pool deck, patio or lanai project.'
  },
  {
    file: 'public/yulee-travertine-sealing.html',
    heading: 'Travertine sealing cost in Yulee',
    ratesId: 'yulee-travertine-pricing-title',
    calculatorId: 'yulee-travertine-calculator-title',
    calculatorHeading: 'HydroSeal travertine sealing cost calculator',
    calculatorCopy: 'Choose your approximate square footage, material, condition and optional services for your travertine or natural-stone project.'
  }
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const staticStyles = `<style id="hydroseal-pricing-calculator-layout">
.pricing-section>.section-heading{max-width:900px;margin-left:auto;margin-right:auto;text-align:center}
.pricing-section>.section-heading p{margin-left:auto;margin-right:auto}
.pricing-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.92fr);gap:clamp(24px,4vw,48px);align-items:start}
.pricing-panel{min-width:0;padding:clamp(20px,2.6vw,28px);border:1px solid var(--line);border-radius:24px;background:var(--panel)}
.pricing-panel>.section-heading{margin-bottom:18px}
.pricing-panel>.section-heading h3{font-size:1.3rem;line-height:1.15}
.pricing-rates .price-table-wrap{margin-top:16px}
.pricing-section .price-table{min-width:0}
.pricing-calculator{position:sticky;top:120px}
.pricing-calculator-note{margin:16px 2px 0;color:var(--muted);font-size:.92rem!important}
@media(max-width:900px){.pricing-grid{grid-template-columns:1fr}.pricing-calculator{position:static}.pricing-panel{padding:20px}}
</style>`;

function injectCalculator(config) {
  let html = fs.readFileSync(config.file, 'utf8');
  const pricingSection = new RegExp(
    '<section class="article-block"><p class="eyebrow">Published starting rates<\\/p><h2>' +
      escapeRegExp(config.heading) +
      '<\\/h2>([\\s\\S]*?)<\\/section>'
  );

  const match = html.match(pricingSection);
  if (!match) throw new Error(config.file + ': pricing section not found.');

  const originalBody = match[1];
  const tableMatch = originalBody.match(/<div class="price-table-wrap">[\s\S]*?<\/div>/);
  const noteMatch = originalBody.match(/<p class="pricing-note">[\s\S]*?<\/p>/);
  if (!tableMatch || !noteMatch) throw new Error(config.file + ': pricing table or note not found.');

  const replacement = `<section class="article-block pricing-section">
  <div class="section-heading">
    <p class="eyebrow">Published starting rates</p>
    <h2>${config.heading}</h2>
    <p>Review HydroSeal's published starting rates or use the calculator beside them for a preliminary project estimate.</p>
  </div>
  <div class="pricing-grid">
    <article class="pricing-panel pricing-rates" aria-labelledby="${config.ratesId}">
      <div class="section-heading">
        <h3 id="${config.ratesId}">Service and starting-price guide</h3>
        <p>Published starting rates. Final pricing is confirmed after photo review or inspection.</p>
      </div>
      ${tableMatch[0]}
      ${noteMatch[0]}
    </article>
    <article class="pricing-panel pricing-calculator" aria-labelledby="${config.calculatorId}">
      <div class="section-heading">
        <h3 id="${config.calculatorId}">${config.calculatorHeading}</h3>
        <p>${config.calculatorCopy}</p>
      </div>
      <div class="hspav" data-calculator aria-label="HydroSeal paver sealing cost calculator"></div>
      <p class="pricing-calculator-note">Preliminary estimate only. Final pricing depends on actual measurements and site conditions.</p>
    </article>
  </div>
</section>`;

  // Use a replacement callback so dollar signs in prices such as $1.50 are preserved literally.
  html = html.replace(pricingSection, () => replacement);

  if (!html.includes('id="hydroseal-pricing-calculator-layout"')) {
    html = html.replace('</head>', staticStyles + '\n</head>');
  }

  if (!html.includes('src="/paver-calculator.js')) {
    html = html.replace('</body>', '<script src="/paver-calculator.js?v=5" defer></script>\n</body>');
  }

  if (!html.includes('data-calculator')) throw new Error(config.file + ': calculator missing after injection.');
  if ((html.match(/Service and starting-price guide/g) || []).length !== 1) throw new Error(config.file + ': duplicate pricing panel detected.');

  fs.writeFileSync(config.file, html);
  console.log('Formatted calculator pricing section in ' + config.file);
}

pages.forEach(injectCalculator);
