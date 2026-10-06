const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const roofPage = path.join(publicDir, 'yulee-roof-washing.html');
if (fs.existsSync(roofPage)) fs.unlinkSync(roofPage);

const textFiles = fs.readdirSync(publicDir).filter(name => /\.(html|xml|txt)$/i.test(name));

function stripRoofWashing(html) {
  // Remove linked cards/list items/blocks whose purpose is Roof Washing.
  html = html.replace(/<article\b[^>]*>[\s\S]*?(?:yulee-roof-washing\.html|\bRoof Washing\b)[\s\S]*?<\/article>/gi, '');
  html = html.replace(/<li\b[^>]*>[\s\S]*?(?:yulee-roof-washing\.html|\bRoof Washing\b)[\s\S]*?<\/li>/gi, '');

  // Remove any remaining Roof Washing links from navs, footers, related-services, etc.
  html = html.replace(/<a\b[^>]*href=["'][^"']*yulee-roof-washing\.html[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

  // Remove common standalone text mentions while preserving surrounding sentence flow.
  html = html.replace(/,\s*roof washing\b/gi, '');
  html = html.replace(/\s+and\s+roof washing\b/gi, '');
  html = html.replace(/\broof washing\s+and\s+/gi, '');
  html = html.replace(/\bRoof Washing\b/gi, '');
  html = html.replace(/\broof washing\b/gi, '');

  // Clean accidental empty nav/list wrappers and doubled separators/spaces.
  html = html.replace(/<li\b[^>]*>\s*<\/li>/gi, '');
  html = html.replace(/\s+·\s+·\s+/g, ' · ');
  html = html.replace(/\s{2,}/g, ' ');
  return html;
}

for (const name of textFiles) {
  const file = path.join(publicDir, name);
  let text = fs.readFileSync(file, 'utf8');

  if (/\.html$/i.test(name)) {
    text = stripRoofWashing(text);
  } else {
    text = text
      .replace(/^.*yulee-roof-washing\.html.*(?:\r?\n|$)/gim, '')
      .replace(/^.*\broof washing\b.*(?:\r?\n|$)/gim, '');
  }

  fs.writeFileSync(file, text);
}

// Hard fail if the production output still contains the removed service.
const residue = [];
for (const name of fs.readdirSync(publicDir).filter(name => /\.(html|xml|txt)$/i.test(name))) {
  const text = fs.readFileSync(path.join(publicDir, name), 'utf8');
  if (/yulee-roof-washing|\broof washing\b/i.test(text)) residue.push(name);
}
if (fs.existsSync(roofPage)) residue.push('yulee-roof-washing.html');
if (residue.length) throw new Error(`Roof Washing residue remains in production output: ${[...new Set(residue)].join(', ')}`);

console.log('Removed Roof Washing page, navigation, links, sitemap/LLM references, cards and visible mentions sitewide.');
