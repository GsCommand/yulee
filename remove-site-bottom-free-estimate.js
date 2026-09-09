const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) throw new Error('Public build directory is missing.');

function snapshot(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: (source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '',
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const htmlFiles = fs.readdirSync(publicDir).filter(name => name.endsWith('.html')).sort();
if (htmlFiles.length < 15) throw new Error(`Expected at least 15 HTML pages, found ${htmlFiles.length}.`);

let removedTotal = 0;
const changedPages = [];

for (const name of htmlFiles) {
  const file = path.join(publicDir, name);
  let html = fs.readFileSync(file, 'utf8');
  const before = snapshot(html);

  const ctaRe = /\s*<section\b(?=[^>]*\bclass="[^"]*\bcta-panel\b[^"]*")[^>]*>[\s\S]*?<\/section>\s*/gi;
  let removedOnPage = 0;

  html = html.replace(ctaRe, section => {
    const isFreeEstimate = /<p\b[^>]*\bclass="[^"]*\beyebrow\b[^"]*"[^>]*>\s*Free estimate\s*<\/p>/i.test(section);
    if (!isFreeEstimate) return section;
    removedOnPage += 1;
    return '\n';
  });

  const after = snapshot(html);
  if (after.title !== before.title) throw new Error(`${name}: title changed while removing bottom Free estimate section.`);
  if (after.description !== before.description) throw new Error(`${name}: meta description changed while removing bottom Free estimate section.`);
  if (after.canonical !== before.canonical) throw new Error(`${name}: canonical changed while removing bottom Free estimate section.`);
  if (after.h1 !== before.h1) throw new Error(`${name}: H1 changed while removing bottom Free estimate section.`);
  if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error(`${name}: JSON-LD/schema changed while removing bottom Free estimate section.`);

  const remainingFreeEstimateCta = /<section\b(?=[^>]*\bclass="[^"]*\bcta-panel\b[^"]*")[^>]*>[\s\S]*?<p\b[^>]*\bclass="[^"]*\beyebrow\b[^"]*"[^>]*>\s*Free estimate\s*<\/p>[\s\S]*?<\/section>/i.test(html);
  if (remainingFreeEstimateCta) throw new Error(`${name}: a bottom Free estimate CTA remains after cleanup.`);

  if (removedOnPage > 0) {
    removedTotal += removedOnPage;
    changedPages.push(name);
    fs.writeFileSync(file, html);
  }
}

if (removedTotal < 1) throw new Error('No bottom Free estimate CTA sections were found to remove.');

console.log(`Removed ${removedTotal} bottom Free estimate CTA section(s) across ${changedPages.length} page(s): ${changedPages.join(', ')}.`);
console.log('Sitewide floating quote component remains separate and is installed afterward.');
