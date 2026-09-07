const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const targets = [
  'yulee-driveway-paver-sealing.html',
  'yulee-pool-deck-paver-sealing.html',
  'yulee-travertine-sealing.html',
  'wildlight-paver-sealing.html',
  'del-webb-wildlight-paver-sealing.html',
  'fernandina-beach-paver-sealing.html',
  'amelia-island-paver-sealing.html',
  'pressure-washing.html',
  'yulee-house-washing.html',
  'yulee-roof-washing.html',
];

const pressurePages = new Set(['pressure-washing.html','yulee-house-washing.html','yulee-roof-washing.html']);

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'));
  return match ? match[1] : '';
}
function exactCount(haystack, needle) { return haystack.split(needle).length - 1; }

function headerMarkup() {
  return `
<header class="ys-header">
  <nav class="ys-nav ys-shell" aria-label="Primary navigation">
    <a class="ys-logo" href="/" aria-label="Yulee Paver Sealing home"><img src="/images/yulee-hydroseal-logo.webp" alt="Yulee Paver Sealing by HydroSeal" width="400" height="145" /></a>
    <button class="ys-toggle" type="button" aria-expanded="false" aria-controls="ysMenu" aria-label="Open menu">☰</button>
    <div class="ys-menu" id="ysMenu">
      <div class="ys-group ys-group--paver"><button class="ys-parent" type="button" aria-expanded="false">Paver Sealing</button><div class="ys-mega">
        <a href="/yulee-driveway-paver-sealing.html">Driveway Paver Sealing<small>Clean, resand, and protect</small></a>
        <a href="/yulee-pool-deck-paver-sealing.html">Pool Deck Sealing<small>Moisture-aware preparation</small></a>
        <a href="/yulee-travertine-sealing.html">Travertine Sealing<small>Natural-stone specific care</small></a>
      </div></div>
      <div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">Service Areas</button><div class="ys-mega">
        <a href="/service-areas.html">Yulee &amp; Nassau County</a><a href="/wildlight-paver-sealing.html">Wildlight</a><a href="/del-webb-wildlight-paver-sealing.html">Del Webb Wildlight</a><a href="/fernandina-beach-paver-sealing.html">Fernandina Beach</a><a href="/amelia-island-paver-sealing.html">Amelia Island</a>
      </div></div>
      <div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">Pressure Washing</button><div class="ys-mega">
        <a href="/pressure-washing.html">Pressure Washing</a><a href="/yulee-house-washing.html">House Washing</a><a href="/yulee-roof-washing.html">Roof Washing</a>
      </div></div>
      <div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">About</button><div class="ys-mega">
        <a href="https://hydrosealpavers.com/about">About HydroSeal</a><a href="/#calculator">Pricing Calculator</a><a href="https://hydrosealpavers.com/warranty">2-Year Warranty</a>
      </div></div>
    </div>
    <a class="ys-call" href="tel:+19045375000">Call 904.537.5000</a>
    <a class="ys-quote" href="https://hydrosealpavers.com/get-a-quote">Get a Quote</a>
  </nav>
</header>
<script>(function(){var t=document.querySelector('.ys-toggle'),m=document.getElementById('ysMenu');if(!t||!m)return;t.addEventListener('click',function(){var o=m.classList.toggle('is-open');t.setAttribute('aria-expanded',String(o));});document.querySelectorAll('.ys-group').forEach(function(g){var b=g.querySelector('.ys-parent');if(!b)return;b.addEventListener('click',function(e){if(window.innerWidth>900)return;e.preventDefault();var w=!g.classList.contains('is-open');document.querySelectorAll('.ys-group').forEach(function(x){x.classList.remove('is-open');var q=x.querySelector('.ys-parent');if(q)q.setAttribute('aria-expanded','false');});g.classList.toggle('is-open',w);b.setAttribute('aria-expanded',String(w));});});}());</script>`;
}

