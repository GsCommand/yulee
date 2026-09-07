const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public');
for (const name of fs.readdirSync(dir).filter(n => n.endsWith('.html'))) {
  const file = path.join(dir, name);
  let html = fs.readFileSync(file, 'utf8');
  const old = '<section class="ys-hero ys-hero--no-image">';
  if (html.includes(old)) {
    html = html.replace(old, '<section class="ys-hero ys-hero--no-image" style="background:linear-gradient(135deg,#082744 0%,#005ea8 58%,#1e7ebb 100%)">');
    fs.writeFileSync(file, html);
    console.log(`Applied existing no-photo fallback treatment to ${name}`);
  }
}
