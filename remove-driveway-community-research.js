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

const communityPattern = /<section class="article-block" data-yulee-community-research="2026-09-07"><p class="eyebrow">Verified newer-community paver patterns<\/p>[\s\S]*?<\/section>\s*/g;
const communityMatches = html.match(communityPattern) || [];
if (communityMatches.length !== 1) {
  throw new Error(`Expected exactly one driveway newer-community research section, found ${communityMatches.length}.`);
}
html = html.replace(communityPattern, '');

const processPattern = /<section class="article-block"><p class="eyebrow">Process<\/p><h2>Paver Sanding and Sealing Yulee<\/h2>[\s\S]*?<\/section>\s*/g;
const processMatches = html.match(processPattern) || [];
if (processMatches.length !== 1) {
  throw new Error(`Expected exactly one driveway Process section, found ${processMatches.length}.`);
}
html = html.replace(processPattern, '');

const jointSealerPattern = /<section class="article-grid"><div class="article-card"><h2>Paver Joint Sand Yulee<\/h2>[\s\S]*?<h2>Paver Sealer Yulee FL<\/h2>[\s\S]*?<\/section>\s*/g;
const jointSealerMatches = html.match(jointSealerPattern) || [];
if (jointSealerMatches.length !== 1) {
  throw new Error(`Expected exactly one driveway joint-sand/sealer card section, found ${jointSealerMatches.length}.`);
}
html = html.replace(jointSealerPattern, '');

const serviceAreasPattern = /<section class="article-block"><p class="eyebrow">Service areas<\/p><h2>Driveway paver sealing near Yulee<\/h2>[\s\S]*?<\/section>\s*/g;
const serviceAreasMatches = html.match(serviceAreasPattern) || [];
if (serviceAreasMatches.length !== 1) {
  throw new Error(`Expected exactly one driveway service-areas section, found ${serviceAreasMatches.length}.`);
}
html = html.replace(serviceAreasPattern, '');

const credentialsPattern = /<section class="section cert-section yulee-trust-section" aria-label="HydroSeal credentials">[\s\S]*?<\/section>\s*/g;
const credentialsMatches = html.match(credentialsPattern) || [];
if (credentialsMatches.length !== 1) {
  throw new Error(`Expected exactly one driveway bottom credentials section, found ${credentialsMatches.length}.`);
}
html = html.replace(credentialsPattern, '');

for (const forbidden of [
  'Yulee neighborhoods where paver driveways are part of the actual housing stock',
  'Paver Sanding and Sealing Yulee',
  'Paver Joint Sand Yulee',
  'Paver Sealer Yulee FL',
  'Driveway paver sealing near Yulee',
  'HydroSeal is licensed and insured for professional exterior surface work.',
  'HydroSeal is a Trident Master Certified paver sealing applicator.',
  "Qualifying sealing projects include HydroSeal's written two-year workmanship and adhesion warranty."
]) {
  if (html.includes(forbidden)) throw new Error(`Removed driveway section text is still present: ${forbidden}`);
}

const after = protectedFields(html);
for (const key of ['title', 'canonical', 'h1', 'jsonld']) {
  if (before[key] !== after[key]) throw new Error(`Protected ${key} changed while removing driveway sections.`);
}

fs.writeFileSync(file, html);
console.log('Removed driveway newer-community, Process, joint-sand/sealer, service-areas, and bottom credentials sections only.');
