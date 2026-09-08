const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function protectedFields(source) {
  const first = (re, label) => {
    const match = source.match(re);
    if (!match) throw new Error(`Missing protected ${label}`);
    return match[0];
  };
  return {
    title: first(/<title>[\s\S]*?<\/title>/i, 'title'),
    canonical: first(/<link\s+rel="canonical"[^>]*>/i, 'canonical'),
    h1: first(/<h1>[\s\S]*?<\/h1>/i, 'h1'),
    jsonld: (source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []).join('\n')
  };
}

const before = protectedFields(html);
const sectionPattern = /<section class="article-block" data-yulee-community-research="2026-09-07"><p class="eyebrow">Verified newer-community paver patterns<\/p>[\s\S]*?<\/section>\s*/g;
const matches = html.match(sectionPattern) || [];

if (matches.length !== 1) {
  throw new Error(`Expected exactly one driveway newer-community research section, found ${matches.length}.`);
}

html = html.replace(sectionPattern, '');

if (html.includes('Yulee neighborhoods where paver driveways are part of the actual housing stock')) {
  throw new Error('Driveway newer-community research heading is still present after removal.');
}

const after = protectedFields(html);
for (const key of ['title', 'canonical', 'h1', 'jsonld']) {
  if (before[key] !== after[key]) throw new Error(`Protected ${key} changed while removing driveway community section.`);
}

fs.writeFileSync(file, html);
console.log('Removed verified newer-community paver patterns section from driveway page only.');