function googleProofMarkup() {
  return `<article class="ys-proof"><div aria-label="Google reviews" class="ys-google-badge"><svg aria-hidden="true" focusable="false" viewBox="0 0 256 262"><path d="M255.68 133.5c0-10.79-.97-18.68-3.06-26.89H130.55v47.73h71.62c-1.44 11.86-9.17 29.71-26.34 41.7l-.24 1.6 38.31 29.68 2.65.26c24.31-22.42 38.13-55.43 38.13-94.08" fill="#4285F4"></path><path d="M130.55 261c34.98 0 64.32-11.54 85.76-31.38l-40.72-31.54c-10.9 7.62-25.52 12.97-45.04 12.97-34.25 0-63.32-22.42-73.67-53.41l-1.51.13-39.84 30.83-.52 1.45C36.36 232.1 79.97 261 130.55 261" fill="#34A853"></path><path d="M56.88 157.64c-2.69-7.89-4.24-16.34-4.24-25.14s1.55-17.25 4.1-25.14l-.07-1.69L16.34 74.34l-1.32.63C6 92.98.84 112.76.84 132.5s5.16 39.52 14.18 57.53z" fill="#FBBC05"></path><path d="M130.55 53.95c24.62 0 41.25 10.68 50.69 19.61l37-36.1C194.73 15.61 165.53 1 130.55 1 79.97 1 36.36 29.9 15.02 74.97l41.65 32.33c10.49-30.98 39.56-53.35 73.88-53.35" fill="#EB4335"></path></svg><span>Google</span></div><div class="ys-stars" aria-label="Five stars">★★★★★</div><h3>5-STAR RATED PAVER RESTORATION.</h3><p>Homeowners hire HydroSeal when exterior surfaces need professional preparation and care.</p><a class="ys-review-link" href="https://share.google/4ddHhmrSn3woAYR6h" rel="noopener noreferrer" target="_blank">Read customer reviews →</a></article>`;
}

function paverPills() {
  return `<div class="ys-feature-wrap" aria-label="Paver sealing service standards"><div class="ys-feature-strip">
    <article class="ys-feature"><h3>DEEP CLEANING</h3><p>Surface preparation before sealing.</p></article>
    <a class="ys-feature" href="https://hydrosealpavers.com/paver-sealing/sand-options"><h3>JOINT SAND</h3><p>ASTM C144 kiln-dried sand.</p></a>
    <article class="ys-feature"><h3>BREATHABLE SEALER</h3><p>Two coats for Florida conditions.</p></article>
    <a class="ys-feature" href="https://hydrosealpavers.com/warranty"><h3>2-YEAR WARRANTY</h3><p>Written workmanship and adhesion coverage.</p></a>
  </div></div>`;
}

function pressurePills(items) {
  if (items.length !== 4) throw new Error(`Pressure-washing hero must retain exactly four trust-strip items; found ${items.length}.`);
  return `<div class="ys-feature-wrap" aria-label="Exterior cleaning service highlights"><div class="ys-feature-strip">${items.map(item => `<article class="ys-feature ys-feature--compact"><h3>${item}</h3></article>`).join('')}</div></div>`;
}

