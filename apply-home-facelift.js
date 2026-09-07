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
        <img class="y-home-hero-bg" src="/yulee-sealing-pavers-header.png" alt="Resealed paver driveway in Yulee, Florida" fetchpriority="high" />
        <div class="y-home-hero-grid y-shell">
          <div class="y-home-glass">
            <p class="y-home-eyebrow"><span></span>Professional paver sealing in Yulee, Wildlight &amp; Nassau County</p>
            <h1>Paver Sealing Yulee FL</h1>
            <div class="y-home-display">WE BRING YOUR<br>PAVERS BACK.</div>
            <h2 class="y-home-subhead">Cleaned. Resanded. Sealed. Built for Florida.</h2>
            <p class="hero-text">Driveway sealing, pool deck sealing, patio paver sealing and travertine sealing for Yulee homeowners, with published starting prices and a process built around Florida conditions.</p>
            <div class="y-home-actions"><a class="y-home-btn y-home-btn--blue" href="#calculator">Get a Quote</a><a class="y-home-btn y-home-btn--white" href="tel:+19045375000">Call 904.537.5000</a></div>
          </div>
          <div class="y-home-proof-stack">
            <article class="y-home-proof">
              <div class="y-home-google">Google</div>
              <div class="y-home-stars" aria-label="Five stars">★★★★★</div>
              <h2>Professional paver sealing by HydroSeal.</h2>
              <p>Licensed &amp; Insured · 2-Year Warranty · Published Pricing</p>
              <div class="y-home-proof-rule"></div>
              <div class="y-home-review-link">Read customer reviews →</div>
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

