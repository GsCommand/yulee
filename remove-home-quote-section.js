const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
if (!fs.existsSync(file)) throw new Error('Homepage missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function freezeSeo(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: (source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '',
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = freezeSeo(html);
if (!before.title || !before.description || !before.canonical || !before.h1) {
  throw new Error('Could not freeze homepage SEO fields before removing quote section.');
}

const quoteRe = /\s*<section\s+id="quote"\s+class="section cta-panel"[^>]*>[\s\S]*?<\/section>\s*/i;
if (!quoteRe.test(html)) throw new Error('Homepage quote CTA section was not found.');

html = html.replace(quoteRe, '\n');

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed while removing quote section.');
if (after.description !== before.description) throw new Error('Homepage meta description changed while removing quote section.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed while removing quote section.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed while removing quote section.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed while removing quote section.');

for (const removed of [
  'Get a Yulee paver sealing quote',
  'Send surface photos, approximate square footage and your neighborhood.',
  'info@hydrosealpavers.com'
]) {
  if (html.includes(removed)) throw new Error(`Homepage quote content still present: ${removed}`);
}

fs.writeFileSync(file, html);
console.log('Removed homepage Free estimate / Yulee paver sealing quote section without changing protected SEO fields.');
