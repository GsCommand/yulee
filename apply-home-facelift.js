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
          <div class="y-home-group y-home-group--paver">
            <button class="y-home-parent" type="button" aria-expanded="false">Paver Sealing</button>
            <div class="y-home-mega">
              <a href="/yulee-driveway-paver-sealing.html">Driveway Paver Sealing<small>Clean, resand, and protect</small></a>
              <a href="/yulee-pool-deck-paver-sealing.html">Pool Deck Sealing<small>Moisture-aware preparation</small></a>
              <a href="/yulee-travertine-sealing.html">Travertine Sealing<small>Natural-stone specific care</small></a>
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
              <a href="/about.html">About HydroSeal</a>
              <a href="#calculator">Pricing Calculator</a>
              <a href="/warranty.html">2-Year Warranty</a>
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
              <div aria-label="Google reviews" class="y-home-google-badge"><svg aria-hidden="true" focusable="false" viewBox="0 0 256 262"><path d="M255.68 133.5c0-10.79-.97-18.68-3.06-26.89H130.55v47.73h71.62c-1.44 11.86-9.17 29.71-26.34 41.7l-.24 1.6 38.31 29.68 2.65.26c24.31-22.42 38.13-55.43 38.13-94.08" fill="#4285F4"></path><path d="M130.55 261c34.98 0 64.32-11.54 85.76-31.38l-40.72-31.54c-10.9 7.62-25.52 12.97-45.04 12.97-34.25 0-63.32-22.42-73.67-53.41l-1.51.13-39.84 30.83-.52 1.45C36.36 232.1 79.97 261 130.55 261" fill="#34A853"></path><path d="M56.88 157.64c-2.69-7.89-4.24-16.34-4.24-25.14s1.55-17.25 4.1-25.14l-.07-1.69L16.34 74.34l-1.32.63C6 92.98.84 112.76.84 132.5s5.16 39.52 14.18 57.53z" fill="#FBBC05"></path><path d="M130.55 53.95c24.62 0 41.25 10.68 50.69 19.61l37-36.1C194.73 15.61 165.53 1 130.55 1 79.97 1 36.36 29.9 15.02 74.97l41.65 32.33c10.49-30.98 39.56-53.35 73.88-53.35" fill="#EB4335"></path></svg><span>Google</span></div>
              <div class="y-home-stars" aria-label="Five stars">★★★★★</div>
              <h3>5-STAR RATED PAVER RESTORATION.</h3>
              <p>Homeowners hire HydroSeal when faded, dirty pavers need more than a quick pressure wash.</p>
              <a class="y-home-review-link" href="https://share.google/4ddHhmrSn3woAYR6h" rel="noopener noreferrer" target="_blank">Read customer reviews →</a>
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
          <a class="y-home-feature" href="/warranty.html"><h3>2-YEAR WARRANTY</h3><p>Written workmanship and adhesion coverage.</p></a>
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
body.yulee-home .y-home-parent{font-size:12px;letter-spacing:1.4px;padding:12px 9px}
body.yulee-home .y-home-call{font-size:12px;padding:12px 15px;background:rgba(255,255,255,.66)}
body.yulee-home .y-home-quote{display:inline-flex;align-items:center;justify-content:center;padding:17px 24px;border-radius:30px;text-transform:uppercase;font-weight:950;letter-spacing:1px;background:#39bfea;color:#fff;box-shadow:0 12px 28px rgba(57,191,234,.32);font-size:inherit;line-height:1.55}
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
body.yulee-home .y-home-btn{display:inline-flex;align-items:center;justify-content:center;padding:17px 24px;border-radius:30px;text-transform:uppercase;font-weight:950;letter-spacing:1px;font-size:inherit;line-height:1.55}
body.yulee-home .y-home-proof-stack{width:100%;max-width:372px;justify-self:end;gap:15px;margin-top:24px;min-width:0}
body.yulee-home .y-home-proof{padding:28px;border-radius:30px;background:rgba(255,255,255,.96);color:#0b1220;box-shadow:0 22px 60px rgba(11,45,74,.16)}
body.yulee-home .y-home-google-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 10px;border-radius:999px;background:#fff;border:1px solid rgba(15,23,42,.12);box-shadow:0 8px 18px rgba(0,0,0,.06)}
body.yulee-home .y-home-google-badge svg{width:14px;height:14px;display:block}
body.yulee-home .y-home-google-badge span{font-size:11px;line-height:1;font-weight:800;color:#5f6368;letter-spacing:0;text-transform:none}
body.yulee-home .y-home-stars{color:#ffb000;font-size:24px;letter-spacing:2px;line-height:1}
body.yulee-home .y-home-proof h3{font-family:"Arial Black",Arial,sans-serif!important;font-size:29px!important;line-height:1.08!important;letter-spacing:-.7px!important;margin:14px 0;color:#0b1220}
body.yulee-home .y-home-proof p{font-size:15px;line-height:1.55;color:#536475;font-weight:700}
body.yulee-home .y-home-review-link{display:inline-block;margin-top:14px;font-weight:900;text-transform:uppercase;font-size:12px;letter-spacing:1.4px;color:#0b1220}
body.yulee-home .y-home-proof-blue{padding:20px 22px;border-radius:24px;background:rgba(15,110,168,.94);font-size:15.6px!important;line-height:1!important;letter-spacing:-.3px!important;text-align:center;width:100%;color:#fff;font-weight:950;text-transform:uppercase;white-space:nowrap}
body.yulee-home .y-home-feature-wrap{position:relative;z-index:4;width:min(1180px,calc(100% - 40px))!important;margin-top:-23px}
body.yulee-home .y-home-feature-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:17px;background:#f0f5f7;border-radius:30px}
body.yulee-home .y-home-feature,body.yulee-home a.y-home-feature{display:block;height:100%;padding:20px;background:#fff;border:1px solid #dce5ea;border-radius:20px}
body.yulee-home .y-home-feature h3{font-family:"Arial Black",Arial,sans-serif!important;font-size:23px!important;line-height:1.08!important;letter-spacing:-.7px!important;color:#0b2d4a;margin:0 0 5px}
body.yulee-home .y-home-feature p{font-size:13px;line-height:1.55;color:#536475;margin:0}
@media(max-width:980px){body.yulee-home .y-home-nav{gap:8px}body.yulee-home .y-home-logo img{width:170px}body.yulee-home .y-home-parent{font-size:11px;padding-inline:5px}}
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
