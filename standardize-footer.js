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
.yulee-standard-footer{text-align:center!important;padding-left:20px!important;padding-right:20px!important}
.yulee-standard-footer .yulee-footer-links{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:0!important;width:100%!important;text-align:center!important}
.yulee-standard-footer .yulee-footer-links a{display:inline-block!important;text-align:center!important}
.yulee-standard-footer .yulee-footer-dot{display:inline-block!important;margin:0 8px!important;opacity:.7}
.yulee-standard-footer .yulee-footer-copy{width:100%!important;margin:10px auto 0!important;text-align:center!important}
@media(max-width:700px){.yulee-standard-footer .yulee-footer-dot{margin:0 5px!important}.yulee-standard-footer .yulee-footer-links{line-height:1.8!important}}
</style>`;

for (const filename of files) {
  const file = path.join(publicDir, filename);
  let html = fs.readFileSync(file, 'utf8');

  const footers = html.match(/<footer\b[\s\S]*?<\/footer>/gi) || [];
  if (footers.length !== 1) {
    throw new Error(`${filename}: expected exactly one footer, found ${footers.length}`);
  }

  html = html.replace(footers[0], footer);

  if (!html.includes('id="yulee-standard-footer-style"')) {
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
  ];
  for (const needle of required) {
    if (!html.includes(needle)) throw new Error(`${filename}: standardized footer verification failed for ${needle}`);
  }

  fs.writeFileSync(file, html);
  console.log(`Standardized centered footer: ${filename}`);
}

console.log(`Verified standardized footer on ${files.length} HTML pages.`);
