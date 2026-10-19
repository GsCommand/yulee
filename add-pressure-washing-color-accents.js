const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'pressure-washing.html');
if (!fs.existsSync(file)) throw new Error('Pressure washing page missing from public build.');
let html = fs.readFileSync(file, 'utf8');

const styleId = 'pressure-washing-color-accents-v1';
if (html.includes(`id="${styleId}"`)) process.exit(0);

const css = `
<style id="${styleId}">
body{
  --pw-navy:#0b2d4a;
  --pw-blue:#0f6ea8;
  --pw-aqua:#39bfea;
  --pw-teal:#2bb7a9;
  --pw-indigo:#596fd3;
  --pw-line:#dbe6ec;
  --pw-soft:#f7fbfd;
  --pw-shadow:0 14px 34px rgba(11,45,74,.09);
}

/* Main bordered sections */
.service-article>.article-block,
.service-article>.article-grid,
.faq-section,
.cta-panel,
.section.split,
.gallery-embed{
  position:relative;
}

.service-article>.article-block{
  border:1px solid #d9e7ed;
  border-top:4px solid var(--pw-aqua);
  border-radius:28px;
  background:linear-gradient(145deg,#fff 0%,#fbfdfe 100%);
  box-shadow:var(--pw-shadow);
  padding:clamp(28px,4vw,44px);
  margin-top:30px;
}
.service-article>.article-block:nth-of-type(3){border-top-color:var(--pw-indigo)}
.service-article>.article-block:nth-of-type(5){border-top-color:var(--pw-teal)}

/* Three intro cards */
.content-grid.three .content-card{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:22px;
  background:#fff;
  box-shadow:0 8px 22px rgba(11,45,74,.06);
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.content-grid.three .content-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-aqua);
}
.content-grid.three .content-card:nth-child(2)::before{background:var(--pw-blue)}
.content-grid.three .content-card:nth-child(3)::before{background:var(--pw-indigo)}
.content-grid.three .content-card:nth-child(1){background:linear-gradient(135deg,#effbff,#fff 74%)}
.content-grid.three .content-card:nth-child(2){background:linear-gradient(135deg,#f1f7fb,#fff 74%)}
.content-grid.three .content-card:nth-child(3){background:linear-gradient(135deg,#f4f5ff,#fff 74%)}
.content-grid.three .content-card:hover{transform:translateY(-3px);box-shadow:0 15px 34px rgba(11,45,74,.11);border-color:rgba(57,191,234,.5)}

/* Two-card rows */
.service-article>.article-grid{
  gap:18px;
  padding:18px;
  border:1px solid #dce7ed;
  border-radius:28px;
  background:#f2f6f8;
  box-shadow:0 12px 30px rgba(11,45,74,.07);
  margin-top:30px;
}
.service-article>.article-grid>.article-card{
  position:relative;
  overflow:hidden;
  background:#fff;
  border:1px solid var(--pw-line);
  border-radius:22px;
  box-shadow:0 8px 22px rgba(11,45,74,.05);
}
.service-article>.article-grid>.article-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-blue);
}
.service-article>.article-grid>.article-card:nth-child(2)::before{background:var(--pw-teal)}
.service-article>.article-grid:nth-of-type(4)>.article-card:first-child::before{background:var(--pw-indigo)}
.service-article>.article-grid:nth-of-type(4)>.article-card:nth-child(2)::before{background:var(--pw-aqua)}

/* Process */
.process-grid{gap:14px}
.process-step{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:18px;
  background:#fff;
  box-shadow:0 7px 18px rgba(11,45,74,.05);
  transition:transform .2s ease,box-shadow .2s ease;
}
.process-step::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--pw-aqua)}
.process-step:nth-child(2)::before,.process-step:nth-child(5)::before{background:var(--pw-blue)}
.process-step:nth-child(3)::before,.process-step:nth-child(6)::before{background:var(--pw-indigo)}
.process-step:nth-child(4)::before{background:var(--pw-teal)}
.process-step:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(11,45,74,.10)}
.process-step strong{color:var(--pw-navy)}

/* Service areas */
.location-nav{gap:12px}
.location-link{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line)!important;
  border-radius:18px!important;
  background:#fff!important;
  box-shadow:0 8px 20px rgba(11,45,74,.05)!important;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.location-link::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-aqua)}
.location-link:nth-child(2)::before{background:var(--pw-blue)}
.location-link:nth-child(3)::before{background:var(--pw-indigo)}
.location-link:nth-child(4)::before{background:var(--pw-teal)}
.location-link:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(11,45,74,.10)!important;border-color:rgba(57,191,234,.55)!important}

/* Pressure vs soft-wash split */
.section.split{
  width:min(1180px,calc(100% - 40px));
  margin:34px auto 0;
  padding:18px;
  gap:16px;
  border:1px solid #dce7ed;
  border-radius:28px;
  background:#f1f5f7;
  box-shadow:var(--pw-shadow);
}
.section.split>div{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:20px;
  background:#fff;
  padding:28px;
  box-shadow:0 8px 20px rgba(11,45,74,.05);
}
.section.split>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-blue)}
.section.split>div:nth-child(2)::before{background:var(--pw-teal)}

/* Reviews */
.gallery-embed{
  width:min(1180px,calc(100% - 40px));
  margin-inline:auto;
  border:1px solid var(--pw-line);
  border-top:4px solid var(--pw-indigo);
  border-radius:26px;
  background:#fff;
  box-shadow:var(--pw-shadow);
  padding:22px!important;
  overflow:hidden;
}

/* FAQ */
.faq-section{
  width:min(1180px,calc(100% - 40px));
  margin:36px auto 0!important;
  padding:clamp(28px,4vw,42px)!important;
  border:1px solid var(--pw-line);
  border-top:4px solid var(--pw-aqua);
  border-radius:28px;
  background:linear-gradient(145deg,#fff,#f8fbfd);
  box-shadow:var(--pw-shadow);
}
.faq-item{
  border:1px solid var(--pw-line)!important;
  border-radius:16px!important;
  background:#fff!important;
  box-shadow:0 6px 18px rgba(11,45,74,.04)!important;
  overflow:hidden;
}
.faq-item:nth-of-type(2){border-left:4px solid var(--pw-blue)!important}
.faq-item:nth-of-type(3){border-left:4px solid var(--pw-indigo)!important}
.faq-item:nth-of-type(4){border-left:4px solid var(--pw-teal)!important}

/* CTA */
.cta-panel{
  width:min(1180px,calc(100% - 40px));
  margin:36px auto 0!important;
  padding:clamp(30px,5vw,52px)!important;
  border:1px solid rgba(255,255,255,.18)!important;
  border-top:5px solid #79d7f4!important;
  border-radius:28px!important;
  background:linear-gradient(135deg,#0b2d4a,#0f6ea8)!important;
  color:#fff!important;
  box-shadow:0 24px 58px rgba(11,45,74,.18)!important;
}
.cta-panel h2,.cta-panel p,.cta-panel a{color:#fff!important}

@media(max-width:720px){
  .service-article>.article-block{padding:24px 20px}
  .section.split,.gallery-embed,.faq-section,.cta-panel{width:calc(100% - 24px)}
}
</style>`;

