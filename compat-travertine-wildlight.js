const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');
const heading = '<h2>Travertine Sealing Wildlight Yulee</h2>';

if (!html.includes(heading)) {
  const marker = '<section class="article-block"><p class="eyebrow">Process</p><h2>How Yulee Travertine Sealing Works</h2>';
  if (!html.includes(marker)) throw new Error('Travertine process section not found for compatibility placeholder.');

  const placeholder = '<section class="feature-band"><p class="eyebrow">Wildlight focus</p><h2>Travertine Sealing Wildlight Yulee</h2></section>\n';
  html = html.replace(marker, placeholder + marker);
  fs.writeFileSync(file, html);
  console.log('Inserted temporary travertine Wildlight build placeholder.');
}
