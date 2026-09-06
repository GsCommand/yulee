const fs = require('fs');

const file = 'public/yulee-driveway-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const pricingSection = /<section class="article-block"><p class="eyebrow">Published starting rates<\/p><h2>Driveway paver sealing cost in Yulee<\/h2>[\s\S]*?<\/section>/;

const replacement = `<section class="article-block pricing-section">
  <div class="section-heading">
    <p class="eyebrow">Published starting rates</p>
    <h2>Driveway paver sealing cost in Yulee</h2>
    <p>Review HydroSeal's published starting rates or use the calculator beside them for a preliminary project estimate.</p>
  </div>
  <div class="pricing-grid">
    <article class="pricing-panel pricing-rates" aria-labelledby="yulee-driveway-pricing-title">
      <div class="section-heading">
        <h3 id="yulee-driveway-pricing-title">Service and starting-price guide</h3>
        <p>Published starting rates. Final pricing is confirmed after photo review or inspection.</p>
      </div>
      <div class="price-table-wrap">
        <table class="price-table">
          <thead><tr><th>Service</th><th>Starting rate</th></tr></thead>
          <tbody>
            <tr><td>Concrete or brick paver driveway — clean, re-sand, seal</td><td>$1.50 / sq ft</td></tr>
            <tr><td>Travertine or natural stone</td><td>$1.60 / sq ft</td></tr>
            <tr><td>Failed-sealer stripping</td><td>+$1.50 / sq ft</td></tr>
            <tr><td>Efflorescence treatment</td><td>+$0.05 / sq ft</td></tr>
            <tr><td>Paver repair or releveling</td><td>$8 / paver</td></tr>
          </tbody>
        </table>
      </div>
      <p class="pricing-note">Rates are starting estimates. Final pricing is confirmed after photo review or inspection and depends on actual measurements, coating condition, stains, repairs, access, drainage and preparation.</p>
    </article>
    <article class="pricing-panel pricing-calculator" aria-labelledby="yulee-driveway-calculator-title">
      <div class="section-heading">
        <h3 id="yulee-driveway-calculator-title">HydroSeal paver sealing cost calculator</h3>
        <p>Choose your approximate square footage, material, condition and optional services.</p>
      </div>
      <div class="hspav" data-calculator aria-label="HydroSeal paver sealing cost calculator"></div>
      <p class="pricing-calculator-note">Preliminary estimate only. Final pricing depends on actual measurements and site conditions.</p>
    </article>
  </div>
</section>`;

if (!pricingSection.test(html)) {
  throw new Error('Driveway pricing section not found; refusing to build without calculator injection.');
}

html = html.replace(pricingSection, replacement);

if (!html.includes('src="/paver-calculator.js')) {
  html = html.replace('</body>', `<script src="/paver-calculator.js?v=3" defer></script>
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
  throw new Error('Calculator container missing after injection.');
}

fs.writeFileSync(file, html);
console.log('Injected HydroSeal calculator into Yulee driveway pricing section.');
