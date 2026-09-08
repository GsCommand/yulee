const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) throw new Error('public directory not found; run after site copy/build steps.');

const files = fs.readdirSync(publicDir).filter(name => name.endsWith('.html')).sort();
if (!files.length) throw new Error('No HTML pages found in public directory.');

const links = [
  ['/yulee-driveway-paver-sealing.html', 'Driveway Paver Sealing'],
  ['/yulee-pool-deck-paver-sealing.html', 'Pool Deck Sealing'],
  ['/yulee-travertine-sealing.html', 'Travertine Sealing'],
  ['/pressure-washing.html', 'Pressure Washing'],
  ['/yulee-house-washing.html', 'House Washing'],
  ['/yulee-roof-washing.html', 'Roof Washing'],
  ['/service-areas.html', 'Service Areas'],
];

const footerLinks = links.map(([href, label], i) => {
  const sep = i < links.length - 1 ? '<span class="yulee-footer-dot" aria-hidden="true">·</span>' : '';
  return `<a href="${href}">${label}</a>${sep}`;
}).join('');

const footer = `<footer class="site-footer yulee-standard-footer">
  <nav class="yulee-footer-links" aria-label="Footer services">${footerLinks}</nav>
  <p class="yulee-footer-copy">© 2026 HydroSeal · Yulee Paver Sealing · Serving Yulee, Fernandina Beach &amp; Nassau County, FL</p>
</footer>`;

const style = `<style id="yulee-standard-footer-style">
.yulee-standard-footer{background:#0b3658!important;color:#fff!important;text-align:center!important;padding:30px 20px!important;border:0!important}
.yulee-standard-footer .yulee-footer-links{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:0!important;width:100%!important;text-align:center!important}
.yulee-standard-footer .yulee-footer-links a{display:inline-block!important;text-align:center!important;color:#fff!important;text-decoration:none!important}
.yulee-standard-footer .yulee-footer-links a:hover,.yulee-standard-footer .yulee-footer-links a:focus-visible{color:#8edcff!important}
.yulee-standard-footer .yulee-footer-dot{display:inline-block!important;margin:0 8px!important;color:#fff!important;opacity:.72}
.yulee-standard-footer .yulee-footer-copy{width:100%!important;margin:10px auto 0!important;text-align:center!important;color:#fff!important;opacity:.9}
@media(max-width:700px){.yulee-standard-footer{padding:26px 14px!important}.yulee-standard-footer .yulee-footer-dot{margin:0 5px!important}.yulee-standard-footer .yulee-footer-links{line-height:1.8!important}}
</style>`;

for (const filename of files) {
  const file = path.join(publicDir, filename);
  let html = fs.readFileSync(file, 'utf8');

  // Remove only the bottom credential strip. Keep the separate social-icons section intact.
  html = html.replace(/<section class="section cert-section yulee-trust-section"\b[\s\S]*?<\/section>\s*/gi, '');

  const footers = html.match(/<footer\b[\s\S]*?<\/footer>/gi) || [];
  if (footers.length !== 1) {
    throw new Error(`${filename}: expected exactly one footer, found ${footers.length}`);
  }

  html = html.replace(footers[0], footer);

  const existingStyle = /<style id="yulee-standard-footer-style">[\s\S]*?<\/style>\s*/i;
  if (existingStyle.test(html)) {
    html = html.replace(existingStyle, `${style}\n`);
  } else {
    if (!html.includes('</head>')) throw new Error(`${filename}: missing </head>`);
    html = html.replace('</head>', `${style}\n</head>`);
  }

  const required = [
    'Driveway Paver Sealing',
    'Pool Deck Sealing',
    'Travertine Sealing',
    'Pressure Washing',
    'House Washing',
    'Roof Washing',
    'Service Areas',
    '© 2026 HydroSeal · Yulee Paver Sealing · Serving Yulee, Fernandina Beach &amp; Nassau County, FL',
    'background:#0b3658!important',
    'color:#fff!important',
  ];
  for (const needle of required) {
    if (!html.includes(needle)) throw new Error(`${filename}: standardized footer verification failed for ${needle}`);
  }

  if (html.includes('class="section cert-section yulee-trust-section"')) {
    throw new Error(`${filename}: bottom credential strip still present after cleanup.`);
  }

  fs.writeFileSync(file, html);
  console.log(`Removed bottom credentials and standardized dark-blue footer: ${filename}`);
}

console.log(`Verified bottom credential removal and dark-blue footer on ${files.length} HTML pages; social icon sections were not touched.`);