html = html.replace('</head>', `${css}\n</head>`);
fs.writeFileSync(file, html);
console.log('Added professional blue/aqua/teal/indigo border accents to pressure washing page.');

// Reuse the final homepage shell so navigation and responsive layout stay in sync.
const home = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
function required(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error('Missing homepage component: ' + label);
  return match[0];
}
let page = fs.readFileSync(file, 'utf8');
const homeHeader = required(home, /<header class="y-home-header">[\s\S]*?<\/header>\s*<script>[\s\S]*?<\/script>/, 'navigation');
let hero = required(home, /<section class="hero y-home-hero">[\s\S]*?<\/section>/, 'hero');
hero = hero.replace('/yulee-sealing-pavers-header.png', '/images/hydroseal-house-washing.webp')
  .replace('Resealed paver driveway in Yulee, Florida', 'Residential exterior cleaning in Yulee, Florida')
  .replace('Professional paver sealing in Yulee, Wildlight &amp; Nassau County', 'Exterior cleaning in Yulee, Wildlight &amp; Nassau County')
  .replace('Paver Sealing Yulee FL', 'Pressure Washing Yulee FL')
  .replace('WE BRING YOUR<br>PAVERS BACK.', 'A FRESH START<br>FOR YOUR HOME.')
  .replace('Cleaned. Resanded. Sealed. Built for Florida.', 'House washing. Driveways. Outdoor surfaces.')
  .replace(/<p class="hero-text">[\s\S]*?<\/p>/, '<p class="hero-text">Pressure washing and soft washing for homes, driveways, concrete and exterior surfaces in Yulee, Wildlight, Fernandina Beach and Amelia Island. The cleaning method is matched to your surface.</p>')
  .replace('5-STAR RATED PAVER RESTORATION.', 'HOMEOWNERS TRUST HYDROSEAL.')
  .replace('Homeowners hire HydroSeal when faded, dirty pavers need more than a quick pressure wash.', 'See what Northeast Florida homeowners say about their experience with HydroSeal.')
  .replace('Trident Master Certified', 'Surface-specific exterior cleaning')
  .replaceAll('href="#calculator"', 'href="https://hydrosealpavers.com/get-a-quote"');
