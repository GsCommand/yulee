const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const htmlFiles = fs.readdirSync(publicDir).filter((name) => name.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove the older homepage calculator block and its external runtime.
  if (file === 'index.html') {
    html = html.replace(
      'The calculator below provides an initial project range.',
      'Final pricing is confirmed after photo review or inspection.'
    );
    html = html.replace(
      'Review our published starting rates or use the calculator for a quick preliminary estimate based on your project.',
      'Review our published starting rates for a quick preliminary guide. Final pricing is confirmed after photo review or inspection.'
    );
    html = html.replace(/<article class="pricing-panel pricing-calculator"[\s\S]*?<\/article>/gi, '');
    html = html.replace(/\s*<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/GsCommand\/nocatee@[^\"]+\/paver-calculator\.js" defer><\/script>/gi, '');

    const homepageStyle = '<style id="calculator-removed-homepage">.pricing-grid{grid-template-columns:1fr!important}.pricing-rates{width:100%;max-width:900px;margin:0 auto}</style>';
    if (!html.includes('id="calculator-removed-homepage"')) {
      html = html.replace('</head>', `${homepageStyle}\n</head>`);
    }
  }

  // Defensive cleanup in case any previous generated calculator markup survives.
  html = html.replace(/\s*<script src="\/hydroseal-full-calculator\.js[^\"]*" defer><\/script>/gi, '');
  html = html.replace(/<div class="hydroseal-price-card">\s*<div class="hydroseal-full-calculator"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<div class="hydroseal-full-calculator"[\s\S]*?<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<div class="hspav"\s+data-calculator[^>]*><\/div>/gi, '');

  const forbidden = [
    'data-hs-calculator',
    'hydroseal-full-calculator',
    '/hydroseal-full-calculator.js',
    'paver-calculator.js',
    'data-calculator'
  ];
  for (const marker of forbidden) {
    if (html.includes(marker)) throw new Error(`${file}: calculator marker still present: ${marker}`);
  }

  fs.writeFileSync(filePath, html);
  console.log(`Verified calculator-free: ${file}`);
}

console.log(`Removed calculators and verified ${htmlFiles.length} HTML pages.`);
