const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
if (!fs.existsSync(file)) {
  throw new Error('public/index.html was not found; run this after the site copy/build steps.');
}

let html = fs.readFileSync(file, 'utf8');

// Preserve the ranking-sensitive homepage foundation exactly as generated before this visual step.
const protectedH1 = '<h1>Paver Sealing Yulee FL</h1>';
if ((html.match(/<h1>Paver Sealing Yulee FL<\/h1>/g) || []).length !== 1) {
  throw new Error('Protected Yulee H1 is missing or duplicated.');
}

const jsonLdBefore = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descriptionBefore = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];

if (!titleBefore || !descriptionBefore || !canonicalBefore) {
  throw new Error('Could not freeze title, description, or canonical before facelift.');
}

if (!html.includes('/home-hydroseal.css')) {
  const cssAnchor = '<link rel="stylesheet" href="/styles.css?v=7" />';
  if (!html.includes(cssAnchor)) throw new Error('Base homepage stylesheet link not found.');
  html = html.replace(cssAnchor, `${cssAnchor}\n    <link rel="stylesheet" href="/home-hydroseal.css?v=1" />`);
}

html = html.replace('<body>', '<body class="yulee-home">');

const header = `
    <header class="y-home-header">
      <nav class="y-home-nav y-shell" aria-label="Primary navigation">
        <a class="y-home-logo" href="/" aria-label="Yulee Paver Sealing home"><img src="/images/yulee-hydroseal-logo.webp" alt="Yulee Paver Sealing by HydroSeal" width="400" height="145" /></a>
        <button class="y-home-toggle" type="button" aria-expanded="false" aria-controls="yHomeMenu" aria-label="Open menu">☰</button>
        <div class="y-home-menu" id="yHomeMenu">
          <div class="y-home-group">
            <button class="y-home-parent" type="button" aria-expanded="false">Paver Sealing</button>
            <div class="y-home-mega">
              <a href="/yulee-driveway-paver-sealing.html">Driveway Paver Sealing<small>Cleaning, joint sand and breathable sealer</small></a>
              <a href="/yulee-pool-deck-paver-sealing.html">Pool Deck Paver Sealing<small>Pool decks, patios and wet-zone pavers</small></a>
              <a href="/yulee-travertine-sealing.html">Travertine Sealing<small>Natural-stone specific care</small></a>
              <a href="https://hydrosealpavers.com/paver-sealing/sand-options">Joint Sand Options<small>ASTM C144 kiln-dried sand</small></a>
            </div>
          </div>
          <div class="y-home-group">
            <button class="y-home-parent" type="button" aria-expanded="false">Service Areas</button>
            <div class="y-home-mega">
              <a href="/service-areas.html">Yulee &amp; Nassau County</a>
              <a href="/wildlight-paver-sealing.html">Wildlight</a>
              <a href="/del-webb-wildlight-paver-sealing.html">Del Webb Wildlight</a>
              <a href="/fernandina-beach-paver-sealing.html">Fernandina Beach</a>
              <a href="/amelia-island-paver-sealing.html">Amelia Island</a>
            </div>
          </div>
          <div class="y-home-group">
            <button class="y-home-parent" type="button" aria-expanded="false">Pressure Washing</button>
            <div class="y-home-mega">
              <a href="/pressure-washing.html">Pressure Washing</a>
              <a href="/yulee-house-washing.html">House Washing</a>
              <a href="/yulee-roof-washing.html">Roof Washing</a>
            </div>
          </div>
          <div class="y-home-group">
            <button class="y-home-parent" type="button" aria-expanded="false">About</button>
            <div class="y-home-mega">
              <a href="https://hydrosealpavers.com/about">About HydroSeal</a>
              <a href="#calculator">Pricing Calculator</a>
              <a href="https://hydrosealpavers.com/warranty">2-Year Warranty</a>
            </div>
          </div>
        </div>
        <a class="y-home-call" href="tel:+19045375000">Call 904.537.5000</a>
        <a class="y-home-quote" href="#calculator">Get a Quote</a>
      </nav>
    </header>
    <script>
    (function(){
      var toggle=document.querySelector('.y-home-toggle');
      var menu=document.getElementById('yHomeMenu');
      if(!toggle||!menu)return;
      toggle.addEventListener('click',function(){
        var open=menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded',String(open));
      });
      document.querySelectorAll('.y-home-group').forEach(function(group){
        var button=group.querySelector('.y-home-parent');
        if(!button)return;
        button.addEventListener('click',function(e){
          if(window.innerWidth>900)return;
          e.preventDefault();
          var willOpen=!group.classList.contains('is-open');
          document.querySelectorAll('.y-home-group').forEach(function(other){
            other.classList.remove('is-open');
            var b=other.querySelector('.y-home-parent');
            if(b)b.setAttribute('aria-expanded','false');
          });
          group.classList.toggle('is-open',willOpen);
          button.setAttribute('aria-expanded',String(willOpen));
        });
      });
    }());
    </script>`;

