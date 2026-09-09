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
  throw new Error('Could not freeze homepage SEO foundation before gallery move.');
}

const galleryRe = /\s*<section\s+class="section gallery-embed"\s+aria-label="Recent paver sealing projects in Yulee">[\s\S]*?<\/section>\s*/i;
const galleryMatch = html.match(galleryRe);
if (!galleryMatch) throw new Error('Recent paver sealing projects gallery was not found on homepage.');
const gallery = galleryMatch[0].trim();

html = html.replace(galleryRe, '\n\n');

const servicesMarker = '<section id="services" class="section home-image-services">';
const servicesPos = html.indexOf(servicesMarker);
if (servicesPos < 0) throw new Error('Homepage Paver sealing services section was not found.');

html = html.slice(0, servicesPos) + gallery + '\n\n      ' + html.slice(servicesPos);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed during gallery move.');
if (after.description !== before.description) throw new Error('Homepage meta description changed during gallery move.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed during gallery move.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed during gallery move.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed during gallery move.');

const galleryCount = (html.match(/aria-label="Recent paver sealing projects in Yulee"/g) || []).length;
if (galleryCount !== 1) throw new Error(`Expected exactly one homepage recent-projects gallery, found ${galleryCount}.`);

const galleryPos = html.indexOf('aria-label="Recent paver sealing projects in Yulee"');
const servicesNewPos = html.indexOf(servicesMarker);
if (galleryPos < 0 || servicesNewPos < 0 || galleryPos > servicesNewPos) {
  throw new Error('Recent-projects gallery is not positioned above Paver sealing services in Yulee.');
}

fs.writeFileSync(file, html);
console.log('Moved homepage recent paver sealing projects gallery above Paver sealing services in Yulee.');
