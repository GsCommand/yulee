const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-pool-deck-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Pool deck page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function snapshot(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [],
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [],
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = snapshot(html);
const oldSectionRe = /<section\s+class="section gallery-embed"\s+aria-label="Recent pool deck work">[\s\S]*?<\/section>/i;
if (!oldSectionRe.test(html)) throw new Error('Recent pool deck work gallery section not found.');

const replacement = `<section class="section gallery-embed" aria-label="Recent pool deck work"><!-- Elfsight Photo Gallery | Pool Deck Gallery -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-aac62a49-a425-47be-9c8a-13971e000940" data-elfsight-app-lazy></div></section>`;

html = html.replace(oldSectionRe, replacement);

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while replacing gallery.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while replacing gallery.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while replacing gallery.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while replacing gallery.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Pool deck H2 inventory changed while replacing gallery.');
if (JSON.stringify(after.h3) !== JSON.stringify(before.h3)) throw new Error('Pool deck H3 inventory changed while replacing gallery.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while replacing gallery.');

if (!html.includes('elfsight-app-aac62a49-a425-47be-9c8a-13971e000940')) throw new Error('New Pool Deck Gallery widget was not installed.');
if (html.includes('aria-label="Recent pool deck work"><script src="https://elfsightcdn.com/platform.js" async></script><div class="elfsight-app-bfab489f-7fca-4f05-ba5a-d92616b76b26"')) throw new Error('Old pool deck gallery widget is still present in the recent-work section.');

fs.writeFileSync(file, html);
console.log('Replaced pool deck Recent work gallery with dedicated Elfsight Pool Deck Gallery; SEO fields unchanged.');