const oldHeaderPattern = /\s*<header class="site-header">[\s\S]*?<\/header>/;
if (!oldHeaderPattern.test(html)) throw new Error('Existing homepage header not found.');
html = html.replace(oldHeaderPattern, `\n${header}`);

const hero = `
      <section class="hero y-home-hero">
        <img class="y-home-hero-bg" src="/images/yulee-wildlight-paver-sealing.webp" alt="Resealed paver driveway in Yulee, Florida" fetchpriority="high" />
        <div class="y-home-hero-grid y-shell">
          <div class="y-home-glass">
            <h1>Paver Sealing Yulee FL</h1>
            <div class="y-home-display">WE BRING YOUR PAVERS BACK.</div>
            <h2 class="y-home-subhead">Cleaned. Resanded. Sealed. Built for Florida.</h2>
            <p class="hero-text">Driveway sealing, pool deck sealing, patio paver sealing and travertine sealing for Yulee homeowners, with published starting prices and a process built around Florida conditions.</p>
            <div class="y-home-actions"><a class="y-home-btn y-home-btn--blue" href="#calculator">Get a Quote</a><a class="y-home-btn y-home-btn--white" href="tel:+19045375000">Call 904.537.5000</a></div>
          </div>
          <div class="y-home-proof-stack">
            <article class="y-home-proof">
              <span class="y-home-proof-kicker">Yulee • Wildlight • Nassau County</span>
              <h2>Professional paver sealing by HydroSeal.</h2>
              <p>Licensed &amp; Insured · 2-Year Warranty · Published Pricing</p>
            </article>
            <div class="y-home-proof-blue">Trident Master Certified</div>
          </div>
        </div>
      </section>

      <div class="y-home-feature-wrap y-shell" aria-label="Paver sealing service standards">
        <div class="y-home-feature-strip">
          <article class="y-home-feature"><h3>DEEP CLEANING</h3><p>Surface preparation before sealing.</p></article>
          <a class="y-home-feature" href="https://hydrosealpavers.com/paver-sealing/sand-options"><h3>JOINT SAND</h3><p>ASTM C144 kiln-dried sand.</p></a>
          <article class="y-home-feature"><h3>BREATHABLE SEALER</h3><p>Two coats for Florida conditions.</p></article>
          <a class="y-home-feature" href="https://hydrosealpavers.com/warranty"><h3>2-YEAR WARRANTY</h3><p>Written workmanship and adhesion coverage.</p></a>
        </div>
      </div>`;

const oldHeroPattern = /\s*<section class="hero">[\s\S]*?<\/section>/;
if (!oldHeroPattern.test(html)) throw new Error('Existing homepage hero not found.');
html = html.replace(oldHeroPattern, `\n${hero}`);

const calcOld = '<article class="pricing-panel pricing-calculator" aria-labelledby="pricing-calculator-title">';
const calcNew = '<article id="calculator" class="pricing-panel pricing-calculator" aria-labelledby="pricing-calculator-title">';
if (html.includes(calcOld)) {
  html = html.replace(calcOld, calcNew);
} else if (!html.includes('id="calculator" class="pricing-panel pricing-calculator"')) {
  throw new Error('Existing on-page calculator was not found.');
}

// Refuse to emit the facelift if core SEO/ranking elements drift.
if ((html.match(/<h1>Paver Sealing Yulee FL<\/h1>/g) || []).length !== 1 || !html.includes(protectedH1)) {
  throw new Error('Protected H1 changed during facelift.');
}
const jsonLdAfter = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
if (JSON.stringify(jsonLdAfter) !== JSON.stringify(jsonLdBefore)) {
  throw new Error('JSON-LD/schema changed during visual facelift.');
}
if (!html.includes(titleBefore)) throw new Error('Title tag changed during visual facelift.');
if (!html.includes(descriptionBefore)) throw new Error('Meta description changed during visual facelift.');
if (!html.includes(canonicalBefore)) throw new Error('Canonical changed during visual facelift.');

fs.writeFileSync(file, html);
console.log('Applied Yulee homepage visual facelift. H1, schema, title, description and canonical preserved.');