for (const filename of targets) {
  const file = path.join(publicDir, filename);
  if (!fs.existsSync(file)) throw new Error(`Target page missing after copy/build: ${filename}`);
  let html = fs.readFileSync(file, 'utf8');

  const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
  const descriptionBefore = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
  const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
  const jsonLdBefore = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
  const h1BeforeAll = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (!titleBefore || !descriptionBefore || !canonicalBefore || h1BeforeAll.length !== 1) throw new Error(`Protected SEO foundation could not be frozen for ${filename}.`);
  const h1Exact = h1BeforeAll[0];

  const oldHeader = html.match(/<header\s+class="site-header">[\s\S]*?<\/header>/i);
  const oldHero = html.match(/<section\s+class="[^"]*\bhero\b[^"]*">[\s\S]*?<\/section>/i);
  const breadcrumb = html.match(/<nav\s+class="breadcrumb"[\s\S]*?<\/nav>/i);
  if (!oldHeader || !oldHero) throw new Error(`Expected header/hero structure not found in ${filename}.`);

  const hero = oldHero[0];
  const imageTag = (hero.match(/<img\b[^>]*class="hero-image"[^>]*>/i) || [])[0] || '';
  const imageSrc = imageTag ? attr(imageTag, 'src') : '';
  const imageAlt = imageTag ? attr(imageTag, 'alt') : '';
  const eyebrow = (hero.match(/<p\s+class="eyebrow">[\s\S]*?<\/p>/i) || [])[0] || '';
  const heroText = (hero.match(/<p\s+class="hero-text">[\s\S]*?<\/p>/i) || [])[0] || '';
  const actions = (hero.match(/<div\s+class="hero-actions">[\s\S]*?<\/div>/i) || [])[0] || '';
  const trust = (hero.match(/<div\s+class="trust-strip">([\s\S]*?)<\/div>/i) || [])[1] || '';
  const trustItems = [...trust.matchAll(/<span>([\s\S]*?)<\/span>/gi)].map(m => m[1].trim());
  const heroCard = hero.match(/<aside\s+class="hero-card">([\s\S]*?)<\/aside>/i);
  if (!hero.includes(h1Exact)) throw new Error(`Protected H1 is not inside the existing hero in ${filename}.`);

  const existingProof = heroCard ? `<article class="ys-proof">${heroCard[1]}</article>` : googleProofMarkup();
  const proofBlue = trustItems.length ? `<div class="ys-proof-blue">${trustItems.join(' · ')}</div>` : '';
  const pills = pressurePages.has(filename) ? pressurePills(trustItems) : paverPills();
  const wildlightTopics = filename === 'wildlight-paver-sealing.html' ? `<div class="ys-wildlight-topics" aria-label="Wildlight paver conditions"><span>Wildlight driveways</span><span>Screened lanais</span><span>Pool decks</span><span>Irrigation staining</span><span>Joint-sand washout</span><span>Coastal exposure</span></div>` : '';
  const imageMarkup = imageSrc ? `<img class="ys-hero-bg" src="${imageSrc}" alt="${imageAlt}" fetchpriority="high" />` : '';
  const heroClass = imageSrc ? 'ys-hero' : 'ys-hero ys-hero--no-image';

  const newHero = `<section class="${heroClass}">${imageMarkup}<div class="ys-hero-grid ys-shell"><div class="ys-glass">${eyebrow}${h1Exact}${heroText}${actions}</div><div class="ys-proof-stack">${existingProof}${proofBlue}</div></div></section>${pills}${wildlightTopics}${breadcrumb ? breadcrumb[0] : ''}`;

  if (!html.includes('/shared-top-layout.css')) {
    const cssAnchor = '<link rel="stylesheet" href="/styles.css?v=7" />';
    if (!html.includes(cssAnchor)) throw new Error(`Base stylesheet anchor missing in ${filename}.`);
    html = html.replace(cssAnchor, `${cssAnchor}\n<link rel="stylesheet" href="/shared-top-layout.css?v=2" />`);
  }
  if (!/<body>/i.test(html)) throw new Error(`Plain body tag expected in ${filename}; refusing to guess.`);
  html = html.replace(/<body>/i, '<body class="y-shared-top">');
  html = html.replace(oldHeader[0], headerMarkup());
  if (breadcrumb) html = html.replace(breadcrumb[0], '');
  html = html.replace(oldHero[0], newHero);

  const titleAfter = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
  const descriptionAfter = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
  const canonicalAfter = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
  const jsonLdAfter = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
  const h1AfterAll = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (titleAfter !== titleBefore) throw new Error(`Title changed during cosmetic transform: ${filename}`);
  if (descriptionAfter !== descriptionBefore) throw new Error(`Meta description changed during cosmetic transform: ${filename}`);
  if (canonicalAfter !== canonicalBefore) throw new Error(`Canonical changed during cosmetic transform: ${filename}`);
  if (JSON.stringify(jsonLdAfter) !== JSON.stringify(jsonLdBefore)) throw new Error(`JSON-LD/schema changed during cosmetic transform: ${filename}`);
  if (h1AfterAll.length !== 1 || h1AfterAll[0] !== h1Exact || exactCount(html, h1Exact) !== 1) throw new Error(`H1 changed or duplicated during cosmetic transform: ${filename}`);
  if (imageSrc && !html.includes(imageSrc)) throw new Error(`Existing approved hero image was lost during cosmetic transform: ${filename}`);

  fs.writeFileSync(file, html);
  console.log(`Applied shared top layout to ${filename}${imageSrc ? ` using ${imageSrc}` : ' using its existing no-photo hero state'}`);
}
