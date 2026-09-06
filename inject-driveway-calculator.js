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

function injectCalculator(config) {
  let html = fs.readFileSync(config.file, 'utf8');
  const pricingSection = new RegExp(
    '<section class="article-block"><p class="eyebrow">Published starting rates<\\/p><h2>' +
      escapeRegExp(config.heading) +
      '<\\/h2>([\\s\\S]*?)<\\/section>'
  );

  const match = html.match(pricingSection);
  if (!match) {
    throw new Error(config.file + ': pricing section not found; refusing to build without calculator injection.');
  }

  const originalBody = match[1];
  const tableMatch = originalBody.match(/<div class="price-table-wrap">[\s\S]*?<\/div>/);
  const noteMatch = originalBody.match(/<p class="pricing-note">[\s\S]*?<\/p>/);

  if (!tableMatch || !noteMatch) {
    throw new Error(config.file + ': existing published pricing table or pricing note not found.');
  }

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

  html = html.replace(pricingSection, replacement);

  if (!html.includes('src="/paver-calculator.js')) {
    html = html.replace('</body>', `<script src="/paver-calculator.js?v=4" defer></script>
<script>
window.addEventListener('load', function () {
  document.querySelectorAll('a').forEach(function (link) {
    var label = link.textContent.replace(/\\s+/g, ' ').trim().toLowerCase();
    if (label.indexOf('request a quote') !== -1 || label === 'request quote') {
      link.href = 'https://hydrosealpavers.com/get-a-quote';
    }
  });
});
</script>
</body>`);
  }

  if (!html.includes('data-calculator')) {
    throw new Error(config.file + ': calculator container missing after injection.');
  }

  fs.writeFileSync(config.file, html);
  console.log('Injected HydroSeal calculator into ' + config.file);
}

pages.forEach(injectCalculator);