const features = `<div class="y-home-feature-wrap y-shell"><div class="y-home-feature-strip">${[
 ['HOUSE WASHING','Lower-pressure care for suitable exterior finishes.'],
 ['DRIVEWAYS','Controlled cleaning for concrete and hard surfaces.'],
 ['SOFT WASHING','Cleaning chemistry matched to the material.'],
 ['LOCAL SERVICE','Yulee, Wildlight and Nassau County.']
].map(([title, copy]) => `<article class="y-home-feature"><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div>`;
page = page.replace('<body>', '<body class="yulee-home yulee-pressure-home">')
 .replace(/<header class="site-header">[\s\S]*?<\/header>/, homeHeader.replace('href="#calculator">Pricing Calculator', 'href="/#calculator">Pricing Calculator').replace('href="#calculator">Get a Quote','href="https://hydrosealpavers.com/get-a-quote">Get a Quote'))
 .replace(/<nav class="breadcrumb"[\s\S]*?<\/nav>/, '')
 .replace(/<section class="hero">[\s\S]*?<\/section>/, hero + features);
const homeStyles = required(home, /<style id="yulee-home-hydroseal-v2">[\s\S]*?<\/style>/, 'visual styles');
page = page.replace('</head>', `<link rel="stylesheet" href="/home-hydroseal.css?v=1" />${homeStyles}
<style id="pressure-home-layout">
body.yulee-pressure-home .service-article{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:0}
body.yulee-pressure-home .service-article>section{margin:48px 0}
body.yulee-pressure-home .article-block,body.yulee-pressure-home .article-card{border-radius:28px;padding:32px;box-shadow:0 18px 48px rgba(15,110,168,.12)}
body.yulee-pressure-home .article-block h2,body.yulee-pressure-home .article-card h2,body.yulee-pressure-home .split h2{font-family:"Arial Black",Arial,sans-serif;line-height:1.08;letter-spacing:-1px;font-size:clamp(28px,3vw,42px);color:#0b2d4a}
body.yulee-pressure-home .content-card,body.yulee-pressure-home .process-step,body.yulee-pressure-home .location-link{border-radius:20px}
body.yulee-pressure-home .y-home-proof-blue{white-space:normal;line-height:1.35!important}
body.yulee-pressure-home .y-home-glass{background:rgba(8,35,57,.66)}
body.yulee-pressure-home .y-home-hero-bg{object-position:center}
body.yulee-pressure-home .gallery-embed,body.yulee-pressure-home .faq-section{padding:40px 28px;margin-top:48px;margin-bottom:48px}
@media(max-width:720px){body.yulee-pressure-home .service-article{width:calc(100% - 24px)}body.yulee-pressure-home .article-block,body.yulee-pressure-home .article-card{padding:24px 20px}body.yulee-pressure-home .article-grid,body.yulee-pressure-home .content-grid,body.yulee-pressure-home .process-grid{grid-template-columns:1fr}body.yulee-pressure-home .y-home-feature-strip{grid-template-columns:1fr 1fr}body.yulee-pressure-home .y-home-feature{padding:15px}body.yulee-pressure-home .y-home-feature h3{font-size:18px!important}}
@media(max-width:380px){body.yulee-pressure-home .y-home-feature-strip{grid-template-columns:1fr}}
</style></head>`);
const footer = home.match(/<footer class="site-footer"[\s\S]*?<\/footer>/);
const footerStyle = home.match(/<style id="yulee-standard-footer-style">[\s\S]*?<\/style>/);
if (footer) page = page.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, footer[0]);
if (footerStyle) page = page.replace('</head>',footerStyle[0]+'</head>');
fs.writeFileSync(file, page);
console.log('Applied homepage navigation, photo hero, feature strip, typography and responsive spacing to Pressure Washing.');