const visualOverrides = `
<style id="yulee-home-hydroseal-v2">
body.yulee-home .y-shell{width:min(1260px,calc(100% - 40px))}
body.yulee-home .y-home-header{top:18px}
body.yulee-home .y-home-nav{height:72px;padding:0 18px 0 24px;gap:14px;border-radius:22px;background:rgba(245,249,252,.88);border:1px solid rgba(255,255,255,.86);box-shadow:0 15px 38px rgba(5,32,51,.18);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
body.yulee-home .y-home-logo img{width:190px;max-height:54px}
body.yulee-home .y-home-parent{font-size:10px;letter-spacing:1.15px;padding:11px 8px}
body.yulee-home .y-home-call{font-size:10px;padding:11px 14px;background:rgba(255,255,255,.66)}
body.yulee-home .y-home-quote{font-size:10px;padding:13px 19px;background:#2fc3ee}
body.yulee-home .hero.y-home-hero{min-height:760px;background:#fff}
body.yulee-home .y-home-hero-bg{object-position:center 47%;filter:none!important;opacity:1!important}
body.yulee-home .y-home-hero:before,body.yulee-home .y-home-hero:after{display:none!important;content:none!important;background:none!important}
body.yulee-home .y-home-hero-grid{grid-template-columns:minmax(0,1.18fr) minmax(300px,.62fr);gap:34px;align-items:center;padding-top:150px;padding-bottom:96px}
body.yulee-home .y-home-glass{max-width:690px;padding:34px 34px 30px;border-radius:30px;background:rgba(8,35,57,.48);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 22px 60px rgba(4,21,34,.20)}
body.yulee-home .y-home-eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 20px;font-size:10px;line-height:1.35;text-transform:uppercase;letter-spacing:1.55px;font-weight:900;color:#fff}
body.yulee-home .y-home-eyebrow span{width:9px;height:9px;border-radius:50%;background:#2fc3ee;box-shadow:0 0 0 3px rgba(47,195,238,.12);flex:0 0 auto}
body.yulee-home .y-home-hero h1{margin:0 0 10px;font-size:clamp(48px,5.1vw,72px);line-height:.95;letter-spacing:-2px;text-shadow:0 2px 12px rgba(0,0,0,.35)}
body.yulee-home .y-home-display{margin:8px 0 10px;font-size:clamp(43px,4.7vw,66px);line-height:.96;letter-spacing:-2px;text-shadow:0 2px 12px rgba(0,0,0,.35)}
body.yulee-home .y-home-subhead{margin:0 0 9px;font-size:18px;letter-spacing:.15px;color:#a9edff}
body.yulee-home .y-home-hero .hero-text{max-width:620px;font-size:14px;line-height:1.45;color:rgba(255,255,255,.92);text-shadow:none}
body.yulee-home .y-home-actions{margin-top:22px}
body.yulee-home .y-home-btn{padding:14px 20px;font-size:11px}
body.yulee-home .y-home-proof-stack{max-width:330px;justify-self:end;gap:12px;margin-top:4px}
body.yulee-home .y-home-proof{padding:24px 25px 22px;border-radius:24px;background:#fff;box-shadow:0 22px 50px rgba(4,21,34,.18)}
body.yulee-home .y-home-google{font-size:12px;font-weight:800;color:#4285f4;margin-bottom:7px}
body.yulee-home .y-home-stars{font-size:20px;letter-spacing:2px;color:#f5b400;line-height:1;margin-bottom:15px}
body.yulee-home .y-home-proof h2{margin:0 0 10px;font-size:27px;line-height:1.02}
body.yulee-home .y-home-proof p{font-size:13px;line-height:1.35;color:#243b53}
body.yulee-home .y-home-proof-rule{height:1px;background:#dce5ea;margin:17px 0 14px}
body.yulee-home .y-home-review-link{font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:950;color:#0b2d4a}
body.yulee-home .y-home-proof-blue{padding:14px 18px;border-radius:18px;background:#0e7fbc;font-size:11px}
body.yulee-home .y-home-feature-wrap{margin-top:-22px}
body.yulee-home .y-home-feature-strip{gap:12px;padding:14px 16px;border-radius:24px;background:rgba(247,250,252,.98)}
body.yulee-home .y-home-feature,body.yulee-home a.y-home-feature{padding:17px 18px;border-radius:15px}
body.yulee-home .y-home-feature h3{font-size:16px}
body.yulee-home .y-home-feature p{font-size:11px}
@media(max-width:1080px){body.yulee-home .y-home-nav{gap:8px}body.yulee-home .y-home-logo img{width:170px}body.yulee-home .y-home-parent{font-size:9px;padding-inline:5px}}
@media(max-width:900px){body.yulee-home .y-home-hero-grid{grid-template-columns:1fr;padding-top:118px;padding-bottom:58px}body.yulee-home .y-home-proof-stack{max-width:none;justify-self:stretch;grid-template-columns:1fr 1fr}body.yulee-home .y-home-glass{max-width:none}}
@media(max-width:640px){body.yulee-home .y-home-nav{height:64px}body.yulee-home .y-home-logo img{width:145px}body.yulee-home .hero.y-home-hero{min-height:auto}body.yulee-home .y-home-hero-grid{padding-top:100px;padding-bottom:34px}body.yulee-home .y-home-glass{padding:24px 18px;border-radius:24px;background:rgba(8,35,57,.55)}body.yulee-home .y-home-eyebrow{font-size:8px;margin-bottom:14px}body.yulee-home .y-home-hero h1{font-size:39px}body.yulee-home .y-home-display{font-size:38px}body.yulee-home .y-home-subhead{font-size:15px}body.yulee-home .y-home-hero .hero-text{font-size:13px}body.yulee-home .y-home-proof-stack{grid-template-columns:1fr}body.yulee-home .y-home-feature-wrap{margin-top:0}}
</style>`;
if (!html.includes('id="yulee-home-hydroseal-v2"')) {
  html = html.replace('</head>', `${visualOverrides}\n</head>`);
}

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
console.log('Applied HydroSeal-matched Yulee homepage hero/header. H1, schema, title, description and canonical preserved; full-image tint removed.');
