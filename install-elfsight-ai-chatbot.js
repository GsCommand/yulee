const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const appClass = 'elfsight-app-8d93a5a4-3fe5-4e4e-a7d5-1856bb997b36';
const platformSrc = 'https://elfsightcdn.com/platform.js';
const widgetMarkup = `<div class="${appClass}" data-elfsight-app-lazy></div>`;
const scriptMarkup = `<script src="${platformSrc}" async></script>`;

const htmlFiles = fs.readdirSync(publicDir).filter((name) => name.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes(appClass)) {
    console.log(`AI chatbot already present in ${file}`);
    continue;
  }

  const hasPlatformScript = html.includes(platformSrc);
  const insert = `${hasPlatformScript ? '' : scriptMarkup + '\n'}${widgetMarkup}\n`;

  if (!html.includes('</body>')) {
    throw new Error(`${file}: closing body tag not found`);
  }

  html = html.replace('</body>', `${insert}</body>`);

  if ((html.match(new RegExp(appClass, 'g')) || []).length !== 1) {
    throw new Error(`${file}: expected exactly one AI chatbot widget`);
  }

  fs.writeFileSync(filePath, html);
  console.log(`Installed Elfsight AI chatbot in ${file}`);
}

console.log(`Elfsight AI chatbot installed across ${htmlFiles.length} HTML pages.`);
