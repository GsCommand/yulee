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
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = snapshot(html);

const processHeading = '<h2>Pool Deck Paver Sanding and Sealing Yulee</h2>';
const serviceHeading = '<h2>Pool deck and patio paver sealing near Yulee</h2>';

const processPattern = /\s*<section class="article-block pool-process-section">[\s\S]*?<\/section>\s*/i;
const servicePattern = /\s*<section class="article-block pool-service-areas">[\s\S]*?<\/section>\s*/i;

if (!html.includes(processHeading)) throw new Error('Pool process heading not found; refusing removal.');
if (!html.includes(serviceHeading)) throw new Error('Pool service-area heading not found; refusing removal.');
if ((html.match(/class="article-block pool-process-section"/g) || []).length !== 1) throw new Error('Expected exactly one pool process section.');
if ((html.match(/class="article-block pool-service-areas"/g) || []).length !== 1) throw new Error('Expected exactly one pool service-area section.');

html = html.replace(processPattern, '\n');
html = html.replace(servicePattern, '\n');

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while removing sections.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while removing sections.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while removing sections.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while removing sections.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while removing sections.');

if (html.includes(processHeading) || /class="article-block pool-process-section"/i.test(html)) throw new Error('Pool process section was not fully removed.');
if (html.includes(serviceHeading) || /class="article-block pool-service-areas"/i.test(html)) throw new Error('Pool service-area section was not fully removed.');

fs.writeFileSync(file, html);
console.log('Removed pool deck process and service-area sections.');
