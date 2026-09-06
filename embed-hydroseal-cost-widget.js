const fs = require('fs');

const pages = [
  {
    file: 'public/yulee-driveway-paver-sealing.html',
    heading: 'Driveway paver sealing cost in Yulee'
  },
  {
    file: 'public/yulee-pool-deck-paver-sealing.html',
    heading: 'Pool deck paver sealing cost in Yulee'
  },
  {
    file: 'public/yulee-travertine-sealing.html',
    heading: 'Travertine sealing cost in Yulee'
  }
];

const layoutStyles = `<style id="hydroseal-official-cost-widget-layout">
.hydroseal-price-calc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,1fr);gap:clamp(24px,4vw,44px);align-items:start;margin-top:24px}
.hydroseal-price-card{min-width:0}
.hydroseal-price-table .price-table-wrap{margin-top:0}
.hydroseal-price-widget{min-width:0}
@media(max-width:900px){.hydroseal-price-calc-grid{grid-template-columns:1fr}.hydroseal-price-widget{width:100%}}
</style>`;

const widgetScript = '<script async src="https://hydrosealpavers.com/assets/js/paver-sealing-cost-widget.js"></script>';

function embedWidget(config) {
  let html = fs.readFileSync(config.file, 'utf8');
  const marker = `<section class="article-block"><p class="eyebrow">Published starting rates</p><h2>${config.heading}</h2>`;
  const start = html.indexOf(marker);

  if (start === -1) {
    throw new Error(`${config.file}: published pricing section not found`);
  }

  const end = html.indexOf('</section>', start);
  if (end === -1) {
    throw new Error(`${config.file}: pricing section closing tag not found`);
  }

  const sectionEnd = end + '</section>'.length;
  const originalSection = html.slice(start, sectionEnd);
  const headingEnd = originalSection.indexOf('</h2>') + '</h2>'.length;

  if (headingEnd < '</h2>'.length) {
    throw new Error(`${config.file}: pricing H2 not found`);
  }

  const sectionPrefix = originalSection.slice(0, headingEnd);
  const pricingBody = originalSection.slice(headingEnd, -'</section>'.length);

  const replacement = `${sectionPrefix}<div class="hydroseal-price-calc-grid"><div class="hydroseal-price-card hydroseal-price-table">${pricingBody}</div><div class="hydroseal-price-card hydroseal-price-widget"><div data-hydroseal-cost-widget></div></div></div></section>`;

  html = html.slice(0, start) + replacement + html.slice(sectionEnd);

  if (!html.includes('id="hydroseal-official-cost-widget-layout"')) {
    html = html.replace('</head>', `${layoutStyles}\n</head>`);
  }

  if (!html.includes('https://hydrosealpavers.com/assets/js/paver-sealing-cost-widget.js')) {
    html = html.replace('</body>', `${widgetScript}\n</body>`);
  }

  const hosts = (html.match(/data-hydroseal-cost-widget/g) || []).length;
  if (hosts !== 1) {
    throw new Error(`${config.file}: expected exactly one official HydroSeal calculator host, found ${hosts}`);
  }

  fs.writeFileSync(config.file, html);
  console.log(`Embedded official HydroSeal cost widget in ${config.file}`);
}

pages.forEach(embedWidget);
