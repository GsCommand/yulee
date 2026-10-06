const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');
const placeholder = /<section[^>]*data-build-placeholder="travertine-wildlight"[^>]*>[\s\S]*?<\/section>\s*/i;

if (placeholder.test(html)) {
  html = html.replace(placeholder, '');
  fs.writeFileSync(file, html);
  console.log('Removed temporary travertine Wildlight build placeholder.');
}

if (html.includes('<h2>Travertine Sealing Wildlight Yulee</h2>')) {
  throw new Error('Travertine Wildlight section still present after placeholder cleanup.');
}
