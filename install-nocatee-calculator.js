const fs = require('fs');

const NOCATEE_COMMIT = 'b7613b8d30c8954ddca7703fb5ea61651cca4b72';
const NOCATEE_SCRIPT = `https://cdn.jsdelivr.net/gh/GsCommand/nocatee@${NOCATEE_COMMIT}/paver-calculator.js`;
const CALC_CSS = '/nocatee-calculator.css?v=1';
const TARGETS = [
  'public/index.html',
  'public/yulee-driveway-paver-sealing.html',
  'public/yulee-pool-deck-paver-sealing.html',
  'public/yulee-travertine-sealing.html'
];

function installTravertineCalculator(html) {
  const heading = '<h2>Travertine sealing cost in Yulee</h2>';
  const headingPos = html.indexOf(heading);
  if (headingPos < 0) throw new Error('Travertine pricing H2 not found');

  const sectionStart = html.lastIndexOf('<section', headingPos);
  const sectionEndTag = html.indexOf('</section>', headingPos);
  if (sectionStart < 0 || sectionEndTag < 0) throw new Error('Travertine pricing section bounds not found');
  const sectionEnd = sectionEndTag + '</section>'.length;
  const original = html.slice(sectionStart, sectionEnd);
  if (original.includes('data-calculator')) return html;

  const headingEnd = original.indexOf('</h2>') + '</h2>'.length;
  const prefix = original.slice(0, headingEnd);
  const body = original.slice(headingEnd, -'</section>'.length);
  const replacement = `${prefix}<div class="nocatee-price-calc-grid"><div class="nocatee-price-content">${body}</div><div class="nocatee-calculator-column"><div class="hspav" data-calculator aria-label="Paver sealing cost calculator"></div></div></div></section>`;
  return html.slice(0, sectionStart) + replacement + html.slice(sectionEnd);
}

const layoutStyles = `<style id="yulee-nocatee-calculator-layout">
.nocatee-price-calc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.9fr);gap:clamp(24px,4vw,44px);align-items:start;margin-top:24px}.nocatee-price-content{min-width:0}.nocatee-calculator-column{min-width:0;width:100%;max-width:520px;justify-self:end}@media(max-width:900px){.nocatee-price-calc-grid{grid-template-columns:1fr}.nocatee-calculator-column{max-width:560px;justify-self:center}}
</style>`;

const quoteLinkRestore = `<script id="preserve-yulee-quote-links">document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('a').forEach(function(link){var label=link.textContent.replace(/\\s+/g,' ').trim().toLowerCase();if(label.indexOf('request a quote')!==-1||label==='request quote')link.href='https://hydrosealpavers.com/get-a-quote';});});</script>`;

for (const file of TARGETS) {
  let html = fs.readFileSync(file, 'utf8');

  if (file.endsWith('yulee-travertine-sealing.html')) {
    html = installTravertineCalculator(html);
  }

  // Replace any older Nocatee calculator runtime with the current Nocatee source.
  html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/GsCommand\/nocatee@[^\"]+\/paver-calculator\.js" defer><\/script>/gi, `<script src="${NOCATEE_SCRIPT}" defer></script>`);

  if (!html.includes(CALC_CSS)) {
    html = html.replace('</head>', `<link rel="stylesheet" href="${CALC_CSS}" />\n${layoutStyles}\n</head>`);
  } else if (!html.includes('id="yulee-nocatee-calculator-layout"')) {
    html = html.replace('</head>', `${layoutStyles}\n</head>`);
  }

  if (!html.includes(NOCATEE_SCRIPT)) {
    html = html.replace('</body>', `<script src="${NOCATEE_SCRIPT}" defer></script>\n</body>`);
  }

  if (!html.includes('id="preserve-yulee-quote-links"')) {
    html = html.replace('</body>', `${quoteLinkRestore}\n</body>`);
  }

  const calculatorCount = (html.match(/data-calculator/g) || []).length;
  if (calculatorCount !== 1) throw new Error(`${file}: expected exactly one Nocatee calculator, found ${calculatorCount}`);
  if (!html.includes(NOCATEE_SCRIPT)) throw new Error(`${file}: current Nocatee calculator runtime missing`);
  if (!html.includes(CALC_CSS)) throw new Error(`${file}: Nocatee calculator styles missing`);

  fs.writeFileSync(file, html);
  console.log(`Installed current Nocatee calculator in ${file}`);
}

console.log('Nocatee calculator restored to the same four Yulee locations. Submission endpoint is inherited directly from the pinned Nocatee runtime.');
