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
  throw new Error('Could not freeze homepage SEO foundation before cleanup.');
}

const pillRegex = /<div class="home-local-points" aria-label="Common Yulee paver conditions">\s*<span>Wildlight driveways<\/span>\s*<span>Screened lanais<\/span>\s*<span>Pool decks<\/span>\s*<span>Irrigation staining<\/span>\s*<span>Joint-sand washout<\/span>\s*<span>Coastal exposure<\/span>\s*<\/div>/i;

if (!pillRegex.test(html)) throw new Error('Homepage six-pill local conditions strip was not found.');
html = html.replace(pillRegex, '');

const calculatorNote = '<p class="pricing-calculator-note">This calculator provides a preliminary estimate only. Final pricing depends on actual measurements, paver condition, access, drainage, stains, existing sealer, repairs and site-specific preparation requirements.</p>';
if (!html.includes(calculatorNote)) throw new Error('Homepage calculator disclaimer paragraph was not found.');
html = html.replace(calculatorNote, '');

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed during cleanup.');
if (after.description !== before.description) throw new Error('Homepage meta description changed during cleanup.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed during cleanup.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed during cleanup.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed during cleanup.');

if (html.includes('class="home-local-points"')) throw new Error('Homepage local-condition pills are still present.');
if (html.includes(calculatorNote)) throw new Error('Homepage calculator disclaimer is still present.');
if (!html.includes('id="calculator"') || !html.includes('data-calculator')) throw new Error('Homepage calculator was removed unexpectedly.');
if (!html.includes('home-why-panel')) throw new Error('Why HydroSeal panel was removed unexpectedly.');

fs.writeFileSync(file, html);
console.log('Removed homepage local-condition pills and calculator disclaimer while preserving SEO foundation.');
